import {createContainer} from '@/util'
import Component from './Component'
import TaskService from '@/service/TaskService'
import _ from 'lodash'

export default createContainer(Component, (state) => {

    let taskState = state.task

    if (!_.isArray(state.task.all_tasks)) {
        taskState.all_tasks = _.values(state.task.all_tasks)
    }

    return taskState

}, () => {

    const taskService = new TaskService()

    return {
        async getTasks () {
            return taskService.index()
        }
    }
})
