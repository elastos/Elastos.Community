import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'
import { Button, Icon } from 'antd'
import I18N from '@/I18N'
import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS, TASK_CANDIDATE_STATUS, USER_ROLE} from '@/constant'
import './style.scss'
import config from '@/config'
import MediaQuery from 'react-responsive'

export default class extends BaseComponent {
    ord_render () {
        const user = this.props.showUserInfo || null
        console.log(user)
        return (
            <div className="c_ProfileModalPopup">
                <div className="header-image-container">
                    <img src="/assets/images/city_background.svg"/>
                </div>
                <div>
                    <div className="profile-image">
                        <img src="/assets/images/user_blurred_white.png"/>
                    </div>
                    { user === null ? <div>Loading..</div>
                        : <div>
                            <div className="profile-info">
                                <div className="name">
                                    {user.profile.firstName}
                                    {' ' + user.profile.lastName}
                                </div>
                                <div className="location-circle">
                                    <span>
                                        <Icon type="compass" />
                                        Germany
                                    </span>
                                    <span>[Design Circle]</span>
                                </div>
                            </div>
                            <div className="profile-interaction">
                                <a>Send Direct Message</a>
                                <span>Local time: 5:31 PM</span>
                            </div>
                            <div className="profile-view-button">
                                <Button>View Profile</Button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
