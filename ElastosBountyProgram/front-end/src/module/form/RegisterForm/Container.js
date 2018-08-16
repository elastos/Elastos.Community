import {createContainer, goPath} from '@/util'
import Component from './Component'
import UserService from '@/service/UserService'
import {message} from 'antd'

message.config({
    top: 100
})

/**
 * Note at the moment we do lazy client side registration code generation
 * TODO: move this to server side
 */
export default createContainer(Component, (state) => {

    return {
        ...state.user.register_form,
        language: state.language
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
                    userService.sendConfirmationEmail(profile.email)
                    message.success('Successfully Registered - Please Login')

                    const registerRedirect = sessionStorage.getItem('registerRedirect')

                    if (registerRedirect) {
                        sessionStorage.removeItem('registerRedirect')
                        sessionStorage.setItem('registered', true)
                        this.history.push(registerRedirect)
                    } else {
                        this.history.replace('/login')
                    }
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
