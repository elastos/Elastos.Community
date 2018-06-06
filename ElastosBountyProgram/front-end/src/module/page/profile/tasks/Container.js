import {createContainer} from '@/util'
import Component from './Component'
import TaskService from '@/service/TaskService'
import _ from 'lodash'

import {TASK_STATUS, TASK_CANDIDATE_STATUS} from '@/constant'

export default createContainer(Component, (state) => {

    const currentUserId = state.user.current_user_id
    const taskState = {
        ...state.task,
        currentUserId,
        loading: false
    }

    if (!_.isArray(state.task.all_tasks)) {
        taskState.all_tasks = _.values(state.task.all_tasks)
    }

    taskState.filter = state.task.filter || {}

    taskState.owned_tasks = []

    // tasks I am candidate of and waiting approval
    taskState.candidate_pending_tasks = []

    // tasks I am candidate of and approved
    taskState.candidate_active_tasks = []

    if (taskState.all_tasks.length) {
        for (let task of taskState.all_tasks) {

            if (task.createdBy._id === currentUserId) {
                taskState.owned_tasks.push(task)
            } else {
                // assumed to be candidate, a task can have multiple candidates
                // find the one we are a user of (should be only one ever for a user)
                // TODO: teams
                let taskCandidate = _.find(task.candidates, (candidate) => candidate.user === currentUserId)

                if (taskCandidate.status === TASK_CANDIDATE_STATUS.ACTIVE) {
                    taskState.candidate_active_tasks.push(task)
                } else {
                    taskState.candidate_pending_tasks.push(task)
                }
            }
        }
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
