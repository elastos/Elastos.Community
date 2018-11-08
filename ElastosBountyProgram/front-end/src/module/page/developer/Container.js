import {createContainer} from '@/util'
import Component from './Component'
import _ from 'lodash'
import { message } from 'antd/lib/index'
import UserService from '@/service/UserService'

export default createContainer(Component, (state) => {
    return {
        users: state.member.users,
        users_total: state.member.users_total,
        loading: state.member.users_loading
    }
}, () => {
    const userService = new UserService()

    return {
        async listUsers (query) {
            try {
                return await userService.getAll(query)
            } catch (err) {
                console.error(err)
                message.error(err.message)
            }
        }

    }
})
