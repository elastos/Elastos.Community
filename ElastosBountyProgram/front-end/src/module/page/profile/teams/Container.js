import {createContainer} from '@/util'
import Component from './Component'
import TeamService from '@/service/TeamService'

export default createContainer(Component, (state) => {
    return {
        ...state.team,
        currentUserId: state.user.current_user_id
    }
}, () => {
    const teamService = new TeamService()

    return {
        async getTeams(query) {
            return teamService.index(query)
        },

        async resetTeams() {
            return teamService.resetAllTeams()
        }
    };
})
