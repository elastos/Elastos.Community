import {createContainer} from "@/util"
import Component from './Component'
import TaskService from '@/service/TaskService'
import _ from 'lodash'

export default createContainer(Component, (state)=>{

    let tasksState = state.tasks

    debugger

    if (!_.isArray(state.tasks.all_tasks)) {
        tasksState.all_tasks = _.values(state.tasks.all_tasks)
    }
    return tasksState

}, ()=>{
    return {
        async fetchTasks() {

            const taskService = new TaskService()
            const rs = await taskService.index()

            return rs
        }
    }
})
