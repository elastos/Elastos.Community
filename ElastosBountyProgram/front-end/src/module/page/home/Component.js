import React from 'react';
import StandardPage from '../StandardPage';
import _ from 'lodash'

import './style.scss'

import { Col, Row, Icon, Button, Carousel } from 'antd'
import Footer from '@/module/layout/Footer/Container'
import moment from 'moment/moment'

export default class extends StandardPage {

    componentDidMount() {
        // this.props.getTasks()
    }

    componentWillUnmount() {
        // this.props.resetTasks()
    }

    ord_renderContent(){

        const backdropStyle = {
            backgroundPosition: '50% 50%',
            backgroundImage: `url('/assets/images/cr_banner.png')`
        }

        return (
            <Row className="c_Home">
                <div className="d_topBackdrop" style={backdropStyle}>
                    <div className="d_topBackdrop_title">
                        Elastos - Cyber Republic
                    </div>
                </div>
                <div className="horizGap"/>
                <Row className="d_rowHome">
                    <Col span={16} className="d_developer">
                        <h3>
                            Developers
                        </h3>
                        <h4>
                            Write code, find bugs, earn ELA
                        </h4>

                        <p>
                            Earn ELA for contributing to the Elastos ecosystem through
                            everything <br/>from example apps to enterprise dApp development.
                            <br/>
                            <br/>
                            You can also earn ELA for finding bugs and submitting issues.
                        </p>

                        <div>
                            <Button onClick={() => this.props.history.push('/developer')}>Yes I am interested in Developing for Elastos</Button>
                            {/* <Button onClick={this.notDeveloper.bind(this)}>No I am not a developer</Button> */}
                        </div>

                        <br/>
                        <br/>
                        <br/>
                    </Col>
                    <Col span={6} style={{textAlign: 'left'}}>
                        <Icon type="api" className="icon-home"/>
                    </Col>
                </Row>

                <div className="horizGap"/>

                <Row className="d_rowHome white">
                    <div className="horizGap"/>
                    <Col span={10} style={{textAlign: 'right'}}>
                        <Icon type="share-alt" className="icon-home"/>
                    </Col>
                    <Col span={12} className="d_organizer">
                        <h3>
                            Organizers & Contributors
                        </h3>
                        <h4>
                            Help organize meetups and promote Elastos
                        </h4>

                        <p>
                            Whether you're already part of the community or want to join,<br/>
                            we reward you for various things you do to promote Elastos
                            either online, locally or worldwide.
                            <br/>
                            <br/>
                            You can also earn ELA for referring potential contributors.
                        </p>

                        <Button onClick={() => this.props.history.push('/community')}>Apply to be an Organizer</Button>
                        <Button  onClick={() => this.props.history.push('/social')}>View Events & Tasks I can contribute to</Button>

                        <br/>
                        <br/>
                        <br/>
                    </Col>
                    <div className="horizGap"/>
                </Row>
                <div className="horizGap"/>

                <div className="entryContainer">

                    <div className="textContainer">
                        We are a diverse democratic group of leaders, developers, organizers and designers<br/>
                        formed to promote Elastos in our communities. Membership is open to everyone.
                    </div>
                    <div className="bar bar1"/>
                    <div className="bar bar2"/>
                </div>

                <Footer />
            </Row>
        );
    }
}
