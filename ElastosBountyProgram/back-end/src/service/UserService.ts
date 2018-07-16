import Base from './Base';
import {Document} from 'mongoose';
import * as _ from 'lodash';
import {constant} from '../constant';
import {geo} from '../utility/geo'
import {validate, crypto, uuid, mail} from '../utility';
import CommunityService from "./CommunityService";
import CommentService from "./CommentService";

const restrictedFields = {
    update: [
        '_id',
        'username',
        'role',
        'profile'
    ]
}

export default class extends Base {

    /**
     * On registration we also add them to the country community,
     * if it doesn't exist yet we will create it as well
     *
     * @param param
     * @returns {Promise<"mongoose".Document>}
     */
    public async registerNewUser(param): Promise<Document>{

        const db_user = this.getDBModel('User');

        const username = param.username.toLowerCase();

        this.validate_username(username);
        this.validate_password(param.password);
        this.validate_email(param.email);

        // check username and email unique
        if(await db_user.findOne({username})){
            throw 'username already exists';
        }
        if(await db_user.findOne({email : param.email})){
            throw 'email already exists';
        }

        const salt = uuid();

        const doc = {
            username,
            password : this.getPassword(param.password, salt),
            email : param.email,
            salt,
            profile : {
                firstName : param.firstName,
                lastName : param.lastName,
                country : param.country,
                state : param.state,
                city : param.city,
                beOrganizer : param.beOrganizer === 'yes',
                isDeveloper : param.isDeveloper === 'yes',
                source : param.source
            },
            role : constant.USER_ROLE.MEMBER,
            active: true
        };

        let newUser = await db_user.save(doc);

        await this.linkCountryCommunity(newUser)

        return newUser
    }

    public async getUserSalt(username): Promise<String>{
        username = username.toLowerCase();
        const db_user = this.getDBModel('User');
        const user = await db_user.db.findOne({
            username
        });
        if(!user){
            throw 'invalid username';
        }
        return user.salt;
    }

    public async show(param) {

        const {userId} = param

        const db_user = this.getDBModel('User');
        let selectFields = '-salt -password -elaBudget -elaOwed -votePower'

        if (!param.admin) {
            selectFields += ' -email'
        }

        const user = db_user.getDBInstance().findOne({_id: userId})
            .select(selectFields)

        if (!user) {
            throw `userId: ${userId} not found`
        }

        return user
    }

    public async update(param) {

        const {userId} = param

        const updateObj:any = _.omit(param, restrictedFields.update)

        const db_user = this.getDBModel('User');

        let user = await db_user.findById(userId)
        let countryChanged = false

        if (!user) {
            throw `userId: ${userId} not found`
        }

        if (param.profile.country && param.profile.country !== user.profile.country) {
            countryChanged = true
        }

        if (param.profile) {
            updateObj.profile = Object.assign(user.profile, param.profile)
        }

        if (param.email) {
            updateObj.email = param.email
        }

        if (param.removeAttachment) {
            updateObj.avatar = null
            updateObj.avatarFileType = ''
            updateObj.avatarFilename = ''
        }

        await db_user.update({_id: userId}, updateObj)

        user = await db_user.findById(userId)

        // if we change the country, we add the new country as a community if not already
        // keep the old one too - TODO: think through this logic, maybe we only keep the old one if the new one already exists
        if (countryChanged) {
            await this.linkCountryCommunity(user)
        }

        return user
    }

    public async findUser(query): Promise<Document>{
        const db_user = this.getDBModel('User');
        return await db_user.findOne({
            username: query.username.toLowerCase(),
            password: query.password
        });
    }

    public async findUsers(query): Promise<Document[]>{
        const db_user = this.getDBModel('User');
        return await db_user.find({
            '_id' : {
                $in : query.userIds
            }
        });
    }

    public async findAll(): Promise<Document[]>{
        const db_user = this.getDBModel('User');
        return await db_user.getDBInstance().find({
            active : true
        }).sort({username: 1});
    }

    public async changePassword(param): Promise<boolean>{
        const db_user = this.getDBModel('User');

        const {oldPassword, password} = param;
        const username = param.username.toLowerCase();

        this.validate_password(oldPassword);
        this.validate_password(password);
        this.validate_username(username);

        const user = await db_user.findOne({username}, {reject: false});
        if(!user){
            throw 'user is not exist';
        }

        if(user.password !== this.getPassword(oldPassword, user.salt)){
            throw 'old password is incorrect';
        }

        return await db_user.update({username}, {
            $set : {
                password : this.getPassword(password, user.salt)
            }
        });
    }

    /*
    * return ela budget sum amount.
    *
    * param : user's elaBudget
    * */
    public getSumElaBudget(ela){
        let total = 0;
        _.each(ela, (item)=>{
            total += item.amount;
        });

        return total;
    }

    /*
    * return user password
    * password is built with sha512 to (password + salt)
    *
    * */
    public getPassword(password, salt){
        return crypto.sha512(password+salt);
    }

    public validate_username(username){
        if(!validate.valid_string(username, 6)){
            throw 'invalid username';
        }
    }
    public validate_password(password){
        if(!validate.valid_string(password, 8)){
            throw 'invalid password';
        }
    }
    public validate_email(email){
        if(!validate.email(email)){
            throw 'invalid email';
        }
    }

    /**
     * Send an Email
     *
     * @param param {Object}
     * @param param.fromUserId {String}
     * @param param.toUserId {String}
     * @param param.subject {String}
     * @param param.message {String}
     */
    public async sendEmail(param) {

        const {fromUserId, toUserId, subject, message} = param

        // ensure fromUser is logged in
        if (this.currentUser._id.toString() !== fromUserId) {
            throw 'User mismatch - from user must = sender'
        }

        const db_user = this.getDBModel('User');

        const fromUser = await db_user.findById(fromUserId)
        const toUser = await db_user.findById(toUserId)

        if (!fromUser){
            throw 'From user not found'
        }

        if (!toUser){
            throw 'From user not found'
        }

        // we assume users must have entered an email

        await mail.send({
            to: toUser.email,
            toName: `${toUser.profile.firstName} ${toUser.profile.lastName}`,
            subject: subject,
            body: message,
            replyTo: {
                name: `${fromUser.profile.firstName} ${fromUser.profile.lastName}`,
                email: fromUser.email
            }
        })

        return true
    }

    public async sendRegistrationCode(param) {
        const { email, code } = param

        await mail.send({
            to: email,
            subject: 'Your Cyber Republic registration code',
            body: `Your code: ${code}`
        })

        return true
    }

    public async sendConfirmation(param) {
        const { email } = param

        await mail.send({
            to: email,
            subject: 'Welcome to Cyber Republic',
            body: 'Your registration is complete.'
        })

        return true
    }

    private async linkCountryCommunity(user) {

        const db_community = this.getDBModel('Community');
        const communityService = this.getService(CommunityService);

        // 1st check if the country already exists
        let countryCommunity = await db_community.findOne({
            type: constant.COMMUNITY_TYPE.COUNTRY,
            geolocation: user.profile.country
        })

        if (!countryCommunity) {
            // create the country then attach
            countryCommunity = await communityService.create({
                name: geo.geolocationMap[user.profile.country],
                type: constant.COMMUNITY_TYPE.COUNTRY,
                geolocation: user.profile.country,
                parentCommunityId: null
            })

        }

        // now we should always have the community to attach it
        await communityService.addMember({
            userId: user._id,
            communityId: countryCommunity._id
        })
    }
}
