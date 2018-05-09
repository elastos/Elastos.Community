import _ from 'lodash';
import type from './type';

const defaultState = {
    isLogin : false,

    login_form : {
        username : '',
        password : '',
        remember_me : true,
        loading : false
    },

    profile : {}
};

export default (state=defaultState, action)=>{
    switch(action.type){
        case type.login_form:
            return {
                ...state,
                login_form: _.merge(state.login_form, action.param)
            };
        default:
            return state;
    }
};