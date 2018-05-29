import Base from '../Base';

import get from './get';
import create from './create';
import list from './list';

export default Base.setRouter([

    {
        path : '/create',
        router : create,
        method : 'post'
    },
    {
        path : '/list',
        router : list,
        method : 'get'
    },
    {
        path : '/:taskId',
        router : get,
        method : 'get'
    }
]);
