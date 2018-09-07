import React from 'react'
import TasksBaseAdmin from '../TasksBaseAdmin'

import '../admin.scss'
import './style.scss'

import {TASK_STATUS} from '@/constant'

export default class extends TasksBaseAdmin {

    ord_getAllTasks() {
        return this.props.all_tasks.filter((task) => {
            return task.category === 'CR100'
        })
    }

    ord_getTaskPageName() {
        return 'cr100'
    }
}
