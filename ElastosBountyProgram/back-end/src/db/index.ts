import DB from './DB';

let db:DB = null;
export default class {
    static async create(){
        if(!db){
            db = new DB();
            await db.start();
        }
        return db;
    }

}