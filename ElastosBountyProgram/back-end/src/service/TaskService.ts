import Base from './Base';
import {Document} from 'mongoose';
import * as _ from 'lodash';
import {constant} from '../constant';
import {validate, crypto} from '../utility';
import UserService from "./UserService";

export default class extends Base {

    /**
     * This also handles creating sub tasks, if it's sub task
     * the parentTaskId must be set, and the user must be owner of the parent task
     *
     * Also check that the ELA reward is less than the parent task reward (v1.5)
     *
     * @param param
     * @returns {Promise<"mongoose".Document>}
     */
    public async create(param): Promise<Document> {
        const {
            name, description, communityId, type, startTime, endTime,
            candidateLimit, candidateSltLimit, reward_ela, reward_votePower
        } = param;
        this.validate_name(name);
        this.validate_description(description);
        this.validate_type(type);
        this.validate_reward_ela(reward_ela);
        this.validate_reward_votePower(reward_votePower);

        const doc = {
            name, description, type,
            startTime,
            endTime,
            candidateLimit,
            candidateSltLimit,
            reward : {
                ela : {
                    amount : reward_ela
                },
                votePower : {
                    amount : reward_votePower
                }
            },
            status : constant.TASK_STATUS.CREATED,
            createdBy : this.currentUser._id
        };
        if(communityId){
            doc['communityId'] = communityId;
        }

        // if member role, could not create
        const role = this.currentUser.role;
        if(role === constant.USER_ROLE.MEMBER){
            throw 'member could not create task';
        }

        if(type === constant.TASK_TYPE.EVENT){
            const userService = this.getService(UserService);
            if(reward_ela > userService.getSumElaBudget(this.currentUser.elaBudget)){
                throw 'ela reward could not greater than user budget';
            }
        }

        const db_task = this.getDBModel('Task');

        console.log('create task => ', doc);
        return await db_task.save(doc);
    }

    /**
     * Changing a task's reward/upfront after approval is only allowed by admins/council
     *
     * @param param
     * @returns {Promise<boolean>}
     */
    public async update(param): Promise<boolean> {
        const {id, name, description, communityId, type, startTime, endTime, candidateLimit, reward_ela, reward_votePower} = param;
        this.validate_name(name);
        this.validate_description(description);
        this.validate_type(type);
        this.validate_reward_ela(reward_ela);
        this.validate_reward_votePower(reward_votePower);


        return true;
    }

    /**
     * We should only ever set deleted flag
     *
     * @param param
     * @returns {Promise<boolean>}
     */
    public async remove(param): Promise<boolean> {
        return true;
    }

    /**
     * Only an admin/council role may approve the task
     *
     * @param param
     * @returns {Promise<boolean>}
     */
    public async approve(param): Promise<any> {
        const {id} = param;

        const role = this.currentUser.role;
        if(!_.includes([constant.USER_ROLE.ADMIN, constant.USER_ROLE.COUNCIL], role)){
            throw 'no permission to approve task';
        }

        const db_task = this.getDBModel('Task');
        const rs =  await db_task.update({_id : id}, {
            $set : {
                status : constant.TASK_STATUS.APPROVED
            }
        });
        console.log('approve task =>', rs);
        return rs;
    }

    /*
    * candidate could be user or team
    *
    * */
    public async addCandidate(param): Promise<boolean> {
        const {teamId, userId, taskId} = param;
        const doc: any = {
            taskId
        };
        if(teamId){
            doc.teamId = teamId;
            const db_team = this.getDBModel('Team');
            const team = await db_team.findOne({_id: teamId});
            if(!team){
                throw 'invalid team id';
            }
            doc.type = constant.TASK_CANDIDATE_TYPE.TEAM;
        }
        else if(userId){
            doc.userId = userId;
            const db_user = this.getDBModel('User');
            const user = await db_user.findOne({_id: userId});
            if(!user){
                throw 'invalid user id';
            }
            doc.type = constant.TASK_CANDIDATE_TYPE.USER;
        }
        else{
            throw 'no user id and team id';
        }

        const db_tc = this.getDBModel('Task_Candidate');
        if(await db_tc.findOne(doc)){
            throw 'candidate is exist';
        }

        doc.status = constant.TASK_CANDIDATE_STATUS.PENDING;

        const db_task = this.getDBModel('Task');
        const task = await db_task.findOne({_id: taskId});
        if(!task){
            throw 'invalid task id';
        }

        // check limit
        const total = await db_tc.count({taskId});
        if(total >= task.candidateLimit){
            throw 'candidate amount is up to limit';
        }

        console.log('add task candidate =>', doc);
        return await db_tc.save(doc);
    }

    /**
     * You can either be the candidate or the task owner, or admin/council
     * @param param
     * @returns {Promise<boolean>}
     */
    public async removeCandidate(param): Promise<boolean> {
        const {taskId, userId, teamId} = param;

        const doc: any = {
            taskId
        };
        if(teamId){
            doc.teamId = teamId;
            doc.type = constant.TASK_CANDIDATE_TYPE.TEAM;
        }
        else if(userId){
            doc.userId = userId;
            doc.type = constant.TASK_CANDIDATE_TYPE.USER;
        }
        else{
            throw 'no user id and team id';
        }

        const db_task = this.getDBModel('Task');
        const task = await db_task.findOne({_id: taskId});
        if(!task){
            throw 'invalid task id';
        }

        const role = this.currentUser.role;
        const cid = this.currentUser._id;

        // TODO add check for team
        if(!(
            _.includes([constant.USER_ROLE.ADMIN, constant.USER_ROLE.COUNCIL], role) ||
            cid === task.createdBy ||
            (userId && userId === cid)
        )){
            throw 'no permission to remove candidate';
        }

        const db_tc = this.getDBModel('Task_Candidate');
        console.log('remove task candidate =>', doc);
        return await db_tc.remove(doc);
    }

    /**
     * approve a candidate by admin or council
     *
     *
     */
    public async approveCandidate(param): Promise<boolean> {
        return true;
    }

    public async rejectCandidate(param): Promise<boolean> {
        return true;
    }


    public validate_name(name){
        if(!validate.valid_string(name, 4)){
            throw 'invalid task name';
        }
    }
    public validate_description(description){
        if(!validate.valid_string(description, 1)){
            throw 'invalid task description';
        }
    }
    public validate_type(type){
        if(!type){
            throw 'task type is empty';
        }
        if(!_.includes(constant.TASK_TYPE, type)){
            throw 'task type is not valid';
        }
    }

    public validate_reward_ela(ela){
        // TODO check current user has enough ela or not.
    }
    public validate_reward_votePower(votePower){
        // TODO check current user has enough votePower or not.
    }


}
