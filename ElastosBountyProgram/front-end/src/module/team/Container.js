import {createContainer} from '@/util'
import Component from './Component'
import TeamService from '@/service/TeamService'
import { message } from 'antd'

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

                message.success('Your team is closed now.');
            } catch (err) {
                message.error(err.message)
            }
        },
    
        async activeTeam(teamId) {
            try {
                await teamService.activeTeam(teamId)

                message.success('Your team is open now.');
            } catch (err) {
                message.error(err.message)
            }
        }

    }
})
