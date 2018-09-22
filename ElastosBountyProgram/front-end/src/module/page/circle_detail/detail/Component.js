import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import { TEAM_USER_STATUS } from '@/constant'
import {Avatar, Button, Col, Form, Icon, Popconfirm, Row, Spin, Table, Input} from 'antd'
import Comments from '@/module/common/comments/Container'
import './style.scss'
import _ from 'lodash'
import I18N from '@/I18N'

const FormItem = Form.Item;
const { TextArea } = Input;

class C extends BaseComponent {

    ord_states() {
        return {
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
            await this.props.withdrawCandidate(member._id)
            this.props.history.push('/profile/teams')
        }
    }

    getMainActions() {
        const isTeamMember = this.isTeamMember()
        const hasApplied = this.hasApplied()
        const mainActionButton = isTeamMember
            ? (
                <Popconfirm title={I18N.get('project.detail.popup.leave_question')} okText="Yes" cancelText="No"
                    onConfirm={this.leaveTeam.bind(this)}>
                    <Button type="primary" loading={this.props.loading}>
                        {I18N.get('project.detail.popup.leave_team')}
                    </Button>
                </Popconfirm>
            )
            : (
                <Button className="join-button cr-btn" disabled={hasApplied} onClick={() => this.setState({ applying: true })}>
                    { hasApplied
                        ? I18N.get('project.detail.popup.applied')
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
            <div>
                <span className="circle-name komu-a">{this.props.detail.name}</span>
                <Row>
                    <Col span={10}>
                        <div className="circle-contributor-number komu-a">413</div>
                        <span className="circle-contributor-label synthese">Contributors</span>
                    </Col>
                    <Col span={4}>
                        {this.getMainActions()}
                        <img className="circle-down-arrow" src="/assets/images/emp35/down_arrow.png"/>
                    </Col>
                    <Col span={10}>
                        <div className="circle-members-number komu-a">85</div>
                        <span className="circle-members-label synthese">Members</span>
                    </Col>
                </Row>
            </div>
        )
    }

    linkProfileInfo(userId) {
        this.props.history.push(`/member/${userId}`)
    }

    renderContent() {
        return (
            <div className="content-paragraphs">
                <p className="synthese">A circle is a simple closed curve that divides the plane into two regions: an interior and an exterior.
                    In everyday use, the term "circle" may be used interchangeably to refer to either the boundary of the figure,
                    or to the whole figure including its interior; in strict technical usage, the circle is only the boundary and
                    the whole figure is called a disc.</p>
                <p className="synthese">A circle may also be defined as a special kind of ellipse in which the
                    two foci are coincident and the eccentricity is 0, or the two-dimensional shape enclosing the most area per
                    unit perimeter squared, using calculus of variations.</p>
            </div>
        )
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
                            src={candidate.user.profile.avatar}/>
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
                    <div className="member-header-label komu-a">Member</div>
                </div>
                <div className="members-list">
                    <Table
                        className="no-borders headerless cr-table-scroll"
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
                    <div className="form-header komu-a">Create Post</div>
                </div>
                <Comments
                    headlines={true}
                    type="team"
                    canPost={true}
                    model={this.props.match.params.circleId}/>
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
            </div>)
        )
    }
}

export default Form.create()(C)
