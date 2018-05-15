import BaseRedux from '@/model/BaseRedux';

class UserRedux extends BaseRedux {
    defineTypes() {
        return ['user'];
    }

    defineDefaultState() {
        return {
            is_login: false,

            login_form: {
                username: '',
                password: '',
                remember_me: true,
                loading: false
            },

            register_form: {
                username: '',
                email: '',
                password: ''
            },

            profile: {
                name: 'Jacky.Li'
            }
        };
    }
}

export default new UserRedux()
