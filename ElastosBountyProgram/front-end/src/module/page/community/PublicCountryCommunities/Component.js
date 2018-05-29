import React from 'react'
import { Link } from 'react-router-dom'
import StandardPage from '../../StandardPage';
import { Table, Card, Select, Col, Row, Breadcrumb, Icon, Button } from 'antd'
import config from '@/config'
import Footer from '@/module/layout/Footer/Container'
import ListTasks from '../shared/ListTasks/Component'
import ListEvents from '../shared/ListEvents/Component'
import '../style.scss'

export default class extends StandardPage {
    state = {
        communities: [],
    }

    componentWillMount() {
        this.loadCommunities();
    }
    
    loadCommunities() {
        const currentCountry = this.props.match.params['country'];
        if (currentCountry) {
            this.props.getSpecificCountryCommunities(currentCountry).then((communities) => {
                this.setState({
                    communities
                })
            })
        } else {
            this.props.getAllCountryCommunity().then((communities) => {
                this.setState({
                    communities
                })
            })
        }
    }
    
    handleChangeCountry(geolocation) {
        if (geolocation) {
            this.props.getSpecificCountryCommunities(geolocation).then((communities) => {
                this.setState({
                    communities
                })
                
                this.props.history.push(`/community/country/${geolocation}`)
            })
        } else {
            this.props.getAllCountryCommunity().then((communities) => {
                this.setState({
                    communities
                })
                
                this.props.history.push('/community')
            })
        }
    }

    ord_renderContent () {
        const listCommunitiesEl = this.state.communities.map((community, index) => {
            // Mock data
            community.leader = config.data.mockDataAllLeaders[0];
            // Mock data -- end

            return (
                <Col span={6} key={index} className="user-card">
                    <Link to={'/community/' + community._id  + '/country/' + community.leader.countryCode}>
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
                                     className="community-left-column">
                                    <div>
                                        <h2 className="without-padding">Country Leaders</h2>
                                        <Row>
                                            {listCommunitiesEl}
                                        </Row>
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
