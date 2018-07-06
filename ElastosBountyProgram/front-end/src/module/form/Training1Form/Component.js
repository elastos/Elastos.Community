import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {
    Form,
    Icon,
    Input,
    InputNumber,
    Button,
    Checkbox,
    Select,
    message,
    Row,
    Col,
    Upload,
    Cascader,
    Divider

} from 'antd'

import {upload_file} from '@/util'
import './style.scss'

const FormItem = Form.Item
const TextArea = Input.TextArea

/**
 * This is public form for the Evangelist Training
 */
class C extends BaseComponent {
    handleSubmit (e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.submitForm(values, this.state)
            }
        })
    }

    constructor (props) {
        super(props)

        this.state = {
            attachment_url: null,
            attachment_loading: false,
            attachment_filename: '',
            attachment_type: ''
        }
    }

    getInputProps () {
        const {getFieldDecorator} = this.props.form
        const existingTask = this.props.existingTask

        // email
        const email_fn = getFieldDecorator('email', {
            rules: [
                {required: true, message: 'Please input an email'},
                {min: 6, message: 'email too short'}
            ]
        })
        const email_el = (
            <Input size="large"/>
        )

        // name
        const fullLegalName_fn = getFieldDecorator('fullLegalName', {
            rules: [
                {required: true, message: 'Please input an name'},
                {min: 6, message: 'name too short'}
            ]
        })
        const fullLegalName_el = (
            <Input size="large"/>
        )

        // audienceInfo
        const audienceInfo_fn = getFieldDecorator('audienceInfo', {
            rules: [
                {required: true, message: 'this is a required field'},
                {max: 256, message: 'text too long'}
            ]
        })
        const audienceInfo_el = (
            <TextArea rows={2} name="audienceInfo"></TextArea>
        )

        // publicSpeakingExp
        const publicSpeakingExp_fn = getFieldDecorator('publicSpeakingExp', {
            rules: [
                {required: true, message: 'this is a required field'},
                {max: 1024, message: 'text too long'}
            ]
        })
        const publicSpeakingExp_el = (
            <TextArea rows={2} name="publicSpeakingExp"></TextArea>
        )

        // previousExp
        const previousExp_fn = getFieldDecorator('previousExp', {
            rules: [
                {required: true, message: 'this is a required field'},
                {max: 1024, message: 'text too long'}
            ]
        })
        const previousExp_el = (
            <TextArea rows={1} name="previousExp"></TextArea>
        )

        // developer
        const isDeveloper_fn = getFieldDecorator('isDeveloper')
        const isDeveloper_el = (
            <Checkbox/>
        )

        // devBackground
        const devBackground_fn = getFieldDecorator('devBackground', {
            rules: [
                {max: 1024, message: 'text too long'}
            ]
        })
        const devBackground_el = (
            <TextArea rows={2} name="previousExp"></TextArea>
        )

        // description
        const description_fn = getFieldDecorator('description', {
            rules: [
                {required: true, message: 'this is a required field'},
                {max: 512, message: 'text too long'}
            ]
        })
        const description_el = (
            <TextArea rows={1} name="description"></TextArea>
        )

        // reason
        const reason_fn = getFieldDecorator('reason', {
            rules: [
                {required: true, message: 'this is a required field'},
                {max: 256, message: 'text too long'}
            ]
        })
        const reason_el = (
            <TextArea rows={1} name="reason"></TextArea>
        )

        // attachment
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
                        attachment_filename: d.filename
                    })
                })
            }
        }
        const attachment_el = (
            <Upload name="attachment" {...p_attachment}>
                {
                    this.state.attachment_url ? (
                        <a target="_blank" href={this.state.attachment_url}>
                            <Icon type="file"/> &nbsp;
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
            email: email_fn(email_el),
            fullLegalName: fullLegalName_fn(fullLegalName_el),

            audienceInfo: audienceInfo_fn(audienceInfo_el),
            publicSpeakingExp: publicSpeakingExp_fn(publicSpeakingExp_el),
            previousExp: previousExp_fn(previousExp_el),

            isDeveloper: isDeveloper_fn(isDeveloper_el),

            devBackground: devBackground_fn(devBackground_el),

            description: description_fn(description_el),
            reason: reason_fn(reason_el),

            attachment: attachment_fn(attachment_el)
        }
    }

    ord_render () {
        const {getFieldDecorator} = this.props.form
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
                        <FormItem label="Email" {...formItemLayout}>
                            {p.email}
                        </FormItem>
                        <FormItem label="Full Legal Name" {...formItemLayout}>
                            {p.fullLegalName}
                        </FormItem>
                        <Divider></Divider>
                        <Row>
                            <Col offset="8" span="12">
                                What is your native language, who is your audience and where are they located? What are the language(s) you plan to use to present Elastos.
                            </Col>
                        </Row>
                        <FormItem {...formItemNoLabelLayout}>
                            {p.audienceInfo}
                        </FormItem>

                        <Row>
                            <Col offset="8" span="12">
                                Please describe your public speaking experience and provide any examples.
                            </Col>
                        </Row>
                        <FormItem {...formItemNoLabelLayout}>
                            {p.publicSpeakingExp}
                        </FormItem>

                        <Row>
                            <Col offset="8" span="12">
                                Please list any current or past contributions promoting Elastos.
                            </Col>
                        </Row>
                        <FormItem {...formItemNoLabelLayout}>
                            {p.previousExp}
                        </FormItem>

                        <FormItem label="Are you a developer?" {...formItemLayout}>
                            {p.isDeveloper}
                        </FormItem>

                        <Row>
                            <Col offset="8" span="12">
                                If you are not a developer, please explain how you are familiar with Elastos technology and what problems we solve.
                            </Col>
                        </Row>
                        <FormItem {...formItemNoLabelLayout}>
                            {p.devBackground}
                        </FormItem>

                        <Row>
                            <Col offset="8" span="12">
                                Describe Elastos in your own words.
                            </Col>
                        </Row>
                        <FormItem {...formItemNoLabelLayout}>
                            {p.description}
                        </FormItem>

                        <Row>
                            <Col offset="8" span="12">
                                Tell us in a few words what inspired you to join Cyber Republic.
                            </Col>
                        </Row>
                        <FormItem {...formItemNoLabelLayout}>
                            {p.reason}
                        </FormItem>

                        <Divider>Please submit a video of your introduction to Cyber Republic.</Divider>

                        <FormItem label="Attachment" {...formItemLayout}>
                            {p.attachment}
                        </FormItem>

                        <FormItem wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 12, offset: 8}}}>
                            <Button loading={this.props.loading} type="ebp" htmlType="submit" className="d_btn">
                                Submit
                            </Button>
                        </FormItem>
                    </div>
                </Form>
            </div>
        )
    }
}
export default Form.create()(C)
