import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'

import { Col, Row, Button, Spin, Divider, message, List, Icon, Tooltip, Popconfirm } from 'antd'

import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS, TASK_CANDIDATE_TYPE, TASK_CANDIDATE_STATUS} from '@/constant'
import Comments from '@/module/common/comments/Container'

const dateTimeFormat = 'MMM D, YYYY - h:mma (Z [GMT])'

export default class extends BaseComponent {

    ord_states() {
        return {
            visibleModalMemberProfile: false,
            isDeveloperEvent: this.props.task.category === TASK_CATEGORY.DEVELOPER &&
                                this.props.task.type === TASK_TYPE.EVENT,
            teamsOwned: []
        }
    }

    async componentDidMount() {
        this.setState({loading : true});
        const teamsOwned = await this.props.listTeamsOwned(this.props.userId)

        this.setState({
            loading: false,
            teamsOwned: (teamsOwned && teamsOwned.list) || []
        })

        const taskId = this.props.match.params.taskId
        taskId && this.props.getTaskDetail(taskId)
    }

    componentWillUnmount() {
        this.props.resetTaskDetail()
    }

    ord_render () {
        return (_.isEmpty(this.props.task) || this.props.task.loading ?
            <div class="center"><Spin size="large" /></div> :
            this.renderMain()
        )
    }

    getBanner() {
        const isTaskOwner = this.props.task.createdBy._id === this.props.userId
        const applicant = this.getApplicant()

        let bannerInsides = null
        if (applicant.complete) {
            bannerInsides = (
                <span className="help-text">Task marked as complete</span>
            )
        } else if (isTaskOwner && !applicant.complete) {
            bannerInsides = (
                <span className="help-text">Task incomplete</span>
            )
        } else if (!applicant.complete) {
            bannerInsides = (
                <div>
                    <span className="help-text">Task incomplete</span>
                    <div className="pull-right right-align">
                        <Popconfirm title="Are you sure you want to mark this complete?" placement="left" okText="Yes" onConfirm={this.markComplete.bind(this)}>
                            <Button type="primary">Mark Complete</Button>
                        </Popconfirm>
                    </div>
                    <div className="clearfix"/>
                </div>
            )
        }

        return bannerInsides
    }

    getApplicant () {
        return this.props.task.candidates.find((candidate) => {
            return candidate.user._id === this.props.applicantId
        })
    }

    markComplete () {
        const applicant = this.getApplicant()
        this.props.markComplete(applicant._id)
    }

