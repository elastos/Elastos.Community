import {createContainer} from '@/util'
import Component from './Component'
import TaskService from '@/service/TaskService'

export default createContainer(Component, (state) => {

    // TODO: need some more tracking of options here

    return {
        ...state.task.detail
    }
}, () => {
    const taskService = new TaskService()

    return {
        async getTaskDetail (taskId) {
            return taskService.get(taskId)
        },

        async resetTaskDetail () {
            return taskService.resetTaskDetail()
        }
    }
})
