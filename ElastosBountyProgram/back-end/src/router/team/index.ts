import Base from '../Base';

import create from './create';
import update from './update';
import apply_add_team from './apply_add_team';
import action from './action';
import get from './get';
import list from './list';


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
        path : '/apply_add_team',
        router : apply_add_team,
        method : 'get'
    },
    {
        path : '/action/:action',
        router : action,
        method : 'get'
    },
    {
        path : '/get',
        router : get,
        method : 'get'
    },
    {
        path : '/list',
        router : list,
        method : 'get'
    }
]);