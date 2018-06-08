import BaseService from '../model/BaseService'
import _ from 'lodash'
import {USER_ROLE} from '@/constant'
import {api_request} from '@/util';

export default class extends BaseService {

    async login(username, password, opts={}){

        const userRedux = this.store.getRedux('user')

        // call API /login
        const res = await api_request({
            path : '/user/login',
            method : 'get',
            data : {
                username,
                password
            }
        });

        await this.dispatch(userRedux.actions.login_form_reset())

        await this.dispatch(userRedux.actions.is_login_update(true))

        if ([USER_ROLE.ADMIN, USER_ROLE.COUNCIL].includes(res.user.role)) {
            await this.dispatch(userRedux.actions.is_admin_update(true))
        }

        await this.dispatch(userRedux.actions.username_update(res.user.username))
        await this.dispatch(userRedux.actions.profile_update(res.user.profile))
        await this.dispatch(userRedux.actions.role_update(res.user.role))
        await this.dispatch(userRedux.actions.current_user_id_update(res.user._id))
        sessionStorage.setItem('api-token', res['api-token']);

        return {
            success: true,
            is_admin: res.user.role === USER_ROLE.ADMIN
        }
    }

    async getCurrentUser() {

    }

    async register(username, password, profile) {
        const res = await api_request({
            path : '/user/register',
            method : 'post',
            data : Object.assign(profile, {
                username,
                password
            })
        });

        return true
    }

    async logout(){
        const userRedux = this.store.getRedux('user')
        const tasksRedux = this.store.getRedux('task')

        return new Promise((resolve)=>{
            this.dispatch(userRedux.actions.is_login_update(false))
            this.dispatch(userRedux.actions.profile_reset())
            this.dispatch(tasksRedux.actions.all_tasks_reset())
            sessionStorage.clear()
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
            path : `/user/${ids}/users`,
            method : 'get',
        });

        return result
    }

    async getAll() {
        const memberRedux = this.store.getRedux('member')

        await this.dispatch(memberRedux.actions.loading_update(true))

        const result = await api_request({
            path : `/user/list`,
            method : 'get',
        });


        await this.dispatch(memberRedux.actions.users_update(result))
        await this.dispatch(memberRedux.actions.loading_update(false))

        return result
    }
}
