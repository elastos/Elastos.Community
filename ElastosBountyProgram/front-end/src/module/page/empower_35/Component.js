import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import I18N from '@/I18N'
import './style.scss'
import { Col, Row, Card, Button, Breadcrumb, Icon, List, Spin, Avatar, Modal } from 'antd'
import _ from 'lodash'

import ModalEmpowerForm from './modal_form/Component'

export default class extends StandardPage {

    constructor(props) {
        super(props)

        this.formEmpowerApply = null

        this.state = {
            loading: false,
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
                            {this.buildFooter()}
                        </div>
                    </div>
                </div>

                <Modal
                    visible={this.state.visibleModalEmpowerView}
                    onCancel={() => this.setState({visibleModalEmpowerView: false})}
                    footer={null}
                    wrapClassName="empower-modal-view"
                    width="90%"
                    style={{top: '5%'}}
                >
                    Hello World
                </Modal>

                <ModalEmpowerForm
                    wrappedComponentRef={this.saveFormEmpowerApplyRef}
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
                            <u>{I18N.get('emp35.header.content')}</u>
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
                        {I18N.get('emp35.empower.content')}
                    </div>
                </div>
            </div>
        )
    }

    buildTeamHeader() {
        return (
            <div className="emp35-teamHeader">
                <div className="container">
                    <span className="title">{I18N.get('emp35.teamHeader.title')}</span>
                </div>
            </div>
        )
    }

    // TODO: load these via db
    buildTeamBusiness() {

        const image = '/assets/images/Elastos_Logo_Temp.png'

        return (
            <div className="emp35-teamBusiness">
                <div className="container">
                    <span className="blue-title">Business</span>

                    <div className="row-positions">
                        <Card
                            className="card-emp35-position"
                            bordered={false}
                            hoverable={true}
                            key="business-pos-1"
                            onClick={() => this.setState({visibleModalEmpowerApply: true})}
                            cover={<img className="event-card-image" src={image}/>}>

                            <Card.Meta
                                description={'Position Open'}
                            />
                        </Card>

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
                    </div>
                </div>
            </div>
        )
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
        console.log('handleApplyModalEmpowerApply')
    }
}
