import Base from '../Base';

export default class GetCommunity extends Base {
    protected needLogin = false;
    async action(){

        const communityId = this.getParam('communityId');

        if (!communityId) {
            // TODO: pass in query params later
            return await this.index()
        }
        return await this.show(communityId)
    }

    async show(communityId) {
        return this.result(1, {cummunity_id: communityId});
    }

    async index() {
        // TODO
        return this.result(1, []);
    }
}
