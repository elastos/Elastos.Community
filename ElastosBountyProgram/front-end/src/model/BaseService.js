import store from '@/store';

export default class {
    constructor(){
        this.store = store;
        this.path = store.history;

        this.init();
    }

    init(){}

    dispatch(action){
        return this.store.dispatch(action);
    }

};