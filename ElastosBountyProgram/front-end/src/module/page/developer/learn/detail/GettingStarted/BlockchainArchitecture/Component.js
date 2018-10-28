import React from 'react'
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
                <h3>Brief Summary</h3>
                <ul>
                    <li>Through the merged mining with Bitcoin, the safety and reliability are ensured by strong Bitcoin computing power through Proof of Work. This mining strategy saves resources and avoids repeated consumption.</li>
                    <li>Because Elastos structure is built by having a main chain and sidechains, it avoids main chain being overloaded, and leads to easy routing and flexible extension, increasing the possibility for the Elastos to become basis for future internet applications.</li>
                    <li>The blockchain is a trust zone and a reliable internet database. Smart contracts are merely the saving process of this reliable database. Only the valuable data that needs to be notarized is recorded on the blockchain; only the data processing that needs computation reliability requires smart contracts.</li>
                </ul>
                <img src={MergedMining} />
                <h3>Merged Mining</h3>
                <p>
                    The Elastos blockchain utilizes merged mining with Bitcoin, the process by which consensus is reached on both chains simultaneously.
                    In this case, the Bitcoin blockchain works as the parent blockchain to Elastos, with the Elastos chain as its auxiliary blockchain.
                    The mining pools will deploy merged mining code and miners will submit proof of work to both blockchains at the same time.
                    Energy consumption does not increase with merged mining, and will be equal to the energy consumed for mining either alone.
                    Through this mechanism, the Elastos blockchain has an extremely strong guarantee of computing power and will then be able to provide blockchain innovations at a global scale.
                    It makes full use of existing Bitcoin computing resources in addition to being environmentally friendly.
                </p>
                <p>
                    Elastos implements merged mining with Bitcoin.
                    The strategy of merged mining saves resources and avoids repeated consumption.
                    Miner submits Proof of Work(PoW) to both Bitcoin and Elastos and enjoys profits of mining competition without extra consumption of computing power.
                    The consensus mechanism for Elastos is AuxPoW+DPoS where the mining reward distribution is 70% for AuxPoW + DPoS(miners + stakers) and 30% for Ecosystem Application Reward(aka Cyber Republic Fund).
                    Tokens for apps built on Elastos can be published on sidechains.
                    These tokens may participate in two-way asset transfer across the main chain and sidechains.
                </p>
                Additional benefits of merged mining include:
                <ul>
                    <li>The transfer of trust over multiple chains. The Elastos main chain is merged mined along with the Bitcoin main chain. This merged mining characteristic can be extended to Elastos sidechains as long as the sidechain adopts the same Proof of Work consensus. Thus, layers of chains can be merged mined recursively, which establishes a hierarchy of trust among chains.</li>
                    <li>Isolated nodes. An auxiliary blockchain, or sidechain, dependent on merged mining does not need a consensus of multiple nodes. In the extreme case, one chain only needs one node and does not diminish the reliability of the ledger information on the main chain or other chains. No other blockchain consensus algorithm has this kind of advantage.</li>
                </ul>
                <a href="https://medium.com/@kiran.pachhai/elastos-did-the-backbone-of-the-new-internet-26182108bf6a" target="_blank">Read an article on ID Sidechain and the benefits of merged mining</a>
                <img src={P2P} />
                <h3>Overview of Main chain and Sidechains in the elastos ecosystem</h3>
                <p>
                    One of the highlights of the design is that it makes use of a blend of mainchains and sidechains to improve the computational ability of blockchain technology.
                    The mainchain only executes simple transactions and payment transfers while the sidechain handles smart contracts to support services and applications.
                    With this, structure scalability and security can be accomplished.
                </p>
                <p>
                    Similar to the Operating System on a mobile device, users need a trustworthy location to store important data.
                    The Elastos blockchain works as this trust zone for the entire network Operating System.
                    The Elastos blockchain applies main and sidechain solutions to facilitate the smart economy and a healthy decentralized application environment.
                    This means that every application can create individual sidechains. The Elastos blockchain provides built-in, complete, easy-to-use sidechain support.
                    They will also be customizable, allowing clients to pick a different consensus method depending on the use case.
                </p>
                <p>
                    Any system built with blockchain technology has less computing power than a traditional computer, and so will not be able to meet the various requirements of internet applications (such as video games or streaming a high-definition movie).
                    This is a fundamental reason why blockchains still cannot be applied on the internet at a large scale.
                    The Elastos team recognizes this fact, and therefore believes that blockchain development should not rely solely on the main chain for computation.
                    Elastos aims to scale their blockchain system by providing support for sidechains, which will help meet requirements for running applications with high IOPS(Input Output Operations Per Second).
                    The Elastos main chain will be responsible for the small but very important role of trading and transferring ELA, thus providing stability to the blockchain system.
                    Elastos wants to avoid bloating the main chain with unnecessary smart contracts.
                    Instead, only major infrastructure upgrades will take place on the main chain.
                    All other smart contracts can be implemented on sidechains, enabling scalability.
                </p>
                <p>
                    This kind of hierarchical and structured design philosophy will pave the way for a future blockchain paradigm, such as the aforementioned development from stand-alone computation to a distributed one.
                    This is a key innovation in blockchain technology, and more important than the partial technology of singular consensus algorithms and chains.
                    The team will implement basic services as sidechains for global and public use.
                    These services include ID generation, token distribution, digital asset trading, and fast payment systems.
                    These basic services, all important infrastructural components, are part of the Elastos Smart Web.
                </p>
                <p>
                    In addition, the team will also provide support for third-party sidechain development.
                    Transactions are the most important part of the interface between the main and sidechains.
                    The transaction procedure for sending tokens from the main chain to a sidechain is equivalent to sending from a user account on the main chain to a multi-signature address corresponding to the sidechain.
                    The process automatically checks that the sidechain can identify the transaction and deposit the equivalent value of sidechain tokens to the sidechain account.
                </p>
                <a href="https://www.elastos.org/wp-content/uploads/2018/White Papers/elastos_sidechain_whitepaper_v0.3.0.8_EN.pdf?_t=1526918471" target="_blank">Read Elastos Sidechain Whitepaper</a>
                <h3>Main chain, sidechains and friendchains</h3>
                <img src={Chains} />
                <p>
                    The Elastos main chain uses the arbitrator’s joint signature and SPV(Simplified Payment Verification) mechanism to guarantee the security of the transfer with the sidechain.
                    The main chain token holders(ELA holders) jointly elect a certain number of arbitrators.
                    The arbitrator is responsible for signing the token withdrawals from the sidechain to the main chain.
                    Each sidechain node synchronizes all of the block headers of the main chain.
                </p>
                <p>
                    The Elastos sidechain can use any consensus mechanism.
                    Currently, the Elastos team has already developed a POW consensus based sidechain that can connect with the main chain to complete SPV and DPOS based deposit and withdrawal operations.
                    This POW based sidechain can use the computing power of the main chain to ensure its own security.
                    What this essentially means is that if DApps choose to implement a POW based consensus mechanism, they can all piggyback on ELA merged mining hashpower that it inherits from the strong and resilient bitcoin network.
                </p>
                <p>
                    In addition, through the cross-chain technology, Elastos can also complete mutual transfers with other blockchain systems that issue their own token.
                    This kind of blockchain that can transfer funds with Elastos is called a “friend chain” and atomic swaps are possible between main chain and friendchains.
                </p>
                <h5>Asset transfer from main chain to sidechain</h5>
                <img src={SideChains} />
                <ol>
                    <li>User wants to convert their 5 ELAs to STOKENs</li>
                    <li>Initiate the transfer of 5 ELAs from main chain address U to the main chain address S(the sidechain address in main chain)</li>
                    <li>Transaction #1 is created with 5 ELAs and also the actual sidechain address u is attached to the transaction</li>
                    <li>Transaction #1 is transferred from main chain address U to main chain address S</li>
                    <li>Arbitrator on duty waits until Transaction #1 is put into a block by main chain miner and waits until sufficient confirmations</li>
                    <li>Arbitrator on duty then obtains Transaction #1 through its SPV(Simplified Payment Verification) module</li>
                    <li>Arbitrator on duty obtains the sidechain address u and constructs Transaction #2 that contains SPV Proof Path of Transaction #1 along with 5 STOKENs</li>
                    <li>Sidechain miner packages Transaction #2 and puts it into the sidechain's block</li>
                    <li>With the consensus method this sidechain has, it waits for sufficient confirmations</li>
                    <li>User gets 5 STOKENs on their sidechain address</li>
                </ol>
                <h5>Asset transfer from sidechain to main chain</h5>
                <img src={SideChains2} />
                <ol>
                    <li>User wants to convert 5 STOKENs to ELAs</li>
                    <li>Initiate the transfer of 5 STOKENs from sidehain address u to the main chain address U</li>
                    <li>Transaction #1 is created with 5 STOKENs and also the actual main chain address U is attached to the transaction</li>
                    <li>Transaction #1 is transferred from main chain address U to main chain address S</li>
                    <li>Arbitrator on duty waits until Transaction #1 is put into a block by sidechain miner and waits until sufficient confirmations</li>
                    <li>Arbitrator on duty then obtains Transaction #1 from its own sidechain node(every arbitrator has 1 node dedicated to each sidechain that exists on elastos ecosystem)</li>
                    <li>Arbitrator on duty obtains the main address U and constructs Transaction #2 that contains Transaction #1 hash along with 5 ELAs</li>
                    <li>Arbitrator on duty broadcasts the Transaction #2 to all the rest of the arbitrator nodes for signatures. Each arbitrator signs Transaction #2 and send back the signature to the arbitrator on duty</li>
                    <li>Arbitrator on duty waits to receive over 2/3rd of the arbitrator signatures and then submits Transaction #2 along with the received signatures to the main chain</li>
                    <li>Main chain miner packages Transaction #2 and puts it into the main chain's block</li>
                    <li>With the PoW consensus method of the main chain, it waits for sufficient confirmations</li>
                    <li>User gets 5 ELAs on their main chain address</li>
                </ol>
                <h5>Friendchains of Elastos</h5>
                <p>
                    When you convert N number of ELAs to a sidechain token, all you’re doing is locking x number of ELAs on the main chain and then unlocking y number of tokens on the sidechain.
                    Each sidechain address has a corresponding ELA address on the main chain for this very reason.
                    However, there are other use cases where the blockchain is not native to elastos ecosystem such as NEO, ETH, etc. These are known as friendchains.
                </p>
                <p>Elastos support for friendchain is separated into a two-stage process:</p>
                <ol>
                    <li>The first stage supports the cross-chain atomic transaction between the friendchain and the Elastos main chain. This type of transaction is peer to peer and requires the parties to negotiate exchange rates and create mutual and constrained atomic exchange transactions.</li>
                    <li>The second stage will be based on decentralized exchanges, supporting the free exchange of the main chain and friendchain tokens. Users will no longer need to create exchange transactions from user to user like in the atomic-swap example.</li>
                </ol>
                <h3>Asset Transfer between main chain and friendchains</h3>
                <p>
                    The first stage of atomic swap will be achieved using hash lock mechanism and will work as described below:
                </p>
                <img src={SideChains3} />
                <ol>
                    <li>Alice wants to sell 5 ELAs with Bob in exchange for 25 FTOKENs because the current market rate is 1 ELA = 5 FTOKENs</li>
                    <li>Alice generates a random number x and uses it to get hash(x) that is then encoded within Transaction #1 along with 5 ELAs</li>
                    <li>Alice puts Transaction #1 from her address EA to Elastos main chain E</li>
                    <li>Bob sees Transaction #1 on Elastos main chain E, constructs Transaction #2 with 25 FTOKENs along with hash(x) on Friendchain F</li>
                    <li>Alice sees Transaction #2 on Friendchain F and uses the number x along with her private key on Friendchain E to unlock this transaction. The 25 FTOKENs are then transferred to Alice</li>
                    <li>Bob sees that Transaction #2 has been unlocked and retrieves x</li>
                    <li>Bob signs Transaction #1 with his private key on Elastos main chain E along with the number x. This unlocks Transaction #1 for Bob and finally 5 ELAs are transferred to his address on Elastos main chain E</li>
                </ol>
                <a href="https://medium.com/@kiran.pachhai/elastos-architecture-the-main-chain-sidechains-and-friendchains-3727ef477d8e" target="_blank">Read an article on the main chain, sidechains and friendchains</a>
            </div>
        )
    }
}
