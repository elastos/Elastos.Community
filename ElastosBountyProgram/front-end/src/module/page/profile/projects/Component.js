import React from 'react';
import StandardPage from '../../StandardPage';
import Footer from '@/module/layout/Footer/Container'
import Navigator from '@/module/page/shared/HomeNavigator/Container'
import _ from 'lodash'
import './style.scss'
import '../../admin/admin.scss'
import { Col, Row, Icon, Form, Badge, Tooltip, Breadcrumb, Button, Table, Divider, List, Carousel, Avatar } from 'antd'
import moment from 'moment/moment'
import MediaQuery from 'react-responsive'

const FormItem = Form.Item;

const FILTERS = {
    ALL: 'all',
    ACTIVE: 'active',
    APPLIED: 'applied',
    OWNED: 'owned',
    SUBSCRIBED: 'subscribed'
}

export default class extends StandardPage {
    constructor(props) {
        super(props)

        this.state = {
            showMobile: false,
            filter: FILTERS.ALL
        }
    }

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

    getCarousel(item) {
        const pictures = _.map(item.pictures, (picture, ind) => {
            return (
                <div key={ind}>
                    <img width={204} height={204} alt="logo" src={picture.url} />
                </div>
            )
        })

        return (
            <div className="carousel-wrapper">
                <Carousel autoplay>
                    {pictures}
                </Carousel>
            </div>
        )
    }

    getListComponent(tasks) {
        const data = _.map(tasks, (task, id) => {
            return {
                href: '',
                title: task.name,
                pictures: task.pictures || [],
                description: 'Lorem ipsum',
                content: task.description,
                owner: task.createdBy,
                id: task._id
            }
        })

        return (
            <List itemLayout='vertical' size='large' loading={this.props.loading}
                className="with-right-box"  pagination={{ pageSize: 5 }} dataSource={data}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        extra={this.getCarousel(item)}
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                        <div className="ant-list-item-right-box">
                            <div className="pull-up">
                                <Avatar size="large" icon="user" className="pull-right" src={item.owner.profile.avatar}/>
                                <div class="clearfix"/>
                                <div>{item.owner.profile.firstName} {item.owner.profile.lastName}</div>
                            </div>
                            <Button type="primary" className="pull-down">View</Button>
                        </div>
                    </List.Item>
                )}
            />
        )
    }

    ord_renderContent () {
        const tasksActiveData = this.props.candidate_active_tasks
        const tasksPendingData = this.props.candidate_pending_tasks
        const tasksOwnedData = this.props.owned_tasks
        const tasksSubscribedData = this.props.subscribed_tasks
        const allTasks = this.props.all_tasks

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
            <div className="p_ProfileProjects">
                <div className="ebp-header-divider">

                </div>
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_breadcrumb">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <Icon type="home" />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Projects</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="p_admin_content">
                            <Row>
                                <MediaQuery minWidth={720}>
                                    <Col span={4} className="admin-left-column wrap-box-navigator">
                                        <Navigator selectedItem={'profileProjects'}/>
                                    </Col>
                                </MediaQuery>
                                <Col xs={{span: 24}} md={{span: 20}} className="c_ProfileContainer admin-right-column wrap-box-user">
                                    {(this.props.is_leader || this.props.is_admin) &&
                                    <div className="pull-right">
                                        <Button onClick={() => this.props.history.push('/task-create?type=PROJECT&category=DEVELOPER')}>Create Project</Button>
                                    </div>
                                    }
                                    <Button.Group className="filter-group">
                                        <Button
                                            className={(this.state.filter === FILTERS.ALL && 'selected') || ''}
                                            onClick={this.clearFilters.bind(this)}>All</Button>
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

                                    {this.state.filter === FILTERS.ALL && this.getListComponent(allTasks)}
                                    {this.state.filter === FILTERS.ACTIVE && this.getListComponent(tasksActiveData)}
                                    {this.state.filter === FILTERS.APPLIED && this.getListComponent(tasksPendingData)}
                                    {this.state.filter === FILTERS.OWNED && this.getListComponent(tasksOwnedData)}
                                    {this.state.filter === FILTERS.SUBSCRIBED && this.getListComponent(tasksSubscribedData)}
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

    linkTaskDetail(taskId) {
        this.props.history.push(`/profile/task-detail/${taskId}`)
    }

    linkTaskCandidateDetail(taskId, taskCandidateId) {
        this.props.history.push(`/profile/task-app/${taskId}/${taskCandidateId}`)
    }
}
