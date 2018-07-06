import React from 'react'
import AdminPage from '../BaseAdmin'
import SubmissionDetail from '@/module/submission/Container'
import Comments from '@/module/common/comments/Container'

import '../admin.scss'
import './style.scss'

import Navigator from '../shared/Navigator/Component'

import { Breadcrumb, Col, Icon, Row } from 'antd'
import { SUBMISSION_TYPE } from '@/constant'

export default class extends AdminPage {
    state = {
        editing: false
    }

    async componentDidMount() {
        await super.componentDidMount()
        const submissionId = this.props.match.params.submissionId
        this.props.getSubmissionDetail(submissionId)
    }

    componentWillUnmount() {
        this.props.resetSubmissionDetail()
    }

    ord_renderContent () {
        if (!this.props.submission.type) {
            return
        }

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
                                <Breadcrumb.Item>Admin</Breadcrumb.Item>
                                {this.props.submission.type === SUBMISSION_TYPE.FORM_EXT
                                    ? <Breadcrumb.Item href="/admin/forms">Forms</Breadcrumb.Item>
                                    : <Breadcrumb.Item href="/admin/submissions">Submissions</Breadcrumb.Item>
                                }
                                <Breadcrumb.Item>{this.props.submission.name}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="p_admin_content">
                            <Row className="clearfix">
                                <Col span={20} className="admin-left-column wrap-box-user">
                                    <SubmissionDetail submission={this.props.submission}/>
                                </Col>
                                <Col span={4} className="admin-right-column wrap-box-navigator">
                                    <Navigator selectedItem={this.props.submission.type === SUBMISSION_TYPE.FORM_EXT ? 'forms' : 'submissions'}/>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
