import React from 'react'
import StandardPage from '../../StandardPage'

// TODO: proper naming scheme
import TaskDetail from '@/module/task/Container'
import Navigator from '@/module/page/shared/HomeNavigator/Container'

import config from '@/config'

import './style.scss'
import '../../admin/admin.scss'

import { Col, Row, Breadcrumb, Icon } from 'antd'

export default class extends StandardPage {

    state = {
        editing: false
    }

    componentDidMount() {
        const taskId = this.props.match.params.taskId
        this.props.getTaskDetail(taskId)
    }

    componentWillUnmount() {
        this.props.resetTaskDetail()
    }

    ord_renderContent () {
        return (
            <div>
                <div className="ebp-header-divider">

                </div>
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_breadcrumb">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <Icon type="home" />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Profile</Breadcrumb.Item>
                                <Breadcrumb.Item href="/profile/tasks">Tasks</Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    {this.props.task.name}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="p_ProfileTaskDetail p_admin_content">
                            <Row>
                                <Col span={20} className="c_ProfileContainer admin-left-column wrap-box-user">
                                    <TaskDetail task={this.props.task} />
                                </Col>
                                <Col span={4} className="admin-right-column wrap-box-navigator">
                                    <Navigator selectedItem={'profileTasks'} />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
