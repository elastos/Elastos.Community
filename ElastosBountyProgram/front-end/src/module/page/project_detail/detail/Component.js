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
    Upload,
    Badge
} from 'antd'
import {upload_file} from "@/util";
import { TASK_CANDIDATE_STATUS, TASK_CANDIDATE_TYPE, TEAM_USER_STATUS } from '@/constant'
import Comments from '@/module/common/comments/Container'
import LoginOrRegisterForm from '@/module/form/LoginOrRegisterForm/Container'
import Application from '../application/Container'
import I18N from '@/I18N'
import _ from 'lodash'
import './style.scss'

class C extends BaseComponent {
    ord_states() {
        return {
            showLoginRegisterModal: false,
            showApplicationModal: false,
            taskCandidateId: null
        }
    }

    async componentDidMount() {
        const taskId = this.props.taskId
        await this.props.getTaskDetail(taskId)
        if (this.props.currentUserId) {
            await this.props.getTeams({
                owner: this.props.currentUserId
            })
        }
    }

    componentWillUnmount() {
        this.props.resetTaskDetail()
        this.props.resetAllTeams()
    }

    isTaskOwner() {
        return this.props.detail.createdBy && this.props.detail.createdBy._id === this.props.currentUserId
    }

    isUserSubscribed() {
        const curDetail = this.props.detail
        const subscribers = curDetail.subscribers || []
        return !!_.find(subscribers, (subscriber) => {
            return subscriber.user && subscriber.user._id === this.props.currentUserId
        })
    }

    async applyToProject() {
        const res = await this.props.applyToTask(this.props.taskId, this.props.currentUserId)
        this.showApplicationModal(res._id)
    }

    renderLoginOrRegisterModal() {
        if (this.props.is_login) {
            return
        }

        return (
            <Modal
                className="project-detail-nobar"
                visible={this.state.showLoginRegisterModal}
                onOk={this.handleLoginRegisterModalOk}
                onCancel={this.handleLoginRegisterModalCancel}
                footer={null}
                width="70%"
            >
                <LoginOrRegisterForm />
            </Modal>
        )
    }

    renderApplicationModal() {
        return (
            <Modal
                className="project-detail-nobar"
                visible={this.state.showApplicationModal}
                onOk={this.handleApplicationModalOk.bind(this)}
                onCancel={this.handleApplicationModalCancel.bind(this)}
                footer={null}
                width="70%"
            >
                { this.state.taskCandidateId &&
                    <Application taskId={this.props.taskId} taskCandidateId={this.state.taskCandidateId} />
                }
            </Modal>
        )
    }

    showLoginRegisterModal = () => {
        sessionStorage.setItem('loginRedirect', `/project-detail/${this.props.taskId}`)
        sessionStorage.setItem('registerRedirect', `/project-detail/${this.props.taskId}`)

        this.setState({
            showLoginRegisterModal: true
        })
    }

    showApplicationModal(taskCandidateId) {
        taskCandidateId = taskCandidateId || this.getApplicant()._id
        this.setState({
            showApplicationModal: true,
            taskCandidateId
        })
    }

    handleLoginRegisterModalOk = (e) => {
        sessionStorage.removeItem('registerRedirect')

        this.setState({
            showLoginRegisterModal: false
        })
    }

    handleApplicationModalOk = (e) => {
        this.setState({
            showApplicationModal: false,
            taskCandidateId: null
        })
    }

    handleLoginRegisterModalCancel = (e) => {
        sessionStorage.removeItem('registerRedirect')

        this.setState({
            showLoginRegisterModal: false
        })
    }

    handleApplicationModalCancel() {
        this.setState({
            showApplicationModal: false,
            taskCandidateId: null
        })
    }

    subscribeToProject() {
        this.props.subscribeToProject(this.props.taskId)
    }

    unsubscribeFromProject() {
        this.props.unsubscribeFromProject(this.props.taskId)
    }

    linkProfileInfo(userId) {
        this.props.history.push(`/member/${userId}`)
    }

    linkTeamDetail(teamId) {
        this.props.history.push(`/team-detail/${teamId}`)
    }

