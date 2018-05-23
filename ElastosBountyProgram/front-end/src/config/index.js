import _ from 'lodash';
import router from './router';
import data from './data';

export default {
    data,
    router,
    ...process.env
};