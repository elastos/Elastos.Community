import {createContainer} from '@/util'
import Component from './Component'
import TeamService from '@/service/TeamService'

export default createContainer(Component, (state) => {
    return {
        team: state.team.detail,
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
        }
    }
})
