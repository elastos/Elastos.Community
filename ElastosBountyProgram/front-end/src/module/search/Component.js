import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import {
    Col, Row, Icon, Input, Button, List, Checkbox, Radio, Select,
    Carousel, Modal, Avatar, Affix, Tag, TreeSelect, Switch, Divider, Spin
} from 'antd'
import _ from 'lodash'
import './style.scss'
import {SKILLSET_TYPE, TEAM_TASK_DOMAIN, TASK_CANDIDATE_STATUS, USER_AVATAR_DEFAULT} from '@/constant'
import ProjectDetail from '@/module/project/detail/Container'
import TeamDetail from '@/module/team/detail/Container'
import LoginOrRegisterForm from '@/module/form/LoginOrRegisterForm/Container'
import Footer from '@/module/layout/Footer/Container'
import MediaQuery from 'react-responsive'
import {MAX_WIDTH_MOBILE, MIN_WIDTH_PC} from '@/config/constant'
import I18N from '@/I18N'
import moment from 'moment'
import ProfilePopup from '@/module/profile/OverviewPopup/Container'

const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;

export default class extends BaseComponent {

    componentDidMount() {
        this.props.loadAllCircles()
        this.refetch()
    }

    componentWillUnmount() {
        this.props.resetTeams()
        this.props.resetTasks()
    }

    ord_states() {
        return {
            lookingFor: this.props.preselect || 'TEAM', // TEAM, PROJECT, TASK
            skillset: [],
            domain: [],
            circle: [],
            entryCount: 3,
            skillsetShowAllEntries: false,
            categoryShowAllEntries: false,
            showProjectModal: false,
            showTeamModal: false,
            showLoginRegisterModal: false,
            taskDetailId: 0,
            teamDetailId: 0,
            showMobile: false,
            filtersTree: ['TEAM'],
            showUserInfo: null
        }
    }

    getQuery() {
        let query = {}

        if (!_.isEmpty(this.state.skillset)) {
            query.skillset = this.state.skillset
        }

        if (!_.isEmpty(this.state.domain)) {
            query.domain = this.state.domain
        }

        if (this.state.lookingFor === 'TASK') {
            if (!_.isEmpty(this.state.circle)) {
                query.circle = this.state.circle
            }
        }

        return query
    }

    refetch() {
        const query = this.getQuery()
        const lookup = {
            TEAM: this.props.getTeams,
            PROJECT: this.props.getProjects,
            TASK: this.props.getTasks
        }

        const getter = lookup[this.state.lookingFor]
        getter.call(this, query)
    }

    // this needs to be used when it's a project to hide certain UI
    isLookingForTeam() {
        return this.state.lookingFor === 'TEAM'
    }

    onChangeLookingFor(e) {
        this.setState({
            lookingFor: e.target.value
        }, this.refetch.bind(this))
    }

    onChangeSkillset(value) {
        this.setState({
            skillset: value
        }, this.refetch.bind(this))
    }

    onChangeDomain(value) {
        this.setState({
            domain: value
        }, this.refetch.bind(this))
    }

    onChangeCircle(value) {
        this.setState({
            circle: value
        }, this.refetch.bind(this))
    }

    onChangeLookingForSelect(value) {
        this.setState({
            lookingFor: value
        }, this.refetch.bind(this))
    }

    showProjectModal(id) {
        this.setState({
            showProjectModal: true,
            taskDetailId: id
        })
    }

    showTeamModal(id) {
        this.setState({
            showTeamModal: true,
            teamDetailId: id
        })
    }

    showLoginRegisterModal() {
        sessionStorage.setItem('loginRedirect', '/developer/search')
        sessionStorage.setItem('registerRedirect', '/developer/search')

        this.setState({
            showLoginRegisterModal: true
        })
    }

    handleProjectModalOk = (e) => {
        this.setState({
            showProjectModal: false
        })
    }

    handleTeamModalOk = (e) => {
        this.setState({
            showTeamModal: false
        })
    }

