
# Elastos - A high-level overview

![elastos-ecosystem](https://raw.githubusercontent.com/elastos/Elastos.Community/master/docs/imgs/elastos-ecosystem.png)

You can learn more at our Developer Website at [developer.elastos.org](https://developer.elastos.org) 

## 1) The Elastos Blockchain

#### A wholly independent protocol and blockchain that acts as the foundation and root of trust for most of the Elastos ecosystem.

<ol style="list-style-type: upper-alpha; font-weight: 400;">
<li>
Uses a PoW consensus mechanism based on SHA256, the same algorithm used by Bitcoin (BTC). Blocks are set at ~2 minute block times and 8 MB size limits, compared to BTC at ~10 minutes and 1MB. The result: Elastos mainchain possesses 35-40x the relative performance of BTC.<br/><br/>
As the mainchain only functions as a root of trust, this is sufficient for its purposes. Scalability is intended by its design to derive from the sidechains and superior decentralized models using other services in the Elastos ecosystem.
</li>
<li>
<b>Mainnet was deployed and live on December 22, 2017</b> and has been running ever since.
</li>
<li>
<b>Elastos merge-mining (also called AuxPoW) was launched on August 26, 2018,</b> made possible by sharing the same hashing algorithm as Bitcoin and strategic partnerships with some of the world’s largest Bitcoin mining pools.<br/><br/>
This is the exact same merge-mining specification officially recognized by Bitcoin and used by Namecoin. In the context of the official specification, Elastos is considered the auxiliary chain, which gives rise to the consensus algorithm’s name Auxiliary PoW, or AuxPoW for short.<br/><br/>
Through merge-mining, Elastos effectively leverages the hash power of the Bitcoin blockchain, which provides the highest degree of network security available in the blockchain space. Additionally, merge-mining is energy efficient, as it requires no additional computing power to be expended by the mainchain during the merge-mining process.
</li>
<li>
<b>As of early 2019, Elastos has amassed over 50% of Bitcoin’s hashrate,</b> which easily solidifies its position as one of the top 5 blockchains in the world by the common cost-to-attack metric. (Calculated as a % of BTC in regards to ranking).
</li>
</ol>

<br/>
<br/>

## 2) DPoS Supernodes

#### The ELA native token of Elastos’ mainchain, secured by over 50% of BTC’s hashrate, is used in turn to vote for a set of “DPoS Supernodes” which are ranked within the top 108 participating in DPoS Consensus to conduct block validation.

While the Bitcoin blockchain does provide tremendous hash power - thus making its network extremely expensive and difficult to corral - it is still technically vulnerable to a 51% attack, as is the nature of the standalone Proof of Work consensus algorithm. To address the potentiality of such an event, Elastos employs Delegated Proof of Stake (DPoS) in order to install an additional layer of decentralization through its electoral structure. In a standard DPoS consensus algorithm, token holders democratically elect a number of nodes that produce and validate blocks on the network. In this system, token holders use their voting power to elect nodes that they deem honest to serve the blockchain. For Elastos, the task of producing blocks is conducted by merge-miners, so DPoS nodes serve to officially validate the incoming blocks that have been solved via AuxPoW. As such, DPoS provides an additional layer of security that can filter out faulty blocks in the event that a rogue entity consolidates 51% of Bitcoin’s hash power.

Even in a well-functioning PoW system, inefficiencies may occur. Because the Proof of Work consensus algorithm sources transaction validation services from a body of voluntary nodes, it may amass thousands of active nodes at any given moment. Through their competition, PoW generates an honest system of transaction validation. However, inefficiencies may arise when two nodes solve blocks near-simultaneously, and the chain forks as the validating nodes split into two clusters. These two chains can continue to lengthen separately until the network finally reaches consensus on which chain is valid and which contains the obsolete “orphan blocks.” While inefficiency is not immediately observable to users transacting on the network, it can be experienced in the form of significant network latency, as particular transactions can require upwards of an hour for full confirmation. Elastos draws on DPoS to resolve both issues concerning network vulnerability and inefficiencies resulting from forking by providing “Finality,” in the process of block validation. By stamping blocks with “Finality,” DPoS nodes keep PoW nodes in agreement as to which chain is valid in the network.

By combining AuxPoW and DPoS, Elastos has effectively built a hybrid AuxPow/DPoS consensus algorithm. This is in a few minimal ways similar to Ethereum’s Hybrid Casper FFG (Hybrid PoS/PoW) algorithm. However, due to Elastos’ slower ~2 minute blocktime -  as compared to  Ethereum’s ~15 seconds - Elastos can produce a DPoS signature for each block, whereas Casper FFG can only do so for every 50th block. Thus, Elastos boasts superior security.

<br/>
<br/>

## 3) The Ethereum Sidechain

#### A key sidechain in the Elastos ecosystem is the “Ethereum-based” Elastos Ethereum (ETH) Sidechain.

The Elastos ETH Sidechain serves to provide execution of smart contracts written in Solidity for the Elastos ecosystem. As the most ubiquitous smart contract language in the world, Solidity was chosen to maximize compatibility and improve the learning curve for blockchain developers wishing to build on Elastos.

Additionally, if there is an existing smart contract dApp that currently runs on Ethereum, it can be easily ported to run on Elastos as well. The Elastos ETH Sidechain uses a fully compatible Ethereum Virtual Machine (EVM) that can run identical smart contracts compiled for the Ethereum network on Elastos.

##### However, there are a pair of distinct advantages that the Elastos ETH Sidechain has over Ethereum:

1. **Elastos ETH Sidechain uses DPoS Consensus, which is much faster than PoW** and allows for an increased per block gas limit. Gas is a concept in Ethereum-based systems that acts as a unit of value to pay for computer operations; the same is used by Elastos. Since the miners do not have to do expensive PoW computations, it frees up resources to technically allow more transactions per block. Therefore, Elastos is able to increase its TPS for Ethereum transactions by many orders of magnitude.

2. **The Elastos ETH Sidechain uses gas fees will inherently be lower than Ethereum**
    There is a 1-to-1 exchange ratio between ELA and ELAETHSC, which is the equivalent of ETH for the Elastos ETH Sidechain and registered at https://chainid.network with Ethereum chainIds 20 and 21. Because the Elastos ETH Sidechain uses DPoS and PBFT, only the Elastos Supernodes that participate need to be incentivized to run the Ethereum process. Therefore the total rewards for DPoS participation can be a minimum fixed value and we can adjust the gas fees to maintain the rewards.
   
    In general as the cost of ELA increases we can decrease the gas fees to keep the DPoS rewards at roughly the same value. Also if the Elastos ETH Sidechain experiences more usage and volume, we can decrease the gas fees for the same reason, thus benefiting the users by spreading out the DPoS Supernode incentives across more transactions. The resulting dynamic is that usage costs for the Elastos ETH Sidechain will be consistently far lower than Ethereum currently is, and could become even lower as usage grows.
   
    By having a lower gas cost while retaining at least the same level security, developers can use smart contracts for more functions that were previously cost prohibitive. Also, Elastos’ flexible sidechain architecture can potentially allow for more parallel sidechains if demand requires them. This means Elastos infrastructure could be expanded to have not one ETH sidechain but multiple ETH sidechains with similar or different functionalities or even different consensus mechanisms.
    
<br/>
<br/>

## 4) elastOS 

#### Elastos has also built the ElastOS application, a mobile application designed for all traditional mobile devices that gives developers a standard platform for developing dApps.

elastOS is both a decentralized browser and runtime that runs packaged “capsules,” which are decentralized applications built by developers. Capsules have access to a suite of plugins that provide access to the myriad of services, tools, and blockchains in the Elastos ecosystem. Most importantly it enforces the Elastos design philosophy that dApps should not have unpermissioned access to the internet. To prevent malicious actors, spam attacks, and impersonation, all network activity must be authenticated by a Decentralized Identifier (DID) at the very least.

A key plugin to allow for true dApps is the Elastos Carrier plugin. Elastos Carrier is a network of over 200,000 active P2P nodes (as of this writing) which securely relay-encrypted connections between nodes. In using this plugin, any elastOS capsule can connect to other capsules without the need for intermediate or centralized servers.

elastOS also has access to other decentralized services in the Elastos ecosystem that provide the equivalent requirements of  applications in the traditional world. For example, Elastos Hive provides storage, the Elastos DID Sidechain provides identities and authentication, and the Elastos ETH Sidechain provides computational and smart contract capabilities.

Beyond integrating the Elastos ecosystem’s sophisticated technical components,  elastOS has been carefully designed  to support developers and end users to enable them to leverage the key advantages conferred by decentralized systems and blockchain technology. In other words, elastOS is an application designed to make the Elastos ecosystem’s core infrastructure, well, applicable.  

The challenge faced by all budding projects trying to find their way in the nascent blockchain space is that they require the installation of a number of plugins in the user’s browser, and therefore do not offer a competitive user experience. elastOS sets itself apart by putting all the pieces together in one place, creating a seamless user experience without sacrificing the cutting-edge benefits conferred by Elastos’ blockchain, suite of decentralized technologies, and collection of development tools and capsules. In short, elastOS can be likened to a sort of protective shell that surrounds dApps so as to protect users and their rights to privacy and digital asset ownership; native applications can hardly offer such security. 

<br/>
<br/>

## 5) DID Sidechain

#### As a member of the Decentralized Identity Foundation (DIF), Elastos maintains a dedicated blockchain to support a W3C-compliant DID implementation.

The Elastos ecosystem includes a dedicated blockchain to provide the essential functions of DIDs. By using a dedicated sidechain, we ensure the highest possible availability of the critical identity data required by dApps and products on Elastos.

Recognizing the importance of self-sovereign identities and the global movement to a standardized decentralized identity model, the Elastos Foundation has joined the Decentralized Identity Foundation (DIF) and dedicated significant resources to ensure that its DID services follow the W3C Decentralized Identifier (DID) specification.

<br/>
<br/>

## 6) Elastos Hive

#### A flexible, decentralized storage solution.

Data storage is a ubiquitous requirement of virtually every application, and, historically speaking, decentralized solutions have seen limited improvements beyond the widely accepted IPFS solution. Elastos is building a more flexible decentralized storage solution with swappable storage constructs allowing private storage and public decentralized storage behind robust Swift/Java SDKS for mobile devices.

Elastos Hive can be better likened to an interface than an actual storage service in that it allows developers to choose from numerous storage services which contain IPFS (Interplanetary File System) and Microsoft Onedrive, among others. The idea behind Hive is to provide developers with the choice of which storage service to use so they do not become dependent on a singular storage solution. Developers can decide to connect their apps to IPFS, Onedrive, or any other storage services supported by Hive in the future.

Furthermore, whereas Hive is used directly by developers, Hive++, which is an upgraded and advanced version of Hive, allows users to directly select a storage service from any application. Instead of developers choosing a solution for the users, users can decide to choose the solution for themselves, where they can decide to use their own personal computer as their cloud drive or use other community-run nodes known as Vaults  for their storage solution. Most importantly, Hive++ brings the capability of DID to the storage layer, where control and accessibility to shared data is decided by the users themselves. In other words, users can store data on Vaults and control who can view their data and who cannot. Such a revolutionary mechanism establishes a new standard of self-ownership that is presently unrivaled across the blockchain space.

