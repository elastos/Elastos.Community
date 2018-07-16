import React from 'react';
import EmptyPage from '../EmptyPage';
import _ from 'lodash'

import './style.scss'

import { Col, Row, List, Button } from 'antd'
import Footer from '@/module/layout/Footer/Container'
import moment from 'moment/moment'

export default class extends EmptyPage {

    ord_renderContent(){

        return <div className="p_landingBg">

            <div className="entryContainer" onClick={() => this.props.history.push('/home')}>

                <div className="textContainer">
                    We are a diverse democratic group of leaders, developers, organizers and designers<br/>
                    formed to promote Elastos in our communities. Membership is open to everyone.
                </div>
                <div className="bar bar1"/>
                <div className="bar bar2"/>

                <div className="continueContainer" onClick={() => this.props.history.push('/home')}>
                    Join the <span style={{fontWeight: 600}}>Cyber Republic</span>
                </div>
                <div className="arrow" onClick={() => this.props.history.push('/home')}/>
            </div>

        </div>

    }
}