    checkForLoading(followup) {
        return this.props.loading
            ? <div className="valign-wrapper halign-wrapper"><Spin size="large"/></div>
            : _.isFunction(followup) && followup()
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

    getCandidateDisplayName(candidate) {
        const fn = candidate.user.profile.firstName
        const ln = candidate.user.profile.lastName
        const un = candidate.user.username

        return _.isEmpty(fn) && _.isEmpty(ln)
            ? un
            : [fn, ln].join(' ')
    }

    getAvatarWithFallback(avatar) {
        return _.isEmpty(avatar)
            ? '/assets/images/Elastos_Logo.png'
            : avatar
    }

    getCandidateAvatar(candidate) {
        const avatar = candidate.user.profile.avatar
        return this.getAvatarWithFallback(avatar)
    }

    getTeamAvatar(candidate) {
        const avatar = candidate.team &&
            !_.isEmpty(candidate.team.pictures) &&
            candidate.team.pictures[0].url
        return this.getAvatarWithFallback(avatar)
    }

    getCurrentContributors() {
        const detail = this.props.detail
        const applicants = _.filter(detail.candidates, { status: TASK_CANDIDATE_STATUS.APPROVED });
        if (this.props.detail.createdBy) {
            applicants.unshift({
                _id: 'such_fake_id',
                user: this.props.detail.createdBy,
                type: TASK_CANDIDATE_TYPE.USER
            })
        }

        const columns = [{
            title: 'Name',
            key: '_id',
            render: candidate => {
                return (
                    <div>
                        {(candidate.type === TASK_CANDIDATE_TYPE.USER) &&
                        <div>
                            <a onClick={this.linkProfileInfo.bind(this, candidate.user._id)}>
                                <Avatar className={'gap-right ' + (candidate._id === 'such_fake_id' ? 'avatar-leader' : 'avatar-member')}
                                    src={this.getCandidateAvatar(candidate)}/>
                                {this.getCandidateDisplayName(candidate)}
                            </a>
                        </div>
                        }
                        {(candidate.type === TASK_CANDIDATE_TYPE.TEAM) &&
                        <div>
                            <a onClick={this.linkProfileInfo.bind(this, candidate.team._id)}>
                                <Avatar className="gap-right" src={this.getTeamAvatar(candidate)} />
                                {candidate.team.name}
                            </a>
                        </div>
                        }
                    </div>)
            }
        }, {
            title: 'Action',
            render: candidate => {
                return (
                    <div>
                        {this.isTaskOwner() && candidate._id !== 'such_fake_id' &&
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
                loading={this.props.loading}
                className="no-borders headerless"
                dataSource={applicants}
                columns={columns}
                bordered={false}
                pagination={false}
                rowKey="_id"
            />
        )
    }

    approveUser(taskCandidateId) {
        this.props.acceptCandidate(taskCandidateId)
    }

    disapproveUser(taskCandidateId) {
        this.props.rejectCandidate(taskCandidateId)
    }

    withdrawApplication(taskCandidateId) {
        this.props.withdrawCandidate(taskCandidateId)
    }

    viewApplication(taskCandidateId) {
        this.showApplicationModal(taskCandidateId)
    }

    removeUser(taskCandidateId) {
        this.props.rejectCandidate(taskCandidateId)
    }

    removeUserByUserId(userId) {
        const candidate = _.find(this.props.detail.candidates, (candidate) => candidate.user._id === userId)
        if (!candidate) {
            return false
        }
        return this.removeUser(candidate._id)
    }

    getNumberOfLikes() {
        return _.size(this.props.detail.subscribers)
    }

    getCurrentSubscribers() {
        const subscribers = this.props.detail.subscribers
        const columns = [{
            title: 'Name',
            key: 'user',
            render: candidate => {
                return (
                    <div>
                        <div>
                            <a onClick={this.linkProfileInfo.bind(this, candidate.user._id)}>
                                <Avatar className="gap-right" src={this.getCandidateAvatar(candidate)} />
                                {this.getCandidateDisplayName(candidate)}
                            </a>
                        </div>
                    </div>)
            }
        }]

        return (
            <Table
                loading={this.props.loading}
                className="no-borders headerless"
                dataSource={subscribers}
                columns={columns}
                bordered={false}
                pagination={false}
                rowKey="_id">
            </Table>
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
                                <Avatar className="gap-right" src={this.getCandidateAvatar(candidate)} />
                                {this.getCandidateDisplayName(candidate)}
                            </a>
                        </div>
                        }
                        {(candidate.type === TASK_CANDIDATE_TYPE.TEAM) &&
                        <div>
                            <a onClick={this.linkTeamDetail.bind(this, candidate.team._id)}>
                                <Avatar className="gap-right" src={this.getTeamAvatar(candidate)} />
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
                        {(this.props.page === 'ADMIN' || this.isTaskOwner() || this.isMember(candidate._id)) && (
                            <span>
                                <a onClick={this.showAppModal.bind(this, candidate._id)}>{I18N.get('project.detail.view')}</a>
                                <Divider type="vertical"/>
                            </span>
                        )}
                        {this.isMember(candidate._id) && (
                            <span>
                                <a onClick={this.viewApplication.bind(this, candidate._id)}>{I18N.get('project.detail.view')}</a>
                                <Divider type="vertical"/>
                                <a onClick={this.withdrawApplication.bind(this, candidate._id)}>{I18N.get('project.detail.withdraw_application')}</a>
                                {this.isTaskOwner() && <Divider type="vertical"/>}
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
                loading={this.props.loading}
                className="no-borders headerless"
                dataSource={applicants}
                columns={columns}
                bordered={false}
                pagination={false}
                rowKey="_id">
            </Table>
        )
    }

    getApplicant () {
        return (!_.isEmpty(this.props.detail.candidates) &&
            this.props.detail.candidates.find((candidate) => {
                return candidate.user && candidate.user._id === this.props.currentUserId
            }))
    }

    getActions() {
        const likeHandler = this.props.is_login
            ? this.isUserSubscribed()
                ? this.unsubscribeFromProject
                : this.subscribeToProject
            : this.showLoginRegisterModal

        const applyHandler = this.props.is_login
            ? this.getApplicant()
                ? this.showApplicationModal
                : this.applyToProject
            : this.showLoginRegisterModal

        return (
            <div className="halign-wrapper valign-wrapper action-wrapper">
                <div>
                    <Button loading={this.props.loading}
                        icon={this.isUserSubscribed() ? 'dislike' : 'like'} onClick={likeHandler.bind(this)}>
                        {this.isUserSubscribed()
                            ? 'Unlike'
                            : 'Like'
                        }
                    </Button>
                    <Button loading={this.props.loading} icon="message" onClick={applyHandler.bind(this)}
                        disabled={this.isTaskOwner() ||
                            (this.isMemberByUserId(this.props.currentUserId) && !this.getApplicant())}>
                        Get Involved
                    </Button>
                </div>
            </div>
        )
    }

    ord_render () {
        const isMember = this.isMemberByUserId(this.props.currentUserId)

        return (
            <div className="c_Project c_Detail">
                <div>
                    {this.getHeader()}

                    {this.props.page === 'PUBLIC' &&
                        this.getActions()
                    }

                    {(this.props.is_admin || this.isTaskOwner() || this.props.page === 'PUBLIC') &&
                        <Row className="contributors">
                            <h3 className="no-margin align-left">{I18N.get('project.detail.current_contributors')}</h3>
                            {this.getCurrentContributors()}
                        </Row>
                    }

                    {(this.props.is_admin || this.isTaskOwner() || this.props.page === 'PUBLIC') &&
                        <Row className="applications">
                            <h3 className="no-margin">{I18N.get('project.detail.pending_applications')}</h3>
                            {this.getCurrentApplicants()}
                        </Row>
                    }

                    {(this.props.is_admin || this.isTaskOwner() || this.props.page === 'PUBLIC') &&
                        <Row className="subscribers">
                            <h3 className="no-margin">{I18N.get('project.detail.subscribers')}</h3>
                            {this.getCurrentSubscribers()}
                        </Row>
                    }

                    {this.getDescription()}
                    <Comments type="task" canPost={true} canSubscribe={!this.isTaskOwner()} model={this.props.detail}/>
                    {this.renderLoginOrRegisterModal()}
                    {this.renderApplicationModal()}
                </div>
            </div>
        )
    }

    getHeader() {
        const project = _.find(_.values(this.props.all_tasks), { _id: this.props.taskId })
        const projectIndex = _.indexOf(_.values(this.props.all_tasks), project) + 1 // 1-indexed

        return (
            <div>
                <Avatar size={164} shape="square" className="pull-left project-avatar" src={this.props.detail.thumbnail}/>
                <div className="project-name komu-a">dApp #{projectIndex} - {this.props.detail.name}</div>
                <div className="project-funding komu-a">Funding: 100k for 5% of the equity or coins/tokens</div>
                <div className="project-likes pull-right">
                    <Icon type="heart"/>
                    <span> </span>{this.getNumberOfLikes()}
                </div>
                <div className="clearfix"/>
            </div>
        )
    }

    getDescription() {
        return (
            <div className="description">
                <h3>
                    {I18N.get('developer.cr100.pitch.problem')}
                </h3>
                <div>
                    {this.props.detail.pitch && this.props.detail.pitch.problem}
                </div>

                <h3>
                    {I18N.get('developer.cr100.pitch.valueProposition')}
                </h3>
                <div>
                    {this.props.detail.pitch && this.props.detail.pitch.valueProposition}
                </div>

                <h3>
                    {I18N.get('developer.cr100.pitch.useCase')}
                </h3>
                <div>
                    {this.props.detail.pitch && this.props.detail.pitch.useCase}
                </div>

                <h3>
                    {I18N.get('developer.cr100.pitch.beneficiaries')}
                </h3>
                <div>
                    {this.props.detail.pitch && this.format(this.props.detail.pitch.beneficiaries)}
                </div>

                <h3>
                    {I18N.get('developer.cr100.pitch.elaInfrastructure')}
                </h3>
                <div>
                    {this.props.detail.pitch && this.format(this.props.detail.pitch.elaInfrastructure)}
                </div>
            </div>
        )
    }

    format(contents) {
        let first = true;
        let elements = []
        let key = 0
        for (let char of contents) {
            if (char === '-') {
                if (!first) {
                    elements.push(<br key={key++}/>)
                }
                first = false
            }
            elements.push(char)
        }
        return elements
    }
}

export default Form.create()(C)
