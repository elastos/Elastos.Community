import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import {message, Col, Row, Tag, Carousel, Avatar, Button, Spin,
    Table, Input, Form, Divider, Popconfirm, Modal} from 'antd'
import _ from 'lodash'
import './style.scss'
import I18N from '@/I18N'
import Comments from '@/module/common/comments/Container'
import TeamApplication from '@/module/team/application/Container'
import { TEAM_USER_STATUS, TEAM_STATUS } from '@/constant'

class C extends BaseComponent {
    ord_states() {
        return {
            showAppModal: false,
            teamCandidateId: null
        }
    }

    componentDidMount() {
        const teamId = this.props.teamId
        this.props.getTeamDetail(teamId)
    }

    componentWillUnmount() {
        this.props.resetTeamDetail()
    }

    linkProfileInfo(userId) {
        this.props.history.push(`/member/${userId}`)
    }

    approveUser(teamCandidateId) {
        this.props.acceptCandidate(teamCandidateId)
    }

    rejectUser(teamCandidateId) {
        this.props.rejectCandidate(teamCandidateId)
    }

    withdrawUser(teamCandidateId) {
        this.props.withdrawCandidate(teamCandidateId)
    }

    renderUpperLeftBox() {
        const details = this.props.detail;

        let carouselImages = []
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

    renderUpperRightBox() {
        const detail = this.props.detail
        const name = detail.name || ''
        const leaderName = detail.owner.profile
            ? (detail.owner.profile.firstName + ' ' + detail.owner.profile.lastName)
            : ''
        const teamSize = _.size(_.filter(detail.members, { status: TEAM_USER_STATUS.NORMAL }))
        const description = detail.profile.description || ''
        const leaderImage = detail.owner.profile.avatar || ''
        const status = detail.status || TEAM_STATUS.ACTIVE

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

        return ((status == TEAM_STATUS.ACTIVE || status == TEAM_STATUS.CLOSED) || (this.isTeamOwner && status == TEAM_STATUS.DRAFT)) && (
            <div>
                <div className="title">
                    <span>{name}</span>
                    <br></br>
                    <span className={status == TEAM_STATUS.ACTIVE ? 'team-status-active' : 'team-status-close'}>{status == TEAM_STATUS.ACTIVE ? I18N.get('team.detail.recuriting') : I18N.get('team.detail.not_recruiting')}</span>
                </div>
                <a className="leader" onClick={this.linkUserDetail.bind(this, detail.owner)}>
                    <Avatar size="large" src={leaderImage} />
                    <div className="ellipsis">{leaderName}</div>
                </a>
                <div className="content">
                    <div className="entry">
                        <h3 className="no-margin no-padding text-right">{teamSize}</h3>
                        <span> members</span>
                    </div>
                </div>
                <div class="description-box">
                    <hr className="divider"/>
                    <div className="description-title">{recruiting_el}</div>
                    <hr className="divider"/>
                    <div className="description-content" dangerouslySetInnerHTML={{__html: description}} />
                </div>
            </div>
        )
    }

    renderCurrentContributors() {
        const detail = this.props.detail
        const pendingMembers = _.filter(detail.members, { status: TEAM_USER_STATUS.NORMAL })
        const columns = [{
            title: 'Name',
            key: 'name',
            render: candidate => {
                return (
                    <div key={candidate._id}>
                        <Avatar className={'gap-right ' + (candidate.role === 'LEADER' ? 'avatar-leader' : 'avatar-member')}
                            src={candidate.user.profile.avatar}/>
                        <a className="row-name-link" onClick={this.linkProfileInfo.bind(this, candidate.user._id)}>
                            {`${candidate.user.profile.firstName} ${candidate.user.profile.lastName}`}</a>
                    </div>)
            }
        }]
        return (
            <Table
                className="no-borders headerless"
                dataSource={pendingMembers}
                columns={columns}
                bordered={false}
                rowKey="_id"
                pagination={false}>
            </Table>
        )
    }

    renderCurrentApplicants() {
        const detail = this.props.detail
        const pendingMembers = _.filter(detail.members, { status: TEAM_USER_STATUS.PENDING })
        const isTeamOwner = this.isTeamOwner()
        const canWithdraw = (teamCandidateId) => {
            const candidate = _.find(pendingMembers, { _id: teamCandidateId })
            return candidate.user._id === this.props.currentUserId
        }

        const actionRenderer = (candidate) => {
            return (
                <div className="text-right">
                    {this.props.page === 'LEADER' && (isTeamOwner || canWithdraw(candidate._id)) && (
                        <span>
                            <a onClick={this.showAppModal.bind(this, candidate._id)}>{I18N.get('project.detail.view')}</a>
                            <Divider type="vertical"/>
                        </span>
                    )}
                    {canWithdraw(candidate._id) && (
                        <span>
                            <a onClick={this.withdrawUser.bind(this, candidate._id)}>{I18N.get('project.detail.withdraw_application')}</a>
                            {isTeamOwner && <Divider type="vertical"/>}
                        </span>
                    )}
                    {isTeamOwner && (
                        <span>
                            <a onClick={this.approveUser.bind(this, candidate._id)}>{I18N.get('project.detail.approve')}</a>
                            <Divider type="vertical"/>
                            <a onClick={this.rejectUser.bind(this, candidate._id)}>{I18N.get('project.detail.disapprove')}</a>
                        </span>
                    )}
                </div>
            )
        }

        const columns = [{
            title: 'Name',
            key: 'name',
            render: candidate => {
                return (
                    <div key={candidate._id}>
                        <Avatar className="gap-right" src={candidate.user.profile.avatar} />
                        <a className="row-name-link" onClick={this.linkProfileInfo.bind(this, candidate.user._id)}>
                            {`${candidate.user.profile.firstName} ${candidate.user.profile.lastName}`}</a>
                    </div>)
            }
        }, {
            title: 'Action',
            key: 'action',
            render: actionRenderer
        }]

        return (
            <Table
                loading={this.props.loading}
                className="no-borders headerless"
                dataSource={pendingMembers}
                columns={columns}
                bordered={false}
                rowKey="_id"
                pagination={false}>
            </Table>
        )
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.applyToTeam(this.props.teamId, this.props.currentUserId, values.applyMsg)
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

        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="application-form">
                <Form.Item className="no-margin">
                    {applyMsgPanel}
                </Form.Item>
                <Button loading={this.props.loading} className="d_btn pull-left" onClick={() => this.setState({ applying: false })}>
                    Cancel
                </Button>
                <Button loading={this.props.loading} className="d_btn pull-right" type="primary" htmlType="submit">
                    Apply
                </Button>
                <div class="clearfix"/>
            </Form>
        )
    }

