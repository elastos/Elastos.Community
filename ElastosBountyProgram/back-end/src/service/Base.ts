
export default class Base {
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


    protected getService<T extends Base>(service: { new(...args): T }): T{
        return new service(this.db, this.session);
    }

}