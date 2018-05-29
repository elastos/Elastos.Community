import {createContainer} from "@/util"
import Component from './Component'
import TaskService from '@/service/TaskService'

import {TASK_STATUS} from '@/config/constant'

export default createContainer(Component, (state)=>{
    return {}
}, () => {

    const taskService = new TaskService()

    return {
        async approveTask() {

            const taskId = this.props.task.detail._id

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
