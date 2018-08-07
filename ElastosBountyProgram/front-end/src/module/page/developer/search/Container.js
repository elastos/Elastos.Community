import {createContainer} from '@/util'
import Component from './Component'
import TaskService from '@/service/TaskService';
import TeamService from '@/service/TeamService';
import _ from 'lodash'

export default createContainer(Component, (state) => {
    return {
        allTasks: state.task.all_tasks,
        allTeams: state.team.all_teams
    }
}, () => {
    const taskService = new TaskService()
    const teamService = new TeamService()

    return {
        async getTasks(filters) {
            return taskService.index({
                qry: filters
            })
        },

        async resetTasks () {
            return taskService.resetAllTasks()
        },

        async getTeams(filters) {
            return teamService.index(filters)
        },

        async resetTeams () {
            return teamService.resetAllTeams()
        }
    }
})
