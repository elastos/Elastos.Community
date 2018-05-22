import React from 'react'
import AdminPage from '../BaseAdmin'

import '../admin.scss'
import './style.scss'

import Navigator from '../shared/Navigator/Component'

import { Breadcrumb, Col, Icon, Row, Menu, Select } from 'antd'

import { Link } from 'react-router-dom'

export default class extends AdminPage {
    checkTypeOfBreadcrumb () {
        // Check status of breadcrumb
        let treeLevel = Object.keys(this.props.match.params).length;
        this.setState({
            treeLevel
        });
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
                            <Breadcrumb.Item>Tasks</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="p_admin_content">
                        <Row>
                            <Col span={18} className="admin-left-column wrap-box-user">

                            </Col>
                            <Col span={6} className="admin-right-column wrap-box-navigator">
                                <Navigator selectedItem={'tasks'}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}
