import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'

import ModalApplyTask from '../ModalApplyTask/Component'
import ModalAcceptApplicant from '../ModalAcceptApplicant/Component'

import { Col, Row, Button, Divider, message, Badge, List,
    Icon, Tooltip, Popconfirm, Spin, Popover, Table } from 'antd'
import { TASK_CATEGORY, TASK_TYPE, TASK_STATUS, TASK_CANDIDATE_TYPE,
    TASK_CANDIDATE_STATUS, TASK_EVENT_DATE_TYPE } from '@/constant'
import Comments from '@/module/common/comments/Container'
import I18N from '@/I18N'
import _ from 'lodash'


export default class extends BaseComponent {
    ord_states() {
        return {
        }
    }

    async componentDidMount() {
        this.props.listTeamsOwned(this.props.userId)
    }

    componentWillUnmount() {
    }

    ord_render() {
        return (
            <div className="public">
                {this.renderHeader()}
                {this.renderMeta()}
                {this.renderApplicants()}
                {this.renderComments()}
            </div>
        )
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

    renderComments() {
        const isTaskOwner = this.isTaskOwner()

        return this.props.loading
            ? (
                <div className="valign-wrapper halign-wrapper">
                    <Spin size="large"/>
                </div>
            )
            : (
                <Comments type="task" canPost={this.canComment()} canSubscribe={!isTaskOwner}
                    model={this.props.task}
                    returnUrl={`/task-detail/${this.props.task._id}`}/>
            )
    }

    renderApplicants() {
        const currentUserId = this.props.currentUserId
        const detail = this.props.detail

        // status checks
        if (detail.bidding && _.indexOf([TASK_STATUS.CREATED, TASK_STATUS.PENDING], detail.status) < 0) {
            return
        }

        if (!detail.bidding && _.find(detail.candidates, (candidate) => candidate.status === TASK_CANDIDATE_STATUS.APPROVED)) {
            return
        }

        let pendingCandidates = this.getPendingCandidates()
        let pendingCandidatesCnt = pendingCandidates.length

        // only show current user's bids if it's bidding - for projects with a set reward we can show them
        if (!this.props.is_admin && detail.bidding) {
            pendingCandidates = _.filter(pendingCandidates, (candidate) => {
                return (candidate.type === TASK_CANDIDATE_TYPE.USER && candidate.user._id === currentUserId) ||
                    (candidate.type === TASK_CANDIDATE_TYPE.TEAM && this.loggedInUserBelongsToCandidate(candidate))
            })
        }

        let title = ''
        if (detail.bidding) {
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

            {pendingCandidates.length && this.renderCandidates(pendingCandidates)}

            {/* this works because we filtered pendingCandidates after we saved the count */}
            {(this.props.page !== 'ADMIN' || !this.props.is_admin) && detail.bidding &&
                `${I18N.get('project.detail.bidding_cur_1')} ${pendingCandidatesCnt - pendingCandidates.length} ${I18N.get('project.detail.bidding_cur_2')}`
            }

            {!detail.bidding && pendingCandidates.length === 0 && <div className="no-data no-info">There are no applications yet.</div>}
        </Row>
    }

    canComment() {
        const isTaskCandidate = _.find(this.props.task.candidates, (candidate) => {
            return candidate.user && candidate.user._id === this.props.userId &&
                candidate.status === TASK_CANDIDATE_STATUS.APPROVED
        })

        const allCandidateTeamIds = _.compact(_.map(this.props.task.candidates, (candidate) => {
            return candidate.team && candidate.team._id
        }))

        const currentUserTeamIds = _.map(this.props.all_teams, '_id')
        const belongsToMemberTeam = !_.isEmpty(_.intersection(allCandidateTeamIds, currentUserTeamIds))
        const isTaskOwner = this.props.task.createdBy && (this.props.task.createdBy._id === this.props.userId)

        return isTaskCandidate || belongsToMemberTeam || isTaskOwner
    }

    getCurrentContributorsData() {
        const detail = this.props.task
        return _.filter(detail.candidates, { status: TASK_CANDIDATE_STATUS.APPROVED });
    }

    loggedInUserBelongsToCandidate(candidate) {
        const loggedInUserId = this.props.userId
        if (candidate.type === TASK_CANDIDATE_TYPE.USER && candidate.user._id === loggedInUserId) {
            return true
        }

        if (candidate.type === TASK_CANDIDATE_TYPE.TEAM && _.find(candidate.team.members, {user: loggedInUserId})) {
            return true
        }
    }

    linkProfileInfo(userId) {
        // TODO: open profile popup
    }

    removeUser() {
        // TODO
    }

    showAppModal() {

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

    isTaskOwner() {
        return (this.props.task && this.props.task.createdBy &&
            this.props.task.createdBy._id) === this.props.userId
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
