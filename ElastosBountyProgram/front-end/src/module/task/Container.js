import {createContainer} from "@/util"
import Component from './Component'
import TaskService from '@/service/TaskService'
import {message} from 'antd'
import {TASK_STATUS} from '@/constant'

export default createContainer(Component, (state) => {

    let page = 'PUBLIC' // default

    if (/^\/admin/.test(state.router.location.pathname)) {
        page = 'ADMIN'
    } else if (/^\/profile/.test(state.router.location.pathname)){
        page = 'LEADER'
    }

    return {
        is_admin: state.user.is_admin,
        is_login: state.user.is_login,

        page: page
    }
}, () => {

    const taskService = new TaskService()

    return {
        async getTaskDetail(taskId) {
            return taskService.get(taskId)
        },

        async resetTaskDetail() {
            return taskService.resetTaskDetail()
        },

        async approveTask(taskId) {

            try {
                await taskService.update(taskId, {
                    status: TASK_STATUS.APPROVED
                })

                message.success('Task approved successfully');
            } catch (err) {
                message.error(err.message)
            }
        },

        async completeTask(taskId) {

            try {
                await taskService.update(taskId, {
                    status: TASK_STATUS.SUCCESS
                })

                message.success('Task marked as complete');
            } catch (err) {
                message.error(err.message)
            }
        },

        async forceStart(taskId) {

            try {
                await taskService.update(taskId, {
                    status: TASK_STATUS.ASSIGNED
                })

                message.success('Task marked as assigned');
            } catch (err) {
                message.error(err.message)
            }
        }
    }
})
