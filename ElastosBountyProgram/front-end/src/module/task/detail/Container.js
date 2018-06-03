import {createContainer} from '@/util'
import Component from './Component'
import TeamService from '@/service/TeamService'
import { message } from 'antd/lib/index'

export default createContainer(Component, (state) => {
    return {
        userId: state.user.current_user_id,
        is_login: state.user.is_login
    }
}, () => {

    const teamService = new TeamService()

    return {
        async listTeamsOwned(userId) {

            try {
                return await teamService.list({
                    owner: userId
                })
            } catch (err) {
                message.error(err.message)
            }
        }
    }
})
