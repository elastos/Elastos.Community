import {createContainer} from '@/util'
import Component from './Component'
import CommentService from '@/service/CommentService'
import UserService from '@/service/UserService'
import {message} from 'antd'
import _ from 'lodash'

export default createContainer(Component, (state) => {
    return {
        task: state.task.detail,
        submission: state.submission.detail,
        team: state.team.detail,
        loading: {
            task: state.task.loading,
            submission: state.submission.loading,
            team: state.team.loading
        },
        currentUserId: state.user.current_user_id,
        all_users: _.values(state.member.users || [])
    }
}, () => {
    const commentService = new CommentService()
    const userService = new UserService()

    return {
        async postComment(type, reduxType, detailReducer, parentId, comment, headline) {
            try {
                const rs = await commentService.postComment(type, reduxType, detailReducer, parentId, comment, headline)

                if (rs) {
                    message.success('Your comment has been posted.');
                }
            } catch (err) {
                message.error(err.message)
            }
        },

        async listUsers () {
            try {
                return await userService.getAll()
            } catch (err) {
                console.error(err)
                message.error(err.message)
            }
        },

        async subscribe(type, parentId) {
            try {
                await commentService.subscribe(type, parentId)
            } catch (err) {
                message.error(err.message)
            }
        },

        async unsubscribe(type, parentId) {
            try {
                await commentService.unsubscribe(type, parentId)
            } catch (err) {
                message.error(err.message)
            }
        }
    }
})
