import React from 'react'
import BasePage from '@/model/BasePage'
import { Layout } from 'antd'
import Header from '../../layout/Admin/Header/Container'

export default class extends BasePage {
    ord_renderPage () {
        // TODO check login and role before allow access this
        // if (!this.props.is_login) {
        //     return this.props.history.replace('/login');
        // }

        return (
            <Layout className="p_adminPage">
                <Header/>
                <Layout.Content>
                    {this.ord_renderContent()}
                </Layout.Content>
            </Layout>
        )
    }

    ord_renderContent () {
        return null
    }
}
