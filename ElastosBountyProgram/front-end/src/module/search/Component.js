import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import {
    Col, Row, Icon, Input, Button, List, Checkbox, Radio,
    Carousel, Modal, Avatar, Affix, Tag, TreeSelect, Switch, Divider
} from 'antd'
import _ from 'lodash'
import './style.scss'
import {SKILLSET_TYPE, TEAM_TASK_DOMAIN, TASK_CANDIDATE_STATUS, TEAM_STATUS} from '@/constant'
import ProjectDetail from '@/module/project/detail/Container'
import TeamDetail from '@/module/team/detail/Container'
import LoginOrRegisterForm from '@/module/form/LoginOrRegisterForm/Container'
import Footer from '@/module/layout/Footer/Container'
import MediaQuery from 'react-responsive'
import {MAX_WIDTH_MOBILE, MIN_WIDTH_PC} from '@/config/constant'
import I18N from '@/I18N'
import moment from 'moment'

const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const TreeNode = TreeSelect.TreeNode;

export default class extends BaseComponent {

    componentDidMount() {
        this.refetch()
    }

    componentWillUnmount() {
        this.props.resetTeams()
        this.props.resetTasks()
    }

    ord_states() {
        return {
            lookingFor: this.props.preselect || 'TEAM',
            skillset: [],
            domain: [],
            entryCount: 3,
            skillsetShowAllEntries: false,
            categoryShowAllEntries: false,
            showProjectModal: false,
            showTeamModal: false,
            showLoginRegisterModal: false,
            taskDetailId: 0,
            teamDetailId: 0,
            showMobile: false,
            filtersTree: ['TEAM']
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

        return query
    }

    refetch() {
        const query = this.getQuery()
        const getter = this.isLookingForTeam()
            ? this.props.getTeams
            : this.props.getTasks

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

    onChangeLookingForSwitch(value) {
        this.setState({
            lookingFor: value ? 'TEAM' : 'PROJECT'
        }, this.refetch.bind(this))
    }

    showProjectModal = (id) => {
        this.setState({
            showProjectModal: true,
            taskDetailId: id
        })
    }

    showTeamModal = (id) => {
        this.setState({
            showTeamModal: true,
            teamDetailId: id
        })
    }

    showLoginRegisterModal = () => {
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
            <RadioGroup onChange={this.onChangeLookingFor.bind(this)} value={this.state.lookingFor}>
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
                    <Checkbox value={option.value}>
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
                    <Checkbox value={option.value}>
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
        const lookingForElement = this.renderLookingFor(lookingForOptions, true)
        const skillsetElement = this.renderSkillset(skillsetOptions, this.state.skillsetShowAllEntries)
        const categoryElement = this.renderCategory(categoryOptions, this.state.categoryShowAllEntries)
        const skillsetElementTree = this.getSkillsetTree(skillsetOptions)
        const categoryElementTree = this.getCategoryTree(categoryOptions)
        return (
            <div>
                <MediaQuery minWidth={MIN_WIDTH_PC}>
                    <Affix offsetTop={15}>
                        <Input.Search placeholder={I18N.get('developer.search.search.placeholder')}/>
                        <div className="group">
                            <div className="title">{I18N.get('developer.search.lookingFor')}</div>
                            <div className="content">
                                {lookingForElement}
                            </div>
                        </div>
                        <div className="group">
                            <div className="title">{I18N.get('developer.search.skillset')}</div>
                            <div className="content">
                                {skillsetElement}
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
                        <div className="group">
                            <div className="title">{I18N.get('developer.search.category')}</div>
                            <div className="content">
                                {categoryElement}
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
                    </Affix>
                </MediaQuery>
                <MediaQuery maxWidth={MAX_WIDTH_MOBILE}>
                    <div className="filter-switch">
                        <Switch defaultChecked onChange={this.onChangeLookingForSwitch.bind(this)} />
                        {this.state.lookingFor === lookingForOptions[0].value &&
                        <span className="label">{lookingForOptions[0].label}</span>
                        }
                        {this.state.lookingFor === lookingForOptions[1].value &&
                        <span className="label">{lookingForOptions[1].label}</span>
                        }
                    </div>
                    <TreeSelect
                        className="filters-tree"
                        showSearch
                        style={{ width: 300 }}
                        value={this.state.filtersTree}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="Filters"
                        allowClear
                        multiple
                        treeDefaultExpandAll
                        treeCheckable={true}
                        onChange={this.handleOnFiltersChange.bind(this)}
                    >
                        <TreeNode value="0" title="Skillset" key="0">
                            {skillsetElementTree}
                        </TreeNode>
                        <TreeNode value="1" title="Category" key="1">
                            {categoryElementTree}
                        </TreeNode>
                    </TreeSelect>
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
            ? '/assets/images/Elastos_Logo.png'
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
                    id: team._id,
                    status: team.status,
                    isTeamOwner: this.props.current_user_id === team.owner._id
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
                                    <span className={item.status == TEAM_STATUS.ACTIVE ? 'team-status-active' : 'team-status-close'}>
                                        {item.status == TEAM_STATUS.ACTIVE ? I18N.get('team.detail.recuriting') : I18N.get('team.detail.not_recruiting')}</span>
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
                                    <a className="pull-up" onClick={this.linkUserDetail.bind(this, item.owner)}>
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
                                    <span className={item.status == TEAM_STATUS.ACTIVE ? 'team-status-active' : 'team-status-close'}>
                                        {item.status == TEAM_STATUS.ACTIVE ? I18N.get('team.detail.recuriting') : I18N.get('team.detail.not_recruiting')}</span>
                                </h3>
                                <h5 className="no-margin">
                                    {item.description}
                                </h5>
                                <div>
                                    <a onClick={this.linkUserDetail.bind(this, item.owner)}>
                                        <span>{item.owner.profile.firstName} {item.owner.profile.lastName}</span>
                                        <Divider type="vertical"/>
                                        <Avatar size="large"
                                            src={this.getAvatarWithFallback(item.owner.profile.avatar)}/>
                                    </a>

                                    {this.renderApplyButton(item, clickHandler)}
                                    
                                </div>
                            </List.Item>
                        </MediaQuery>
                    </div>
                )}
            />
        )
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
                {(detail.hasApprovedApplication || detail.status == TEAM_STATUS.CLOSED || detail.isTeamOwner) ? I18N.get('developer.search.view') : (detail.bidding ? I18N.get('developer.search.submit_bid') : I18N.get('developer.search.apply'))}
            </Button>
        </div>
    }

    linkUserDetail(user) {
        this.props.history.push(`/member/${user._id}`)
    }
}
