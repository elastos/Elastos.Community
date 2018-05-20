import Base from '../Base';
import UserService from '../../service/UserService';
import {crypto} from '../../utility';
import * as moment from 'moment';
import db from "../../db";

/**
 * Web calls this on app start up to auto-login with apiToken
 */
export default class extends Base {

    async action(){
        const userService = this.buildService(UserService);

        const {apiToken} = this.getParam();

        const json = JSON.parse(crypto.decrypt(apiToken.toString()));

        if (json.userId && json.expired && (json.expired - moment().unix() > 0)){
            const DB = await db.create()

            const user = await DB.getModel('User').findOne({_id: json.userId})

            if (!user) {
                return
            }

            const resultData = {
                user
            }

            this.session.user = user;
            this.session.userId = user.id;

            // pass back an updated api-token with expiry pushed back
            resultData['api-token'] = crypto.encrypt(JSON.stringify({
                userId : user.id,
                expired : moment().add(30, 'd').unix()
            }));

            return this.result(1, resultData);
        }

    }
}