    isTeamOwner() {
        return this.props.detail.owner && (this.props.detail.owner._id === this.props.currentUserId)
    }

    isTeamMember() {
        return _.find(this.props.detail.members, (member) => {
            return member.user._id === this.props.currentUserId &&
                member.status === TEAM_USER_STATUS.NORMAL
        })
    }

    hasApplied() {
        return _.find(this.props.detail.members, (member) => {
            return member.user._id === this.props.currentUserId &&
                member.status === TEAM_USER_STATUS.PENDING
        })
    }

    async leaveTeam() {
        const member = _.find(this.props.detail.members, (member) => {
            return member.user._id === this.props.currentUserId &&
                member.status === TEAM_USER_STATUS.NORMAL
        })

        if (member) {
            await this.props.withdrawCandidate(member._id)
            this.props.history.push('/profile/teams')
        }
    }

    getMainActions() {
        const isTeamMember = this.isTeamMember()
        const hasApplied = this.hasApplied()
        const status = this.props.detail.status;
        const mainActionButton = isTeamMember
            ? (
                <Popconfirm title={I18N.get('project.detail.popup.leave_question')} okText="Yes" cancelText="No"
                    onConfirm={this.leaveTeam.bind(this)}>
                    <Button type="primary" loading={this.props.loading}>
                        {I18N.get('project.detail.popup.leave_team')}
                    </Button>
                </Popconfirm>
            )
            : (status == TEAM_STATUS.ACTIVE || hasApplied) && (
                <Button disabled={hasApplied} type="primary" onClick={() => this.setState({ applying: true })}>
                    {hasApplied
                        ? I18N.get('project.detail.popup.applied')
                        : I18N.get('project.detail.popup.join_team')
                    }
                </Button>
            )

        return (
            <Row className="actions">
                {mainActionButton}
            </Row>
        )
    }

    ord_render () {
        const loading = _.isEmpty(this.props.detail)
        const isTeamOwner = this.isTeamOwner()
        const isTeamMember = this.isTeamMember()

        return (
            <div className="c_Team c_TeamDetail">
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
                                    {this.renderUpperLeftBox()}
                                </Col>

                                <Col xs={24} sm={24} md={16} className="col-right">
                                    {this.renderUpperRightBox()}
                                </Col>
                            </Row>

                            {!isTeamOwner && this.getMainActions()}
                            {this.state.applying && this.getApplicationForm()}

                            {!this.state.applying &&
                                <Row className="contributors">
                                    <h3 className="no-margin align-left">{I18N.get('project.detail.current_members')}</h3>
                                    {this.renderCurrentContributors()}
                                </Row>
                            }

                            {!this.state.applying &&
                                <Row className="applications">
                                    <h3 className="no-margin">{I18N.get('project.detail.pending_applications')}</h3>
                                    {this.renderCurrentApplicants()}
                                </Row>
                            }

                            {!this.state.applying && this.props.page === 'LEADER' && (isTeamMember || isTeamOwner) &&
                                <Row>
                                    <Comments type="team" canPost={true} model={this.props.teamId}/>
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
                    <TeamApplication applicantId={this.state.teamCandidateId}/>
                </Modal>
            </div>
        )
    }

    showAppModal = (teamCandidateId) => {
        this.setState({
            showAppModal: true,
            teamCandidateId
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

    linkUserDetail(user) {
        this.props.history.push(`/member/${user._id}`)
    }
}

export default Form.create()(C)
