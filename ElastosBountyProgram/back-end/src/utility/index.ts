import * as _ from 'lodash';
import crypto from './crypto';
import validate from './validate';

export {
    crypto,
    validate
};

export const getEnv = ()=>process.env.NODE_ENV;
