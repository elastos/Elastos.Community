import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Menu, SubMenu } from 'antd'
import I18N from '@/I18N'

import './style.scss'

export default class extends BaseComponent {
    ord_render () {
        return (
            <Menu
                defaultSelectedKeys={['users']}
                mode="inline"
            >
                <Menu.Item key="users">
                    {I18N.get('1300')}
                </Menu.Item>
                <Menu.Item key="community">
                    {I18N.get('1301')}
                </Menu.Item>
                <Menu.Item key="task-proposals">
                    {I18N.get('1302')}
                </Menu.Item>
            </Menu>
        )
    }
}
