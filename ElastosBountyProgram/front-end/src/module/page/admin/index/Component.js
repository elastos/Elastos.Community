import React from 'react'
import AdminPage from '../AdminPage'
import './style.scss'

import { Col, Row } from 'antd'
import Menu from '../../../layout/Admin/Menu/Component'
import Users from './Users/Component'
import Navigator from './Navigator/Component'

export default class extends AdminPage {
    ord_renderContent () {
        return (
            <div className="p_admin_index ebp-admin-wrap">
                <div className="d_box">
                    <Menu/>
                    <div className="p_admin_content">
                        <Row>
                            <Col span={18} className="wrap-box-user">
                                <div>
                                    <h1>Users</h1>
                                </div>
                                <Users/>
                            </Col>
                            <Col span={6} className="wrap-box-navigator">
                                <Navigator/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }

    ord_checkLogin (isLogin) {
        if (isLogin) {
            this.props.history.replace('/home')
        }
    }
}