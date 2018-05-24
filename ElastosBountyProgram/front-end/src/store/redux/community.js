import BaseRedux from '@/model/BaseRedux'

class CommunityRedux extends BaseRedux {
    defineTypes () {
        return ['community']
    }
    
    defineDefaultState(){
        return {
            all_leaders: [],
            country_leaders: []
        };
    }
}

export default new CommunityRedux()
