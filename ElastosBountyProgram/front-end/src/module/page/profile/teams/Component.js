import React from 'react';
import StandardPage from '../../StandardPage';
import Navigator from '@/module/page/shared/HomeNavigator/Container'
import config from '@/config';
import _ from 'lodash'
import './style.scss'
import '../../admin/admin.scss'
import { Col, Row, Icon, Form, Input, Breadcrumb, Button, Divider, Table, List, Carousel, Avatar } from 'antd'
import { TEAM_USER_STATUS } from '@/constant'
import MediaQuery from 'react-responsive'
import moment from 'moment/moment'
import Footer from '@/module/layout/Footer/Container'

const FormItem = Form.Item;

const FILTERS = {
    ALL: 'all',
    ACTIVE: 'active',
    APPLIED: 'applied',
    REJECTED: 'rejected'
}

export default class extends StandardPage {
    constructor(props) {
        super(props)

        this.state = {
            showMobile: false,
            filter: FILTERS.ALL
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.refetch()
    }

    componentWillUnmount() {
        this.props.resetTeams()
    }

    refetch() {
        let query = {
            teamHasUser: this.props.currentUserId
        }

        if (this.state.filter === FILTERS.ACTIVE) {
            query.teamHasUserStatus = TEAM_USER_STATUS.NORMAL
        }

        if (this.state.filter === FILTERS.APPLIED) {
            query.teamHasUserStatus = TEAM_USER_STATUS.PENDING
        }

        if (this.state.filter === FILTERS.REJECTED) {
            query.teamHasUserStatus = TEAM_USER_STATUS.REJECT
        }

        this.props.getTeams(query)
    }

    ord_states() {
        return {
            loading: true,
            total: 0,
            list: []
        };
    }

    ord_renderContent () {
        const teams = this.props.all_teams

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
                                    <Button.Group className="filter-group">
                                        <Button
                                            className={(this.state.filter === FILTERS.ALL && 'selected') || ''}
                                            onClick={this.clearFilters.bind(this)}>All</Button>
                                        <Button
                                            className={(this.state.filter === FILTERS.ACTIVE && 'selected') || ''}
                                            onClick={this.setActiveFilter.bind(this)}>Active</Button>
                                        <Button
                                            className={(this.state.filter === FILTERS.APPLIED && 'selected') || ''}
                                            onClick={this.setAppliedFilter.bind(this)}>Applied</Button>
                                        <Button
                                            className={(this.state.filter === FILTERS.REJECTED && 'selected') || ''}
                                            onClick={this.setRejectedFilter.bind(this)}>Rejected</Button>
                                    </Button.Group>

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
        const teams = this.props.all_teams
        const data = _.map(teams, (team, id) => {
            return {
                href: '',
                title: team.name,
                pictures: team.pictures || [],
                description: 'Lorem ipsum',
                content: team.profile.description,
                owner: team.owner,
                id: team._id
            }
        })

        return (
            <List itemLayout='vertical' size='large' loading={this.props.loading}
                className="with-right-box" pagination={{ pageSize: 5 }} dataSource={data}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        extra={this.getCarousel(item)}
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                        <div className="ant-list-item-right-box">
                            <div className="pull-up">
                                <Avatar size="large" icon="user" className="pull-right" src={item.owner.profile.avatar}/>
                                <div class="clearfix"/>
                                <div>{item.owner.profile.firstName} {item.owner.profile.lastName}</div>
                            </div>
                            <Button type="primary" className="pull-down">View</Button>
                        </div>
                    </List.Item>
                )}
            />
        )
    }

    clearFilters() {
        this.setState({ filter: FILTERS.ALL }, this.refetch.bind(this))
    }

    setActiveFilter() {
        this.setState({ filter: FILTERS.ACTIVE }, this.refetch.bind(this))
    }

    setAppliedFilter() {
        this.setState({ filter: FILTERS.APPLIED }, this.refetch.bind(this))
    }

    setRejectedFilter() {
        this.setState({ filter: FILTERS.REJECTED }, this.refetch.bind(this))
    }

    goDetail(teamId) {
        this.props.history.push(`/profile/teams/${teamId}`);
    }

    goCreatepage() {
        this.props.history.push('/profile/teams/create');
    }
}
