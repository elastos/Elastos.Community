import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Button, Card, Col, Row, message } from 'antd'
import ModalChangeLeaderCountry from '../../shared/ModalChangeLeaderCountry/Component'
import ModalAddSubCommunity from '../../shared/ModalAddSubCommunity/Component'
import _ from 'lodash'
import config from '@/config'

import './style.scss'

export default class extends BaseComponent {
    state = {
        visibleModalChangeLeader: false,
        visibleModalAddSubCommunity: false,
        communityType: null,
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
            leader: 'David',
        }, this.showModalChangeLeader())
    }
    
    handleRemoveCountry = () => {
        this.handleCancelModalChangeLeader()
        
        message.success('Remove country successfully')
    }

    // Modal add community
    showModalAddSubCommunity = (type) => {
        this.formRefAddSubCommunity.props.form.setFieldsValue({
            country: 'china',
        }, () => {
            this.setState({
                visibleModalAddSubCommunity: true,
                communityType: type
            })
        })
    }
    handleCancelModalAddSubCommunity = () => {
        const form = this.formRefAddSubCommunity.props.form
        form.resetFields()
        
        this.setState({visibleModalAddSubCommunity: false})
    }
    handleCreateSubCommunity = () => {
        const form = this.formRefAddSubCommunity.props.form
        
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            
            console.log('Received values of form: ', values)
            message.success('Add new sub community successfully')
            
            form.resetFields()
            this.setState({visibleModalAddSubCommunity: false})
        })
    }
    saveFormAddSubCommunityRef = (formRef) => {
        this.formRefAddSubCommunity = formRef
    }

    ord_render () {
        let leaderInfo;
        if (this.props.leader) {
            leaderInfo = _.find(config.data.mockDataAllLeaders, {id: parseInt(this.props.leader)})
        } else {
            // Mock data leader of region
            leaderInfo = _.find(config.data.mockDataAllLeaders, {id: 3})
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
                    <Col span={6}
                         className="user-card user-card--without-padding">
                        {leaderEl}
                        <Button onClick={this.openChangeLeaderCountry.bind(this, leaderInfo)} type="primary">Change leader</Button>
                    </Col>
                    <Col span={18} className="wrap-child-box-users">
                        <div className="child-box-users">
                            <Button className="pull-right" type="primary" onClick={this.showModalAddSubCommunity.bind(null, 'STATE')}>
                                Add state
                            </Button>
                            <h1>States / Provinces (18)</h1>
                            <Row>
                                TODO list user
                            </Row>
                        </div>
                        <div className="child-box-users">
                            <Button className="pull-right" type="primary" onClick={this.showModalAddSubCommunity.bind(null, 'CITY')}>
                                Add city
                            </Button>
                            <h1>Cities (40)</h1>
                            <Row>
                                TODO list user
                            </Row>
                        </div>
                        <div className="child-box-users">
                            <Button className="pull-right" type="primary" onClick={this.showModalAddSubCommunity.bind(null, 'REGION')}>
                                Add region
                            </Button>
                            <h1>Region (0)</h1>
                            <Row>
                                TODO list user
                            </Row>
                        </div>
                        <div className="child-box-users">
                            <Button className="pull-right" type="primary" onClick={this.showModalAddSubCommunity.bind(null, 'SCHOOL')}>
                                Add school
                            </Button>
                            <h1>Schools (0)</h1>
                            <Row>
                                TODO list user
                            </Row>
                        </div>
                    </Col>
                </Row>
    
                <ModalChangeLeaderCountry
                    wrappedComponentRef={this.saveFormChangeLeaderRef}
                    visible={this.state.visibleModalChangeLeader}
                    onCancel={this.handleCancelModalChangeLeader}
                    onCreate={this.handleChangeLeaderCountry}
                    handleRemoveCountry={this.handleRemoveCountry}
                />
    
                <ModalAddSubCommunity
                    communityType={this.state.communityType}
                    wrappedComponentRef={this.saveFormAddSubCommunityRef}
                    visible={this.state.visibleModalAddSubCommunity}
                    onCancel={this.handleCancelModalAddSubCommunity}
                    onCreate={this.handleCreateSubCommunity}
                />
            </div>
        )
    }
}
