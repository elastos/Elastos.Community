import React from 'react';
import StandardPage from '../../StandardPage';
import Footer from '@/module/layout/Footer/Container'
import OrganizerAppForm from '@/module/form/OrganizerAppForm/Container'

export default class extends StandardPage {

    ord_renderContent () {

        return (
            <div className="p_Social">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page-title">
                    <h3>
                        Organizer Application
                    </h3>
                </div>
                <div className="ebp-page">
                    <OrganizerAppForm campaign="organizerApp"/>
                </div>
                <Footer />
            </div>
        )
    }
}
