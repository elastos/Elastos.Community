import Base from '../Base';
import UserService from '../../service/UserService';
import {crypto} from '../../utility';
import * as moment from 'moment';

export default class extends Base {

    async action(){
        const userService = this.buildService(UserService);

        const {username, password, remember} = this.getParam();

        userService.validate_username(username);
        userService.validate_password(password);

        // first get user for salt
        const salt = await userService.getUserSalt(username);

        // password is passed in as is sha512
        const pwd = userService.getPassword(password, salt);

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

        // always return api-token on login, this is needed for future requests
        this.session.userId = user.id;
        resultData['api-token'] = crypto.encrypt(JSON.stringify({
            userId : user.id,
            expired : moment().add(30, 'd').unix()
        }));

        return this.result(1, resultData);
    }
}
