import React from 'react'
import AdminPage from '../BaseAdmin'
import './style.scss'

import { Breadcrumb, Col, Icon, Row, Menu, Select } from 'antd'

import { Link } from 'react-router-dom'

export default class extends AdminPage {
    checkTypeOfBreadcrumb () {
        // Check status of breadcrumb
        let treeLevel = Object.keys(this.props.match.params).length;
        this.setState({
            treeLevel
        });
    }

    ord_renderContent () {

    }
}
