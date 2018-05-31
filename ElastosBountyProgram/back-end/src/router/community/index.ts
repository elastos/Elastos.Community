import Base from '../Base';

import addMember from './add-member';
import removeMember from './remove-member';
import listMember from './list-member';
import get from './get';
import create from './create';
import update from './update';
import getWithCountry from './get-with-country';
import getChild from './get-child';
import deleteCommunity from './delete';

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
        router : deleteCommunity,
        method : 'delete'
    },
    {
        path : '/create',
        router : create,
        method : 'post'
    },
    {
        path : '/members/:communityId',
        router : listMember,
        method : 'get'
    },
    {
        path : '/:communityId/:userId',
        router : addMember,
        method : 'get'
    },
    {
        path : '/:communityId/:userId',
        router : removeMember,
        method : 'delete'
    },
    {
        path : '/update',
        router : update,
        method : 'put'
    },
    {
        path : '/country/:countryName',
        router : getWithCountry,
        method : 'get'
    },
    {
        path : '/parent/:communityId',
        router : getChild,
        method : 'get'
    }
]);
