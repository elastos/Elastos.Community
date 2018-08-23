import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Form, Modal, Input, Button, Row, Col } from 'antd'
import config from '@/config'
const TextArea = Input.TextArea

const FormItem = Form.Item

export default Form.create()(
    class C extends BaseComponent {

        getInputProps () {

            const {getFieldDecorator} = this.props.form

            /*
            const name_fn = getFieldDecorator('name', {
                rules: [
                    {required: true, message: 'Please enter your full name'},
                    {min: 4, message: 'Name too short'}
                ]
            })
            const name_el = (
                <Input size="large"/>
            )
            */

            const applyReason_fn = getFieldDecorator('applyReason', {
                rules: [
                    {max: 4096, message: 'Reason too long'}
                ],
                required: true
            })
            const applyReason_el = (
                <TextArea rows={6}></TextArea>
            )

            const suitedReason_fn = getFieldDecorator('suitedReason', {
                rules: [
                    {max: 4096, message: 'Suited reason too long'}
                ],
                required: true
            })
            const suitedReason_el = (
                <TextArea rows={6}></TextArea>
            )

            return {
                // taskName: taskName_fn(taskName_el),
                applyReason: applyReason_fn(applyReason_el),
                suitedReason: suitedReason_fn(suitedReason_el)
            }
        }

        ord_render () {
            const {visible, onCancel, onApply, empowerType, form} = this.props
            const {getFieldDecorator} = form
            const p = this.getInputProps()

            const footerModal = (
                <div>
                    <Button onClick={onApply} className="ant-btn-ebp" type="primary">Apply</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </div>
            )
            return (
                <Modal
                    wrapClassName="emp35-apply-modal"
                    visible={visible}
                    footer={footerModal}
                    okText="Apply"
                    onCancel={onCancel}
                    onOk={onApply}
                    width="90%"
                    style={{top: '5%'}}
                >
                    <div>
                        <img src="/assets/images/cr_seal_white.png" className="seal pull-left"/>
                        <div className="pull-left">
                            <span className="role-title komu-a">{empowerType}</span>
                            <br/>
                            {/* <span className="role-funding komu-a">Funding: US $10-30K in ELA</span> */}
                        </div>
                    </div>
                    <div className="header-spacer clearfix"/>
                    <Row>
                        <Col className="form-title komu-a">
                            Why Would You Like to Apply?
                        </Col>
                    </Row>
                    <Form>
                        <FormItem>
                            {p.applyReason}
                        </FormItem>
                    </Form>

                    <div className="header-spacer"/>
                    <Row>
                        <Col className="form-title komu-a">
                            What Makes You Most Suited?
                        </Col>
                    </Row>
                    <Form>
                        <FormItem>
                            {p.suitedReason}
                        </FormItem>
                    </Form>
                </Modal>
            )
        }
    },
)
