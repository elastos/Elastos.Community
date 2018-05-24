import React from 'react';
import StandardPage from '../StandardPage';
import Footer from '@/module/layout/Footer/Container'
import IssueForm from './formIssue/Container'

import './style.scss'

import { Col, Row, Icon, Form, Input, Button, Modal } from 'antd'
const FormItem = Form.Item;

export default class extends StandardPage {

    ord_renderContent () {

        // const p = this.getIssueFormProps()
        return (
            <div className="p_Social">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page">
                    <div className="ebp-page-title">
                        <h1>
                            Elastos Developer Bounty Program
                        </h1>
                    </div>
                    <Row className="d_rowTop">
                        <Col span={16} className="d_box">
                            <h2>
                                Upcoming Developer Events
                            </h2>

                            <Row className="d_devEventsContainer">

                            </Row>
                        </Col>
                        <Col span={8} className="d_rightContainer d_box">
                            <h2>
                                Submit an Issue
                            </h2>
                            <IssueForm />
                        </Col>
                    </Row>
                    <div className="horizGap">

                    </div>
                    <Row>
                        <Col span={16} className="d_box">
                            <div>
                                <h2 className="pull-left">
                                    Available Tasks
                                </h2>
                                <div className="pull-right btnContainer">
                                    <Button onClick={this.createTaskLink.bind(this)}>
                                        Create Task
                                    </Button>
                                </div>
                            </div>
                            <div>

                            </div>
                        </Col>
                        <Col span={8} className="d_rightContainer d_box">
                            <h2>
                                My Tasks
                            </h2>
                        </Col>
                    </Row>
                </div>
                <Footer />
            </div>
        )
    }

    async createTaskLink() {
        this.props.history.push('/task-create')
    }
}
