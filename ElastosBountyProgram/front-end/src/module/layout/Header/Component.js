import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {Layout, Menu, Icon, Badge, Avatar, Modal, Dropdown} from 'antd'
import _ from 'lodash'
import I18N from '@/I18N'


import {USER_ROLE} from '@/constant'

const {Header} = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

export default class extends BaseComponent {

    buildOverviewDropdown() {
        return (
            <Menu onClick={this.clickItem.bind(this)}>
                <Menu.Item key="developer">
                    {I18N.get('0100')}
                </Menu.Item>
                <Menu.Item key="social">
                    {I18N.get('0101')}
                </Menu.Item>
                <Menu.Item key="leader">
                    {I18N.get('0102')}
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
                        {I18N.get('0200')}
                    </Menu.Item> :
                    <Menu.Item key="login">
                        {I18N.get('0201')}
                    </Menu.Item>
                }
                {!isLogin &&
                    <Menu.Item key="register">
                        {I18N.get('0202')}
                    </Menu.Item>
                }
                {isLogin && hasAdminAccess &&
                    <Menu.Item key="admin/tasks">
                        {I18N.get('0203')}
                    </Menu.Item>
                }
                {isLogin &&
                    <Menu.Item key="logout">
                        {I18N.get('0204')}
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
                        <img src='/assets/images/Elastos_Logo_Temp.png' />
                    </Menu.Item>

                    <Menu.Item className="c_MenuItem overview">
                        <Dropdown overlay={overviewDropdown} style="margin-top: 24px;">
                            <a className="ant-dropdown-link" href="#">
                                {I18N.get('0001')} <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Menu.Item>

                    <Menu.Item className="c_MenuItem" key="community">
                        {I18N.get('0002')}
                    </Menu.Item>

                    <Menu.Item className="c_MenuItem" key="directory">
                        {I18N.get('0003')}
                    </Menu.Item>

                    <Menu.Item className="c_MenuItem right-side" key="tasks">
                        {I18N.get('0006')}
                    </Menu.Item>

                    <Menu.Item className="c_MenuItem right-side" key="teams">
                        {I18N.get('0005')}
                    </Menu.Item>

                    <Menu.Item className="c_MenuItem account right-side">
                        <Dropdown overlay={acctDropdown} style="margin-top: 24px;">
                            <a className="ant-dropdown-link" href="#">
                                {I18N.get('0004')} <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Menu.Item>
                </Menu>

                <Menu onClick={this.clickItem.bind(this)} className="c_MenuTopRight" mode="horizontal">
                    <Menu.Item key="how-to-earn">
                        {I18N.get('0007')}
                    </Menu.Item>

                    <Menu.Item key="about">
                        {I18N.get('0008')}
                    </Menu.Item>

                    <Menu.Item key="faq">
                        {I18N.get('0009')}
                    </Menu.Item>

                    <Menu.Item key="contact">
                        {I18N.get('0010')}
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
            'tasks',
            'login',
            'register',
            'signup',
            'profile',
            'admin/tasks',
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
