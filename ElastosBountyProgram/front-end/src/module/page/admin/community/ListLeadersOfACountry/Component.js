import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Card, Row, Col, Button } from 'antd'

import './style.scss'

export default class extends BaseComponent {

    handleChangeLeader() {
        alert('TODO change leader')
    }

    ord_render () {
        const leaderInfo = {
            name: 'John Nguyen',
            country: 'Vietnam',
            avatar: 'https://www.w3schools.com/howto/img_avatar.png'
        }

        const leaderEl = (
            <Card
                hoverable
                cover={<img alt="example" src={leaderInfo.avatar}/>}
            >
                <Card.Meta
                    title={leaderInfo.name}
                    description={leaderInfo.country}
                />
            </Card>
        )

        return (
            <div className="list-leaders-of-a-country">
                <Row>
                    <Col span={6} className="user-card user-card--without-padding">
                        {leaderEl}
                        <Button onClick={this.handleChangeLeader.bind(this)} type="primary">Change leader</Button>
                    </Col>
                    <Col span={18} className="wrap-child-box-users">
                        <div className="child-box-users">
                            <Button className="pull-right" type="primary">Add state</Button>
                            <h1>States / Provinces (18)</h1>
                            <Row>
                                TODO list user
                            </Row>
                        </div>
                        <div className="child-box-users">
                            <Button className="pull-right" type="primary">Add city</Button>
                            <h1>Cities (40)</h1>
                            <Row>
                                TODO list user
                            </Row>
                        </div>
                        <div className="child-box-users">
                            <Button className="pull-right" type="primary">Add region</Button>
                            <h1>Region (0)</h1>
                            <Row>
                                TODO list user
                            </Row>
                        </div>
                        <div className="child-box-users">
                            <Button className="pull-right" type="primary">Add school</Button>
                            <h1>Schools (0)</h1>
                            <Row>
                                TODO list user
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
