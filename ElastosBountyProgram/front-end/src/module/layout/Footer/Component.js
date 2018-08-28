import React from 'react';
import BaseComponent from '@/model/BaseComponent';
import { Col, Row, Avatar } from 'antd'

import './style.scss'

export default class extends BaseComponent {
    ord_render() {
        return (
            <div className="c_Footer">
                <div className="horizGap">

                </div>
                <div className="footer-box">
                    <Row className="d_rowFooter d_footerSection">
                        <Col xs={24} sm={12} md={5}>
                            <img className="logo_own" src="/assets/images/footer-shield.svg"/>
                        </Col>
                        <Col xs={24} sm={12} md={5}>
                            <div className="links footer-vertical-section">
                                <div className="title brand-color">
                                    Links
                                </div>
                                <div><a href="/vision" target="_blank">Our Vision</a></div>
                                <div><a href="https://wallet.elastos.org/">Wallet</a></div>
                                <div><a href="https://blockchain.elastos.org/status">Block Explorer</a></div>
                                <div><a href="https://github.com/elastos" target="_blank">GitHub</a></div>
                                <div><a href="https://github.com/elastos/Elastos.Community/tree/master/CyberRepublicLogoAssets" target="_blank">Logo Assets</a></div>
                                <div><a href="https://elanews.net/">ELA News</a></div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={7}>
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
                        <Col xs={24} sm={24} md={7}>
                            <div className="join footer-vertical-section">
                                <div className="title brand-color">
                                    Join Us On
                                </div>
                                <div className="social-icons">
                                    <a href="https://t.me/elastosgroup" target="_blank"><i className="fab fa-telegram fa-2x"/></a>
                                    <a href="https://github.com/elastos" target="_blank"><i className="fab fa-github fa-2x"/></a>
                                    <a href="https://discordapp.com/invite/MHSUVZN" target="_blank"><i className="fab fa-discord fa-2x"/></a>
                                    <a href="https://twitter.com/Elastos_org" target="_blank"><i className="fab fa-twitter fa-2x"/></a>
                                    <a href="https://elastos-ebp.slack.com/" target="_blank"><i className="fab fa-slack fa-2x"/></a>
                                    <a href="https://www.reddit.com/r/Elastos/" target="_blank"><i className="fab fa-reddit fa-2x"/></a>
                                    <a href="https://www.youtube.com/channel/UCy5AjgpQIQq3bv8oy_L5WTQ/" target="_blank"><i className="fab fa-youtube fa-2x"/></a>
                                    <a href="https://www.instagram.com/elastosofficial/" target="_blank"><i className="fab fa-instagram fa-2x"/></a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
