import {createContainer} from '@/util'
import Component from './Component'
import CommentService from '@/service/CommentService'
import {message} from 'antd'

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
        currentUserId: state.user.current_user_id
    }
}, () => {
    const commentService = new CommentService()

    return {
        async postComment(type, reduxType, detailReducer, parentId, comment) {
            try {
                const rs = await commentService.postComment(type, reduxType, detailReducer, parentId, comment)

                if (rs) {
                    message.success('Your comment has been posted.');
                }
            } catch (err) {
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
