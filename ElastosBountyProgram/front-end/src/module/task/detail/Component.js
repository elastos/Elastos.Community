import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'

import ModalApplyTask from '../ModalApplyTask/Component'
import ModalAcceptApplicant from '../ModalAcceptApplicant/Component'

import { Col, Row, Button, Divider, message, List, Icon, Tooltip, Popconfirm } from 'antd'

import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS, TASK_CANDIDATE_TYPE, TASK_CANDIDATE_STATUS} from '@/constant'

const dateTimeFormat = 'MMM D, YYYY - h:mma (Z [GMT])'

export default class extends BaseComponent {

    ord_states() {

        let acceptedCnt = 0

        for (let candidate of this.props.task.candidates) {
            if (candidate.status === TASK_CANDIDATE_STATUS.APPROVED) {
                acceptedCnt += 1
            }
        }

        return {
            visibleModalApplyTask: false,
            visibleModalAcceptApplicant: false,
            visibleModalMemberProfile: false,
            acceptedCnt,
            selectedTaskCandidate: null,
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
            teamsOwned: teamsOwned.list || []
        })
    }

    ord_render () {

        const isTaskOwner = this.props.task.createdBy._id === this.props.userId

        return (
            <div className="public">
                <Row>
                    <Col span={18} className="gridCol main-area">
                        <Row>
                            <Col>
                                <h4 className="center">
                                    {this.props.task.name}
                                </h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={this.props.task.thumbnail ? 18 : 24}>
                                <Row>
                                    <Col span={4} className="label-col">
                                        Organizer
                                    </Col>
                                    <Col span={20}>
                                        <p>
                                            <a onClick={() => {this.props.history.push(`/member/${this.props.task.createdBy._id}`)}}>
                                                {this.props.task.createdBy.username}
                                            </a>
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={4} className="label-col">
                                        Category
                                    </Col>
                                    <Col span={20}>
                                        <p>
                                            {this.props.task.category}
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={4} className="label-col">
                                        Type
                                    </Col>
                                    <Col span={20}>
                                        <p>
                                            {this.props.task.type}
                                        </p>
                                    </Col>
                                </Row>
                                {this.props.task.community &&
                                <Row>
                                    <Col span={4} className="label-col">
                                        Community
                                    </Col>
                                    <Col span={20}>
                                        <p>
                                            {this.getCommunityDisp()}
                                        </p>
                                    </Col>
                                </Row>
                                }
                                <Row>
                                    <Col span={4} className="label-col">
                                        Description
                                    </Col>
                                    <Col span={20}>
                                        <p>
                                            {this.props.task.description}
                                        </p>
                                    </Col>
                                </Row>
                                {this.props.task.infoLink &&
                                <Row>
                                    <Col span={4} className="label-col">
                                        Info Link
                                    </Col>
                                    <Col span={20}>
                                        <a target="_blank" href={this.props.task.infoLink}>
                                            {this.props.task.infoLink}
                                        </a>
                                    </Col>
                                </Row>
                                }
                                {this.props.task.location &&
                                <Row>
                                    <Col span={4} className="label-col">
                                        Location
                                    </Col>
                                    <Col span={20}>
                                        {this.props.task.location}
                                    </Col>
                                </Row>
                                }
                                {this.props.task.startTime &&
                                <Row>
                                    <Col span={4} className="label-col">
                                        Date/Time
                                    </Col>
                                    <Col span={20}>
                                        {moment(this.props.task.startTime).format(dateTimeFormat)}
                                        {this.props.task.endTime &&
                                        <span>
                                            &nbsp; -
                                            &nbsp; {moment(this.props.task.endTime).format(dateTimeFormat)}
                                        </span>
                                        }
                                    </Col>
                                </Row>
                                }
                            </Col>
                            {this.props.task.thumbnail &&
                            <Col span={6}>
                                <img src={this.props.task.thumbnail} class="task-thumbnail"/>
                            </Col>
                            }
                        </Row>
                        <div className="vert-gap"/>
                        <Divider>{this.state.isDeveloperEvent ? 'Registration Info' : 'Application Info'}</Divider>
                        <Row>
                            {!this.state.isDeveloperEvent && this.props.task.candidateLimit &&
                            <Col span={4} className="label-col">
                                Max Applicants
                            </Col>
                            }
                            {!this.state.isDeveloperEvent && this.props.task.candidateLimit &&
                            <Col span={8}>
                                {this.props.task.candidateLimit}
                            </Col>
                            }
                            <Col span={4} className="label-col">
                                Max Accepted
                            </Col>
                            <Col span={8}>
                                {this.props.task.candidateSltLimit}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4} className="label-col">
                                Deadline
                            </Col>
                            <Col span={20}>
                                {this.props.task.applicationDeadline ?
                                    moment(this.props.task.applicationDeadline).format(dateTimeFormat) :
                                    'none - applicant selected when max applicants reached'
                                }
                            </Col>
                        </Row>

                        {this.props.task.attachment && <div>
                            <div className="vert-gap"/>
                            <Divider>Attachment</Divider>

                            <Row>
                                <Col span={4} className="label-col">
                                    File
                                </Col>
                                <Col span={20}>
                                    <a target="_blank" href={this.props.task.attachment}>
                                        {this.props.task.attachmentType === 'application/pdf' ?
                                            <Icon type="file-pdf"/> :
                                            <Icon type="file"/>
                                        } &nbsp;
                                        {this.props.task.attachmentFilename}
                                        </a>
                                </Col>
                            </Row>
                        </div>}
                    </Col>
                    <Col span={6} className="gridCol applicants">
                        <h4>{this.state.isDeveloperEvent ? 'Registrants' : 'Applicants'}</h4>

                        {(this.props.task.candidates && this.props.task.candidates.length) ?
                        <List
                            size="small"
                            dataSource={this.props.task.candidates}
                            renderItem={(candidate) => {

                                const name = candidate.type === TASK_CANDIDATE_TYPE.USER ? candidate.user.username : candidate.team.name
                                const listItemActions = [candidate.type === TASK_CANDIDATE_TYPE.USER ?
                                    <Tooltip title="Solo User">
                                        <Icon type="user"/>
                                    </Tooltip> :
                                    <Tooltip title="Team">
                                        <Icon type="team"/>
                                    </Tooltip>]

                                let candidateIsUserOrTeam = false
                                if ((candidate.type === TASK_CANDIDATE_TYPE.USER && candidate.user._id === this.props.userId) ||
                                    (candidate.type === TASK_CANDIDATE_TYPE.TEAM && _.map(this.state.teamsOwned, '_id').includes(candidate.team._id))){

                                    candidateIsUserOrTeam = true
                                }

                                // if the candidate is the logged in user, show remove icon
                                if (this.props.page === 'PUBLIC' && candidateIsUserOrTeam) {
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

                                } else if (candidate.status === TASK_CANDIDATE_STATUS.APPROVED){
                                    // this should be the leader's view - they can approve applicants
                                    listItemActions.unshift(
                                        <Tooltip title={isTaskOwner ? 'candidate already accepted' : 'accepted candidate'}>
                                            <a href="#">✓</a>
                                        </Tooltip>)
                                }

                                // TODO: link to dedicated profile/team page if it's yours

                                let userOrTeamName = name
                                if (candidateIsUserOrTeam) {
                                    userOrTeamName += ' (you)'
                                }

                                const nonOwnerLink = (candidate.type === TASK_CANDIDATE_TYPE.USER ?
                                        <a onClick={() => {this.props.history.push(`/member/${candidate.user._id}`)}}>{userOrTeamName}</a> :
                                        <a onClick={() => {this.props.history.push(`/team/${candidate.team._id}`)}}>{userOrTeamName}</a>
                                )

                                return <List.Item actions={listItemActions}>
                                    {this.props.page === 'LEADER' && isTaskOwner ?
                                        <Tooltip title="view user info / application">
                                            <a href="#" onClick={this.showModalAcceptApplicant.bind(this, candidate)}>{userOrTeamName}</a>
                                        </Tooltip> :
                                        nonOwnerLink
                                    }
                                </List.Item>
                            }}
                        /> : <span className="no-info">
                                {this.props.task.status === TASK_STATUS.PENDING ? 'task must be approved first' : 'no applicants'}
                            </span>
                        }

                        {this.props.is_login &&
                        this.props.page !== 'LEADER' &&
                        this.renderJoinButton.call(this)}

                    </Col>
                </Row>

                <ModalApplyTask
                    wrappedComponentRef={this.saveFormApplyTaskRef}
                    teamsOwned={this.state.teamsOwned}
                    visible={this.state.visibleModalApplyTask}
                    onCancel={this.handleCancelModalApplyTask}
                    onCreate={this.handleModalApplyTask}
                />

                <ModalAcceptApplicant
                    wrappedComponentRef={this.saveAcceptCandidateRef}
                    acceptedCnt={this.state.acceptedCnt}
                    acceptedMax={this.props.task.candidateSltLimit}
                    taskCandidate={this.state.modalTaskCandidate}
                    visible={this.state.visibleModalAcceptApplicant}
                    onCancel={this.handleCancelModalAcceptApplicant}
                    onCreate={this.handleModalAcceptApplicant}
                />
            </div>
        )
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

    /**
     * Developer Events - multiple people can simply join
     * Developer Tasks - members must apply for task, with a certain # to be selected
     *
     * Social Events - members must apply to help
     * Social Tasks - members must apply for task, with a certain # to be selected
     */
    renderJoinButton() {

        let buttonText = ''

        if (this.state.isDeveloperEvent) {
            buttonText = 'Join Event'
        } else {
            if (this.props.task.type === TASK_TYPE.TASK) {
                buttonText = 'Apply for Task'
            } else {
                buttonText = 'Apply to Help'
            }
        }

        return <Button className="join-btn" onClick={this.showModalApplyTask}>
            {buttonText}
        </Button>
    }

    /**
     * First we show a modal with teams or apply alone, only
     * the leader of a team can apply
     */
    showModalApplyTask = () => {
        this.formRefApplyTask.props.form.setFieldsValue({}, () => {
            this.setState({
                visibleModalApplyTask: true
            })
        })
    }

    saveFormApplyTaskRef = (formRef) => {
        this.formRefApplyTask = formRef
    }

    handleCancelModalApplyTask = () => {
        const form = this.formRefApplyTask.props.form
        form.resetFields()

        this.setState({visibleModalApplyTask: false})
    }

    handleModalApplyTask = () => {

        const form = this.formRefApplyTask.props.form

        // applyId is either literally 'self' or a teamId
        const applyId = form.getFieldValue('applyId')

        const isSelf = form.getFieldValue('applyId') === 'self'

        let userId, teamId

        if (isSelf) {
            // we push our own id
            userId = this.props.userId
        } else {
            teamId = applyId
        }

        const taskId = this.props.task._id
        const applyMsg = form.getFieldValue('applyMsg') || ''

        this.handleCancelModalApplyTask()

        this.props.pushCandidate(taskId, userId, teamId, applyMsg).then((result) => {
            message.success('You have applied, you will be contacted if approved', 7)

        }).catch((err) => {
            message.error(err.message, 10)
        })

    }

    async removeApplication(tcId) {
        const taskId = this.props.task._id
        const res = await this.props.pullCandidate(taskId, tcId)
    }

    /**
     * For organizers they can accept an applicant
     */
    showModalAcceptApplicant = (taskCandidate) => {
        this.setState({
            modalTaskCandidate: taskCandidate,
            visibleModalAcceptApplicant: true
        })

    }

    saveAcceptCandidateRef = (ref) => {
        this.acceptCandidateRef = ref
    }

    handleCancelModalAcceptApplicant = () => {
        this.setState({visibleModalAcceptApplicant: false})
    }

    handleModalAcceptApplicant = () => {

        // this is the candidate we are accepting
        const taskCandidateId = this.state.modalTaskCandidate._id
        this.handleCancelModalAcceptApplicant()

        this.props.acceptCandidate(taskCandidateId).then((result) => {
            message.success('Applicant has been accepted and contacted', 7)

            let acceptedCnt = this.state.acceptedCnt

            acceptedCnt += 1

            this.setState({acceptedCnt})

        }).catch((err) => {
            message.error(err.message, 10)
        })
    }

    // TODO: after max applicants are selected, we should send an email to those
    // that were not selected
}
