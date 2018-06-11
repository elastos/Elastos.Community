import BaseRedux from '@/model/BaseRedux'

class MemberRedux extends BaseRedux {
    defineTypes () {
        return ['member']
    }

    defineDefaultState(){
        return {
            loading: false,
            focus_user: null,
            users: []
        };
    }
}

export default new MemberRedux()
