import React from 'react';
import BaseComponent from '@/model/BaseComponent';
import { Col, Row, Icon } from 'antd'

import './style.scss'

export default class extends BaseComponent {
    ord_render() {
        return (
            <div className="c_Footer">
                <div className="horizGap d_rowGrey">

                </div>
                <div className="d_rowGrey">
                    <Row className="d_rowFooter">
                        <Col md={{span:24}} lg={{offset: 16, span: 8}}>
                            <div className="d_footerSection">
                                <h4>Support</h4>

                                <p>
                                    If you're a developer and are running into issues
                                    with any of our open source projects our support team
                                    is always here to help you
                                    <br/>
                                    <br/>
                                    <a href="mailto:cyberrepublic@elastos.org">cyberrepublic@elastos.org</a>
                                    <br/>
                                    v0.1.0 (beta) - property of Elastos.org
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
