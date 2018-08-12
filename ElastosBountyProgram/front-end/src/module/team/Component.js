import {TASK_STATUS, TASK_CATEGORY, TASK_TYPE} from '@/constant'
import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import TeamCreateForm from '@/module/form/TeamCreateForm/Container'
import { Col, Row, Popconfirm, Divider, Button, Spin, Icon } from 'antd'
import TeamPublicDetail from './detail/Container'
import './style.scss'
import moment from 'moment/moment'
import _ from 'lodash'

/**
 * This has 3 views
 *
 * 1. Public
 * 2. Admin
 * 3. Edit
 *
 */
export default class extends BaseComponent {

    componentDidMount() {
        const teamId = this.props.match.params.teamId
        teamId && this.props.getTeamDetail(teamId)
    }

    renderMain() {
        const isTeamOwner = this.props.current_user_id ===
            (this.props.team.owner && this.props.team.owner._id)

        return (
            <div className="c_TeamDetail">
                {isTeamOwner && this.renderHeader()}
                {this.state.editing ? this.renderEditForm() : this.renderDetail()}
            </div>
        )
    }

    renderHeader() {
        return <div className="l_banner">
            <div className="pull-left">
                Lorem ipsum
            </div>
            <div className="pull-right right-align">
                <Button onClick={this.switchEditMode.bind(this)}>
                    {this.state.editing ? 'Cancel' : 'Edit'}
                </Button>
            </div>
            <div className="clearfix"/>
        </div>
    }

    renderEditForm() {
        return <div className="form-wrapper">
            <TeamCreateForm existingTeam={this.props.team} page={this.props.page}
                switchEditMode={this.switchEditMode.bind(this)}/>
        </div>
    }

    renderDetail() {
        return <TeamPublicDetail teamId={this.props.team._id} page={this.props.page}/>
    }

    ord_render () {
        return (_.isEmpty(this.props.team) || this.props.team.loading ? (
            <div class="center"><Spin size="large" /></div>) : (
            this.renderMain())
        )
    }

    switchEditMode() {
        this.setState({editing: !this.state.editing})
    }
}
