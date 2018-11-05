import {createContainer} from '@/util'
import Component from './Component'
import _ from 'lodash'
import { message } from 'antd/lib/index'
import UserService from '@/service/UserService'

export default createContainer(Component, (state) => {
    return {
        users: state.member.users,
        loading: state.member.loading
    }
}, () => {
    const userService = new UserService()

    return {
        async listUsers () {
            try {
                return await userService.getAll()
            } catch (err) {
                console.error(err)
                message.error(err.message)
            }
        }

    }
})
