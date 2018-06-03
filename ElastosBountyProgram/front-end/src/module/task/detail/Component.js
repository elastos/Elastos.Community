import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'

import { Col, Row, Button, Divider } from 'antd'

import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS} from '@/constant'

const dateTimeFormat = 'MMM D, YYYY - h:mma (Z [GMT])'

export default class extends BaseComponent {

    ord_states() {
        return {
            isDeveloperEvent: this.props.task.category === TASK_CATEGORY.DEVELOPER &&
                                this.props.task.type === TASK_TYPE.EVENT
        }
    }

    ord_render () {
        return (
            <div className="public">
                <Row>
                    <Col span={18} className="gridCol main-area">
                        <Row>
                            <Col>
                                <h4 className="center">
                                    {this.props.task.name}
                                </h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={this.props.task.thumbnail ? 18 : 24}>
                                <Row>
                                    <Col span={4} className="label-col">
                                        Description
                                    </Col>
                                    <Col span={20}>
                                        <p>
                                            {this.props.task.description}
                                        </p>
                                    </Col>
                                </Row>
                                {this.props.task.infoLink &&
                                <Row>
                                    <Col span={4} className="label-col">
                                        Info Link
                                    </Col>
                                    <Col span={20}>
                                        <a target="_blank" href={this.props.task.infoLink}>
                                            {this.props.task.infoLink}
                                        </a>
                                    </Col>
                                </Row>
                                }
                                {this.props.task.location &&
                                <Row>
                                    <Col span={4} className="label-col">
                                        Location
                                    </Col>
                                    <Col span={20}>
                                        {this.props.task.location}
                                    </Col>
                                </Row>
                                }
                                {this.props.task.startTime &&
                                <Row>
                                    <Col span={4} className="label-col">
                                        Date/Time
                                    </Col>
                                    <Col span={20}>
                                        {moment(this.props.task.startTime).format(dateTimeFormat)}
                                        {this.props.task.endTime &&
                                        <span>
                                            &nbsp; -
                                            &nbsp; {moment(this.props.task.endTime).format(dateTimeFormat)}
                                        </span>
                                        }
                                    </Col>
                                </Row>
                                }
                            </Col>
                            {this.props.task.thumbnail &&
                            <Col span={6}>
                                <img src={this.props.task.thumbnail} class="task-thumbnail"/>
                            </Col>
                            }
                        </Row>
                        <Divider>{this.state.isDeveloperEvent ? 'Registration Info' : 'Application Info'}</Divider>
                        <Row>
                            {!this.state.isDeveloperEvent && this.props.task.candidateLimit &&
                            <Col span={4} className="label-col">
                                Max Applicants
                            </Col>
                            }
                            {!this.state.isDeveloperEvent && this.props.task.candidateLimit &&
                            <Col span={8}>
                                {this.props.task.candidateLimit}
                            </Col>
                            }
                            <Col span={4} className="label-col">
                                Max Accepted
                            </Col>
                            <Col span={8}>
                                {this.props.task.candidateSltLimit}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4} className="label-col">
                                Deadline
                            </Col>
                            <Col span={20}>
                                {this.props.task.applicationDeadline ?
                                    moment(this.props.task.applicationDeadline).format(dateTimeFormat) :
                                    'none - applicant selected when max applicants reached'
                                }
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6} className="gridCol applicants">
                        <h4>{this.state.isDeveloperEvent ? 'Registrants' : 'Applicants'}</h4>

                        {this.renderJoinButton.call(this)}

                    </Col>
                </Row>
            </div>
        )
    }

    /**
     * Developer Events - multiple people can simply join
     * Developer Tasks - members must apply for task, with a certain # to be selected
     *
     * Social Events - members must apply to help
     * Social Tasks - members must apply for task, with a certain # to be selected
     */
    renderJoinButton() {

        let buttonText = ''

        if (this.state.isDeveloperEvent) {
            buttonText = 'Join Event'
        } else {
            if (this.props.task.type === TASK_TYPE.TASK) {
                buttonText = 'Apply for Task'
            } else {
                buttonText = 'Apply to Help'
            }
        }

        return <Button className="join-btn" onClick={this.handleApplyTask.bind(this)}>
            {buttonText}
        </Button>
    }

    handleApplyTask() {

    }
}
