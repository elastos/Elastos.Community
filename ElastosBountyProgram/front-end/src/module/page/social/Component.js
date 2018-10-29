import React from 'react'
import MediaQuery from "react-responsive"
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import ContribForm from './formContribution/Container'
import I18N from '@/I18N'
import moment from 'moment'
import ModalJoinCommunity from './ModalJoinCommunity/Component'
import './style.scss'

import { Col, Row, Icon, message, Button, Select, Table, List, Popover, Cascader, Popconfirm } from 'antd'

const Option = Select.Option

import { SUBMISSION_TYPE, TASK_STATUS, TASK_TYPE } from '@/constant'
import _ from 'lodash'
import {MAX_WIDTH_MOBILE, MIN_WIDTH_PC} from "../../../config/constant";

export default class extends StandardPage {
    state = {
        visibleModalJoinCommunity: false,
        communityTrees: [],
        filterCommunity: [],

        taskTypeSelected: this.props.match.type || TASK_TYPE.TASK,

        lookingForHelpOnly: true
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

    changeTaskType(taskType) {
        this.setState({
            taskTypeSelected: taskType
        })
    }

    ord_renderContent () {
        let eventData = this.props.events
        const taskData = this.props.tasks
        let availTasksData = this.props.availTasks
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
            } else if (filterTreeLevel === 2) {
                eventData = eventData.filter((event) => {
                    return event && event.community && event.communityParent && event.communityParent._id === this.state.filterCommunity[0] && event.community._id === this.state.filterCommunity[1]
                })

                availTasksData = availTasksData.filter((event) => {
                    return event && event.community && event.communityParent && event.communityParent._id === this.state.filterCommunity[0] && event.community._id === this.state.filterCommunity[1]
                })
            }
        }

        const filterCommunityEl = <Cascader
            value={[...this.state.filterCommunity]}
            style={{width: '250px'}}
            options={this.state.communityTrees}
            placeholder="Filter by community"
            onChange={this.handleOnChangeFilter.bind(this)}
            changeOnSelect />

        const columns = [{
            title: I18N.get('social.columns.name'),
            dataIndex: 'name',
            width: '20%',
            className: 'fontWeight500 allow-wrap',
            render: (name, record) => {
                return <a onClick={this.linkTaskDetail.bind(this, record._id)} className="tableLink">{name}</a>
            }
        }, /*{
            title: 'Description',
            dataIndex: 'description',
            className: 'allow-wrap',
            width: '30%',
            render: (desc) => {
                return _.truncate(desc, {length: 100})
            }
        },*/ {
            title: I18N.get('social.columns.community'),
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
            title: I18N.get('social.columns.reward'),
            dataIndex: 'reward.ela',
            className: 'right-align',
            render: (ela) => {
                if (ela) {
                    return ela / 1000
                }
                return ''
            }
        }, {
            title: I18N.get('social.columns.deadline'),
            dataIndex: 'startTime',
            className: 'right-align',
            render: (startTime) => moment(startTime).format('MMM D')
        }]

        let leftColLayout = {
            md: {
                span: 24
            },
            lg: {
                span: 18
            }
        }

        let rightColLayout = {
            md: {
                span: 24
            },
            lg: {
                span: 6
            }
        }

        if (!this.props.is_login) {
            leftColLayout = {
                span: 24
            }
        }

