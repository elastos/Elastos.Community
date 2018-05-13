import Base from './Base';
import {Document} from 'mongoose';
import * as _ from 'lodash';
import {constant} from '../constant';
import {validate, crypto} from '../utility';

const {Role} = constant;
interface RegisterNewUserParam {
    username: string;
    password: string;

    profile?: {
        email?: string;
        name?: string;
        avatar?: string;
        birth?: any,
        timezone?: string,
        region?: {
            country?: string,
            city?: string
        }
    };
}

export default class extends Base {
    public async registerNewUser(param): Promise<Document>{
        const db_user = this.getDBModel('User');

        this.validate_username(param.username);
        this.validate_password(param.password);
        this.validate_email(param.email);

        const doc = {
            username : param.username,
            password : crypto.sha512(param.password),
            profile : {
                name : param.name,
                email : param.email,
                country : param.country,
                city : param.city
            },
            role : Role.MEMBER
        };

        return await db_user.save(doc);
    }

    public async findUser(query): Promise<Document>{
        const db_user = this.getDBModel('User');
        return await db_user.findOne({
            username: query.username,
            password: query.password
        });
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