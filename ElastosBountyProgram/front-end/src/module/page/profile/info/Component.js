import React from 'react'
import StandardPage from '../../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import Navigator from '@/module/page/shared/Navigator/Container'

import config from '@/config'

import './style.scss'
import '../../admin/admin.scss'

import { Col, Row, Icon, Form, Input, Button, Dropdown } from 'antd'
const FormItem = Form.Item

export default class extends StandardPage {

    getCountryName(countryCode) {
        return config.data.mappingCountryCodeToName[countryCode]
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
                        <div className="p_Profile p_admin_content">
                            <Row>
                                <Col span={20} className="c_ProfileContainer admin-left-column wrap-box-user">
                                    <div className="l_banner">
                                        <div className="pull-left">
                                            Your Profile
                                        </div>
                                        <div className="pull-right right-align">
                                            <Button>
                                                {this.state.editing ? 'Cancel' : 'Edit'}
                                            </Button>
                                        </div>
                                        <div className="clearfix"/>
                                    </div>
                                    <Row>
                                        <Col span={8} className="gridCol right-align">
                                            <h4>
                                                Username
                                            </h4>
                                        </Col>
                                        <Col span={16} className="gridCol">
                                            <h4>
                                                {this.props.username}
                                            </h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={8} className="gridCol right-align">
                                            First Name
                                        </Col>
                                        <Col span={16} className="gridCol">
                                            {this.props.profile.firstName}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={8} className="gridCol right-align">
                                            Last Name
                                        </Col>
                                        <Col span={16} className="gridCol">
                                            {this.props.profile.lastName}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={8} className="gridCol right-align">
                                            Country
                                        </Col>
                                        <Col span={16} className="gridCol">
                                            {this.getCountryName(this.props.profile.country)}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={8} className="gridCol right-align">
                                            State/Province
                                        </Col>
                                        <Col span={16} className="gridCol">
                                            {this.props.profile.state}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={8} className="gridCol right-align">
                                            City
                                        </Col>
                                        <Col span={16} className="gridCol">
                                            {this.props.profile.city}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={8} className="gridCol right-align">
                                            Do you want to be an organizer?
                                        </Col>
                                        <Col span={16} className="gridCol">
                                            {this.props.profile.beOrganizer ? 'Yes' : 'No'}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={8} className="gridCol right-align">
                                            Are you a software developer or engineer?
                                        </Col>
                                        <Col span={16} className="gridCol">
                                            {this.props.profile.isDeveloper ? 'Yes' : 'No'}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={4} className="admin-right-column wrap-box-navigator">
                                    <Navigator selectedItem={'profileInfo'} />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
