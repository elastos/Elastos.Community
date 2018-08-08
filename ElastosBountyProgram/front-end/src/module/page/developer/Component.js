import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import I18N from '@/I18N'
import { Link } from 'react-router-dom'
import './style.scss'
import { Col, Row, Card, Button, Breadcrumb, Icon } from 'antd'


export default class extends StandardPage {
    navigateToLearn() {
        this.props.history.push("/developer/learn");
    }

    navigateToTeamSearch() {
        this.props.history.push("/developer/search");
    }

    navigateToProjectSearch() {
        this.props.history.push("/developer/search?type=PROJECT");
    }

    ord_renderContent () {
        return (
            <div className="p_Developer">
                <div className="ebp-header-divider">
                </div>
                <Breadcrumb className="p_admin_breadcrumb">
                    <Breadcrumb.Item><Icon type="home"/></Breadcrumb.Item>
                    <Breadcrumb.Item>{I18N.get('3001')}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_content">
                            <Row className="d_row d_rowTop" type="flex" justify="center">
                                <Col sm={{span:24}} md={{span: 8}} className="d_box" onClick={() => this.navigateToLearn()}>
                                    <Card hoverable className="feature-box">
                                        <div className="title">
                                            <span>{I18N.get('3010')}</span>
                                            <img src="/assets/images/mortarboard.svg"/>
                                        </div>
                                        <hr className="feature-box-divider"/>
                                        <div className="content">
                                            <div>- {I18N.get('3011')}</div>
                                            <div>- {I18N.get('3012')}</div>
                                            <div>- {I18N.get('3013')}</div>
                                            <div>- {I18N.get('3014')}</div>
                                            <div>- {I18N.get('3015')}</div>
                                        </div>
                                    </Card>
                                </Col>
                                <Col sm={{span:24}} md={{span: 8}} className="d_box" onClick={() => this.navigateToTeamSearch()}>
                                    <Card hoverable className="feature-box">
                                        <div className="title">
                                            <span>{I18N.get('3020')}</span>
                                            <img src="/assets/images/connection.svg"/>
                                        </div>
                                        <hr className="feature-box-divider"/>
                                        <div className="content">
                                            <div>- {I18N.get('3021')}</div>
                                            <div>- {I18N.get('3022')}</div>
                                            <div>- {I18N.get('3023')}</div>
                                        </div>
                                    </Card>
                                </Col>
                                <Col sm={{span:24}} md={{span: 8}} className="d_box" onClick={() => this.navigateToProjectSearch()}>
                                    <Card hoverable className="feature-box">
                                        <div className="title">
                                            <span>{I18N.get('3030')}</span>
                                            <img src="/assets/images/start.svg"/>
                                        </div>
                                        <hr className="feature-box-divider"/>
                                        <div className="content">
                                            <div>- {I18N.get('3031')}</div>
                                            <div>- {I18N.get('3032')}</div>
                                            <div>- {I18N.get('3033')}</div>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                            <div className="d_midRow">
                                <Button className="info-button">
                                    {I18N.get('3040')}
                                </Button>
                            </div>
                            <div className="d_bottomRow">
                                <span className="title">{I18N.get('3050')}</span>
                                <Row className="component-box">
                                    <Col sm={{span:24}} md={{span: 18}} className="d_leftCol">
                                        <div className="component-name">
                                            {I18N.get('3051')} - <span className="languages">{I18N.get('3053')}</span>
                                        </div>
                                        <hr className="component-divider"/>
                                        <div className="component-description">
                                            {I18N.get('3052')}
                                        </div>
                                    </Col>
                                    <Col sm={{span:24}} md={{span: 6}}>
                                        <div className="button-container"><Button className="top-button">{I18N.get('3070')}</Button></div>
                                        <div className="button-container"><Button>{I18N.get('3071')}</Button></div>
                                        <div className="button-container"><Button>{I18N.get('3072')}</Button></div>
                                    </Col>
                                </Row>
                                <Row className="component-box">
                                    <Col sm={{span:24}} md={{span: 18}} className="d_leftCol">
                                        <div className="component-name">
                                            {I18N.get('3060')} - <span className="languages">{I18N.get('3062')}</span>
                                        </div>
                                        <hr className="component-divider"/>
                                        <div className="component-description">
                                            {I18N.get('3061')}
                                        </div>
                                    </Col>
                                    <Col sm={{span:24}} md={{span: 6}}>
                                        <div className="button-container"><Button className="top-button">{I18N.get('3070')}</Button></div>
                                        <div className="button-container"><Button>{I18N.get('3071')}</Button></div>
                                        <div className="button-container"><Button>{I18N.get('3072')}</Button></div>
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
