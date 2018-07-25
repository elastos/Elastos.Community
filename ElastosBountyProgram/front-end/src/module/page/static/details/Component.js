import React from 'react'
import EmptyPage from '../../EmptyPage'
import './style.scss'

import { Col, Row, Icon, Button, Divider } from 'antd'


export default class extends EmptyPage {

    state = {
        loaded: false,
        socialEvent: { name: ""}
    }

    async componentDidMount() {
        const event = await this.props.getSocialEvent();
        this.setState({loaded: true, socialEvent: event});

        console.log(event);
    }

    renderEventDetails() {
        const socialEvent = this.state.socialEvent;
        return (
            <Col sm={{span: 24}} md={{span: 12}}>
                <span className="event-name">{socialEvent.name}</span>
                <span className="event-hosted-by">{socialEvent.hostedBy}</span>
                <div className="event-detail-container">
                    <Row>
                        <Icon type="link" />
                        <span className="event-name">{socialEvent.name}</span>
                    </Row>
                    <Row>
                        <Icon type="link" />
                        <span className="event-time">{socialEvent.date}</span>
                    </Row>
                    <Row>
                        <Icon type="link" />
                        <span className="event-type">{socialEvent.type}</span>
                    </Row>
                    <Row>
                        <Icon type="link" />
                        <span className="event-language">Offered in {socialEvent.language}</span>
                    </Row>
                </div>
                <Divider />
                <div className={"event-detail-description"}>
                    <div className="event-detail-description-title">
                        What we'll do
                    </div>
                    <div className="event-detail-description-content">
                        Squash is all about having fun and learning a new skill, Squash is excellent
                        for all levels of fitness no previous experience needed. +More
                    </div>
                </div>
            </Col>);
    }

    renderEventActions() {
        const socialEvent = this.state.socialEvent;
        const buttonActionLabel = socialEvent.going ? "DEREGISTER" : "REGISTER";
        const buttonActionClass = "actionButton " + (socialEvent.going ? "actionDeregister" : "actionRegister");
        return (
            <Col sm={{span: 24}} md={{span: 12}} className="d_col_right">
                <img src={socialEvent.image}/>
                <Button className={buttonActionClass}>{buttonActionLabel}</Button>
                <span>SHARE WITH FRIENDS</span>
                <Row className="socialShareActions">
                    <Icon type="link" />
                    <Icon type="link" />
                    <Icon type="link" />
                    <Icon type="link" />
                    <Icon type="link" />
                </Row>
            </Col>);
    }

    ord_renderContent () {
        return (
            <div className="p_EVENTS">
                <div className="ebp-page">
                    <div className="ebp-events-location">
                        {this.state.socialEvent.location}
                    </div>
                    <a>Back</a>
                    <Row className="d_row_upper">
                        {this.renderEventDetails()}
                        {this.renderEventActions()}
                    </Row>
                    <Row className="d_row_mid">
                        <div className="map">
                            Insert Map here
                        </div>
                    </Row>
                    <Row className="d_row_lower">
                        <span className="title">
                            BALAYAGE w/ KITTY COLOURIST - VIC
                        </span>
                        <span>at</span>
                        <span className="title-2">
                            La Biosthetique Academie
                        </span>
                        <span className="address">
                            1209 High Street Armadale, Melbourne, Victoria 3143
                        </span>
                        <Row>
                            <Icon type="link" />
                            <Icon type="link" />
                            <Icon type="link" />
                            <Icon type="link" />
                        </Row>
                    </Row>
                </div>
            </div>
        )
    }
}
