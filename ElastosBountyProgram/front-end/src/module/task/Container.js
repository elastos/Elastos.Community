import {createContainer} from "@/util"
import Component from './Component'
import TaskService from '@/service/TaskService'
import _ from 'lodash'
import { message } from 'antd/lib/index'

export default createContainer(Component, (state)=>{

    let taskState = state.task

    taskState.is_login = state.user.is_login

    if (!_.isArray(state.task.all_tasks)) {
        taskState.all_tasks = _.values(state.task.all_tasks)
    }
    return taskState

}, ()=>{
    return {
        async fetchTasks() {

            const taskService = new TaskService()
            try {
                const rs = await taskService.index()

                return rs
            } catch (err) {
                // TODO: why doesn't thrown error message come through in err?
                // do nothing
            }
        }
    }
})
