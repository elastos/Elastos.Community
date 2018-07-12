import React from 'react'
import StandardPage from '../../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import './style.scss'

import { Col, Row, Menu } from 'antd'
import moment from 'moment/moment'

export default class extends StandardPage {

    constructor (props) {
        super(props)

        this.state = {
            selectedHelpTopic: 'gettingStarted'
        }
    }

    ord_renderContent () {
        return (
            <div className="p_help">
                <div className="ebp-header-divider">

                </div>

                <div className="ebp-page-title">
                    <Row className="d_row d_rowGrey">
                        <h3 className="page-header">
                            Help & Documentation
                        </h3>
                    </Row>
                </div>
                <div className="ebp-page">
                    <Row className="d_row">
                        <Col span={20}>
                            {this.renderMain()}
                        </Col>
                        <Col span={4}>
                            <Menu
                                defaultSelectedKeys={[this.state.selectedHelpTopic]}
                                onClick={(item) => (this.setState({selectedHelpTopic: item.key}))}
                                mode="inline"
                            >
                                <Menu.Item key="gettingStarted">
                                    Getting Started
                                </Menu.Item>
                                <Menu.Item key="developers">
                                    Developers
                                </Menu.Item>
                                <Menu.Item key="nonDevelopers">
                                    Non-Developers
                                </Menu.Item>
                                <Menu.Item key="events">
                                    Events
                                </Menu.Item>
                            </Menu>
                        </Col>
                    </Row>
                </div>
                <Footer/>
            </div>
        )
    }

    renderMain() {
        switch (this.state.selectedHelpTopic) {

            case 'gettingStarted':
                return this.renderGettingStarted()

            case 'developers':
                return this.renderDevelopers()

        }
    }

    renderGettingStarted() {
        return <div>
            <h4>
                Getting Started
            </h4>
        </div>
    }

    renderDevelopers() {
        return <div>
            <h4>
                Developers
            </h4>
        </div>
    }
}
