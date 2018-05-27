import React from 'react';
import StandardPage from '../StandardPage';
import Footer from '@/module/layout/Footer/Container'
import IssueForm from './formIssue/Container'

import './style.scss'

import { Col, Row, Icon, Form, Input, Button, Modal, Select } from 'antd'
import moment from 'moment/moment'
const Option = Select.Option
const FormItem = Form.Item;

export default class extends StandardPage {

    componentDidMount() {
        this.props.getDeveloperEvents()
    }

    componentWillUnmount() {
        this.props.reset()
    }

    ord_renderContent () {

        // const p = this.getIssueFormProps()
        return (
            <div className="p_Developer">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page-title">
                    <h2>
                        Contribute to Open Source Projects and dApps
                    </h2>
                </div>
                <div className="ebp-page-desc d_rowGrey">
                    <p>
                        Most of Elastos projects are open source, this program is for all developers
                        who want to earn ELA and recognition for their efforts developing the platform
                    </p>
                </div>
                <div className="ebp-page">
                    <Row className="d_rowTop">
                        <Col span={16} className="d_box">
                            <div className="pull-left">
                                <h3>
                                    Join Training and Developer Events
                                </h3>
                            </div>
                            <div className="pull-right btnContainer">
                                <Button type="dashed" onClick={this.createTaskLink.bind(this)}>
                                    Create Event
                                </Button>
                            </div>

                        </Col>
                        <Col span={8} className="d_rightContainer d_box">
                            <h3>
                                Submit an Issue
                            </h3>
                            <IssueForm />
                        </Col>
                    </Row>
                    <div className="horizGap">

                    </div>
                </div>
                <div className="ebp-page">
                    <Row>
                        <Col span={16} className="d_box">
                            <div>
                                <h3 className="pull-left">
                                    Available Developer Tasks and Open Issues
                                </h3>
                                <div className="pull-right btnContainer">
                                    {this.props.is_admin &&
                                    <Button type="dashed" onClick={this.createTaskLink.bind(this)}>
                                        Create Task
                                    </Button>
                                    }
                                </div>
                            </div>
                            <div>

                            </div>
                        </Col>
                        <Col span={8} className="d_rightContainer d_box">
                            <h3>
                                My Tasks
                            </h3>
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
