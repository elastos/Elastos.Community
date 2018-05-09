import BaseService from '../model/BaseService';

export default class extends BaseService {
    async login(username, password, opts={}){
        const userAction = this.store.actions.user;

        // login
        this.dispatch(userAction.login_form({
            username,
            password,
            remember_me : opts.remember || false,
            loading : true
        }));

    }
}