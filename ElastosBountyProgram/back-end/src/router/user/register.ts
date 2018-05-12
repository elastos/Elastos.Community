import Base from '../Base';
import UserService from '../../service/UserService';
import {crypto, validate} from '../../utility';

export default class extends Base {
    async action(){
        const param = this.getParam();
        const userService = this.buildService(UserService);

        // TODO validate
        if(!validate.username(param.username)){
            throw 'invalid username';
        }
        if(!validate.password(param.password)){
            throw 'invalid password';
        }
        if(param.email && !validate.email(param.email)){
            throw 'invalid email';
        }

        const password = crypto.sha512(param.password);

        const profile = {
            name : param.name,
            email : param.email,
            region : {
                country : param.country,
                city : param.city
            }
        };

        const rs = await userService.registerNewUser({
            username : param.username,
            password : password,
            profile
        });

        return this.result(1, rs);
    }
}