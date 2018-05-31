import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import IssueForm from './formIssue/Container'

import './style.scss'

import { Col, Row, Icon, Form, Input, Button, Modal, Select, Table } from 'antd'
import moment from 'moment/moment'

const Option = Select.Option
const FormItem = Form.Item

import { TASK_STATUS } from '@/constant'

export default class extends StandardPage {

    componentDidMount () {
        this.props.getDeveloperEvents()
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
                return <a href={`/admin/task-detail/${record._id}`} className="tableLink">{name}</a>
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

        // const p = this.getIssueFormProps()
        return (
            <div className="p_Developer">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page-title">
                    <h2>
                        Contribute to Open Source Projects and dApps
                    </h2>
                </div>
                <div className="ebp-page-desc d_rowGrey">
                    <p>
                        Most of Elastos projects are open source, this program is for all developers
                        who want to earn ELA and recognition for their efforts developing the platform
                    </p>
                </div>
                <div className="ebp-page">
                    <Row className="d_rowTop">
                        <Col span={16} className="d_box">
                            <div className="pull-left">
                                <h3>
                                    Join Training and Developer Events
                                </h3>
                            </div>
                            <div className="pull-right btnContainer">
                                {this.props.is_admin &&
                                <Button type="dashed" onClick={this.createTaskLink.bind(this)}>
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
                            <h3>
                                Submit an Issue
                            </h3>
                            <IssueForm/>
                        </Col>
                    </Row>
                    <div className="horizGap">

                    </div>
                </div>
                <div className="ebp-page">
                    <Row>
                        <Col span={16} className="d_box">
                            <div>
                                <h3 className="pull-left">
                                    Available Developer Tasks and Open Issues
                                </h3>
                                <div className="pull-right btnContainer">
                                    {this.props.is_admin &&
                                    <Button type="dashed" onClick={this.createTaskLink.bind(this)}>
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

    async createTaskLink () {
        this.props.history.push('/task-create')
    }
}
