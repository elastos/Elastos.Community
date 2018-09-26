import {createContainer} from '@/util'
import TeamService from '@/service/TeamService'
import Component from './Component'

export default createContainer(Component, (state) => {
    return {
        ...state.team,
        currentUserId: state.user.current_user_id,
        is_login: state.user.is_login,
        myCircles: state.user.circles
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
        async applyToTeam(teamId, userId, applyMsg = 'I am interested in this circle.') {
            return teamService.pushCandidate(teamId, userId, applyMsg)
        },
        async withdrawCandidate(teamCandidateId) {
            return teamService.withdrawCandidate(teamCandidateId)
        }
    }
})
