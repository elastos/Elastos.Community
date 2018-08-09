import React from 'react';
import StandardPage from '../../StandardPage';
import Navigator from '@/module/page/shared/HomeNavigator/Container'
import config from '@/config';
import TeamCreateForm from '@/module/form/TeamCreateForm/Container'

import '../../admin/admin.scss'

import { Col, Row, Icon, Form, Input, Button, Divider, Table } from 'antd'
import moment from "moment/moment";
const FormItem = Form.Item;

export default class extends StandardPage {
    ord_states(){
        return {
            loading : true,
            total : 0,
            list : []
        };
    }
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
                                    <Navigator selectedItem={'profileTeams'}/>
                                </Col>
                                <Col span={20} className="admin-right-column wrap-box-user">

                                    <Divider className="">Create Team</Divider>
                                    <TeamCreateForm />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }



    async componentDidMount(){
        await super.componentDidMount();


    }
}
