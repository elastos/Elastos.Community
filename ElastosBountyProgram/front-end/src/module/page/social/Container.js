import {createContainer} from '@/util'
import Component from './Component'
import TaskService from '@/service/TaskService'
import TeamService from '@/service/TeamService'
import CommunityService from '@/service/CommunityService'
import _ from 'lodash'

import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS, TASK_CANDIDATE_STATUS} from '@/constant'

export default createContainer(Component, (state) => {

    let taskState = state.task
    const currentUserId = state.user.current_user_id

    taskState.currentUserId = currentUserId

    if (!_.isArray(state.task.all_tasks)) {
        taskState.all_tasks = _.values(state.task.all_tasks)
    }

    taskState.events = _.filter(taskState.all_tasks, {type: TASK_TYPE.EVENT})
    taskState.tasks = _.filter(taskState.all_tasks, {type: TASK_TYPE.TASK})
    taskState.is_admin = state.user.is_admin

    // available tasks are those that are CREATED / APPROVED
    taskState.availTasks = []

    // tasks that are active for the current user
    taskState.myTasks = []

    for (let task of taskState.tasks) {
        // after a task has max applicants it should automatically be status ASSIGNED
        if ([TASK_STATUS.CREATED, TASK_STATUS.APPROVED].includes(task.status)) {
            taskState.availTasks.push(task)
            continue
        }

        // now check if the user or their team is a candidate for an assigned task
        if (task.status === TASK_STATUS.ASSIGNED) {

            let taskCandidate = _.find(task.candidates, (candidate) => {

                if (candidate.type === 'USER') {
                    return candidate.user._id === currentUserId
                }

                if (candidate.type === 'TEAM') {
                    return _.map(state.user.teams, '_id').includes(candidate.team._id)
                }
            })

            if (taskCandidate && taskCandidate.status === TASK_CANDIDATE_STATUS.APPROVED) {
                taskState.myTasks.push(Object.assign(task, {curCandidate: taskCandidate}))
            }
        }
    }

    // communities
    if (!_.isArray(state.community.my_communities)) {
        taskState.all_tasks = _.values(state.community.my_communities)
    }

    return taskState

}, () => {

    const taskService = new TaskService()

    return {
        async getSocialEvents () {
            return taskService.index({
                category: TASK_CATEGORY.SOCIAL
            })
        },

        async getMyCommunities(currentUserId) {
            const communityService = new CommunityService()
            return communityService.getMyCommunities(currentUserId)
        },

        async resetTasks() {
            return taskService.resetAllTasks()
        },

        async getUserTeams(currentUserId) {

            const teamService = new TeamService()
            return teamService.getUserTeams(currentUserId)
        }
    }
})
