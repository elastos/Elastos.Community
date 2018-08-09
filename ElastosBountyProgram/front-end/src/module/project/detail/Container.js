import {createContainer} from '@/util'
import Component from './Component'
import TaskService from '@/service/TaskService'
import TeamService from '@/service/TeamService'

export default createContainer(Component, (state) => {
    return {
        ...state.task,
        loading: state.task.loading
    }
}, () => {
    const taskService = new TaskService()
    const teamService = new TeamService()

    return {
        async getTaskDetail (taskId) {
            return taskService.get(taskId)
        },

        async resetTaskDetail() {
            return taskService.resetTaskDetail()
        },
    }
})
