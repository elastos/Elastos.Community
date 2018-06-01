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

    componentDidMount() {
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
            community.leader = config.data.mockDataAllLeaders[index];
            // Mock data -- end

            return (
                <Col span={3} key={index} className="user-card">
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

        const listCountriesEl = Object.keys(config.data.mappingCountryCodeToName).map((key, index) => {
            return (
                <Select.Option title={config.data.mappingCountryCodeToName[key]} key={index}
                               value={key}>{config.data.mappingCountryCodeToName[key]}</Select.Option>
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
                        <h2>
                            Community
                        </h2>
                    </div>
                    <div className="ebp-page">
                        <div className="ebp-page-content">
                            <Row>
                                <Col span={24}
                                     className="community-left-column">
                                    <div>
                                        <h3 className="without-padding">Country Organizers</h3>
                                        <Row>
                                            {listCommunitiesEl}
                                        </Row>
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
