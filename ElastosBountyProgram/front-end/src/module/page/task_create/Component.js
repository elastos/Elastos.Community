import React from 'react';
import StandardPage from '../StandardPage';
import Footer from '@/module/layout/Footer/Container'
import TaskCreateForm from '@/module/form/TaskCreateForm/Container'

import {TASK_TYPE, TASK_CATEGORY} from '@/constant'

export default class extends StandardPage {

    ord_renderContent () {

        // default
        let taskType = TASK_TYPE.EVENT
        let taskCategory = TASK_CATEGORY.SOCIAL

        if (this.props.location && this.props.location.search) {
            const typeQry = this.props.location.search.match(/[\\?&]type=([\w]+)/)
            if (typeQry && typeQry.length > 1) {
                taskType = typeQry[1]
            }

            const categoryQry = this.props.location.search.match(/[\\?&]category=([\w]+)/)
            if (categoryQry && categoryQry.length > 1) {
                taskCategory = categoryQry[1]
            }
        }

        return (
            <div className="p_Social">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page-title">
                    <h2>
                        {
                            taskType === TASK_TYPE.PROJECT
                                ? 'Create Project'
                                : 'Create Task / Event'
                        }
                    </h2>
                </div>
                <div className="ebp-page">
                    <TaskCreateForm taskType={taskType} taskCategory={taskCategory}/>
                </div>
                <Footer />
            </div>
        )
    }
}
