import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import UserContactForm from '@/module/form/UserContactForm/Container'
import moment from 'moment'

import { Col, Row, Tabs, Icon } from 'antd'

const TabPane = Tabs.TabPane

import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS, TASK_CANDIDATE_STATUS, USER_ROLE} from '@/constant'

import './style.scss'

import config from '@/config'

const dateTimeFormat = 'MMM D, YYYY - h:mma (Z [GMT])'

import MediaQuery from 'react-responsive'

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
                <h3>
                    <MediaQuery maxWidth={720}>
                        <Icon type="left" style={{color: '#5E6C86'}} onClick={() => {this.props.history.goBack()}}/>
                    </MediaQuery>&nbsp;
                    {this.props.member.username} -&nbsp;
                    <span className="no-info">{roleName.toLowerCase()}</span>
                </h3>
                <MediaQuery maxWidth={720}>
                    {this.renderMobile()}
                </MediaQuery>
                <MediaQuery minWidth={720}>
                    {this.renderDesktop()}
                </MediaQuery>
            </div>
        )
    }

    renderMobile() {
        return <Tabs>
            <TabPane tab="General" key="general">
                {this.renderGeneral()}
            </TabPane>
            <TabPane tab="Social Media" key="socialMedia">
                {this.renderSocialMedia()}
            </TabPane>
            <TabPane tab="Send an Email" key="contactForm">
                {this.renderContactForm()}
            </TabPane>
        </Tabs>
    }

    renderDesktop() {
        return <Row>
            <Col span={12} className="gridCol">
                <Tabs>
                    <TabPane tab="General" key="general">
                        {this.renderGeneral()}
                    </TabPane>
                    <TabPane tab="Social Media" key="socialMedia">
                        {this.renderSocialMedia()}
                    </TabPane>
                </Tabs>
            </Col>
            <Col span={12} className="gridCol left-vert-sep">
                <Row>
                    <Col span={24} className="section-title">
                        <h4>Send an Email</h4>
                    </Col>
                </Row>
                {this.renderContactForm()}
            </Col>
        </Row>
    }

    renderGeneral() {
        return <div>
            {this.props.member.profile.avatar &&
            <Row>
                <Col offset={8} span={16}>
                    <img src={this.props.member.profile.avatar} style={{height: '100px'}}/>
                </Col>
            </Row>
            }
            <Row>
                <Col span={8} className="label-col">
                    First Name
                </Col>
                <Col span={16}>
                    <p>
                        {this.props.member.profile.firstName}
                    </p>
                </Col>
            </Row>
            <Row>
                <Col span={8} className="label-col">
                    Last Name
                </Col>
                <Col span={16}>
                    <p>
                        {this.props.member.profile.lastName}
                    </p>
                </Col>
            </Row>
            <Row>
                <Col span={8} className="label-col">
                    Gender
                </Col>
                <Col span={16}>
                    <p>
                        {this.props.member.profile.gender}
                    </p>
                </Col>
            </Row>
            <Row>
                <Col span={8} className="label-col">
                    Country
                </Col>
                <Col span={16}>
                    <p>
                        {this.getCountryName(this.props.member.profile.country)}
                    </p>
                </Col>
            </Row>
        </div>
    }

    renderSocialMedia() {
        return <div>
            <Row>
                <Col span={8} className="label-col">
                    Telegram
                </Col>
                <Col span={16}>
                    <p>
                        {this.props.member.profile.telegram}
                    </p>
                </Col>
            </Row>
            <Row>
                <Col span={8} className="label-col">
                    Reddit
                </Col>
                <Col span={16}>
                    <p>
                        {this.props.member.profile.reddit}
                    </p>
                </Col>
            </Row>
            <Row>
                <Col span={8} className="label-col">
                    WeChat
                </Col>
                <Col span={16}>
                    <p>
                        {this.props.member.profile.wechat}
                    </p>
                </Col>
            </Row>
            <Row>
                <Col span={8} className="label-col">
                    Twitter
                </Col>
                <Col span={16}>
                    <p>
                        {this.props.member.profile.twitter}
                    </p>
                </Col>
            </Row>
            <Row>
                <Col span={8} className="label-col">
                    Facebook
                </Col>
                <Col span={16}>
                    <p>
                        {this.props.member.profile.facebook}
                    </p>
                </Col>
            </Row>
        </div>
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
