import React from 'react'
import AdminPage from '../BaseAdmin'
import moment from 'moment'

import '../admin.scss'
import './style.scss'

import Navigator from '../shared/Navigator/Component'

import { Breadcrumb, Col, Icon, Row, Menu, Select, Table } from 'antd'
import { Link } from 'react-router-dom'

export default class extends AdminPage {

    componentDidMount() {
        this.props.getSubmissions()
    }

    componentWillUnmount() {
        this.props.resetSubmissions()
    }

    ord_renderContent () {

        const submissionData = this.props.all_submissions

        const columns = [{
            title: 'Name',
            dataIndex: 'description',
            width: '30%',
            className: 'fontWeight500 allow-wrap',
            render: (name, record) => {
                return <a onClick={this.linkSubmissionDetail.bind(this, record._id)} className="tableLink">{name}</a>
            }
        }, {
            title: 'Owner',
            dataIndex: 'createdBy.username'
        }, {
            title: 'Type',
            dataIndex: 'type',
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
            <div className="p_admin_index ebp-wrap">
                <div className="d_box">
                    <div className="p_admin_breadcrumb">
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">
                                <Icon type="home" />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Admin</Breadcrumb.Item>
                            <Breadcrumb.Item>Submissions</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="p_admin_content">
                        <Row>
                            <Col span={20} className="c_SubmissionTableContainer admin-left-column wrap-box-user">
                                <Table
                                    columns={columns}
                                    rowKey={(item) => item._id}
                                    dataSource={submissionData}
                                    loading={this.props.loading}
                               />
                            </Col>
                            <Col span={4} className="admin-right-column wrap-box-navigator">
                                <Navigator selectedItem={'submissions'}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }

    linkSubmissionDetail(submissionId) {
        this.props.history.push(`/admin/submission-detail/${submissionId}`)
    }
}
