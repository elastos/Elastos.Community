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
    navigateToLearn() {
        this.props.history.push('/developer/learn');
    }

    navigateToTeamSearch() {
        this.props.history.push('/developer/search');
    }

    navigateToProjectSearch() {
        this.props.history.push('/developer/search?type=PROJECT');
    }

    navigateToTaskSearch() {
        this.props.history.push('/developer/search?type=TASK');
    }

    ord_renderContent () {
        return (
            <div className="p_Developer">
                <div className="ebp-header-divider" />
                <div className="p_admin_index">
                    <div className="d_box">
                        <div className="p_admin_content">
                            {this.buildInfoPanel()}
                            {this.buildNavi()}
                            {this.buildMemberSearch()}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

    buildInfoPanel() {
        return (
            <div className="info-panel">
                <div className="info-panel-content">
                    <h3 className="with-gizmo">
                        {I18N.get('0002')}
                    </h3>
                    <div className="pull-right">
                        <img src="/assets/images/community-world.png"/>
                    </div>
                    <div className="clearfix"/>
                </div>
            </div>
        )
    }

    buildNavi() {
        return (
            <div className="navi-panel">

            </div>
        )
    }

    buildMemberSearch() {
        return (
            <div className="member-search">

            </div>
        )
    }
}
