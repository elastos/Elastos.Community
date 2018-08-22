import React from 'react';
import BaseComponent from '@/model/BaseComponent';
import { Col, Row, Icon, Avatar } from 'antd'

import './style.scss'

export default class extends BaseComponent {
    ord_render() {
        return (
            <div className="c_Footer">
                <div className="horizGap">

                </div>
                <div className="footer-box">
                    <Row className="d_rowFooter d_footerSection">
                        <Col span={6}>
                            <img className="logo_own" src="/assets/images/logo_own.png"/>
                        </Col>
                        <Col span={4}>
                            <div className="links footer-vertical-section">
                                <div className="title brand-color">
                                    Links
                                </div>
                                <div><a href="https://wallet.elastos.org/">Wallet</a></div>
                                <div><a href="https://blockchain.elastos.org/status">Block Explorer</a></div>
                                <div><a href="https://github.com/elastos" target="_blank">GitHub</a></div>
                                <div><a href="https://github.com/elastos/Elastos.Community/tree/master/CyberRepublicLogoAssets" target="_blank">Logo Assets</a></div>
                                <div><a href="https://elanews.net/">ELA News</a></div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="contact footer-vertical-section">
                                <div className="title brand-color">
                                    Contact
                                </div>
                                <div className="footer-color-dark">Cyber Republic: <a href="mailto:cyberrepublic@elastos.org">cyberrepublic@elastos.org</a></div>
                                <div className="footer-color-dark">Global Community: <a href="mailto:global-community@elastos.org">global-community@elastos.org</a></div>
                                <div className="footer-color-dark">Support: <a href="mailto:support@elastos.org">support@elastos.org</a></div>
                                <div className="footer-color-dark">Other Contacts: <a href="mailto:contact@elastos.org">contact@elastos.org</a></div>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className="join footer-vertical-section">
                                <div className="title brand-color">
                                    Join Us On
                                </div>
                                <a href="https://t.me/elastosgroup" target="_blank"><Avatar shape="square" size={64} className="icon icon-paper-plane"/></a>                                    
                                <a href="https://github.com/elastos" target="_blank"><Avatar shape="square" size={64} className="icon icon-github"/></a>
                                <a href="https://discordapp.com/invite/MHSUVZN" target="_blank"><Avatar shape="square" size={64} className="icon icon-crabface"/></a>
                                <a href="https://twitter.com/Elastos_org" target="_blank"><Avatar shape="square" size={64} className="icon icon-twitter"/></a>
                                <a href="https://elastos.slack.com/" target="_blank"><Avatar shape="square" size={64} className="icon icon-slack"/></a>
                                <a href="https://www.reddit.com/r/Elastos/" target="_blank"><Avatar shape="square" size={64} className="icon icon-reddit-alien"/></a>
                                <a href="https://www.youtube.com/channel/UCy5AjgpQIQq3bv8oy_L5WTQ/" target="_blank"><Avatar shape="square" size={64} className="icon icon-youtube-play"/></a>
                                <a href="https://www.instagram.com/elastosofficial/" target="_blank"><Avatar shape="square" size={64} className="icon icon-instagram"/></a>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}