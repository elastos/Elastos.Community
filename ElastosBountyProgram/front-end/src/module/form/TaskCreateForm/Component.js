import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {
    Form,
    Icon,
    Input,
    InputNumber,
    DatePicker,
    Button,
    Checkbox,
    Select,
    message,
    Row,
    Col,
    Upload,
    Cascader,
    Divider,
    Popconfirm

} from 'antd'

import {upload_file} from '@/util'
import './style.scss'
import moment from 'moment'

import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS} from '@/constant'

const FormItem = Form.Item
const TextArea = Input.TextArea

/**
 * This is generic task create form for both Developer and Social Bounties / Events
 *
 * Which version of the form depends on the leader's program
 *
 * Leaders - can create:
 * - Events (offline) restricted to their area - must be approved
 * - Events (online) anywhere - Social or Developer
 *
 * TODO: in the future we should developer leaders
 *
 * Community Leaders - each community has a leader
 * - a leader can create events in their own local community or online community
 * - local offline events are automatically shown in their local community, a country leader
 *  can create events in any child community
 * - these events are shown in the Social page as well
 * - a local event can have sub tasks, these are shown as tasks in the Social page
 */
class C extends BaseComponent {
    state = {
        communityTrees: []
    }

    componentDidMount() {
        const taskId = this.props.match.params.taskId
        taskId && this.props.getTaskDetail(taskId)
        this.getCommunityTrees()
    }

    componentWillUnmount() {
        this.props.resetTaskDetail()
    }

    handleSubmit (e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.taskCommunity) {
                    if (values.taskCommunity.length > 1) {
                        values.communityParent = values.taskCommunity[0]
                        values.community = values.taskCommunity[1]
                    } else {
                        values.communityParent = null
                        values.community = values.taskCommunity[0]
                    }
                }

