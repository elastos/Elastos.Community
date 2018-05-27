import React from 'react';
import StandardPage from '../StandardPage';

import './style.scss'

import { Col, Row, List } from 'antd'
import Footer from '@/module/layout/Footer/Container'

export default class extends StandardPage {

    componentDidMount() {
        this.props.getTasks()
    }

    getCoreTenets() {
        return [
            'Leaders are decided by a transparent voting system',
            'Voting power (EVP) is only earned through participation',
            'Elastos can only veto tasks and define the ELA rewards'
        ]
    }

    ord_renderContent(){

        const backdropStyle = {
            backgroundPosition: '0 50%',
            backgroundImage: `url('/assets/images/HomeHeader.jpg')`
        }

        return (
            <div className="c_Home">
                <div className="d_topBackdrop" style={backdropStyle}>
                    <div className="d_topBackdrop_title">
                        Elastian Munimenta
                    </div>
                </div>
                <div className="horizGap">

                </div>
                <Row className="d_rowPrograms">
                    <Col span={8}>
                        <img src="/assets/images/Home_Developers.png" />

                        <h3>
                            Developer
                        </h3>

                        <h4>
                            Interested in getting into blockchain development?
                        </h4>
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
                        <img src="/assets/images/Home_Social.png" />

                        <h3>
                            Social
                        </h3>

                        <h4>
                            Contribute to the Community
                        </h4>
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
                        <img src="/assets/images/Home_Leader.png" />

                        <h3>
                            Leader
                        </h3>

                        <h4>
                            Organize Elastos Events
                        </h4>
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
                <div className="horizGap d_rowGrey">

                </div>
                <div className="d_rowNews d_rowGrey">
                    <h1>
                        Our Mandate
                    </h1>

                    <div className="d_mission">
                        <p>
                            We are a diverse democratic group of leaders, developers, organizers and designers formed
                            to promote Elastos in our communities. Membership is open to everyone.
                        </p>

                        <h3>Core Tenets</h3>

                        <List
                            itemLayout="horizontal"
                            dataSource={this.getCoreTenets()}
                            className="d_tenets"
                            renderItem={item => (
                                <List.Item>
                                    {item}
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
                <div className="horizGap d_rowGrey">

                </div>
                <div className="d_rowEvents">
                    <Row>
                        <Col span={12} className="d_colTasks">
                            <h3>
                                Featured Tasks
                            </h3>
                        </Col>
                        <Col span={12} className="d_colEvents">
                            <h3>
                                Events Looking for Help
                            </h3>

                            <Row className="d_devEventsContainer">
                                {this.props.all_tasks.map((task) => {
                                    return <Col key={task._id} md={{span:12}} lg={{span: 8}}>
                                        <div class="i_event">
                                            <h4>
                                                {task.name}
                                            </h4>
                                            <img src={'/assets/images/task_thumbs/' + task.thumbnail} />

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
                    </Row>
                </div>
                <div className="horizGap">

                </div>

                <Footer />
            </div>
        );
    }
}
