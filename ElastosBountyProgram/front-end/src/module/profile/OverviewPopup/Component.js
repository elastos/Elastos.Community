import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'
import { Button, Icon } from 'antd'
import I18N from '@/I18N'
import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS, TASK_CANDIDATE_STATUS, USER_ROLE, USER_AVATAR_DEFAULT} from '@/constant'
import './style.scss'
import config from '@/config'
import MediaQuery from 'react-responsive'
import _ from 'lodash'

export default class extends BaseComponent {

    ord_states() {
    }

    async componentDidMount() {
        let circleId = null;
        if (_.size(this.props.showUserInfo.circles) > 0) {
            circleId = this.props.showUserInfo.circles[0]
        }
        if (circleId) {
            await this.props.getTeamDetail(circleId)
        }
    }

    componentWillUnmount() {
        this.props.resetTeamDetail()
    }

    getCountry(countryCode) {
        return config.data.mappingCountryCodeToName[countryCode];
    }

    sendMessage(user) {
        this.linkUserDetail(user)
    }

    linkUserDetail(user) {
        this.props.history.push(`/member/${user._id}`)
    }

    ord_render () {
        const user = this.props.showUserInfo
        const team = this.props.team;
        if (!user || !team) {

            return <span></span>;
        }

        const avatar = user.profile.avatar || USER_AVATAR_DEFAULT
        return (
            <div className="c_ProfileModalPopup">
                <div className="header-image-container">
                    <img src="/assets/images/city_background.svg"/>
                </div>
                <div>
                    <div className="profile-image">
                        <img src={avatar}/>
                    </div>
                    <div>
                        <div className="profile-info">
                            <div className="name komu-a">
                                {user.profile.firstName}
                                {' ' + user.profile.lastName}
                            </div>
                            <div className="location-circle">
                                <span>
                                    <Icon type="compass" />
                                    {this.getCountry(user.profile.country)}
                                </span>
                                {!this.props.loading &&
                                <span className="circle">[{team.name} {I18N.get('developer.search.circle')}]</span>}
                            </div>
                        </div>
                        <div className="profile-interaction">
                            <div><a onClick={() => this.sendMessage(user)}>{I18N.get('profile.sendMessage')}</a></div>
                            <div><span>{I18N.get('profile.localTime')} {moment(Date.now()).format('h:mm A')}</span></div>
                        </div>
                        <div className="profile-view-button">
                            <Button className="komu-a" onClick={() => this.linkUserDetail(user)}>{I18N.get('profile.viewProfile')}</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
