import React from 'react'
import { Link } from 'react-router-dom'
import AdminPage from '../../BaseAdmin'
import { Button, Card, Col, Select, Row, Icon, message, Divider, Breadcrumb } from 'antd'
import ModalChangeLeaderCountry from '../../shared/ModalChangeLeaderCountry/Component'
import ModalAddSubCommunity from '../../shared/ModalAddSubCommunity/Component'
import ModalUpdateSubCommunity from '../../shared/ModalUpdateSubCommunity/Component'
import Navigator from '../../shared/Navigator/Component'
import config from '@/config'
import { COMMUNITY_TYPE } from '@/constant'

import '../style.scss'

export default class extends AdminPage {
    state = {
        visibleModalChangeLeader: false,
        visibleModalAddSubCommunity: false,
        visibleModalUpdateSubCommunity: false,
        communityType: null,
        listLeadersByGroup: null,
        showAllSubCommunity: {
            [COMMUNITY_TYPE.STATE]: false,
            [COMMUNITY_TYPE.CITY]: false,
            [COMMUNITY_TYPE.REGION]: false,
            [COMMUNITY_TYPE.SCHOOL]: false,
        },
        showMoreMinimum: 4,
        breadcrumbRegions: [],
        community: null,
        editedSubCommunity: null
    }

    componentWillMount() {
        this.loadCommunityDetail();
        this.loadSubCommunities();
    }
    
    loadCommunityDetail() {
        this.props.getCommunityDetail(this.props.match.params['community']).then((community) => {
            // Mock data leader
            community.leader = config.data.mockDataAllLeaders[0];
            this.setState({
                community
            })
        });
    }
    
    loadSubCommunities() {
        this.props.getSubCommunities(this.props.match.params['community']).then((subCommunities) => {
            // Check which communities we will use to render
            const listLeadersByGroup = this.getListLeadersByGroup(subCommunities, this.props.match.params['region']);
            const breadcrumbRegions = this.getBreadcrumbRegions(subCommunities);
        
            // Update to state
            this.setState({
                subCommunities,
                listLeadersByGroup,
                breadcrumbRegions,
            })
        })
    }
    
