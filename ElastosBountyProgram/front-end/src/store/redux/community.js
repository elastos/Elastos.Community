import BaseRedux from '@/model/BaseRedux'

class CommunityRedux extends BaseRedux {
    defineTypes () {
        return ['community']
    }
    
    defineDefaultState(){
        return {
        };
    }
}

export default new CommunityRedux()
