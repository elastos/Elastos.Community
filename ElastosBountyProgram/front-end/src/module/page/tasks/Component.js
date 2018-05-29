import React from 'react';
import StandardPage from '../StandardPage';
import Footer from '@/module/layout/Footer/Container';
import TaskCard from '@/module/common/TaskCard';
import _ from 'lodash';

import './style.scss'

import { Col, Row, Icon, Form, Input, Button, Dropdown, Spin } from 'antd'
const FormItem = Form.Item;

export default class extends StandardPage {

    ord_states(){
        return {
            list : [],
            loading : false,
            total : 0
        };
    }

    ord_renderContent () {

        return (
            <div className="p_Tasks">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page">
                    {
                        this.state.loading ? this.renderLoading() : this.renderList()
                    }
                </div>
                <Footer />
            </div>
        )
    }
    renderLoading(){
        return (
            <div className="flex-center">
                <Spin size="large" />
            </div>

        )
    }
    renderList(){
        const list = _.chunk(this.state.list, 4);
        return (
            <div className="">
                {_.map(list, (d_list, i)=>{
                    return (
                        <Row key={i} gutter={16} style={{marginBottom:20}}>
                            {
                                _.map(d_list, (p, j)=>{
                                    return (
                                        <Col key={j} className="gutter-row" span={6}>
                                            <TaskCard {...p} />
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    );
                })}
            </div>
        );
    }

    async componentDidMount(){
        this.setState({loading : true});
        const d = await this.props.fetchTaskList();

        this.setState({
            loading : false,
            list : d.list,
            total : d.total
        });
    }
}
