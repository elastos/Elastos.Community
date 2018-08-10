import {createContainer} from '@/util'
import Component from './Component'
import TaskService from '@/service/TaskService'
import TeamService from '@/service/TeamService'
import _ from 'lodash'

import {USER_ROLE, TASK_TYPE, TASK_CANDIDATE_STATUS} from '@/constant'

export default createContainer(Component, (state) => {
    const currentUserId = state.user.current_user_id
    const taskState = {
        ...state.task,
        currentUserId,
        is_leader: state.user.role === USER_ROLE.LEADER,
        is_admin: state.user.role === USER_ROLE.ADMIN
    }

    if (!_.isArray(taskState.all_tasks)) {
        taskState.all_tasks = _.values(taskState.all_tasks)
    }

    taskState.filter = state.task.filter || {}
    taskState.owned_tasks = []
    taskState.subscribed_tasks = []

    // tasks I am candidate of and waiting approval
    taskState.candidate_pending_tasks = []

    // tasks I am candidate of and approved
    taskState.candidate_active_tasks = []

    if (taskState.all_tasks.length) {
        for (let task of taskState.all_tasks) {
            if (_.find(task.subscribers, (subscriber) => {
                return subscriber.user && subscriber.user._id === state.user.current_user_id
            })) {
                taskState.subscribed_tasks.push(task)
            }

            if (task.createdBy && task.createdBy._id === currentUserId) {
                taskState.owned_tasks.push(task)
            } else {
                // assumed to be candidate, a task can have multiple candidates
                // find the one we are a user of (should be only one ever for a user)
                // TODO: teams
                let taskCandidate = _.find(task.candidates, (candidate) => {
                    if (candidate.type === 'USER' && candidate.user) {
                        return candidate.user._id === currentUserId
                    }

                    if (candidate.type === 'TEAM' && candidate.team) {
                        return _.map(state.user.teams, '_id').includes(candidate.team._id)
                    }
                })

                if (taskCandidate) {
                    if (taskCandidate.status === TASK_CANDIDATE_STATUS.APPROVED) {
                        taskState.candidate_active_tasks.push(task)
                    } else {
                        taskState.candidate_pending_tasks.push(task)
                    }
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
                profileListFor: currentUserId,
                type: TASK_TYPE.TASK
            })
        },

        resetTasks () {
            return taskService.resetAllTasks()
        },

        async setFilter(options) {

        },

        async getUserTeams(currentUserId) {

            const teamService = new TeamService()

            return teamService.getUserTeams(currentUserId)
        }
    }
})
