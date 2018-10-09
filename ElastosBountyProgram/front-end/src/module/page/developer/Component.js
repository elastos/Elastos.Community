import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import I18N from '@/I18N'
import { Link } from 'react-router-dom'
import './style.scss'
import MediaQuery from 'react-responsive'
import { Col, Row, Card, Button, Breadcrumb, Icon } from 'antd'
import {MAX_WIDTH_MOBILE} from "../../../config/constant"

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

    buildTopRow () {
        return (
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
        );
    }

    buildMidRow() {
        return (
            <MediaQuery maxWidth={MAX_WIDTH_MOBILE}>
                {(matches) => {
                    return (
                        <div className="d_midRow">
                            {/*<Button block={matches} className="info-button">
                                {I18N.get('developer.action')}
                            </Button>*/}
                        </div>
                    )
                }}
            </MediaQuery>
        );
    }

    buildBottomRow() {
        return (
            <MediaQuery maxWidth={MAX_WIDTH_MOBILE}>
                {(matches) => {
                    return (
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
                                    <div className="button-container">
                                        <Button block={matches} className="top-button">
                                            <a target="_blank" href="https://github.com/elastos/Elastos.RT/issues">
                                                {I18N.get('developer.components.issues')}
                                            </a>
                                        </Button>
                                    </div>
                                    <div className="button-container">
                                        <Button block={matches}>
                                            <a target="_blank" href="https://github.com/elastos/Elastos.Community/blob/3640cec31f917725db0a6e7dd686a95ac975b8c6/ElastosBountyProgram/front-end/src/module/page/developer/learn/detail/TheFourPillars/ElastosRuntime/Component.js">
                                                {I18N.get('developer.components.docs')}
                                            </a>
                                        </Button>
                                    </div>
                                    {/*<div className="button-container">
                                        <Button block={matches}>{I18N.get('developer.components.info')}</Button>
                                    </div>*/}
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
                                    <div className="button-container">
                                        <Button block={matches} className="top-button">
                                            <a target="_blank" href="https://github.com/elastos/Elastos.ELA.SPV/issues">
                                                {I18N.get('developer.components.issues')}
                                            </a>
                                        </Button>
                                    </div>
                                    <div className="button-container">
                                        <a target="_blank" href="https://github.com/elastos/Elastos.ELA.SPV">
                                            <Button block={matches}>{I18N.get('developer.components.docs')}</Button>
                                        </a>
                                    </div>
                                    {/*<div className="button-container">
                                        <Button block={matches}>{I18N.get('developer.components.info')}</Button>
                                    </div>*/}
                                </Col>
                            </Row>
                        </div>
                    );
                }}
            </MediaQuery>
        );
    }

    ord_renderContent () {
        return (
            <div className="p_Developer">
                <div className="ebp-header-divider" />
                <Breadcrumb className="p_admin_breadcrumb">
                    <Breadcrumb.Item><Icon type="home"/></Breadcrumb.Item>
                    <Breadcrumb.Item>{I18N.get('developer.breadcrumb.developers')}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_content">
                            {this.buildTopRow()}
                            {this.buildMidRow()}
                            {this.buildBottomRow()}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
