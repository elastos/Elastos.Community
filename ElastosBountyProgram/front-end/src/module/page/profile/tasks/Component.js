import React from 'react';
import StandardPage from '../../StandardPage';
import Footer from '@/module/layout/Footer/Container'
import Navigator from '@/module/page/shared/Navigator/Container'

import './style.scss'
import '../../admin/admin.scss'

import { Col, Row, Icon, Form, Breadcrumb, Button, Table, Divider } from 'antd'
import moment from 'moment/moment'
const FormItem = Form.Item;

export default class extends StandardPage {

    componentDidMount() {
        this.props.getTasks(this.props.currentUserId)
        this.props.getUserTeams(this.props.currentUserId)
    }

    componentWillUnmount() {
        this.props.resetTasks()
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
            render: (id, record) => {

            }
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
                                <Breadcrumb.Item>Tasks</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="p_ProfileTasks p_admin_content">
                            <Row>
                                <Col span={20} className="c_ProfileContainer admin-left-column wrap-box-user">
                                    {(this.props.is_leader || this.props.is_admin) &&
                                    <div className="pull-right">
                                        <Button onClick={() => this.props.history.push('/task-create/')}>Create Task</Button>
                                    </div>
                                    }

                                    <Divider className="clearfix">Active Tasks</Divider>

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
                                        columns={columns}
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
                                <Col span={4} className="admin-right-column wrap-box-navigator">
                                    <Navigator selectedItem={'profileTasks'}/>
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
}
