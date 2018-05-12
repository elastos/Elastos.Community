import Base from '../Base';
import UserService from '../../service/UserService';
import {crypto} from '../../utility';

export default class extends Base {
    async action(){
        const param = this.getParam();
        const userService = this.buildService(UserService);

        // TODO validate

        const password = crypto.sha512(param.password);

        const rs = await userService.registerNewUser({
            username : param.username,
            password : password
        });

        return this.result(1, rs);
    }
}