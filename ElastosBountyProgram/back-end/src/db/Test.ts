import * as mongoose from 'mongoose';

export default class {
    private db;
    constructor(DB){
        const schema = new mongoose.Schema(this.getSchema());

        this.db = DB.model('Test', schema);
    }

    getSchema(){
        return {
            name : String,
            age : Number,
            time : Date
        };
    }

    async save(doc: object){
        return await this.db.create(doc);
    }
    async find(query){
        return await this.db.find(query);
    }
};