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
import { TASK_CANDIDATE_STATUS, TASK_CANDIDATE_TYPE,
    TEAM_USER_STATUS, TASK_STATUS, USER_AVATAR_DEFAULT } from '@/constant'
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
        }
    }

    componentDidMount() {
        const taskId = this.props.taskId
        this.props.getTaskDetail(taskId)
    }

    componentWillUnmount() {
        this.props.resetTaskDetail()
    }

    isTaskOwner() {
        return this.props.detail.createdBy._id === this.props.currentUserId
    }

    linkProfileInfo(userId) {
        this.props.history.push(`/member/${userId}`)
    }

    showTaskDetail() {
        this.props.history.push(`/task-detail/${this.props.detail._id}`)
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

    ord_render() {
        const detail = this.props.detail
        const loading = this.props.loading || _.isEmpty(this.props.detail)
        const isTaskOwner = this.props.detail.createdBy &&
            (this.props.detail.createdBy._id === this.props.currentUserId)

        return (
            <div className="c_TaskPopup">
                { loading
                    ? (
                        <div className="full-width full-height valign-wrapper halign-wrapper">
                            <Spin className="loading-spinner" />
                        </div>
                    )
                    : (
                        <div>
                            {this.renderHeader()}
                            {this.renderMeta()}
                            {this.renderApplications()}
                            {this.renderFooter()}
                        </div>
                    )
                }
            </div>
        )
    }

    renderHeader() {
        return (
            <div className="app-header">
                <img src="/assets/images/emp35/square.png" className="square"/>
                <span className="komu-a">
                    {this.props.detail.name}
                </span>
            </div>
        )
    }

    renderMeta() {
        const generateRow = (key, value, cssRowClass) => (
            <Row className={[cssRowClass, 'app-meta-row'].join(' ')}>
                <Col span={8}>
                    {key}
                </Col>
                <Col span={16}>
                    {value}
                </Col>
            </Row>
        )

        const detail = this.props.detail
        return (
            <div className="app-meta">
                {generateRow(I18N.get('task.owner'),
                    this.getUserNameWithFallback(detail.createdBy))}

                {detail.circle &&
                    generateRow(I18N.get('task.circle'), detail.circle.name)}

                {generateRow(I18N.get('task.type'), detail.type)}

                {generateRow(I18N.get('task.category'), detail.category)}

                {generateRow(I18N.get('task.description'), detail.description, 'task-description')}

                {detail.applicationDeadline &&
                    generateRow(I18N.get('task.applyDeadline'),
                        moment(detail.applicationDeadline).format('MMM D'))}

                {detail.completionDeadline &&
                    generateRow(I18N.get('task.completionDeadline'),
                        moment(detail.completionDeadline).format('MMM D'))}
            </div>
        )
    }

    renderApplications() {
        return (
            <div>

            </div>
        )
    }

    renderFooter() {
        return (
            <div className="app-footer valign-wrapper halign-wrapper">
                <Button onClick={this.showTaskDetail.bind(this)}>
                    {I18N.get('task.applyMessage')}
                </Button>
            </div>
        )
    }



    // getUpperLeftBox() {
    //     const details = this.props.detail;

    //     let carouselImages = []

    //     if (details.thumbnail) {
    //         carouselImages.push(<img src={details.thumbnail} key="main"/>)
    //     }

    //     for (let i of details.pictures) {
    //         carouselImages.push(<img src={i.url} key={i}/>)
    //     }

    //     if (carouselImages.length === 0) {
    //         carouselImages.push(<img src={'/assets/images/Elastos_Logo.png'} key={0} />);
    //     }

    //     let domains = []
    //     for (let i of details.domain) {
    //         domains.push(<Tag key={i}>{i}</Tag>)
    //     }

    //     return (
    //         <div className="left-container">
    //             <div className="pictures-container">
    //                 <Carousel autoplay>
    //                     {carouselImages}
    //                 </Carousel>
    //             </div>
    //             <div className="domains-container">
    //                 {domains}
    //             </div>
    //         </div>
    //     )
    // }

    // getUpperRightBox() {
    //     const detail = this.props.detail
    //     const name = detail.name || ''
    //     const leaderName = detail.createdBy.profile
    //         ? (detail.createdBy.profile.firstName + ' ' + detail.createdBy.profile.lastName)
    //         : ''
    //     const deadline = detail.applicationDeadline ? moment(detail.applicationDeadline).format('MMM D') : <span className="no-data">no deadline</span>
    //     const completionDeadline = detail.completionDeadline ? moment(detail.completionDeadline).format('MMM D') : <span className="no-data">no completion deadline</span>

    //     const reward = detail.bidding
    //         ? (detail.status === TASK_STATUS.APPROVED ? I18N.get('project.detail.bidding_closed') : I18N.get('project.detail.bidding'))
    //         : detail.reward.isUsd ? (detail.reward.usd / 100) + ' USD' : (detail.reward.ela / 1000) + ' ELA'

    //     const budget = detail.rewardUpfront.isUsd ? (detail.rewardUpfront.usd / 100) + ' USD' : (detail.rewardUpfront.ela / 1000) + ' ELA'

    //     const leaderImage = this.getAvatarWithFallback(detail.createdBy.profile.avatar)

    //     const recruiting_el = (
    //         <div>
    //             <span className="gap-right">{I18N.get('project.detail.recruiting')}: </span>
    //             <span>
    //                 {_.isEmpty(detail.recruitedSkillsets) ? (
    //                     <span>{I18N.get('project.detail.recruiting_skills_unknown')}</span>) : (
    //                     _.map(detail.recruitedSkillsets, (skillset, ind) => <Tag key={ind}>{skillset}</Tag>))}
    //             </span>
    //         </div>
    //     )

    //     return (
    //         <div>
    //             <div className="title">
    //                 <span>{name}</span>
    //             </div>
    //             <a className="leader" onClick={this.linkProfileInfo.bind(this, detail.createdBy._id)}>
    //                 <Avatar size="large" src={leaderImage} /> &nbsp;
    //                 <span className="ellipsis">{leaderName}</span>
    //             </a>
    //             <div className="content">
    //                 {/* Application Deadline */}
    //                 <div className="entry">{I18N.get('project.detail.deadline')}: {deadline}</div>
    //                 {detail.completionDeadline &&
    //                 <div className="entry">{I18N.get('project.detail.completion_deadline')}: {completionDeadline}</div>}

    //                 {(detail.rewardUpfront.usd > 0 || detail.rewardUpfront.ela > 0) &&
    //                 <div className="pull-right">
    //                     <span className="light-grey-text">{I18N.get('project.detail.budget')}:</span> {budget}
    //                 </div>}
    //                 <div className="pull-right clearfix">
    //                     <span className="light-grey-text">{I18N.get('project.detail.reward')}:</span> {reward}
    //                 </div>
    //                 {detail.bidding && detail.referenceBid && <div className="pull-right clearfix">
    //                     <span className="light-grey-text">{I18N.get('project.detail.reference_bid')}:</span> {detail.referenceBid} ELA
    //                 </div>}
    //             </div>
    //             <div class="description-box">
    //                 <hr className="divider"/>
    //                 <div className="description-title">{recruiting_el}</div>
    //                 <hr className="divider"/>
    //                 <div className="description-content">{detail.description || ''}</div>
    //                 <div className="description-content">{detail.descBreakdown || ''}</div>
    //             </div>
    //         </div>
    //     )
    // }

    // // maybe rename
    // getCurrentContributorsData() {
    //     const detail = this.props.detail
    //     return _.filter(detail.candidates, { status: TASK_CANDIDATE_STATUS.APPROVED });
    // }

    // getPendingCandidates() {
    //     const detail = this.props.detail
    //     return _.filter(detail.candidates, { status: TASK_CANDIDATE_STATUS.PENDING });
    // }

    // /**
    //  * This is the application submit
    //  */
    // handleSubmit(e) {
    //     e.preventDefault()
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             const isSelf = (values.applicant === '$me')
    //             const userId = isSelf && this.props.currentUserId
    //             const teamId = !isSelf && values.applicant

    //             if (this.props.detail.bidding && !values.bid) {
    //                 message.error('bid is required')
    //                 return
    //             }

    //             this.props.applyToTask(this.props.taskId, userId, teamId, values.applyMsg, null, null, values.bid)
    //                 .then(() => {
    //                     this.setState({ applying: false })
    //                     message.success('Application sent. Thank you!')
    //                 })
    //         }
    //     })
    // }

    // // break from convention, this.props.detail is the task
    // getApplicationForm() {

    //     const {getFieldDecorator} = this.props.form
    //     const applyMsg_fn = getFieldDecorator('applyMsg', {
    //         rules: [{required: true, message: 'Application is required'}],
    //         initialValue: ''
    //     })
    //     const applyMsg_el = (
    //         <Input.TextArea rows={8} className="team-application" disabled={this.props.loading}
    //                         placeholder={this.props.detail.bidding ? I18N.get('project.detail.tell_us_why_bid') : I18N.get('project.detail.tell_us_why_join')}/>
    //     )
    //     const applyMsgPanel = applyMsg_fn(applyMsg_el)

    //     const bid_fn = getFieldDecorator('bid')
    //     const bid_el = (
    //         <InputNumber min={1} disabled={this.props.loading}/>
    //     )
    //     const bid = bid_fn(bid_el)

    //     // generate select options
    //     let applicantOpts = {}
    //     const applicantSltOpts = []

    //     if (!this.hasAppliedBySelf()) {
    //         applicantSltOpts.push(<Select.Option key="$me "value="$me">
    //             Apply as myself
    //             <Avatar size="small" src={this.getAvatarWithFallback(this.props.currentUserAvatar)} className="pull-right"/>
    //         </Select.Option>)
    //         applicantOpts.initialValue = '$me'
    //     }

    //     for (let team of this.props.ownedTeams) {
    //         if (!this.hasAppliedByTeam(team)) {
    //             applicantSltOpts.push(<Select.Option key={team._id} value={team._id}>
    //                 Apply with {team.name}
    //                 {!_.isEmpty(team.pictures)
    //                     ? <Avatar size="small" src={team.pictures[0].thumbUrl} className="pull-right"/>
    //                     : <Avatar size="small" type="user" className="pull-right"/>
    //                 }
    //             </Select.Option>)
    //         }
    //     }

    //     // shortcut here if user has exhaused all application options
    //     if (!applicantSltOpts.length) {
    //         return <div className="no-teams">
    //             You have already applied with yourself and any possible teams
    //             <br/>
    //             <br/>
    //             <Button disabled={this.props.loading} className="d_btn pull-left" onClick={() => this.setState({ applying: false })}>
    //                 Cancel
    //             </Button>
    //         </div>
    //     }

    //     const applicant_fn = getFieldDecorator('applicant', applicantOpts)
    //     const applicant_el = (
    //         <Select className="team-selector pull-right" disabled={this.props.loading}
    //             // https://github.com/vazco/uniforms/issues/228
    //                 getPopupContainer={x => {
    //                     while (x && x.tagName.toLowerCase() !== 'form') {
    //                         x = x.parentElement;
    //                     }

    //                     return x;
    //                 }}>
    //             {_.map(applicantSltOpts, (applicantOpt) => applicantOpt)}
    //         </Select>
    //     )
    //     const applicantPanel = applicant_fn(applicant_el)

    //     return (
    //         <Form onSubmit={this.handleSubmit.bind(this)} className="application-form">
    //             <Form.Item className="no-margin">
    //                 {applyMsgPanel}
    //             </Form.Item>
    //             { this.props.detail.bidding &&
    //             <div>
    //                 <Form.Item className="no-margin pull-right">
    //                     <div>
    //                         <span>Bid (ELA): </span>
    //                         {bid}
    //                     </div>
    //                 </Form.Item>
    //                 <div className="clearfix"/>
    //             </div>
    //             }
    //             <Button disabled={this.props.loading} className="d_btn pull-left" onClick={() => this.setState({ applying: false })}>
    //                 Cancel
    //             </Button>
    //             <Button disabled={this.props.loading} className="d_btn pull-right" type="primary" htmlType="submit">
    //                 Apply
    //             </Button>
    //             <Form.Item className="pull-right">
    //                 {applicantPanel}
    //             </Form.Item>
    //             <div class="clearfix"/>
    //         </Form>
    //     )
    // }

    // canComment() {
    //     const isTaskCandidate = _.find(this.props.detail.candidates, (candidate) => {
    //         return candidate.user && candidate.user._id === this.props.currentUserId &&
    //             candidate.status === TASK_CANDIDATE_STATUS.APPROVED
    //     })

    //     const allCandidateTeamIds = _.compact(_.map(this.props.detail.candidates, (candidate) => {
    //         return candidate.team && candidate.team._id
    //     }))

    //     const currentUserTeamIds = _.map(this.props.ownedTeams, '_id')
    //     const belongsToMemberTeam = !_.isEmpty(_.intersection(allCandidateTeamIds, currentUserTeamIds))
    //     const isTaskOwner = this.props.detail.createdBy && (this.props.detail.createdBy._id === this.props.currentUserId)

    //     return isTaskCandidate || belongsToMemberTeam || isTaskOwner
    // }

    // renderApplyButton() {

    //     const detail = this.props.detail

    //     // if not bidding check if there is already an approved
    //     if (!detail.bidding && _.find(detail.candidates, (candidate) => candidate.status === TASK_CANDIDATE_STATUS.APPROVED)) {
    //         return ''
    //     }

    //     if (detail.bidding && _.indexOf([TASK_STATUS.CREATED, TASK_STATUS.PENDING], detail.status) < 0) {
    //         return ''
    //     }

    //     return <Row className="actions">
    //         <Button type="primary" onClick={() => this.setState({ applying: true })}>
    //             {detail.bidding ? I18N.get('project.detail.popup.bid_project') : I18N.get('project.detail.popup.join_project')}
    //         </Button>
    //     </Row>
    // }


    // /**
    //  * Render pending bids or applications
    //  *
    //  * BIDDING - we show for CREATED/PENDING status only
    //  *
    //  * For Admins - only admins can create tasks/projects for bidding
    //  * - they can see all applications (user/team), we assume they are never a bidder
    //  *
    //  * For everyone else they can only see their own bids and the total number of bids
    //  *
    //  *
    //  * PROJECT - we show if APPROVED, but no one is selected yet
    //  *
    //  * We can see other people who applied
    //  */
    // renderPendingCandidates() {

    //     const currentUserId = this.props.currentUserId
    //     const detail = this.props.detail

    //     // status checks
    //     if (detail.bidding && _.indexOf([TASK_STATUS.CREATED, TASK_STATUS.PENDING], detail.status) < 0) {
    //         return ''
    //     }

    //     if (!detail.bidding && _.find(detail.candidates, (candidate) => candidate.status === TASK_CANDIDATE_STATUS.APPROVED)) {
    //         return ''
    //     }


    //     let pendingCandidates = this.getPendingCandidates()
    //     let pendingCandidatesCnt = pendingCandidates.length

    //     // only show current user's bids if it's bidding - for projects with a set reward we can show them
    //     if (!this.props.is_admin && detail.bidding) {
    //         pendingCandidates = _.filter(pendingCandidates, (candidate) => {
    //             if (candidate.type === TASK_CANDIDATE_TYPE.USER && candidate.user._id === currentUserId) {
    //                 return true

    //             }

    //             if (candidate.type === TASK_CANDIDATE_TYPE.TEAM && this.loggedInUserBelongsToCandidate(candidate)) {
    //                 // here we make the assumption that any member of a team can view the team's bid
    //                 return true
    //             }
    //         })
    //     }

    //     let title = ''
    //     if (detail.bidding) {
    //         if (this.props.is_admin) {
    //             title = I18N.get('project.detail.pending_bids')
    //         } else {
    //             title = I18N.get('project.detail.your_bids')
    //         }
    //     } else {
    //         title = I18N.get('project.detail.pending_applications')
    //     }

    //     return <Row className="applications">
    //         {/* Title */}
    //         <h3 className="no-margin">
    //             {title}
    //         </h3>

    //         {pendingCandidates.length && this.renderCandidates(pendingCandidates)}

    //         {/* this works because we filtered pendingCandidates after we saved the count */}
    //         {(this.props.page !== 'ADMIN' || !this.props.is_admin) && detail.bidding &&
    //         `${I18N.get('project.detail.bidding_cur_1')} ${pendingCandidatesCnt - pendingCandidates.length} ${I18N.get('project.detail.bidding_cur_2')}`
    //         }

    //         {!detail.bidding && pendingCandidates.length === 0 && <div className="no-data no-info">There are no applications yet</div>}
    //     </Row>
    // }

    // renderCandidates(candidates) {
    //     const columns = [{
    //         title: 'Name',
    //         key: 'name',
    //         render: (candidate) => {
    //             return (
    //                 <div>
    //                     {(candidate.type === TASK_CANDIDATE_TYPE.USER) &&
    //                     <div>
    //                         <a onClick={this.linkProfileInfo.bind(this, candidate.user._id)}>
    //                             <Avatar className={'gap-right ' + (candidate._id === 'such_fake_id' ? 'avatar-leader' : 'avatar-member')}
    //                                     src={this.getAvatarWithFallback(candidate.user.profile.avatar)}/>
    //                             {this.getUserNameWithFallback(candidate.user)}
    //                         </a>
    //                     </div>
    //                     }
    //                     {(candidate.type === TASK_CANDIDATE_TYPE.TEAM) &&
    //                     <div>
    //                         <a onClick={this.linkProfileInfo.bind(this, candidate.team._id)}>
    //                             <Avatar className="gap-right"
    //                                 src={this.getAvatarWithFallback(!_.isEmpty(candidate.team.pictures) &&
    //                                     candidate.team.pictures[0].url)} />
    //                             {candidate.team.name}
    //                             {this.loggedInUserOwnerOfCandidate(candidate) ?
    //                                 <span className="no-info"> (Owner)</span> :
    //                                 <span className="no-info"> (Member)</span>
    //                             }
    //                         </a>
    //                     </div>
    //                     }
    //                 </div>)
    //         }
    //     }, {
    //         title: 'Action',
    //         key: 'action',
    //         render: (candidate) => {
    //             return (
    //                 <div className="text-right">
    //                     {this.props.detail.bidding && <span>
    //                         Bid: {candidate.bid} ELA
    //                     </span>}
    //                     {(this.props.page === 'ADMIN' || this.isTaskOwner() || this.loggedInUserBelongsToCandidate(candidate)) && (
    //                         <span>
    //                             <Divider type="vertical"/>
    //                             <a onClick={this.showAppModal.bind(this, candidate._id)}>{I18N.get('project.detail.view')}</a>
    //                         </span>
    //                     )}
    //                     {this.loggedInUserOwnerOfCandidate(candidate) && (
    //                         <span>
    //                             <Divider type="vertical"/>
    //                             <a onClick={this.withdrawApplication.bind(this, candidate._id)}>{I18N.get('project.detail.withdraw_application')}</a>
    //                         </span>)
    //                     }
    //                     {this.isTaskOwner() &&
    //                     <span className="inline-block">
    //                         <Divider type="vertical"/>
    //                         <a onClick={this.approveUser.bind(this, candidate._id)}>{I18N.get('project.detail.approve')}</a>
    //                         <Divider type="vertical"/>
    //                         <a onClick={this.disapproveUser.bind(this, candidate._id)}>{I18N.get('project.detail.disapprove')}</a>
    //                     </span>
    //                     }
    //                 </div>
    //             )

    //             return (
    //                 <div>
    //                     {this.isTaskOwner() && !this.props.detail.bidding &&
    //                     <div className="text-right">
    //                         <a onClick={this.removeUser.bind(this, candidate._id)}>{I18N.get('project.detail.remove')}</a>
    //                     </div>
    //                     }
    //                 </div>
    //             )

    //         }
    //     }]

    //     return (
    //         <Table
    //             className="no-borders headerless"
    //             dataSource={candidates}
    //             columns={columns}
    //             bordered={false}
    //             pagination={false}
    //             rowKey="_id"
    //         />
    //     )
    // }

    // /**
    //  * For bidding tasks, contributors are the actual assigned user
    //  */
    // renderContributors() {

    //     let currentContributors = this.getCurrentContributorsData()

    //     const columns = [{
    //         title: 'Name',
    //         key: 'name',
    //         render: (candidate) => {
    //             return (
    //                 <div>
    //                     {(candidate.type === TASK_CANDIDATE_TYPE.USER) &&
    //                     <div>
    //                         <a onClick={this.linkProfileInfo.bind(this, candidate.user._id)}>
    //                             <Avatar className={'gap-right ' + (candidate._id === 'such_fake_id' ? 'avatar-leader' : 'avatar-member')}
    //                                     src={this.getAvatarWithFallback(candidate.user.profile.avatar)}/>
    //                             {this.getUserNameWithFallback(candidate.user)}
    //                         </a>
    //                     </div>
    //                     }
    //                     {(candidate.type === TASK_CANDIDATE_TYPE.TEAM) &&
    //                     <div>
    //                         <a onClick={this.linkProfileInfo.bind(this, candidate.team._id)}>
    //                             <Avatar className="gap-right"
    //                                 src={this.getAvatarWithFallback(!_.isEmpty(candidate.team.pictures) &&
    //                                     candidate.team.pictures[0].url)} />
    //                             {candidate.team.name}
    //                         </a>
    //                     </div>
    //                     }
    //                 </div>)
    //         }
    //     }, {
    //         title: 'Action',
    //         key: 'action',
    //         render: (candidate) => {
    //             return (
    //                 <div className="text-right">
    //                     {this.isTaskOwner() && !this.props.detail.bidding &&
    //                     <a onClick={this.removeUser.bind(this, candidate._id)}>{I18N.get('project.detail.remove')}</a>
    //                     }
    //                     {this.isTaskOwner() && this.props.detail.bidding &&
    //                     <span>
    //                         Bid: {candidate.bid} ELA
    //                     </span>}
    //                     {(this.props.page === 'ADMIN' || this.isTaskOwner() || this.loggedInUserBelongsToCandidate(candidate)) && (
    //                         <span>
    //                             <Divider type="vertical"/>
    //                             <a onClick={this.showAppModal.bind(this, candidate._id)}>{I18N.get('project.detail.view')}</a>
    //                         </span>
    //                     )}
    //                 </div>
    //             )
    //         }
    //     }]

    //     return <Row className="contributors">
    //         <h3 className="no-margin align-left">{this.props.detail.bidding ? I18N.get('project.detail.bidding_winner') : I18N.get('project.detail.current_contributors')}</h3>

    //         <Table
    //             className="no-borders headerless"
    //             dataSource={currentContributors}
    //             columns={columns}
    //             bordered={false}
    //             pagination={false}
    //             rowKey="_id"
    //         />
    //     </Row>
    // }

    /*
    ****************************************************************************************************************
    * Helpers
    ****************************************************************************************************************
     */
    // isUnapproved() {
    //     return (this.props.detail.status === TASK_STATUS.CREATED || this.props.detail.status === TASK_STATUS.PENDING)
    // }

    // loggedInUserBelongsToCandidate(candidate) {
    //     const loggedInUserId = this.props.currentUserId
    //     if (candidate.type === TASK_CANDIDATE_TYPE.USER && candidate.user._id === loggedInUserId) {
    //         return true
    //     }

    //     if (candidate.type === TASK_CANDIDATE_TYPE.TEAM && _.find(candidate.team.members, {user: loggedInUserId})) {
    //         return true
    //     }
    // }

    // /**
    //  * Is the logged in user the passed in candidate
    //  * or the owner of the team
    //  *
    //  * @param candidate
    //  * @return Boolean
    //  */
    // loggedInUserOwnerOfCandidate(candidate) {
    //     const loggedInUserId = this.props.currentUserId
    //     if (candidate.type === TASK_CANDIDATE_TYPE.USER && candidate.user._id === loggedInUserId) {
    //         return true
    //     }

    //     if (candidate.type === TASK_CANDIDATE_TYPE.TEAM && candidate.team.owner._id === loggedInUserId){
    //         return true
    //     }
    // }

    // // check if logged in user has applied by themselves
    // hasAppliedBySelf() {
    //     const loggedInUserId = this.props.currentUserId
    //     const pendingCandidates = this.getPendingCandidates()
    //     return !!_.find(pendingCandidates, (candidate) => candidate.type === TASK_CANDIDATE_TYPE.USER && candidate.user._id === loggedInUserId)
    // }

    // // check if logged in user has applied by the passed in team
    // hasAppliedByTeam(team) {
    //     const pendingCandidates = this.getPendingCandidates()
    //     return !!_.find(pendingCandidates, (candidate) => {
    //         return (candidate.type === TASK_CANDIDATE_TYPE.TEAM && candidate.team._id === team._id)
    //     })
    // }

    // /*
    // ****************************************************************************************************************
    // * Modals
    // ****************************************************************************************************************
    //  */
    // showAppModal = (projectCandidateId) => {
    //     this.setState({
    //         showAppModal: true,
    //         projectCandidateId
    //     })
    // }

    // handleAppModalOk = (e) => {
    //     this.setState({
    //         showAppModal: false
    //     })
    // }

    // handleAppModalCancel = (e) => {
    //     this.setState({
    //         showAppModal: false
    //     })
    // }
}

export default Form.create()(C)