    handleProjectModalCancel = (e) => {
        this.setState({
            showProjectModal: false
        })
    }

    handleTeamModalCancel = (e) => {
        this.setState({
            showTeamModal: false
        })
    }

    handleLoginRegisterModalOk = (e) => {
        sessionStorage.removeItem('registerRedirect')

        this.setState({
            showLoginRegisterModal: false
        })
    }

    hideShowModal() {
        return () => {
            this.setState({
                showLoginRegisterModal: false
            })
        }
    }

    handleLoginRegisterModalCancel = (e) => {
        sessionStorage.removeItem('registerRedirect')

        this.setState({
            showLoginRegisterModal: false
        })
    }

    renderLookingFor(lookingForOptions, showAll) {
        const limit = this.state.entryCount
        const filtered = _.take(lookingForOptions, showAll ? lookingForOptions.length : limit)
        const elements = _.map(filtered, (option) => {
            return (
                <Radio className="radio" value={option.value} key={option.value}>{option.label}</Radio>
            )
        })

        return (
            <RadioGroup disabled={this.props.loading} onChange={this.onChangeLookingFor.bind(this)} value={this.state.lookingFor}>
                {elements}
            </RadioGroup>
        )
    }

    renderSkillset(skillsetOptions, showAll) {
        const limit = this.state.entryCount
        const filtered = _.take(skillsetOptions, showAll ? skillsetOptions.length : limit)
        const elements = _.map(filtered, (option) => {
            return (
                <div className="checkbox" key={option.value}>
                    <Checkbox value={option.value} disabled={this.props.loading}>
                        {option.label}
                    </Checkbox>
                </div>
            )
        })

        return (
            <CheckboxGroup onChange={this.onChangeSkillset.bind(this)}>
                {elements}
            </CheckboxGroup>
        )
    }

    renderCategory(categoryOptions, showAll) {
        const limit = this.state.entryCount
        const filtered = _.take(categoryOptions, showAll ? categoryOptions.length : limit)
        const elements = _.map(filtered, (option) => {
            return (
                <div className="checkbox" key={option.value}>
                    <Checkbox value={option.value} disabled={this.props.loading}>
                        {option.label}
                    </Checkbox>
                </div>
            )
        })

        return (
            <CheckboxGroup onChange={this.onChangeDomain.bind(this)}>
                {elements}
            </CheckboxGroup>
        )
    }

    renderCircles(showAll) {
        const limit = this.state.entryCount
        const filtered = _.take(this.props.all_circles, showAll ? this.props.all_circles.length : limit)
        const elements = _.map(filtered, (circle) => {
            return (
                <div className="checkbox" key={circle._id}>
                    <Checkbox value={circle._id} disabled={this.props.loading}>
                        {circle.name}
                    </Checkbox>
                </div>
            )
        })

        return (
            <CheckboxGroup onChange={this.onChangeCircle.bind(this)}>
                { this.props.all_circles_loading
                    ? <Spin/>
                    : elements
                }
            </CheckboxGroup>
        )
    }

    renderLoginOrRegisterModal() {
        return (
            <Modal
                className="project-detail-nobar"
                visible={this.state.showLoginRegisterModal}
                onOk={this.handleLoginRegisterModalOk}
                onCancel={this.handleLoginRegisterModalCancel}
                footer={null}
                width="70%"
            >
                <LoginOrRegisterForm onHideModal={this.hideShowModal()}/>
            </Modal>
        )
    }

    getSkillsetTree(skillsetOptions) {
        const filtered = _.take(skillsetOptions, skillsetOptions.length)
        const elements = _.map(filtered, (option) => {
            return (
                <TreeNode value={option.value} title={option.label} key={option.value}/>
            )
        })
        return elements;
    }

    getCategoryTree(categoryOptions) {
        const filtered = _.take(categoryOptions, categoryOptions.length)
        const elements = _.map(filtered, (option) => {
            return (
                <TreeNode value={option.value} title={option.label} key={option.value}/>
            )
        })
        return elements;
    }

