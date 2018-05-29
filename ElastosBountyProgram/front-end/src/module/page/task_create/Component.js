import React from 'react';
import StandardPage from '../StandardPage';
import Footer from '@/module/layout/Footer/Container'
import TaskCreateForm from '@/module/form/TaskCreateForm/Container'

export default class extends StandardPage {

    ord_renderContent () {

        return (
            <div className="p_Social">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page-title">
                    <h2>
                        Create Task / Event
                    </h2>
                </div>
                <div className="ebp-page">
                    <TaskCreateForm />
                </div>
                <Footer />
            </div>
        )
    }
}
