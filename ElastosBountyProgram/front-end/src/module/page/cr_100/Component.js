import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import ProjectDetail from './detail/Container'
import I18N from '@/I18N'
import './style.scss'
import { Col, Row, Card, Button, Breadcrumb, Icon, List, Spin, Avatar, Modal } from 'antd'
import _ from 'lodash'

export default class extends StandardPage {
    componentDidMount() {
        this.setState({ loading: true })
        this.props.getTasks().then(() => {
            this.setState({ loading: false })
        })
    }

    componentWillUnmount() {
        this.props.resetTasks()
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
            <div className="p_Cr100">
                <div className="ebp-header-divider" />
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_content">
                            {this.buildHeader()}
                            {this.checkForLoading(this.buildList.bind(this))}
                            {this.buildDisclaimer()}
                            {this.buildFooter()}
                        </div>
                    </div>
                </div>
                <Modal
                    className="project-detail-nobar"
                    visible={!!this.state.showDetailId}
                    onOk={this.handleDetailModalClose.bind(this)}
                    onCancel={this.handleDetailModalClose.bind(this)}
                    footer={null}
                    width="70%"
                >
                    { this.state.showDetailId &&
                        <ProjectDetail taskId={this.state.showDetailId}/>
                    }
                </Modal>
                <Footer/>
            </div>
        )
    }

    buildHeader() {
        return (
            <div className="cr100-header">
                <div className="welcomeBox">
                    <div className="title">
                        {I18N.get('developer.cr100.welcome.title')}
                    </div>
                    <div className="content">
                        {I18N.get('developer.cr100.welcome')}
                    </div>

                    <img className="cr100_logo" src="/assets/images/CR100_Logo.png"/>
                    <img className="oomph_box" src="/assets/images/oomph.png"/>
                </div>
            </div>
        )
    }

    buildList() {
        // Note, the project can be in multiple domains, but categorizing by the top one
        const categorizedList = _.groupBy(this.props.all_tasks, (task) => _.first(task.domain))

        let list = _.map(categorizedList, (list, category) => {
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

        list = _.sortBy(list, ['key'])

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
}