                if (this.state.editing) {
                    this.props.updateTask(values, this.state).then(() => {
                        this.props.getTaskDetail(this.props.existingTask._id)
                    })
                    this.props.switchEditMode()
                } else {
                    this.props.createTask(values, this.state)
                }
            }
        })
    }

    constructor (props) {
        super(props)

        this.state = {
            upload_url: null,
            upload_loading: false,

            attachment_url: (props.existingTask && props.existingTask.attachment) || null,
            attachment_loading: false,
            attachment_filename: (props.existingTask && props.existingTask.attachmentFilename) || '',
            attachment_type: '',

            removeAttachment: false,

            editing: !!props.existingTask,

            isUsd: (props.existingTask && props.existingTask.reward.isUsd) || false
        }
    }

    getInputProps () {
        const {getFieldDecorator} = this.props.form
        const existingTask = this.props.existingTask

        // if this is approved - TODO: back-end restrictions + tests
        // this is for the organizer page and editing is more restrictive
        // unless it's just CREATED/PENDING
        const hasLeaderEditRestrictions = this.props.page === 'LEADER' &&
            ![TASK_STATUS.CREATED, TASK_STATUS.PENDING].includes(existingTask.status)

        const assignSelf_fn = getFieldDecorator('assignSelf')
        const assignSelf_el = (
            <Checkbox/>
        )

        const taskName_fn = getFieldDecorator('taskName', {
            rules: [
                {required: true, message: 'Please input a task name'},
                {min: 4, message: 'Task Name too short'}
            ],
            initialValue: this.state.editing && existingTask ? existingTask.name : ''
        })
        const taskName_el = (
            <Input size="large"/>
        )

        const taskCategory_fn = getFieldDecorator('taskCategory', {
            rules: [{required: true, message: 'Please select a category'}],
            initialValue: this.state.editing ? existingTask.category : TASK_CATEGORY.SOCIAL
        })
        const taskCategory_el = (
            <Select disabled={hasLeaderEditRestrictions}>
                <Option value={TASK_CATEGORY.SOCIAL}>Social</Option>
                {this.props.is_admin &&
                <Option value={TASK_CATEGORY.DEVELOPER}>Developer</Option>
                }
            </Select>
        )

        // sub-tasks are not here because those can only be created from an existing Task Detail Page
        const taskType_fn = getFieldDecorator('taskType', {
            rules: [{required: true, message: 'Please select a task type'}],
            initialValue: this.state.editing ? existingTask.type : (this.props.taskType || TASK_TYPE.EVENT)
        })
        const taskType_el = (
            <Select disabled={hasLeaderEditRestrictions}>
                <Option value={TASK_TYPE.EVENT}>Event</Option>
                <Option value={TASK_TYPE.TASK}>Task</Option>
            </Select>
        )

        // TODO: restrict community to only the one you are in
        const taskCommunity_fn = getFieldDecorator('taskCommunity', {
            initialValue: existingTask ? existingTask.taskCommunity : []
        })
        const taskCommunity_el = (
            <Cascader options={this.state.communityTrees} placeholder="" changeOnSelect/>
        )

        const applicationDeadline_fn = getFieldDecorator('taskApplicationDeadline', {
            initialValue: this.state.editing &&
                existingTask.applicationDeadline &&
                moment(existingTask.applicationDeadline).isValid() ? moment(existingTask.applicationDeadline) : null
        })
        const applicationDeadline_el = (
            <DatePicker/>
        )

        const completionDeadline_fn = getFieldDecorator('taskCompletionDeadline', {
            initialValue: this.state.editing &&
                existingTask.completionDeadline &&
                moment(existingTask.completionDeadline).isValid() ? moment(existingTask.completionDeadline) : null
        })
        const completionDeadline_el = (
            <DatePicker/>
        )

        const taskDesc_fn = getFieldDecorator('taskDesc', {
            rules: [
                {required: true, message: 'You must have a description'},
                {max: 4096, message: 'Task description too long'}
            ],
            initialValue: this.state.editing ? existingTask.description : ''
        })
        const taskDesc_el = (
            <TextArea rows={6}></TextArea>
        )

        const taskDescBreakdown_fn = getFieldDecorator('taskDescBreakdown', {
            rules: [
                {max: 4096, message: 'Task breakdown too long'}
            ],
            initialValue: this.state.editing ? existingTask.descBreakdown : ''
        })
        const taskDescBreakdown_el = (
            <TextArea rows={4}></TextArea>
        )

        const taskLink_fn = getFieldDecorator('taskLink', {
            rules: [{required: false, message: 'Please input an info link'}],
            initialValue: this.state.editing ? existingTask.infoLink : ''
        })
        const taskLink_el = (
            <Input size="large"/>
        )

        const taskCandLimit_fn = getFieldDecorator('taskCandLimit', {
            rules: [{required: true, type: 'integer', message: 'You must set a limit'}],
            initialValue: this.state.editing ? existingTask.candidateLimit : 10
        })
        const taskCandLimit_el = (
            <InputNumber size="large" disabled={hasLeaderEditRestrictions}/>
        )

        const taskCandSltLimit_fn = getFieldDecorator('taskCandSltLimit', {
            rules: [{required: true, type: 'integer', message: 'You must set a limit'}],
            initialValue: this.state.editing ? existingTask.candidateSltLimit : 1
        })
        const taskCandSltLimit_el = (
            <InputNumber size="large" disabled={hasLeaderEditRestrictions}/>
        )

        const taskRewardUpfront_fn = getFieldDecorator('taskRewardUpfront', {
            initialValue: this.state.editing && existingTask.rewardUpfront.ela ? existingTask.rewardUpfront.ela / 1000 : null
        })
        const taskRewardUpfront_el = (
            <InputNumber size="large" disabled={hasLeaderEditRestrictions}/>
        )

        const taskRewardUpfrontUsd_fn = getFieldDecorator('taskRewardUpfrontUsd', {
            initialValue: this.state.editing && existingTask.rewardUpfront.usd ? existingTask.rewardUpfront.usd / 100 : null
        })
        const taskRewardUpfrontUsd_el = (
            <InputNumber size="large" disabled={hasLeaderEditRestrictions}/>
        )

        const taskRewardUpfrontElaPerUsd_fn = getFieldDecorator('taskRewardUpfrontElaPerUsd', {
            rules: [{required: this.props.form.getFieldValue('taskRewardUpfrontUsd') > 0 && this.props.form.getFieldValue('isUsd'), message: 'Required for USD'}],
            initialValue: this.state.editing && existingTask.rewardUpfront.elaPerUsd ? existingTask.rewardUpfront.elaPerUsd : null
        })
        const taskRewardUpfrontElaPerUsd_el = (
            <InputNumber size="large" disabled={hasLeaderEditRestrictions}/>
        )

        const taskRewardUsd_fn = getFieldDecorator('taskRewardUsd', {
            initialValue: this.state.editing && existingTask.reward.usd ? existingTask.reward.usd / 100 : null
        })
        const taskRewardUsd_el = (
            <InputNumber size="large" disabled={hasLeaderEditRestrictions}/>
        )

        const taskReward_fn = getFieldDecorator('taskReward', {
            initialValue: this.state.editing && existingTask.reward.ela ? existingTask.reward.ela / 1000 : null
        })
        const taskReward_el = (
            <InputNumber size="large" disabled={hasLeaderEditRestrictions}/>
        )

        const taskRewardElaPerUsd_fn = getFieldDecorator('taskRewardElaPerUsd', {
            rules: [{required: this.props.form.getFieldValue('taskRewardUsd') > 0 && this.props.form.getFieldValue('isUsd'), message: 'Required for USD'}],
            initialValue: this.state.editing && existingTask.reward.elaPerUsd ? existingTask.reward.elaPerUsd : null
        })
        const taskRewardElaPerUsd_el = (
            <InputNumber size="large" disabled={hasLeaderEditRestrictions}/>
        )

        const thumbnail_fn = getFieldDecorator('thumbnail', {
            rules: []
        })
        const p_thumbnail = {
            showUploadList: false,
            customRequest: (info) => {
                this.setState({
                    upload_loading: true
                })
                upload_file(info.file).then((d) => {
                    const url = d.url
                    this.setState({
                        upload_loading: false,
                        upload_url: url
                    })
                })
            }
        }
        const thumbnail_el = (
            <Upload name="logo" listType="picture" {...p_thumbnail}>
                {
                    this.state.upload_url ? (
                        <img style={{height: '100px'}} src={this.state.upload_url} />
                    ) : (
                        <Button loading={this.state.upload_loading}>
                            <Icon type="upload" /> Click to upload
                        </Button>
                    )
                }
            </Upload>
        )

        const attachment_fn = getFieldDecorator('attachment', {
            rules: []
        })
        const p_attachment = {
            showUploadList: false,
            customRequest: (info) => {
                this.setState({
                    attachment_loading: true
                })
                upload_file(info.file).then((d) => {
                    const url = d.url
                    this.setState({
                        attachment_loading: false,
                        attachment_url: url,
                        attachment_type: d.type,
                        attachment_filename: d.filename,

                        removeAttachment: false
                    })
                })
            }
        }
        const attachment_el = (
            <Upload name="attachment" {...p_attachment}>
                {
                    this.state.attachment_url ? (
                        <a target="_blank" href={this.state.attachment_url}>
                            {this.state.attachment_type === 'application/pdf'
                                ? <Icon type="file-pdf"/>
                                : <Icon type="file"/>
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
        )

        return {
            assignSelf: assignSelf_fn(assignSelf_el),

            taskName: taskName_fn(taskName_el),
            taskCategory: taskCategory_fn(taskCategory_el),
            taskType: taskType_fn(taskType_el),

            taskApplicationDeadline: applicationDeadline_fn(applicationDeadline_el),
            taskCompletionDeadline: completionDeadline_fn(completionDeadline_el),

            taskCommunity: taskCommunity_fn(taskCommunity_el),

            taskDesc: taskDesc_fn(taskDesc_el),
            taskDescBreakdown: taskDescBreakdown_fn(taskDescBreakdown_el),
            taskLink: taskLink_fn(taskLink_el),
            taskCandLimit: taskCandLimit_fn(taskCandLimit_el),
            taskCandSltLimit: taskCandSltLimit_fn(taskCandSltLimit_el),

            taskRewardUpfront: taskRewardUpfront_fn(taskRewardUpfront_el),
            taskRewardUpfrontUsd: taskRewardUpfrontUsd_fn(taskRewardUpfrontUsd_el),
            taskRewardUpfrontElaPerUsd: taskRewardUpfrontElaPerUsd_fn(taskRewardUpfrontElaPerUsd_el),

            taskReward: taskReward_fn(taskReward_el),
            taskRewardUsd: taskRewardUsd_fn(taskRewardUsd_el),
            taskRewardElaPerUsd: taskRewardElaPerUsd_fn(taskRewardElaPerUsd_el),

            // thumbnail: thumbnail_fn(thumbnail_el),

            // TODO: fix issue where existing attachment can't be removed
            attachment: attachment_fn(attachment_el)
        }
    }

    getCommunityTrees() {
        this.props.getAllCommunities().then((communityTrees) => {
            this.setState({
                communityTrees
            })
        })
    }

    ord_render () {
        const {getFieldDecorator} = this.props.form
        const p = this.getInputProps()
        const existingTask = this.props.existingTask

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12}
            }
        }

        const formItemLayoutAdjLeft = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 16}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 8}
            }
        }

        const formItemLayoutAdjRight = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 10}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14}
            }
        }

        const formItemNoLabelLayout = {
            wrapperCol: {
                xs: {span: 24},
                sm: {offset: 8, span: 12}
            }
        }

        // const existingTask = this.props.existingTask

        // TODO: terms of service checkbox\

        // TODO: react-motion animate slide left

        // TODO: description CKE Editor

        return (
            <div className="c_taskCreateFormContainer">

                <Form onSubmit={this.handleSubmit.bind(this)} className="d_taskCreateForm">
                    <div>
                        {!this.props.existingTask &&
                            <FormItem label="Assign to Self" {...formItemLayout}>
                                {p.assignSelf} - assigns you as the applicant and automatically submits to an admin for approval
                            </FormItem>
                        }
                        <FormItem label="Task Name" {...formItemLayout}>
                            {p.taskName}
                        </FormItem>
                        <FormItem label="Community" {...formItemLayout}>
                            {p.taskCommunity}
                        </FormItem>
                        {/*
                        <FormItem label="Thumbnail" {...formItemLayout}>
                            {p.thumbnail}
                        </FormItem>
                        */}
                        <FormItem label="Category" {...formItemLayout}>
                            {p.taskCategory}
                        </FormItem>
                        <FormItem label="Type" {...formItemLayout}>
                            {p.taskType}
                        </FormItem>
                        <FormItem label="Application Deadline" {...formItemLayout}>
                            {p.taskApplicationDeadline}
                        </FormItem>
                        <FormItem label="Completion Deadline" {...formItemLayout}>
                            {p.taskCompletionDeadline}
                        </FormItem>
                        <FormItem label="Description" {...formItemLayout}>
                            {p.taskDesc}
                        </FormItem>

                        <Row>
                            <Col offset="8" span="12">
                                For larger events/tasks please breakdown the budget/rewards
                            </Col>
                        </Row>
                        <FormItem {...formItemNoLabelLayout}>
                            {p.taskDescBreakdown}
                        </FormItem>
                        <FormItem label="Info Link" {...formItemLayout}>
                            {p.taskLink}
                        </FormItem>
                        <Row>
                            <Col span={12}>
                                <FormItem label="Max Applicants" {...formItemLayoutAdjLeft}>
                                    {p.taskCandLimit}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Applicants Accepted" {...formItemLayoutAdjRight}>
                                    {p.taskCandSltLimit}
                                </FormItem>
                            </Col>
                        </Row>
                        <Divider>Budget / Reward <Icon className="help-icon" type="question-circle-o" onClick={() => { this.props.history.push('/faq') }}/></Divider>

                        <FormItem label="Fiat ($USD)" {...formItemLayout}>
                            <Checkbox name="isUsd" checked={this.state.isUsd} onChange={() => { this.setState({isUsd: !this.state.isUsd}) }}/>
                            &nbsp; - for larger tasks/events only - payment is always in ELA equivalent
                        </FormItem>

                        {this.state.isUsd
                            ? <div>
                                <Row>
                                    <Col span={12}>
                                        <FormItem label="USD Budget" {...formItemLayoutAdjLeft}>
                                            {p.taskRewardUpfrontUsd}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem label="ELA/USD" {...formItemLayoutAdjRight}>
                                            {p.taskRewardUpfrontElaPerUsd}
                                        </FormItem>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <FormItem label="USD Reward" {...formItemLayoutAdjLeft}>
                                            {p.taskRewardUsd}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem label="ELA/USD" {...formItemLayoutAdjRight}>
                                            {p.taskRewardElaPerUsd}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                            : <Row>
                                <Col>
                                    <FormItem label="ELA Budget" {...formItemLayout}>
                                        {p.taskRewardUpfront}
                                    </FormItem>
                                    <FormItem label="ELA Reward" {...formItemLayout}>
                                        {p.taskReward}
                                    </FormItem>
                                </Col>
                            </Row>

                        }

                        <Divider>Attachment</Divider>

                        {/*
                        ********************************************************************************
                        * Attachment
                        ********************************************************************************
                        */}
                        {!this.state.attachment_url
                            ? <FormItem {...formItemNoLabelLayout}>
                                {p.attachment}
                            </FormItem>
                            : <Row>
                                <Col offset={8} span={16}>
                                    <a target="_blank" href={this.state.attachment_url}>
                                        {this.state.attachment_type === 'application/pdf'
                                            ? <Icon type="file-pdf"/>
                                            : <Icon type="file"/>
                                        } &nbsp;
                                        {this.state.attachment_filename}
                                    </a>
                                    <Popconfirm title="Are you sure you want to remove this attachment?" okText="Yes" onConfirm={this.removeAttachment.bind(this)}>
                                        <Icon className="remove-attachment" type="close-circle"/>
                                    </Popconfirm>
                                    <br/>
                                </Col>
                            </Row>
                        }
                        <br/>
                        <FormItem {...formItemNoLabelLayout}>
                            <Button loading={this.props.loading} type="ebp" htmlType="submit" className="d_btn">
                                {this.state.editing ? 'Save Changes' : (this.props.is_admin ? 'Create Task' : 'Submit Proposal')}
                            </Button>
                        </FormItem>
                    </div>
                </Form>
            </div>
        )
    }

    removeAttachment() {
        this.setState({
            attachment_loading: false,
            attachment_url: null,
            attachment_type: '',
            attachment_filename: '',

            removeAttachment: true
        })
    }
}
export default Form.create()(C)
