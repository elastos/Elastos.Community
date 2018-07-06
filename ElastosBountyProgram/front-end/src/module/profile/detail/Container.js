import {createContainer} from '@/util'
import Component from './Component'
import UserService from '@/service/UserService'
import { message } from 'antd/lib/index'

export default createContainer(Component, (state) => {
    return {
        userId: state.user.current_user_id,
        is_login: state.user.is_login
    }
}, () => {
    const userService = new UserService()

    return {

    }
})
