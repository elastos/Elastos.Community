import Base from './Base';
import {Document, Types} from 'mongoose';
import * as _ from 'lodash';
import {constant} from '../constant';
import {validate, utilCrypto, mail} from '../utility';
// import UserService from "./UserService";

const ObjectId = Types.ObjectId;

const restrictedFields = {
    update: [
        '_id',
        'taskId',
        'status',
        'password'
    ]
}

const sanitize = '-password -salt -email -resetToken'

// TODO: we need some sort of status -> status permitted map

export default class extends Base {
    public async show(param): Promise<Document> {
        const db_task = this.getDBModel('Task');
        const db_task_candidate = this.getDBModel('Task_Candidate');
        const db_user = this.getDBModel('User');

        const task = await db_task.getDBInstance().findOne({_id: param.taskId})
            .populate('candidates', sanitize)
            .populate('subscribers', sanitize)
            .populate('createdBy', sanitize)
            .populate('approvedBy', sanitize)
            .populate('community')
            .populate('communityParent')

        if (task) {
            for (let subscriber of task.subscribers) {
                await db_user.getDBInstance().populate(subscriber, {
                    path: 'user',
                    select: sanitize
                })
            }

            for (let comment of task.comments) {
                for (let thread of comment) {
                    await db_task.getDBInstance().populate(thread, {
                        path: 'createdBy',
                        select: sanitize
                    })
                }
            }

            for (let candidate of task.candidates) {
                await db_task_candidate.getDBInstance().populate(candidate, {
                    path: 'user',
                    select: sanitize
                })
                await db_task_candidate.getDBInstance().populate(candidate, ['team'])

                for (let comment of candidate.comments) {
                    for (let thread of comment) {
                        await db_task.getDBInstance().populate(thread, {
                            path: 'createdBy',
                            select: sanitize
                        })
                    }
                }
            }

            await this.markLastSeenComment(task, task.createdBy, db_task)
        }

        return task
    }

    public async markCandidateVisited(param): Promise<Document> {
        const { taskCandidateId, owner } = param;

        const db_task_candidate = this.getDBModel('Task_Candidate');
        const updateObj = owner
            ? { lastSeenByOwner: new Date() }
            : { lastSeenByCandidate: new Date() }
        await db_task_candidate.update({ _id: taskCandidateId }, updateObj)

        const updatedTask = db_task_candidate.findById(taskCandidateId)
        return updatedTask
    }

    public async markComplete(param): Promise<Document> {
        const { taskCandidateId } = param;

        const db_task_candidate = this.getDBModel('Task_Candidate')
        const updateObj = { complete: true }
        await db_task_candidate.update({ _id: taskCandidateId }, updateObj)

        const updatedTask = db_task_candidate.findById(taskCandidateId)
        return updatedTask
    }

    public async list(query): Promise<Document> {
        const db_task = this.getDBModel('Task');
        const db_task_candidate = this.getDBModel('Task_Candidate');
        const db_user = this.getDBModel('User');
        const tasks = await db_task.list(query, {
            updatedAt: -1
        });

        if (tasks.length) {
            for (let task of tasks) {
                await db_task.getDBInstance().populate(task, {
                    path: 'createdBy',
                    select: sanitize,
                })

                await db_task.getDBInstance().populate(task, {
                    path: 'approvedBy',
                    select: sanitize,
                })

                await db_task.getDBInstance().populate(task, [
                    'community',
                    'communityParent',
                ])

                await db_task.getDBInstance().populate(task, {
                    path: 'candidates',
                    select: sanitize,
                })

                for (let subscriber of task.subscribers) {
                    await db_user.getDBInstance().populate(subscriber, {
                        path: 'user',
                        select: sanitize
                    })
                }

                for (let comment of task.comments) {
                    for (let thread of comment) {
                        await db_task.getDBInstance().populate(thread, {
                            path: 'createdBy',
                            select: sanitize
                        })
                    }
                }

                for (let candidate of task.candidates) {
                    await db_task_candidate.getDBInstance().populate(candidate, {
                        path: 'user',
                        select: sanitize
                    })
                    await db_task_candidate.getDBInstance().populate(candidate, ['team'])
                }
            }
        }

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
            name, description, descBreakdown, goals,
            thumbnail, infoLink, community, communityParent, category, type, startTime, endTime,
            candidateLimit, candidateSltLimit, rewardUpfront, reward, assignSelf,

            eventDateRange, eventDateRangeStart, eventDateRangeEnd, eventDateStatus,
            location,

            attachment, attachmentType, attachmentFilename, isUsd,

            domain, recruitedSkillsets, pictures
        } = param;
        this.validate_name(name);
        this.validate_description(description);
        this.validate_type(type);
        // this.validate_reward_ela(reward_ela);
        // this.validate_reward_votePower(reward_votePower);

