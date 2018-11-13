import React from 'react';
import ProfilePage from '../../ProfilePage';
import Footer from '@/module/layout/Footer/Container'
import Navigator from '@/module/page/shared/HomeNavigator/Container'
import _ from 'lodash'
import I18N from '@/I18N'

import './style.scss'
import '../../admin/admin.scss'

import { Col, Row, Icon, Select, Form, Badge, Tooltip, Breadcrumb, Avatar, Button, Table, Divider } from 'antd'
import moment from 'moment/moment'
import MediaQuery from 'react-responsive'
import {MAX_WIDTH_MOBILE, MIN_WIDTH_PC} from "../../../../config/constant"

const FormItem = Form.Item;

const FILTERS = {
    ALL: 'all',
    ACTIVE: 'active',
    APPLIED: 'applied',
    OWNED: 'owned',
    SUBSCRIBED: 'subscribed',
    NEED_APPROVAL: 'need_approval'
}

export default class extends ProfilePage {
    constructor(props) {
        super(props)

        this.state = {
            showMobile: false,
            filter: FILTERS.ALL
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
        const tasksNeedApprovalData = this.props.need_approval_tasks
        const allTasks = this.props.all_tasks

        const columns = [{
            title: I18N.get('profile.tasks.table.name'),
            dataIndex: 'name',
            width: '30%',
            className: 'fontWeight500 allow-wrap',
            render: (name, record) => {
                return <a onClick={this.linkTaskDetail.bind(this, record._id)} className="tableLink">{name}</a>
            }
        }, {
            title: I18N.get('profile.tasks.table.owner'),
            dataIndex: 'createdBy',
            width: '30%',
            render: (createdBy) => {
                const profile = createdBy && createdBy.profile ? createdBy.profile : {};
                return <a onClick={this.linkUserDetail.bind(this, createdBy)} className="tableLink">
                    <Avatar className="gap-right" src={profile.avatar} />
                    {`${profile.firstName} ${profile.lastName}`}
                </a>
            }
        }, {
            title: I18N.get('profile.tasks.table.category'),
            dataIndex: 'category',
            render: (category) => _.capitalize(category)
        }, {
            title: I18N.get('profile.tasks.table.type'),
            dataIndex: 'type',
        }, {
            title: I18N.get('profile.tasks.table.date'),
            dataIndex: 'startTime',
            render: (startTime) => moment(startTime).format('MMM D')
        }, {
            title: I18N.get('profile.tasks.table.created'),
            dataIndex: 'createdAt',
            render: (createdAt) => moment(createdAt).format('MMM D')
        }, {
            title: '',
            dataIndex: '_id',
            key: 'actions',
            render: this.getCommentActions.bind(this)
        }]

        const appliedColumns = [{
            title: I18N.get('profile.tasks.table.name'),
            dataIndex: 'name',
            width: '30%',
            className: 'fontWeight500 allow-wrap',
            render: (name, record) => {
                return <a onClick={this.linkTaskDetail.bind(this, record._id)} className="tableLink">{name}</a>
            }
        }, {
            title: I18N.get('profile.tasks.table.owner'),
            dataIndex: 'createdBy.username'
        }, {
            title: I18N.get('profile.tasks.table.category'),
            dataIndex: 'category',
            render: (category) => _.capitalize(category)
        }, {
            title: I18N.get('profile.tasks.table.type'),
            dataIndex: 'type',
        }, {
            title: I18N.get('profile.tasks.table.community'),
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
            title: I18N.get('profile.tasks.table.date'),
            dataIndex: 'startTime',
            render: (startTime) => moment(startTime).format('MMM D')
        }, {
            title: I18N.get('profile.tasks.table.created'),
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
            title: I18N.get('profile.tasks.table.name'),
            dataIndex: 'name',
            width: '30%',
            className: 'fontWeight500 allow-wrap',
            render: (name, record) => {
                return <a onClick={this.linkTaskDetail.bind(this, record._id)} className="tableLink">{name}</a>
            }
        }, {
            title: I18N.get('profile.tasks.table.category'),
            dataIndex: 'category',
            render: (category) => _.capitalize(category)
        }, {
            title: I18N.get('profile.tasks.table.type'),
            dataIndex: 'type',
        }, {
            title: I18N.get('profile.tasks.table.community'),
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
            title: I18N.get('profile.tasks.table.status'),
            dataIndex: 'status'
        },{
            title: I18N.get('profile.tasks.table.date'),
            dataIndex: 'startTime',
            render: (startTime) => moment(startTime).format('MMM D')
        }, {
            title: I18N.get('profile.tasks.table.created'),
            dataIndex: 'createdAt',
            render: (createdAt) => moment(createdAt).format('MMM D')
        }, {
            title: '',
            dataIndex: '_id',
            key: 'actions',
            render: this.getOwnerCommentActions.bind(this)
        }]

        return (
            <div className="p_ProfileTasks">
                <div className="ebp-header-divider">

                </div>
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_breadcrumb">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <Icon type="home" />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>{I18N.get('0006')}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="p_admin_content">
                            <Row>
                                <Col sm={24} md={4} className="wrap-box-navigator">
                                    <Navigator selectedItem={'profileTasks'}/>
                                </Col>
                                <Col sm={24} md={20} className="c_ProfileContainer admin-right-column wrap-box-user">
                                    {(this.props.is_leader || this.props.is_admin) &&
                                        <div className="pull-right filter-group">
                                            <Button onClick={() => this.props.history.push('/task-create/')}>{I18N.get('profile.tasks.create.task')}</Button>
                                        </div>
                                    }
                                    <MediaQuery maxWidth={MAX_WIDTH_MOBILE}>
                                        <Select
                                            name="type"
                                            onChange={this.onSelectFilter.bind(this)}
                                            value={this.state.filter}
                                        >
                                            {_.map(FILTERS, (filter, key) => {
                                                return <Select.Option key={filter} value={filter}>
                                                    {key}
                                                </Select.Option>
                                            })}
                                        </Select>
                                    </MediaQuery>
                                    <MediaQuery minWidth={MIN_WIDTH_PC}>
                                        <Button.Group className="filter-group">
                                            <Button
                                                className={(this.state.filter === FILTERS.ALL && 'selected') || ''}
                                                onClick={this.clearFilters.bind(this)}>All</Button>
                                            {this.props.is_admin &&
                                                <Button
                                                    className={(this.state.filter === FILTERS.NEED_APPROVAL && 'selected') || ''}
                                                    onClick={this.setNeedApprovalFilter.bind(this)}>Need Approval</Button>
                                            }
                                            <Button
                                                className={(this.state.filter === FILTERS.OWNED && 'selected') || ''}
                                                onClick={this.setOwnedFilter.bind(this)}>Owned</Button>
                                            <Button
                                                className={(this.state.filter === FILTERS.ACTIVE && 'selected') || ''}
                                                onClick={this.setActiveFilter.bind(this)}>Active</Button>
                                            <Button
                                                className={(this.state.filter === FILTERS.APPLIED && 'selected') || ''}
                                                onClick={this.setAppliedFilter.bind(this)}>Applied</Button>
                                            <Button
                                                className={(this.state.filter === FILTERS.SUBSCRIBED && 'selected') || ''}
                                                onClick={this.setSubscribedFilter.bind(this)}>Subscribed</Button>
                                        </Button.Group>
                                    </MediaQuery>
                                    {this.state.filter === FILTERS.ALL &&
                                        <div>
                                            <Table
                                                columns={columns}
                                                rowKey={(item) => item._id}
                                                dataSource={allTasks}
                                                loading={this.props.loading}
                                            />
                                        </div>
                                    }

                                    {this.state.filter === FILTERS.NEED_APPROVAL &&
                                        <div>
                                            <Table
                                                columns={columns}
                                                rowKey={(item) => item._id}
                                                dataSource={tasksNeedApprovalData}
                                                loading={this.props.loading}
                                            />
                                        </div>
                                    }

                                    {this.state.filter === FILTERS.ACTIVE &&
                                        <div>
                                            <Table
                                                columns={columns}
                                                rowKey={(item) => item._id}
                                                dataSource={tasksActiveData}
                                                loading={this.props.loading}
                                            />
                                        </div>
                                    }

                                    {this.state.filter === FILTERS.APPLIED &&
                                        <div>
                                            <Table
                                                columns={appliedColumns}
                                                rowKey={(item) => item._id}
                                                dataSource={tasksPendingData}
                                                loading={this.props.loading}
                                            />
                                        </div>
                                    }

                                    {this.state.filter === FILTERS.OWNED &&
                                        <div>
                                            <Table
                                                columns={ownedColumns}
                                                rowKey={(item) => item._id}
                                                dataSource={tasksOwnedData}
                                                loading={this.props.loading}
                                            />
                                        </div>
                                    }

                                    {this.state.filter === FILTERS.SUBSCRIBED &&
                                        <div>
                                            <Table
                                                columns={ownedColumns}
                                                rowKey={(item) => item._id}
                                                dataSource={tasksSubscribedData}
                                                loading={this.props.loading}
                                            />
                                        </div>
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <br/>
                                </Col>
                            </Row>
                            <Footer/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    onSelectFilter(value) {
        const handlerLookupDefault = this.clearFilters
        const filters = [ FILTERS.ACTIVE, FILTERS.APPLIED, FILTERS.SUBSCRIBED,
            FILTERS.OWNED, FILTERS.NEED_APPROVAL ]
        const handlers = [ this.setActiveFilter, this.setAppliedFilter, this.setSubscribedFilter,
            this.setOwnedFilter, this.setNeedApprovalFilter]
        const handlerLookup = _.zipObject(filters, handlers)
        const handler = handlerLookup[value] || handlerLookupDefault

        handler.call(this)
    }

    clearFilters() {
        this.setState({ filter: FILTERS.ALL })
    }

    setActiveFilter() {
        this.setState({ filter: FILTERS.ACTIVE })
    }

    setAppliedFilter() {
        this.setState({ filter: FILTERS.APPLIED })
    }

    setOwnedFilter() {
        this.setState({ filter: FILTERS.OWNED })
    }

    setSubscribedFilter() {
        this.setState({ filter: FILTERS.SUBSCRIBED })
    }

    setNeedApprovalFilter() {
        this.setState({ filter: FILTERS.NEED_APPROVAL })
    }

    linkTaskDetail(taskId) {
        this.props.history.push(`/profile/task-detail/${taskId}`)
    }

    linkTaskCandidateDetail(taskId, taskCandidateId) {
        this.props.history.push(`/profile/task-app/${taskId}/${taskCandidateId}`)
    }

    linkUserDetail(user) {
        this.props.history.push(`/member/${user._id}`)
    }
}
