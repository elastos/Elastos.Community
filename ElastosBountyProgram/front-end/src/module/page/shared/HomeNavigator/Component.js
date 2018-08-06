import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Menu, SubMenu } from 'antd'
import I18N from '@/I18N'
import { Link } from 'react-router-dom';

import './style.scss'

export default class extends BaseComponent {

    handleMenuClick(item, key, keyPath) {

        switch (item.key) {
            case 'profileTasks':
                this.props.history.push('/profile/tasks')
                break
            case 'profileTeams':
                this.props.history.push('/profile/teams')
                break
            case 'profileSubmissions':
                this.props.history.push('/profile/submissions')
                break
        }
    }

    ord_render () {
        // TODO check why we can not use redirect use this.props.history
        return (
            <Menu
                defaultSelectedKeys={[this.props.selectedItem]}
                onClick={this.handleMenuClick.bind(this)}
                mode="inline"
            >
                <Menu.Item key="profileTasks">
                    {I18N.get('2301')}
                </Menu.Item>
                <Menu.Item key="profileTeams">
                    {I18N.get('2302')}
                </Menu.Item>
                <Menu.Item key="profileSubmissions">
                    {I18N.get('2303')}
                </Menu.Item>
            </Menu>
        )
    }
}