    getBreadcrumbRegions(subCommunities) {
        // Filter communities to get breadcrumb regions
        let breadcrumbRegions = [];
        subCommunities.forEach((community) => {
            breadcrumbRegions.push({
                name: community.name,
            })
        })
    
        breadcrumbRegions = _.sortBy(_.uniqBy(breadcrumbRegions, 'name'), 'name');
        
        return breadcrumbRegions;
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

            this.props.updateCommunity({
                ...this.state.community,
                leaderId: config.data.mockDataLeaderId, // Mock data
            }).then(() => {
                form.resetFields()
                this.setState({visibleModalChangeLeader: false})
                message.success('Change leader of country successfully xxx')
                
                this.loadCommunityDetail()
            })
        })
    }
    saveFormChangeLeaderRef = (formRef) => {
        this.formRefChangeLeader = formRef
    }
    
    openChangeLeaderCountry (leader) {
        this.formRefChangeLeader.props.form.setFieldsValue({
            geolocation: this.props.match.params['country'],
            leader: config.data.mockDataAllLeaders[0].id,
        }, this.showModalChangeLeader())
    }
    
    handleRemoveCountry = () => {
        alert('TODO confirm spec when click button Remove country')
    }

    // Modal add community
    showModalAddSubCommunity = (type) => {
        this.formRefAddSubCommunity.props.form.setFieldsValue({
            country: this.props.match.params['country'],
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
    handleAddSubCommunity = () => {
        const form = this.formRefAddSubCommunity.props.form
        
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            
            this.proxyCreateSubCommunity(values)
            form.resetFields()
            this.setState({visibleModalAddSubCommunity: false})
        })
    }
    saveFormAddSubCommunityRef = (formRef) => {
        this.formRefAddSubCommunity = formRef
    }
    
    // Modal update community
    showModalUpdateSubCommunity = (community) => {
        this.setState({
            editedSubCommunity: community
        })

        this.formRefUpdateSubCommunity.props.form.setFieldsValue({
            country: this.props.match.params['country'],
            name: community.name,
            leader: config.data.mockDataAllLeaders[0].id,
        }, () => {
            this.setState({
                visibleModalUpdateSubCommunity: true,
                communityType: community.type
            })
        })
    }
    handleCancelModalUpdateSubCommunity = () => {
        const form = this.formRefUpdateSubCommunity.props.form
        form.resetFields()
        
        this.setState({visibleModalUpdateSubCommunity: false})
    }
    handleUpdateSubCommunity = () => {
        const form = this.formRefUpdateSubCommunity.props.form
        
        form.validateFields((err, values) => {
            if (err) {
                return
            }

            this.props.updateCommunity({
                ...this.state.editedSubCommunity,
                name: values['name'],
                leaderId: config.data.mockDataLeaderId
            }).then(() => {
                form.resetFields()
                this.setState({visibleModalUpdateSubCommunity: false})
                
                message.success('Update community successfully')
                
                this.loadSubCommunities()
            })
        })
    }
    saveFormUpdateSubCommunityRef = (formRef) => {
        this.formRefUpdateSubCommunity = formRef
    }
    
    handleShowAllSubCommunity(type) {
        const showAllSubCommunity = this.state.showAllSubCommunity
        showAllSubCommunity[type] = !showAllSubCommunity[type]
        this.setState({
            showAllSubCommunity
        })
    }
    
    proxyCreateSubCommunity(formValues) {
        this.props.createSubCommunity({
            parentCommunityId: this.props.match.params['community'],
            type: this.state.communityType,
            leaderId: config.data.mockDataLeaderId,
            // TODO check correct value of geolocation
            geolocation: this.props.match.params['country'],
            name: formValues.name,
        }).then(() => {
            message.success('Add new sub community successfully')
            this.loadSubCommunities();
        }).catch(() => {
            message.error('Error while adding new sub community')
        })
    }

    handleChangeCountry(geolocation) {
        if (geolocation) {
            this.props.history.push(`/admin/community/country/${geolocation}`)
        } else {
            this.props.history.push('/admin/community')
        }
    }
    
    getListLeadersByGroup(subCommunities, filterRegionName) {
        let renderCommunities;
        
        if (filterRegionName) {
            renderCommunities = subCommunities.filter((community) => {
                return community.name === filterRegionName
            })
        } else {
            renderCommunities = subCommunities
        }
    
        const listLeadersByGroup = {
            STATE: [],
            CITY: [],
            REGION: [],
            SCHOOL: [],
        }
    
        renderCommunities.forEach((community) => {
            // Mock data
            community.leader = config.data.mockDataAllLeaders[0];
            // Mock data -- end
            listLeadersByGroup[community.type] = listLeadersByGroup[community.type] || [];
            listLeadersByGroup[community.type].push(community);
        })
        
        return listLeadersByGroup;
    }
    
    handleChangeRegion(region) {
        if (region) {
            const listLeadersByGroup = this.getListLeadersByGroup(this.state.subCommunities, region);
            this.setState({
                listLeadersByGroup
            })
            this.props.history.push(`/admin/community/${this.props.match.params['community']}/country/${this.props.match.params['country']}/region/${region}`);
        } else {
            this.props.history.push(`/admin/community/${this.props.match.params['community']}/country/${this.props.match.params['country']}`);
        }
    }

    ord_renderContent () {
        const listCountriesEl = config.data.breadcrumbCountries.map((country, index) => {
            return (
                <Select.Option title={country.name} key={index}
                               value={country.geolocation}>{country.name}</Select.Option>
            )
        })

        const menuCountriesEl = (
            <Select
                allowClear
                value={this.props.match.params['country'] || undefined}
                showSearch
                style={{width: 160}}
                placeholder="Select a country"
                optionFilterProp="children"
                onChange={this.handleChangeCountry.bind(this)}
            >
                {listCountriesEl}
            </Select>
        )
    
        const listRegionsEl = this.state.breadcrumbRegions.map((region, index) => {
            return (
                <Select.Option key={index} title={region.name} value={region.name}>{region.name}</Select.Option>
            )
        })

        const menuListRegionsEl = (
            <Select
                allowClear
                value={this.props.match.params['region']}
                showSearch
                style={{width: 160}}
                placeholder="Select a region"
                optionFilterProp="children"
                onChange={this.handleChangeRegion.bind(this)}
            >
                {listRegionsEl}
            </Select>
        )

        return (
            <div className="p_admin_index ebp-wrap">
                <div className="d_box">
                    <div className="p_admin_breadcrumb">
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">
                                <Icon type="home"/>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Admin</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/admin/community">Community</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {menuCountriesEl}
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {menuListRegionsEl}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="p_admin_content">
                        <Row>
                            <Col span={18}
                                 className="admin-left-column wrap-box-user">
                                <div>
                                    <div className="list-leaders-of-a-country">
                                        {(this.state.community && this.state.listLeadersByGroup) ? (
                                            <Row>
                                                <Col span={6}
                                                     className="user-card user-card--without-padding">
                                                    <h1 className="without-padding overflow-ellipsis" title={this.state.community.name + ' Leader'}>{this.state.community.name} Leader</h1>
                                                    <Card
                                                        cover={<img alt="example" src={this.state.community.leader.avatar}/>}
                                                    >
                                                        <Card.Meta
                                                            title={this.state.community.leader.name}
                                                            description={this.state.community.leader.country}
                                                        />
                                                    </Card>
                                                    <Button onClick={this.openChangeLeaderCountry.bind(this, this.state.community.leader)} type="primary">Change leader</Button>
                                                </Col>
                                                <Col span={18} className="wrap-child-box-users">
                                                    <div className="child-box-users">
                                                        <Button className="pull-right" type="primary" onClick={this.showModalAddSubCommunity.bind(null, COMMUNITY_TYPE.STATE)}>
                                                            Add state
                                                        </Button>
                                                        <h2 className="without-padding">States / Provinces ({this.state.listLeadersByGroup[COMMUNITY_TYPE.STATE].length})</h2>
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
                                                                            hoverable
                                                                            onClick={this.showModalUpdateSubCommunity.bind(null, community)}
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
                                                        <h2 className="without-padding">Cities ({this.state.listLeadersByGroup[COMMUNITY_TYPE.CITY].length})</h2>
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
                                                        <h2 className="without-padding">Region ({this.state.listLeadersByGroup[COMMUNITY_TYPE.REGION].length})</h2>
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
                                                        <h2 className="without-padding">Schools ({this.state.listLeadersByGroup[COMMUNITY_TYPE.SCHOOL].length})</h2>
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
                                            onCreate={this.handleAddSubCommunity}
                                        />
                                        <ModalUpdateSubCommunity
                                            communityType={this.state.communityType}
                                            wrappedComponentRef={this.saveFormUpdateSubCommunityRef}
                                            visible={this.state.visibleModalUpdateSubCommunity}
                                            onCancel={this.handleCancelModalUpdateSubCommunity}
                                            onCreate={this.handleUpdateSubCommunity}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col span={6}
                                 className="admin-right-column wrap-box-navigator">
                                <Navigator selectedItem={'community'}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}
