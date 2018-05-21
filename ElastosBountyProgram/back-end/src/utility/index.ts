import * as _ from 'lodash';
import crypto from './crypto';
import validate from './validate';
import * as _uuid from 'uuid';

export {
    crypto,
    validate
};

export const getEnv = ()=>process.env.NODE_ENV;

export const uuid = ()=>{
    return _uuid.v4();
};
