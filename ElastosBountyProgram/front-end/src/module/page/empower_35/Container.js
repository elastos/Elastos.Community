import {createContainer} from '@/util'
import TaskService from '@/service/TaskService'
import Component from './Component'
import {TASK_TYPE, TASK_CATEGORY} from '@/constant'
import _ from 'lodash'

export default createContainer(Component, (state) => {
    return {
        ...state.task
    }
}, () => {
    const taskService = new TaskService()

    return {

    }
})
