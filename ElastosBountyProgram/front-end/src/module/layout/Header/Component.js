import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {Layout, Menu, Icon, Badge, Avatar, Modal, Dropdown} from 'antd'
import _ from 'lodash'
import I18N from '@/I18N'

import logoImg from 'img/Elastos Logo_Temp.png'

import {USER_ROLE} from '@/constant'

const {Header} = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

export default class extends BaseComponent {

    buildOverviewDropdown() {
        return (
            <Menu onClick={this.clickItem.bind(this)}>
                <Menu.Item key="developer">
                    Developer
                </Menu.Item>
                <Menu.Item key="social">
                    Social
                </Menu.Item>
                <Menu.Item key="leader">
                    Leader
                </Menu.Item>
            </Menu>
        )
    }

    buildAcctDropdown() {

        const isLogin = this.props.isLogin
        const hasAdminAccess = [USER_ROLE.ADMIN, USER_ROLE.COUNCIL].includes(this.props.role)

        return (
            <Menu onClick={this.clickItem.bind(this)}>
                {isLogin ?
                    <Menu.Item key="profile">
                        Profile
                    </Menu.Item> :
                    <Menu.Item key="login">
                        Login
                    </Menu.Item>
                }
                {!isLogin &&
                    <Menu.Item key="register">
                        Register
                    </Menu.Item>
                }
                {isLogin && hasAdminAccess &&
                    <Menu.Item key="admin/users">
                        Admin
                    </Menu.Item>
                }
                {isLogin &&
                    <Menu.Item key="logout">
                        Logout
                    </Menu.Item>
                }
            </Menu>
        )
    }

    ord_render() {

        const isLogin = this.props.isLogin

        const overviewDropdown = this.buildOverviewDropdown()
        const acctDropdown = this.buildAcctDropdown()

        return (
            <Header className="c_Header">
                <Menu onClick={this.clickItem.bind(this)} className="c_Header_Menu" selectedKeys={['mail']} mode="horizontal">
                    <Menu.Item className="c_MenuItem logo" key="home">
                        <img src={logoImg} />
                    </Menu.Item>

                    <Menu.Item className="c_MenuItem overview">
                        <Dropdown overlay={overviewDropdown} style="margin-top: 24px;">
                            <a className="ant-dropdown-link" href="#">
                                Overview <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Menu.Item>

                    <Menu.Item className="c_MenuItem" key="community">
                        Community
                    </Menu.Item>

                    <Menu.Item className="c_MenuItem" key="directory">
                        Leaders
                    </Menu.Item>

                    <Menu.Item className="c_MenuItem right-side" key="inbox">
                        Inbox
                    </Menu.Item>

                    <Menu.Item className="c_MenuItem right-side" key="teams">
                        Teams
                    </Menu.Item>

                    <Menu.Item className="c_MenuItem account right-side">
                        <Dropdown overlay={acctDropdown} style="margin-top: 24px;">
                            <a className="ant-dropdown-link" href="#">
                                Account <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Menu.Item>
                </Menu>

                <Menu onClick={this.clickItem.bind(this)} className="c_MenuTopRight" mode="horizontal">
                    <Menu.Item key="how-to-earn">
                        How to Earn ELA
                    </Menu.Item>

                    <Menu.Item key="about">
                        About
                    </Menu.Item>

                    <Menu.Item key="faq">
                        FAQ
                    </Menu.Item>

                    <Menu.Item key="contact">
                        Contact
                    </Menu.Item>
                </Menu>
            </Header>
        )
    }

    clickItem(e) {
        const key = e.key
        if (_.includes([
            'home',
            'developer',
            'social',
            'leader',
            'community',
            'directory',
            'account',
            'teams',
            'inbox',
            'login',
            'register',
            'signup',
            'profile',
            'admin/users',
            'how-to-earn',
            'about',
            'faq',
            'contact'
        ], key)) {
            this.props.history.push('/' + e.key)
        }
        else if (key === 'logout') {
            Modal.confirm({
                title: 'Are you sure you want to logout?',
                content: '',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: () => {
                    this.props.logout()
                },
                onCancel() {
                }
            })
        }
    }
}
