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
                            <h4 onClick={() => {this.props.history.push(`/task-detail/${task._id}`)}}>
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
                            {task.thumbnail && <img src={task.thumbnail}/>}
                        </div>
                    </Col>

                case 2:
                    // Desc
                    return <Col key={task._id} md={{span:12}} lg={{span: 8}}>
                        <div class="i_event">
                            <p>
                                {_.truncate(task.description, {length: 100})}

                                {task.description.length > 100 &&
                                <a className="moreDetails" onClick={() => {this.props.history.push(`/task-detail/${task._id}`)}}> more details</a>
                                }
                            </p>
                        </div>
                    </Col>

            }

        }

        return (
            <div className="c_Home">
                <div className="d_topBackdrop" style={backdropStyle}>
                    <div className="d_topBackdrop_title">
                        Elastos - Cyber Republic
                    </div>
                </div>
                <div className="horizGap">

                </div>
                <Row className="d_rowPrograms">
                    <Col span={12}>
                        <a href="/developer">
                            <img src="/assets/images/Home_Developers.png" />
                            <h3>
                                Developer
                            </h3>
                        </a>
                    </Col>
                    <Col span={12} className="d_colProgram_middle">
                        <a href="/social">
                            <img src="/assets/images/Home_Social.png" />
                            <h3>
                                Community
                            </h3>
                        </a>
                    </Col>
                </Row>
                <Row className="d_rowPrograms subtitle">
                    <Col span={12}>
                        <h4>
                            Write code, find bugs, earn ELA
                        </h4>
                    </Col>
                    <Col span={12} className="d_colProgram_middle">
                        <h4>
                            Help organize meetups and promote Elastos
                        </h4>
                    </Col>
                </Row>
                <Row className="d_rowPrograms">
                    <Col span={12}>
                        <p>
                            Earn ELA for contributing to the Elastos ecosystem through
                            everything from example apps to enterprise dApp development.
                            You can also earn ELA for finding bugs and submitting issues.
                        </p>
                    </Col>
                    <Col span={12} className="d_colProgram_middle">
                        <p>
                            Whether you're already part of the community or want to join,
                            we reward you for various things you do to promote Elastos
                            either online, locally or worldwide.
                        </p>
                    </Col>
                </Row>
                <div className="horizGap"/>
                {/*
                <Row className="d_rowPrograms last">
                    <Col span={12}>
                        <Button onClick={() => {this.props.history.push('/developer')}}>
                            View Available Tasks
                        </Button>
                        <Button onClick={() => {this.props.history.push('/profile/developer')}}>
                            Register as a Developer
                        </Button>
                    </Col>
                    <Col span={12} className="d_colProgram_middle">
                        <Button onClick={() => {this.props.history.push('/community')}}>
                            Find Your Community
                        </Button>
                        <Button onClick={() => {this.props.history.push('/profile/organizer')}}>
                            Apply to be an Organizer
                        </Button>
                    </Col>
                </Row>
                */}
                <div className="horizGap d_rowGrey"/>
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
                        <br/>
                    </div>
                </div>
                <div className="horizGap d_rowGrey"/>
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

                            {_.range(3).map((i) => {
                                return <Row key={i} className="d_devEventsContainer">
                                    {this.props.social_tasks.map((task) => {
                                        return renderEventRow(task, i)
                                    })}
                                </Row>
                            })}
                        </Col>
                    </Row>
                </div>
                <div className="horizGap"/>

                <Footer />
            </div>
        );
    }
}
