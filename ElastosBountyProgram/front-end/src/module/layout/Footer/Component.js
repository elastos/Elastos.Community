import React from 'react';
import BaseComponent from '@/model/BaseComponent';
import { Col, Row, Icon } from 'antd'

import './style.scss'

export default class extends BaseComponent {
    ord_render() {
        return (
            <div className="c_Footer">
                <div className="horizGap">

                </div>
                <div className="">
                    <Row className="d_rowFooter d_footerSection">
                        <Col span={6}>
                            <img className="logo_own" src="/assets/images/logo_own.png"/>
                        </Col>
                        <Col span={4}>
                            <div className="links footer-vertical-section">
                                <div className="title brand-color">
                                    Links
                                </div>
                                <div><a>Resources</a></div>
                                <div><a>Resources</a></div>
                                <div><a>Resources</a></div>
                                <div><a>Resources</a></div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="contact footer-vertical-section">
                                <div className="title brand-color">
                                    Contact
                                </div>
                                <div><a>cyberrepublic@elastos.org</a></div>
                                <div><a>cyberrepublic@elastos.org</a></div>
                                <div><a>cyberrepublic@elastos.org</a></div>
                                <div><a>cyberrepublic@elastos.org</a></div>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className="join footer-vertical-section">
                                <div className="title brand-color">
                                    Join Us On
                                </div>
                                <a>T</a>
                                <a>G</a>
                                <a>I</a>
                                <a>R</a>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
