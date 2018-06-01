import {createContainer} from '@/util'
import Component from './Component'
import UserService from '@/service/UserService'
import { message } from 'antd/lib/index'

export default createContainer(Component, (state) => {


    return {
        ...state.user
    }
}, () => {

    return {
        async getCurrentUser() {

            try {
                const rs = await userService.getCurrentUser()
            } catch (err) {
                message.error(err.message)
            }
        }
    }
})
