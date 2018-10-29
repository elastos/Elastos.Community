import React from 'react';
import {createContainer} from '@/util';
import _ from 'lodash';
import Footer from '@/module/layout/Footer/Container';
import Navigator from '@/module/page/shared/HomeNavigator/Container'
import { Breadcrumb, Col, Icon, Row, Spin } from 'antd';
import TeamDetail from '@/module/team/Container';
import I18N from '@/I18N'
import StandardPage from '../../StandardPage';

export default class extends StandardPage {
    state = {
        editing: false
    }

    componentDidMount() {
        const teamId = this.props.match.params.teamId
        this.props.getTeamDetail(teamId)
    }

    componentWillUnmount() {
        this.props.resetTeamDetail()
    }

    ord_renderContent() {
        return (
            <div className="p_ProfileTaskDetail">
                <div className="ebp-header-divider">

                </div>
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_breadcrumb">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <Icon type="home" />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>{I18N.get('0200')}</Breadcrumb.Item>
                                <Breadcrumb.Item href="/profile/tasks">{I18N.get('0005')}</Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    {this.props.team.name}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="p_admin_content">
                            <Row>
                                <Col sm={24} md={4} className="admin-left-column wrap-box-navigator">
                                    <Navigator selectedItem="profileTeams" />
                                </Col>
                                <Col sm={24} md={20} className="c_ProfileContainer admin-right-column wrap-box-user">
                                    <TeamDetail team={this.props.team} />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
};
