import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'
import {message, Col, Row, Tag, Icon, Carousel, Avatar, Button, Spin, Select, Table, Input, Form} from 'antd'
import _ from 'lodash'
import './style.scss'
import Comments from '@/module/common/comments/Container'

const { Column } = Table;

class C extends BaseComponent {
    ord_states() {
        return {
        }
    }

    componentDidMount() {
        const teamId = this.props.teamId
        this.props.getTeamDetail(teamId)
    }

    componentWillUnmount() {
        this.props.resetTeamDetail()
    }

    renderUpperLeftBox() {
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

    renderUpperRightBox() {
        const detail = this.props.detail
        const name = detail.name || ''
        const leaderName = detail.owner.profile
            ? (detail.owner.profile.firstName + ' ' + detail.owner.profile.lastName)
            : ''
        const teamSize = /* detail.candidateCompleted.length || */ ''
        const description = detail.profile.description || ''
        const leaderImage = detail.owner.profile.avatar || ''

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
                    <div className="entry">Team Size: {teamSize}</div>
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

    renderCurrentContributors() {
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

    renderCurrentApplicants() {
        const detail = this.props.detail
        let applicants = [];
        let cnt = 1;
        for (let i of detail.candidates) {
            applicants.push({
                key: cnt.toString(),
                name: i.name || "",
                role: i.role || "",
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
            <Input.TextArea rows={8} className="team-application"
                placeholder="Tell us why you want to join."/>
        )
        const applyMsgPanel = applyMsg_fn(applyMsg_el)

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
                <div class="clearfix"/>
            </Form>
        )
    }

    ord_render () {
        const loading = _.isEmpty(this.props.detail)
        const isTeamOwner = (this.props.team &&
            this.props.team.owner && this.props.team.owner._id) === this.props.currentUserId

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
                                    {this.renderUpperLeftBox()}
                                </Col>

                                <Col xs={24} sm={24} md={16} className="col-right">
                                    {this.renderUpperRightBox()}
                                </Col>
                            </Row>

                            {this.props.page !== 'LEADER' && !isTeamOwner &&
                                <Row className="actions">
                                    <Button type="primary" onClick={() => this.setState({ applying: true })}>
                                        Join Team
                                    </Button>
                                    <Button>
                                        Message
                                    </Button>
                                </Row>
                            }

                            {this.state.applying && this.getApplicationForm()}

                            {!this.state.applying &&
                                <Row className="contributors">
                                    <h3 className="no-margin">Current Members</h3>
                                    {false && this.renderCurrentContributors()}
                                </Row>
                            }

                            {!this.state.applying &&
                                <Row className="applications">
                                    <h3 className="no-margin">Pending Applications</h3>
                                    {false && this.renderCurrentApplicants()}
                                </Row>
                            }

                            {false && this.props.page === 'LEADER' &&
                                <Row>
                                    <Comments type="team" canPost={true} canSubscribe={!isTeamOwner} model={this.props.teamId}/>
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
