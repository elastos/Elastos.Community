import {createContainer} from '@/util'
import Component from './Component'
import TeamService from '@/service/TeamService'
import _ from 'lodash'

export default createContainer(Component, (state) => {
    // TODO construct active_teams and applied_teams structures

    console.log('  # ', state.team.all_teams)

    const activeTeams = _.filter(state.team.all_teams, (team) => {
        return team
    })

    const appliedTeams = _.filter(state.team.all_teams, (team) => {

    })

    return {
        ...state.team,
        activeTeams,
        appliedTeams,
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
