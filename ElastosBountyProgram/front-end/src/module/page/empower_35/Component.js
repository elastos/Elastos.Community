import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import {TEAM_TYPE, TEAM_SUBCATEGORY} from '@/constant'
import I18N from '@/I18N'
import './style.scss'
import { Col, Row, Card, Button, message, Spin, Avatar, Modal, Icon } from 'antd'
import _ from 'lodash'
import LoginOrRegisterForm from '@/module/form/LoginOrRegisterForm/Container'

import ModalEmpowerForm from './modal_form/Component'

export default class extends StandardPage {

    constructor(props) {
        super(props)

        this.formEmpowerApply = null

        this.state = {
            showLoginRegisterModal: false,
            visibleModalEmpowerApply: false,
            visibleModalEmpowerView: false
        }
    }

    async componentDidMount() {
        await this.props.getTeams({ type: TEAM_TYPE.CRCLE })
        await this.props.getEmpowerUsers()
    }

    checkForLoading(followup) {
        return this.props.loading
            ? <div className="full-width halign-wrapper">
                <Spin size="large"/>
            </div>
            : _.isFunction(followup) && followup()
    }

    ord_states() {
        return {
            showDetailId: null,
            loading: false
        }
    }

    showDetailModal(id) {
        this.setState({
            showDetailId: id
        })
    }

    handleDetailModalClose(e) {
        this.setState({
            showDetailId: null
        })
    }

    buildCircle(circle = {}, member, myCircles) {
        const titleClassName = `title ${member ? 'member' : ''} ${myCircles ? 'my-circles' : ''}`;
        return (
            <div className="emp35-circle-item">
                <img
                    className="ellipsis-img"
                    src='/assets/images/emp35/circle_ellipse.svg'
                />
                <img
                    className="circle-img"
                    src={member ? 'TODO'
                        : '/assets/images/emp35/circle_group.svg'
                    }
                />
                <div className={`indicator-container ${myCircles ? 'my-circles' : ''}`}>
                    <Icon type="message" style={{ fontSize: 11 }}/>
                    <div className="indicator">{circle.comments.length}</div>
                    <Icon type="team" style={{ fontSize: 11 }}/>
                    <div className="indicator">{circle.members.length}</div>
                </div>
                <span className={titleClassName}
                    onClick={() => this.props.history.push(`/circle-detail/${circle._id}`)}>{circle.name}</span>
            </div>
        );
    }

    buildCirclesWorker(circles) {
        return (
            <Row className="d_Row">
                {_.map(circles, (circle) => (
                    <Col key={circle._id} xs={12} sm={12} md={6}>
                        {this.buildCircle(circle)}
                    </Col>
                ))}
            </Row>
        )
    }

    buildMyCircles() {
        const myCircles = this.props.myCircles
        return this.buildCirclesWorker(myCircles)
    }

    buildCircles(query) {
        const circles = this.props.all_teams || {};
        const queriedCircles = _.filter(_.values(circles), query)
        return this.buildCirclesWorker(queriedCircles)
    }

    ord_renderContent () {
        return (
            <div className="p_emp35">
                <div className="ebp-header-divider" />
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_content">
                            {this.buildHeader()}
                            {this.buildMyCirclesContainer()}
                            {this.buildTeamHeader()}
                            {this.buildEssentialCircles()}
                            {this.buildAdvancedCircles()}
                            {this.buildServicesCircles()}
                            {this.buildCircleStatement()}
                        </div>
                    </div>
                </div>

                {this.renderLoginOrRegisterModal()}

                <ModalEmpowerForm
                    wrappedComponentRef={this.saveFormEmpowerApplyRef}
                    empowerType={this.state.applyEmpowerType}
                    isLogin={this.state.is_login}
                    visible={this.state.visibleModalEmpowerApply}
                    onCancel={this.handleCancelModalEmpowerApply.bind(this)}
                    onApply={this.handleApplyModalEmpowerApply.bind(this)}
                />
                <Footer/>
            </div>
        )
    }

