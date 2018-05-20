import {createContainer} from "@/util"
import Component from './Component'
import TaskService from '@/service/TaskService'
import _ from 'lodash'
import { message } from 'antd/lib/index'

export default createContainer(Component, (state)=>{

    let tasksState = state.tasks

    tasksState.is_login = state.user.is_login

    if (!_.isArray(state.tasks.all_tasks)) {
        tasksState.all_tasks = _.values(state.tasks.all_tasks)
    }
    return tasksState

}, ()=>{
    return {
        async fetchTasks() {

            const taskService = new TaskService()
            try {
                const rs = await taskService.index()

                return rs
            } catch (err) {
                // TODO: why doesn't thrown error message come through in err?
                message.error('Not Authenticated')
            }
        }
    }
})
