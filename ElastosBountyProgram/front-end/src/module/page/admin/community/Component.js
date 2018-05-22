import React from 'react'
import StandardPage from '../../StandardPage'
import './style.scss'

import { Breadcrumb, Col, Icon, Row, Menu, Select } from 'antd'
import ListLeadersOfAllCountries from './ListLeadersOfAllCountries/Component'
import ListLeadersOfACountry from './ListLeadersOfACountry/Component'
import ListLeadersOfARegion from './ListLeadersOfARegion/Component'
import Navigator from '../shared/Navigator/Component'
import { Link } from 'react-router-dom'

export default class extends StandardPage {
    checkTypeOfBreadcrumb() {
        // Check status of breadcrumb
        let treeLevel = Object.keys(this.props.match.params).length;
        this.setState({
            treeLevel
        });
    }

    componentWillMount() {
        this.checkTypeOfBreadcrumb();
    }

    renderMatchComponent() {
        switch (this.state.treeLevel) {
        case 0:
            return <ListLeadersOfAllCountries/>;
        case 1:
            return <ListLeadersOfACountry/>;
        default:
            return <ListLeadersOfARegion/>;
        }
    }

    handleChangeCountry(country) {
        this.props.history.push(`/admin/community/${country}`);
    }

    handleChangeRegion(region) {
        this.props.history.push(`/admin/community/${this.props.match.params['country']}/${region}`);
    }

    ord_renderContent () {
        const listCountries = [
            'Vietnam', 'China', 'Singapore', 'USA'
        ]

        const listCountriesEl = listCountries.map((country) => {
            return (
                <Select.Option key={country} value={country}>{country}</Select.Option>
            )
        })

        const menuCountriesEl = (
            <Select
                defaultValue={this.props.match.params['country']}
                showSearch
                style={{ width: 160 }}
                placeholder="Select a country"
                optionFilterProp="children"
                onChange={this.handleChangeCountry.bind(this)}
            >
                {listCountriesEl}
            </Select>
        );

        const listRegions = [
            'Hanoi', 'Tokyo', 'NewYork'
        ]

        const listRegionsEl = listRegions.map((region) => {
            return (
                <Select.Option key={region} value={region}>{region}</Select.Option>
            )
        })

        const menuListRegionsEl = (
            <Select
                defaultValue={this.props.match.params['region']}
                showSearch
                style={{ width: 160 }}
                placeholder="Select a region"
                optionFilterProp="children"
                onChange={this.handleChangeRegion.bind(this)}
            >
                {listRegionsEl}
            </Select>
        );

        return (
            <div className="p_admin_index ebp-wrap ebp-wrap--admin">
                <div className="d_box">
                    <div className="p_admin_breadcrumb">
                        { this.state.treeLevel === 0 ? (
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <Icon type="home" />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Admin</Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <Link to="/admin/community">Community</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    {menuCountriesEl}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        ) : null}

                        { this.state.treeLevel === 1 ? (
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <Icon type="home" />
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
                        ) : null}

                        { this.state.treeLevel === 2 ? (
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <Icon type="home" />
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
                        ) : null}
                    </div>
                    <div className="p_admin_content">
                        <Row>
                            <Col span={18} className="admin-left-column wrap-box-user">
                                {this.renderMatchComponent()}
                            </Col>
                            <Col span={6} className="admin-right-column wrap-box-navigator">
                                <Navigator selectedItem={'community'}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}