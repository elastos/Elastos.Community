import React from 'react'
import StandardPage from '../../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import { Link } from 'react-router-dom'
import config from '@/config'
import _ from 'lodash'
import './style.scss'

import { Col, Row, Icon, Form, Input, Button, Modal, Select, Table, List, Popover, Cascader } from 'antd'
import moment from 'moment/moment'

export default class extends StandardPage {
    state = {
    }

    ord_renderContent () {
        return (
            <div className="p_DeveloperLearn">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page-title">
                    <h3 className="page-header">

                    </h3>
                </div>
                <div className="ebp-page">
                    <Row className="d_row d_rowTop">

                    </Row>
                    <div className="horizGap">
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
