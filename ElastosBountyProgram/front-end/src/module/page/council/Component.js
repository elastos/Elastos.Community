import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import I18N from '@/I18N'
import './style.scss'
import { Col, Row, Card, Button, message, Spin, Avatar, Modal } from 'antd'
import _ from 'lodash'
import {USER_EMPOWER_TYPE} from '@/constant'


/**
 * TODO: all the positions should load from the DB, copy pasting for now
 * until applications are being processed
 */
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

    ord_renderContent () {
        return (
            <div className="p_council">

                TODO

                <Footer/>
            </div>
        )
    }
}
