import React from 'react'
import AdminPage from '../BaseAdmin'

import '../admin.scss'
import './style.scss'

import { Breadcrumb, Col, Icon, Row, Select } from 'antd'
import ListCountryLeaders from './ListCountryLeaders/Component'
import DetailLeaderOfCountryOrRegion from './DetailLeaderOfCountryOrRegion/Component'
import Navigator from '../shared/Navigator/Component'
import { Link } from 'react-router-dom'
import config from '@/config'

export default class extends AdminPage {
    checkTypeOfBreadcrumb () {
        let type;
        
        const routePrams = this.props.match.params;
        if (!Object.keys(routePrams).length) {
            type = 'LEADER_OF_ALL_COUNTRIES';
        } else if (routePrams['country'] && routePrams['leader']) {
            type = 'LEADER_DETAIL';
        } else if (routePrams['country'] && routePrams['region']) {
            type = 'REGION_DETAIL';
        } else {
            type = 'LEADER_OF_A_COUNTRY';
        }

        this.setState({
            type
        });
    
        this.setState({
            type,
        });
    }

    componentWillMount () {
        this.checkTypeOfBreadcrumb()
    }

    updateBreadcrumb(data) {
        console.log('set breakcrunm data', data)
        this.setState({...data})
    }

    renderMatchComponent () {
        switch (this.state.type) {
            case 'LEADER_OF_ALL_COUNTRIES':
                return <ListCountryLeaders country={null} />
            case 'LEADER_OF_A_COUNTRY':
                return <ListCountryLeaders country={this.props.match.params['country']} />
            default:
                return <DetailLeaderOfCountryOrRegion leader={this.props.match.params['leader']} region={this.props.match.params['region']} />
        }
    }

    handleChangeCountry (countryCode) {
        this.setState({
            selectedCountry: countryCode,
        });

        this.props.history.push(`/admin/community/${countryCode}`)
    }

    handleChangeRegion (region) {
        this.setState({
            selectedRegion: region,
        });

        this.props.history.push(`/admin/community/${this.props.match.params['country']}/region/${region}`)
    }

    ord_renderContent () {
        console.log('this.props community', this.props);

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

        const listRegions = [
            'Hanoi', 'Tokyo', 'NewYork'
        ]

        const listRegionsEl = listRegions.map((region) => {
            return (
                <Select.Option key={region}
                    value={region}>{region}</Select.Option>
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

                            {(this.state.type !== 'LEADER_OF_ALL_COUNTRIES') && (
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
