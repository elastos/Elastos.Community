import BaseService from '../model/BaseService'
import _ from 'lodash'
import {api_request} from '@/util'

export default class extends BaseService {

    async list(filter = {}) {
        const result = await api_request({
            path: '/api/team/list',
            method: 'get',
            data: filter
        });

        return result
    }

    async index(qry) {
        const teamRedux = this.store.getRedux('team')

        this.dispatch(teamRedux.actions.loading_update(true))

        const result = await api_request({
            path: '/api/team/list',
            method: 'get',
            data: qry
        })

        this.dispatch(teamRedux.actions.loading_update(false))
        this.dispatch(teamRedux.actions.all_teams_reset())
        this.dispatch(teamRedux.actions.all_teams_update(result))

        return result
    }

    async getUserTeams(userId) {
        const userRedux = this.store.getRedux('user')
        const teamRedux = this.store.getRedux('team')

        this.dispatch(userRedux.actions.loading_update(true))
        this.dispatch(teamRedux.actions.loading_update(true))

        const result = await api_request({
            path: '/api/team/list',
            method: 'get',
            data: {
                teamHasUser: userId
            }
        });

        this.dispatch(userRedux.actions.loading_update(false))
        this.dispatch(userRedux.actions.teams_update(result.list))
        this.dispatch(teamRedux.actions.loading_update(false))
        this.dispatch(teamRedux.actions.all_teams_reset())
        this.dispatch(teamRedux.actions.all_teams_update(result.list))

        return result
    }

    async get(teamId) {
        const teamRedux = this.store.getRedux('team')
        this.dispatch(teamRedux.actions.loading_update(true))

        const result = await api_request({
            path: `/api/team/${teamId}`,
            method: 'get'
        })

        this.dispatch(teamRedux.actions.loading_update(false))
        this.dispatch(teamRedux.actions.detail_update(result))

        return result
    }

    async update(param) {
        // TODO
        const teamRedux = this.store.getRedux('team')
        this.dispatch(teamRedux.actions.loading_update(true))

        const result = await api_request({
            path: '/api/team/update',
            method: 'post',
            data: param
        });

        const detail = {
            ...this.store.getState().task.detail,
            ...param
        }

        this.dispatch(taskRedux.actions.detail_reset())
        this.dispatch(taskRedux.actions.detail_update(detail))
        this.dispatch(teamRedux.actions.loading_update(false))

        return result
    }

    async create(param) {
        const result = await api_request({
            path: '/api/team/create',
            method: 'post',
            data: param
        });

        return result;
    }

    resetAllTeams() {
        const teamRedux = this.store.getRedux('team')
        this.dispatch(teamRedux.actions.all_teams_reset())
    }
}
