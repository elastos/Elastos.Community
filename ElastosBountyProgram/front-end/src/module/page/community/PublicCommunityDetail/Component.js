import React from 'react'
import { Link } from 'react-router-dom'
import StandardPage from '../../StandardPage'
import { Button, Card, Col, Select, Row, Icon, message, Divider, Breadcrumb, Tabs, List, Avatar, Input } from 'antd'
import config from '@/config'
import { DEFAULT_IMAGE, USER_GENDER } from '@/constant'
import Footer from '@/module/layout/Footer/Container'
import _ from 'lodash'
import Promise from 'bluebird'
import '../style.scss'

const TabPane = Tabs.TabPane

export default class extends StandardPage {
    state = {
        communities: [],
        breadcrumbRegions: [],
        community: null,
        communityMembers: [],
        communityMembersClone: [],
        subCommunities: [],
        listSubCommunitiesByType: {
            STATE: [],
            CITY: [],
            REGION: [],
            SCHOOL: []
        },
        keyValueCommunityMembers: {}, // Contain all members
        keyValueMembersWithoutSubCommunity: {} // Only contain member without sub community
    }

    componentWillUnmount () {
        this.props.resetTasks()
    }

    componentDidMount() {
        this.loadCommunities()
        this.props.getSocialEvents()
        this.loadCommunityDetail()
        this.loadSubCommunities()
    }

    loadCommunities() {
        this.props.getAllCountryCommunity().then((communities) => {
            this.setState({
                communities
            })
        })
    }

    formatCommunityMembers(communityMembers) {
        communityMembers = _.uniqBy(communityMembers, '_id')
        communityMembers = this.getAvatarUrl(communityMembers)

        // Convert array members to key (id) value (object user), so we can check if current user joined or not
        const keyValueCommunityMembers = _.keyBy(communityMembers, '_id')
        this.setState({
            keyValueCommunityMembers,
            communityMembers,
            communityMembersClone: communityMembers
        })
    }

    loadCommunityMembers(communityId) {
        // If user in community we need get member of it and members of sub community
        if (!this.props.match.params['region']) {
            const listApiCalls = [
                this.props.getCommunityMembers(communityId || this.props.match.params['community']) // Get member of community
            ]

            // Get members of each sub community
            this.state.subCommunities.forEach((subCommunity) => {
                listApiCalls.push(this.props.getCommunityMembers(subCommunity._id))
            })

            Promise.all(listApiCalls).then((apiResponses) => {
                // Save list all member ids belong to community
                const keyValueMembersWithoutSubCommunity = _.keyBy(apiResponses[0], '_id')
                this.setState({
                    keyValueMembersWithoutSubCommunity
                })

                let communityMembers = []
                apiResponses.forEach((apiResponse) => {
                    communityMembers.push(...apiResponse)
                })

                this.formatCommunityMembers(communityMembers)
            })
        } else {
            // Find which sub community user selected
            const selectedSubCommunity = _.find(this.state.subCommunities, {
                name: this.props.match.params['region']
            })

            if (!selectedSubCommunity) {
                return
            }

            this.props.getCommunityMembers(selectedSubCommunity._id).then((communityMembers) => {
                this.formatCommunityMembers(communityMembers)
            })
        }
    }

    // TODO: doesn't work if there is no leader
    loadCommunityDetail(communityId) {
        this.props.getCommunityDetail(communityId || this.props.match.params['community']).then((community) => {
            this.convertCommunityLeaderIdsToLeaderObjects(community).then((community) => {
                this.setState({
                    community
                })
            })
        })
    }

    loadSubCommunities(communityId) {
        this.props.getSubCommunities(communityId || this.props.match.params['community']).then((subCommunities) => {
            this.convertCommunitiesLeaderIdsToLeaderObjects(subCommunities).then((subCommunities) => {
                // Check which communities we will use to render
                const breadcrumbRegions = this.getBreadcrumbRegions(subCommunities)
                const listSubCommunitiesByType = this.getListSubCommunitiesByType(subCommunities, this.props.match.params['region'])
                // Update to state
                this.setState({
                    subCommunities,
                    listSubCommunitiesByType,
                    breadcrumbRegions
                })

                // After have sub-community we get all members
                this.loadCommunityMembers()
            })
        })
    }

