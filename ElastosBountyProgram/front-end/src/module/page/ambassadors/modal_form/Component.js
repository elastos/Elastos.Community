import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Form, Modal, Input, Button, Row, Col, Upload, Icon } from 'antd'
import config from '@/config'
const TextArea = Input.TextArea
import {upload_file} from "@/util";

const FormItem = Form.Item

export default Form.create()(
    class C extends BaseComponent {

        ord_states() {
            return {
                attachment_url: null,
                attachment_loading: false,
                attachment_filename: '',
                attachment_type: ''
            }
        }

        getInputProps () {

            const {getFieldDecorator} = this.props.form

            const filePath_fn = getFieldDecorator('filePath')
            const filePath_el = (
                <Input size="large"/>
            )

            const fileName_fn = getFieldDecorator('fileName')
            const fileName_el = (
                <Input size="large"/>
            )

            const fileType_fn = getFieldDecorator('fileType')
            const fileType_el = (
                <Input size="large"/>
            )

            const applyReason_fn = getFieldDecorator('applyReason', {
                rules: [
                    {max: 4096, message: 'Reason too long'},
                    {required: true, message: 'This must be filled out'}
                ]
            })
            const applyReason_el = (
                <TextArea rows={5}></TextArea>
            )

            const suitedReason_fn = getFieldDecorator('suitedReason', {
                rules: [
                    {max: 4096, message: 'Suited reason too long'},
                    {required: true, message: 'This must be filled out'}
                ]
            })
            const suitedReason_el = (
                <TextArea rows={4}></TextArea>
            )

            const attachment_fn = getFieldDecorator('attachment', {
                rules: []
            });
            const p_attachment = {
                showUploadList: false,
                customRequest :(info)=>{
                    this.setState({
                        attachment_loading: true
                    });
                    upload_file(info.file).then((d)=>{
                        const url = d.url;
                        this.setState({
                            attachment_loading: false,
                            attachment_url : url,
                            attachment_type: d.type,
                            attachment_filename: d.filename,
                        });

                        this.props.form.setFieldsValue({
                            filePath: url,
                            fileName: d.filename,
                            fileType: d.type
                        })
                    })
                }
            };
            const attachment_el = (
                <Upload name="attachment" {...p_attachment}>
                    {
                        this.state.attachment_url ? (
                            <a target="_blank" href={this.state.attachment_url}>
                                {this.state.attachment_type === 'application/pdf' ?
                                    <Icon type="file-pdf"/> :
                                    <Icon type="file"/>
                                } &nbsp;
                                {this.state.attachment_filename}
                            </a>
                        ) : (
                            <Button loading={this.state.attachment_loading}>
                                <Icon type="upload" /> Click to upload
                            </Button>
                        )
                    }
                </Upload>
            );

            return {
                // taskName: taskName_fn(taskName_el),
                applyReason: applyReason_fn(applyReason_el),
                suitedReason: suitedReason_fn(suitedReason_el),
                attachment: attachment_fn(attachment_el),
                filePath: filePath_fn(filePath_el),
                fileName: fileName_fn(fileName_el),
                fileType: fileType_fn(fileType_el)
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
                    footer={null}
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
                            <span className="role-funding komu-a">Apply to be an ambassador</span>
                        </div>
                    </div>
                    <Form>
                        <div className="header-spacer clearfix"/>
                        <Row>
                            <Col className="form-title komu-a">
                                Why Would You Like to Apply?
                            </Col>
                        </Row>
                        <FormItem>
                            {p.applyReason}
                        </FormItem>

                        <div className="header-spacer"/>
                        <Row>
                            <Col className="form-title komu-a">
                                What Makes You Most Suited?
                            </Col>
                        </Row>
                        <FormItem>
                            {p.suitedReason}
                        </FormItem>

                        <div className="header-spacer"/>
                        <Row>
                            <Col className="form-title komu-a">
                                Supporting Attachment
                            </Col>
                        </Row>
                        <FormItem>
                            {p.attachment}
                        </FormItem>
                    </Form>

                    <div className="center">
                        <br/>
                        <Button onClick={onApply} className="cr-btn" type="primary">Apply</Button>
                    </div>

                </Modal>
            )
        }
    },
)
