import BaseRedux from '@/model/BaseRedux';

class UserRedux extends BaseRedux {
    defineTypes() {
        return ['user'];
    }

    defineDefaultState() {
        return {
            loading: false,

            is_login: false,
            is_leader: false,
            is_admin: false,

            email: '',
            username: '',

            role: '',

            login_form: {
                username: '',
                password: '',
                loading: false
            },

            register_form: {
                step: 1,
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },

            profile: {

            },
            current_user_id: null,

            teams: []
        };
    }
}

export default new UserRedux()
