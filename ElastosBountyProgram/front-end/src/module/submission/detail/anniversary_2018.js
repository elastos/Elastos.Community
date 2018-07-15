import React from 'react';
import {upload_file} from "@/util"
import { Col, Row, Upload, Button, Icon, message, Popconfirm } from 'antd'
import SubmissionService from '@/service/SubmissionService'

export default function() {

    const submissionService = new SubmissionService()


    const removeAttachment = async () => {
        this.setState({
            attachment_loading: false,
            attachment_url : null,
            attachment_type: '',
            attachment_filename: '',

            removeAttachment: true
        })

        await submissionService.update(this.props.submission._id, {
            attachment: null,
            attachmentType: '',
            attachmentFilename: ''
        })

        message.success('File removed')
    }

    const p_attachment = {
        showUploadList: false,
        customRequest :(info)=>{
            this.setState({
                attachment_loading: true
            });
            upload_file(info.file).then(async (d)=>{
                const url = d.url;
                this.setState({
                    attachment_loading: false,
                    attachment_url : url,
                    attachment_type: d.type,
                    attachment_filename: d.filename,

                    removeAttachment: false
                });

                // do the upload immediately
                try {
                    await submissionService.update(this.props.submission._id, {
                        attachment: url,
                        attachmentType: d.type,
                        attachmentFilename: d.filename
                    })

                    message.success('Receipt uploaded successfully')

                } catch (err) {
                    console.error(err)

                    this.setState({
                        attachment_loading: false,
                        attachment_url : null,
                        attachment_type: '',
                        attachment_filename: ''
                    })

                    message.success('There was a problem upload this file, please try again')
                }
            })
        }
    };

    return <div>
        <Row>
            <Col>
                <h4 className="center">
                    {this.props.submission.title}
                </h4>
            </Col>
        </Row>
        <Row>
            <Col className="col-label" span={8}>
                Email
            </Col>
            <Col span={12}>
                {this.props.submission.email}
            </Col>
        </Row>
        <Row>
            <Col className="col-label" span={8}>
                Full Legal Name
            </Col>
            <Col span={12}>
                {this.props.submission.fullLegalName}
            </Col>
        </Row>
        <Row>
            <Col className="col-label" span={8}>
                Wallet Address
            </Col>
            <Col span={12}>
                {this.props.submission.createdBy.profile.walletAddress}
            </Col>
        </Row>
        <Row>
            <Col className="col-label" span={8}>
                Airfare Receipt
            </Col>
            <Col span={12}>
                {this.state.attachment_url ? (
                    <div>
                        <a target="_blank" href={this.state.attachment_url}>
                            {this.state.attachment_filename}
                        </a>

                        &nbsp;

                        <Popconfirm title="Are you sure you want to remove this receipt?" placement="top" okText="Yes" onConfirm={removeAttachment.bind(this)}>
                            <Icon type="delete" style={{cursor: 'pointer'}}/>
                        </Popconfirm>
                    </div>
                ) : (
                    <Upload name="attachment" {...p_attachment}>
                        <Button loading={this.state.attachment_loading}>
                            <Icon type="upload" /> Click to upload
                        </Button>
                    </Upload>
                )}
            </Col>
        </Row>
    </div>

}
