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

        this.state = {
            loading: false,
        }
    }

    async componentDidMount() {
        this.setState({ loading: false })
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

    ord_renderContent () {
        return (
            <div className="p_training">
                <div className="ebp-header-divider" />
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_content">
                            {this.buildHeader()}
                            {this.buildTraining()}
                            {this.buildItinerary()}
                            {this.buildFooter()}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

    buildHeader() {
        return (
            <div className="training-header">
                <div className="container">
                    <div className="rect-container">
                        <div className="rect"></div>
                    </div>
                    <div className="title">
                        {I18N.get('training.header.title')}
                    </div>
                    <div className="content">
                        <div class="center">
                            <span>{I18N.get('training.header.content')}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    buildTraining() {
        return (
            <div className="evangelist">
                <div className="container">
                    <div className="title">
                        {I18N.get('training.evangelist.title')}
                    </div>
                    <div className="content">
                        {I18N.get('training.evangelist.content')}
                    </div>
                </div>
            </div>
        )
    }

    buildItinerary() {
        return (
            <div className="itinerary">
                <div>
                    <img className="connector" src="assets/images/training_connector.png"/>
                </div>
                <div className="container">
                    <div className="title">
                        {I18N.get('training.itinerary.title')}
                    </div>
                    <div className="content">
                        <Row>
                            <Col span="12" className="left-col">
                                <img src="assets/images/training_itinerary.png"/>
                            </Col>
                            <Col span="12" className="right-col">
                                <div>
                                    <span className="label">{I18N.get('training.itinerary.content.venueLabel')}: </span>
                                    <span>{I18N.get('training.itinerary.content.venue')}</span>
                                </div>
                                <div>
                                    <span className="label">{I18N.get('training.itinerary.content.accomodationLabel')}: </span>
                                    <span>{I18N.get('training.itinerary.content.accomodation')}</span>
                                </div>
                                <div>
                                    <span className="label">{I18N.get('training.itinerary.content.day13Label')}: </span>
                                    <span>{I18N.get('training.itinerary.content.day13')}</span>
                                </div>
                                <div>
                                    <span className="label">{I18N.get('training.itinerary.content.day4Label')}: </span>
                                    <span>{I18N.get('training.itinerary.content.day4')}</span>
                                </div>
                                <div>
                                    <span className="label">{I18N.get('training.itinerary.content.day5Label')}: </span>
                                    <span>{I18N.get('training.itinerary.content.day5')}</span>
                                </div>
                                <div>
                                    <span className="label">{I18N.get('training.itinerary.content.day6Label')}: </span>
                                    <span>{I18N.get('training.itinerary.content.day6')}</span>
                                </div>
                                <div>
                                    <span className="label">{I18N.get('training.itinerary.content.day7Label')}: </span>
                                    <span>{I18N.get('training.itinerary.content.day7')}</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }

    buildFooter() {

    }
}
