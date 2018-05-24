import React from 'react';
import StandardPage from '../StandardPage';
import Footer from '@/module/layout/Footer/Container'
import ContribForm from './formContribution/Container'

import './style.scss'

import { Col, Row, Icon, Form, Input, Button, Dropdown } from 'antd'
const FormItem = Form.Item;

export default class extends StandardPage {

    componentDidMount() {
        this.props.getTasks()
    }

    ord_renderContent () {

        return (
            <div className="p_Social">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page">
                    <div className="ebp-page-title">
                        <h1>
                            Elastos Social Bounty Program
                        </h1>
                    </div>
                    <Row className="d_rowTop">
                        <Col span={16} className="d_leftContainer d_box">
                            <h2>
                                Upcoming Social Events
                            </h2>

                            <Row className="d_devEventsContainer">
                                {this.props.all_tasks.map((task) => {
                                    return <Col key={task._id} md={{span:8}} lg={{span: 6}}>
                                        <div class="i_event">
                                            <h3>
                                                {task.name}
                                            </h3>
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
                        </Col>
                        <Col span={8} className="d_rightContainer d_box">
                            <h2>
                                Submit a Contribution
                            </h2>
                            <ContribForm />
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
