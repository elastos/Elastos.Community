import React from 'react'
import StandardPage from '../../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import './style.scss'

import { Col, Row, Icon, Form, Input, Button, Modal, Select, Table, List, Tooltip, Breadcrumb, Card } from 'antd'
import moment from 'moment/moment'

export default class extends StandardPage {
    ord_renderContent () {
        return (
            <div className="p_About">
                <div className="ebp-header-divider">

                </div>

                <div className="ebp-page-title">
                    <Row className="d_row d_rowGrey">
                        <h3 className="page-header">
                            About
                        </h3>
                    </Row>
                </div>
                <div className="ebp-page">
                    <Row className="d_row">
                        <h4>
                            There are now two main programs to earn ELA,
                        </h4>

                        <h3>
                            The Developer Program
                        </h3>
                        <p>
                            As a developer there are training related events and also tasks such as writing tutorials, example apps/demos or fixing bugs.
                            We also accept submissions of bugs, issues or security issues which will be reviewed and possibly turned into tasks and the
                            submitter of the issue rewarded with ELA.
                        </p>

                        <h3>
                            The Community EBP Program
                        </h3>
                        <p>
                            Anyone and also developers alike can participate in the community program which rewards organizers who host events or do tasks
                            that promote Elastos in their community and online.
                        </p>
                    </Row>
                </div>
                <Footer/>
            </div>
        )
    }
}
