import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {
    Form,
    Icon,
    Input,
    PopConfirm,
    message,
    Button,
    Checkbox,
    Select,
    DatePicker,
    Row,
    Col,
    Upload,
    Cascader,
    Divider

} from 'antd'

import {upload_file} from "@/util";
import './style.scss'
import moment from 'moment/moment'

const FormItem = Form.Item
const TextArea = Input.TextArea

/**
 * This is form for members to apply to come to the 2018 Anniversary Event - Chiang Mai
 *
 * TODO: this will later allow them to apply to be a vote candidate
 */
class C extends BaseComponent {

    handleSubmit (e) {
        e.preventDefault()

        this.props.form.validateFields((err, values) => {

            if (!err) {
                if (!this.props.user.profile.walletAddress) {
                    message.error('You must have an ELA wallet address associated with your profile')
                    document.getElementById('btn_wallet_address').focus()
                    return
                }

                this.props.submitForm(values, this.state);
            }
        })
    }

    constructor (props) {
        super(props)

        this.state = {
            community: null,

            attachment_url: null,
            attachment_loading: false,
            attachment_filename: '',
            attachment_type: '',

            removeAttachment: false
        }
    }

    async componentDidMount() {
        await this.getCommunityTrees()
        const countryCommunities = await this.props.getSpecificCountryCommunities(this.props.user.profile.country)
        const countryCommunity = _.find(countryCommunities, {parentCommunityId: null})

        this.setState({
            community: [countryCommunity._id]
        })
    }

    getInputProps () {

        const {getFieldDecorator} = this.props.form

        // I have read the rules
        const readRules_fn = getFieldDecorator('readRules', {
            rules: [
                {required: true, message: 'You must agree to the rules and requirements'},
            ]
        })
        const readRules_el = (
            <Checkbox/>
        )

        // name
        const fullLegalName_fn = getFieldDecorator('fullLegalName', {
            initialValue: this.props.user.profile.firstName + ' ' + this.props.user.profile.lastName,
            rules: [
                {required: true, message: 'Please input an name'},
                {min: 6, message: 'name too short'}
            ]
        })
        const fullLegalName_el = (
            <Input size="large"/>
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

                        removeAttachment: false
                    });
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
            readRules: readRules_fn(readRules_el),

            fullLegalName: fullLegalName_fn(fullLegalName_el),

