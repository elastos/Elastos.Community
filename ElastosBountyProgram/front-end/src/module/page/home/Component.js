import React from 'react';
import StandardPage from '../StandardPage';
import _ from 'lodash'
import I18N from '@/I18N'

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
            backgroundImage: `url('/assets/images/cr_banner.png')`
        }

        return (
            <Row className="c_Home">
                <div className="d_topBackdrop" style={backdropStyle}>
                    <div className="d_topBackdrop_title">
                        {I18N.get('3300')}
                        {/* Elastos - Cyber Republic */}
                    </div>
                </div>
                <div className="horizGap"/>
                <Row className="d_rowHome">
                    <Col xs={{span: 24}} md={{span: 16}} className="d_developer">
                        <h3>
                            {I18N.get('3301')}
                            {/* Developers */}
                        </h3>
                        <h4>
                            {I18N.get('3302')}
                            {/* Write code, find bugs, earn ELA */}
                        </h4>

                        <p className="mobile-left-align">
                            {I18N.get('3303')}
                            {/* Earn ELA for contributing to the Elastos ecosystem through
                            everything  */}
                            <br/>
                            {I18N.get('3304')}
                            {/* from example apps to enterprise App development. */}
                            <br/>
                            <br/>
                            {I18N.get('3305')}
                            {/* You can also earn ELA for finding bugs and submitting issues. */}
                        </p>

                        <div>
                            <Button onClick={() => this.props.history.push('/developer')}>
                                {I18N.get('3306')}
                                {/* Yes I am interested in Developing for Elastos */}
                            </Button>
                            {/* <Button onClick={this.notDeveloper.bind(this)}>No I am not a developer</Button> */}
                        </div>
                        <br/>
                        <br/>
                        <br/>
                    </Col>
                    <Col md={{span: 6}} className="mobile-hide" style={{textAlign: 'left'}}>
                        <Icon type="api" className="icon-home"/>
                    </Col>
                </Row>

                <div className="horizGap"/>

                <Row className="d_rowHome white">
                    <div className="horizGap"/>
                    <Col span={10} className="mobile-hide" style={{textAlign: 'right'}}>
                        <Icon type="share-alt" className="icon-home"/>
                    </Col>
                    <Col xs={{span: 24}} md={{span: 12}} className="d_organizer">
                        <h3>
                            {I18N.get('3307')}
                            {/* Organizers & Contributors */}
                        </h3>
                        <h4>
                            {I18N.get('3308')}
                            {/* Help organize meetups and promote Elastos */}
                        </h4>

                        <p className="mobile-left-align">
                            {I18N.get('3309')}
                            {/* Whether you're already part of the community or want to join, */}
                            <br/>
                            {I18N.get('3310')}
                            {/* we reward you for various things you do to promote Elastos
                            either online, locally or worldwide. */}
                            <br/>
                            <br/>
                            {I18N.get('3311')}
                            {/* You can also earn ELA for referring potential contributors. */}
                        </p>

                        <Button className="mobile-hide" onClick={() => this.props.history.push('/community')}>
                            {I18N.get('3312')}
                            {/* Apply to be an Organizer */}
                        </Button>
                        <Button className="mobile-hide" onClick={() => this.props.history.push('/social')}>
                            {I18N.get('3313')}
                            {/* View Events & Tasks I can contribute to */}
                        </Button>

                        <br/>
                        <br/>
                        <br/>
                    </Col>
                    <div className="horizGap"/>
                </Row>
                <div className="horizGap"/>

                <div className="entryContainer">

                    <div className="textContainer">
                        {I18N.get('3314')}
                        {/* We are a diverse democratic group of leaders, developers, organizers and designers */}
                        <br/>
                        {I18N.get('3315')}
                        {/* formed to promote Elastos in our communities. Membership is open to everyone. */}
                    </div>
                    <div className="bar bar1"/>
                    <div className="bar bar2"/>
                </div>

                <Footer />
            </Row>
        );
    }
}
