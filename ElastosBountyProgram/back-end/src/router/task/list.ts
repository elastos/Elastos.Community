import Base from '../Base';
import TaskService from '../../service/TaskService';
import * as _ from 'lodash';
import {constant} from '../../constant';
import {Types} from 'mongoose';
import TeamService from "../../service/TeamService";
const ObjectId = Types.ObjectId;

export default class extends Base{

    /**
     * The router is where we should put logic for defaults and assumptions
     *
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

        if (param.search) {
            query.name = { $regex: _.trim(param.search), $options: 'i' }
        }

        if (param.type) {
            const types = param.type.split(',')
            query.type = { $in: _.intersection(_.values(constant.TASK_TYPE), types) }
        }

        query.category = { $in: [constant.TASK_CATEGORY.DEVELOPER, constant.TASK_CATEGORY.SOCIAL] }
        if (param.category) {
            const categories = param.category.split(',')
            const valid = _.intersection(_.values(constant.TASK_CATEGORY), categories).length ===
                categories.length
            if (valid) {
                query.category = { $in: categories }
            }
        }

        if (param.results) {
            query.results = param.results
        }

        if (param.page) {
            query.page = param.page
        }

        if (param.domain) {
            query.domain = { $in: param.domain.split(',') }
        }

        if (param.skillset) {
            query.recruitedSkillsets = { $in: param.skillset.split(',') }
        }

        if (param.circle) {
            query.circle = { $in: param.circle.split(',') }
        }

        if (_.has(param, 'assignSelf')) {
            query.assignSelf = param.assignSelf
        }

        if (param.eventDateRangeStart) {
            query.eventDateRangeStart = JSON.parse(param.eventDateRangeStart)
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
        } else if (param.status) {
            query.status = param.status
        } else if (this.session.user && this.session.user.role === constant.USER_ROLE.ADMIN) {
            query.status = {$ne: constant.TASK_STATUS.CANCELED}
        } else if (param.profileListFor) {

            const currentUserId = new ObjectId(param.profileListFor)

            // this is the profile page query
            // basically all tasks you are a candidate of or own
            query.$or = [
                {createdBy: currentUserId}
            ]

            // we need to find task candidates that match the user
            const taskCandidatesForUser = await taskService.getCandidatesForUser(currentUserId)

            // we need to find task candidates that match the users' team

            // Fetch all team where the current user is a member of
            const teamService = this.buildService(TeamService)
            const param2 = {
                teamHasUser: currentUserId
            }
            const teams = await teamService.list(param2)

            // Iterate all teams and check if the team is a candidate of the task
            for (let i = 0; i < _.size(teams); i++) {
                const userTeam = teams[i] as any
                const taskCandidates = await taskService.getCandidatesForTeam(userTeam._id)
                if (taskCandidates.length) {
                    query.$or.push({candidates: {$in: _.map(taskCandidates, '_id')}})
                }
            }

            if (taskCandidatesForUser.length) {
                query.$or.push({candidates: {$in: _.map(taskCandidatesForUser, '_id')}})
            }

            query.$or.push({subscribers: {$all: [{"$elemMatch": {user: currentUserId}}] }})

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

        if (param.sortBy) {
            query.sortBy = param.sortBy
        }

        if (param.sortOrder) {
            query.sortOrder = param.sortOrder
        }

        const list = await taskService.list(query)
        const count = await taskService.getDBModel('Task')
            .count(_.omit(query, ['results', 'page', 'sortBy', 'sortOrder']))

        return this.result(1, {
            list,
            total: count
        })
    }
}