        let status = constant.TASK_STATUS.CREATED;

        if (rewardUpfront.ela > 0 || reward.ela > 0 || rewardUpfront.usd > 0 || reward.usd > 0) {
            status = constant.TASK_STATUS.PENDING;
        } else {
            // if there is no ELA and you are assigning yourself,
            // it'll automatically go to ASSIGNED
            if (assignSelf) {
                status = constant.TASK_STATUS.ASSIGNED
            }
        }

        const doc = {
            name, description, descBreakdown, goals, infoLink, category, type,
            startTime,
            endTime,
            thumbnail,
            domain,
            recruitedSkillsets,
            pictures,

            eventDateRange, eventDateRangeStart, eventDateRangeEnd, eventDateStatus,
            location,

            attachment, attachmentType, attachmentFilename,
            candidateLimit,
            candidateSltLimit,
            rewardUpfront: rewardUpfront,
            reward : reward,
            assignSelf: assignSelf,
            status : status,
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
            throw 'Access Denied';
        }

        /*
        if(type === constant.TASK_TYPE.EVENT){
            const userService = this.getService(UserService);
            if(reward.ela > userService.getSumElaBudget(this.currentUser.elaBudget)){
                throw 'ela reward could not greater than user budget';
            }
        }
        */

        if (assignSelf) {
            // override the candidate select limit
            // TODO: visually note this in UI
            doc.candidateLimit = 1
            doc.candidateSltLimit = 1
        }

        const db_task = this.getDBModel('Task');

        console.log('create task => ', doc);
        const task = await db_task.save(doc);

        this.sendCreateEmail(this.currentUser, task)

        // if assignSelf = true, we add self as the candidate
        if (assignSelf) {
            await this.addCandidate({taskId: task._id, userId: this.currentUser._id, assignSelf: true})
        }

