import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import TaskCreateForm from '@/module/form/TaskCreateForm/Container'
import { Col, Row, Icon, Divider, Button, Spin } from 'antd'

import TaskPublicDetail from './detail/Container'

import {TASK_STATUS} from '@/constant'

import './style.scss'

/**
 * This has 3 views
 *
 * 1. Public
 * 2. Admin
 * 3. Edit
 *
 */
export default class extends BaseComponent {

    renderMain() {
        return (
            <div className="c_TaskDetail">
                {this.props.page === 'admin' &&
                <div className="l_banner">
                    <div className="pull-left">
                        Status: <span className="status">{this.props.task.status}</span>
                        {this.props.task.status === TASK_STATUS.CREATED &&
                        <span className="help-text">&nbsp; - this task does not require approval</span>
                        }
                        {this.props.task.status === TASK_STATUS.PENDING &&
                        <span className="help-text">&nbsp; - this task is awaiting approval</span>
                        }
                        {this.props.task.status === TASK_STATUS.APPROVED &&
                        <span className="help-text">&nbsp; - this task is approved by {this.props.task.approvedBy}</span>
                        }
                    </div>
                    <div className="pull-right right-align">
                        {!this.state.editing && this.props.task.status === TASK_STATUS.PENDING &&
                        <Button type="primary" onClick={this.approveTask.bind(this)}>Approve</Button>
                        }
                        {this.state.editing && <Button onClick={this.resetEdit.bind(this)}>Reset</Button>}
                        <Button onClick={this.switchEditMode.bind(this)}>
                            {this.state.editing ? 'Cancel' : 'Edit'}
                        </Button>
                    </div>
                    <div className="clearfix"/>
                </div>}

                {this.state.editing ? this.renderEditForm() : this.renderDetail()}
            </div>
        )
    }

    renderEditForm() {
        return <div className="form-wrapper">
            <TaskCreateForm existingTask={this.props.task} switchEditMode={this.switchEditMode.bind(this)}/>
        </div>
    }

    renderDetail() {
        if (this.props.page === 'admin') {
            return this.renderAdminDetail()
        } else {
            return <TaskPublicDetail task={this.props.task}/>
        }
    }

    renderAdminDetail() {

        return (
            <div>
                <Row>
                    <Col span={8} className="gridCol right-align">
                        <h4>
                            Task Name
                        </h4>
                    </Col>
                    <Col span={16} className="gridCol">
                        <h3>
                            {this.props.task.name}
                        </h3>
                    </Col>
                </Row>
                <Row>
                <Col span={8} className="gridCol right-align">
                Community
                </Col>
                <Col span={16} className="gridCol">
                    {this.props.task.community}
                </Col>
                </Row>
                <Row>
                    <Col span={8} className="gridCol right-align">
                        Leader
                    </Col>
                    <Col span={16} className="gridCol">
                        {this.props.task.createdBy}
                    </Col>
                </Row>
                <Row>
                <Col span={8} className="gridCol right-align">
                    Category
                    </Col>
                <Col span={16} className="gridCol">
                    {this.props.task.category}
                </Col>
                </Row>
                <Row>
                    <Col span={8} className="gridCol right-align">
                        Type
                    </Col>
                    <Col span={16} className="gridCol">
                        {this.props.task.type}
                    </Col>
                </Row>
                <Row>
                <Col span={8} className="gridCol right-align">
                    Description
                    </Col>
                <Col span={16} className="gridCol">
                    <p>
                        {this.props.task.description ?
                            this.props.task.description :
                            <span className="no-info">no description</span>
                        }
                    </p>
                </Col>
                </Row>

                <Divider>ELA Requested</Divider>

                <Row>
                <Col span={8} className="gridCol right-align">
                    Upfront
                    </Col>
                <Col span={16} className="gridCol">
                    {this.props.task.rewardUpfront.ela / 1000}
                </Col>
                </Row>

                <Row>
                    <Col span={8} className="gridCol right-align">
                        Reward
                    </Col>
                    <Col span={16} className="gridCol">
                        {this.props.task.reward.ela / 1000}
                    </Col>
                </Row>

                <Divider>Attachments</Divider>
            </div>
        )
    }

    ord_render () {

        return (_.isEmpty(this.props.task) || this.props.task.loading ?
            <div class="center"><Spin size="large" /></div> :
            this.renderMain()
        )
    }

    async approveTask() {
        const taskId = this.props.task._id
        return this.props.approveTask(taskId)
    }

    async saveTask() {

    }

    async resetEdit() {

    }

    switchEditMode() {
        this.setState({editing: !this.state.editing})
    }

}
