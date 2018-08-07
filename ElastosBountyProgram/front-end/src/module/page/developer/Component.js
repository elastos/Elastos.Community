import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import { Link } from 'react-router-dom'
import './style.scss'

import { Col, Row, Card, Button, Breadcrumb } from 'antd'


export default class extends StandardPage {
    state = {
    }

    componentDidMount () {
    }

    componentWillUnmount () {
    }

    ord_renderContent () {
        return (
            <div className="p_Developer">
                <div className="ebp-header-divider">
                </div>

                <div className="ebp-page">
                    <Breadcrumb className="ebp-page-breadcrumb">
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item><a href="">Developers</a></Breadcrumb.Item>
                    </Breadcrumb>
                    <Row className="d_row d_rowTop" type="flex" justify="center">
                        <Col sm={{span:24}} md={{span: 8}} className="d_box">
                            <Card hoverable className="feature-box">
                                <div className="title">
                                    <span>Learn</span>
                                    <img src="https://3kllhk1ibq34qk6sp3bhtox1-wpengine.netdna-ssl.com/wp-content/uploads/knowledge-300x300.png"/>
                                </div>
                                <hr className="feature-box-divider"/>
                                <div className="content">
                                    <div>- Elastos Basics</div>
                                    <div>- Key Concepts</div>
                                    <div>- Getting Started</div>
                                    <div>- Tutorials</div>
                                    <div>- Training, webinars, bootcamps</div>
                                </div>
                            </Card>
                        </Col>
                        <Col sm={{span:24}} md={{span: 8}} className="d_box">
                            <Card hoverable className="feature-box">
                                <div className="title">
                                    <span>Team Search</span>
                                    <img src="https://3kllhk1ibq34qk6sp3bhtox1-wpengine.netdna-ssl.com/wp-content/uploads/knowledge-300x300.png"/>
                                </div>
                                <hr className="feature-box-divider"/>
                                <div className="content">
                                    <div>- Join a team looking for your skills</div>
                                    <div>- Create a profile</div>
                                    <div>- Create a project</div>
                                </div>
                            </Card>
                        </Col>
                        <Col sm={{span:24}} md={{span: 8}} className="d_box">
                            <Card hoverable className="feature-box">
                                <div className="title">
                                    <span>Project Search</span>
                                    <img src="https://3kllhk1ibq34qk6sp3bhtox1-wpengine.netdna-ssl.com/wp-content/uploads/knowledge-300x300.png"/>
                                </div>
                                <hr className="feature-box-divider"/>
                                <div className="content">
                                    <div>- Top 100 projects</div>
                                    <div>- Join a project that is in active development</div>
                                    <div>- Submit an issue</div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <div className="d_midRow">
                        <Button className="info-button">
                            Is Elastos suited to my project?
                        </Button>
                    </div>
                    <div className="d_bottomRow">
                        <span className="title"> Elastos Core Components</span>
                        <Row className="component-box">
                            <Col sm={{span:24}} md={{span: 18}} className="d_leftCol">
                                <div className="component-name">
                                    Elastos RunTime (RT) - <span className="languages">C++</span>
                                </div>
                                <hr className="component-divider"/>
                                <div className="component-description">
                                    lots of information about Elastos Run Time
                                </div>
                            </Col>
                            <Col sm={{span:24}} md={{span: 6}}>
                                <div className="button-container"><Button className="top-button">Issues</Button></div>
                                <div className="button-container"><Button>Docs</Button></div>
                                <div className="button-container"><Button>More Info</Button></div>
                            </Col>
                        </Row>
                        <Row className="component-box">
                            <Col sm={{span:24}} md={{span: 18}} className="d_leftCol">
                                <div className="component-name">
                                    Elastos SPV (SPV) - <span className="languages">C++, Javascript, Go</span>
                                </div>
                                <hr className="component-divider"/>
                                <div className="component-description">
                                    Payment module with full feature SDK
                                </div>
                            </Col>
                            <Col sm={{span:24}} md={{span: 6}}>
                                <div className="button-container"><Button className="top-button">Issues</Button></div>
                                <div className="button-container"><Button>Docs</Button></div>
                                <div className="button-container"><Button>More Info</Button></div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
