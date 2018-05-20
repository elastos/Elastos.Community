import Base from '../Base';

import login from './login';
import reauth from './reauth';
import register from './register';
import current_user from './current_user';
import change_password from './change_password';

export default Base.setRouter([
    {
        path : '/reauth',
        router : reauth,
        method : 'get'
    },
    {
        path : '/login',
        router : login,
        method : 'get'
    },
    {
        path : '/register',
        router : register,
        method : 'post'
    },
    {
        path : '/current_user',
        router : current_user,
        method : 'get'
    },
    {
        path : '/change_password',
        router : change_password,
        method : 'get'
    }
]);
