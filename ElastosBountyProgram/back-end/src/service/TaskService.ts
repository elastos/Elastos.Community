import Base from './Base';
import {Document, Types} from 'mongoose';
import * as _ from 'lodash';
import {constant} from '../constant';
import {validate, crypto} from '../utility';
import UserService from "./UserService";

const ObjectId = Types.ObjectId;

const restrictedFields = {
    update: [
        '_id',
        'taskId',
        'status',
        'password'
    ]
}

export default class extends Base {

    public async show(param): Promise<Document> {
        const db_task = this.getDBModel('Task');
        const db_task_candidate = this.getDBModel('Task_Candidate');

        const task = await db_task.getDBInstance().findOne({_id: param.taskId})
            .populate('candidates')
            .populate('createdBy')
            .populate('approvedBy')
            .populate('community')
            .populate('communityParent')

        for (let candidate of task.candidates) {
            await db_task_candidate.getDBInstance().populate(candidate, ['user', 'team'])
        }

        return task
    }

    public async list(query): Promise<Document> {
        const db_task = this.getDBModel('Task');
        const tasks = await db_task.list(query, {
            updatedAt: -1
        });

        for (let task of tasks) {
            await db_task.getDBInstance().populate(task, ['candidates', 'createdBy', 'approvedBy', 'community', 'communityParent'])
        }

        // so far we are not populating the taskCandidates

        return tasks
    }

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
            name, description, thumbnail, community, communityParent, category, type, startTime, endTime,
            candidateLimit, candidateSltLimit, rewardUpfront, reward
        } = param;
        this.validate_name(name);
        this.validate_description(description);
        this.validate_type(type);
        // this.validate_reward_ela(reward_ela);
        // this.validate_reward_votePower(reward_votePower);

        const doc = {
            name, description, category, type,
            startTime,
            endTime,
            thumbnail,
            candidateLimit,
            candidateSltLimit,
            rewardUpfront: {
                ela: rewardUpfront.ela
            },
            reward : {
                ela : reward.ela,
                votePower : reward.votePower
            },
            status : constant.TASK_STATUS.CREATED,
            createdBy : this.currentUser._id
        };
        if(community){
            doc['community'] = community;
        }

        if(communityParent){
            doc['communityParent'] = communityParent;
        }

        // if member role, could not create
        const role = this.currentUser.role;
        if(role === constant.USER_ROLE.MEMBER){
            throw 'member could not create task';
        }

        if(type === constant.TASK_TYPE.EVENT){
            const userService = this.getService(UserService);
            if(reward.ela > userService.getSumElaBudget(this.currentUser.elaBudget)){
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

        const {id, name, description, community, communityParent, type, startTime, endTime, candidateLimit, reward, rewardUpfront} = param;

        // explictly copy over fields, do not accept param as is
        const updateObj:any = _.omit(param, restrictedFields.update)

        // only allow updating these fields if user is admin
        if (this.currentUser.role === constant.USER_ROLE.ADMIN) {

            if (param.status) {
                updateObj.status = param.status

                if (param.status === constant.TASK_STATUS.APPROVED) {
                    updateObj.approvedBy = this.currentUser._id
                }
            }
        }

        const db_task = this.getDBModel('Task');

        await db_task.update({_id: param.taskId}, updateObj)

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
        const {teamId, userId, taskId, applyMsg} = param;
        const doc: any = {
            task: taskId,
            applyMsg
        };

        if(teamId){
            doc.team = teamId;
            const db_team = this.getDBModel('Team');
            const team = await db_team.findOne({_id: teamId});
            if(!team){
                throw 'invalid team id';
            }
            doc.type = constant.TASK_CANDIDATE_TYPE.TEAM;
        }
        else if(userId){
            doc.user = userId;
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
        const taskCandidate = await db_tc.save(doc);

        // add the candidate to the task too
        if (task.candidates && task.candidates.length) {
            task.candidates.push(taskCandidate._id)
        } else {
            task.candidates = [taskCandidate._id]
        }

        await task.save()

        // populate the taskCandidate
        await db_tc.db.populate(taskCandidate, ['user', 'team'])

        return taskCandidate
    }

    /**
     * You can either be the candidate or the task owner, or admin/council
     * @param param
     * @returns {Promise<boolean>}
     */
    public async removeCandidate(param): Promise<boolean> {
        const {taskCandidateId} = param;

        // TODO: permission checks

        // TODO: check max applicants

        const doc = {
            _id: taskCandidateId
        }

        const db_tc = this.getDBModel('Task_Candidate');
        await db_tc.remove(doc);

        const db_task = this.getDBModel('Task');
        const task = await db_task.findOne({_id: taskId});
        if(!task){
            throw 'invalid task id';
        }

        await db_task.db.update({
            _id: task._id
        }, {
            $pull: {
                candidates: new ObjectId(taskCandidateId)
            }
        })

        console.log('remove task candidate =>', doc);

        return true

        /*
        // TODO: add this back in for permission checks
        const doc: any = {
            taskId,
            applyMsg
        };
        if(teamId){
            doc.teamId = teamId;
            doc.type = constant.TASK_CANDIDATE_TYPE.TEAM;`
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
        */
    }

    /**
     * approve a candidate by admin or organizer
     *
     *
     */
    public async acceptCandidate(param): Promise<boolean> {
        const db_tc = this.getDBModel('Task_Candidate');
        return await db_tc.update({
            _id: param.taskCandidateId
        }, {
            status: constant.TASK_CANDIDATE_STATUS.APPROVED
        });
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

    public async getCandidatesForUser(userId) {

        const db_task_candidate = this.getDBModel('Task_Candidate');

        return db_task_candidate.list({user: userId})

    }
}
