import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Button, Card, Col, Row, Icon, message, Divider } from 'antd'
import ModalChangeLeaderCountry from '../../shared/ModalChangeLeaderCountry/Component'
import ModalAddSubCommunity from '../../shared/ModalAddSubCommunity/Component'
import _ from 'lodash'
import config from '@/config'
import { COMMUNITY_TYPE } from '@/constant'

import './style.scss'

export default class extends BaseComponent {
    state = {
        visibleModalChangeLeader: false,
        visibleModalAddSubCommunity: false,
        communityType: null,
        listLeadersByGroup: null,
        showAllSubCommunity: {
            [COMMUNITY_TYPE.STATE]: false,
            [COMMUNITY_TYPE.CITY]: false,
            [COMMUNITY_TYPE.REGION]: false,
            [COMMUNITY_TYPE.SCHOOL]: false,
        },
        showMoreMinimum: 4
    }

    componentWillMount() {
        console.log('componentWillMount');

        // Call API
        this.props.getCommunityDetail(this.props.communityId);
        this.loadSubCommunities()
    }
    
    loadSubCommunities() {
        this.props.getSubCommunities(this.props.communityId).then((communities) => {
            const listLeadersByGroup = {
                STATE: [],
                CITY: [],
                REGION: [],
                SCHOOL: [],
            }
            communities.forEach((community) => {
                // Mock data
                community.leader = config.data.mockDataAllLeaders[0];
                // Mock data -- end
                listLeadersByGroup[community.type] = listLeadersByGroup[community.type] || [];
                listLeadersByGroup[community.type].push(community);
            })

            this.setState({
                listLeadersByGroup
            })

            
            this.props.updateBreadcrumbRegion(communities)
        });
    }
    
    componentWillUpdate() {
        console.log('componentWillUpdate this.props.community_detail', this.props.community_detail);
        console.log('componentWillUpdate this.props.sub_communities', this.props.sub_communities);
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
        alert('TODO confirm spec when click button Remove country')
    }

    // Modal add community
    showModalAddSubCommunity = (type) => {
        this.formRefAddSubCommunity.props.form.setFieldsValue({
            country: this.props.country,
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
            
            this.callApiCreateSubCommunity(values)
            form.resetFields()
            this.setState({visibleModalAddSubCommunity: false})
        })
    }
    saveFormAddSubCommunityRef = (formRef) => {
        this.formRefAddSubCommunity = formRef
    }
    
    handleShowAllSubCommunity(type) {
        const showAllSubCommunity = this.state.showAllSubCommunity
        showAllSubCommunity[type] = !showAllSubCommunity[type]
        this.setState({
            showAllSubCommunity
        })
    }

    callApiCreateSubCommunity(formValues) {
        this.props.createSubCommunity({
            parentCommunityId: this.props.community_detail._id,
            type: this.state.communityType,
            leaderId: config.data.mockDataLeaderId,
            geolocation: formValues.name,
            name: formValues.name,
        }).then(() => {
            message.success('Add new sub community successfully')
            this.loadSubCommunities();
        }).catch(() => {
            message.success('Error while adding new sub community')
        })
    }

