import React from 'react'
import AdminPage from '../BaseAdmin'
import TaskDetail from '@/module/task/Container'

import '../admin.scss'
import './style.scss'

import Navigator from '../shared/Navigator/Component'

import { Breadcrumb, Col, Icon, Row, Spin } from 'antd'

import {TASK_STATUS} from '@/constant'

export default class extends AdminPage {

    state = {
        editing: false
    }

    async componentDidMount() {
        await super.componentDidMount()
        const taskId = this.props.match.params.taskId
        this.props.getTaskDetail(taskId)
    }

    componentWillUnmount() {
        this.props.resetTaskDetail()
    }


    ord_renderContent () {

        return (
            <div>
                {this.props.task.loading && <div className="center"><Spin size="large"/></div>}
                <div className="p_admin_index ebp-wrap" style={{display: this.props.task.loading ? 'none' : 'block'}}>
                    <div className="ebp-header-divider" />
                    <div className="d_box">
                        <div className="p_admin_breadcrumb">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <Icon type="home" />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Admin</Breadcrumb.Item>
                                <Breadcrumb.Item href="/admin/tasks">Tasks</Breadcrumb.Item>
                                <Breadcrumb.Item>{this.props.task.name}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="p_admin_content">
                            <Row className="clearfix">
                                <Col span={4} className="admin-left-column wrap-box-navigator">
                                    <Navigator selectedItem={this.props.task.category === 'CR100' ? 'cr100' : 'tasks'}/>
                                </Col>
                                <Col span={20} className="admin-right-column wrap-box-user">
                                    <TaskDetail task={this.props.task}/>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
