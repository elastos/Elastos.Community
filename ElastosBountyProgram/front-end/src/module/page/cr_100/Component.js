import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import I18N from '@/I18N'
import { Link } from 'react-router-dom'
import './style.scss'
import MediaQuery from 'react-responsive'
import { Col, Row, Card, Button, Breadcrumb, Icon } from 'antd'
import {MAX_WIDTH_MOBILE} from "../../../config/constant"

export default class extends StandardPage {
    componentDidMount() {
        this.props.getTasks()
    }

    componentWillUnmount() {
        this.props.resetTasks()
    }

    ord_renderContent () {
        return (
            <div className="p_Cr100">
                <div className="ebp-header-divider" />
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_content">
                            {this.buildHeader()}
                            {this.buildList()}
                            {this.buildDisclaimer()}
                            {this.buildFooter()}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

    buildHeader() {

    }

    buildList() {

    }

    buildDisclaimer() {

    }

    buildFooter() {

    }
}
