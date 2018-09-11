import React from 'react';
import StandardPage from '../../StandardPage';
import Navigator from '@/module/page/shared/HomeNavigator/Container'
import config from '@/config';
import _ from 'lodash'
import './style.scss'
import '../../admin/admin.scss'
import { Col, Row, Icon, Form, Input, Breadcrumb, Button,
    Divider, Select, Table, List, Carousel, Avatar, Tag } from 'antd'
import { TEAM_USER_STATUS } from '@/constant'
import MediaQuery from 'react-responsive'
import moment from 'moment/moment'
import Footer from '@/module/layout/Footer/Container'
import I18N from '@/I18N'
import {MAX_WIDTH_MOBILE, MIN_WIDTH_PC} from "../../../../config/constant"

const FormItem = Form.Item;

const FILTERS = {
    ALL: 'all',
    OWNED: 'owned',
    ACTIVE: 'active',
    APPLIED: 'applied',
    REJECTED: 'rejected',
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

        if (this.state.filter === FILTERS.OWNED) {
            query = {
                owner: this.props.currentUserId
            }
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
                                <Col sm={24} md={4} className="wrap-box-navigator">
                                    <Navigator selectedItem={'profileTeams'}/>
                                </Col>
                                <Col sm={24} md={20} className="c_ProfileContainer admin-right-column wrap-box-user">
                                    <div className="pull-right filter-group">
                                        <Button onClick={this.goCreatepage.bind(this)}>Create Team</Button>
                                    </div>
                                    <MediaQuery maxWidth={MAX_WIDTH_MOBILE}>
                                        <Select
                                            name="type"
                                            onChange={this.onSelectFilter.bind(this)}
                                            value={this.state.filter}
                                        >
                                            {_.map(FILTERS, (filter, key) => {
                                                return <Select.Option key={filter} value={filter}>
                                                    {key}
                                                </Select.Option>
                                            })}
                                        </Select>
                                    </MediaQuery>
                                    <MediaQuery minWidth={MIN_WIDTH_PC}>
                                        <Button.Group className="filter-group">
                                            <Button
                                                className={(this.state.filter === FILTERS.ALL && 'selected') || ''}
                                                onClick={this.clearFilters.bind(this)}>All</Button>
                                            <Button
                                                className={(this.state.filter === FILTERS.OWNED && 'selected') || ''}
                                                onClick={this.setOwnedFilter.bind(this)}>Owned</Button>
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
                                    </MediaQuery>
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
                    <img width={188} height={188} alt="logo" src={picture.url} />
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
        const description_fn = (entity) => {
            return _.isEmpty(entity.recruitedSkillsets)
                ? I18N.get('project.detail.not_recruiting')
                : (
                    <div className="valign-wrapper">
                        <div className="gap-right pull-left">{I18N.get('project.detail.recruiting')}: </div>
                        <div className="pull-left">
                            {_.map(entity.recruitedSkillsets, (skillset, ind) => <Tag key={ind}>{skillset}</Tag>)}
                        </div>
                    </div>
                )
        }

        const data = _.map(teams, (team, id) => {
            return {
                title: team.name,
                pictures: team.pictures && team.pictures.length > 0 ? team.pictures : [{ url: '/assets/images/Elastos_Logo.png' }],
                description: description_fn(team),
                content: team.profile.description,
                owner: team.owner,
                id: team._id
            }
        })

        return (
            <List itemLayout='vertical' size='large' loading={this.props.loading}
                className="with-right-box" dataSource={data}
                renderItem={item => (
                    <div className="list-item">
                        <MediaQuery minWidth={MIN_WIDTH_PC}>
                            <List.Item
                                key={item.id}
                                extra={this.getCarousel(item)}
                            >
                                <h3 class="no-margin no-padding one-line brand-color">
                                    <a onClick={this.linkTeamDetail.bind(this, item.id)}>{item.title}</a>
                                </h3>
                                <h5 class="no-margin">
                                    {item.description}
                                </h5>
                                <div className="description-content" dangerouslySetInnerHTML={{__html: item.content}} />
                                <div className="ant-list-item-right-box">
                                    <a className="pull-up" onClick={this.linkUserDetail.bind(this, item.owner)}>
                                        <Avatar size="large" icon="user" className="pull-right" src={item.owner.profile.avatar}/>
                                        <div class="clearfix"/>
                                        <div>{item.owner.profile.firstName} {item.owner.profile.lastName}</div>
                                    </a>
                                    <Button type="primary" className="pull-down" onClick={this.linkTeamDetail.bind(this, item.id)}>View</Button>
                                </div>
                            </List.Item>
                        </MediaQuery>
                        <MediaQuery maxWidth={MAX_WIDTH_MOBILE}>
                            <List.Item
                                key={item.id}
                                className="ignore-right-box"
                            >
                                <h3 class="no-margin no-padding one-line brand-color">
                                    <a onClick={this.linkTeamDetail.bind(this, item.id)}>{item.title}</a>
                                </h3>
                                <h5 className="no-margin">
                                    {item.description}
                                </h5>
                                <div>
                                    <a onClick={this.linkUserDetail.bind(this, item.owner)}>
                                        <span>{item.owner.profile.firstName} {item.owner.profile.lastName}</span>
                                        <Divider type="vertical"/>
                                        <Avatar size="large" icon="user" src={item.owner.profile.avatar}/>
                                    </a>
                                    <Button type="primary" className="pull-right" onClick={this.linkTeamDetail.bind(this, item.id)}>View</Button>
                                </div>
                            </List.Item>
                        </MediaQuery>
                    </div>
                )}
            />
        )
    }

    onSelectFilter(value) {
        switch (value) {
            case FILTERS.ACTIVE:
                this.setActiveFilter();
                break;
            case FILTERS.APPLIED:
                this.setAppliedFilter();
                break;
            case FILTERS.REJECTED:
                this.setRejectedFilter();
                break;
            case FILTERS.OWNED:
                this.setOwnedFilter();
                break;
            default:
                this.clearFilters();
                break;
        }
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

    setOwnedFilter() {
        this.setState({ filter: FILTERS.OWNED }, this.refetch.bind(this))
    }

    goCreatepage() {
        this.props.history.push('/profile/teams/create');
    }

    linkUserDetail(user) {
        this.props.history.push(`/member/${user._id}`)
    }

    linkTeamDetail(teamId) {
        this.props.history.push(`/profile/team-detail/${teamId}`)
    }
}
