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
                        <Col span={8}>
                            <div className="d_footerSection">
                                <h2>Offices</h2>

                                <b>Beijing—</b>

                                <p>
                                    Tower G, Zhizao Street, Zhongguancun, No. 45, Chengfu Road, Haidian District, Beijing City
                                </p>

                                <b>Shanghai—</b>

                                <p>
                                    11F, Huahong Tower, 463 Tanggu Road, Shanghai, China
                                </p>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="d_footerSection">
                                <h2>Contact Us</h2>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="d_footerSection">
                                <h2>Newsletter</h2>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
