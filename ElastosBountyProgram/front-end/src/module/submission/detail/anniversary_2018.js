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
                Wallet Address
            </Col>
            <Col span={12}>
                {this.props.walletAddress}
            </Col>
        </Row>
        <Row>
            <Col className="col-label" span={8}>
                Airfare Receipt
            </Col>
            <Col span={12}>
                <a href={this.props.submission.attachment}>{this.props.submission.attachmentFilename}</a>
            </Col>
        </Row>
    </div>

}
