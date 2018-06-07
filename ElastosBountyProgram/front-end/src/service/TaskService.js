import BaseService from '../model/BaseService'
import _ from 'lodash'
import {api_request} from '@/util'

import {TASK_CANDIDATE_STATUS, TASK_STATUS} from '@/constant'

export default class extends BaseService {

    async list(filter={}){
        const result = await api_request({
            path: '/task/list',
            method: 'get',
            data: filter
        });

        return result;
    }

    async index(qry) {

        const taskRedux = this.store.getRedux('task')

        this.dispatch(taskRedux.actions.loading_update(true))

        const result = await api_request({
            path: '/task/list',
            method: 'get',
            data: qry
        })

        // TODO: why does this set it as a struct?
        this.dispatch(taskRedux.actions.loading_update(false))
        this.dispatch(taskRedux.actions.all_tasks_reset())
        this.dispatch(taskRedux.actions.all_tasks_update(result.list))

        return result
    }

    async get(taskId) {
        const taskRedux = this.store.getRedux('task')

        this.dispatch(taskRedux.actions.loading_update(true))

        const result = await api_request({
            path: `/task/${taskId}`,
            method: 'get'
        })

        // Format data for dropdown select community
        result.taskCommunity = [];
        if (result.communityParent) {
            result.taskCommunity.push(result.communityParent._id)
        }

        if (result.community) {
            result.taskCommunity.push(result.community._id)
        }

        // Format data for dropdown select community -- end

        this.dispatch(taskRedux.actions.loading_update(false))
        this.dispatch(taskRedux.actions.detail_update(result))

        return result
    }

    /**
     * Need to rework this to return the updated doc, though this isn't a true
     * PUT the issue is it's just easier to have side effects
     *
     * @param taskId
     * @param doc
     * @returns {Promise<*>}
     */
    async update(taskId, doc) {

        const taskRedux = this.store.getRedux('task')

        this.dispatch(taskRedux.actions.loading_update(true))

        const result = await api_request({
            path: `/task/${taskId}`,
            method: 'put',
            data: doc
        })


        this.dispatch(taskRedux.actions.loading_update(false))

        return result
    }

    /**
     * Here we assume we are using task.detail in the store, so we
     * then push on to the task.detail.candidates array
     *
     * @param taskId
     * @param userId
     * @param teamId
     * @param applyMsg
     * @returns {Promise<*>}
     */
    async pushCandidate(taskId, userId, teamId, applyMsg) {

        const taskRedux = this.store.getRedux('task')

        const result = await api_request({
            path: '/task/addCandidate',
            method: 'post',
            data: {
                taskId,
                userId,
                teamId,
                applyMsg
            }
        })

        const curTaskDetail = this.store.getState().task.detail

        curTaskDetail.candidates.push(result)

        this.dispatch(taskRedux.actions.detail_update(curTaskDetail))

        return result
    }

    async pullCandidate(taskId, taskCandidateId) {
        const taskRedux = this.store.getRedux('task')
        const result = await api_request({
            path: '/task/removeCandidate',
            method: 'post',
            data: {
                taskId,
                taskCandidateId
            }
        })

        const curTaskDetail = this.store.getState().task.detail

        _.remove(curTaskDetail.candidates, (candidate) => {
            return candidate._id === taskCandidateId
        })

        this.dispatch(taskRedux.actions.detail_update(curTaskDetail))

        return result
    }

    async acceptCandidate(taskCandidateId) {
        const taskRedux = this.store.getRedux('task')
        const task = await api_request({
            path: '/task/acceptCandidate',
            method: 'post',
            data: {
                taskCandidateId
            }
        })

        // we do this the hard way because the result doesn't have all the fields populated
        // TODO: should we populate everything?
        const curTaskDetail = this.store.getState().task.detail

        const acceptedCandidate = _.find(curTaskDetail.candidates, (o) => o._id === taskCandidateId)

        acceptedCandidate.status = TASK_CANDIDATE_STATUS.APPROVED

        if (task.status === TASK_STATUS.ASSIGNED) {
            curTaskDetail.status = TASK_STATUS.ASSIGNED
        }

        this.dispatch(taskRedux.actions.detail_update(curTaskDetail))

        return task
    }

    async setFilter(options) {
        const taskRedux = this.store.getRedux('task')


    }

    async resetAllTasks() {
        const taskRedux = this.store.getRedux('task')
        this.dispatch(taskRedux.actions.all_tasks_reset())
    }

    async resetTaskDetail() {
        const taskRedux = this.store.getRedux('task')
        this.dispatch(taskRedux.actions.detail_reset())
    }

    async create(doc) {

        const res = await api_request({
            path: '/task/create',
            method: 'post',
            data: doc
        })

        // TODO: take user to task detail page

        return res;
    }
}
