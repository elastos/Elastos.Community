import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Table, Icon } from 'antd'
import I18N from '@/I18N'

import './style.scss'

export default class extends BaseComponent {
    ord_render () {
        const columns = [{
            title: I18N.get('1200'),
            dataIndex: 'no',
            key: 'no'
        }, {
            title: I18N.get('1201'),
            dataIndex: 'username',
            key: 'username'
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
            key: 'role'
        }, {
            title: I18N.get('1205'),
            dataIndex: 'active',
            key: 'active',
            render: (value, row, index) => {
                return (value ? <Icon type="check-square-o" /> : null);
            }
        }, {
            title: I18N.get('1206'),
            dataIndex: 'ela',
            key: 'ela'
        }, {
            title: I18N.get('1207'),
            dataIndex: 'createdDate',
            key: 'createdDate'
        }]

        const data = []
        for (let i = 0; i < 50; i++) {
            const fake = i + 1
            data.push({
                no: fake,
                username: 'Username ' + fake,
                email: `email${fake}@gmail.com`,
                defaultLanguage: 'Language ' + fake,
                role: 'Role ' + fake,
                active: !!(i % 2),
                ela: fake,
                createdDate: 'createdDate ' + fake
            })
        }

        return (
            <Table columns={columns} dataSource={data} rowKey={record => record.username}/>
        )
    }
}
