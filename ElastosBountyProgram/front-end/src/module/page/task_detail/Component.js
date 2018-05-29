import React from 'react';
import StandardPage from '../StandardPage';
import Footer from '@/module/layout/Footer/Container'
import TaskDetail from '@/module/task/Container'

import './style.scss'

import { Breadcrumb, Col, Row, Icon, Form, Input, Button, Dropdown } from 'antd'
const FormItem = Form.Item;

export default class extends StandardPage {

    componentDidMount() {
        const taskId = this.props.match.params.taskId
        this.props.getTaskDetail(taskId)
    }

    componentWillUnmount() {
        this.props.resetTaskDetail()
    }

    ord_renderContent () {

        return (
            <div className="p_TaskDetail">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page">

                </div>
                <Footer />
            </div>
        )
    }
}
