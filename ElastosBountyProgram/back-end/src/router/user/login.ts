import Base from '../Base';
import UserService from '../../service/UserService';
import {crypto, validate} from '../../utility';
import * as moment from 'moment';

export default class extends Base {
    async action(){
        const userService = this.buildService(UserService);

        const {username, password, remember} = this.getParam();

        if(!validate.username(username)){
            throw 'invalid username';
        }
        if(!validate.password(password)){
            throw 'invalid password';
        }

        const pwd = crypto.sha512(password);
        const user = await userService.findUser({
            username,
            password : pwd
        });
        if(!user){
            throw 'username or password is incorrect';
        }

        const resultData = {
            user
        };

        if(remember){
            this.session.userId = user.id;
            resultData['api-token'] = crypto.encrypt(JSON.stringify({
                userId : user.id,
                expired : moment().add(30, 'd').unix()
            }));
        }

        return this.result(1, resultData);
    }
}