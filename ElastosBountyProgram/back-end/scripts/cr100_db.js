
// MAKE SURE YOU RUN BUILD BEFORE THIS

// this is what sets the process.env
require('../dist/src/config');

(async () => {

    const db = await require('../dist/src/db').default
    const DB = await db.create()

    const db_task = DB.getModel('Task')

    try {
        const names = {
            "Developer Tool (Natural Language Smart Contract)": "Natural Language Coding",
            "Food Delivery": "Delivery",
            "Crypto Collectibles": "Crypto-collectibles",
            "Online Doctor": "Doctors",
            "Virtual Reality World App": "Virtual World",
            "Conversational User Interface (CUI) DApp": "Conversational UI",
            "Governance - DAO": "Governance",
            "Real Estate Market": "Real Estate",
            "Land Registry & Title Records": "Land Registry/Title Records",
            "Drugs / Pharmaceuticals": "Drugs & Pharmaceuticals",
            "Stablecoin": "Stablecoins",
            "Wallet": "Wallet (soft+hard)",
            "Artwork": "Art",
            "Athlete Talent": "Athletes",
            "Smart Car": "Autonomous Car",
            "Online Education": "Education",
            "Travel DApp": "Travel",
            "Microblogging": "Micro-blogging",
            "Dating App": "Dating",
            "Virtual Private Network (VPN)": "VPN/Cyber Security",
            "Ownership": "Ownerships",
            "Election": "Voting/Election",
            "Crowdsource Analytics": "Crowd Source Analytics",
            "Commodities Market": "Commodities",
            "Security Tokenization": "Security Token",
            "Gaming  (MMORPG)": "Gaming (MMORPG)",
            "Mesh Networking": "Mesh Network",
            "Asset-Backed Loans": "Asset-backed Loans",
        };

        let updated = 0
        for (const x in names) {
            const res = await db_task.update({ name: x }, { name: names[x] })
            if (res.nModified === 1) {
                updated = updated + 1
            }
            else if(res.n !== 1 && res.n !== 0) {
                console.log("Warning! More than 1 entries have been modified")
            }
        }

        console.log(updated + " names have been modified")

        const ids = {
            "Lottery": 1,
            "Voting/Election": 2,
            "Natural Language Coding": 3,
            "Interoperability": 4,
            "Ownerships": 5,
            "Photography": 6,
            "Food Safety": 7,
            "Real Estate": 8,
            "Oracle Network": 9,
            "Legal": 10,
            "Delivery": 11,
            "Ticketing": 12,
            "Homeshare": 13,
            "Healthcare": 14,
            "Land Registry/Title Records": 15,
            "Drugs & Pharmaceuticals": 16,
            "Stablecoins": 17,
            "Loyalty Rewards": 18,
            "Wallet (soft+hard)": 19,
            "Tokenized Debt": 20,
            "Privacy Coin": 21,
            "Payment Gateway": 22,
            "Card Provider": 23,
            "Charity": 24,
            "Books/Publishing": 25,
            "Freelance Market": 26,
            "Data Storage": 27,
            "Crypto-collectibles": 28,
            "Movies": 29,
            "Ride Hailing": 30,
            "Data Market": 31,
            "Art": 32,
            "Crowdfunding": 33,
            "Community Exchange": 34,
            "Music": 35,
            "Journalism": 36,
            "Advertising": 37,
            "P2P Lending": 38,
            "Mobile Payment": 39,
            "Business Sales Portal": 40,
            "Doctors": 41,
            "OTC Derivative Market": 42,
            "Reputation": 43,
            "Prediction Market": 44,
            "Remittance": 45,
            "Supply Chain": 46,
            "Supply Chain Finance": 47,
            "Commodities": 48,
            "Security Token": 49,
            "Financial Reporting": 50,
            "Insurance": 51,
            "Asset-backed Loans": 52,
            "Logistics Management": 53,
            "Investment Management": 54,
            "Casino": 55,
            "Athletes": 56,
            "Esports": 57,
            "Fitness Motivation": 58,
            "Gaming (MMORPG)": 59,
            "Sports Club": 60,
            "Virtual World": 61,
            "Autonomous Car": 62,
            "IOT Suite": 63,
            "Science Network": 64,
            "Smart Contract Security": 65,
            "Conversational UI": 66,
            "Drones": 67,
            "Smart Home": 68,
            "Hotels": 69,
            "Messaging": 70,
            "Email": 71,
            "Location": 72,
            "Video Sharing": 73,
            "Education": 74,
            "Travel": 75,
            "Airlines": 76,
            "Education Credentials": 77,
            "Tourism": 78,
            "Social Network": 79,
            "Recruitment": 80,
            "Micro-blogging": 81,
            "Mesh Network": 82,
            "Time Share": 83,
            "Dating": 84,
            "Animal Conservation": 85,
            "Identity": 86,
            "Crowd Source Analytics": 87,
            "Cloud Computing": 88,
            "Authenticity": 89,
            "Search & Rescue": 90,
            "Documentation": 91,
            "Browser": 92,
            "Precision Farming": 93,
            "Search Engine": 94,
            "Natural Resource Harvesting": 95,
            "VPN/Cyber Security": 96,
            "Precious Metal/Mineral Tracking": 97,
            "Pollution Control": 98,
            "Online Shopping": 99,
            "Governance": 100
        }

        for (const x in ids) {
            const res = await db_task.update({ name: x },
                {
                    dAppId: ids[x],
                    thumbnail: "https://s3-us-west-1.amazonaws.com/ebp-staging-files/cr100/" +  ids[x] + ".png"
                }
            )
            if(res.n !== 1 && res.n !== 0) {
                console.log("Warning! More than 1 entries have been modified")
            }
            //console.log(await db_task.find({ name: x }))
        }

    } catch (err) {
        console.error(err)
    }

    process.exit(1)
})()