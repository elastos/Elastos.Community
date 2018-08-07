import React from 'react'
import StandardPage from '../../StandardPage'
import { Link } from 'react-router-dom'
import config from '@/config'
import Search from '@/module/search/Container'
import _ from 'lodash'
import './style.scss'
import { Col, Row, Icon, Form, Input, Button, Breadcrumb } from 'antd'
import moment from 'moment/moment'

export default class extends StandardPage {
    ord_renderContent () {
        return (
            <div className="p_DeveloperSearch">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-wrap">
                    <Row className="d_row d_rowTop">
                        <div className="p_admin_breadcrumb">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <Icon type="home"/>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="/developers">
                                    Developers
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    Search
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </Row>
                    <Row className="d_row">
                        <Search/>
                    </Row>
                    <div className="horizGap">
                    </div>
                </div>
            </div>
        )
    }
}
