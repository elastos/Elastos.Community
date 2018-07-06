import React from 'react'
import StandardPage from '../../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import './style.scss'

import { Col, Row, Icon, Form, Input, Button, Modal, Select, Table, List, Tooltip, Breadcrumb, Card } from 'antd'
import moment from 'moment/moment'

export default class extends StandardPage {
    ord_renderContent () {
        return (
            <div className="p_FAQ">
                <div className="ebp-header-divider">

                </div>

                <div className="ebp-page-title">
                    <Row className="d_row d_rowGrey">
                        <h3 className="page-header">
                            FAQ
                        </h3>
                    </Row>
                </div>
                <div className="ebp-page">
                    <Row className="d_row">
                        <Col>
                            <h4>
                                How do can I create Developer Events/Tasks
                            </h4>

                            <p>
                                Right now only admins can create these, if you have an idea or find a bug please use the submission feature to get in contact with us
                            </p>
                        </Col>
                        <Col>
                            <h4>
                                How do I become an organizer?
                            </h4>

                            <p>
                                In the future members of CyberRepublic will be able to vote for organizers, but for now the only way to become an organizer
                                is to speak to an admin in our Slack channel and apply directly.
                            </p>
                        </Col>
                        <Col>
                            <h4>
                                What's the difference between the budget and reward?
                            </h4>

                            <p>
                                The budget is paid upfront and must only go towards expenses/costs, receipts are required and any unused portion must be returned.
                            </p>
                            <p>
                                Upon completion the reward is then paid, for larger tasks we will consider a partial payment of the reward upfront, please contact us directly.
                            </p>
                        </Col>
                    </Row>
                </div>
                <Footer/>
            </div>
        )
    }
}
