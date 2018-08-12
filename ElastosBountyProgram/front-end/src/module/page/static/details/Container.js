import {createContainer} from '@/util'
import Component from './Component'
import TaskService from '@/service/TaskService'

export default createContainer(Component, (state, ownProps) => {
    return {
        task: state.task.detail,
        loading: state.task.loading
    }
}, () => {

    const taskService = new TaskService();
    return {
        async getTaskDetail(taskId) {
            return taskService.get(taskId);
        },

        isTaskLoading() {
          return this.loading || (Object.keys(this.task).length === 0 && this.task.constructor === Object
              && !this.loading);
        },

        resetTaskDetail() {
            return taskService.resetTaskDetail()
        }
    }
})
