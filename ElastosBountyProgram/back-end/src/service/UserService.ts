import Base from './Base';
import {Document} from 'mongoose';
import * as _ from 'lodash';

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
    public async registerNewUser(opts: RegisterNewUserParam): Promise<Document>{
        const db_user = this.getDBModel('User');
        const doc = _.merge({
            username : opts.username,
            password : opts.password,
            profile : opts.profile
        }, opts);

        return await db_user.save(doc);
    }
}