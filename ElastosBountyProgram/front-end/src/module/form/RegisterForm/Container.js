import {createContainer, goPath} from '@/util'
import Component from './Component'
import UserService from '@/service/UserService'
import {message} from 'antd'

message.config({
    top: 100
})

export default createContainer(Component, (state) => {

    return {
        ...state.user.register_form
    }
}, () => {
    const userService = new UserService()

    return {
        async changeStep(step) {
            await userService.changeStep(step)
        },

        async register(username, password, profile) {
            try {
                const rs = await userService.register(username, password, profile)

                if (rs) {
                    userService.sendConfirmationEmail()
                    message.success('Successfully Registered - Please Login', 10)
                    this.history.replace('/login')
                }
            } catch (err) {
                console.error(err)
                message.error('Registration Failed - Please Contact Our Support')
            }
        },

        async sendEmail(toUserId, formData) {
            return userService.sendEmail(this.currentUserId, toUserId, formData)
        },

        async sendRegistrationCode(email, code) {
            return userService.sendRegistrationCode(email, code)
        }
    }
})
