import BaseRedux from '@/model/BaseRedux';

class UserRedux extends BaseRedux {
    defineTypes() {
        return ['user'];
    }

    defineDefaultState() {
        return {
            is_login: false,
            is_admin: false,

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

            }
        };
    }
}

export default new UserRedux()
