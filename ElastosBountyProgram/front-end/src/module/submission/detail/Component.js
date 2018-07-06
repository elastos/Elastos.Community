import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'
import Comments from '@/module/common/comments/Container'

import { Col, Row, Divider, Icon } from 'antd'

import {SUBMISSION_TYPE} from '@/constant'
import '../style.scss'

const dateTimeFormat = 'MMM D, YYYY - h:mma (Z [GMT])'

export default class extends BaseComponent {

    // special layout for external forms
    renderFormExt() {
        return <div>
            <Row>
                <Col>
                    <h4 className="center">
                        {this.props.submission.title}
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col className="col-label" span={4}>
                    Email
                </Col>
                <Col span={16}>
                    {this.props.submission.email}
                </Col>
            </Row>
            <Row>
                <Col className="col-label" span={4}>
                    Full Legal Name
                </Col>
                <Col span={16}>
                    {this.props.submission.fullLegalName}
                </Col>
            </Row>
            <Row>
                <Col className="form-detail-desc" offset={4} span={16}>
                    What is your native language, who is your audience and where are they located? What are the language(s) you plan to use to present Elastos.
                </Col>
            </Row>
            <Row>
                <Col offset={4} span={16}>
                    {this.props.submission.audienceInfo}
                </Col>
            </Row>
            <Row>
                <Col className="form-detail-desc" offset={4} span={16}>
                    Please describe your public speaking experience and provide any examples.
                </Col>
            </Row>
            <Row>
                <Col offset={4} span={16}>
                    {this.props.submission.publicSpeakingExp}
                </Col>
            </Row>
            <Row>
                <Col className="form-detail-desc" offset={4} span={16}>
                    Please list any current or past contributions promoting Elastos.
                </Col>
            </Row>
            <Row>
                <Col offset={4} span={16}>
                    {this.props.submission.previousExp}
                </Col>
            </Row>
            <Divider></Divider>
            <Row>
                <Col className="col-label" span={4}>
                    Are you a developer?
                </Col>
                <Col span={16}>
                    {this.props.submission.isDeveloper ? 'Yes' : 'No'}
                </Col>
            </Row>
            {!this.props.submission.isDeveloper &&
                <div>
                    <Row>
                        <Col className="form-detail-desc" offset={4} span={16}>
                            If you are not a developer, please explain how you are familiar with Elastos technology and what problems we solve.
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={4} span={16}>
                            {this.props.submission.devBackground}
                        </Col>
                    </Row>
                </div>
            }
            <Row>
                <Col className="form-detail-desc" offset={4} span={16}>
                    Describe Elastos in your own words.
                </Col>
            </Row>
            <Row>
                <Col offset={4} span={16}>
                    {this.props.submission.description}
                </Col>
            </Row>
            <Row>
                <Col className="form-detail-desc" offset={4} span={16}>
                    Tell us in a few words what inspired you to join Cyber Republic.
                </Col>
            </Row>
            <Row>
                <Col offset={4} span={16}>
                    {this.props.submission.reason}
                </Col>
            </Row>
            <Row>
                <Col className="form-detail-desc" offset={4} span={16}>
                    Please submit a video of your introduction to Cyber Republic.
                </Col>
            </Row>
            <Row>
                <Col offset={4} span={16}>
                    <a target="_blank" href={this.props.submission.attachment}>
                        <Icon type="file"/> &nbsp;
                        {this.props.submission.attachmentFilename}
                    </a>
                </Col>
            </Row>
        </div>
    }

    renderDetail() {
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

        return <Row>
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
                            <Col span={6} className="label-col">
                                {this.props.submission.campaign === 'Evangelist Training 1'
                                    ? 'Describe Elastos in your own words.'
                                    : 'Description'
                                }
                            </Col>
                            <Col span={18}>
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
                            <Col span={6} className="label-col">
                                Type
                            </Col>
                            <Col span={18}>
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
                            <Col span={6} className="label-col">
                                Created by
                            </Col>
                            <Col span={18}>
                                <p>
                                    <a onClick={() => { this.props.submission.createdBy && this.props.history.push(`/member/${this.props.submission.createdBy._id}`) }}>
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
    }

    canSubscribe() {
        return !this.props.submission.createdBy ||
            (this.props.submission.createdBy &&
                this.props.submission.createdBy._id !== this.props.currentUserId)
    }

    ord_render() {

        return (
            <div className="public">
                {this.props.submission.type === SUBMISSION_TYPE.FORM_EXT
                    ? this.renderFormExt()
                    : this.renderDetail()
                }
                <Comments type="submission" canPost={true} model={this.props.submission}
                    canSubscribe={this.canSubscribe()}/>
            </div>
        )
    }
}
