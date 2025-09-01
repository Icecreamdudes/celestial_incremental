addLayer("le", {
    name: "Light Extractor", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "LE", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        starmetalAlloyToGetTrue: new Decimal(0),
        starmetalAlloyToGet: new Decimal(0),
        starmetalAlloyToGetToGet: new Decimal(1),
        starmetalAlloyReq: new Decimal(1e6),
        starmetalAlloyPause: new Decimal(0),
        starmetalAlloyPauseAgain: new Decimal(0),

        resetAmount: new Decimal(0),

        punchcards: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        punchcardsEffect: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),],
        punchcardsPassiveEffect: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),],
        punchcardsLevels: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),],
        punchcardsLevelsEffect: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),],
        punchcardsEffectText: ["","","","","","","","","","","","","","","","","","","","",],
        punchcardsEffectText2: ["","","","","","","","","","","","","","","","","","","","",],
        punchcardsPassiveEffectText: ["","","","","","","","","","","","","","","","","","","","",] ,
        punchcardsXP: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),  new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),],
        punchcardsXPReq: [new Decimal(10), new Decimal(25), new Decimal(10), new Decimal(10), new Decimal(10), new Decimal(10), new Decimal(25), new Decimal(10), new Decimal(10), new Decimal(25), new Decimal(25), new Decimal(10), new Decimal(25), new Decimal(25), new Decimal(75), new Decimal(75), new Decimal(25), new Decimal(25), new Decimal(75), new Decimal(75),],
        punchcardIndex: new Decimal(0),
        punchcardsUnlocked: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        selectedPunchcards: [0, 0, 0],
        punchcardImages: ["","","","","","","","","","","","","","","","","","","","",],

        activePunchcards: [],
        activePunchcardIndex: new Decimal(0),

        lockedPunchcard: "<img src='resources/Punchcards/lockedPunchcard.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        punchcardNames: ["","","","","","","","","","","","","","","","","","","","",],
        punchcardSelections: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,],
        storedSelections: new Decimal(0),
        selectionIndex: new Decimal(0),

        /*
        punchcard ids:
        0 - Point based on points
        1 - Point Softcap Weakener (Rare)
        2 - Prestige Points based on Prestige Points
        3 - Rank Effect + Rank Points based on points
        4 - Tier Effect + Tier Points based on points
        5 - Tetr Effect + Tetr Points based on points
        6 - All Rank/Tier/Tetr Effects based on points (Rare)

        //generator (starting 2 resets)
        7 - Generator based generators
        8 - Generator Power based on generator power
        9 - Points based on generators (Rare)
        10 - Prestige points based on generators (Rare)

        //grass (starting at 4 resets) + starmetal upgrade
        11 - Grass value and capacity based on grass
        12 - Grass value and capacity based on generators (Rare)
        13 - Grass value and capacity based on prestige (Rare)

        //EPIC CARDS (need the upgrade)
        14 - Multipurpose (Boosts points, all rank points, prestige, generators, generators, grass cap + val based on starmetal alloy) (Epic)
        15 - Matos (Key to unlocking the matos layer (not fully unlocking it however)), boosts starmetal alloy gain on leave (Epic)
        
        //pent
        16 - Pent

        //eclipse
        17 - Booster req and effect (rare)
        18 - Slows effect decrease time (epic)
        19 - Eclipse shards (epic)
        //
        */


        eclipseShardsToGetTrue: new Decimal(0),
        eclipseShardsToGet: new Decimal(0),
        eclipseShardsToGetToGet: new Decimal(1),
        eclipseShardsReq: new Decimal(1e6),
        eclipseShardsValue: new Decimal(5),
    }},
    automate() {
        if (hasUpgrade("sma", 201)) {
            buyUpgrade("le", 11)
            buyUpgrade("le", 12)
            buyUpgrade("le", 13)
            buyUpgrade("le", 14)
            buyUpgrade("le", 15)
            buyUpgrade("le", 16)
            buyUpgrade("le", 17)
            buyUpgrade("le", 18)
            buyUpgrade("le", 19)
            buyUpgrade("le", 21)
            buyUpgrade("le", 22)
            buyUpgrade("le", 23)
            buyUpgrade("le", 101)
            buyUpgrade("le", 102)
        }
    },
    nodeStyle() {
        return {
            background: "linear-gradient(15deg, #4cc1c7 0%, #2a79ad 50%, #1a2f78 100%)",
            "background-origin": "border-box",
            "border-color": "#8ca3ff",
            "color": "#f5f7ff",
        };
    },
    tooltip: "Light Extractor",
    branches: ["in"],
    color: "black",
    update(delta) {
        let onepersec = new Decimal(1)

        player.le.starmetalAlloyReq = Decimal.pow(1e1, player.le.resetAmount.add(1).pow(1.5).floor()).mul(1e2)
        if (player.le.resetAmount.gte(3)) player.le.starmetalAlloyReq = Decimal.pow(1e1, player.le.resetAmount.add(1).pow(2.5).floor()).mul(1e2)
        if (player.le.resetAmount.gte(8)) player.le.starmetalAlloyReq = Decimal.pow(1e1, player.le.resetAmount.add(1).pow(2.6).floor()).mul(1e2)
        player.le.starmetalAlloyReq = player.le.starmetalAlloyReq.div(player.dn.normalityEffect) 
        player.le.starmetalAlloyReq = player.le.starmetalAlloyReq.div(levelableEffect("st", 208)[0])

        if (player.le.starmetalAlloyPause.gte(0)) layers.le.starmetalReset();
        player.le.starmetalAlloyPause = player.le.starmetalAlloyPause.sub(1)

        if (player.le.starmetalAlloyPauseAgain.gte(0)) layers.le.starmetalResetAgain();
        player.le.starmetalAlloyPauseAgain = player.le.starmetalAlloyPauseAgain.sub(1)

        player.le.starmetalAlloyToGetToGet = player.le.resetAmount.add(1)
        player.le.starmetalAlloyToGetToGet = player.le.starmetalAlloyToGetToGet.mul(buyableEffect("sma", 12))
        player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGet
        if (player.le.punchcards[15]) player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGetTrue.mul(player.le.punchcardsEffect[15])
        player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGetTrue.mul(player.le.punchcardsPassiveEffect[15])
        player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGetTrue.mul(buyableEffect("dn", 11))
        player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGetTrue.mul(buyableEffect("sma", 11))
        player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGetTrue.mul(buyableEffect("ep1", 11))
        player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGetTrue.mul(levelableEffect("pet", 404)[2])
        player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGetTrue.mul(buyableEffect("ma", 23))
        if (hasUpgrade("sma", 204)) player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGetTrue.mul(upgradeEffect("sma", 204))
        if (hasMilestone("db", 102)) player.le.starmetalAlloyToGetTrue = player.le.starmetalAlloyToGetTrue.mul(1.2)

        //punchcards
        player.le.lockedPunchcard = "<img src='resources/Punchcards/lockedPunchcard.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>"
        player.le.punchcardImages = [
            "<img src='resources/Punchcards/punchcard0.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
            "<img src='resources/Punchcards/punchcard1.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
            "<img src='resources/Punchcards/punchcard2.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
            "<img src='resources/Punchcards/punchcard3.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
            "<img src='resources/Punchcards/punchcard4.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
            "<img src='resources/Punchcards/punchcard5.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
            "<img src='resources/Punchcards/punchcard6.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
            "<img src='resources/Punchcards/punchcard7.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
            "<img src='resources/Punchcards/punchcard8.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
            "<img src='resources/Punchcards/punchcard9.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
            "<img src='resources/Punchcards/punchcard10.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
            "<img src='resources/Punchcards/punchcard11.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
            "<img src='resources/Punchcards/punchcard12.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
            "<img src='resources/Punchcards/punchcard13.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
            "<img src='resources/Punchcards/punchcard14.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
            "<img src='resources/Punchcards/punchcard15.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
            "<img src='resources/Punchcards/punchcard16.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
            "<img src='resources/Punchcards/punchcard17.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
            "<img src='resources/Punchcards/punchcard18.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
            "<img src='resources/Punchcards/punchcard19.png'style='width:calc(132%);height:calc(132%);margin:-16%'></img>",
        ]
        player.le.punchcardNames = [
            "Points based on points",
            "Point Softcap Weakener",
            "Prestige Points based on Prestige Points",
            "Rank Effect and Rank Points based on points",
            "Tier Effect and Tier Points based on points",
            "Tetr Effect and Tetr Points based on points",
            "All Rank/Tier/Tetr Effects based on points",
            "Generators based on generators",
            "Generator Power based on generator power",
            "Points based on generators",
            "Prestige points based on generators",
            "Grass based on grass",
            "Grass based on generators",
            "Grass based on prestige",
            "Multipurpose I",
            "Matos",
            "Pent",
            "Booster",
            "Time",
            "Eclipse",
        ]
        player.le.punchcardsXPReq = [
            player.le.punchcardsLevels[0].pow(1.5).mul(10).floor(),
            player.le.punchcardsLevels[1].pow(1.6).mul(25).floor(), 
            player.le.punchcardsLevels[2].pow(1.5).mul(10).floor(),
            player.le.punchcardsLevels[3].pow(1.5).mul(10).floor(),
            player.le.punchcardsLevels[4].pow(1.5).mul(10).floor(),
            player.le.punchcardsLevels[5].pow(1.5).mul(10).floor(),
            player.le.punchcardsLevels[6].pow(1.6).mul(25).floor(),
            player.le.punchcardsLevels[7].pow(1.5).mul(10).floor(),
            player.le.punchcardsLevels[8].pow(1.5).mul(10).floor(),
            player.le.punchcardsLevels[9].pow(1.6).mul(25).floor(),
            player.le.punchcardsLevels[10].pow(1.6).mul(25).floor(),
            player.le.punchcardsLevels[11].pow(1.5).mul(10).floor(),
            player.le.punchcardsLevels[12].pow(1.6).mul(25).floor(),
            player.le.punchcardsLevels[13].pow(1.6).mul(25).floor(),
            player.le.punchcardsLevels[14].pow(1.6).mul(75).floor(),
            player.le.punchcardsLevels[15].pow(1.6).mul(75).floor(),
            player.le.punchcardsLevels[16].pow(1.6).mul(25).floor(), 
            player.le.punchcardsLevels[17].pow(1.6).mul(25).floor(), 
            player.le.punchcardsLevels[18].pow(1.6).mul(75).floor(), 
            player.le.punchcardsLevels[19].pow(1.6).mul(75).floor(), 
        ]
        player.le.punchcardsLevelsEffect = [
            player.le.punchcardsLevels[0].lt(11) ? player.le.punchcardsLevels[0].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[0].sub(9).log(2).mul(0.1).add(1.9),
            player.le.punchcardsLevels[1].lt(11) ? player.le.punchcardsLevels[1].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[1].sub(9).log(2).mul(0.1).add(1.9),
            player.le.punchcardsLevels[2].lt(11) ? player.le.punchcardsLevels[2].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[2].sub(9).log(2).mul(0.1).add(1.9),
            player.le.punchcardsLevels[3].lt(11) ? player.le.punchcardsLevels[3].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[3].sub(9).log(2).mul(0.1).add(1.9),
            player.le.punchcardsLevels[4].lt(11) ? player.le.punchcardsLevels[4].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[4].sub(9).log(2).mul(0.1).add(1.9),
            player.le.punchcardsLevels[5].lt(11) ? player.le.punchcardsLevels[5].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[5].sub(9).log(2).mul(0.1).add(1.9),
            player.le.punchcardsLevels[6].lt(11) ? player.le.punchcardsLevels[6].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[6].sub(9).log(2).mul(0.1).add(1.9),
            player.le.punchcardsLevels[7].lt(11) ? player.le.punchcardsLevels[7].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[7].sub(9).log(2).mul(0.1).add(1.9),
            player.le.punchcardsLevels[8].lt(11) ? player.le.punchcardsLevels[8].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[8].sub(9).log(2).mul(0.1).add(1.9),
            player.le.punchcardsLevels[9].lt(11) ? player.le.punchcardsLevels[9].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[9].sub(9).log(2).mul(0.1).add(1.9),
            player.le.punchcardsLevels[10].lt(11) ? player.le.punchcardsLevels[10].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[10].sub(9).log(2).mul(0.1).add(1.9),
            player.le.punchcardsLevels[11].lt(11) ? player.le.punchcardsLevels[11].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[11].sub(9).log(2).mul(0.1).add(1.9),
            player.le.punchcardsLevels[12].lt(11) ? player.le.punchcardsLevels[12].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[12].sub(9).log(2).mul(0.1).add(1.9),
            player.le.punchcardsLevels[13].lt(11) ? player.le.punchcardsLevels[13].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[13].sub(9).log(2).mul(0.1).add(1.9),
            player.le.punchcardsLevels[14].lt(11) ? player.le.punchcardsLevels[14].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[14].sub(9).log(2).mul(0.1).add(1.9),
            player.le.punchcardsLevels[15].lt(11) ? player.le.punchcardsLevels[15].sub(1).mul(0.05).add(1) : player.le.punchcardsLevels[15].sub(9).log(2).mul(0.05).add(1.9),
            player.le.punchcardsLevels[16].lt(11) ? player.le.punchcardsLevels[16].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[16].sub(9).log(2).mul(0.1).add(1.9),
            player.le.punchcardsLevels[17].lt(11) ? player.le.punchcardsLevels[17].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[17].sub(9).log(2).mul(0.1).add(1.9),
            player.le.punchcardsLevels[18].lt(11) ? player.le.punchcardsLevels[18].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[18].sub(9).log(2).mul(0.1).add(1.9),
            player.le.punchcardsLevels[19].lt(11) ? player.le.punchcardsLevels[19].sub(1).mul(0.05).add(1) : player.le.punchcardsLevels[19].sub(9).log(2).mul(0.05).add(1.9),
        ]
        player.le.punchcardsPassiveEffect = [
            player.le.punchcardsLevels[0].lt(11) ? Decimal.pow(1000, player.le.punchcardsLevels[0].sub(1)) : Decimal.pow(500, player.le.punchcardsLevels[0].sub(10).log(2)).mul(1e30), //Infinity Points
            player.le.punchcardsLevels[1].lt(11) ? player.le.punchcardsLevels[1].sub(1).mul(0.03).add(1).pow(0.8) : player.le.punchcardsLevels[1].sub(10).log(1.6).mul(0.03).add(1.23), //Check back cooldowns
            player.le.punchcardsLevels[2].lt(11) ? Decimal.pow(100, player.le.punchcardsLevels[2].sub(1)) : Decimal.pow(50, player.le.punchcardsLevels[2].sub(10).log(2)).mul(1e20), //Negative Infinity Points
            player.le.punchcardsLevels[3].lt(11) ? Decimal.pow(250, player.le.punchcardsLevels[3].sub(1)) : Decimal.pow(125, player.le.punchcardsLevels[3].sub(10).log(2)).mul(9.54e23),//Anonymity
            player.le.punchcardsLevels[4].lt(11) ? Decimal.pow(125, player.le.punchcardsLevels[4].sub(1)) : Decimal.pow(75, player.le.punchcardsLevels[4].sub(10).log(2)).mul(9.31e20), //Oil
            player.le.punchcardsLevels[5].lt(11) ? Decimal.pow(50, player.le.punchcardsLevels[5].sub(1)) : Decimal.pow(25, player.le.punchcardsLevels[5].sub(10).log(2)).mul(9.77e16), //Charge
            player.le.punchcardsLevels[6].lt(11) ? player.le.punchcardsLevels[6].sub(1).mul(0.1).add(1).pow(0.7) : player.le.punchcardsLevels[1].sub(10).log(1.8).mul(0.1).add(1.62), //Check back XP
            player.le.punchcardsLevels[7].lt(11) ? Decimal.pow(333, player.le.punchcardsLevels[7].sub(1)) : Decimal.pow(175, player.le.punchcardsLevels[7].sub(10).log(2)).mul(1.68e25), //Dice points and rocket fuel
            player.le.punchcardsLevels[8].lt(11) ? player.le.punchcardsLevels[8].add(1) : player.le.punchcardsLevels[8].mul(0.5).add(6), // Pre-Power Resources
            player.le.punchcardsLevels[9].lt(11) ? player.le.punchcardsLevels[9].mul(0.2).add(1) : player.le.punchcardsLevels[9].mul(0.1).add(2), // Hex Power
            player.le.punchcardsLevels[10].lt(11) ? player.le.punchcardsLevels[10].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[10].sub(10).log(2).mul(0.1).add(2), //Core Scraps
            player.le.punchcardsLevels[11].lt(11) ? Decimal.pow(10, player.le.punchcardsLevels[11].sub(1)) : Decimal.pow(5, player.le.punchcardsLevels[11].sub(10).log(2)).mul(1e10), //Golden Grass
            player.le.punchcardsLevels[12].lt(11) ? player.le.punchcardsLevels[12].sub(1).pow(0.6).add(1) : player.le.punchcardsLevels[12].sub(10).log(2).add(4.74), //Moonstone
            player.le.punchcardsLevels[13].lt(11) ? Decimal.pow(5, player.le.punchcardsLevels[13].sub(1)) : Decimal.pow(2, player.le.punchcardsLevels[13].sub(10).log(2)).mul(9765625), //Pollinators
            player.le.punchcardsLevels[14].lt(11) ? Decimal.pow(10, player.le.punchcardsLevels[14].sub(1)) : Decimal.pow(5, player.le.punchcardsLevels[14].sub(10).log(2)).mul(1e10), //Pre-OTF currencies
            player.le.punchcardsLevels[15].lt(11) ? player.le.punchcardsLevels[15].sub(1).mul(0.2).add(1) : player.le.punchcardsLevels[15].sub(10).log(2).mul(0.2).add(3), //Starmetal
            player.le.punchcardsLevels[16].lt(11) ? Decimal.pow(100, player.le.punchcardsLevels[16].sub(1)) : Decimal.pow(50, player.le.punchcardsLevels[16].sub(10).log(2)).mul(1e20), //Time Cubes
            player.le.punchcardsLevels[17].sub(1).pow(1.2).div(10).add(1), //Stars
            player.le.punchcardsLevels[18].lt(11) ? player.le.punchcardsLevels[18].sub(1).mul(0.1).add(1) : player.le.punchcardsLevels[18].sub(10).mul(0.04).add(2.1), //Effect Duration
            player.le.punchcardsLevels[19].lt(11) ? player.le.punchcardsLevels[19].sub(1).mul(0.04).add(1) : player.le.punchcardsLevels[19].sub(10).mul(0.02).add(1.44), //Eclipse Shards
        ]
        
        player.le.punchcardsPassiveEffectText = [
            "This card boosts infinity points by x",
            "This card divides check back xp button cooldowns by /",
            "This card boosts negative infinity points by x",
            "This card boosts anonymity by x",
            "This card boosts oil by x",
            "This card boosts charge by x",
            "This card boosts check back xp by x",
            "This card boosts dice points and rocket fuel by x",
            "This card boosts pre-power resources by x",
            "This card boosts hex power by x",
            "This card boosts main core scraps by x",
            "This card boosts golden grass by x",
            "This card boosts moonstone by x",
            "This card boosts pollinators by x",
            "This card boosts pre-otf currencies by x",
            "This card boosts starmetal alloy by x",
            "This card boosts time cubes by x",
            "This card boosts stars by x",
            "This card boosts eclipse's effect duration by x",
            "This card boosts eclipse shards by x",
        ]
        player.le.punchcardsEffectText = [
            "This card boosts points by x", //0
            "This card weakens the point softcap by ^", //1
            "This card boosts prestige points by x", //2
            "This card improves the rank effect and boosts rank points by x", //3
            "This card improves the tier effect and boosts tier points by x", //4
            "This card improves the tetr effect and boosts tetr points by x", //5
            "This card boosts rank, tier, and tetr points by x", //6
            "This card boosts generators by x", //7
            "This card boosts generator power by x", //8
            "This card boosts points by x", //9
            "This card boosts prestige points by x", //10
            "This card boosts grass capacity and value by x", //11
            "This card boosts grass capacity and value by x", //12
            "This card boosts grass capacity and value by x", //13
            "This card boosts points, rank/tier/tetr points, prestige points, grass, generator power, and generators by x", //14
            "This card boosts starmetal alloy gain by x", //15
            "This card unlocks pent and raises pent's effect by ^", //16
            "This card divides booster requirement by /", //17
            "This card slows down eclipse duration timer by /", //18
            "This card boosts eclipse shards gain by x", //19
        ]
        player.le.punchcardsEffect = [
            player.du.points.pow(0.1).add(1).pow(player.le.punchcardsLevelsEffect[0]), // POTENTIALLY NERF TO ^0.08 WITH AN EXTERNAL DCP BUFF
            Decimal.pow(0.85, player.le.punchcardsLevelsEffect[1]),
            player.dp.prestigePoints.pow(0.4).add(1).pow(player.le.punchcardsLevelsEffect[2]), // POTENTIALLY NERF TO ^0.2 WITH AN EXTERNAL DPP BUFF
            player.du.points.pow(0.1).add(1).pow(player.le.punchcardsLevelsEffect[3]),
            player.du.points.pow(0.2).add(1).pow(player.le.punchcardsLevelsEffect[4]),
            player.du.points.pow(0.4).add(1).pow(player.le.punchcardsLevelsEffect[5]),
            player.du.points.pow(0.15).add(1).pow(player.le.punchcardsLevelsEffect[6]),
            player.dg.generators.pow(0.2).add(1).pow(player.le.punchcardsLevelsEffect[7]),
            player.dg.generatorPower.pow(0.25).add(1).pow(player.le.punchcardsLevelsEffect[8]),
            player.dg.generators.pow(0.6).div(2).add(1).pow(player.le.punchcardsLevelsEffect[9]),
            player.dg.generators.pow(0.4).div(2).add(1).pow(player.le.punchcardsLevelsEffect[10]),
            player.dgr.grass.pow(0.2).add(1).pow(player.le.punchcardsLevelsEffect[11]),
            player.dg.generators.pow(0.15).add(1).pow(player.le.punchcardsLevelsEffect[12]),
            player.dp.prestigePoints.pow(0.1).add(1).pow(player.le.punchcardsLevelsEffect[13]),
            player.sma.starmetalAlloy.lt(1e10) ? player.sma.starmetalAlloy.div(10).add(1).pow(2).pow(player.le.punchcardsLevelsEffect[14]) : player.sma.starmetalAlloy.div(1e10).pow(0.25).mul(1e18).pow(player.le.punchcardsLevelsEffect[14]),
            player.le.resetAmount.div(5).add(1).pow(player.le.punchcardsLevelsEffect[15]),
            Decimal.pow(1.25, player.le.punchcardsLevelsEffect[16]),
            player.db.boosters.pow(2.5).add(1).pow(player.le.punchcardsLevelsEffect[17]),
            player.le.resetAmount.pow(0.15).add(1).pow(player.le.punchcardsLevelsEffect[18]),
            player.le.resetAmount.mul(0.1).add(1).pow(player.le.punchcardsLevelsEffect[19]),
        ]
        player.le.punchcardsEffectText2 = [
            ". (Based on points)",
            ".",
            ". (Based on prestige points)",
            ". (Based on points)",
            ". (Based on points)",
            ". (Based on points)",
            ". (Based on points)",
            ". (Based on generators)",
            ". (Based on generator power)",
            ". (Based on generators)",
            ". (Based on generators)",
            ". (Based on grass)",
            ". (Based on generators)",
            ". (Based on prestige)",
            ". (Based on starmetal alloy)",
            ". (Based on starmetal resets)",
            ".",
            ". (Based on boosters)",
            ". (Based on starmetal resets)",
            ". (Based on starmetal resets)",
        ]
        if (player.le.resetAmount.lt(2)) {
            for (let i = 0; i < 7; i++) {
                player.le.punchcardSelections[i] = true
            }
        } else if (player.le.resetAmount.gt(2)) {
            for (let i = 0; i < 11; i++) {
                player.le.punchcardSelections[i] = true
            }
        } 
        if (player.le.resetAmount.gt(3)) {
            for (let i = 0; i < 14; i++) {
                player.le.punchcardSelections[i] = true
            }
        }
        if (player.le.resetAmount.gt(4)) player.le.punchcardSelections[16] = true
        if (hasUpgrade("sma", 17)) {
            player.le.punchcardSelections[14] = true
            player.le.punchcardSelections[15] = true
        }
        if (player.pet.activeAbilities[0]) {
            player.le.punchcardSelections[17] = true
            player.le.punchcardSelections[18] = true
            player.le.punchcardSelections[19] = true
        }

        //eclipse
        player.le.eclipseShardsReq = Decimal.pow(1e1, player.le.resetAmount.add(1).pow(1.7).floor()).mul(1e3)
        if (player.le.resetAmount.gte(3)) player.le.eclipseShardsReq = Decimal.pow(1e1, player.le.resetAmount.add(1).pow(2.5).floor()).mul(1e3)
        if (player.le.resetAmount.gte(8)) player.le.eclipseShardsReq = Decimal.pow(1e1, player.le.resetAmount.add(1).pow(2.6).floor()).mul(1e3)
        player.le.eclipseShardsReq = player.le.eclipseShardsReq.div(player.db.milestone1Effect)

        player.le.eclipseShardsToGetToGet = player.le.resetAmount.add(1)
        player.le.eclipseShardsToGetTrue = player.le.eclipseShardsToGet
        if (player.le.punchcards[19]) player.le.eclipseShardsToGetTrue = player.le.eclipseShardsToGetTrue.mul(player.le.punchcardsEffect[19])
        player.le.eclipseShardsToGetTrue = player.le.eclipseShardsToGetTrue.mul(player.le.punchcardsPassiveEffect[19])

        player.le.eclipseShardsValue = new Decimal(5)
        player.le.eclipseShardsValue = player.le.eclipseShardsValue.mul(buyableEffect("le", 11)).floor()

    },
    generateSelection() {
        const availableIndices = player.le.punchcardSelections
            .map((canSelect, index) => canSelect ? index : null)
            .filter(index => index !== null && !player.le.punchcards[index]);
        const weightedIndices = [];
    
        // Add common cards 4 times, rare cards once, and epic cards 1/15 times to the weighted array
        availableIndices.forEach(index => {
            if ([1, 6, 9, 10, 12, 13, 16, 17].includes(index)) {
                weightedIndices.push(index);
            } else if ([14, 15, 18, 19].includes(index)) {
                for (let i = 0; i < 1; i++) {
                    weightedIndices.push(index);
                }
            } else {
                for (let i = 0; i < 4; i++) {
                    weightedIndices.push(index);
                }
            }
        });
    
        const selectedIndices = [];
    
        while (selectedIndices.length < 3 && weightedIndices.length > 0) {
            const randomIndex = Math.floor(Math.random() * weightedIndices.length);
            const selectedIndex = weightedIndices.splice(randomIndex, 1)[0];
    
            // Ensure no repetition
            if (!selectedIndices.includes(selectedIndex)) {
                selectedIndices.push(selectedIndex);
            }
        }
    
        player.le.selectedPunchcards = selectedIndices;
    },

    bars: {
    },
    clickables: {
        11: {
            title() { return "<h2>Reset everything in this universe for starmetal alloy.<br>Req: " + format(player.le.starmetalAlloyReq) + " Points" },
            canClick() { return player.du.points.gte(player.le.starmetalAlloyReq) },
            unlocked() { return true },
            onClick() {
                player.le.resetAmount = player.le.resetAmount.add(1)
                player.le.starmetalAlloyPause = new Decimal(10)

                player.le.storedSelections = player.le.storedSelections.add(1)

                player.le.starmetalAlloyToGet = player.le.starmetalAlloyToGet.add(player.le.starmetalAlloyToGetToGet)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid #384166"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        12: {
            title() { return "<h2>Return back to the domain of singularity." },
            canClick() { return player.le.starmetalAlloyToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.sma.starmetalAlloy = player.sma.starmetalAlloy.add(player.le.starmetalAlloyToGetTrue.floor())
                player.le.starmetalAlloyPauseAgain = new Decimal(10)
                for (let i = 0; i < player.le.punchcards.length; i++)
                    {
                        if (player.le.punchcards[i] == true)
                        {
                            player.le.punchcardsXP[i] = player.le.punchcardsXP[i].add(player.le.starmetalAlloyToGetTrue.floor())
                        }
                        player.le.punchcards[i] = false
                    }
                    player.le.starmetalAlloyToGet = new Decimal(0)
                    player.le.resetAmount = new Decimal(0)
        
                    player.le.activePunchcards = []
                    player.le.activePunchcardIndex = new Decimal(0)
                    if (!hasUpgrade("sma", 15)) player.le.storedSelections = new Decimal(0)
                    if (hasUpgrade("sma", 15)) player.le.storedSelections = new Decimal(1)
        
                    player.sma.inStarmetalChallenge = false
                    player.universe = 3
                    player.tab = "sma"
        
                    for (let i = 0; i < player.le.punchcardSelections.length; i++)
                    {
                        player.le.punchcardSelections[i] = false
                    }
        
                    layers.le.generateSelection();
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid #384166", borderRight: "2px solid #384166"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        13: {
            title() { return "<h2>Reset everything in this universe for starmetal alloy.<br>Req: " + format(player.le.eclipseShardsReq) + " Points" },
            canClick() { return player.du.points.gte(player.le.eclipseShardsReq) },
            unlocked() { return true },
            onClick() {
                player.le.resetAmount = player.le.resetAmount.add(1)
                player.le.starmetalAlloyPause = new Decimal(10)

                player.le.storedSelections = player.le.storedSelections.add(1)

                player.le.eclipseShardsToGet = player.le.eclipseShardsToGet.add(player.le.eclipseShardsToGetToGet)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid #384166"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        14: {
            title() { return "<h2>Return back to the domain of singularity." },
            canClick() { return player.le.eclipseShardsToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.sma.eclipseShards = player.sma.eclipseShards.add(player.le.eclipseShardsToGetTrue.floor())
                player.le.starmetalAlloyPauseAgain = new Decimal(10)
                for (let i = 0; i < player.le.punchcards.length; i++)
                    {
                        if (player.le.punchcards[i] == true)
                        {
                            player.le.punchcardsXP[i] = player.le.punchcardsXP[i].add(player.le.eclipseShardsToGetTrue.mul(player.le.eclipseShardsValue).floor())
                        }
                        player.le.punchcards[i] = false
                    }
                    player.le.starmetalAlloyToGet = new Decimal(0)
                    player.le.eclipseShardsToGet = new Decimal(0)
                    player.le.resetAmount = new Decimal(0)
        
                    player.le.activePunchcards = []
                    player.le.activePunchcardIndex = new Decimal(0)
                    if (!hasUpgrade("sma", 15)) player.le.storedSelections = new Decimal(0)
                    if (hasUpgrade("sma", 15)) player.le.storedSelections = new Decimal(1)
        
                    player.sma.inStarmetalChallenge = false
                    player.universe = 3
                    player.tab = "sma"
        
                    for (let i = 0; i < player.le.punchcardSelections.length; i++)
                    {
                        player.le.punchcardSelections[i] = false
                    }
        
                    layers.le.generateSelection();
                    
                    player.pet.legendaryPetAbilityTimers[0] = new Decimal(0)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid #384166", borderRight: "2px solid #384166"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        //Selection
        20: {
            title() { return "Activate this card" },
            canClick() { return true },
            unlocked() { return player.le.storedSelections.gte(1) },
            onClick() {
                player.le.punchcards[player.le.selectedPunchcards[player.le.selectionIndex]] = true
                player.le.punchcardsUnlocked[player.le.selectedPunchcards[player.le.selectionIndex]] = true
                player.le.activePunchcards.push(player.le.selectedPunchcards[player.le.selectionIndex])
                player.le.storedSelections = player.le.storedSelections.sub(1)

                layers.le.generateSelection();
            },
            style: { width: "200px", minHeight: "50px", color: "white", border: "2px solid #384166", borderRadius: "10px" },
        },
        21: {
            title() { return player.le.punchcardImages[player.le.selectedPunchcards[0]] },
            canClick() { return true },
            unlocked() { return player.le.storedSelections.gte(1) },
            onClick() {
                player.le.selectionIndex = new Decimal(0)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        22: {
            title() { return player.le.punchcardImages[player.le.selectedPunchcards[1]] },
            canClick() { return true },
            unlocked() { return player.le.storedSelections.gte(1) },
            onClick() {
                player.le.selectionIndex = new Decimal(1)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        23: {
            title() { return player.le.punchcardImages[player.le.selectedPunchcards[2]] },
            canClick() { return true },
            unlocked() { return player.le.storedSelections.gte(1) },
            onClick() {
                player.le.selectionIndex = new Decimal(2)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        24: {
            title() { return "<h3>Lower" },
            canClick() { return player.le.activePunchcardIndex.gt(0) },
            unlocked() { return true },
            onClick() {
                player.le.activePunchcardIndex = player.le.activePunchcardIndex.sub(1)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "100px", minHeight: "100px", color: "white", border: "2px solid #384166", borderRight: "1px solid #384166", borderRadius: "15px 0px 0px 15px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            },
        },
        25: {
            title() { return "<h3>Increase" },
            canClick() { return player.le.activePunchcardIndex.lt(player.le.activePunchcards.length-1) },
            unlocked() { return true },
            onClick() {
                player.le.activePunchcardIndex = player.le.activePunchcardIndex.add(1)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "100px", minHeight: "100px", color: "white", border: "2px solid #384166", borderLeft: "1px solid #384166", borderRadius: "0px 15px 15px 0px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            },
        },
        26: { //this is just an image lmao
            title() { return player.le.punchcardImages[player.le.activePunchcards[player.le.activePunchcardIndex]] },
            canClick() { return false},
            unlocked() { return true },
            onClick() {
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },

        //Punchcards
        100: {
            title() { return player.le.punchcardsUnlocked[0] ? player.le.punchcardImages[0] : player.le.lockedPunchcard },
            canClick() { return player.le.punchcardsUnlocked[0] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(0)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        101: {
            title() { return player.le.punchcardsUnlocked[1] ? player.le.punchcardImages[1] : player.le.lockedPunchcard},
            canClick() { return player.le.punchcardsUnlocked[1] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(1)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        102: {
            title() { return player.le.punchcardsUnlocked[2] ? player.le.punchcardImages[2] : player.le.lockedPunchcard},
            canClick() { return player.le.punchcardsUnlocked[2] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(2)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        103: {
            title() { return player.le.punchcardsUnlocked[3] ? player.le.punchcardImages[3] : player.le.lockedPunchcard},
            canClick() { return player.le.punchcardsUnlocked[3] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(3)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        104: {
            title() { return player.le.punchcardsUnlocked[4] ? player.le.punchcardImages[4] : player.le.lockedPunchcard},
            canClick() { return player.le.punchcardsUnlocked[4] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(4)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        105: {
            title() { return player.le.punchcardsUnlocked[5] ? player.le.punchcardImages[5] : player.le.lockedPunchcard},
            canClick() { return player.le.punchcardsUnlocked[5] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(5)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        106: {
            title() { return player.le.punchcardsUnlocked[6] ? player.le.punchcardImages[6] : player.le.lockedPunchcard},
            canClick() { return player.le.punchcardsUnlocked[6] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(6)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        107: {
            title() { return player.le.punchcardsUnlocked[7] ? player.le.punchcardImages[7] : player.le.lockedPunchcard},
            canClick() { return player.le.punchcardsUnlocked[7] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(7)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        108: {
            title() { return player.le.punchcardsUnlocked[8] ? player.le.punchcardImages[8] : player.le.lockedPunchcard},
            canClick() { return player.le.punchcardsUnlocked[8] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(8)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        109: {
            title() { return player.le.punchcardsUnlocked[9] ? player.le.punchcardImages[9] : player.le.lockedPunchcard},
            canClick() { return player.le.punchcardsUnlocked[9] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(9)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        110: {
            title() { return player.le.punchcardsUnlocked[10] ? player.le.punchcardImages[10] : player.le.lockedPunchcard},
            canClick() { return player.le.punchcardsUnlocked[10] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(10)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        111: {
            title() { return player.le.punchcardsUnlocked[11] ? player.le.punchcardImages[11] : player.le.lockedPunchcard},
            canClick() { return player.le.punchcardsUnlocked[11] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(11)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        112: {
            title() { return player.le.punchcardsUnlocked[12] ? player.le.punchcardImages[12] : player.le.lockedPunchcard},
            canClick() { return player.le.punchcardsUnlocked[12] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(12)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        113: {
            title() { return player.le.punchcardsUnlocked[13] ? player.le.punchcardImages[13] : player.le.lockedPunchcard},
            canClick() { return player.le.punchcardsUnlocked[13] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(13)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        114: {
            title() { return player.le.punchcardsUnlocked[14] ? player.le.punchcardImages[14] : player.le.lockedPunchcard},
            canClick() { return player.le.punchcardsUnlocked[14] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(14)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        115: {
            title() { return player.le.punchcardsUnlocked[15] ? player.le.punchcardImages[15] : player.le.lockedPunchcard},
            canClick() { return player.le.punchcardsUnlocked[15] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(15)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        116: {
            title() { return player.le.punchcardsUnlocked[16] ? player.le.punchcardImages[16] : player.le.lockedPunchcard},
            canClick() { return player.le.punchcardsUnlocked[16] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(16)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        117: {
            title() { return player.le.punchcardsUnlocked[17] ? player.le.punchcardImages[17] : player.le.lockedPunchcard},
            canClick() { return player.le.punchcardsUnlocked[17] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(17)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        118: {
            title() { return player.le.punchcardsUnlocked[18] ? player.le.punchcardImages[18] : player.le.lockedPunchcard},
            canClick() { return player.le.punchcardsUnlocked[18] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(18)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        119: {
            title() { return player.le.punchcardsUnlocked[19] ? player.le.punchcardImages[19] : player.le.lockedPunchcard},
            canClick() { return player.le.punchcardsUnlocked[19] },
            unlocked() { return true },
            onClick() {
                player.le.punchcardIndex = new Decimal(19)
            },
            style: { width: '75px', "min-height": '125px', color: "white" },
        },
        //Level Up
        1000: {
            title() { return "<h2>Level Up" },
            canClick() { return player.le.punchcardsXP[player.le.punchcardIndex].gte(player.le.punchcardsXPReq[player.le.punchcardIndex]) },
            unlocked() { return true },
            onClick() {
                player.le.punchcardsLevels[player.le.punchcardIndex] = player.le.punchcardsLevels[player.le.punchcardIndex].add(1)
                player.le.punchcardsXP[player.le.punchcardIndex] = player.le.punchcardsXP[player.le.punchcardIndex].sub(player.le.punchcardsXPReq[player.le.punchcardIndex])
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "10px", color: "white", border: "2px solid #384166"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
    },
    starmetalReset() {
        player.du.points = new Decimal(0)
        player.dr.rank = new Decimal(0)
        player.dr.tier = new Decimal(0)
        player.dr.tetr = new Decimal(0)
        player.dr.pent = new Decimal(0)

        player.dr.rankPoints = new Decimal(0)
        player.dr.tierPoints = new Decimal(0)
        player.dr.tetrPoints = new Decimal(0)
        player.dr.pentPoints = new Decimal(0)

        player.dp.prestigePoints = new Decimal(0)
        player.dp.buyables[11] = new Decimal(0)
        player.dp.buyables[12] = new Decimal(0)
        player.dp.buyables[13] = new Decimal(0)

        player.dg.generators = new Decimal(0)
        player.dg.generatorPower = new Decimal(0)

        for (let i = 0; i < player.le.upgrades.length; i++) {
            if (+player.le.upgrades[i] < 201) {
                player.le.upgrades.splice(i, 1);
                i--;
            }
        }

        player.dg.buyables[11] = new Decimal(0)
        player.dg.buyables[12] = new Decimal(0)
        player.dg.buyables[13] = new Decimal(0)

        player.dgr.grass = new Decimal(0)
        for (let i = 1; i < (tmp.dgr.grid.cols + "0" + (tmp.dgr.grid.rows + 1)); ) {
            setGridData("dgr", i, new Decimal(0))

            // Increase i value
            if (i % tmp.dgr.grid.rows == 0) {
                i = i+(101-tmp.dgr.grid.rows)
            } else {
                i++
            }
        }

        player.dgr.buyables[11] = new Decimal(0)
        player.dgr.buyables[12] = new Decimal(0)
        player.dgr.buyables[13] = new Decimal(0)
        player.dgr.buyables[14] = new Decimal(0)
        player.dgr.buyables[15] = new Decimal(0)
        player.dgr.buyables[16] = new Decimal(0)

        player.db.boosters = new Decimal(0)
        for (let i = 0; i < player.db.milestones.length; i++) {
            if (+player.db.milestones[i] < 101) {
                player.db.milestones.splice(i, 1);
                i--;
            }
        }
    },
    starmetalResetAgain() {
        player.du.points = new Decimal(0)
        player.dr.rank = new Decimal(0)
        player.dr.tier = new Decimal(0)
        player.dr.tetr = new Decimal(0)
        player.dr.pent = new Decimal(0)

        player.dr.rankPoints = new Decimal(0)
        player.dr.tierPoints = new Decimal(0)
        player.dr.tetrPoints = new Decimal(0)
        player.dr.pentPoints = new Decimal(0)

        player.dp.prestigePoints = new Decimal(0)
        player.dp.buyables[11] = new Decimal(0)
        player.dp.buyables[12] = new Decimal(0)
        player.dp.buyables[13] = new Decimal(0)

        player.dg.generators = new Decimal(0)
        player.dg.generatorPower = new Decimal(0)

        for (let i = 0; i < player.le.upgrades.length; i++) {
            if (+player.le.upgrades[i] < 201) {
                player.le.upgrades.splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < player.dn.upgrades.length; i++) {
            if (+player.dn.upgrades[i] < 101) {
                player.dn.upgrades.splice(i, 1);
                i--;
            }
        }

        player.dg.buyables[11] = new Decimal(0)
        player.dg.buyables[12] = new Decimal(0)
        player.dg.buyables[13] = new Decimal(0)

        player.dgr.grass = new Decimal(0)
        for (let i = 1; i < (tmp.dgr.grid.cols + "0" + (tmp.dgr.grid.rows + 1)); ) {
            setGridData("dgr", i, new Decimal(0))

            // Increase i value
            if (i % tmp.dgr.grid.rows == 0) {
                i = i+(101-tmp.dgr.grid.rows)
            } else {
                i++
            }
        }

        player.dgr.buyables[11] = new Decimal(0)
        player.dgr.buyables[12] = new Decimal(0)
        player.dgr.buyables[13] = new Decimal(0)
        player.dgr.buyables[14] = new Decimal(0)
        player.dgr.buyables[15] = new Decimal(0)
        player.dgr.buyables[16] = new Decimal(0)

        player.dn.normality = new Decimal(0)
        player.dn.buyables[11] = new Decimal(0)
        player.dn.buyables[12] = new Decimal(0)
        player.dn.buyables[13] = new Decimal(0)
        player.db.boosters = new Decimal(0)
        for (let i = 0; i < player.db.milestones.length; i++) {
            if (+player.db.milestones[i] < 101) {
                player.db.milestones.splice(i, 1);
                i--;
            }
        }
    },
    upgrades: {
        11: {
            title: "Ranked Darkness",
            unlocked() { return true },
            description: "Unlocks Ranks.",
            cost: new Decimal(25),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #384166", margin: "1.5px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        12: {
            title: "Darked Rankness",
            unlocked() { return true },
            description: "Divides rank requirements by /50.",
            cost: new Decimal(1000),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #384166", margin: "1.5px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        13:
        {
            title: "Dark Prestige",
            unlocked() { return true },
            description: "Unlocks Prestige.",
            cost: new Decimal(10000),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #384166", margin: "1.5px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        14:
        {
            title: "Dark Bulk I",
            unlocked() { return true },
            description: "Gain the ability to bulk rank resets.",
            cost: new Decimal(100000),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #384166", margin: "1.5px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        15:
        {
            title: "Dark Bulk II",
            unlocked() { return true },
            description: "Gain the ability to bulk tier resets.",
            cost: new Decimal(1e6),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #384166", margin: "1.5px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        16:
        {
            title: "Dark Auto I",
            unlocked() { return true },
            description: "Automate rank resets.",
            cost: new Decimal(1e7),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #384166", margin: "1.5px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        17:
        {
            title: "Dark Generators",
            unlocked() { return hasUpgrade("sma", 12) && !player.pet.activeAbilities[0] },
            description: "Unlocks Generators.",
            cost: new Decimal(1e8),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #384166", margin: "1.5px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        18:
        {
            title: "Dark Bulk III",
            unlocked() { return hasUpgrade("sma", 12) },
            description: "Gain the ability to bulk tetr resets.",
            cost: new Decimal(1e9),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #384166", margin: "1.5px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        19:
        {
            title: "Dark Auto II",
            unlocked() { return hasUpgrade("sma", 12) },
            description: "Automate Tier Resets.",
            cost: new Decimal(1e11),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #384166", margin: "1.5px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        21:
        {
            title: "Dark Auto III",
            unlocked() { return hasUpgrade("sma", 12) },
            description: "Automate Tetr Resets.",
            cost: new Decimal(1e12),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #384166", margin: "1.5px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        22:
        {
            title: "Dark Grass",
            unlocked() { return hasUpgrade("sma", 16) },
            description: "Unlock Dark Grass.",
            cost: new Decimal(1e36),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #384166", margin: "1.5px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        23:
        {
            title: "Normality",
            unlocked() { return hasUpgrade("sma", 17) && !player.pet.activeAbilities[0] },
            description: "Unlock Normality.",
            cost: new Decimal(1e48),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #384166", margin: "1.5px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },

        //eclipse exclusive
        101:
        {
            title: "Dark Boosters",
            unlocked() { return hasUpgrade("sma", 12) && player.pet.activeAbilities[0] },
            description: "Unlocks Boosters.",
            cost: new Decimal(1e8),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #384166", margin: "1.5px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "rgb(51, 54, 0)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        102:
        {
            title: "Vaporizer",
            unlocked() { return hasUpgrade("sma", 17) && player.pet.activeAbilities[0] },
            description: "Unlocks The Vaporizer.",
            cost: new Decimal(1e48),
            currencyLocation() { return player.du },
            currencyDisplayName: "Dark Celestial Points",
            currencyInternalName: "points",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #384166", margin: "1.5px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "rgb(51, 54, 0)" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
    },
    buyables: {
            11: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.sma.eclipseShards },
            pay(amt) { player.sma.eclipseShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Eclipse Shard Value Increaser"
            },
            display() {
                return "which are multiplying eclipse shard xp value multiplier by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Eclipse Shards"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "#384166", "border-color": "#384166" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {
        1: {
            title: "Log 1",
            body() { return "Log 1: My team and I were on an expedition to enter the Celestial Kingdom. It was going decently until one night, I had a very strange dream. All I could remember from that dream was hearing maniacal laughter. However, when we woke up, we were transported to a new dimension. I am going to keep track of the information I find in this new dimension here." },
            unlocked() { return player.le.punchcardIndex.eq(0) },
            style: {border: "2px solid #384166"},
        },
        2: {
            title: "Log 2",
            body() { return "Log 2: We have stumbled upon a peculiar planet. It reminds me of Earth, but something is off. All the trees and grass are red. The river flows with a viscous crimson liquid. Not a single animal in sight. Something about this place puts me off." },
            unlocked() { return player.le.punchcardIndex.eq(1) },
            style: {border: "2px solid #384166"},
        },
        3: {
            title: "Log 3",
            body() { return "Log 3: We see ancient ruins of what appears to have been built by a civilization that was once here. They seemed to be quite advanced. A lot of the infrastructure held up pretty well. Our carbon dating suggests that the structures are over twenty thousand years old. I wonder what could have ever happened to this civilization." },
            unlocked() { return player.le.punchcardIndex.eq(2) },
            style: {border: "2px solid #384166"},
        },
        4: {
            title: "Log 4",
            body() { return "Log 4: One of my colleagues has found strange spherical devices that emit high levels of radiation. We don't have the protective gear to go near them, but that is something to keep in mind. I don't think we can find a way home any time soon, so we have to call this strange dimension home for the time being. We must stay calm and collected." },
            unlocked() { return player.le.punchcardIndex.eq(3) },
            style: {border: "2px solid #384166"},
        },
        5: {
            title: "Log 5",
            body() { return "Log 5: It has been over a week of staying in this dimension. We have made a couple of observations. Days are exactly 24 hours long, and the water in rivers and oceans seems to be corrosive, but we have been able to find a plethora of fruits and vegetables that could sustain us with safe water and nutrients. We will live. We will make it out of here alive. We will find the celestial that has trapped us here, and we will defeat it. I have defeated a celestial before, so I will either win or die trying!" },
            unlocked() { return player.le.punchcardIndex.eq(4) },
            style: {border: "2px solid #384166"},
        },
        6: {
            title: "Log 6",
            body() { return "Log 6: We found more strange spherical devices, but these don't emit radiation. It emits a strange celestial energy to boost superphysical values. Strange… These devices must have been made by celestials to make them stronger. We don't see any celestial hunter brand markings on it, so it must have been made by celestials. We must do more investigations." },
            unlocked() { return player.le.punchcardIndex.eq(5) },
            style: {border: "2px solid #384166"},
        },
        7: {
            title: "Log 7",
            body() { return "Log 7: We have seen what these devices are capable of. My colleagues and I have tested them out. It emits a strange superphysical power that none of us have ever been aware of. This power seems to be condensed in what appears to be a singularity. Each device is capable of holding a unique fuel source, or a superphysical value that it can boost." },
            unlocked() { return player.le.punchcardIndex.eq(6) },
            style: {border: "2px solid #384166"},
        },
        8: {
            title: "Log 8",
            body() { return "Log 8: It has been three weeks now, and we have set up a couple of camps and started farming as well. I don't know why but I can feel a great sense of unease, but that is probably just my homesickness. Tomorrow we will check out one of the largest ruined buildings that we have found. Maybe we can find secrets to this civilization there." },
            unlocked() { return player.le.punchcardIndex.eq(7) },
            style: {border: "2px solid #384166"},
        },
        9: {
            title: "Log 9",
            body() { return "Log 9: This ruined building is a temple that must have been used by whoever lived here. Many strange symbols are present, and we speculate that they are celestial symbols. Did this civilization worship celestials? Did celestials destroy this civilization?" },
            unlocked() { return player.le.punchcardIndex.eq(8) },
            style: {border: "2px solid #384166"},
        },
        10: {
            title: "Log 10",
            body() { return "Log 10: Further in the temple, we found strange engravings on the floor. There were symbols of dice, stars, rockets, and staircases. In the center, there seemed to be eight torches, with what appeared to be different celestial symbols carved into them. All eight torches surround what appears to be a circle with a dot in the center. Could this be a way out?" },
            unlocked() { return player.le.punchcardIndex.eq(9) },
            style: {border: "2px solid #384166"},
        },
        11: {
            title: "Log 11",
            body() { return "Log 11: Good news. We have finally detected something. It appears that another group was sent out to save us, and they had sent us a signal. Thank goodness the corporation finally figured out that we were missing, and that they didn't presume us dead. They somehow managed to track us, but I am unsure of how. I am just glad that we are getting saved." },
            unlocked() { return player.le.punchcardIndex.eq(10) },
            style: {border: "2px solid #384166"},
        },
        12: {
            title: "Log 12",
            body() { return "Log 12: They are here. My good friends Kres, Sel, and Nav are here. They came with a lot of supplies and materials that can help us stay here longer, as well as find out more about this place. The bad news is that they are also stuck here with us. None of the superphysical transportation devices are working. The only way we can figure out if we can ever get out of here is by summoning a celestial." },
            unlocked() { return player.le.punchcardIndex.eq(11) },
            style: {border: "2px solid #384166"},
        },
        13: {
            title: "Log 13",
            body() { return "Log 13: On a recent expedition, we found three logs that have supposedly been written by the final leader of the civilization that has perished. We found it in a tall building on the top of a mountain. This is a massive breakthrough. We know how this civilization fell. They were defeated by a celestial named Matos. But one thing stands out. Matos has the power to destroy superphysical barriers, so summoning him would give us a way to get out of here. Plus, we are a pretty strong team. Our powers combined can defeat Matos, or at least resist his power well enough. Let's see what the others think." },
            unlocked() { return player.le.punchcardIndex.eq(12) },
            style: {border: "2px solid #384166"},
        },
        14: {
            title: "Log 14",
            body() { return "Log 14: They agreed. On the base of the tower, there is an input for the five singularity cores, and the five fully powered singularity cores are there as well. It's as if they were preparing us to summon Matos. Thankfully, Kres and his group brought superphysical fighting gear with them, so we should be able to fight Matos. Turns out the singularity cores were the devices that we had found earlier, and the ones that are prepared here are the strongest variant of singularity cores. We slowly lodge them in, and wait for something to happen. If whoever wrote the logs I found in the building is reading this, I'm sorry for not listening to your warning, but this is for the greater good." },
            unlocked() { return player.le.punchcardIndex.eq(13) },
            style: {border: "2px solid #384166"},
        },
        15: {
            title: "Log 15",
            body() { return "Log 15: Help. Matos has murdered four teammates. Me and Kres are hiding right now. When we summoned Matos, the sun instantly turned into a strange eclipse. I have been severely wounded. I don't think I'm going to make it. A strange smoke being has emerged from the center of the mountain and started attacking Matos. It seems to be friendly. If I die, I won't have any regrets. I lived a long and powerful life. I have defeated a celestial before. That is something most people in my line of field can only dream of doing. Well, that's it. Hope Kres and the others make it out. Goodbye." },
            unlocked() { return player.le.punchcardIndex.eq(14) },
            style: {border: "2px solid #384166"},
        },
        16: {
            title: "Log X1",
            body() { return "Log X1: It's the end. All of our attempts to please the celestials have failed. No temple is big enough to satisfy their needs. Our cities have grown so large yet so dormant. People are dying. People are suffering.  Every day, large powerful cores of energy strike us down every second. We did everything we could. I don't see a point in continuing." },
            unlocked() { return player.le.punchcardIndex.eq(15) },
            style: {border: "2px solid #384166"},
        },
        17: {
            title: "Log X2",
            body() { return "Log X2: It has a name. Its name is Matos. They are responsible for all our torment and tragedy. I was there. I witnessed its true physical form. He is made out of starmetal alloy, like the ones we use in our technology, but much more powerful and concentrated. I understand what is happening. Our civilization has created a celestial. The poor conditions and quality of life throughout these years have led to anger, suffering, despair, and pain, and all of these harsh emotions and conflicts have led to the creation of one, angry, beast of a celestial. Our creator celestials have forgotten about us. We are a failure of a civilization." },
            unlocked() { return player.le.punchcardIndex.eq(15) },
            style: {border: "2px solid #384166"},
        },
        18: {
            title: "Log X3",
            body() { return "Log X3: This is it. My final message. As a leader of this civilization, I must put out a message. I don't know who will be reading this. Shoot, I don't know if anyone will ever be reading this. But I have things to say, and I better say them now. If you are reading this, this civilization is long gone. However, the threat of Matos remains. He has the power to destroy full civilizations, manipulate technology, and break superphysical barriers. I've somehow managed to seal him away using all of my remaining power, but he will inevitably return when you fully power up five singularity cores. No matter what happens, don't let him escape. It's for the best that he remains in here." },
            unlocked() { return player.le.punchcardIndex.eq(15) },
            style: {border: "2px solid #384166"},
        },
    },
    microtabs: {
        stuff: {
            "Lore": {
                buttonStyle() { return { border: "2px solid #384166", borderRadius: "10px" } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Long before the time of Matos, a civilization of humans lived in the domain of singularity.<br> They extracted the power of the sun using superphysical values.<br> They built giant machines that absorbed all of the suns light.<br> Eventually, their machines grew so large that it obstructed the sky, and polluted the atmosphere.<br> This caused the whole world to be a gloomy, dark, and dystopian wasteland.<br> In the pursuit of light, one must follow through with darkness." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["infobox", 1],
                    ["infobox", 2],
                    ["infobox", 3],
                    ["infobox", 4],
                    ["infobox", 5],
                    ["infobox", 6],
                    ["infobox", 7],
                    ["infobox", 8],
                    ["infobox", 9],
                    ["infobox", 10],
                    ["infobox", 11],
                    ["infobox", 12],
                    ["infobox", 13],
                    ["infobox", 14],
                    ["infobox", 15],
                    ["infobox", 16],
                    ["infobox", 17],
                    ["infobox", 18],
                ]
            },
            "Main": {
                buttonStyle() { return { border: "2px solid #384166", borderRadius: "10px" } },
                unlocked() { return !player.pet.activeAbilities[0] },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You will gain +" + formatWhole(player.le.starmetalAlloyToGetTrue) + " starmetal alloy when you leave." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain +" + formatWhole(player.le.starmetalAlloyToGetToGet) + " starmetal alloy to get on reset." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 12]]],
                ]
            },
            "Shards": {
                buttonStyle() { return { border: "2px solid rgb(245, 255, 104)", borderRadius: "10px" } },
                unlocked() { return player.pet.activeAbilities[0] },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You will gain +" + formatWhole(player.le.eclipseShardsToGetTrue) + " eclipse shards when you leave." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain +" + formatWhole(player.le.eclipseShardsToGetToGet) + " eclipse shards to get on reset." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 13]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 14]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "(Eclipse shards are worth " + formatWhole(player.le.eclipseShardsValue) + " XP each for leveling punchcards.)" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["buyable", 11]]],
                ]
            },
            "Effects": {
                buttonStyle() { return { border: "2px solid rgb(245, 255, 104)", borderRadius: "10px" } },
                unlocked() { return player.pet.activeAbilities[0] },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "^0.7 dark point gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "^0.6 dark rank, tier, tetr point gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "^1.4 dark rank, tier, tetr reqs." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "^0.8 dark prestige point gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]

            },
            "Upgrades": {
                buttonStyle() { return { border: "2px solid #384166", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16],
                        ["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 102]], {maxWidth: "800px"}],
                    ["blank", "25px"],
                    ["layer-proxy", ["sma", [
                        ["raw-html", () => { return "You have <h3>" + formatWhole(player.sma.starmetalAlloy) + "</h3> starmetal alloy." }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                        ["style-row", [["upgrade", 10], ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16],
                            ["upgrade", 17], ["upgrade", 18]], {maxWidth: "800px"}],
                        ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16]]],
                        ["row", [["upgrade", 17], ["upgrade", 18],]],
                    ]]],
                ]
            },
            "Punchcard Selection": {
                buttonStyle() { return { border: "2px solid #384166", borderRadius: "10px" } },
                unlocked() { return hasUpgrade("sma", 14) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You will gain punchcard selections every time you reset for starmetal alloy." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.le.storedSelections.gt(0) ? "Selected Card: " + player.le.punchcardNames[player.le.selectedPunchcards[player.le.selectionIndex]] : "" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", function () { return player.le.storedSelections.gt(0) ? player.le.punchcardsEffectText[player.le.selectedPunchcards[player.le.selectionIndex]] + format(player.le.punchcardsEffect[player.le.selectedPunchcards[player.le.selectionIndex]]) +  player.le.punchcardsEffectText2[player.le.selectedPunchcards[player.le.selectionIndex]] : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 21], ["clickable", 22], ["clickable", 23],]],   
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have " + formatWhole(player.le.storedSelections) + " punchcard selections." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],     
                    ["blank", "25px"],
                    ["row", [["clickable", 20]]],   
                ]
            },
            "Punchcard Collection": {
                buttonStyle() { return { border: "2px solid #384166", borderRadius: "10px" } },
                unlocked() { return hasUpgrade("sma", 14) },
                content: [
                    ["blank", "25px"],            
                    ["raw-html", function () { return "Active Card #" + formatWhole(player.le.activePunchcardIndex.add(1)) + ": " + player.le.punchcardNames[player.le.activePunchcards[player.le.activePunchcardIndex]] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.le.punchcardsEffectText[player.le.activePunchcards[player.le.activePunchcardIndex]] + format(player.le.punchcardsEffect[player.le.activePunchcards[player.le.activePunchcardIndex]]) +  player.le.punchcardsEffectText2[player.le.activePunchcards[player.le.activePunchcardIndex]]}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],     
                    ["clickable", 26],
                    ["blank", "25px"],     
                    ["row", [["clickable", 24], ["clickable", 25]]],   
                ]
            },
            "All Punchcards": {
                buttonStyle() { return { border: "2px solid #384166", borderRadius: "10px" } },
                unlocked() { return hasUpgrade("sma", 14) },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Selected Card: " + player.le.punchcardNames[player.le.punchcardIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Level: " + formatWhole(player.le.punchcardsLevels[player.le.punchcardIndex]) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [
                        ["raw-html", function () { return "The level boosts the card effect by ^" + format(player.le.punchcardsLevelsEffect[player.le.punchcardIndex]) + "." }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => { return (player.le.punchcardsLevels[player.le.punchcardIndex].gt(11)) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "16px", fontFamily: "monospace", paddingLeft: "8px"}],
                    ]],
                    ["row", [
                        ["raw-html", function () { return "Passive effect: " + player.le.punchcardsPassiveEffectText[player.le.punchcardIndex] + format(player.le.punchcardsPassiveEffect[player.le.punchcardIndex]) + "." }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => { return (player.le.punchcardsLevels[player.le.punchcardIndex].gt(11)) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "16px", fontFamily: "monospace", paddingLeft: "8px"}],
                    ]],
                    ["raw-html", function () { return "XP: " + formatWhole(player.le.punchcardsXP[player.le.punchcardIndex]) + "/" + formatWhole(player.le.punchcardsXPReq[player.le.punchcardIndex]) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 1000],]],
                    ["blank", "25px"],
                    ["microtabs", "cards", { 'border-width': '0px' }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "XP is applied to every active card when you leave, based on starmetal alloy you will gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
        },
        cards: {
            "Common": {
                buttonStyle() { return { border: "2px solid #646464", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["row", [["clickable", 100], ["clickable", 102], ["clickable", 103], ["clickable", 104], ["clickable", 105], ["clickable", 107], ["clickable", 108], ["clickable", 111]]],
                ]
            },
            "Rare": {
                buttonStyle() { return { border: "2px solid #644B00", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["row", [["clickable", 101], ["clickable", 106], ["clickable", 109], ["clickable", 110], ["clickable", 112], ["clickable", 113], ["clickable", 116], ["clickable", 117]]],
                    ["raw-html", () => { return "Rare cards are 4x as rare as common cards." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                ]
            },
            "Epic": {
                buttonStyle() { return { border: "2px solid #02345C", borderRadius: "10px" } },
                unlocked() { return hasUpgrade("sma", 17) },
                content: [
                    ["blank", "25px"],
                    ["row", [["clickable", 114], ["clickable", 115], ["clickable", 118], ["clickable", 119],]],
                    ["raw-html", () => { return "Epic cards are 15x as rare as common cards." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.du.pointGain.gte(player.du.secondSoftcapStart) ? "UNAVOIDABLE SOFTCAP<sup>2</sup>: Gain past " + format(player.du.secondSoftcapStart) + " is raised by ^" + format(player.du.pointSoftcap2) + "." : "" }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legendaryPetAbilityTimers[0].gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legendaryPetAbilityTimers[0]) + "." : ""}, {color: "#FEEF5F", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.sma.inStarmetalChallenge }
})