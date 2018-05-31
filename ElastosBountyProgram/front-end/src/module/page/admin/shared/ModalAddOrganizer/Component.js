import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Form, Modal, Select, Button } from 'antd'
import config from '@/config'

const FormItem = Form.Item

export default Form.create()(
    class C extends BaseComponent {
        ord_render () {
            const {visible, onCancel, onCreate, form} = this.props
            const {getFieldDecorator} = form
            const formItemLayout = {
                labelCol: {span: 6},
                wrapperCol: {span: 18}
            }

            const footerModal = (
                <div>
                    <Button onClick={onCreate} type="primary">Add organizer</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </div>
            )

            const listCountriesEl = _.entries(config.data.mappingCountryCodeToName).map(([key, val]) => {
                return (
                    <Select.Option key={key} value={key}>
                        {val}
                    </Select.Option>
                )
            })

            return (
                <Modal
                    visible={visible}
                    title="Add organizer"
                    footer={footerModal}
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="Country">
                            {getFieldDecorator('geolocation', {
                                rules: [{required: true, message: 'This field is required'}]
                            })(
                                <Select
                                    disabled
                                    placeholder="Please select a country"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {listCountriesEl}
                                </Select>
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
