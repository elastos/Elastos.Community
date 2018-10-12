import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import I18N from '@/I18N'
import './style.scss'
import { Col, Row, Card, Button, message, Tabs, Modal } from 'antd'
const TabPane = Tabs.TabPane;

import _ from 'lodash'
import {USER_EMPOWER_TYPE} from '@/constant'

import CouncilList from './list/Container'
import CVoteList from '../CVote/list/Container'


/**
 * TODO: all the positions should load from the DB, copy pasting for now
 * until applications are being processed
 */
export default class extends StandardPage {

    constructor(props) {
        super(props)

        this.state = {

            // save the page you are on
            subpage: this.props.subpage || 'list',
            loading: false
        }
    }

    ord_renderContent () {
        return (
            <div className="p_council">

                <Tabs defaultActiveKey={this.state.subpage}>
                    <TabPane key="list" tab="list">
                        <CouncilList/>
                    </TabPane>
                    <TabPane key="vote" tab="vote">
                        <CVoteList/>
                    </TabPane>
                </Tabs>

                <Footer/>
            </div>
        )
    }
}
