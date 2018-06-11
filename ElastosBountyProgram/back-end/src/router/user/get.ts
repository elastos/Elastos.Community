import Base from '../Base';
import UserService from '../../service/UserService';

/**
 * Both the '/' and '/:taskId' routes map to this class
 */
export default class GetUser extends Base {

    async action(){

        const userService = this.buildService(UserService);
        const rs = await userService.show(this.getParam());
        return this.result(1, rs);
    }
}
