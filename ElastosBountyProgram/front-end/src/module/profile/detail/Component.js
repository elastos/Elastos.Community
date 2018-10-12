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
                <MediaQuery maxWidth={780}>
                    {this.renderMobile()}
                </MediaQuery>
                <MediaQuery minWidth={781}>
                    {this.renderDesktop()}
                </MediaQuery>
            </div>
        )
    }

    renderMobile() {
        return (
            <div>
                {this.renderBanner()}
                <Row className="profile-info">
                    <Col span={22} offset={1}>
                        <Row>
                            <Col sm={5} xs={5} style={{height: '100%'}}>&nbsp;{this.renderAvatar(true)}</Col>
                            <Col sm={18} xs={18} offset={1}>
                                {this.renderFullName(true)}
                                {this.renderLocation()}
                                {this.renderLocalTime()}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.renderSocialMedia(true)}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.renderDescription()}
                            </Col>
                        </Row>
                    </Col>
                </Row>
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
                <Row className="profile-info">
                    <Col span={22} offset={1}>
                        <Row>
                            <Col lg={6} md={6} style={{height: '100%'}}>&nbsp;{this.renderAvatar()}</Col>
                            <Col lg={17} md={17} offset={1}>{this.renderFullName()}</Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6}>{this.renderSendMessage()}</Col>
                            <Col lg={17} md={17} offset={1}>{this.renderLocation()}</Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6}>{this.renderFollow()}</Col>
                            {
                                this.props.member.profile.timezone && <Col md={{span: 17, offset: 1}} lg={{span: 9, offset: 1}}>{this.renderLocalTime()}</Col>
                            }

                            <Col style={{float: 'right'}} md={{span: 17, offset: 7}} lg={{ span: 8, offset: 0}}>{this.renderSocialMedia()}</Col>
                        </Row>
                    </Col>
                    <Col span={22} offset={1}>
                        {this.renderDescription()}
                    </Col>
                </Row>

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

    renderBanner() {
        return (
            <div className="profile-banner">
                <img src="/assets/images/profile-banner.svg" />
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

    renderSendMessage() {
        return (
            <div>
                <Button type="primary" className="profile-send-msg">Send Message</Button>
            </div>
        )
    }

    renderFollow() {
        return (
            <div>
                <Button className="profile-follow">Follow</Button>
            </div>
        )
    }

    renderLocation() {
        return (
            <div className="profile-general-info">
                <i class="fas fa-map-marker-alt"></i>
                <span>
                    <strong>{this.getCountryName(this.props.member.profile.country)}</strong>
                </span>
            </div>
        )
    }

    renderLocalTime() {
        return (
            <div className="profile-general-info">
                <i class="far fa-circle"></i>
                <span>
                    <strong>Local time: {this.props.member.profile.timezone}</strong>
                </span>
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

    renderDescription() {
        return (
            <div>
                {
                    this.props.member.profile.bio &&
                    <div className="profile-description">{this.props.member.profile.bio}</div>
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
