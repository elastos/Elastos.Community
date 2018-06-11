import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import task from './redux/task'
import user from './redux/user'
import community from './redux/community'
import member from './redux/member'
import submission from './redux/submission'

const default_state = {
    init: false
};

const appReducer = (state = default_state, action) => {
    switch (action.type) {

    }

    return state
}

export default combineReducers({
    app: appReducer,
    router: routerReducer,
    task: task.getReducer(),
    user: user.getReducer(),
    community: community.getReducer(),
    member: member.getReducer(),
    submission: submission.getReducer()
})
