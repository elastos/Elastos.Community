import BaseService from '../model/BaseService';
import _ from 'lodash';

export default class extends BaseService {
    async login(username, password, opts={}){

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
                this.dispatch(userRedux.actions.is_login_update(true));
                resolve(true);
            }, 2000);
        });

    }

    async logout(){
        const userRedux = this.store.getRedux('user');

        return new Promise((resolve)=>{
            this.dispatch(userRedux.actions.is_login_update(false));
            this.dispatch(userRedux.actions.profile_reset());

            resolve(true);
        });
    }
}