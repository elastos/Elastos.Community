import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Form, Modal, Input, Button } from 'antd'
import config from '@/config'

const FormItem = Form.Item

export default Form.create()(
    class C extends BaseComponent {

        getInputProps () {

            const {getFieldDecorator} = this.props.form

            const taskName_fn = getFieldDecorator('taskName', {
                rules: [
                    {required: true, message: 'Please input a task name'},
                    {min: 4, message: 'Task Name too short'}
                ]
            })
            const taskName_el = (
                <Input size="large"/>
            )

            return {
                taskName: taskName_fn(taskName_el)
            }
        }

        ord_render () {
            const {visible, onCancel, onApply, form} = this.props
            const {getFieldDecorator} = form
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

            const footerModal = (
                <div>
                    <Button onClick={onApply} className="ant-btn-ebp" type="primary">Apply</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </div>
            )

            return (
                <Modal
                    visible={visible}
                    footer={footerModal}
                    okText="Apply"
                    onCancel={onCancel}
                    onOk={onApply}
                    width="90%"
                    style={{top: '5%'}}
                >
                    <Form>
                        <FormItem label="Name" {...formItemLayout}>
                            {p.taskName}
                        </FormItem>
                    </Form>
                </Modal>
            )
        }
    },
)
