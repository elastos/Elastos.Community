import Base from '../Base';

import login from './login';
import register from './register';

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
    }
]);