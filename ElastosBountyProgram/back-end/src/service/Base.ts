export default class {
    protected db;
    private session;
    protected currentUser;

    constructor(db, session){
        this.db = db;
        this.session = session;
        this.currentUser = session.user;

        this.init();
    }

    protected init(){}

    public getDBModel(name: string){
        return this.db.getModel(name);
    }

    public getService(service){
        return new service(this.db, this.session);
    }

}