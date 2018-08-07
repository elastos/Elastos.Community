import React from 'react'
import StandardPage from '../../StandardPage'
import { Link } from 'react-router-dom'
import config from '@/config'
import _ from 'lodash'
import './style.scss'

import { Col, Row, Icon, Form, Input, Button, Breadcrumb, List, Avatar } from 'antd'
import moment from 'moment/moment'

export default class extends StandardPage {
    state = {
    }

    componentDidMount() {
        super.componentDidMount()
        this.props.getTeams()
    }

    componentWillUnmount() {
        this.props.resetTeams()
    }

    ord_renderContent () {
        return (
            <div className="p_DeveloperSearch">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-wrap">
                    <Row className="d_row d_rowTop">
                        <div className="p_admin_breadcrumb">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <Icon type="home"/>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="/developers">
                                    Developers
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    Search
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </Row>
                    <Row className="d_row">
                        <Col span={4} className="admin-left-column wrap-box-user">
                            FOO
                        </Col>
                        <Col span={20} className="admin-right-column wrap-box-user">
                            <div className="pull-right hide">
                                <Button onClick={this.goCreateTeam.bind(this)}>Create Team</Button>
                            </div>
                            {this.renderList()}
                        </Col>
                    </Row>
                    <div className="horizGap">
                    </div>
                </div>
            </div>
        )
    }

    renderList() {
        const teams = this.props.allTeams
        const data = _.map(teams, (team) => {
            return {
                href: '',
                title: team.name,
                url: team.pictures && team.pictures[0] && team.pictures[0].url,
                description: 'Lorem ipsum',
                content: team.description
            }
        })

        return (
            <List itemLayout='vertical' size='large' pagination={{ pageSize: 5 }} dataSource={data}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        extra={<img width={272} alt="logo" src={item.url} />}
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        )
    }

    goCreateTeam() {

    }

    goCreateTask() {

    }
}
