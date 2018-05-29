import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Table, Button } from 'antd'

export default class extends BaseComponent {
    ord_render () {
        const columns = [{
            title: 'Short title',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: 'Short description',
            dataIndex: 'description',
            key: 'description',
        }, {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button>Accept</Button>
            ),
        }];
        
        const taskData = [{
            id: 1,
            title: 'Build a website',
            description: 'Description of the project',
            location: 'Online',
        }, {
            id: 2,
            title: 'Build a website',
            description: 'Description of the project',
            location: 'Online',
        }, {
            key: 3,
            title: 'Build a website',
            description: 'Description of the project',
            location: 'Online',
        }]

        return (
            <Table pagination={false} columns={columns} dataSource={taskData} />
        )
    }
}
