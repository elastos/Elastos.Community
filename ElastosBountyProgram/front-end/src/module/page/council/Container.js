import {createContainer} from '@/util'
// import UserService from '@/service/UserService'
import Component from './Component'
import {TASK_TYPE, TASK_CATEGORY} from '@/constant'
// import SubmissionService from '@/service/SubmissionService'
// import _ from 'lodash'

import {SUBMISSION_TYPE, USER_EMPOWER_TYPE} from '@/constant'

export default createContainer(Component, (state) => {
    return {
        user: state.user,
        is_login: state.user.is_login
    }
}, () => {
    // const userService = new UserService()
    return {}
})
