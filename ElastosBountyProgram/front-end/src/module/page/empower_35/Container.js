import {createContainer} from '@/util'
// import UserService from '@/service/UserService'
import Component from './Component'
import {TASK_TYPE, TASK_CATEGORY} from '@/constant'
import SubmissionService from '@/service/SubmissionService'
import TeamService from '@/service/TeamService'
import _ from 'lodash'

import {SUBMISSION_TYPE, USER_EMPOWER_TYPE} from '@/constant'

export default createContainer(Component, (state) => {
    const allCircles = state.team.all_teams
    const myCircles = state.user.circles

    return {
        ...state.team,
        myCircles,
        user: state.user,
        is_login: state.user.is_login,
        currentUserId: state.user.current_user_id
    }
}, () => {
    // const userService = new UserService()
    const submissionService = new SubmissionService();
    const teamService = new TeamService()

    return {
        async getTeams(query) {
            return teamService.index(query)
        },

        async getEmpowerUsers() {
            /*
            return userService.getAll({
                empower: JSON.stringify({$exists: true})
            })
            */
        },

        async empowerApply(formData, state) {

            await submissionService.create({

                title: state.applyEmpowerType + ' Empower35 Application',
                type: SUBMISSION_TYPE.EMPOWER_35,
                campaign: state.applyEmpowerType,

                reason: formData.applyReason,
                suitedReason: formData.suitedReason,

                attachment: formData.filePath,
                attachmentFilename: formData.fileName,
                attachmentType: formData.fileType,

            })
        }
    }
})
