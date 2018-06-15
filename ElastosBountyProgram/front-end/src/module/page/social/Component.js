import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import ContribForm from './formContribution/Container'
import moment from 'moment'
import ModalAddCommunity from '../admin/shared/ModalAddCommunity/Component'
import {SUBMISSION_TYPE} from '@/constant'
import './style.scss'

import { Col, Row, Icon, Form, message, Button, Select, Table, List, Tooltip } from 'antd'

const Option = Select.Option

import { TASK_STATUS, TASK_TYPE } from '@/constant'

export default class extends StandardPage {
    state = {
        visibleModalAddCommunity: false
    }

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
            width: '20%',
            className: 'fontWeight500 allow-wrap',
            render: (name, record) => {
                return <a onClick={this.linkTaskDetail.bind(this, record._id)} className="tableLink">{name}</a>
            }
        }, {
            title: 'Description',
            dataIndex: 'description',
            className: 'allow-wrap',
            width: '30%'
        }, {
            title: 'Community',
            dataIndex: 'community',
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
            <div className="p_Social">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page-title">
                    <h3 className="page-header">
                        General Events and Community Tasks
                    </h3>
                </div>
                <div className="ebp-page-desc d_rowGrey">
                    <p>
                        This program is for members interested in helping organizers plan events or take on
                        small tasks created by organizers to help promote Elastos to the community
                    </p>
                </div>
                <div className="ebp-page">
                    <Row className="d_row d_rowTop">
                        <Col span={false && this.props.is_login ? 16 : 24} className="d_leftContainer d_box">
                            <div className="pull-left">
                                <h3>
                                    Events Looking for Help
                                </h3>
                            </div>
                            <div className="pull-right btnContainer">
                                <Button onClick={this.createTaskLink.bind(this, TASK_TYPE.EVENT)}>
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
                        {false && this.props.is_login &&
                        <Col span={8} className="d_rightContainer d_box d_communities">
                            <div className="pull-left">
                                <h3>
                                    My Communities
                                </h3>
                            </div>
                            <div className="pull-right btnContainer">
                                <Button className="view-all-btn" onClick={this.showModalAddCommunity.bind(this)}>
                                    Add
                                </Button>

                                <ModalAddCommunity
                                    wrappedComponentRef={this.saveFormAddCommunityRef.bind(this)}
                                    visible={this.state.visibleModalAddCommunity}
                                    onCancel={this.handleCancelModalAddCommunity.bind(this)}
                                    onCreate={this.handleCreateCommunity.bind(this)}
                                />
                            </div>
                            <div className="clearfix"/>

                            <List
                                size="small"
                                dataSource={this.props.myCommunities}
                                renderItem={(community) => {

                                    let communityLink = '/community/'
                                    if (community.parentCommunityId) {
                                        communityLink += community.parentCommunityId + '/country/' + community.geolocation + '/region/' + community.name
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
                        }
                    </Row>
                    <div className="horizGap">

                    </div>
                </div>
                <div className="ebp-page">
                    <Row className="d_row">
                        <Col span={false && this.props.is_login ? 16 : 24} className="d_leftContainer d_box">
                            <div>
                                <h3 className="pull-left">
                                    Available Tasks
                                </h3>
                                <div className="pull-right btnContainer">
                                    <Button onClick={this.createTaskLink.bind(this, TASK_TYPE.TASK)}>
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
                        {false && this.props.is_login &&
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
                        }
                    </Row>
                </div>
                <Footer/>
            </div>
        )
    }

    saveFormAddCommunityRef (formRef) {
        this.formRefAddCommunity = formRef
    }

    async handleEventFilterChange (val) {

    }

    addCommunity() {
        // pop a modal with community suggestion submission form
    }

    linkTaskDetail(taskId) {
        this.props.history.push(`/task-detail/${taskId}`)
    }

    createTaskLink (taskType) {
        if (!this.props.is_login || !(this.props.is_leader || this.props.is_admin)) {
            message.info('Only organizers can create events and tasks, we welcome anyone to email us for further information and to apply', 8)
        } else {
            this.props.history.push(`/task-create?type=${taskType}`)
        }
    }

    showModalAddCommunity () {
        this.formRefAddCommunity.props.form.setFieldsValue({
            geolocation: this.props.match.params['country'],
        }, () => {
            this.setState({
                visibleModalAddCommunity: true
            })
        })
    }

    handleCancelModalAddCommunity () {
        const form = this.formRefAddCommunity.props.form
        form.resetFields()

        this.setState({
            visibleModalAddCommunity: false
        })
    }

    handleCreateCommunity () {
        const form = this.formRefAddCommunity.props.form

        form.validateFields((err, values) => {
            if (err) {
                return
            }

            form.resetFields()
            this.setState({visibleModalAddCommunity: false})

            this.props.addCommunitySubmission({
                community: values.community,
                state: values.state,
                city: values.city,
                type: SUBMISSION_TYPE.ADD_COMMUNITY,
                title: 'Please add a new community',
                description: 'Thank you'
            }).then(() => {
                message.success('Your submission for a new community is being processed. Thanks!')
            }).catch((err) => {
                console.error(err);
                message.error('Error while creating a community submission')
            })
        })
    }

}
