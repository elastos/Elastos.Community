import {createContainer} from '@/util'
import TaskService from '@/service/TaskService'
import Component from './Component'
import _ from 'lodash'

export default createContainer(Component, (state) => {
    return {
        ...state.task,
        currentUserId: state.user.current_user_id
    }
}, () => {
    const taskService = new TaskService()

    return {
        async getTaskDetail(taskId) {
            return taskService.get(taskId)
        },

        resetTaskDetail () {
            return taskService.resetTaskDetail()
        }
    }
})
