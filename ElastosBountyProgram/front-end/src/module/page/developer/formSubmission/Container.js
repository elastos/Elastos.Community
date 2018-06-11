import { createContainer, goPath } from '@/util'
import Component from './Component'
import SubmissionService from '@/service/SubmissionService'
import { message } from 'antd'

message.config({
    top: 100
})

export default createContainer(Component, (state) => {
    return {
        ...state.user.login_form
    }
}, () => {
    const submissionService = new SubmissionService()

    return {
        async submitIssue (issueCategory, project, data) {
            const rs = await submissionService.create({

            })

            /*
            try {
                const rs = await userService.login(username, password)

                if (rs) {
                    message.success('login success')
                    userService.path.push('/home')
                }
            } catch (err) {
                message.error('login failed')
            }
            */
        }
    }
})
