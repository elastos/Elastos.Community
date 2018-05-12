import Base from './Base';
import {Document} from 'mongoose';
import * as _ from 'lodash';
import {validate} from '../utility';

export default class extends Base {
    public async create(param): Promise<Document>{
        const db_team = this.getDBModel('Team');

        // validate
        this.validate_name(param.name);

        const doc = {
            name : param.name,
            type : param.type,
            metadata : param.metadata || {},
            tags : param.tags,
            profile : {
                logo : param.logo,
                description : param.description,
                createTime : Date.now()
            },
            owner : this.currentUser._id
        };

        return await db_team.save(doc);
    }

    private validate_name(name){
        if(!validate.valid_string(name, 4)){
            throw 'invalid team name';
        }
    }
}