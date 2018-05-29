import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import { Col, Row, Icon, Divider, Button, Spin } from 'antd'

import {TASK_STATUS} from '@/constant'

import './style.scss'

export default class extends BaseComponent {

    ord_render () {

        return (_.isEmpty(this.props.task) || this.props.task.loading ?
            <div><Spin size="large" /></div> :
            <div className="c_TaskDetail">
                <div className="l_banner">
                    <div className="pull-left">
                        {this.props.task.status === TASK_STATUS.PENDING &&
                            <div>
                                Status: <span className="status">{this.props.task.status}</span>
                                <span className="help-text">&nbsp; - this task is awaiting approval</span>
                            </div>
                        }
                    </div>
                    <div className="pull-right right-align">
                        {this.props.task.status === TASK_STATUS.PENDING &&
                        <Button type="primary" onClick={this.props.approveTask}>Approve</Button>
                        }
                        <Button>Edit</Button>
                    </div>
                    <div className="clearfix"/>
                </div>

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
                            {this.props.task.desc ?
                                this.props.task.desc :
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
}
