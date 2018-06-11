import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {Form, Icon, Input, Button, Select} from 'antd'
import {SUBMISSION_TYPE} from '@/constant'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea

class C extends BaseComponent {

    handleSubmit(e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                this.props.createSubmission(values.submissionDescription, values.submissionType)
            }
        })
    }

    getSubmissionFormProps() {

        const {getFieldDecorator} = this.props.form

        const submissionType_fn = getFieldDecorator('submissionType', {
            rules: [{required: true, message: 'Please select a type'}],
            initialValue: 'Bug'
        })
        const submissionType_el = (
            <Select name="type">
                <Option value={SUBMISSION_TYPE.BUG}>Bug</Option>
                <Option value={SUBMISSION_TYPE.SECURITY_ISSUE}>Security Issue</Option>
                <Option value={SUBMISSION_TYPE.SUGGESTION}>Suggestion</Option>
                <Option value={SUBMISSION_TYPE.OTHER}>Other</Option>
            </Select>
        )

        const submissionDescription_fn = getFieldDecorator('submissionDescription', {
            rules: [{required: true, message: 'Please put in some description'}],
            initialValue: ''
        })
        const submissionDescription_el = (
            <TextArea rows={4} type="text" name="description" placeholder="Describe your issue"/>
        )

        return {
            submissionType: submissionType_fn(submissionType_el),
            submissionDescription: submissionDescription_fn(submissionDescription_el)
        }
    }

    ord_render() {
        const {getFieldDecorator} = this.props.form
        const p = this.getSubmissionFormProps()
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="c_issueForm">
                <FormItem>
                    {p.submissionCategory}
                </FormItem>
                <FormItem>
                    {p.submissionDescription}
                </FormItem>
                <FormItem>
                    <Button loading={this.props.loading} type="ebp" htmlType="submit" className="d_btn pull-right">
                        Submit
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(C)
