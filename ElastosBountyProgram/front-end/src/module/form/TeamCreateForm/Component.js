import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import _ from 'lodash'
import {
    Form,
    Icon,
    Input,
    InputNumber,
    Button,
    Checkbox,
    Radio,
    Select,
    message,
    Row,
    Col,
    Upload,
    Cascader,
    Divider,
    TreeSelect,
    Modal
} from 'antd'
import I18N from '@/I18N'
import InputTags from '@/module/shared/InputTags/Component'
import ReactQuill from 'react-quill';
import {TEAM_TASK_DOMAIN, SKILLSET_TYPE, TEAM_STATUS} from '@/constant'
import {upload_file} from '@/util';
import sanitizeHtml from 'sanitize-html';

import './style.scss'

const FormItem = Form.Item
const TextArea = Input.TextArea
const RadioGroup = Radio.Group

class C extends BaseComponent {
    componentDidMount() {
        const teamId = this.props.match.params.teamId
        teamId && this.props.getTeamDetail(teamId)
    }

    componentWillUnmount() {
        const teamId = this.props.match.params.teamId
        teamId && this.props.resetTeamDetail()
    }

    constructor (props) {
        super(props)

        this.state = {
            editing: !!props.existingTeam,
            fileList: (props.existingTeam && props.existingTeam.pictures) || [],
            previewVisible: false,
            previewImage: '',
            status: TEAM_STATUS.ACTIVE
        }

        this.pictureUrlLookups = []
        _.each(this.state.fileList, (file) => {
            this.pictureUrlLookups[file.uid] = file.url
        })
    }

