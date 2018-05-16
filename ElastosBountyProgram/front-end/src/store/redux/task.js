import BaseRedux from '@/model/BaseRedux'

export const FETCH_TASK_BEGIN = 'FETCH_TASK_BEGIN'
export const FETCH_TASK_SUCCESS = 'FETCH_TASK_SUCCESS'
export const FETCH_TASK_FAILURE = 'FETCH_TASK_FAILURE'

class TaskRedux extends BaseRedux {
    defineTypes () {
        return ['task']
    }

    defineDefaultState(){
        return {
            items: []
        };
    }
}

export default new TaskRedux()
