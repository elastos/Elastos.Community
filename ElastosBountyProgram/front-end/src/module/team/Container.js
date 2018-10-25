import {createContainer} from '@/util'
import Component from './Component'
import TeamService from '@/service/TeamService'
import {message} from 'antd'
import I18N from '@/I18N'

export default createContainer(Component, (state) => {
    let page = 'PUBLIC' // default

    if (/^\/admin/.test(state.router.location.pathname)) {
        page = 'ADMIN'
    } else if (/^\/profile/.test(state.router.location.pathname)) {
        page = 'LEADER'
    }

    return {
        is_admin: state.user.is_admin,
        is_login: state.user.is_login,
        current_user_id: state.user.current_user_id,
        page: page,
        loading: state.team.loading
    }
}, () => {

    const teamService = new TeamService()

    return {
        async getTeamDetail(teamId) {
            return teamService.get(teamId)
        },

        resetTeamDetail() {
            return teamService.resetTeamDetail()
        },

        async closeTeam(teamId) {
            try {
                await teamService.closeTeam(teamId)
                message.success(I18N.get('team.detail.popup.team_closed'));
            } catch (err) {
                message.error(err.message)
            }
        },
    
        async activateTeam(teamId) {
            try {
                await teamService.activateTeam(teamId)
                message.success(I18N.get('team.detail.popup.team_active'));
            } catch (err) {
                message.error(err.message)
            }
        }
    }
})
