import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import UserContactForm from '@/module/form/UserContactForm/Container'
import moment from 'moment'
import Comments from '@/module/common/comments/Container'
import { Col, Row, Tabs, Icon, Button, Divider } from 'antd'
import I18N from '@/I18N'
import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS, TASK_CANDIDATE_STATUS, USER_ROLE} from '@/constant'
import './style.scss'
import config from '@/config'
import MediaQuery from 'react-responsive'

const TabPane = Tabs.TabPane
const dateTimeFormat = 'MMM D, YYYY - h:mma (Z [GMT])'

export default class extends BaseComponent {

    // TODO: add twitter, telegram, linkedIn, FB
    ord_render () {

        if (!this.props.member) {
            return <div/>
        }

        let roleName = this.props.member.role
        if (roleName === USER_ROLE.LEADER) {
            roleName = 'ORGANIZER'
        }

        return (
            <div className="c_Member public">
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
        )
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
                <Row>
                    <Col span={22} offset={1}>
                        <Comments type="user" reduxType="member" canPost={true} model={this.props.member}
                            headlines={true} returnUrl={`/member/${this.props.member._id}`}
                            header={I18N.get('comments.posts')}
                        />
                    </Col>
                </Row>
            </div>
        )
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
                        <div className="pull-right">
                            {this.renderSocialMedia()}
                        </div>
                    </div>

                    {this.renderDescription()}
                </div>

                <Row>
                    <Col span={24} className="gridCol">
                        <Comments type="user" reduxType="member" canPost={true} model={this.props.member}
                            headlines={true} returnUrl={`/member/${this.props.member._id}`}
                            header={I18N.get('comments.posts')}
                        />
                    </Col>
                </Row>
            </div>
        )
    }

    renderBanner(isMobile) {
        return (
            <div className={`profile-banner ${isMobile ? 'profile-banner-mobile' : ''}`}>
                <span style={{ backgroundImage: `url('/assets/images/profile-banner.svg')` }}></span>
            </div>
        )
    }

    renderAvatar(isMobile) {
        return (
            <div className={`profile-avatar-container ${isMobile ? 'profile-avatar-container-mobile' : ''}`}>
                <div className="profile-avatar">
                    <img src={this.props.member.profile.avatar} />
                </div>
            </div>
        )
    }

    renderFullName(isMobile) {
        return (
            <h1 className={`profile-general-title ${isMobile ? 'profile-general-title-mobile' : ''}`}>
                {this.props.member.profile.firstName}&nbsp;
                {this.props.member.profile.lastName}
            </h1>
        )
    }

    renderButton(isMobile) {
        return (
            <div className={`profile-button ${isMobile ? 'profile-button-mobile' : ''}`}>
                {this.renderSendMessage()}
                {this.renderFollow()}
            </div>
        )
    }

    renderSendMessage() {
        return <Button type="primary" className="profile-send-msg">Send Message</Button>
    }

    renderFollow() {
        return <Button className="profile-follow">Follow</Button>
    }

    renderLocation(isMobile) {
        return (
            <div className={`profile-general-info ${isMobile ? 'profile-general-info-mobile' : ''}`}>
                <i class="fas fa-map-marker-alt"></i>
                <span>
                    <strong>{this.getCountryName(this.props.member.profile.country)}</strong>
                </span>
            </div>
        )
    }

    renderLocalTime(isMobile) {
        return (
            <div className={`profile-general-info ${isMobile ? 'profile-general-info-mobile' : ''}`}>
                {this.props.member.profile.timezone && <i class="far fa-circle"></i>}
                {this.props.member.profile.timezone && <span>
                    <strong>Local time: {this.props.member.profile.timezone}</strong>
                </span>}
            </div>
        )
    }

    renderSocialMedia(isMobile) {
        const { profile } = this.props.member

        return (
            <div className={`profile-social ${isMobile ? 'profile-social-mobile' : ''}`}>
                {profile.telegram && <a href={profile.telegram} target="_blank"><i className="fab fa-telegram fa-2x"/></a>}
                {profile.twitter && <a href={profile.twitter} target="_blank"><i className="fab fa-twitter fa-2x"/></a>}
                {profile.facebook && <a href={profile.facebook} target="_blank"><i class="fab fa-facebook-square fa-2x"></i></a>}
                {profile.reddit && <a href={profile.reddit} target="_blank"><i className="fab fa-reddit fa-2x"/></a>}
                {profile.linkedin && <a href={profile.linkedin} target="_blank"><i class="fab fa-linkedin fa-2x"></i></a>}
            </div>
        )
    }

    renderDescription(isMobile) {
        return (
            <div>
                {
                    this.props.member.profile.bio &&
                    <div className={`profile-description ${isMobile ? 'profile-description-mobile' : ''}`}>{this.props.member.profile.bio}</div>
                }
            </div>
        )
    }

    renderContactForm() {
        return <Row>
            <Col span={24}>
                {!this.props.is_login ? <div>
                        You must login/register first to send a message
                    </div> :
                    <UserContactForm recipient={this.props.member}/>
                }
            </Col>
        </Row>
    }

    getCountryName(countryCode) {
        return config.data.mappingCountryCodeToName[countryCode]
    }

}
