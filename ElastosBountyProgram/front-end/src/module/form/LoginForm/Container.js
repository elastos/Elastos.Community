import {createContainer, goPath} from "@/util"
import Component from './Component'
import UserService from '@/service/UserService'
import {message} from 'antd'

message.config({
    top: 100
})


export default createContainer(Component, (state) => {
    return {
        ...state.user.login_form
    }
}, () => {
    const userService = new UserService()

    return {
        async login(username, password, persist) {
            try {
                const rs = await userService.login(username, password, persist)

                if (rs) {
                    message.success('login success')

                    if (rs.is_admin) {
                        this.history.push('/admin/tasks')
                    } else {
                        this.history.push('/home')
                    }
                }
            } catch (err) {
                console.error(err)
                message.error(err.message)
            }
        }
    }
})
