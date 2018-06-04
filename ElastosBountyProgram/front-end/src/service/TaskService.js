import BaseService from '../model/BaseService'
import _ from 'lodash'
import {api_request} from '@/util'

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

        const taskUpdated = Object.assign({}, this.store.getState().task.detail, doc)

        this.dispatch(taskRedux.actions.detail_update(taskUpdated))
        this.dispatch(taskRedux.actions.loading_update(false))

        return result
    }

    async pushCandidate(taskId, userId, teamId, applyMsg) {
        const result = await api_request({
            path: `/task/addCandidate/${taskId}`,
            method: 'post',
            data: {
                taskId,
                userId,
                teamId,
                applyMsg
            }
        })

        return result
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
