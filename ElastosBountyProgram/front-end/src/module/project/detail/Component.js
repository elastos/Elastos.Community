import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'
import {Col, Row, Tag, Icon, Carousel, Avatar, Button, Spin, Select, Table, Input, Form} from 'antd'
import _ from 'lodash'
import './style.scss'

const { Column } = Table;

export default class extends BaseComponent {

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
                    <Carousel>
                        {carouselImages}
                    </Carousel>
                </div>
                <hr className="divider"/>
                <div className="domains-container">
                    {domains}
                </div>
            </div>
        )
    }

    renderUpperRightBox() {
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

        return (
            <div>
                <div className="title">
                    <span>{name}</span>
                    <Icon className="badge" type="home"/>
                </div>
                <div className="leader">
                    <Avatar size="large" src={leaderImage} />
                    <div>Leader: {leaderName}</div>
                </div>
                <div className="content">
                    <div className="entry">Deadline: {deadline}</div>
                    <div className="entry">Progress: {progress}</div>
                    <div className="entry">Team Size: {teamSize}</div>
                    <div className="reward">{reward}</div>
                </div>
                <hr className="divider"/>
                <div className="description-title">Description</div>
                <hr className="divider"/>
                <div className="description-content">{description}</div>
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

    getApplicationForm() {
        return (
            <Form className="application-form">
                <Form.Item className="no-margin">
                    <Input.TextArea rows={8} className="team-application"
                        placeholder="Tell us why you want to join."/>
                </Form.Item>
                <Button className="pull-left" onClick={() => this.setState({ applying: false })}>
                    Cancel
                </Button>
                <Button className="pull-right" type="primary">
                    Apply
                </Button>
                <Form.Item className="pull-right">
                    <Select defaultValue="$me" className="team-selector pull-right"
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
                </Form.Item>
                <div class="clearfix"/>
            </Form>
        )
    }

    ord_render () {
        const loading = _.isEmpty(this.props.detail)
        console.log(this.props.detail);
        return (
            <div className="c_Project">
                { loading && <Spin className="loading-spinner" />}
                { !loading &&
                    <div>
                        <Row className="top-section">
                            <Col xs={24} sm={24} md={8} className="col-left">
                                {this.renderUpperLeftBox()}
                            </Col>

                            <Col xs={24} sm={24} md={16} className="col-right">
                                {this.renderUpperRightBox()}
                            </Col>
                        </Row>
                        <Row className="actions">
                            <span className="callToActionText">Currently Hiring!</span>
                            <Button type="primary" onClick={() => this.setState({ applying: true })}>
                                Join Project
                            </Button>
                            <Button>
                                Message
                            </Button>
                        </Row>

                        {this.state.applying && this.getApplicationForm()}

                        <Row className="contributors">
                            <div className="title">Current Contributors</div>
                            {this.renderCurrentContributors()}
                        </Row>
                        <Row className="applications">
                            <div className="title">Pending Applications</div>
                            {this.renderCurrentApplicants()}
                        </Row>
                    </div>
                }
            </div>
        )
    }
}
