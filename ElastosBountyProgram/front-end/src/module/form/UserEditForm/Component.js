import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {
    Form,
    Icon,
    Input,
    InputNumber,
    Button,
    Checkbox,
    Radio,
    Select,
    message,
    Row,
    Col,
    Upload,
    Cascader,
    Divider

} from 'antd'

import config from '@/config'
import { MIN_LENGTH_PASSWORD } from '@/config/constant'

import I18N from '@/I18N'

import {upload_file} from '@/util'
import './style.scss'

import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS, USER_GENDER} from '@/constant'

const FormItem = Form.Item
const TextArea = Input.TextArea
const RadioGroup = Radio.Group

/**
 * This is generic task create form for both Developer and Social Bounties / Events
 *
 * Which version of the form depends on the leader's program
 *
 * Leaders - can create:
 * - Events (offline) restricted to their area - must be approved
 * - Events (online) anywhere - Social or Developer
 *
 * TODO: in the future we should developer leaders
 *
 * Community Leaders - each community has a leader
 * - a leader can create events in their own local community or online community
 * - local offline events are automatically shown in their local community, a country leader
 *  can create events in any child community
 * - these events are shown in the Social page as well
 * - a local event can have sub tasks, these are shown as tasks in the Social page
 */
class C extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            communityTrees: [],

            avatar_loading: false,
            avatar_url: this.props.user.profile.avatar || '',
            avatar_type: this.props.user.profile.avatarFileType || '',
            avatar_filename: this.props.user.profile.avatarFilename || '',

            removeAttachment: true
        }
    }

    handleSubmit (e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.updateUser(values, this.state).then(() => {
                    this.props.getCurrentUser()
                });
                this.props.switchEditMode()
            }
        })
    }

    compareToFirstPassword(rule, value, callback) {
        const form = this.props.form
        if (value && value !== form.getFieldValue('password')) {
            callback(I18N.get('register.error.passwords')) // Two passwords you entered do not match'
        } else {
            callback()
        }
    }

    validateToNextPassword(rule, value, callback) {
        const form = this.props.form
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirmPassword'], { force: true })
        }
        if (value && value.length < MIN_LENGTH_PASSWORD) {
            callback(`${I18N.get('register.error.password_length_1')} ${MIN_LENGTH_PASSWORD} ${I18N.get('register.error.password_length_2')}`)
        }
        callback()
    }

    getInputProps () {

        const {getFieldDecorator} = this.props.form
        const user = this.props.user

        /*
        ****************************************************************************************
        * General
        ****************************************************************************************
         */
        const username_fn = getFieldDecorator('username', {
            rules: [{required: true, message: 'Username is required'}],
            initialValue: user.username
        })
        const username_el = (
            <Input size="large" disabled/>
        )
        
        const role_fn = getFieldDecorator('role', {
            rules: [{required: true, message: 'Please select your role'}],
            initialValue: user.role
        })
        const role_el = (
            <Select size="large"
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    placeholder="Role">
                {_.entries(config.data.mappingRoleToName).map(([key, val]) => {
                    return <Select.Option key={key} value={key}>
                        {val}
                    </Select.Option>
                })}
            </Select>
        )

        const email_fn = getFieldDecorator('email', {
            rules: [{required: true, message: 'Email is required'}],
            initialValue: user.email
        })
        const email_el = (
            <Input size="large"/>
        )

        const password_fn = getFieldDecorator('password', {
            rules: [{
                required: false, message: I18N.get('register.form.label_password')
            }, {
                validator: this.validateToNextPassword.bind(this)
            }]
        })

        const password_el = (
            <Input type="password" />
        )

        const passwordConfirm_fn = getFieldDecorator('passwordConfirm', {
            rules: [{
                required: false, message: I18N.get('register.form.label_password_confirm')
            }, {
                validator: this.compareToFirstPassword.bind(this)
            }]
        })

        const passwordConfirm_el = (
            <Input type="password" />
        )

        const firstName_fn = getFieldDecorator('firstName', {
            rules: [{required: true, message: 'First name is required'}],
            initialValue: user.profile.firstName
        })
        const firstName_el = (
            <Input size="large"/>
        )

        const lastName_fn = getFieldDecorator('lastName', {
            rules: [{required: true, message: 'Last name is required'}],
            initialValue: user.profile.lastName
        })
        const lastName_el = (
            <Input size="large"/>
        )

        const gender_fn = getFieldDecorator('gender', {
            rules: [],
            initialValue: user.profile.gender
        });
        const gender_el = (
            <RadioGroup>
                <Radio key={USER_GENDER.MALE} value={USER_GENDER.MALE}>
                    {config.data.mappingGenderKeyToName[USER_GENDER.MALE]}
                </Radio>
                <Radio key={USER_GENDER.FEMALE} value={USER_GENDER.FEMALE}>
                    {config.data.mappingGenderKeyToName[USER_GENDER.FEMALE]}
                </Radio>
                <Radio key={USER_GENDER.OTHER} value={USER_GENDER.OTHER}>
                    {config.data.mappingGenderKeyToName[USER_GENDER.OTHER]}
                </Radio>
            </RadioGroup>
        )

        const avatar_fn = getFieldDecorator('avatar', {
            rules: []
        });
        const p_avatar = {
            showUploadList: false,
            customRequest: (info) => {
                this.setState({
                    avatar_loading: true
                });
                upload_file(info.file).then((d) => {
                    const url = d.url;
                    this.setState({
                        avatar_loading: false,

                        avatar_url: url,
                        avatar_type: d.type,
                        avatar_filename: d.filename,

                        removeAttachment: false
                    });
                })
            }
        };
        const avatar_el = (
            <Upload name="logo" listType="picture" {...p_avatar}>
                <Button loading={this.state.avatar_loading}>
                    <Icon type="upload" /> Click to upload
                </Button>
            </Upload>
        );

        const country_fn = getFieldDecorator('country', {
            rules: [{required: true, message: 'Please select your country'}],
            initialValue: user.profile.country
        })
        const country_el = (
            <Select size="large"
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    placeholder="Country">
                {_.entries(config.data.mappingCountryCodeToName).map(([key, val]) => {
                    return <Select.Option key={key} value={key}>
                        {val}
                    </Select.Option>
                })}
            </Select>
        )

        const walletAddress_fn = getFieldDecorator('walletAddress', {
            rules: [
                {len: 34, message: 'address length error'}
            ],
            initialValue: user.profile.walletAddress
        })
        const walletAddress_el = (
            <Input size="large"/>
        )

        /*
        ****************************************************************************************
        * Social Media
        ****************************************************************************************
         */
        const telegram_fn = getFieldDecorator('telegram', {
            rules: [
                {min: 4, message: 'please enter at least 4 characters'}
            ],
            initialValue: user.profile.telegram
        })
        const telegram_el = (
            <Input size="large"/>
        )

        const reddit_fn = getFieldDecorator('reddit', {
            rules: [
                {min: 4, message: 'please enter at least 4 characters'}
            ],
            initialValue: user.profile.reddit
        })
        const reddit_el = (
            <Input size="large"/>
        )

        const wechat_fn = getFieldDecorator('wechat', {
            rules: [
                {min: 4, message: 'please enter at least 4 characters'}
            ],
            initialValue: user.profile.wechat
        })
        const wechat_el = (
            <Input size="large"/>
        )

        const twitter_fn = getFieldDecorator('twitter', {
            rules: [
                {min: 4, message: 'please enter at least 4 characters'}
            ],
            initialValue: user.profile.twitter
        })
        const twitter_el = (
            <Input size="large"/>
        )

        const facebook_fn = getFieldDecorator('facebook', {
            rules: [
                {min: 4, message: 'please enter at least 4 characters'}
            ],
            initialValue: user.profile.facebook
        })
        const facebook_el = (
            <Input size="large"/>
        )



        /*
        ****************************************************************************************
        * Questions
        ****************************************************************************************
         */
        const organizer_fn = getFieldDecorator('beOrganizer', {
            rules: [{message: 'Please select an option'}],
            initialValue: user.profile.beOrganizer ? 'yes' : 'no'
        })
        const organizer_el = (
            <Select size="large"
                    placeholder="Do you want to be an organizer?">
                <Select.Option value="yes">Yes</Select.Option>
                <Select.Option value="no">No</Select.Option>
            </Select>
        )

        const developer_fn = getFieldDecorator('isDeveloper', {
            rules: [{message: 'Please select an option'}],
            initialValue: user.profile.isDeveloper ? 'yes' : 'no'
        })
        const developer_el = (
            <Select size="large"
                    placeholder="Are you a software developer or engineer?">
                <Select.Option value="yes">Yes</Select.Option>
                <Select.Option value="no">No</Select.Option>
            </Select>
        )

        return {
            // General
            username: username_fn(username_el),
            role: role_fn(role_el),
            email: email_fn(email_el),
            password: password_fn(password_el),
            passwordConfirm: passwordConfirm_fn(passwordConfirm_el),

            firstName: firstName_fn(firstName_el),
            lastName: lastName_fn(lastName_el),
            gender: gender_fn(gender_el),
            avatar: avatar_fn(avatar_el),
            country: country_fn(country_el),

            walletAddress: walletAddress_fn(walletAddress_el),

            // Social Media
            telegram: telegram_fn(telegram_el),
            reddit: reddit_fn(reddit_el),
            wechat: wechat_fn(wechat_el),
            twitter: twitter_fn(twitter_el),
            facebook: facebook_fn(facebook_el),

            // Questions
            organizer: organizer_fn(organizer_el),
            developer: developer_fn(developer_el)
        }
    }

    removeAttachment = async () => {
        this.setState({
            avatar_loading: false,
            avatar_url: null,
            avatar_type: '',
            avatar_filename: '',

            removeAttachment: true
        })
    }

    ord_render () {
        const {getFieldDecorator} = this.props.form
        const p = this.getInputProps()

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12}
            }
        }
        
        // const existingTask = this.props.existingTask

        // TODO: terms of service checkbox

        // TODO: react-motion animate slide left

        // TODO: description CKE Editor

        return (
            <div className="c_userEditFormContainer">

                <Form onSubmit={this.handleSubmit.bind(this)} className="d_taskCreateForm">
                    <div>
                        <Divider>General</Divider>
                        <FormItem label="Username" {...formItemLayout}>
                            {p.username}
                        </FormItem>
                        {this.props.is_admin && 
                        <FormItem label="Role" {...formItemLayout}>{
                            p.role}
                        </FormItem>
                        }
                        <FormItem label="Email" {...formItemLayout}>
                            {p.email}
                        </FormItem>
                        <FormItem label="Password" {...formItemLayout}>
                            {p.password}
                        </FormItem>
                        <FormItem label="Confirm Password" {...formItemLayout}>
                            {p.passwordConfirm}
                        </FormItem>
                        <FormItem label="First Name" {...formItemLayout}>
                            {p.firstName}
                        </FormItem>
                        <FormItem label="Last Name" {...formItemLayout}>
                            {p.lastName}
                        </FormItem>
                        <FormItem label="Gender" {...formItemLayout}>
                            {p.gender}
                        </FormItem>
                        {this.state.avatar_url ?
                            <Row>
                                <Col className="labelContainer" xs={{span: 24}} sm={{span: 8}}>
                                    Avatar:
                                </Col>
                                <Col className="avatarContainer" xs={{span: 24}} sm={{span: 12}}>
                                    <img style={{height: '100px'}} src={this.state.avatar_url}/>
                                    &nbsp;
                                    <Icon type="delete" style={{cursor: 'pointer'}} onClick={this.removeAttachment.bind(this)}/>
                                </Col>
                            </Row> :
                            <FormItem label="Avatar" {...formItemLayout}>
                                {p.avatar}
                            </FormItem>
                        }
                        <FormItem label="Country" {...formItemLayout}>
                            {p.country}
                        </FormItem>
                        <FormItem label="Wallet Address" {...formItemLayout}>
                            {p.walletAddress}
                        </FormItem>

                        <Divider>Social Media</Divider>

                        <FormItem label="Telegram" {...formItemLayout}>
                            {p.telegram}
                        </FormItem>
                        <FormItem label="Reddit" {...formItemLayout}>
                            {p.reddit}
                        </FormItem>
                        <FormItem label="WeChat" {...formItemLayout}>
                            {p.wechat}
                        </FormItem>
                        <FormItem label="Twitter" {...formItemLayout}>
                            {p.twitter}
                        </FormItem>
                        <FormItem label="Facebook" {...formItemLayout}>
                            {p.facebook}
                        </FormItem>

                        <Divider>Questions</Divider>

                        <FormItem label="Do you want to be an organizer?" {...formItemLayout}>
                            {p.organizer}
                        </FormItem>
                        <FormItem label="Are you a software developer or engineer?" {...formItemLayout}>
                            {p.developer}
                        </FormItem>

                        <FormItem wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 12, offset: 8}}}>
                            <Button loading={this.props.loading} type="ebp" htmlType="submit" className="d_btn">
                                Save Changes
                            </Button>
                        </FormItem>
                    </div>
                </Form>
            </div>
        )
    }

}
export default Form.create()(C)
