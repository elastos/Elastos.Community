import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'
import {
    message,
    Col,
    Row,
    Avatar,
    Button,
    Spin,
    Form,
    Modal
} from 'antd'
import I18N from '@/I18N'
import _ from 'lodash'
import './style.scss'

class C extends BaseComponent {
    ord_states() {
        return {
        }
    }

    componentDidMount() {
        const taskId = this.props.taskId
        this.props.getTaskDetail(taskId)
    }

    componentWillUnmount() {
        this.props.resetTaskDetail()
    }

    checkForLoading(followup) {
        return this.props.loading
            ? <Spin size="large"/>
            : _.isFunction(followup) && followup()
    }

    ord_render () {
        return (
            <div className="c_Project c_Detail">
                { this.checkForLoading(() =>
                    <div>
                        {this.getHeader()}
                        {this.getDescription()}
                        {this.getFooter()}
                    </div>
                )}
            </div>
        )
    }

    getHeader() {
        return (
            <div>
                <Avatar size={64} src={this.props.detail.thumbnail}/>
                <div>{this.props.detail.name}</div>
                <Button className="pull-right" onClick={this.handleSubmitWhitepaper.bind(this)}>
                    {I18N.get('developer.cr100.submit_whitepaper')}</Button>
                <div className="clearfix"/>
            </div>
        )
    }

    getFooter() {
        return (
            <div className="halign-wrapper">
                <Button onClick={this.handleSubmitWhitepaper.bind(this)}>
                    {I18N.get('developer.cr100.submit_whitepaper')}</Button>
            </div>
        )
    }

    getDescription() {
        return (
            <div>
                <h3>
                    {I18N.get('developer.cr100.pitch.problem')}
                </h3>
                <div>
                    {this.props.detail.pitch && this.props.detail.pitch.problem}
                </div>

                <h3>
                    {I18N.get('developer.cr100.pitch.valueProposition')}
                </h3>
                <div>
                    {this.props.detail.pitch && this.props.detail.pitch.valueProposition}
                </div>

                <h3>
                    {I18N.get('developer.cr100.pitch.useCase')}
                </h3>
                <div>
                    {this.props.detail.pitch && this.props.detail.pitch.useCase}
                </div>

                <h3>
                    {I18N.get('developer.cr100.pitch.beneficiaries')}
                </h3>
                <div>
                    {this.props.detail.pitch && this.props.detail.pitch.beneficiaries}
                </div>

                <h3>
                    {I18N.get('developer.cr100.pitch.elaInfrastructure')}
                </h3>
                <div>
                    {this.props.detail.pitch && this.props.detail.pitch.elaInfrastructure}
                </div>
            </div>
        )
    }

    handleSubmitWhitepaper() {

    }
}

export default Form.create()(C)
