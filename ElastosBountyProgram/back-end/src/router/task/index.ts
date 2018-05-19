import Base from '../Base';

import get from './get';
import create from './create';

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
    },
    {
        path : '/create',
        router : create,
        method : 'post'
    }
]);
