import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Form, Input, Modal, Select, Button } from 'antd'
import {COMMUNITY_TYPE} from '@/constant'
const FormItem = Form.Item

export default Form.create()(
    class C extends BaseComponent {
        ord_render () {
            const {visible, onCancel, onCreate, form, communityType} = this.props
            const {getFieldDecorator} = form
            const formItemLayout = {
                labelCol: {span: 6},
                wrapperCol: {span: 18}
            }
            
            let contextTitle;
            switch (communityType) {
                case COMMUNITY_TYPE.STATE:
                    contextTitle = 'Add states / provinces';
                    break;
                case COMMUNITY_TYPE.CITY:
                    contextTitle = 'Add city';
                    break;
                case COMMUNITY_TYPE.REGION:
                    contextTitle = 'Add region';
                    break;
                default:
                    contextTitle = 'Add school';
                    break;
            }

            const footerModal = (
                <div>
                    <Button onClick={onCreate} type="primary">{contextTitle}</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </div>
            )

            return (
                <Modal
                    visible={visible}
                    title={contextTitle}
                    footer={footerModal}
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="Country">
                            {getFieldDecorator('country')(
                                <Select
                                    disabled={true}
                                    showSearch
                                    placeholder="Please select a country"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Select.Option value="cn">China</Select.Option>
                                    <Select.Option value="us">USA</Select.Option>
                                    <Select.Option value="vn">Vietnam</Select.Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Name">
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: 'This field is required'}]
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Leader">
                            {getFieldDecorator('leader', {
                                rules: [{required: true, message: 'This field is required'}]
                            })(
                                <Select
                                    showSearch
                                    placeholder="Please select a member"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Select.Option value="John Nguyen">John Nguyen</Select.Option>
                                    <Select.Option value="David">David</Select.Option>
                                </Select>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            )
        }
    },
)
