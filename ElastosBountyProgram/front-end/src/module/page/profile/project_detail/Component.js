import React from 'react'
import StandardPage from '../../StandardPage'

// TODO: proper naming scheme
import TaskDetail from '@/module/task/Container'
import Navigator from '@/module/page/shared/HomeNavigator/Container'
import Footer from '@/module/layout/Footer/Container';
import config from '@/config'

import './style.scss'
import '../../admin/admin.scss'

import { Col, Row, Breadcrumb, Icon } from 'antd'
import { TASK_TYPE } from '@/constant'

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
            <div className="p_ProfileProjectDetail">
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
                                <Breadcrumb.Item href="/profile/projects">Projects</Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    {this.props.task.name}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="p_admin_content">
                            <Row>
                                <Col span={4} className="admin-left-column wrap-box-navigator">
                                    <Navigator selectedItem="profileProjects" />
                                </Col>
                                <Col span={20} className="c_ProfileContainer admin-right-column wrap-box-user">
                                    <TaskDetail task={this.props.task} />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
