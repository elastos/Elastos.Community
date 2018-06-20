import React from 'react';
import {createContainer} from '@/util';
import _ from 'lodash';

import Navigator from '@/module/page/shared/Navigator/Container'
import { Breadcrumb, Col, Icon, Row, Spin } from 'antd';

import TeamDetail from '@/module/shared/team_detail/Component';
import StandardPage from "../../StandardPage";

export default class extends StandardPage {
    ord_states(){
        return {
            loading : true,
            data : {}
        };
    }

    ord_renderContent(){
        return (
            <div className="p_admin_index ebp-wrap">
                <div className="d_box">
                    <div className="p_admin_breadcrumb">
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">
                                <Icon type="home" />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>profile</Breadcrumb.Item>
                            <Breadcrumb.Item>teams</Breadcrumb.Item>
                            <Breadcrumb.Item>teamid</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="p_admin_content">
                        <Row>
                            <Col span={20} className="admin-left-column h-center">
                                {this.renderDetail()}

                            </Col>
                            <Col span={4} className="admin-right-column wrap-box-navigator">
                                <Navigator selectedItem={'profileTeams'}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }

    renderDetail(){
        if(this.state.loading){
            return (
                <Spin size="large" />
            );
        }

        const member = _.find(this.state.data.members, (item)=>{
            return item.user._id === this.props.current.id;
        })
        const canEdit = member && member.role === 'LEADER' ? true : false;
        return (
            <TeamDetail canEdit={canEdit} data={this.state.data} />
        )
    }

    async componentDidMount(){
        await super.componentDidMount();

        const teamId = this.$getParam('teamId');

        const d = await this.props.detail(teamId);
        console.log(d);
        this.setState({
            data : d,
            loading : false
        });
    }
};