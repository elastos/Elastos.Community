import React from 'react'
import AdminPage from '../BaseAdmin'

import '../admin.scss'
import './style.scss'

import { Breadcrumb, Col, Icon, Row, Select, message } from 'antd'
import CountryCommunities from './CountryCommunities/Component'
import CommunityDetail from './CommunityDetail/Container'
import Navigator from '../shared/Navigator/Component'
import { Link } from 'react-router-dom'
import config from '@/config'

export default class extends AdminPage {
    checkTypeOfBreadcrumb () {
        let screenType;

        const routePrams = this.props.match.params;
        if (!Object.keys(routePrams).length) {
            screenType = 'LEADER_OF_ALL_COUNTRIES';
        } else if (routePrams['country'] && routePrams['community'] && routePrams['region']) {
            screenType = 'REGION_DETAIL';
        } else if (routePrams['country'] && routePrams['community']) {
            screenType = 'LEADER_DETAIL';
        } else {
            screenType = 'LEADER_OF_A_COUNTRY';
        }

        this.setState({
            screenType
        });
    }

    componentWillMount () {
        this.checkTypeOfBreadcrumb()
    }
    
    updateListLeaders() {
        if (this.state.screenType === 'LEADER_OF_ALL_COUNTRIES') {
            this.props.getAllLeaders()
        } else {
            this.props.getLeadersACountry(this.props.match.params['country'])
        }
    }

    componentDidMount() {
        this.updateListLeaders()
    }

    updateBreadcrumb(data) {
        console.log('set breakcrunm data', data)
        this.setState({...data})
    }
    
    proxyAddCountry(data) {
        return this.props.addCountry(data).then(() => {
            this.updateListLeaders()
            message.success('Add new country successfully')
        }).catch(() => {
            message.error('Error while add country')
        })
    }

    renderMatchComponent () {
        switch (this.state.screenType) {
            case 'LEADER_OF_ALL_COUNTRIES':
                return <CountryCommunities
                    addCountry={this.proxyAddCountry.bind(this)}
                    country={null}
                    communities={this.props.all_country_communities} />
            case 'LEADER_OF_A_COUNTRY':
                return <CountryCommunities
                    addCountry={this.proxyAddCountry.bind(this)}
                    country={this.props.match.params['country']}
                    communities={this.props.specific_country_communities} />
            default:
                return <CommunityDetail
                    leader={this.props.match.params['leader']}
                    region={this.props.match.params['region']}
                    country={this.props.match.params['country']}
                    communityId={this.props.match.params['community']}/>
        }
    }

    handleChangeCountry (countryCode) {
        this.setState({
            selectedCountry: countryCode,
        });

        this.props.history.push(`/admin/community/country/${countryCode}`)
        this.props.getLeadersACountry(countryCode)
    }

    handleChangeRegion (region) {
        this.setState({
            selectedRegion: region,
        });
        
        console.log('region', region);

        this.props.history.push(`/admin/community/${this.props.match.params['community']}/country/${this.props.match.params['country']}/region/${region}`)
    }

    ord_renderContent () {
        const listCountriesEl = config.data.listCountries.map((country) => {
            return (
                <Select.Option key={country}
                    value={country.code}>{country.name}</Select.Option>
            )
        })

        const menuCountriesEl = (
            <Select
                value={this.props.match.params['country']}
                showSearch
                style={{width: 160}}
                placeholder="Select a country"
                optionFilterProp="children"
                onChange={this.handleChangeCountry.bind(this)}
            >
                {listCountriesEl}
            </Select>
        )

        const listRegionsEl = this.props.breadcrumb_regions.map((community) => {
            console.log('community.geolocation', community.geolocation);
            return (
                <Select.Option key={community._id}
                    value={community.geolocation}>{community.name}</Select.Option>
            )
        })

        const menuListRegionsEl = (
            <Select
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

                            {(this.state.screenType === 'LEADER_DETAIL' || this.state.screenType === 'REGION_DETAIL') && (
                                <Breadcrumb.Item>
                                    {menuListRegionsEl}
                                </Breadcrumb.Item>
                            )}
                        </Breadcrumb>
                    </div>
                    <div className="p_admin_content">
                        <Row>
                            <Col span={18}
                                className="admin-left-column wrap-box-user">
                                {this.renderMatchComponent()}
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
