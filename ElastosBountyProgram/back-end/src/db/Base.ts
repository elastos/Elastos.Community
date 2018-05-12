import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import {Document} from 'mongoose';

export default abstract class {
    private db;
    private schema;
    private reject_fields:object;

    constructor(DB){
        this.schema = this.buildSchema();
        this.db = DB.model(this.getName(), this.schema);

        this.reject_fields = _.extend({
            __v : false,
            createdAt : false
        }, this.rejectFields());
    }

    private buildSchema(){
        const schema = new mongoose.Schema(_.extend({
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date
            }
        }, this.getSchema()));

        schema.pre('save', function(next){
            if(!this['updatedAt']){
                this['updatedAt'] = Date.now();
                next();
            }
        });

        return schema;
    }

    protected abstract getSchema(): mongoose.SchemaDefinition;
    protected abstract getName(): string;
    protected rejectFields(): object{
        return {};
    }

    public async save(doc: object): Promise<Document>{
        return await this.db.create(doc);
    }
    public async find(query): Promise<Document[]>{
        return await this.db.find(query, this.reject_fields);
    }

    public async findOne(query): Promise<Document>{
        return await this.db.findOne(query, this.reject_fields);
    }
}