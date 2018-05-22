import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {Form, Icon, Input, Button, Select} from 'antd'
import {ISSUE_CATEGORY} from '@/constant'

const FormItem = Form.Item
const Option = Select.Option

class C extends BaseComponent {

    handleSubmit(e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                this.props.login(values.username, values.password, values.remember)

            }
        })
    }

    getIssueFormProps() {

        const {getFieldDecorator} = this.props.form;

        const issueCategory_fn = getFieldDecorator('issueCategory', {
            rules: [{required: true, message: 'Please select a category'}],
            initialValue: 'Bug'
        });
        const issueCategory_el = (
            <Select>
                <Option value={ISSUE_CATEGORY.BUG}>Bug</Option>
                <Option value={ISSUE_CATEGORY.SECURITY}>Security Issue</Option>
                <Option value={ISSUE_CATEGORY.SUGGESTION}>Suggestion</Option>
                <Option value={ISSUE_CATEGORY.OTHER}>Other</Option>
            </Select>
        );

        return {
            issueCategory: issueCategory_fn(issueCategory_el)
        }
    }

    ord_render() {
        const {getFieldDecorator} = this.props.form
        const p = this.getIssueFormProps()
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="c_issueForm">
                <FormItem>
                    {p.issueCategory}
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
