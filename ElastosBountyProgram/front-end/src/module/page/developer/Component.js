import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import { Link } from 'react-router-dom'
import config from '@/config'
import SubmissionForm from './formSubmission/Container'

import './style.scss'

import { Col, Row, Icon, Form, Input, Button, Modal, Select, Table, List, Tooltip, Breadcrumb, Card } from 'antd'
import moment from 'moment/moment'

const Option = Select.Option
const FormItem = Form.Item

import { TASK_STATUS } from '@/constant'

export default class extends StandardPage {
    state = {
        communities: [],
    }

    componentDidMount () {
        this.props.getDeveloperEvents()
        this.loadCommunities()
        this.props.getUserTeams(this.props.currentUserId)
    }

    loadCommunities() {
        const currentCountry = this.props.match.params['country'];
        if (currentCountry) {
            this.props.getSpecificCountryCommunities(currentCountry).then((communities) => {
                this.convertCommunitiesLeaderIdsToLeaderObjects(communities).then((communities) => {
                    this.setState({
                        communities
                    })
                })
            })
        } else {
            this.props.getAllCountryCommunity().then((communities) => {
                this.convertCommunitiesLeaderIdsToLeaderObjects(communities).then((communities) => {
                    this.setState({
                        communities
                    })
                })
            })
        }
    }

    renderListCommunities() {
        return this.state.communities.map((community, index) => {
            return (
                <div key={index}>
                    {community.leaders.map((leader) => {
                        return (
                            <Col span={3} key={index} className="user-card">
                                <Link to={'/developer/' + community._id  + '/country/' + community.geolocation}>
                                    <Card
                                        key={index}
                                        cover={<img src={leader.profile.avatar}/>}
                                    >
                                        <h5>
                                            {community.name}
                                        </h5>
                                        <p className="user-info">
                                            {leader.profile.firstName + ' ' + leader.profile.lastName}<br/>
                                            <span class="no-info">{leader.profile.username}</span>
                                        </p>
                                    </Card>
                                </Link>
                            </Col>
                        )
                    })}
                </div>
            )
        })
    }

    handleChangeCountry(geolocation) {
        if (geolocation) {
            this.props.getSpecificCountryCommunities(geolocation).then((communities) => {
                this.convertCommunitiesLeaderIdsToLeaderObjects(communities).then((communities) => {
                    this.setState({
                        communities
                    })

                    this.props.history.push(`/developer/country/${geolocation}`)
                })
            })
        } else {
            this.props.getAllCountryCommunity().then((communities) => {
                this.convertCommunitiesLeaderIdsToLeaderObjects(communities).then((communities) => {
                    this.setState({
                        communities
                    })

                    this.props.history.push('/developer')
                })
            })
        }
    }

    renderBreadcrumbCountries() {
        const geolocationKeys = _.keyBy(this.state.communities, 'geolocation');
        const listCountriesEl = Object.keys(geolocationKeys).map((geolocation, index) => {
            return (
                <Select.Option title={config.data.mappingCountryCodeToName[geolocation]} key={index}
                               value={geolocation}>{config.data.mappingCountryCodeToName[geolocation]}</Select.Option>
            )
        })

        return (
            <Select
                allowClear
                value={this.props.match.params['country'] || undefined}
                showSearch
                style={{width: 160}}
                placeholder="Select a country"
                optionFilterProp="children"
                onChange={this.handleChangeCountry.bind(this)}
            >
                {listCountriesEl}
            </Select>
        )
    }

    // API only return list leader ids [leaderIds], so we need convert it to array object leader [leaders]
    convertCommunitiesLeaderIdsToLeaderObjects(communities) {
        return new Promise((resolve, reject) => {
            let userIds = []
            communities.forEach((community) => {
                userIds.push(...community.leaderIds)
            })
            userIds = _.uniq(userIds)

            if (!userIds.length) {
                return resolve([])
            }

            this.props.getUserByIds(userIds).then((users) => {
                users = this.mockAvatarToUsers(users) // Mock avatar url
                const mappingIdToUserList = _.keyBy(users, '_id');
                communities.forEach((community) => {
                    community.leaders = community.leaders || [];
                    community.leaderIds.forEach((leaderId) => {
                        if (mappingIdToUserList[leaderId]) {
                            community.leaders.push(mappingIdToUserList[leaderId])
                        }
                    })
                })

                resolve(communities)
            })
        })
    }

    mockAvatarToUsers(users) {
        users.forEach((user) => {
            user.profile.avatar = config.data.mockAvatarUrl
        })

        return users
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

        const listCommunitiesEl = this.renderListCommunities()
        const menuCountriesEl = this.renderBreadcrumbCountries()

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
                    <div className="ebp-page-breadcrumb">
                        <Row>
                            <Col span={24}>
                                <Breadcrumb>
                                    <Breadcrumb.Item href="/">
                                        <Icon type="home"/>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>Community</Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        <Link to="/developer">Global</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        {menuCountriesEl}
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                        </Row>
                    </div>

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
                            <SubmissionForm/>
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
