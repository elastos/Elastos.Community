import Base from '../Base';

import login from './login';

export default Base.setRouter([
    {
        path : '/login',
        router : login,
        method : 'all'
    }
]);