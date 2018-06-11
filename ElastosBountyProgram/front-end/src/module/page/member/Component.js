import React from 'react';
import StandardPage from '../StandardPage';
import Footer from '@/module/layout/Footer/Container'
import { Col, Row, Icon } from 'antd'

import PublicProfileDetail from '@/module/profile/detail/Container'

import './style.scss'

export default class extends StandardPage {

    async componentDidMount() {
        this.setState({loading: true})
        const userId = this.props.match.params.userId
        const member = await this.props.getMember(userId)
        this.setState({
            loading: false,
            member: member
        })
    }

    ord_renderContent () {

        return (
            <div className="p_Member">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page">
                    <div className="ebp-page-title">

                    </div>

                    {!this.state.loading &&
                    <PublicProfileDetail member={this.state.member}/>
                    }
                </div>
                <Footer />
            </div>
        )
    }
}
