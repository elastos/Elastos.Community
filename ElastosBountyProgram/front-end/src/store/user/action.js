import type from './type';

export default {
    login_form(param){
        return {
            type: type.login_form,
            param
        };
    }
};