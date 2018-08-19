import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'
import {
    message,
    Col,
    Row,
    Tag,
    Icon,
    Carousel,
    Avatar,
    Button,
    Spin,
    Select,
    Table,
    Input,
    Form,
    Divider,
    Modal
} from 'antd'
import I18N from '@/I18N'
import { TASK_CANDIDATE_STATUS, TASK_CANDIDATE_TYPE, TEAM_USER_STATUS } from '@/constant'
import Comments from '@/module/common/comments/Container'
import ProjectApplication from '@/module/project/application/Container'
import _ from 'lodash'
import './style.scss'

class C extends BaseComponent {
    ord_states() {
        return {
            showAppModal: false,
            projectCandidateId: null
        }
    }

    componentDidMount() {
        const taskId = this.props.taskId
        this.props.getTaskDetail(taskId)
        this.props.getTeams({
            owner: this.props.currentUserId
        })
    }

    componentWillUnmount() {
        this.props.resetTaskDetail()
        this.props.resetAllTeams()
    }

    isTeamOwner() {
        return this.props.detail.createdBy._id === this.props.currentUserId
    }

    isMember(taskCandidateId) {
        const candidate = _.find(this.props.detail.candidates, { _id: taskCandidateId })
        if (!candidate) {
            return false
        }
        if (candidate.type === TASK_CANDIDATE_TYPE.USER) {
            return candidate.user._id === this.props.currentUserId
        } else if (candidate.type === TASK_CANDIDATE_TYPE.TEAM) {
            return _.find(this.props.ownedTeams, (item) => item._id === candidate.team._id)
        }
    }

    isMemberByUserId(userId) {
        const candidate = _.find(this.props.detail.candidates, (candidate) => {
            if (candidate.type === TASK_CANDIDATE_TYPE.USER) {
                return candidate.user._id === userId
            }
            return false
        })
        if (!candidate) {
            return false
        }
        return this.isMember(candidate._id)
    }

    linkProfileInfo(userId) {
        this.props.history.push(`/member/${userId}`)
    }

    approveUser(taskCandidateId) {
        this.props.acceptCandidate(taskCandidateId);
    }

    disapproveUser(taskCandidateId) {
        this.props.rejectCandidate(taskCandidateId);
    }

    withdrawApplication(taskCandidateId) {
        this.props.withdrawCandidate(taskCandidateId);
    }

    removeUser(taskCandidateId) {
    }

    removeUserByUserId(userId) {
        const candidate = _.find(this.props.candidates, (candidate) => candidate.user._id === userId)
        if (!candidate) {
            return false
        }
        return this.removeUser(candidate._id)
    }

    getUpperLeftBox() {
        const details = this.props.detail;

        let carouselImages = []

        if (details.thumbnail) {
            carouselImages.push(<img src={details.thumbnail} key="main"/>)
        }

        for (let i of details.pictures) {
            carouselImages.push(<img src={i.url} key={i}/>)
        }

        if (carouselImages.length === 0) {
            carouselImages.push(<img src={'/assets/images/Elastos_Logo.png'} key={0} />);
        }

        let domains = []
        for (let i of details.domain) {
            domains.push(<Tag key={i}>{i}</Tag>)
        }

        return (
            <div className="left-container">
                <div className="pictures-container">
                    <Carousel autoplay>
                        {carouselImages}
                    </Carousel>
                </div>
                <div className="domains-container">
                    {domains}
                </div>
            </div>
        )
    }

