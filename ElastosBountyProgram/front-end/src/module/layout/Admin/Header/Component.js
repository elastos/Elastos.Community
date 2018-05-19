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

    buildDetailComponent () {
        const {profile} = this.props

        const logo_el = (
            <h1 className="admin-logo">EBP</h1>
        )

        const menuItems = [
            {
                text: 'Admin',
                link: 'admin'
            },
            {
                text: 'How to earn ELA',
                link: 'how-to-earn-ela'
            },
            {
                text: 'About',
                link: 'about'
            },
            {
                text: 'FAQ',
                link: 'faq'
            },
            {
                text: 'Contact',
                link: 'contact'
            }
        ]

        const menuItemsEl = menuItems.map((menu, index) => {
            return (
                <li onClick={this.clickItem.bind(this, menu.link)} key={index}>
                    <a>{menu.text}</a>
                </li>
            );
        })

        const menu_el = (
            <ul className="admin-top-menu">{menuItemsEl}</ul>
        )

        return {
            logo_el,
            menu_el
        }
    }

    ord_render () {

        const {menu_el, logo_el} = this.buildDetailComponent()
        const isLogin = this.props.isLogin

        return (
            <Header className="c_Header" theme="light">
                <Row>
                    <Col span={12}>
                        {logo_el}
                    </Col>
                    <Col span={12}>
                        {menu_el}
                    </Col>
                </Row>
            </Header>
        )
    }

    clickItem (link) {
        alert(`TODO redirect to link ${link}`)
    }
}
