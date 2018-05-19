import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Layout, Menu, Icon, Badge, Avatar, Modal, Row, Col } from 'antd'
import _ from 'lodash'
import I18N from '@/I18N'

import './style.scss'

const {Header} = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

export default class extends BaseComponent {
    ord_render () {
        return (
            <Menu
                onClick={this.handleClick.bind(this)}
                selectedKeys={['mail']}
                mode="horizontal"
            >
                <SubMenu title={<span><Icon type="caret-down" />OVERVIEW</span>}>
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="community">
                    COMMUNITY
                </Menu.Item>
                <Menu.Item key="directory">
                    DIRECTORY
                </Menu.Item>

                <Menu.Item className="menu-right" key="find">
                    <Badge count={5} offset={[-0, 5]}>
                        MAIL
                    </Badge>
                </Menu.Item>
                <Menu.Item className="menu-right" key="post">
                    TEAM
                </Menu.Item>
                <Menu.Item className="menu-right" key="work">
                    ACCOUNT
                </Menu.Item>
            </Menu>
        )
    }

    handleClick (e) {
        console.log('click ', e)
        this.setState({
            current: e.key
        })
    }
}
