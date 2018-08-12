import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import I18N from '@/I18N'
import { Link } from 'react-router-dom'
import './style.scss'
import { Col, Row, Card, Button, Breadcrumb, Icon } from 'antd'

export default class extends StandardPage {
    navigateToLearn() {
        this.props.history.push('/developer/learn');
    }

    navigateToTeamSearch() {
        this.props.history.push('/developer/search');
    }

    navigateToProjectSearch() {
        this.props.history.push('/developer/search?type=PROJECT');
    }

    ord_renderContent () {
        return (
            <div className="p_Developer">
                <div className="ebp-header-divider">
                </div>
                <Breadcrumb className="p_admin_breadcrumb">
                    <Breadcrumb.Item><Icon type="home"/></Breadcrumb.Item>
                    <Breadcrumb.Item>{I18N.get('developer.breadcrumb.developers')}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_content">
                            <Row className="d_row d_rowTop" type="flex" justify="center">
                                <Col sm={{span: 24}} md={{span: 8}} className="d_box" onClick={() => this.navigateToLearn()}>
                                    <Card hoverable className="feature-box">
                                        <div className="title">
                                            <span>{I18N.get('developer.learn')}</span>
                                            <img src="/assets/images/mortarboard.svg"/>
                                        </div>
                                        <hr className="feature-box-divider"/>
                                        <div className="content">
                                            <div>- {I18N.get('developer.learn.basics')}</div>
                                            <div>- {I18N.get('developer.learn.concepts')}</div>
                                            <div>- {I18N.get('developer.learn.start')}</div>
                                            <div>- {I18N.get('developer.learn.tutorials')}</div>
                                            <div>- {I18N.get('developer.learn.resources')}</div>
                                        </div>
                                    </Card>
                                </Col>
                                <Col sm={{span: 24}} md={{span: 8}} className="d_box" onClick={() => this.navigateToTeamSearch()}>
                                    <Card hoverable className="feature-box">
                                        <div className="title">
                                            <span>{I18N.get('developer.team')}</span>
                                            <img src="/assets/images/connection.svg"/>
                                        </div>
                                        <hr className="feature-box-divider"/>
                                        <div className="content">
                                            <div>- {I18N.get('developer.team.join')}</div>
                                            <div>- {I18N.get('developer.team.create_profile')}</div>
                                            <div>- {I18N.get('developer.team.create_project')}</div>
                                        </div>
                                    </Card>
                                </Col>
                                <Col sm={{span: 24}} md={{span: 8}} className="d_box" onClick={() => this.navigateToProjectSearch()}>
                                    <Card hoverable className="feature-box">
                                        <div className="title">
                                            <span>{I18N.get('developer.project')}</span>
                                            <img src="/assets/images/start.svg"/>
                                        </div>
                                        <hr className="feature-box-divider"/>
                                        <div className="content">
                                            <div>- {I18N.get('developer.project.top')}</div>
                                            <div>- {I18N.get('developer.project.join')}</div>
                                            <div>- {I18N.get('developer.project.issue')}</div>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                            <div className="d_midRow">
                                <Button className="info-button">
                                    {I18N.get('developer.action')}
                                </Button>
                            </div>
                            <div className="d_bottomRow">
                                <span className="title">{I18N.get('developer.components')}</span>
                                <Row className="component-box">
                                    <Col sm={{span: 24}} md={{span: 18}} className="d_leftCol">
                                        <div className="component-name">
                                            {I18N.get('developer.components.core.title')} - <span className="languages">{I18N.get('developer.components.core.languages')}</span>
                                        </div>
                                        <hr className="component-divider"/>
                                        <div className="component-description">
                                            {I18N.get('developer.components.core.description')}
                                        </div>
                                    </Col>
                                    <Col sm={{span: 24}} md={{span: 6}}>
                                        <div className="button-container"><Button className="top-button">{I18N.get('developer.components.issues')}</Button></div>
                                        <div className="button-container"><Button>{I18N.get('developer.components.docs')}</Button></div>
                                        <div className="button-container"><Button>{I18N.get('developer.components.info')}</Button></div>
                                    </Col>
                                </Row>
                                <Row className="component-box">
                                    <Col sm={{span: 24}} md={{span: 18}} className="d_leftCol">
                                        <div className="component-name">
                                            {I18N.get('developer.components.spv')} - <span className="languages">{I18N.get('developer.components.spv.languages')}</span>
                                        </div>
                                        <hr className="component-divider"/>
                                        <div className="component-description">
                                            {I18N.get('developer.components.spv.description')}
                                        </div>
                                    </Col>
                                    <Col sm={{span: 24}} md={{span: 6}}>
                                        <div className="button-container"><Button className="top-button">{I18N.get('developer.components.issues')}</Button></div>
                                        <div className="button-container"><Button>{I18N.get('developer.components.docs')}</Button></div>
                                        <div className="button-container"><Button>{I18N.get('developer.components.info')}</Button></div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
