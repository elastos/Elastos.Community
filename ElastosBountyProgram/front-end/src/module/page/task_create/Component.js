import React from 'react';
import StandardPage from '../StandardPage';
import Footer from '@/module/layout/Footer/Container'
import TaskCreateForm from '@/module/form/TaskCreateForm/Container'

import './style.scss'

export default class extends StandardPage {

    ord_renderContent () {

        return (
            <div className="p_Social">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page">
                    <div className="ebp-page-title">
                        <h1>
                            Create Task / Event
                        </h1>
                    </div>
                    <TaskCreateForm />
                </div>
                <Footer />
            </div>
        )
    }
}
