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
            this.props.history.replace('/profile/teams')
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
            <div className="p_ProfileSubmissionDetail">
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
                                <Breadcrumb.Item href="/profile/submissions">Submissions</Breadcrumb.Item>
                                <Breadcrumb.Item>{this.props.submission.title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="p_admin_content">
                            <Row>
                                <Col sm={24} md={4} className="admin-left-column wrap-box-navigator">
                                    <Navigator selectedItem={'profileSubmissions'} />
                                </Col>
                                <Col sm={24} md={20} className="c_ProfileContainer admin-right-column wrap-box-user">
                                    <SubmissionDetail submission={this.props.submission} />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
