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
    InputNumber
} from 'antd'
import I18N from '@/I18N'
import { TASK_CANDIDATE_STATUS, TASK_CANDIDATE_TYPE,
    TEAM_USER_STATUS, TASK_STATUS, USER_AVATAR_DEFAULT } from '@/constant'
import Comments from '@/module/common/comments/Container'
import ProjectApplication from '@/module/project/application/Container'
import _ from 'lodash'
import './style.scss'

/*
 * Project Pop-up UI
 *
 */
class C extends BaseComponent {

    ord_states() {
        return {
        }
    }

    componentDidMount() {
        const taskId = this.props.taskId
        this.props.getTaskDetail(taskId)
    }

    componentWillUnmount() {
        this.props.resetTaskDetail()
    }

    isTaskOwner() {
        return this.props.detail.createdBy._id === this.props.currentUserId
    }

    linkProfileInfo(userId) {
        this.props.history.push(`/member/${userId}`)
    }

    showTaskDetail() {
        this.props.history.push(`/task-detail/${this.props.detail._id}`)
    }

    getAvatarWithFallback(avatar) {
        return _.isEmpty(avatar)
            ? USER_AVATAR_DEFAULT
            : avatar
    }

    getUserNameWithFallback(user) {
        if (_.isEmpty(user.profile.firstName) && _.isEmpty(user.profile.lastName)) {
            return user.username
        }

        return _.trim([user.profile.firstName, user.profile.lastName].join(' '))
    }

    ord_render() {
        const detail = this.props.detail
        const loading = this.props.loading || _.isEmpty(this.props.detail)
        const isTaskOwner = this.props.detail.createdBy &&
            (this.props.detail.createdBy._id === this.props.currentUserId)

        return (
            <div className="c_TaskPopup">
                { loading
                    ? (
                        <div className="full-width full-height valign-wrapper halign-wrapper">
                            <Spin className="loading-spinner" />
                        </div>
                    )
                    : (
                        <div>
                            {this.renderHeader()}
                            {this.renderMeta()}
                            {this.renderApplications()}
                            {this.renderFooter()}
                        </div>
                    )
                }
            </div>
        )
    }

    renderHeader() {
        return (
            <div className="app-header">
                <img src="/assets/images/emp35/square.png" className="square"/>
                <span className="komu-a">
                    {this.props.detail.name}
                </span>
            </div>
        )
    }

    renderMeta() {
        const generateRow = (key, value, cssRowClass) => (
            <Row className={[cssRowClass, 'app-meta-row'].join(' ')}>
                <Col span={8}>
                    {key}
                </Col>
                <Col span={16}>
                    {value}
                </Col>
            </Row>
        )

        const detail = this.props.detail
        return (
            <div className="app-meta">
                {generateRow(I18N.get('task.owner'),
                    this.getUserNameWithFallback(detail.createdBy))}

                {detail.circle &&
                    generateRow(I18N.get('task.circle'), detail.circle.name)}

                {generateRow(I18N.get('task.type'), detail.type)}

                {generateRow(I18N.get('task.category'), detail.category)}

                {generateRow(I18N.get('task.description'), detail.description, 'task-description')}

                {detail.applicationDeadline &&
                    generateRow(I18N.get('task.applyDeadline'),
                        moment(detail.applicationDeadline).format('MMM D'))}

                {detail.completionDeadline &&
                    generateRow(I18N.get('task.completionDeadline'),
                        moment(detail.completionDeadline).format('MMM D'))}
            </div>
        )
    }

    renderApplications() {
        return (
            <div>

            </div>
        )
    }

    renderFooter() {
        return (
            <div className="app-footer valign-wrapper halign-wrapper">
                <Button onClick={this.showTaskDetail.bind(this)}>
                    {I18N.get('task.applyMessage')}
                </Button>
            </div>
        )
    }
}

export default Form.create()(C)
