import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import UserContactForm from '@/module/form/UserContactForm/Container'
import moment from 'moment'

import { Col, Row, Button, Divider, message, List, Icon, Tooltip, Popconfirm } from 'antd'

import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS, TASK_CANDIDATE_STATUS, USER_ROLE} from '@/constant'

import './style.scss'

import config from '@/config'

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
                <h3>
                    {this.props.member.username} - &nbsp;
                    {_.capitalize(roleName)}
                </h3>
                <Row>
                    <Col span={12} className="gridCol">
                        <Row>
                            <Col span={24} className="section-title">
                                <h4>Info</h4>
                            </Col>
                        </Row>
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
                            <Col span={24} className="section-title">
                                <h4>Location</h4>
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
                    </Col>
                    <Col span={12} className="gridCol left-vert-sep">
                        <Row>
                            <Col span={24} className="section-title">
                                <h4>Send an Email</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                {!this.props.is_login ? <div>
                                    You must login/register first to send a message
                                </div>
                                    : <UserContactForm recipient={this.props.member}/>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </div>
        )
    }

    getCountryName(countryCode) {
        return config.data.mappingCountryCodeToName[countryCode]
    }
}