    handleSubmit (e) {
        e.preventDefault()

        const tags = this.props.form.getFieldInstance('tags').getValue()
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let createParams = {
                    ...values,
                    description: sanitizeHtml(values.description, {
                        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'u', 's' ])
                    }),
                    tags: tags.join(','),
                    logo: '',
                    metadata: '',
                    pictures: this.state.fileList || [],
                    status: this.state.editing ? TEAM_STATUS.ACTIVE : this.state.status
                }

                _.each(createParams.pictures, (pictureFile) => {
                    if (this.pictureUrlLookups[pictureFile.uid]) {
                        pictureFile.url = this.pictureUrlLookups[pictureFile.uid]
                    }
                })

                if (this.state.editing) {
                    createParams.teamId = this.props.existingTeam._id
                    this.props.update(createParams).then(() => {
                        this.props.getTeamDetail(this.props.existingTeam._id)
                        this.props.switchEditMode()
                    })
                } else {
                    await this.props.create(createParams)
                    this.props.history.push('/profile/teams')
                }
            }
        })
    }

    getInputProps () {
        const {getFieldDecorator} = this.props.form
        const existingTeam = this.props.existingTeam

        const input_el = (
            <Input size="large"/>
        )

        const textarea_el = (
            <ReactQuill
                modules={{
                    toolbar: [
                        ['bold', 'italic', 'underline','strike'],
                        [{'list': 'ordered'}, {'list': 'bullet'}]
                    ]
                }}
            />
        )

        const name_fn = getFieldDecorator('name', {
            rules: [
                {required: true, message: I18N.get('team.create.error.nameRequired')},
                {min: 4, message: I18N.get('team.create.error.nameTooShort')}
            ],
            initialValue: (existingTeam && existingTeam.name) || ''
        })

        const specs = [
            {
                title: I18N.get('team.spec.authenticity'),
                value: TEAM_TASK_DOMAIN.AUTHENTICITY,
                key: TEAM_TASK_DOMAIN.AUTHENTICITY
            },
            {
                title: I18N.get('team.spec.currency'),
                value: TEAM_TASK_DOMAIN.CURRENCY,
                key: TEAM_TASK_DOMAIN.CURRENCY
            },
            {
                title: I18N.get('team.spec.exchange'),
                value: TEAM_TASK_DOMAIN.EXCHANGE,
                key: TEAM_TASK_DOMAIN.EXCHANGE
            },
            {
                title: I18N.get('team.spec.finance'),
                value: TEAM_TASK_DOMAIN.FINANCE,
                key: TEAM_TASK_DOMAIN.FINANCE
            },
            {
                title: I18N.get('team.spec.gaming'),
                value: TEAM_TASK_DOMAIN.GAMING,
                key: TEAM_TASK_DOMAIN.GAMING
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
                title: I18N.get('team.spec.social'),
                value: TEAM_TASK_DOMAIN.SOCIAL,
                key: TEAM_TASK_DOMAIN.SOCIAL
            },
            {
                title: I18N.get('team.spec.sovereignty'),
                value: TEAM_TASK_DOMAIN.SOVEREIGNTY,
                key: TEAM_TASK_DOMAIN.SOVEREIGNTY
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
            },
            {
                title: I18N.get('team.skillset.java'),
                value: SKILLSET_TYPE.JAVA,
                key: SKILLSET_TYPE.JAVA
            },
            {
                title: I18N.get('team.skillset.swift'),
                value: SKILLSET_TYPE.SWIFT,
                key: SKILLSET_TYPE.SWIFT
            }
        ]

        const type_fn = getFieldDecorator('domain', {
            rules: [],
            initialValue: existingTeam && existingTeam.domain || []
        })
        const type_el = (
            <div>
                <TreeSelect treeData={specs} treeCheckable={true} searchPlaceholder={I18N.get('select.placeholder')}/>
                <div className='select-arrow'/>
            </div>
        )

        const skillset_fn = getFieldDecorator('recruitedSkillsets', {
            rules: [],
            initialValue: existingTeam && existingTeam.recruitedSkillsets || []
        })
        const skillset_el = (
            <div>
                <TreeSelect treeData={skillsets} treeCheckable={true} searchPlaceholder={I18N.get('select.placeholder')}/>
                <div className='select-arrow'/>
            </div>
        )

        const description_fn = getFieldDecorator('description', {
            rules: [],
            initialValue: existingTeam && existingTeam.profile.description || ''
        })

        const tags_fn = getFieldDecorator('tags', {
            rules: [],
            initialValue: existingTeam && existingTeam.tags || []
        })
        const tags_el = <InputTags />

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
                {this.state.fileList.length >= 5 ? null : uploadButton}
            </Upload>
        )

        return {
            name: name_fn(input_el),
            type: type_fn(type_el),
            description: description_fn(textarea_el),
            tags: tags_fn(tags_el),
            skillset: skillset_fn(skillset_el),
            pictures: pictures_el
        }
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
        const p = this.getInputProps()

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

        const formContent = (
            <div>
                <FormItem label="Team Name" {...formItemLayout}>
                    {p.name}
                </FormItem>
                <FormItem label="Type" {...formItemLayout}>
                    {p.type}
                </FormItem>
                <FormItem label="Recruiting Skillsets" {...formItemLayout}>
                    {p.skillset}
                </FormItem>
                <FormItem label="Description" {...formItemLayout}>
                    {p.description}
                </FormItem>
                { !this.props.embedded &&
                    <FormItem label="Pictures" {...formItemLayout}>
                        {p.pictures}
                    </FormItem>
                }
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                    <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>
                <FormItem className="form-item-tags" label="Tags" {...formItemLayout}>
                    {p.tags}
                </FormItem>

                { !this.props.embedded &&
                    <FormItem wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 12, offset: 8 } }}>
                        {!this.state.editing && <Button loading={this.props.loading} onClick={this.changeStatusActive.bind(this)} htmlType="submit" className="d_btn pull-left create-btn">
                            Create & Open
                        </Button>}
                        <Button loading={this.props.loading} onClick={this.changeStatusDraft.bind(this)} type="ebp" htmlType="submit" className="d_btn pull-left">
                            {this.state.editing ? 'Save' : 'Save as Draft'}
                        </Button>
                    </FormItem>
                }
            </div>
        )

        return (
            <div className="c_userEditFormContainer">

                { this.props.embedded
                    ? (
                        <div className="d_taskCreateForm">
                            {formContent}
                        </div>
                    ) : (
                        <Form onSubmit={this.handleSubmit.bind(this)} className="d_taskCreateForm">
                            {formContent}
                        </Form>
                    )
                }
            </div>
        )
    }
    
    changeStatusActive() {
        this.setState({
            status: TEAM_STATUS.ACTIVE
        })
    }

    changeStatusDraft() {
        if(!this.state.editing){
            this.setState({
                status: TEAM_STATUS.DRAFT
            })
        }
    }

}
export default Form.create()(C)
