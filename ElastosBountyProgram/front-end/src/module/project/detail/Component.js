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
    Modal,
    InputNumber
} from 'antd'
import I18N from '@/I18N'
import { TASK_CANDIDATE_STATUS, TASK_CANDIDATE_TYPE, TEAM_USER_STATUS, TASK_STATUS } from '@/constant'
import Comments from '@/module/common/comments/Container'
import ProjectApplication from '@/module/project/application/Container'
import _ from 'lodash'
import './style.scss'

/*
 * Project Pop-up UI
 *
 */
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

        // This sets both user.teams and teams.all_teams
        this.props.getUserTeams(this.props.currentUserId)


    }

    componentWillUnmount() {
        // this may cause issues if a parent is checking the loading field
        this.props.resetTaskDetail()
        this.props.resetAllTeams()
    }

    isTaskOwner() {
        return this.props.detail.createdBy._id === this.props.currentUserId
    }

    // TODO: Refactor all these, lots of redundancy with the REJECTED flag
    /*
     * member = applicant
     */

    /**
     * Check if the logged in user is an applicant
     *
     * They can either be an applicant themselves or one or more of their team has applied
     */
    /*
    getApplications(taskCandidateId) {

        const candidates = _.filter(this.props.detail.candidates, (candidate) => {

            if (candidate.status === TASK_CANDIDATE_STATUS.REJECTED) {
                return false
            }

            if (candidate.type === TASK_CANDIDATE_TYPE.USER) {
                return candidate._id === taskCandidateId

            } else if (candidate.type === TASK_CANDIDATE_TYPE.TEAM) {
                return _.find(this.props.ownedTeams, (item) => item._id === candidate.team._id && candidate.status !== TASK_CANDIDATE_STATUS.REJECTED)
            }

            return false
        })

        // debugger

        return candidates
    }

    isMember(taskCandidateId) {
        return !!this.getApplications(taskCandidateId).length
    }

    isMemberByUserId(userId) {
        const candidate = _.find(this.props.detail.candidates, (candidate) => {
            if (candidate.type === TASK_CANDIDATE_TYPE.USER) {
                return candidate.user._id === userId && candidate.status !== TASK_CANDIDATE_STATUS.REJECTED
            }
            return false
        })
        if (!candidate) {
            return false
        }
        return this.isMember(candidate._id)
    }

    getMemberBid(userId) {
        const candidate = _.find(this.props.detail.candidates, (candidate) => {
            if (candidate.type === TASK_CANDIDATE_TYPE.USER) {
                return candidate.user._id === userId && candidate.status !== TASK_CANDIDATE_STATUS.REJECTED
            }
            return false
        })

        if (candidate) {
            return candidate.bid
        }
    }
    */

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
        this.props.rejectCandidate(taskCandidateId)
    }

    removeUserByUserId(userId) {
        const candidate = _.find(this.props.detail.candidates, (candidate) => candidate.user._id === userId && candidate.status !== TASK_CANDIDATE_STATUS.REJECTED)
        if (!candidate) {
            return false
        }
        return this.withdrawApplication(candidate._id)
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
        const deadline = detail.applicationDeadline ? moment(detail.applicationDeadline).format('MMM D') : <span className="no-data">no deadline</span>

        const reward = detail.bidding
            ? (detail.status === TASK_STATUS.APPROVED ? I18N.get('project.detail.bidding_closed') : I18N.get('project.detail.bidding'))
            : detail.reward.isUsd ? detail.reward.usd + ' USD' : (detail.reward.ela / 1000) + ' ELA'

        const leaderImage = detail.createdBy.profile.avatar || ''

        const recruiting_el = (
            <div>
                <span className="gap-right">{I18N.get('project.detail.recruiting')}: </span>
                <span>
                    {_.isEmpty(detail.recruitedSkillsets) ? (
                        <span>{I18N.get('project.detail.recruiting_skills_unknown')}</span>) : (
                        _.map(detail.recruitedSkillsets, (skillset, ind) => <Tag key={ind}>{skillset}</Tag>))}
                </span>
            </div>
        )

        return (
            <div>
                <div className="title">
                    <span>{name}</span>
                </div>
                <a className="leader" onClick={this.linkProfileInfo.bind(this, detail.createdBy._id)}>
                    <Avatar size="large" src={leaderImage} /> &nbsp;
                    <span className="ellipsis">{leaderName}</span>
                </a>
                <div className="content">
                    {/* Application Deadline */}
                    <div className="entry">{I18N.get('project.detail.deadline')}: {deadline}</div>

                    <div className="reward">
                        {reward}
                    </div>
                </div>
                <div class="description-box">
                    <hr className="divider"/>
                    <div className="description-title">{recruiting_el}</div>
                    <hr className="divider"/>
                    <div className="description-content">{detail.description || ''}</div>
                    <div className="description-content">{detail.descBreakdown || ''}</div>
                </div>
            </div>
        )
    }

    getCurrentContributorsData() {
        const detail = this.props.detail
        return _.filter(detail.candidates, { status: TASK_CANDIDATE_STATUS.APPROVED });
    }

    getPendingCandidates() {
        const detail = this.props.detail
        return _.filter(detail.candidates, { status: TASK_CANDIDATE_STATUS.PENDING });
    }

    /*
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
            render: (candidate) => {
                return (
                    <div className="text-right">
                        {this.props.detail.bidding && <span>
                            Bid: {candidate.bid} ELA
                            <Divider type="vertical"/>
                        </span>}
                        {(this.props.page === 'ADMIN' || this.isTaskOwner() || this.isMember(candidate._id)) && (
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
                        {this.isTaskOwner() &&
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
    */

    /**
     * This is the application submit
     */
    handleSubmit(e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const isSelf = (values.applicant === '$me')
                const userId = isSelf && this.props.currentUserId
                const teamId = !isSelf && values.applicant

                this.props.applyToTask(this.props.taskId, userId, teamId, values.applyMsg, null, null, values.bid)
                    .then(() => {
                        this.setState({ applying: false })
                        message.success('Application sent. Thank you!')
                    })
            }
        })
    }

    // break from convention, this.props.detail is the task
    getApplicationForm() {

        const {getFieldDecorator} = this.props.form
        const applyMsg_fn = getFieldDecorator('applyMsg', {
            rules: [{required: true, message: 'Application is required'}],
            initialValue: ''
        })
        const applyMsg_el = (
            <Input.TextArea rows={8} className="team-application" disabled={this.props.loading}
                            placeholder={this.props.detail.bidding ? I18N.get('project.detail.tell_us_why_bid') : I18N.get('project.detail.tell_us_why_join')}/>
        )
        const applyMsgPanel = applyMsg_fn(applyMsg_el)

        const bid_fn = getFieldDecorator('bid', {
            rules: [{required: true, message: 'Bid is required'}],
            initialValue: 0
        })

        const bid_el = (
            <InputNumber disabled={this.props.loading}/>
        )
        const bid = bid_fn(bid_el)

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
                { this.props.detail.bidding &&
                <div>
                    <Form.Item className="no-margin pull-right">
                        <div>
                            <span>Bid (ELA): </span>
                            {bid}
                        </div>
                    </Form.Item>
                    <div className="clearfix"/>
                </div>
                }
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

    ord_render() {
        const loading = _.isEmpty(this.props.detail)
        const isTaskOwner = this.props.detail.createdBy && (this.props.detail.createdBy._id === this.props.currentUserId)
        // const isMember = this.isMemberByUserId(this.props.currentUserId)

        return (
            <div className="c_Project c_Detail">
                { loading
                    ? (
                        <div className="full-width full-height valign-wrapper halign-wrapper">
                            <Spin className="loading-spinner" />
                        </div>
                    )
                    : (
                        <div style={{paddingBottom: '150px'}}>
                            <Row className="top-section">
                                <Col xs={24} sm={24} md={8} className="col-left">
                                    {this.getUpperLeftBox()}
                                </Col>

                                <Col xs={24} sm={24} md={16} className="col-right">
                                    {this.getUpperRightBox()}
                                </Col>
                            </Row>

                            {/*
                            *******************************************************************************************************************
                            * Apply Button
                            * - this may be unintuitive but we should always show the button, you can always apply as a team or user
                            * unless you've exhausted all the teams, but even then we can inform the user of this in a better way than hiding
                            *******************************************************************************************************************
                            */}
                            {this.props.page !== 'LEADER' && !isTaskOwner &&
                            <Row className="actions">
                                <Button type="primary" onClick={() => this.setState({ applying: true })}>
                                    {this.props.detail.bidding ? I18N.get('project.detail.popup.bid_project') : I18N.get('project.detail.popup.join_project')}
                                </Button>
                            </Row>
                            }

                            {/*
                            *******************************************************************************************************************
                            * Applying Form
                            *******************************************************************************************************************
                            */}
                            {this.state.applying && this.getApplicationForm()}

                            {/*
                            *******************************************************************************************************************
                            * Approved Applicants (might not be necessary except for admin/leader)
                            *******************************************************************************************************************
                            */}
                            {(!this.state.applying && this.getCurrentContributorsData().length) ?
                                <Row className="contributors">
                                    {/* For a bidding task you cannot leave after the task is APPROVED */}
                                    {(this.props.detail.bidding && (this.props.detail.status === TASK_STATUS.CREATED || this.props.detail.status === TASK_STATUS.PENDING)) &&
                                    <Button onClick={this.removeUserByUserId.bind(this, this.props.currentUserId)} className="leave-button">
                                        {this.props.detail.bidding ?
                                            `${I18N.get('project.detail.you_bid')} ${this.getMemberBid(this.props.currentUserId)} ELA - ${I18N.get('project.detail.leave_bid')}` :
                                            I18N.get('project.detail.leave')}
                                    </Button>
                                    }
                                    <h3 className="no-margin align-left">{I18N.get('project.detail.current_contributors')}</h3>
                                    {this.getCurrentContributors()}
                                </Row> : ''
                            }

                            {/*
                            *******************************************************************************************************************
                            * Pending Bids / Applications
                            *******************************************************************************************************************
                            */}
                            {!this.state.applying && this.renderPendingCandidates()}

                            {/*
                            *******************************************************************************************************************
                            * Comments
                            * - not enabled for bidding projects to minimize confusion in a closed bid
                            *******************************************************************************************************************
                            */}
                            {!this.props.detail.bidding && (this.props.page === 'LEADER' || this.props.page === 'ADMIN') && this.canComment() &&
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

    /**
     * Render pending bids or applications
     *
     * BIDDING
     *
     * For Admins - only admins can create tasks/projects for bidding
     * - they can see all applications (user/team), we assume they are never a bidder
     *
     * For everyone else they can only see their own bids and the total number of bids
     *
     *
     * PROJECT
     *
     * We can see other people who applied
     */
    renderPendingCandidates() {

        const currentUserId = this.props.currentUserId
        const detail = this.props.detail

        let pendingCandidates = this.getPendingCandidates()
        let pendingCandidatesCnt = pendingCandidates.length

        // only show current user's bids
        if (!this.props.is_admin) {
            pendingCandidates = _.filter(pendingCandidates, (candidate) => {
                if (candidate.type === TASK_CANDIDATE_TYPE.USER && candidate.user._id === currentUserId) {
                    return true

                }

                if (candidate.type === TASK_CANDIDATE_TYPE.TEAM && this.loggedInUserBelongsToCandidate(candidate)) {
                    // here we make the assumption that any member of a team can view the team's bid
                    return true
                }
            })
        }

        let title = ''
        if (this.props.detail.bidding) {
            if (this.props.is_admin) {
                title = I18N.get('project.detail.pending_bids')
            } else {
                title = I18N.get('project.detail.your_bids')
            }
        } else {
            title = I18N.get('project.detail.pending_applications')
        }

        return <Row className="applications">
            {/* Title */}
            <h3 className="no-margin">
                {title}
            </h3>

            {pendingCandidates.length ? this.renderCandidates(pendingCandidates) : `There are currently ${pendingCandidatesCnt} bids`}
        </Row>
    }

    renderCandidates(candidates) {

        const columns = [{
            title: 'Name',
            key: 'name',
            render: (candidate) => {
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
            render: (candidate) => {
                return (
                    <div className="text-right">
                        {this.props.detail.bidding && <span>
                            Bid: {candidate.bid} ELA
                        </span>}
                        {(this.props.page === 'ADMIN' || this.isTaskOwner() || this.loggedInUserBelongsToCandidate(candidate)) && (
                            <span>
                                <Divider type="vertical"/>
                                <a onClick={this.showAppModal.bind(this, candidate._id)}>{I18N.get('project.detail.view')}</a>
                            </span>
                        )}
                        {this.loggedInUserOwnerOfCandidate(candidate) && (
                            <span>
                                <Divider type="vertical"/>
                                <a onClick={this.withdrawApplication.bind(this, candidate._id)}>{I18N.get('project.detail.withdraw_application')}</a>
                            </span>)
                        }
                        {this.isTaskOwner() &&
                        <span className="inline-block">
                            <Divider type="vertical"/>
                            <a onClick={this.approveUser.bind(this, candidate._id)}>{I18N.get('project.detail.approve')}</a>
                            <Divider type="vertical"/>
                            <a onClick={this.disapproveUser.bind(this, candidate._id)}>{I18N.get('project.detail.disapprove')}</a>
                        </span>
                        }
                    </div>
                )
                /*
                return (
                    <div>
                        {this.isTaskOwner() && !this.props.detail.bidding &&
                        <div className="text-right">
                            <a onClick={this.removeUser.bind(this, candidate._id)}>{I18N.get('project.detail.remove')}</a>
                        </div>
                        }
                    </div>
                )
                */
            }
        }]

        return (
            <Table
                className="no-borders headerless"
                dataSource={candidates}
                columns={columns}
                bordered={false}
                pagination={false}
                rowKey="_id"
            />
        )
    }

    /*
    ****************************************************************************************************************
    * Helpers
    ****************************************************************************************************************
     */
    isUnapproved() {
        return (this.props.detail.status === TASK_STATUS.CREATED || this.props.detail.status === TASK_STATUS.PENDING)
    }

    loggedInUserBelongsToCandidate(candidate) {
        const loggedInUserId = this.props.currentUserId
        if (candidate.type === TASK_CANDIDATE_TYPE.USER && candidate.user._id === loggedInUserId) {
            return true
        }

        if (candidate.type === TASK_CANDIDATE_TYPE.TEAM && _.find(candidate.team.members, {user: loggedInUserId})) {
            return true
        }
    }

    /**
     * Is the logged in user the passed in candidate
     * or the owner of the team
     *
     * @param candidate
     * @return Boolean
     */
    loggedInUserOwnerOfCandidate(candidate) {
        const loggedInUserId = this.props.currentUserId
        if (candidate.type === TASK_CANDIDATE_TYPE.USER && candidate.user._id === loggedInUserId) {
            return true
        }

        if (candidate.type === TASK_CANDIDATE_TYPE.TEAM && candidate.team.owner._id === loggedInUserId){
            return true
        }
    }

    /*
    ****************************************************************************************************************
    * Modals
    ****************************************************************************************************************
     */
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
