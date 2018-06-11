import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import UserEditForm from '@/module/form/UserEditForm/Container'
import { Col, Row, Icon, Divider, Button, Spin } from 'antd'

// import UserPublicDetail from './detail/Container'

import {TASK_STATUS} from '@/constant'
import config from '@/config'

import './style.scss'

/**
 * This has 3 views
 *
 * 1. Public
 * 2. Admin
 * 3. Edit
 *
 */
export default class extends BaseComponent {

    // only wraps loading / renderMain
    ord_render () {
        return (_.isEmpty(this.props.user) || this.props.user.loading ?
                <div class="center"><Spin size="large" /></div> :
                this.renderMain()
        )
    }


    // header + main area
    renderMain() {
        return (
            <div className="c_ProfileDetail">
                {this.renderHeader()}
                {this.state.editing ? this.renderEditForm() : this.renderDetail()}
            </div>
        )
    }

    // TODO
    renderEditForm() {
        return <div className="form-wrapper">
            <UserEditForm user={this.props.user} page={this.props.page} switchEditMode={this.switchEditMode.bind(this)}/>
        </div>
    }

    // for now public and your profile view looks the same
    renderDetail() {

        return this.renderPersonalDetail()

        /*
        if (this.props.page === 'ADMIN') {
            return this.renderAdminDetail()
        } else {
            return <UserPublicDetail task={this.props.user} page={this.props.page}/>
        }
        */
    }

    renderHeader() {

        // TODO: edit only if you're own profile / is admin
        return <div className="l_banner">
            <div className="pull-left">
                Your Profile
            </div>
            <div className="pull-right right-align">
                <Button onClick={this.switchEditMode.bind(this)}>
                    {this.state.editing ? 'Cancel' : 'Edit'}
                </Button>
            </div>
            <div className="clearfix"/>
        </div>

    }

    renderPersonalDetail() {

        return (
            <div>
                <Row>
                    <Col span={8} className="gridCol right-align">
                        <h4>
                            Username
                        </h4>
                    </Col>
                    <Col span={16} className="gridCol">
                        <h4>
                            {this.props.user.username}
                        </h4>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} className="gridCol right-align">
                        First Name
                    </Col>
                    <Col span={16} className="gridCol">
                        {this.props.user.profile.firstName}
                    </Col>
                </Row>
                <Row>
                    <Col span={8} className="gridCol right-align">
                        Last Name
                    </Col>
                    <Col span={16} className="gridCol">
                        {this.props.user.profile.lastName}
                    </Col>
                </Row>
                <Row>
                    <Col span={8} className="gridCol right-align">
                        Country
                    </Col>
                    <Col span={16} className="gridCol">
                        {this.getCountryName(this.props.user.profile.country)}
                    </Col>
                </Row>
                <Row>
                    <Col span={8} className="gridCol right-align">
                        State/Province
                    </Col>
                    <Col span={16} className="gridCol">
                        {this.props.user.profile.state}
                    </Col>
                </Row>
                <Row>
                    <Col span={8} className="gridCol right-align">
                        City
                    </Col>
                    <Col span={16} className="gridCol">
                        {this.props.user.profile.city}
                    </Col>
                </Row>
                <Row>
                    <Col span={8} className="gridCol right-align">
                        Do you want to be an organizer?
                    </Col>
                    <Col span={16} className="gridCol">
                        {this.props.user.profile.beOrganizer ? 'Yes' : 'No'}
                    </Col>
                </Row>
                <Row>
                    <Col span={8} className="gridCol right-align">
                        Are you a software developer or engineer?
                    </Col>
                    <Col span={16} className="gridCol">
                        {this.props.user.profile.isDeveloper ? 'Yes' : 'No'}
                    </Col>
                </Row>
            </div>
        )
    }

    getCountryName(countryCode) {
        return config.data.mappingCountryCodeToName[countryCode]
    }

    switchEditMode() {
        this.setState({editing: !this.state.editing})
    }

}
