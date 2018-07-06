import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Table, Icon } from 'antd'
import I18N from '@/I18N'

import './style.scss'

export default class extends BaseComponent {
    ord_render () {
        const columns = [{
            title: I18N.get('1201'),
            dataIndex: 'username',
            key: 'username',
            render: (username, record) => {
                return <a onClick={this.linkProfileInfo.bind(this, record._id)} className="tableLink">{username}</a>
            }
        }, {
            title: I18N.get('1202'),
            dataIndex: 'email',
            key: 'email'
        }, {
            title: I18N.get('1203'),
            dataIndex: 'defaultLanguage',
            key: 'defaultLanguage'
        }, {
            title: I18N.get('1204'),
            dataIndex: 'role',
            key: 'role',
            render: (role) => {
                if (role === 'LEADER') {
                    role = 'ORGANIZER'
                }

                return _.capitalize(role)
            }
        }]

        const data = this.props.users

        return (
            <Table
                columns={columns}
                dataSource={data}
                rowKey={record => record.username}
                loading={this.props.loading}
            />
        )
    }

    linkProfileInfo(userId) {
        this.props.history.push(`/admin/profile/${userId}`)
    }
}
