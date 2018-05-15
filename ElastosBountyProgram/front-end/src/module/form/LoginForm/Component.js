import React from 'react';
import BaseComponent from '@/model/BaseComponent';
import {Form, Icon, Input, Button, Checkbox} from 'antd';

import './style.scss';

const FormItem = Form.Item;

class C extends BaseComponent {

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.login(values.username, values.password, values.remember);

            }
        });
    }

    getInputProps() {
        const {getFieldDecorator} = this.props.form;
        const userName_fn = getFieldDecorator('username', {
            rules: [{required: true, message: 'Please input your username!'}],
            initialValue: ''
        });
        const userName_el = (
            <Input size="large"
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="Username"/>
        );

        const pwd_fn = getFieldDecorator('password', {
            rules: [{required: true, message: 'Please input your Password!'}]
        });
        const pwd_el = (
            <Input size="large"
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                type="password" placeholder="Password"/>
        );

        const remember_fn = getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
        });
        const remember_el = (
            <Checkbox>Remember me</Checkbox>
        );
        return {
            userName: userName_fn(userName_el),
            pwd: pwd_fn(pwd_el),
            remember: remember_fn(remember_el)
        };
    }

    ord_render() {
        const {getFieldDecorator} = this.props.form;
        const p = this.getInputProps();
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="c_loginForm">
                <FormItem>
                    {p.userName}
                </FormItem>
                <FormItem>
                    {p.pwd}
                </FormItem>
                <FormItem className="d_item">
                    {p.remember}
                    <a className="login-form-forgot" href="">Forgot password</a>

                </FormItem>
                <FormItem>
                    <Button loading={this.props.loading} type="ebp" htmlType="submit" className="d_btn">
                        Log in
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(C);
