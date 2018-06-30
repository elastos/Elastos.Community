import {createContainer} from '@/util'
import Component from './Component'
import TaskService from '@/service/TaskService'

export default createContainer(Component, (state) => {
    return {
        task: state.task.detail,
        loading: state.task.loading,
        applicantId: state.applicantId // TODO ?
    }
}, () => {
    const taskService = new TaskService()

    return {
        async getTaskDetail(taskId) {
            return taskService.get(taskId)
        },

        async resetTaskDetail() {
            return taskService.resetTaskDetail()
        }
    }
})
