import {createContainer} from '@/util'
import TaskService from '@/service/TaskService'
import TeamService from '@/service/TeamService'
import Component from './Component'
import _ from 'lodash'

export default createContainer(Component, (state) => {
    let page = 'PUBLIC' // default

    if (/^\/admin/.test(state.router.location.pathname)) {
        page = 'ADMIN'
    } else if (/^\/profile/.test(state.router.location.pathname)) {
        page = 'LEADER'
    }

    return {
        ...state.task,
        page,
        ownedTeams: state.team.all_teams,
        currentUserId: state.user.current_user_id,
        currentUserAvatar: state.user.profile.avatar,
        is_admin: state.user.is_admin,
        loading: state.task.loading || state.team.loading
    }
}, () => {
    const taskService = new TaskService()
    const teamService = new TeamService()

    return {
        async getTaskDetail(taskId) {
            return taskService.get(taskId)
        },

        resetTaskDetail() {
            return taskService.resetTaskDetail()
        },

        async getTeams(query) {
            return teamService.index(query)
        },

        async applyToTask(taskId, userId, teamId, applyMsg, attachment,
            attachmentFilename) {
            return taskService.pushCandidate(taskId, userId, teamId, applyMsg,
                attachment, attachmentFilename)
        },

        resetAllTeams() {
            return teamService.resetAllTeams()
        },

        async acceptCandidate(taskCandidateId) {
            return taskService.acceptCandidate(taskCandidateId)
        },

        async rejectCandidate(taskCandidateId) {
            return taskService.rejectCandidate(taskCandidateId)
        },

        async withdrawCandidate(taskCandidateId) {
            return taskService.withdrawCandidate(taskCandidateId)
        }
    }
})
