import {createContainer} from '@/util'
import Component from './Component'
import TeamService from '@/service/TeamService'
import _ from 'lodash'

export default createContainer(Component, (state) => {
    return {
        currentUserId: state.user.current_user_id,
        currentUserAvatar: state.user.profile.avatar,
        is_admin: state.user.is_admin,
        is_login: state.user.is_login,
        ownedTeams: state.team.all_teams
    }
}, () => {
    const teamService = new TeamService()

    return {
        async getTeams(query) {
            return teamService.index(query)
        },

        resetAllTeams() {
            return teamService.resetAllTeams()
        }
    }
})
