import React from 'react'
import StandardPage from '../../StandardPage'

import SubmissionDetail from '@/module/submission/Container'
import Navigator from '@/module/page/shared/HomeNavigator/Container'

import config from '@/config'

import './style.scss'
import '../../admin/admin.scss'

import { Col, Row, Breadcrumb, Icon } from 'antd'

export default class extends StandardPage {

    state = {
        editing: false
    }

    ord_checkLogin(isLogin) {
        if (!isLogin) {
            this.props.history.replace('/home')
        }
    }

    componentDidMount() {
        super.componentDidMount()
        const submissionId = this.props.match.params.submissionId
        this.props.getSubmissionDetail(submissionId)
    }

    componentWillUnmount() {
        this.props.resetSubmissionDetail()
    }

    ord_renderContent () {

        return (
            <div>
                <div className="ebp-header-divider">

                </div>
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_breadcrumb">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <Icon type="home" />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Profile</Breadcrumb.Item>
                                <Breadcrumb.Item href="/profile/tasks">Submissions</Breadcrumb.Item>
                                <Breadcrumb.Item></Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="p_ProfileSubmissionDetail p_admin_content">
                            <Row>
                                <Col span={20} className="c_ProfileContainer admin-left-column wrap-box-user">
                                    <SubmissionDetail submission={this.props.submission} />
                                </Col>
                                <Col span={4} className="admin-right-column wrap-box-navigator">
                                    <Navigator selectedItem={'profileSubmissions'} />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
