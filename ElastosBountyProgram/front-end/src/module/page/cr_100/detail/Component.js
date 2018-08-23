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
    Upload
} from 'antd'
import {upload_file} from "@/util";
import { TASK_CANDIDATE_STATUS, TASK_CANDIDATE_TYPE, TEAM_USER_STATUS } from '@/constant'
import I18N from '@/I18N'
import _ from 'lodash'
import './style.scss'

class C extends BaseComponent {
    ord_states() {
        return {
            applying: false,
            attachment_url: null,
            attachment_loading: false,
            attachment_filename: '',
            attachment_type: ''
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

    isTaskOwner() {
        return this.props.detail.createdBy && this.props.detail.createdBy._id === this.props.currentUserId
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const isSelf = (values.applicant === '$me')
                const userId = isSelf && this.props.currentUserId
                const teamId = !isSelf && values.applicant

                this.props.applyToTask(this.props.taskId, userId, teamId, values.applyMsg,
                    this.state.attachment_url, this.state.attachment_filename)
                    .then(() => {
                        this.setState({ applying: false })
                        message.success('Application sent. Thank you!')
                    })
            }
        })
    }

    linkProfileInfo(userId) {
        this.props.history.push(`/member/${userId}`)
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

    getCurrentContributors() {
        const detail = this.props.detail
        const applicants = _.filter(detail.candidates, { status: TASK_CANDIDATE_STATUS.APPROVED });
        if (this.isTaskOwner()) {
            applicants.unshift({
                _id: 'such_fake_id',
                user: this.props.detail.createdBy,
                type: TASK_CANDIDATE_TYPE.USER
            })
        }
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

    ord_render () {
        const isMember = this.isMemberByUserId(this.props.currentUserId)

        return (
            <div className="c_Project c_Detail">
                { this.checkForLoading(() =>
                    <div>
                        {this.getHeader()}
                        {this.getDescription()}
                        {this.state.applying && this.getApplicationForm()}
                        {(this.props.is_admin || this.isTaskOwner()) && !this.state.applying &&
                            <Row className="contributors">
                                { isMember &&
                                    <Button onClick={this.removeUserByUserId.bind(this, this.props.currentUserId)} className="leave-button">{I18N.get('project.detail.leave')}</Button>
                                }
                                <h3 className="no-margin align-left">{I18N.get('project.detail.current_contributors')}</h3>
                                {this.getCurrentContributors()}
                            </Row>
                        }

                        {(this.props.is_admin || this.isTaskOwner()) && !this.state.applying &&
                            <Row className="applications">
                                <h3 className="no-margin">{I18N.get('project.detail.pending_applications')}</h3>
                                {this.getCurrentApplicants()}
                            </Row>
                        }
                        {this.getFooter()}
                    </div>
                )}
            </div>
        )
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

        const attachment_fn = getFieldDecorator('attachment', {
            rules: []
        });
        const p_attachment = {
            showUploadList: false,
            customRequest :(info)=>{
                this.setState({
                    attachment_loading: true
                });
                upload_file(info.file).then((d)=>{
                    const url = d.url;
                    this.setState({
                        attachment_loading: false,
                        attachment_url : url,
                        attachment_type: d.type,
                        attachment_filename: d.filename,
                        removeAttachment: false
                    });
                })
            }
        };
        const attachment_el = (
            <Upload name="attachment" {...p_attachment}>
                {
                    this.state.attachment_url ? (
                        <a target="_blank" href={this.state.attachment_url}>
                            {this.state.attachment_type === 'application/pdf' ?
                                <Icon type="file-pdf"/> :
                                <Icon type="file"/>
                            } &nbsp;
                            {this.state.attachment_filename}
                        </a>
                    ) : (
                        <Button loading={this.state.attachment_loading}>
                            <Icon type="upload" /> Click to upload
                        </Button>
                    )
                }
            </Upload>
        );


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
        const attachmentPanel = attachment_fn(attachment_el)

        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="application-form">
                <Form.Item className="no-margin">
                    {applyMsgPanel}
                </Form.Item>
                <Form.Item>
                    {attachmentPanel}
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


    getHeader() {
        return (
            <div>
                <Avatar size={64} className="pull-left" src={this.props.detail.thumbnail}/>
                <div className="project-name">{this.props.detail.name}</div>
                <div className="clearfix"/>
            </div>
        )
    }

    getFooter() {
        return !this.state.applying &&
            <div className="halign-wrapper footer">
                <Button onClick={() => this.setState({applying: true})}>
                    {I18N.get('developer.cr100.submit_whitepaper')}</Button>
            </div>
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
                    {this.props.detail.pitch && this.props.detail.pitch.beneficiaries}
                </div>

                <h3>
                    {I18N.get('developer.cr100.pitch.elaInfrastructure')}
                </h3>
                <div>
                    {this.props.detail.pitch && this.props.detail.pitch.elaInfrastructure}
                </div>
            </div>
        )
    }
}

export default Form.create()(C)
