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
                sessionStorage.setItem('registerUser', '1')
                const rs = await userService.register(username, password, profile)

                if (rs) {
                    userService.sendConfirmationEmail(profile.email)
                    const registerRedirect = sessionStorage.getItem('registerRedirect')

                    if (registerRedirect) {
                        sessionStorage.setItem('registerWelcome', '1')
                        sessionStorage.setItem('registered', '1')
                        this.props.handleChangeTab('post')
                        console.log('registerWelcome')
                    } else {
                        this.history.push('/empower35')
                    }
                    sessionStorage.removeItem('registerUser')
                }
            } catch (err) {
                console.error(err)
                message.error(err && err.message ? err.message : 'Registration Failed - Please Contact Our Support')
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
