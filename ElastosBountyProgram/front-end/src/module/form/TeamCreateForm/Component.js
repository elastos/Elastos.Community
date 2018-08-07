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
import {TEAM_TASK_DOMAIN, SKILLSET_TYPE} from '@/constant'
import {upload_file} from "@/util";

const FormItem = Form.Item
const TextArea = Input.TextArea
const RadioGroup = Radio.Group

class C extends BaseComponent {
    ord_states() {
        return {
            loading: false,
            fileList: [],
            previewVisible: false,
            previewImage: ''
        }
    }

    handleSubmit (e) {
        e.preventDefault()

        const tags = this.props.form.getFieldInstance('tags').getValue();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({ loading: true });
                const res = await this.props.create({
                    ...values,
                    tags: tags.join(','),
                    logo: '',
                    metadata: ''
                });

                console.log(res);

                this.setState({loading: false});
                this.props.history.push('/profile/teams');
            }
        })
    }

    getInputProps () {
        const {getFieldDecorator} = this.props.form;
        const team = this.props.data;

        const input_el = (
            <Input size="large"/>
        )

        const textarea_el = (
            <TextArea rows={4}/>
        )

        const name_fn = getFieldDecorator('name', {
            rules: [{required: true, message: 'team name is required'}],
            initialValue: ''
        })

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

        const type_fn = getFieldDecorator('type', {
            rules: [{required: true, message: 'type is required'}],
            initialValue: []
        })
        const type_el = (
            <TreeSelect treeData={specs} treeCheckable={true} searchPlaceholder={I18N.get('select.placeholder')}/>
        )

        const skillset_fn = getFieldDecorator('skillset', {
            rules: [{required: true, message: 'skillset is required'}],
            initialValue: []
        })
        const skillset_el = (
            <TreeSelect treeData={skillsets} treeCheckable={true} searchPlaceholder={I18N.get('select.placeholder')}/>
        )

        const recruiting_fn = getFieldDecorator('recruiting', {
            rules: [{required: true}],
            initialValue: true
        })
        const recruiting_el = (
            <RadioGroup>
                <Radio value={true}>
                    Yes
                </Radio>
                <Radio value={false}>
                    No
                </Radio>

            </RadioGroup>
        )

        const description_fn = getFieldDecorator('description', {
            rules: [],
            initialValue: ''
        })

        const tags_fn = getFieldDecorator('tags', {
            rules: [],
            initialValue: ''
        })
        const tags_el = <InputTags />

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
                upload_file(info.file).then(() => {
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
            name: name_fn(input_el),
            type: type_fn(type_el),
            recruiting: recruiting_fn(recruiting_el),
            description: description_fn(textarea_el),
            tags: tags_fn(tags_el),
            skillset: skillset_fn(skillset_el),
            pictures: pictures_fn(pictures_el)
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

        return (
            <div className="c_userEditFormContainer">

                <Form onSubmit={this.handleSubmit.bind(this)} className="d_taskCreateForm">
                    <div>
                        <FormItem label="Name" {...formItemLayout}>
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
                        <FormItem label="Pictures" {...formItemLayout}>
                            {p.pictures}
                        </FormItem>
                        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                            <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                        </Modal>
                        <FormItem label="Tags" {...formItemLayout}>
                            {p.tags}
                        </FormItem>

                        <FormItem wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 12, offset: 8}}}>
                            <Button loading={this.state.loading} type="ebp" htmlType="submit" className="d_btn">
                                Create Team
                            </Button>
                        </FormItem>
                    </div>
                </Form>
            </div>
        )
    }

}
export default Form.create()(C)
