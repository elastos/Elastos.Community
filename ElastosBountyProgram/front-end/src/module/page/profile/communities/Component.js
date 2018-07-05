import React from 'react';
import StandardPage from '../../StandardPage';
import Navigator from '@/module/page/shared/Navigator/Container'
import { message } from 'antd'
import config from '@/config'
import './style.scss'
import '../../admin/admin.scss'

import { Col, Row, Icon, Form, Breadcrumb, Button, Table, Divider } from 'antd'
import moment from 'moment/moment'

export default class extends StandardPage {
    componentDidMount() {
        this.props.getMyCommunities(this.props.currentUserId)
    }

    leaveCommunity(communityId) {
        this.props.removeMember(this.props.currentUserId, communityId).then(() => {
            this.props.getMyCommunities(this.props.currentUserId)
            message.success('You left community successfully')
        })
    }

    ord_renderContent () {
        const myCommunities = this.props.myCommunities
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
            className: 'fontWeight500 allow-wrap',
        }, {
            title: 'Geolocation',
            dataIndex: 'geolocation',
            render: (geolocation, record) => {
                return config.data.mappingCountryCodeToName[geolocation] || geolocation
            }
        }, {
            title: 'Type',
            dataIndex: 'type',
        }, {
            title: 'Actions',
            dataIndex: '_id',
            key: 'actions',
            className: 'right-align',
            render: (id, record) => {
                if (this.props.profileCountry === record.geolocation) {
                    return
                }

                return (
                    <Button onClick={this.leaveCommunity.bind(this, id)}>Leave</Button>
                )
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
                                <Breadcrumb.Item>Communities</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="p_ProfileCommunities p_admin_content">
                            <Row>
                                <Col span={20} className="c_ProfileContainer admin-left-column wrap-box-user">
                                    <Divider>Joined Communities</Divider>

                                    <Table
                                        columns={columns}
                                        rowKey={(item) => item._id}
                                        dataSource={myCommunities}
                                        loading={this.props.loading}
                                    />
                                </Col>
                                <Col span={4} className="admin-right-column wrap-box-navigator">
                                    <Navigator selectedItem={'profileCommunities'}/>
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
