import React from 'react';
import StandardPage from '../StandardPage';
import _ from 'lodash'

import './style.scss'

import { Col, Row, List, Button } from 'antd'
import Footer from '@/module/layout/Footer/Container'
import moment from 'moment/moment'

export default class extends StandardPage {

    componentDidMount() {
        this.props.getTasks()
    }

    componentWillUnmount() {
        this.props.resetTasks()
    }

    getCoreTenets() {
        return [
            'Organizers are decided by a transparent voting system',
            'Voting power (EVP) is only earned through participation',
            'Elastos can only veto tasks and define the ELA rewards'
        ]
    }

    ord_renderContent(){

        const backdropStyle = {
            backgroundPosition: '0 50%',
            backgroundImage: `url('/assets/images/HomeHeader.jpg')`
        }

        const renderEventRow = (task, rowIndex) => {

            switch (rowIndex) {
                case 0:
                    // Task Name
                    return <Col key={task._id} md={{span:12}} lg={{span: 8}}>
                        <div class="i_event">
                            <h4>
                                {task.name}
                            </h4>
                        </div>
                    </Col>

                case 1:
                    // Date + Thumb
                    return <Col key={task._id} md={{span:12}} lg={{span: 8}}>
                        <div class="i_event">
                            <p className="event-date">
                                {moment(task.date).format('MMM D, YYYY')}
                            </p>
                            <img src={'/assets/images/task_thumbs/' + task.thumbnail} />
                        </div>
                    </Col>

                case 2:
                    // Desc
                    return <Col key={task._id} md={{span:12}} lg={{span: 8}}>
                        <div class="i_event">
                            <p>
                                {_.truncate(task.description, {length: 100})}

                                {task.description.length > 100 &&
                                <a className="moreDetails"> more details</a>
                                }
                            </p>
                        </div>
                    </Col>

                case 3:
                    // Apply button
                    return <Col key={task._id} md={{span:12}} lg={{span: 8}}>
                        <div class="i_event">
                            <Button>
                                Apply to Help
                            </Button>
                        </div>
                    </Col>

            }

        }

        return (
            <div className="c_Home">
                <div className="d_topBackdrop" style={backdropStyle}>
                    <div className="d_topBackdrop_title">
                        &lt;Name Goes Here&gt;
                    </div>
                </div>
                <div className="horizGap">

                </div>
                <Row className="d_rowPrograms">
                    <Col span={8}>
                        <a href="/developer">
                            <img src="/assets/images/Home_Developers.png" />
                            <h3>
                                Developer
                            </h3>
                        </a>
                    </Col>
                    <Col span={8} className="d_colProgram_middle">
                        <a href="/social">
                            <img src="/assets/images/Home_Social.png" />
                            <h3>
                                Social
                            </h3>
                        </a>
                    </Col>
                    <Col span={8}>
                        <a href="/leader">
                            <img src="/assets/images/Home_Leader.png" />
                            <h3>
                                Organizers
                            </h3>
                        </a>
                    </Col>
                </Row>
                <Row className="d_rowPrograms subtitle">
                    <Col span={8}>
                        <h4>
                            Interested in getting into blockchain development?
                        </h4>
                    </Col>
                    <Col span={8} className="d_colProgram_middle">
                        <h4>
                            Contribute to the Community
                        </h4>
                    </Col>
                    <Col span={8}>
                        <h4>
                            Organize Elastos Events
                        </h4>
                    </Col>
                </Row>
                <Row className="d_rowPrograms">
                    <Col span={8}>
                        <p>
                            Earn ELA for contributing to the Elastos ecosystem through
                            everything from example apps to enterprise dApp development.
                        </p>
                    </Col>
                    <Col span={8} className="d_colProgram_middle">
                        <p>
                            Whether you're already part of the community or want to join,
                            we reward you for various things you do online to promote Elastos
                            either locally or worldwide.
                        </p>
                    </Col>
                    <Col span={8}>
                        <p>
                            Interested in organizing events for your community, school or entire country?
                            Our program empowers you to take a leadership role in the Elastos world.
                        </p>
                    </Col>
                </Row>
                <Row className="d_rowPrograms last">
                    <Col span={8}>
                        <div className="d_colProgram_subLinks">
                            <a href="/developer/bug-bounty">Bug Bounties</a> |&nbsp;
                            <a href="/developer/support">Developer Support</a> |&nbsp;
                            <a href="/developer/dapps">dApps</a>
                        </div>
                    </Col>
                    <Col span={8} className="d_colProgram_middle">
                        <div className="d_colProgram_subLinks">
                            <a href="/social/media">Media Creation</a> |&nbsp;
                            <a href="/social">Social Media</a> |&nbsp;
                            <a href="/social/podcasts">Podcasts</a>
                        </div>
                    </Col>
                    <Col span={8}>
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
                                Featured Developer Bounties
                            </h3>

                            {_.range(4).map((i) => {
                                return <Row key={i} className="d_devEventsContainer">
                                    {this.props.dev_tasks.map((task) => {
                                        return renderEventRow(task, i)
                                    })}
                                </Row>
                            })}
                        </Col>
                        <Col span={12} className="d_colEvents">
                            <h3>
                                Featured Events
                            </h3>

                            {_.range(4).map((i) => {
                                return <Row key={i} className="d_devEventsContainer">
                                    {this.props.social_tasks.map((task) => {
                                        return renderEventRow(task, i)
                                    })}
                                </Row>
                            })}
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
