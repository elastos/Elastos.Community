import Base from '../Base';
import CommunityService from '../../service/CommunityService';
import {constant} from '../../constant';

export default class extends Base {
    protected needLogin = false;
    async action(){
        console.log('xxxxxxxxxxxx');
        const communityId = this.getParam('communityId');

        return await this.show(communityId);
    }

    async show(communityId) {
        const communityService = this.buildService(CommunityService);
        const rs = await communityService.listMember(this.getParam());

        return this.result(1, rs);
    }
}
