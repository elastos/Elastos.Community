import BaseRedux from '@/model/BaseRedux'

export const FETCH_TASK_BEGIN = 'FETCH_TASK_BEGIN'
export const FETCH_TASK_SUCCESS = 'FETCH_TASK_SUCCESS'
export const FETCH_TASK_FAILURE = 'FETCH_TASK_FAILURE'

class TaskCandidateRedux extends BaseRedux {
    defineTypes () {
        return ['taskCandidate']
    }

    defineDefaultState() {
        return {
            active_task_candidate: null,

            loading: true,

            create_form: {
                task_type: 'EVENT'
            },

            all_task_candidates: [],

            // if we select a detail
            detail: {}
        };
    }
}

export default new TaskCandidateRedux()
