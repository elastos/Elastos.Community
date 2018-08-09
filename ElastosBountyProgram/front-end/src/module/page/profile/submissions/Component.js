import React from 'react';
import StandardPage from '../../StandardPage';
import Footer from '@/module/layout/Footer/Container'
import Navigator from '@/module/page/shared/HomeNavigator/Container'

import './style.scss'
import '../../admin/admin.scss'

import { Col, Row, Icon, Form, Tooltip, Badge, Breadcrumb, Button, Table } from 'antd'
import moment from 'moment/moment'
const FormItem = Form.Item;

import MediaQuery from 'react-responsive'

const FILTERS = {
    ALL: 'all',
    CREATED: 'created',
    SUBSCRIBED: 'subscribed'
};

export default class extends StandardPage {
    constructor(props) {
        super(props);

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
        this.props.getSubmissions(this.props.currentUserId)
    }

    componentWillUnmount() {
        this.props.resetSubmissions()
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
                        <a onClick={this.linkSubmissionDetail.bind(this, data._id)} className="tableLink">
                            <Icon type="message"/>
                        </a>
                    </Badge>
                </Tooltip>
            )
            : null
    }

    ord_renderContent () {
        const submissionsAllData = this.props.all_submissions;
        const submissionsOwnedData = this.props.owned_submissions
        const submissionsSubscribedData = this.props.subscribed_submissions

        const columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                width: '75%',
                className: 'fontWeight500 allow-wrap',
                render: (name, record) => {
                    return <a onClick={this.linkSubmissionDetail.bind(this, record._id)} className="tableLink">{name}</a>
                }
            },
            {
                title: 'Type',
                dataIndex: 'type',
                render: (type) => {
                    if (type === 'FORM_EXT') {
                        return 'FORM'
                    } else {
                        return type
                    }
                }
            },
            {
                title: 'Created',
                dataIndex: 'createdAt',
                className: 'right-align',
                render: (createdAt) => moment(createdAt).format('MMM D'),
                sorter: (a, b) => {
                    return moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
                },
                defaultSortOrder: 'descend'
            },
            {
                title: '',
                dataIndex: '_id',
                key: 'actions',
                render: this.getCommentActions.bind(this)
            }
        ]

        return (
            <div className="p_ProfileSubmissions">
                <div className="ebp-header-divider">

                </div>
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_breadcrumb">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <Icon type="home" />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Issues</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="p_admin_content">
                            <Row>
                                <MediaQuery minWidth={720}>
                                    <Col span={4} className="admin-left-column wrap-box-navigator">
                                        <Navigator selectedItem={'profileSubmissions'}/>
                                    </Col>
                                </MediaQuery>
                                <Col xs={{span: 24}} md={{span: 20}} className="c_ProfileContainer admin-right-column wrap-box-user">
                                    <Button.Group className="filter-group">
                                        <Button
                                            className={(this.state.filter === FILTERS.ALL && 'selected') || ''}
                                            onClick={this.clearFilters.bind(this)}>All</Button>
                                        <Button
                                            className={(this.state.filter === FILTERS.CREATED && 'selected') || ''}
                                            onClick={this.setCreatedFilter.bind(this)}>Created</Button>
                                        <Button
                                            className={(this.state.filter === FILTERS.SUBSCRIBED && 'selected') || ''}
                                            onClick={this.setSubscribedFilter.bind(this)}>Subscribed</Button>
                                    </Button.Group>

                                    {this.state.filter === FILTERS.ALL &&
                                        <div>
                                            <Table
                                                columns={columns}
                                                rowKey={(item) => item._id}
                                                dataSource={submissionsAllData}
                                                loading={this.props.loading}
                                            />
                                        </div>
                                    }

                                    {this.state.filter === FILTERS.CREATED &&
                                        <div>
                                            <Table
                                                columns={columns}
                                                rowKey={(item) => item._id}
                                                dataSource={submissionsOwnedData}
                                                loading={this.props.loading}
                                            />
                                        </div>
                                    }

                                    {this.state.filter === FILTERS.SUBSCRIBED &&
                                        <div>
                                            <Table
                                                columns={columns}
                                                rowKey={(item) => item._id}
                                                dataSource={submissionsSubscribedData}
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

    clearFilters() {
        this.setState({ filter: FILTERS.ALL })
    }

    setCreatedFilter() {
        this.setState({ filter: FILTERS.CREATED })
    }

    setSubscribedFilter() {
        this.setState({ filter: FILTERS.SUBSCRIBED })
    }

    linkSubmissionDetail(submissionId) {
        this.props.history.push(`/profile/submission-detail/${submissionId}`)
    }
}
