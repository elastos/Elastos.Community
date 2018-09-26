import {createContainer} from '@/util'
import Component from './Component'
import TeamService from '@/service/TeamService'
import _ from 'lodash'

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

        resetTeams() {
            return teamService.resetAllTeams()
        }
    };
})