    getCircleTree() {
        const elements = _.map(this.props.all_circles, (option) => {
            return (
                <TreeNode value={option._id} title={option.name} key={option._id}/>
            )
        })
        return elements;
    }

    handleOnFiltersChange(e) {
        const skillset = []
        const domain = []
        for (let item of e) {
            let found = this.getSkillsetOptions().find((option) => item === option.value)
            if (found) {
                skillset.push(found.value)
            }
            found = this.getCategoryOptions().find((option) => item === option.value)
            if (found) {
                domain.push(found.value)
            }
        }
        this.setState({
            filtersTree: e,
            skillset: skillset,
            domain: domain
        }, this.refetch.bind(this))
    }

    getLookingForOptions() {
        return [
            {
                label: I18N.get('developer.search.team'),
                value: 'TEAM'
            },
            {
                label: I18N.get('developer.search.project'),
                value: 'PROJECT'
            },
            {
                label: I18N.get('developer.search.task'),
                value: 'TASK'
            }
        ]
    }

    getSkillsetOptions() {
        return [
            {
                label: 'C++',
                value: SKILLSET_TYPE.CPP
            },
            {
                label: 'JavaScript',
                value: SKILLSET_TYPE.JAVASCRIPT
            },
            {
                label: 'Go',
                value: SKILLSET_TYPE.GO
            },
            {
                label: 'Python',
                value: SKILLSET_TYPE.PYTHON
            },
            {
                label: 'Java',
                value: SKILLSET_TYPE.JAVA
            },
            {
                label: 'Swift',
                value: SKILLSET_TYPE.SWIFT
            }
        ]
    }

    getCategoryOptions() {
        return [
            {
                label: I18N.get('team.spec.authenticity'),
                value: TEAM_TASK_DOMAIN.AUTHENTICITY
            },
            {
                label: I18N.get('team.spec.currency'),
                value: TEAM_TASK_DOMAIN.CURRENCY
            },
            {
                label: I18N.get('team.spec.exchange'),
                value: TEAM_TASK_DOMAIN.EXCHANGE
            },
            {
                label: I18N.get('team.spec.finance'),
                value: TEAM_TASK_DOMAIN.FINANCE
            },
            {
                label: I18N.get('team.spec.gaming'),
                value: TEAM_TASK_DOMAIN.GAMING
            },
            {
                label: I18N.get('team.spec.iot'),
                value: TEAM_TASK_DOMAIN.IOT
            },
            {
                label: I18N.get('team.spec.media'),
                value: TEAM_TASK_DOMAIN.MEDIA
            },
            {
                label: I18N.get('team.spec.social'),
                value: TEAM_TASK_DOMAIN.SOCIAL
            },
            {
                label: I18N.get('team.spec.sovereignty'),
                value: TEAM_TASK_DOMAIN.SOVEREIGNTY
            }
        ]
    }