        return (
            <div className="p_Social">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page-title">
                    <h3 className="page-header">
                        {I18N.get('social.generalevent.header')}
                    </h3>
                </div>
                <div className="ebp-page-desc d_rowGrey">
                    <p>
                        {I18N.get('social.generalevent.description')}
                    </p>
                </div>
                <div className="ebp-page">
                    <Row className="d_row d_rowTop">
                        <Col {...leftColLayout} className="d_leftContainer d_box">
                            <div className="pull-left btnContainer">
                                <Button className={'pill ' + (this.state.taskTypeSelected === TASK_TYPE.EVENT ? 'ant-btn-ebp' : '')} onClick={this.changeTaskType.bind(this, TASK_TYPE.EVENT)}>
                                    Events
                                </Button>
                                <Button className={'pill ' + (this.state.taskTypeSelected === TASK_TYPE.TASK ? 'ant-btn-ebp' : '')} onClick={this.changeTaskType.bind(this, TASK_TYPE.TASK)}>
                                    Tasks
                                </Button>
                                {this.props.currentUserId &&
                                <Popover content={'Add ' + (this.state.taskTypeSelected === TASK_TYPE.EVENT ? 'event' : 'task')}>
                                    <Icon className="addTask" type="file-add" onClick={() => {
                                        this.props.history.push(`/task-create?category=SOCIAL&type=${this.state.taskTypeSelected}`)
                                    }}/>
                                </Popover>
                                }
                            </div>
                            <div className="pull-right btnContainer">
                                {/*
                                Looking for Help&nbsp;
                                <Checkbox checked={this.state.lookingForHelpOnly}/>
                                */}

                                {filterCommunityEl}
                                {/*
                                <Button onClick={this.createTaskLink.bind(this, TASK_TYPE.EVENT)}>
                                    Create Event
                                </Button>
                                */}
                            </div>
                            <div class="vert-gap-sm clearfix"/>

                            <MediaQuery minWidth={MIN_WIDTH_PC}>
                                {(matches) => {
                                    if (matches) {
                                        if(this.state.taskTypeSelected !== TASK_TYPE.EVENT)
                                        {
                                            return null;
                                        }
                                        columns.splice(1, 0, {
                                            title: 'Description',
                                            dataIndex: 'description',
                                            className: 'allow-wrap',
                                            width: '30%',
                                            render: (desc) => {
                                                return _.truncate(desc, {length: 100})
                                            }
                                        })

                                        return <Table
                                            columns={columns}
                                            rowKey={(item) => item._id}
                                            dataSource={eventData}
                                            loading={this.props.task_loading}
                                        />;
                                    } else {

                                        var index = columns.findIndex(item => item.dataIndex === 'description');
                                        columns.splice(index, 1);
                                        return null;
                                    }
                                }}
                            </MediaQuery>
                            <MediaQuery maxWidth={MAX_WIDTH_MOBILE}>
                            {this.state.taskTypeSelected === TASK_TYPE.EVENT &&
                            <Table
                                columns={columns}
                                rowKey={(item) => item._id}
                                expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                                expandRowByClick={true}
                                dataSource={eventData}
                                loading={this.props.task_loading}
                            />
                            }
                            </MediaQuery>
                            {this.state.taskTypeSelected === TASK_TYPE.TASK &&
                            <Table
                                className="clearfix"
                                columns={columns}
                                rowKey={(item) => item._id}
                                dataSource={availTasksData}
                                loading={this.props.task_loading}
                            />
                            }
                        </Col>
                        {this.props.is_login &&
                        <Col {...rightColLayout} className="d_rightContainer d_box d_communities">
                            <h4>
                                My Communities
                            </h4>
                            {/*
                            <div className="pull-left">
                                <h4>
                                    My Communities
                                </h4>
                            </div>
                            <div className="pull-right my-community-add-container right-align">
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
                            */}
                            <List
                                size="small"
                                dataSource={this.props.myCommunities}
                                loading={this.props.loading}
                                renderItem={(community) => {
                                    return <List.Item>
                                        <Row style={{'width': '100%'}}>
                                            <Col span={18}>
                                                <Popconfirm title="Go to community?" placement="left" okText="Yes"
                                                            onConfirm={() => {this.props.history.push(`/community/${community._id}/country/${community.geolocation}`)}}>
                                                    <span className="community-link">{community.name}</span>
                                                </Popconfirm>
                                            </Col>
                                            <Col span={6} className="right-align">
                                                <Icon type="filter" className="community-action" onClick={this.filterByMyCommunity.bind(this, community)}/>
                                            </Col>
                                        </Row>
                                    </List.Item>
                                }}
                            />
                        </Col>
                        }
                    </Row>
                    <div className="horizGap">

                    </div>
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
                message.success(I18N.get('social.addmember.success'))

                // Reload my communities
                this.props.getMyCommunities(this.props.currentUserId)
            }).catch((err) => {
                console.error(err);
                message.error(I18N.get('social.addmember.error'))
            })
        })
    }

}
