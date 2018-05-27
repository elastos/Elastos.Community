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
                                <Button onClick={this.createTaskLink.bind(this)}>
                                    Request Support
                                </Button>
                            </div>
                            <Row className="d_devEventsContainer clearfix">
                                {this.props.all_tasks.map((task) => {
                                    return <Col key={task._id} md={{span:8}} lg={{span: 6}}>
                                        <div class="i_event">
                                            <h4>
                                                {task.name}
                                            </h4>
                                            <p className="event-date">
                                                {moment(task.date).format('MMM D, YYYY')}
                                            </p>
                                            <img src={'/assets/images/task_thumbs/' + task.thumbnail} />
                                        </div>
                                    </Col>
                                })}
                            </Row>
                            <Row className="d_devEventsContainer">
                                {this.props.all_tasks.map((task) => {
                                    return <Col key={task._id} md={{span:8}} lg={{span: 6}}>
                                        <div class="i_event">
                                            <p>
                                                {_.truncate(task.description, {length: 100})}

                                                {task.description.length > 100 &&
                                                <a className="moreDetails"> more details</a>
                                                }
                                            </p>
                                        </div>
                                    </Col>
                                })}
                            </Row>
                            <Row className="d_devEventsContainer">
                                {this.props.all_tasks.map((task) => {
                                    return <Col key={task._id} md={{span:8}} lg={{span: 6}}>
                                        <div class="i_event">
                                            <Button onClick={this.createTaskLink.bind(this, task)}>
                                                Request to Join
                                            </Button>
                                        </div>
                                    </Col>
                                })}
                            </Row>
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
                                    <Button onClick={this.createTaskLink.bind(this)}>
                                        Create Task
                                    </Button>
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
