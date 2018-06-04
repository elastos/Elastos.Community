import Base from '../Base';
import CommunityService from '../../service/CommunityService';
import {constant} from '../../constant';

export default class extends Base {
    protected needLogin = false;

    async action(){
        return await this.show();
    }

    async show(){
        const communityService = this.buildService(CommunityService);
        const rs = await communityService.index({});

        return this.result(1, rs);
    }
}
