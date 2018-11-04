import React from 'react'
import StandardPage from '../../StandardPage'
import Footer from '@/module/layout/Footer/Container'
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
            ? <Spin className="spinner" size="large"/>
            : _.isFunction(followup) && followup()
    }

    ord_states() {
        return {
            loading: false
        }
    }

    showDetailModal(id) {
        this.props.history.push(`/project-detail/${id}`)
    }

    // TODO: what's up with these admin CSS classes?
    ord_renderContent () {
        return (
            <div className="p_crVideo">
                <div className="ebp-header-divider" />
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_content">
                            {this.buildHeader()}
                            {this.buildContent()}
                            {this.buildTasks()}
                            <div className="share-icons">
                                <span>SHARE</span>
                                <a href="https://twitter.com/Elastos_org" target="_blank"><i
                                    className="fab fa-twitter fa-2x"></i></a>
                                <a href="https://www.facebook.com/ElastosCyberRepublic" target="_blank"><i className="fab fa-facebook fa-2x"/></a>
                                <a href="https://t.me/elastosgroup" target="_blank"><i
                                    className="fab fa-telegram fa-2x"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

    buildHeader() {
        return (
            <div className="header">
                <div className="header-container">
                    <div className="title komu-a">
                        {I18N.get('cr-video.header.1')}
                    </div>
                    <div className="videoWrapper">
                        <iframe src="https://www.youtube.com/embed/vaPdh35elYc"
                            frameBorder="0"
                            allow="autoplay; encrypted-media;"
                            allowFullScreen></iframe>
                    </div>
                    <div className="title sub-title">
                        {I18N.get('cr-video.header.2')}
                    </div>
                    <div>
                        <Button className="earn-ela-btn">{I18N.get('cr-video.join')}</Button>
                    </div>
                    <div className="background-visuals">
                        <img className="upper-right" src="/assets/images/quarter-circle-connected.svg"/>
                        <img className="mid-right" src="/assets/images/training_circle.png"/>
                        <img className="mid-left" src="/assets/images/training_green_slashed_box.png"/>
                        <img className="upper-left" src="/assets/images/training_mini_connector.png"/>
                    </div>
                </div>
            </div>
        )
    }

    buildContent() {
        return (
            <div>
                <div className="content">
                    <div className="title">{I18N.get('cr-video.q1')}</div>
                    <span>{I18N.get('cr-video.q1.title.1')}</span>
                    <p>{I18N.get('cr-video.q1.paragraph.1')}</p>
                    <span>{I18N.get('cr-video.q1.title.2')}</span>
                    <p>{I18N.get('cr-video.q1.paragraph.2')}</p>
                    <span>{I18N.get('cr-video.q1.title.3')}</span>
                    <p>{I18N.get('cr-video.q1.paragraph.3')}</p>
                </div>
                <div className="content">
                    <div className="title">{I18N.get('cr-video.q2')}</div>
                    <p>{I18N.get('cr-video.q2.paragraph.1')}</p>
                </div>
                <div className="content">
                    <div className="title">{I18N.get('cr-video.q3')}</div>
                    <p>{I18N.get('cr-video.q3.paragraph.1')}</p>
                </div>
                <div>
                    <Button className="earn-ela-btn">{I18N.get('cr-video.join')}</Button>
                </div>
            </div>
        )
    }

    buildTasks() {
        return (
            <div className="tasks">
            </div>
        )
    }
}
