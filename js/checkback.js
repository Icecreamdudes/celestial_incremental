addLayer("cb", {
    name: "Check Back", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CB", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        highestLevel: new Decimal(1),
        level: new Decimal(1),
        levelEffect: new Decimal(1),
        xp: new Decimal(0),
        totalxp: new Decimal(5.1),
        xpMult: new Decimal(1),
        req: new Decimal(4),
        effectActivate: false,

        buttonUnlocks: [true, false, false, false, false, false, false],
        buttonTimersMax: [new Decimal(60),new Decimal(180),new Decimal(300),new Decimal(5),new Decimal(1200),new Decimal(3600),new Decimal(14400), new Decimal(86400),],
        buttonTimers: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        buttonBaseXP: [new Decimal(1),new Decimal(2),new Decimal(4),new Decimal(0.04),new Decimal(25),new Decimal(80),new Decimal(220),new Decimal(666),],

        petsUnlocked: false,
        
        //petButtons
        petButtonUnlocks: [false, false, false, false, false, false],
        petButtonTimersMax: [new Decimal(900), new Decimal(2700), new Decimal(5400), new Decimal(21600), new Decimal(7200), new Decimal(36000),],
        petButtonTimers: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],

        //pets
        lockedImg: "<img src='resources/secret.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        petDisplay: ["","","","","","","","",""],
        petDisplayIndex: new Decimal(0),

        commonPetUnlocks: [false, false, false, false, false, false, false, false, false],
        commonPetLevels: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        commonPetAmounts: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        commonPetReq: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
        commonPetImage: ["<img src='resources/gwaCommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/eggCommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/unsmithCommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/checkpointCommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/slaxCommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/spiderCommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/blobCommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>"],
        commonPetEffects: [[new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),],
         [new Decimal(1),new Decimal(1)], [new Decimal(1),new Decimal(1)], [new Decimal(1),new Decimal(1)], [new Decimal(1),new Decimal(1)], [new Decimal(1),],
         [new Decimal(1),new Decimal(1),], [new Decimal(1),new Decimal(1),]
        ],

        uncommonPetDisplay: ["","","","","","","","","",],
        uncommonPetDisplayIndex: new Decimal(0),

        uncommonPetUnlocks: [false, false, false, false, false, false, false, false, false],
        uncommonPetLevels: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),new Decimal(0), new Decimal(0),new Decimal(0), new Decimal(0),],
        uncommonPetAmounts: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),new Decimal(0), new Decimal(0),new Decimal(0), new Decimal(0),],
        uncommonPetReq: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),],
        uncommonPetImage: ["<img src='resources/testeUncommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        ],
        uncommonPetEffects: [[new Decimal(1), new Decimal(1),new Decimal(1),], [new Decimal(1), new Decimal(1),new Decimal(1),], [new Decimal(1), new Decimal(1),new Decimal(1),],
        [new Decimal(1), new Decimal(1),new Decimal(1),], [new Decimal(1), new Decimal(1),new Decimal(1),], [new Decimal(1), new Decimal(1),new Decimal(1),], [new Decimal(1), new Decimal(1),new Decimal(1),]
        , [new Decimal(1), new Decimal(1),new Decimal(1),], [new Decimal(1), new Decimal(1),new Decimal(1),]],

        rarePetDisplay: ["","","","","","","",],
        rarePetDisplayIndex: new Decimal(0),

        rarePetUnlocks: [false, false, false, false, false, false, false],
        rarePetLevels: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        rarePetAmounts: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        rarePetReq: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
        rarePetImage: ["<img src='resources/novaRarePet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/diceRarePet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/ufoRarePet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/goofyAhhThingRarePet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
    ],
        rarePetEffects: [[new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),]],

        petPoints: new Decimal(0),
        rarePetPointBase: [new Decimal(1),new Decimal(0.1),new Decimal(12),new Decimal(180),new Decimal(4),new Decimal(25),new Decimal(0.05)],
        rarePetButtonTimersMax: [new Decimal(40), new Decimal(20), new Decimal(600), new Decimal(18000), new Decimal(180), new Decimal(1000), new Decimal(1)],
        rarePetButtonTimers: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],

        //epic
        epicPetUnlocks: [false, false, false,],
        epicPetFragments: [new Decimal(0), new Decimal(0), new Decimal(0)],
        epicPetFragmentReq: [new Decimal(50), new Decimal(40), new Decimal(45)],
        epicPetLevels: [new Decimal(0), new Decimal(0), new Decimal(0)],
        epicPetEffects: [[new Decimal(1), new Decimal(1), new Decimal(1)],[new Decimal(1), new Decimal(1), new Decimal(1)],[new Decimal(1), new Decimal(1), new Decimal(1)],],
        epicPetImage: ["", "", "",],
        epicPetDisplay: ["","","",],
        epicPetDisplayIndex: new Decimal(0),

        //dice pet
        lastDicePetRoll: new Decimal(0),
        dicePetRoll: new Decimal(0),
        highestDicePetCombo: new Decimal(0),
        dicePetCombo: new Decimal(0),
        dicePetPointsGain: new Decimal(0),

        evolutionShards: new Decimal(0),
        viewingEvolved: [false, false, false, false, false, false, false, false, false,],
        evolvedLevels: [new Decimal(0), new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),],
        evolvedReq: [new Decimal(2), new Decimal(3), new Decimal(4),new Decimal(6),new Decimal(1),new Decimal(1),new Decimal(3), new Decimal(1),new Decimal(5),],
        evolvedEffects: [[new Decimal(1),new Decimal(0),], [new Decimal(1),new Decimal(0),], [new Decimal(1),new Decimal(1),], [new Decimal(1),new Decimal(1),], 
        [new Decimal(1),new Decimal(1),], [new Decimal(1),new Decimal(1),], [new Decimal(1),new Decimal(1),], [new Decimal(1),new Decimal(1),], [new Decimal(1),new Decimal(1),]],

        //xpboost
        XPBoostUnlock: false,

        XPBoost: new Decimal(1),
        XPBoostUnlocks: [true, false],
        XPBoostBase: [new Decimal(0.2), new Decimal(0.5)],
        XPBoostTimers: [new Decimal(0), new Decimal(0),],
        XPBoostTimersMax: [new Decimal(10800), new Decimal(129600)],
        XPBoostReq: [new Decimal(100),new Decimal(500),],

        //chal 7
        lossRate: new Decimal(0),

        //paragon
        paragonShards: new Decimal(0),

        //autom
        totalAutomationShards: new Decimal(0),
        automationShards: new Decimal(0),
        automationShardsInput: new Decimal(0),
        automationShardsInputAmount: new Decimal(0),
        
        buttonAutomationAllocation: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        buttonAutomationTimersMax: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        buttonAutomationTimers: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        buttonIndex: new Decimal(0),

        // petAutomationAllocation: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        // petAutomationAllocationTimersMax: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        // petAutomationAllocationTimers: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        // XPBoostAutomationAllocation: [new Decimal(0)],
        // XPBoostAutomationAllocationTimersMax: [new Decimal(0)],
        // XPBoostAutomationAllocationTimers: [new Decimal(0)],

        //cante?
        canteEnergyXPButtonBase: [new Decimal(0.2), new Decimal(0.3), new Decimal(0.5), new Decimal(0.02), new Decimal(1.4), new Decimal(2.5), new Decimal(5), new Decimal(12) ],
        canteEnergyPetButtonBase: [new Decimal(1.6), new Decimal(3), new Decimal(5.5), new Decimal(9), new Decimal(13),],
        canteEnergyXPBoostButtonBase: [new Decimal(10), new Decimal(30)],
        canteEnergyPetPointButtonBase: [new Decimal(0.12), new Decimal(0.05), new Decimal(0.8), new Decimal(7), new Decimal(0.3),new Decimal(1),new Decimal(0.002),],

    }
    },
    automate() {
    },
    nodeStyle() {
    },

    tooltip: "Check Back",
    color: "#06366e",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.cb.totalxp == 5.1 && player.cb.level > 1)
        {
            player.cb.totalxp = layers.cb.levelToXP(player.cb.level).add(player.cb.xp)
        }
        
        if (player.cb.level.gte(player.cb.highestLevel))
        {
            player.cb.highestLevel = player.cb.level
        }

        if (player.points.gt(1e100) && !inChallenge("ip", 13))
        {
            player.cb.effectActivate = true
        } else
        { 
            player.cb.effectActivate = false
        }
        if (!inChallenge("ip", 17)) {
            player.cb.req = layers.cb.levelToXP(player.cb.level.add(1)).sub(layers.cb.levelToXP(player.cb.level))
        } else {
            player.cb.req = player.cb.level.pow(1.2).add(4).floor()
            player.cb.req = player.cb.req.div(player.cb.uncommonPetEffects[2][2])
            player.cb.req = player.cb.req.div(player.cb.rarePetEffects[3][1])
        }

        for (let i = 0; i < player.cb.buttonTimers.length; i++)
        {
            player.cb.buttonTimers[i] = player.cb.buttonTimers[i].sub(onepersec.mul(delta))
        }

        if (player.cb.xp.gte(player.cb.req))
        {
            layers.cb.levelup();
        }

        player.cb.levelEffect = player.cb.level.pow(3).pow(player.d.dicePointsEffect)
        if (hasUpgrade("bi", 25) && !player.po.dice) player.cb.levelEffect = player.cb.levelEffect.pow(5)
        if (hasUpgrade("bi", 25) && player.po.dice) player.cb.levelEffect = player.cb.levelEffect.pow(2)

        if (player.cb.highestLevel.gte(3))
        [
            player.cb.buttonUnlocks[1] = true
        ]
        if (player.cb.highestLevel.gte(6))
        [
            player.cb.buttonUnlocks[2] = true
        ]
        if (hasMilestone("r", 17))
        [
            player.cb.buttonUnlocks[3] = true
        ]
        if (player.cb.highestLevel.gte(15))
        [
            player.cb.buttonUnlocks[4] = true
        ]
        if (player.cb.highestLevel.gte(25))
        [
            player.cb.petButtonUnlocks[1] = true
        ]
        if (player.cb.highestLevel.gte(50))
        [
            player.cb.buttonUnlocks[5] = true
        ]
        if (player.cb.highestLevel.gte(65))
        [
            player.cb.buttonUnlocks[6] = true
        ]
        if (player.cb.highestLevel.gte(75))
        [
            player.cb.petButtonUnlocks[2] = true
        ]
        if (player.cb.highestLevel.gte(100) && hasUpgrade("ip", 31))
        [
            player.cb.XPBoostUnlock = true
        ]
        if (player.cb.highestLevel.gte(125))
        [
            player.cb.petButtonUnlocks[3] = true
        ]
        if (player.cb.highestLevel.gte(150))
        [
            player.cb.buttonUnlocks[7] = true
        ]
        if (player.cb.highestLevel.gte(666))
        [
            player.cb.XPBoostUnlocks[1] = true
        ]
        if (player.cb.highestLevel.gte(1500) && player.ca.unlockedCante)
        [
            player.cb.petButtonUnlocks[4] = true,
            player.cb.petButtonUnlocks[5] = true
        ]

        player.cb.buttonBaseXP = [new Decimal(1),new Decimal(2),new Decimal(4),new Decimal(0.06),new Decimal(25),new Decimal(80),new Decimal(220),new Decimal(666),]

        player.cb.buttonBaseXP[3] = player.cb.buttonBaseXP[3].mul(buyableEffect("ev1", 11))
        player.cb.buttonBaseXP[0] = player.cb.buttonBaseXP[0].mul(buyableEffect("ev1", 13))
        player.cb.buttonBaseXP[1] = player.cb.buttonBaseXP[1].mul(buyableEffect("ev1", 15))
        player.cb.buttonBaseXP[2] = player.cb.buttonBaseXP[2].mul(buyableEffect("ev1", 17))
        player.cb.buttonBaseXP[4] = player.cb.buttonBaseXP[4].mul(buyableEffect("ev1", 21))
        player.cb.buttonBaseXP[5] = player.cb.buttonBaseXP[5].mul(buyableEffect("ev1", 23))
        player.cb.buttonBaseXP[6] = player.cb.buttonBaseXP[6].mul(buyableEffect("ev1", 25))
        player.cb.buttonBaseXP[7] = player.cb.buttonBaseXP[7].mul(buyableEffect("ev1", 27))

        for (let i = 0; i < player.cb.buttonBaseXP.length; i++)
        {
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(buyableEffect("gh", 21))
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(player.cb.commonPetEffects[0][1])
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(player.cb.uncommonPetEffects[4][0])
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(player.cb.rarePetEffects[0][1])
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(player.ev0.coinDustEffect)
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(player.cb.XPBoost)
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(player.d.diceEffects[12])
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(player.rm.realmModsEffect[0])
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(buyableEffect("g", 25))
        }


        player.cb.buttonTimersMax = [new Decimal(60),new Decimal(180),new Decimal(300),new Decimal(5),new Decimal(1200),new Decimal(3600),new Decimal(14400),new Decimal(86400),]

        player.cb.buttonTimersMax[3] = player.cb.buttonTimersMax[3].div(buyableEffect("ev1", 12))
        player.cb.buttonTimersMax[0] = player.cb.buttonTimersMax[0].div(buyableEffect("ev1", 14))
        player.cb.buttonTimersMax[1] = player.cb.buttonTimersMax[1].div(buyableEffect("ev1", 16))
        player.cb.buttonTimersMax[2] = player.cb.buttonTimersMax[2].div(buyableEffect("ev1", 18))
        player.cb.buttonTimersMax[4] = player.cb.buttonTimersMax[4].div(buyableEffect("ev1", 22))
        player.cb.buttonTimersMax[5] = player.cb.buttonTimersMax[5].div(buyableEffect("ev1", 24))
        player.cb.buttonTimersMax[6] = player.cb.buttonTimersMax[6].div(buyableEffect("ev1", 26))
        player.cb.buttonTimersMax[7] = player.cb.buttonTimersMax[7].div(buyableEffect("ev1", 28))

        for (let i = 0; i < player.cb.buttonTimersMax.length; i++)
        {
            player.cb.buttonTimersMax[i] = player.cb.buttonTimersMax[i].div(buyableEffect("gh", 22))
            player.cb.buttonTimersMax[i] = player.cb.buttonTimersMax[i].div(player.cb.commonPetEffects[4][1])
            player.cb.buttonTimersMax[i] = player.cb.buttonTimersMax[i].div(player.cb.uncommonPetEffects[1][2])
            player.cb.buttonTimersMax[i] = player.cb.buttonTimersMax[i].div(buyableEffect("ev0", 12))
            if (player.rf.abilityTimers[6].gt(0)) player.cb.buttonTimersMax[i] = player.cb.buttonTimersMax[i].div(1.2)
            if (hasUpgrade("ev8", 15)) player.cb.buttonTimersMax[i] = player.cb.buttonTimersMax[i].div(1.15)
        }

        //Pet
        if (player.cb.highestLevel.gte(10))
        {
            player.cb.petButtonUnlocks[0] = true 
        }
        
        player.cb.petButtonTimersMax = [new Decimal(900), new Decimal(2700), new Decimal(5400), new Decimal(28800), new Decimal(7200), new Decimal(42000),]
        for (let i = 0; i < player.cb.petButtonTimersMax.length; i++)
        {
            player.cb.petButtonTimersMax[i] = player.cb.petButtonTimersMax[i].div(player.cb.commonPetEffects[4][0])
            player.cb.petButtonTimersMax[i] = player.cb.petButtonTimersMax[i].div(player.cb.uncommonPetEffects[1][2])
            player.cb.petButtonTimersMax[i] = player.cb.petButtonTimersMax[i].div(buyableEffect("ev0", 13))
            if (hasUpgrade("ev8", 12)) player.cb.petButtonTimersMax[i] = player.cb.petButtonTimersMax[i].div(1.1)
        }

        player.cb.petDisplay = 
        [
            "Gwa: " + formatWhole(player.cb.commonPetAmounts[0]) + "/" + formatWhole(player.cb.commonPetReq[0]) + " to level up. (Currently level " + formatWhole(player.cb.commonPetLevels[0]) + ")",
            "Egg Guy: " + formatWhole(player.cb.commonPetAmounts[1]) + "/" + formatWhole(player.cb.commonPetReq[1]) + " to level up. (Currently level " + formatWhole(player.cb.commonPetLevels[1]) + ")",
            "Unsmith: " + formatWhole(player.cb.commonPetAmounts[2]) + "/" + formatWhole(player.cb.commonPetReq[2]) + " to level up. (Currently level " + formatWhole(player.cb.commonPetLevels[2]) + ")",
            "Gd Checkpoint: " + formatWhole(player.cb.commonPetAmounts[3]) + "/" + formatWhole(player.cb.commonPetReq[3]) + " to level up. (Currently level " + formatWhole(player.cb.commonPetLevels[3]) + ")",
            "Slax: " + formatWhole(player.cb.commonPetAmounts[4]) + "/" + formatWhole(player.cb.commonPetReq[4]) + " to level up (Currently level " + formatWhole(player.cb.commonPetLevels[4]) + ")",
            "Spider: " + formatWhole(player.cb.commonPetAmounts[5]) + "/" + formatWhole(player.cb.commonPetReq[5]) + " to level up (Currently level " + formatWhole(player.cb.commonPetLevels[5]) + ")",
            "Blob: " + formatWhole(player.cb.commonPetAmounts[6]) + "/" + formatWhole(player.cb.commonPetReq[6]) + " to level up (Currently level " + formatWhole(player.cb.commonPetLevels[6]) + ")",
            "Replicator: " + formatWhole(player.cb.commonPetAmounts[7]) + "/" + formatWhole(player.cb.commonPetReq[7]) + " to level up (Currently level " + formatWhole(player.cb.commonPetLevels[7]) + ")",
            "Smoke: " + formatWhole(player.cb.commonPetAmounts[8]) + "/" + formatWhole(player.cb.commonPetReq[8]) + " to level up (Currently level " + formatWhole(player.cb.commonPetLevels[8]) + ")",
        ]

        player.cb.lockedImg = "<img src='resources/secret.png'style='width:calc(125%);height:calc(125%);margin:-20%'></img>"

        player.cb.commonPetImage = ["<img src='resources/gwaCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/eggCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/unsmithCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/checkpointCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/slaxCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/spiderCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/blobCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/replicatorCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/smokeCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
    ]

        if (player.cb.viewingEvolved[0]) 
        {
            player.cb.commonPetImage[2] = "<img src='resources/goldsmithEvoPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>"
            player.cb.petDisplay[2] = "Goldsmith: " + formatWhole(player.cb.evolutionShards) + "/" + formatWhole(player.cb.evolvedReq[0]) + " evo shards to level up. (Currently level " + formatWhole(player.cb.evolvedLevels[0]) + ")"
        }

        player.cb.commonPetReq = [
            player.cb.commonPetLevels[0].add(1),
            player.cb.commonPetLevels[1].add(1).pow(1.04).floor(),
            player.cb.commonPetLevels[2].add(1).pow(1.08).floor(),
            player.cb.commonPetLevels[3].add(1).pow(1.12).floor(),
            player.cb.commonPetLevels[4].add(1).pow(1.15).floor(),
            player.cb.commonPetLevels[5].add(1).pow(1.18).floor(),
            player.cb.commonPetLevels[6].add(1).pow(1.18).floor(),
            player.cb.commonPetLevels[7].add(1).pow(1.2).floor(),
            player.cb.commonPetLevels[8].add(1).pow(1.2).floor(),
        ]


        for (let i = 0; i < player.cb.petButtonTimers.length; i++)
        {
            player.cb.petButtonTimers[i] = player.cb.petButtonTimers[i].sub(onepersec.mul(delta))
        }

        if (((player.points.gte(1e100) && !inChallenge("ip", 13)) || hasMilestone("ip", 24)) || (hasUpgrade("de", 13) && inChallenge("tad", 11)) )
        {
        player.cb.commonPetEffects = [
            [player.cb.commonPetLevels[0].pow(3).add(1), player.cb.commonPetLevels[0].mul(0.02).add(1),],
            [player.cb.commonPetLevels[1].pow(2.4).add(1), player.cb.commonPetLevels[1].pow(2).add(1),],
            [player.cb.commonPetLevels[2].pow(2.7).add(1).pow(player.cb.evolvedEffects[0][0]), player.cb.commonPetLevels[2].pow(1.8).add(1).pow(player.cb.evolvedEffects[0][0]),],
            [player.cb.commonPetLevels[3].pow(2.2).add(1), player.cb.commonPetLevels[3].pow(1.3).div(3).add(1),],
            [player.cb.commonPetLevels[4].mul(0.01).add(1), player.cb.commonPetLevels[4].mul(0.02).add(1),],
            [player.cb.commonPetLevels[5].pow(1.6).mul(0.5).add(1), player.cb.commonPetLevels[5].pow(1.6).mul(0.5).add(1),], //antimatter and 7th dim
            [player.cb.commonPetLevels[6].mul(0.01).add(1), ], //xpboost
            [player.cb.commonPetLevels[7].mul(0.1).add(1), player.cb.commonPetLevels[7].pow(1.05).mul(0.2).add(1),], //replicanti mult and galaxy dust
            [player.cb.commonPetLevels[8].pow(1.2).mul(0.7).add(1), player.cb.commonPetLevels[5].pow(1.8).mul(1.2).add(1),], //mastery and all hex points

        ]
        }
        else
        {
            for (let i = 0; i < player.cb.commonPetEffects.length; i++)
            {
                for (let j = 0; j < player.cb.commonPetEffects[i].length; j++)
                {
                    player.cb.commonPetEffects[i][j] = new Decimal(1)
                }
            } 
        }   

        //uncommon
        player.cb.uncommonPetDisplay = 
        [
            "Teste: " + formatWhole(player.cb.uncommonPetAmounts[0]) + "/" + formatWhole(player.cb.uncommonPetReq[0]) + " to level up. (Currently level " + formatWhole(player.cb.uncommonPetLevels[0]) + ")",
            "Star: " + formatWhole(player.cb.uncommonPetAmounts[1]) + "/" + formatWhole(player.cb.uncommonPetReq[1]) + " to level up. (Currently level " + formatWhole(player.cb.uncommonPetLevels[1]) + ")",
            "Normal Face: " + formatWhole(player.cb.uncommonPetAmounts[2]) + "/" + formatWhole(player.cb.uncommonPetReq[2]) + " to level up. (Currently level " + formatWhole(player.cb.uncommonPetLevels[2]) + ")",
            "Shark: " + formatWhole(player.cb.uncommonPetAmounts[3]) + "/" + formatWhole(player.cb.uncommonPetReq[3]) + " to level up. (Currently level " + formatWhole(player.cb.uncommonPetLevels[3]) + ")",
            "THE WATCHING EYE: " + formatWhole(player.cb.uncommonPetAmounts[4]) + "/" + formatWhole(player.cb.uncommonPetReq[4]) + " to level up. (Currently level " + formatWhole(player.cb.uncommonPetLevels[4]) + ")",
            "Clock: " + formatWhole(player.cb.uncommonPetAmounts[5]) + "/" + formatWhole(player.cb.uncommonPetReq[5]) + " to level up. (Currently level " + formatWhole(player.cb.uncommonPetLevels[5]) + ")",
            "Trollface: " + formatWhole(player.cb.uncommonPetAmounts[6]) + "/" + formatWhole(player.cb.uncommonPetReq[6]) + " to level up. (Currently level " + formatWhole(player.cb.uncommonPetLevels[6]) + ")",
            "Infinity Breaker: " + formatWhole(player.cb.uncommonPetAmounts[7]) + "/" + formatWhole(player.cb.uncommonPetReq[7]) + " to level up. (Currently level " + formatWhole(player.cb.uncommonPetLevels[7]) + ")",
            "John: " + formatWhole(player.cb.uncommonPetAmounts[8]) + "/" + formatWhole(player.cb.uncommonPetReq[8]) + " to level up. (Currently level " + formatWhole(player.cb.uncommonPetLevels[8]) + ")",
        ]

        player.cb.uncommonPetImage = ["<img src='resources/testeUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/starUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/normalFaceUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/sharkUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/eyeUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/clockUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/trollUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/infinityBreakerUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/johnUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
    ]

        player.cb.uncommonPetReq = [
            player.cb.uncommonPetLevels[0].add(1),
            player.cb.uncommonPetLevels[1].mul(1.3).add(1).floor(),
            player.cb.uncommonPetLevels[2].mul(1.7).add(1).floor(),
            player.cb.uncommonPetLevels[3].mul(2).add(1).floor(),
            player.cb.uncommonPetLevels[4].mul(2.2).add(1).floor(),
            player.cb.uncommonPetLevels[5].mul(1.6).add(1).floor(),
            player.cb.uncommonPetLevels[6].mul(1.6).add(1).floor(),
            player.cb.uncommonPetLevels[7].mul(1.8).add(1).floor(),
            player.cb.uncommonPetLevels[8].mul(1.8).add(1).floor(),
        ]

        if (((player.points.gte(1e100) && !inChallenge("ip", 13)) || hasMilestone("ip", 24)) || (hasUpgrade("de", 13) && inChallenge("tad", 11)))
        {
        player.cb.uncommonPetEffects = [
            [player.cb.uncommonPetLevels[0].pow(1.2).div(2).add(1), player.cb.uncommonPetLevels[0].pow(1.25).div(1.5).add(1), player.cb.uncommonPetLevels[0].pow(1.27).add(1),],
            [player.cb.uncommonPetLevels[1].pow(1.3).div(1.6).add(1).pow(player.cb.evolvedEffects[4][0]), player.cb.uncommonPetLevels[1].pow(1.6).div(1.3).add(1).pow(player.cb.evolvedEffects[4][0]), player.cb.uncommonPetLevels[1].mul(0.01).add(1),], //lines of code, leaves, check back time
            [player.cb.uncommonPetLevels[2].pow(1.7).add(1), player.cb.uncommonPetLevels[2].pow(1.4).add(1), player.cb.uncommonPetLevels[2].mul(0.02).pow(0.95).add(1),], //tree req, mod req, check back level req
            [player.cb.uncommonPetLevels[3].pow(2).mul(5).add(1).pow(player.cb.evolvedEffects[1][0]), player.cb.uncommonPetLevels[3].pow(1.87).mul(3).add(1).pow(player.cb.evolvedEffects[1][0]), player.cb.uncommonPetLevels[3].pow(1.75).mul(2).add(1).pow(player.cb.evolvedEffects[1][0]),], //rank req, tier req, tetr req
            [player.cb.uncommonPetLevels[4].mul(0.05).add(1),], //check back xp
            [player.cb.uncommonPetLevels[5].mul(0.2).add(1),player.cb.uncommonPetLevels[5].mul(0.2).add(1),player.cb.uncommonPetLevels[5].mul(0.2).add(1),], //1st, 3rd, 5th
            [player.cb.uncommonPetLevels[6].mul(0.2).add(1),player.cb.uncommonPetLevels[6].mul(0.2).add(1),player.cb.uncommonPetLevels[6].mul(0.2).add(1),], //2nd, 4th, 6th
            [player.cb.uncommonPetLevels[7].pow(1.25).mul(0.7).add(1),player.cb.uncommonPetLevels[7].pow(1.8).mul(3).add(1),player.cb.uncommonPetLevels[7].pow(1.2).add(1),], //inf dims, neg ip, broken inf
            [player.cb.uncommonPetLevels[8].pow(1.3).mul(0.4).add(1),player.cb.uncommonPetLevels[8].pow(1.1).mul(0.5).add(1),player.cb.uncommonPetLevels[8].pow(1.2).add(1),], //dim power, alternate broken inf, time cubes

            //WORK HERE
        ]
        }
        else
        {
            for (let i = 0; i < player.cb.uncommonPetEffects.length; i++)
            {
                for (let j = 0; j < player.cb.uncommonPetEffects[i].length; j++)
                {
                    player.cb.uncommonPetEffects[i][j] = new Decimal(1)
                }
            } 
        }   

        //Rare
        player.cb.rarePetDisplay = 
        [
            "Nova: " + formatWhole(player.cb.rarePetAmounts[0]) + "/" + formatWhole(player.cb.rarePetReq[0]) + " to level up. (Currently level " + formatWhole(player.cb.rarePetLevels[0]) + ")",
            "Dice: " + formatWhole(player.cb.rarePetAmounts[1]) + "/" + formatWhole(player.cb.rarePetReq[1]) + " to level up. (Currently level " + formatWhole(player.cb.rarePetLevels[1]) + ")<br><h6>(Last roll: " + format(player.cb.dicePetPointsGain) + " pet points.) (Last roll: " + player.cb.lastDicePetRoll + ", Current roll combo: " + player.cb.dicePetCombo + ", highest is " + player.cb.highestDicePetCombo + ")",
            "Drippy Ufo: " + formatWhole(player.cb.rarePetAmounts[2]) + "/" + formatWhole(player.cb.rarePetReq[2]) + " to level up. (Currently level " + formatWhole(player.cb.rarePetLevels[2]) + ")",
            "Goofy Ahh Thing: " + formatWhole(player.cb.rarePetAmounts[3]) + "/" + formatWhole(player.cb.rarePetReq[3]) + " to level up. (Currently level " + formatWhole(player.cb.rarePetLevels[3]) + ")",
            "Antimatter: " + formatWhole(player.cb.rarePetAmounts[4]) + "/" + formatWhole(player.cb.rarePetReq[4]) + " to level up. (Currently level " + formatWhole(player.cb.rarePetLevels[4]) + ")",
            "Hex Shadow: " + formatWhole(player.cb.rarePetAmounts[5]) + "/" + formatWhole(player.cb.rarePetReq[5]) + " to level up. (Currently level " + formatWhole(player.cb.rarePetLevels[5]) + ")",
            "Grass Square: " + formatWhole(player.cb.rarePetAmounts[6]) + "/" + formatWhole(player.cb.rarePetReq[6]) + " to level up. (Currently level " + formatWhole(player.cb.rarePetLevels[6]) + ")",
        ]

        player.cb.rarePetImage = [
            "<img src='resources/novaRarePet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/diceRarePet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/ufoRarePet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/goofyAhhThingRarePet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/antimatterRarePet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/hexShadowRarePet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/grassSquareRarePet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        ]

        player.cb.rarePetReq = [
            player.cb.rarePetLevels[0].add(1),
            player.cb.rarePetLevels[1].pow(1.4).add(1).floor(),
            player.cb.rarePetLevels[2].pow(1.4).add(1).floor(),
            player.cb.rarePetLevels[3].pow(1.2).add(1).floor(),
            player.cb.rarePetLevels[4].pow(1.25).add(1).floor(),
            player.cb.rarePetLevels[5].pow(1.3).add(1).floor(),
            player.cb.rarePetLevels[6].pow(1.3).add(1).floor(),
        ]

        if (((player.points.gte(1e100) && !inChallenge("ip", 13)) || hasMilestone("ip", 24)) || (hasUpgrade("de", 13) && inChallenge("tad", 11)))
        {
        player.cb.rarePetEffects = [
            [player.g.grass.pow(0.02).div(2).add(1).pow(player.cb.rarePetLevels[0].pow(0.4)), player.cb.level.mul(0.0007).mul(player.cb.rarePetLevels[0]).pow(0.5).add(1),], //Fertilizer based on Grass, XP based on Level
            [player.cb.highestDicePetCombo.add(1).pow(player.cb.rarePetLevels[1].pow(0.3)), player.d.dicePoints.pow(0.1).mul(player.cb.rarePetLevels[1].pow(1.2)).add(1),], //Dice points based on combo, Mods based on dice points
            [player.cb.petPoints.pow(0.7).mul(0.1).add(1).pow(player.cb.rarePetLevels[2].pow(0.25)), player.cb.rarePetLevels[2].mul(0.04).add(1)], //Rocket Fuel based on pet points, Golden grass spawn time
            [player.cb.evolutionShards.pow(0.85).mul(0.6).add(1).pow(player.cb.rarePetLevels[3].pow(0.3)), player.cb.rarePetLevels[3].mul(0.03).add(1)], //Grasshoppers based on evo shards, Level Req
            [player.in.infinities.pow(0.8).mul(0.4).add(1).pow(player.cb.rarePetLevels[4].pow(0.25)), player.cb.rarePetLevels[4].pow(1.1).add(1)], //Antimatter dimensions based on infinities, golden grass
            [player.h.ragePower.pow(1.2).mul(0.3).add(1).pow(player.cb.rarePetLevels[5].pow(0.4)), player.h.ragePower.pow(1.01).mul(0.2).add(1).pow(player.cb.rarePetLevels[5].pow(0.3))], //steel and crystal based on rage power
            [player.g.goldGrass.pow(0.1).mul(0.01).add(1).pow(player.cb.rarePetLevels[6].pow(0.2)), player.g.goldGrass.pow(0.12).mul(0.015).add(1).pow(player.cb.rarePetLevels[6].pow(0.25))], //Blank mods and rage power based on golden grass
        ]
        }
        else
        {
            for (let i = 0; i < player.cb.rarePetEffects.length; i++)
            {
                for (let j = 0; j < player.cb.rarePetEffects[i].length; j++)
                {
                    player.cb.rarePetEffects[i][j] = new Decimal(1)
                }
            } 
        }   

        player.cb.rarePetButtonTimersMax = [new Decimal(40), new Decimal(20), new Decimal(900), new Decimal(18000), new Decimal(180), new Decimal(1500), new Decimal(1)]
        for (let i = 0; i < player.cb.rarePetButtonTimersMax.length; i++)
        {
            player.cb.rarePetButtonTimersMax[i] = player.cb.rarePetButtonTimersMax[i].div(buyableEffect("ev0", 14))
            player.cb.rarePetButtonTimersMax[i] = player.cb.rarePetButtonTimersMax[i].div(player.cb.evolvedEffects[2][0])
            player.cb.rarePetButtonTimersMax[i] = player.cb.rarePetButtonTimersMax[i].div(player.cb.epicPetEffects[0][1])
        }
        for (let i = 0; i < player.cb.rarePetButtonTimers.length; i++)
        {
            player.cb.rarePetButtonTimers[i] = player.cb.rarePetButtonTimers[i].sub(onepersec.mul(delta))
        }

        player.cb.rarePetPointBase = [new Decimal(0.6), new Decimal(0.1), new Decimal(10), new Decimal(60), new Decimal(2), new Decimal(6), new Decimal(0.05)]
        for (let i = 0; i < player.cb.rarePetPointBase.length; i++)
        {
            player.cb.rarePetPointBase[i] = player.cb.rarePetPointBase[i].mul(player.cb.evolvedEffects[1][1])
            player.cb.rarePetPointBase[i] = player.cb.rarePetPointBase[i].mul(buyableEffect("cb", 14))
            if (hasUpgrade("ev8", 13)) player.cb.rarePetPointBase[i] = player.cb.rarePetPointBase[i].mul(1.2)
            player.cb.rarePetPointBase[i] = player.cb.rarePetPointBase[i].mul(player.cb.epicPetEffects[0][0])
        }
        player.cb.rarePetPointBase[0] = player.cb.rarePetPointBase[0].mul(player.cb.rarePetLevels[0].mul(0.5))
        player.cb.rarePetPointBase[1] = player.cb.rarePetPointBase[1].mul(player.cb.rarePetLevels[1].mul(0.5))
        player.cb.rarePetPointBase[2] = player.cb.rarePetPointBase[2].mul(player.cb.rarePetLevels[2].mul(0.5).add(1))
        player.cb.rarePetPointBase[3] = player.cb.rarePetPointBase[3].mul(player.cb.rarePetLevels[3].mul(0.1).add(1))
        player.cb.rarePetPointBase[4] = player.cb.rarePetPointBase[4].mul(player.cb.rarePetLevels[4].mul(0.6).add(1))
        player.cb.rarePetPointBase[5] = player.cb.rarePetPointBase[5].mul(player.cb.rarePetLevels[5].mul(0.3).add(1))
        player.cb.rarePetPointBase[6] = player.cb.rarePetPointBase[6].mul(player.cb.rarePetLevels[6].mul(0.2).add(1))

        if (player.cb.dicePetCombo > player.cb.highestDicePetCombo)
        {
            player.cb.highestDicePetCombo = player.cb.dicePetCombo
        }

        //epic
        player.cb.epicPetDisplay = 
        [
            "Dotknight: " + formatWhole(player.cb.epicPetFragments[0]) + "/" + formatWhole(player.cb.epicPetFragmentReq[0]) + " fragments to level up. (Currently level " + formatWhole(player.cb.epicPetLevels[0]) + ")",
            "Dragon: " + formatWhole(player.cb.epicPetFragments[1]) + "/" + formatWhole(player.cb.epicPetFragmentReq[1]) + " fragments to level up. (Currently level " + formatWhole(player.cb.epicPetLevels[1]) + ")",
            "Cookie: " + formatWhole(player.cb.epicPetFragments[2]) + "/" + formatWhole(player.cb.epicPetFragmentReq[2]) + " fragments to level up. (Currently level " + formatWhole(player.cb.epicPetLevels[2]) + ")",
        ]

        player.cb.epicPetImage = [
            "<img src='resources/dotknightEpicPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/dragonEpicPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/cookieEpicPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        ]

        if (player.cb.epicPetLevels[0].eq(0))
        {
            player.cb.epicPetFragmentReq[0] = new Decimal(50)
        } else
        {
            player.cb.epicPetFragmentReq[0] = player.cb.epicPetLevels[0].pow(1.2).mul(5).add(5).floor()
        }

        if (player.cb.epicPetLevels[1].eq(0))
        {
            player.cb.epicPetFragmentReq[1] = new Decimal(50)
        } else
        {
            player.cb.epicPetFragmentReq[1] = player.cb.epicPetLevels[1].pow(1.2).mul(5).add(5).floor()
        }

        if (player.cb.epicPetLevels[2].eq(0))
        {
            player.cb.epicPetFragmentReq[2] = new Decimal(50)
        } else
        {
            player.cb.epicPetFragmentReq[2] = player.cb.epicPetLevels[2].pow(1.2).mul(5).add(5).floor()
        }

        if (((player.points.gte(1e100) && !inChallenge("ip", 13)) || hasMilestone("ip", 24)) || (hasUpgrade("de", 13) && inChallenge("tad", 11)))
        {
        player.cb.epicPetEffects = [
            [player.cb.XPBoost.pow(0.3).div(9).add(1).pow(player.cb.epicPetLevels[0].pow(0.3)), player.cb.evolutionShards.pow(0.4).div(25).mul(player.cb.epicPetLevels[0].pow(0.4)).add(1), player.cb.paragonShards.pow(0.5).div(20).mul(player.cb.epicPetLevels[0]).pow(0.4).div(2).add(1),], //Pet points based on xp boost, pet point button cooldown based on evo shards, xp boost cooldown based on paragon shards
            [player.gs.grassSkip.pow(0.8).add(1).pow(player.cb.epicPetLevels[1].pow(0.65)), player.ca.galaxyDust.pow(0.25).mul(25).mul(player.cb.epicPetLevels[1].pow(1.2)).add(1),  player.rt.repliTrees.pow(0.1).mul(player.cb.epicPetLevels[1].pow(0.6)).add(1),], //replicanti point mult based on grassskip, anonymity based on galaxy dust, repli-leaves based on repli-trees
            [player.ca.canteCores.pow(0.7).mul(0.05).mul(player.cb.epicPetLevels[2].pow(0.55)).add(1), player.ca.canteCores.pow(1.1).mul(20).add(1).pow(player.cb.epicPetLevels[2].pow(0.55)), player.ca.canteCores.pow(1.1).add(1).pow(player.cb.epicPetLevels[2].pow(0.6)), player.cb.XPBoost.pow(0.6).add(1).pow(player.cb.epicPetLevels[2].pow(0.4)), ], //cante energy based on cante cores, infinity points based on cante cores, proto memories based on xpboost

        ]
        }
        else
        {
            for (let i = 0; i < player.cb.epicPetEffects.length; i++)
            {
                for (let j = 0; j < player.cb.epicPetEffects[i].length; j++)
                {
                    player.cb.epicPetEffects[i][j] = new Decimal(1)
                }
            } 
        }   

        if (player.cb.viewingEvolved[1]) 
        {
            player.cb.uncommonPetImage[3] = "<img src='resources/mrRedSharkEvoPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>"
            player.cb.uncommonPetDisplay[3] = "MrRedShark: " + formatWhole(player.cb.evolutionShards) + "/" + formatWhole(player.cb.evolvedReq[1]) + " evo shards to level up. (Currently level " + formatWhole(player.cb.evolvedLevels[1]) + ")"
        }
        if (player.cb.viewingEvolved[2]) 
        {
            player.cb.uncommonPetImage[2] = "<img src='resources/insaneFaceEvoPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>"
            player.cb.uncommonPetDisplay[2] = "Insane Face: " + formatWhole(player.cb.evolutionShards) + "/" + formatWhole(player.cb.evolvedReq[2]) + " evo shards to level up. (Currently level " + formatWhole(player.cb.evolvedLevels[2]) + ")"
        }
        if (player.cb.viewingEvolved[3]) 
        {
            player.cb.commonPetImage[0] = "<img src='resources/voidGwaEvoPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>"
            player.cb.petDisplay[0] = "Voidgwa: " + formatWhole(player.cb.evolutionShards) + "/" + formatWhole(player.cb.evolvedReq[3]) + " evo shards to level up. (Currently level " + formatWhole(player.cb.evolvedLevels[3]) + ")"
        }
        if (player.cb.viewingEvolved[4]) 
        {
            player.cb.uncommonPetImage[1] = "<img src='resources/sunEvoPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>"
            player.cb.uncommonPetDisplay[1] = "Sun: " + formatWhole(player.cb.paragonShards) + "/" + formatWhole(player.cb.evolvedReq[4]) + " paragon shards to level up. (Currently level " + formatWhole(player.cb.evolvedLevels[4]) + ")"
        }
        if (player.cb.viewingEvolved[5]) 
        {
            player.cb.rarePetImage[1] = "<img src='resources/d20EvoPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>"
            player.cb.rarePetDisplay[1] = "d20: " + formatWhole(player.cb.paragonShards) + "/" + formatWhole(player.cb.evolvedReq[5]) + " paragon shards to level up. (Currently level " + formatWhole(player.cb.evolvedLevels[5]) + ")"
        }
        if (player.cb.viewingEvolved[6]) 
        {
            player.cb.commonPetImage[5] = "<img src='resources/mutantSpiderEvoPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>"
            player.cb.petDisplay[5] = "Mutant Spider: " + formatWhole(player.cb.evolutionShards) + "/" + formatWhole(player.cb.evolvedReq[6]) + " evolution shards to level up. (Currently level " + formatWhole(player.cb.evolvedLevels[6]) + ")"
        }
        if (player.cb.viewingEvolved[7]) 
        {
            player.cb.rarePetImage[2] = "<img src='resources/moonEvoPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>"
            player.cb.rarePetDisplay[2] = "Moon: " + formatWhole(player.cb.paragonShards) + "/" + formatWhole(player.cb.evolvedReq[7]) + " paragon shards to level up. (Currently level " + formatWhole(player.cb.evolvedLevels[7]) + ")"
        }
        if (player.cb.viewingEvolved[8]) 
        {
            player.cb.uncommonPetImage[5] = "<img src='resources/marcelAcoplaoEvoPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>"
            player.cb.uncommonPetDisplay[5] = "Marcel Acoplao: " + formatWhole(player.cb.evolutionShards) + "/" + formatWhole(player.cb.evolvedReq[8]) + " evo shards to level up. (Currently level " + formatWhole(player.cb.evolvedLevels[8]) + ")"
        }

        //EVOS


        player.cb.evolvedReq = [
            player.cb.evolvedLevels[0].add(2).floor(),
            player.cb.evolvedLevels[1].pow(0.8).add(3).floor(),
            player.cb.evolvedLevels[2].pow(0.7).add(4).floor(),
            player.cb.evolvedLevels[3].pow(0.75).add(6).floor(),
            player.cb.evolvedLevels[4].pow(0.4).add(1).floor(),
            player.cb.evolvedLevels[5].pow(0.4).add(1).floor(),
            player.cb.evolvedLevels[6].pow(0.65).add(3).floor(),
            player.cb.evolvedLevels[7].pow(0.35).floor(),
            player.cb.evolvedLevels[8].pow(1.1).add(5).floor(),
        ]

        player.cb.evolvedEffects = [
            [player.cb.evolvedLevels[0].div(20).add(1), player.cb.evolvedLevels[0].pow(1.15),],
            [player.cb.evolvedLevels[1].div(15).add(1), player.cb.evolvedLevels[1].mul(0.03).add(1),],
            [player.cb.evolvedLevels[2].mul(0.02).add(1), player.cb.evolvedLevels[2].mul(0.03).add(1),],
            [player.cb.evolvedLevels[3].mul(0.1).add(1), player.cb.evolvedLevels[3].mul(0.1).add(1),], //inf and broken inf
            [player.cb.evolvedLevels[4].mul(0.05).add(1), player.cb.evolvedLevels[4].mul(2).pow(1.4).add(1),], //star effect and rocket fuel
            [player.cb.evolvedLevels[5].mul(0.05).add(1), player.cb.evolvedLevels[5].mul(2).pow(1.2).add(1),], //dice effect and challenge dice points
            [player.cb.evolvedLevels[6].mul(3).pow(1.8).add(1), player.cb.evolvedLevels[6].mul(2).pow(1.7).add(1),], //steel and crystal
            [player.cb.evolvedLevels[7].add(5), player.cb.evolvedLevels[7].mul(5).pow(1.75).add(1),], //max moonstone and grass
            [player.cb.evolvedLevels[8].mul(10).pow(2).add(1), player.cb.evolvedLevels[8].mul(2).pow(1.4).add(1),], //anonymity and oil
        ]

        //xpboost

        player.cb.XPBoostBase = [new Decimal(0.2),new Decimal(0.5),]
        for (let i = 0; i < player.cb.XPBoostBase.length; i++)
        {
            player.cb.XPBoostBase[0] = player.cb.XPBoostBase[0].mul(player.cb.level.div(100).pow(0.6))
            player.cb.XPBoostBase[1] = player.cb.XPBoostBase[1].mul(player.cb.level.div(80).pow(0.55))
            player.cb.XPBoostBase[i] = player.cb.XPBoostBase[i].mul(player.cb.evolvedEffects[2][1])
            player.cb.XPBoostBase[i] = player.cb.XPBoostBase[i].mul(player.cb.commonPetEffects[6][0])
            player.cb.XPBoostBase[i] = player.cb.XPBoostBase[i].mul(buyableEffect("cb", 13))
            if (hasUpgrade("ev8", 16)) player.cb.XPBoostBase[i] = player.cb.XPBoostBase[i].mul(1.2)
        }

        player.cb.XPBoostReq = [new Decimal(100), new Decimal(500)]
        player.cb.XPBoostTimersMax = [new Decimal(10800), new Decimal(129600)]
        for (let i = 0; i < player.cb.XPBoostTimersMax.length; i++)
        {
            player.cb.XPBoostTimersMax[i] = player.cb.XPBoostTimersMax[i].div(player.cb.epicPetEffects[0][2])
        }
        for (let i = 0; i < player.cb.XPBoostTimers.length; i++)
        {
            player.cb.XPBoostTimers[i] = player.cb.XPBoostTimers[i].sub(onepersec.mul(delta))
        }

        //chal 7
        if (inChallenge("ip", 17) && player.cb.level.gt(1))
        { 
            player.cb.lossRate = Decimal.add(0.1, player.cb.xp.div(666).pow(0.8))
            player.cb.xp = player.cb.xp.sub(player.cb.lossRate.mul(delta))

            if (player.cb.xp.lt(0))
            {
                player.cb.level = player.cb.level.sub(2)
                player.cb.xp = player.cb.req.sub(1)
            }
        }

        //automation
        for (let i = 0; i < player.cb.buttonAutomationTimersMax.length; i++)
        {
            if (player.cb.buttonAutomationAllocation[i].gt(0)) player.cb.buttonAutomationTimersMax[i] = player.cb.buttonTimersMax[i].mul(10).div(player.cb.buttonAutomationAllocation[i].pow(0.75))
        }   
        for (let i = 0; i < player.cb.buttonAutomationTimers.length; i++)
        {
            if (player.cb.buttonAutomationAllocation[i].gt(0)) player.cb.buttonAutomationTimers[i] = player.cb.buttonAutomationTimers[i].sub(onepersec.mul(delta))

            if (player.cb.buttonAutomationTimers[i].lt(0))
            {
                player.cb.buttonAutomationTimers[i] = player.cb.buttonAutomationTimersMax[i]
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[i].mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.buttonBaseXP[i].mul(player.cb.xpMult))
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPButtonBase[i].mul(player.ca.canteEnergyMult))
            }
        }
        
        if (player.cb.automationShardsInput.gte(1)) player.cb.automationShardsInputAmount = player.cb.automationShardsInput.floor()
        if (player.cb.automationShardsInput.lt(1)) player.cb.automationShardsInputAmount = new Decimal(1)

        let usedAutomationShards = new Decimal(0)
        for (let i = 0; i < player.cb.buttonAutomationTimersMax.length; i++)
        {
            usedAutomationShards = usedAutomationShards.add(player.cb.buttonAutomationAllocation[i])
        } 

        player.cb.totalAutomationShards = player.cb.automationShards.add(usedAutomationShards)

        //cante
        player.cb.canteEnergyXPButtonBase = [new Decimal(0.2), new Decimal(0.3), new Decimal(0.5), new Decimal(0.02), new Decimal(1.4), new Decimal(2.5), new Decimal(5), new Decimal(12) ]
        player.cb.canteEnergyPetButtonBase = [new Decimal(1.6), new Decimal(3), new Decimal(5.5), new Decimal(9), new Decimal(7), new Decimal(14),]
        player.cb.canteEnergyXPBoostButtonBase = [new Decimal(10), new Decimal(30)]
        player.cb.canteEnergyPetPointButtonBase = [new Decimal(0.12), new Decimal(0.05), new Decimal(0.8), new Decimal(7), new Decimal(0.3),new Decimal(1),new Decimal(0.002),]
    },
    levelToXP(quantity)
    {
        if (quantity == null) {quantity = new Decimal(1)}
        quantity = quantity.add(3).pow(2.2).mul(5/11)
        quantity = quantity.div(player.cb.uncommonPetEffects[2][2])
        quantity = quantity.div(player.cb.rarePetEffects[3][1])
        return quantity
    },
    xpToLevel(quantity)
    {
        if (quantity == null) {quantity = new Decimal(5.1)}
        quantity = quantity.mul(player.cb.uncommonPetEffects[2][2])
        quantity = quantity.mul(player.cb.rarePetEffects[3][1])
        quantity = quantity.div(5/11).pow(5/11).sub(3).floor()
        return quantity
    },
    levelup()
    {
        if (!inChallenge("ip", 17)) {
            let leftover = new Decimal(0)
            player.cb.level = layers.cb.xpToLevel(player.cb.totalxp)
            leftover = player.cb.totalxp - layers.cb.levelToXP(player.cb.level)
            player.cb.xp = new Decimal(0)
            player.cb.xp = player.cb.xp.add(leftover)
        } else {
            let leftover = new Decimal(0)
            leftover = player.cb.xp.sub(player.cb.req)
            player.cb.level = player.cb.level.add(1)
            player.cb.xp = new Decimal(0)
            player.cb.xp = player.cb.xp.add(leftover)
        }
    },
    sacrificeCommonPet(index)
    {
        rarityBase = new Decimal(1)
        player.cb.commonPetAmounts[index] = player.cb.commonPetAmounts[index].sub(1)
        player.ev4.offerings = player.ev4.offerings.add(rarityBase.mul(player.ev4.offeringsBase))
    },
    sacrificeAllCommonPet(index)
    {
        rarityBase = new Decimal(1)
        amount = player.cb.commonPetAmounts[index]
        player.cb.commonPetAmounts[index] = new Decimal(0)
        player.ev4.offerings = player.ev4.offerings.add(rarityBase.mul(amount.mul(player.ev4.offeringsBase)))
    },
    sacrificeUncommonPet(index)
    {
        rarityBase = new Decimal(3)
        player.cb.uncommonPetAmounts[index] = player.cb.uncommonPetAmounts[index].sub(1)
        player.ev4.offerings = player.ev4.offerings.add(rarityBase.mul(player.ev4.offeringsBase))
    },
    sacrificeAllUncommonPet(index)
    {
        rarityBase = new Decimal(3)
        amount = player.cb.uncommonPetAmounts[index]
        player.cb.uncommonPetAmounts[index] = new Decimal(0)
        player.ev4.offerings = player.ev4.offerings.add(rarityBase.mul(amount.mul(player.ev4.offeringsBase)))
    },
    sacrificeRarePet(index)
    {
        rarityBase = new Decimal(10)
        player.cb.rarePetAmounts[index] = player.cb.rarePetAmounts[index].sub(1)
        player.ev4.offerings = player.ev4.offerings.add(rarityBase.mul(player.ev4.offeringsBase))
    },
    sacrificeAllRarePet(index)
    {
        rarityBase = new Decimal(10)
        amount = player.cb.rarePetAmounts[index]
        player.cb.rarePetAmounts[index] = new Decimal(0)
        player.ev4.offerings = player.ev4.offerings.add(rarityBase.mul(amount.mul(player.ev4.offeringsBase)))
    },
    branches: ["m"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "i"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "<h2>View Evolutions" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "ev"
                startRain('#4b79ff');
            },
            style: { width: '200px', "min-height": '100px', 'background-image': 'linear-gradient(90deg, #d487fd, #4b79ff)', border: '2px solid #4b79ff', 'border-radius': "0%"},
        },
        3: {
            title() { return "Buy Max On" },
            canClick() { return player.buyMax == false },
            unlocked() { return true },
            onClick() {
                player.buyMax = true
            },
            style: { width: '75px', "min-height": '75px', }
        },
        4: {
            title() { return "Buy Max Off" },
            canClick() { return player.buyMax == true  },
            unlocked() { return true },
            onClick() {
                player.buyMax = false
            },
            style: { width: '75px', "min-height": '75px', }
        },
        5: {
            title() { return "Gain Fragments"},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = 'epic'
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%",  'background-color': "#cb79ed"  },
        },
        11: {
            title() { return player.cb.buttonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[0]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[0].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[0].lt(0) },
            unlocked() { return player.cb.buttonUnlocks[0] },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 0.5%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[0].mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.buttonBaseXP[0].mul(player.cb.xpMult))
                player.cb.buttonTimers[0] = player.cb.buttonTimersMax[0]

                if (player.cb.highestLevel.gt(35))
                {
                    let random = getRandomInt(200)
                    if (random == 1)
                    {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        callAlert("You gained an Evolution Shard! (0.5%)", "resources/evoShard.png");
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPButtonBase[0].mul(player.ca.canteEnergyMult))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        12: {
            title() { return player.cb.buttonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[1]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[1].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[1].lt(0) },
            unlocked() { return player.cb.buttonUnlocks[1] },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 1%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[1].mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.buttonBaseXP[1].mul(player.cb.xpMult))
                player.cb.buttonTimers[1] = player.cb.buttonTimersMax[1]

                if (player.cb.highestLevel.gt(35))
                {
                    let random = getRandomInt(100)
                    if (random == 1)
                    {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        callAlert("You gained an Evolution Shard! (1%)", "resources/evoShard.png");
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPButtonBase[1].mul(player.ca.canteEnergyMult))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        13: {
            title() { return player.cb.buttonTimers[2].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[2]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[2].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[2].lt(0) },
            unlocked() { return player.cb.buttonUnlocks[2] },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 2%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[2].mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.buttonBaseXP[2].mul(player.cb.xpMult))
                player.cb.buttonTimers[2] = player.cb.buttonTimersMax[2]

                if (player.cb.highestLevel.gt(35))
                {
                    let random = getRandomInt(50)
                    if (random == 1)
                    {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        callAlert("You gained an Evolution Shard! (2%)", "resources/evoShard.png");
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPButtonBase[2].mul(player.ca.canteEnergyMult))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        14: {
            title() { return player.cb.buttonTimers[3].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[3]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[3].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[3].lt(0) },
            unlocked() { return player.cb.buttonUnlocks[3] },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 0.2%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[3].mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.buttonBaseXP[3].mul(player.cb.xpMult))
                player.cb.buttonTimers[3] = player.cb.buttonTimersMax[3]

                if (player.cb.highestLevel.gt(35))
                {
                    let random = getRandomInt(500)
                    if (random == 1)
                    {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        callAlert("You gained an Evolution Shard! (0.2%)", "resources/evoShard.png");
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPButtonBase[3].mul(player.ca.canteEnergyMult))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        15: {
            title() { return player.cb.petButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.petButtonTimers[0]) + "." : "<h3>Collect a random common pet."},
            canClick() { return player.cb.petButtonTimers[0].lt(0) },
            unlocked() { return player.cb.petButtonUnlocks[0] },
            tooltip() { return "27% - Gwa<br>22% - Egg Guy<br>17% - Unsmith<br>16% - Gd Checkpoint<br>13% - Slax<br>5% - Teste"},
            onClick() {
                player.cb.petButtonTimers[0] = player.cb.petButtonTimersMax[0]
                layers.cb.petButton1();
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetButtonBase[0].mul(player.ca.canteEnergyMult))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        16: {
            title() { return player.cb.buttonTimers[4].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[4]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[4].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[4].lt(0) },
            unlocked() { return player.cb.buttonUnlocks[4] },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 5%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[4].mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.buttonBaseXP[4].mul(player.cb.xpMult))
                player.cb.buttonTimers[4] = player.cb.buttonTimersMax[4]

                if (player.cb.highestLevel.gt(35))
                {
                    let random = getRandomInt(20)
                    if (random == 1)
                    {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        callAlert("You gained an Evolution Shard! (5%)", "resources/evoShard.png");
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPButtonBase[4].mul(player.ca.canteEnergyMult))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        17: {
            title() { return player.cb.petButtonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.petButtonTimers[1]) + "." : "<h3>Collect a random uncommon/common pet."},
            canClick() { return player.cb.petButtonTimers[1].lt(0) },
            unlocked() { return player.cb.petButtonUnlocks[1] },
            tooltip() { return "7% - Gwa<br>7% - Egg Guy<br>7% - Unsmith<br>7% - Gd Checkpoint<br>7% - Slax<br>11% - Teste<br>12% - Star<br>12% - Normal Face<br>12% - Shark<br>12% - THE WATCHING EYE<br>7% - Nova"},
            onClick() {
                player.cb.petButtonTimers[1] = player.cb.petButtonTimersMax[1]
                layers.cb.petButton2();
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetButtonBase[1].mul(player.ca.canteEnergyMult))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        18: {
            title() { return player.cb.rarePetButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.rarePetButtonTimers[0]) + "." : "<h3>+" + format(player.cb.rarePetPointBase[0]) + " Pet Points."},
            canClick() { return player.cb.rarePetButtonTimers[0].lt(0) },
            unlocked() { return player.cb.rarePetDisplayIndex == 0 || player.subtabs["cb"]["buttons"] == "Pet Points" && player.subtabs["cb"]["stuff"] == "Main" && player.cb.rarePetLevels[0].gte(1)},
            onClick() {
                player.cb.petPoints = player.cb.petPoints.add(player.cb.rarePetPointBase[0])
                player.cb.rarePetButtonTimers[0] = player.cb.rarePetButtonTimersMax[0]
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetPointButtonBase[0].mul(player.ca.canteEnergyMult))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "0%" },
        },
        19: {
            title() { return player.cb.rarePetButtonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.rarePetButtonTimers[1]) + "." : "<h3>Roll for Pet Points!"},
            canClick() { return player.cb.rarePetButtonTimers[1].lt(0) },
            unlocked() { return player.cb.rarePetDisplayIndex == 1 || player.subtabs["cb"]["buttons"] == "Pet Points" && player.subtabs["cb"]["stuff"] == "Main" && player.cb.rarePetLevels[1].gte(1)},
            onClick() {
                player.cb.dicePetRoll = getRandomInt(6) + 1

                player.cb.dicePetPointsGain = player.cb.rarePetPointBase[1].mul(player.cb.dicePetRoll)

                if (player.cb.lastDicePetRoll == player.cb.dicePetRoll)
                {
                    player.cb.dicePetCombo = player.cb.dicePetCombo.add(1)
                } else
                {
                    player.cb.dicePetCombo = new Decimal(0)
                }
                player.cb.lastDicePetRoll = player.cb.dicePetRoll

                player.cb.petPoints = player.cb.petPoints.add(player.cb.dicePetPointsGain)

                player.cb.rarePetButtonTimers[1] = player.cb.rarePetButtonTimersMax[1]
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetPointButtonBase[1].mul(player.ca.canteEnergyMult))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "0%" },
        },
        21: {
            title() { return player.cb.buttonTimers[5].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[5]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[5].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[5].lt(0) },
            unlocked() { return player.cb.buttonUnlocks[5] },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 20%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[5].mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.buttonBaseXP[5].mul(player.cb.xpMult))
                player.cb.buttonTimers[5] = player.cb.buttonTimersMax[5]

                if (player.cb.highestLevel.gt(35))
                {
                    let random = getRandomInt(5)
                    if (random == 1)
                    {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        callAlert("You gained an Evolution Shard! (20%)", "resources/evoShard.png");
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPButtonBase[5].mul(player.ca.canteEnergyMult))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        22: {
            title() { return player.cb.rarePetButtonTimers[2].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.rarePetButtonTimers[2]) + "." : "<h3>+" + format(player.cb.rarePetPointBase[2]) + " Pet Points."},
            canClick() { return player.cb.rarePetButtonTimers[2].lt(0) },
            tooltip() { return "Also subtract 5 minutes off the shop reset timer :)"},
            unlocked() { return player.cb.rarePetDisplayIndex == 2 || player.subtabs["cb"]["buttons"] == "Pet Points" && player.subtabs["cb"]["stuff"] == "Main" && player.cb.rarePetLevels[2].gte(1)},
            onClick() {
                player.cb.petPoints = player.cb.petPoints.add(player.cb.rarePetPointBase[2])
                player.ps.priceResetTimer = player.ps.priceResetTimer.sub(300)
                player.cb.rarePetButtonTimers[2] = player.cb.rarePetButtonTimersMax[2]
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetPointButtonBase[2].mul(player.ca.canteEnergyMult))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "0%" },
        },
        23: {
            title() { return player.cb.buttonTimers[6].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[6]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[6].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[6].lt(0) },
            unlocked() { return player.cb.buttonUnlocks[6] },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 50%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[6].mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.buttonBaseXP[6].mul(player.cb.xpMult))
                player.cb.buttonTimers[6] = player.cb.buttonTimersMax[6]

                if (player.cb.highestLevel.gt(35))
                {
                    let random = getRandomInt(2)
                    if (random == 1)
                    {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        callAlert("You gained an Evolution Shard! (50%)", "resources/evoShard.png");
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPButtonBase[6].mul(player.ca.canteEnergyMult))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        24: {
            title() { return player.cb.rarePetButtonTimers[3].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.rarePetButtonTimers[3]) + "." : "<h3>+" + format(player.cb.rarePetPointBase[3]) + " Pet Points."},
            canClick() { return player.cb.rarePetButtonTimers[3].lt(0) },
            tooltip() { return "25% chance for an evo shard."},
            unlocked() { return player.cb.rarePetDisplayIndex == 3 || player.subtabs["cb"]["buttons"] == "Pet Points" && player.subtabs["cb"]["stuff"] == "Main" && player.cb.rarePetLevels[3].gte(1)},
            onClick() {
                player.cb.petPoints = player.cb.petPoints.add(player.cb.rarePetPointBase[3])
                player.cb.rarePetButtonTimers[3] = player.cb.rarePetButtonTimersMax[3]

                let random = getRandomInt(4)
                if (random == 1)
                {
                    player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                    callAlert("You gained an Evolution Shard! (25%)", "resources/evoShard.png");
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetPointButtonBase[3].mul(player.ca.canteEnergyMult))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "0%" },
        },
        25: {
            title() { return player.cb.petButtonTimers[2].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.petButtonTimers[2]) + "." : "<h3>Collect a random uncommon pet."},
            canClick() { return player.cb.petButtonTimers[2].lt(0) },
            unlocked() { return player.cb.petButtonUnlocks[2] },
            tooltip() { return "16% - Teste<br>16% - Star<br>16% - Normal Face<br>16% - Shark<br>16% - THE WATCHING EYE<br>12% - Goofy Ahh Thing<br>8% - Evo Shard"},
            onClick() {
                player.cb.petButtonTimers[2] = player.cb.petButtonTimersMax[2]
                layers.cb.petButton3();
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetButtonBase[2].mul(player.ca.canteEnergyMult))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        26: {
            title() { return player.cb.XPBoostTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.XPBoostTimers[0]) + "." : "<h3>+" + format(player.cb.XPBoostBase[0]) + " XP Boost."},
            canClick() { return player.cb.XPBoostTimers[0].lt(0) },
            unlocked() { return player.cb.XPBoostUnlocks[0] },
            tooltip() { return player.cb.highestLevel.gte(250) ? "Paragon Shard Rarity: 5%" : ""},
            onClick() {
                if (player.cb.highestLevel.gte(player.cb.XPBoostReq[0]))
                {
                    player.cb.XPBoost = player.cb.XPBoost.add(player.cb.XPBoostBase[0])
                    player.cb.XPBoostTimers[0] = player.cb.XPBoostTimersMax[0]

                    if (player.cb.highestLevel.gt(250))
                    {
                        let random = getRandomInt(10)
                        if (random == 1)
                        {
                            player.cb.paragonShards = player.cb.paragonShards.add(1);
                            callAlert("You gained a PARAGON SHARD! (10%)", "resources/paragonShard.png");
                        }
                    }
                    player.cb.level = new Decimal(1)
                    player.cb.xp = new Decimal(0)
                    player.cb.totalxp = new Decimal(5.1)
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPBoostButtonBase[0].mul(player.ca.canteEnergyMult))
            } else
                {
                    callAlert("You must be level " + formatWhole(player.cb.XPBoostReq[0]) + " to reset for this button.");
                }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        27: {
            title() { return player.cb.rarePetButtonTimers[4].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.rarePetButtonTimers[4]) + "." : "<h3>+" + format(player.cb.rarePetPointBase[4]) + " Pet Points."},
            canClick() { return player.cb.rarePetButtonTimers[4].lt(0) },
            //tooltip() { return "25% chance for an evo shard"},
            unlocked() { return player.cb.rarePetDisplayIndex == 4 || player.subtabs["cb"]["buttons"] == "Pet Points" && player.subtabs["cb"]["stuff"] == "Main" && player.cb.rarePetLevels[4].gte(1)},
            onClick() {
                player.cb.petPoints = player.cb.petPoints.add(player.cb.rarePetPointBase[4])
                player.cb.rarePetButtonTimers[4] = player.cb.rarePetButtonTimersMax[4]
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetPointButtonBase[4].mul(player.ca.canteEnergyMult))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "0%" },
        },
        28: {
            title() { return player.cb.petButtonTimers[3].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.petButtonTimers[3]) + "." : "<h3>Collect a random antimatter pet."},
            canClick() { return player.cb.petButtonTimers[3].lt(0) && player.cb.XPBoost.gt(1.04) },
            unlocked() { return player.cb.petButtonUnlocks[3] },
            tooltip() { return "COSTS 0.04 XPBOOST<br>25% - Spider<br>25% - Blob<br>15% - Clock<br>15% - Trollface<br>15% - Antimatter<br>5% - Evo Shards"},
            onClick() {
                player.cb.petButtonTimers[3] = player.cb.petButtonTimersMax[3]
                layers.cb.petButton4();

                player.cb.XPBoost = player.cb.XPBoost.sub(0.04)
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetButtonBase[3].mul(player.ca.canteEnergyMult))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        29: {
            title() { return player.cb.buttonTimers[7].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[7]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[7].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[7].lt(0) },
            unlocked() { return player.cb.buttonUnlocks[7] },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 98%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[7].mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.buttonBaseXP[7].mul(player.cb.xpMult))
                player.cb.buttonTimers[7] = player.cb.buttonTimersMax[7]

                if (player.cb.highestLevel.gt(35))
                {
                    let random = getRandomInt(50)
                    if (random != 1)
                    {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        callAlert("You gained an Evolution Shard! (98%)", "resources/evoShard.png");
                    } else
                    {
                        callAlert("Damn bro you didn't gain an evo shard. Take a screenshot, send to the discord, and ping the dev. I think ur still cool.");
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPButtonBase[7].mul(player.ca.canteEnergyMult))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        31: {
            title() { return player.cb.XPBoostTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.XPBoostTimers[1]) + "." : "<h3>+" + format(player.cb.XPBoostBase[1]) + " XP Boost."},
            canClick() { return player.cb.XPBoostTimers[1].lt(0) },
            unlocked() { return player.cb.XPBoostUnlocks[1] },
            tooltip() { return player.cb.highestLevel.gte(250) ? "Paragon Shard Rarity: 25%" : ""},
            onClick() {
                if (player.cb.highestLevel.gte(player.cb.XPBoostReq[1]))
                {
                    player.cb.XPBoost = player.cb.XPBoost.add(player.cb.XPBoostBase[1])
                    player.cb.XPBoostTimers[1] = player.cb.XPBoostTimersMax[1]

                    if (player.cb.highestLevel.gt(250))
                    {
                        let random = getRandomInt(4)
                        if (random == 1)
                        {
                            player.cb.paragonShards = player.cb.paragonShards.add(1);
                            callAlert("You gained a PARAGON SHARD! (25%)", "resources/paragonShard.png");
                        }
                    }
                    player.cb.level = new Decimal(1)
                    player.cb.xp = new Decimal(0)
                    player.cb.totalxp = new Decimal(5.1)
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPBoostButtonBase[1].mul(player.ca.canteEnergyMult))
            } else
                {
                    callAlert("You must be level " + formatWhole(player.cb.XPBoostReq[1]) + " to reset for this button.");
                }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        32: {
            title() { return player.cb.rarePetButtonTimers[5].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.rarePetButtonTimers[5]) + "." : "<h3>+" + format(player.cb.rarePetPointBase[5]) + " Pet Points."},
            canClick() { return player.cb.rarePetButtonTimers[5].lt(0) },
            tooltip() { return "2% chance for an paragon shard."},
            unlocked() { return player.cb.rarePetDisplayIndex == 5 || player.subtabs["cb"]["buttons"] == "Pet Points" && player.subtabs["cb"]["stuff"] == "Main" && player.cb.rarePetLevels[5].gte(1)},
            onClick() {
                player.cb.petPoints = player.cb.petPoints.add(player.cb.rarePetPointBase[5])
                player.cb.rarePetButtonTimers[5] = player.cb.rarePetButtonTimersMax[5]
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetPointButtonBase[5].mul(player.ca.canteEnergyMult))

                if (player.cb.highestLevel.gt(250))
                {
                    let random = getRandomInt(50)
                    if (random == 1)
                    {
                        player.cb.paragonShards = player.cb.paragonShards.add(1);
                        callAlert("You gained a PARAGON SHARD! (2%)", "resources/paragonShard.png");
                    }
                }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "0%" },
        },
        33: {
            title() { return player.cb.rarePetButtonTimers[6].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.rarePetButtonTimers[6]) + "." : "<h3>+" + format(player.cb.rarePetPointBase[6]) + " Pet Points."},
            canClick() { return player.cb.rarePetButtonTimers[6].lt(0) },
            tooltip() { return "+200% of golden grass value on claim.<br>(You have " + format(player.g.goldGrass) + " golden grass)"},
            unlocked() { return player.cb.rarePetDisplayIndex == 6 || player.subtabs["cb"]["buttons"] == "Pet Points" && player.subtabs["cb"]["stuff"] == "Main" && player.cb.rarePetLevels[6].gte(1)},
            onClick() {
                player.cb.petPoints = player.cb.petPoints.add(player.cb.rarePetPointBase[6])
                player.cb.rarePetButtonTimers[6] = player.cb.rarePetButtonTimersMax[6]
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetPointButtonBase[6].mul(player.ca.canteEnergyMult))

                player.g.goldGrass = player.g.goldGrass.add(player.g.goldGrassVal.mul(2))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "0%" },
        },
        34: {
            title() { return player.cb.petButtonTimers[4].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.petButtonTimers[4]) + "." : "<h3>Collect a random replicanti pet."},
            canClick() { return player.cb.petButtonTimers[4].lt(0) && player.cb.XPBoost.gt(1.2) },
            unlocked() { return player.cb.petButtonUnlocks[4] },
            tooltip() { return "COSTS 0.2 XPBOOST<br>25% - Replicator<br>25% - Smoke<br>15% - Infinity Breaker<br>15% - John<br>10% - Hex Shadow<br>10% - Grass Square"},
            onClick() {
                player.cb.petButtonTimers[4] = player.cb.petButtonTimersMax[4]
                layers.cb.petButton5();

                player.cb.XPBoost = player.cb.XPBoost.sub(0.2)
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetButtonBase[4].mul(player.ca.canteEnergyMult))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        35: {
            title() { return player.cb.petButtonTimers[5].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.petButtonTimers[5]) + "." : "<h3>Collect a random rare pet."},
            canClick() { return player.cb.petButtonTimers[5].lt(0) && player.cb.XPBoost.gt(3) },
            unlocked() { return player.cb.petButtonUnlocks[5] },
            tooltip() { return "COSTS 2 XPBOOST<br>10% - Nova<br>10% - Dice<br>10% - Drippy Ufo<br>10% - Goofy Ahh Thing<br>10% - Antimatter<br>10% - Hex Shadow<br>10% - Grass Square<br>30% - Epic Pet Fragment"},
            onClick() {
                player.cb.petButtonTimers[5] = player.cb.petButtonTimersMax[5]
                layers.cb.petButton6();

                player.cb.XPBoost = player.cb.XPBoost.sub(2)
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetButtonBase[5].mul(player.ca.canteEnergyMult))
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        //PETS
        101: {
            title() { return player.cb.commonPetAmounts[0].gt(0) || player.cb.commonPetLevels[0].gt(0) ? player.cb.commonPetImage[0] : player.cb.lockedImg},
            canClick() { return player.cb.commonPetAmounts[0].gt(0) || player.cb.commonPetLevels[0].gt(0) },
            unlocked() { return true },
            tooltip() { return player.cb.commonPetAmounts[0].gt(0) && !player.cb.viewingEvolved[3] || player.cb.commonPetLevels[0].gt(0)  && !player.cb.viewingEvolved[3]? "<h3>x" + format(player.cb.commonPetEffects[0][0]) + " to points.<br>x" + format(player.cb.commonPetEffects[0][1]) + " to check back xp." :  player.cb.viewingEvolved[3] ? "x" + format(player.cb.evolvedEffects[3][0]) + " to infinities.<br>x" + format(player.cb.evolvedEffects[3][1]) + " to broken infinities." : ""},
            onClick() {
                player.cb.petDisplayIndex = new Decimal(0)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124"},
        },
        102: {
            title() { return player.cb.commonPetAmounts[1].gt(0) || player.cb.commonPetLevels[1].gt(0) ? player.cb.commonPetImage[1] : player.cb.lockedImg},
            canClick() { return player.cb.commonPetAmounts[1].gt(0) || player.cb.commonPetLevels[1].gt(0)},
            tooltip() { return player.cb.commonPetAmounts[1].gt(0) || player.cb.commonPetLevels[1].gt(0) ? "<h3>x" + format(player.cb.commonPetEffects[1][0]) + " to prestige points.<br>x" + format(player.cb.commonPetEffects[1][1]) + " to tree gain.": ""},
            unlocked() { return true },
            onClick() {
                player.cb.petDisplayIndex = new Decimal(1)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
        },
        103: {
            title() { return player.cb.commonPetAmounts[2].gt(0) || player.cb.commonPetLevels[2].gt(0) ? player.cb.commonPetImage[2] : player.cb.lockedImg},
            canClick() { return player.cb.commonPetAmounts[2].gt(0) || player.cb.commonPetLevels[2].gt(0)},
            unlocked() { return true },
            tooltip() { return player.cb.commonPetAmounts[2].gt(0) && !player.cb.viewingEvolved[0] || player.cb.commonPetLevels[2].gt(0) && !player.cb.viewingEvolved[0] ? "<h3>x" + format(player.cb.commonPetEffects[2][0]) + " to factor power.<br>x" + format(player.cb.commonPetEffects[2][1]) + " to mod gain." : player.cb.viewingEvolved[0] ? "^" + format(player.cb.evolvedEffects[0][0]) + " to unsmith effect.<br>+" + format(player.cb.evolvedEffects[0][1]) + " base coin dust gain per hour." : ""},
            onClick() {
                player.cb.petDisplayIndex = new Decimal(2)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
        },
        104: {
            title() { return player.cb.commonPetAmounts[3].gt(0) || player.cb.commonPetLevels[3].gt(0)? player.cb.commonPetImage[3] : player.cb.lockedImg},
            canClick() { return player.cb.commonPetAmounts[3].gt(0) || player.cb.commonPetLevels[3].gt(0)},
            tooltip() { return player.cb.commonPetAmounts[3].gt(0) || player.cb.commonPetLevels[3].gt(0) ? "<h3>x" + format(player.cb.commonPetEffects[3][0]) + " to grass value.<br>x" + format(player.cb.commonPetEffects[3][1]) + " to golden grass value.": ""},
            unlocked() { return true },
            onClick() {
                player.cb.petDisplayIndex = new Decimal(3)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
        },
        105: {
            title() { return player.cb.commonPetAmounts[4].gt(0) || player.cb.commonPetLevels[4].gt(0)? player.cb.commonPetImage[4] : player.cb.lockedImg },
            canClick() { return player.cb.commonPetAmounts[4].gt(0) || player.cb.commonPetLevels[4].gt(0)},
            tooltip() { return player.cb.commonPetAmounts[4].gt(0) || player.cb.commonPetLevels[4].gt(0) ? "<h3>/" + format(player.cb.commonPetEffects[4][0]) + " to pet button cooldown.<br>/" + format(player.cb.commonPetEffects[4][1]) + " to xp button cooldown.": ""},
            unlocked() { return true },
            onClick() {
                player.cb.petDisplayIndex = new Decimal(4)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
        },
        106: {
            title() { return "Level Up"},
            canClick() { return player.cb.commonPetAmounts[0].gte(player.cb.commonPetReq[0]) },
            unlocked() { return player.cb.petDisplayIndex == 0  && player.cb.viewingEvolved[3] == false},
            onClick() {
                player.cb.commonPetAmounts[0] = player.cb.commonPetAmounts[0].sub(player.cb.commonPetReq[0])
                player.cb.commonPetLevels[0] = player.cb.commonPetLevels[0].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        107: {
            title() { return "Level Up"},
            canClick() { return player.cb.commonPetAmounts[1].gte(player.cb.commonPetReq[1]) },
            unlocked() { return player.cb.petDisplayIndex == 1 },
            onClick() {
                player.cb.commonPetAmounts[1] = player.cb.commonPetAmounts[1].sub(player.cb.commonPetReq[1])
                player.cb.commonPetLevels[1] = player.cb.commonPetLevels[1].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        108: {
            title() { return "Level Up"},
            canClick() { return player.cb.commonPetAmounts[2].gte(player.cb.commonPetReq[2]) },
            unlocked() { return player.cb.petDisplayIndex == 2 && player.cb.viewingEvolved[0] == false},
            onClick() {
                player.cb.commonPetAmounts[2] = player.cb.commonPetAmounts[2].sub(player.cb.commonPetReq[2])
                player.cb.commonPetLevels[2] = player.cb.commonPetLevels[2].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        109: {
            title() { return "Level Up"},
            canClick() { return player.cb.commonPetAmounts[3].gte(player.cb.commonPetReq[3]) },
            unlocked() { return player.cb.petDisplayIndex == 3 },
            onClick() {
                player.cb.commonPetAmounts[3] = player.cb.commonPetAmounts[3].sub(player.cb.commonPetReq[3])
                player.cb.commonPetLevels[3] = player.cb.commonPetLevels[3].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        111: {
            title() { return "Level Up"},
            canClick() { return player.cb.commonPetAmounts[4].gte(player.cb.commonPetReq[4]) },
            unlocked() { return player.cb.petDisplayIndex == 4 },
            tooltip() { return ""},
            onClick() {
                player.cb.commonPetAmounts[4] = player.cb.commonPetAmounts[4].sub(player.cb.commonPetReq[4])
                player.cb.commonPetLevels[4] = player.cb.commonPetLevels[4].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        112: {
            title() { return player.cb.uncommonPetAmounts[0].gt(0) || player.cb.uncommonPetLevels[0].gt(0) ? player.cb.uncommonPetImage[0] : player.cb.lockedImg},
            canClick() { return player.cb.uncommonPetAmounts[0].gt(0) || player.cb.uncommonPetLevels[0].gt(0) },
            unlocked() { return true },
            tooltip() { return player.cb.uncommonPetAmounts[0].gt(0) || player.cb.uncommonPetLevels[0].gt(0) ? "<h3>x" + format(player.cb.uncommonPetEffects[0][0]) + " to code experience.<br>x" + format(player.cb.uncommonPetEffects[0][1]) + " to grasshoppers.<br>x" + format(player.cb.uncommonPetEffects[0][2]) + " to fertilizer.": ""},
            onClick() {
                player.cb.uncommonPetDisplayIndex = new Decimal(0)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
        },
        113: {
            title() { return "Level Up"},
            canClick() { return player.cb.uncommonPetAmounts[0].gte(player.cb.uncommonPetReq[0]) },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 0 },
            onClick() {
                player.cb.uncommonPetAmounts[0] = player.cb.uncommonPetAmounts[0].sub(player.cb.uncommonPetReq[0])
                player.cb.uncommonPetLevels[0] = player.cb.uncommonPetLevels[0].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%", },
        },
        114: {
            title() { return player.cb.uncommonPetAmounts[1].gt(0) || player.cb.uncommonPetLevels[1].gt(0) ? player.cb.uncommonPetImage[1] : player.cb.lockedImg},
            canClick() { return player.cb.uncommonPetAmounts[1].gt(0) || player.cb.uncommonPetLevels[1].gt(0) },
            unlocked() { return true },
            tooltip() { return player.cb.uncommonPetAmounts[1].gt(0)  && !player.cb.viewingEvolved[4]|| player.cb.uncommonPetLevels[1].gt(0) && !player.cb.viewingEvolved[4] ? "<h3>x" + format(player.cb.uncommonPetEffects[1][0]) + " to lines of code.<br>x" + format(player.cb.uncommonPetEffects[1][1]) + " to leaves.<br>/" + format(player.cb.uncommonPetEffects[1][2]) + " to all check back button cooldowns." : player.cb.uncommonPetAmounts[1].gt(0) || player.cb.uncommonPetLevels[1].gt(0) ? "^" + format(player.cb.evolvedEffects[4][0]) + " to star effect.<br>x" + format(player.cb.evolvedEffects[4][1]) + " to rocket fuel." :"" },
            onClick() {
                player.cb.uncommonPetDisplayIndex = new Decimal(1)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
        },
        115: {
            title() { return player.cb.uncommonPetAmounts[2].gt(0) || player.cb.uncommonPetLevels[2].gt(0) ? player.cb.uncommonPetImage[2] : player.cb.lockedImg},
            canClick() { return player.cb.uncommonPetAmounts[2].gt(0) || player.cb.uncommonPetLevels[2].gt(0) },
            unlocked() { return true },
            tooltip() { return player.cb.uncommonPetAmounts[2].gt(0)  && !player.cb.viewingEvolved[2]|| player.cb.uncommonPetLevels[2].gt(0) && !player.cb.viewingEvolved[2]? "<h3>/" + format(player.cb.uncommonPetEffects[2][0]) + " to tree requirement.<br>/" + format(player.cb.uncommonPetEffects[2][1]) + " to mod requirement.<br>/" + format(player.cb.uncommonPetEffects[2][2]) + " to check back xp requirement.":  player.cb.uncommonPetAmounts[2].gt(0) || player.cb.uncommonPetLevels[2].gt(0) ? "/" + format(player.cb.evolvedEffects[2][0]) + " to rare pet cooldown.<br>x" + format(player.cb.evolvedEffects[2][1]) + " to XPBoost." :""},
            onClick() {
                player.cb.uncommonPetDisplayIndex = new Decimal(2)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
        },
        116: {
            title() { return player.cb.uncommonPetAmounts[3].gt(0) || player.cb.uncommonPetLevels[3].gt(0) ? player.cb.uncommonPetImage[3] : player.cb.lockedImg},
            canClick() { return player.cb.uncommonPetAmounts[3].gt(0) || player.cb.uncommonPetLevels[3].gt(0) },
            unlocked() { return true },
            tooltip() { return player.cb.uncommonPetAmounts[3].gt(0)  && !player.cb.viewingEvolved[1] || player.cb.uncommonPetLevels[3].gt(0) && !player.cb.viewingEvolved[1] ? "<h3>/" + format(player.cb.uncommonPetEffects[3][0]) + " to rank requirement.<br>/" + format(player.cb.uncommonPetEffects[3][1]) + " to tier requirement.<br>/" + format(player.cb.uncommonPetEffects[3][2]) + " to tetr requirement." : player.cb.uncommonPetAmounts[3].gt(0) || player.cb.uncommonPetLevels[3].gt(0) ? "^" + format(player.cb.evolvedEffects[1][0]) + " to shark effect.<br>x" + format(player.cb.evolvedEffects[1][1]) + " to pet points." : "" },
            onClick() {
                player.cb.uncommonPetDisplayIndex = new Decimal(3)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
        },
        117: {
            title() { return player.cb.uncommonPetAmounts[4].gt(0) || player.cb.uncommonPetLevels[4].gt(0) ? player.cb.uncommonPetImage[4] : player.cb.lockedImg},
            canClick() { return player.cb.uncommonPetAmounts[4].gt(0) || player.cb.uncommonPetLevels[4].gt(0) },
            unlocked() { return true },
            tooltip() { return player.cb.uncommonPetAmounts[4].gt(0) || player.cb.uncommonPetLevels[4].gt(0) ? "<h3>x" + format(player.cb.uncommonPetEffects[4][0]) + " to check back xp" : ""},
            onClick() {
                player.cb.uncommonPetDisplayIndex = new Decimal(4)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
        },
        118: {
            title() { return "Level Up"},
            canClick() { return player.cb.uncommonPetAmounts[1].gte(player.cb.uncommonPetReq[1]) },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 1  && player.cb.viewingEvolved[4] == false},
            onClick() {
                player.cb.uncommonPetAmounts[1] = player.cb.uncommonPetAmounts[1].sub(player.cb.uncommonPetReq[1])
                player.cb.uncommonPetLevels[1] = player.cb.uncommonPetLevels[1].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        119: {
            title() { return "Level Up"},
            canClick() { return player.cb.uncommonPetAmounts[2].gte(player.cb.uncommonPetReq[2]) },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 2 && player.cb.viewingEvolved[2] == false},
            onClick() {
                player.cb.uncommonPetAmounts[2] = player.cb.uncommonPetAmounts[2].sub(player.cb.uncommonPetReq[2])
                player.cb.uncommonPetLevels[2] = player.cb.uncommonPetLevels[2].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        121: {
            title() { return "Level Up"},
            canClick() { return player.cb.uncommonPetAmounts[3].gte(player.cb.uncommonPetReq[3]) },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 3 && player.cb.viewingEvolved[1] == false},
            onClick() {
                player.cb.uncommonPetAmounts[3] = player.cb.uncommonPetAmounts[3].sub(player.cb.uncommonPetReq[3])
                player.cb.uncommonPetLevels[3] = player.cb.uncommonPetLevels[3].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        122: {
            title() { return "Level Up"},
            canClick() { return player.cb.uncommonPetAmounts[4].gte(player.cb.uncommonPetReq[4]) },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 4 },
            onClick() {
                player.cb.uncommonPetAmounts[4] = player.cb.uncommonPetAmounts[4].sub(player.cb.uncommonPetReq[4])
                player.cb.uncommonPetLevels[4] = player.cb.uncommonPetLevels[4].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        123: {
            title() { return player.cb.rarePetAmounts[0].gt(0) || player.cb.rarePetLevels[0].gt(0) ? player.cb.rarePetImage[0] : player.cb.lockedImg},
            canClick() { return player.cb.rarePetAmounts[0].gt(0) || player.cb.rarePetLevels[0].gt(0) },
            unlocked() { return true },
            tooltip() { return player.cb.rarePetAmounts[0].gt(0) || player.cb.rarePetLevels[0].gt(0) ? "<h3>x" + format(player.cb.rarePetEffects[0][0]) + " to fertilizer (based on grass).<br>x" + format(player.cb.rarePetEffects[0][1]) + " to check back xp (based on check back level)": ""},
            onClick() {
                player.cb.rarePetDisplayIndex = new Decimal(0)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
        },
        124: {
            title() { return "Level Up"},
            canClick() { return player.cb.rarePetAmounts[0].gte(player.cb.rarePetReq[0]) },
            unlocked() { return player.cb.rarePetDisplayIndex == 0 },
            onClick() {
                player.cb.rarePetAmounts[0] = player.cb.rarePetAmounts[0].sub(player.cb.rarePetReq[0])
                player.cb.rarePetLevels[0] = player.cb.rarePetLevels[0].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        125: {
            title() { return "Open Shop"},
            canClick() { return true },
            unlocked() { return player.cb.rarePetDisplayIndex >= 0 },
            onClick() {
                player.tab = "ps"
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        126: {
            title() { return player.cb.rarePetAmounts[1].gt(0) || player.cb.rarePetLevels[1].gt(0) ? player.cb.rarePetImage[1] : player.cb.lockedImg},
            canClick() { return player.cb.rarePetAmounts[1].gt(0) || player.cb.rarePetLevels[1].gt(0) },
            unlocked() { return true },
            tooltip() { return player.cb.rarePetAmounts[1].gt(0)  && !player.cb.viewingEvolved[5] || player.cb.rarePetLevels[1].gt(0)  && !player.cb.viewingEvolved[5] ? "<h3>x" + format(player.cb.rarePetEffects[1][0]) + " to dice points (based on highest combo).<br>x" + format(player.cb.rarePetEffects[1][1]) + " to mods (based on dice points).": player.cb.viewingEvolved[5] ? "^" + format(player.cb.evolvedEffects[5][0]) + " to dice effect.<br>x" + format(player.cb.evolvedEffects[5][1]) + " to challenge dice points." : ""},
            onClick() {
                player.cb.rarePetDisplayIndex = new Decimal(1)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
        },
        127: {
            title() { return "Level Up"},
            canClick() { return player.cb.rarePetAmounts[1].gte(player.cb.rarePetReq[1]) },
            unlocked() { return player.cb.rarePetDisplayIndex == 1  && player.cb.viewingEvolved[5] == false},
            onClick() {
                player.cb.rarePetAmounts[1] = player.cb.rarePetAmounts[1].sub(player.cb.rarePetReq[1])
                player.cb.rarePetLevels[1] = player.cb.rarePetLevels[1].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        128: {
            title() { return player.cb.rarePetAmounts[2].gt(0) || player.cb.rarePetLevels[2].gt(0) ? player.cb.rarePetImage[2] : player.cb.lockedImg},
            canClick() { return player.cb.rarePetAmounts[2].gt(0) || player.cb.rarePetLevels[2].gt(0) },
            unlocked() { return true },
            tooltip() { return player.cb.rarePetAmounts[2].gt(0) && !player.cb.viewingEvolved[7] || player.cb.rarePetLevels[2].gt(0) && !player.cb.viewingEvolved[7]  ? "<h3>x" + format(player.cb.rarePetEffects[2][0]) + " to rocket fuel (based on pet points).<br>/" + format(player.cb.rarePetEffects[2][1]) + " to golden grass spawn time." : player.cb.viewingEvolved[7] ? "<h3>+" + format(player.cb.evolvedEffects[7][0]) + " max moontstone.<br>x" + format(player.cb.evolvedEffects[7][1]) + " to golden grass." : ""},
            onClick() {
                player.cb.rarePetDisplayIndex = new Decimal(2)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
        },
        129: {
            title() { return "Level Up"},
            canClick() { return player.cb.rarePetAmounts[2].gte(player.cb.rarePetReq[2]) },
            unlocked() { return player.cb.rarePetDisplayIndex == 2 && player.cb.viewingEvolved[7] == false},
            onClick() {
                player.cb.rarePetAmounts[2] = player.cb.rarePetAmounts[2].sub(player.cb.rarePetReq[2])
                player.cb.rarePetLevels[2] = player.cb.rarePetLevels[2].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        131: {
            title() { return player.cb.rarePetAmounts[3].gt(0) || player.cb.rarePetLevels[3].gt(0) ? player.cb.rarePetImage[3] : player.cb.lockedImg},
            canClick() { return player.cb.rarePetAmounts[3].gt(0) || player.cb.rarePetLevels[3].gt(0) },
            unlocked() { return true },
            tooltip() { return player.cb.rarePetAmounts[3].gt(0) || player.cb.rarePetLevels[3].gt(0) ? "<h3>x" + format(player.cb.rarePetEffects[3][0]) + " to grasshoppers (based on evo shards).<br>/" + format(player.cb.rarePetEffects[3][1]) + " to check back xp requirement.": ""},
            onClick() {
                player.cb.rarePetDisplayIndex = new Decimal(3)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
        },
        132: {
            title() { return "Level Up"},
            canClick() { return player.cb.rarePetAmounts[3].gte(player.cb.rarePetReq[3]) },
            unlocked() { return player.cb.rarePetDisplayIndex == 3 },
            onClick() {
                player.cb.rarePetAmounts[3] = player.cb.rarePetAmounts[3].sub(player.cb.rarePetReq[3])
                player.cb.rarePetLevels[3] = player.cb.rarePetLevels[3].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        133: {
            title() { return player.cb.commonPetAmounts[5].gt(0) || player.cb.commonPetLevels[5].gt(0)? player.cb.commonPetImage[5] : player.cb.lockedImg},
            canClick() { return player.cb.commonPetAmounts[5].gt(0) || player.cb.commonPetLevels[5].gt(0)},
            tooltip() { return player.cb.commonPetAmounts[5].gt(0)&& !player.cb.viewingEvolved[6] || player.cb.commonPetLevels[5].gt(0)&& !player.cb.viewingEvolved[6] ? "<h3>x" + format(player.cb.commonPetEffects[5][0]) + " to antimatter.<br>x" + format(player.cb.commonPetEffects[5][1]) + " to 7th dimensions." : player.cb.viewingEvolved[6] ? "<h3>x" + format(player.cb.evolvedEffects[6][0]) + " to steel.<br>x" + format(player.cb.evolvedEffects[6][1]) + " to crystals." : ""},
            unlocked() { return true },
            onClick() {
                player.cb.petDisplayIndex = new Decimal(5)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
        },
        134: {
            title() { return player.cb.commonPetAmounts[6].gt(0) || player.cb.commonPetLevels[6].gt(0)? player.cb.commonPetImage[6] : player.cb.lockedImg },
            canClick() { return player.cb.commonPetAmounts[6].gt(0) || player.cb.commonPetLevels[6].gt(0)},
            tooltip() { return player.cb.commonPetAmounts[6].gt(0)|| player.cb.commonPetLevels[6].gt(0) ? "<h3>x" + format(player.cb.commonPetEffects[6][0]) + " to XPBoost." : ""},
            unlocked() { return true },
            onClick() {
                player.cb.petDisplayIndex = new Decimal(6)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
        },
        135: {
            title() { return "Level Up"},
            canClick() { return player.cb.commonPetAmounts[5].gte(player.cb.commonPetReq[5]) },
            unlocked() { return player.cb.petDisplayIndex == 5 && player.cb.viewingEvolved[6] == false},
            onClick() {
                player.cb.commonPetAmounts[5] = player.cb.commonPetAmounts[5].sub(player.cb.commonPetReq[5])
                player.cb.commonPetLevels[5] = player.cb.commonPetLevels[5].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        136: {
            title() { return "Level Up"},
            canClick() { return player.cb.commonPetAmounts[6].gte(player.cb.commonPetReq[6]) },
            unlocked() { return player.cb.petDisplayIndex == 6 },
            onClick() {
                player.cb.commonPetAmounts[6] = player.cb.commonPetAmounts[6].sub(player.cb.commonPetReq[6])
                player.cb.commonPetLevels[6] = player.cb.commonPetLevels[6].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        137: {
            title() { return player.cb.uncommonPetAmounts[5].gt(0) || player.cb.uncommonPetLevels[5].gt(0)? player.cb.uncommonPetImage[5] : player.cb.lockedImg},
            canClick() { return player.cb.uncommonPetAmounts[5].gt(0) || player.cb.uncommonPetLevels[5].gt(0)},
            tooltip() { return player.cb.uncommonPetAmounts[5].gt(0) && !player.cb.viewingEvolved[8] || player.cb.uncommonPetLevels[5].gt(0) && !player.cb.viewingEvolved[8] ? "<h3>x" + format(player.cb.uncommonPetEffects[5][0]) + " to 1st dimensions.<br>x" + format(player.cb.uncommonPetEffects[5][1]) + " to 3rd dimensions.<br>x" + format(player.cb.uncommonPetEffects[5][2]) + " to 5th dimensions." : player.cb.viewingEvolved[6] ? "<h3>x" + format(player.cb.evolvedEffects[8][0]) + " to anonymity.<br>x" + format(player.cb.evolvedEffects[8][1]) + " to oil."  : ""} ,
            unlocked() { return true },
            onClick() {
                player.cb.uncommonPetDisplayIndex = new Decimal(5)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
        },
        138: {
            title() { return player.cb.uncommonPetAmounts[6].gt(0) || player.cb.uncommonPetLevels[6].gt(0)? player.cb.uncommonPetImage[6] : player.cb.lockedImg},
            canClick() { return player.cb.uncommonPetAmounts[6].gt(0) || player.cb.uncommonPetLevels[6].gt(0)},
            tooltip() { return player.cb.uncommonPetAmounts[6].gt(0) || player.cb.uncommonPetLevels[6].gt(0) ? "<h3>x" + format(player.cb.uncommonPetEffects[6][0]) + " to 2nd dimensions.<br>x" + format(player.cb.uncommonPetEffects[6][1]) + " to 4th dimensions.<br>x" + format(player.cb.uncommonPetEffects[6][2]) + " to 6th dimensions.": ""},
            unlocked() { return true },
            onClick() {
                player.cb.uncommonPetDisplayIndex = new Decimal(6)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
        },
        139: {
            title() { return "Level Up"},
            canClick() { return player.cb.uncommonPetAmounts[5].gte(player.cb.uncommonPetReq[5]) },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 5 && !player.cb.viewingEvolved[8]},
            onClick() {
                player.cb.uncommonPetAmounts[5] = player.cb.uncommonPetAmounts[5].sub(player.cb.uncommonPetReq[5])
                player.cb.uncommonPetLevels[5] = player.cb.uncommonPetLevels[5].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        141: {
            title() { return "Level Up"},
            canClick() { return player.cb.uncommonPetAmounts[6].gte(player.cb.uncommonPetReq[6]) },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 6},
            onClick() {
                player.cb.uncommonPetAmounts[6] = player.cb.uncommonPetAmounts[6].sub(player.cb.uncommonPetReq[6])
                player.cb.uncommonPetLevels[6] = player.cb.uncommonPetLevels[6].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
    142: {
        title() { return player.cb.rarePetAmounts[4].gt(0) || player.cb.rarePetLevels[4].gt(0) ? player.cb.rarePetImage[4] : player.cb.lockedImg},
        canClick() { return player.cb.rarePetAmounts[4].gt(0) || player.cb.rarePetLevels[4].gt(0) },
        unlocked() { return true },
        tooltip() { return player.cb.rarePetAmounts[4].gt(0) || player.cb.rarePetLevels[4].gt(0) ? "<h3>x" + format(player.cb.rarePetEffects[4][0]) + " to antimatter dimensions (based on infinities).<br>x" + format(player.cb.rarePetEffects[4][1]) + " to golden grass.": ""},
        onClick() {
            player.cb.rarePetDisplayIndex = new Decimal(4)
        },
        style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
    },
    143: {
        title() { return "Level Up"},
        canClick() { return player.cb.rarePetAmounts[4].gte(player.cb.rarePetReq[4]) },
        unlocked() { return player.cb.rarePetDisplayIndex == 4 },
        onClick() {
            player.cb.rarePetAmounts[4] = player.cb.rarePetAmounts[4].sub(player.cb.rarePetReq[4])
            player.cb.rarePetLevels[4] = player.cb.rarePetLevels[4].add(1)
        },
        style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
    },
    144: {
        title() { return player.cb.commonPetAmounts[7].gt(0) || player.cb.commonPetLevels[7].gt(0) ? player.cb.commonPetImage[7] : player.cb.lockedImg},
        canClick() { return player.cb.commonPetAmounts[7].gt(0) || player.cb.commonPetLevels[7].gt(0) },
        unlocked() { return true },
        tooltip() { return player.cb.commonPetAmounts[7].gt(0) || player.cb.commonPetLevels[7].gt(0) ? "<h3>x" + format(player.cb.commonPetEffects[7][0]) + " to replicanti mult.<br>x" + format(player.cb.commonPetEffects[7][1]) + " to galaxy dust.": ""},
        onClick() {
            player.cb.petDisplayIndex = new Decimal(7)
        },
        style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
    },
    145: {
        title() { return "Level Up"},
        canClick() { return player.cb.commonPetAmounts[7].gte(player.cb.commonPetReq[7]) },
        unlocked() { return player.cb.petDisplayIndex == 7 },
        onClick() {
            player.cb.commonPetAmounts[7] = player.cb.commonPetAmounts[7].sub(player.cb.commonPetReq[7])
            player.cb.commonPetLevels[7] = player.cb.commonPetLevels[7].add(1)
        },
        style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
    },
    146: {
        title() { return player.cb.commonPetAmounts[8].gt(0) || player.cb.commonPetLevels[8].gt(0) ? player.cb.commonPetImage[8] : player.cb.lockedImg},
        canClick() { return player.cb.commonPetAmounts[8].gt(0) || player.cb.commonPetLevels[8].gt(0) },
        unlocked() { return true },
        tooltip() { return player.cb.commonPetAmounts[8].gt(0) || player.cb.commonPetLevels[8].gt(0) ? "<h3>x" + format(player.cb.commonPetEffects[8][0]) + " to all mastery points.<br>x" + format(player.cb.commonPetEffects[8][1]) + " to all hex points.": ""},
        onClick() {
            player.cb.petDisplayIndex = new Decimal(8)
        },
        style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
    },
    147: {
        title() { return "Level Up"},
        canClick() { return player.cb.commonPetAmounts[8].gte(player.cb.commonPetReq[8]) },
        unlocked() { return player.cb.petDisplayIndex == 8 },
        onClick() {
            player.cb.commonPetAmounts[8] = player.cb.commonPetAmounts[8].sub(player.cb.commonPetReq[8])
            player.cb.commonPetLevels[8] = player.cb.commonPetLevels[8].add(1)
        },
        style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
    },
    148: {
        title() { return player.cb.uncommonPetAmounts[7].gt(0) || player.cb.uncommonPetLevels[7].gt(0) ? player.cb.uncommonPetImage[7] : player.cb.lockedImg},
        canClick() { return player.cb.uncommonPetAmounts[7].gt(0) || player.cb.uncommonPetLevels[7].gt(0) },
        unlocked() { return true },
        tooltip() { return player.cb.uncommonPetAmounts[7].gt(0) || player.cb.uncommonPetLevels[7].gt(0) ? "<h3>x" + format(player.cb.uncommonPetEffects[7][0]) + " to infinity dimensions.<br>x" + format(player.cb.uncommonPetEffects[7][1]) + " to negative infinity points.<br>x" + format(player.cb.uncommonPetEffects[7][2]) + " to broken infinities.": ""},
        onClick() {
            player.cb.uncommonPetDisplayIndex = new Decimal(7)
        },
        style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
    },
    149: {
        title() { return "Level Up"},
        canClick() { return player.cb.uncommonPetAmounts[7].gte(player.cb.uncommonPetReq[7]) },
        unlocked() { return player.cb.uncommonPetDisplayIndex == 7 },
        onClick() {
            player.cb.uncommonPetAmounts[7] = player.cb.uncommonPetAmounts[7].sub(player.cb.uncommonPetReq[7])
            player.cb.uncommonPetLevels[7] = player.cb.uncommonPetLevels[7].add(1)
        },
        style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
    },
    151: {
        title() { return player.cb.uncommonPetAmounts[8].gt(0) || player.cb.uncommonPetLevels[8].gt(0) ? player.cb.uncommonPetImage[8] : player.cb.lockedImg},
        canClick() { return player.cb.uncommonPetAmounts[8].gt(0) || player.cb.uncommonPetLevels[8].gt(0) },
        unlocked() { return true },
        tooltip() { return player.cb.uncommonPetAmounts[8].gt(0) || player.cb.uncommonPetLevels[8].gt(0) ? "<h3>x" + format(player.cb.uncommonPetEffects[8][0]) + " to dimension power.<br>x" + format(player.cb.uncommonPetEffects[8][1]) + " to alternate broken infinities.<br>x" + format(player.cb.uncommonPetEffects[8][2]) + " to time cubes.": ""},
        onClick() {
            player.cb.uncommonPetDisplayIndex = new Decimal(8)
        },
        style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
    },
    152: {
        title() { return "Level Up"},
        canClick() { return player.cb.uncommonPetAmounts[8].gte(player.cb.uncommonPetReq[8]) },
        unlocked() { return player.cb.uncommonPetDisplayIndex == 8 },
        onClick() {
            player.cb.uncommonPetAmounts[8] = player.cb.uncommonPetAmounts[8].sub(player.cb.uncommonPetReq[8])
            player.cb.uncommonPetLevels[8] = player.cb.uncommonPetLevels[8].add(1)
        },
        style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
    },
    153: {
        title() { return player.cb.rarePetAmounts[5].gt(0) || player.cb.rarePetLevels[5].gt(0) ? player.cb.rarePetImage[5] : player.cb.lockedImg},
        canClick() { return player.cb.rarePetAmounts[5].gt(0) || player.cb.rarePetLevels[5].gt(0) },
        unlocked() { return true },
        tooltip() { return player.cb.rarePetAmounts[5].gt(0) || player.cb.rarePetLevels[5].gt(0) ? "<h3>x" + format(player.cb.rarePetEffects[5][0]) + " to steel (based on rage power).<br>x" + format(player.cb.rarePetEffects[5][1]) + " to crystals (based on rage power).": ""},
        onClick() {
            player.cb.rarePetDisplayIndex = new Decimal(5)
        },
        style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
    },
    154: {
        title() { return "Level Up"},
        canClick() { return player.cb.rarePetAmounts[5].gte(player.cb.rarePetReq[5]) },
        unlocked() { return player.cb.rarePetDisplayIndex == 5 },
        onClick() {
            player.cb.rarePetAmounts[5] = player.cb.rarePetAmounts[5].sub(player.cb.rarePetReq[5])
            player.cb.rarePetLevels[5] = player.cb.rarePetLevels[5].add(1)
        },
        style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
    },
    155: {
        title() { return player.cb.rarePetAmounts[6].gt(0) || player.cb.rarePetLevels[6].gt(0) ? player.cb.rarePetImage[6] : player.cb.lockedImg},
        canClick() { return player.cb.rarePetAmounts[6].gt(0) || player.cb.rarePetLevels[6].gt(0) },
        unlocked() { return true },
        tooltip() { return player.cb.rarePetAmounts[6].gt(0) || player.cb.rarePetLevels[6].gt(0) ? "<h3>x" + format(player.cb.rarePetEffects[6][0]) + " to blank mods (based on golden grass).<br>x" + format(player.cb.rarePetEffects[6][1]) + " to rage power (based on golden grass).": ""},
        onClick() {
            player.cb.rarePetDisplayIndex = new Decimal(6)
        },
        style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
    },
    156: {
        title() { return "Level Up"},
        canClick() { return player.cb.rarePetAmounts[6].gte(player.cb.rarePetReq[6]) },
        unlocked() { return player.cb.rarePetDisplayIndex == 6 },
        onClick() {
            player.cb.rarePetAmounts[6] = player.cb.rarePetAmounts[6].sub(player.cb.rarePetReq[6])
            player.cb.rarePetLevels[6] = player.cb.rarePetLevels[6].add(1)
        },
        style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
    },
    157: {
        title() { return player.cb.epicPetLevels[0].gt(0) ? player.cb.epicPetImage[0] : player.cb.lockedImg},
        canClick() { return player.cb.epicPetFragments[0].gt(0) || player.cb.epicPetLevels[0].gt(0) },
        unlocked() { return true },
        tooltip() { return player.cb.epicPetFragments[0].gt(0) || player.cb.epicPetLevels[0].gt(0) ? "<h4>x" + format(player.cb.epicPetEffects[0][0]) + " to pet points (based on xp boost).<br>/" + format(player.cb.epicPetEffects[0][1]) + " to pet point button cooldown (based on evo shards).<br>/" + format(player.cb.epicPetEffects[0][2]) + " to XPBoost button cooldown (based on paragon shards).": ""}, //Pet points based on xp boost, pet point button cooldown based on evo shards, xp boost cooldown based on paragon shards
        onClick() {
            player.cb.epicPetDisplayIndex = new Decimal(0)
        },
        style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
    },
    158: {
        title() { return "Level Up"},
        canClick() { return player.cb.epicPetFragments[0].gte(player.cb.epicPetFragmentReq[0]) },
        unlocked() { return player.cb.epicPetDisplayIndex == 0 },
        onClick() {
            player.cb.epicPetFragments[0] = player.cb.epicPetFragments[0].sub(player.cb.epicPetFragmentReq[0])
            player.cb.epicPetLevels[0] = player.cb.epicPetLevels[0].add(1)
        },
        style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
    },
    159: {
        title() { return player.cb.epicPetLevels[1].gt(0) ? player.cb.epicPetImage[1] : player.cb.lockedImg},
        canClick() { return player.cb.epicPetFragments[1].gt(0) || player.cb.epicPetLevels[1].gt(0) },
        unlocked() { return true },
        tooltip() { return player.cb.epicPetFragments[1].gt(0) || player.cb.epicPetLevels[1].gt(0) ? "<h4>x" + format(player.cb.epicPetEffects[1][0]) + " to the replicanti point mult (based on grass-skip).<br>x" + format(player.cb.epicPetEffects[1][1]) + " to anonymity (based on galaxy dust).<br>x" + format(player.cb.epicPetEffects[1][2]) + " to the repli-leaf mult (based on repli-trees).": ""}, //replicanti point mult based on grassskip, anonymity based on galaxy dust, repli-leaves based on repli-trees
        onClick() {
            player.cb.epicPetDisplayIndex = new Decimal(1)
        },
        style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
    },
    161: {
        title() { return "Level Up"},
        canClick() { return player.cb.epicPetFragments[1].gte(player.cb.epicPetFragmentReq[1]) },
        unlocked() { return player.cb.epicPetDisplayIndex == 1 },
        onClick() {
            player.cb.epicPetFragments[1] = player.cb.epicPetFragments[1].sub(player.cb.epicPetFragmentReq[1])
            player.cb.epicPetLevels[1] = player.cb.epicPetLevels[1].add(1)
        },
        style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
    },
    162: {
        title() { return player.cb.epicPetLevels[2].gt(0) ? player.cb.epicPetImage[2] : player.cb.lockedImg},
        canClick() { return player.cb.epicPetFragments[2].gt(0) || player.cb.epicPetLevels[2].gt(0) },
        unlocked() { return true },
        tooltip() { return player.cb.epicPetFragments[2].gt(0) || player.cb.epicPetLevels[2].gt(0) ? "<h4>x" + format(player.cb.epicPetEffects[2][0]) + " to cante energy (based on cante cores).<br>x" + format(player.cb.epicPetEffects[2][1]) + " to infinity points (based on cante cores).<br>x" + format(player.cb.epicPetEffects[2][2]) + " to proto memories (based on XPBoost).": ""}, //cante energy based on cante cores, infinity points based on cante cores, proto memories based on xpboost
        onClick() {
            player.cb.epicPetDisplayIndex = new Decimal(2)
        },
        style: { width: '100px', "min-height": '100px', 'border-radius': "0%", 'background-color': "#021124" },
    },
    163: {
        title() { return "Level Up"},
        canClick() { return player.cb.epicPetFragments[2].gte(player.cb.epicPetFragmentReq[2]) },
        unlocked() { return player.cb.epicPetDisplayIndex == 2 },
        onClick() {
            player.cb.epicPetFragments[2] = player.cb.epicPetFragments[2].sub(player.cb.epicPetFragmentReq[2])
            player.cb.epicPetLevels[2] = player.cb.epicPetLevels[2].add(1)
        },
        style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
    },
    164: {
        title() { return "View Shop"},
        canClick() { return player.cb.epicPetLevels[0].gte(1) },
        unlocked() { return player.cb.epicPetDisplayIndex == 0 },
        onClick() {
            player.tab = "ep0"
        },
        style: { width: '100px', "min-height": '50px', 'border-radius': "0%",  'background-color': "#cb79ed" },
    },
    165: {
        title() { return "View Shop"},
        canClick() { return player.cb.epicPetLevels[1].gte(1) },
        unlocked() { return player.cb.epicPetDisplayIndex == 1 },
        onClick() {
            player.tab = "ep1"
        },
        style: { width: '100px', "min-height": '50px', 'border-radius': "0%",  'background-color': "#cb79ed" },
    },
    166: {
        title() { return "View Shop"},
        canClick() { return player.cb.epicPetLevels[2].gte(1) },
        unlocked() { return player.cb.epicPetDisplayIndex == 2 },
        onClick() {
            player.tab = "ep2"
        },
        style: { width: '100px', "min-height": '50px', 'border-radius': "0%",  'background-color': "#cb79ed" },
    },
        //evo
        201: {
            title() { return "View Evolved"},
            canClick() { return true },
            unlocked() { return player.cb.petDisplayIndex == 2 && player.ev.evolutionsUnlocked[0] == true && player.cb.viewingEvolved[0] == false},
            onClick() {
                player.cb.viewingEvolved[0] = true
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        202: {
            title() { return "View Normal"},
            canClick() { return true },
            unlocked() { return player.cb.petDisplayIndex == 2 && player.ev.evolutionsUnlocked[0] == true && player.cb.viewingEvolved[0] == true},
            onClick() {
                player.cb.viewingEvolved[0] = false
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        203: {
            title() { return "Level Up"},
            canClick() { return player.cb.evolutionShards.gte(player.cb.evolvedReq[0]) },
            unlocked() { return player.cb.petDisplayIndex == 2 && player.cb.viewingEvolved[0] == true},
            onClick() {
                player.cb.evolutionShards = player.cb.evolutionShards.sub(player.cb.evolvedReq[0])
                player.cb.evolvedLevels[0] = player.cb.evolvedLevels[0].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        204: {
            title() { return "Special Feature"},
            canClick() { return true },
            unlocked() { return player.cb.petDisplayIndex == 2 && player.ev.evolutionsUnlocked[0] == true && player.cb.viewingEvolved[0] == true},
            onClick() {
                player.tab = "ev0"
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        205: {
            title() { return "View Evolved"},
            canClick() { return true },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 3 && player.ev.evolutionsUnlocked[1] == true && player.cb.viewingEvolved[1] == false},
            onClick() {
                player.cb.viewingEvolved[1] = true
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        206: {
            title() { return "View Normal"},
            canClick() { return true },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 3 && player.ev.evolutionsUnlocked[1] == true && player.cb.viewingEvolved[1] == true},
            onClick() {
                player.cb.viewingEvolved[1] = false
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        207: {
            title() { return "Level Up"},
            canClick() { return player.cb.evolutionShards.gte(player.cb.evolvedReq[1]) },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 3 && player.cb.viewingEvolved[1] == true},
            onClick() {
                player.cb.evolutionShards = player.cb.evolutionShards.sub(player.cb.evolvedReq[1])
                player.cb.evolvedLevels[1] = player.cb.evolvedLevels[1].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        208: {
            title() { return "Special Feature"},
            canClick() { return true },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 3 && player.ev.evolutionsUnlocked[1] == true && player.cb.viewingEvolved[1] == true},
            onClick() {
                player.tab = "ev1"
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        209: {
            title() { return "View Evolved"},
            canClick() { return true },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 2 && player.ev.evolutionsUnlocked[2] == true && player.cb.viewingEvolved[2] == false},
            onClick() {
                player.cb.viewingEvolved[2] = true
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        211: {
            title() { return "View Normal"},
            canClick() { return true },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 2 && player.ev.evolutionsUnlocked[2] == true && player.cb.viewingEvolved[2] == true},
            onClick() {
                player.cb.viewingEvolved[2] = false
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        212: {
            title() { return "Level Up"},
            canClick() { return player.cb.evolutionShards.gte(player.cb.evolvedReq[2]) },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 2 && player.cb.viewingEvolved[2] == true},
            onClick() {
                player.cb.evolutionShards = player.cb.evolutionShards.sub(player.cb.evolvedReq[2])
                player.cb.evolvedLevels[2] = player.cb.evolvedLevels[2].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        213: {
            title() { return "Special Feature"},
            canClick() { return true },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 2 && player.ev.evolutionsUnlocked[2] == true && player.cb.viewingEvolved[2] == true},
            onClick() {
                player.tab = "ev2"
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        214: {
            title() { return "View Evolved"},
            canClick() { return true },
            unlocked() { return player.cb.petDisplayIndex == 0 && player.ev.evolutionsUnlocked[3] == true && player.cb.viewingEvolved[3] == false},
            onClick() {
                player.cb.viewingEvolved[3] = true
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        215: {
            title() { return "View Normal"},
            canClick() { return true },
            unlocked() { return player.cb.petDisplayIndex == 0 && player.ev.evolutionsUnlocked[3] == true && player.cb.viewingEvolved[3] == true},
            onClick() {
                player.cb.viewingEvolved[3] = false
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        216: {
            title() { return "Level Up"},
            canClick() { return player.cb.evolutionShards.gte(player.cb.evolvedReq[3]) },
            unlocked() { return player.cb.petDisplayIndex == 0 && player.cb.viewingEvolved[3] == true},
            onClick() {
                player.cb.evolutionShards = player.cb.evolutionShards.sub(player.cb.evolvedReq[3])
                player.cb.evolvedLevels[3] = player.cb.evolvedLevels[3].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        217: {
            title() { return "Special Feature"},
            canClick() { return true },
            unlocked() { return player.cb.petDisplayIndex == 0 && player.ev.evolutionsUnlocked[3] == true && player.cb.viewingEvolved[3] == true},
            onClick() {
                player.tab = 'ad'
                player.subtabs["ad"]['stuff'] = 'Reverse Break'
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        218: {
            title() { return "View Evolved"},
            canClick() { return true },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 1 && player.ev.evolutionsUnlocked[4] == true && player.cb.viewingEvolved[4] == false},
            onClick() {
                player.cb.viewingEvolved[4] = true
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        219: {
            title() { return "View Normal"},
            canClick() { return true },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 1 && player.ev.evolutionsUnlocked[4] == true && player.cb.viewingEvolved[4] == true},
            onClick() {
                player.cb.viewingEvolved[4] = false
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        221: {
            title() { return "Level Up"},
            canClick() { return player.cb.paragonShards.gte(player.cb.evolvedReq[4]) },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 1 && player.cb.viewingEvolved[4] == true},
            onClick() {
                player.cb.paragonShards = player.cb.paragonShards.sub(player.cb.evolvedReq[4])
                player.cb.evolvedLevels[4] = player.cb.evolvedLevels[4].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        222: {
            title() { return "Special Feature"},
            canClick() { return true },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 1 && player.ev.evolutionsUnlocked[4] == true && player.cb.viewingEvolved[4] == true},
            onClick() {
                player.tab = "ev4"
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        223: {
            title() { return "View Evolved"},
            canClick() { return true },
            unlocked() { return player.cb.rarePetDisplayIndex == 1 && player.ev.evolutionsUnlocked[5] == true && player.cb.viewingEvolved[5] == false},
            onClick() {
                player.cb.viewingEvolved[5] = true
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        224: {
            title() { return "View Normal"},
            canClick() { return true },
            unlocked() { return player.cb.rarePetDisplayIndex == 1 && player.ev.evolutionsUnlocked[5] == true && player.cb.viewingEvolved[5] == true},
            onClick() {
                player.cb.viewingEvolved[5] = false
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        225: {
            title() { return "Level Up"},
            canClick() { return player.cb.paragonShards.gte(player.cb.evolvedReq[5]) },
            unlocked() { return player.cb.rarePetDisplayIndex == 1 && player.cb.viewingEvolved[5] == true},
            onClick() {
                player.cb.paragonShards = player.cb.paragonShards.sub(player.cb.evolvedReq[5])
                player.cb.evolvedLevels[5] = player.cb.evolvedLevels[5].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        226: {
            title() { return "Special Feature"},
            canClick() { return player.po.dice },
            tooltip() { return "The current OTF has to be dice."},
            unlocked() { return player.cb.rarePetDisplayIndex == 1 && player.ev.evolutionsUnlocked[5] == true && player.cb.viewingEvolved[5] == true},
            onClick() {
                player.tab = "d"
                player.subtabs["d"]['stuff'] = 'Challenge Dice'
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        227: {
            title() { return "View Evolved"},
            canClick() { return true },
            unlocked() { return player.cb.petDisplayIndex == 5 && player.ev.evolutionsUnlocked[6] == true && player.cb.viewingEvolved[6] == false},
            onClick() {
                player.cb.viewingEvolved[6] = true
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        228: {
            title() { return "View Normal"},
            canClick() { return true },
            unlocked() { return player.cb.petDisplayIndex == 5 && player.ev.evolutionsUnlocked[6] == true && player.cb.viewingEvolved[6] == true},
            onClick() {
                player.cb.viewingEvolved[6] = false
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        229: {
            title() { return "Level Up"},
            canClick() { return player.cb.evolutionShards.gte(player.cb.evolvedReq[6]) },
            unlocked() { return player.cb.petDisplayIndex == 5 && player.cb.viewingEvolved[6] == true},
            onClick() {
                player.cb.evolutionShards = player.cb.evolutionShards.sub(player.cb.evolvedReq[6])
                player.cb.evolvedLevels[6] = player.cb.evolvedLevels[6].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        231: {
            title() { return "Special Feature"},
            canClick() { return true },
            unlocked() { return player.cb.petDisplayIndex == 5 && player.ev.evolutionsUnlocked[6] == true && player.cb.viewingEvolved[6] == true},
            onClick() {
                player.po.lastUniverse = "cb"
                 player.tab = "po"
                player.subtabs["po"]['stuff'] = 'ADVANCED HALTER'
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        232: {
            title() { return "View Evolved"},
            canClick() { return true },
            unlocked() { return player.cb.rarePetDisplayIndex == 2 && player.ev.evolutionsUnlocked[7] == true && player.cb.viewingEvolved[7] == false},
            onClick() {
                player.cb.viewingEvolved[7] = true
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        233: {
            title() { return "View Normal"},
            canClick() { return true },
            unlocked() { return player.cb.rarePetDisplayIndex == 2 && player.ev.evolutionsUnlocked[7] == true && player.cb.viewingEvolved[7] == true},
            onClick() {
                player.cb.viewingEvolved[7] = false
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        234: {
            title() { return "Level Up"},
            canClick() { return player.cb.paragonShards.gte(player.cb.evolvedReq[7]) },
            unlocked() { return player.cb.rarePetDisplayIndex == 2 && player.cb.viewingEvolved[7] == true},
            onClick() {
                player.cb.paragonShards = player.cb.paragonShards.sub(player.cb.evolvedReq[7])
                player.cb.evolvedLevels[7] = player.cb.evolvedLevels[7].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        235: {
            title() { return "Special Feature"},
            canClick() { return true },
            unlocked() { return player.cb.rarePetDisplayIndex == 2 && player.ev.evolutionsUnlocked[7] == true && player.cb.viewingEvolved[7] == true},
            onClick() {
                player.tab = "g"
                player.subtabs["g"]['stuff'] = 'Moonstone'
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        236: {
            title() { return "View Evolved"},
            canClick() { return true },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 5 && player.ev.evolutionsUnlocked[8] == true && player.cb.viewingEvolved[8] == false},
            onClick() {
                player.cb.viewingEvolved[8] = true
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        237: {
            title() { return "View Normal"},
            canClick() { return true },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 5 && player.ev.evolutionsUnlocked[8] == true && player.cb.viewingEvolved[8] == true},
            onClick() {
                player.cb.viewingEvolved[8] = false
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        238: {
            title() { return "Level Up"},
            canClick() { return player.cb.evolutionShards.gte(player.cb.evolvedReq[8]) },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 5 && player.cb.viewingEvolved[8] == true},
            onClick() {
                player.cb.evolutionShards = player.cb.evolutionShards.sub(player.cb.evolvedReq[8])
                player.cb.evolvedLevels[8] = player.cb.evolvedLevels[8].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        239: {
            title() { return "Special Feature"},
            canClick() { return true },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 5 && player.ev.evolutionsUnlocked[8] == true && player.cb.viewingEvolved[8] == true},
            onClick() {
                player.tab = "ev8"
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        //sacrifice
        301: {
            title() { return "Sacrifice one"},
            canClick() { return player.cb.commonPetAmounts[player.cb.petDisplayIndex].gte(1)},
            unlocked() { return player.ev.evolutionsUnlocked[4] == true},
            onClick() {
                layers.cb.sacrificeCommonPet(player.cb.petDisplayIndex)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        302: {
            title() { return "Sacrifice all"},
            canClick() { return player.cb.commonPetAmounts[player.cb.petDisplayIndex].gte(1)},
            unlocked() { return player.ev.evolutionsUnlocked[4] == true},
            onClick() {
                layers.cb.sacrificeAllCommonPet(player.cb.petDisplayIndex)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        303: {
            title() { return "Sacrifice one"},
            canClick() { return player.cb.uncommonPetAmounts[player.cb.uncommonPetDisplayIndex].gte(1)},
            unlocked() { return player.ev.evolutionsUnlocked[4] == true},
            onClick() {
                layers.cb.sacrificeUncommonPet(player.cb.uncommonPetDisplayIndex)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        304: {
            title() { return "Sacrifice all"},
            canClick() { return player.cb.uncommonPetAmounts[player.cb.uncommonPetDisplayIndex].gte(1)},
            unlocked() { return player.ev.evolutionsUnlocked[4] == true},
            onClick() {
                layers.cb.sacrificeAllUncommonPet(player.cb.uncommonPetDisplayIndex)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        305: {
            title() { return "Sacrifice one"},
            canClick() { return player.cb.rarePetAmounts[player.cb.rarePetDisplayIndex].gte(1)},
            unlocked() { return player.ev.evolutionsUnlocked[4] == true},
            onClick() {
                layers.cb.sacrificeRarePet(player.cb.rarePetDisplayIndex)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        306: {
            title() { return "Sacrifice all"},
            canClick() { return player.cb.rarePetAmounts[player.cb.rarePetDisplayIndex].gte(1)},
            unlocked() { return player.ev.evolutionsUnlocked[4] == true},
            onClick() {
                layers.cb.sacrificeAllRarePet(player.cb.rarePetDisplayIndex)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },


        //Automation
        401: {
            title() { return "<h3>Lower" },
            canClick() { return player.cb.buttonIndex.gt(0) },
            unlocked() { return true },
            onClick() {
                player.cb.buttonIndex = player.cb.buttonIndex.sub(1)
            },
            style: { width: '100px', "min-height": '100px' },
        },
        402: {
            title() { return "<h3>Increase" },
            canClick() { return player.cb.buttonIndex.lt(player.cb.buttonAutomationTimers.length-1) },
            unlocked() { return true },
            onClick() {
                player.cb.buttonIndex = player.cb.buttonIndex.add(1)
            },
            style: { width: '100px', "min-height": '100px' },
        },
        403: {
            title() { return "Allocate Automation Shards" },
            canClick() { return player.cb.automationShards.gte(player.cb.automationShardsInputAmount) },
            unlocked() { return true },
            onClick() {
                player.cb.automationShards = player.cb.automationShards.sub(player.cb.automationShardsInputAmount)
                player.cb.buttonAutomationAllocation[player.cb.buttonIndex] = player.cb.buttonAutomationAllocation[player.cb.buttonIndex].add(player.cb.automationShardsInputAmount)
            },
            style: { width: '100px', "min-height": '100px' },
        },
        404: {
            title() { return "Return Automation Shards" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.cb.automationShards = player.cb.totalAutomationShards
                for (let i = 0; i < player.cb.buttonAutomationTimersMax.length; i++)
                {
                    player.cb.buttonAutomationAllocation[i] = new Decimal(0)
                } 
            },
            style: { width: '100px', "min-height": '100px' },
        },
    },
    petButton1() {
        let rng = Math.random();

        if (rng > 0.95) {
            player.cb.uncommonPetAmounts[0] = player.cb.uncommonPetAmounts[0].add(1);
            callAlert("You gained a Teste!", "resources/testeUncommonPet.png");
        }
        else if (rng > 0.82) {
            player.cb.commonPetAmounts[4] = player.cb.commonPetAmounts[4].add(1);
            callAlert("You gained a Slax!", "resources/slaxCommonPet.png");
        } else if (rng > 0.66) {
            player.cb.commonPetAmounts[3] = player.cb.commonPetAmounts[3].add(1);
            callAlert("You gained a Gd Checkpoint!", "resources/checkpointCommonPet.png");
        } else if (rng > 0.49) {
            player.cb.commonPetAmounts[2] = player.cb.commonPetAmounts[2].add(1);
            callAlert("You gained an Unsmith!", "resources/unsmithCommonPet.png");
        } else if (rng > 0.27) {
            player.cb.commonPetAmounts[1] = player.cb.commonPetAmounts[1].add(1);
            callAlert("You gained an Egg Guy!", "resources/eggCommonPet.png");
        } else {
            player.cb.commonPetAmounts[0] = player.cb.commonPetAmounts[0].add(1);
            callAlert("You gained a Gwa!", "resources/gwaCommonPet.png");
        }
    },
    petButton2() {
        let rng = Math.random();

        if (rng > 0.93) {
            player.cb.rarePetAmounts[0] = player.cb.rarePetAmounts[0].add(1);
            callAlert("You gained a Nova!", "resources/novaRarePet.png");
        }
        else if (rng > 0.82) {
            player.cb.uncommonPetAmounts[4] = player.cb.uncommonPetAmounts[4].add(1);
            callAlert("You gained THE WATCHING EYE!", "resources/eyeUncommonPet.png");
        } else if (rng > 0.70) {
            player.cb.uncommonPetAmounts[3] = player.cb.uncommonPetAmounts[3].add(1);
            callAlert("You gained a Shark!", "resources/sharkUncommonPet.png");
        } else if (rng > 0.58) {
            player.cb.uncommonPetAmounts[2] = player.cb.uncommonPetAmounts[2].add(1);
            callAlert("You gained a Normal Face!", "resources/normalFaceUncommonPet.png");
        } else if (rng > 0.46) {
            player.cb.uncommonPetAmounts[1] = player.cb.uncommonPetAmounts[1].add(1);
            callAlert("You gained a Star!", "resources/starUncommonPet.png");
        } else if (rng > 0.35) {
            player.cb.uncommonPetAmounts[0] = player.cb.uncommonPetAmounts[0].add(1);
            callAlert("You gained a Teste!", "resources/testeUncommonPet.png");
        }else if (rng > 0.28) {
            player.cb.commonPetAmounts[4] = player.cb.commonPetAmounts[4].add(3);
            callAlert("You gained 3 Slaxes!", "resources/slaxCommonPet.png");
        } else if (rng > 0.21) {
            player.cb.commonPetAmounts[3] = player.cb.commonPetAmounts[3].add(3);
            callAlert("You gained 3 Gd Checkpoints!", "resources/checkpointCommonPet.png");
        } else if (rng > 0.14) {
            player.cb.commonPetAmounts[2] = player.cb.commonPetAmounts[2].add(3);
            callAlert("You gained 3 Unsmiths!", "resources/unsmithCommonPet.png");
        } else if (rng > 0.7) {
            player.cb.commonPetAmounts[1] = player.cb.commonPetAmounts[1].add(3);
            callAlert("You gained 3 Egg Guys!", "resources/eggCommonPet.png");
        } else {
            player.cb.commonPetAmounts[0] = player.cb.commonPetAmounts[0].add(3);
            callAlert("You gained 3 Gwas!", "resources/gwaCommonPet.png");
        }
    },
    petButton3() {
        let rng = Math.random();

        if (rng > 0.2) {
            let random =  getRandomInt(5)
            if (random == 0)
            {
                player.cb.uncommonPetAmounts[0] = player.cb.uncommonPetAmounts[0].add(1);
                callAlert("You gained a Teste!", "resources/testeUncommonPet.png");
            } else if (random == 1)
            {
                player.cb.uncommonPetAmounts[1] = player.cb.uncommonPetAmounts[1].add(1);
                callAlert("You gained a Star!", "resources/starUncommonPet.png");
            } else if (random == 2)
            {
                player.cb.uncommonPetAmounts[2] = player.cb.uncommonPetAmounts[2].add(1);
                callAlert("You gained a Normal Face!", "resources/normalFaceUncommonPet.png");
            } else if (random == 3)
            {
                player.cb.uncommonPetAmounts[3] = player.cb.uncommonPetAmounts[3].add(1);
                callAlert("You gained a Shark!", "resources/sharkUncommonPet.png");
            }  else if (random == 4)
            {
                player.cb.uncommonPetAmounts[4] = player.cb.uncommonPetAmounts[4].add(1);
                callAlert("You gained THE WATCHING EYE!", "resources/eyeUncommonPet.png");
            }
        }
        if (rng < 0.2)
        {
            if (rng > 0.08)
            {
                player.cb.rarePetAmounts[3] = player.cb.rarePetAmounts[3].add(1);
                callAlert("You gained a Goofy Ahh Thing!", "resources/goofyAhhThingRarePet.png");
            }
            if (rng < 0.08)
            {
                player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                callAlert("You gained an Evolution Shard!", "resources/evoShard.png");
            }
        }
    },
    petButton4() {
        let rng = Math.random();
        let gainedPets = new Decimal(0)
        if (rng > 0.5) {
            let random =  getRandomInt(2)
            let gainedPets = getRandomInt(4) + 4
            if (random == 0)
            {
                player.cb.commonPetAmounts[5] = player.cb.commonPetAmounts[5].add(gainedPets);
                callAlert("You gained " + formatWhole(gainedPets) + " Spiders!", "resources/spiderCommonPet.png");
            } else if (random == 1)
            {
                player.cb.commonPetAmounts[6] = player.cb.commonPetAmounts[6].add(gainedPets);
                callAlert("You gained " + formatWhole(gainedPets) + " Blobs!", "resources/blobCommonPet.png");
            }
        } else if (rng > 0.2 && rng < 0.5)
        {
            let random =  getRandomInt(2)
            let gainedPets = getRandomInt(2) + 2
            if (random == 0)
            {
                player.cb.uncommonPetAmounts[5] = player.cb.uncommonPetAmounts[5].add(gainedPets);
                callAlert("You gained " + formatWhole(gainedPets) + " Clocks!", "resources/clockUncommonPet.png");
            } else if (random == 1)
            {
                player.cb.uncommonPetAmounts[6] = player.cb.uncommonPetAmounts[6].add(gainedPets);
                callAlert("You gained " + formatWhole(gainedPets) + " Trollfaces!", "resources/trollUncommonPet.png");
            }
        }
        else if (rng < 0.2)
        {
            if (rng > 0.05)
            {
                player.cb.rarePetAmounts[4] = player.cb.rarePetAmounts[4].add(1);
                callAlert("You gained an Antimatter!", "resources/antimatterRarePet.png");
            }
            if (rng < 0.05)
            {
                player.cb.evolutionShards = player.cb.evolutionShards.add(3);
                callAlert("You gained 3 Evolution Shards!", "resources/evoShard.png");
            }
        }
    },
    petButton5() {
        let rng = Math.random();
        let gainedPets = new Decimal(0)
        if (rng > 0.5) {
            let random =  getRandomInt(2)
            let gainedPets = getRandomInt(4) + 2
            if (random == 0)
            {
                player.cb.commonPetAmounts[7] = player.cb.commonPetAmounts[7].add(gainedPets);
                callAlert("You gained " + formatWhole(gainedPets) + " Replicators!", "resources/replicatorCommonPet.png");
            } else if (random == 1)
            {
                player.cb.commonPetAmounts[8] = player.cb.commonPetAmounts[8].add(gainedPets);
                callAlert("You gained " + formatWhole(gainedPets) + " Smoke!", "resources/smokeCommonPet.png");
            }
        } else if (rng > 0.2 && rng < 0.5)
        {
            let random =  getRandomInt(2)
            let gainedPets = getRandomInt(1) + 1
            if (random == 0)
            {
                player.cb.uncommonPetAmounts[7] = player.cb.uncommonPetAmounts[7].add(gainedPets);
                callAlert("You gained " + formatWhole(gainedPets) + " Infinity Breakers!", "resources/infinityBreakerUncommonPet.png");
            } else if (random == 1)
            {
                player.cb.uncommonPetAmounts[8] = player.cb.uncommonPetAmounts[8].add(gainedPets);
                callAlert("You gained " + formatWhole(gainedPets) + " Johns!", "resources/johnUncommonPet.png");
            }
        }
        else if (rng < 0.2)
        {
            if (rng > 0.1)
            {
                player.cb.rarePetAmounts[5] = player.cb.rarePetAmounts[5].add(1);
                callAlert("You gained a Hex Shadow!", "resources/hexShadowRarePet.png");
            }
            if (rng < 0.1)
            {
                player.cb.rarePetAmounts[6] = player.cb.rarePetAmounts[6].add(1);
                callAlert("You gained a Grass Square!", "resources/grassSquareRarePet.png");
            }
        }
    },
    petButton6() {
        let rng = Math.random();
        let gainedPets = new Decimal(0)
        let gainedFragments = new Decimal(0)
        if (rng > 0.3) {
            let random =  getRandomInt(7)
            let gainedPets = getRandomInt(2) + 1
            if (random == 0)
            {
                player.cb.rarePetAmounts[0] = player.cb.rarePetAmounts[0].add(gainedPets);
                callAlert("You gained " + formatWhole(gainedPets) + " Novas!", "resources/novaRarePet.png");
            } else if (random == 1)
            {
                player.cb.rarePetAmounts[1] = player.cb.rarePetAmounts[1].add(gainedPets);
                callAlert("You gained " + formatWhole(gainedPets) + " Dices!", "resources/diceRarePet.png");
            }
            else if (random == 2)
            {
                player.cb.rarePetAmounts[2] = player.cb.rarePetAmounts[2].add(gainedPets);
                callAlert("You gained " + formatWhole(gainedPets) + " Drippy Ufos!", "resources/ufoRarePet.png");
            }
            else if (random == 3)
            {
                player.cb.rarePetAmounts[3] = player.cb.rarePetAmounts[3].add(gainedPets);
                callAlert("You gained " + formatWhole(gainedPets) + " Goofy Ahh Things!", "resources/goofyAhhThingRarePet.png");
            }
            else if (random == 4)
            {
                player.cb.rarePetAmounts[4] = player.cb.rarePetAmounts[4].add(gainedPets);
                callAlert("You gained " + formatWhole(gainedPets) + " Antimatters!", "resources/antimatterRarePet.png");
            }
            else if (random == 5)
            {
                player.cb.rarePetAmounts[5] = player.cb.rarePetAmounts[5].add(gainedPets);
                callAlert("You gained " + formatWhole(gainedPets) + " Hex Shadows!", "resources/hexShadowRarePet.png");
            }
            else if (random == 6)
            {
                player.cb.rarePetAmounts[6] = player.cb.rarePetAmounts[6].add(gainedPets);
                callAlert("You gained " + formatWhole(gainedPets) + " Grass Squares!", "resources/grassSquareRarePet.png");
            }
        }
        else if (rng < 0.3)
        {
            let random =  getRandomInt(3)
            let random1 =  getRandomInt(4)
            let gainedFragments = getRandomInt(3) + 1
            if (random == 0)
            {
                player.cb.epicPetFragments[0] = player.cb.epicPetFragments[0].add(gainedFragments);
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment4.png");
            } else if (random == 1)
            {
                player.cb.epicPetFragments[1] = player.cb.epicPetFragments[1].add(gainedFragments);
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment4.png");
            }
            else if (random == 2)
            {
                player.cb.epicPetFragments[2] = player.cb.epicPetFragments[2].add(gainedFragments);
                if (random1 == 0) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment1.png");
                if (random1 == 1) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment2.png");
                if (random1 == 2) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment3.png");
                if (random1 == 3) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment4.png");
            }
        }
    },
    bars: {
        xpbar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 1440,
            height: 50,
            progress() {
                return player.cb.xp.div(player.cb.req)
            },
            fillStyle: {
                "background-color": "#06366e",
            },
            display() {
                return "<h5>" + format(player.cb.xp) + "/" + formatWhole(player.cb.req) + "<h5> XP to level up.</h5>";
            },
        },
    },
    upgrades: {
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(2.05).pow(x || getBuyableAmount(this.layer, this.id)).mul(420).div(player.cb.uncommonPetEffects[2][2]).div(player.cb.rarePetEffects[3][1]).floor() },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.totalxp.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Check Back OTF Boost."
            },
            display() {
                return "which are multiplying hex 1 points, rocket fuel, and dice points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost.mul(player.cb.uncommonPetEffects[2][2]).mul(player.cb.rarePetEffects[3][1]).div(5/11).pow(5/11).sub(3).floor()) + " Check Back Levels worth of XP."
            },
            buy() {
                let base = new Decimal(420).div(player.cb.uncommonPetEffects[2][2]).div(player.cb.rarePetEffects[3][1])
                let growth = 2.05
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.totalxp = player.cb.totalxp.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    layers.cb.levelup()
                } else
                {

                let max = Decimal.affordGeometricSeries(player.cb.totalxp, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.cb.totalxp = player.cb.totalxp.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                layers.cb.levelup()
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(2.22).pow(x || getBuyableAmount(this.layer, this.id)).mul(950).div(player.cb.uncommonPetEffects[2][2]).div(player.cb.rarePetEffects[3][1]).floor() },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.5).pow(1.5).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.totalxp.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Check Back IP Boost."
            },
            display() {
                return "which are multiplying infinity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost.mul(player.cb.uncommonPetEffects[2][2]).mul(player.cb.rarePetEffects[3][1]).div(5/11).pow(5/11).sub(3).floor()) + " Check Back Levels worth of XP."
            },
            buy() {
                let base = new Decimal(950).div(player.cb.uncommonPetEffects[2][2]).div(player.cb.rarePetEffects[3][1])
                let growth = 2.22
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.totalxp = player.cb.totalxp.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    layers.cb.levelup()
                } else
                {

                let max = Decimal.affordGeometricSeries(player.cb.totalxp, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.cb.totalxp = player.cb.totalxp.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                layers.cb.levelup()
            }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(2.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(2750).div(player.cb.uncommonPetEffects[2][2]).div(player.cb.rarePetEffects[3][1]).floor() },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.totalxp.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Check Back XP Boost Boost."
            },
            display() {
                return "which are multiplying XPBoost by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost.mul(player.cb.uncommonPetEffects[2][2]).mul(player.cb.rarePetEffects[3][1]).div(5/11).pow(5/11).sub(3).floor()) + " Check Back Levels worth of XP."
            },
            buy() {
                let base = new Decimal(2750).div(player.cb.uncommonPetEffects[2][2]).div(player.cb.rarePetEffects[3][1])
                let growth = 2.4
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.totalxp = player.cb.totalxp.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    layers.cb.levelup()
                } else
                {

                let max = Decimal.affordGeometricSeries(player.cb.totalxp, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.cb.totalxp = player.cb.totalxp.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                layers.cb.levelup()
            }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            cost(x) { return new Decimal(2.75).pow(x || getBuyableAmount(this.layer, this.id)).mul(7500).div(player.cb.uncommonPetEffects[2][2]).div(player.cb.rarePetEffects[3][1]).floor() },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.totalxp.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Check Back Pet Point Boost."
            },
            display() {
                return "which are multiplying pet points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost.mul(player.cb.uncommonPetEffects[2][2]).mul(player.cb.rarePetEffects[3][1]).div(5/11).pow(5/11).sub(3).floor()) + " Check Back Levels worth of XP."
            },
            buy() {
                let base = new Decimal(7500).div(player.cb.uncommonPetEffects[2][2]).div(player.cb.rarePetEffects[3][1])
                let growth = 2.75
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.totalxp = player.cb.totalxp.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    layers.cb.levelup()
                } else
                {

                let max = Decimal.affordGeometricSeries(player.cb.totalxp, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.cb.totalxp = player.cb.totalxp.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                layers.cb.levelup()
            }
            },
            style: { width: '275px', height: '150px', }
        },
    },
    milestones: {

    },
    challenges: {
    },

    infoboxes: {
        c1: {
            title: "Gwa",
            body() { return "Has a childlike innocence and is very kind. Seems to have immense power but is also very reluctant to use the power." },
            unlocked() { return player.cb.petDisplayIndex == 0 && !player.cb.viewingEvolved[3]},
            
        },
        c2: {
            title: "Egg Guy",
            body() { return "This fellow came out of a very powerful chicken... However he would meet his fate when the chicken inside hatches..." },
            unlocked() { return player.cb.petDisplayIndex == 1 },
            
        },
        c3: {
            title: "Unsmith",
            body() { return "A creature that was synergized out of the purest form of SPV, which we don't know what it is yet... We will figure it out one day." },
            unlocked() { return player.cb.petDisplayIndex == 2 && !player.cb.viewingEvolved[0]},
            
        },
        c4: {
            title: "Gd Checkpoint",
            body() { return "This guy feels a little bit familiar, but you don't know why. You just ignore it." },
            unlocked() { return player.cb.petDisplayIndex == 3 },
            
        },
        c5: {
            title: "Slax",
            body() { return "A being of neon green and plasma. The energy of the void radiates within it's presence." },
            unlocked() { return player.cb.petDisplayIndex == 4 },
            
        },
        c6: {
            title: "Spider",
            body() { return "This eight-legged bug has no place in these worlds, but a small crack in the fabric of reality made it slip through and gain enough power to be your pet." },
            unlocked() { return player.cb.petDisplayIndex == 5 && !player.cb.viewingEvolved[6]},
            
        },
        c7: {
            title: "Blob",
            body() { return "Blob." },
            unlocked() { return player.cb.petDisplayIndex == 6 },
            
        },
        c8: {
            title: "Replicator",
            body() { return "This creature was the result of a failed replicant galaxy transformation. It holds the power of 1.79e308 replicanti, but can not replicate itself no more." },
            unlocked() { return player.cb.petDisplayIndex == 7 },
            
        },
        c9: {
            title: "Smoke",
            body() { return "A burning world that once was. Reduced to nothingness and ash. Smoke from that world made its way over here. The new world." },
            unlocked() { return player.cb.petDisplayIndex == 8 },
            
        },
        u1: {
            title: "Teste",
            body() { return "A cat that likes committing murder on walls." },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 0 },
            
        },
        u2: {
            title: "Star",
            body() { return "One of the many stars from the night sky. A burning ball of gas." },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 1 && !player.cb.viewingEvolved[4]},
            
        },
        u3: {
            title: "Normal Face",
            body() { return "Originated from a vast land of blocks and spikes. A victim of lobotomy." },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 2 && !player.cb.viewingEvolved[2]},
            
        },
        u4: {
            title: "Shark",
            body() { return "A shark that was once swimming in an infinite sea found itself trapped in this universe." },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 3 && !player.cb.viewingEvolved[1]},
            
        },
        u5: {
            title: "THE WATCHING EYE",
            body() { return "It's always watching." },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 4},
            
        },
        u6: {
            title: "Clock",
            body() { return "This clock is the symbol of check back. Must be one patient fellow. You can feel the presence of evolution shards..." },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 5 && !player.cb.viewingEvolved[8]},
            
        },
        u7: {
            title: "Troll Face",
            body() { return "You can NOT trust this guy no matter what. Also please do not evolve it either." },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 6},
            
        },
        u8: {
            title: "Infinity Breaker",
            body() { return "This pet has been breaking your infinities all along. It is made of an unknown metal. It seems familiar." },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 7},
            
        },
        u9: {
            title: "John",
            body() { return "Just a cartoon doodle dude that got transported here for literally no reason." },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 8},
            
        },
        //make rares
        r1: {
            title: "Nova",
            body() { return "A clown from the domain of singularity. Likes playing pranks and causing havoc. Only here to watch what you are doing." },
            unlocked() { return player.cb.rarePetDisplayIndex == 0},
            
        },
        r2: {
            title: "Dice",
            body() { return "One of Zar's creations. This pet will always output a random number between 1 and 6." },
            unlocked() { return player.cb.rarePetDisplayIndex == 1 && !player.cb.viewingEvolved[5]},
            
        },
        r3: {
            title: "Drippy Ufo",
            body() { return "An unknown flying object, but with style. Iridite's messenger. Be careful what you tell it." },
            unlocked() { return player.cb.rarePetDisplayIndex == 2 && !player.cb.viewingEvolved[7]},
            
        },
        r4: {
            title: "Goofy Ahh Thing",
            body() { return "эта дурацкая ax-тварь — существо из неизвестной вселенной. Это может быть тайно небожитель." },
            unlocked() { return player.cb.rarePetDisplayIndex == 3},
        },
        r5: {
            title: "Antimatter",
            body() { return "The one controlling your antimatter and makes sure it stays in safe quantities." },
            unlocked() { return player.cb.rarePetDisplayIndex == 4},
        },
        r6: {
            title: "Hex Shadow",
            body() { return "Found halfway to the top of the hex staircase. Unwilling to talk or give any information. Has a strange odor." },
            unlocked() { return player.cb.rarePetDisplayIndex == 5},
        },
        r7: {
            title: "Grass Square",
            body() { return "It was one ordinary of cutting grass, and one of the grass particles randomly grew a face. This is what we have now." },
            unlocked() { return player.cb.rarePetDisplayIndex == 6},
        },
        //epic
        e1: {
            title: "Dotknight",
            body() { return "A knight of unknown origin that wields the cursword, which is one of the most powerful swords. He is yet to awaken its true power." },
            unlocked() { return player.cb.epicPetDisplayIndex == 0 && player.cb.epicPetLevels[0].gte(1)},
            
        },
        e2: {
            title: "Dragon",
            body() { return "This dragon is heavily associated with the number 12. Seems oddly familiar. You might've seen this dragon in a dream before." },
            unlocked() { return player.cb.epicPetDisplayIndex == 1 && player.cb.epicPetLevels[1].gte(1)},
            
        },
        e3: {
            title: "Cookie",
            body() { return "This cookie is imbued with large amounts of incremental power. Clicking it would be very dangerous." },
            unlocked() { return player.cb.epicPetDisplayIndex == 2 && player.cb.epicPetLevels[2].gte(1)},
            
        },
        //evo
        /*
        0 - Unsmith
        1 - Shark
        2 - Normal Face
        3 - Gwa
        4 - Star
        5 - Dice
        6 - Spider
        7 - Ufo
        8 - Clock
        */
        ev1: {
            title: "Goldsmith",
            body() { return "This purest form of SPV condensed into a golden, metallic material. Shines too bright you can barely see." },
            unlocked() { return player.cb.petDisplayIndex == 2 && player.cb.viewingEvolved[0]},
        },
        ev2: {
            title: "MrRedShark",
            body() { return "An evolved version of the shark. Pushes a lot of mass around. A master of the elements. Very muscular." },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 3 && player.cb.viewingEvolved[1]},
        },
        ev3: {
            title: "Insane Face",
            body() { return "The lobotomy got to it. The face is no longer normal. It is angry. It wants revenge." },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 2 && player.cb.viewingEvolved[2]},
        },
        ev4: {
            title: "Voidgwa",
            body() { return "Seems to be like gwa, but its appearance is inverted. It has a strange force that prevents you from getting near it." },
            unlocked() { return player.cb.petDisplayIndex == 0 && player.cb.viewingEvolved[3]},
        },
        ev5: {
            title: "Sun",
            body() { return "Nothing changed at all about this star. It just got a bit closer." },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 1 && player.cb.viewingEvolved[4]},
        },
        ev6: {
            title: "d20",
            body() { return "The gamblingness has turned up a notch. You either get a large number like 20 or a puny small number like 1." },
            unlocked() { return player.cb.rarePetDisplayIndex == 1 && player.cb.viewingEvolved[5]},
        },
        ev7: {
            title: "Mutant Spider",
            body() { return "The poor spider ate two entire paragon shards and this is what it looks like now." },
            unlocked() { return player.cb.petDisplayIndex == 5 && player.cb.viewingEvolved[6]},
        },
        ev8: {
            title: "Moon",
            body() { return "Iridite's messenger turned out to be something much larger. A whole moon. Who knows, maybe a whole civilization is hiding underneath the surface." },
            unlocked() { return player.cb.rarePetDisplayIndex == 2 && player.cb.viewingEvolved[7]},
        },
        ev9: {
            title: "Marcel Acoplao",
            body() { return "The creator of check back. The man responsible for your duty of having to click. wait. click.. wait.. click.... wait......." },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 5 && player.cb.viewingEvolved[8]},
        },
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'color': '#06366e' } },
                unlocked() { return true },
                content:
                [
                    ["microtabs", "buttons", { 'border-width': '0px' }],
                ]
            },
            "Pets": {
                buttonStyle() { return { 'color': '#06366e' } },
                unlocked() { return player.cb.highestLevel.gte(10) || player.cb.XPBoostUnlock },
                content:
                [
                    ["microtabs", "pets", { 'border-width': '0px' }],
                ]
            },
            "Evolution": {
                buttonStyle() { return { 'color': '#1500bf', 'border-color': "#1500bf", 'background-image': 'linear-gradient(90deg, #d487fd, #4b79ff)',} },
                unlocked() { return player.cb.highestLevel.gte(35)|| player.cb.XPBoostUnlock  },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 2]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.evolutionShards) + "</h3> evolution shards." }, { "color": "#d487fd", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h5>(Gained from check back buttons)" }, { "color": "#d487fd", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.cb.highestLevel.gte(250) ? "You have <h3>" + formatWhole(player.cb.paragonShards) + "</h3> paragon shards." : ""}, { "color": "#2842eb", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.gte(250) ? "<h5>(Gained from XPBoost buttons)" : "" }, { "color": "#2842eb", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                ]
            },
            "Buyables": {
                buttonStyle() { return {'color': '#06366e' } },
                unlocked() { return hasChallenge("ip", 17) },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 3], ["clickable", 4]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
                ]

            },
            "Automation": {
                buttonStyle() { return { 'color': 'white', 'border-color': "black", 'background': 'grey',}  },
                unlocked() { return player.ev.evolutionsUnlocked[4] },
                content:
                [
                    ["microtabs", "automation", { 'border-width': '0px' }],
                    
                ]

            },
        },
        pets: {
            "Common": {
                buttonStyle() { return { 'color': '#9bedff', 'border-color': '#9bedff'  } },
                unlocked() { return true },
                content:
                [
                        ["raw-html", function () { return player.cb.petDisplay[player.cb.petDisplayIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 106], ["clickable", 107], ["clickable", 108], ["clickable", 109], ["clickable", 111], ["clickable", 135], ["clickable", 136], ["clickable", 145], ["clickable", 147],  ["clickable", 201],  ["clickable", 203], ["clickable", 202], ["clickable", 204], ["clickable", 216], ["clickable", 215], ["clickable", 214], ["clickable", 217], ["clickable", 227], ["clickable", 229], ["clickable", 228], ["clickable", 231], ["clickable", 301], ["clickable", 302], ]],
                        ["blank", "25px"],
                        ["raw-html", function () { return "Common Pets" }, { "color": "#9bedff", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 101], ["clickable", 102], ["clickable", 103], ["clickable", 104], ["clickable", 105], ["clickable", 133], ["clickable", 134], ["clickable", 144], ["clickable", 146]]],
                        ["blank", "25px"],
                        ["row", [["infobox", "ev1"],["infobox", "ev4"],["infobox", "ev7"], ["infobox", "c1"], ["infobox", "c2"], ["infobox", "c3"], ["infobox", "c4"], ["infobox", "c5"], ["infobox", "c6"], ["infobox", "c7"], ["infobox", "c8"], ["infobox", "c9"], ]],
                    ]

            },
            "Uncommon": {
                buttonStyle() { return { 'color': '#88e688', 'border-color': '#88e688' } },
                unlocked() { return true },
                content:
                [
                    ["raw-html", function () { return player.cb.uncommonPetDisplay[player.cb.uncommonPetDisplayIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 113], ["clickable", 118], ["clickable", 119], ["clickable", 121], ["clickable", 122], ["clickable", 139],["clickable", 141], ["clickable", 149], ["clickable", 152], 
                    ["clickable", 205],  ["clickable", 207], ["clickable", 206], ["clickable", 208], ["clickable", 209],  ["clickable", 212], ["clickable", 211], ["clickable", 213],  
                    ["clickable", 221], ["clickable", 219], ["clickable", 218], ["clickable", 222], ["clickable", 238], ["clickable", 237], ["clickable", 236], ["clickable", 239], ["clickable", 303], ["clickable", 304],  ]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Uncommon Pets" }, { "color": "#88e688", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 112], ["clickable", 114], ["clickable", 115], ["clickable", 116], ["clickable", 117], ["clickable", 137], ["clickable", 138], ["clickable", 148], ["clickable", 151], ]],
                    ["blank", "25px"],
                    ["row", [["infobox", "ev2"],["infobox", "ev3"],["infobox", "ev5"], ["infobox", "ev9"], ["infobox", "u1"], ["infobox", "u2"], ["infobox", "u3"], ["infobox", "u4"], ["infobox", "u5"], ["infobox", "u6"], ["infobox", "u7"], ["infobox", "u8"], ["infobox", "u9"], ]],
                ]

            },
            "Rare": {
                buttonStyle() { return { 'color': '#4e7cff', 'border-color': '#4e7cff' } },
                unlocked() { return player.cb.highestLevel.gte(25) || player.cb.XPBoostUnlock },
                content:
                [
                    ["raw-html", function () { return "You have <h3>" + format(player.cb.petPoints) + "</h3> pet points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.rarePetDisplay[player.cb.rarePetDisplayIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 124], ["clickable", 18], ["clickable", 127], ["clickable", 19], ["clickable", 129], ["clickable", 22], ["clickable", 132], ["clickable", 24], ["clickable", 143], ["clickable", 27],  ["clickable", 154], ["clickable", 32],["clickable", 156], ["clickable", 33], ["clickable", 125], ["clickable", 225], ["clickable", 224], ["clickable", 223], ["clickable", 226], ["clickable", 232], ["clickable", 234], ["clickable", 233], ["clickable", 235], ["clickable", 305], ["clickable", 306], ]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Rare Pets" }, { "color": "#4e7cff", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 123], ["clickable", 126], ["clickable", 128], ["clickable", 131], ["clickable", 142], ["clickable", 153], ["clickable", 155]]],
                    ["blank", "25px"],
                    ["row", [["infobox", "ev6"],["infobox", "ev8"],["infobox", "r1"], ["infobox", "r2"], ["infobox", "r3"], ["infobox", "r4"], ["infobox", "r5"], ["infobox", "r6"], ["infobox", "r7"],  ]],
                ]

            },
            "Epic": {
                buttonStyle() { return { 'color': '#7d3c98', 'border-color': '#7d3c98', 'background-color': '#cb79ed' } },
                unlocked() { return player.cb.highestLevel.gte(1500) },
                content:
                [
                    ["raw-html", function () { return player.cb.epicPetDisplay[player.cb.epicPetDisplayIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 158], ["clickable", 161], ["clickable", 163], ["clickable", 164],["clickable", 165],["clickable", 166], ["clickable", 5], ]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Epic Pets" }, { "color": "#cb79ed", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 157], ["clickable", 159], ["clickable", 162]]],
                    ["blank", "25px"],
                    ["row", [["infobox", "e1"], ["infobox", "e2"], ["infobox", "e3"],   ]],
                ]

            },
        },
        buttons: {
            "XP": {
                buttonStyle() { return { 'color': '#06366e', 'border-color': '#06366e'  } },
                unlocked() { return true },
                content:
                [
                    ["raw-html", function () { return player.cb.buttonUnlocks[1] == false ?  "You will unlock something at level 3!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.buttonUnlocks[2] == false && player.cb.buttonUnlocks[1] == true ?  "You will unlock something at level 6!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(10) && player.cb.buttonUnlocks[2] == true ?  "You will unlock something at level 10!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(15) && player.cb.highestLevel.gte(10) ?  "You will unlock something at level 15!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(25) && player.cb.highestLevel.gte(15) ?  "You will unlock something at level 25!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(35) && player.cb.highestLevel.gte(25) ?  "You will unlock something at level 35!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(50) && player.cb.highestLevel.gte(35) ?  "You will unlock something at level 50!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(65) && player.cb.highestLevel.gte(50) ?  "You will unlock something at level 65! (Pet shop)" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(75) && player.cb.highestLevel.gte(65) ?  "You will unlock something at level 75!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(100) && player.cb.highestLevel.gte(75) && hasUpgrade("ip", 31) ?  "You will unlock something at level 100!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(125) && player.cb.highestLevel.gte(100) && hasChallenge("ip", 12) ?  "You will unlock something at level 125!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(150) && player.cb.highestLevel.gte(125) ?  "You will unlock something at level 150!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(250) && player.cb.highestLevel.gte(150) ?  "You will unlock something at level 250!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(666) && player.cb.highestLevel.gte(250) ?  "You will unlock something at level 666!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(1500) && player.cb.highestLevel.gte(666) ?  "You will unlock something at level 1500!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(3000) && player.cb.highestLevel.gte(1500) ?  "You will unlock something at level 3000! (Pet shop)" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11], ["blank", "25px"], ["raw-html", function () { return player.ev.evolutionsUnlocked[4] ? "Auto: " + format(player.cb.buttonAutomationTimers[0]) + "/" +  format(player.cb.buttonAutomationTimersMax[0]): "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],]],
                    ["row", [["clickable", 12], ["blank", "25px"], ["raw-html", function () { return player.ev.evolutionsUnlocked[4] ? "Auto: " + format(player.cb.buttonAutomationTimers[1]) + "/" +  format(player.cb.buttonAutomationTimersMax[1]): "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],]],
                    ["row", [["clickable", 13], ["blank", "25px"], ["raw-html", function () { return player.ev.evolutionsUnlocked[4] ? "Auto: " + format(player.cb.buttonAutomationTimers[2]) + "/" +  format(player.cb.buttonAutomationTimersMax[2]): "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],]],
                    ["row", [["clickable", 14], ["blank", "25px"], ["raw-html", function () { return player.ev.evolutionsUnlocked[4] ? "Auto: " + format(player.cb.buttonAutomationTimers[3]) + "/" +  format(player.cb.buttonAutomationTimersMax[3]): "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],]],
                    ["row", [["clickable", 16], ["blank", "25px"], ["raw-html", function () { return player.ev.evolutionsUnlocked[4] ? "Auto: " + format(player.cb.buttonAutomationTimers[4]) + "/" +  format(player.cb.buttonAutomationTimersMax[4]): "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],]],
                    ["row", [["clickable", 21], ["blank", "25px"], ["raw-html", function () { return player.ev.evolutionsUnlocked[4] ? "Auto: " + format(player.cb.buttonAutomationTimers[5]) + "/" +  format(player.cb.buttonAutomationTimersMax[5]): "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],]],
                    ["row", [["clickable", 23], ["blank", "25px"], ["raw-html", function () { return player.ev.evolutionsUnlocked[4] ? "Auto: " + format(player.cb.buttonAutomationTimers[6]) + "/" +  format(player.cb.buttonAutomationTimersMax[6]): "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],]],
                    ["row", [["clickable", 29], ["blank", "25px"], ["raw-html", function () { return player.ev.evolutionsUnlocked[4] ? "Auto: " + format(player.cb.buttonAutomationTimers[7]) + "/" +  format(player.cb.buttonAutomationTimersMax[7]): "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],]],
                ]

            },
            "Pets": {
                buttonStyle() { return { 'color': '#06366e', 'border-color': '#06366e' } },
                unlocked() { return player.cb.petButtonUnlocks[0] },
                content:
                [
                    ["raw-html", function () { return player.cb.buttonUnlocks[1] == false ?  "You will unlock something at level 3!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.buttonUnlocks[2] == false && player.cb.buttonUnlocks[1] == true ?  "You will unlock something at level 6!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(10) && player.cb.buttonUnlocks[2] == true ?  "You will unlock something at level 10!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(15) && player.cb.highestLevel.gte(10) ?  "You will unlock something at level 15!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(25) && player.cb.highestLevel.gte(15) ?  "You will unlock something at level 25!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(35) && player.cb.highestLevel.gte(25) ?  "You will unlock something at level 35!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(50) && player.cb.highestLevel.gte(35) ?  "You will unlock something at level 50!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(65) && player.cb.highestLevel.gte(50) ?  "You will unlock something at level 65! (Pet shop)" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(75) && player.cb.highestLevel.gte(65) ?  "You will unlock something at level 75!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(100) && player.cb.highestLevel.gte(75) && hasUpgrade("ip", 31) ?  "You will unlock something at level 100!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(125) && player.cb.highestLevel.gte(100) && hasChallenge("ip", 12) ?  "You will unlock something at level 125!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(150) && player.cb.highestLevel.gte(125) ?  "You will unlock something at level 150!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(250) && player.cb.highestLevel.gte(150) ?  "You will unlock something at level 250!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(666) && player.cb.highestLevel.gte(250) ?  "You will unlock something at level 666!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(1500) && player.cb.highestLevel.gte(666) ?  "You will unlock something at level 1500!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(3000) && player.cb.highestLevel.gte(1500) ?  "You will unlock something at level 3000! (Pet shop)" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 15]]],
                    ["row", [["clickable", 17]]],
                    ["row", [["clickable", 25]]],
                    ["row", [["clickable", 28]]],
                    ["row", [["clickable", 34]]],
                    ["row", [["clickable", 35]]],
                ]

            },
            "XPBoost": {
                buttonStyle() { return { 'color': '#06366e', 'border-color': '#06366e' } },
                unlocked() { return player.cb.XPBoostUnlock },
                content:
                [
                    ["raw-html", function () { return player.cb.buttonUnlocks[1] == false ?  "You will unlock something at level 3!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.buttonUnlocks[2] == false && player.cb.buttonUnlocks[1] == true ?  "You will unlock something at level 6!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(10) && player.cb.buttonUnlocks[2] == true ?  "You will unlock something at level 10!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(15) && player.cb.highestLevel.gte(10) ?  "You will unlock something at level 15!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(25) && player.cb.highestLevel.gte(15) ?  "You will unlock something at level 25!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(35) && player.cb.highestLevel.gte(25) ?  "You will unlock something at level 35!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(50) && player.cb.highestLevel.gte(35) ?  "You will unlock something at level 50!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(65) && player.cb.highestLevel.gte(50) ?  "You will unlock something at level 65! (Pet shop)" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(75) && player.cb.highestLevel.gte(65) ?  "You will unlock something at level 75!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(100) && player.cb.highestLevel.gte(75) && hasUpgrade("ip", 31) ?  "You will unlock something at level 100!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(125) && player.cb.highestLevel.gte(100) && hasChallenge("ip", 12) ?  "You will unlock something at level 125!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(150) && player.cb.highestLevel.gte(125) ?  "You will unlock something at level 150!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(250) && player.cb.highestLevel.gte(150) ?  "You will unlock something at level 250!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(666) && player.cb.highestLevel.gte(250) ?  "You will unlock something at level 666!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(1500) && player.cb.highestLevel.gte(666) ?  "You will unlock something at level 1500!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(3000) && player.cb.highestLevel.gte(1500) ?  "You will unlock something at level 3000! (Pet shop)" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.cb.XPBoost) + "</h3> XPBoost." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 26]]],
                    ["row", [["clickable", 31]]],
                ]

            },
            "Pet Points": {
                buttonStyle() { return { 'color': '#06366e', 'border-color': '#06366e' } },
                unlocked() { return player.cb.XPBoostUnlock },
                content:
                [
                    ["raw-html", function () { return player.cb.buttonUnlocks[1] == false ?  "You will unlock something at level 3!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.buttonUnlocks[2] == false && player.cb.buttonUnlocks[1] == true ?  "You will unlock something at level 6!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(10) && player.cb.buttonUnlocks[2] == true ?  "You will unlock something at level 10!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(15) && player.cb.highestLevel.gte(10) ?  "You will unlock something at level 15!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(25) && player.cb.highestLevel.gte(15) ?  "You will unlock something at level 25!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(35) && player.cb.highestLevel.gte(25) ?  "You will unlock something at level 35!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(50) && player.cb.highestLevel.gte(35) ?  "You will unlock something at level 50!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(65) && player.cb.highestLevel.gte(50) ?  "You will unlock something at level 65! (Pet shop)" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(75) && player.cb.highestLevel.gte(65) ?  "You will unlock something at level 75!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(100) && player.cb.highestLevel.gte(75) && hasUpgrade("ip", 31) ?  "You will unlock something at level 100!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(125) && player.cb.highestLevel.gte(100) && hasChallenge("ip", 12) ?  "You will unlock something at level 125!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(150) && player.cb.highestLevel.gte(125) ?  "You will unlock something at level 150!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(250) && player.cb.highestLevel.gte(150) ?  "You will unlock something at level 250!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(666) && player.cb.highestLevel.gte(250) ?  "You will unlock something at level 666!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(1500) && player.cb.highestLevel.gte(666) ?  "You will unlock something at level 1500!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.highestLevel.lt(3000) && player.cb.highestLevel.gte(1500) ?  "You will unlock something at level 3000! (Pet shop)" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.cb.petPoints) + "</h3> pet points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 18]]],
                    ["row", [["clickable", 19]]],
                    ["row", [["clickable", 22]]],
                    ["row", [["clickable", 24]]],
                    ["row", [["clickable", 27]]],
                    ["row", [["clickable", 32]]],
                    ["row", [["clickable", 33]]],
                ]

            },
        },
        automation: {
            "XP": {
                buttonStyle() { return { 'color': '#06366e', 'border-color': '#06366e'  } },
                unlocked() { return true },
                content:
                [
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.automationShards) + "</h3> automation shards. (" + formatWhole(player.cb.totalAutomationShards) + " total)" }, { "color": "grey", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h5>(Gained from pet sacrifices)" }, { "color": "grey", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Automating Button " + formatWhole(player.cb.buttonIndex.add(1)) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have " + formatWhole(player.cb.buttonAutomationAllocation[player.cb.buttonIndex]) + " allocated into this button." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 401], ["clickable", 403], ["clickable", 404], ["clickable", 402]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You will allocate " + formatWhole(player.cb.automationShardsInputAmount) + " automation shard."}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["text-input", "automationShardsInput", {
                        color: "var(--color)",
                        width: "400px",
                        "font-family": "Calibri",
                        "text-align": "left",
                        "font-size": "32px",
                        border: "2px solid #ffffff17",
                        background: "var(--background)",
                    }],
                ]

            },
            "Pets": {
                buttonStyle() { return { 'color': '#06366e', 'border-color': '#06366e' } },
                unlocked() { return player.cb.petButtonUnlocks[0] && false },
                content:
                [
                ]

            },
            "XPBoost": {
                buttonStyle() { return { 'color': '#06366e', 'border-color': '#06366e' } },
                unlocked() { return player.cb.XPBoostUnlock && false },
                content:
                [
                ]

            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are level " + formatWhole(player.cb.level) + ", which boosts celestial point gain by x" + format(player.cb.levelEffect) + "."}, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
        ["raw-html", function () { return "(Highest Level: " + formatWhole(player.cb.highestLevel) + ")"}, { "color": "white", "font-size": "12px", "font-family": "monospace" }],
        ["raw-html", function () { return !hasMilestone("ip", 24) ? "YOU MUST REACH 1e100 POINTS TO ACTIVATE CHECK BACK AND PET EFFECT" : ""}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return inChallenge("ip", 17) ? "You are losing " + formatWhole(player.cb.lossRate) + " xp per second." : ""}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["bar", "xpbar"]]],
                        ["blank", "25px"],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 19) || hasMilestone("ip", 12) || (hasUpgrade("de", 13) && inChallenge("tad", 11)) }
})