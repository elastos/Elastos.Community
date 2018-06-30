import React from 'react';
import StandardPage from '../StandardPage';
import Footer from '@/module/layout/Footer/Container'

import TaskApplicationDetail from '@/module/task/application/Container'

import _ from 'lodash'
import './style.scss'
import { Link } from 'react-router-dom'
import { Breadcrumb, Icon } from 'antd'

import {TASK_CATEGORY} from '@/constant'

export default class extends StandardPage {

    componentDidMount() {
        const taskId = this.props.match.params.taskId
        this.props.getTaskDetail(taskId)
    }

    // componentWillUnmount() {
    //     this.props.resetTaskDetail()
    // }

    ord_renderContent () {
        return (
            <div className="p_TaskApplication">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page">

                    <Breadcrumb>
                        <Breadcrumb.Item href="/">
                            <Icon type="home"/>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {this.props.task.category === TASK_CATEGORY.SOCIAL ?
                                <Link to="/social">Social {_.capitalize(this.props.task.type)}s</Link> :
                                <Link to="/developer">Developer {_.capitalize(this.props.task.type)}s</Link>
                            }
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {this.props.task.name}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {this.props.applicantId} // TODO - show name or email
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <TaskApplicationDetail task={this.props.task} applicant={this.props.applicantId}/>
                </div>
                <Footer />
            </div>
        )
    }
}
