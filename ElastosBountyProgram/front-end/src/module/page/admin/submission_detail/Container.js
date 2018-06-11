import {createContainer} from '@/util'
import Component from './Component'
import SubmissionService from '@/service/SubmissionService'

export default createContainer(Component, (state) => {
    return {
        task: state.submission.detail,
        loading: state.submission.loading
    }
}, () => {
    const submissionService = new SubmissionService()

    return {
        async getSubmissionDetail(submissionId) {
            return submissionService.get(submissionId)
        },

        async resetSubmissionDetail() {
            return submissionService.resetSubmissionDetail()
        }
    }
})
