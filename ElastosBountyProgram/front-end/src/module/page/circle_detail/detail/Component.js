import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import { TEAM_USER_STATUS } from '@/constant'
import {Avatar, Button, Col, Form, Icon, Popconfirm, Row, Spin, Table, Input, Modal} from 'antd'
import Comments from '@/module/common/comments/Container'
import LoginOrRegisterForm from '@/module/form/LoginOrRegisterForm/Container'
import './style.scss'
import _ from 'lodash'
import I18N from '@/I18N'

const FormItem = Form.Item;
const { TextArea } = Input;

class C extends BaseComponent {
    ord_states() {
        return {
            showLoginRegisterModal: false
        }
    }

    componentDidMount() {
        const teamId = this.props.match.params.circleId
        this.props.getTeamDetail(teamId)
    }

    componentWillUnmount() {
        this.props.resetTeamDetail()
    }

    renderMain() {
        return (
            <div className="c_CircleDetail">
                {this.renderDetail()}
            </div>
        )
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
            this.props.withdrawCandidate(member._id)
        }
    }

    applyToCircle() {
        if (this.props.is_login) {
            this.props.applyToTeam(this.props.match.params.circleId,
                this.props.currentUserId)
        } else {
            this.showLoginRegisterModal()
        }
    }

    getMainActions() {
        const isTeamMember = this.isTeamMember()
        const hasApplied = this.hasApplied()
        const maxReached = _.size(this.props.myCircles) >= 2
        const mainActionButton = isTeamMember
            ? (
                <Popconfirm title={I18N.get('project.detail.popup.leave_question')}
                    okText={I18N.get('.yes')} cancelText={I18N.get('.no')}
                    onConfirm={this.leaveTeam.bind(this)}>
                    <Button className="cr-btn" type="primary" loading={this.props.loading}>
                        {I18N.get('circle.header.leave')}
                    </Button>
                </Popconfirm>
            )
            : (
                <Button className="join-button cr-btn" disabled={hasApplied || maxReached} onClick={() => this.applyToCircle()}
                    loading={this.props.loading}>
                    { hasApplied
                        ? I18N.get('project.detail.popup.applied')
                        : maxReached
                            ? I18N.get('circle.header.maxReached')
                            : I18N.get('circle.header.join')
                    }
                </Button>
            )

        return (
            <Row className="actions">
                {mainActionButton}
            </Row>
        )
    }

    renderHeader() {
        return (
            <div className="header-container">
                <img className="circle-rectangle" src="/assets/images/emp35/circle_rectangle.png"/>
                <div className="circle-name komu-a">{this.props.detail.name}</div>
                <Row>
                    <Col span={8} className="left-col">
                        <div className="circle-contributor-number komu-a">{_.size(this.props.detail.comments)}</div>
                        <span className="circle-contributor-label synthese">{I18N.get('circle.posts')}</span>
                    </Col>
                    <Col span={8}>
                        {this.getMainActions()}
                        <img className="circle-down-arrow" src="/assets/images/emp35/down_arrow.png"/>
                    </Col>
                    <Col span={8} className="right-col">
                        <div className="circle-members-number komu-a">{_.size(this.props.detail.members)}</div>
                        <span className="circle-members-label synthese">{I18N.get('circle.members')}</span>
                    </Col>
                </Row>
            </div>
        )
    }

    linkProfileInfo(userId) {
        this.props.history.push(`/member/${userId}`)
    }

    renderContent() {
        const description = this.props.detail.profile.description ||
            I18N.get('emp35.circles.statement')
        return (
            <div className="content-paragraphs">
                <p className="synthese">{description}</p>
            </div>
        )
    }

    getAvatarWithFallback(avatar) {
        return _.isEmpty(avatar)
            ? '/assets/images/Elastos_Logo.png'
            : avatar
    }

    renderMembers() {
        const members = _.filter(this.props.detail.members, { status: TEAM_USER_STATUS.NORMAL })
        const columns = [{
            title: 'Name',
            key: 'name',
            render: candidate => {
                return (
                    <div key={candidate._id}>
                        <Avatar className={'gap-right ' + (candidate.role === 'LEADER' ? 'avatar-leader' : 'avatar-member')}
                            src={this.getAvatarWithFallback(candidate.user.profile.avatar)}/>
                        <a className="row-name-link" onClick={this.linkProfileInfo.bind(this, candidate.user._id)}>
                            {`${candidate.user.profile.firstName} ${candidate.user.profile.lastName}`}</a>
                    </div>
                )
            }
        }]
        return (
            <div>
                <div className="member-header">
                    <div className="member-header-icon"><img src="/assets/images/tri-square-dark.svg"/></div>
                    <div className="member-header-label komu-a">{I18N.get('circle.members')}</div>
                </div>
                <div className="members-list">
                    <Table
                        className="no-borders headerless"
                        dataSource={members}
                        columns={columns}
                        bordered={false}
                        rowKey="_id"
                        pagination={false}
                        scroll={{ y: 400 }}>
                    </Table>
                </div>
            </div>
        )
    }

    renderComments() {
        return (
            <div>
                <div className="form-header-wrap">
                    <div className="form-header komu-a">
                        {this.props.is_login
                            ? this.isTeamMember()
                                ? I18N.get('circle.createPost')
                                : I18N.get('circle.joinToPost')
                            : (
                                <div>
                                    <a className="form-header komu-a" onClick={() => this.showLoginRegisterModal()}>
                                        {I18N.get('circle.registerToPost')}
                                    </a>
                                </div>
                            )
                        }
                    </div>
                    <Comments
                        headlines={true}
                        type="team"
                        canPost={this.isTeamMember()}
                        model={this.props.detail}/>
                </div>
            </div>
        )
    }

    ord_render () {
        return (_.isEmpty(this.props.detail, true) ? (
            <div className="valign-wrapper halign-wrapper">
                <Spin size="large"/>
            </div>) : (
            <div className="c_Circle c_Detail">
                <div className="header">
                    <div className="left-box-container">
                        <div className="box"/>
                    </div>
                    <div className="upper-box-container">
                        <img src="/assets/images/training_green_slashed_box.png"/>
                    </div>
                    <div className="right-box-container">
                        <div className="small-box"/>
                        <div className="box"/>
                        <img src="/assets/images/oomph.png"/>
                    </div>
                    {this.renderHeader()}
                </div>
                <div className="content-section">
                    {this.renderContent()}
                </div>
                <div className="members-section">
                    {this.renderMembers()}
                </div>
                <div className="rectangle double-size pull-right"/>
                <div className="clearfix"/>
                {this.renderComments()}
                <div className="rectangle"/>
                <div className="rectangle double-size"/>
                {this.renderLoginOrRegisterModal()}
            </div>)
        )
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

    showLoginRegisterModal = () => {
        sessionStorage.setItem('loginRedirect', `/empower35-detail/${this.props.match.params.circleId}`)
        sessionStorage.setItem('registerRedirect', `/empower35-detail/${this.props.match.params.circleId}`)

        this.setState({
            showLoginRegisterModal: true
        })
    }

    handleLoginRegisterModalOk = (e) => {
        sessionStorage.removeItem('registerRedirect')

        this.setState({
            showLoginRegisterModal: false
        })
    }

    handleLoginRegisterModalCancel = (e) => {
        sessionStorage.removeItem('registerRedirect')

        this.setState({
            showLoginRegisterModal: false
        })
    }
}

export default Form.create()(C)