    ord_render () {
        return (
            <div className="list-leaders-of-a-country">
                {(this.props.community_detail && this.state.listLeadersByGroup) ? (
                    <Row>
                        <Col span={6}
                             className="user-card user-card--without-padding">
                            <Card
                                cover={<img alt="example" src={this.props.community_detail.leader.avatar}/>}
                            >
                                <Card.Meta
                                    title={this.props.community_detail.leader.name}
                                    description={this.props.community_detail.leader.country}
                                />
                            </Card>
                            <Button onClick={this.openChangeLeaderCountry.bind(this, this.props.community_detail.leader)} type="primary">Change leader</Button>
                        </Col>
                        <Col span={18} className="wrap-child-box-users">
                            <div className="child-box-users">
                                <Button className="pull-right" type="primary" onClick={this.showModalAddSubCommunity.bind(null, COMMUNITY_TYPE.STATE)}>
                                    Add state
                                </Button>
                                <h1>States / Provinces ({this.state.listLeadersByGroup[COMMUNITY_TYPE.STATE].length})</h1>
                                <Row>
                                    {this.state.listLeadersByGroup[COMMUNITY_TYPE.STATE].map((community, i) => {
                                        if (!this.state.showAllSubCommunity[COMMUNITY_TYPE.STATE] && i >= this.state.showMoreMinimum) {
                                            return;
                                        }

                                        return (
                                            <Col span={6}
                                                 key={i}
                                                 className="user-card">
                                                <Card
                                                    cover={<img src={community.leader.avatar}/>}
                                                >
                                                    <Card.Meta
                                                        title={community.leader.name}
                                                        description={community.name}
                                                    />
                                                </Card>
                                            </Col>
                                        );
                                    })}
                                </Row>
                                
                                { this.state.listLeadersByGroup[COMMUNITY_TYPE.STATE].length > this.state.showMoreMinimum && (
                                    <div onClick={this.handleShowAllSubCommunity.bind(this, COMMUNITY_TYPE.STATE)}>
                                        <Divider>
                                        { this.state.showAllSubCommunity[COMMUNITY_TYPE.STATE] && (
                                            <Button>Collapse <Icon type="up" /></Button>
                                        )}
                                        { !this.state.showAllSubCommunity[COMMUNITY_TYPE.STATE] && (
                                            <Button>Expanse <Icon type="down" /></Button>
                                        )}
                                        </Divider>
                                    </div>
                                )}
                            </div>
                            <div className="child-box-users">
                                <Button className="pull-right" type="primary" onClick={this.showModalAddSubCommunity.bind(null, COMMUNITY_TYPE.CITY)}>
                                    Add city
                                </Button>
                                <h1>Cities ({this.state.listLeadersByGroup[COMMUNITY_TYPE.CITY].length})</h1>
                                <Row>
                                    {this.state.listLeadersByGroup[COMMUNITY_TYPE.CITY].map((community, i) => {
                                        if (!this.state.showAllSubCommunity[COMMUNITY_TYPE.CITY] && i >= this.state.showMoreMinimum) {
                                            return;
                                        }

                                        return (
                                            <Col span={6}
                                                 key={i}
                                                 className="user-card">
                                                <Card
                                                    cover={<img src={community.leader.avatar}/>}
                                                >
                                                    <Card.Meta
                                                        title={community.leader.name}
                                                        description={community.name}
                                                    />
                                                </Card>
                                            </Col>
                                        );
                                    })}
                                </Row>
                                { this.state.listLeadersByGroup[COMMUNITY_TYPE.CITY].length > this.state.showMoreMinimum && (
                                    <div onClick={this.handleShowAllSubCommunity.bind(this, COMMUNITY_TYPE.CITY)}>
                                        <Divider>
                                            { this.state.showAllSubCommunity[COMMUNITY_TYPE.CITY] && (
                                                <Button>Collapse <Icon type="up" /></Button>
                                            )}
                                            { !this.state.showAllSubCommunity[COMMUNITY_TYPE.CITY] && (
                                                <Button>Expanse <Icon type="down" /></Button>
                                            )}
                                        </Divider>
                                    </div>
                                )}
                            </div>
                            <div className="child-box-users">
                                <Button className="pull-right" type="primary" onClick={this.showModalAddSubCommunity.bind(null, COMMUNITY_TYPE.REGION)}>
                                    Add region
                                </Button>
                                <h1>Region ({this.state.listLeadersByGroup[COMMUNITY_TYPE.REGION].length})</h1>
                                <Row>
                                    {this.state.listLeadersByGroup[COMMUNITY_TYPE.REGION].map((community, i) => {
                                        if (!this.state.showAllSubCommunity[COMMUNITY_TYPE.REGION] && i >= this.state.showMoreMinimum) {
                                            return;
                                        }

                                        return (
                                            <Col span={6}
                                                 key={i}
                                                 className="user-card">
                                                <Card
                                                    cover={<img src={community.leader.avatar}/>}
                                                >
                                                    <Card.Meta
                                                        title={community.leader.name}
                                                        description={community.name}
                                                    />
                                                </Card>
                                            </Col>
                                        );
                                    })}
                                </Row>
                                { this.state.listLeadersByGroup[COMMUNITY_TYPE.REGION].length > this.state.showMoreMinimum && (
                                    <div onClick={this.handleShowAllSubCommunity.bind(this, COMMUNITY_TYPE.REGION)}>
                                        <Divider>
                                            { this.state.showAllSubCommunity[COMMUNITY_TYPE.REGION] && (
                                                <Button>Collapse <Icon type="up" /></Button>
                                            )}
                                            { !this.state.showAllSubCommunity[COMMUNITY_TYPE.REGION] && (
                                                <Button>Expanse <Icon type="down" /></Button>
                                            )}
                                        </Divider>
                                    </div>
                                )}
                            </div>
                            <div className="child-box-users">
                                <Button className="pull-right" type="primary" onClick={this.showModalAddSubCommunity.bind(null, COMMUNITY_TYPE.SCHOOL)}>
                                    Add school
                                </Button>
                                <h1>Schools ({this.state.listLeadersByGroup[COMMUNITY_TYPE.SCHOOL].length})</h1>
                                <Row>
                                    {this.state.listLeadersByGroup[COMMUNITY_TYPE.SCHOOL].map((community, i) => {
                                        if (!this.state.showAllSubCommunity[COMMUNITY_TYPE.SCHOOL] && i >= this.state.showMoreMinimum) {
                                            return;
                                        }

                                        return (
                                            <Col span={6}
                                                 key={i}
                                                 className="user-card">
                                                <Card
                                                    cover={<img src={community.leader.avatar}/>}
                                                >
                                                    <Card.Meta
                                                        title={community.leader.name}
                                                        description={community.name}
                                                    />
                                                </Card>
                                            </Col>
                                        );
                                    })}
                                </Row>
                                { this.state.listLeadersByGroup[COMMUNITY_TYPE.SCHOOL].length > this.state.showMoreMinimum && (
                                    <div onClick={this.handleShowAllSubCommunity.bind(this, COMMUNITY_TYPE.SCHOOL)}>
                                        <Divider>
                                            { this.state.showAllSubCommunity[COMMUNITY_TYPE.SCHOOL] && (
                                                <Button>Collapse <Icon type="up" /></Button>
                                            )}
                                            { !this.state.showAllSubCommunity[COMMUNITY_TYPE.SCHOOL] && (
                                                <Button>Expanse <Icon type="down" /></Button>
                                            )}
                                        </Divider>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                ) : (<div>Loading</div>)}
    
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
