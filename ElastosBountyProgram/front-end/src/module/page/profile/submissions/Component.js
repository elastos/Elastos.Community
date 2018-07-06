import React from 'react'
import StandardPage from '../../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import Navigator from '@/module/page/shared/Navigator/Container'

import './style.scss'
import '../../admin/admin.scss'

import { Col, Row, Icon, Form, Breadcrumb, Button, Table, Divider } from 'antd'
import moment from 'moment/moment'
const FormItem = Form.Item

export default class extends StandardPage {
    componentDidMount() {
        this.props.getSubmissions(this.props.currentUserId)
    }

    componentWillUnmount() {
        this.props.resetSubmissions()
    }

    ord_renderContent () {
        const submissionsOwnedData = this.props.owned_submissions
        const submissionsSubscribedData = this.props.subscribed_submissions

        const columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                width: '20%',
                className: 'fontWeight500 allow-wrap',
                render: (name, record) => {
                    return <a onClick={this.linkSubmissionDetail.bind(this, record._id)} className="tableLink">{name}</a>
                }
            },
            {
                title: 'Description',
                dataIndex: 'description',
                width: '30%',
                className: 'fontWeight500 allow-wrap',
                render: (name, record) => {
                    return <a onClick={this.linkSubmissionDetail.bind(this, record._id)} className="tableLink">{name}</a>
                }
            }, {
                title: 'Type',
                dataIndex: 'type'
            }, {
                title: 'Created',
                dataIndex: 'createdAt',
                render: (createdAt) => moment(createdAt).format('MMM D')
            }, {
                title: '',
                dataIndex: '_id',
                key: 'actions',
                render: (id, record) => {

                }
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
                                <Breadcrumb.Item>Profile</Breadcrumb.Item>
                                <Breadcrumb.Item>Submissions</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="p_ProfileSubmissions p_admin_content">
                            <Row>
                                <Col span={20} className="c_ProfileContainer admin-left-column wrap-box-user">
                                    <div>
                                        <Divider>Owned Submissions</Divider>

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
                                        <Divider>Subscribed Submissions</Divider>

                                        <Table
                                            columns={columns}
                                            rowKey={(item) => item._id}
                                            dataSource={submissionsSubscribedData}
                                            loading={this.props.loading}
                                        />
                                    </div>
                                </Col>
                                <Col span={4} className="admin-right-column wrap-box-navigator">
                                    <Navigator selectedItem={'profileSubmissions'}/>
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
