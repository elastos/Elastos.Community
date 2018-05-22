import Base from '../Base';

import get from './get';
import create from './create';
import update from './update';
import getWithCountry from './get-with-country';
import getChild from './get-child';

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
