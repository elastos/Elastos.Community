import React from 'react';
import StandardPage from '../../StandardPage';
import Navigator from '@/module/page/shared/HomeNavigator/Container'
import SubmissionCreateForm from '@/module/form/SubmissionCreateForm/Container'

import '../../admin/admin.scss'

import { Col, Row } from 'antd'

export default class extends StandardPage {
    ord_renderContent () {
        return (
            <div className="c_ProfileContainer">
                <div className="ebp-header-divider">
                </div>
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_breadcrumb">
                            <br/>
                        </div>
                        <div className="p_ProfileTeams p_admin_content">
                            <Row>
                                <Col span={4} className="admin-left-column wrap-box-navigator">
                                    <Navigator selectedItem={'profileSubmissions'}/>
                                </Col>
                                <Col span={20} className="admin-right-column wrap-box-user">
                                    <h4 className="p_profile_action_title">Create Issue</h4>
                                    <SubmissionCreateForm />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
