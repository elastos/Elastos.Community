import React from 'react';
import StandardPage from '../../StandardPage';
import Footer from '@/module/layout/Footer/Container'
import Navigator from '@/module/page/shared/HomeNavigator/Container'
import _ from 'lodash'
import './style.scss'
import '../../admin/admin.scss'
import { Col, Row, Icon, Form, Badge, Tooltip, Breadcrumb, Button,
    Table, Select, Divider, List, Carousel, Avatar, Tag } from 'antd'
import moment from 'moment/moment'
import MediaQuery from 'react-responsive'
import I18N from '@/I18N'
import {MAX_WIDTH_MOBILE, MIN_WIDTH_PC} from "../../../../config/constant"

const FormItem = Form.Item;

const FILTERS = {
    ALL: 'all',
    ACTIVE: 'active',
    APPLIED: 'applied',
    OWNED: 'owned',
    SUBSCRIBED: 'subscribed',
    CR100: 'cr100'
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
            this.props.history.replace('/profile/teams')
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

    getCarousel(item) {
        const pictures = _.map(item.pictures, (picture, ind) => {
            return (
                <div key={ind}>
                    <img width={188} height={188} alt="logo" src={picture.url} />
                </div>
            )
        })

        if (item.thumbnail) {
            pictures.unshift(
                <div key="main">
                    <img width={188} height={188} alt="logo" src={item.thumbnail} />
                </div>
            )
        }

        if (_.isEmpty(pictures)) {
            pictures.unshift(
                <div key="main">
                    <img width={188} height={188} alt="logo" src='/assets/images/Elastos_Logo.png' />
                </div>
            )
        }

        return (
            <div className="carousel-wrapper">
                <Carousel autoplay>
                    {pictures}
                </Carousel>
            </div>
        )
    }

    getListComponent(tasks) {
        const description_fn = (entity) => {
            return _.isEmpty(entity.recruitedSkillsets)
                ? I18N.get('project.detail.not_recruiting')
                : (
                    <div className="valign-wrapper">
                        <div className="gap-right pull-left">{I18N.get('project.detail.recruiting')}: </div>
                        <div className="pull-left">
                            {_.map(entity.recruitedSkillsets, (skillset, ind) => <Tag key={ind}>{skillset}</Tag>)}
                        </div>
                    </div>
                )
        }

        const data = _.map(tasks, (task, id) => {
            return {
                href: '',
                title: task.name,
                description: description_fn(task),
                content: task.description,
                owner: task.createdBy,
                id: task._id,
                task
            }
        })

        return (
            <List itemLayout='vertical' size='large' loading={this.props.loading}
                className="with-right-box" dataSource={data}
                renderItem={item => (
                    <div>
                        <MediaQuery minWidth={MIN_WIDTH_PC}>
                            <List.Item
                                key={item.id}
                                extra={this.getCarousel(item.task)}
                            >
                                <h3 class="no-margin no-padding one-line brand-color">
                                    <a onClick={this.linkTaskDetail.bind(this, item.id)}>{item.title}</a>
                                </h3>
                                <h5 class="no-margin">
                                    {item.description}
                                </h5>
                                <div>
                                    {item.content}
                                </div>
                                <div className="ant-list-item-right-box">
                                    <a className="pull-up" onClick={this.linkUserDetail.bind(this, item.owner)}>
                                        <Avatar size="large" icon="user" className="pull-right" src={item.owner.profile.avatar}/>
                                        <div class="clearfix"/>
                                        <div>{item.owner.profile.firstName} {item.owner.profile.lastName}</div>
                                    </a>
                                    <Button type="primary" className="pull-down" onClick={this.linkTaskDetail.bind(this, item.id)}>
                                        View
                                        <div class="pull-right">
                                            {this.props.page === 'LEADER' && this.getCommentStatus(item.task)}
                                        </div>
                                    </Button>
                                </div>
                            </List.Item>
                        </MediaQuery>
                        <MediaQuery maxWidth={MAX_WIDTH_MOBILE}>
                            <List.Item
                                key={item.id}
                                className="ignore-right-box"
                            >
                                <h3 class="no-margin no-padding one-line brand-color">
                                    <a onClick={this.linkTaskDetail.bind(this, item.id)}>{item.title}</a>
                                </h3>
                                <h5 class="no-margin">
                                    {item.description}
                                </h5>
                                <div>
                                    <a onClick={this.linkUserDetail.bind(this, item.owner)}>
                                        <span>{item.owner.profile.firstName} {item.owner.profile.lastName}</span>
                                        <Divider type="vertical"/>
                                        <Avatar size="large" icon="user" src={item.owner.profile.avatar}/>
                                    </a>
                                    <Button type="primary" className="pull-right" onClick={this.linkTaskDetail.bind(this, item.id)}>
                                        View
                                        <div class="pull-right">
                                            {this.props.page === 'LEADER' && this.getCommentStatus(item.task)}
                                        </div>
                                    </Button>
                                </div>
                            </List.Item>
                        </MediaQuery>
                    </div>
                )}
            />
        )
    }

    getCandidateUnreadMessageCount(task) {
        const isOwner = task.createdBy._id === this.props.currentUserId
        const candidate = _.find(task.candidates, (candidate) => {
            return candidate.user && candidate.user._id === this.props.currentUserId
        })
        let unread = []

        if (candidate) {
            const lastDate = candidate.lastSeenByCandidate
            unread = _.filter(candidate.comments, (comment) => {
                return !lastDate || new Date(_.first(comment).createdAt) > new Date(lastDate)
            })
        } else {
            unread = _.flatten(_.map(task.candidates, (candidate) => {
                const lastDate = candidate.lastSeenByOwner
                const subUnread = _.filter(candidate.comments, (comment) => {
                    return !lastDate || new Date(_.first(comment).createdAt) > new Date(lastDate)
                })
                return subUnread
            }))
        }

        return _.size(unread)
    }

    getUnreadMessageCount(task) {
        const isOwner = task.createdBy._id === this.props.currentUserId
        const subscription = _.find(task.subscribers, (subscriber) => {
            return subscriber.user && subscriber.user._id === this.props.currentUserId
        })
        const lastDate = isOwner
            ? task.lastCommentSeenByOwner
            : subscription && subscription.lastSeen

        const unread = _.filter(task.comments, (comment) => {
            return !lastDate || new Date(_.first(comment).createdAt) > new Date(lastDate)
        })

        return _.size(unread)
    }

    getCommentStatus(task) {
        const unread = this.getUnreadMessageCount(task) + this.getCandidateUnreadMessageCount(task)
        const tooltipSuffix = unread > 1 ? 's' : ''
        const tooltip = `${unread} new message${tooltipSuffix}`

        return unread.length
            ? (
                <Tooltip title={tooltip}>
                    <Badge dot count={unread}>
                        <a onClick={this.linkTaskDetail.bind(this, task._id)} className="tableLink">
                            <Icon type="message" className="white"/>
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
        const tasksCr100Data = this.props.cr100_tasks
        const allTasks = this.props.all_tasks

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
                                <Col sm={24} md={4} className="wrap-box-navigator">
                                    <Navigator selectedItem={'profileProjects'}/>
                                </Col>
                                <Col sm={24} md={20} className="c_ProfileContainer admin-right-column wrap-box-user">
                                    {(this.props.is_leader || this.props.is_admin) &&
                                    <div className="pull-right filter-group">
                                        <Button onClick={() => this.props.history.push('/task-create?type=PROJECT&category=DEVELOPER')}>Create Project</Button>
                                    </div>
                                    }
                                    {this.props.is_admin &&
                                    <div className="pull-right filter-group gap-right">
                                        <Button onClick={() => this.props.history.push('/task-create?type=PROJECT&category=CR100')}>Create CR100</Button>
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
                                                onClick={this.setSubscribedFilter.bind(this)}>Liked</Button>
                                            <Button
                                                className={(this.state.filter === FILTERS.CR100 && 'selected') || ''}
                                                onClick={this.setCr100Filter.bind(this)}>CR100</Button>
                                        </Button.Group>
                                    </MediaQuery>
                                    {this.state.filter === FILTERS.ALL && this.getListComponent(allTasks)}
                                    {this.state.filter === FILTERS.ACTIVE && this.getListComponent(tasksActiveData)}
                                    {this.state.filter === FILTERS.APPLIED && this.getListComponent(tasksPendingData)}
                                    {this.state.filter === FILTERS.OWNED && this.getListComponent(tasksOwnedData)}
                                    {this.state.filter === FILTERS.SUBSCRIBED && this.getListComponent(tasksSubscribedData)}
                                    {this.state.filter === FILTERS.CR100 && this.getListComponent(tasksCr100Data)}
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
        switch (value) {
            case FILTERS.ACTIVE:
                this.setActiveFilter();
                break;
            case FILTERS.APPLIED:
                this.setAppliedFilter();
                break;
            case FILTERS.SUBSCRIBED:
                this.setSubscribedFilter();
                break;
            case FILTERS.OWNED:
                this.setOwnedFilter();
                break;
            default:
                this.clearFilters();
                break;
        }
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

    setCr100Filter() {
        this.setState({ filter: FILTERS.CR100 })
    }

    linkTaskDetail(taskId) {
        this.props.history.push(`/profile/project-detail/${taskId}`)
    }

    linkTaskCandidateDetail(taskId, taskCandidateId) {
        this.props.history.push(`/profile/task-app/${taskId}/${taskCandidateId}`)
    }

    linkUserDetail(user) {
        this.props.history.push(`/member/${user._id}`)
    }
}
