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
                this.convertCommunitiesLeaderIdsToLeaderObjects(communities).then((communities) => {
                    this.setState({
                        communities
                    })
                })
            })
        } else {
            this.props.getAllCountryCommunity().then((communities) => {
                this.convertCommunitiesLeaderIdsToLeaderObjects(communities).then((communities) => {
                    console.log('communities', communities)
                    this.setState({
                        communities
                    })
                })
            })
        }
    }
    
    mockAvatarToUsers(users) {
        users.forEach((user) => {
            user.profile.avatar = config.data.mockAvatarUrl
        })
        
        return users
    }
    
    // API only return list leader ids [leaderIds], so we need convert it to array object leader [leaders]
    convertCommunitiesLeaderIdsToLeaderObjects(communities) {
        return new Promise((resolve, reject) => {
            let userIds = []
            communities.forEach((community) => {
                userIds.push(...community.leaderIds)
            })
            userIds = _.uniq(userIds)
            
            if (!userIds.length) {
                return resolve([])
            }
            
            this.props.getUserByIds(userIds).then((users) => {
                users = this.mockAvatarToUsers(users) // Mock avatar url
                const mappingIdToUserList = _.keyBy(users, '_id');
                communities.forEach((community) => {
                    community.leaders = community.leaders || [];
                    community.leaderIds.forEach((leaderId) => {
                        if (mappingIdToUserList[leaderId]) {
                            community.leaders.push(mappingIdToUserList[leaderId])
                        }
                    })
                })
                
                resolve(communities)
            })
        })
    }
    
    handleChangeCountry(geolocation) {
        if (geolocation) {
            this.props.getSpecificCountryCommunities(geolocation).then((communities) => {
                this.convertCommunitiesLeaderIdsToLeaderObjects(communities).then((communities) => {
                    this.setState({
                        communities
                    })
    
                    this.props.history.push(`/community/country/${geolocation}`)
                })
            })
        } else {
            this.props.getAllCountryCommunity().then((communities) => {
                this.convertCommunitiesLeaderIdsToLeaderObjects(communities).then((communities) => {
                    this.setState({
                        communities
                    })
    
                    this.props.history.push('/community')
                })
            })
        }
    }

    ord_renderContent () {
        const listCommunitiesEl = this.state.communities.map((community, index) => {
            return (
                <div key={index}>
                    {community.leaders.map((leader) => {
                        return (
                            <Col span={3} key={index} className="user-card">
                                <Link to={'/community/' + community._id  + '/country/' + community.geolocation}>
                                    <Card
                                        cover={<img alt="example" src={leader.profile.avatar}/>}
                                    >
                                        <Card.Meta
                                            title={leader.profile.firstName + ' ' + leader.profile.lastName}
                                            description={leader.country}
                                        />
                                    </Card>
                                </Link>
                            </Col>
                        )
                    })}
                </div>
            )
        })

        // const listCountriesEl = this.state.communities.map((country, index) => {
        //     return (
        //         <Select.Option title={country.name} key={index}
        //                        value={country.geolocation}>{country.name}</Select.Option>
        //     )
        // })

        // Dropdown will have errors if two communities has same geolocation key
        // At the moment, I display all countries
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
