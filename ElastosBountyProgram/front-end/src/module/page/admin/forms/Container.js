import { createContainer } from '@/util'
import Component from './Component'
import SubmissionService from '@/service/SubmissionService'
import _ from 'lodash'

import {SUBMISSION_TYPE} from '@/constant'

export default createContainer(Component, (state) => {
    let submissionState = state.submission

    if (!_.isArray(state.submission.all_submissions)) {
        submissionState.all_submissions = _.values(state.submission.all_submissions)
    }

    submissionState.filter = state.submission.filter || {}

    return submissionState
}, () => {
    const submissionService = new SubmissionService()

    return {
        async getSubmissions () {
            return submissionService.index({
                admin: true,
                type: SUBMISSION_TYPE.FORM_EXT
            })
        },

        async resetSubmissions () {
            return submissionService.resetAllSubmissions()
        },

        async setFilter(options) {

        }
    }
})