            attachment: attachment_fn(attachment_el)
        }
    }

    getCommunityTrees() {
        this.props.getAllCommunities().then((communityTrees) => {
            this.setState({
                communityTrees
            })
        })
    }

    ord_render () {
        const {getFieldDecorator} = this.props.form
        const p = this.getInputProps()

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        }

        const formItemNoLabelLayout = {
            wrapperCol: {
                xs: {span: 24},
                sm: {offset: 6, span: 12},
            },
        }


        // const existingTask = this.props.existingTask

        // TODO: terms of service checkbox\

        // TODO: react-motion animate slide left

        // TODO: description CKE Editor

        return (!this.props.is_login ?
            <div className="center">
                <br/>
                You must be logged in to apply to come to the 2018 Anniversary Event<br/>
                <br/>
                <Button onClick={() => this.props.history.push('/login')}>Login</Button>
                <Button onClick={() => this.props.history.push('/register')}>Register</Button>
            </div> :
            <div className="c_anniversaryAppFormContainer">

                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <Divider>Details and Rules</Divider>
                        <Row>
                            <Col offset={6} span={12} className="left-align">

                                <h5 style={{color: '#47aaa7'}}>
                                    If you did not receive an invitation to fill out this form directly via email,<br/>
                                    you are not on the invitiation list and please do not apply.
                                </h5>

                                <Row>
                                    <Col span={6}>
                                        <h4>Location:</h4>
                                    </Col>
                                    <Col span={12}>
                                        Shangri-La Hotel, Chiang Mai, Thailand
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6}>
                                        <h4>Event Dates:</h4>
                                    </Col>
                                    <Col>
                                        Aug 24 - 27, 2018
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6}>
                                        <h4>Registration Deadline:</h4>
                                    </Col>
                                    <Col>
                                        <b>July 16, 2018</b>
                                    </Col>
                                </Row>

                                <br/>

                                <h5>Dear Community Member,</h5>

                                <p>
                                    Elastos is hosting a One Year Anniversary Event in Thailand and you are invited as a selected
                                    community member. While you are responsible for paying for your own airfare, <u>you will receive an
                                    reimbursement in ELA equal to the cost of airfare for coming and will be provided hotel accommodations.</u>
                                </p>

                                <h4>Itinerary</h4>

                                <ul style={{textAlign: 'left', marginLeft: '5%'}}>
                                    <li>8/24: Arrival in Chiang Mai</li>
                                    <li>8/25: Anniversary Conference</li>
                                    <li>8/26: Tour of Chiang Mai</li>
                                    <li>8/27: Check Out</li>
                                </ul>

                                <p>
                                    We look forward to hosting our team and selected community members to celebrate our first year and to
                                    look forward to many more to come. We value our community with a passion and would love to see you
                                    attend and celebrate Elastos in style.
                                </p>

                                <br/>
                                <span style={{fontWeight: 600}}>
                                    You are required to do the following:
                                </span><br/>
                                - Book your own flight, you will be compensated in ELA and a receipt will be required.<br/>
                                - Hotels will be provided by us and reserved under the name provided on this form<br/>
                                <br/>
                                <span style={{fontWeight: 600}}>Rules:</span><br/>
                                - Flight must be a round-trip economy class flight at a reasonable cost<br/>
                                - ELA exchange rate is determined at time of 12pm local time in Thailand on the day of 25th August, 2018<br/>
                                - You must arrive in Chiang Mai by August 24, the official event is on the 25th<br/>
                                - You are responsible for your own Visa requirements based on your nationality<br/>
                                <u>- You must not represent yourself as an employee of Elastos, your purpose of travel to Thailand must be for tourism only</u><br/>
                                - If for whatever reason - except medical emergencies with proof - you will not receive reimbursement if you do not attend the event
                            </Col>
                        </Row>

                        <br/>

                        <FormItem {...formItemNoLabelLayout}>
                            {p.readRules} <b>I have read and agree to the rules <span style={{color: 'red'}}>*</span> </b>
                        </FormItem>

                        <Divider>Application</Divider>
                        <Row>
                            <Col span={6} className="right-align static-field">
                                Email:
                            </Col>
                            <Col span={12} className="static-field content">
                                {this.props.user.email}
                            </Col>
                        </Row>
                        <FormItem label="Full Legal Name" {...formItemLayout}>
                            {p.fullLegalName}
                        </FormItem>

                        <Divider></Divider>

                        {this.props.user.profile.walletAddress ?
                            <div>
                                <Row>
                                    <Col offset="6" span="12">
                                        Please ensure this is your wallet address, this is managed under your profile
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6} className="right-align static-field">
                                        ELA Address:
                                    </Col>
                                    <Col span={12} className="static-field content">
                                        <b>{this.props.user.profile.walletAddress}</b>
                                    </Col>
                                </Row>
                            </div> :
                            <Row>
                                <Col offset={6} className="static-field content">
                                    You have not entered a wallet address<br/>
                                    <Button id="btn_wallet_address" type="danger" onClick={() => this.props.history.push('/profile/info')}>Click here to edit this in your profile</Button>
                                </Col>
                            </Row>
                        }

                        <Divider>
                            Upload Your Airfare Receipt
                        </Divider>


                        <Row>
                            <Col offset={6} span={12} className="left-align">
                                If you do not upload it now you will need to visit your<br/>
                                <b>Profile / Submissions Page</b><br/>
                                <br/>
                                There you can view your submission and upload the receipt at a later time.<br/>
                                <br/>
                            </Col>
                        </Row>
                        <FormItem {...formItemNoLabelLayout}>
                            {p.attachment}
                        </FormItem>


                        <Divider/>


                        <FormItem wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 12, offset: 6}}}>
                            <Button loading={this.props.loading} type="ebp" htmlType="submit" className="d_btn">
                                Submit
                            </Button>
                        </FormItem>

                        <Row>
                            <Col offset={6} className="static-field content">
                                Please contact <a href="mailto:cyberrepublic@elastos.org">cyberrepublic@elastos.org</a> if you have any issues.
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        )
    }

}
export default Form.create()(C)
