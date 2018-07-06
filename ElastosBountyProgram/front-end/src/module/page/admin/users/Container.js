import { createContainer } from '@/util'
import Component from './Component'
import UserService from '@/service/UserService'
import { message } from 'antd/lib/index'
import _ from 'lodash'

export default createContainer(Component, (state) => {
    if (!_.isArray(state.member.users)) {
        state.member.users = _.values(state.member.users)
    }

    return {
        loading: state.member.loading,
        is_admin: state.user.is_admin,
        users: state.member.users || []
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
