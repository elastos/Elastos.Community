import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {Form, Icon, Input, Button, Checkbox, message, Select, Divider} from 'antd'
import ReCAPTCHA from 'react-google-recaptcha'
import {
    RECAPTCHA_KEY,
    MIN_LENGTH_PASSWORD
} from '@/config/constant'
import config from '@/config'
import I18N from '@/I18N'

import './style.scss'

const FormItem = Form.Item

class C extends BaseComponent {

    state = {
        requestedCode: null
    }

    handleSubmit(e) {
        e.preventDefault()

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Register - received values of form: ', values)

                if (this.state.requestedCode) {
                    this.props.register(this.state.savedValues.username,
                        this.state.savedValues.password, _.omit(this.state.savedValues, ['username', 'password']))
                } else {
                    const code = this.generateRegCode()
                    this.props.sendRegistrationCode(values.email, code)
                    this.setState({
                        requestedCode: code,
                        savedValues: values
                    })
                }
            }
        })
    }

    // TODO: move to back-end
    generateRegCode() {
        // Generate a random six digit code
        const min = 100000
        const max = 1000000
        return Math.round(Math.random() * (max - min) + min);
    }

    validateRegCode(rule, value, callback) {
        const reqCode = this.state.requestedCode
        const form = this.props.form

        if (reqCode && reqCode.toString() !== value) {
            callback(I18N.get('3504')) // The code you entered does not match
        } else {
            callback()
        }
    }

    compareToFirstPassword(rule, value, callback) {
        const form = this.props.form
        if (value && value !== form.getFieldValue('password')) {
            callback(I18N.get('3505')) // Two passwords you entered do not match'
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
            callback(`${I18N.get('3506')}${MIN_LENGTH_PASSWORD}${I18N.get('3507')}`)
        }
        callback()
    }

    getConfirmInputProps() {
        const {getFieldDecorator} = this.props.form

        const regCode_fn = getFieldDecorator('reg_code', {
            rules: [{required: true, message: I18N.get('3508')},
                {validator: this.validateRegCode.bind(this)}]
        })
        const regCode_el = (
            <Input size="large"
                   placeholder={I18N.get('3509')}/>
        )

        return {
            regCode: regCode_fn(regCode_el)
        }
    }

    getInputProps() {
        const {getFieldDecorator} = this.props.form

        const firstName_fn = getFieldDecorator('firstName', {
            rules: [{required: true, message: I18N.get('3510')}],
            initialValue: ''
        })
        const firstName_el = (
            <Input size="large"
                   prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                   placeholder={I18N.get('3511')}/>
        )

        const lastName_fn = getFieldDecorator('lastName', {
            rules: [{required: true, message: I18N.get('3512')}],
            initialValue: ''
        })
        const lastName_el = (
            <Input size="large"
                   prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                   placeholder={I18N.get('3513')}/>
        )

        const username_fn = getFieldDecorator('username', {
            rules: [
                {required: true, message: I18N.get('3514')},
                {min: 6, message: I18N.get('3515')}
            ],
            initialValue: ''
        })
        const username_el = (
            <Input size="large"
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder={I18N.get('3516')}/>
        )

        const email_fn = getFieldDecorator('email', {
            rules: [{
                required: true, message: I18N.get('3517')
            }, {
                type: 'email', message: I18N.get('3518')
            }],
        })
        const email_el = (
            <Input size="large"
                prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder={I18N.get('3519')}/>
        )

        const pwd_fn = getFieldDecorator('password', {
            rules: [{
                required: true, message: I18N.get('3520')
            }, {
                validator: this.validateToNextPassword.bind(this)
            }]
        })
        const pwd_el = (
            <Input size="large"
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                type="password" placeholder={I18N.get('3521')}/>
        )

        const pwdConfirm_fn = getFieldDecorator('passwordConfirm', {
            rules: [{
                required: true, message: I18N.get('3522')
            }, {
                validator: this.compareToFirstPassword.bind(this)
            }]
        })
        const pwdConfirm_el = (
            <Input size="large"
                   prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                   type="password" placeholder={I18N.get('3523')}/>
        )

        const country_fn = getFieldDecorator('country', {
            rules: [{required: true, message: I18N.get('3524')}]
        })
        const country_el = (
            <Select size="large"
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                placeholder={I18N.get('3534')}>
                {_.entries(config.data.mappingCountryCodeToName).map(([key, val]) => {
                    return <Select.Option key={key} value={key}>
                        {val}
                    </Select.Option>
                })}
            </Select>
        )

        const recaptcha_fn = getFieldDecorator('recaptcha', {
            rules: [{required: true}]
        })
        const recaptcha_el = (
            <ReCAPTCHA
                 ref={(el) => { this.captcha = el }}
                 sitekey={RECAPTCHA_KEY}
             />
        )

        const organizer_fn = getFieldDecorator('beOrganizer', {
            rules: [{message: I18N.get('3525')}]
        })
        const organizer_el = (
            <Select size="large"
                    placeholder={I18N.get('3526')}>
                <Select.Option value="yes">{I18N.get('3527')}</Select.Option>
                <Select.Option value="no">{I18N.get('3528')}</Select.Option>
            </Select>
        )

        const developer_fn = getFieldDecorator('isDeveloper', {
            rules: [{message: I18N.get('3525')}]
        })
        const developer_el = (
            <Select size="large"
                    placeholder={I18N.get('3529')}>
                <Select.Option value="yes">{I18N.get('3527')}</Select.Option>
                <Select.Option value="no">{I18N.get('3528')}</Select.Option>
            </Select>
        )

        const source_fn = getFieldDecorator('source', {
            rules: [{message: ''}],
        })
        const source_el = (
            <Input size="large"
                   placeholder={I18N.get('3530')}/>
        )

        return {
            firstName: firstName_fn(firstName_el),
            lastName: lastName_fn(lastName_el),
            userName: username_fn(username_el),
            email: email_fn(email_el),
            pwd: pwd_fn(pwd_el),
            pwdConfirm: pwdConfirm_fn(pwdConfirm_el),

            country: country_fn(country_el),

            organizer: organizer_fn(organizer_el),
            developer: developer_fn(developer_el),

            source: source_fn(source_el),

            recaptcha: recaptcha_fn(recaptcha_el),
        }
    }

    getForm() {
        if (this.state.requestedCode) {
            const p = this.getConfirmInputProps()
            return (
                <Form onSubmit={this.handleSubmit.bind(this)} className="d_registerForm">
                    <Divider>{I18N.get('3531')}</Divider>
                    <FormItem>
                        {p.regCode}
                    </FormItem>
                    <FormItem>
                        <Button loading={this.props.loading} type="ebp" htmlType="submit" className="d_btn" onClick={this.handleSubmit.bind(this)}>
                            {I18N.get('3532')}
                        </Button>
                    </FormItem>
                </Form>
            )
        } else {
            const p = this.getInputProps()
            return (
                <Form onSubmit={this.handleSubmit.bind(this)} className="d_registerForm">
                    <Divider>{I18N.get('3503')}{/* Required Fields */}</Divider>
                    <FormItem>
                        {p.firstName}
                    </FormItem>
                    <FormItem>
                        {p.lastName}
                    </FormItem>
                    <FormItem>
                        {p.userName}
                    </FormItem>
                    <FormItem>
                        {p.email}
                    </FormItem>
                    <FormItem>
                        {p.pwd}
                    </FormItem>
                    <FormItem>
                        {p.pwdConfirm}
                    </FormItem>
                    <FormItem>
                        {p.country}
                    </FormItem>
                    <Divider>Optional Info</Divider>
                    <FormItem>
                        {p.organizer}
                    </FormItem>
                    <FormItem>
                        {p.developer}
                    </FormItem>
                    <FormItem>
                        {p.source}
                    </FormItem>
                    <FormItem>
                        {p.recaptcha}
                    </FormItem>
                    <FormItem>
                        <Button loading={this.props.loading} type="ebp" htmlType="submit" className="d_btn" onClick={this.handleSubmit.bind(this)}>
                            {I18N.get('3532')}
                        </Button>
                    </FormItem>
                </Form>
            )
        }
    }

    ord_render() {
        const {getFieldDecorator} = this.props.form
        const form = this.getForm()

        // TODO: terms of service checkbox

        // TODO: react-motion animate slide left

        return (
            <div className="c_registerContainer">

                <h2>
                    {I18N.get('3500')}
                    {/* Become a Contributor */}
                </h2>

                <p>
                    {I18N.get('3501')}
                    {/* As a member you can sign up for bounties on EBP,  */}
                    <br/>
                    {I18N.get('3502')}
                    {/* you do not need to be a member to join events. */}
                </p>

                {form}
            </div>
        )

    }
}

export default Form.create()(C)
