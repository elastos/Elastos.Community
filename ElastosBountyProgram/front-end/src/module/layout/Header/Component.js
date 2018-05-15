import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {Layout, Menu, Icon, Badge, Avatar, Modal} from 'antd'
import _ from 'lodash'
import I18N from '@/I18N'

const {Header} = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

export default class extends BaseComponent {

    buildDetailComponent() {
        const {profile} = this.props
        const signup_el = (
            <Menu.Item className="d_li" key="signup">
                {I18N.get('0001')}
            </Menu.Item>
        )
        const login_el = (
            <Menu.Item className="d_li" style={{borderLeft: '1px solid #cdcdcd'}} key="login">
                {I18N.get('0002')}
            </Menu.Item>
        )

        const user_p = {
            title: (
                <span>
                    <Badge className="d_avatar" count={1}>
                        <Avatar shape="square" size="large" icon="user"/>
                    </Badge>
                    {profile.name}
                </span>
            )
        }
        const user_el = (
            <SubMenu className="d_li" style={{borderLeft: '1px solid #cdcdcd'}} title={user_p.title}>
                <Menu.Item key="profile">Profile</Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="logout">Logout</Menu.Item>
            </SubMenu>
        )

        return {
            signup_el,
            login_el,
            user_el
        }

    }

    ord_render() {

        const {signup_el, login_el, user_el} = this.buildDetailComponent()
        const isLogin = this.props.isLogin

        return (
            <Header className="c_Header" theme="light">
                <Menu onClick={this.clickItem.bind(this)} className="ebp-wrap" selectedKeys={['mail']}
                    mode="horizontal">
                    <Menu.Item key="home">
                        <h1>ELASTOS LOGO</h1>
                    </Menu.Item>

                    {isLogin ? null : signup_el}
                    {isLogin ? user_el : login_el}

                    <Menu.Item className="d_li" key="work">
                        {I18N.get('0003')}
                    </Menu.Item>
                    <Menu.Item className="d_li" key="post">
                        {I18N.get('0004')}
                    </Menu.Item>
                    <Menu.Item className="d_li" key="find">
                        {I18N.get('0005')}
                    </Menu.Item>
                </Menu>
            </Header>
        )
    }

    clickItem(e) {
        const key = e.key
        if (_.includes(['work', 'post', 'find', 'home', 'login', 'signup', 'profile'], key)) {
            this.props.history.push(e.key)
        }
        else if (key === 'logout') {
            Modal.confirm({
                title: 'Are you sure to logout',
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
