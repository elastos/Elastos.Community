# Gist
Elastos is an open source project made by open community. We reserved 16.5M ELA in order to reward the Elastos community members who contribute to the commmunity. EBP- Elastos Bounty Program is a web app platform for community members to take tasks, make contribution and get ELA as reward.

The whole EBP contains several subsidiary programs
- Elastos Developer Bounty Program - EDBP. Developers contribute code to Elastos
- Elastos Bug Bounty Program - EBBP. Users or testers find bugs and report to Elastos developers
- Elastos Social Bounty Program - ESBP. Social media users and influencers introduce Elastos to social media.
- Elastos Leader Bounty Program - ELBP. Reward to those leaders in different subsidiary communities (Universities, Countries, Cities community leader)
- Elastos Referral Bounty Program - ERBP. Reward to members who refer other users, leaders, members to join Elastos community that made significant contribution.

## EDBP: Elastos Developer Bounty Program
EDBP will start around June 2018.
Developers all over the world can join this program no matter geolocation and working hours.
The tasks will include
- Core components
- DApp samples
- Tutorial and training material
- Utilities , tools


## EBBP: Elastos Bug Bounty Program
EBBP will start Q4 2018.
All users can test our system, find bug and report to developers to get reward

The tasks will include
- Find bugs and report
- Join testing program, running real human test(especially on UI / UX)
- Report user experiences (automatic user behavior report)

## ESBP: Elastos Social Bounty Program
ESBP will start Q2 2018
All users can join ESBP, the tasks including
- Shoot YouTube video , podcast etc explaining Elastos (technical or social)
- Write blogs, tweets, facebook posts etc explaining Elastos
- Make comments ask or answer questions on social media, especially on Stackoverflow
- Repost, forward, rebroadcast sharing information


## ELBP: Elastos Leader Bounty Program
ELBP will start Q2 2018
Candidates need to lead a Elastos local community, either in a University or a country/region/city. They need to
- Organize local meetup, Hackathon, Seminar, Webinar events
- Introduce Elastos to audience
- Lead DApp projects

## ERBP: Elastos Referral Bounty Program
ERBP will start Q2, 2018
Members who refer another members who made significant contribution to Elastos community, he will get reward for the referral. 

## Other special bounty program
//TODO

# Terminalogies
## Campaign
A task is a campaign. 
A campaign need the following properties
- Campaign manager: a people who in charge of this campaign. He design the campaign, explain campaign to other members. Issue reward ELA to the winners.
- Start and Expire time. Even circulating campaign need a expire time and auto renew policy
- Reward. How the reward is calculated
- Detail rule in plain English.

Campaign has several types
### Development task
Example: I want someone to build a sample code for Elastos carrier. I post the requirements and offer 100 ELA + 100 Voting power as reward. I require candidates to send proposal to me in 3 days. 3 candidates send me the proposal and their schedule. I choose A to be the winner. If A complete the task in time and quality. I will send ELA and issue the voting power to A. If A did not make it, or did not complete in time ( even not meet any middle milestone), the campaign stopped, and I will restart the campaign and may issue to B.

### Competition task
Example: I want to have a Elastos logo competition. I offer 100ELA and 100 Voting power for the winner. Candidates need to submit their design logo in one month. After one month, 10 candidates logos are received. I will post all design logos to the EBP site. Everyone in the community can vote which one is best. The winner will take the ELA and Voting power. 
Sometime we also offer the 2nd or 3rd some kind of reward, like uncle reward etc.

### Proof of Work task
Example: I post a long term campaign. Offer 1 ELA and 1 voting power to 100 members every month who answered valuable technical question on Stackoverflow. All candidates need to submit some proof of work to me. I got 200 candidates submits. I choose top 100 and issue them ELA and voting power. 

### Voting task
Example: Every 3 months, we vote for the next country leader in Indian. We will require all Indian community number to vote, the winner will be the next community leader in Indian community. The leader himself will get fixed amount of bonus due to his working during the 3 months.

### Peer Bonus task
Example: Every month. We will ask members to send his voting power to anyone who has given him big help during this month. It could be a team leader, or some youtuber, or someone answered tough technical questions. These voting power will be converted to 1:1 ELA as bonus to the helper. So if you want to get more bonus, the best way to help more people!

## Reward
We have two kind of reward in the EBP system.
- ELA reward and
- Voting Power reward

### ELA reward.
It is just ELA. Winner will get ELA from the campaign manager.
### Voting Power reward
Usually a winner will get another kind of reward besides ELA. It is called voting power.
Voting power is kind of point reward system. 

Voting power:
- Can be used in all kinds of vote in EBP system. For example it can be used to determine who is the best DApp in a competition. Who should be the next country leader in next turn.
- Will be destroyed after voting. It is a limited resource
- Cannot be used to vote to voter himself
- Cannot be convert to ELA or any kind of currency
- Can only be obtain by reward by EBP, eg, doing a task.
- Will expire if not use in a certain length of time.

Voting power is inspired by Steem's design. It encourage members to earn more voting power so that they can determine something. The more voting power you own, the more voting weight you have. 

The differences between ELA and Voting power
- ELA won't expire, Voting power will. User need to use them otherwise they are gone
- ELA can be exchanged to or from other coin or fiat, Voting power won't. It has no real cash value
- ELA can be used anonymously, but voting power needs real user ID.
- ELA can be purchased but voting power are only issue to people who contribute to EBP. If you do not work for EBP, you do not have voting power.

# EBP platform webapp brief introduction
Before the Elastos completed, we can only use traditional centralized platform to build the EBP webapp. It will be a cloud based webapp. It will have mobile version as well.

## Accounts
User need to login to use EBP. Login will be associate with 
- github account for all developers and tester.
- google account for all you tubers
- other account system to proof the ownership
- ELA public address for receiving ELA

A user can have multiple accounts associate with.

User can login log out edit and save profile. Check account balance, send voting power etc.


## Roles
- System admin
- Campaign manager
- Users

## ELA
ELA will NOT be saved to this platform. We only record the transaction history. Campaign manager need to use ELA wallet or any kind of wallet and transfer ELA funds

## Voting power
Voting power will be saved in the system. Every time user receive voting power, it will be recorded the amount and the expire date.
For example:

| Amount | Issue date | Expire date | Status | Memo |
|-----|------|------|-----|------|
| 100 | 01-01-2018 | 04-01-2018 | expired | from campaign ABC |
| 50 | 04-01-2018 | 07-01-2018 | active | from gift bonus program BCE |


When sending or consuming voting power, the oldest will be used first.

Unused voting power will be expired and no longer valid.
After consuming, the voting power will be burned.

## Cascade organization
At the beginning, Elastos foundation will be the only campaign manager. We issue ELA to each local community leader and each DAPP project leader. They could be the next campaign manager, to breakdown their task and post to EBP. Their local team member will take the task and reward by completing the tasks. 
In a visual example, the ELA flows from the Elastos foundation as a source, flow into each smaller level project leaders, local team leaders.They get the ELA and breakdown tasks, the ELA will flow to each local community members. And so on.



# [EBP platform technical design](./EBP_Tech_Design.md)

# [EBP platform UX design](./EBP_UX_Design.md)

# Future of EBP
When Elastos is ready, we will move the EBP to Elastos platform, as one of the DApps on Elastos.

