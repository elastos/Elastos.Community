export default class {
    protected db;

    constructor(db){
        this.db = db;

        this.init();
    }

    protected init(){}

    protected getDBModel(name: string){
        return this.db.getModel(name);
    }
}