import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Button, Card, Col, message, Row } from 'antd'

import ModalAddCountry from '../../shared/ModalAddCountry/Component'
import ModalChangeLeaderCountry from '../../shared/ModalChangeLeaderCountry/Component'

import './style.scss'

export default class extends BaseComponent {
    state = {
        visibleModalAddCountry: false,
        visibleModalChangeLeader: false,
    }

    // Modal add country
    showModalAddCountry = () => {
        this.setState({visibleModalAddCountry: true})
    }
    handleCancelModalAddCountry = () => {
        const form = this.formRefAddCountry.props.form
        form.resetFields()

        this.setState({visibleModalAddCountry: false})
    }
    handleCreateCountry = () => {
        const form = this.formRefAddCountry.props.form

        form.validateFields((err, values) => {
            if (err) {
                return
            }

            console.log('Received values of form: ', values)
            message.success('Add new country successfully')

            form.resetFields()
            this.setState({visibleModalAddCountry: false})
        })
    }
    saveFormAddCountryRef = (formRef) => {
        this.formRefAddCountry = formRef
    }

    // Modal change leader
    showModalChangeLeader = () => {
        this.setState({visibleModalChangeLeader: true})
    }
    handleCancelModalChangeLeader = () => {
        const form = this.formRefChangeLeader.props.form
        form.resetFields()

        this.setState({visibleModalChangeLeader: false})
    }
    handleChangeLeaderCountry = () => {
        const form = this.formRefChangeLeader.props.form
        form.validateFields((err, values) => {
            if (err) {
                return
            }

            console.log('Received values of form: ', values)
            message.success('Change leader of country successfully')

            form.resetFields()
            this.setState({visibleModalChangeLeader: false})
        })
    }
    saveFormChangeLeaderRef = (formRef) => {
        this.formRefChangeLeader = formRef
    }

    openChangeLeaderCountry (leader) {
        this.formRefChangeLeader.props.form.setFieldsValue({
            country: 'china',
            leader: 'John Nguyen',
        }, this.showModalChangeLeader())
    }

    handleRemoveCountry = () => {
        this.handleCancelModalChangeLeader()

        message.success('Remove country successfully')
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
            },
        ]

        const listLeadersEl = listLeaders.map((leader, index) => {
            return (
                <Col span={6} key={index} className="user-card">
                    <Card
                        hoverable
                        onClick={this.openChangeLeaderCountry.bind(this,
                            leader)}
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
                <Button className="pull-right" onClick={this.showModalAddCountry} type="primary">Add country</Button>
                <h1>Country Leaders</h1>
                <Row>
                    {listLeadersEl}
                </Row>

                <ModalAddCountry
                    wrappedComponentRef={this.saveFormAddCountryRef}
                    visible={this.state.visibleModalAddCountry}
                    onCancel={this.handleCancelModalAddCountry}
                    onCreate={this.handleCreateCountry}
                />

                <ModalChangeLeaderCountry
                    wrappedComponentRef={this.saveFormChangeLeaderRef}
                    visible={this.state.visibleModalChangeLeader}
                    onCancel={this.handleCancelModalChangeLeader}
                    onCreate={this.handleChangeLeaderCountry}
                    handleRemoveCountry={this.handleRemoveCountry}
                />
            </div>
        )
    }

    handleSubmitAddCountry (country) {
        console.log('handleSubmitAddCountry', country)

        this.setState({
            visibleModalAddCountry: false,
        })
    }
}
