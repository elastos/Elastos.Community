import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import { Button, Icon } from 'antd'

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
                    <div className="back-btn-container">
                        <Button onClick={() => { this.props.history.goBack() }}>
                            <Icon type="left" /> Back
                        </Button>
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
