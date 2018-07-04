import React from 'react'
import StandardPage from '../../StandardPage'

import TaskApplicationDetail from '@/module/task/application/Container'
import Navigator from '@/module/page/shared/Navigator/Container'

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

    /*
    componentWillUnmount() {
        this.props.resetTaskDetail()
    }
    */

    ord_renderContent () {
        const candidate = (!_.isEmpty(this.props.task.candidates) &&
            this.props.task.candidates.find((candidate) => {
                return candidate.user._id === this.props.match.params.applicantId
            }))
        const taskDetailLink = `/profile/task-detail/${this.props.task._id}`

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
                                <Breadcrumb.Item href={taskDetailLink}>
                                    {this.props.task.name}
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    {candidate && candidate.user.username || ''}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="p_ProfileTaskCandidateDetail p_admin_content">
                            <Row>
                                <Col span={20} className="c_ProfileContainer admin-left-column wrap-box-user">
                                    <TaskApplicationDetail task={this.props.task} page={this.props.page} applicantId={this.props.match.params.applicantId}/>
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
