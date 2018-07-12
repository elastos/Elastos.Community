import {createContainer} from '@/util'
import Component from './Component'
import CommunityService from '@/service/CommunityService'
import TaskService from '@/service/TaskService'
import TeamService from '@/service/TeamService'
import UserService from '@/service/UserService'
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
    taskState.projectTasks = _.filter(taskState.all_tasks, {type: TASK_TYPE.PROJECT})
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

    return {
        ...taskState,
        loading: state.task.loading || state.community.loading || state.user.loading
    }
}, () => {
    const taskService = new TaskService()
    const userService = new UserService()
    const communityService = new CommunityService()

    return {
        async getAllCountryCommunity () {
            return communityService.getAllCountryCommunities()
        },
        async getSpecificCountryCommunities (countryCode) {
            return communityService.getSpecificCountryCommunities(countryCode)
        },
        async getDeveloperEvents () {
            return taskService.index({
                category: TASK_CATEGORY.DEVELOPER
            })
        },
        async getUserByIds (ids) {
            return userService.getByIds(ids)
        },

        async resetTasks() {
            return taskService.resetAllTasks()
        },

        async getUserTeams(currentUserId) {
            const teamService = new TeamService()
            return teamService.getUserTeams(currentUserId)
        },

        async getAllCommunities() {
            return new Promise((resolve, reject) => {
                communityService.getAll().then((data) => {
                    const cascaderItems = data.map((item) => {
                        return {
                            value: item._id,
                            label: item.name,
                            parentId: item.parentCommunityId
                        }
                    })

                    const rootCascaderItems = _.filter(cascaderItems, {
                        parentId: null
                    })

                    rootCascaderItems.forEach((rootCascaderItem) => {
                        const children = _.filter(cascaderItems, {
                            parentId: rootCascaderItem.value
                        })

                        if (children && children.length) {
                            rootCascaderItem.children = children
                        }
                    })

                    resolve(rootCascaderItems)
                }).catch((err) => {
                    reject(err)
                })
            })
        }
    }
})
