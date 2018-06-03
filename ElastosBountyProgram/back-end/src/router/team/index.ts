import Base from '../Base';

import create from './create';
import update from './update';
import add_member from './add_member';
import list_member from './list_member';



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
        path : '/add_member',
        router : add_member,
        method : 'get'
    },
    {
        path : '/list_member',
        router : list_member,
        method : 'get'
    }
]);