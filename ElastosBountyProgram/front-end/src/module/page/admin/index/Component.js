import React from 'react'
import AdminPage from '../AdminPage';
import './style.scss'

import { Row, Col } from 'antd';
import Menu from '../../../layout/Admin/Menu/Component'
import Users from './Users/Component'

export default class extends AdminPage {
    ord_renderContent () {
        return (
            <div className="p_admin_index ebp-admin-wrap">
                <div className="d_box">
                    <Menu />
                    <Row>
                        <Col span={18}>
                            <div>
                                <h1>Users</h1>
                            </div>
                            <Users />
                        </Col>
                        <Col span={6}>TODO menu right</Col>
                    </Row>
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