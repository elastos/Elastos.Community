import React from 'react';
import { Col, Row } from 'antd'

export default function() {

    return <div>
        <Row>
            <Col>
                <h4 className="center">
                    {this.props.submission.title}
                </h4>
            </Col>
        </Row>
        <Row>
            <Col className="col-label" span={8}>
                Email
            </Col>
            <Col span={12}>
                {this.props.submission.email}
            </Col>
        </Row>
        <Row>
            <Col className="col-label" span={8}>
                Full Legal Name
            </Col>
            <Col span={12}>
                {this.props.submission.fullLegalName}
            </Col>
        </Row>
        <Row>
            <Col className="col-label" span={8}>
                Community
            </Col>
            <Col span={12}>
                {this.props.submission.community.name}
            </Col>
        </Row>
        <Row>
            <Col className="col-label" span={8}>
                Role in Community
            </Col>
            <Col span={12}>
                {this.props.submission.occupation}
            </Col>
        </Row>
        <Row>
            <Col className="col-label" span={8}>
                Contributions
            </Col>
            <Col span={12}>
                {this.props.submission.description}
            </Col>
        </Row>
        <Row>
            <Col className="col-label" span={8}>
                Which Elastos full-time members do you know and can vouch for you?
            </Col>
            <Col span={12}>
                {this.props.submission.audienceInfo}
            </Col>
        </Row>
        <Row>
            <Col className="col-label" span={8}>
                Greeting Video
            </Col>
            <Col span={12}>
                <a href={this.props.submission.reason}>{this.props.submission.reason}</a>
            </Col>
        </Row>
        <Row>
            <Col className="col-label" span={8}>
                Which Elastos full-time members do you know and can vouch for you?
            </Col>
            <Col span={12}>
                {this.props.submission.audienceInfo}
            </Col>
        </Row>
    </div>

}
