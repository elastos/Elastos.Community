import {createContainer} from '@/util'
import Component from './Component'
import TaskService from '@/service/TaskService'
import TeamService from '@/service/TeamService'

export default createContainer(Component, (state) => {
    return {
        ...state.task,
        ownedTeams: state.team.all_teams,
        currentUserId: state.user.current_user_id,
        currentUserAvatar: state.user.profile.avatar,
        loading: state.task.loading || state.team.loading
    }
}, () => {
    const taskService = new TaskService()
    const teamService = new TeamService()

    return {
        async getTaskDetail(taskId) {
            return taskService.get(taskId)
        },

        async resetTaskDetail() {
            return taskService.resetTaskDetail()
        },

        async getTeams(query) {
            return teamService.index(query)
        },

        async resetAllTeams() {
            return teamService.resetAllTeams()
        }
    }
})
