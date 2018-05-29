import React from 'react'
import { Link } from 'react-router-dom'
import StandardPage from '../../StandardPage'
import { Button, Card, Col, Select, Row, Icon, message, Divider, Breadcrumb } from 'antd'
import config from '@/config'
import { COMMUNITY_TYPE } from '@/constant'
import Footer from '@/module/layout/Footer/Container'
import ListTasks from '../shared/ListTasks/Component'
import ListEvents from '../shared/ListEvents/Component'

import '../style.scss'

export default class extends StandardPage {
    state = {
        breadcrumbRegions: [],
        community: null,
        subCommunities: [],
        regionCommunities: [],
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
            const breadcrumbRegions = this.getBreadcrumbRegions(subCommunities);
            const regionCommunities = this.getRegionCommunities(subCommunities, this.props.match.params['region']);
            // Update to state
            this.setState({
                subCommunities,
                regionCommunities,
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

    handleChangeCountry(geolocation) {
        if (geolocation) {
            this.props.history.push(`/community/country/${geolocation}`)
        } else {
            this.props.history.push('/community')
        }
    }
    
    getRegionCommunities(subCommunities, filterRegionName) {
        let regionCommunities;
        
        if (filterRegionName) {
            regionCommunities = subCommunities.filter((community) => {
                return community.name === filterRegionName
            })
        } else {
            regionCommunities = subCommunities
        }
    
        regionCommunities.forEach((community) => {
            // Mock data
            community.leader = config.data.mockDataAllLeaders[0];
            // Mock data -- end
        })
        
        return regionCommunities;
    }
    
    handleChangeRegion(region) {
        if (region) {
            const regionCommunities = this.getRegionCommunities(this.state.subCommunities, region);
            this.setState({
                regionCommunities
            })
            this.props.history.push(`/community/${this.props.match.params['community']}/country/${this.props.match.params['country']}/region/${region}`);
        } else {
            this.props.history.push(`/community/${this.props.match.params['community']}/country/${this.props.match.params['country']}`);
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
                style={{width: 200}}
                placeholder="Select a region / place"
                optionFilterProp="children"
                onChange={this.handleChangeRegion.bind(this)}
            >
                {listRegionsEl}
            </Select>
        )

        return (
            <div className="p_Community">
                <div className="ebp-header-divider"></div>
                <div className="ebp-page">
                    <div className="ebp-page-breadcrumb">
                        <Row>
                            <Col span={24}>
                                <Breadcrumb>
                                    <Breadcrumb.Item href="/">
                                        <Icon type="home"/>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>Community</Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        <Link to="/community">Global</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        {menuCountriesEl}
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        {menuListRegionsEl}
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                        </Row>
                    </div>
                    <div className="ebp-page-title">
                        <h1>
                            Community
                        </h1>
                    </div>
                    <div className="ebp-page">
                        <div className="ebp-page-content">
                            <Row>
                                <Col span={18}
                                     className="community-left-column community-left-column--text-center">
                                    <div>
                                        <Row>
                                            <Col span={8}>
                                                <h2 className="without-padding overflow-ellipsis" title="Country Leader">Country Leader</h2>
                                            </Col>
                                            <Col span={16}>
                                                <h2 className="without-padding overflow-ellipsis" title="Local Leaders">Local Leaders</h2>
                                            </Col>
                                        </Row>
                                        {(this.state.community && this.state.subCommunities) && (
                                            <Row>
                                                <Col span={8}>
                                                    <div className="user-card">
                                                        <Row>
                                                            <Col span={24}>
                                                                <Card
                                                                    cover={<img alt="example" src={this.state.community.leader.avatar}/>}
                                                                >
                                                                    <Card.Meta
                                                                        title={this.state.community.leader.name}
                                                                        description={this.state.community.leader.country + ' - Country leader'}
                                                                    />
                                                                </Card>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                                <Col span={16} className="wrap-child-box-users">
                                                    <Row>
                                                        {this.state.regionCommunities.map((community, index) => {
                                                            return (<Col key={index} span={12}
                                                                         className="user-card">
                                                                <Card
                                                                    cover={<img src={community.leader.avatar}/>}
                                                                >
                                                                    <Card.Meta
                                                                        title={community.leader.name}
                                                                        description={community.name}
                                                                    />
                                                                </Card>
                                                            </Col>)
                                                        })}
                                                    </Row>
                                                </Col>
                                            </Row>
                                        )}
                                    </div>
                                </Col>
                                <Col span={6}
                                     className="community-right-column">
                                    <div>
                                        <h2 className="without-padding">Members List</h2>
                                        <div className="list-members"></div>
                                        <Button>See more</Button>
                                    </div>
                                </Col>
                            </Row>
    
                            <div className="ebp-page-title">
                                <h2>Events</h2>
                            </div>
                            <div className="wrap-events">
                                <ListEvents />
                            </div>
                            <div className="ebp-page-title">
                                <h2>Tasks</h2>
                            </div>
                            <div className="wrap-tasks">
                                <ListTasks />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
