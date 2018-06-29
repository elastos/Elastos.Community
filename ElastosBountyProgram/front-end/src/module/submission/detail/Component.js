import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'
import Comments from '@/module/common/comments/Container'

import { Col, Row } from 'antd'

import {SUBMISSION_TYPE} from '@/constant'

const dateTimeFormat = 'MMM D, YYYY - h:mma (Z [GMT])'

export default class extends BaseComponent {

    ord_render () {
        const communityName = this.props.submission.type === SUBMISSION_TYPE.ADD_COMMUNITY &&
        (
            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={4} className="label-col">
                            Community
                        </Col>
                        <Col span={20}>
                            <p>
                                {this.props.submission.community.name} ({this.props.submission.community.type})
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )

        const communityState = this.props.submission.type === SUBMISSION_TYPE.ADD_COMMUNITY &&
        (
            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={4} className="label-col">
                            State
                        </Col>
                        <Col span={20}>
                            <p>
                                {this.props.submission.state}
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )

        const communityCity = this.props.submission.type === SUBMISSION_TYPE.ADD_COMMUNITY &&
        (
            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={4} className="label-col">
                            City
                        </Col>
                        <Col span={20}>
                            <p>
                                {this.props.submission.city}
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )

        return (
            <div className="public">
                <Row>
                    <Col span={18} className="gridCol main-area">
                        <Row>
                            <Col>
                                <h4 className="center">
                                    {this.props.submission.title}
                                </h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Row>
                                    <Col span={4} className="label-col">
                                        Description
                                    </Col>
                                    <Col span={20}>
                                        <p>
                                            {this.props.submission.description}
                                        </p>
                                    </Col>
                                </Row>
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
                        <Row>
                            <Col span={24}>
                                <Row>
                                    <Col span={4} className="label-col">
                                        Created by
                                    </Col>
                                    <Col span={20}>
                                        <p>
                                            <a onClick={() => {this.props.submission.createdBy && this.props.history.push(`/member/${this.props.submission.createdBy._id}`)}}>
                                                {this.props.submission.createdBy && this.props.submission.createdBy.username}
                                            </a>
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {communityName}
                        {communityState}
                        {communityCity}
                        <div className="vert-gap"/>
                    </Col>
                </Row>
                <Comments type="submission" canPost={true} model={this.props.submission}/>
            </div>
        )
    }
}
