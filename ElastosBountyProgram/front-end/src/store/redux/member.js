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
            users: []
        };
    }
}

export default new MemberRedux()
