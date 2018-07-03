import BaseRedux from '@/model/BaseRedux'

class CommunityRedux extends BaseRedux {
    defineTypes () {
        return ['community']
    }

    defineDefaultState(){
        return {
            loading: true,
            my_communities: []
        };
    }
}

export default new CommunityRedux()
