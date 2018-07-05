import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import ContribForm from './formContribution/Container'
import moment from 'moment'
import ModalJoinCommunity from './ModalJoinCommunity/Component'
import {SUBMISSION_TYPE} from '@/constant'
import './style.scss'

import { Col, Row, Icon, Form, message, Button, Select, Table, List, Tooltip, Cascader } from 'antd'

const Option = Select.Option

import { TASK_STATUS, TASK_TYPE } from '@/constant'
import _ from 'lodash'

export default class extends StandardPage {
    state = {
        visibleModalJoinCommunity: false,
        communityTrees: [],
        filterCommunity: []
    }

    componentDidMount () {
        this.props.getSocialEvents()
        this.props.getMyCommunities(this.props.currentUserId)
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

    ord_renderContent () {
        let eventData = this.props.events
        const taskData = this.props.tasks
        let availTasksData = this.props.availTasks
        const myTasksData = this.props.myTasks

        const filterTreeLevel = this.state.filterCommunity.length
        if (filterTreeLevel) {
            if (filterTreeLevel === 1) {
                eventData = eventData.filter((event) => {
                    return event && event.community && event.community._id === this.state.filterCommunity[0]
                })

                availTasksData = availTasksData.filter((event) => {
                    return event && event.community && event.community._id === this.state.filterCommunity[0]
                })
            } else if (filterTreeLevel === 2) {
                eventData = eventData.filter((event) => {
                    return event && event.community && event.communityParent && event.communityParent._id === this.state.filterCommunity[0] && event.community._id === this.state.filterCommunity[1]
                })

                availTasksData = availTasksData.filter((event) => {
                    return event && event.community && event.communityParent && event.communityParent._id === this.state.filterCommunity[0] && event.community._id === this.state.filterCommunity[1]
                })
            }
        }

        const filterCommunityEl = <Cascader value={[...this.state.filterCommunity]} style={{width: '300px'}} options={this.state.communityTrees} placeholder="Filter by community" onChange={this.handleOnChangeFilter.bind(this)}/>

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
            width: '30%',
            render: (desc) => {
                return _.truncate(desc, {length: 100})
            }
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
                        <Col md={{span:24}} lg={{span: 16}} className="d_leftContainer d_box">
                            <div>
                                {filterCommunityEl}
                            </div>
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
                        <Col md={{span:24}} lg={{span: 8}} className="d_rightContainer d_box d_communities">
                            <div className="pull-left">
                                <h3>
                                    My Communities
                                </h3>
                            </div>
                            <div className="pull-right btnContainer">
                                <Button className="view-all-btn" onClick={this.showModalJoinCommunity.bind(this)}>
                                    Add
                                </Button>

                                <ModalJoinCommunity
                                    wrappedComponentRef={this.saveFormJoinCommunityRef.bind(this)}
                                    visible={this.state.visibleModalJoinCommunity}
                                    onCancel={this.handleCancelModalJoinCommunity.bind(this)}
                                    onCreate={this.handleCreateCommunity.bind(this)}
                                />
                            </div>
                            <div className="clearfix"/>

                            <List
                                size="small"
                                dataSource={this.props.myCommunities}
                                renderItem={(community) => {
                                    return <List.Item>
                                        <a onClick={this.filterByMyCommunity.bind(this, community)}>
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
                        <Col md={{span:24}} lg={{span: 16}} className="d_leftContainer d_box">
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
                <Footer/>
            </div>
        )
    }

    saveFormJoinCommunityRef (formRef) {
        this.formRefJoinCommunity = formRef
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

    showModalJoinCommunity () {
        this.setState({
            visibleModalJoinCommunity: true
        })
    }

    handleCancelModalJoinCommunity () {
        const form = this.formRefJoinCommunity.props.form
        form.resetFields()

        this.setState({
            visibleModalJoinCommunity: false
        })
    }

    handleCreateCommunity () {
        const form = this.formRefJoinCommunity.props.form

        form.validateFields((err, values) => {
            if (err) {
                return
            }

            form.resetFields()
            this.setState({visibleModalJoinCommunity: false})

            const communityId = values['community'][values['community'].length - 1];
            this.props.addMemberToCommunity(this.props.currentUserId, communityId).then(() => {
                message.success('You was added to the community. Thanks!')

                // Reload my communities
                this.props.getMyCommunities(this.props.currentUserId)
            }).catch((err) => {
                console.error(err);
                message.error('Error while joining the community')
            })
        })
    }

}
