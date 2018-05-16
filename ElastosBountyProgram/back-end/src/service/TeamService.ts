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

    public async addMember(param): Promise<boolean>{
        const {userId, teamId, level, role, title} = param;

        const db_team = this.getDBModel('Team');
        const db_user_team = this.getDBModel('User_Team');

        const current = this.currentUser;
        if(current._id === userId){
            throw 'could not add yourself to team';
        }

        const tmp = await db_team.findOne({
            _id: teamId,
            'members.userId' : userId
        });
        if(tmp){
            throw 'user is exist';
        }

        const x = await db_team.update({_id: teamId}, {
            $addToSet : {
                members : {
                    userId,
                    level,
                    role: role || constant.TeamRole.MEMBER,
                    title
                }
            }
        });
        if(x.n === 1){
            await db_user_team.save({
                userId, teamId
            });
        }

        return true;
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