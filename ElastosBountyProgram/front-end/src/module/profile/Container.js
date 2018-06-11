import {createContainer} from "@/util"
import Component from './Component'
import UserService from '@/service/UserService'
import {message} from 'antd'
import {TASK_STATUS} from '@/constant'

export default createContainer(Component, (state) => {

    let page = 'PUBLIC' // default

    if (/^\/admin/.test(state.router.location.pathname)) {
        page = 'ADMIN'
    } else if (/^\/profile/.test(state.router.location.pathname)){
        // TODO: this should be PROFILE
        page = 'LEADER'
    }

    return {
        is_admin: state.user.is_admin,
        is_login: state.user.is_login,

        page: page
    }
}, () => {

    const userService = new UserService()

    return {

    }
})
