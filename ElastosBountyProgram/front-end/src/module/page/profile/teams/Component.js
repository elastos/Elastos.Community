import React from 'react'
import StandardPage from '../../StandardPage'
import Navigator from '@/module/page/shared/Navigator/Container'
import config from '@/config'

import './style.scss'
import '../../admin/admin.scss'

import { Col, Row, Icon, Form, Input, Button, Divider, Table } from 'antd'
import moment from 'moment/moment'
const FormItem = Form.Item

export default class extends StandardPage {
    ord_states() {
        return {
            loading: true,
            total: 0,
            list: []
        }
    }
    ord_renderContent () {
        return (
            <div>
                <div className="ebp-header-divider">

                </div>
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_breadcrumb">
                            <br/>
                        </div>
                        <div className="p_ProfileTeams p_admin_content">
                            <Row>
                                <Col span={20} className="c_ProfileContainer admin-left-column wrap-box-user">
                                    <div className="pull-right">
                                        <Button onClick={this.goCreatepage.bind(this)}>Create Team</Button>
                                    </div>
                                    <Divider className="">My teams</Divider>
                                    {this.renderList()}
                                </Col>
                                <Col span={4} className="admin-right-column wrap-box-navigator">
                                    <Navigator selectedItem={'profileTeams'}/>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderList() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '20%',
                className: 'fontWeight500',
                render: (name, record) => {
                    return <a onClick={this.goDetail.bind(this, record._id)} className="tableLink">{name}</a>
                }
            },
            {
                title: 'Description',
                dataIndex: 'profile.description'
                // key: 'profile.description'
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type'
                // render: (category) => _.capitalize(category)
            },
            {
                title: 'Created',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (createdAt) => moment(createdAt).format(config.FORMAT.DATE)
            }
        ]

        return (
            <Table
                columns={columns}
                rowKey={(item) => item._id}
                dataSource={this.state.list}
                loading={this.state.loading}
            />
        )
    }

    goDetail(teamId) {
        this.props.history.push(`/profile/teams/${teamId}`)
    }
    goCreatepage() {
        this.props.history.push('/profile/teams/create')
    }

    async componentDidMount() {
        await super.componentDidMount()

        const d = await this.props.list({
            teamHasUser: this.props.current.id
        })
        this.setState({
            total: d.total,
            list: d.list,
            loading: false
        })
    }
}
