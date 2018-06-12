import { createContainer, goPath } from '@/util'
import Component from './Component'
import SubmissionService from '@/service/SubmissionService'
import { message } from 'antd'


export default createContainer(Component, (state) => {
    return {
        ...state
    }
}, () => {
    const submissionService = new SubmissionService()

    return {
        async createSubmission (type, description) {
            try {
                const rs = await submissionService.create({
                    type,
                    description
                })

                if (rs) {
                    message.success('Your issue has been submitted. Thanks!');
                }
            } catch (err) {
                message.error(err.message)
            }
        }
    }
})
