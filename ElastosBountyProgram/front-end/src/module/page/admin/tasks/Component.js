import React from 'react'
import AdminPage from '../BaseAdmin'
import moment from 'moment'

import '../admin.scss'
import './style.scss'

import Navigator from '../shared/Navigator/Component'

import { Breadcrumb, Col, Icon, Row, Menu, Select, Table } from 'antd'

import { Link } from 'react-router-dom'

import {TASK_STATUS} from '@/constant'

export default class extends AdminPage {

    componentDidMount() {
        this.props.getTasks()
    }

    componentWillUnmount() {
        this.props.resetTasks()
    }

    ord_renderContent () {

        const taskData = this.props.all_tasks

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
        },{
            title: 'Status',
            dataIndex: 'status',
            filters: [
                {text: 'Created', value: TASK_STATUS.CREATED},
                {text: 'Pending', value: TASK_STATUS.PENDING},
                {text: 'Approved', value: TASK_STATUS.APPROVED}
            ],
            className: 'fontWeight500'
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
                            <Breadcrumb.Item>Tasks</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="p_admin_content">
                        <Row>
                            <Col span={20} className="c_TaskTableContainer admin-left-column wrap-box-user">
                                <Table
                                    columns={columns}
                                    rowKey={(item) => item._id}
                                    dataSource={taskData}
                                    loading={this.props.loading}
                               />
                            </Col>
                            <Col span={4} className="admin-right-column wrap-box-navigator">
                                <Navigator selectedItem={'profile'}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }

    linkTaskDetail(taskId) {
        this.props.history.push(`/admin/task-detail/${taskId}`)
    }
}
