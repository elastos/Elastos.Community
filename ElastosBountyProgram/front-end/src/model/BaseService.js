import store from '@/store';

export default class {
    constructor(){
        this.store = store;
        this.path = store.history;

        this.init();
    }

    init(){
        let isLogout = !localStorage.getItem('api-token') && sessionStorage.getItem('api-token')
        if (isLogout) {
            this.path.go(0)
        }
    }

    dispatch(action){
        return this.store.dispatch(action);
    }

};