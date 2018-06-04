import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Form, Modal, Select, Button } from 'antd'
import config from '@/config'

const FormItem = Form.Item

export default Form.create()(
    class C extends BaseComponent {

        ord_render () {
            const {onCancel, onCreate, form, visible} = this.props
            const {getFieldDecorator} = form
            const formItemLayout = {
                labelCol: {span: 6},
                wrapperCol: {span: 18}
            }

            const footerModal = (
                <div>
                    <Button onClick={onCreate} type="primary" className="ant-btn-ebp">Apply</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </div>
            )

            const selectOptions = [{value: 'self', text: 'Apply as Self Only'}]
            if (this.props.teamsOwned.length) {
                for (let team of this.props.teamsOwned){
                    selectOptions.push({
                        value: team._id,
                        text: team.name
                    })
                }
            }

            return (
                <Modal
                    visible={visible}
                    title="Apply for Task"
                    footer={footerModal}
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <p>
                        You can either apply as yourself only or if you are a leader
                        of any teams, you can apply for your team.
                    </p>
                    <Form>
                        <FormItem {...formItemLayout}>
                            {getFieldDecorator('applyType', {
                                label: 'Team or Solo',
                                initialValue: 'self',
                                rules: [{required: true, message: 'This field is required'}]
                            })(
                                <Select
                                    showSearch
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {selectOptions.map((o) => {
                                        return <Select.Option key={o.value} value={o.value}>{o.text}</Select.Option>
                                    })}
                                </Select>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            )
        }
    },
)
