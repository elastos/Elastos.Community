import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'

import {Col, Row, Tag, Icon, Carousel, Avatar, Button, Spin } from 'antd'

import './style.scss'

export default class extends BaseComponent {

    ord_states() {
        return {
        }
    }

    componentDidMount() {
        const taskId = this.props.taskId
        taskId && this.props.getTaskDetail(taskId)
    }

    componentWillUnmount() {
        this.props.resetTaskDetail()
    }

    renderUpperLeftBox() {
        const details = this.props.detail;

        let carouselImages = []
        for (let i of details.pictures) {
            carouselImages.push(<img src={i.url} key={i}/>)
        }

        let domains = []
        for (let i of details.domain) {
            domains.push(<Tag key={i}>{i}</Tag>)
        }

        return (
            <div className="left-container">
                <div className="pictures-container">
                    <Carousel>
                        {carouselImages}
                    </Carousel>
                </div>
                <hr className="divider"/>
                <div className="domains-container">
                    {domains}
                </div>
            </div>
        )
    }

    renderUpperRightBox() {
        const detail = this.props.detail
        const name = detail.name || "-"
        const leaderName = detail.createdBy.profile ?
            (detail.createdBy.profile.firstName + ' ' + detail.createdBy.profile.lastName) : "-"
        const deadline = detail.date || "-"
        const progress = detail.progress || "-"
        const teamSize = detail.candidateCompleted.length || "-"
        const reward = detail.reward.isUsd ? detail.reward.usd + " USD" : detail.reward.ela + " ELA"
        const description = detail.descBreakdown || detail.description || "-"

        return (
            <div>
                <div className="title">
                    <span>{name}</span>
                    <Icon className="badge" type="home"/>
                </div>
                <div className="leader">
                    <Avatar size="64" style={{ backgroundColor: '#87d068' }} icon="user" />
                    <div>Leader: {leaderName}</div>
                </div>
                <div className="content">
                    <div className="entry">Deadline: {deadline}</div>
                    <div className="entry">Progress. {progress}</div>
                    <div className="entry">Team Size: {teamSize}</div>
                    <div className="reward">{reward}</div>
                </div>
                <hr className="divider"/>
                <div className="description-title">Description</div>
                <hr className="divider"/>
                <div className="description-content">{description}</div>
            </div>
        )
    }

    ord_render () {
        const loading = _.isEmpty(this.props.detail)
        console.log(this.props.detail);
        return (
            <div className="c_Project">
                { loading && <Spin className="loading-spinner" />}
                { !loading &&
                    <div>
                        <Row className="top-section">
                            <Col xs={24} sm={24} md={8} className="col-left">
                                {this.renderUpperLeftBox()}
                            </Col>

                            <Col xs={24} sm={24} md={16} className="col-right">
                                {this.renderUpperRightBox()}
                            </Col>
                        </Row>
                        <Row className="actions">
                            <span className="callToActionText">Currently Hiring!</span>
                            <Button className="colored-bottom">Join Project</Button>
                            <Button className="normal-bottom">Message</Button>
                            <Button className="normal-bottom">Submit Bug</Button>
                        </Row>
                        <Row className="contributors">
                            <div>Current Contributors</div>

                        </Row>
                        <Row className="applications">
                            <div>Pending Applications</div>
                        </Row>
                    </div>
                }
            </div>
        )
    }
}
