import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import IssueForm from './formIssue/Container'

import './style.scss'

import { Col, Row, Icon, Form, Input, Button, Modal, Select, Table, List, Tooltip } from 'antd'
import moment from 'moment/moment'

const Option = Select.Option
const FormItem = Form.Item

import { TASK_STATUS } from '@/constant'

export default class extends StandardPage {

    componentDidMount () {
        this.props.getDeveloperEvents()
        this.props.getUserTeams(this.props.currentUserId)
    }

    componentWillUnmount () {
        this.props.resetTasks()
    }

    ord_renderContent () {

        const eventData = this.props.events
        const taskData = this.props.tasks

        const availTasksData = this.props.availTasks
        const myTasksData = this.props.myTasks

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
            dataIndex: 'community',
            key: 'community',
            render: (community, data) => {
                if (!community) {
                    return null;
                }

                if (data.communityParent) {
                    let nameParent = data.communityParent.name;
                    return (<p>{nameParent}/{community.name}</p>)
                } else {
                    return (<p>{community.name}</p>)
                }

            }
        }, {
            title: 'Reward',
            dataIndex: 'reward.ela',
            className: 'right-align',
            render: (ela) => ela / 1000
        }, {
            title: 'Register By',
            dataIndex: 'startTime',
            className: 'right-align',
            render: (startTime) => moment(startTime).format('MMM D')
        }]

        // const p = this.getIssueFormProps()
        return (
            <div className="p_Developer">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page-title">
                    <h3 className="page-header">
                        Contribute to Open Source Projects and dApps
                    </h3>
                </div>
                <div className="ebp-page-desc d_rowGrey">
                    <p>
                        Most of Elastos projects are open source, this program is for all developers
                        who want to earn ELA and recognition for their efforts developing the platform
                    </p>
                </div>
                <div className="ebp-page">
                    <Row className="d_row d_rowTop">
                        <Col span={16} className="d_leftContainer d_box">
                            <div className="pull-left">
                                <h3>
                                    Join Training and Developer Events
                                </h3>
                            </div>
                            <div className="pull-right btnContainer">
                                {/*
                                // TODO
                                <Button onClick={this.createTaskLink.bind(this)}>
                                    Suggest an Event
                                </Button>
                                */}
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
                    <Row className="d_row">
                        <Col span={16} className="d_leftContainer d_box">
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
                                dataSource={availTasksData}
                                loading={this.props.loading}
                            />
                        </Col>
                        <Col span={8} className="d_rightContainer d_box">
                            <h3>
                                My Tasks
                            </h3>

                            <List
                                size="small"
                                dataSource={myTasksData}
                                renderItem={(task) => {

                                    const listItemActions = [task.curCandidate.type === 'USER' ?
                                        <Tooltip title="Solo User">
                                            <Icon type="user"/>
                                        </Tooltip> :
                                        <Tooltip title={`Signed up as Team: ${task.curCandidate.team.name}`}>
                                            <Icon type="team"/>
                                        </Tooltip>]

                                    return <List.Item actions={listItemActions}>
                                        <a onClick={() => {this.props.history.push(`/task-detail/${task._id}`)}}>
                                            {task.name}
                                        </a>
                                    </List.Item>
                                }}
                            />
                        </Col>
                    </Row>
                </div>
                <Footer/>
            </div>
        )
    }

    linkTaskDetail(taskId) {
        this.props.history.push(`/task-detail/${taskId}`)
    }

    createTaskLink () {
        this.props.history.push('/task-create')
    }
}
