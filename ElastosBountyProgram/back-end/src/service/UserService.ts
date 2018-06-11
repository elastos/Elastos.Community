import Base from './Base';
import {Document} from 'mongoose';
import * as _ from 'lodash';
import {constant} from '../constant';
import {validate, crypto, uuid} from '../utility';

const {USER_ROLE} = constant;

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

    public async update(param): Promise<Document>{
        const db_user = this.getDBModel('User');

        const doc = {
            profile : {
                firstName : param.firstName,
                lastName : param.lastName,
                country : param.country,
                state : param.state,
                city : param.city,
                avatar : param.avatar,
                gender : param.gender,
                beOrganizer : param.beOrganizer === 'yes',
                isDeveloper : param.isDeveloper === 'yes',
                source : param.source,
                walletAddress: param.walletAddress
            }
        };

        return await db_user.update({_id: this.currentUser._id}, doc);
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
        if(!validate.valid_string(username, 5)){
            throw 'invalid username';
        }
    }
    public validate_password(password){
        if(!validate.valid_string(password, 6)){
            throw 'invalid password';
        }
    }
    public validate_email(email){
        if(!validate.email(email)){
            throw 'invalid email';
        }
    }
}