    renderMain () {
        const isTaskOwner = this.props.task.createdBy._id === this.props.userId
        const applicant = this.getApplicant()
        const banner = this.getBanner()

        return (
            <div className="public">
                <Row>
                    <Col span={24} className="gridCol banner-area">
                        <div class="l_banner">
                            {banner}
                        </div>
                    </Col>
                    <Col span={18} className="gridCol main-area">
                        <Row>
                            <Col>
                                <h4 className="center">
                                    {applicant.applyMsg}
                                </h4>
                            </Col>
                        </Row>
                        <Comments type="taskCandidate" reduxType="task" canPost={true} model={applicant}
                            detailReducer={(detail) => _.find(detail.candidates, (candidate) => {
                                return candidate.user._id === this.props.match.params.applicantId
                            })}/>
                    </Col>
                    <Col span={6} className="gridCol applicants">
                        <h4>{this.state.isDeveloperEvent ? 'Registrants' : 'Applicants'}</h4>

                        {(this.props.task.candidates && this.props.task.candidates.length) ?
                        <List
                            size="small"
                            dataSource={this.props.task.candidates}
                            renderItem={(candidate) => {

                                const name = candidate.type === TASK_CANDIDATE_TYPE.USER ? candidate.user.username : candidate.team.name
                                const listItemActions = []

                                if (this.state.isDeveloperEvent) {
                                    listItemActions.push(candidate.type === TASK_CANDIDATE_TYPE.USER ?
                                        <Tooltip title="Solo User">
                                            <Icon type="user"/>
                                        </Tooltip> :
                                        <Tooltip title="Team">
                                            <Icon type="team"/>
                                        </Tooltip>)
                                }

                                let candidateIsUserOrTeam = false
                                if ((candidate.type === TASK_CANDIDATE_TYPE.USER && candidate.user._id === this.props.userId) ||
                                    (candidate.type === TASK_CANDIDATE_TYPE.TEAM && _.map(this.state.teamsOwned, '_id').includes(candidate.team._id))){

                                    candidateIsUserOrTeam = true
                                }

                                const isLeader = this.props.page === 'LEADER' && isTaskOwner && !candidateIsUserOrTeam

                                // we either show the remove icon or the approved icon,
                                // after approval the user cannot rescind their application

                                // if the candidate is the logged in user, show remove icon
                                if (this.props.page === 'PUBLIC' && candidateIsUserOrTeam) {
                                    if (this.state.isDeveloperEvent) {
                                        listItemActions.unshift(
                                            <Tooltip title="remove self">
                                                <a onClick={this.removeApplication.bind(this, candidate._id)}>x</a>
                                            </Tooltip>
                                        )
                                    } else {

                                        // non developer events should confirm
                                        if (candidate.type === TASK_CANDIDATE_TYPE.USER) {
                                            listItemActions.unshift(
                                                <Tooltip title="remove self">
                                                    <Popconfirm
                                                        title="Are you sure you want to remove your application?"
                                                        onConfirm={this.removeApplication.bind(this, candidate._id)}
                                                        placement="left"
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <a href="#">x</a>
                                                    </Popconfirm>
                                                </Tooltip>)
                                        } else if (candidate.type === TASK_CANDIDATE_TYPE.TEAM) {
                                            listItemActions.unshift(
                                                <Tooltip title="remove team">
                                                    <Popconfirm
                                                        title="Are you sure you want to remove your team's application?"
                                                        onConfirm={this.removeApplication.bind(this, candidate._id)}
                                                        placement="left"
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <a href="#">x</a>
                                                    </Popconfirm>
                                                </Tooltip>)
                                        }
                                    }

                                } else if (candidate.status === TASK_CANDIDATE_STATUS.APPROVED){
                                    // this should be the leader's view - they can approve applicants
                                    listItemActions.unshift(
                                        <Tooltip title={isTaskOwner ? (candidateIsUserOrTeam ? 'you are automatically accepted' : 'candidate already accepted') : 'accepted candidate'}>
                                            <a>✓</a>
                                        </Tooltip>)
                                } else if (!isTaskOwner) {
                                    // awaiting approval
                                    listItemActions.unshift(
                                        <Tooltip title="awaiting organizer/owner approval">
                                            <a>o</a>
                                        </Tooltip>)
                                }

                                // TODO: link to dedicated profile/team page if it's yours
                                let nonOwnerLink = ''

                                let userOrTeamName = name
                                if (candidateIsUserOrTeam) {
                                    nonOwnerLink = `${userOrTeamName} (you)`
                                } else {

                                    nonOwnerLink = (candidate.type === TASK_CANDIDATE_TYPE.USER ?
                                            <a onClick={() => {this.props.history.push(`/member/${candidate.user._id}`)}}>{userOrTeamName}</a> :
                                            <a onClick={() => {this.props.history.push(`/team/${candidate.team._id}`)}}>{userOrTeamName}</a>
                                    )
                                }

                                const isCurrent = candidate.id === applicant.id
                                const currentClass = isCurrent ? 'active' : ''
                                return <List.Item actions={listItemActions} className={currentClass}>
                                    {isLeader ?
                                        <Tooltip title="View application">
                                            <a href="#" onClick={() => {!isCurrent && this.props.history.push(`/profile/task-app/${this.props.task._id}/${candidate.user._id}`)}}>{userOrTeamName}</a>
                                        </Tooltip> : nonOwnerLink
                                    }
                                </List.Item>
                            }}
                        /> : <span className="no-info">
                                {this.props.task.status === TASK_STATUS.PENDING ? 'task must be approved first' : (this.state.isDeveloperEvent ? 'no registrants' : 'no applicants')}
                            </span>
                        }

                    </Col>
                </Row>
            </div>
        )
    }

    async removeApplication(tcId) {
        const taskId = this.props.task._id
        const res = await this.props.pullCandidate(taskId, tcId)
    }

    saveAcceptCandidateRef = (ref) => {
        this.acceptCandidateRef = ref
    }
}
