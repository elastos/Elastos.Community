import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import LoginForm from '@/module/form/LoginForm/Container'
import RegisterForm from '@/module/form/RegisterForm/Container'
import I18N from '@/I18N'
import {Tabs, Button} from 'antd'

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

    handleSubmit(e) {
        e.preventDefault()
        const registerRedirect = sessionStorage.getItem('registerRedirect')
        sessionStorage.removeItem('registerRedirect')
        sessionStorage.removeItem('registerWelcome')
        this.props.history.push(registerRedirect)
    }

    showPostRegLogScreen() {
        return (
            <div className="post-state">
                <h3 className="welcome-header komu-a">{I18N.get('register.welcome')}</h3>
                <p className="welcome-text synthese">{I18N.get('register.join_circle')}</p>
                <Button type="ebp" htmlType="submit" className="d_btn d_btn_join" onClick={this.handleSubmit.bind(this)}>
                    {I18N.get('register.join')}
                </Button>
            </div>
        )
    }

    ord_render() {
        const registered = sessionStorage.getItem('registered')

        if (registered === '1') {
            this.setState({
                activeKey: 'login'
            })
            sessionStorage.removeItem('registered')
        }

        const welcomeState = sessionStorage.getItem('registerWelcome') === '1'
        console.log(sessionStorage)
        return (
            <div className="c_LoginOrRegister">
                <div className="pull-left">
                    <img src="/assets/images/login-left.png"/>
                </div>
                <div className="main-form">
                    {this.state.activeKey === 'post' ? this.showPostRegLogScreen() : (
                        <Tabs activeKey={this.state.activeKey} onChange={this.handleChangeTab()}>
                            <TabPane tab="Login" key="login">
                                <LoginForm />
                            </TabPane>
                            <TabPane tab="Register" key="register">
                                <RegisterForm onChangeActiveKey={this.handleChangeTab()}/>
                            </TabPane>
                        </Tabs>)}
                </div>
            </div>
        )
    }
}
