import {createContainer} from '@/util'
import Component from './Component'
import CommunityService from '@/service/CommunityService'
import UserService from '@/service/UserService'
import TaskService from '@/service/TaskService'
import {TASK_CATEGORY, TASK_TYPE} from '@/constant'

export default createContainer(Component, (state, ownProps) => {
    let taskState = state.task

    if (!_.isArray(state.task.all_tasks)) {
        taskState.all_tasks = _.values(state.task.all_tasks)
    }

    taskState.events = _.filter(taskState.all_tasks, {type: TASK_TYPE.EVENT})
    taskState.tasks = _.filter(taskState.all_tasks, {type: TASK_TYPE.TASK})

    return {
        ...taskState
    }
}, () => {
    const communityService = new CommunityService()
    const userService = new UserService()
    const taskService = new TaskService()

    return {
        async getAllCountryCommunity () {
            return communityService.getAllCountryCommunities()
        },
        async getSpecificCountryCommunities (countryCode) {
            return communityService.getSpecificCountryCommunities(countryCode)
        },
        async addCountry (country) {
            return communityService.addCountry(country)
        },
        async getUserByIds (ids) {
            return userService.getByIds(ids)
        },
        async getSocialEvents () {
            return taskService.index({
                category: TASK_CATEGORY.SOCIAL
            })
        },
        async resetTasks() {
            return taskService.resetAllTasks()
        },
        async addMember(memberId, communityId) {
            return communityService.addMember(memberId, communityId)
        }
    }
})
