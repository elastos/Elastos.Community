import Base from '../Base';

import login from './login';
import register from './register';
import current_user from './current_user';
import change_password from './change_password';

export default Base.setRouter([
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
