import {createContainer} from '@/util'
import Component from './Component'
import TaskService from '@/service/TaskService';
import TeamService from '@/service/TeamService';
import _ from 'lodash'

export default createContainer(Component, (state) => {
    const search = state.router.location.search
    let type = null

    if (!_.isEmpty(search)) {
        const typeQry = search.match(/[\\?&]type=([\w]+)/)
        if (typeQry && typeQry.length > 1) {
            type = typeQry[1]
        }
    }

    return {
        ...state,
        preselect: type
    }
}, () => {
    return {
    }
})
