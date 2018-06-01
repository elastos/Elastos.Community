import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Menu, SubMenu } from 'antd'
import I18N from '@/I18N'
import { Link } from 'react-router-dom';

import './style.scss'

export default class extends BaseComponent {
    ord_render () {
        // TODO check why we can not use redirect use this.props.history
        return (
            <Menu
                defaultSelectedKeys={[this.props.selectedItem]}
                mode="inline"
            >
                <Menu.Item key="profileInfo">
                    <Link to="/profile/info">{I18N.get('2300')}</Link>
                </Menu.Item>
                <Menu.Item key="profileTasks">
                    <Link to="/profile/tasks">{I18N.get('2301')}</Link>
                </Menu.Item>
                <Menu.Item key="profileTeams">
                    <Link to="/profile/teams">{I18N.get('2302')}</Link>
                </Menu.Item>
            </Menu>
        )
    }
}
