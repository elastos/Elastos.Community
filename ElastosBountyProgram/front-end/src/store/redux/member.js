import BaseRedux from '@/model/BaseRedux'

class MemberRedux extends BaseRedux {
    defineTypes () {
        return ['member']
    }

    defineDefaultState() {
        return {
            loading: false,
            subscribing: false,
            detail: {},
            users: [],
            users_loading: false
        };
    }
}

export default new MemberRedux()
