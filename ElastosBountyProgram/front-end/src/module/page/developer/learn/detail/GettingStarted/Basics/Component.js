import React from 'react'
import ElastosArchitecture from './elastos_architecture.png';
import '../../style.scss';

export default class extends React.Component {

    render () {
        return (
            <div className="p_developerLearnDetail">
                <h3>What is Elastos?</h3>
                <p>Elastos is the safe and reliable internet of the future. Built utilizing the blockchain, this technological breakthrough provides the first completely safe environment on the web where decentralized applications are detached from the internet while also permitting full scalability to billions of users. Elastos enables the generation of wealth through ownership and exchange of your data and digital assets.</p>
                <p>Elastos is not a blockchain project but rather a network operating system project powered by blockchain technology so in that sense, Elastos is not directly competing with any other blockchain projects. It can work together with them to form this new ecosystem where the decentralized applications run directly on the device instead of running on the blockchain along with decentralized peer to peer network to transfer assets in a completey closed sandboxed environment, thereby solving the three pillar issues that are prevelant in the internet of today - security, scalibility and decentralization.</p>
                <p>Elastos uses internet as the base-layer infrastructure rather than an application where decentralized applications are forced to never directly connect to the internet and only interact with Elastos runtime(which in turn acts as a middle layer, then connecting to the internet). Within the elastos ecosystem, everything from devices to virtual machines to users to DApps have a DID(Decentralized ID) issued by the blockchain and everytime the application requests any sort of internet access, the ID has to first be verified using the blockchain which in turn eliminates many of the man-in-the-middle attacks, virus attacks, etc</p>
                <br />
                <a href="https://www.elastos.org/wp-content/uploads/2018/White%20Papers/elastos_whitepaper_en.pdf?_t=1526235330" target="_blank">Read Elastos Whitepaper</a>
                <br/>
                <a href="https://www.elastos.org/wp-content/uploads/2018/White Papers/elastos_sidechain_whitepaper_v0.3.0.8_EN.pdf?_t=1526918471" target="_blank">Read Elastos Mainchain - Sidechain Whitepaper</a>
                <br/>


                <img src={ElastosArchitecture} />
                <h3>Brief Summary</h3>
                <ul>
                    <li>
                        <strong>Bitcoin</strong> = Trustworthy Ledger: Bitcoin introduced the power of decentralised ledger technology to the world,
                        showing how we don’t need financial institutions to transact value.
                        Bitcoin's purpose is a digital currency, with the intent to become electronic cash.
                        Bitcoin is great; however, it is extremely outdated.
                        Bitcoin has very slow transaction times, expensive transaction fees and uses Proof of Work mining which is vastly uneconomical.
                        Thanks to Bitcoin, the 2nd generation cryptocurrencies were born.
                    </li>
                    <li>
                        <strong>Ethereum</strong> = Trustworthy Ledger + Smart Contracts:
                        Ethereum, as well as many others, are second generation cryptocurrencies.
                        Ethereum was one of the first cryptocurrencies to introduce ‘smart contracts’ and the concept of decentralised apps.
                        Smart contracts put the trust of contracts in the trust of code. For example, If I bought a TV from an online merchant,
                        the payment would only clear once the TV had arrived and I was satisfied with it.
                        They can be coded to included things like ’14-day money back guarantee’ and every other element that is in a normal contract.
                        Drastically improving efficiency and breeds a new generation of trust.
                        Ethereum is a great project, however the scalability of smart contracts that are hosted on the Ethereum network is limited.
                        A game called ‘CryptoKitties’ caused massive network congestion and that is just one of many decentralised applications that use smart contracts.
                    </li>
                    <li>
                        <strong>Elastos</strong> = Trustworthy Ledger + Smart Contracts + Monetizable Dapps and Digital Assets:
                        Elastos is one of many new cryptocurrencies that are build on a third generation blockchain, focusing on a few main elements to combat the scalability issues that arise with 2nd generation cryptocurrencies:
                        <ol>
                            <li>Storage and Speed</li>
                            <li>Bugs within the smart contracts(security vulnerability)</li>
                            <li>Cost</li>
                            <li>Deletion of redundant data</li>
                            <li>Security</li>
                        </ol>
                        <p>
                            The issue with second generation smart contracts is that they have to run solely on the blockchain, which causes network congestion and high transaction costs.
                            Decentralized applications for Elastos are run by blockchain technology but can be built on current Operating Systems (IOS, Android and Linux).
                            Elastos understands the importance of ease of use for both the consumers and the producers.
                            The integration of multiple well known coding languages make development relativity easier than other blockchains.
                            They also support Android and Apple Operating Systems, which most other blockchains do not.
                        </p>
                        <p>
                            Elastos is not just the new internet, but the entire smart economy.
                            Focusing on digital assets, monetizing computing power and spare storage, financially incentive trade of digital assets all combined with the highest level of security and the removal of the middleman.
                            With speed, security and minimal cost at the heart of Elastos, it is bound to scale over time. Elastos is a third generation blockchain technology that tackles the issues we have with second generation blockchain projects such as Ethereum.
                        </p>
                    </li>
                </ul>
                <h3>The internet has nothing to do with computing. Computing has nothing to do with the internet</h3>
                <p>
                    Rong Chen often says that the internet has nothing to do with computing.
                    Computing has nothing to do with the internet.
                    He doesn't mean the network doesn't exist but rather there's a separation between computing from the network and communication.
                    Elastos proposed a long time ago that they should only focus on the computing logic, not which device the service was located at or which server it should connect to.
                    It's not what the application should be focusing on.
                </p>
                <p>
                    Because the entire system needs consistency, it is dangerous for the system if it is allowed to write directly to the location of a system.
                    For example, Elastos accesses the resource through the ID of the resource, not through specifying an IP address to access the computer.
                    The Elastos architecture includes P2P networks. P2P refers to the relationship between entities to entities, not physical computers to computers.
                    The ID of a P2P network represents an individual or an entity, not a computer. Today, we can use our ID to communicate with someone on our cellphones.
                    Tomorrow, even if I change a cellphone, we can still communicate with the same ID.
                    So, specific applications should not care about which cellphone you use or how you access it.
                </p>
            </div>
        )
    }
}
