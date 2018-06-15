import BaseService from '../model/BaseService'
import _ from 'lodash'
import {api_request} from '@/util'

export default class extends BaseService {

    async list(filter={}){
        const result = await api_request({
            path: '/api/team/list',
            method: 'get',
            data: filter
        });

        return result;
    }

    async getUserTeams(userId) {

        const userRedux = this.store.getRedux('user')

        const result = await api_request({
            path: '/api/team/list',
            method: 'get',
            data: {
                teamHasUser: userId
            }
        });

        this.dispatch(userRedux.actions.teams_update(result.list))

        return result
    }

    async getDetail(teamId){
        const result = await api_request({
            path : '/api/team/get',
            method : 'get',
            data : {
                teamId,
                status : 'NORMAL'
            }
        });

        return result;
    }
}
