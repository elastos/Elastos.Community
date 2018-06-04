import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import ContribForm from './formContribution/Container'
import moment from 'moment'

import './style.scss'

import { Col, Row, Icon, Form, Input, Button, Select, Table } from 'antd'

const Option = Select.Option

import { TASK_STATUS } from '@/constant'

export default class extends StandardPage {

    componentDidMount () {
        this.props.getSocialEvents()
    }

    componentWillUnmount () {
        this.props.resetTasks()
    }

    ord_renderContent () {

        const eventData = this.props.events
        const taskData = this.props.tasks

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            className: 'fontWeight500',
            render: (name, record) => {
                return <a onClick={this.linkTaskDetail.bind(this, record._id)} className="tableLink">{name}</a>
            }
        }, {
            title: 'Community',
            dataIndex: 'communityId',
            key: 'communityId'
        }, {
            title: 'Date',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (startTime) => moment(startTime).format('MMM D')
        }, {
            title: '',
            dataIndex: '_id',
            key: 'actions',
            render: (id, record) => {

            }
        }]

        return (
            <div className="p_Social">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page-title">
                    <h2>
                        Help Manage Events and Social Bounties
                    </h2>
                </div>
                <div className="ebp-page-desc d_rowGrey">
                    <p>
                        This program is for members interested in helping leaders organize events or take on
                        small tasks created by leaders to help promote Elastos to the community
                    </p>
                </div>
                <div className="ebp-page">
                    <Row className="d_row d_rowTop">
                        <Col span={16} className="d_leftContainer d_box">
                            <div className="pull-left">
                                <h3>
                                    Events
                                </h3>
                            </div>
                            <div className="pull-right btnContainer">
                                {this.props.is_admin &&
                                <Button onClick={this.createTaskLink.bind(this)}>
                                    Create Event
                                </Button>
                                }
                            </div>

                            <Table
                                className="clearfix"
                                columns={columns}
                                rowKey={(item) => item._id}
                                dataSource={eventData}
                                loading={this.props.loading}
                            />
                        </Col>
                        <Col span={8} className="d_rightContainer d_box">
                            <h2>
                                Submit a Contribution
                            </h2>
                            <ContribForm/>
                        </Col>
                    </Row>
                    <div className="horizGap">

                    </div>
                </div>
                <div className="ebp-page">
                    <Row className="d_row">
                        <Col span={16} className="d_leftContainer d_box">
                            <div>
                                <h3 className="pull-left">
                                    Available Tasks
                                </h3>
                                <div className="pull-right btnContainer">
                                    {this.props.is_admin &&
                                    <Button onClick={this.createTaskLink.bind(this)}>
                                        Create Task
                                    </Button>
                                    }
                                </div>
                            </div>

                            <Table
                                className="clearfix"
                                columns={columns}
                                rowKey={(item) => item._id}
                                dataSource={taskData}
                                loading={this.props.loading}
                            />
                        </Col>
                        <Col span={8} className="d_rightContainer d_box">
                            <h3>
                                My Tasks
                            </h3>
                        </Col>
                    </Row>
                </div>
                <Footer/>
            </div>
        )
    }

    async handleEventFilterChange (val) {

    }


    linkTaskDetail(taskId) {
        this.props.history.push(`/task-detail/${taskId}`)
    }

    createTaskLink () {
        this.props.history.push('/task-create')
    }
}
