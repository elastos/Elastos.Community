import React from 'react'
import AdminPage from '../BaseAdmin'

import '../admin.scss'
import './style.scss'

import { Col, Row, Breadcrumb, Icon } from 'antd'
import ListUsers from './ListUsers/Component'
import Navigator from '../shared/Navigator/Component'

export default class extends AdminPage {

    componentDidMount() {
        this.props.listUsers()
    }

    ord_renderContent () {

        return (
            <div className="p_admin_index ebp-wrap">
                <div className="d_box">
                    <div className="p_admin_breadcrumb">
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">
                                <Icon type="home" />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Admin</Breadcrumb.Item>
                            <Breadcrumb.Item>Users</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="p_admin_content">
                        <Row>
                            <Col span={20} className="admin-left-column wrap-box-user">
                                <ListUsers users={this.props.users} history={this.props.history} loading={this.props.loading}/>
                            </Col>
                            <Col span={4} className="admin-right-column wrap-box-navigator">
                                <Navigator selectedItem={'users'}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}
