import React from 'react'
import { Link } from 'react-router-dom'
import StandardPage from '../../StandardPage'
import { Button, Card, Col, Select, Row, Icon, message, Divider, Breadcrumb, Tabs, List, Avatar } from 'antd'
import config from '@/config'
import { COMMUNITY_TYPE } from '@/constant'
import Footer from '@/module/layout/Footer/Container'
import ListTasks from '../shared/ListTasks/Component'
import ListEvents from '../shared/ListEvents/Component'

const TabPane = Tabs.TabPane
import '../style.scss'

export default class extends StandardPage {
    state = {
        breadcrumbRegions: [],
        community: null,
        communityMembers: [],
        subCommunities: [],
        listSubCommunitiesByType: {
            STATE: [],
            CITY: [],
            REGION: [],
            SCHOOL: [],
        },
    }

    componentDidMount() {
        this.loadCommunityDetail()
        this.loadSubCommunities()
        this.loadCommunityMembers()
    }

    loadCommunityMembers() {
        this.props.getCommunityMembers(this.props.match.params['community']).then((communityMembers) => {
            communityMembers = this.mockAvatarToUsers(communityMembers)
            communityMembers.push(communityMembers[0])
            communityMembers.push(communityMembers[0])
            communityMembers.push(communityMembers[0])
            communityMembers.push(communityMembers[0])
            communityMembers.push(communityMembers[0])
            communityMembers.push(communityMembers[0])
            communityMembers.push(communityMembers[0])
            communityMembers.push(communityMembers[0])
            communityMembers.push(communityMembers[0])
            communityMembers.push(communityMembers[0])

            this.setState({
                communityMembers
            })
        });
    }

    loadCommunityDetail() {
        this.props.getCommunityDetail(this.props.match.params['community']).then((community) => {
            this.convertCommunityLeaderIdsToLeaderObjects(community).then((community) => {
                this.setState({
                    community
                })
            })
        });
    }

    loadSubCommunities() {
        this.props.getSubCommunities(this.props.match.params['community']).then((subCommunities) => {
            this.convertCommunitiesLeaderIdsToLeaderObjects(subCommunities).then((subCommunities) => {
                // Check which communities we will use to render
                const breadcrumbRegions = this.getBreadcrumbRegions(subCommunities);
                const listSubCommunitiesByType = this.getListSubCommunitiesByType(subCommunities, this.props.match.params['region']);
                // Update to state
                this.setState({
                    subCommunities,
                    listSubCommunitiesByType,
                    breadcrumbRegions,
                })
            })
        })
    }
    
    mockAvatarToUsers(users) {
        users.forEach((user) => {
            user.profile.avatar = config.data.mockAvatarUrl
        })
        
        return users
    }
    
    // API only return list leader ids [leaderIds], so we need convert it to array object leader [leaders]
    convertCommunityLeaderIdsToLeaderObjects(community) {
        return new Promise((resolve, reject) => {
            const userIds = _.uniq(community.leaderIds)
            if (!userIds.length) {
                return resolve([])
            }
            this.props.getUserByIds(userIds).then((users) => {
                users = this.mockAvatarToUsers(users) // Mock avatar url
                const mappingIdToUserList = _.keyBy(users, '_id')
                community.leaders = community.leaders || []
                community.leaderIds.forEach((leaderId) => {
                    if (mappingIdToUserList[leaderId]) {
                        community.leaders.push(mappingIdToUserList[leaderId])
                    }
                })
                
                resolve(community)
            })
        })
    }
    
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

    getListSubCommunitiesByType(subCommunities, filterRegionName) {
        let renderCommunities;

        if (filterRegionName) {
            renderCommunities = subCommunities.filter((community) => {
                return community.name === filterRegionName
            })
        } else {
            renderCommunities = subCommunities
        }

        const listSubCommunitiesByType = {
            STATE: [],
            CITY: [],
            REGION: [],
            SCHOOL: [],
        }

        renderCommunities.forEach((community) => {
            listSubCommunitiesByType[community.type] = listSubCommunitiesByType[community.type] || [];
            listSubCommunitiesByType[community.type].push(community);
        })

        return listSubCommunitiesByType;
    }

    handleChangeRegion(region) {
        if (region) {
            const listSubCommunitiesByType = this.getListSubCommunitiesByType(this.state.subCommunities, region);
            this.setState({
                listSubCommunitiesByType
            })
            this.props.history.push(`/community/${this.props.match.params['community']}/country/${this.props.match.params['country']}/region/${region}`);
        } else {
            this.props.history.push(`/community/${this.props.match.params['community']}/country/${this.props.match.params['country']}`);
        }
    }
    
    joinToCommunity() {
    
    }

