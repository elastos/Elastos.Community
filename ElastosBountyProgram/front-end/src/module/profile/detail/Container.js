import {createContainer} from '@/util'
import Component from './Component'
import UserService from '@/service/UserService'

export default createContainer(Component, (state) => {
    return {
        userId: state.user.current_user_id,
        is_login: state.user.is_login,
        loading: state.member.loading,
        member: state.member.detail
    }
}, () => {
    const userService = new UserService()

    return {
        async getMember(userId) {
            return userService.getMember(userId)
        },

        resetMemberDetail() {
            return userService.resetMemberDetail()
        }
    }
})