        return task
    }

    /**
     * Changing a task's reward/upfront after approval is only allowed by admins/council
     *
     * TODO: move status change triggers to a separate function
     *
     * TODO: no security to check if u own the task if you are leader
     *
     * @param param
     * @returns {Promise<boolean>}
     */
    public async update(param): Promise<boolean> {

        // not really assigning fields,
        const {
            taskId, rewardUpfront, reward
        } = param;

        // we need to set this for the end of the fn so we have the updated task
        let sendTaskPendingRequiredApprovalEmail = false

        if (!this.currentUser || !this.currentUser._id) {
            return
        }

        // permission shortcuts
        if (this.currentUser.role === constant.USER_ROLE.MEMBER) {
            throw 'Access Denied'
        }

        // organizer cannot change task to these statuses
        if (this.currentUser.role === constant.USER_ROLE.LEADER) {

            if ([
                constant.TASK_STATUS.DISTRIBUTED,
                constant.TASK_STATUS.CANCELED,
                constant.TASK_STATUS.APPROVED

            ].includes(param.status)) {
                throw 'Access Denied'
            }

        }

        // start logic
        const db_task = this.getDBModel('Task');
        const db_user = this.getDBModel('User');

        // get current
        const task = await db_task.findById(taskId)
        const taskOwner = await db_user.findById(task.createdBy)

        // TODO: ensure reward cannot change if status APPROVED or after

        // explictly copy over fields, do not accept param as is
        const updateObj:any = _.omit(param, restrictedFields.update)

        // only allow approving these fields if user is admin

        // TODO: there are likely bugs here since owners are admins as well as organizers
        // but the same logic should execute for both and we are not doing that

        // TODO: we need a state diagram and a helper for this
        if (this.currentUser.role === constant.USER_ROLE.ADMIN) {

            if (param.status) {

                if (param.status === constant.TASK_STATUS.APPROVED) {

                    updateObj.status = constant.TASK_STATUS.APPROVED
                    updateObj.approvedBy = this.currentUser._id

                    // if assignSelf = true, then we push the status to ASSIGNED
                    if (task.assignSelf) {
                        updateObj.status = constant.TASK_STATUS.ASSIGNED
                    }

                    // TODO: move this to agenda/queue
                    await this.sendTaskApproveEmail(this.currentUser, taskOwner, task)

                } else {
                    // always allow admin to change to any status
                    // TODO: this can still trigger alerts
                    updateObj.status = param.status
                }
            }
        } else if ([constant.TASK_STATUS.PENDING, constant.TASK_STATUS.CREATED].includes(task.status)) {

            // reward should only change if ela amount changed from 0 to > 0
            if ((task.reward.ela === 0 && task.rewardUpfront.ela === 0) &&
                (rewardUpfront && (rewardUpfront.ela > 0 || rewardUpfront.usd > 0)) ||
                (reward && (reward.ela > 0 || reward.usd > 0))
            ) {
                // TODO: send notification to admin
                updateObj.status = constant.TASK_STATUS.PENDING;

                sendTaskPendingRequiredApprovalEmail = true
            }
        }

        // if you're the owner - applies for admins and organizers
        if (this.currentUser._id.toString() === task.createdBy.toString()) {

            // shortcut with error for these
            if (task.status !== constant.TASK_STATUS.ASSIGNED &&
                param.status === constant.TASK_STATUS.SUBMITTED
            ) {
                throw 'Invalid Action'
            }

            if (task.status !== constant.TASK_STATUS.PENDING &&
                (
                    param.status === constant.TASK_STATUS.SUBMITTED ||
                    param.status === constant.TASK_STATUS.ASSIGNED
                )
            ) {
                updateObj.status = param.status

                if (param.status === constant.TASK_STATUS.ASSIGNED) {
                    await this.sendTaskAssignedEmail(taskOwner, task)

                } else if (param.status === constant.TASK_STATUS.SUBMITTED) {
                    await this.sendTaskSuccessEmail(taskOwner, task)
                }
            }
        }

        if (param.status === constant.TASK_STATUS.SUBMITTED) {

        }

        // TODO: check if candidate is the owner, then we auto .... ?
        /*
        if (param.status === constant.TASK_STATUS.ASSIGNED) {

        }
        */

        // TODO: check if user is approved candidate
        // TODO: accept as complete should not be allowed unless at least one candidate has submitted
        if (param.status === constant.TASK_STATUS.SUBMITTED) {
            updateObj.status = constant.TASK_STATUS.SUBMITTED
        }

        await db_task.update({_id: taskId}, updateObj)

        let updatedTask = await db_task.findById(taskId);

        // post update checks
        // TODO: if reward changed to 0, force status to CREATED

        if (sendTaskPendingRequiredApprovalEmail) {
            await this.sendTaskPendingEmail(this.currentUser, updatedTask)
        }

        return updatedTask
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
            throw 'Access Denied'
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
        const {teamId, userId, taskId, applyMsg, assignSelf} = param;
        const doc: any = {
            task: taskId,
            applyMsg
        };
        const db_user = this.getDBModel('User');

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
            throw 'candidate already exists';
        }

        doc.status = constant.TASK_CANDIDATE_STATUS.PENDING;

        // if we are assigning ourselves we automatically set to APPROVED
        if (assignSelf) {
            doc.status = constant.TASK_CANDIDATE_STATUS.APPROVED;
        }

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

        // send the email - first get the task owner
        if (!assignSelf) {
            const taskOwner = await db_user.findById(task.createdBy)

            await this.sendAddCandidateEmail(this.currentUser, taskOwner, task)
        }

        return taskCandidate
    }

    /**
     * You can either be the candidate or the task owner, or admin/council
     * @param param
     * @returns {Promise<boolean>}
     */
    public async removeCandidate(param): Promise<boolean> {
        const {taskId, taskCandidateId} = param

        const db_task = this.getDBModel('Task')
        const db_tc = this.getDBModel('Task_Candidate')

        let task = await db_task.getDBInstance().findOne({_id: taskId})
            .populate('createdBy', sanitize)
        let doc = await db_tc.findOne({_id: taskCandidateId})

        if (this.currentUser.role !== constant.USER_ROLE.ADMIN &&
            this.currentUser.role !== constant.USER_ROLE.COUNCIL &&
            (taskCandidateId && this.currentUser._id.toString() !== doc.user._id.toString()) &&
            (task.createdBy && task.createdBy._id.toString() !== this.currentUser._id.toString())) {
            throw 'Access Denied'
        }

        // TODO: check max applicants

        doc = {
            _id: taskCandidateId
        }

        await db_tc.remove(doc);

        task = await db_task.findOne({_id: taskId});
        if(!task){
            throw 'invalid task id';
        }

        const result = await db_task.db.update({
            _id: task._id
        }, {
            $pull: {
                candidates: new ObjectId(taskCandidateId)
            }
        })

        console.log('remove task candidate =>', doc);

        return result

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
        const db_task = this.getDBModel('Task');
        const db_tc = this.getDBModel('Task_Candidate');

        let doc = await db_tc.findById(param.taskCandidateId)
        let task = await db_task.getDBInstance().findOne({_id: doc.task})
            .populate('createdBy', sanitize)

        if (this.currentUser.role !== constant.USER_ROLE.ADMIN &&
            (task.createdBy && task.createdBy._id.toString() !== this.currentUser._id.toString())) {
            throw 'Access Denied'
        }

        await db_tc.update({
            _id: param.taskCandidateId
        }, {
            status: constant.TASK_CANDIDATE_STATUS.APPROVED
        });

        doc = await db_tc.findById(param.taskCandidateId)
        task = await db_task.getDBInstance().findOne({_id: doc.task})
            .populate('candidates')

        let acceptedCnt = 0;
        for (let candidate of task.candidates) {
            if (candidate.status === constant.TASK_CANDIDATE_STATUS.APPROVED) {
                acceptedCnt =+ 1
            }
        }

        if (acceptedCnt >= task.candidateSltLimit) {
            await db_task.update({
                _id: task._id
            }, {
                status: constant.TASK_STATUS.ASSIGNED
            })
        }

        // TODO: remove unaccepted candidates and send them emails

        return await db_task.findById(task._id)
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

    /**
     * This is PENDING status if there is ELA > 0
     *
     * @param curUser
     * @param task
     * @returns {Promise<void>}
     */
    public async sendCreateEmail(curUser, task) {

        let subject = 'New Task Created: ' + task.name;
        let body = `${this.currentUser.profile.firstName} ${this.currentUser.profile.lastName} has created the task ${task.name}`

        if (task.status === constant.TASK_STATUS.PENDING) {
            subject = 'ACTION REQUIRED: ' + subject
            body += ` and it requires approval
                    <br/>
                    <br/>
                    <a href="${process.env.SERVER_URL}/admin/task-detail/${task._id}">Click here to view the ${task.type.toLowerCase()}</a>
                    `
        }

        const adminUsers = await this.getAdminUsers()

        for (let admin of adminUsers) {
            await mail.send({
                to: admin.email,
                toName: `${admin.profile.firstName} ${admin.profile.lastName}`,
                subject: subject,
                body: body
            })
        }
    }

    public async sendTaskPendingEmail(curUser, task) {

        let subject = 'Task ELA Reward Changed: ' + task.name;
        let body = `${this.currentUser.profile.firstName} ${this.currentUser.profile.lastName} has changed the ELA reward for task ${task.name}`

        if (task.status === constant.TASK_STATUS.PENDING) {
            subject = 'ACTION REQUIRED: ' + subject
            body += ` and it requires approval
                    <br/>
                    <br/>
                    <a href="${process.env.SERVER_URL}/admin/task-detail/${task._id}">Click here to view the ${task.type.toLowerCase()}</a>
                    `
        }

        const adminUsers = await this.getAdminUsers()

        for (let admin of adminUsers) {
            await mail.send({
                to: admin.email,
                toName: `${admin.profile.firstName} ${admin.profile.lastName}`,
                subject: subject,
                body: body
            })
        }
    }

    // this email goes to all candidates
    public async sendTaskAssignedEmail(taskOwner, doc) {

    }

    // this email goes to all candidates
    public async sendTaskSuccessEmail(taskOwner, doc) {

    }

    /**
     * There are two emails - one to the applicant and the other to the task owner
     *
     * @param curUser
     * @param taskOwner
     * @param task
     * @returns {Promise<void>}
     */
    public async sendAddCandidateEmail(curUser, taskOwner, task) {

        let ownerSubject = `A candidate has applied for your task - ${task.name}`
        let ownerBody = `
            ${curUser.profile.firstName} ${curUser.profile.lastName} has applied for your task ${task.name}
            <br/>
            Please review their application
            <br/>
            <br/>
            <a href="${process.env.SERVER_URL}/profile/task-detail/${task._id}">Click here to view the ${task.type.toLowerCase()}</a>
            `
        let ownerTo = taskOwner.email
        let ownerToName = `${taskOwner.profile.firstName} ${taskOwner.profile.lastName}`

        await mail.send({
            to: ownerTo,
            toName: ownerToName,
            subject: ownerSubject,
            body: ownerBody
        })

        let candidateSubject = `Your application for task ${task.name} has been received`
        let candidateBody = `Thank you, the task owner ${taskOwner.profile.firstName} ${taskOwner.profile.lastName} will review your application and be in contact`
        let candidateTo = curUser.email
        let candidateToName = `${curUser.profile.firstName} ${curUser.profile.lastName}`

        await mail.send({
            to: candidateTo,
            toName: candidateToName,
            subject: candidateSubject,
            body: candidateBody
        })
    }

    public async sendTaskApproveEmail(curUser, taskOwner, task) {

        let ownerSubject = `Your task proposal - ${task.name} has been approved`
        let ownerBody = `
            ${curUser.profile.firstName} ${curUser.profile.lastName} has approved your task proposal ${task.name}
            <br/>
            <br/>
            <a href="${process.env.SERVER_URL}/profile/task-detail/${task._id}">Click here to view the ${task.type.toLowerCase()}</a>
            `
        let ownerTo = taskOwner.email
        let ownerToName = `${taskOwner.profile.firstName} ${taskOwner.profile.lastName}`

        await mail.send({
            to: ownerTo,
            toName: ownerToName,
            subject: ownerSubject,
            body: ownerBody
        })
    }

    protected async getAdminUsers() {
        const db_user = this.getDBModel('User');

        return db_user.find({
            role: constant.USER_ROLE.ADMIN,
            active: true
        })
    }
}
