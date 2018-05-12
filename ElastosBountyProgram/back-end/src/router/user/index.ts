import Base from '../Base';

import login from './login';
import register from './register';
import current_user from './current_user';

export default Base.setRouter([
    {
        path : '/login',
        router : login,
        method : 'all'
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
    }
]);