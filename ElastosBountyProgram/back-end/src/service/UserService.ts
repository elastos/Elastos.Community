import Base from './Base';
import {Document} from 'mongoose';
import * as _ from 'lodash';
import {constant} from '../constant';
import {geo} from '../utility/geo'
import * as uuid from 'uuid'
import {validate, utilCrypto, mail} from '../utility';
import CommunityService from "./CommunityService";
import CommentService from "./CommentService";

let selectFields = '-salt -password -elaBudget -elaOwed -votePower -resetToken'

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

        const salt = uuid.v4();

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
        const db_user = this.getDBModel('User');
        const isEmail = validate.email(username);
        const query = {[isEmail ? 'email' : 'username'] : username};
        const user = await db_user.db.findOne(query);

        if(!user){
            throw 'invalid username or email';
        }
        return user.salt;
    }

    /**
     * TODO: ensure we have a test to ensure param.admin is checked properly (currently true)
     * @param param
     * @returns {Promise<"mongoose".DocumentQuery<T extends "mongoose".Document, T extends "mongoose".Document>>}
     */
    public async show(param) {

        const {userId} = param

        const db_user = this.getDBModel('User');

        if (param.admin && (!this.currentUser || (this.currentUser.role !== constant.USER_ROLE.ADMIN &&
            this.currentUser._id !== userId))) {
            throw 'Access Denied'
        }

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

        if (!this.currentUser || (this.currentUser.role !== constant.USER_ROLE.ADMIN &&
            this.currentUser._id.toString() !== userId)) {
            throw 'Access Denied'
        }

        if (!user) {
            throw `userId: ${userId} not found`
        }

        if (param.profile && param.profile.country && param.profile.country !== user.profile.country) {
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
        const isEmail = validate.email(query.username);

        if (!isEmail) {
            return await db_user.findOne({
                username: query.username.toLowerCase(),
                password: query.password
            });
        } else {
            return await db_user.findOne({
                email: query.username,
                password: query.password
            });
        }
    }

    public async findUsers(query): Promise<Document[]>{
        const db_user = this.getDBModel('User');
        selectFields += ' -email'

        return await db_user.getDBInstance().find({
            '_id' : {
                $in : query.userIds
            }
        }).select(selectFields)
    }

    /*
    ************************************************************************************
    * Find All Users
    * - be very restrictive here, careful to not select sensitive fields
    * - TODO: may need sorting by full name for Empower 35? Or something else?
    ************************************************************************************
     */
    public async findAll(query): Promise<Document[]>{
        const db_user = this.getDBModel('User');

        if (!query.admin || this.currentUser.role !== constant.USER_ROLE.ADMIN) {
            selectFields += ' -email'
        }

        const finalQuery:any = {
            active: true,
            archived: {$ne: true}
        }

        if (query.empower) {
            finalQuery.empower = JSON.parse(query.empower)
        }

        return await db_user
            .getDBInstance()
            .find(finalQuery)
            .select(selectFields)
            .sort({username: 1});
    }

    public async changePassword(param): Promise<boolean>{
        const db_user = this.getDBModel('User');

        const {oldPassword, password} = param;
        const username = param.username.toLowerCase();

        this.validate_password(oldPassword);
        this.validate_password(password);
        this.validate_username(username);

        if (!this.currentUser || (this.currentUser.role !== constant.USER_ROLE.ADMIN &&
            this.currentUser.username !== username)) {
            throw 'Access Denied'
        }

        const user = await db_user.findOne({username}, {reject: false});
        if(!user){
            throw 'user does not exist';
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
    ******************************************************************************************
    * Forgot/Reset Password
    *
    * The idea here is to ensure that the user gets no hint the email exists
    ******************************************************************************************
     */
    public async forgotPassword(param) {

        const {email} = param

        console.log(`forgotPassword called on email: ${email}`)

        const db_user = this.getDBModel('User');

        const userEmailMatch = await db_user.findOne({
            email: email,
            active: true
        })

        if (!userEmailMatch){
            console.error('no user matched')
            return
        }

        // add resetToken
        const resetToken = await utilCrypto.randomHexStr(8)

        await userEmailMatch.update({
            resetToken
        })

        // send email
        await mail.send({
            to: userEmailMatch.email,
            toName: `${userEmailMatch.profile.firstName} ${userEmailMatch.profile.lastName}`,
            subject: 'Cyber Republic - Password Reset',
            body: `For your convenience your username is ${userEmailMatch.username}
                <br/>
                <br/>
                Please click this link to reset your password: 
                <a href="${process.env.SERVER_URL}/reset-password?token=${resetToken}">${process.env.SERVER_URL}/reset-password?token=${resetToken}</a>`
        })

    }

    public async resetPassword(param) {

        const db_user = this.getDBModel('User');
        const {resetToken, password} = param

        this.validate_password(password);

        const userMatchedByToken = await db_user.db.findOne({
            resetToken: resetToken,
            active: true
        })

        if (!userMatchedByToken) {
            console.error(`resetToken ${resetToken} did not match user`)
            throw 'token invalid'
        }

        const result = await db_user.update({_id: userMatchedByToken._id}, {
            $set: {
                password: this.getPassword(password, userMatchedByToken.salt)
            },
            $unset: {
                resetToken: 1
            }
        });

        if (!result.nModified) {
            console.error(`resetToken ${resetToken} password update failed`)
            throw 'password update failed'
        }

        return 1
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
        return utilCrypto.sha512(password+salt);
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

        await mail.send({
            to: 'clarenceliu@elastos.org',
            subject: 'New Code Registration',
            body: `Code: ${code} -> ${email}`
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

        if (_.isEmpty(user.profile.country)) {
            return;
        }

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
