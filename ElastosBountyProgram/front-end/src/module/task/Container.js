import {createContainer} from "@/util"
import Component from './Component'
import TaskService from '@/service/TaskService'
import {message} from 'antd'
import {TASK_STATUS} from '@/constant'

export default createContainer(Component, (state) => {
    return {
        is_admin: state.user.is_admin,
        is_login: state.user.is_login,

        page: /^\/admin/.test(state.router.location.pathname) ? 'admin' : 'public'
    }
}, () => {

    const taskService = new TaskService()

    return {
        async getTaskDetail (taskId) {
            return taskService.get(taskId)
        },

        async resetTaskDetail () {
            return taskService.resetTaskDetail()
        },

        async approveTask(taskId) {

            try {
                const rs = await taskService.update(taskId, {
                    status: TASK_STATUS.APPROVED
                })
            } catch (err) {
                message.error(err.message)
            }
        }
    }
})
