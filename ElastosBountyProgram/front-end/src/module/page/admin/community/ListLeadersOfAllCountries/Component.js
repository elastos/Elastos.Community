import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Card, Row, Col, Button } from 'antd'
import './style.scss'
import AddCountryModal from '../../shared/ModalAddCountry/Component';

export default class extends BaseComponent {
    componentWillMount() {
        this.setState({
            visibleModalAddCountry: false
        });
    }

    handleChangeLeaderCountry(leader) {
        alert('TODO open popup change leader of country ' + leader.country)
        console.log('TODO handleChangeLeaderCountry', leader)
    }

    handleAddCountry() {
        this.setState({
            visibleModalAddCountry: true
        });
    }

    handleCancelAddCountry() {
        this.setState({
            visibleModalAddCountry: false
        });
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
                <AddCountryModal
                    visible={this.state.visibleModalAddCountry}
                    onOk={this.handleSubmitAddCountry.bind(this)}
                    onCancel={this.handleCancelAddCountry.bind(this)} />
                <h1>Country Leaders</h1>
                <Row>
                    {listLeadersEl}
                </Row>
            </div>
        )
    }

    handleSubmitAddCountry(country) {
        console.log('handleSubmitAddCountry', country);

        this.setState({
            visibleModalAddCountry: false
        });
    }
}
