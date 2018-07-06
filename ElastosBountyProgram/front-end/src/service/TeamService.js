import BaseService from '../model/BaseService'
import _ from 'lodash'
import {api_request} from '@/util'

export default class extends BaseService {
    async list(filter = {}) {
        const result = await api_request({
            path: '/api/team/list',
            method: 'get',
            data: filter
        })

        return result
    }

    async getUserTeams(userId) {
        const userRedux = this.store.getRedux('user')

        this.dispatch(userRedux.actions.loading_update(true))
        const result = await api_request({
            path: '/api/team/list',
            method: 'get',
            data: {
                teamHasUser: userId
            }
        })

        this.dispatch(userRedux.actions.loading_update(false))
        this.dispatch(userRedux.actions.teams_update(result.list))

        return result
    }

    async getDetail(teamId) {
        const result = await api_request({
            path: '/api/team/get',
            method: 'get',
            data: {
                teamId,
                status: 'NORMAL'
            }
        })

        return result
    }

    async update(param) {
        const result = await api_request({
            path: '/api/team/update',
            method: 'post',
            data: param
        })

        return result
    }

    async create(param) {
        const result = await api_request({
            path: '/api/team/create',
            method: 'post',
            data: param
        })

        return result
    }
}
