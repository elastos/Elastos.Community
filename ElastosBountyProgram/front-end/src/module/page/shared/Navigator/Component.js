import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Affix, Menu, SubMenu } from 'antd'
import MediaQuery from "react-responsive"
import I18N from '@/I18N'
import { Link } from 'react-router-dom';

import './style.scss'
import {MAX_WIDTH_MOBILE, MIN_WIDTH_PC} from "../../../../config/constant"

export default class extends BaseComponent {

    handleMenuClick(item, key, keyPath) {

        switch (item.key) {
            case 'profileInfo':
                this.props.history.push('/profile/info')
                break
            case 'profileCommunities':
                this.props.history.push('/profile/communities')
                break
        }
    }

    ord_render () {
        // TODO check why we can not use redirect use this.props.history
        return (
            <div className="navigator">
                <MediaQuery minWidth={MIN_WIDTH_PC}>
                    <Affix offsetTop={15}>
                        <Menu
                            defaultSelectedKeys={[this.props.selectedItem]}
                            onClick={this.handleMenuClick.bind(this)}
                            mode="inline"
                        >
                            <Menu.Item key="profileInfo">
                                {I18N.get('2300')}
                            </Menu.Item>
                            <Menu.Item key="profileCommunities">
                                {I18N.get('2304')}
                            </Menu.Item>
                        </Menu>
                    </Affix>
                </MediaQuery>
                <MediaQuery maxWidth={MAX_WIDTH_MOBILE}>
                    <Menu
                        defaultSelectedKeys={[this.props.selectedItem]}
                        onClick={this.handleMenuClick.bind(this)}
                        mode="horizontal"
                    >
                        <Menu.Item key="profileInfo">
                            {I18N.get('2300')}
                        </Menu.Item>
                        <Menu.Item key="profileCommunities">
                            {I18N.get('2304')}
                        </Menu.Item>
                    </Menu>
                </MediaQuery>
            </div>
        )
    }
}
