import BaseService from '../model/BaseService'
import _ from 'lodash'
import {USER_ROLE} from '@/constant'
import {api_request} from '@/util';

export default class extends BaseService {

    async login(username, password, persist) {
        const userRedux = this.store.getRedux('user')

        // call API /login
        const res = await api_request({
            path: '/api/user/login',
            method: 'get',
            data: {
                username,
                password
            }
        });

        await this.dispatch(userRedux.actions.login_form_reset())

        await this.dispatch(userRedux.actions.is_login_update(true))

        if ([USER_ROLE.ADMIN, USER_ROLE.COUNCIL].includes(res.user.role)) {
            await this.dispatch(userRedux.actions.is_admin_update(true))
        }else{
            await this.dispatch(userRedux.actions.is_admin_update(false))
        }
        if ([USER_ROLE.LEADER].includes(res.user.role)) {
            await this.dispatch(userRedux.actions.is_leader_update(true))
        }else {
            await this.dispatch(userRedux.actions.is_leader_update(false))
        }

        await this.dispatch(userRedux.actions.email_update(res.user.email))
        await this.dispatch(userRedux.actions.username_update(res.user.username))
        await this.dispatch(userRedux.actions.profile_update(res.user.profile))
        await this.dispatch(userRedux.actions.role_update(res.user.role))
        await this.dispatch(userRedux.actions.current_user_id_update(res.user._id))
        sessionStorage.setItem('api-token', res['api-token']);

        if (persist) {
            localStorage.setItem('api-token', res['api-token'])
        } else {
            localStorage.removeItem('api-token')
        }

        return {
            success: true,
            is_admin: res.user.role === USER_ROLE.ADMIN
        }
    }

    async register(username, password, profile) {

        const res = await api_request({
            path : '/api/user/register',
            method : 'post',
            data : Object.assign(profile, {
                username,
                password
            })
        });

        return true
    }

    async forgotPassword(email) {

        return api_request({
            path : '/api/user/forgot-password',
            method : 'post',
            data : {
                email
            }
        })
    }

    async resetPassword(resetToken, password) {

        return api_request({
            path : '/api/user/reset-password',
            method : 'post',
            data : {
                resetToken,
                password
            }
        })
    }

    async getCurrentUser() {

        const userRedux = this.store.getRedux('user')

        const result = await api_request({
            path : '/api/user/current_user',
            success : (data)=>{
                this.dispatch(userRedux.actions.is_login_update(true));
                if ([USER_ROLE.LEADER].includes(data.role)) {
                    this.dispatch(userRedux.actions.is_leader_update(true))
                }else{
                    this.dispatch(userRedux.actions.is_leader_update(false))
                }
                if ([USER_ROLE.ADMIN, USER_ROLE.COUNCIL].includes(data.role)) {
                    this.dispatch(userRedux.actions.is_admin_update(true))
                }else{
                    this.dispatch(userRedux.actions.is_admin_update(false))
                }
                this.dispatch(userRedux.actions.email_update(data.email))
                this.dispatch(userRedux.actions.username_update(data.username))
                this.dispatch(userRedux.actions.profile_update(data.profile))
                this.dispatch(userRedux.actions.role_update(data.role))
                this.dispatch(userRedux.actions.current_user_id_update(data._id))

                this.dispatch(userRedux.actions.loading_update(false))
            }
        })

        return result
    }

    // restrictive getter - public profile should never return email / private info
    // TODO: I am using member to refer to a profile other than yourself, might want to change it
    async getMember(userId, options = {}) {

        let path = `/api/user/public/${userId}`
        const memberRedux = this.store.getRedux('member')

        if (options.admin) {
            await this.dispatch(memberRedux.actions.loading_update(true))
            path += '?admin=true'
        }

        const result = await api_request({
            path: path,
            method: 'get'
        })

        // this is gross, if we are focused on a user, it shouldn't matter if it's you or another user
        // we should use the same base redux model
        if (options.admin) {

            await this.dispatch(memberRedux.actions.focus_user_update(result))
            await this.dispatch(memberRedux.actions.loading_update(false))
        }

        return result
    }

    async update(userId, doc) {

        const memberRedux = this.store.getRedux('member')

        await this.dispatch(memberRedux.actions.loading_update(true))

        const result = await api_request({
            path: `/api/user/${userId}`,
            method: 'put',
            data: doc
        })

        await this.dispatch(memberRedux.actions.focus_user_update(result))
        await this.dispatch(memberRedux.actions.loading_update(false))

        return result
    }

    async logout() {
        const userRedux = this.store.getRedux('user')
        const tasksRedux = this.store.getRedux('task')

        return new Promise((resolve) => {
            this.dispatch(userRedux.actions.is_login_update(false))
            this.dispatch(userRedux.actions.profile_reset())
            this.dispatch(tasksRedux.actions.all_tasks_reset())
            sessionStorage.clear()
            localStorage.removeItem('api-token', '')
            resolve(true)
        })
    }

    async changeStep(step) {
        const userRedux = this.store.getRedux('user')

        await this.dispatch(userRedux.actions.register_form_update({
            step: 2
        }))

        return true
    }

    async getByIds(ids) {
        const result = await api_request({
            path : `/api/user/${ids}/users`,
            method : 'get',
        });

        return result
    }

    async getAll(query) {
        const memberRedux = this.store.getRedux('member')

        await this.dispatch(memberRedux.actions.loading_update(true))

        const result = await api_request({
            path : `/api/user/list`,
            method : 'get',
            data: query
        });

        await this.dispatch(memberRedux.actions.users_update(result))
        await this.dispatch(memberRedux.actions.loading_update(false))

        return result
    }

    async sendEmail(fromUserId, toUserId, formData) {
        return await api_request({
            path: '/api/user/send-email',
            method: 'post',
            data: {
                fromUserId,
                toUserId,
                ...formData
            }
        })
    }

    async sendRegistrationCode(email, code) {
        return await api_request({
            path: '/api/user/send-code',
            method: 'post',
            data: {
                email,
                code // TODO dont send this in clear text
            }
        })
    }

    async sendConfirmationEmail(email) {
        return await api_request({
            path: '/api/user/send-confirm',
            method: 'post',
            data: {
                email
            }
        })
    }
}
