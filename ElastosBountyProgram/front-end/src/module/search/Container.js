import {createContainer} from '@/util'
import Component from './Component'
import TaskService from '@/service/TaskService'
import TeamService from '@/service/TeamService'
import _ from 'lodash'
import {TASK_CATEGORY, TASK_TYPE, TEAM_TYPE} from '@/constant'

export default createContainer(Component, (state) => {

    // TODO: not sure this should be all one struct
    return {
        ...state.task,
        ...state.team,
        ...state.user,
        all_teams: _.values(state.team.all_teams),
        all_circles: _.values(state.team.all_circles),
        loading: state.team.loading || state.task.loading
    }
}, () => {
    const taskService = new TaskService()
    const teamService = new TeamService()

    return {
        async getProjects(filters) {
            return taskService.index({
                ...filters,
                type: TASK_TYPE.PROJECT,
                category: TASK_CATEGORY.DEVELOPER
            })
        },

        async getTasks(filters) {
            return taskService.index({
                ...filters,
                type: TASK_TYPE.TASK,
                category: [TASK_CATEGORY.DEVELOPER, TASK_CATEGORY.SOCIAL]
            })
        },

        async loadAllCircles() {
            return teamService.loadAllCircles()
        },

        resetTasks () {
            return taskService.resetAllTasks()
        },

        async getTeams(filters) {
            return teamService.index({
                ...filters,
                type: TEAM_TYPE.TEAM
            })
        },

        resetTeams () {
            return teamService.resetAllTeams()
        }
    }
})
