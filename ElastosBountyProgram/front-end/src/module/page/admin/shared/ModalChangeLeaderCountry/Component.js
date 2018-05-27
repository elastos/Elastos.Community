import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Form, Input, Modal, Select, Button } from 'antd'
import config from '@/config'
const FormItem = Form.Item

export default Form.create()(
    class C extends BaseComponent {
        ord_render () {
            const {visible, onCancel, onCreate, handleRemoveCountry, form} = this.props
            const {getFieldDecorator} = form
            const formItemLayout = {
                labelCol: {span: 6},
                wrapperCol: {span: 18}
            }

            const footerModal = (
                <div>
                    <Button onClick={onCreate} type="primary">Change leader</Button>
                    {/*Don't need on this pharse*/}
                    {/*<Button onClick={handleRemoveCountry}>Remove country</Button>*/}
                    <Button onClick={onCancel}>Cancel</Button>
                </div>
            )

            return (
                <Modal
                    visible={visible}
                    title="Change leader"
                    footer={footerModal}
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="Country">
                            {getFieldDecorator('geolocation', {})(
                                <Select
                                    disabled={true}
                                >
                                    {config.data.breadcrumbCountries.map((country, index) => {
                                        return (<Select.Option key={index} value={country.geolocation}>{country.name}</Select.Option>)
                                    })}
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
                                    {config.data.mockDataAllLeaders.map((leader, index) => {
                                        return (<Select.Option key={index} value={leader.id}>{leader.name}</Select.Option>)
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