    getSidebarMenu() {
        const lookingForOptions = this.getLookingForOptions()
        const skillsetOptions = this.getSkillsetOptions()
        const categoryOptions = this.getCategoryOptions()

        return (
            <div>
                <MediaQuery minWidth={MIN_WIDTH_PC}>
                    <Affix offsetTop={15}>
                        <div className="group">
                            <div className="title">{I18N.get('developer.search.lookingFor')}</div>
                            <div className="content">
                                {this.renderLookingFor(lookingForOptions, true)}
                            </div>
                        </div>
                        {this.state.lookingFor !== 'TASK' &&
                            <div className="group">
                                <div className="title">{I18N.get('developer.search.skillset')}</div>
                                <div className="content">
                                    {this.renderSkillset(skillsetOptions, this.state.skillsetShowAllEntries)}
                                    {skillsetOptions.length > this.state.entryCount &&
                                    <div className="showMore" onClick={this.enableSkillsetEntries.bind(this)}>
                                        {
                                            !this.state.skillsetShowAllEntries ? (<span>{I18N.get('developer.search.showMore')}</span>)
                                                : (<span>{I18N.get('developer.search.hide')}</span>)
                                        }
                                    </div>
                                    }
                                </div>
                            </div>
                        }
                        {this.state.lookingFor !== 'TASK' &&
                            <div className="group">
                                <div className="title">{I18N.get('developer.search.category')}</div>
                                <div className="content">
                                    {this.renderCategory(categoryOptions, this.state.categoryShowAllEntries)}
                                    { categoryOptions.length > this.state.entryCount &&
                                    <div className="showMore" onClick={this.enableCategoryEntries.bind(this)}>
                                        {
                                            !this.state.categoryShowAllEntries ? (<span>{I18N.get('developer.search.showMore')}</span>)
                                                : (<span>{I18N.get('developer.search.hide')}</span>)
                                        }
                                    </div>
                                    }
                                </div>
                            </div>
                        }
                        {this.state.lookingFor === 'TASK' &&
                            <div className="group">
                                <div className="title">{I18N.get('developer.search.circle')}</div>
                                <div className="content">
                                    {this.renderCircles(this.state.circlesShowAllEntries)}
                                    <div className="showMore" onClick={this.enableCirclesEntries.bind(this)}>
                                        {
                                            !this.state.circlesShowAllEntries ? (<span>{I18N.get('developer.search.showMore')}</span>)
                                                : (<span>{I18N.get('developer.search.hide')}</span>)
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </Affix>
                </MediaQuery>
                <MediaQuery maxWidth={MAX_WIDTH_MOBILE}>
                    <div className="filter-select-container">
                        <Select className="filter-select" defaultValue={this.state.lookingFor} onChange={this.onChangeLookingForSelect.bind(this)}>
                            <Option value="PROJECT">{I18N.get('developer.search.project')}</Option>
                            <Option value="TEAM">{I18N.get('developer.search.team')}</Option>
                            <Option value="TASK">{I18N.get('developer.search.task')}</Option>
                        </Select>
                    </div>
                    {this.state.lookingFor !== 'TASK' &&
                        <TreeSelect
                            className="filters-tree"
                            showSearch
                            value={this.state.filtersTree}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Filters"
                            allowClear
                            multiple
                            treeDefaultExpandAll
                            treeCheckable={true}
                            onChange={this.handleOnFiltersChange.bind(this)}
                        >
                            <TreeNode value="0" title={I18N.get('developer.search.skillset')} key="0">
                                {this.getSkillsetTree(skillsetOptions)}
                            </TreeNode>
                            <TreeNode value="1" title={I18N.get('developer.search.category')} key="1">
                                {this.getCategoryTree(categoryOptions)}
                            </TreeNode>
                        </TreeSelect>
                    }
                    {this.state.lookingFor === 'TASK' &&
                    <TreeSelect
                        className="filters-tree"
                        showSearch
                        value={this.state.circle}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="Filters"
                        allowClear
                        multiple
                        treeDefaultExpandAll
                        treeCheckable={!this.props.all_circles_loading}
                        onChange={this.onChangeCircle.bind(this)}
                    >
                        <TreeNode icon="" value="0" title={this.props.all_circles_loading ? I18N.get('.loading') : I18N.get('developer.search.circle')} key="0">
                            {this.getCircleTree()}
                        </TreeNode>
                    </TreeSelect>
                    }
                </MediaQuery>
            </div>)
    }

    enableSkillsetEntries() {
        this.setState({
            skillsetShowAllEntries: !this.state.skillsetShowAllEntries
        })
    }

    enableCategoryEntries() {
        this.setState({
            categoryShowAllEntries: !this.state.categoryShowAllEntries
        })
    }

    enableCirclesEntries() {
        this.setState({
            circlesShowAllEntries: !this.state.circlesShowAllEntries
        })
    }

    renderMain() {
        return (
            <div className="c_Search">
                <Row className="d_row">
                    <Col sm={24} md={4} className="admin-left-column wrap-box-user">
                        {this.getSidebarMenu()}
                    </Col>
                    <Col sm={24} md={20} className="admin-right-column wrap-box-user">
                        {this.renderList()}
                    </Col>
                </Row>
                <Modal
                    className="project-detail-nobar"
                    visible={this.state.showProjectModal}
                    onOk={this.handleProjectModalOk}
                    onCancel={this.handleProjectModalCancel}
                    footer={null}
                    width="70%"
                >
                    { this.state.showProjectModal &&
                        <ProjectDetail taskId={this.state.taskDetailId}/>
                    }
                </Modal>
                <Modal
                    className="project-detail-nobar"
                    visible={this.state.showTeamModal}
                    onOk={this.handleTeamModalOk}
                    onCancel={this.handleTeamModalCancel}
                    footer={null}
                    width="70%"
                >
                    { this.state.showTeamModal &&
                        <TeamDetail teamId={this.state.teamDetailId}/>
                    }
                </Modal>
                <Modal
                    className="profile-overview-popup-modal"
                    visible={!!this.state.showUserInfo}
                    onCancel={this.handleCancelProfilePopup.bind(this)}
                    footer={null}>
                    <ProfilePopup showUserInfo={this.state.showUserInfo}></ProfilePopup>
                </Modal>
                {this.renderLoginOrRegisterModal()}
                <Footer/>
            </div>
        )
    }

    ord_render () {
        return this.renderMain()
    }

    getAvatarWithFallback(avatar) {
        return _.isEmpty(avatar)
            ? USER_AVATAR_DEFAULT
            : avatar
    }

    getCarousel(item) {
        const pictures = _.map(item.pictures, (picture, ind) => {
            return (
                <div key={ind}>
                    <img width={188} height={188} alt="logo" src={picture.url} />
                </div>
            )
        })

        if (item.thumbnail) {
            pictures.unshift(
                <div key="main">
                    <img width={188} height={188} alt="logo" src={item.thumbnail} />
                </div>
            )
        }

        return (
            <div className="carousel-wrapper">
                <Carousel autoplay>
                    {pictures}
                </Carousel>
            </div>
        )
    }

    renderList() {
        const entities = this.isLookingForTeam()
            ? this.props.all_teams
            : this.props.all_tasks

        const description_fn = (entity) => {

            return (
                <div>
                    <div className="valign-wrapper">
                        <div className="gap-right pull-left">{I18N.get('project.detail.recruiting')}: </div>
                        <div className="pull-left">
                            {_.isEmpty(entity.recruitedSkillsets) ? (
                                <span className="default-text">{I18N.get('project.detail.recruiting_skills_unknown')}</span>) : (
                                _.map(entity.recruitedSkillsets, (skillset, ind) => <Tag key={ind}>{skillset}</Tag>))}
                        </div>
                    </div>
                    {entity.referenceBid &&
                        <div className="valign-wrapper">
                            <div className="gap-right pull-left">{I18N.get('project.detail.reference_bid')}:</div>
                            <div className="pull-left default-text">
                                <b>{entity.referenceBid} ELA</b>
                            </div>
                        </div>
                    }
                    {entity.applicationDeadline &&
                    <div className="valign-wrapper">
                        <div className="gap-right pull-left">{I18N.get('project.detail.deadline')}:</div>
                        <div className="pull-left default-text">
                            {moment(entity.applicationDeadline).format('MMM D')}
                        </div>
                    </div>
                    }
                </div>
            )
        }

        const data = this.isLookingForTeam()
            ? _.map(entities, (team, id) => {
                return {
                    href: '',
                    title: team.name,
                    pictures: team.pictures && team.pictures.length > 0 ? team.pictures : [{ url: '/assets/images/Elastos_Logo.png' }],
                    description: description_fn(team),
                    content: team.profile.description,
                    owner: team.owner,
                    id: team._id
                }
            })
            : _.map(entities, (task, id) => {
                const applicationDeadline = task.applicationDeadline ? new Date(task.applicationDeadline).getTime() : Date.now();
                return {
                    href: '',
                    title: task.name,
                    bidding: task.bidding,
                    pictures: task.pictures && task.pictures.length > 0 ? task.pictures : [{ url: '/assets/images/Elastos_Logo.png' }],
                    description: description_fn(task),
                    content: task.description,
                    owner: task.createdBy,
                    applicationDeadlinePassed: Date.now() > applicationDeadline,
                    id: task._id
                }
            })

        const clickHandler = !this.props.is_login
            ? this.showLoginRegisterModal
            : (this.isLookingForTeam() ? this.showTeamModal
                : this.showProjectModal)

        return (
            <List loading={this.props.loading} itemLayout='vertical' size='large'
                className="with-right-box" dataSource={data}
                renderItem={item => (
                    <div>
                        <MediaQuery minWidth={MIN_WIDTH_PC}>
                            <List.Item
                                key={item.id}
                                extra={this.getCarousel(item)}
                            >
                                <h3 className="no-margin no-padding one-line brand-color">
                                    <a onClick={clickHandler.bind(this, item.id)}>{item.title}</a>
                                </h3>
                                {item.applicationDeadlinePassed &&
                                <span className="subtitle">
                                    {I18N.get('developer.search.subtitle_prefix')} {I18N.get('developer.search.subtitle_applications')}
                                </span>
                                }
                                <h5 className="no-margin">
                                    {item.description}
                                </h5>
                                <div className="description-content" dangerouslySetInnerHTML={{__html: item.content}}/>
                                <div className="ant-list-item-right-box">
                                    <a className="pull-up" onClick={() => this.setState({ showUserInfo: item.owner })}>
                                        <Avatar size="large" className="pull-right"
                                            src={this.getAvatarWithFallback(item.owner.profile.avatar)}/>
                                        <div className="clearfix"/>
                                        <div>{item.owner.profile.firstName} {item.owner.profile.lastName}</div>
                                    </a>

                                    {this.renderApplyButton(item, clickHandler)}

                                </div>
                            </List.Item>
                        </MediaQuery>
                        <MediaQuery maxWidth={MAX_WIDTH_MOBILE}>
                            <List.Item
                                key={item.id}
                                className="ignore-right-box"
                            >
                                <h3 className="no-margin no-padding one-line brand-color">
                                    <a onClick={clickHandler.bind(this, item.id)}>{item.title}</a>
                                </h3>
                                <h5 className="no-margin">
                                    {item.description}
                                </h5>
                                <div>
                                    <a onClick={() => this.setState({ showUserInfo: item.owner })}>
                                        <span>{item.owner.profile.firstName} {item.owner.profile.lastName}</span>
                                        <Divider type="vertical"/>
                                        <Avatar size="large"
                                            src={this.getAvatarWithFallback(item.owner.profile.avatar)}/>
                                    </a>
                                    <Button onClick={clickHandler.bind(this, item.id)}
                                        type="primary" className="pull-right">{I18N.get('developer.search.apply')}</Button>
                                </div>
                            </List.Item>
                        </MediaQuery>
                    </div>
                )}
            />
        )
    }

    handleCancelProfilePopup() {
        this.setState({
            showUserInfo: null
        })
    }

    // this is also just a view button if the project cannot accept anymore applications
    renderApplyButton(detail, clickHandler) {

        let cssClass = 'primary'

        if (detail.hasApprovedApplication) {
            cssClass = 'default'
        }

        return <div className="pull-down">
            <span></span>
            <Button onClick={clickHandler.bind(this, detail.id)}
                type={cssClass}>
                {detail.hasApprovedApplication ? I18N.get('developer.search.view') : (detail.bidding ? I18N.get('developer.search.submit_bid') : I18N.get('developer.search.apply'))}
            </Button>
        </div>
    }
}
