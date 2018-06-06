import {createContainer} from '@/util'
import Component from './Component'
import TaskService from '@/service/TaskService'
import _ from 'lodash'

import {TASK_STATUS} from '@/constant'

export default createContainer(Component, (state) => {

    let taskState = state.task

    taskState.currentUserId = state.user.current_user_id
    taskState.loading = false

    if (!_.isArray(state.task.all_tasks)) {
        taskState.all_tasks = _.values(state.task.all_tasks)
    }

    taskState.filter = state.task.filter || {}

    if (taskState.all_tasks.length) {
        // debugger
    }

    return taskState

}, () => {

    const taskService = new TaskService()

    return {

        /**
         * We are querying tasks:
         *
         * 1. owner of
         * 2. we are a candidate of
         * 3. assigned to (this is a candidate with STATUS approved) including in 2
         *
         * @returns {Promise<*>}
         */
        async getTasks(currentUserId) {
            return taskService.index({
                profileListFor: currentUserId
            })
        },

        async resetTasks () {
            return taskService.resetAllTasks()
        },

        async setFilter(options) {

        }
    }
})
