import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import LoginForm from '@/module/form/LoginForm/Container'
import RegisterForm from '@/module/form/RegisterForm/Container'
import I18N from '@/I18N'
import { Tabs } from 'antd'

import './style.scss'

const TabPane = Tabs.TabPane

export default class extends BaseComponent {
    ord_states() {
        return {
            persist: true,
            activeKey: 'login' // login, register
        }
    }

    handleChangeTab() {
        return (key) => {
            this.setState({
                activeKey: key
            })
        }
    }

    ord_render() {
        const registered = sessionStorage.getItem('registered')

        if (registered) {
            this.setState({
                activeKey: 'login'
            })
            sessionStorage.removeItem('registered')
            console.log("removed registered")
        }

        return (
            <div className="c_LoginOrRegister">
                <div className="pull-left">
                    <img src="/assets/images/login-left.png"/>
                </div>
                <div className="main-form">
                    <Tabs activeKey={this.state.activeKey} onChange={this.handleChangeTab()}>
                        <TabPane tab="Login" key="login">
                            <LoginForm />
                        </TabPane>
                        <TabPane tab="Register" key="register">
                            <RegisterForm />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}
