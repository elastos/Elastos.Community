import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'
import {message, Col, Row, Tag, Icon, Carousel, Avatar, Button, Spin, Select, Table, Input, Form} from 'antd'
import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS, TASK_CANDIDATE_TYPE, TASK_CANDIDATE_STATUS} from '@/constant'
import Comments from '@/module/common/comments/Container'
import _ from 'lodash'
import './style.scss'

const { Column } = Table;

class C extends BaseComponent {
    ord_states() {
        return {
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

    getUpperLeftBox() {
        const details = this.props.detail;

        let carouselImages = []
        for (let i of details.pictures) {
            carouselImages.push(<img src={i.url} key={i}/>)
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

    getUpperRightBox() {
        const detail = this.props.detail
        const name = detail.name || ''
        const leaderName = detail.createdBy.profile
            ? (detail.createdBy.profile.firstName + ' ' + detail.createdBy.profile.lastName)
            : ''
        const deadline = detail.date || ''
        const progress = detail.progress || ''
        const teamSize = detail.candidateCompleted.length || ''
        const reward = detail.reward.isUsd ? detail.reward.usd + ' USD' : detail.reward.ela + ' ELA'
        const description = detail.descBreakdown || detail.description || ''
        const leaderImage = detail.createdBy.profile.avatar || ''

        return (
            <div>
                <div className="title">
                    <span>{name}</span>
                </div>
                <div className="leader">
                    <Avatar size="large" src={leaderImage} />
                    <div className="ellipsis">{leaderName}</div>
                </div>
                <div className="content">
                    <div className="entry">Deadline: {deadline}</div>
                    <div className="entry">Progress: {progress}</div>
                    <div className="entry">Team Size: {teamSize}</div>
                    <div className="reward">{reward}</div>
                </div>
                <div class="description-box">
                    <hr className="divider"/>
                    <div className="description-title">Description</div>
                    <hr className="divider"/>
                    <div className="description-content">{description}</div>
                </div>
            </div>
        )
    }

    getCurrentContributors() {
        const detail = this.props.detail
        let contributors = [];
        let cnt = 1;
        for (let i of detail.candidateCompleted) {
            contributors.push({
                key: cnt.toString(),
                name: i.name || "",
                role: i.role || "",
                progress: i.progress || "",
                notes: i.notes || ""
            })
            cnt = cnt + 1;
        }

        const columns = [{
            title: "Name",
            dataIndex: "name",
            key: "name"
        }, {
            title: "Role",
            dataIndex: "role",
            key: "role"
        }, {
            title: "Progress",
            dataIndex: "progress",
            key: "progress"
        }, {
            title: "Notes",
            dataIndex: "notes",
            key: "notes"
        }]

        return(
            <Table
                className="no-borders"
                dataSource={contributors}
                columns={columns}
                bordered={false}
                pagination={false}
            />
        )
    }

    getCurrentApplicants() {
        const detail = this.props.detail
        let applicants = []
        let cnt = 1
        console.log(detail)
        for (let i of detail.candidates) {

            let fullName
            let role
            if (i.type === TASK_CANDIDATE_TYPE.USER) {
                fullName = i.user.profile ? (i.user.profile.firstName + " " + i.user.profile.lastName) : ""
                role = i.user.profile ? i.user.profile.role : ""
            } else if (i.type === TASK_CANDIDATE_TYPE.TEAM) {
                fullName = i.team.name || ""
                role = ""
            }

            applicants.push({
                key: cnt.toString(),
                name: fullName,
                role: role,
                status: i.status || "",
            })
            cnt = cnt + 1;
        }

        return(
            <Table
                className="no-borders"
                dataSource={applicants}
                bordered={false}
                pagination={false}>
                <Column
                    title="Name"
                    dataIndex="name"
                    key="name"
                />
                <Column
                    title="Role"
                    dataIndex="role"
                    key="role"
                />
                <Column
                    title="Status"
                    dataIndex="status"
                    key="status"
                />
            </Table>
        )
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const isSelf = (values.applicant === '$me')
                const userId = isSelf && this.props.currentUserId
                const teamId = !isSelf && values.applicant

                this.props.applyToTask(this.props.taskId, userId, teamId, values.applyMsg)
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
            <Input.TextArea rows={8} className="team-application"
                placeholder="Tell us why you want to join."/>
        )
        const applyMsgPanel = applyMsg_fn(applyMsg_el)

        const applicant_fn = getFieldDecorator('applicant', {
            rules: [],
            initialValue: '$me'
        })
        const applicant_el = (
            <Select className="team-selector pull-right"
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

        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="application-form">
                <Form.Item className="no-margin">
                    {applyMsgPanel}
                </Form.Item>
                <Button className="d_btn pull-left" onClick={() => this.setState({ applying: false })}>
                    Cancel
                </Button>
                <Button className="d_btn pull-right" type="primary" htmlType="submit">
                    Apply
                </Button>
                <Form.Item className="pull-right">
                    {applicantPanel}
                </Form.Item>
                <div class="clearfix"/>
            </Form>
        )
    }

    ord_render () {
        const loading = _.isEmpty(this.props.detail)
        const isTaskOwner = (this.props.task &&
            this.props.task.createdBy && this.props.task.createdBy._id) === this.props.currentUserId

        return (
            <div className="c_Project">
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
                                    {this.getUpperLeftBox()}
                                </Col>

                                <Col xs={24} sm={24} md={16} className="col-right">
                                    {this.getUpperRightBox()}
                                </Col>
                            </Row>

                            {this.props.page !== 'LEADER' &&
                                <Row className="actions">
                                    <Button type="primary" onClick={() => this.setState({ applying: true })}>
                                        Join Project
                                    </Button>
                                    <Button>
                                        Message
                                    </Button>
                                </Row>
                            }

                            {this.state.applying && this.getApplicationForm()}

                            {!this.state.applying &&
                                <Row className="contributors">
                                    <h3 className="no-margin">Current Contributors</h3>
                                    {this.getCurrentContributors()}
                                </Row>
                            }

                            {!this.state.applying &&
                                <Row className="applications">
                                    <h3 className="no-margin">Pending Applications</h3>
                                    {this.getCurrentApplicants()}
                                </Row>
                            }

                            {this.props.page === 'LEADER' &&
                                <Row>
                                    <Comments type="task" canPost={true} canSubscribe={!isTaskOwner} model={this.props.taskId}/>
                                </Row>
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Form.create()(C)
