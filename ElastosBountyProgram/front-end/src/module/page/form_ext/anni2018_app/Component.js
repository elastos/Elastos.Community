import React from 'react';
import StandardPage from '../../StandardPage';
import Footer from '@/module/layout/Footer/Container'
import AnniversaryAppForm from '@/module/form/AnniversaryEventForm/Container'
import {Row, Col} from 'antd'

export default class extends StandardPage {

    ord_renderContent () {

        return (
            <div className="p_Social">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page-title">
                    <h3>
                        Elastos 2018 Anniversary Event Application
                    </h3>

                    <p>
                        <span class="no-info">Location:</span> Chiang Mai, Thailand <br/>
                        <span className="no-info">Event Dates:</span> Aug 24 - 27, 2018
                    </p>
                </div>
                <div className="ebp-page">
                    <AnniversaryAppForm/>
                </div>
                <Footer />
            </div>
        )
    }
}
