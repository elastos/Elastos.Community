import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'

import { Col, Row } from 'antd'

import {SUBMISSION_TYPE} from '@/constant'

const dateTimeFormat = 'MMM D, YYYY - h:mma (Z [GMT])'

export default class extends BaseComponent {

    ord_render () {

        return (
            <div className="public">
                <Row>
                    <Col span={18} className="gridCol main-area">
                        <Row>
                            <Col>
                                <h4 className="center">
                                    {this.props.submission.description}
                                </h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Row>
                                    <Col span={4} className="label-col">
                                        Type
                                    </Col>
                                    <Col span={20}>
                                        <p>
                                            {this.props.submission.type}
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <div className="vert-gap"/>
                    </Col>
                </Row>
            </div>
        )
    }
}
