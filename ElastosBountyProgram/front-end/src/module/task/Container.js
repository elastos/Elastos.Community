import {createContainer} from "@/util"
import Component from './Component'
import TaskService from '@/service/TaskService'
import {message} from 'antd'
import {TASK_STATUS} from '@/constant'

export default createContainer(Component, (state)=>{
    return {}
}, () => {

    const taskService = new TaskService()

    return {
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
