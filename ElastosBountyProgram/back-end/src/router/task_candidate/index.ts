import Base from '../Base';

import comment from './comment';
import get from './get';

export default Base.setRouter([
    {
        path : '/:id',
        router : get,
        method : 'get'
    },
    {
        path : '/:id/comment',
        router : comment,
        method : 'post'
    }
]);
