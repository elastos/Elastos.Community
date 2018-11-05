import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {Affix, Layout, Menu, Icon, Badge, Avatar, Modal, Dropdown, Popover, Select} from 'antd'
import _ from 'lodash'
import I18N from '@/I18N'
import MediaQuery from 'react-responsive'
import Flyout from './Flyout';
import {MAX_WIDTH_MOBILE, MIN_WIDTH_PC} from '@/config/constant'
import {USER_ROLE} from '@/constant'
import Flag from 'react-flags'

const {Header} = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

export default class extends BaseComponent {
    constructor() {
        super();
        this.state = {
            affixed: false,
            popover: false
        }
    }
    /*
    buildOverviewDropdown() {
        return (
            <Menu onClick={this.clickItem.bind(this)}>
                <Menu.Item key="developer">
                    {I18N.get('0100')}
                </Menu.Item>
                <Menu.Item key="social">
                    {I18N.get('0101')}
                </Menu.Item>
                <Menu.Item key="leader">
                    {I18N.get('0102')}
                </Menu.Item>
            </Menu>
        )
    }
    */

    buildAcctDropdown() {

        const isLogin = this.props.isLogin
        const hasAdminAccess = [USER_ROLE.ADMIN, USER_ROLE.COUNCIL].includes(this.props.role)

        return (
            <Menu onClick={this.clickItem.bind(this)}>
                {isLogin ?
                    <Menu.Item key="profile/info">
                        {I18N.get('0200')}
                    </Menu.Item> :
                    <Menu.Item key="login">
                        {I18N.get('0201')}
                    </Menu.Item>
                }
                {!isLogin &&
                    <Menu.Item key="register">
                        {I18N.get('0202')}
                    </Menu.Item>
                }
                {isLogin && hasAdminAccess &&
                    <Menu.Item key="admin/tasks">
                        {I18N.get('0203')}
                    </Menu.Item>
                }
                {isLogin &&
                    <Menu.Item key="logout">
                        {I18N.get('0204')}
                    </Menu.Item>
                }
            </Menu>
        )
    }

    buildLanguageDropdown() {
        return (
            <Select defaultValue={I18N.getLang()} style={{ width: 24+11+11 }} onChange={this.props.changeLanguage}>
                <Select.Option value="en">
                    <Flag name="US" format="png"
                        basePath="/assets/images/flags"
                        pngSize={24} shiny={true} alt="English"/>
                </Select.Option>
                <Select.Option value="zh">
                    <Flag name="CN" format="png"
                        basePath="/assets/images/flags"
                        pngSize={24} shiny={true} alt="Chinese"/>
                </Select.Option>
            </Select>
        )
    }

    buildHelpDropdown() {
        const hasAdminAccess = [USER_ROLE.ADMIN, USER_ROLE.COUNCIL].includes(this.props.role)

        return (
            <Menu onClick={this.clickItem.bind(this)} className="help-menu">
                <Menu.Item key="help">
                    {I18N.get('0007')}
                </Menu.Item>
                <Menu.Item key="about">
                    {I18N.get('0008')}
                </Menu.Item>
                <Menu.Item key="faq">
                    {I18N.get('0009')}
                </Menu.Item>

                <Menu.Item key="slack">
                    {I18N.get('0011')}
                </Menu.Item>

                {this.props.isLogin && hasAdminAccess &&
                <Menu.Item key="admin/tasks">
                    {I18N.get('0203')}
                </Menu.Item>
                }

                {this.props.isLogin &&
                <Menu.Item key="logout">
                    {I18N.get('0204')}
                </Menu.Item>
                }
            </Menu>
        )
    }

    getSelectedKeys() {
        const keys = _.map(['cr100', 'crcles', 'ambassadors', 'profile', 'developer', 'social', 'community'], (key) => {
            return ((this.props.pathname || '').indexOf(`/${key}`) === 0) ? key : ''
        })

        return keys
    }

