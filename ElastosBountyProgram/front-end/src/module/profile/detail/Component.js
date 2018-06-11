import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'

import { Col, Row, Button, Divider, message, List, Icon, Tooltip, Popconfirm } from 'antd'

import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS, TASK_CANDIDATE_STATUS} from '@/constant'

import './style.scss'

const dateTimeFormat = 'MMM D, YYYY - h:mma (Z [GMT])'

export default class extends BaseComponent {

    ord_render () {

        if (!this.props.member) {
            return <div/>
        }

        return (
            <div className="c_Member public">
                <Row>
                    <Col span={18} className="gridCol main-area">
                        <Row>
                            <Col>
                                <h4>
                                   You are viewing {this.props.member.username}'s public profile
                                </h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={this.props.member.profile.avatar ? 18 : 24}>
                                <Row>
                                    <Col span={4} className="label-col">
                                        First Name
                                    </Col>
                                    <Col span={20}>
                                        <p>
                                            {this.props.member.profile.firstName}
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={4} className="label-col">
                                        Last Name
                                    </Col>
                                    <Col span={20}>
                                        <p>
                                            {this.props.member.profile.lastName}
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6} className="gridCol applicants">

                    </Col>
                </Row>

            </div>
        )
    }

}
