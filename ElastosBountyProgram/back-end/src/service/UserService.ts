import Base from './Base';
import {Document} from 'mongoose';
import * as _ from 'lodash';
import {constant} from '../constant';
import {validate, crypto, uuid, mail} from '../utility';

const {USER_ROLE} = constant;

const restrictedFields = {
    update: [
        '_id',
        'username',
        'role',
        'profile'
    ]
}

export default class extends Base {
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
            role : USER_ROLE.MEMBER,
            active: true
        };

        return await db_user.save(doc);
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

        const user = await db_user.findById(userId)

        if (!user) {
            throw `userId: ${userId} not found`
        }

        if (param.profile) {
            updateObj.profile = Object.assign(user.profile, param.profile)
        }

        if (param.email) {
            updateObj.email = param.email
        }

        if (param.username) {
            updateObj.username = param.username
        }

        await db_user.update({_id: userId}, updateObj)

        return db_user.findById(userId)
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
        return await db_user.find({
            active : true
        });
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
}
