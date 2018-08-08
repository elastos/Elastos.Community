import React from 'react';
import StandardPage from '../../StandardPage';
import Navigator from '@/module/page/shared/HomeNavigator/Container'
import config from '@/config';
import _ from 'lodash'
import './style.scss'
import '../../admin/admin.scss'

import { Col, Row, Icon, Form, Input, Breadcrumb, Button, Divider, Table, List, Carousel } from 'antd'
import MediaQuery from 'react-responsive'
import moment from "moment/moment";
import Footer from '@/module/layout/Footer/Container'

const FormItem = Form.Item;

export default class extends StandardPage {
    componentDidMount() {
        super.componentDidMount()
        this.props.getTeams(this.props.currentUserId)
    }

    componentWillUnmount() {
        this.props.resetTeams()
    }

    ord_states() {
        return {
            loading: true,
            total: 0,
            list: []
        };
    }
    ord_renderContent () {
        return (
            <div class="p_ProfileTeams">
                <div className="ebp-header-divider">

                </div>
                <div className="p_admin_index ebp-wrap">
                    <div className="d_box">
                        <div className="p_admin_breadcrumb">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <Icon type="home" />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Teams</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="p_admin_content">
                            <Row>
                                <MediaQuery minWidth={720}>
                                    <Col span={4} className="admin-left-column wrap-box-navigator">
                                        <Navigator selectedItem={'profileTeams'}/>
                                    </Col>
                                </MediaQuery>
                                <Col span={20} className="c_ProfileContainer admin-right-column wrap-box-user">
                                    <div className="pull-right filter-group">
                                        <Button onClick={this.goCreatepage.bind(this)}>Create Team</Button>
                                    </div>
                                    <div className="clearfix"/>
                                    {this.getListComponent()}
                                </Col>
                            </Row>
                            <Footer/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    getCarousel(item) {
        const pictures = _.map(item.pictures, (picture, ind) => {
            return (
                <div key={ind}>
                    <img width={204} height={204} alt="logo" src={picture.url} />
                </div>
            )
        })

        return (
            <div className="carousel-wrapper">
                <Carousel autoplay>
                    {pictures}
                </Carousel>
            </div>
        )
    }

    getListComponent() {
        const data = _.map(this.props.all_teams, (team, id) => {
            return {
                href: '',
                title: team.name,
                pictures: team.pictures || [],
                description: 'Lorem ipsum',
                content: team.profile.description,
                id: team._id
            }
        })

        return (
            <List itemLayout='vertical' size='large' loading={this.props.loading}
                pagination={{ pageSize: 5 }} dataSource={data} renderItem={item => (
                    <List.Item
                        key={item.id}
                        extra={this.getCarousel(item)}
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        )
    }

    goDetail(teamId) {
        this.props.history.push(`/profile/teams/${teamId}`);
    }

    goCreatepage() {
        this.props.history.push('/profile/teams/create');
    }
}
