import {createContainer} from '@/util'
import Component from './Component'
import TaskService from '@/service/TaskService'
import TeamService from '@/service/TeamService'
import { message } from 'antd/lib/index'

export default createContainer(Component, (state) => {
    return {
        userId: state.user.current_user_id,
        is_login: state.user.is_login,
        is_admin: state.user.is_admin
    }
}, () => {

    const teamService = new TeamService()
    const taskService = new TaskService()

    return {
        async listTeamsOwned(userId) {
            try {
                const result = await teamService.list({
                    owner: userId
                })

                return result
            } catch (err) {
                console.error(err)
                message.error(err.message)
            }
        },

        async getTaskDetail(taskId) {
            return taskService.get(taskId)
        },

        async resetTaskDetail() {
            return taskService.resetTaskDetail()
        },

        async markComplete(taskCandidateId) {
            return taskService.markComplete(taskCandidateId)
        }
    }
})
