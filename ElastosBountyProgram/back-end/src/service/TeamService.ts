import Base from './Base';
import {Document} from 'mongoose';
import * as _ from 'lodash';
import {validate} from '../utility';
import {constant} from '../constant';

export default class extends Base {
    public async create(param): Promise<Document>{
        const db_team = this.getDBModel('Team');

        // validate
        this.validate_name(param.name);

        const doc = {
            name : param.name,
            type : param.type,
            metadata : this.param_metadata(param.metadata),
            tags : this.param_tags(param.tags),
            profile : {
                logo : param.logo,
                images : param.images,
                description : param.description,
                createTime : Date.now()
            },
            members : [
                {
                    userId : this.currentUser._id,
                    level : '',
                    role : constant.TeamRole.OWNER
                }
            ],
            owner : this.currentUser._id
        };

        console.log('create team => ', doc);
        return await db_team.save(doc);
    }

    public validate_name(name){
        if(!validate.valid_string(name, 4)){
            throw 'invalid team name';
        }
    }
    public param_metadata(meta: string){
        const rs = {};
        if(meta){
            const list = meta.split(',');

            _.each(list, (str)=>{
                const tmp = str.split('|');
                if(tmp.length === 2){
                    rs[tmp[0]] = tmp[1];
                }
            });
        }
        return rs;
    }
    public param_tags(tags: string){
        let rs = [];
        if(tags){
            rs = tags.split(',');
        }
        return rs;
    }
}