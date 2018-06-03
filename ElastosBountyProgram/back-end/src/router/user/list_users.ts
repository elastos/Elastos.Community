import Base from '../Base';
import UserService from '../../service/UserService';
import {constant} from '../../constant';

export default class extends Base {
    protected needLogin = false;
    async action(){

        const userIds = this.getParam('userIds');

        if (userIds) {
            return await this.show(userIds);
        } else {
            return await this.listUser();
        }
    }

    async show(userIds) {
        const userService = this.buildService(UserService);

        const arrayIds = this.getUserIds(userIds);
        const users = await userService.findUsers({
            userIds : arrayIds
        });

        return this.result(1, users);
    }

    async listUser() {
        console.log('xxx');
        const userService = this.buildService(UserService);
        const users = await userService.findAll();

        return this.result(1, users);
    }

    getUserIds(userIds: string) {
        let rs = [];
        if(userIds){
            rs = userIds.split(',');
        }
        return rs;
    }
}
