import React from 'react';
import StandardPage from '../StandardPage';

import './style.scss'

import { Col, Row, Icon } from 'antd'
import Footer from '@/module/layout/Footer/Container'

import homeHeaderImg from 'img/HomeHeader.jpg'

import homeDeveloperImg from 'img/Home_Developers.png'
import homeSocialImg from 'img/Home_Social.png'
import homeLeaderImg from 'img/Home_Leader.png'

import homeBottomTempImg from 'img/HomeBottomTemp.png'

export default class extends StandardPage {

    ord_renderContent(){

        const backdropStyle = {
            backgroundPosition: '0 50%',
            backgroundImage: `url(${homeHeaderImg})`
        }

        return (
            <div className="c_Home">
                <div className="d_topBackdrop" style={backdropStyle}>
                    <div className="d_topBackdrop_title">
                        Elastos Bounty Program
                    </div>
                </div>
                <div className="horizGap">

                </div>
                <Row className="d_rowPrograms">
                    <Col span={8}>
                        <img src={homeDeveloperImg} />

                        <h2>
                            Developer
                        </h2>

                        <h3>
                            Interested in getting into blockchain development?
                        </h3>
                        <p>
                            Earn ELA for contributing to the Elastos ecosystem through
                            everything from example apps to enterprise dApp development.
                        </p>

                        <div className="d_colProgram_subLinks">
                            <a href="/developer/bug-bounty">Bug Bounties</a> |&nbsp;
                            <a href="/developer/support">Developer Support</a> |&nbsp;
                            <a href="/developer/dapps">dApps</a>
                        </div>
                    </Col>
                    <Col span={8} className="d_colProgram_middle">
                        <img src={homeSocialImg} />

                        <h2>
                            Social
                        </h2>

                        <h3>
                            Fan of Elastos?
                        </h3>
                        <p>
                            Whether you're already part of the community or want to join,
                            we reward you for various things you do online to promote Elastos
                            either locally or worldwide.
                        </p>

                        <div className="d_colProgram_subLinks">
                            <a href="/social/media">Media Creation</a> |&nbsp;
                            <a href="/social">Social Media</a> |&nbsp;
                            <a href="/social/podcasts">Podcasts</a>
                        </div>
                    </Col>
                    <Col span={8}>
                        <img src={homeLeaderImg} />

                        <h2>
                            Leader
                        </h2>

                        <h3>
                            Organize Elastos Events
                        </h3>
                        <p>
                            Interested in becoming a leader for your community, school or entire country?
                            Our program empowers you to take a leadership role in the Elastos world.
                        </p>

                        <div className="d_colProgram_subLinks">
                            <a href="/leader/meetups">Meetups</a> |&nbsp;
                            <a href="/leader/hackathons">Hackathons</a> |&nbsp;
                            <a href="/leader/organizers">Organizers</a>
                        </div>
                    </Col>
                </Row>
                <div className="d_rowGrey">
                    <div className="d_rowEvents">
                        <h1>
                            Events
                        </h1>

                        <Row>
                            <Col span={12} className="d_colMeetups">
                                <h2>
                                    Meetups & Hackathons
                                </h2>
                            </Col>
                            <Col span={12}>
                                <h2>
                                    Online Events
                                </h2>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="horizGap d_rowGrey">

                </div>
                <div className="d_rowNews">
                    <h1>
                        News & Updates
                    </h1>

                    <img src={homeBottomTempImg} />
                </div>
                <Footer />
            </div>
        );
    }
}
