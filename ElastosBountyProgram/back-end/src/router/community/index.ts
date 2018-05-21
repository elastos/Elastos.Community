import Base from '../Base';

import get from './get';
import create from './create';
import update from './update';

export default Base.setRouter([
    {
        path : '/',
        router : get,
        method : 'get'
    },
    {
        path : '/:communityId',
        router : get,
        method : 'get'
    },
    {
        path : '/create',
        router : create,
        method : 'post'
    },
    {
        path : '/update',
        router : update,
        method : 'put'
    }
]);
