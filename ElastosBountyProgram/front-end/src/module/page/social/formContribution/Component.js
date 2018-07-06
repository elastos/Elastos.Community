import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {Form, Icon, Input, Button, Select} from 'antd'
import {CONTRIB_CATEGORY} from '@/constant'

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
        const {getFieldDecorator} = this.props.form

        const contribCategory_fn = getFieldDecorator('contribCategory', {
            rules: [{required: true, message: 'Please select a category'}],
            initialValue: 'BLOG'
        })
        const contribCategory_el = (
            <Select>
                <Option value={CONTRIB_CATEGORY.BLOG}>Blog</Option>
                <Option value={CONTRIB_CATEGORY.VIDEO}>Video</Option>
                <Option value={CONTRIB_CATEGORY.PODCAST}>Podcast</Option>
                <Option value={CONTRIB_CATEGORY.OTHER}>Other</Option>
            </Select>
        )

        return {
            contribCategory: contribCategory_fn(contribCategory_el)
        }
    }

    ord_render() {
        const {getFieldDecorator} = this.props.form
        const p = this.getIssueFormProps()
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="c_issueForm">
                <FormItem>
                    {p.contribCategory}
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
