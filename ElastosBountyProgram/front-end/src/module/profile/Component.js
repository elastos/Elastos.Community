import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import UserEditForm from '@/module/form/UserEditForm/Container'
import { Col, Row, Icon, Popover, Button, Spin, Tabs } from 'antd'

import UserPublicDetail from './detail/Container'

import {USER_ROLE, USER_GENDER} from '@/constant'
import config from '@/config'

import './style.scss'

const TabPane = Tabs.TabPane

/**
 * This has 3 views
 *
 * 1. Public
 * 2. Admin
 * 3. Edit
 *
 */
export default class extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            editing: false,
            publicView: false
        }
    }

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

        if (!this.state.publicView && (this.props.page === 'ADMIN' || this.props.page === 'LEADER')) {
            return this.renderPersonalDetail()
        } else {
            return <UserPublicDetail member={this.props.user} page={this.props.page}/>
        }
    }

    renderHeader() {

        // TODO: edit only if you're own profile / is admin
        return <div className="l_banner">
            <div className="pull-left">
                Your Profile
            </div>
            <div className="pull-right right-align">
                {this.state.editing && <Button onClick={this.switchEditMode.bind(this)}>
                    Cancel
                </Button>}
                {this.state.publicView && <Button onClick={this.switchPublicView.bind(this)}>
                    Cancel
                </Button>}
                {!this.state.editing && !this.state.publicView && <div>
                    <Button onClick={this.switchPublicView.bind(this)}>
                        Public Profile
                    </Button>
                    <Button onClick={this.switchEditMode.bind(this)}>
                        Edit
                    </Button>
                </div>}
            </div>
            <div className="clearfix"/>
        </div>

    }

    renderPersonalDetail() {

        return (
            <Tabs defaultActiveKey="general">
                {/*
                ***************************************************************************
                * General
                ***************************************************************************
                */}
                <TabPane tab="General" key="general">
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
                        <Col span={8} className="gridCol strong-text right-align">
                            Role
                        </Col>
                        <Col span={16} className="gridCol strong-text">
                            {this.props.user.role === USER_ROLE.LEADER ? 'ORGANIZER' : this.props.user.role}
                            &nbsp;
                            <Popover content={this.getRoleHelp.call(this)}>
                                <Icon className="help-icon" type="question-circle-o"/>
                            </Popover>
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
                            About Me
                        </Col>
                        <Col span={16} className="gridCol">
                            {this.props.user.profile.bio}
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
                            {this.getAvatarUrl(this.props.user.profile)}
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
                            Timezone
                        </Col>
                        <Col span={16} className="gridCol">
                            {this.props.user.profile.timezone}
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
                </TabPane>

                {/*
                ***************************************************************************
                * Social Media
                ***************************************************************************
                */}
                <TabPane tab="Social Media" key="socialMedia">
                    <Row>
                        <Col span={8} className="gridCol right-align">
                            LinkedIn
                        </Col>
                        <Col span={16} className="gridCol">
                            {this.props.user.profile.linkedin}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} className="gridCol right-align">
                            GitHub
                        </Col>
                        <Col span={16} className="gridCol">
                            {this.props.user.profile.github}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} className="gridCol right-align">
                            Telegram
                        </Col>
                        <Col span={16} className="gridCol">
                            {this.props.user.profile.telegram}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} className="gridCol right-align">
                            Reddit
                        </Col>
                        <Col span={16} className="gridCol">
                            {this.props.user.profile.reddit}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} className="gridCol right-align">
                            WeChat
                        </Col>
                        <Col span={16} className="gridCol">
                            {this.props.user.profile.wechat}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} className="gridCol right-align">
                            Twitter
                        </Col>
                        <Col span={16} className="gridCol">
                            {this.props.user.profile.twitter}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} className="gridCol right-align">
                            Facebook
                        </Col>
                        <Col span={16} className="gridCol">
                            {this.props.user.profile.facebook}
                        </Col>
                    </Row>
                </TabPane>

                {/*
                ***************************************************************************
                * Questions
                ***************************************************************************
                */}
                <TabPane tab="Questions" key="questions">
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
                </TabPane>
            </Tabs>
        )
    }

    getCountryName(countryCode) {
        return config.data.mappingCountryCodeToName[countryCode]
    }

    getGenderName(key) {
        return config.data.mappingGenderKeyToName[key];
    }

    getAvatarUrl(profile) {
        if (profile.avatar) {
            return <img src={profile.avatar} className="user-avatar"/>
        }

        return <span className="no-info">not uploaded</span>
    }

    getRoleHelp() {
        switch (this.props.user.role) {

            case USER_ROLE.MEMBER:
                return 'you can only apply for tasks/events, if you want to be an organizer please apply on the community pages'

            case USER_ROLE.LEADER:
                return 'you can only create social tasks/events'

            default:
                return 'you are an admin user'
        }
    }

    switchEditMode() {
        this.setState({editing: !this.state.editing})
    }

    switchPublicView() {
        this.setState({publicView: !this.state.publicView})
    }

}
