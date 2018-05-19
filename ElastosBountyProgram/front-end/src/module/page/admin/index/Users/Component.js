import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Table, Icon, Divider } from 'antd'

import './style.scss'

export default class extends BaseComponent {
    ord_render () {
        const columns = [{
            title: 'No',
            dataIndex: 'no',
            key: 'no'
        }, {
            title: 'Username',
            dataIndex: 'username',
            key: 'username'
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        }, {
            title: 'Default language',
            dataIndex: 'defaultLanguage',
            key: 'defaultLanguage'
        }, {
            title: 'Role',
            dataIndex: 'role',
            key: 'role'
        }, {
            title: 'Active',
            dataIndex: 'active',
            key: 'active'
        }, {
            title: 'Ela',
            dataIndex: 'ela',
            key: 'ela'
        }, {
            title: 'Created date',
            dataIndex: 'createdDate',
            key: 'createdDate'
        }]

        const data = [];
        for (let i = 0; i < 50; i++) {
            const fake = i + 1;
            data.push({
                no: fake,
                username: 'Username ' + fake,
                email: `email${fake}@gmail.com`,
                defaultLanguage: 'Language ' + fake,
                role: 'Role ' + fake,
                ela: fake,
                createdDate: 'createdDate ' + fake
            })
        }

        return (
            <Table columns={columns} dataSource={data} rowKey={record => record.username} />
        )
    }
}
