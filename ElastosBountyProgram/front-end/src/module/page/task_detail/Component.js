import React from 'react';
import StandardPage from '../StandardPage';
import Footer from '@/module/layout/Footer/Container'

// TODO: this is backwards and confusing
import TaskDetail from '@/module/task/Container'

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

    componentWillUnmount() {
        this.props.resetTaskDetail()
    }

    ord_renderContent () {
        return (
            <div className="p_TaskDetail">
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
                    </Breadcrumb>

                    <TaskDetail task={this.props.task}/>
                </div>
                <Footer />
            </div>
        )
    }
}
