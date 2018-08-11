import {createContainer} from "@/util"
import Component from './Component'
import CommentService from '@/service/CommentService'
import TaskService from '@/service/TaskService'
import TeamService from '@/service/TeamService'
import SubmissionService from '@/service/SubmissionService'
import {message} from 'antd'

export default createContainer(Component, (state) => {

    return {
        task: state.task.detail,
        submission: state.submission.detail,
        team: state.team.detail,
        loading: {
            task: state.task.loading,
            taskCandidate: state.task.loading,
            submission: state.submission.loading,
            team: state.team.loading
        },
        currentUserId: state.user.current_user_id
    }
}, () => {

    const commentService = new CommentService()
    const submissionService = new SubmissionService()
    const taskService = new TaskService()
    const teamService = new TeamService()

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
        },

        async getTaskDetail(taskId) {
            return taskService.get(taskId)
        },

        resetTaskDetail() {
            return taskService.resetTaskDetail()
        },

        async getSubmissionDetail(submissionId) {
            return submissionService.get(submissionId)
        },

        async resetSubmissionDetail(submissionId) {
            return submissionService.resetSubmissionDetail()
        },

        async getTeamDetail(teamId) {
            return teamService.get(teamId)
        },

        resetTeamDetail() {
            return teamService.resetTeamDetail()
        }
    }
})
