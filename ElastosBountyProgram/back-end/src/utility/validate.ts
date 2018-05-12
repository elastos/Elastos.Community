import * as _ from 'lodash';
import * as validator from 'validator';

const F = {
    email(email){
        return validator.isEmail(email);
    },

    username(name){
        if(!name) return false;
        const len = name.length;
        if(len < 5) return false;

        return true;
    },

    password(pwd){
        if(!pwd || pwd.length < 6) return false;

        return true;
    }
};

export default F;