    ord_render() {
        const isLogin = this.props.isLogin

        // const overviewDropdown = this.buildOverviewDropdown()
        const acctDropdown = this.buildAcctDropdown()
        const helpDropdown = this.buildHelpDropdown()
        return (
            <Header className="c_Header">
                <Menu onClick={this.clickItem.bind(this)} className="c_Header_Menu pull-left"
                    selectedKeys={this.getSelectedKeys()} mode="horizontal">
                    <Menu.Item className="c_MenuItem logo" key="landing">
                        <img src="/assets/images/logo.svg" alt="Cyber Republic"/>
                        <div className="alpha-tag dsk">ALPHA</div>
                    </Menu.Item>
                </Menu>

                <Menu className="c_Header_Menu c_Side_Menu pull-right">
                    <Menu.Item className="c_MenuItem help no-margin" key="help">
                        <MediaQuery minWidth={MIN_WIDTH_PC}>
                            <Dropdown overlay={helpDropdown} style="margin-top: 24px;">
                                <a className="ant-dropdown-link">
                                    <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0 0H14V1H0V0ZM0 5H14V6H0V5ZM14 10H0V11H14V10Z" fill="black"/>
                                    </svg>
                                </a>
                            </Dropdown>
                        </MediaQuery>
                    </Menu.Item>
                    <Menu.Item className="c_MenuItem mobile" key="mobileMenu" onClick={this.props.toggleMobileMenu}>
                        <Icon type="menu-fold"/>
                    </Menu.Item>
                    <Menu.Item className="mobile-language-dropdown" style={{marginTop: 13}}>
                        <MediaQuery maxWidth={MAX_WIDTH_MOBILE}>
                            <div className="pull-right language-dropdown mobile">
                                {this.buildLanguageDropdown()}
                            </div>
                        </MediaQuery>
                    </Menu.Item>
                </Menu>

                <MediaQuery minWidth={MIN_WIDTH_PC}>
                    <div className="pull-right language-dropdown">
                        {this.buildLanguageDropdown()}
                    </div>
                </MediaQuery>

                {/*
                <Menu.Item className="c_MenuItem overview">
                    <Dropdown overlay={overviewDropdown} style="margin-top: 24px;">
                        <a className="ant-dropdown-link" href="#">
                            {I18N.get('0001')} <Icon type="down" />
                        </a>
                    </Dropdown>
                </Menu.Item>
                */}
                <Menu onClick={this.clickItem.bind(this)} className="c_Header_Menu pull-right"
                      selectedKeys={this.getSelectedKeys()} mode="horizontal">
                    {/*this.props.isLogin &&
                        <Menu.Item className="c_MenuItem link right" key="profile">
                            {I18N.get('0104')}
                        </Menu.Item>
                    */}

                    <Menu.Item className="c_MenuItem link" key="cr100">
                        {I18N.get('0105')}
                    </Menu.Item>

                    <Menu.Item className="c_MenuItem link" key="crcles">
                        {I18N.get('0106')}
                    </Menu.Item>

                    <Menu.Item className="c_MenuItem link" key="developer">
                        {I18N.get('0102')}
                    </Menu.Item>

                    <Menu.Item className="c_MenuItem link" key="council">
                        {I18N.get('council.0001')}
                    </Menu.Item>

                    <Menu.Item className="c_MenuItem link" key="blog">
                        {I18N.get('0110')}
                    </Menu.Item>

                    <Menu.Item className="c_MenuItem link" key="ambassadors">
                        {I18N.get('0107')}
                    </Menu.Item>

                    { this.props.isLogin ?
                        <Menu.Item className="c_MenuItem link" key="profile">
                            {I18N.get('0104')}
                        </Menu.Item>
                        : <Menu.Item className="c_MenuItem link" key="login">
                            {I18N.get('0201')}
                        </Menu.Item>
                    }

                    {/*
                    <Menu.Item className="c_MenuItem" key="directory">
                        {I18N.get('0003')}
                    </Menu.Item>
                    */}

                    {/*
                    <Menu.Item className="c_MenuItem right-side" key="tasks">
                        {I18N.get('0006')}
                    </Menu.Item>

                    <Menu.Item className="c_MenuItem right-side" key="teams">
                        {I18N.get('0005')}
                    </Menu.Item>
                    */}
                </Menu>
            </Header>
        )
    }

    clickItem(e) {

        const key = e.key

        if (_.includes([
            'landing',
            'home',
            'developer',
            'cr100',
            'crcles',
            'ambassadors',
            'social',
            'leader',
            'community',
            'council',
            'directory',
            'account',
            'teams',
            'tasks',
            'login',
            'register',
            'signup',
            'profile/info',
            'admin/tasks',
            'how-to-earn',
            'help',
            'about',
            'faq',
            'contact',
            'slack',
            'council'
        ], key)) {

            if (key === 'landing') {
                this.props.history.push('/')
            } else {
                this.props.history.push('/' + e.key)
            }

        } else if (key === 'logout') {

            analytics.track('HEADER_CLICKED', {
                action: 'logout',
                url: location.href
            })

            Modal.confirm({
                title: 'Are you sure you want to logout?',
                content: '',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: () => {
                    analytics.track('LOGOUT', {
                        url: location.href
                    })
                    this.props.logout()
                },
                onCancel() {
                }
            })
        } else if (key === 'profile') {
            this.props.history.push('/profile/info')

        } else if (key === 'blog') {

            analytics.track('BLOG_CLICKED', {
                url: location.href
            })

            window.location.href = 'https://blog.cyberrepublic.org'

        } else if (_.includes([
            'en',
            'zh'
        ], key)) {

            analytics.track('LANGUAGE_CHANGED', {
                language: e.key,
                url: location.href
            })

            this.props.changeLanguage(e.key);
        }
    }
}
