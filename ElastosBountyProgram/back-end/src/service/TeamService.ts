import Base from './Base';
import {Document, Types} from 'mongoose';
import * as _ from 'lodash';
import {validate} from '../utility';
import {constant} from '../constant';

export default class extends Base {
    public async create(param): Promise<Document>{
        const db_team = this.getDBModel('Team');
        const db_user_team = this.getDBModel("User_Team");

        // validate
        this.validate_name(param.name);
        this.validate_type(param.type);

        const doc = {
            name : param.name,
            type : param.type,
            metadata : this.param_metadata(param.metadata),
            tags : this.param_tags(param.tags),
            profile : {
                logo : param.logo,
                description : param.description
            },
            recruiting : true,
            owner : this.currentUser._id
        };

        console.log('create team => ', doc);
        const res = await db_team.save(doc);

        // save to user team
        const doc_user_team = {
            userId : this.currentUser._id,
            teamId : res._id,
            status : constant.TEAM_USER_STATUS.NORMAL,
            role : constant.TEAM_ROLE.LEADER
        };

        console.log('create user_team => ', doc_user_team);
        const res1 = await db_user_team.save(doc_user_team);

        return res;
    }

    public async update(param): Promise<Document>{
        const db_team = this.getDBModel('Team');
        const team_doc = await db_team.findById(param.id, {
            updatedAt: false
        });
        if(!team_doc){
            throw 'invalid team id';
        }

        const doc = _.merge(team_doc, {
            name : param.name,
            type : param.type,
            metadata : this.param_metadata(param.metadata),
            tags : this.param_tags(param.tags),
            profile : {
                logo : param.logo,
                description : param.description
            },
            recruiting : param.recruiting
        });

        // validate
        this.validate_name(doc.name);
        this.validate_type(doc.type);

        console.log('update team =>', doc);
        const res = await db_team.update({_id: param.id}, doc);
        return res;
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
                    role: role || constant.TEAM_ROLE.MEMBER,
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

    public async listMember(param): Promise<Document[]>{
        const {teamId} = param;
        const db_team = this.getDBModel('Team');
        const aggregate = db_team.getAggregate();

        const rs = await aggregate.match({_id : Types.ObjectId(teamId)})
            .unwind('$members')
            .lookup({
                from : 'users',
                localField : 'members.userId',
                foreignField : '_id',
                as : 'members.user'
            })
            .unwind('$members.user')
            .group({
                _id : '$_id',
                list : {
                    $push : '$members'
                }
            })
            .project({'list.user.password' : 0, 'list._id' : 0});

        return rs[0].list;
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
    public validate_type(type){
        if(!type || !_.includes(constant.TEAM_TYPE, type)){
            throw 'invalid team type';
        }
    }
}
