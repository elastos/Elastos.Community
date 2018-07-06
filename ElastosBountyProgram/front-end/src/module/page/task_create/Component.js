import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import TaskCreateForm from '@/module/form/TaskCreateForm/Container'

import {TASK_TYPE} from '@/constant'

export default class extends StandardPage {
    ord_renderContent () {
        // default
        let taskType = TASK_TYPE.EVENT

        if (this.props.location && this.props.location.search) {
            const typeQry = this.props.location.search.match(/[\\?&]type=(\w+)/)
            if (typeQry.length > 1) {
                taskType = typeQry[1]
            }
        }

        return (
            <div className="p_Social">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page-title">
                    <h2>
                        Create Task / Event
                    </h2>
                </div>
                <div className="ebp-page">
                    <TaskCreateForm taskType={taskType}/>
                </div>
                <Footer />
            </div>
        )
    }
}
