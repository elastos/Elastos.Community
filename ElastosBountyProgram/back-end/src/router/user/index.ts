import Base from '../Base';

import login from './login';
import register from './register';
import current_user from './current_user';
import change_password from './change_password';
import list_users from './list_users';

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
    },
    {
        path : '/:userIds/users',
        router : list_users,
        method : 'get'
    },
    {
        path : '/list',
        router : list_users,
        method : 'get'
    }
]);
