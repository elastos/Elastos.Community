import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import I18N from '@/I18N'
import './style.scss'
import { Col, Row, Card, Button, message, Spin, Avatar, Modal } from 'antd'
import _ from 'lodash'
import LoginOrRegisterForm from '@/module/form/LoginOrRegisterForm/Container'
import {USER_EMPOWER_TYPE} from '@/constant'

import ModalEmpowerForm from './modal_form/Component'

// person head profile
const image = '/assets/images/user_blurred.png'
const image_white = '/assets/images/user_blurred_white.png'

const COLOR_SCHEME = {
    WHITE: 'WHITE',
    DARK: 'DARK'
}



/**
 * TODO: all the positions should load from the DB, copy pasting for now
 * until applications are being processed
 */
export default class extends StandardPage {

    constructor(props) {
        super(props)

        this.formEmpowerApply = null

        this.state = {
            loading: false,
            showLoginRegisterModal: false,
            visibleModalEmpowerApply: false,
            visibleModalEmpowerView: false
        }
    }

    async componentDidMount() {
        this.setState({ loading: false })
        await this.props.getEmpowerUsers()
    }

    componentWillUnmount() {

    }

    checkForLoading(followup) {
        return this.state.loading
            ? <Spin size="large"/>
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

    ord_renderContent () {
        return (
            <div className="p_emp35">
                <div className="ebp-header-divider" />
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_content">
                            {this.buildHeader()}
                            {this.buildEmpower()}
                            {this.buildTeamHeader()}
                            {this.buildTeamBusiness()}
                            {this.buildTeamMarketing()}
                            {this.buildTeamLegal()}
                            {this.buildMidSection()}
                            {this.buildLowerSection()}
                            {this.buildFooter()}
                        </div>
                    </div>
                </div>

                {/* TODO: when we have actual positions filled
                <Modal
                    visible={this.state.visibleModalEmpowerView}
                    onCancel={() => this.setState({visibleModalEmpowerView: false})}
                    footer={null}
                    wrapClassName="empower-modal-view"
                    width="90%"
                    style={{top: '5%'}}
                >

                </Modal>
                */}
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
                <div className="container">
                    <div className="rect-container">
                        <div className="rect"></div>
                    </div>
                    <div className="title">
                        {I18N.get('emp35.header.title')}
                    </div>
                    <div className="content">
                        <div class="center">
                            {/* Desktop */}
                            <div className="strike-text dsk">
                                <div className="strike-line"/>
                                <p>{I18N.get('emp35.header.content.1')}</p>
                            </div>
                            <br/>
                            <div className="strike-text dsk">
                                <div className="strike-line"/>
                                <p>{I18N.get('emp35.header.content.2')}</p>
                            </div>
                            <br/>
                            <div className="strike-text dsk">
                                <div className="strike-line"/>
                                <p>{I18N.get('emp35.header.content.3')}</p>
                            </div>

                            {/* Mobile */}
                            <div className="strike-text mob">
                                <div className="strike-line"/>
                                <p>{I18N.get('emp35.header.content.1')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    buildEmpower() {
        return (
            <div className="emp35-empower">
                <div className="container">
                    <div className="title">
                        {I18N.get('emp35.empower.title')}
                    </div>
                    <div className="content">
                        <p>{I18N.get('emp35.empower.content.1')}</p>
                        <p>{I18N.get('emp35.empower.content.2')}</p>
                        <p>{I18N.get('emp35.empower.content.3')}</p>
                    </div>
                </div>
            </div>
        )
    }

    buildTeamHeader() {
        return (
            <div className="emp35-teamHeader">
                <div className="container">
                    <div className="inner-container">
                        <span className="title">{I18N.get('emp35.teamHeader.title')}</span>
                    </div>
                </div>
            </div>
        )
    }

    // temporary, these should load from DB
    generatePositionCards(empowerType, numCards, colorScheme) {

        return <div className="row-positions">
            {_.range(numCards).map((index) => {
                return <Card
                    className={'card-emp35-position ' + colorScheme.toLowerCase()}
                    bordered={false}
                    hoverable={true}
                    key={empowerType.toLowerCase() + '-pos-' + index}
                    onClick={() => {
                        if (!this.props.is_login) {
                            this.showLoginRegisterModal()
                            return
                        }

                        this.setState({
                            applyEmpowerType: empowerType,
                            visibleModalEmpowerApply: true
                        })
                    }}
                    cover={<img className="event-card-image" src={colorScheme === 'WHITE' ? image_white : image}/>}>

                    <Card.Meta
                        description={'Position Open'}
                    />
                </Card>
            })}
        </div>

        /* view card
        <Card
            className="card-emp35-position"
            bordered={false}
            hoverable={true}
            key="business-pos-2"
            onClick={() => this.setState({visibleModalEmpowerView: true})}
            cover={<img className="event-card-image" src={image}/>}>

            <Card.Meta
                description={'John Smith'}
            />
        </Card>
        */
    }

    buildTeamBusiness() {

        return (
            <div className="emp35-teamBusiness">
                <div className="container">
                    <div className="inner-container">
                        <span className="blue-title">Business</span>

                        {this.generatePositionCards(USER_EMPOWER_TYPE.BUSINESS, 3, COLOR_SCHEME.DARK)}

                    </div>
                </div>
            </div>
        )
    }

    buildTeamMarketing() {

        return (
            <div className="emp35-teamMarketing">
                <div className="container">
                    <div className="inner-container">
                        <span className="blue-title">Marketing</span>

                        {this.generatePositionCards(USER_EMPOWER_TYPE.MARKETING, 4, COLOR_SCHEME.DARK)}
                    </div>
                </div>
            </div>
        )
    }

    buildTeamLegal() {

        return (
            <div className="emp35-teamLegal">
                <div className="container">
                    <div className="inner-container">
                        <span className="blue-title">Legal</span>

                        {this.generatePositionCards(USER_EMPOWER_TYPE.LEGAL, 2, COLOR_SCHEME.DARK)}
                    </div>
                </div>
            </div>
        )
    }

    buildMidSection() {
        return <Row className="lower-section">
            <Col xs={{span: 24}} md={{span: 14}}>
                {this.buildTeamDesigner()}
                {this.buildTeamContent()}
                {this.buildTeamWriter()}
            </Col>
            <Col xs={{span: 24}} md={{span: 10}}>
                {this.buildTeamMedia()}
            </Col>
        </Row>
    }

    buildTeamDesigner() {
        return (
            <div className="emp35-teamDesigner">
                <div className="container">
                    <div className="inner-container">
                        <span className="dark-title">Designer</span>

                        {this.generatePositionCards(USER_EMPOWER_TYPE.DESIGNER, 2, COLOR_SCHEME.WHITE)}
                    </div>
                </div>
            </div>
        )
    }

    buildTeamContent() {
        return (
            <div className="emp35-teamDesigner">
                <div className="container">
                    <div className="inner-container">
                        <span className="dark-title">Content</span>

                        {this.generatePositionCards(USER_EMPOWER_TYPE.WRITER_CONTENT, 3, COLOR_SCHEME.WHITE)}
                    </div>
                </div>
            </div>
        )
    }

    buildTeamWriter() {
        return (
            <div className="emp35-teamDesigner">
                <div className="container">
                    <div className="inner-container">
                        <span className="dark-title">Writer</span>

                        {this.generatePositionCards(USER_EMPOWER_TYPE.WRITER_TECHNICAL, 3, COLOR_SCHEME.WHITE)}
                    </div>
                </div>
            </div>
        )
    }

    buildTeamMedia() {
        return (
            <div className="emp35-teamMedia">
                <div className="container">
                    <div className="inner-container">
                        <span className="dark-title">Media</span>

                        {this.generatePositionCards(USER_EMPOWER_TYPE.MEDIA, 2, COLOR_SCHEME.WHITE)}
                    </div>
                </div>
            </div>
        )
    }

    buildLowerSection() {
        return <section>
            <div className="emp35-teamDark">
                <div className="container">
                    <div className="inner-container">
                        <span className="dark-title">dApp Analyst</span>

                        {this.generatePositionCards(USER_EMPOWER_TYPE.DAPP_ANALYST, 5, COLOR_SCHEME.DARK)}
                    </div>
                </div>
            </div>
            <div className="emp35-teamDark">
                <div className="container">
                    <div className="inner-container">
                        <span className="dark-title">Regional Evangelist</span>

                        {this.generatePositionCards(USER_EMPOWER_TYPE.REGIONAL_EVANGELIST, 10, COLOR_SCHEME.DARK)}
                    </div>
                </div>
            </div>
        </section>
    }

    buildList() {
        // Note, the project can be in multiple domains, but categorizing by the top one
        const categorizedList = _.groupBy(this.props.all_tasks, (task) => _.first(task.domain))

        const list = _.map(categorizedList, (list, category) => {
            const sanitizedCategory = (category || 'uncategorized').toLowerCase()
            return (
                <div key={sanitizedCategory}>
                    <h3 className="brand-color">
                        {I18N.get(`team.spec.${sanitizedCategory}`)}
                    </h3>
                    <div className="c_projectList">
                        {_.map(list, (project, ind) => (
                            <div key={ind} className="c_project">
                                <Avatar shape="square" size={96} src={project.thumbnail}
                                    onClick={this.showDetailModal.bind(this, project._id)}/>
                                <div>{project.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        })

        return (
            <div className="c_list_wrapper">
                <div className="c_list">
                    <h2 className="project-title">
                        {I18N.get('developer.cr100.projects')}
                    </h2>
                    {list}

                    <img className="cr100_logo_text" src="/assets/images/cr100_logo_text.png"/>
                </div>
            </div>
        )
    }

    buildDisclaimer() {
        return (
            <div className="disclaimer-box">
                <div className="welcomeBox">
                    <div className="title">
                        {I18N.get('developer.cr100.disclaimer.title')}
                    </div>
                    <div className="content">
                        {I18N.get('developer.cr100.disclaimer')}
                    </div>
                    <div className="content">
                        {I18N.get('developer.cr100.dontseeProject.title')}
                    </div>
                    <div className="content">
                        <Button onClick={this.handleSubmitProjectProposal.bind(this)}>
                            {I18N.get('developer.cr100.dontseeProject')}
                        </Button>
                    </div>
                </div>

                <img className="footer_enrich" src="/assets/images/footer_enrich.png"/>
            </div>
        )
    }

    buildFooter() {

    }

    handleSubmitProjectProposal() {

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