    getUpperRightBox() {
        const detail = this.props.detail
        const name = detail.name || ''
        const leaderName = detail.createdBy.profile
            ? (detail.createdBy.profile.firstName + ' ' + detail.createdBy.profile.lastName)
            : ''
        const deadline = detail.date || ''
        const progress = detail.progress || ''
        const teamSize = detail.candidateCompleted.length || ''
        const reward = detail.reward.isUsd ? detail.reward.usd + ' USD' : (detail.reward.ela / 1000) + ' ELA'
        const description = detail.descBreakdown || detail.description || ''
        const leaderImage = detail.createdBy.profile.avatar || ''

        const recruiting_el = _.isEmpty(detail.recruitedSkillsets)
            ? I18N.get('project.detail.not_recruiting')
            : (
                <div>
                    <span className="gap-right">{I18N.get('project.detail.recruiting')}: </span>
                    <span>
                        {_.map(detail.recruitedSkillsets, (skillset, ind) => <Tag key={ind}>{skillset}</Tag>)}
                    </span>
                </div>
            )

        return (
            <div>
                <div className="title">
                    <span>{name}</span>
                </div>
                <a className="leader" onClick={this.linkProfileInfo.bind(this, detail.createdBy._id)}>
                    <Avatar size="large" src={leaderImage} />
                    <span className="ellipsis">{leaderName}</span>
                </a>
                <div className="content">
                    <div className="entry">{I18N.get('project.detail.deadline')}: {deadline}</div>
                    <div className="entry">{I18N.get('project.detail.progress')}: {progress}</div>
                    <div className="entry">{I18N.get('project.detail.team_size')}: {teamSize}</div>
                    <div className="reward">{reward}</div>
                </div>
                <div class="description-box">
                    <hr className="divider"/>
                    <div className="description-title">{recruiting_el}</div>
                    <hr className="divider"/>
                    <div className="description-content">{description}</div>
                </div>
            </div>
        )
    }

    getCurrentContributors() {
        const detail = this.props.detail
        const applicants = _.filter(detail.candidates, { status: TASK_CANDIDATE_STATUS.APPROVED });
        applicants.unshift({
            _id: 'such_fake_id',
            user: this.props.detail.createdBy,
            type: TASK_CANDIDATE_TYPE.USER
        })
        const columns = [{
            title: 'Name',
            key: 'name',
            render: candidate => {
                return (
                    <div>
                        {(candidate.type === TASK_CANDIDATE_TYPE.USER) &&
                        <div>
                            <a onClick={this.linkProfileInfo.bind(this, candidate.user._id)}>
                                <Avatar className={'gap-right ' + (candidate._id === 'such_fake_id' ? 'avatar-leader' : 'avatar-member')}
                                    src={candidate.user.profile.avatar}/>
                                {candidate.user.profile.firstName + ' ' + candidate.user.profile.lastName}
                            </a>
                        </div>
                        }
                        {(candidate.type === TASK_CANDIDATE_TYPE.TEAM) &&
                        <div>
                            <a onClick={this.linkProfileInfo.bind(this, candidate.team._id)}>
                                <Avatar className="gap-right" src={!_.isEmpty(candidate.team.pictures) && candidate.team.pictures[0].url} />
                                {candidate.team.name}
                            </a>
                        </div>
                        }
                    </div>)
            }
        }, {
            title: 'Action',
            key: 'action',
            render: candidate => {
                return (
                    <div>
                        {this.isTeamOwner() && candidate._id !== 'such_fake_id' &&
                        <div className="text-right">
                            <a onClick={this.removeUser.bind(this, candidate._id)}>{I18N.get('project.detail.remove')}</a>
                        </div>
                        }
                    </div>
                )
            }
        }]

        return (
            <Table
                className="no-borders headerless"
                dataSource={applicants}
                columns={columns}
                bordered={false}
                pagination={false}
                rowKey="_id"
            />
        )
    }

