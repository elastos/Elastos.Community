import React from 'react'
import { Link } from 'react-router-dom'
import AdminPage from '../../BaseAdmin'
import { Button, Card, Select, Col, message, Row, Breadcrumb, Icon } from 'antd'
import _ from 'lodash'
import ModalAddCountry from '../../shared/ModalAddCountry/Component'
import config from '@/config'
import Navigator from '../../shared/Navigator/Component'

import '../style.scss'

export default class extends AdminPage {
    state = {
        visibleModalAddCountry: false,
        communities: []
    }

    // Modal add country
    showModalAddCountry = () => {
        this.formRefAddCountry.props.form.setFieldsValue({
            geolocation: this.props.match.params['country'],
        }, () => {
            this.setState({
                visibleModalAddCountry: true,
            })
        })
    }
    handleCancelModalAddCountry = () => {
        const form = this.formRefAddCountry.props.form
        form.resetFields()

        this.setState({visibleModalAddCountry: false})
    }
    handleCreateCountry = () => {
        const form = this.formRefAddCountry.props.form

        form.validateFields((err, values) => {
            if (err) {
                return
            }

            form.resetFields()
            this.setState({visibleModalAddCountry: false})
    
            this.props.addCountry(values).then(() => {
                message.success('Add new country successfully')
    
                this.loadCommunities();
            }).catch((err) => {
                console.error(err);
                message.error('Error while add country')
            })
        })
    }
    saveFormAddCountryRef = (formRef) => {
        this.formRefAddCountry = formRef
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

                this.props.history.push(`/admin/community/country/${geolocation}`)
            })
        } else {
            this.props.getAllCountryCommunity().then((communities) => {
                this.setState({
                    communities
                })

                this.props.history.push('/admin/community')
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
                    <Link to={'/admin/community/' + community._id  + '/country/' + community.leader.countryCode}>
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
                        </Breadcrumb>
                    </div>
                    <div className="p_admin_content">
                        <Row>
                            <Col span={18}
                                 className="admin-left-column wrap-box-user">
                                <div>
                                    <Button className="pull-right" onClick={this.showModalAddCountry} type="primary">Add country</Button>
                                    <h1 className="without-padding">Country Leaders</h1>
                                    <Row>
                                        {listCommunitiesEl}
                                    </Row>
        
                                    <ModalAddCountry
                                        wrappedComponentRef={this.saveFormAddCountryRef}
                                        visible={this.state.visibleModalAddCountry}
                                        onCancel={this.handleCancelModalAddCountry}
                                        onCreate={this.handleCreateCountry}
                                    />
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
