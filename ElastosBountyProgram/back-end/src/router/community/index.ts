import Base from '../Base';

import add_member from './add-member';
import remove_member from './remove-member';
import list_member from './list-member';
import get from './get';
import create from './create';
import update from './update';
import get_with_country from './get-with-country';
import get_child from './get-child';
import delete_community from './delete';

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
        path : '/:communityId',
        router : delete_community,
        method : 'delete'
    },
    {
        path : '/create',
        router : create,
        method : 'post'
    },
    {
        path : '/members/:communityId',
        router : list_member,
        method : 'get'
    },
    {
        path : '/:communityId/:userId',
        router : add_member,
        method : 'get'
    },
    {
        path : '/:communityId/:userId',
        router : remove_member,
        method : 'delete'
    },
    {
        path : '/update',
        router : update,
        method : 'put'
    },
    {
        path : '/country/:countryName',
        router : get_with_country,
        method : 'get'
    },
    {
        path : '/parent/:communityId',
        router : get_child,
        method : 'get'
    }
]);
