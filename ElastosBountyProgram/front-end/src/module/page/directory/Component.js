import React from 'react';
import StandardPage from '../StandardPage';
import Footer from '@/module/layout/Footer/Container'
import { Col, Row, Icon } from 'antd'

import './style.scss'

export default class extends StandardPage {

    ord_renderContent () {

        return (
            <div className="p_Directory">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page">
                    <div className="ebp-page-title">

                    </div>

                    <Row>
                        <Col span={18}>
                            <div class="d_leadersList">
                                <h1>
                                    Leaders
                                </h1>
                            </div>
                        </Col>
                        <Col span={6}>
                            <br/>
                            <div class="ebp-gray-box">
                                <h2>
                                    Apply to be a Leader
                                </h2>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Footer />
            </div>
        )
    }
}
