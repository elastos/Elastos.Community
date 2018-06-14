import Base from '../Base';

import get from './get';
import create from './create';
import list from './list';
import update from './update';
import comment from './comment';

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
        path : '/:submissionId',
        router : get,
        method : 'get'
    },
    {
        path : '/:submissionId',
        router : update,
        method : 'put'
    },
    {
        path : '/:id/comment',
        router : comment,
        method : 'post'
    }
]);
