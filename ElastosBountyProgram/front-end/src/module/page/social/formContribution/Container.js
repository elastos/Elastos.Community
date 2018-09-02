import { createContainer, goPath } from '@/util'
import Component from './Component'
// import UserService from '@/service/IssueService'
import { message } from 'antd'

message.config({
    top: 100
})

export default createContainer(Component, (state) => {
    return {
        ...state.user.login_form
    }
}, () => {
    // const userService = new UserService()

    return {
        async submitIssue (issueCategory, project, data) {

            /*
            try {
                const rs = await userService.login(username, password)

                if (rs) {
                    message.success('login success')
                    userService.path.push('/profile/teams')
                }
            } catch (err) {
                message.error('login failed')
            }
            */
        }
    }
})
