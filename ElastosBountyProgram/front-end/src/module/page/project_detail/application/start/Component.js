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
            mode: null, // solo, team, newteam
            confirmation: false
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

    handleSubmit (e) {
        e.preventDefault()

        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.state.mode === 'solo' ||
                    (this.state.mode === 'team' && values.team === '$me')) {
                    this.props.applyToTask(this.props.task._id, this.props.currentUserId, null, values.applyMsg).then(() => {
                        this.setState({ confirmation: true })
                    })
                } else if (this.state.mode === 'team') {
                    this.props.applyToTask(this.props.task._id, null, values.team).then(() => {
                        this.setState({ confirmation: true })
                    })
                } else if (this.state.mode === 'newteam') {
                    const sanitized = _.omit(values, [ 'team', 'applyMsg' ])
                    this.props.createTeam(sanitized).then((team) => {
                        this.props.applyToTask(this.props.task._id, null, team._id).then(() => {
                            this.setState({ confirmation: true })
                        })
                    })
                }
            }
        })
    }

    ord_render () {
        return (
            <div className="c_ApplicationStart">
                { this.state.confirmation
                    ? (
                        <div className="c_ApplicationConfirm">
                            <div className="confirm-picture halign-wrapper">
                                <img src="/assets/images/AUTHTH.png"/>
                            </div>
                            <h2 className="confirm-message halign-wrapper">
                                {I18N.get('developer.cr100.application.success')}
                            </h2>
                            <div className="confirm-actions halign-wrapper">
                                <Button onClick={() => this.props.finisher()}>
                                    {I18N.get('developer.cr100.application.view')}
                                </Button>
                            </div>
                        </div>
                    )
                    : (
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            {this.getHeader()}
                            {this.getModeSelector()}
                            {this.getModePanel()}
                            {this.getActions()}
                        </Form>
                    )
                }
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
            <Select className="team-selector" disabled={this.props.loading}
                // Fix select dropdowns in modals
                // https://github.com/vazco/uniforms/issues/228
                getPopupContainer={x => {
                    while (x && x.tagName.toLowerCase() !== 'form') {
                        x = x.parentElement;
                    }

                    return x;
                }}>
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
        )
    }

    getHeader() {
        return (
            <div className="full-width halign-wrapper start-header">
                <h3 className="start-project-title komu-a">
                    #{this.props.task.dAppId} - {this.props.task.name}
                </h3>
                <div className="strike-text start-welcome">
                    <div className="strike-line"/>
                    <p>Thanks for your interest.</p>
                </div>
                <br/>
                <div className="strike-text start-welcome">
                    <div className="strike-line"/>
                    <p>Please select below the option which describes you best.</p>
                </div>
            </div>
        )
    }

    getModeSelector() {
        // TODO: Change place holder user images with team
        const data = [
            {
                img: '/assets/images/user_blurred.png',
                description: 'I would like to contribute to this project',
                mode: 'solo'
            },
            {
                img: '/assets/images/user_blurred.png',
                description: 'I registered a team and would like to work on this the project',
                mode: 'team'
            },
            {
                img: '/assets/images/user_blurred.png',
                description: 'I would like to create a team and work on this project',
                mode: 'newteam'
            }
        ]

        return (
            <div className="start-selector">
                <List
                    grid={{gutter: 16, column: 3}}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item className="selector-item">
                            <div className={this.state.mode === item.mode ? 'selected' : ''}>
                                <div className="selector-image"
                                    onClick={() => this.changeMode(item.mode)}>
                                    <img src={item.img}/>
                                </div>
                            </div>
                            <div className="selector-description">{item.description}</div>
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
                <Button htmlType="submit" type="ebp" className="d_btn"
                    loading={this.props.loading} disabled={!this.state.mode}>
                    Apply
                </Button>
            </div>
        )
    }

    getModePanel() {
        if (!this.state.mode) {
            return
        }

        const {getFieldDecorator} = this.props.form
        const compLookup = {
            solo: (
                <div className="mode-panel">
                    <div className="label komu-a">Tell us why do you want to join?</div>
                    <Input.TextArea rows={4} className="input-field"/>
                </div>
            ),
            team: this.getApplyWithDropdown(),
            newteam: (
                <TeamCreateForm embedded={true} form={this.props.form}/>
            )
        }

        const decoratorLookup = {
            solo: getFieldDecorator('applyMsg', {
                rules: [],
                initialValue: ''
            }),
            team: getFieldDecorator('team', {
                rules: [],
                initialValue: '$me'
            }),
            newteam: _.identity
        }

        const className = `full-width start-mode ${this.state.mode !== 'newteam'? 'halign-wrapper' : ''}`
        return (
            <div className={className}>
                {decoratorLookup[this.state.mode](compLookup[this.state.mode])}
            </div>
        )
    }
}

export default Form.create()(C)
