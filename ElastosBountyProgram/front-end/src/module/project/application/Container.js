import {createContainer} from '@/util'
import Component from './Component'
import TaskService from '@/service/TaskService'


export default createContainer(Component, (state) => {
    return {
        ...state.task,
        userId: state.user.current_user_id,
        is_login: state.user.is_login,
        is_admin: state.user.is_admin
    }
}, () => {
    const taskService = new TaskService()

    return {
        async updateApplication(taskId, data) {
            return taskService.updateApplication(taskId, data)
        }
    }
})
