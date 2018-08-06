import React from 'react';
import StandardPage from '../../StandardPage';
import Footer from '@/module/layout/Footer/Container'
import Navigator from '@/module/page/shared/HomeNavigator/Container'

import './style.scss'
import '../../admin/admin.scss'

import { Col, Row, Icon, Form, Tooltip, Badge, Breadcrumb, Button, Table, Divider } from 'antd'
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
                                <Breadcrumb.Item>Issues</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="p_ProfileSubmissions p_admin_content">
                            <MediaQuery maxWidth={720}>
                                <Row>
                                    <Col className="admin-right-column wrap-box-navigator">
                                        <Navigator selectedItem={'profileSubmissions'} />
                                    </Col>
                                </Row>
                            </MediaQuery>
                            <Row>
                                <Col xs={{span: 24}} md={{span: 20}} className="c_ProfileContainer admin-left-column wrap-box-user">
                                    <div>
                                        <Divider>Owned Issues / Forms</Divider>

                                        <Table
                                            columns={columns}
                                            rowKey={(item) => item._id}
                                            dataSource={submissionsOwnedData}
                                            loading={this.props.loading}
                                        />
                                    </div>
                                    {submissionsOwnedData.length === 0 &&
                                        <div className="vert-gap"/>
                                    }
                                    <div>
                                        <Divider>Subscribed Issues</Divider>

                                        <Table
                                            columns={columns}
                                            rowKey={(item) => item._id}
                                            dataSource={submissionsSubscribedData}
                                            loading={this.props.loading}
                                        />
                                    </div>
                                </Col>
                                <MediaQuery minWidth={720}>
                                    <Col span={4} className="admin-right-column wrap-box-navigator">
                                        <Navigator selectedItem={'profileSubmissions'}/>
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

    linkSubmissionDetail(submissionId) {
        this.props.history.push(`/profile/submission-detail/${submissionId}`)
    }
}
