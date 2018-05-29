import BaseService from '../model/BaseService'
import _ from 'lodash'
import {api_request} from '@/util'

export default class extends BaseService {

    async index(qry) {

        const taskRedux = this.store.getRedux('task')

        this.dispatch(taskRedux.actions.loading_update(true))

        const result = await api_request({
            path: '/task',
            method: 'get',
            data: qry
        })

        // TODO: why does this set it as a struct?
        this.dispatch(taskRedux.actions.loading_update(false))
        this.dispatch(taskRedux.actions.all_tasks_reset())
        this.dispatch(taskRedux.actions.all_tasks_update(result))

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
    }
}
