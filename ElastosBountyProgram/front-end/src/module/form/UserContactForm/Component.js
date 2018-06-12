import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {
    Form,
    Input,
    Button,
    message

} from 'antd'

import {upload_file} from "@/util";
import './style.scss'

import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS} from '@/constant'

const FormItem = Form.Item
const TextArea = Input.TextArea

class C extends BaseComponent {

    handleSubmit (e) {
        e.preventDefault()
        this.props.form.validateFields((err, formData) => {
            if (!err) {
                this.props.sendEmail(this.props.recipient._id, formData).then(() => {
                    message.success('Email sent successfully')
                })
            }
        })
    }

    getInputProps () {

        const {getFieldDecorator} = this.props.form

        const subject_fn = getFieldDecorator('subject', {
            rules: [{required: true, message: 'Please enter a subject'}]
        })
        const subject_el = (
            <Input size="large"/>
        )

        const message_fn = getFieldDecorator('message', {
            rules: [{required: true, message: 'You must have a message'}]
        })
        const message_el = (
            <TextArea rows={4} name="message"></TextArea>
        )

        return {
            subject: subject_fn(subject_el),
            message: message_fn(message_el)
        }
    }

    ord_render () {
        const {getFieldDecorator} = this.props.form
        const p = this.getInputProps()

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
        // TODO: description CKE Editor

        return (
            <div className="c_taskCreateFormContainer">

                <span class="no-info">
                    The email reply-to address will be set to your account's email, responses
                    will go directly to your email
                </span>
                <br/>
                <Form onSubmit={this.handleSubmit.bind(this)} className="d_userContactForm">
                    <div>
                        <FormItem label="Subject" {...formItemLayout}>
                            {p.subject}
                        </FormItem>
                        <FormItem label="Message"  {...formItemLayout}>
                            {p.message}
                        </FormItem>

                        <FormItem wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 12, offset: 8}}}>
                            <Button loading={this.props.loading} type="ebp" htmlType="submit" className="d_btn">
                                Send Message
                            </Button>
                        </FormItem>
                    </div>
                </Form>
            </div>
        )
    }

}
export default Form.create()(C)
