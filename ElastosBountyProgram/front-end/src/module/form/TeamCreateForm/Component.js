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
    Divider

} from 'antd'

import InputTags from '@/module/shared/InputTags/Component'

const FormItem = Form.Item
const TextArea = Input.TextArea
const RadioGroup = Radio.Group

class C extends BaseComponent {
    ord_states() {
        return {
            loading: false
        }
    }

    handleSubmit (e) {
        e.preventDefault()

        const tags = this.props.form.getFieldInstance('tags').getValue()
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({loading: true})
                const res = await this.props.create({
                    ...values,
                    tags: tags.join(','),
                    logo: '',
                    metadata: ''
                })

                console.log(res)

                this.setState({loading: false})
                this.props.history.push('/profile/teams')
            }
        })
    }

    getInputProps () {
        const {getFieldDecorator} = this.props.form
        const team = this.props.data

        const input_el = (
            <Input size="large"/>
        )

        const name_fn = getFieldDecorator('name', {
            rules: [{required: true, message: 'team name is required'}],
            initialValue: ''
        })

        const type_fn = getFieldDecorator('type', {
            rules: [{required: true, message: 'type is required'}],
            initialValue: 'DEVELOP'
        })
        const type_el = (
            <RadioGroup>
                {_.map(['DEVELOP', 'MARKET', 'DESIGN', 'PROJECT', 'OTHER'], (v, i) => {
                    return (
                        <Radio key={i} value={v}>
                            {v}
                        </Radio>
                    )
                })}

            </RadioGroup>
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

        return {
            name: name_fn(input_el),
            type: type_fn(type_el),
            recruiting: recruiting_fn(recruiting_el),
            description: description_fn(input_el),
            tags: tags_fn(tags_el)
        }
    }

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
                        <FormItem label="Recruiting" {...formItemLayout}>
                            {p.recruiting}
                        </FormItem>
                        <FormItem label="Description" {...formItemLayout}>
                            {p.description}
                        </FormItem>
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
