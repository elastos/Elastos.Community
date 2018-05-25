import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {Form, Icon, Input, Button, Checkbox, message} from 'antd'

import './style.scss'

const FormItem = Form.Item

class C extends BaseComponent {

    handleSubmit(e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Register - received values of form: ', values)
                this.props.register(values.username, values.password)

            }
        })
    }


    constructor(props) {
        super(props)

        this.step1Container = React.createRef()
        this.step2Container = React.createRef()
    }

    compareToFirstPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
    }

    validateToNextPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirmPassword'], { force: true });
        }
        if (value && value.length < 6) {
            callback('The Password must be at least 6 characters.')
        }
        callback();
    }

    getInputProps() {
        const {getFieldDecorator} = this.props.form

        const firstName_fn = getFieldDecorator('firstName', {
            rules: [{required: true, message: 'Please input your first name'}],
            initialValue: ''
        })
        const firstName_el = (
            <Input size="large"
                   prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                   placeholder="First name"/>
        )

        const lastName_fn = getFieldDecorator('lastName', {
            rules: [{required: true, message: 'Please input your last name'}],
            initialValue: ''
        })
        const lastName_el = (
            <Input size="large"
                   prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                   placeholder="Last name"/>
        )

        const username_fn = getFieldDecorator('username', {
            rules: [{required: true, message: 'Please input your username'}],
            initialValue: ''
        })
        const username_el = (
            <Input size="large"
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="Username"/>
        )

        const email_fn = getFieldDecorator('email', {
            rules: [{
                required: true, message: 'Please input your email'
            }, {
                type: 'email', message: 'The input is not valid E-mail!'
            }],
        })
        const email_el = (
            <Input size="large"
                prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="Email"/>
        )

        const pwd_fn = getFieldDecorator('password', {
            rules: [{
                required: true, message: 'Please input a Password'
            }, {
                validator: this.validateToNextPassword.bind(this)
            }]
        })
        const pwd_el = (
            <Input size="large"
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                type="password" placeholder="Password"/>
        )

        const pwdConfirm_fn = getFieldDecorator('passwordConfirm', {
            rules: [{
                required: true, message: 'Please input your password again'
            }, {
                validator: this.compareToFirstPassword.bind(this)
            }]
        })
        const pwdConfirm_el = (
            <Input size="large"
                   prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                   type="password" placeholder="Password confirm"/>
        )

        const country_fn = getFieldDecorator('country', {
            rules: [{required: true, message: 'Please select your country'}],
            initialValue: ''
        })
        const country_el = (
            <Input size="large"
                   placeholder="Country"/>
        )

        return {
            firstName: firstName_fn(firstName_el),
            lastName: lastName_fn(lastName_el),
            userName: username_fn(username_el),
            email: email_fn(email_el),
            pwd: pwd_fn(pwd_el),
            pwdConfirm: pwdConfirm_fn(pwdConfirm_el),

            country: country_fn(country_el)
        }
    }

    ord_render() {
        const {getFieldDecorator} = this.props.form
        const p = this.getInputProps()

        // TODO: terms of service checkbox

        // TODO: react-motion animate slide left

        return (
            <div className="c_registerContainer">

                <h2>
                    Become a Contributor
                </h2>

                <p>
                    As a member you can sign up for bounties on EBP, <br/>
                    you do not need to be a member to join events.
                </p>

                <Form onSubmit={this.handleSubmit.bind(this)} className="d_registerForm">
                    <div ref={this.step1Container} className={this.props.step === 1 ? '' : 'hide'}>
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
                            <Button loading={this.props.loading} type="ebp" htmlType="button" className="d_btn" onClick={this.registerStep1.bind(this)}>
                                Continue
                            </Button>
                        </FormItem>
                    </div>
                    <div ref={this.step2Container} className={this.props.step === 2 ? '' : 'hide'}>
                        <FormItem>
                            {p.country}
                        </FormItem>
                    </div>
                </Form>
            </div>
        )

    }

    async registerStep1() {

        // check if passwords match
        const pwd = _.trim(this.props.form.getFieldValue('password'))
        const pwdConfirm = _.trim(this.props.form.getFieldValue('passwordConfirm'))

        if (pwd.length < 8 || pwd !== pwdConfirm) {
            message.error('Passwords must be 8 characters or more and must match')
            return
        }

        this.props.changeStep(2)
    }
}

export default Form.create()(C)
