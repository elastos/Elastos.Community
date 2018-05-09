import BaseService from '../model/BaseService';
import _ from 'lodash';

export default class extends BaseService {
    async login(username, password, opts={}){
        // const userAction = this.store.actions.user;
        const userRedux = this.store.getRedux('user');

        // login
        this.dispatch(userRedux.actions.login_form_update({
            username,
            password,
            remember_me : opts.remember || false,
            loading : true
        }));

        return new Promise((resolve)=>{
            _.delay(()=>{

                this.dispatch(userRedux.actions.login_form_reset());
                resolve(true);
            }, 2000);
        });

    }
}