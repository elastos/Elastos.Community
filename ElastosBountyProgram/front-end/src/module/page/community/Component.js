import React from 'react';
import StandardPage from '../StandardPage';
import Footer from '@/module/layout/Footer/Container'

import './style.scss'

export default class extends StandardPage {

    ord_renderContent () {

        return (
            <div className="p_Community">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page">
                    <div className="ebp-page-title">
                        <h1>
                            Community
                        </h1>
                    </div>

                    TODO: list of tasks by community
                </div>
                <Footer />
            </div>
        )
    }
}