    getAvatarUrl(users) {
        const avatarDefault = {
            [USER_GENDER.MALE]: '/assets/images/User_Avatar_Other.png'
        }

        users.forEach((user) => {
            if (!user.profile.avatar) {
                user.profile.avatar = avatarDefault[USER_GENDER.MALE]
            }
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
                users = this.getAvatarUrl(users) // Mock avatar url
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
                users = this.getAvatarUrl(users) // Mock avatar url
                const mappingIdToUserList = _.keyBy(users, '_id')
                communities.forEach((community) => {
                    community.leaders = community.leaders || []
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
        let breadcrumbRegions = []
        subCommunities.forEach((community) => {
            breadcrumbRegions.push({
                name: community.name
            })
        })

        breadcrumbRegions = _.sortBy(_.uniqBy(breadcrumbRegions, 'name'), 'name')

        return breadcrumbRegions
    }

    getCommunityIdByGeolocation(geolocation) {
        const community = _.find(this.state.communities, {
            geolocation: geolocation
        })

        if (community) {
            return community._id
        }
    }

    handleChangeCountry(geolocation) {
        if (geolocation) {
            const communityId = this.getCommunityIdByGeolocation(geolocation)
            this.props.history.push(`/community/${communityId}/country/${geolocation}`)

            this.loadCommunityDetail(communityId)
            this.loadSubCommunities(communityId)
        } else {
            this.props.history.push('/community')
        }
    }

    getListSubCommunitiesByType(subCommunities, filterRegionName) {
        let renderCommunities

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
            SCHOOL: []
        }

        renderCommunities.forEach((community) => {
            listSubCommunitiesByType[community.type] = listSubCommunitiesByType[community.type] || []
            listSubCommunitiesByType[community.type].push(community)
        })

        return listSubCommunitiesByType
    }

    handleChangeRegion(region) {
        if (region) {
            const listSubCommunitiesByType = this.getListSubCommunitiesByType(this.state.subCommunities, region)
            this.setState({
                listSubCommunitiesByType
            })

            const isChangeRegion = !!this.props.match.params['region']
            this.props.history.push(`/community/${this.props.match.params['community']}/country/${this.props.match.params['country']}/region/${region}`)

            if (isChangeRegion) {
                setTimeout(() => {
                    this.loadCommunityMembers()
                }, 100)
            }
        } else {
            this.props.history.push(`/community/${this.props.match.params['community']}/country/${this.props.match.params['country']}`)
        }
    }

    getMemberCommunityId() {
        let communityId

        if (!this.props.match.params['region']) {
            communityId = this.props.match.params.community
        } else {
            // Find which sub community user selected
            const selectedSubCommunity = _.find(this.state.subCommunities, {
                name: this.props.match.params['region']
            })

            if (!selectedSubCommunity) {
                return
            }

            communityId = selectedSubCommunity._id
        }

        return communityId
    }

    joinToCommunity() {
        const communityId = this.getMemberCommunityId()

        this.props.addMember(this.props.current_user_id, communityId).then(() => {
            message.success('You were added to community')

            this.loadCommunityMembers()
        }).catch((err) => {
            console.error(err)
            message.error('Error while adding you to community')
        })
    }

    leaveFromCommunity() {
        const communityId = this.getMemberCommunityId()

        this.props.removeMember(this.props.current_user_id, communityId).then(() => {
            message.success('You left this community successfully')
            this.loadCommunityMembers()
        })
    }

    renderBreadcrumbCountries() {
        let geolocationKeys = {}

        this.state.communities.forEach((community) => {
            geolocationKeys[community.geolocation] = community.geolocation
        })

        const listCountriesEl = Object.keys(geolocationKeys).map((geolocation, index) => {
            return (
                <Select.Option title={config.data.mappingCountryCodeToName[geolocation]} key={index}
                    value={geolocation}>{config.data.mappingCountryCodeToName[geolocation]}</Select.Option>
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

        return menuCountriesEl
    }

    renderBreadcrumbRegions() {
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

        return menuListRegionsEl
    }

    renderTabSubCommunities() {
        if (this.state.subCommunities.length === 0) {
            return null
        }
        return (
            <Tabs type="card">
                {Object.keys(config.data.mappingSubCommunityTypesAndName).map((key) => {
                    return (
                        <TabPane tab={config.data.mappingSubCommunityTypesAndName[key].tabName} key={key}>
                            <Row>
                                {this.state.listSubCommunitiesByType[key].map((community, index) => {
                                    return (
                                        <Col md={{span: 12}} lg={{span: 3}}
                                            key={index}
                                            className="user-card">
                                            {community.leaders.map((leader, index) => {
                                                return (
                                                    <Link key={index} to={'/community/' + community.parentCommunityId + '/country/' + community.geolocation + '/region/' + community.name}>
                                                        <Card
                                                            cover={<img src={leader.profile.avatar}/>}
                                                        >
                                                            <h5>
                                                                {community.name}
                                                            </h5>
                                                            <p className="user-info">
                                                                <a onClick={() => { this.props.history.push(`/member/${leader._id}`) }}>
                                                                    {leader.username}
                                                                </a>
                                                            </p>
                                                        </Card>
                                                    </Link>
                                                )
                                            })}

                                            {community.leaders.length === 0 && (
                                                <Link key={index} to={'/community/' + community.parentCommunityId + '/country/' + community.geolocation + '/region/' + community.name}>
                                                    <Card
                                                        cover={<img src={DEFAULT_IMAGE.UNSET_LEADER}/>}
                                                    >
                                                        <h5>
                                                            {community.name}
                                                        </h5>
                                                    </Card>
                                                </Link>
                                            )}
                                        </Col>
                                    )
                                })}
                            </Row>
                        </TabPane>
                    )
                })}
            </Tabs>
        )
    }

    renderListOrganizers() {
        if (!this.state.community) {
            return null
        }
        return (
            <Row>
                <Col span={24}>
                    <h3 className="without-padding overflow-ellipsis">{config.data.mappingCountryCodeToName[this.props.match.params['country']] + ' Organizers'}</h3>
                </Col>
                <Col span={24}>
                    <Row>
                        {this.state.community.leaders && this.state.community.leaders.map((leader, index) => {
                            return (
                                <Col md={{span: 12}} lg={{span: 4}} key={index} className="user-card">
                                    <Card
                                        key={index}
                                        cover={<img src={leader.profile.avatar}/>}
                                    >
                                        <p>
                                            <a onClick={() => { this.props.history.push(`/member/${leader._id}`) }}>
                                                {leader.username}
                                            </a>
                                        </p>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </Col>
            </Row>
        )
    }

    handleSearchMember(value) {
        let communities

        if (!value) {
            communities = this.state.communityMembersClone
        } else {
            communities = _.filter(this.state.communityMembersClone, (community) => {
                return community.profile.firstName.toLowerCase().indexOf(value.toLowerCase()) > -1 || community.profile.lastName.toLowerCase().indexOf(value.toLowerCase()) > -1
            })
        }

        this.setState({
            communityMembers: communities
        })
    }

    ord_renderContent () {
        const menuCountriesEl = this.renderBreadcrumbCountries()
        // const menuListRegionsEl = this.renderBreadcrumbRegions()
        // const tabSubCommunities = this.renderTabSubCommunities()
        const listOrganizers = this.renderListOrganizers()

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
                                    {/*
                                    <Breadcrumb.Item>
                                        {menuListRegionsEl}
                                    </Breadcrumb.Item>
                                    */}
                                </Breadcrumb>
                            </Col>
                        </Row>
                    </div>
                    <div className="ebp-page">
                        <div className="ebp-page-content">
                            <Row>
                                <Col md={{span: 24}} lg={{span: 18}}
                                    className="community-left-column">
                                    {listOrganizers}
                                </Col>
                                <Col md={{span: 24}} lg={{span: 6}}
                                    className="community-right-column">
                                    <div>
                                        <h4 className="without-padding">Members</h4>
                                        <Input.Search onSearch={this.handleSearchMember.bind(this)}
                                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            placeholder="Username"/>
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
                                                                        <a onClick={() => { this.props.history.push('/member/' + item._id) }}>
                                                                            {item.username}
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </List.Item>
                                                )}
                                            />
                                        </div>
                                        {this.props.current_user_id && this.props.match.params['region'] && !this.state.keyValueCommunityMembers[this.props.current_user_id] && (
                                            <Button onClick={this.joinToCommunity.bind(this)} className="btn-member-action">Join</Button>
                                        )}

                                        {this.props.current_user_id && !this.props.match.params['region'] && !this.state.keyValueMembersWithoutSubCommunity[this.props.current_user_id] && (
                                            <Button onClick={this.joinToCommunity.bind(this)} className="btn-member-action">Join</Button>
                                        )}

                                        {this.props.current_user_id && this.props.match.params['region'] && this.state.keyValueCommunityMembers[this.props.current_user_id] && (
                                            <Button onClick={this.leaveFromCommunity.bind(this)} className="btn-member-action">Leave</Button>
                                        )}

                                        {this.props.current_user_id && !this.props.match.params['region'] && this.state.keyValueMembersWithoutSubCommunity[this.props.current_user_id] && (
                                            <Button onClick={this.leaveFromCommunity.bind(this)} className="btn-member-action">Leave</Button>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                            {/*
                            <Row>
                                <Col span={24}>
                                    {this.state.subCommunities.length > 0 &&
                                    <h3 className="without-padding overflow-ellipsis">Sub-Communities</h3>
                                    }
                                </Col>
                                <Col span={24}>
                                    {tabSubCommunities}
                                </Col>
                            </Row>
                            */}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
