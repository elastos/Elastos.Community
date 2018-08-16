import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import LoginForm from '@/module/form/LoginForm/Container'
import RegisterForm from '@/module/form/RegisterForm/Container'
import I18N from '@/I18N'
import { Tabs } from 'antd'

import './style.scss'

const TabPane = Tabs.TabPane

export default class extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            persist: true,
            activeKey: 'login'
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
        }

        return (
            <Tabs activeKey={this.state.activeKey} onChange={this.handleChangeTab()}>
                <TabPane tab="Login" key="login">
                    <LoginForm />
                </TabPane>
                <TabPane tab="Register" key="register">
                    <RegisterForm />
                </TabPane>
            </Tabs>
        )
    }
}
