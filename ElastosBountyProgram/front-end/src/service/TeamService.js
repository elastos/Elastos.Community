import BaseService from '../model/BaseService'
import _ from 'lodash'
import {api_request} from '@/util'
import {TEAM_TYPE, TEAM_STATUS} from '@/constant'

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
        this.dispatch(userRedux.actions.teams_update(result))
        this.dispatch(teamRedux.actions.loading_update(false))
        this.dispatch(teamRedux.actions.all_teams_reset())
        this.dispatch(teamRedux.actions.all_teams_update(result))

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
        const teamRedux = this.store.getRedux('team')
        this.dispatch(teamRedux.actions.loading_update(true))

        const result = await api_request({
            path: '/api/team/update',
            method: 'post',
            data: param
        });

        const detail = {
            ...this.store.getState().team.detail,
            ...param
        }

        this.dispatch(teamRedux.actions.detail_reset())
        this.dispatch(teamRedux.actions.detail_update(detail))
        this.dispatch(teamRedux.actions.loading_update(false))

        return result
    }

    async create(param) {
        const teamRedux = this.store.getRedux('team')
        this.dispatch(teamRedux.actions.loading_update(true))

        const result = await api_request({
            path: '/api/team/create',
            method: 'post',
            data: param
        });

        const allTeams = this.store.getState().team.all_teams || []
        allTeams[_.size(_.values(allTeams))] = result
        this.dispatch(teamRedux.actions.loading_update(false))
        this.dispatch(teamRedux.actions.all_teams_update(allTeams))

        return result;
    }

    resetAllTeams() {
        const teamRedux = this.store.getRedux('team')
        this.dispatch(teamRedux.actions.all_teams_reset())
    }

    resetTeamDetail() {
        const teamRedux = this.store.getRedux('team')
        this.dispatch(teamRedux.actions.detail_reset())
    }

    async pushCandidate(teamId, userId, applyMsg) {
        const teamRedux = this.store.getRedux('team')
        this.dispatch(teamRedux.actions.loading_update(true))

        const result = await api_request({
            path: '/api/team/addCandidate',
            method: 'post',
            data: {
                userId,
                teamId,
                applyMsg
            }
        })

        this.dispatch(teamRedux.actions.loading_update(false))

        const curTeamDetail = this.store.getState().team.detail
        curTeamDetail.members.push(result)

        if (curTeamDetail.type === TEAM_TYPE.CRCLE) {
            const userRedux = this.store.getRedux('user')
            const curUserDetail = this.store.getState().user
            curUserDetail.circles = _.values(curUserDetail.circles) || []
            curUserDetail.circles.push(curTeamDetail)

            this.dispatch(userRedux.actions.circles_update(curUserDetail.circles))
        }

        this.dispatch(teamRedux.actions.detail_update(curTeamDetail))

        return result
    }

    async closeTeam(teamId){
        const teamRedux = this.store.getRedux('team')
        this.dispatch(teamRedux.actions.loading_update(true))

        const result = await api_request({
            path: '/api/team/action/close',
            method: 'post',
            data: {
                teamId
            }
        })

        const curTeamDetail = this.store.getState().team.detail
        curTeamDetail.status = TEAM_STATUS.CLOSED

        this.dispatch(teamRedux.actions.loading_update(false))
        this.dispatch(teamRedux.actions.detail_update(curTeamDetail))
        
        return result
    }

    async activeTeam(teamId){
        const teamRedux = this.store.getRedux('team')
        this.dispatch(teamRedux.actions.loading_update(true))

        const result = await api_request({
            path: '/api/team/action/active',
            method: 'post',
            data: {
                teamId
            }
        })

        const curTeamDetail = this.store.getState().team.detail
        curTeamDetail.status = TEAM_STATUS.ACTIVE

        this.dispatch(teamRedux.actions.loading_update(false))
        this.dispatch(teamRedux.actions.detail_update(curTeamDetail))
        
        return result
    }

    async acceptCandidate(teamCandidateId) {
        const teamRedux = this.store.getRedux('team')
        this.dispatch(teamRedux.actions.loading_update(true))

        const result = await api_request({
            path: '/api/team/action/accept',
            method: 'post',
            data: {
                teamCandidateId
            }
        })

        this.dispatch(teamRedux.actions.loading_update(false))

        const curTeamDetail = this.store.getState().team.detail
        const member = _.find(curTeamDetail.members, { _id: teamCandidateId })
        member.status = result.status
        this.dispatch(teamRedux.actions.detail_update(curTeamDetail))

        return result
    }

    async rejectCandidate(teamCandidateId) {
        const teamRedux = this.store.getRedux('team')
        this.dispatch(teamRedux.actions.loading_update(true))

        const result = await api_request({
            path: '/api/team/action/reject',
            method: 'post',
            data: {
                teamCandidateId
            }
        })

        this.dispatch(teamRedux.actions.loading_update(false))

        const curTeamDetail = this.store.getState().team.detail
        const member = _.find(curTeamDetail.members, { _id: teamCandidateId })
        member.status = result.status
        this.dispatch(teamRedux.actions.detail_update(curTeamDetail))

        return result
    }

    async withdrawCandidate(teamCandidateId) {
        const teamRedux = this.store.getRedux('team')
        this.dispatch(teamRedux.actions.loading_update(true))

        const result = await api_request({
            path: '/api/team/action/withdraw',
            method: 'post',
            data: {
                teamCandidateId
            }
        })

        const curTeamDetail = this.store.getState().team.detail

        if (curTeamDetail.type === TEAM_TYPE.CRCLE) {
            const userRedux = this.store.getRedux('user')
            const curUserDetail = this.store.getState().user
            curUserDetail.circles = _.values(curUserDetail.circles) || []
            curUserDetail.circles = _.filter(curUserDetail.circles, (circle) => {
                return circle._id !== curTeamDetail._id
            })

            this.dispatch(userRedux.actions.circles_update(curUserDetail.circles))
        }

        const member = _.find(curTeamDetail.members, { _id: teamCandidateId })
        curTeamDetail.members = _.without(curTeamDetail.members, member)
        this.dispatch(teamRedux.actions.detail_update(curTeamDetail))
        this.dispatch(teamRedux.actions.loading_update(false))

        return result
    }
}
