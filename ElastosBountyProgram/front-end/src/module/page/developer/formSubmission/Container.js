import { createContainer, goPath } from '@/util'
import Component from './Component'
import SubmissionService from '@/service/SubmissionService'


export default createContainer(Component, (state) => {
    return {
        ...state
    }
}, () => {
    const submissionService = new SubmissionService()

    return {
        async createSubmission (type, description) {
            /*const rs = */await submissionService.create({
                type,
                description
            })
        }
    }
})
