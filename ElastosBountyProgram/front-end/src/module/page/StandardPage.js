import React from 'react';
import BasePage from '@/model/BasePage';
import {Layout} from 'antd';
import Header from '../layout/Header/Container';

export default class extends BasePage {
    ord_renderPage() {
        return (
            <Layout className="p_standardPage">
                <Header/>
                <Layout.Content>
                    {this.ord_renderContent()}
                </Layout.Content>

            </Layout>
        );
    }

    ord_renderContent() {
        return null;
    }
}
