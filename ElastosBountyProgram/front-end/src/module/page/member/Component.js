import React from 'react';
import StandardPage from '../StandardPage';
import Footer from '@/module/layout/Footer/Container'
import { Col, Row, Icon } from 'antd'

import './style.scss'

export default class extends StandardPage {

    ord_renderContent () {

        return (
            <div className="p_Directory">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page">
                    <div className="ebp-page-title">

                    </div>

                    TODO: member page
                </div>
                <Footer />
            </div>
        )
    }
}