    ord_renderContent () {
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
                    <div className="ebp-page">
                        <div className="ebp-page-content">
                            <Row>
                                <Col span={18}
                                     className="community-left-column">
                                    <div>
                                        {(this.state.community && this.state.subCommunities) && (
                                            <Row>
                                                <Col span={24}>
                                                    <h2 className="without-padding overflow-ellipsis">{config.data.mappingCountryCodeToName[this.props.match.params['country']] + ' Organizers'}</h2>
                                                </Col>
                                                <Col span={24}>
                                                    <Row>
                                                        {this.state.community.leaders.map((leader, index) => {
                                                            return (
                                                                <Col span={4} key={index} className="user-card">
                                                                    <Card
                                                                        cover={<img alt="example" src={leader.profile.avatar}/>}
                                                                    >
                                                                        <Card.Meta
                                                                            title={leader.profile.firstName + ' ' + leader.profile.lastName}
                                                                        />
                                                                    </Card>
                                                                </Col>
                                                            )
                                                        })}
                                                    </Row>
                                                </Col>
                                                <Col span={24}>
                                                    <h2 className="without-padding overflow-ellipsis">Sub-Communities</h2>
                                                </Col>
                                                <Col span={24}>
                                                    <Tabs type="card">
                                                        <TabPane tab="State" key="1">
                                                            <Row>
                                                                {this.state.listSubCommunitiesByType['STATE'].map((community, index) => {
                                                                    return (
                                                                        <Col span={4}
                                                                             key={index}
                                                                             className="user-card">
                                                                            {community.leaders.map((leader, index) => {
                                                                                return (
                                                                                    <Card
                                                                                        key={index}
                                                                                        cover={<img src={leader.profile.avatar}/>}
                                                                                    >
                                                                                        <Card.Meta
                                                                                            title={leader.profile.firstName + ' ' + leader.profile.lastName}
                                                                                            description={community.name}
                                                                                        />
                                                                                    </Card>
                                                                                )
                                                                            })}
                                                                        </Col>
                                                                    );
                                                                })}
                                                            </Row>
                                                        </TabPane>
                                                        <TabPane tab="City" key="2">
                                                            <Row>
                                                                {this.state.listSubCommunitiesByType['CITY'].map((community, index) => {
                                                                    return (
                                                                        <Col span={4}
                                                                             key={index}
                                                                             className="user-card">
                                                                            {community.leaders.map((leader, index) => {
                                                                                return (
                                                                                    <Card
                                                                                        key={index}
                                                                                        cover={<img src={leader.profile.avatar}/>}
                                                                                    >
                                                                                        <Card.Meta
                                                                                            title={leader.profile.firstName + ' ' + leader.profile.lastName}
                                                                                            description={community.name}
                                                                                        />
                                                                                    </Card>
                                                                                )
                                                                            })}
                                                                        </Col>
                                                                    );
                                                                })}
                                                            </Row>
                                                        </TabPane>
                                                        <TabPane tab="Region" key="3">
                                                            <Row>
                                                                {this.state.listSubCommunitiesByType['REGION'].map((community, index) => {
                                                                    return (
                                                                        <Col span={4}
                                                                             key={index}
                                                                             className="user-card">
                                                                            {community.leaders.map((leader, index) => {
                                                                                return (
                                                                                    <Card
                                                                                        key={index}
                                                                                        cover={<img src={leader.profile.avatar}/>}
                                                                                    >
                                                                                        <Card.Meta
                                                                                            title={leader.profile.firstName + ' ' + leader.profile.lastName}
                                                                                            description={community.name}
                                                                                        />
                                                                                    </Card>
                                                                                )
                                                                            })}
                                                                        </Col>
                                                                    );
                                                                })}
                                                            </Row>
                                                        </TabPane>
                                                        <TabPane tab="School" key="4">
                                                            <Row>
                                                                {this.state.listSubCommunitiesByType['SCHOOL'].map((community, index) => {
                                                                    return (
                                                                        <Col span={4}
                                                                             key={index}
                                                                             className="user-card">
                                                                            {community.leaders.map((leader, index) => {
                                                                                return (
                                                                                    <Card
                                                                                        key={index}
                                                                                        cover={<img src={leader.profile.avatar}/>}
                                                                                    >
                                                                                        <Card.Meta
                                                                                            title={leader.profile.firstName + ' ' + leader.profile.lastName}
                                                                                            description={community.name}
                                                                                        />
                                                                                    </Card>
                                                                                )
                                                                            })}
                                                                        </Col>
                                                                    );
                                                                })}
                                                            </Row>
                                                        </TabPane>
                                                    </Tabs>
                                                </Col>
                                            </Row>
                                        )}
                                    </div>
                                </Col>
                                <Col span={6}
                                     className="community-right-column">
                                    <div>
                                        <h2 className="without-padding">Members List</h2>
                                        <div className="list-members">
                                            <List
                                                dataSource={this.state.communityMembers}
                                                renderItem={item => (
                                                    <List.Item>
                                                        <table>
                                                            <tbody>
                                                            <tr>
                                                                <td>
                                                                    <Avatar size="large" icon="user" src={item.profile.avatar}/>
                                                                </td>
                                                                <td className="member-name">
                                                                    {item.profile.firstName} {item.profile.lastName}
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </List.Item>
                                                )}
                                            />
                                        </div>
                                        <Button onClick={this.joinToCommunity}>Join</Button>
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
