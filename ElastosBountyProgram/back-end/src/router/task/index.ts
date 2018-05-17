import Base from '../Base';

import get from './get';

export default Base.setRouter([
    {
        path : '/',
        router : get,
        method : 'get'
    },
    {
        path : '/:taskId',
        router : get,
        method : 'get'
    }
]);
