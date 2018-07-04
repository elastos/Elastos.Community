import {createContainer} from '@/util'
import Component from './Component'
import SubmissionService from '@/service/SubmissionService'
import _ from 'lodash'
import {USER_ROLE} from '@/constant'


export default createContainer(Component, (state) => {


    const currentUserId = state.user.current_user_id
    const submissionState = {
        ...state.submission,
        currentUserId,
        is_leader: state.user.role === USER_ROLE.LEADER,
        is_admin: state.user.role === USER_ROLE.ADMIN
    }

    if (!_.isArray(submissionState.all_submissions)) {
        submissionState.all_submissions = _.values(submissionState.all_submissions)
    }

    if (submissionState.all_submissions.length) {
        for (let submission of submissionState.all_submissions) {
            if (_.find(submission.subscribers, { _id: state.user.current_user_id })) {
                submissionState.subscribed_submissions.push(submission)
            }
        }
    }


    return submissionState

}, () => {

    const submissionService = new SubmissionService()

    return {

        /**
         * @returns {Promise<*>}
         */
        async getSubmissions(currentUserId) {
            return submissionService.index({
                profileListFor: currentUserId
            })
        },

        async resetSubmissions () {
            return submissionService.resetAllSubmissions()
        },

        async setFilter(options) {

        }
    }
})
