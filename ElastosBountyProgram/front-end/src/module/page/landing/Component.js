import React from 'react'
import EmptyPage from '../EmptyPage'
import _ from 'lodash'
import I18N from '@/I18N'

import './style.scss'

import { Col, Row, List, Button } from 'antd'
import Footer from '@/module/layout/Footer/Container'
import moment from 'moment/moment'

export default class extends EmptyPage {

    ord_renderContent () {

        return <div className="p_landingBg">
            <div id="loader">
                <div className="load-clip">
                    <div className="logo-text part"><img src="assets/images/logo-text.svg"/></div>
                    <div className="logo-mark part"><img src="assets/images/logo-mark.svg"/></div>
                </div>
            </div>


            <header id="globalHeader">
                <div className="contentContainer">


                    <div className="logo sized">
                        <img src="assets/images/logo.svg" alt="Cyber Republic" className="dsk"/>
                        <img src="assets/images/logo-mark.svg" className="mob"/>
                    </div>


                    <nav className="toplinks">
                        <ul>
                            <li><a href="/cr100">CR100</a></li>
                            <li><a href="/empower35">Empower35</a></li>
                            <li><a href="/evangelist-training">Training</a></li>
                            <li><a href="/developer">Community</a></li>
                            <li><a href="/profile/teams">My Republic</a></li>

                            <li className="hasIcon">
                                <span className="txt">Play Video</span>
                                <div className="arrow-btn">
                                    <div className="arrow-circle"><img src="assets/images/arrow-submit.svg"/></div>
                                    <div className="arrow-border"></div>
                                </div>
                                <a href="#" className="video-btn"></a>
                            </li>
                        </ul>
                    </nav>

                </div>
            </header>


            <div id="globalMenu">

                <div className="menu-btn">
                    <div className="logo-mark sized"><img src="assets/images/logo-mark.svg"/></div>

                    <div className="menu-lines">
                        <div className="menu-row top">
                            <div className="menu-line" data-num="1"></div>
                            <div className="menu-line" data-num="2"></div>
                            <div className="menu-line" data-num="3"></div>
                        </div>
                        <div className="menu-row mid">
                            <div className="menu-line" data-num="1"></div>
                            <div className="menu-line" data-num="2"></div>
                        </div>
                        <div className="menu-row bot">
                            <div className="menu-line" data-num="1"></div>
                            <div className="menu-line" data-num="2"></div>
                            <div className="menu-line" data-num="3"></div>
                        </div>
                    </div>
                </div>

                <div className="menu-bg"></div>

                <div className="menu-wrap">

                    <div className="mobile-top">
                        <li className="hasIcon">
                            <span className="txt">Play Video</span>
                            <div className="arrow-btn">
                                <div className="arrow-circle"><img src="assets/images/arrow-submit.svg"/></div>
                                <div className="arrow-border"></div>
                            </div>
                            <a href="#" className="video-btn"></a>
                        </li>
                    </div>

                    <nav className="toplinks">
                        <ul>
                            <li><a href="/cr100">CR100</a></li>
                            <li><a href="/empower35">Empower35</a></li>
                            <li><a href="/evangelist-training">Training</a></li>
                            <li><a href="/community">Community</a></li>
                            <li><a href="/profile/teams">My Republic</a></li>

                            <li className="hasIcon">
                                <span className="txt">Play Video</span>
                                <div className="arrow-btn">
                                    <div className="arrow-circle"><img src="assets/images/arrow-submit.svg"/></div>
                                    <div className="arrow-border"></div>
                                </div>
                                <a href="#" className="video-btn"></a>
                            </li>
                        </ul>
                    </nav>

                    <div className="hline top mob"></div>

                    <div className="form-wrap mob">
                        <p>Stay up to date with Cyber Republic</p>
                        <form id="menu-form-mob" className="signup-form" name="mailing-list"
                              action="https://cyberrepublic.us19.list-manage.com/subscribe/post-json?u=acb5b0ce41bfe293d881da424&id=272f303492" method="get">
                            <div className="email-wrap">
                                <input type="email" name="EMAIL" data-type="req" placeholder="Enter Email"/>
                                <button type="submit" className="arrow-submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 34">
                                        <polygon points="0 0 0 33.487 16.744 16.744 0 0" style={{fill: '#1de9b6'}}/>
                                        <polygon points="0 24.579 7.835 16.744 0 8.91 0 24.579" className="small-tri"/>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="hline mob"></div>

                    <div className="contentContainer">
                        <div className="bgtext part"><img src="assets/images/menu-bgtext.svg"/></div>
                        <div className="mob-side1 mob sized"><img src="assets/images/mobile-sideimg1@2x.png"/></div>

                        <div className="row main spaced">

                            <div className="col left">
                                <nav id="globalNav">
                                    <ul>
                                        <li><a href="#what">What is Elastos?</a></li>
                                        <li><a href="#cr100">CR100</a></li>
                                        <li><a href="#solution">The Elastos Solution</a></li>
                                        <li><a href="#pillars">The Four Pillars</a></li>
                                        <li><a href="#model">The Elastos Business Model</a></li>
                                        <li><a href="#applications">Applications</a></li>
                                        <li><a href="#token">Elastos Token (ELA)</a></li>
                                        <li><a href="#cyber">Become a Contributor</a></li>
                                        <li><a href="#team">Empower35</a></li>
                                    </ul>
                                </nav>
                            </div>

                            <div className="hline mob"></div>

                            <div className="col right">
                                <div className="txt">
                                    <p className="intro">Elastos is a “Cyber Republic” that enables wealth<br/> generation through the ownership and exchange<br/> of data and digital assets.</p>

                                    <div className="form-wrap dsk">
                                        <p>Stay up to date with Cyber Republic</p>
                                        <form id="menu-form" className="signup-form" name="mailing-list"
                                              action="https://cyberrepublic.us19.list-manage.com/subscribe/post-json?u=acb5b0ce41bfe293d881da424&id=272f303492" method="get">
                                            <div className="email-wrap">
                                                <input type="email" name="EMAIL" data-type="req" placeholder="Enter Email"/>
                                                <button type="submit" className="arrow-submit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 34">
                                                        <polygon points="0 0 0 33.487 16.744 16.744 0 0" style={{'fill': '#1de9b6'}}/>
                                                        <polygon points="0 24.579 7.835 16.744 0 8.91 0 24.579" className="small-tri"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="menu-cols spaced">
                                        <div className="col left">
                                            <ul className="resources">
                                                <li className="title">Resources</li>
                                                <li><a href="https://wallet.elastos.org/">Wallet</a></li>
                                                <li><a href="https://blockchain.elastos.org/status">Block Explorer</a></li>
                                                <li><a href="https://github.com/elastos" target="_blank">GitHub</a></li>
                                                <li><a href="https://github.com/elastos/Elastos.Community/tree/master/CyberRepublicLogoAssets" target="_blank">Logo Assets</a></li>
                                                <li><a href="https://elanews.net/">ELA News</a></li>
                                            </ul>
                                            <div className="shield mob"><img src="assets/images/footer-shield.svg" className="spacer"/></div>
                                        </div>

                                        <div className="col right contact">
                                            <ul>
                                                <li>Cyber Republic: <a href="mailto:cyberrepublic@elastos.org">cyberrepublic@elastos.org</a></li>
                                                <li>Global Community: <a href="mailto:global-community@elastos.org">global-community@elastos.org</a></li>
                                                <li>Support: <a href="mailto:support@elastos.org">support@elastos.org</a></li>
                                                <li>Other Contacts: <a href="mailto:contact@elastos.org">contact@elastos.org</a></li>
                                            </ul>
                                            <div className="mob-side2 mob sized"><img src="assets/images/mobile-sideimg2@2x.png"/></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ul className="social mob">
                                <li className="title">Join Us On</li>
                                <li><a href="https://t.me/elastosgroup" target="_blank"><span className="icon icon-paper-plane"></span></a></li>
                                <li><a href="https://github.com/elastos" target="_blank"><span className="icon icon-github"></span></a></li>
                                <li><a href="https://discordapp.com/invite/MHSUVZN" target="_blank"><span className="icon icon-crabface"></span></a></li>
                                <li><a href="https://twitter.com/Elastos_org" target="_blank"><span className="icon icon-twitter"></span></a></li>
                                <li className="mob"></li>
                                <li><a href="https://elastos.slack.com/" target="_blank"><span className="icon icon-slack"></span></a></li>
                                <li><a href="https://www.reddit.com/r/Elastos/" target="_blank"><span className="icon icon-reddit-alien"></span></a></li>
                                <li><a href="https://www.youtube.com/channel/UCy5AjgpQIQq3bv8oy_L5WTQ/" target="_blank"><span className="icon icon-youtube-play"></span></a></li>
                                <li><a href="https://www.instagram.com/elastosofficial/" target="_blank"><span className="icon icon-instagram"></span></a></li>
                            </ul>

                        </div>
                    </div>
                </div>

            </div>





            <div className="sticky">
                <div className="bg"></div>

                <div className="contentContainer">
                    <nav className="toplinks">
                        <ul>
                            <li><a href="/cr100">CR100</a></li>
                            <li><a href="/empower35">Empower35</a></li>
                            <li><a href="/evangelist-training">Training</a></li>
                            <li><a href="/community">Community</a></li>
                            <li><a href="/profile/teams">My Republic</a></li>

                            <li className="hasIcon">
                                <span className="txt">Play Video</span>
                                <div className="arrow-btn">
                                    <div className="arrow-circle"><img src="assets/images/arrow-submit.svg"/></div>
                                    <div className="arrow-border"></div>
                                </div>
                                <a href="#" className="video-btn"></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>









            <section id="hero" className="hasAnim">
                <div className="bg-wrap">
                    <div className="background">
                        <div className="layer base"><img src="assets/images/hero-base.svg"/></div>

                        <h1>Powering Cyber Republic.</h1>




                        <div className="cardfly-wrap part-wrap" data-num="1">
                            <div className="cardfly part" data-num="1"><img src="assets/images/parts/cardfly1.svg"/></div>
                            <div className="cardfly part" data-num="2"><img src="assets/images/parts/cardfly2.svg"/></div>
                            <div className="cardfly part" data-num="3"><img src="assets/images/parts/cardfly3.svg"/></div>
                        </div>
                        <div className="cardfly-wrap part-wrap" data-num="2">
                            <div className="cardfly part" data-num="1"><img src="assets/images/parts/cardfly2.svg"/></div>
                            <div className="cardfly part" data-num="2"><img src="assets/images/parts/cardfly3.svg"/></div>
                            <div className="cardfly part" data-num="3"><img src="assets/images/parts/cardfly1.svg"/></div>
                        </div>
                        <div className="cardfly-wrap part-wrap" data-num="3">
                            <div className="cardfly part" data-num="1"><img src="assets/images/parts/cardfly3.svg"/></div>
                            <div className="cardfly part" data-num="2"><img src="assets/images/parts/cardfly1.svg"/></div>
                            <div className="cardfly part" data-num="3"><img src="assets/images/parts/cardfly2.svg"/></div>
                        </div>
                        <div className="cardfly-wrap part-wrap" data-num="4">
                            <div className="cardfly part" data-num="1"><img src="assets/images/parts/cardfly1.svg"/></div>
                            <div className="cardfly part" data-num="2"><img src="assets/images/parts/cardfly3.svg"/></div>
                            <div className="cardfly part" data-num="3"><img src="assets/images/parts/cardfly2.svg"/></div>
                        </div>
                        <div className="cardfly-wrap part-wrap" data-num="5">
                            <div className="cardfly part" data-num="1"><img src="assets/images/parts/cardfly3.svg"/></div>
                            <div className="cardfly part" data-num="2"><img src="assets/images/parts/cardfly2.svg"/></div>
                            <div className="cardfly part" data-num="3"><img src="assets/images/parts/cardfly1.svg"/></div>
                        </div>




                        <div className="static-lines"></div>




                        <div className="glow-line" data-num="1">
                            <div className="glow-ball"></div>
                        </div>
                        <div className="glow-line" data-num="2">
                            <div className="glow-ball"></div>
                        </div>
                        <div className="glow-line" data-num="3">
                            <div className="glow-ball"></div>
                        </div>
                        <div className="glow-line" data-num="4">
                            <div className="glow-ball"></div>
                        </div>


                    </div>
                </div>

                <div className="contentContainer">
                    <h1 className="mob">Elastos</h1>
                    <h2 className="mob">Powering Cyber Republic.</h2>
                    <div className="cta-btn">
                        <p>Join us on <strong>GitHub</strong></p>
                        <div className="arrow sized"><img src="assets/images/arrow.svg"/></div>
                        <a href="https://github.com/elastos" target="_blank"></a>
                    </div>
                </div>
            </section>






            <section id="what" className="hasAnim">

                <div className="contentContainer expanded">
                    <div className="row main spaced">
                        <div className="col left">
                            <div className="txt">
                                <header>
                                    <div className="tri-square sized"><img src="assets/images/tri-square.svg"/></div>
                                    <h3>What is Elastos?</h3>
                                </header>

                                <p>Elastos is the first completely safe and decentralized environment on the internet. Built with blockchain, it provides a virtual ecosystem where decentralized
                                    applications are protected from direct access with the internet while allowing near infinite scalability to billions of users.</p>
                                <p>Elastos is a “Cyber Republic” that enables wealth generation through the ownership and exchange of data and digital assets.</p>
                            </div>
                        </div>
                        <div className="col right">
                            <div className="scale-wrap">
                                <img src="assets/images/what-spacer.png" className="spacer"/></div>

                            <div className="background">




                                <div className="burst part" data-num="1"><img src="assets/images/what-burst@2x.png"/></div>
                                <div className="burst part" data-num="2"><img src="assets/images/what-burst@2x.png"/></div>




                                <div className="layer base"><img src="assets/images/what-base@2x.png"/></div>




                                <div className="radio-group" data-num="1"></div>
                                <div className="radio-group" data-num="2"></div>
                                <div className="radio-group" data-num="3"></div>
                                <div className="radio-group" data-num="4"></div>
                                <div className="radio-group" data-num="5"></div>




                                <div className="glow-line" data-num="1">
                                    <div className="glow-ball"></div>
                                </div>
                                <div className="glow-line" data-num="2">
                                    <div className="glow-ball"></div>
                                </div>
                                <div className="glow-line" data-num="3">
                                    <div className="glow-ball"></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div id="cr100" className="callout-text">
                    <div className="contentContainer">
                        <div className="bg-square"></div>
                        <div className="txt">
                            <h2 className="hasStatic">Welcome to the Internet of<br/> Everything, where security<br/> & freedom are by design</h2>

                            <div className="strike-text dsk">
                                <div className="strike-line"></div>
                                <p>Join Us in Building the First 100 Projects</p>
                            </div>

                            <div className="strike-text mob">
                                <div className="strike-line"></div>
                                <p>Join Us in Building the First 100 Projects</p>
                            </div>

                        </div>
                    </div>
                    <div className="cta-btn">
                        <p>View the <strong>CR100</strong></p>
                        <div className="arrow sized"><img src="assets/images/arrow.svg"/></div>
                        <a href="/cr100"></a>
                    </div>
                </div>

            </section>





            <section id="solution">
                <div className="contentContainer">

                    <header>
                        <div className="tri-square sized"><img src="assets/images/tri-square.svg"/></div>
                        <h3>The Elastos Solution</h3>
                    </header>

                    <div className="row spaced" data-num="1">
                        <div className="col left">
                            <div className="scale-group">
                                <div className="arc-plus sized"><img src="assets/images/arc-plus.svg"/></div>
                                <div className="illus sized"><img src="assets/images/solution-illus1.svg"/></div>
                            </div>
                        </div>
                        <div className="col right">
                            <p><strong>Scalability</strong></p>
                            <div className="strike-text">
                                <div className="strike-line"></div>
                                <p>Main Chain + Sidechain Structure</p>
                            </div>
                            <p>The main chain handles basic payments and hash storage. Everything else, including smart contracts, run on sidechains where applications have the ability to create
                                additional sidechains.</p>
                        </div>
                    </div>

                    <div className="row spaced" data-num="2">
                        <div className="col left">
                            <p><strong>Security</strong></p>
                            <div className="strike-text">
                                <div className="strike-line"></div>
                                <p>Merge Mining</p>
                            </div>
                            <p>Elastos is merge mined with Bitcoin to reduce energy consumption and provide the Bitcoin network security to all applications. Sidechains are included thereby utilizing
                                Bitcoin hashpower in multiple chains at once.</p>
                        </div>
                        <div className="col right">
                            <div className="scale-group">
                                <div className="illus sized"><img src="assets/images/solution-illus2.svg"/></div>
                                <div className="arc-plus sized"><img src="assets/images/arc-plus.svg"/></div>
                            </div>
                        </div>
                    </div>

                    <div className="row spaced" data-num="3">
                        <div className="col left">
                            <div className="scale-group">
                                <div className="arc-plus sized"><img src="assets/images/arc-plus.svg"/></div>
                                <div className="illus sized"><img src="assets/images/solution-illus3.svg"/></div>
                            </div>
                        </div>
                        <div className="col right">
                            <p><strong>Consensus</strong></p>
                            <div className="strike-text">
                                <div className="strike-line"></div>
                                <p>Multiple Consensus Methods</p>
                            </div>
                            <p>Employing PoW+DPoS as a consensus model for the Elastos Blockchain, sidechains may choose POW merge mining with ELA or between consensus models such as PoS, DPoS, DBFT, and
                                others.</p>
                        </div>
                    </div>

                </div>
            </section>

            <section id="pillars" className="hasAnim">
                <div className="contentContainer">

                    <header>
                        <div className="tri-square sized"><img src="assets/images/tri-square.svg"/></div>
                        <h3>The Four Pillars<span className="dsk"> of The Elastos Smart Web</span></h3>
                    </header>

                    <div className="pillar-boxes spaced">
                        <div className="pillar-box left" data-num="1">
                            <div className="pillar-type"><img src="assets/images/pillars-text1.svg"/></div>
                            <div className="contents">


                                <div className="illus">
                                    <img src="assets/images/pillars-illus1.svg" className="spacer"/>




                                    <div className="dot-wrap part-wrap" data-num="1">
                                        <div className="dot part"><img src="assets/images/parts/pillar1-dot.svg"/></div>
                                    </div>
                                    <div className="dot-wrap part-wrap" data-num="2">
                                        <div className="dot part"><img src="assets/images/parts/pillar1-dot.svg"/></div>
                                    </div>
                                    <div className="dot-wrap part-wrap" data-num="3">
                                        <div className="dot part"><img src="assets/images/parts/pillar1-dot.svg"/></div>
                                    </div>




                                    <div className="lock-group" data-num="1">
                                        <div className="lock top part">
                                            <div className="locktop"><img src="assets/images/parts/pillar1-locktop.svg"/></div>
                                            <div className="lock-line"></div>
                                        </div>
                                        <div className="lock bot part"><img src="assets/images/parts/pillar1-lockbot.svg"/></div>
                                    </div>
                                    <div className="lock-group" data-num="2">
                                        <div className="lock top part">
                                            <div className="locktop"><img src="assets/images/parts/pillar1-locktop.svg"/></div>
                                            <div className="lock-line"></div>
                                        </div>
                                        <div className="lock bot part"><img src="assets/images/parts/pillar1-lockbot.svg"/></div>
                                    </div>
                                    <div className="lock-group" data-num="3">
                                        <div className="lock top part">
                                            <div className="locktop"><img src="assets/images/parts/pillar1-locktop.svg"/></div>
                                            <div className="lock-line"></div>
                                        </div>
                                        <div className="lock bot part"><img src="assets/images/parts/pillar1-lockbot.svg"/></div>
                                    </div>
                                </div>


                                <p><strong>Elastos Blockchain</strong></p>
                                <p>Establishing trust on the Internet by<br/> building a decentralized Smart Web<br/> where devices, individuals, websites<br/> and digital assets have trustworthy IDs.</p>
                            </div>
                        </div>
                        <div className="pillar-box right" data-num="2">
                            <div className="pillar-type"><img src="assets/images/pillars-text2.svg"/></div>
                            <div className="contents">
                                <div className="illus">
                                    <img src="assets/images/pillars-illus2.svg" className="spacer"/>



                                    <div className="box-wrap part-wrap" data-num="1">
                                        <div className="box part"><img src="assets/images/parts/pillar2-block.svg"/></div>
                                    </div>
                                    <div className="box-wrap part-wrap" data-num="2">
                                        <div className="box part"><img src="assets/images/parts/pillar2-block.svg"/></div>
                                    </div>
                                    <div className="box-wrap part-wrap" data-num="3">
                                        <div className="box part"><img src="assets/images/parts/pillar2-block.svg"/></div>
                                    </div>




                                    <div className="type-wrap part-wrap">
                                        <div className="type part"><img src="assets/images/parts/pillar2-type.svg"/></div>
                                    </div>




                                    <div className="shine part"><img src="assets/images/parts/pillar2-shine.svg"/></div>

                                </div>

                                <p><strong>Elastos Runtime</strong></p>
                                <p>A lightweight operating system that<br/> can run on mobile devices or PCs<br/> that prevents applications from<br/> directly accessing the internet.</p>
                            </div>
                        </div>
                    </div>

                    <div className="pillar-boxes spaced">
                        <div className="pillar-box left" data-num="3">
                            <div className="pillar-type"><img src="assets/images/pillars-text3.svg"/></div>
                            <div className="contents">
                                <div className="illus">
                                    <img src="assets/images/pillars-illus3.svg" className="spacer"/>




                                    <div className="scanner">
                                        <div className="line"></div>
                                        <div className="line"></div>
                                        <div className="line"></div>
                                    </div>




                                    <div className="dot-group">
                                        <div className="dot" data-num="1"></div>
                                        <div className="dot" data-num="2"></div>
                                    </div>




                                    <div className="graph-wrap part-wrap">
                                        <div className="graph part"><img src="assets/images/parts/pillar3-graphline.svg"/></div>
                                    </div>

                                </div>

                                <p><strong>Elastos Software<br className="mob"/> Development Kit</strong></p>
                                <p>Used to access IDs and Elastos<br/> Carrier service on the Smart Web.</p>
                            </div>
                        </div>
                        <div className="pillar-box right" data-num="4">
                            <div className="pillar-type"><img src="assets/images/pillars-text4.svg"/></div>
                            <div className="contents">
                                <div className="illus">
                                    <img src="assets/images/pillars-illus4.svg" className="spacer base"/>




                                    <div className="dot-group" data-num="1">
                                        <div className="dot" data-num="1"></div>
                                        <div className="dot" data-num="2"></div>
                                    </div>
                                    <div className="dot-group" data-num="2">
                                        <div className="dot" data-num="1"></div>
                                        <div className="dot" data-num="2"></div>
                                    </div>
                                    <div className="dot-group" data-num="3">
                                        <div className="dot" data-num="1"></div>
                                        <div className="dot" data-num="2"></div>
                                    </div>




                                    <div className="curve-path" data-num="1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.86413 112.88758"><title>pillar4-curve1</title>
                                            <path id="pillar-path1"
                                                  d="M.681,112.88758V15.74908A10.87551,10.87551,0,0,1,11.55651,4.87357h0A10.87551,10.87551,0,0,1,22.43207,15.74906V68.25822h0A10.87551,10.87551,0,0,0,33.30756,79.13374h0a10.87551,10.87551,0,0,0,10.8755-10.87552V0"
                                                  style={{
                                                      fill: 'none',
                                                      stroke: '#1de9b6',
                                                      'strokeMiterlimit': 10,
                                                      'strokeWidth': '1.36px'
                                                  }}/>
                                        </svg>
                                        <div className="dot path-move" data-num="1"></div>
                                    </div>
                                    <div className="curve-path" data-num="2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66.61518 124.64787"><title>pillar4-curve2</title>
                                            <path id="pillar-path2"
                                                  d="M.681,0V68.93029a10.87549,10.87549,0,0,0,10.87547,10.8755h0A10.87555,10.87555,0,0,0,22.43206,68.93024V38.2958A10.87568,10.87568,0,0,1,33.30765,27.42025h0A10.87548,10.87548,0,0,1,44.18316,38.2957v74.79559a10.87556,10.87556,0,0,0,10.8755,10.87555h0a10.87548,10.87548,0,0,0,10.87547-10.87549V62.82553"
                                                  style={{
                                                      fill: 'none',
                                                      stroke: '#1de9b6',
                                                      'strokeMiterlimit': 10,
                                                      'strokeWidth': '1.36px'
                                                  }}/>
                                        </svg>
                                        <div className="dot path-move" data-num="2"></div>
                                    </div>




                                    <div className="radio-group" data-num="1"></div>
                                    <div className="radio-group" data-num="2"></div>
                                    <div className="radio-group" data-num="3"></div>

                                </div>

                                <p><strong>Elastos Carrier</strong></p>
                                <p>Completely decentralized peer-to-peer<br/> platform that conveys information for<br/> applications by taking over all network<br/> traffic between virtual machines.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>





            <section id="model" className="hasAnim">

                <div className="model-slides">

                    <div className="notch top cn"></div>
                    <div className="notch bot cn"></div>
                    <div className="notch top rt"></div>
                    <div className="notch bot lt"></div>

                    <div className="contentContainer">
                        <header>
                            <div className="tri-square sized"><img src="assets/images/tri-square-dark.svg"/></div>
                            <h3><span className="dsk">The </span>Elastos Business Model</h3>
                        </header>

                        <div className="model-slides-wrap" id="model-slider">
                            <div className="model-slide">
                                <div className="vdiv"></div>
                                <div className="contents">
                                    <div className="model-num sized"><img src="assets/images/model-number1.svg"/></div>
                                    <div className="model-icon sized"><img src="assets/images/model-icon1.svg"/></div>
                                    <p>Fulfill the essential missing link for<br/> peer-to-peer communication between<br/> ALL smart devices including IoT<br/> and autonomous vehicles.</p>
                                </div>
                            </div>
                            <div className="model-slide">
                                <div className="vdiv"></div>
                                <div className="contents">
                                    <div className="model-num sized"><img src="assets/images/model-number2.svg"/></div>
                                    <div className="model-icon sized"><img src="assets/images/model-icon2.svg"/></div>
                                    <p>Provide large blockchain<br/> applications with a secure<br/> running environment.</p>
                                </div>
                            </div>
                            <div className="model-slide">
                                <div className="vdiv"></div>
                                <div className="contents">
                                    <div className="model-num sized"><img src="assets/images/model-number3.svg"/></div>
                                    <div className="model-icon sized"><img src="assets/images/model-icon3.svg"/></div>
                                    <p>Big data and digital content<br/> will be able to identify<br/> ownership on the blockchain.</p>
                                </div>
                            </div>

                            <div className="model-slide off">
                                <div className="vdiv"></div>
                                <div className="contents">
                                    <div className="model-num sized"><img src="assets/images/model-number4.svg"/></div>
                                    <div className="model-icon sized"><img src="assets/images/model-icon4.svg"/></div>
                                    <p>Wealth generation through the<br/> exchange of tokens traded<br/> legally on the blockchain.</p>
                                </div>
                            </div>
                            <div className="model-slide off">
                                <div className="vdiv"></div>
                                <div className="contents">
                                    <div className="model-num sized"><img src="assets/images/model-number5.svg"/></div>
                                    <div className="model-icon sized"><img src="assets/images/model-icon5.svg"/></div>
                                    <p>Usage of ELA tokens to register<br/> IDs for purchase of items such<br/> as DApps, digital products, and<br/> cloud storage.</p>
                                </div>
                            </div>
                            <div className="model-slide off">
                                <div className="vdiv"></div>
                                <div className="contents">
                                    <div className="model-num sized"><img src="assets/images/model-number6.svg"/></div>
                                    <div className="model-icon sized"><img src="assets/images/model-icon6.svg"/></div>
                                    <p>Scarcity creation through<br/> limiting the fixed amount of<br/> digital assets.</p>
                                </div>
                            </div>

                            <div className="model-slide off">
                                <div className="vdiv"></div>
                                <div className="contents">
                                    <div className="model-num sized"><img src="assets/images/model-number7.svg"/></div>
                                    <div className="model-icon sized"><img src="assets/images/model-icon7.svg"/></div>
                                    <p>Provide large blockchain applications<br/> the ability to run on a device rather<br/> than blockchain nodes.</p>
                                </div>
                            </div>
                            <div className="model-slide off">
                                <div className="vdiv"></div>
                                <div className="contents">
                                    <div className="model-num sized"><img src="assets/images/model-number8.svg"/></div>
                                    <div className="model-icon sized"><img src="assets/images/model-icon8.svg"/></div>
                                    <p>Offer a secure runtime environment<br/> free of man-in-the-middle, distributed<br/> denial-of-service, and additional<br/> cyber-attacks.</p>
                                </div>
                            </div>
                            <div className="model-slide off">
                                <div className="vdiv"></div>
                                <div className="contents">
                                    <div className="model-num sized"><img src="assets/images/model-number9.svg"/></div>
                                    <div className="model-icon wide sized"><img src="assets/images/model-icon9.svg"/></div>
                                    <p>Easily port existing mobile<br/> applications to the Elastos platform<br/> by means of an SDK integration.</p>
                                </div>
                            </div>

                            <div className="model-slide off">
                                <div className="vdiv"></div>
                                <div className="contents">
                                    <div className="model-num wide sized"><img src="assets/images/model-number10.svg"/></div>
                                    <div className="model-icon wide sized"><img src="assets/images/model-icon10.svg"/></div>
                                    <p>Longevity of digital content<br/> through numerous uses.</p>
                                </div>
                            </div>
                            <div className="model-slide off">
                                <div className="vdiv"></div>
                                <div className="contents">
                                    <div className="model-num wide sized"><img src="assets/images/model-number11.svg"/></div>
                                    <div className="model-icon wide sized"><img src="assets/images/model-icon11.svg"/></div>
                                    <p>Wealth generation through the<br/> exchange of tokens traded<br/> legally on the blockchain.</p>
                                </div>
                            </div>


                        </div>

                        <div className="slide-controls">
                            <div className="slide-count"><span className="count-current">01</span><span className="slash">/</span><span className="count-total">04</span></div>

                            <div className="slide-arrows">
                                <div className="arrow-btn left off">
                                    <div className="arrow-border"></div>
                                    <div className="arrow-circle">
                                        <img src="assets/images/arrow-submit.svg"/>
                                    </div>
                                </div>
                                <div className="arrow-btn right">
                                    <div className="arrow-border"></div>
                                    <div className="arrow-circle">
                                        <img src="assets/images/arrow-submit.svg"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="background cn">
                        <div className="layer base"><img src="assets/images/model-bottom.svg"/></div>




                        <div className="cardfly-wrap part-wrap" data-num="1">
                            <div className="cardfly part" data-num="1"><img src="assets/images/parts/token-card3.svg"/></div>
                            <div className="cardfly part" data-num="2"><img src="assets/images/parts/token-card1.svg"/></div>
                            <div className="cardfly part" data-num="3"><img src="assets/images/parts/token-card2.svg"/></div>
                        </div>
                        <div className="cardfly-wrap part-wrap" data-num="2">
                            <div className="cardfly part" data-num="1"><img src="assets/images/parts/token-card2.svg"/></div>
                            <div className="cardfly part" data-num="2"><img src="assets/images/parts/token-card3.svg"/></div>
                            <div className="cardfly part" data-num="3"><img src="assets/images/parts/token-card1.svg"/></div>
                        </div>




                        <div className="spin-dial part" data-num="1"><img src="assets/images/parts/token-spinner.svg"/></div>
                        <div className="spin-dial part" data-num="2"><img src="assets/images/parts/token-spinner.svg"/></div>




                        <div className="radio-group" data-num="1"></div>
                        <div className="radio-group" data-num="2"></div>
                        <div className="radio-group" data-num="3"></div>




                        <div className="graph-wrap part-wrap">
                            <div className="graph part"><img src="assets/images/parts/app3-graphline.svg"/></div>
                        </div>




                        <div className="glow-line" data-num="1">
                            <div className="glow-ball"></div>
                        </div>
                        <div className="glow-line" data-num="2">
                            <div className="glow-ball"></div>
                        </div>
                        <div className="glow-line" data-num="3">
                            <div className="glow-ball"></div>
                        </div>


                    </div>

                </div>

                <div className="callout-wrap">
                    <div className="callout-text">
                        <div className="contentContainer">
                            <div className="bg-square"></div>
                            <div className="txt">
                                <p>Our Vision Is</p>
                                <h2 className="hasStatic">to provide<br/> users with a trustful<br/> runtime environment</h2>
                                <div className="arrow arrow-next sized"><img src="assets/images/arrow.svg"/></div>
                            </div>
                        </div>
                    </div>
                </div>


            </section>





            <section id="applications" className="hasAnim">
                <div className="contentContainer expanded">

                    <header>
                        <div className="tri-square sized"><img src="assets/images/tri-square.svg"/></div>
                        <h3>Applications</h3>

                        <p>Applications on Elastos will run in a trustful runtime environment that utilizes blockchain technology. This creates real security by providing a “sandboxed” environment that
                            will need verification from the blockchain before allowing access to the internet. This enables massive potential for the construction of any type of application with any use
                            case or scenario.</p>
                        <p>The following are examples of use cases<br className="mob"/> for applications that could be built on Elastos:</p>
                    </header>

                    <div className="application-boxes spaced">
                        <div className="application-box big left" data-num="1">
                            <div className="background">
                                <img src="assets/images/applications1.svg" className="spacer"/>



                                <div className="radio-group light" data-num="1"></div>
                                <div className="radio-group light" data-num="2"></div>




                                <div className="phone-wrap part-wrap">
                                    <div className="phone-text part"><img src="assets/images/parts/app1-phone.svg"/><img src="assets/images/parts/app1-phone.svg"/></div>
                                </div>




                                <div className="card-wrap part-wrap">
                                    <div className="card part"><img src="assets/images/parts/app1-card.svg"/></div>
                                </div>




                                <div className="comp-wrap part-wrap">
                                    <div className="comp-text part"><img src="assets/images/parts/app1-comp-scroll.svg"/></div>
                                </div>


                            </div>
                            <div className="txt"><p>Support point-to-point conversation,<br/> point-to-point document transfer through<br/> decentralized P2P communication.</p></div>
                        </div>
                        <div className="application-box small right" data-num="2">
                            <div className="inner">
                                <div className="background">
                                    <img src="assets/images/applications2.svg" className="spacer"/>




                                    <div className="build-wrap" data-num="1">
                                        <div className="building part"><img src="assets/images/parts/app2-building.svg"/></div>
                                        <div className="roof part">
                                            <div className="roof-color"><img src="assets/images/parts/app2-roof1.svg"/></div>
                                            <div className="roof-color top"><img src="assets/images/parts/app2-roof2.svg"/></div>
                                        </div>
                                        <img src="assets/images/parts/app2-slot.svg" className="slot"/>
                                        <div className="coin-wrap part-wrap">
                                            <div className="coin part" data-num="1"><img src="assets/images/parts/app2-coin1.svg"/></div>
                                            <div className="coin part" data-num="2"><img src="assets/images/parts/app2-coin2.svg"/></div>
                                        </div>
                                    </div>

                                    <div className="build-wrap" data-num="2">
                                        <div className="building part"><img src="assets/images/parts/app2-building.svg"/></div>
                                        <div className="roof part">
                                            <div className="roof-color"><img src="assets/images/parts/app2-roof2.svg"/></div>
                                            <div className="roof-color top"><img src="assets/images/parts/app2-roof1.svg"/></div>
                                        </div>
                                        <img src="assets/images/parts/app2-slot.svg" className="slot"/>
                                        <div className="coin-wrap part-wrap">
                                            <div className="coin part" data-num="1"><img src="assets/images/parts/app2-coin2.svg"/></div>
                                            <div className="coin part" data-num="2"><img src="assets/images/parts/app2-coin1.svg"/></div>
                                        </div>
                                    </div>

                                    <div className="build-wrap" data-num="3">
                                        <div className="building part"><img src="assets/images/parts/app2-building.svg"/></div>
                                        <div className="roof part">
                                            <div className="roof-color"><img src="assets/images/parts/app2-roof1.svg"/></div>
                                            <div className="roof-color top"><img src="assets/images/parts/app2-roof2.svg"/></div>
                                        </div>
                                        <img src="assets/images/parts/app2-slot.svg" className="slot"/>
                                        <div className="coin-wrap part-wrap">
                                            <div className="coin part" data-num="1"><img src="assets/images/parts/app2-coin1.svg"/></div>
                                            <div className="coin part" data-num="2"><img src="assets/images/parts/app2-coin2.svg"/></div>
                                        </div>
                                    </div>


                                </div>
                                <div className="txt"><p>Support point-to-point business<br/> through decentralized payment.</p></div>
                            </div>
                        </div>
                    </div>

                    <div className="application-boxes spaced">
                        <div className="application-box small left" data-num="3">
                            <div className="inner">
                                <div className="background">
                                    <img src="assets/images/applications3.svg" className="spacer"/>




                                    <div className="graph-wrap part-wrap">
                                        <div className="graph part"><img src="assets/images/parts/app3-graphline.svg"/></div>
                                    </div>




                                    <div className="dot-wrap part-wrap">
                                        <div className="line" data-num="1"></div>
                                        <div className="line" data-num="2"></div>
                                        <div className="dot" data-num="1"></div>
                                        <div className="dot" data-num="2"></div>
                                    </div>




                                    <div className="print-wrap">
                                        <div className="print part"><img src="assets/images/parts/app3-print.svg"/></div>

                                        <div className="print-line" data-num="1">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 24">
                                                <path id="app-path1" d="M.12476,1.67685A52.14724,52.14724,0,0,1,53.746,23.58424"
                                                style={{
                                                  fill: 'none',
                                                  stroke: '#1de9b6',
                                                  'strokeMiterlimit': 10,
                                                  'strokeWidth': '1.25px'
                                                }}/>
                                            </svg>
                                            <div className="dot"></div>
                                        </div>
                                        <div className="print-line" data-num="2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.6 8">
                                                <path id="app-path2" d="M.35051,7.2935A39.1712,39.1712,0,0,1,37.35907,3.67705"
                                                      style={{
                                                          fill: 'none',
                                                          stroke: '#1de9b6',
                                                          'strokeMiterlimit': 10,
                                                          'strokeWidth': '1.25px'
                                                      }}/>
                                            </svg>
                                            <div className="dot"></div>
                                        </div>
                                        <div className="print-line" data-num="3">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 43">
                                                <path id="app-path3" d="M.625,43.09323V22.17561A38.85743,38.85743,0,0,1,7.32708.3509"
                                                      style={{
                                                          fill: 'none',
                                                          stroke: '#1de9b6',
                                                          'strokeMiterlimit': 10,
                                                          'strokeWidth': '1.25px'
                                                      }}/>
                                            </svg>
                                            <div className="dot"></div>
                                        </div>
                                        <div className="print-line" data-num="4">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 48">
                                                <path id="app-path4" d="M4.72147,48.12952A51.762,51.762,0,0,1,.625,27.89V0"
                                                      style={{
                                                          fill: 'none',
                                                          stroke: '#1de9b6',
                                                          'strokeMiterlimit': 10,
                                                          'strokeWidth': '1.25px'
                                                      }}/>
                                            </svg>
                                            <div className="dot"></div>
                                        </div>
                                        <div className="print-line" data-num="5">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 32.5">
                                                <path id="app-path5" d="M22.36567,0V20.91749a10.87033,10.87033,0,1,1-21.74067,0h0"
                                                      style={{
                                                          fill: 'none',
                                                          stroke: '#1de9b6',
                                                          'strokeMiterlimit': 10,
                                                          'strokeWidth': '1.25px'
                                                      }}/>
                                            </svg>
                                            <div className="dot"></div>
                                        </div>
                                        <div className="print-line" data-num="6">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.5 62.5">
                                                <path id="app-path6" d="M32.051,0V13.945A52.19366,52.19366,0,0,1,.24412,61.89471"
                                                      style={{
                                                          fill: 'none',
                                                          stroke: '#1de9b6',
                                                          'strokeMiterlimit': 10,
                                                          'strokeWidth': '1.25px'
                                                      }}/>
                                            </svg>
                                            <div className="dot"></div>
                                        </div>

                                    </div>


                                </div>
                                <div className="txt"><p>Support applications about evidence,<br/> traceability to source, ID verification,<br/> etc. through trustful storage.</p></div>
                            </div>
                        </div>
                        <div className="application-box big right" data-num="4">
                            <div className="background">
                                <img src="assets/images/applications4.svg" className="spacer"/>
                                <img src="assets/images/parts/app4-shadow.svg" className="shadow"/>



                                <div className="card-circle">
                                    <div className="card part" data-num="1"><img src="assets/images/parts/app4-card1.svg"/></div>
                                    <div className="card part" data-num="2"><img src="assets/images/parts/app4-card2.svg"/></div>
                                    <div className="card part" data-num="3"><img src="assets/images/parts/app4-card1.svg"/></div>
                                    <div className="card part" data-num="4"><img src="assets/images/parts/app4-card3.svg"/></div>

                                </div>




                                <div className="lock part">
                                    <img src="assets/images/parts/app4-lock.svg"/>
                                    <div className="check part"><img src="assets/images/parts/app4-check.svg"/></div>
                                    <div className="dot-group">
                                        <div className="dot" data-num="1"></div>
                                        <div className="dot" data-num="2"></div>
                                        <div className="dot" data-num="3"></div>
                                        <div className="dot" data-num="4"></div>
                                    </div>
                                </div>


                            </div>
                            <div className="txt"><p>Support digital content APPs, such as: electronic<br/> books, games and video players. All digital assets<br/> can be protected in a trustful environment.</p>
                            </div>
                        </div>
                    </div>

                </div>

            </section>





            <section id="token" className="hasAnim">
                <div className="contentContainer">

                    <div className="row spaced">
                        <div className="col left">
                            <div className="scale-wrap">
                                <div className="background">
                                    <div className="layer base"><img src="assets/images/token-01.svg"/></div>
                                    <div className="square-ornament">
                                        <div className="sq fill sm"></div>
                                        <div className="sq fill med"></div>
                                        <div className="sq diags"><img src="assets/images/diags-blue.svg"/></div>
                                    </div>




                                    <div className="coin-wrap part-wrap">
                                        <div className="coin part" data-num="1"><img src="assets/images/parts/token-coin.svg"/></div>
                                        <div className="coin part" data-num="2"><img src="assets/images/parts/token-coin.svg"/></div>
                                        <div className="coin part" data-num="3"><img src="assets/images/parts/token-coin.svg"/></div>
                                    </div>




                                    <div className="card-wrap part-wrap">
                                        <div className="card part" data-num="1"><img src="assets/images/parts/token-card1.svg"/></div>
                                        <div className="card part" data-num="2"><img src="assets/images/parts/token-card2.svg"/></div>
                                        <div className="card part" data-num="3"><img src="assets/images/parts/token-card3.svg"/></div>
                                    </div>




                                    <div className="dot-group" data-num="1">
                                        <div className="dot" data-num="1"></div>
                                        <div className="dot" data-num="2"></div>
                                        <div className="dot" data-num="3"></div>
                                        <div className="dot" data-num="4"></div>
                                    </div>
                                    <div className="dot-group" data-num="2">
                                        <div className="dot" data-num="1"></div>
                                        <div className="dot" data-num="2"></div>
                                        <div className="dot" data-num="3"></div>
                                        <div className="dot" data-num="4"></div>
                                    </div>




                                    <div className="spin-dial part" data-num="1"><img src="assets/images/parts/token-spinner.svg"/></div>
                                    <div className="spin-dial part" data-num="2"><img src="assets/images/parts/token-spinner.svg"/></div>
                                    <div className="spin-dial part" data-num="3"><img src="assets/images/parts/token-spinner.svg"/></div>




                                    <div className="print-wrap part-wrap">
                                        <div className="print-scroll">
                                            <img src="assets/images/parts/token-print.svg" className="print-img"/>
                                            <div className="line"></div>
                                            <img src="assets/images/parts/token-print.svg" className="print-img"/>
                                        </div>
                                    </div>

                                    <div className="type-wrap part-wrap">
                                        <div className="type part"><img src="assets/images/parts/token-type.svg"/></div>
                                    </div>

                                    <div className="bigA part"><img src="assets/images/parts/token-a.svg"/></div>

                                    <div className="cardfly-wrap part-wrap" data-num="1">
                                        <div className="cardfly part" data-num="1"><img src="assets/images/parts/cardfly1.svg"/></div>
                                        <div className="cardfly part" data-num="2"><img src="assets/images/parts/cardfly3.svg"/></div>
                                        <div className="cardfly part" data-num="3"><img src="assets/images/parts/cardfly2.svg"/></div>
                                    </div>
                                    <div className="cardfly-wrap part-wrap" data-num="2">
                                        <div className="cardfly part" data-num="1"><img src="assets/images/parts/cardfly2.svg"/></div>
                                        <div className="cardfly part" data-num="2"><img src="assets/images/parts/cardfly1.svg"/></div>
                                        <div className="cardfly part" data-num="3"><img src="assets/images/parts/cardfly3.svg"/></div>
                                    </div>

                                    <div className="radio-group light" data-num="1"></div>
                                    <div className="radio-group light" data-num="2"></div>
                                    <div className="radio-group" data-num="3"></div>

                                    <div className="token-city part"><img src="assets/images/parts/token-city.svg"/></div>

                                    <div className="glow-line">
                                        <div className="glow-ball"></div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="col right">

                            <div className="txt">
                                <div className="square-ornament">
                                    <div className="sq fill sm"></div>
                                    <div className="sq fill med"></div>
                                    <div className="sq diags"><img src="assets/images/diags-green.svg"/></div>
                                </div>

                                <header>
                                    <div className="tri-square sized"><img src="assets/images/tri-square.svg"/></div>
                                    <h3>Elastos Token (ELA)</h3>
                                </header>
                                <p>ELA tokens will be used to register IDs on the blockchain, opening the door to the Elastos ecosystem. Once inside, countless exchange opportunities will be
                                    available.</p>
                                <p>You can purchase Decentralized Applications, acquire Cloud storage, buy and sell digital products and assets like songs, movies, books, and videos, and limitless other
                                    resources.</p>
                                <p>In addition, holders of ELA tokens will be provided the opportunity to invest in numerous projects. For every DApp operating on Elastos, it will be essential to have ELA
                                    for registering digital assets thus creating a continuous necessity for the token.</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="bg-squares">
                    <div className="square-ornament left">
                        <div className="sq fill sm"></div>
                        <div className="sq fill med"></div>
                        <div className="sq fill lrg"></div>
                    </div>
                    <div className="square-ornament right">
                        <div className="sq fill sm"></div>
                        <div className="sq fill med"></div>
                        <div className="sq fill lrg"></div>
                        <div className="sq diags"><img src="assets/images/diags-blue.svg"/></div>
                    </div>
                </div>
            </section>


            <section id="cyber" className="hasAnim">
                <div className="contentContainer">
                    <div className="callout-text">
                        <div className="contentContainer">
                            <div className="bg-square"></div>
                            <div className="shield part"><img src="assets/images/shield-cyber.svg"/></div>
                            <div className="txt">
                                <h2 className="hasStatic">Elastos<br/> Cyber Republic</h2>

                                <div className="strike-text dsk">
                                    <div className="strike-line"></div>
                                    <p>We are a diverse democratic group of leaders, developers, organizers and designers</p>
                                </div>
                                <div className="strike-text dsk">
                                    <div className="strike-line"></div>
                                    <p>formed to promote Elastos in our communities. Membership is open to everyone.</p>
                                </div>

                                <div className="strike-text mob">
                                    <div className="strike-line"></div>
                                    <p>We are a diverse democratic group of</p>
                                </div>

                                <div className="strike-text mob">
                                    <div className="strike-line"></div>
                                    <p>leaders, developers, organizers and</p>
                                </div>

                                <div className="strike-text mob">
                                    <div className="strike-line"></div>
                                    <p>designers formed to promote Elastos</p>
                                </div>

                                <div className="strike-text mob filler"></div>

                                <div className="strike-text mob">
                                    <div className="strike-line"></div>
                                    <p>in our communities. Membership is</p>
                                </div>

                                <div className="strike-text mob filler"></div>

                                <div className="strike-text mob">
                                    <div className="strike-line"></div>
                                    <p>open to everyone.</p>
                                </div>

                            </div>
                        </div>
                        <div className="cta-btn">
                            <p>Become a <strong>Contributor</strong></p>
                            <div className="arrow sized"><img src="assets/images/arrow.svg"/></div>
                            <a href="/register"></a>
                        </div>
                    </div>
                </div>


                <div className="bg-squares">
                    <div className="square-ornament top">
                        <div className="sq fill sm"></div>
                        <div className="sq fill med"></div>
                        <div className="sq diags"><img src="assets/images/diags-green.svg"/></div>
                    </div>
                    <div className="square-ornament left">
                        <div className="sq fill sm"></div>
                        <div className="sq fill med"></div>
                        <div className="sq fill lrg"></div>
                        <div className="sq diags"><img src="assets/images/diags-blue.svg"/></div>
                    </div>
                    <div className="square-ornament right">
                        <div className="sq fill sm"></div>
                        <div className="sq fill lrg"></div>
                    </div>
                </div>

                <div className="notch bot rt"></div>
                <div className="notch bot cn"></div>
                <div className="notch bot lt"></div>
            </section>

            <section id="team">

                <div className="contentContainer">
                    <header>
                        <div className="tri-square sized"><img src="assets/images/tri-square-dark.svg"/></div>
                        <h3>Empower35</h3>
                    </header>

                    <div className="team-grid spaced">
                        <div className="team-box">
                            <div className="team-photo sized"><img src="assets/images/team-placeholder@2x.png"/></div>
                            <div className="txt">
                                <h4>Partnership Lead</h4>

                            </div>
                        </div>
                        <div className="team-box">
                            <div className="team-photo sized"><img src="assets/images/team-placeholder@2x.png"/></div>
                            <div className="txt">
                                <h4>Marketer</h4>

                            </div>
                        </div>
                        <div className="team-box">
                            <div className="team-photo sized"><img src="assets/images/team-placeholder@2x.png"/></div>
                            <div className="txt">
                                <h4>Legal Council</h4>

                            </div>
                        </div>
                        <div className="team-box">
                            <div className="team-photo sized"><img src="assets/images/team-placeholder@2x.png"/></div>
                            <div className="txt">
                                <h4>Videographer</h4>

                            </div>
                        </div>
                        <div className="team-box">
                            <div className="team-photo sized"><img src="assets/images/team-placeholder@2x.png"/></div>
                            <div className="txt">
                                <h4>Designer</h4>

                            </div>
                        </div>
                        <div className="team-box">
                            <div className="team-photo sized"><img src="assets/images/team-placeholder@2x.png"/></div>
                            <div className="txt">
                                <h4>Writer</h4>

                            </div>
                        </div>
                        <div className="team-box">
                            <div className="team-photo sized"><img src="assets/images/team-placeholder@2x.png"/></div>
                            <div className="txt">
                                <h4>DApp Analyst</h4>

                            </div>
                        </div>
                        <div className="team-box">
                            <div className="team-photo sized"><img src="assets/images/team-placeholder@2x.png"/></div>
                            <div className="txt">
                                <h4>Evangelist</h4>

                            </div>
                        </div>

                        <div className="team-box cta">

                            <div className="cta-btn">
                                <p>View All <strong>Positions</strong></p>
                                <div className="arrow sized"><img src="assets/images/arrow.svg"/></div>
                                <a href="/empower35"></a>
                            </div>

                        </div>
                    </div>

                </div>

            </section>

            <footer id="globalFooter" className="global hasAnim">

                <div className="footer-illus">
                    <div className="footer-illus-bg part dsk">
                        <img src="assets/images/footer-illus-bg.svg"/>



                        <div className="glow-line" data-num="1">
                            <div className="glow-ball"></div>
                        </div>
                        <div className="glow-line" data-num="2">
                            <div className="glow-ball"></div>
                        </div>
                        <div className="glow-line" data-num="3">
                            <div className="glow-ball"></div>
                        </div>
                        <div className="glow-line" data-num="4">
                            <div className="glow-ball"></div>
                        </div>

                    </div>
                    <div className="footer-illus-bg part mob"><img src="assets/images/footer-illus-bg-mob.svg"/></div>

                    <div className="footer-city">
                        <img src="assets/images/footer-city.svg" className="base"/>

                        <div className="cardfly-wrap part-wrap" data-num="1">
                            <div className="cardfly part" data-num="1"><img src="assets/images/parts/token-card2.svg"/></div>
                            <div className="cardfly part" data-num="2"><img src="assets/images/parts/token-card3.svg"/></div>
                            <div className="cardfly part" data-num="3"><img src="assets/images/parts/token-card1.svg"/></div>
                        </div>
                        <div className="cardfly-wrap part-wrap" data-num="2">
                            <div className="cardfly part" data-num="1"><img src="assets/images/parts/token-card3.svg"/></div>
                            <div className="cardfly part" data-num="2"><img src="assets/images/parts/token-card1.svg"/></div>
                            <div className="cardfly part" data-num="3"><img src="assets/images/parts/token-card2.svg"/></div>
                        </div>

                        <div className="radio-group" data-num="1"></div>
                        <div className="radio-group" data-num="2"></div>

                        <div className="glow-line" data-num="1">
                            <div className="glow-ball"></div>
                        </div>
                        <div className="glow-line" data-num="2">
                            <div className="glow-ball"></div>
                        </div>


                    </div>
                    <div className="bg-square"></div>
                </div>

                <div className="contentContainer">

                    <h2 className="hasStatic">Become a part of the<br/>Cyber Republic</h2>

                    <div className="form-wrap">
                        <p>Stay up to date with Cyber Republic</p>
                        <form id="footer-form" className="signup-form" name="mailing-list" action="https://cyberrepublic.us19.list-manage.com/subscribe/post-json?u=acb5b0ce41bfe293d881da424&id=272f303492"
                              method="get">
                            <div className="email-wrap">
                                <input type="email" name="EMAIL" data-type="req" placeholder="Enter Email"/>
                                <button type="submit" className="arrow-submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 34">
                                        <polygon points="0 0 0 33.487 16.744 16.744 0 0" style={{fill: '#1de9b6'}}/>
                                        <polygon points="0 24.579 7.835 16.744 0 8.91 0 24.579" className="small-tri"/>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="footer-row spaced">
                        <div className="col" data-num="1">
                            <img src="assets/images/footer-shield.svg" className="spacer"/>
                        </div>

                        <div className="col" data-num="2">
                            <ul className="resources">
                                <li className="title">Resources</li>
                                <li><a href="https://wallet.elastos.org/" target="_blank">Wallet</a></li>
                                <li><a href="https://blockchain.elastos.org/status" target="_blank">Block Explorer</a></li>
                                <li><a href="https://github.com/elastos" target="_blank">GitHub</a></li>
                                <li><a href="https://github.com/elastos/Elastos.Community/tree/master/CyberRepublicLogoAssets" target="_blank">Logo Assets</a></li>
                                <li><a href="https://elanews.net/">ELA News</a></li>
                            </ul>
                        </div>

                        <div className="vdiv"></div>

                        <div className="col contact" data-num="3">
                            <ul>
                                <li className="title">Contact</li>
                                <li>Cyber Republic: <a href="mailto:cyberrepublic@elastos.org">cyberrepublic@elastos.org</a></li>
                                <li>Global Community: <a href="mailto:global-community@elastos.org">global-community@elastos.org</a></li>
                                <li>Support: <a href="mailto:support@elastos.org">support@elastos.org</a></li>
                                <li>Other Contacts: <a href="mailto:contact@elastos.org">contact@elastos.org</a></li>
                            </ul>
                        </div>

                        <div className="vdiv"></div>

                        <div className="col" data-num="4">
                            <ul className="social">
                                <li className="title">Join Us On</li>
                                <li><a href="https://t.me/elastosgroup" target="_blank"><span className="icon icon-paper-plane"></span></a></li>
                                <li><a href="https://github.com/elastos" target="_blank"><span className="icon icon-github"></span></a></li>
                                <li><a href="https://discordapp.com/invite/MHSUVZN" target="_blank"><span className="icon icon-crabface"></span></a></li>
                                <li><a href="https://twitter.com/Elastos_org" target="_blank"><span className="icon icon-twitter"></span></a></li>
                                <li className="mob"></li>
                                <li><a href="https://elastos.slack.com/" target="_blank"><span className="icon icon-slack"></span></a></li>
                                <li><a href="https://www.reddit.com/r/Elastos/" target="_blank"><span className="icon icon-reddit-alien"></span></a></li>
                                <li><a href="https://www.youtube.com/channel/UCy5AjgpQIQq3bv8oy_L5WTQ/" target="_blank"><span className="icon icon-youtube-play"></span></a></li>
                                <li><a href="https://www.instagram.com/elastosofficial/" target="_blank"><span className="icon icon-instagram"></span></a></li>
                                <li className="filler"></li>
                            </ul>
                        </div>
                    </div>

                    <div className="credit"><p>Design: <a href="http://www.griflan.com" target="_blank">Griflan</a></p></div>

                </div>
            </footer>

            <div id="video-overlay">
                <div className="blanket"></div>

                <div className="overlayWrap">
                    <div className="contentContainer">
                        <div id="video-contents">
                            <img src="assets/images/lbvideo-spacer.png" className="video-spacer"/>
                            <div className="close-btn">
                                <div className="close-line right"></div>
                                <div className="close-line left">
                                    <div className="close-hover"></div>
                                </div>
                            </div>

                            <video controls id="lbvid"></video>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    }
}
