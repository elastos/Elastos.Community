import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {Form, Icon, Input, Button, Checkbox} from 'antd'
import ReCAPTCHA from 'react-google-recaptcha';
import {RECAPTCHA_KEY} from '@/config/constant';
import I18N from '@/I18N'

import './style.scss'

const FormItem = Form.Item

class C extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            persist: true
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values.username, values.password, this.state.persist)

            }
        })
    }

    getInputProps() {
        const {getFieldDecorator} = this.props.form
        const userName_fn = getFieldDecorator('username', {
            rules: [{required: true, message: I18N.get('3400')}],
            initialValue: ''
        })
        const userName_el = (
            <Input size="large"
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder={I18N.get('3401')}/>
        )

        const pwd_fn = getFieldDecorator('password', {
            rules: [{required: true, message: I18N.get('3402')}]
        })
        const pwd_el = (
            <Input size="large"
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                type="password" placeholder={I18N.get('3403')}/>
        )

        const persist_fn = getFieldDecorator('persist')
        const persist_el = (
            <Checkbox onClick={this.togglePersist.bind(this)} checked={this.state.persist}>{I18N.get('3404')}</Checkbox>
        )

        return {
            userName: userName_fn(userName_el),
            pwd: pwd_fn(pwd_el),
            persist: persist_fn(persist_el)
        }
    }

    togglePersist() {
        this.setState({persist: !this.state.persist})
    }

    ord_render() {
        const {getFieldDecorator} = this.props.form
        const p = this.getInputProps()
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="c_loginForm">
                <FormItem>
                    {p.userName}
                </FormItem>
                <FormItem>
                    {p.pwd}
                </FormItem>
                <FormItem>
                    {p.persist}
                </FormItem>
                <FormItem className="d_item">
                    <a className="login-form-forgot" onClick={() => this.props.history.push('/forgot-password')}>{I18N.get('3405')}</a>
                </FormItem>
                <FormItem>
                    <Button loading={this.props.loading} type="ebp" htmlType="submit" className="d_btn">
                        {I18N.get('3406')}
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(C)
