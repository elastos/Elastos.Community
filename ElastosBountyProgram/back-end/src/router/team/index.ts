import Base from '../Base';

import create from './create';
import update from './update';
import add_candidate from './add_candidate';
import action from './action';
import get from './get';
import list from './list'


export default Base.setRouter([
    {
        path : '/create',
        router : create,
        method : 'post'
    },
    {
        path : '/update',
        router : update,
        method : 'post'
    },
    {
        path : '/addCandidate',
        router : add_candidate,
        method : 'post'
    },
    {
        path : '/action/:action',
        router : action,
        method : 'get'
    },
    {
        path : '/list',
        router : list,
        method : 'get'
    },
    {
        path : '/:teamId',
        router : get,
        method : 'get'
    }
]);
