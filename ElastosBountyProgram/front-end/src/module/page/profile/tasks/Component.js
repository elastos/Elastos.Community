import React from 'react';
import StandardPage from '../../StandardPage';
import Footer from '@/module/layout/Footer/Container'
import Navigator from '@/module/page/shared/HomeNavigator/Container'

import './style.scss'
import '../../admin/admin.scss'

import { Col, Row, Icon, Form, Badge, Tooltip, Breadcrumb, Button, Table, Divider } from 'antd'
import moment from 'moment/moment'
const FormItem = Form.Item;

import MediaQuery from 'react-responsive'

export default class extends StandardPage {

    ord_checkLogin(isLogin) {
        if (!isLogin) {
            this.props.history.replace('/home')
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.props.getTasks(this.props.currentUserId)
        this.props.getUserTeams(this.props.currentUserId)
    }

    componentWillUnmount() {
        this.props.resetTasks()
    }

    getOwnerCommentActions(id, data) {
        const candidateActions = this.getCandidateCommentActions('lastSeenByOwner', id, data)
        const commentActions = this.getCommentActions(id, data)

        return (
            <div>
                {candidateActions}
                {commentActions}
            </div>
        )
    }

    getCandidateCommentActions(seenProperty, id, data) {
        const candidate = _.find(data.candidates, (candidate) => {
            return candidate.user && candidate.user._id === this.props.currentUserId
        })
        let unread = []

        if (candidate) {
            const lastDate = candidate[seenProperty]
            unread = _.filter(candidate.comments, (comment) => {
                return !lastDate || new Date(_.first(comment).createdAt) > new Date(lastDate)
            })
        } else {
            unread = _.flatten(_.map(data.candidates, (candidate) => {
                const lastDate = candidate[seenProperty]
                const subUnread = _.filter(candidate.comments, (comment) => {
                    return !lastDate || new Date(_.first(comment).createdAt) > new Date(lastDate)
                })
                return subUnread
            }))
        }

        const tooltipSuffix = unread.length > 1 ? 's' : ''
        const tooltip = `${unread.length} new message${tooltipSuffix}`

        return unread.length
            ? (
                <Tooltip title={tooltip}>
                    <Badge dot count={unread.length}>
                        <a onClick={candidate
                            ? this.linkTaskCandidateDetail.bind(this, data._id, candidate.user._id)
                            : this.linkTaskDetail.bind(this, data._id)} className="tableLink">
                            <Icon type="message"/>
                        </a>
                    </Badge>
                </Tooltip>
            )
            : null
    }

    getCommentActions(id, data) {
        const isOwner = data.createdBy._id === this.props.currentUserId
        const subscription = _.find(data.subscribers, (subscriber) => {
            return subscriber.user && subscriber.user._id === this.props.currentUserId
        })
        const lastDate = isOwner
            ? data.lastCommentSeenByOwner
            : subscription && subscription.lastSeen

        const unread = _.filter(data.comments, (comment) => {
            return !lastDate || new Date(_.first(comment).createdAt) > new Date(lastDate)
        })
        const tooltipSuffix = unread.length > 1 ? 's' : ''
        const tooltip = `${unread.length} new message${tooltipSuffix}`

        return unread.length
            ? (
                <Tooltip title={tooltip}>
                    <Badge dot count={unread.length}>
                        <a onClick={this.linkTaskDetail.bind(this, data._id)} className="tableLink">
                            <Icon type="message"/>
                        </a>
                    </Badge>
                </Tooltip>
            )
            : null
    }

    ord_renderContent () {
        const tasksActiveData = this.props.candidate_active_tasks
        const tasksPendingData = this.props.candidate_pending_tasks
        const tasksOwnedData = this.props.owned_tasks
        const tasksSubscribedData = this.props.subscribed_tasks

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
            className: 'fontWeight500 allow-wrap',
            render: (name, record) => {
                return <a onClick={this.linkTaskDetail.bind(this, record._id)} className="tableLink">{name}</a>
            }
        }, {
            title: 'Owner',
            dataIndex: 'createdBy.username'
        }, {
            title: 'Category',
            dataIndex: 'category',
            render: (category) => _.capitalize(category)
        }, {
            title: 'Type',
            dataIndex: 'type',
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
            render: (startTime) => moment(startTime).format('MMM D')
        }, {
            title: 'Created',
            dataIndex: 'createdAt',
            render: (createdAt) => moment(createdAt).format('MMM D')
        }, {
            title: '',
            dataIndex: '_id',
            key: 'actions',
            render: this.getCommentActions.bind(this)
        }]

