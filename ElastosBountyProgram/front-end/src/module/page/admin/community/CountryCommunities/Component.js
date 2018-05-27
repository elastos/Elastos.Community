import React from 'react'
import { Link } from 'react-router-dom'
import BaseComponent from '@/model/BaseComponent'
import { Button, Card, Col, message, Row } from 'antd'

import ModalAddCountry from '../../shared/ModalAddCountry/Component'
import config from '@/config'

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

            form.resetFields()
            this.setState({visibleModalAddCountry: false})
    
            this.props.addCountry(values);
        })
    }
    saveFormAddCountryRef = (formRef) => {
        this.formRefAddCountry = formRef
    }

    ord_render () {
        const listCommunities = this.props.communities || [];

        const listCommunitiesEl = listCommunities.map((community, index) => {
            // Mock data
            community.leader = config.data.mockDataAllLeaders[0];
            // Mock data -- end

            return (
                <Col span={6} key={index} className="user-card">
                    <Link to={'/admin/community/' + community._id  + '/country/' + community.leader.countryCode}>
                        <Card
                            cover={<img alt="example" src={community.leader.avatar}/>}
                        >
                            <Card.Meta
                                title={community.leader.name}
                                description={community.leader.country}
                            />
                        </Card>
                    </Link>
                </Col>
            )
        })
        return (
            <div>
                <Button className="pull-right" onClick={this.showModalAddCountry} type="primary">Add country</Button>
                <h1>Country Leaders</h1>
                <Row>
                    {listCommunitiesEl}
                </Row>

                <ModalAddCountry
                    wrappedComponentRef={this.saveFormAddCountryRef}
                    visible={this.state.visibleModalAddCountry}
                    onCancel={this.handleCancelModalAddCountry}
                    onCreate={this.handleCreateCountry}
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
