import store from '@/store';

export default class {
    constructor(){
        this.store = store;

        this.init();
    }

    init(){}

    dispatch(action){
        return this.store.dispatch(action);
    }
};