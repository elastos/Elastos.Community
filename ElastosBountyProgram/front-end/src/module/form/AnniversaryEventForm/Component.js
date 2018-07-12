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

                // TODO: check file type

                this.props.submitForm(values, this.state);
            }
        })
    }

    constructor (props) {
        super(props)

        this.state = {
            community: null
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

        // role in Elastos
        const roleInElastos_fn = getFieldDecorator('roleInElastos', {
            rules: [
                {required: true, message: 'Please enter your role'},
                {min: 4, message: 'text too short'}
            ]
        })
        const roleInElastos_el = (
            <Input size="large"/>
        )

        const community_fn = getFieldDecorator('community', {
            initialValue: this.state.community,
            rules: [
                {required: true, message: 'Please enter your country'}
            ]
        })
        const community_el = (
            <Cascader options={this.state.communityTrees} placeholder="" changeOnSelect/>
        )

        const dob_fn = getFieldDecorator('dob', {
            rules: [
                {required: true, message: 'Please enter your date of birth'},
            ]
        })
        const dob_el = (
            <DatePicker/>
        )

        // full-time Elastos who have you been in contact (vouch)
        const contactWith_fn = getFieldDecorator('contactWith', {
            rules: [
                {max: 1024, message: 'text too long'}
            ]
        })
        const contactWith_el = (
            <TextArea rows={2} name="contactWith"></TextArea>
        )

        // contributions to Elastos
        const contributions_fn = getFieldDecorator('contributions', {
            rules: [
                {required: true, message: 'this is a required field'},
                {max: 1024, message: 'text too long'}
            ]
        })
        const contributions_el = (
            <TextArea rows={4} name="contributions"></TextArea>
        )

        // greeting video
        const greetingVideoLink_fn = getFieldDecorator('greetingVideoLink');
        const greetingVideoLink_el = (
            <Input size="large"/>
        );


        return {
            readRules: readRules_fn(readRules_el),

            fullLegalName: fullLegalName_fn(fullLegalName_el),

            roleInElastos: roleInElastos_fn(roleInElastos_el),
            community: community_fn(community_el),

            dob: dob_fn(dob_el),

            contactWith: contactWith_fn(contactWith_el),
            contributions: contributions_fn(contributions_el),

            greetingVideoLink: greetingVideoLink_fn(greetingVideoLink_el)
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
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        }

        const formItemNoLabelLayout = {
            wrapperCol: {
                xs: {span: 24},
                sm: {offset: 8, span: 12},
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
                            <Col offset={8} span={12} className="left-align">
                                Selected applicants will be contacted directly by email.
                                <h5>This application does not guarantee an invitation.</h5>
                                <br/>
                                <span style={{fontWeight: 600}}>If you are selected you are required to do the following:</span><br/>
                                - Book your own flight, you will be compensated in ELA and a receipt will be required<br/>
                                - Hotels will be provided by us and reserved under the name provided on this form<br/>
                                - The name and date of birth provided must match your passport<br/>
                                - Hotel name and address will be provided to selected applicants by email<br/>
                                <br/>
                                <span style={{fontWeight: 600}}>Rules:</span><br/>
                                - Flight must be an economy class fare at a reasonable cost<br/>
                                - ELA exchange rate is determined at time of 12pm local time in Thailand on the day of reimbursement the day of the event<br/>
                                - You must arrive in Chiang Mai by August 24, the official event is on the 25th<br/>
                                - You are responsible for your own Visa requirements based on your nationality<br/>
                                - You must not represent yourself as an employee of Elastos, your purpose of travel to Thailand must be for tourism only<br/>
                                - If for whatever reason - except medical emergencies with proof - you will not receive reimbursement if you do not attend the event
                            </Col>
                        </Row>
                        <FormItem {...formItemNoLabelLayout}>
                            {p.readRules} <b>I have read and agree to the rules <span style={{color: 'red'}}>*</span> </b>
                        </FormItem>

                        <Divider>Application</Divider>
                        <Row>
                            <Col span={8} className="right-align static-field">
                                Email:
                            </Col>
                            <Col span={12} className="static-field content">
                                {this.props.user.email}
                            </Col>
                        </Row>
                        <FormItem label="Full Legal Name" {...formItemLayout}>
                            {p.fullLegalName}
                        </FormItem>
                        <FormItem label="Date of Birth" {...formItemLayout}>
                            {p.dob}
                        </FormItem>
                        <Row>
                            <Col offset="8" span="12" className="content">
                                Are you an organizer, writer, media contributor etc...
                            </Col>
                        </Row>
                        <FormItem label="Role in Community" {...formItemLayout}>
                            {p.roleInElastos}
                        </FormItem>
                        <FormItem label="Community"  {...formItemLayout}>
                            {p.community}
                        </FormItem>

                        <Divider></Divider>
                        <Row>
                            <Col offset="8" span="12">
                                Please list your contributions and involvement with the Elastos community <span style={{color: 'red'}}>*</span>
                            </Col>
                        </Row>
                        <FormItem {...formItemNoLabelLayout}>
                            {p.contributions}
                        </FormItem>

                        <Row>
                            <Col offset="8" span="12">
                                Which Elastos full-time members do you know and can vouch for you?
                            </Col>
                        </Row>
                        <FormItem {...formItemNoLabelLayout}>
                            {p.contactWith}
                        </FormItem>

                        {this.props.user.profile.walletAddress ?
                            <div>
                                <Row>
                                    <Col offset="8" span="12">
                                        Please ensure this is your wallet address, this is managed under your profile
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8} className="right-align static-field">
                                        ELA Address:
                                    </Col>
                                    <Col span={12} className="static-field content">
                                        <b>{this.props.user.profile.walletAddress}</b>
                                    </Col>
                                </Row>
                            </div> :
                            <Row>
                                <Col offset={8} className="static-field content">
                                    You have not entered a wallet address<br/>
                                    <Button id="btn_wallet_address" type="danger" onClick={() => this.props.history.push('/profile/info')}>Click here to edit this in your profile</Button>
                                </Col>
                            </Row>
                        }

                        <Divider>
                            Bonus Points: Please submit a link to a greeting video introducing yourself,<br/>
                            where you're from and wishing Elastos a happy anniversary
                        </Divider>

                        <FormItem label="Greeting Video" {...formItemLayout}>
                            {p.greetingVideoLink}
                        </FormItem>


                        <Divider/>

                        <FormItem wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 12, offset: 8}}}>
                            <Button loading={this.props.loading} type="ebp" htmlType="submit" className="d_btn">
                                Submit
                            </Button>
                        </FormItem>

                        <Row>
                            <Col offset={8} className="static-field content">
                                Please contact <a href="mailto:support@elastos.org">support@elastos.org</a> if you have any issues.
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        )
    }

}
export default Form.create()(C)
