import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import UserEditForm from '@/module/form/UserEditForm/Container'
import UserProfileForm from '@/module/form/UserProfileForm/Container'
import I18N from '@/I18N'
import { Col, Row, Icon, Popover, Button, Spin, Tabs } from 'antd'
import moment from 'moment-timezone'

import UserPublicDetail from './detail/Container'

import {USER_AVATAR_DEFAULT} from '@/constant'
import config from '@/config'
import MediaQuery from 'react-responsive'

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
            editingBasic: false,
            publicView: false
        }
    }

    // TODO: add twitter, telegram, linkedIn, FB
    ord_render () {
        let content = null;
        if (_.isEmpty(this.props.user) || this.props.user.loading) {
            return <div class="center"><Spin size="large" /></div>;
        }

        if (this.state.publicView) {
            content = (
                <div className="member-content">
                    {this.renderHeader()}
                    <div className="container">
                        <UserPublicDetail userId={this.props.currentUserId} page={this.props.page}/>
                    </div>
                </div>
            );
        } else if (this.state.editingBasic) {
            content = (
                <div className="member-content">
                    {this.renderHeader()}
                    <div className="container">
                        <div>
                            {this.renderBanner(false, this.state.temporaryBanner)}
                            <div className="profile-info-container clearfix">
                                <div className="profile-left pull-left">
                                    {this.renderAvatar(false, this.state.temporaryAvatar)}
                                </div>
                                <UserProfileForm user={this.props.user}
                                    page={this.props.page} switchEditMode={this.switchEditBasicMode}
                                    updateBanner={(url) => this.setState({temporaryBanner: url})}
                                    updateAvatar={(url) => this.setState({temporaryAvatar: url})}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            content = (
                <div>
                    <MediaQuery maxWidth={800}>
                        <div className="member-content member-content-mobile">
                            {this.renderMobile()}
                        </div>
                    </MediaQuery>
                    <MediaQuery minWidth={801}>
                        <div className="member-content">
                            {this.renderDesktop()}
                        </div>
                    </MediaQuery>
                </div>
            );
        }

        return (
            <div className="c_Member public">
                {content}
            </div>
        );
    }

    renderMobile() {
        return (
            <div>
                {this.renderBanner(true)}
                <div className="profile-info-container profile-info-container-mobile clearfix">
                    {this.renderAvatar(true)}
                    {this.renderFullName(true)}
                    {this.renderLocation(true)}
                    {this.renderLocalTime(true)}
                    {this.renderSocialMedia(true)}
                    {this.renderButton(true)}
                    {this.renderDescription(true)}
                </div>
                {this.renderMetrics()}
                {this.renderEditForm()}
            </div>
        )
    }

    renderEditForm() {
        if (this.state.editing) {
            return (
                <UserEditForm user={this.props.user} page={this.props.page} switchEditMode={this.switchEditMode}/>
            )
        }
    }

    renderDesktop() {
        return (
            <div>
                {this.renderBanner()}
                <div className="profile-info-container clearfix">
                    <div className="profile-left pull-left">
                        {this.renderAvatar()}
                        {this.renderButton()}
                    </div>
                    <div className="profile-right pull-left">
                        {this.renderFullName()}
                        {this.renderLocation()}
                        <div className="pull-left">
                            {this.renderLocalTime()}
                        </div>
                        <div className="clearfix"/>
                        <div>
                            {this.renderSocialMedia()}
                        </div>
                    </div>
                    {this.renderDescription()}
                </div>
                {this.renderMetrics()}
                {this.renderEditForm()}
            </div>
        )
    }

    renderHeader() {
        if (this.state.publicView || this.state.editingBasic) {
            const onToggle = this.state.publicView ? this.switchPublicView : this.switchEditBasicMode;
            return (
                <div className="header">
                    <div className="content">
                        {I18N.get(this.state.publicView ? 'profile.publicProfile' : 'profile.edit')}
                    </div>
                    <Icon className="close-btn" type="close" onClick={onToggle} />
                </div>
            )
        }
    }

    renderMetrics() {
        return (
            <Row gutter={16} className="profile-metrics">
                <Col md={24}>
                    {this.renderMetricItem(I18N.get('profile.followers'), this.props.user.subscribers.length)}
                </Col>
            </Row>
        )
    }

    renderMetricItem(label, value) {
        return (
            <div className="item">
                <div className="value">
                    {value}
                </div>
                <div className="center">
                    {label}
                </div>
            </div>
        )
    }

    renderBanner(isMobile, url) {
        return (
            <div className={`profile-banner ${isMobile ? 'profile-banner-mobile' : ''}`}>
                <span style={{ backgroundImage: this.getBannerWithFallback(url || this.props.user.profile.banner) }}></span>
                {!this.state.editingBasic && <Icon className="profile-edit-btn" type="edit" onClick={this.switchEditBasicMode}/>}
            </div>
        )
    }

    renderAvatar(isMobile, url) {
        return (
            <div className={`profile-avatar-container ${isMobile ? 'profile-avatar-container-mobile' : ''}`}>
                <div className="profile-avatar">
                    <img src={this.getAvatarWithFallback(url || this.props.user.profile.avatar)} />
                </div>
            </div>
        )
    }

    renderFullName(isMobile) {
        return (
            <h1 className={`komu-a profile-general-title ${isMobile ? 'profile-general-title-mobile' : ''}`}>
                {this.props.user.profile.firstName}&nbsp;
                {this.props.user.profile.lastName}
            </h1>
        )
    }

    renderButton(isMobile) {
        return (
            <div className={`profile-button ${isMobile ? 'profile-button-mobile' : ''}`}>
                <Button className="profile-edit separated" onClick={this.switchEditMode}>
                    {I18N.get('profile.editProfile')}
                </Button>
                <Button className="profile-show" onClick={this.switchPublicView}>
                    {I18N.get('profile.showPublicProfile')}
                </Button>
            </div>
        )
    }

    renderLocation(isMobile) {
        return (
            <div className={`profile-general-info ${isMobile ? 'profile-general-info-mobile' : ''}`}>
                <i class="fas fa-map-marker-alt location-icon"></i>
                <span>
                    {this.getCountryName(this.props.user.profile.country)}
                </span>
            </div>
        )
    }

    getBannerWithFallback(banner) {
        return _.isEmpty(banner)
            ? `url('/assets/images/profile-banner.png')`
            : `url(${banner})`
    }

    getAvatarWithFallback(avatar) {
        return _.isEmpty(avatar)
            ? USER_AVATAR_DEFAULT
            : avatar
    }

    renderLocalTime(isMobile) {
        const now = moment(Date.now())
        const user = this.props.user
        const localTime = user.profile.timezone
            ? now.tz(user.profile.timezone).format('LT z')
            : 'Unknown'

        return (
            <div className={`profile-general-info ${isMobile ? 'profile-general-info-mobile' : ''}`}>
                <Icon type="clock-circle"/>
                <span>
                    {I18N.get('profile.localTime')} {localTime}
                </span>
            </div>
        )
    }

    renderSocialMedia(isMobile) {
        const { profile } = this.props.user

        return (
            <div className={`profile-social ${isMobile ? 'profile-social-mobile' : ''}`}>
                {profile.telegram && <a href={profile.telegram} target="_blank"><i className="fab fa-telegram fa-2x"/></a>}
                {profile.twitter && <a href={profile.twitter} target="_blank"><i className="fab fa-twitter fa-2x"/></a>}
                {profile.facebook && <a href={profile.facebook} target="_blank"><i class="fab fa-facebook-square fa-2x"></i></a>}
                {profile.reddit && <a href={profile.reddit} target="_blank"><i className="fab fa-reddit fa-2x"/></a>}
                {profile.linkedin && <a href={profile.linkedin} target="_blank"><i class="fab fa-linkedin fa-2x"></i></a>}
                {profile.github && <a href={profile.github} target="_blank"><i class="fab fa-github fa-2x"></i></a>}
            </div>
        )
    }

    renderDescription(isMobile) {
        return (
            <div>
                {
                    this.props.user.profile.bio &&
                    <div className={`profile-description ${isMobile ? 'profile-description-mobile' : ''}`}>{this.props.user.profile.bio}</div>
                }
            </div>
        )
    }

    getCountryName(countryCode) {
        return config.data.mappingCountryCodeToName[countryCode]
    }

    switchEditBasicMode = () => {
        this.setState({
            editingBasic: !this.state.editingBasic,
            temporaryAvatar: null,
            temporaryBanner: null
        })
    }

    switchEditMode = () => {
        this.setState({
            editing: !this.state.editing,
            temporaryAvatar: null,
            temporaryBanner: null
        })
    }

    switchPublicView = () => {
        this.setState({
            publicView: !this.state.publicView,
            temporaryAvatar: null,
            temporaryBanner: null
        })
    }

}
