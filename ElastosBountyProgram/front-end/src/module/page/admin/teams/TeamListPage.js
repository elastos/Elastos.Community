import React from 'react';
import BaseAdmin from '../BaseAdmin';
import {createContainer} from '@/util';

import Navigator from '../shared/Navigator/Component'
import { Breadcrumb, Col, Icon, Row, Menu, Select, Table } from 'antd';

import TeamService from '@/service/TeamService';
import moment from "moment/moment";
import config from '@/config';

const Component = class extends BaseAdmin {
    ord_states(){
        return {
            loading : true,
            total : 0,
            list : []
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
                            <Breadcrumb.Item>Admin</Breadcrumb.Item>
                            <Breadcrumb.Item>teams</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="p_admin_content">
                        <Row>
                            <Col span={20} className="c_TaskTableContainer admin-left-column wrap-box-user">

                                {this.renderList()}
                            </Col>
                            <Col span={4} className="admin-right-column wrap-box-navigator">
                                <Navigator selectedItem={'teams'}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }

    renderList() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '20%',
                className: 'fontWeight500',
                render : (name, record)=>{
                    return <a onClick={this.goDetail.bind(this, record._id)} className="tableLink">{name}</a>
                }
            },
            {
                title: 'Description',
                dataIndex: 'profile.description',
                // key: 'profile.description'
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                // render: (category) => _.capitalize(category)
            },
            {
                title: 'Created',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (createdAt) => moment(createdAt).format(config.FORMAT.DATE)
            }
        ];


        return (
            <Table
                columns={columns}
                rowKey={(item) => item._id}
                dataSource={this.state.list}
                loading={this.state.loading}
            />
        );
    }

    goDetail(teamId){
        this.props.history.push(`/admin/teams/${teamId}`);
    }

    async componentDidMount(){
        await super.componentDidMount();

        const d = await this.props.list();
        this.setState({
            list: d,
            loading: false
        });
    }
};

export default createContainer(Component, ()=>{
    return {};
}, ()=>{
    const teamService = new TeamService();

    return {
        async list(){
            return await teamService.list();
        }
    };
});
