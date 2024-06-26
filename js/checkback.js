﻿addLayer("cb", {
    name: "Check Back", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CB", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        level: new Decimal(1),
        levelEffect: new Decimal(1),
        xp: new Decimal(0),
        xpMult: new Decimal(1),
        req: new Decimal(4),
        effectActivate: false,

        buttonUnlocks: [true, false, false, false, false, false, false],
        buttonTimersMax: [new Decimal(60),new Decimal(180),new Decimal(300),new Decimal(5),new Decimal(1200),new Decimal(3600),new Decimal(14400),new Decimal(86400),],
        buttonTimers: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        buttonBaseXP: [new Decimal(1),new Decimal(2),new Decimal(4),new Decimal(0.04),new Decimal(25),new Decimal(80),new Decimal(220),new Decimal(666),],

        petsUnlocked: false,
        
        //petButtons
        petButtonUnlocks: [false, false, false, false],
        petButtonTimersMax: [new Decimal(900), new Decimal(2700), new Decimal(5400), new Decimal(21600)],
        petButtonTimers: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],

        //pets
        lockedImg: "<img src='resources/secret.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        petDisplay: ["","","","","","",""],
        petDisplayIndex: new Decimal(-1),

        commonPetUnlocks: [false, false, false, false, false, false, false],
        commonPetLevels: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        commonPetAmounts: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        commonPetReq: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
        commonPetImage: ["<img src='resources/gwaCommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/eggCommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/unsmithCommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/checkpointCommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/slaxCommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/spiderCommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/blobCommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>"],
        commonPetEffects: [[new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),],
         [new Decimal(1),new Decimal(1)], [new Decimal(1),new Decimal(1)], [new Decimal(1),new Decimal(1)], [new Decimal(1),new Decimal(1)], [new Decimal(1),]],

        uncommonPetDisplay: ["","","","","","","",],
        uncommonPetDisplayIndex: new Decimal(-1),

        uncommonPetUnlocks: [false, false, false, false, false, false, false],
        uncommonPetLevels: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),new Decimal(0), new Decimal(0),],
        uncommonPetAmounts: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),new Decimal(0), new Decimal(0),],
        uncommonPetReq: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),],
        uncommonPetImage: ["<img src='resources/testeUncommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        ],
        uncommonPetEffects: [[new Decimal(1), new Decimal(1),new Decimal(1),], [new Decimal(1), new Decimal(1),new Decimal(1),], [new Decimal(1), new Decimal(1),new Decimal(1),],
        [new Decimal(1), new Decimal(1),new Decimal(1),], [new Decimal(1), new Decimal(1),new Decimal(1),], [new Decimal(1), new Decimal(1),new Decimal(1),], [new Decimal(1), new Decimal(1),new Decimal(1),]],

        rarePetDisplay: ["","","","","",],
        rarePetDisplayIndex: new Decimal(-1),

        rarePetUnlocks: [false, false, false, false, false],
        rarePetLevels: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        rarePetAmounts: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        rarePetReq: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
        rarePetImage: ["<img src='resources/novaRarePet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/diceRarePet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/ufoRarePet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/goofyAhhThingRarePet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
    ],
        rarePetEffects: [[new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),]],

        petPoints: new Decimal(0),
        rarePetPointBase: [new Decimal(1),new Decimal(0.1),new Decimal(12),new Decimal(180),new Decimal(4),],
        rarePetButtonTimersMax: [new Decimal(40), new Decimal(20), new Decimal(600), new Decimal(18000), new Decimal(180)],
        rarePetButtonTimers: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],

        lastDicePetRoll: new Decimal(0),
        dicePetRoll: new Decimal(0),
        highestDicePetCombo: new Decimal(0),
        dicePetCombo: new Decimal(0),
        dicePetPointsGain: new Decimal(0),

        evolutionShards: new Decimal(0),
        viewingEvolved: [false, false, false,],
        evolvedLevels: [new Decimal(0), new Decimal(0),new Decimal(0),],
        evolvedReq: [new Decimal(2), new Decimal(3), new Decimal(4),],
        evolvedEffects: [[new Decimal(1),new Decimal(0),], [new Decimal(1),new Decimal(0),], [new Decimal(1),new Decimal(1),]],

        //xpboost
        XPBoostUnlock: false,

        XPBoost: new Decimal(1),
        XPBoostUnlocks: [true],
        XPBoostBase: [new Decimal(0.2),],
        XPBoostTimers: [new Decimal(0),],
        XPBoostTimersMax: [new Decimal(10800),],
        XPBoostReq: [new Decimal(100),],

        //chal 7
        lossRate: new Decimal(0),
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

        if (player.points.gt(1e100) && !inChallenge("ip", 13))
        {
            player.cb.effectActivate = true
        } else
        { 
            player.cb.effectActivate = false
        }

        player.cb.req = player.cb.level.pow(1.2).add(4).floor()
        player.cb.req = player.cb.req.div(player.cb.uncommonPetEffects[2][2])
        player.cb.req = player.cb.req.div(player.cb.rarePetEffects[3][1])

        for (let i = 0; i < player.cb.buttonTimers.length; i++)
        {
            player.cb.buttonTimers[i] = player.cb.buttonTimers[i].sub(onepersec.mul(delta))
        }

        if (player.cb.xp.gte(player.cb.req))
        {
            layers.cb.levelup();
        }

        player.cb.levelEffect = player.cb.level.pow(3).pow(player.d.dicePointsEffect)

        if (player.cb.level.gte(3))
        [
            player.cb.buttonUnlocks[1] = true
        ]
        if (player.cb.level.gte(6))
        [
            player.cb.buttonUnlocks[2] = true
        ]
        if (hasMilestone("r", 17))
        [
            player.cb.buttonUnlocks[3] = true
        ]
        if (player.cb.level.gte(15))
        [
            player.cb.buttonUnlocks[4] = true
        ]
        if (player.cb.level.gte(25))
        [
            player.cb.petButtonUnlocks[1] = true
        ]
        if (player.cb.level.gte(50))
        [
            player.cb.buttonUnlocks[5] = true
        ]
        if (player.cb.level.gte(65))
        [
            player.cb.buttonUnlocks[6] = true
        ]
        if (player.cb.level.gte(75))
        [
            player.cb.petButtonUnlocks[2] = true
        ]
        if (player.cb.level.gte(100) && hasUpgrade("ip", 31))
        [
            player.cb.XPBoostUnlock = true
        ]
        if (player.cb.level.gte(125))
        [
            player.cb.petButtonUnlocks[3] = true
        ]
        if (player.cb.level.gte(150))
        [
            player.cb.buttonUnlocks[7] = true
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
            if (player.rf.abilityTimers[6].gt(0)) player.cb.buttonTimersMax[i] = player.cb.buttonTimersMax[i].div(1.5)
        }

        //Pet
        if (player.cb.level.gte(10))
        {
            player.cb.petButtonUnlocks[0] = true 
        }
        
        player.cb.petButtonTimersMax = [new Decimal(900), new Decimal(2700), new Decimal(5400), new Decimal(28800)]
        for (let i = 0; i < player.cb.petButtonTimersMax.length; i++)
        {
            player.cb.petButtonTimersMax[i] = player.cb.petButtonTimersMax[i].div(player.cb.commonPetEffects[4][0])
            player.cb.petButtonTimersMax[i] = player.cb.petButtonTimersMax[i].div(player.cb.uncommonPetEffects[1][2])
            player.cb.petButtonTimersMax[i] = player.cb.petButtonTimersMax[i].div(buyableEffect("ev0", 13))
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
        ]

        player.cb.lockedImg = "<img src='resources/secret.png'style='width:calc(125%);height:calc(125%);margin:-20%'></img>"

        player.cb.commonPetImage = ["<img src='resources/gwaCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/eggCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/unsmithCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/checkpointCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/slaxCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/spiderCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/blobCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
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
        ]

        player.cb.uncommonPetImage = ["<img src='resources/testeUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/starUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/normalFaceUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/sharkUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/eyeUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/clockUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/trollUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
    ]

        player.cb.uncommonPetReq = [
            player.cb.uncommonPetLevels[0].add(1),
            player.cb.uncommonPetLevels[1].mul(1.3).add(1).floor(),
            player.cb.uncommonPetLevels[2].mul(1.7).add(1).floor(),
            player.cb.uncommonPetLevels[3].mul(2).add(1).floor(),
            player.cb.uncommonPetLevels[4].mul(2.2).add(1).floor(),
            player.cb.uncommonPetLevels[5].mul(1.6).add(1).floor(),
            player.cb.uncommonPetLevels[6].mul(1.6).add(1).floor(),
        ]

        if (((player.points.gte(1e100) && !inChallenge("ip", 13)) || hasMilestone("ip", 24)) || (hasUpgrade("de", 13) && inChallenge("tad", 11)))
        {
        player.cb.uncommonPetEffects = [
            [player.cb.uncommonPetLevels[0].pow(1.2).div(2).add(1), player.cb.uncommonPetLevels[0].pow(1.25).div(1.5).add(1), player.cb.uncommonPetLevels[0].pow(1.27).add(1),],
            [player.cb.uncommonPetLevels[1].pow(1.3).div(1.6).add(1), player.cb.uncommonPetLevels[1].pow(1.6).div(1.3).add(1), player.cb.uncommonPetLevels[1].mul(0.01).add(1),], //lines of code, leaves, check back time
            [player.cb.uncommonPetLevels[2].pow(1.7).add(1), player.cb.uncommonPetLevels[2].pow(1.4).add(1), player.cb.uncommonPetLevels[2].mul(0.02).pow(0.95).add(1),], //tree req, mod req, check back level req
            [player.cb.uncommonPetLevels[3].pow(2).mul(5).add(1).pow(player.cb.evolvedEffects[1][0]), player.cb.uncommonPetLevels[3].pow(1.87).mul(3).add(1).pow(player.cb.evolvedEffects[1][0]), player.cb.uncommonPetLevels[3].pow(1.75).mul(2).add(1).pow(player.cb.evolvedEffects[1][0]),], //rank req, tier req, tetr req
            [player.cb.uncommonPetLevels[4].mul(0.05).add(1),], //check back xp
            [player.cb.uncommonPetLevels[5].mul(0.2).add(1),player.cb.uncommonPetLevels[5].mul(0.2).add(1),player.cb.uncommonPetLevels[5].mul(0.2).add(1),], //1st, 3rd, 5th
            [player.cb.uncommonPetLevels[6].mul(0.2).add(1),player.cb.uncommonPetLevels[6].mul(0.2).add(1),player.cb.uncommonPetLevels[6].mul(0.2).add(1),], //2nd, 4th, 6th
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
        ]

        player.cb.rarePetImage = [
            "<img src='resources/novaRarePet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/diceRarePet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/ufoRarePet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/goofyAhhThingRarePet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/antimatterRarePet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        ]

        player.cb.rarePetReq = [
            player.cb.rarePetLevels[0].add(1),
            player.cb.rarePetLevels[1].pow(1.4).add(1).floor(),
            player.cb.rarePetLevels[2].pow(1.4).add(1).floor(),
            player.cb.rarePetLevels[3].pow(1.2).add(1).floor(),
            player.cb.rarePetLevels[4].pow(1.25).add(1).floor(),
        ]

        if (((player.points.gte(1e100) && !inChallenge("ip", 13)) || hasMilestone("ip", 24)) || (hasUpgrade("de", 13) && inChallenge("tad", 11)))
        {
        player.cb.rarePetEffects = [
            [player.g.grass.pow(0.02).div(2).add(1).pow(player.cb.rarePetLevels[0].pow(0.4)), player.cb.level.mul(0.001).mul(player.cb.rarePetLevels[0]).add(1),], //Fertilizer based on Grass, XP based on Level
            [player.cb.highestDicePetCombo.add(1).pow(player.cb.rarePetLevels[1].pow(0.3)), player.d.dicePoints.pow(0.1).mul(player.cb.rarePetLevels[1].pow(1.2)).add(1),], //Dice points based on combo, Mods based on dice points
            [player.cb.petPoints.pow(0.7).mul(0.1).add(1).pow(player.cb.rarePetLevels[2].pow(0.25)), player.cb.rarePetLevels[2].mul(0.04).add(1)], //Rocket Fuel based on pet points, Golden grass spawn time
            [player.cb.evolutionShards.pow(0.85).mul(0.6).add(1).pow(player.cb.rarePetLevels[3].pow(0.3)), player.cb.rarePetLevels[3].mul(0.03).add(1)], //Grasshoppers based on evo shards, Level Req
            [player.in.infinities.pow(0.55).mul(0.1).add(1).pow(player.cb.rarePetLevels[4].pow(0.25)), player.cb.rarePetLevels[4].pow(1.1).add(1)], //Antimatter dimensions based on infinities, golden grass
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
 0       }   

        player.cb.rarePetButtonTimersMax = [new Decimal(40), new Decimal(20), new Decimal(900), new Decimal(18000), new Decimal(180)]
        for (let i = 0; i < player.cb.rarePetButtonTimersMax.length; i++)
        {
            player.cb.rarePetButtonTimersMax[i] = player.cb.rarePetButtonTimersMax[i].div(buyableEffect("ev0", 14))
            player.cb.rarePetButtonTimersMax[i] = player.cb.rarePetButtonTimersMax[i].div(player.cb.evolvedEffects[2][0])
        }
        for (let i = 0; i < player.cb.rarePetButtonTimers.length; i++)
        {
            player.cb.rarePetButtonTimers[i] = player.cb.rarePetButtonTimers[i].sub(onepersec.mul(delta))
        }

        player.cb.rarePetPointBase = [new Decimal(2), new Decimal(0.25), new Decimal(12), new Decimal(100), new Decimal(4)]
        for (let i = 0; i < player.cb.rarePetPointBase.length; i++)
        {
            player.cb.rarePetPointBase[i] = player.cb.rarePetPointBase[i].mul(player.cb.evolvedEffects[1][1])
            player.cb.rarePetPointBase[i] = player.cb.rarePetPointBase[i].mul(buyableEffect("cb", 14))
        }
        player.cb.rarePetPointBase[0] = player.cb.rarePetPointBase[0].mul(player.cb.rarePetLevels[0].mul(0.5))
        player.cb.rarePetPointBase[1] = player.cb.rarePetPointBase[1].mul(player.cb.rarePetLevels[1].mul(0.5))
        player.cb.rarePetPointBase[2] = player.cb.rarePetPointBase[2].mul(player.cb.rarePetLevels[2].mul(0.5).add(1))
        player.cb.rarePetPointBase[3] = player.cb.rarePetPointBase[3].mul(player.cb.rarePetLevels[3].mul(0.1).add(1))
        player.cb.rarePetPointBase[4] = player.cb.rarePetPointBase[4].mul(player.cb.rarePetLevels[4].mul(0.6).add(1))

        if (player.cb.dicePetCombo > player.cb.highestDicePetCombo)
        {
            player.cb.highestDicePetCombo = player.cb.dicePetCombo
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

        //EVOS


        player.cb.evolvedReq = [
            player.cb.evolvedLevels[0].add(2),
            player.cb.evolvedLevels[1].pow(0.8).add(3),
            player.cb.evolvedLevels[2].pow(0.7).add(4),
        ]

        player.cb.evolvedEffects = [
            [player.cb.evolvedLevels[0].div(20).add(1), player.cb.evolvedLevels[0].pow(1.15),],
            [player.cb.evolvedLevels[1].div(15).add(1), player.cb.evolvedLevels[1].mul(0.03).add(1),],
            [player.cb.evolvedLevels[2].mul(0.02).add(1), player.cb.evolvedLevels[2].mul(0.03).add(1),],
        ]

        //xpboost

        player.cb.XPBoostBase = [new Decimal(0.2),]
        for (let i = 0; i < player.cb.XPBoostBase.length; i++)
        {
            player.cb.XPBoostBase[i] = player.cb.XPBoostBase[i].mul(player.cb.level.div(100).pow(0.6))
            player.cb.XPBoostBase[i] = player.cb.XPBoostBase[i].mul(player.cb.evolvedEffects[2][1])
            player.cb.XPBoostBase[i] = player.cb.XPBoostBase[i].mul(player.cb.commonPetEffects[6][0])
            player.cb.XPBoostBase[i] = player.cb.XPBoostBase[i].mul(buyableEffect("cb", 13))
        }

        player.cb.XPBoostReq = [new Decimal(100)]
        player.cb.XPBoostTimersMax = [new Decimal(10800)]
        for (let i = 0; i < player.cb.XPBoostTimersMax.length; i++)
        {
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
    },
    levelup()
    {
        let leftover = new Decimal(0)
        leftover = player.cb.xp.sub(player.cb.req)
        player.cb.level = player.cb.level.add(1)
        player.cb.xp = new Decimal(0)
        player.cb.xp = player.cb.xp.add(leftover)
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
        11: {
            title() { return player.cb.buttonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[0]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[0].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[0].lt(0) },
            unlocked() { return player.cb.buttonUnlocks[0] },
            tooltip() { return player.cb.level.gte(35) ? "Evo Shard Rarity: 0.5%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[0].mul(player.cb.xpMult))
                player.cb.buttonTimers[0] = player.cb.buttonTimersMax[0]

                if (player.cb.level.gt(35))
                {
                    let random = getRandomInt(200)
                    if (random == 1)
                    {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        callAlert("You gained an Evolution Shard! (0.5%)", "resources/evoShard.png");
                    }
                }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        12: {
            title() { return player.cb.buttonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[1]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[1].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[1].lt(0) },
            unlocked() { return player.cb.buttonUnlocks[1] },
            tooltip() { return player.cb.level.gte(35) ? "Evo Shard Rarity: 1%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[1].mul(player.cb.xpMult))
                player.cb.buttonTimers[1] = player.cb.buttonTimersMax[1]

                if (player.cb.level.gt(35))
                {
                    let random = getRandomInt(100)
                    if (random == 1)
                    {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        callAlert("You gained an Evolution Shard! (1%)", "resources/evoShard.png");
                    }
                }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        13: {
            title() { return player.cb.buttonTimers[2].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[2]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[2].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[2].lt(0) },
            unlocked() { return player.cb.buttonUnlocks[2] },
            tooltip() { return player.cb.level.gte(35) ? "Evo Shard Rarity: 2%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[2].mul(player.cb.xpMult))
                player.cb.buttonTimers[2] = player.cb.buttonTimersMax[2]

                if (player.cb.level.gt(35))
                {
                    let random = getRandomInt(50)
                    if (random == 1)
                    {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        callAlert("You gained an Evolution Shard! (2%)", "resources/evoShard.png");
                    }
                }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        14: {
            title() { return player.cb.buttonTimers[3].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[3]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[3].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[3].lt(0) },
            unlocked() { return player.cb.buttonUnlocks[3] },
            tooltip() { return player.cb.level.gte(35) ? "Evo Shard Rarity: 0.2%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[3].mul(player.cb.xpMult))
                player.cb.buttonTimers[3] = player.cb.buttonTimersMax[3]

                if (player.cb.level.gt(35))
                {
                    let random = getRandomInt(500)
                    if (random == 1)
                    {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        callAlert("You gained an Evolution Shard! (0.2%)", "resources/evoShard.png");
                    }
                }
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
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        16: {
            title() { return player.cb.buttonTimers[4].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[4]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[4].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[4].lt(0) },
            unlocked() { return player.cb.buttonUnlocks[4] },
            tooltip() { return player.cb.level.gte(35) ? "Evo Shard Rarity: 5%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[4].mul(player.cb.xpMult))
                player.cb.buttonTimers[4] = player.cb.buttonTimersMax[4]

                if (player.cb.level.gt(35))
                {
                    let random = getRandomInt(20)
                    if (random == 1)
                    {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        callAlert("You gained an Evolution Shard! (5%)", "resources/evoShard.png");
                    }
                }
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
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        18: {
            title() { return player.cb.rarePetButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.rarePetButtonTimers[0]) + "." : "<h3>+" + format(player.cb.rarePetPointBase[0]) + " Pet Points."},
            canClick() { return player.cb.rarePetButtonTimers[0].lt(0) },
            unlocked() { return player.cb.rarePetDisplayIndex == 0 },
            onClick() {
                player.cb.petPoints = player.cb.petPoints.add(player.cb.rarePetPointBase[0])
                player.cb.rarePetButtonTimers[0] = player.cb.rarePetButtonTimersMax[0]
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "0%" },
        },
        19: {
            title() { return player.cb.rarePetButtonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.rarePetButtonTimers[1]) + "." : "<h3>Roll for Pet Points!"},
            canClick() { return player.cb.rarePetButtonTimers[1].lt(0) },
            unlocked() { return player.cb.rarePetDisplayIndex == 1 },
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
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "0%" },
        },
        21: {
            title() { return player.cb.buttonTimers[5].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[5]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[5].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[5].lt(0) },
            unlocked() { return player.cb.buttonUnlocks[5] },
            tooltip() { return player.cb.level.gte(35) ? "Evo Shard Rarity: 20%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[5].mul(player.cb.xpMult))
                player.cb.buttonTimers[5] = player.cb.buttonTimersMax[5]

                if (player.cb.level.gt(35))
                {
                    let random = getRandomInt(5)
                    if (random == 1)
                    {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        callAlert("You gained an Evolution Shard! (20%)", "resources/evoShard.png");
                    }
                }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        22: {
            title() { return player.cb.rarePetButtonTimers[2].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.rarePetButtonTimers[2]) + "." : "<h3>+" + format(player.cb.rarePetPointBase[2]) + " Pet Points."},
            canClick() { return player.cb.rarePetButtonTimers[2].lt(0) },
            tooltip() { return "Also subtract 5 minutes off the shop reset timer :)"},
            unlocked() { return player.cb.rarePetDisplayIndex == 2 },
            onClick() {
                player.cb.petPoints = player.cb.petPoints.add(player.cb.rarePetPointBase[2])
                player.ps.priceResetTimer = player.ps.priceResetTimer.sub(300)
                player.cb.rarePetButtonTimers[2] = player.cb.rarePetButtonTimersMax[2]
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "0%" },
        },
        23: {
            title() { return player.cb.buttonTimers[6].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[6]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[6].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[6].lt(0) },
            unlocked() { return player.cb.buttonUnlocks[6] },
            tooltip() { return player.cb.level.gte(35) ? "Evo Shard Rarity: 50%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[6].mul(player.cb.xpMult))
                player.cb.buttonTimers[6] = player.cb.buttonTimersMax[6]

                if (player.cb.level.gt(35))
                {
                    let random = getRandomInt(2)
                    if (random == 1)
                    {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        callAlert("You gained an Evolution Shard! (50%)", "resources/evoShard.png");
                    }
                }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        24: {
            title() { return player.cb.rarePetButtonTimers[3].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.rarePetButtonTimers[3]) + "." : "<h3>+" + format(player.cb.rarePetPointBase[3]) + " Pet Points."},
            canClick() { return player.cb.rarePetButtonTimers[3].lt(0) },
            tooltip() { return "25% chance for an evo shard"},
            unlocked() { return player.cb.rarePetDisplayIndex == 3 },
            onClick() {
                player.cb.petPoints = player.cb.petPoints.add(player.cb.rarePetPointBase[3])
                player.cb.rarePetButtonTimers[3] = player.cb.rarePetButtonTimersMax[3]

                let random = getRandomInt(4)
                if (random == 1)
                {
                    player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                    callAlert("You gained an Evolution Shard! (25%)", "resources/evoShard.png");
                }
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
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        26: {
            title() { return player.cb.XPBoostTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.XPBoostTimers[0]) + "." : "<h3>+" + format(player.cb.XPBoostBase[0]) + " XP Boost."},
            canClick() { return player.cb.XPBoostTimers[0].lt(0) },
            unlocked() { return player.cb.XPBoostUnlocks[0] },
            //tooltip() { return player.cb.level.gte(35) ? "Evo Shard Rarity: 0.5%" : ""},
            onClick() {
                if (player.cb.level.gte(player.cb.XPBoostReq[0]))
                {
                    player.cb.XPBoost = player.cb.XPBoost.add(player.cb.XPBoostBase[0])
                    player.cb.XPBoostTimers[0] = player.cb.XPBoostTimersMax[0]
    
                    player.cb.level = new Decimal(1)
                    player.cb.xp = new Decimal(0)
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
            unlocked() { return player.cb.rarePetDisplayIndex == 4 },
            onClick() {
                player.cb.petPoints = player.cb.petPoints.add(player.cb.rarePetPointBase[4])
                player.cb.rarePetButtonTimers[4] = player.cb.rarePetButtonTimersMax[4]
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
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        29: {
            title() { return player.cb.buttonTimers[7].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[7]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[7].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[7].lt(0) },
            unlocked() { return player.cb.buttonUnlocks[7] },
            tooltip() { return player.cb.level.gte(35) ? "Evo Shard Rarity: 98%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[7].mul(player.cb.xpMult))
                player.cb.buttonTimers[7] = player.cb.buttonTimersMax[7]

                if (player.cb.level.gt(35))
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
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        //PETS
        101: {
            title() { return player.cb.commonPetAmounts[0].gt(0) || player.cb.commonPetLevels[0].gt(0) ? player.cb.commonPetImage[0] : player.cb.lockedImg},
            canClick() { return player.cb.commonPetAmounts[0].gt(0) || player.cb.commonPetLevels[0].gt(0) },
            unlocked() { return true },
            tooltip() { return player.cb.commonPetAmounts[0].gt(0) || player.cb.commonPetLevels[0].gt(0) ? "<h3>x" + format(player.cb.commonPetEffects[0][0]) + " to points.<br>x" + format(player.cb.commonPetEffects[0][1]) + " to check back xp.": ""},
            onClick() {
                player.cb.petDisplayIndex = new Decimal(0)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        102: {
            title() { return player.cb.commonPetAmounts[1].gt(0) || player.cb.commonPetLevels[1].gt(0) ? player.cb.commonPetImage[1] : player.cb.lockedImg},
            canClick() { return player.cb.commonPetAmounts[1].gt(0) || player.cb.commonPetLevels[1].gt(0)},
            tooltip() { return player.cb.commonPetAmounts[1].gt(0) || player.cb.commonPetLevels[1].gt(0) ? "<h3>x" + format(player.cb.commonPetEffects[1][0]) + " to prestige points.<br>x" + format(player.cb.commonPetEffects[1][1]) + " to tree gain.": ""},
            unlocked() { return true },
            onClick() {
                player.cb.petDisplayIndex = new Decimal(1)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        103: {
            title() { return player.cb.commonPetAmounts[2].gt(0) || player.cb.commonPetLevels[2].gt(0) ? player.cb.commonPetImage[2] : player.cb.lockedImg},
            canClick() { return player.cb.commonPetAmounts[2].gt(0) || player.cb.commonPetLevels[2].gt(0)},
            unlocked() { return true },
            tooltip() { return player.cb.commonPetAmounts[2].gt(0) && !player.cb.viewingEvolved[0] || player.cb.commonPetLevels[2].gt(0) && !player.cb.viewingEvolved[0] ? "<h3>x" + format(player.cb.commonPetEffects[2][0]) + " to factor power.<br>x" + format(player.cb.commonPetEffects[2][1]) + " to mod gain." : player.cb.viewingEvolved[0] ? "^" + format(player.cb.evolvedEffects[0][0]) + " to unsmith effect.<br>+" + format(player.cb.evolvedEffects[0][1]) + " base coin dust gain per hour." : ""},
            onClick() {
                player.cb.petDisplayIndex = new Decimal(2)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        104: {
            title() { return player.cb.commonPetAmounts[3].gt(0) || player.cb.commonPetLevels[3].gt(0)? player.cb.commonPetImage[3] : player.cb.lockedImg},
            canClick() { return player.cb.commonPetAmounts[3].gt(0) || player.cb.commonPetLevels[3].gt(0)},
            tooltip() { return player.cb.commonPetAmounts[3].gt(0) || player.cb.commonPetLevels[3].gt(0) ? "<h3>x" + format(player.cb.commonPetEffects[3][0]) + " to grass value.<br>x" + format(player.cb.commonPetEffects[3][1]) + " to golden grass value.": ""},
            unlocked() { return true },
            onClick() {
                player.cb.petDisplayIndex = new Decimal(3)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        105: {
            title() { return player.cb.commonPetAmounts[4].gt(0) || player.cb.commonPetLevels[4].gt(0)? player.cb.commonPetImage[4] : player.cb.lockedImg },
            canClick() { return player.cb.commonPetAmounts[4].gt(0) || player.cb.commonPetLevels[4].gt(0)},
            tooltip() { return player.cb.commonPetAmounts[4].gt(0) || player.cb.commonPetLevels[4].gt(0) ? "<h3>/" + format(player.cb.commonPetEffects[4][0]) + " to pet button cooldown.<br>/" + format(player.cb.commonPetEffects[4][1]) + " to xp button cooldown.": ""},
            unlocked() { return true },
            onClick() {
                player.cb.petDisplayIndex = new Decimal(4)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        106: {
            title() { return "Level Up"},
            canClick() { return player.cb.commonPetAmounts[0].gte(player.cb.commonPetReq[0]) },
            unlocked() { return player.cb.petDisplayIndex == 0 },
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
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        113: {
            title() { return "Level Up"},
            canClick() { return player.cb.uncommonPetAmounts[0].gte(player.cb.uncommonPetReq[0]) },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 0 },
            onClick() {
                player.cb.uncommonPetAmounts[0] = player.cb.uncommonPetAmounts[0].sub(player.cb.uncommonPetReq[0])
                player.cb.uncommonPetLevels[0] = player.cb.uncommonPetLevels[0].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        114: {
            title() { return player.cb.uncommonPetAmounts[1].gt(0) || player.cb.uncommonPetLevels[1].gt(0) ? player.cb.uncommonPetImage[1] : player.cb.lockedImg},
            canClick() { return player.cb.uncommonPetAmounts[1].gt(0) || player.cb.uncommonPetLevels[1].gt(0) },
            unlocked() { return true },
            tooltip() { return player.cb.uncommonPetAmounts[1].gt(0) || player.cb.uncommonPetLevels[1].gt(0) ? "<h3>x" + format(player.cb.uncommonPetEffects[1][0]) + " to lines of code.<br>x" + format(player.cb.uncommonPetEffects[1][1]) + " to leaves.<br>/" + format(player.cb.uncommonPetEffects[1][2]) + " to all check back button cooldowns.": ""},
            onClick() {
                player.cb.uncommonPetDisplayIndex = new Decimal(1)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        115: {
            title() { return player.cb.uncommonPetAmounts[2].gt(0) || player.cb.uncommonPetLevels[2].gt(0) ? player.cb.uncommonPetImage[2] : player.cb.lockedImg},
            canClick() { return player.cb.uncommonPetAmounts[2].gt(0) || player.cb.uncommonPetLevels[2].gt(0) },
            unlocked() { return true },
            tooltip() { return player.cb.uncommonPetAmounts[2].gt(0)  && !player.cb.viewingEvolved[1]|| player.cb.uncommonPetLevels[2].gt(0)  && !player.cb.viewingEvolved[1]? "<h3>/" + format(player.cb.uncommonPetEffects[2][0]) + " to tree requirement.<br>/" + format(player.cb.uncommonPetEffects[2][1]) + " to mod requirement.<br>/" + format(player.cb.uncommonPetEffects[2][2]) + " to check back requirement.": "/" + format(player.cb.evolvedEffects[2][0]) + " to rare pet cooldown.<br>x" + format(player.cb.evolvedEffects[2][1]) + " to XPBoost." },
            onClick() {
                player.cb.uncommonPetDisplayIndex = new Decimal(2)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        116: {
            title() { return player.cb.uncommonPetAmounts[3].gt(0) || player.cb.uncommonPetLevels[3].gt(0) ? player.cb.uncommonPetImage[3] : player.cb.lockedImg},
            canClick() { return player.cb.uncommonPetAmounts[3].gt(0) || player.cb.uncommonPetLevels[3].gt(0) },
            unlocked() { return true },
            tooltip() { return player.cb.uncommonPetAmounts[3].gt(0)  && !player.cb.viewingEvolved[1] || player.cb.uncommonPetLevels[3].gt(0)  && !player.cb.viewingEvolved[1] ? "<h3>/" + format(player.cb.uncommonPetEffects[3][0]) + " to rank requirement.<br>/" + format(player.cb.uncommonPetEffects[3][1]) + " to tier requirement.<br>/" + format(player.cb.uncommonPetEffects[3][2]) + " to tetr requirement.": "^" + format(player.cb.evolvedEffects[1][0]) + " to shark effect.<br>x" + format(player.cb.evolvedEffects[1][1]) + " to pet points." },
            onClick() {
                player.cb.uncommonPetDisplayIndex = new Decimal(3)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        117: {
            title() { return player.cb.uncommonPetAmounts[4].gt(0) || player.cb.uncommonPetLevels[4].gt(0) ? player.cb.uncommonPetImage[4] : player.cb.lockedImg},
            canClick() { return player.cb.uncommonPetAmounts[4].gt(0) || player.cb.uncommonPetLevels[4].gt(0) },
            unlocked() { return true },
            tooltip() { return player.cb.uncommonPetAmounts[4].gt(0) || player.cb.uncommonPetLevels[4].gt(0) ? "<h3>x" + format(player.cb.uncommonPetEffects[4][0]) + " to check back xp" : ""},
            onClick() {
                player.cb.uncommonPetDisplayIndex = new Decimal(4)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        118: {
            title() { return "Level Up"},
            canClick() { return player.cb.uncommonPetAmounts[1].gte(player.cb.uncommonPetReq[1]) },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 1 },
            onClick() {
                player.cb.uncommonPetAmounts[1] = player.cb.uncommonPetAmounts[1].sub(player.cb.uncommonPetReq[1])
                player.cb.uncommonPetLevels[1] = player.cb.uncommonPetLevels[1].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        119: {
            title() { return "Level Up"},
            canClick() { return player.cb.uncommonPetAmounts[2].gte(player.cb.uncommonPetReq[2]) },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 2 },
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
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
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
            tooltip() { return player.cb.rarePetAmounts[1].gt(0) || player.cb.rarePetLevels[1].gt(0) ? "<h3>x" + format(player.cb.rarePetEffects[1][0]) + " to dice points (based on highest combo).<br>x" + format(player.cb.rarePetEffects[1][1]) + " to mods (based on dice points).": ""},
            onClick() {
                player.cb.rarePetDisplayIndex = new Decimal(1)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        127: {
            title() { return "Level Up"},
            canClick() { return player.cb.rarePetAmounts[1].gte(player.cb.rarePetReq[1]) },
            unlocked() { return player.cb.rarePetDisplayIndex == 1 },
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
            tooltip() { return player.cb.rarePetAmounts[2].gt(0) || player.cb.rarePetLevels[2].gt(0) ? "<h3>x" + format(player.cb.rarePetEffects[2][0]) + " to rocket fuel (based on pet points).<br>/" + format(player.cb.rarePetEffects[2][1]) + " to golden grass spawn time.": ""},
            onClick() {
                player.cb.rarePetDisplayIndex = new Decimal(2)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        129: {
            title() { return "Level Up"},
            canClick() { return player.cb.rarePetAmounts[2].gte(player.cb.rarePetReq[2]) },
            unlocked() { return player.cb.rarePetDisplayIndex == 2 },
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
            tooltip() { return player.cb.rarePetAmounts[3].gt(0) || player.cb.rarePetLevels[3].gt(0) ? "<h3>x" + format(player.cb.rarePetEffects[3][0]) + " to grasshoppers (based on evo shards).<br>/" + format(player.cb.rarePetEffects[3][1]) + " to check back requirement.": ""},
            onClick() {
                player.cb.rarePetDisplayIndex = new Decimal(3)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
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
            tooltip() { return player.cb.commonPetAmounts[5].gt(0) || player.cb.commonPetLevels[5].gt(0) ? "<h3>x" + format(player.cb.commonPetEffects[5][0]) + " to antimatter.<br>x" + format(player.cb.commonPetEffects[5][1]) + " to 7th dimensions.": ""},
            unlocked() { return true },
            onClick() {
                player.cb.petDisplayIndex = new Decimal(5)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        134: {
            title() { return player.cb.commonPetAmounts[6].gt(0) || player.cb.commonPetLevels[6].gt(0)? player.cb.commonPetImage[6] : player.cb.lockedImg },
            canClick() { return player.cb.commonPetAmounts[6].gt(0) || player.cb.commonPetLevels[6].gt(0)},
            tooltip() { return player.cb.commonPetAmounts[6].gt(0) || player.cb.commonPetLevels[6].gt(0) ? "<h3>x" + format(player.cb.commonPetEffects[6][0]) + " to XPBoost." : ""},
            unlocked() { return true },
            onClick() {
                player.cb.petDisplayIndex = new Decimal(6)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        135: {
            title() { return "Level Up"},
            canClick() { return player.cb.commonPetAmounts[5].gte(player.cb.commonPetReq[5]) },
            unlocked() { return player.cb.petDisplayIndex == 5},
            onClick() {
                player.cb.commonPetAmounts[5] = player.cb.commonPetAmounts[5].sub(player.cb.commonPetReq[5])
                player.cb.commonPetLevels[5] = player.cb.commonPetLevels[5].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        136: {
            title() { return "Level Up"},
            canClick() { return player.cb.commonPetAmounts[6].gte(player.cb.commonPetReq[6]) },
            unlocked() { return player.cb.petDisplayIndex == 6},
            onClick() {
                player.cb.commonPetAmounts[6] = player.cb.commonPetAmounts[6].sub(player.cb.commonPetReq[6])
                player.cb.commonPetLevels[6] = player.cb.commonPetLevels[6].add(1)
            },
            style: { width: '100px', "min-height": '50px', 'border-radius': "0%" },
        },
        137: {
            title() { return player.cb.uncommonPetAmounts[5].gt(0) || player.cb.uncommonPetLevels[5].gt(0)? player.cb.uncommonPetImage[5] : player.cb.lockedImg},
            canClick() { return player.cb.uncommonPetAmounts[5].gt(0) || player.cb.uncommonPetLevels[5].gt(0)},
            tooltip() { return player.cb.uncommonPetAmounts[5].gt(0) || player.cb.uncommonPetLevels[5].gt(0) ? "<h3>x" + format(player.cb.uncommonPetEffects[5][0]) + " to 1st dimensions.<br>x" + format(player.cb.uncommonPetEffects[5][1]) + " to 3rd dimensions.<br>x" + format(player.cb.uncommonPetEffects[5][2]) + " to 5th dimensions.": ""},
            unlocked() { return true },
            onClick() {
                player.cb.uncommonPetDisplayIndex = new Decimal(5)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        138: {
            title() { return player.cb.uncommonPetAmounts[6].gt(0) || player.cb.uncommonPetLevels[6].gt(0)? player.cb.uncommonPetImage[6] : player.cb.lockedImg},
            canClick() { return player.cb.uncommonPetAmounts[6].gt(0) || player.cb.uncommonPetLevels[6].gt(0)},
            tooltip() { return player.cb.uncommonPetAmounts[6].gt(0) || player.cb.uncommonPetLevels[6].gt(0) ? "<h3>x" + format(player.cb.uncommonPetEffects[6][0]) + " to 2nd dimensions.<br>x" + format(player.cb.uncommonPetEffects[6][1]) + " to 4th dimensions.<br>x" + format(player.cb.uncommonPetEffects[6][2]) + " to 6th dimensions.": ""},
            unlocked() { return true },
            onClick() {
                player.cb.uncommonPetDisplayIndex = new Decimal(6)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        139: {
            title() { return "Level Up"},
            canClick() { return player.cb.uncommonPetAmounts[5].gte(player.cb.uncommonPetReq[5]) },
            unlocked() { return player.cb.uncommonPetDisplayIndex == 5},
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
        style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
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
            let gainedPets = getRandomInt(4) + 7
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
            let gainedPets = getRandomInt(2) + 3
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
                player.cb.rarePetAmounts[4] = player.cb.rarePetAmounts[4].add(2);
                callAlert("You gained 2 Antimatters!", "resources/antimatterRarePet.png");
            }
            if (rng < 0.05)
            {
                player.cb.evolutionShards = player.cb.evolutionShards.add(3);
                callAlert("You gained 3 Evolution Shards!", "resources/evoShard.png");
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
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(20).floor() },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.level.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Check Back OTF Boost."
            },
            display() {
                return "which are multiplying hex 1 points, rocket fuel, and dice points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Check Back Levels."
            },
            buy() {
                let base = new Decimal(20)
                let growth = 1.4
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.level = player.cb.level.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.level, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.cb.level = player.cb.level.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(1.45).pow(x || getBuyableAmount(this.layer, this.id)).mul(30).floor() },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.level.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Check Back IP Boost."
            },
            display() {
                return "which are multiplying infinity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Check Back Levels."
            },
            buy() {
                let base = new Decimal(30)
                let growth = 1.45
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.level = player.cb.level.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.level, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.cb.level = player.cb.level.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(50).floor() },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.level.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Check Back XP Boost Boost."
            },
            display() {
                return "which are multiplying XPBoost by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Check Back Levels."
            },
            buy() {
                let base = new Decimal(50)
                let growth = 1.5
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.level = player.cb.level.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.level, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.cb.level = player.cb.level.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            cost(x) { return new Decimal(1.6).pow(x || getBuyableAmount(this.layer, this.id)).mul(80).floor() },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.cb.level.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Check Back Pet Point Boost."
            },
            display() {
                return "which are multiplying pet points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Check Back Levels."
            },
            buy() {
                let base = new Decimal(80)
                let growth = 1.6
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.cb.level = player.cb.level.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.cb.level, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.cb.level = player.cb.level.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
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
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'color': '#06366e' } },
                unlocked() { return true },
                content:
                [
                        ["raw-html", function () { return player.cb.buttonUnlocks[1] == false ?  "You will unlock something at level 3!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.cb.buttonUnlocks[2] == false && player.cb.buttonUnlocks[1] == true ?  "You will unlock something at level 6!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.cb.level.lt(10) && player.cb.buttonUnlocks[2] == true ?  "You will unlock something at level 10!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.cb.level.lt(15) && player.cb.level.gte(10) ?  "You will unlock something at level 15!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.cb.level.lt(25) && player.cb.level.gte(15) ?  "You will unlock something at level 25!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.cb.level.lt(35) && player.cb.level.gte(25) ?  "You will unlock something at level 35!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.cb.level.lt(50) && player.cb.level.gte(35) ?  "You will unlock something at level 50!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.cb.level.lt(65) && player.cb.level.gte(50) ?  "You will unlock something at level 65! (Pet shop)" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.cb.level.lt(75) && player.cb.level.gte(65) ?  "You will unlock something at level 75!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.cb.level.lt(100) && player.cb.level.gte(75) && hasUpgrade("ip", 31) ?  "You will unlock something at level 100!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.cb.level.lt(125) && player.cb.level.gte(100) && hasChallenge("ip", 12) ?  "You will unlock something at level 125!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.cb.level.lt(150) && player.cb.level.gte(125) ?  "You will unlock something at level 150!" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 14]]],
                        ["row", [["clickable", 11]]],
                        ["row", [["clickable", 12]]],
                        ["row", [["clickable", 13]]],
                        ["row", [["clickable", 16]]],
                        ["row", [["clickable", 21]]],
                        ["row", [["clickable", 23]]],
                        ["row", [["clickable", 29]]],
                        ["blank", "25px"],
                        ["row", [["clickable", 15]]],
                        ["row", [["clickable", 17]]],
                        ["row", [["clickable", 25]]],
                        ["row", [["clickable", 28]]],
                ]

            },
            "Pets": {
                buttonStyle() { return { 'color': '#06366e' } },
                unlocked() { return player.cb.level.gte(10) || player.cb.XPBoostUnlock },
                content:
                [
                    ["microtabs", "pets", { 'border-width': '0px' }],
                ]

            },
            "XPBoost": {
                buttonStyle() { return { 'color': '#06366e' } },
                unlocked() { return player.cb.XPBoostUnlock  },
                content:
                [
                        ["blank", "25px"],
                    ["raw-html", function () { return "XPBoost: <h3>" + format(player.cb.XPBoost) + "</h3>" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "XPBoost buttons will reset your check back level and xp." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 26]]],

                ]

            },
            "Evolution Shards": {
                buttonStyle() { return { 'color': '#1500bf', 'border-color': "#1500bf", 'background-image': 'linear-gradient(90deg, #d487fd, #4b79ff)',} },
                unlocked() { return player.cb.level.gte(35)|| player.cb.XPBoostUnlock  },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.evolutionShards) + "</h3> evolution shards." }, { "color": "#d487fd", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h5>(Gained from check back buttons)" }, { "color": "#d487fd", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 2]]],
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
        },
        pets: {
            "Common": {
                buttonStyle() { return { 'color': '#9bedff', 'border-color': '#9bedff'  } },
                unlocked() { return true },
                content:
                [
                        ["raw-html", function () { return player.cb.petDisplay[player.cb.petDisplayIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 106], ["clickable", 107], ["clickable", 108], ["clickable", 109], ["clickable", 111], ["clickable", 135], ["clickable", 136],  ["clickable", 201],  ["clickable", 203], ["clickable", 202], ["clickable", 204]]],
                        ["blank", "25px"],
                        ["raw-html", function () { return "Common Pets" }, { "color": "#9bedff", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 101], ["clickable", 102], ["clickable", 103], ["clickable", 104], ["clickable", 105], ["clickable", 133], ["clickable", 134]]],
                ]

            },
            "Uncommon": {
                buttonStyle() { return { 'color': '#88e688', 'border-color': '#88e688' } },
                unlocked() { return true },
                content:
                [
                    ["raw-html", function () { return player.cb.uncommonPetDisplay[player.cb.uncommonPetDisplayIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 113], ["clickable", 118], ["clickable", 119], ["clickable", 121], ["clickable", 122], ["clickable", 139],["clickable", 141],["clickable", 205],  ["clickable", 207], ["clickable", 206], ["clickable", 208], ["clickable", 209],  ["clickable", 211], ["clickable", 212], ["clickable", 213]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Uncommon Pets" }, { "color": "#88e688", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 112], ["clickable", 114], ["clickable", 115], ["clickable", 116], ["clickable", 117], ["clickable", 137], ["clickable", 138]]],
                ]

            },
            "Rare": {
                buttonStyle() { return { 'color': '#4e7cff', 'border-color': '#4e7cff' } },
                unlocked() { return player.cb.level.gte(25) || player.cb.XPBoostUnlock },
                content:
                [
                    ["raw-html", function () { return "You have <h3>" + format(player.cb.petPoints) + "</h3> pet points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.cb.rarePetDisplay[player.cb.rarePetDisplayIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 124], ["clickable", 18], ["clickable", 127], ["clickable", 19], ["clickable", 129], ["clickable", 22], ["clickable", 132], ["clickable", 24], ["clickable", 143], ["clickable", 27], ["clickable", 125]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Rare Pets" }, { "color": "#4e7cff", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 123], ["clickable", 126], ["clickable", 128], ["clickable", 131], ["clickable", 142]]],
                ]

            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are level " + formatWhole(player.cb.level) + ", which boosts celestial point gain by x" + format(player.cb.levelEffect) + "."}, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
        ["raw-html", function () { return !player.cb.effectActivate && !hasMilestone("ip", 24) ? "YOU MUST REACH 1e100 POINTS TO ACTIVATE CHECK BACK AND PET EFFECT" : ""}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return inChallenge("ip", 17) ? "You are losing " + formatWhole(player.cb.lossRate) + " xp per second." : ""}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["bar", "xpbar"]]],
                        ["blank", "25px"],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 19) || hasMilestone("ip", 12) || (hasUpgrade("de", 13) && inChallenge("tad", 11)) }
})