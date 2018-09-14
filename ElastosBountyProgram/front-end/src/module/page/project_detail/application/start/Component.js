import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'
import {
    message,
    Button,
    List,
    Card,
    Icon,
    Avatar,
    Select,
    Input,
    Form
} from 'antd'
import I18N from '@/I18N'
import TeamCreateForm from '@/module/form/TeamCreateForm/Container'
import _ from 'lodash'
import './style.scss'

class C extends BaseComponent {
    ord_states() {
        return {
            mode: null // solo, team, newteam
        }
    }

    async componentDidMount() {
        if (this.props.currentUserId) {
            this.props.getTeams({
                owner: this.props.currentUserId
            })
        }
    }

    componentWillUnmount() {
    }

    ord_render () {
        return (
            <div className="c_ApplicationStart">
                <div>
                    {this.getHeader()}
                    {this.getModeSelector()}
                    {this.getModePanel()}
                    {this.getActions()}
                </div>
            </div>
        )
    }

    getAvatarWithFallback(avatar) {
        return _.isEmpty(avatar)
            ? '/assets/images/Elastos_Logo.png'
            : avatar
    }

    getApplyWithDropdown() {
        return (
            <div className="full-width halign-wrapper valign-wrapper">
                <Select className="team-selector" disabled={this.props.loading} defaultValue="$me"
                    onChange={(value) => this.handleApplyWithChange(value)}>
                    <Select.Option value="$me">
                        Apply as myself
                        <Avatar size="small" src={this.getAvatarWithFallback(this.props.currentUserAvatar)}
                            className="pull-right"/>
                    </Select.Option>
                    {_.map(this.props.ownedTeams, (team) =>
                        <Select.Option key={team._id} value={team._id}>
                            Apply with {team.name}
                            {!_.isEmpty(team.pictures)
                                ? <Avatar size="small" src={this.getAvatarWithFallback(team.pictures[0].thumbUrl)}
                                    className="pull-right"/>
                                : <Avatar size="small" src={this.getAvatarWithFallback()} className="pull-right"/>
                            }
                        </Select.Option>
                    )}
                </Select>
            </div>
        )
    }

    getHeader() {
        return (
            <div className="full-width halign-wrapper start-header">
                <h3 className="start-project-title">
                    #{this.props.task.dAppId} - {this.props.task.name}
                </h3>
                <div className="start-welcome">
                    Thanks for your interest.<br/>
                    Please select below the option which describes you best.
                </div>
            </div>
        )
    }

    getModeSelector() {
        const data = [
            {
                iconCls: 'user',
                description: 'I would like to contribute to this project',
                mode: 'solo'
            },
            {
                iconCls: 'team',
                description: 'I would like to join the project with my Team',
                mode: 'team'
            },
            {
                iconCls: 'usergroup-add',
                description: 'I would like to create a Team and work on this project',
                mode: 'newteam'
            }
        ]

        return (
            <div className="start-selector">
                <List
                    grid={{gutter: 16, column: 3}}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <Card title={<Avatar size={128} icon={item.iconCls} shape="square"/>}
                                onClick={() => this.changeMode(item.mode)}
                                className={this.state.mode === item.mode ? 'selected' : ''}>
                                {item.description}
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        )
    }

    changeMode(mode) {
        this.setState({ mode })
    }

    getActions() {
        return (
            <div className="full-width halign-wrapper valign-wrapper">
                <Button>
                    Apply
                </Button>
            </div>
        )
    }

    getModePanel() {
        if (!this.state.mode) {
            return
        }

        const compLookup = {
            solo: (
                <div>
                    <Input.TextArea rows={4} placeholder="Why do you want to join?"/>
                </div>
            ),
            team: (
                <div>
                    {this.getApplyWithDropdown()}
                </div>
            ),
            newteam: (
                <div>
                    <TeamCreateForm/>
                </div>
            )
        }

        return (
            <div className="full-width start-mode">
                {compLookup[this.state.mode]}
            </div>
        )
    }
}

export default Form.create()(C)
