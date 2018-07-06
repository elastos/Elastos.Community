import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import UserEditForm from '@/module/form/UserEditForm/Container'
import { Col, Row, Icon, Divider, Button, Spin } from 'antd'

import UserPublicDetail from './detail/Container'

import {TASK_STATUS, USER_GENDER} from '@/constant'
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
        return (_.isEmpty(this.props.user) || this.props.user.loading
            ? <div class="center"><Spin size="large" /></div>
            : this.renderMain()
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
        if (this.props.page === 'ADMIN' || this.props.page === 'LEADER') {
            return this.renderPersonalDetail()
        } else {
            // Not used
            return <UserPublicDetail task={this.props.user} page={this.props.page}/>
        }
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
                        Email
                    </Col>
                    <Col span={16} className="gridCol">
                        {this.props.user.email}
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
                        Gender
                    </Col>
                    <Col span={16} className="gridCol">
                        {this.getGenderName(this.props.user.profile.gender)}
                    </Col>
                </Row>
                <Row>
                    <Col span={8} className="gridCol right-align">
                        Avatar
                    </Col>
                    <Col span={16} className="gridCol">
                        <img src={this.getAvatarUrl(this.props.user.profile)} class="user-avatar"/>
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
                <Row>
                    <Col span={8} className="gridCol right-align">
                        Wallet Address
                    </Col>
                    <Col span={16} className="gridCol">
                        {this.props.user.profile.walletAddress}
                    </Col>
                </Row>
            </div>
        )
    }

    getCountryName(countryCode) {
        return config.data.mappingCountryCodeToName[countryCode]
    }

    getGenderName(key) {
        return config.data.mappingGenderKeyToName[key]
    }

    getAvatarUrl(profile) {
        if (profile.avatar) {
            return profile.avatar
        }

        const avatarDefault = {
            [USER_GENDER.MALE]: '/assets/images/User_Avatar_Male.png',
            [USER_GENDER.FEMALE]: '/assets/images/User_Avatar_Female.png',
            [USER_GENDER.OTHER]: '/assets/images/User_Avatar_Other.png'
        }

        return avatarDefault[profile.gender]
    }

    switchEditMode() {
        this.setState({editing: !this.state.editing})
    }
}
