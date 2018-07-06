import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import { Link } from 'react-router-dom'
import config from '@/config'
import SubmissionForm from './formSubmission/Container'
import _ from 'lodash'
import './style.scss'

import { Col, Row, Icon, Form, Input, Button, Modal, Select, Table, List, Tooltip, Cascader } from 'antd'
import moment from 'moment/moment'

const Option = Select.Option
const FormItem = Form.Item

import { TASK_STATUS, TASK_TYPE } from '@/constant'

export default class extends StandardPage {
    state = {
        communityTrees: [],
        filterCommunity: [],

        taskTypeSelected: this.props.match.type || TASK_TYPE.EVENT
    }

    componentDidMount () {
        this.props.getDeveloperEvents()
        this.props.getUserTeams(this.props.currentUserId)
        this.getCommunityTrees()
    }

    getCommunityTrees() {
        this.props.getAllCommunities().then((communityTrees) => {
            this.setState({
                communityTrees
            })
        })
    }

    componentWillUnmount () {
        this.props.resetTasks()
    }

    handleOnChangeFilter(value, selectedOption) {
        this.setState({
            filterCommunity: value
        })
    }

    filterByMyCommunity(community) {
        let filterCommunity = []

        if (community.parentCommunityId) {
            filterCommunity.push(community.parentCommunityId)
        }

        filterCommunity.push(community._id)

        this.setState({
            filterCommunity: filterCommunity
        })
    }

    changeTaskType(taskType) {
        this.setState({
            taskTypeSelected: taskType
        })
    }

    ord_renderContent () {
        let eventData = this.props.events
        let availTasksData = this.props.availTasks
        let projectTaskData = this.props.projectTasks
        // const myTasksData = this.props.myTasks

        const filterTreeLevel = this.state.filterCommunity.length
        if (filterTreeLevel) {
            if (filterTreeLevel === 1) {
                eventData = eventData.filter((event) => {
                    return event && event.community && event.community._id === this.state.filterCommunity[0]
                })

                availTasksData = availTasksData.filter((event) => {
                    return event && event.community && event.community._id === this.state.filterCommunity[0]
                })

                projectTaskData = projectTaskData.filter((event) => {
                    return event && event.community && event.community._id === this.state.filterCommunity[0]
                })
            } else if (filterTreeLevel === 2) {
                eventData = eventData.filter((event) => {
                    return event && event.community && event.communityParent && event.communityParent._id === this.state.filterCommunity[0] && event.community._id === this.state.filterCommunity[1]
                })

                availTasksData = availTasksData.filter((event) => {
                    return event && event.community && event.communityParent && event.communityParent._id === this.state.filterCommunity[0] && event.community._id === this.state.filterCommunity[1]
                })

                projectTaskData = projectTaskData.filter((event) => {
                    return event && event.community && event.communityParent && event.communityParent._id === this.state.filterCommunity[0] && event.community._id === this.state.filterCommunity[1]
                })
            }
        }

        const filterCommunityEl = <Cascader
            value={[...this.state.filterCommunity]}
            style={{width: '300px'}}
            options={this.state.communityTrees}
            placeholder="Filter by community"
            onChange={this.handleOnChangeFilter.bind(this)}
            changeOnSelect />

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            className: 'fontWeight500 col-name',
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
                        <Col md={{span:24}} lg={{span: 18}} className="d_leftContainer d_box">
                            <div className="pull-left btnContainer">
                                <Button className={'pill ' + (this.state.taskTypeSelected === TASK_TYPE.EVENT ? 'ant-btn-ebp' : '')} onClick={this.changeTaskType.bind(this, TASK_TYPE.EVENT)}>
                                    Training
                                </Button>
                                <Button className={'pill ' + (this.state.taskTypeSelected === TASK_TYPE.PROJECT ? 'ant-btn-ebp' : '')} onClick={this.changeTaskType.bind(this, TASK_TYPE.PROJECT)}>
                                    Projects
                                </Button>
                                <Button className={'pill ' + (this.state.taskTypeSelected === TASK_TYPE.TASK ? 'ant-btn-ebp' : '')} onClick={this.changeTaskType.bind(this, TASK_TYPE.TASK)}>
                                    Tasks
                                </Button>
                            </div>
                            <div className="pull-right btnContainer">
                                {filterCommunityEl}
                                {/*
                                // TODO
                                <Button onClick={this.createTaskLink.bind(this)}>
                                    Suggest an Event
                                </Button>
                                */}
                            </div>

                            <div className="vert-gap-sm clearfix"/>

                            {this.state.taskTypeSelected === TASK_TYPE.EVENT &&
                            <Table
                                className="clearfix"
                                columns={columns}
                                rowKey={(item) => item._id}
                                dataSource={eventData}
                                loading={this.props.loading}
                            />
                            }
                            {this.state.taskTypeSelected === TASK_TYPE.TASK &&
                            <Table
                                className="clearfix"
                                columns={columns}
                                rowKey={(item) => item._id}
                                dataSource={availTasksData}
                                loading={this.props.loading}
                            />
                            }
                            {this.state.taskTypeSelected === TASK_TYPE.PROJECT &&
                            <Table
                                className="clearfix"
                                columns={columns}
                                rowKey={(item) => item._id}
                                dataSource={projectTaskData}
                                loading={this.props.loading}
                            />
                            }
                        </Col>
                        <Col md={{span:24}} lg={{span: 6}} className="d_rightContainer d_box">
                            <h4>
                                Submit an Issue
                            </h4>
                            <SubmissionForm/>
                        </Col>
                    </Row>
                    <div className="horizGap">

                    </div>
                </div>
                {/*
                <div className="ebp-page">
                    <Row className="d_row">
                        <Col md={{span:24}} lg={{span: 16}} className="d_leftContainer d_box">
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

                        </Col>
                        <Col md={{span:24}} lg={{span: 8}} className="d_rightContainer d_box">
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
                */}
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
