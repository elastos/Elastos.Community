import React from 'react';
import StandardPage from '../StandardPage';
import Footer from '@/module/layout/Footer/Container'

import './style.scss'

import { Col, Row, Icon, Form, Input, Button, Dropdown } from 'antd'
const FormItem = Form.Item;

export default class extends StandardPage {

    ord_renderContent () {

        return (
            <div className="p_Tasks">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page">
                    <div className="ebp-page-title">
                        <h1>
                            Task Lookup
                        </h1>
                    </div>

                    TODO: more powerful task search page
                </div>
                <Footer />
            </div>
        )
    }
}
