import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Card, Row, Col, Button } from 'antd'
import './style.scss'

export default class extends BaseComponent {
    handleChangeLeaderCountry(leader) {
        alert('TODO open popup change leader of country ' + leader.country)
        console.log('TODO handleChangeLeaderCountry', leader)
    }

    handleAddCountry() {
        alert('TODO open popup add country');
    }

    ord_render () {
        const listLeaders = [
            {
                name: 'John Nguyen',
                country: 'Vietnam',
                avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            },
            {
                name: 'Julian',
                country: 'USA',
                avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            },
            {
                name: 'John',
                country: 'England',
                avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            }
        ]

        const listLeadersEl = listLeaders.map((leader, index) => {
            return (
                <Col span={6} key={index} className="user-card">
                    <Card
                        hoverable
                        onClick={this.handleChangeLeaderCountry.bind(this, leader)}
                        cover={<img alt="example" src={leader.avatar}/>}
                    >
                        <Card.Meta
                            title={leader.name}
                            description={leader.country}
                        />
                    </Card>
                </Col>
            )
        })
        return (
            <div>
                <Button className="pull-right" onClick={this.handleAddCountry.bind(this)} type="primary">Add country</Button>
                <h1>Country Leaders</h1>
                <Row>
                    {listLeadersEl}
                </Row>
            </div>
        )
    }
}