        const appliedColumns = [{
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
            className: 'fontWeight500 allow-wrap',
            render: (name, record) => {
                return <a onClick={this.linkTaskDetail.bind(this, record._id)} className="tableLink">{name}</a>
            }
        }, {
            title: 'Owner',
            dataIndex: 'createdBy.username'
        }, {
            title: 'Category',
            dataIndex: 'category',
            render: (category) => _.capitalize(category)
        }, {
            title: 'Type',
            dataIndex: 'type',
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
            render: (startTime) => moment(startTime).format('MMM D')
        }, {
            title: 'Created',
            dataIndex: 'createdAt',
            render: (createdAt) => moment(createdAt).format('MMM D')
        }, {
            title: '',
            dataIndex: '_id',
            key: 'actions',
            render: this.getCandidateCommentActions.bind(this, 'lastSeenByCandidate')
        }]

        // TODO: this should be moved to a more restrictive admin
        const ownedColumns = [{
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
            className: 'fontWeight500 allow-wrap',
            render: (name, record) => {
                return <a onClick={this.linkTaskDetail.bind(this, record._id)} className="tableLink">{name}</a>
            }
        }, {
            title: 'Category',
            dataIndex: 'category',
            render: (category) => _.capitalize(category)
        }, {
            title: 'Type',
            dataIndex: 'type',
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
            title: 'Status',
            dataIndex: 'status'
        },{
            title: 'Date',
            dataIndex: 'startTime',
            render: (startTime) => moment(startTime).format('MMM D')
        }, {
            title: 'Created',
            dataIndex: 'createdAt',
            render: (createdAt) => moment(createdAt).format('MMM D')
        }, {
            title: '',
            dataIndex: '_id',
            key: 'actions',
            render: this.getOwnerCommentActions.bind(this)
        }]

        return (
            <div>
                <div className="ebp-header-divider">

                </div>
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_breadcrumb">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <Icon type="home" />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Tasks</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="p_ProfileTasks p_admin_content">
                            <MediaQuery maxWidth={720}>
                                <Row>
                                    <Col className="admin-right-column wrap-box-navigator">
                                        <Navigator selectedItem={'profileTasks'} />
                                    </Col>
                                </Row>
                            </MediaQuery>
                            <Row>
                                <Col xs={{span: 24}} md={{span: 20}} className="c_ProfileContainer admin-left-column wrap-box-user">
                                    {(this.props.is_leader || this.props.is_admin) &&
                                    <div className="pull-right">
                                        <Button onClick={() => this.props.history.push('/task-create/')}>Create Task</Button>
                                    </div>
                                    }

                                    <Divider>Active Tasks</Divider>

                                    <Table
                                        columns={columns}
                                        rowKey={(item) => item._id}
                                        dataSource={tasksActiveData}
                                        loading={this.props.loading}
                                    />
                                    {tasksActiveData.length === 0 &&
                                    <div className="vert-gap"/>
                                    }

                                    <Divider>Tasks Applied</Divider>

                                    <Table
                                        columns={appliedColumns}
                                        rowKey={(item) => item._id}
                                        dataSource={tasksPendingData}
                                        loading={this.props.loading}
                                    />
                                    {tasksPendingData.length === 0 &&
                                    <div className="vert-gap"/>
                                    }

                                    {(this.props.is_leader || this.props.is_admin) &&
                                    <div>
                                        <Divider>Owned Tasks</Divider>

                                        <Table
                                            columns={ownedColumns}
                                            rowKey={(item) => item._id}
                                            dataSource={tasksOwnedData}
                                            loading={this.props.loading}
                                        />
                                    </div>
                                    }
                                    {tasksOwnedData.length === 0 &&
                                    <div className="vert-gap"/>
                                    }

                                    <div>
                                        <Divider>Subscribed Tasks</Divider>

                                        <Table
                                            columns={ownedColumns}
                                            rowKey={(item) => item._id}
                                            dataSource={tasksSubscribedData}
                                            loading={this.props.loading}
                                        />
                                    </div>
                                </Col>
                                <MediaQuery minWidth={720}>
                                    <Col span={4} className="admin-right-column wrap-box-navigator">
                                        <Navigator selectedItem={'profileTasks'}/>
                                    </Col>
                                </MediaQuery>
                            </Row>
                            <Row>
                                <Col>
                                    <br/>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    linkTaskDetail(taskId) {
        this.props.history.push(`/profile/task-detail/${taskId}`)
    }

    linkTaskCandidateDetail(taskId, taskCandidateId) {
        this.props.history.push(`/profile/task-app/${taskId}/${taskCandidateId}`)
    }
}
