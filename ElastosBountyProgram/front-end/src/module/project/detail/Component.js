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
    InputNumber,
    Popover
} from 'antd'
import I18N from '@/I18N'
import { TASK_CANDIDATE_STATUS, TASK_CANDIDATE_TYPE, TEAM_USER_STATUS,
    TASK_STATUS, USER_AVATAR_DEFAULT } from '@/constant'
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
        this.props.getTeams({ owner: this.props.currentUserId })
    }

    componentWillUnmount() {
        this.props.resetTaskDetail()
    }

    isTaskOwner() {
        return this.props.task.createdBy._id === this.props.currentUserId
    }

    linkProfileInfo(userId) {
        window.open(`/member/${userId}`)
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
        const candidate = _.find(this.props.task.candidates, (candidate) =>
            candidate.user._id === userId && candidate.status !== TASK_CANDIDATE_STATUS.REJECTED)
        if (!candidate) {
            return false
        }
        return this.withdrawApplication(candidate._id)
    }

    getImageCarousel() {
        const IMAGE_SIZE = 150

        const details = this.props.task;
        const carouselImages = []

        if (details.thumbnail) {
            carouselImages.push(<img width={IMAGE_SIZE} height={IMAGE_SIZE}
                src={details.thumbnail} key="main"/>)
        }

        for (let i of details.pictures) {
            carouselImages.push(<img width={IMAGE_SIZE} height={IMAGE_SIZE}
                src={i.url} key={i}/>)
        }

        if (carouselImages.length === 0) {
            carouselImages.push(<img width={IMAGE_SIZE} height={IMAGE_SIZE}
                src={'/assets/images/Group_1685.12.svg'} key={0} />);
        }

        return (
            <div className="carousel-container">
                <div className="pictures-container">
                    <Carousel autoplay>
                        {carouselImages}
                    </Carousel>
                </div>
            </div>
        )
    }

    getCurrentContributorsData() {
        const detail = this.props.task
        return _.filter(detail.candidates, { status: TASK_CANDIDATE_STATUS.APPROVED });
    }

    getPendingCandidates() {
        const detail = this.props.task
        return _.filter(detail.candidates, { status: TASK_CANDIDATE_STATUS.PENDING });
    }

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

                if (this.props.task.bidding && !values.bid) {
                    message.error('bid is required')
                    return
                }

                this.props.applyToTask(this.props.taskId, userId, teamId,
                    values.applyMsg, null, null, values.bid)
                    .then(() => {
                        this.setState({ applying: false })
                        message.success('Application sent. Thank you!')
                    })
            }
        })
    }

    canApply() {
        return !this.hasAppliedBySelf() ||
            _.some(this.props.ownedTeams, (team) => !this.hasAppliedByTeam(team))
    }

    getApplicationForm() {
        const {getFieldDecorator} = this.props.form
        const applyMsg_fn = getFieldDecorator('applyMsg', {
            rules: [{required: true, message: 'Application is required'}],
            initialValue: ''
        })
        const applyMsg_el = (
            <Input.TextArea rows={8} className="team-application"
                disabled={this.props.loading} placeholder={this.props.task.bidding
                    ? I18N.get('project.detail.tell_us_why_bid')
                    : I18N.get('project.detail.tell_us_why_join')}/>
        )
        const applyMsgPanel = applyMsg_fn(applyMsg_el)

        const bid_fn = getFieldDecorator('bid')
        const bid_el = (
            <InputNumber min={1} disabled={this.props.loading}/>
        )
        const bid = bid_fn(bid_el)

        // generate select options
        let applicantOpts = {}
        const applicantSltOpts = []

        if (!this.hasAppliedBySelf()) {
            applicantSltOpts.push(<Select.Option key="$me" value="$me">
                Apply as myself
                <Avatar size="small" src={this.getAvatarWithFallback(
                    this.props.currentUserAvatar)} className="pull-right"/>
            </Select.Option>)
            applicantOpts.initialValue = '$me'
        }

        for (let team of this.props.ownedTeams) {
            if (!this.hasAppliedByTeam(team)) {
                applicantSltOpts.push(<Select.Option key={team._id} value={team._id}>
                    Apply with {team.name}
                    {!_.isEmpty(team.pictures)
                        ? <Avatar size="small" src={team.pictures[0].thumbUrl}
                            className="pull-right"/>
                        : <Avatar size="small" type="user" className="pull-right"/>
                    }
                </Select.Option>)
            }
        }

        const applicant_fn = getFieldDecorator('applicant', applicantOpts)
        const applicant_el = (
            <Select className="team-selector pull-right" disabled={this.props.loading}
                // https://github.com/vazco/uniforms/issues/228
                    getPopupContainer={x => {
                        while (x && x.tagName.toLowerCase() !== 'form') {
                            x = x.parentElement;
                        }

                        return x;
                    }}>
                {_.map(applicantSltOpts, (applicantOpt) => applicantOpt)}
            </Select>
        )
        const applicantPanel = applicant_fn(applicant_el)

        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="application-form">
                <Form.Item className="no-margin">
                    {applyMsgPanel}
                </Form.Item>
                { this.props.task.bidding &&
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
                <Button disabled={this.props.loading} className="d_btn pull-left"
                    onClick={() => this.setState({ applying: false })}>
                    Cancel
                </Button>
                <Button disabled={this.props.loading} className="d_btn pull-right"
                    type="primary" htmlType="submit">
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
        const isTaskCandidate = _.find(this.props.task.candidates, (candidate) => {
            return candidate.user && candidate.user._id === this.props.currentUserId &&
                candidate.status === TASK_CANDIDATE_STATUS.APPROVED
        })

        const allCandidateTeamIds = _.compact(_.map(this.props.task.candidates, (candidate) => {
            return candidate.team && candidate.team._id
        }))

        const currentUserTeamIds = _.map(this.props.ownedTeams, '_id')
        const belongsToMemberTeam = !_.isEmpty(
            _.intersection(allCandidateTeamIds, currentUserTeamIds))
        const isTaskOwner = this.props.task.createdBy &&
            (this.props.task.createdBy._id === this.props.currentUserId)

        return isTaskCandidate || belongsToMemberTeam || isTaskOwner
    }

    renderHeader() {
        return (
            <div className="header">
                <h3>
                    {this.props.task.name}
                </h3>
            </div>
        )
    }

    renderMeta() {
        const generateRow = (key, value, cssRowClass) => (
            <Row className={[cssRowClass, 'meta-row'].join(' ')}>
                <Col span={8}>
                    {key}
                </Col>
                <Col span={16}>
                    {value}
                </Col>
            </Row>
        )

        const detail = this.props.task
        const budget = this.getBudgetFormatted()
        const reward = this.getRewardFormatted()
        const EVENT_DATE_FORMAT = 'MMM D, YYYY - HH:mm'
        const DEADLINE_FORMAT = 'MMM D'

        return (
            <div className="meta">
                {generateRow(I18N.get('task.owner'),
                    this.getUserNameWithFallback(detail.createdBy))}

                {detail.circle &&
                    generateRow(I18N.get('task.circle'), detail.circle.name)}

                {generateRow(I18N.get('task.type'), detail.type)}

                {generateRow(I18N.get('task.category'), detail.category)}

                {detail.location && generateRow(I18N.get('task.location'), detail.location)}

                {detail.community && generateRow(I18N.get('task.community'), this.getCommunityDisp())}

                {detail.applicationDeadline &&
                    generateRow(I18N.get('task.applyDeadline'),
                        moment(detail.applicationDeadline).format(DEADLINE_FORMAT))}

                {detail.completionDeadline &&
                    generateRow(I18N.get('task.completionDeadline'),
                        moment(detail.completionDeadline).format(DEADLINE_FORMAT))}

                {detail.bidding &&
                    generateRow(I18N.get('task.referenceBid'),
                        detail.referenceBid || I18N.get('task.referenceBid.none'))}

                {!detail.bidding && budget && generateRow(I18N.get('task.budget'), (
                    <div>
                        <span>{budget}</span>
                        {this.getBudgetExplanation()}
                    </div>
                )) || null}

                {!detail.bidding && reward && generateRow(I18N.get('task.reward'), (
                    <div>
                        <span>{reward}</span>
                        {this.getRewardExplanation()}
                    </div>
                )) || null}

                {detail.goals && generateRow(I18N.get('task.goals'), detail.goals)}

                {detail.descBreakdown && generateRow(I18N.get('task.descBreakdown'), detail.descBreakdown)}

                {detail.eventDateRangeStart && generateRow(I18N.get('task.eventStart'),
                    moment(detail.eventDateRangeStart).format(EVENT_DATE_FORMAT) + ' (' +
                    detail.eventDateStatus + ')')}

                {detail.eventDateRangeEnd && generateRow(I18N.get('task.eventEnd'),
                    moment(detail.eventDateRangeEnd).format(EVENT_DATE_FORMAT))}

                {generateRow(I18N.get('task.description'), detail.description, 'task-description')}

                {detail.attachment && generateRow(I18N.get('task.attachment'),
                    <a href={detail.attachment} target="_blank">{detail.attachmentFilename}</a>)}

                {detail.infoLink && generateRow(I18N.get('task.infoLink'),
                    <a href={detail.infoLink} target="_blank">{detail.infoLink}</a>)}
            </div>
        )
    }

    ord_render() {
        const detail = this.props.task
        const loading = _.isEmpty(detail)
        const isTaskOwner = this.props.task.createdBy &&
            (this.props.task.createdBy._id === this.props.currentUserId)

        return (
            <div className="c_Project c_Detail">
                { loading
                    ? (
                        <div className="full-width full-height valign-wrapper halign-wrapper">
                            <Spin className="loading-spinner" />
                        </div>
                    )
                    : (
                        <div className="detail-container">
                            {this.getImageCarousel()}
                            {this.renderHeader()}
                            {this.renderMeta()}

                            {/*
                            * Apply Button
                            * - this may be unintuitive but we should always show the button,
                            *   you can always apply as a team or user
                            * unless you've exhausted all the teams, but even then we can inform
                            *   the user of this in a better way than hiding
                            */}
                            {!this.state.applying && this.props.page !== 'LEADER' &&
                                !isTaskOwner && this.renderApplyButton()}

                            {/*
                            * Applying Form
                            */}
                            {this.state.applying && this.getApplicationForm()}

                            {/*
                            * Approved Applicants (might not be necessary except for admin/leader)
                            */}
                            {(!this.state.applying && this.getCurrentContributorsData().length)
                                ? this.renderContributors()
                                : ''}

                            {/*
                            * Pending Bids / Applications - only show if CREATED/PENDING
                            */}
                            {!this.state.applying && this.renderPendingCandidates()}

                            {/*
                            * Comments
                            * - not enabled for bidding projects to minimize confusion in a closed bid
                            */}
                            {!this.props.task.bidding && (this.props.page === 'LEADER' ||
                                this.props.page === 'ADMIN') && this.canComment() &&
                                <Row>
                                    <br/>
                                    <Comments type="task" canPost={true}
                                        canSubscribe={!isTaskOwner} model={this.props.taskId}
                                        returnUrl={`/project-detail/${this.props.taskId}`}
                                    />
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

    renderApplyButton() {
        const detail = this.props.task

        // if not bidding check if there is already an approved
        if (!detail.bidding && _.find(detail.candidates,
            (candidate) => candidate.status === TASK_CANDIDATE_STATUS.APPROVED)) {
            return
        }

        if (detail.bidding && _.indexOf([TASK_STATUS.CREATED, TASK_STATUS.PENDING], detail.status) < 0) {
            return
        }

        return <Row className="actions">
            <Button type="primary" onClick={() => this.setState({ applying: true })}
                disabled={!this.canApply()}>
                {detail.bidding
                    ? I18N.get('project.detail.popup.bid_project')
                    : I18N.get('project.detail.popup.join_project')}
            </Button>
        </Row>
    }


    /**
     * Render pending bids or applications
     *
     * BIDDING - we show for CREATED/PENDING status only
     *
     * For Admins - only admins can create tasks/projects for bidding
     * - they can see all applications (user/team), we assume they are never a bidder
     *
     * For everyone else they can only see their own bids and the total number of bids
     *
     *
     * PROJECT - we show if APPROVED, but no one is selected yet
     *
     * We can see other people who applied
     */
    renderPendingCandidates() {
        const currentUserId = this.props.currentUserId
        const detail = this.props.task

        // status checks
        if (detail.bidding && _.indexOf([TASK_STATUS.CREATED,
                TASK_STATUS.PENDING], detail.status) < 0) {
            return ''
        }

        if (!detail.bidding && _.find(detail.candidates,
            (candidate) => candidate.status === TASK_CANDIDATE_STATUS.APPROVED)) {
            return ''
        }


        let pendingCandidates = this.getPendingCandidates()
        let pendingCandidatesCnt = pendingCandidates.length

        // only show current user's bids if it's bidding - for projects with a set reward we can show them
        if (!this.props.is_admin && detail.bidding) {
            pendingCandidates = _.filter(pendingCandidates, (candidate) => {
                if (candidate.type === TASK_CANDIDATE_TYPE.USER &&
                    candidate.user._id === currentUserId) {
                    return true

                }

                if (candidate.type === TASK_CANDIDATE_TYPE.TEAM &&
                    this.loggedInUserBelongsToCandidate(candidate)) {
                    // here we make the assumption that any member of a team can view the team's bid
                    return true
                }
            })
        }

        const title = detail.bidding
            ? this.props.is_admin
                ? I18N.get('project.detail.pending_bids')
                : I18N.get('project.detail.your_bids')
            : I18N.get('project.detail.pending_applications')
        const bidsLeft = [
            I18N.get('project.detail.bidding_cur_1'),
            pendingCandidatesCnt - pendingCandidates.length,
            I18N.get('project.detail.bidding_cur_2')
        ].join(' ')

        return <Row className="applications">
            <h3 className="no-margin">
                {title}
            </h3>

            {pendingCandidates.length && this.renderCandidates(pendingCandidates)}

            {/* this works because we filtered pendingCandidates after we saved the count */}
            {(this.props.page !== 'ADMIN' || !this.props.is_admin) &&
                detail.bidding && bidsLeft}

            {!detail.bidding && pendingCandidates.length === 0 &&
                <div className="no-data no-info">
                    There are no applications yet
                </div>
            }
        </Row>
    }

    getAvatarWithFallback(avatar) {
        return _.isEmpty(avatar)
            ? USER_AVATAR_DEFAULT
            : avatar
    }

    getUserNameWithFallback(user) {
        if (_.isEmpty(user.profile.firstName) && _.isEmpty(user.profile.lastName)) {
            return user.username
        }

        return _.trim([user.profile.firstName, user.profile.lastName].join(' '))
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
                                <Avatar className={'gap-right ' +
                                    (candidate._id === 'such_fake_id' ? 'avatar-leader' : 'avatar-member')}
                                    src={this.getAvatarWithFallback(candidate.user.profile.avatar)}/>
                                {this.getUserNameWithFallback(candidate.user)}
                            </a>
                        </div>
                        }
                        {(candidate.type === TASK_CANDIDATE_TYPE.TEAM) &&
                        <div>
                            <a onClick={this.linkProfileInfo.bind(this, candidate.team._id)}>
                                <Avatar className="gap-right"
                                    src={this.getAvatarWithFallback(!_.isEmpty(candidate.team.pictures) &&
                                        candidate.team.pictures[0].url)} />
                                {candidate.team.name}
                                {this.loggedInUserOwnerOfCandidate(candidate) ?
                                    <span className="no-info"> (Owner)</span> :
                                    <span className="no-info"> (Member)</span>
                                }
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
                        {this.props.task.bidding &&
                            <span>
                                Bid: {candidate.bid} ELA
                            </span>
                        }
                        {(this.props.page === 'ADMIN' || this.isTaskOwner() ||
                            this.loggedInUserBelongsToCandidate(candidate)) && (
                            <span>
                                <Divider type="vertical"/>
                                <a onClick={this.showAppModal.bind(this, candidate._id)}>
                                    {I18N.get('project.detail.view')}
                                </a>
                            </span>
                        )}
                        {this.loggedInUserOwnerOfCandidate(candidate) && (
                            <span>
                                <Divider type="vertical"/>
                                <a onClick={this.withdrawApplication.bind(this, candidate._id)}>
                                    {I18N.get('project.detail.withdraw_application')}
                                </a>
                            </span>)
                        }
                        {this.isTaskOwner() &&
                            <span className="inline-block">
                                <Divider type="vertical"/>
                                <a onClick={this.approveUser.bind(this, candidate._id)}>
                                    {I18N.get('project.detail.approve')}
                                </a>
                                <Divider type="vertical"/>
                                <a onClick={this.disapproveUser.bind(this, candidate._id)}>
                                    {I18N.get('project.detail.disapprove')}
                                </a>
                            </span>
                        }
                    </div>
                )
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

    /**
     * For bidding tasks, contributors are the actual assigned user
     */
    renderContributors() {
        let currentContributors = this.getCurrentContributorsData()

        const columns = [{
            title: 'Name',
            key: 'name',
            render: (candidate) => {
                return (
                    <div>
                        {(candidate.type === TASK_CANDIDATE_TYPE.USER) &&
                        <div>
                            <a onClick={this.linkProfileInfo.bind(this, candidate.user._id)}>
                                <Avatar className={'gap-right ' +
                                    (candidate._id === 'such_fake_id' ? 'avatar-leader' : 'avatar-member')}
                                        src={this.getAvatarWithFallback(candidate.user.profile.avatar)}/>
                                {this.getUserNameWithFallback(candidate.user)}
                            </a>
                        </div>
                        }
                        {(candidate.type === TASK_CANDIDATE_TYPE.TEAM) &&
                        <div>
                            <a onClick={this.linkProfileInfo.bind(this, candidate.team._id)}>
                                <Avatar className="gap-right"
                                    src={this.getAvatarWithFallback(!_.isEmpty(candidate.team.pictures) &&
                                        candidate.team.pictures[0].url)} />
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
                        {this.isTaskOwner() && !this.props.task.bidding &&
                            <a onClick={this.removeUser.bind(this, candidate._id)}>
                                {I18N.get('project.detail.remove')}
                            </a>
                        }
                        {this.isTaskOwner() && this.props.task.bidding &&
                            <span>
                                Bid: {candidate.bid} ELA
                            </span>
                        }
                        {(this.props.page === 'ADMIN' || this.isTaskOwner() ||
                            this.loggedInUserBelongsToCandidate(candidate)) && (
                            <span>
                                <Divider type="vertical"/>
                                <a onClick={this.showAppModal.bind(this, candidate._id)}>
                                    {I18N.get('project.detail.view')}
                                </a>
                            </span>
                        )}
                    </div>
                )
            }
        }]

        return <Row className="contributors">
            <h3 className="no-margin align-left">
                {this.props.task.bidding
                    ? I18N.get('project.detail.bidding_winner')
                    : I18N.get('project.detail.current_contributors')}
            </h3>

            <Table
                className="no-borders headerless"
                dataSource={currentContributors}
                columns={columns}
                bordered={false}
                pagination={false}
                rowKey="_id"
            />
        </Row>
    }

    /*
    ****************************************************************************************************************
    * Helpers
    ****************************************************************************************************************
     */
    isUnapproved() {
        return (this.props.task.status === TASK_STATUS.CREATED ||
            this.props.task.status === TASK_STATUS.PENDING)
    }

    loggedInUserBelongsToCandidate(candidate) {
        const loggedInUserId = this.props.currentUserId
        if (candidate.type === TASK_CANDIDATE_TYPE.USER &&
            candidate.user._id === loggedInUserId) {
            return true
        }

        if (candidate.type === TASK_CANDIDATE_TYPE.TEAM &&
            _.find(candidate.team.members, {user: loggedInUserId})) {
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
        if (candidate.type === TASK_CANDIDATE_TYPE.USER &&
            candidate.user._id === loggedInUserId) {
            return true
        }

        if (candidate.type === TASK_CANDIDATE_TYPE.TEAM &&
            candidate.team.owner._id === loggedInUserId){
            return true
        }
    }

    // check if logged in user has applied by themselves
    hasAppliedBySelf() {
        const loggedInUserId = this.props.currentUserId
        const pendingCandidates = this.getPendingCandidates()
        return !!_.find(pendingCandidates, (candidate) =>
            candidate.type === TASK_CANDIDATE_TYPE.USER && candidate.user._id === loggedInUserId)
    }

    // check if logged in user has applied by the passed in team
    hasAppliedByTeam(team) {
        const pendingCandidates = this.getPendingCandidates()
        return !!_.find(pendingCandidates, (candidate) => {
            return (candidate.type === TASK_CANDIDATE_TYPE.TEAM &&
                candidate.team._id === team._id)
        })
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

    getCurrency() {
        return this.props.task.reward.isUsd ? 'USD' : 'ELA'
    }

    getReward() {
        return this.props.task.reward &&
            ((this.props.task.reward.usd / 100) || this.props.task.reward.ela)
    }

    getRewardElaPerUsd() {
        return this.props.task.reward && this.props.task.reward.elaPerUsd
    }

    getRewardFormatted() {
        const epu = this.getRewardElaPerUsd()
        const suffix = epu ? ` (@${epu} ELA/USD)` : ''
        return this.getReward() && `${this.getReward()} ${this.getCurrency()}${suffix}`
    }

    getBudgetExplanation() {
        return (
            <Popover content={I18N.get('task.budget.explain')}>
                <Icon className="help-icon" type="question-circle-o"/>
            </Popover>
        )
    }

    getRewardExplanation() {
        return (
            <Popover content={I18N.get('task.reward.explain')}>
                <Icon className="help-icon" type="question-circle-o"/>
            </Popover>
        )
    }

    getBudget() {
        return this.props.task.rewardUpfront &&
            ((this.props.task.rewardUpfront.usd / 100) || this.props.task.rewardUpfront.ela)
    }

    getBudgetElaPerUsd() {
        return this.props.task.rewardUpfront && this.props.task.rewardUpfront.elaPerUsd
    }

    getBudgetFormatted() {
        const epu = this.getBudgetElaPerUsd()
        const suffix = epu ? ` (@${epu} ELA/USD)` : ''
        return this.getBudget() && `${this.getBudget()} ${this.getCurrency()}${suffix}`
    }

    getCommunityDisp() {
        let str = ''
        if (this.props.task.communityParent) {
            str += this.props.task.communityParent.name + '/'
        }
        if (this.props.task.community) {
            str += this.props.task.community.name
        }

        return str
    }
}

export default Form.create()(C)
