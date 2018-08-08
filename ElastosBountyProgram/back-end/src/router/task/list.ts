import Base from '../Base';
import TaskService from '../../service/TaskService';
import * as _ from 'lodash';
import {constant} from '../../constant';
import {Types} from 'mongoose';
const ObjectId = Types.ObjectId;

export default class extends Base{

    /**
     * If the status is not provided, we default to
     * returning only CREATED, APPROVED statuses
     *
     * CREATED - does not require approval
     * APPROVED - task approved by admin
     *
     * @param param
     * @returns {Promise<["mongoose".Document]>}
     */
    public async action(){
        const taskService = this.buildService(TaskService);

        const param = this.getParam();
        const query: any = {
            archived: {$ne: true}
        };

        if (param.type && _.values(constant.TASK_TYPE).includes(param.type)) {
            query.type = param.type;
        }
        if (param.category && _.values(constant.TASK_CATEGORY).includes(param.category)) {
            query.category = param.category;
        } else {
            query.category = {$in: [constant.TASK_CATEGORY.DEVELOPER, constant.TASK_CATEGORY.SOCIAL]}
        }

        if (param.domain) {
            query.$and = query.$and || []
            query.$and.push({ domain: { $in: param.domain }})
        }

        if (param.skillset) {
            query.$and = query.$and || []
            query.$and.push({ recruitedSkillsets: { $in: param.skillset }})
        }

        // public page overrides all else
        if (param.public === 'true') {
            query.status = {
                $in: [
                    constant.TASK_STATUS.CREATED,
                    constant.TASK_STATUS.APPROVED,
                    constant.TASK_STATUS.ASSIGNED,
                    constant.TASK_STATUS.SUBMITTED
                ]
            }
        } else if (param.admin && this.session.user && this.session.user.role === constant.USER_ROLE.ADMIN) {
            delete param.admin;
            query.status = {$ne: constant.TASK_STATUS.CANCELED}
        } else if (param.profileListFor) {

            const currentUserId = new ObjectId(param.profileListFor)

            // this is the profile page query
            // basically all tasks you are a candidate of or own
            query.$or = [
                {createdBy: currentUserId}
            ]

            // make sure this is the logged in user
            if (this.session.userId !== currentUserId.toString()) {
                throw 'task.list API - profileListFor does not match session.userId'
            }

            // we need to find task candidates that match the user
            const taskCandidatesForUser = await taskService.getCandidatesForUser(currentUserId)

            if (taskCandidatesForUser.length) {
                query.$or.push({candidates: {$in: _.map(taskCandidatesForUser, '_id')}})
            }

            query.$or.push({subscribers: {$in: [currentUserId]}})

            // TODO: how about teams? Probably needs to be done too

            query.status = {$in: [
                    constant.TASK_STATUS.CREATED,
                    constant.TASK_STATUS.PENDING,
                    constant.TASK_STATUS.APPROVED,
                    constant.TASK_STATUS.ASSIGNED,
                    constant.TASK_STATUS.SUBMITTED,
                    constant.TASK_STATUS.SUCCESS,
                    constant.TASK_STATUS.DISTRIBUTED
            ]}

        } else if (!param.status) {

            // by default we only show tasks with these statuses
            query.status = {
                $in: [
                    constant.TASK_STATUS.CREATED,
                    constant.TASK_STATUS.APPROVED
                ]
            }

        }


        const list = await taskService.list(query);
        const count = await taskService.getDBModel('Task').count(query);

        return this.result(1, {
            list,
            total: count
        });
    }
}