    getCurrentApplicants() {
        const detail = this.props.detail
        const applicants = _.filter(detail.candidates, { status: TASK_CANDIDATE_STATUS.PENDING });
        const columns = [{
            title: 'Name',
            key: 'user',
            render: candidate => {
                return (
                    <div>
                        {(candidate.type === TASK_CANDIDATE_TYPE.USER) &&
                        <div>
                            <a onClick={this.linkProfileInfo.bind(this, candidate.user._id)}>
                                <Avatar className="gap-right" src={candidate.user.profile.avatar} />
                                {candidate.user.profile.firstName + ' ' + candidate.user.profile.lastName}
                            </a>
                        </div>
                        }
                        {(candidate.type === TASK_CANDIDATE_TYPE.TEAM) &&
                        <div>
                            <a onClick={this.linkProfileInfo.bind(this, candidate.team._id)}>
                                <Avatar className="gap-right" src={!_.isEmpty(candidate.team.pictures) && candidate.team.pictures[0].url} />
                                {candidate.team.name}
                            </a>
                        </div>
                        }
                    </div>)
            }
        }, {
            title: 'Action',
            key: 'action',
            render: candidate => {
                return (
                    <div className="text-right">
                        {this.props.page === 'LEADER' && (this.isTeamOwner() || this.isMember(candidate._id)) && (
                            <span>
                                <a onClick={this.showAppModal.bind(this, candidate._id)}>{I18N.get('project.detail.view')}</a>
                                <Divider type="vertical"/>
                            </span>
                        )}
                        {this.isMember(candidate._id) && (
                            <span>
                                <a onClick={this.withdrawApplication.bind(this, candidate._id)}>{I18N.get('project.detail.withdraw_application')}</a>
                                {this.isMember(candidate._id) && <Divider type="vertical"/>}
                            </span>)
                        }
                        {this.isTeamOwner() &&
                        <span className="inline-block">
                            <a onClick={this.approveUser.bind(this, candidate._id)}>{I18N.get('project.detail.approve')}</a>
                            <Divider type="vertical"/>
                            <a onClick={this.disapproveUser.bind(this, candidate._id)}>{I18N.get('project.detail.disapprove')}</a>
                        </span>
                        }
                    </div>
                )
            }
        }]

        return (
            <Table
                className="no-borders headerless"
                dataSource={applicants}
                columns={columns}
                bordered={false}
                pagination={false}
                rowKey="_id">
            </Table>
        )
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const isSelf = (values.applicant === '$me')
                const userId = isSelf && this.props.currentUserId
                const teamId = !isSelf && values.applicant

                this.props.applyToTask(this.props.taskId, userId, teamId, values.applyMsg)
                    .then(() => {
                        this.setState({ applying: false })
                        message.success('Application sent. Thank you!')
                    })
            }
        })
    }

    getApplicationForm() {
        const {getFieldDecorator} = this.props.form
        const applyMsg_fn = getFieldDecorator('applyMsg', {
            rules: [{required: true, message: 'Application is required'}],
            initialValue: ''
        })
        const applyMsg_el = (
            <Input.TextArea rows={8} className="team-application" disabled={this.props.loading}
                placeholder="Tell us why you want to join."/>
        )
        const applyMsgPanel = applyMsg_fn(applyMsg_el)

        const applicant_fn = getFieldDecorator('applicant', {
            rules: [],
            initialValue: '$me'
        })
        const applicant_el = (
            <Select className="team-selector pull-right" disabled={this.props.loading}
                // https://github.com/vazco/uniforms/issues/228
                getPopupContainer={x => {
                    while (x && x.tagName.toLowerCase() !== 'form') {
                        x = x.parentElement;
                    }

                    return x;
                }}>
                <Select.Option value="$me">
                    Apply as myself
                    <Avatar size="small" src={this.props.currentUserAvatar} className="pull-right"/>
                </Select.Option>
                {_.map(this.props.ownedTeams, (team) =>
                    <Select.Option key={team._id} value={team._id}>
                        Apply with {team.name}
                        {!_.isEmpty(team.pictures)
                            ? <Avatar size="small" src={team.pictures[0].thumbUrl} className="pull-right"/>
                            : <Avatar size="small" type="user" className="pull-right"/>
                        }
                    </Select.Option>
                )}
            </Select>
        )
        const applicantPanel = applicant_fn(applicant_el)

        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="application-form">
                <Form.Item className="no-margin">
                    {applyMsgPanel}
                </Form.Item>
                <Button disabled={this.props.loading} className="d_btn pull-left" onClick={() => this.setState({ applying: false })}>
                    Cancel
                </Button>
                <Button disabled={this.props.loading} className="d_btn pull-right" type="primary" htmlType="submit">
                    Apply
                </Button>
                <Form.Item className="pull-right">
                    {applicantPanel}
                </Form.Item>
                <div class="clearfix"/>
            </Form>
        )
    }

    canComment() {
        const isTaskCandidate = _.find(this.props.detail.candidates, (candidate) => {
            return candidate.user && candidate.user._id === this.props.currentUserId &&
                candidate.status === TASK_CANDIDATE_STATUS.APPROVED
        })

        const allCandidateTeamIds = _.compact(_.map(this.props.detail.candidates, (candidate) => {
            return candidate.team && candidate.team._id
        }))

        const currentUserTeamIds = _.map(this.props.ownedTeams, '_id')
        const belongsToMemberTeam = !_.isEmpty(_.intersection(allCandidateTeamIds, currentUserTeamIds))
        const isTaskOwner = this.props.detail.createdBy && (this.props.detail.createdBy._id === this.props.currentUserId)

        return isTaskCandidate || belongsToMemberTeam || isTaskOwner
    }

    ord_render () {
        const loading = _.isEmpty(this.props.detail)
        const isTaskOwner = this.props.detail.createdBy && (this.props.detail.createdBy._id === this.props.currentUserId)
        const isMember = this.isMemberByUserId(this.props.currentUserId)
        return (
            <div className="c_Project c_Detail">
                { loading
                    ? (
                        <div className="full-width full-height valign-wrapper halign-wrapper">
                            <Spin className="loading-spinner" />
                        </div>
                    )
                    : (
                        <div>
                            <Row className="top-section">
                                <Col xs={24} sm={24} md={8} className="col-left">
                                    {this.getUpperLeftBox()}
                                </Col>

                                <Col xs={24} sm={24} md={16} className="col-right">
                                    {this.getUpperRightBox()}
                                </Col>
                            </Row>

                            {this.props.page !== 'LEADER' && !isTaskOwner &&
                                <Row className="actions">
                                    <Button type="primary" onClick={() => this.setState({ applying: true })}>
                                        {I18N.get('project.detail.popup.join_project')}
                                    </Button>
                                </Row>
                            }

                            {this.state.applying && this.getApplicationForm()}

                            {!this.state.applying &&
                                <Row className="contributors">
                                    { isMember &&
                                        <Button onClick={this.removeUserByUserId.bind(this, this.props.currentUserId)} className="leave-button">{I18N.get('project.detail.leave')}</Button>
                                    }
                                    <h3 className="no-margin align-left">{I18N.get('project.detail.current_contributors')}</h3>
                                    {this.getCurrentContributors()}
                                </Row>
                            }

                            {!this.state.applying &&
                                <Row className="applications">
                                    <h3 className="no-margin">{I18N.get('project.detail.pending_applications')}</h3>
                                    {this.getCurrentApplicants()}
                                </Row>
                            }

                            {this.props.page === 'LEADER' && this.canComment() &&
                                <Row>
                                    <Comments type="task" canPost={true} canSubscribe={!isTaskOwner} model={this.props.taskId}/>
                                </Row>
                            }
                        </div>
                    )
                }
                <Modal
                    className="project-detail-nobar"
                    visible={this.state.showAppModal}
                    onOk={this.handleAppModalOk}
                    onCancel={this.handleAppModalCancel}
                    footer={null}
                    width="70%"
                >
                    <ProjectApplication applicantId={this.state.projectCandidateId}/>
                </Modal>
            </div>
        )
    }

    showAppModal = (projectCandidateId) => {
        this.setState({
            showAppModal: true,
            projectCandidateId
        })
    }

    handleAppModalOk = (e) => {
        this.setState({
            showAppModal: false
        })
    }

    handleAppModalCancel = (e) => {
        this.setState({
            showAppModal: false
        })
    }
}

export default Form.create()(C)
