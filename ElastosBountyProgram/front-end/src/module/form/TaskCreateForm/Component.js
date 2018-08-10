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
    Popover,
    Row,
    Col,
    Upload,
    Cascader,
    Divider,
    Popconfirm,
    TreeSelect,
    Modal
} from 'antd'

import I18N from '@/I18N'
import {upload_file} from "@/util";
import './style.scss'
import moment from 'moment'
import _ from 'lodash'

import {TEAM_TASK_DOMAIN, SKILLSET_TYPE, TASK_CATEGORY, TASK_TYPE,
    TASK_STATUS, TASK_EVENT_DATE_TYPE} from '@/constant'

const FormItem = Form.Item
const TextArea = Input.TextArea
const Option = Select.Option

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

                values.pictures = this.state.fileList || []
                _.each(values.pictures, (pictureFile) => {
                    if (this.pictureUrlLookups[pictureFile.uid]) {
                        pictureFile.url = this.pictureUrlLookups[pictureFile.uid]
                    }
                })

                if (this.props.is_project) {
                    values.type = TASK_TYPE.PROJECT
                    values.category = TASK_CATEGORY.DEVELOPER
                }

                if (this.state.editing) {
                    this.props.updateTask(values, this.state).then(() => {
                        this.props.getTaskDetail(this.props.existingTask._id)
                    });
                    this.props.switchEditMode()
                } else {
                    this.props.createTask(values, this.state);
                }
            }
        })
    }

    constructor (props) {
        super(props)

        this.state = {
            communityTrees: [],
            taskType: this.props.taskType || TASK_TYPE.EVENT,
            taskCategory: this.props.taskCategory || TASK_TYPE.SOCIAL,
            assignSelf: (props.existingTask && props.existingTask.assignSelf) || false,

            eventDateRange: (props.existingTask && props.existingTask.eventDateRange) || false,

            upload_url : null,
            upload_loading : false,

            attachment_url: (props.existingTask && props.existingTask.attachment) || null,
            attachment_loading: false,
            attachment_filename: (props.existingTask && props.existingTask.attachmentFilename) || '',
            attachment_type: '',

            removeAttachment: false,

            editing: !!props.existingTask,

            isUsd: (props.existingTask && props.existingTask.reward.isUsd) || false,

            fileList: [],
            previewVisible: false,
            previewImage: ''
        };
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
            <Checkbox
                checked={this.state.assignSelf}
                disabled={!!existingTask}
                onClick={() => this.setState({assignSelf: !this.state.assignSelf})}
            />
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
            initialValue: this.state.editing ? existingTask.category : (this.state.taskCategory || TASK_CATEGORY.SOCIAL)
        })
        const taskCategory_el = (
            <Select
                disabled={hasLeaderEditRestrictions} onChange={(val) => {
                this.setState({taskCategory: val})
                if (this.state.taskCategory === TASK_TYPE.PROJECT) {
                    // this.setState({taskType: TASK_TYPE.TASK})
                }
            }}>
                <Option value={TASK_CATEGORY.SOCIAL}>Social</Option>
                {this.props.is_admin &&
                <Option value={TASK_CATEGORY.DEVELOPER}>Developer</Option>
                }
            </Select>
        )

        // sub-tasks are not here because those can only be created from an existing Task Detail Page
        const taskType_fn = getFieldDecorator('taskType', {
            rules: [{required: true, message: 'Please select a task type'}],
            initialValue: this.state.editing ? existingTask.type : (this.state.taskType || TASK_TYPE.EVENT)
        })
        const taskType_el = (
            <Select
                disabled={hasLeaderEditRestrictions} onChange={(val) => this.setState({taskType: val})}>
                <Option value={TASK_TYPE.EVENT}>Event</Option>
                <Option value={TASK_TYPE.TASK}>Task</Option>
                {this.state.taskCategory === TASK_CATEGORY.DEVELOPER &&
                <Option value={TASK_TYPE.PROJECT}>Project</Option>
                }
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
        const taskGoals_fn = getFieldDecorator('taskGoals', {
            rules: [
                {max: 4096, message: 'Task breakdown too long'}
            ],
            initialValue: this.state.editing ? existingTask.goals : ''
        })
        const taskGoals_el = (
            <TextArea rows={4}></TextArea>
        )

        const taskLink_fn = getFieldDecorator('taskLink', {
            rules: [{required: false, message: 'Please input an info link'}],
            initialValue: this.state.editing ? existingTask.infoLink : ''
        })
        const taskLink_el = (
            <Input size="large"/>
        )

        /*
        ********************************************************************************************************
        * Event Info
        ********************************************************************************************************
        */
        const eventDateRange_fn = getFieldDecorator('eventDateRange')
        const eventDateRange_el = (
            <Checkbox
                checked={this.state.eventDateRange}
                onClick={() => this.setState({eventDateRange: !this.state.eventDateRange})}
            />
        )

        const eventDateStatus_fn = getFieldDecorator('eventDateStatus', {
            initialValue: this.state.editing && existingTask.eventDateStatus ? existingTask.eventDateStatus : TASK_EVENT_DATE_TYPE.TENTATIVE
        })
        const eventDateStatus_el = (
            <Select>
                <Option value={TASK_EVENT_DATE_TYPE.NOT_APPLICABLE}>N/A</Option>
                <Option value={TASK_EVENT_DATE_TYPE.TENTATIVE}>Tentative</Option>
                <Option value={TASK_EVENT_DATE_TYPE.CONFIRMED}>Confirmed</Option>
            </Select>
        )

        const eventDateRangeStart_fn = getFieldDecorator('eventDateRangeStart', {
            initialValue: this.state.editing &&
                existingTask.eventDateRangeStart &&
                moment(existingTask.eventDateRangeStart).isValid() ? moment(existingTask.eventDateRangeStart) : null
        })
        const eventDateRangeStart_el = (
            <DatePicker/>
        )

        const eventDateRangeEnd_fn = getFieldDecorator('eventDateRangeEnd', {
            initialValue: this.state.editing &&
            existingTask.eventDateRangeEnd &&
            moment(existingTask.eventDateRangeEnd).isValid() ? moment(existingTask.eventDateRangeEnd) : null
        })
        const eventDateRangeEnd_el = (
            <DatePicker/>
        )

        const taskLocation_fn = getFieldDecorator('taskLocation', {
            rules: [{required: false, message: 'Please input a location'}],
            initialValue: this.state.editing ? existingTask.location : ''
        })
        const taskLocation_el = (
            <Input size="large"/>
        )

        /*
        ********************************************************************************************************
        * Budget / Reward
        ********************************************************************************************************
        */

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
        });
        const p_thumbnail = {
            showUploadList: false,
            customRequest :(info)=>{
                this.setState({
                    upload_loading: true
                });
                upload_file(info.file).then((d)=>{
                    const url = d.url;
                    this.setState({
                        upload_loading: false,
                        upload_url : url
                    });
                })
            }
        };
        const thumbnail_el = (
            <Upload name="logo" listType="picture" {...p_thumbnail}>
                {
                    this.state.upload_url ? (
                        <img style={{height:'100px'}} src={this.state.upload_url} />
                        ) : (
                        <Button loading={this.state.upload_loading}>
                            <Icon type="upload" /> Click to upload
                        </Button>
                    )
                }
            </Upload>
        );

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

        const specs = [
            {
                title: I18N.get('team.spec.social'),
                value: TEAM_TASK_DOMAIN.SOCIAL,
                key: TEAM_TASK_DOMAIN.SOCIAL
            },
            {
                title: I18N.get('team.spec.iot'),
                value: TEAM_TASK_DOMAIN.IOT,
                key: TEAM_TASK_DOMAIN.IOT
            },
            {
                title: I18N.get('team.spec.media'),
                value: TEAM_TASK_DOMAIN.MEDIA,
                key: TEAM_TASK_DOMAIN.MEDIA
            },
            {
                title: I18N.get('team.spec.finance'),
                value: TEAM_TASK_DOMAIN.FINANCE,
                key: TEAM_TASK_DOMAIN.FINANCE
            }
        ]

        const skillsets = [
            {
                title: I18N.get('team.skillset.cpp'),
                value: SKILLSET_TYPE.CPP,
                key: SKILLSET_TYPE.CPP
            },
            {
                title: I18N.get('team.skillset.javascript'),
                value: SKILLSET_TYPE.JAVASCRIPT,
                key: SKILLSET_TYPE.JAVASCRIPT
            },
            {
                title: I18N.get('team.skillset.go'),
                value: SKILLSET_TYPE.GO,
                key: SKILLSET_TYPE.GO
            },
            {
                title: I18N.get('team.skillset.python'),
                value: SKILLSET_TYPE.PYTHON,
                key: SKILLSET_TYPE.PYTHON
            }
        ]

        const domain_fn = getFieldDecorator('domain', {
            rules: [],
            initialValue: (this.props.existingTask && this.props.existingTask.domain) || []
        })
        const domain_el = (
            <TreeSelect treeData={specs} treeCheckable={true} searchPlaceholder={I18N.get('select.placeholder')}/>
        )

        const skillset_fn = getFieldDecorator('recruitedSkillsets', {
            rules: [],
            initialValue: (this.props.existingTask && this.props.existingTask.recruitedSkillsets) || []
        })
        const skillset_el = (
            <TreeSelect treeData={skillsets} treeCheckable={true} searchPlaceholder={I18N.get('select.placeholder')}/>
        )

        const pictures_fn = getFieldDecorator('pictures', {
            rules: [],
            initialValue: ''
        })

        const p_pictures = {
            listType: 'picture-card',
            fileList: this.state.fileList,
            onChange: this.handleFileListChange.bind(this),
            onPreview: this.handlePreview.bind(this),
            customRequest: (info) => {
                upload_file(info.file).then((d) => {
                    this.pictureUrlLookups = this.pictureUrlLookups || []
                    this.pictureUrlLookups[info.file.uid] = d.url
                    info.onSuccess(null, info.file)
                }, info.onError)
            }
        }

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )

        const pictures_el = (
            <Upload name='pictures' {...p_pictures}>
                {this.state.fileList.length >= 3 ? null : uploadButton}
            </Upload>
        )

        return {
            recruitedSkillsets: skillset_fn(skillset_el),
            pictures: pictures_el,
            domain: domain_fn(domain_el),

            assignSelf: assignSelf_fn(assignSelf_el),

            taskName: taskName_fn(taskName_el),
            taskCategory: taskCategory_fn(taskCategory_el),
            taskType: taskType_fn(taskType_el),

            taskApplicationDeadline: applicationDeadline_fn(applicationDeadline_el),
            taskCompletionDeadline: completionDeadline_fn(completionDeadline_el),

            taskCommunity: taskCommunity_fn(taskCommunity_el),

            eventDateStatus: eventDateStatus_fn(eventDateStatus_el),
            eventDateRange: eventDateRange_fn(eventDateRange_el),
            eventDateRangeStart: eventDateRangeStart_fn(eventDateRangeStart_el),
            eventDateRangeEnd: eventDateRangeEnd_fn(eventDateRangeEnd_el),

            taskLocation: taskLocation_fn(taskLocation_el),

            taskDesc: taskDesc_fn(taskDesc_el),
            taskDescBreakdown: taskDescBreakdown_fn(taskDescBreakdown_el),
            taskGoals: taskGoals_fn(taskGoals_el),
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

    handleCancel() {
        this.setState({ previewVisible: false })
    }

    handlePreview(file) {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        })
    }

    handleFileListChange = ({ fileList }) => this.setState({ fileList })

    ord_render () {
        const {getFieldDecorator} = this.props.form
        const p = this.getInputProps()
        const existingTask = this.props.existingTask

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        }

        const formItemLayoutAdjLeft = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
        }

        const formItemLayoutAdjRight = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        }

        const formItemNoLabelLayout = {
            wrapperCol: {
                xs: {span: 24},
                sm: {offset: 8, span: 12},
            },
        }

        // const existingTask = this.props.existingTask

        // TODO: terms of service checkbox\

        // TODO: react-motion animate slide left

        // TODO: description CKE Editor
        return (
            <div className="c_taskCreateFormContainer">

                <Form onSubmit={this.handleSubmit.bind(this)} className="d_taskCreateForm">
                    <div>
                        <Divider>General Info</Divider>
                        {(!existingTask || existingTask.assignSelf) &&
                        <FormItem label="Assign to Self" {...formItemLayout}>
                            {p.assignSelf} - assigns you to the task and submits to an admin for approval
                        </FormItem>}
                        <FormItem label="Name" {...formItemLayout}>
                            {p.taskName}
                        </FormItem>
                        <FormItem label="Community"  {...formItemLayout}>
                            {p.taskCommunity}
                        </FormItem>
                        {/*
                        <FormItem label="Thumbnail" {...formItemLayout}>
                            {p.thumbnail}
                        </FormItem>
                        */}
                        {this.props.taskType !== 'PROJECT' &&
                            <FormItem label="Category" {...formItemLayout}>
                                {p.taskCategory}
                            </FormItem>
                        }
                        {this.props.taskType !== 'PROJECT' &&
                            <FormItem label="Type" {...formItemLayout}>
                                {p.taskType}
                            </FormItem>
                        }
                        <Row>
                            <Col span={12}>
                                <FormItem label="Application Deadline" {...formItemLayoutAdjLeft}>
                                    {p.taskApplicationDeadline}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Complete By" {...formItemLayoutAdjRight}>
                                    {p.taskCompletionDeadline}
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem label="Description" {...formItemLayout}>
                            {p.taskDesc}
                        </FormItem>

                        <Row>
                            <Col offset="8" span="12">
                                For larger events/tasks/projects please breakdown the budget/rewards
                            </Col>
                        </Row>
                        <FormItem {...formItemNoLabelLayout}>
                            {p.taskDescBreakdown}
                        </FormItem>
                        <FormItem label="Goals" {...formItemLayout}>
                            {p.taskGoals}
                        </FormItem>
                        <FormItem label="Info Link" {...formItemLayout}>
                            {p.taskLink}
                        </FormItem>

                        {this.state.taskType === TASK_TYPE.PROJECT &&
                            <div>
                                <Divider>Recruitment</Divider>
                                <FormItem label="Domain" {...formItemLayout}>
                                    {p.domain}
                                </FormItem>
                                <FormItem label="Recruiting Skillsets" {...formItemLayout}>
                                    {p.recruitedSkillsets}
                                </FormItem>
                                <FormItem label="Pictures" {...formItemLayout}>
                                    {p.pictures}
                                </FormItem>
                                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                                    <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                                </Modal>
                            </div>
                        }

                        {/*
                        ********************************************************************************
                        * Event Info
                        ********************************************************************************
                        */}
                        {this.state.taskType === TASK_TYPE.EVENT &&
                        <div>
                            <Divider>Event Info</Divider>
                            <FormItem label="Date Range" {...formItemLayout}>
                                {p.eventDateRange}
                            </FormItem>
                            <Row>
                                <Col span={12}>
                                    <FormItem label={'Event Date' + (this.state.eventDateRange ? ' Start' : '')} {...formItemLayoutAdjLeft}>
                                        {p.eventDateRangeStart}
                                    </FormItem>
                                </Col>
                                {this.state.eventDateRange &&
                                <Col span={12}>
                                    <FormItem label="End" {...formItemLayoutAdjRight}>
                                        {p.eventDateRangeEnd}
                                    </FormItem>
                                </Col>}
                            </Row>
                            <FormItem label="Date Confirmation" {...formItemLayout}>
                                {p.eventDateStatus}
                            </FormItem>
                            <FormItem label="Location" {...formItemLayout}>
                                {p.taskLocation}
                            </FormItem>
                        </div>
                        }


                        {/*
                        ********************************************************************************
                        * Budget / Reward
                        ********************************************************************************
                        */}
                        <Divider>
                            Budget / Reward&nbsp;
                            <Popover content="Budget is for expenses/costs, reward is for labor and time">
                                <Icon className="help-icon" type="question-circle-o"/>
                            </Popover>
                        </Divider>

                        {!this.state.assignSelf &&
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
                        </Row>}

                        <FormItem label="Fiat ($USD)" {...formItemLayout}>
                            <Checkbox name="isUsd" checked={this.state.isUsd} onChange={() => {this.setState({isUsd: !this.state.isUsd})}}/>
                            &nbsp; - for larger events/tasks/projects only - payment is always in ELA equivalent
                        </FormItem>

                        {this.state.isUsd ?
                            <div>
                                {/*TODO: lock Budget/Reward after approval*/}
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
                            </div> :
                            <Row>
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


                        {/*
                        ********************************************************************************
                        * Attachment
                        ********************************************************************************
                        */}
                        <Divider>Attachment</Divider>
                        {!this.state.attachment_url ?
                            <FormItem {...formItemNoLabelLayout}>
                                {p.attachment}
                            </FormItem> :
                            <Row>
                                <Col offset={8} span={16}>
                                    <a target="_blank" href={this.state.attachment_url}>
                                        {this.state.attachment_type === 'application/pdf' ?
                                            <Icon type="file-pdf"/> :
                                            <Icon type="file"/>
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
            attachment_url : null,
            attachment_type: '',
            attachment_filename: '',

            removeAttachment: true
        })
    }

}
export default Form.create()(C)
