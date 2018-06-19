import React from 'react'
import StandardPage from '../../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import './style.scss'

import { Col, Row, Icon, Form, Input, Button, Modal, Select, Table, List, Tooltip, Breadcrumb, Card } from 'antd'
import moment from 'moment/moment'

export default class extends StandardPage {

    ord_renderContent () {
        return (
            <div className="p_Slack">
                <div className="ebp-header-divider">

                </div>

                <div className="ebp-page-title">
                    <Row className="d_row d_rowGrey">
                        <h3 className="page-header">
                            Join Slack
                        </h3>
                    </Row>
                </div>
                <div className="ebp-page">
                    <Row className="d_row">
                        <h4>
                            All members on sign-up will receive an email inviting them to Slack
                        </h4>

                        <p>
                            Please use Slack to collaborate and find team members in your community.
                        </p>
                    </Row>
                </div>
                <Footer/>
            </div>
        )
    }
}
