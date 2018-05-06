import * as mongoose from 'mongoose';

export default abstract class {
    private db;
    constructor(DB){
        const schema = new mongoose.Schema(this.getSchema());

        this.db = DB.model(this.getName(), schema);
    }

    protected abstract getSchema(): mongoose.SchemaDefinition
    protected abstract getName(): string

    public async save(doc: object){
        return await this.db.create(doc);
    }
    public async find(query){
        return await this.db.find(query);
    }
};