    buildHeader() {
        return (
            <div className="emp35-header">
                <div className="circle-container">
                    <img className="circle" src="assets/images/training_circle.png"></img>
                </div>
                <div className="right-box-container">
                    <div className="small-box"></div>
                    <div className="box"></div>
                    <img src="assets/images/training_white_slashed_box.png"/>
                </div>
                <div className="bottom-box-container">
                    <div className="box"></div>
                </div>
                <div className="connector-container">
                    <img src="assets/images/training_mini_connector.png"/>
                </div>
                <div className="container">
                    <div className="rect-container">
                        <div className="rect"></div>
                    </div>
                    <div className="title">
                        {I18N.get('emp35.header.title')}
                    </div>
                    <div className="content">
                        <div class="center">
                            <div className="strike-text">
                                <div className="strike-line"/>
                                <p>{I18N.get('emp35.header.content.1')}</p>
                            </div>
                            <div className="strike-text">
                                <div className="strike-line"/>
                                <p>{I18N.get('emp35.header.content.2')}</p>
                            </div>
                            <div className="strike-text">
                                <div className="strike-line"/>
                                <p>{I18N.get('emp35.header.content.3')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    buildMyCirclesContainer() {
        return (
            <div className="emp35-my-circles-container">
                <div className="emp35-my-circles">
                    <div className="emp35-my-circles-message">
                        <div className="container">
                            <div className="content">
                                <p>
                                    {I18N.get('emp35.empower.content.1')}
                                    {I18N.get('emp35.empower.content.2')}
                                    {I18N.get('emp35.empower.content.3')}
                                    {I18N.get('emp35.empower.content.4')}
                                </p>
                            </div>
                        </div>


                    </div>
                    <div className="emp35-my-circles-list">
                        <div className="message-container">
                            <div className="container">
                                <div className="content">
                                    <img id="emp35_square" src="/assets/images/emp35/square.png"/>
                                    <div className="inner-container">
                                        <span className="title">{I18N.get('emp35.mycircles.title')}</span>
                                    </div>
                                    {this.buildMyCircles()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    buildCircleStatement() {
        return (
            <div className="emp35-statement-container">
                <div className="emp35-statement">
                    <div className="emp35-statement-image">
                        <img id="emp35_statement" src="/assets/images/what@2x.jpg"/>
                    </div>
                    <div className="emp35-statement-message">
                        <div className="message-container">
                            <img id="emp35_square" src="/assets/images/emp35/square.png"/>
                            <div className="container">
                                <div className="content">
                                    <p>
                                        {I18N.get('emp35.circles.statement.1')}
                                        {I18N.get('emp35.circles.statement.2')}
                                        {I18N.get('emp35.circles.statement.3')}
                                        {I18N.get('emp35.circles.statement.4')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    buildTeamHeader() {
        return (
            <div className="emp35-teamHeader-container">
                <div className="header-bar" />
                <div className="emp35-teamHeader">
                    <div className="container">
                        <div className="circle-container">
                            <img src="assets/images/training_circle.png"></img>
                        </div>
                        <img id="emp35_lock" src="/assets/images/training_connector.png"/>
                        <img id="emp35_square" src="/assets/images/emp35/square.png"/>
                        <div className="inner-container">
                            <span className="title">{I18N.get('emp35.teamHeader.title')}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    buildEssentialCircles() {
        return (
            <div className="emp35-teamDark">
                <div className="container">
                    <Row>
                        <Col xs={{span: 24}} md={{span: 24}}>
                            <span className="blue-title">Essential</span>
                            {this.checkForLoading(() => {
                                return this.buildCircles({ subcategory: TEAM_SUBCATEGORY.ESSENTIAL })
                            })}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

    buildAdvancedCircles() {
        return (
            <div className="emp35-teamDark">
                <div className="container">
                    <Row>
                        <Col xs={{span: 24}} md={{span: 24}}>
                            <span className="blue-title">Advanced</span>
                            {this.checkForLoading(() => {
                                return this.buildCircles({ subcategory: TEAM_SUBCATEGORY.ADVANCED })
                            })}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

    buildServicesCircles() {
        return (
            <div className="emp35-teamDark">
                <div className="container">
                    <Row>
                        <Col xs={{span: 24}} md={{span: 24}}>
                            <span className="blue-title">Services</span>
                            {this.checkForLoading(() => {
                                return this.buildCircles({ subcategory: TEAM_SUBCATEGORY.SERVICES })
                            })}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

    saveFormEmpowerApplyRef = (formRef) => {
        this.formEmpowerApply = formRef
    }

    handleCancelModalEmpowerApply() {
        this.setState({
            visibleModalEmpowerApply: false
        })
    }

    handleApplyModalEmpowerApply() {

        const form = this.formEmpowerApply.props.form

        form.validateFields((err, values) => {
            if (err) {
                return
            }

            form.resetFields()
            this.setState({visibleModalEmpowerApply: false})

            this.props.empowerApply(values, this.state).then(() => {
                message.success('Thank you for applying, we will be in touch shortly')

            }).catch((err) => {
                console.error(err);
                message.error('Error - Please email us')
            })
        })
    }

    /*
    ************************************************************************************
    * Login / Register Modal
    ************************************************************************************
     */
    renderLoginOrRegisterModal() {
        if (this.props.is_login) {
            return
        }

        return (
            <Modal
                className="project-detail-nobar"
                visible={this.state.showLoginRegisterModal}
                onOk={this.handleLoginRegisterModalOk}
                onCancel={this.handleLoginRegisterModalCancel}
                footer={null}
                width="70%"
            >
                <LoginOrRegisterForm />
            </Modal>
        )
    }

    showLoginRegisterModal = () => {
        sessionStorage.setItem('loginRedirect', '/empower35')
        sessionStorage.setItem('registerRedirect', '/empower35')

        this.setState({
            showLoginRegisterModal: true
        })
    }

    handleLoginRegisterModalOk = (e) => {
        sessionStorage.removeItem('registerRedirect')

        this.setState({
            showLoginRegisterModal: false
        })
    }

    handleLoginRegisterModalCancel = (e) => {
        sessionStorage.removeItem('registerRedirect')

        this.setState({
            showLoginRegisterModal: false
        })
    }
}
