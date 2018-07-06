import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Col, Row, Icon, Divider, Button, Spin } from 'antd'
import _ from 'lodash'
import TeamEditForm from '@/module/form/TeamEditForm/Container'

import {TASK_STATUS, USER_GENDER} from '@/constant'
import config from '@/config'

export default class extends BaseComponent {
    ord_states() {
        return {
            editing: false
        }
    }

    ord_render () {
        return (
            <div className="w100">
                {this.renderHeader()}
                {this.state.editing ? this.renderEditForm() : this.renderTeamDetail()}
            </div>
        )
    }

    renderEditForm() {
        return (
            <div className="form-wrapper">
                <TeamEditForm data={this.props.data} />
            </div>
        )
    }

    renderHeader() {
        const canEdit = this.props.canEdit || false
        return <div className="l_banner">
            <div className="pull-left">
                Team Detail
            </div>
            <div className="pull-right right-align">
                {
                    canEdit &&
                    <Button onClick={this.switchEditMode.bind(this)}>
                        {this.state.editing ? 'Cancel' : 'Edit'}
                    </Button>
                }

            </div>
            <div className="clearfix"/>
        </div>
    }

    renderTeamDetail() {
        const data = this.props.data
        const list = [
            {key: 'Name', value: data.name},
            {key: 'Type', value: data.type},
            {key: 'Recruiting', value: data.recruiting ? 'Yes' : 'No'},
            {key: 'Description', value: data.profile.description},
            {key: 'Member limit', value: data.memberLimit},
            {key: 'Tags', value: data.tags.join(', ')},
            {key: 'Create Time', value: data.createdAt}

        ]

        _.each(data.members, (item) => {
            list.push({key: '', value: ''}, {
                key: 'Member - ' + item.user.username, value: item.user.profile.firstName + ' ' + item.user.profile.lastName
            }, {
                key: 'Role', value: item.role
            })
        })

        return (
            <div>
                {
                    _.map(list, (item, index) => {
                        return (
                            <Row key={index}>
                                <Col style={{padding: '0 24px', margin: '8px 0', fontSize: '1.2rem'}} span={8} className="gridCol right-align">
                                    {item.key}
                                </Col>
                                <Col style={{padding: '0 24px', margin: '8px 0', fontSize: '1.2rem'}} span={16} className="gridCol">
                                    {item.value}
                                </Col>
                            </Row>
                        )
                    })
                }

            </div>
        )
    }

    switchEditMode() {
        this.setState({editing: !this.state.editing})
    }
}
