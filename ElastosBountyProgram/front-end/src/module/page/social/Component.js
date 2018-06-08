import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import ContribForm from './formContribution/Container'
import moment from 'moment'

import './style.scss'

import { Col, Row, Icon, Form, Input, Button, Select, Table, List, Tooltip } from 'antd'

const Option = Select.Option

import { TASK_STATUS } from '@/constant'

export default class extends StandardPage {

    componentDidMount () {
        this.props.getSocialEvents()
        this.props.getMyCommunities(this.props.currentUserId)
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
                        General Events and Community Tasks
                    </h2>
                </div>
                <div className="ebp-page-desc d_rowGrey">
                    <p>
                        This program is for members interested in helping organizers plan events or take on
                        small tasks created by organizers to help promote Elastos to the community
                    </p>
                </div>
                <div className="ebp-page">
                    <Row className="d_row d_rowTop">
                        <Col span={16} className="d_leftContainer d_box">
                            <div className="pull-left">
                                <h3>
                                    Events Looking for Help
                                </h3>
                            </div>
                            <div className="pull-right btnContainer">
                                <Button onClick={this.createTaskLink.bind(this)}>
                                    Create Event
                                </Button>
                            </div>

                            <Table
                                className="clearfix"
                                columns={columns}
                                rowKey={(item) => item._id}
                                dataSource={eventData}
                                loading={this.props.loading}
                            />
                        </Col>
                        <Col span={8} className="d_rightContainer d_box d_communities">
                            <div className="pull-left">
                                <h3>
                                    My Communities
                                </h3>
                            </div>
                            <div className="pull-right btnContainer">
                                <Button className="view-all-btn" onClick={this.linkCommunities.bind(this)}>
                                    Manage
                                </Button>
                            </div>
                            <div className="clearfix"/>

                            <List
                                size="small"
                                dataSource={this.props.myCommunities}
                                renderItem={(community) => {

                                    let communityLink = '/community/'
                                    if (community.parentCommunityId) {
                                        communityLink += community.parentCommunityId + '/country/' + community.geolocation + '/region/' + community._id
                                    } else {
                                        communityLink += community._id + '/country/' + community.geolocation
                                    }

                                    return <List.Item>
                                        <a onClick={() => {this.props.history.push(communityLink)}}>
                                            {community.name}
                                        </a>
                                    </List.Item>
                                }}
                            />

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
                                    <Button onClick={this.createTaskLink.bind(this)}>
                                        Create Task
                                    </Button>
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

    async handleEventFilterChange (val) {

    }

    linkCommunities() {
        this.props.history.push('/community')
    }

    linkTaskDetail(taskId) {
        this.props.history.push(`/task-detail/${taskId}`)
    }

    createTaskLink () {
        this.props.history.push('/task-create')
    }
}
