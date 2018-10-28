import React from 'react'
import I18N from '@/I18N'
import MergedMining from './merged_mining.png';
import P2P from './p2p.png';
import Chains from './chains.png';
import SideChains from './side.png';
import SideChains2 from './side2.png';
import SideChains3 from './side3.png';

import '../../style.scss';

export default class extends React.Component {

    render () {
        return (
            <div className="p_developerLearnDetail">
                <h3>{I18N.get('developer.learn.started.architecture.title')}</h3>
                <ul>
                    <li>{I18N.get('developer.learn.started.architecture.part1')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.part2')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.part3')}</li>
                </ul>
                <img src={MergedMining} />
                <h3>{I18N.get('developer.learn.started.architecture.mergedmining')}</h3>
                <p>
                    {I18N.get('developer.learn.started.architecture.part4')}
                </p>
                <p>
                    {I18N.get('developer.learn.started.architecture.part5')}
                </p>
                {I18N.get('developer.learn.started.architecture.part6')}
                <ul>
                    <li>{I18N.get('developer.learn.started.architecture.part7')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.part8')}</li>
                </ul>
                <a href="https://medium.com/@kiran.pachhai/elastos-did-the-backbone-of-the-new-internet-26182108bf6a" target="_blank">{I18N.get('developer.learn.started.architecture.readarticle')}</a>
                <img src={P2P} />
                <h3>{I18N.get('developer.learn.started.architecture.overviewmainchain')}</h3>
                <p>
                    {I18N.get('developer.learn.started.architecture.overviewmainchain.part1')}
                </p>
                <p>
                    {I18N.get('developer.learn.started.architecture.overviewmainchain.part2')}
                </p>
                <p>
                    {I18N.get('developer.learn.started.architecture.overviewmainchain.part3')}
                </p>
                <p>
                    {I18N.get('developer.learn.started.architecture.overviewmainchain.part4')}
                </p>
                <p>
                    {I18N.get('developer.learn.started.architecture.overviewmainchain.part5')}
                </p>
                <a href="https://www.elastos.org/wp-content/uploads/2018/White Papers/elastos_sidechain_whitepaper_v0.3.0.8_EN.pdf?_t=1526918471" target="_blank">{I18N.get('developer.learn.started.architecture.overviewmainchain.readsidechain')}</a>
                <h3>{I18N.get('developer.learn.started.architecture.sidechain')}</h3>
                <img src={Chains} />
                <p>
                    {I18N.get('developer.learn.started.architecture.sidechain.part1')}
                </p>
                <p>
                    {I18N.get('developer.learn.started.architecture.sidechain.part2')}
                </p>
                <p>
                    {I18N.get('developer.learn.started.architecture.sidechain.part3')}
                </p>
                <h5>{I18N.get('developer.learn.started.architecture.sidechain.frommainchain')}</h5>
                <img src={SideChains} />
                <ol>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.frommainchain.li1')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.frommainchain.li2')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.frommainchain.li3')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.frommainchain.li4')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.frommainchain.li5')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.frommainchain.li6')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.frommainchain.li7')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.frommainchain.li8')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.frommainchain.li9')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.frommainchain.li10')}</li>
                </ol>
                <h5>{I18N.get('developer.learn.started.architecture.sidechain.tomainchain')}</h5>
                <img src={SideChains2} />
                <ol>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.tomainchain.li1')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.tomainchain.li2')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.tomainchain.li3')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.tomainchain.li4')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.tomainchain.li5')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.tomainchain.li6')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.tomainchain.li7')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.tomainchain.li8')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.tomainchain.li9')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.tomainchain.li10')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.tomainchain.li11')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.sidechain.tomainchain.li12')}</li>
                </ol>
                <h5>{I18N.get('developer.learn.started.architecture.friendchains')}</h5>
                <p>
                    {I18N.get('developer.learn.started.architecture.friendchains.part1')}
                </p>
                <p>
                    {I18N.get('developer.learn.started.architecture.friendchains.part2')}
                </p>
                <ol>
                    <li>{I18N.get('developer.learn.started.architecture.friendchains.part2.li1')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.friendchains.part2.li2')}</li>
                </ol>
                <h3>{I18N.get('developer.learn.started.architecture.friendchains.frommainchain')}</h3>
                <p>
                    {I18N.get('developer.learn.started.architecture.friendchains.frommainchain.title')}
                </p>
                <img src={SideChains3} />
                <ol>
                    <li>{I18N.get('developer.learn.started.architecture.friendchains.frommainchain.li1')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.friendchains.frommainchain.li2')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.friendchains.frommainchain.li3')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.friendchains.frommainchain.li4')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.friendchains.frommainchain.li5')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.friendchains.frommainchain.li6')}</li>
                    <li>{I18N.get('developer.learn.started.architecture.friendchains.frommainchain.li7')}</li>
                </ol>
                <a href="https://medium.com/@kiran.pachhai/elastos-architecture-the-main-chain-sidechains-and-friendchains-3727ef477d8e" target="_blank">{I18N.get('developer.learn.started.architecture.friendchains.frommainchain.read')}</a>
            </div>
        )
    }
}
