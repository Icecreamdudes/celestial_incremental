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
        xpBuyableMax: false,

        buttonTimersMax: [new Decimal(60),new Decimal(180),new Decimal(300),new Decimal(5),new Decimal(1200),new Decimal(3600),new Decimal(14400),new Decimal(86400),],
        buttonTimers: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        buttonBaseXP: [new Decimal(1),new Decimal(2),new Decimal(4),new Decimal(0.04),new Decimal(25),new Decimal(80),new Decimal(220),new Decimal(666),],

        petsUnlocked: false,

        //petButtons
        petButtonTimersMax: [new Decimal(900), new Decimal(2700), new Decimal(5400), new Decimal(21600), new Decimal(7200), new Decimal(36000), new Decimal(86400)],
        petButtonTimers: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],

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
        rarePetLevels: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        rarePetAmounts: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        rarePetReq: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
        rarePetImage: ["<img src='resources/novaRarePet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
            "<img src='resources/diceRarePet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
            "<img src='resources/ufoRarePet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
            "<img src='resources/goofyAhhThingRarePet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        ],
        rarePetEffects: [[new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),]],

        petPoints: new Decimal(0),
        rarePetPointBase: [new Decimal(1),new Decimal(0.1),new Decimal(12),new Decimal(180),new Decimal(4),new Decimal(25),new Decimal(0.05), new Decimal(50), new Decimal(90)],
        rarePetButtonTimersMax: [new Decimal(40), new Decimal(20), new Decimal(600), new Decimal(18000), new Decimal(180), new Decimal(1000), new Decimal(1), new Decimal(4500), new Decimal(8000),],
        rarePetButtonTimers: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],

        //epic
        epicPetUnlocks: [false, false, false, false, false, false,],
        epicPetFragments: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), /* index 3 is singularity fragments, which are used for epic pets indices 3-5 */],
        epicPetFragmentReq: [new Decimal(50), new Decimal(40), new Decimal(45), new Decimal(100), new Decimal(100), new Decimal(100),],
        epicPetLevels: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        epicPetEffects: [[new Decimal(1), new Decimal(1), new Decimal(1)],[new Decimal(1), new Decimal(1), new Decimal(1)],[new Decimal(1), new Decimal(1), new Decimal(1)],
        [new Decimal(1), new Decimal(1), new Decimal(1)],[new Decimal(1), new Decimal(1), new Decimal(1)],[new Decimal(1), new Decimal(1), new Decimal(1)],],
        epicPetImage: ["", "", "",],
        epicPetDisplay: ["","","",],
        epicPetDisplayIndex: new Decimal(0),

        //legendary
        legendaryPetGems: [new Decimal(0), new Decimal(0), new Decimal(0)],
        //red purple green

        //dice pet
        lastDicePetRoll: new Decimal(0),
        dicePetRoll: new Decimal(0),
        highestDicePetCombo: new Decimal(0),
        dicePetCombo: new Decimal(0),
        dicePetPointsGain: new Decimal(0),

        evolutionShards: new Decimal(0),
        viewingEvolved: [false, false, false, false, false, false, false, false, false, false, false,],
        evolvedLevels: [new Decimal(0), new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),],
        evolvedReq: [new Decimal(2), new Decimal(3), new Decimal(4),new Decimal(6),new Decimal(1),new Decimal(1),new Decimal(3), new Decimal(1),new Decimal(5), new Decimal(9), new Decimal(2),],
        evolvedEffects: [[new Decimal(1),new Decimal(0),], [new Decimal(1),new Decimal(0),], [new Decimal(1),new Decimal(1),], [new Decimal(1),new Decimal(1),],
        [new Decimal(1),new Decimal(1),], [new Decimal(1),new Decimal(1),], [new Decimal(1),new Decimal(1),], [new Decimal(1),new Decimal(1),], [new Decimal(1),new Decimal(1),], [new Decimal(1),new Decimal(1),new Decimal(1),],
        [new Decimal(1),new Decimal(1),new Decimal(1),],],

        //xpboost
        XPBoost: new Decimal(1),
        XPBoostBase: [new Decimal(0.2), new Decimal(0.5)],
        XPBoostTimers: [new Decimal(0), new Decimal(0),],
        XPBoostTimersMax: [new Decimal(10800), new Decimal(129600)],
        XPBoostReq: [new Decimal(100),new Decimal(500),],

        XPBoostEffect: new Decimal(1),

        //chal 7
        lossRate: new Decimal(0),

        //paragon
        paragonShards: new Decimal(0),

        //pity system
        pityEvoCurrent: new Decimal(0),
        pityParaCurrent: new Decimal(0),
        pityMax: new Decimal(200),

        //autom
        totalAutomationShards: new Decimal(0),
        automationShards: new Decimal(0),
        autoAllocateAmt: new Decimal(1),

        buttonAutomationAllocation: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        buttonAutomationTimersMax: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        buttonAutomationTimers: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],

        petAutomationAllocation: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        petAutomationTimersMax: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        petAutomationTimers: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],

        boostAutomationAllocation: [new Decimal(0), new Decimal(0)],
        boostAutomationTimersMax: [new Decimal(0), new Decimal(0)],
        boostAutomationTimers: [new Decimal(0), new Decimal(0)],

        pointAutomationAllocation: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        pointAutomationTimersMax: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        pointAutomationTimers: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],

        //cante?
        canteEnergyXPButtonBase: [new Decimal(0.2), new Decimal(0.3), new Decimal(0.5), new Decimal(0.02), new Decimal(1.4), new Decimal(2.5), new Decimal(5), new Decimal(12) ],
        canteEnergyPetButtonBase: [new Decimal(1.6), new Decimal(3), new Decimal(5.5), new Decimal(9), new Decimal(7), new Decimal(14), new Decimal(30)],
        canteEnergyXPBoostButtonBase: [new Decimal(10), new Decimal(30)],

        time: new Decimal(0), // Offline Time
        alertToggle: true
    }},
    automate() {},
    nodeStyle() {},

    tooltip: "Check Back",
    color: "#094599",
    update(delta) {
        let onepersec = new Decimal(1)
        onepersec = onepersec.mul(player.ev10.checkbackBoost)

        if (player.cb.time.gt(0)) {
            layers.cb.offlineCooldown()
        }

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
            if (player.cb.level.lt(10000)) {
                player.cb.req = player.cb.level.pow(1.2).add(4).floor()
            } else if (player.cb.level.lt(100000)) {
                player.cb.req = player.cb.level.pow(1.4).sub(335008).floor()
            } else {
                player.cb.req = player.cb.level.pow(1.6).sub(90335008).floor()
            }
            player.cb.req = player.cb.req.div(levelableEffect("pet", 203)[2])
            player.cb.req = player.cb.req.div(levelableEffect("pet", 304)[1])
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
        if (hasUpgrade("bi", 25) && (!player.po.dice)) player.cb.levelEffect = player.cb.levelEffect.pow(5)
        if (hasUpgrade("bi", 25) && (player.po.dice)) player.cb.levelEffect = player.cb.levelEffect.pow(2)
        if (hasUpgrade("s", 17)) player.cb.levelEffect = player.cb.levelEffect.pow(upgradeEffect("s", 17))
        
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
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(levelableEffect("pet", 101)[1])
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(levelableEffect("pet", 205)[0])
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(levelableEffect("pet", 301)[1])
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(player.ev0.coinDustEffect)
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(player.cb.XPBoostEffect)
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(player.d.diceEffects[12])
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(player.rm.realmModsEffect[0])
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(buyableEffect("g", 25))
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(player.cs.paragonScrapsEffect)
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(player.cop.processedCorePrimedEffects[3])
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(player.le.punchcardsPassiveEffect[6])
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(levelableEffect("pet", 406)[0])
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(player.leg.gemEffects[0])
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(buyableEffect("ep3", 12))
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
            player.cb.buttonTimersMax[i] = player.cb.buttonTimersMax[i].div(levelableEffect("pet", 105)[1])
            player.cb.buttonTimersMax[i] = player.cb.buttonTimersMax[i].div(levelableEffect("pet", 202)[2])
            player.cb.buttonTimersMax[i] = player.cb.buttonTimersMax[i].div(buyableEffect("ev0", 12))
            player.cb.buttonTimersMax[i] = player.cb.buttonTimersMax[i].div(player.le.punchcardsPassiveEffect[1])
            if (player.rf.abilityTimers[6].gt(0)) player.cb.buttonTimersMax[i] = player.cb.buttonTimersMax[i].div(1.2)
            if (hasUpgrade("ev8", 15)) player.cb.buttonTimersMax[i] = player.cb.buttonTimersMax[i].div(1.15)
            if (player.cop.processedCoreFuel.eq(8)) player.cb.buttonTimersMax[i] = player.cb.buttonTimersMax[i].div(player.cop.processedCoreInnateEffects[2])
        }

        player.cb.petButtonTimersMax = [new Decimal(900), new Decimal(2700), new Decimal(5400), new Decimal(28800), new Decimal(7200), new Decimal(42000), new Decimal(86400)]
        for (let i = 0; i < player.cb.petButtonTimersMax.length; i++)
        {
            player.cb.petButtonTimersMax[i] = player.cb.petButtonTimersMax[i].div(levelableEffect("pet", 105)[0])
            player.cb.petButtonTimersMax[i] = player.cb.petButtonTimersMax[i].div(levelableEffect("pet", 202)[2])
            player.cb.petButtonTimersMax[i] = player.cb.petButtonTimersMax[i].div(buyableEffect("ev0", 13))
            if (hasUpgrade("ev8", 12)) player.cb.petButtonTimersMax[i] = player.cb.petButtonTimersMax[i].div(1.1)
            player.cb.petButtonTimersMax[i] = player.cb.petButtonTimersMax[i].div(levelableEffect("pet", 1104)[2])
            if (player.cop.processedCoreFuel.eq(8)) player.cb.petButtonTimersMax[i] = player.cb.petButtonTimersMax[i].div(player.cop.processedCoreInnateEffects[2])
        }

        for (let i = 0; i < player.cb.petButtonTimers.length; i++) {
            player.cb.petButtonTimers[i] = player.cb.petButtonTimers[i].sub(onepersec.mul(delta))
        }

        //xpboost

        player.cb.XPBoostBase = [new Decimal(0.2),new Decimal(0.5),]
        if (player.cb.level.lt(10000)) {
            player.cb.XPBoostBase[0] = player.cb.XPBoostBase[0].mul(player.cb.level.div(100).pow(1.2))
            player.cb.XPBoostBase[1] = player.cb.XPBoostBase[1].mul(player.cb.level.div(80).pow(1.1))
        } else if (player.cb.level.lt(100000)) {
            player.cb.XPBoostBase[0] = player.cb.XPBoostBase[0].mul(player.cb.level.div(40))
            player.cb.XPBoostBase[1] = player.cb.XPBoostBase[1].mul(player.cb.level.div(50))
        } else {
            player.cb.XPBoostBase[0] = player.cb.XPBoostBase[0].mul(player.cb.level.div(16.8).pow(0.9))
            player.cb.XPBoostBase[1] = player.cb.XPBoostBase[1].mul(player.cb.level.div(21.5).pow(0.9))
        }
        for (let i = 0; i < player.cb.XPBoostBase.length; i++) {
            player.cb.XPBoostBase[i] = player.cb.XPBoostBase[i].mul(levelableEffect("pet", 1203)[1])
            player.cb.XPBoostBase[i] = player.cb.XPBoostBase[i].mul(levelableEffect("pet", 107)[0])
            player.cb.XPBoostBase[i] = player.cb.XPBoostBase[i].mul(buyableEffect("cb", 13))
            if (hasUpgrade("ev8", 16)) player.cb.XPBoostBase[i] = player.cb.XPBoostBase[i].mul(1.2)
            player.cb.XPBoostBase[i] = player.cb.XPBoostBase[i].mul(player.cop.processedCorePrimedEffects[4])
            player.cb.XPBoostBase[i] = player.cb.XPBoostBase[i].mul(levelableEffect("pet", 406)[1])
            player.cb.XPBoostBase[i] = player.cb.XPBoostBase[i].mul(player.leg.gemEffects[2])
            player.cb.XPBoostBase[i] = player.cb.XPBoostBase[i].mul(buyableEffect("ep5", 12))
        }

        player.cb.XPBoostReq = [new Decimal(100), new Decimal(500)]
        player.cb.XPBoostTimersMax = [new Decimal(10800), new Decimal(129600)]
        for (let i = 0; i < player.cb.XPBoostTimersMax.length; i++) {
            player.cb.XPBoostTimersMax[i] = player.cb.XPBoostTimersMax[i].div(levelableEffect("pet", 401)[2])
            player.cb.XPBoostTimersMax[i] = player.cb.XPBoostTimersMax[i].div(buyableEffect("ep5", 13))
        }
        for (let i = 0; i < player.cb.XPBoostTimers.length; i++) {
            player.cb.XPBoostTimers[i] = player.cb.XPBoostTimers[i].sub(onepersec.mul(delta))
        }

        if (player.cb.XPBoost.lte(1000)) {
        player.cb.XPBoostEffect = player.cb.XPBoost
        } else if (player.cb.XPBoost.gte(1000)) {
            player.cb.XPBoostEffect = Decimal.add(1000, player.cb.XPBoost.sub(1000).pow(0.5).mul(10))
        }
        

        //chal 7
        if (inChallenge("ip", 17) && player.cb.level.gt(1)) {
            player.cb.lossRate = Decimal.add(0.1, player.cb.xp.div(666).pow(0.8))
            player.cb.xp = player.cb.xp.sub(player.cb.lossRate.mul(delta))

            if (player.cb.xp.lt(0))
            {
                player.cb.level = player.cb.level.sub(2)
                player.cb.xp = player.cb.req.sub(1)
            }
        }

        //automation
        for (let i = 0; i < player.cb.buttonAutomationTimersMax.length; i++) {
            if (player.cb.buttonAutomationAllocation[i].gt(0)) player.cb.buttonAutomationTimersMax[i] = player.cb.buttonTimersMax[i].mul(10).div(player.cb.buttonAutomationAllocation[i].pow(0.75))
        }
        for (let i = 0; i < player.cb.buttonAutomationTimers.length; i++) {
            if (player.cb.buttonAutomationAllocation[i].gt(0)) player.cb.buttonAutomationTimers[i] = player.cb.buttonAutomationTimers[i].sub(onepersec.mul(delta))

            if (player.cb.buttonAutomationTimers[i].lt(0)) {
                player.cb.buttonAutomationTimers[i] = player.cb.buttonAutomationTimersMax[i]
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[i].mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.buttonBaseXP[i].mul(player.cb.xpMult))
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPButtonBase[i].mul(player.ca.canteEnergyMult))
            }
        }

        //pet
        for (let i = 0; i < player.cb.petAutomationTimersMax.length; i++) {
            if (player.cb.petAutomationAllocation[i].gt(0)) player.cb.petAutomationTimersMax[i] = player.cb.petButtonTimersMax[i].mul(25).div(player.cb.petAutomationAllocation[i].pow(0.75))
        }
        for (let i = 0; i < player.cb.petAutomationTimers.length; i++) {
            if (player.cb.petAutomationAllocation[i].gt(0)) player.cb.petAutomationTimers[i] = player.cb.petAutomationTimers[i].sub(onepersec.mul(delta))

            if (player.cb.petAutomationTimers[i].lt(0)) {
                if (i == 0) {
                    layers.cb.petButton1()
                }
                if (i == 1) {
                    layers.cb.petButton2()
                }
                if (i == 2) {
                    layers.cb.petButton3()
                }
                if (i == 3) {
                    layers.cb.petButton4()
                }
                if (i == 4) {
                    layers.cb.petButton5()
                }
                if (i == 5) {
                    layers.cb.petButton6()
                }
                if (i == 6) {
                    layers.cb.petButton7()
                }
                player.cb.petAutomationTimers[i] = player.cb.petAutomationTimersMax[i]

                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetButtonBase[i].mul(player.ca.canteEnergyMult))
            }
        }

        // XPBoost
        for (let i = 0; i < player.cb.boostAutomationTimersMax.length; i++) {
            if (player.cb.boostAutomationAllocation[i].gt(0)) player.cb.boostAutomationTimersMax[i] = player.cb.XPBoostTimersMax[i].mul(100).div(player.cb.boostAutomationAllocation[i].pow(0.75))
        }
        for (let i = 0; i < player.cb.boostAutomationTimers.length; i++) {
            if (player.cb.boostAutomationAllocation[i].gt(0)) player.cb.boostAutomationTimers[i] = player.cb.boostAutomationTimers[i].sub(onepersec.mul(delta))

            if (player.cb.boostAutomationTimers[i].lt(0)) {
                player.cb.boostAutomationTimers[i] = player.cb.boostAutomationTimersMax[i]
                player.cb.XPBoost = player.cb.XPBoost.add(player.cb.XPBoostBase[i])
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPBoostButtonBase[i].mul(player.ca.canteEnergyMult))
            }
        }

        // Pet Points
        for (let i = 0; i < player.cb.pointAutomationTimersMax.length; i++) {
            if (player.cb.pointAutomationAllocation[i].gt(0)) player.cb.pointAutomationTimersMax[i] = tmp.pet.levelables[i+301].pointCooldown.mul(50).div(player.cb.pointAutomationAllocation[i].pow(0.75))
        }
        for (let i = 0; i < player.cb.pointAutomationTimers.length; i++) {
            if (player.cb.pointAutomationAllocation[i].gt(0)) player.cb.pointAutomationTimers[i] = player.cb.pointAutomationTimers[i].sub(onepersec.mul(delta))

            if (player.cb.pointAutomationTimers[i].lt(0)) {
                player.cb.pointAutomationTimers[i] = player.cb.pointAutomationTimersMax[i]
                let pval = layers.pet.levelables[i+301].pointClick()
                player.cb.petPoints = player.cb.petPoints.add(pval)
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[i+301].canteBase.mul(player.ca.canteEnergyMult))
            }
        }

        let usedAutomationShards = new Decimal(0)
        for (let i = 0; i < player.cb.buttonAutomationTimersMax.length; i++) {
            usedAutomationShards = usedAutomationShards.add(player.cb.buttonAutomationAllocation[i])
        }
        for (let i = 0; i < player.cb.petAutomationTimersMax.length; i++) {
            usedAutomationShards = usedAutomationShards.add(player.cb.petAutomationAllocation[i])
        }
        for (let i = 0; i < player.cb.boostAutomationTimersMax.length; i++) {
            usedAutomationShards = usedAutomationShards.add(player.cb.boostAutomationAllocation[i])
        }
        for (let i = 0; i < player.cb.pointAutomationTimersMax.length; i++) {
            usedAutomationShards = usedAutomationShards.add(player.cb.pointAutomationAllocation[i])
        }
        player.cb.totalAutomationShards = player.cb.automationShards.add(usedAutomationShards)

        //cante
        player.cb.canteEnergyXPButtonBase = [new Decimal(0.2), new Decimal(0.3), new Decimal(0.5), new Decimal(0.02), new Decimal(1.4), new Decimal(2.5), new Decimal(5), new Decimal(12) ]
        player.cb.canteEnergyPetButtonBase = [new Decimal(1.6), new Decimal(3), new Decimal(5.5), new Decimal(9), new Decimal(7), new Decimal(14), new Decimal(30)]
        player.cb.canteEnergyXPBoostButtonBase = [new Decimal(10), new Decimal(30)]

        player.cb.pityMax = new Decimal(200).sub(buyableEffect("cb", 16))

        if (player.cb.pityEvoCurrent.gte(player.cb.pityMax)) {
            player.cb.evolutionShards = player.cb.evolutionShards.add(1)
            player.cb.pityEvoCurrent = new Decimal(0)
            if (player.cb.alertToggle) callAlert("You gained an Evolution Shard! (Pity)", "resources/evoShard.png");
        }
        if (player.cb.pityParaCurrent.gte(player.cb.pityMax)) {
            player.cb.paragonShards = player.cb.paragonShards.add(1)
            player.cb.pityParaCurrent = new Decimal(0)
            if (player.cb.alertToggle) callAlert("You gained a PARAGON SHARD! (Pity)", "resources/paragonShard.png");
        }

        if (player.cb.paragonShards.lte(0))
        {
            player.cb.paragonShards = new Decimal(0)
        }
    },
    levelToXP(quantity)
    {
        if (!quantity.gte(10000)) {
            quantity = quantity.add(2).pow(2.2).mul(5/11)
            quantity = quantity.div(levelableEffect("pet", 203)[2])
            quantity = quantity.div(levelableEffect("pet", 304)[1])
            return quantity
        } else if (!quantity.gte(100000)) {
            quantity = quantity.sub(10000)
            quantity = quantity.add(1436).pow(2.4).sub(37772059).add(286925000)
            quantity = quantity.div(levelableEffect("pet", 203)[2])
            quantity = quantity.div(levelableEffect("pet", 304)[1])
            return quantity
        } else {
            quantity = quantity.sub(100000)
            quantity = quantity.add(20875).pow(2.6).sub(170227162034).add(806892071467)
            quantity = quantity.div(levelableEffect("pet", 203)[2])
            quantity = quantity.div(levelableEffect("pet", 304)[1])
            return quantity
        }
    },
    xpToLevel(quantity)
    {
        if (!quantity.gte(new Decimal(286925000).div(levelableEffect("pet", 203)[2]).div(levelableEffect("pet", 304)[1]))) {
            quantity = quantity.mul(levelableEffect("pet", 203)[2])
            quantity = quantity.mul(levelableEffect("pet", 304)[1])
            quantity = quantity.div(5/11).pow(5/11).sub(2).floor()
            return quantity
        } else if (!quantity.gte(new Decimal(806892071467).div(levelableEffect("pet", 203)[2]).div(levelableEffect("pet", 304)[1]))) {
            quantity = quantity.sub(new Decimal(286925000).div(levelableEffect("pet", 203)[2]).div(levelableEffect("pet", 304)[1]))
            quantity = quantity.mul(levelableEffect("pet", 203)[2])
            quantity = quantity.mul(levelableEffect("pet", 304)[1])
            quantity = quantity.add(37772059).pow(5/12).sub(1436).add(10000).floor()
            return quantity
        } else {
            quantity = quantity.sub(new Decimal(806892071467).div(levelableEffect("pet", 203)[2]).div(levelableEffect("pet", 304)[1]))
            quantity = quantity.mul(levelableEffect("pet", 203)[2])
            quantity = quantity.mul(levelableEffect("pet", 304)[1])
            quantity = quantity.add(170227162034).pow(5/13).sub(20875).add(100000).floor()
            return quantity
        }
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
    offlineCooldown() {
        let time = player.cb.time
        player.cb.time = new Decimal(0)

        // XP Buttons
        for (let i = 0; i < player.cb.buttonTimers.length; i++) {
            player.cb.buttonTimers[i] = player.cb.buttonTimers[i].sub(time)
        }

        // Pet Buttons
        for (let i = 0; i < player.cb.petButtonTimers.length; i++) {
            player.cb.petButtonTimers[i] = player.cb.petButtonTimers[i].sub(time)
        }

        // Pet Point Buttons
        for (let i = 0; i < player.pet.petButtonTimer.length; i++) {
            player.pet.petButtonTimer[i] = player.pet.petButtonTimer[i].sub(time)
        }

        // XP Boost Buttons
        for (let i = 0; i < player.cb.XPBoostTimers.length; i++) {
            player.cb.XPBoostTimers[i] = player.cb.XPBoostTimers[i].sub(time)
        }

        // Automation Timers (only triggers once)
        for (let i = 0; i < player.cb.buttonAutomationTimers.length; i++) {
            if (player.cb.buttonAutomationAllocation[i].gt(0)) player.cb.buttonAutomationTimers[i] = player.cb.buttonAutomationTimers[i].sub(time)
        }

        // Pet Shop
        player.pet.shopResetTimer = player.pet.shopResetTimer.sub(time)

        // Epic Fragmentation Timer
        player.pet.bannerResetTimer = player.pet.bannerResetTimer.sub(time)
        for (let i = 0; i < player.pet.bannerButtonTimers.length; i++) {
            player.pet.bannerButtonTimers[i] = player.pet.bannerButtonTimers[i].sub(time)
        } 

        // Epic Pet Timers
        for (let i = 0; i < player.ep0.dotknightPointButtonTimers.length; i++) {
            player.ep0.dotknightPointButtonTimers[i] = player.ep0.dotknightPointButtonTimers[i].sub(time)
        }
        for (let i = 0; i < player.ep1.dragonPointButtonTimers.length; i++) {
            player.ep1.dragonPointButtonTimers[i] = player.ep1.dragonPointButtonTimers[i].sub(time)
        }
        for (let i = 0; i < player.ep2.cookiePointButtonTimers.length; i++) {
            player.ep2.cookiePointButtonTimers[i] = player.ep2.cookiePointButtonTimers[i].sub(time)
        }

        // Daily Reward (Insane Face Evo)
        player.ev2.cooldown = player.ev2.cooldown.sub(time)

        // Shard Buttons (Marcel Evo)
        for (let i = 0; i < player.ev8.evoButtonTimers.length; i++) {
            player.ev8.evoButtonTimers[i] = player.ev8.evoButtonTimers[i].sub(time)
        }
        for (let i = 0; i < player.ev8.paragonButtonTimers.length; i++) {
            player.ev8.paragonButtonTimers[i] = player.ev8.paragonButtonTimers[i].sub(time)
        }
    },
    branches: ["m"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "i"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Alerts<br>On" },
            canClick() { return !player.cb.alertToggle },
            unlocked() { return player.cb.highestLevel.gte(200) },
            onClick() {
                player.cb.alertToggle = true
            },
            style() {
                let look = {width: "75px", minHeight: "40px", borderRadius: "10px 0px 0px 10px", fontSize: "8px"}
                if (player.subtabs["cb"]['buttons'] == 'XP') look.backgroundColor = "#094599"
                if (player.subtabs["cb"]['buttons'] == 'Pets') look.backgroundColor = "#4e7cff"
                if (player.subtabs["cb"]['buttons'] == 'XPBoost') look.backgroundColor = "#00B229"
                if (player.subtabs["cb"]['buttons'] == 'Pet Points') look.backgroundColor = "#A2D800"
                if (!this.canClick()) look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        3: {
            title() { return "Alerts<br>Off" },
            canClick() { return player.cb.alertToggle  },
            unlocked() { return player.cb.highestLevel.gte(200) },
            onClick() {
                player.cb.alertToggle = false
            },
            style() {
                let look = {width: "75px", minHeight: "40px", borderRadius: "0px 10px 10px 0px", fontSize: "8px"}
                if (player.subtabs["cb"]['buttons'] == 'XP') look.backgroundColor = "#094599"
                if (player.subtabs["cb"]['buttons'] == 'Pets') look.backgroundColor = "#4e7cff"
                if (player.subtabs["cb"]['buttons'] == 'XPBoost') look.backgroundColor = "#00B229"
                if (player.subtabs["cb"]['buttons'] == 'Pet Points') look.backgroundColor = "#A2D800"
                if (!this.canClick()) look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        11: {
            title() { return player.cb.buttonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[0]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[0].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[0].lt(0) && this.unlocked() },
            unlocked() { return true },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 0.5%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[0].mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.buttonBaseXP[0].mul(player.cb.xpMult))
                player.cb.buttonTimers[0] = player.cb.buttonTimersMax[0]

                if (player.cb.highestLevel.gt(35))
                {
                    let random = getRandomInt(200)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        if (player.cb.alertToggle) callAlert("You gained an Evolution Shard! (0.5%)", "resources/evoShard.png");
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(0.5);
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPButtonBase[0].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#094599" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        12: {
            title() { return player.cb.buttonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[1]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[1].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[1].lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(3) },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 1%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[1].mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.buttonBaseXP[1].mul(player.cb.xpMult))
                player.cb.buttonTimers[1] = player.cb.buttonTimersMax[1]

                if (player.cb.highestLevel.gt(35))
                {
                    let random = getRandomInt(100)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        if (player.cb.alertToggle) callAlert("You gained an Evolution Shard! (1%)", "resources/evoShard.png");
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(1);
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPButtonBase[1].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#094599" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        13: {
            title() { return player.cb.buttonTimers[2].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[2]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[2].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[2].lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(6) },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 2%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[2].mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.buttonBaseXP[2].mul(player.cb.xpMult))
                player.cb.buttonTimers[2] = player.cb.buttonTimersMax[2]

                if (player.cb.highestLevel.gt(35))
                {
                    let random = getRandomInt(50)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        if (player.cb.alertToggle) callAlert("You gained an Evolution Shard! (2%)", "resources/evoShard.png");
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(2);
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPButtonBase[2].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#094599" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        14: {
            title() { return player.cb.buttonTimers[3].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[3]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[3].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[3].lt(0) && this.unlocked() },
            unlocked() { return hasMilestone("r", 17) },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 0.2%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[3].mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.buttonBaseXP[3].mul(player.cb.xpMult))
                player.cb.buttonTimers[3] = player.cb.buttonTimersMax[3]

                if (player.cb.highestLevel.gt(35))
                {
                    let random = getRandomInt(500)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        if (player.cb.alertToggle) callAlert("You gained an Evolution Shard! (0.2%)", "resources/evoShard.png");
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(0.2);
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPButtonBase[3].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#094599" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        15: {
            title() { return player.cb.buttonTimers[4].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[4]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[4].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[4].lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(15) },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 5%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[4].mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.buttonBaseXP[4].mul(player.cb.xpMult))
                player.cb.buttonTimers[4] = player.cb.buttonTimersMax[4]

                if (player.cb.highestLevel.gt(35))
                {
                    let random = getRandomInt(20)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        if (player.cb.alertToggle) callAlert("You gained an Evolution Shard! (5%)", "resources/evoShard.png");
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(5);
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPButtonBase[4].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#094599" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        16: {
            title() { return player.cb.buttonTimers[5].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[5]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[5].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[5].lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(50) },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 20%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[5].mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.buttonBaseXP[5].mul(player.cb.xpMult))
                player.cb.buttonTimers[5] = player.cb.buttonTimersMax[5]

                if (player.cb.highestLevel.gt(35))
                {
                    let random = getRandomInt(5)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        if (player.cb.alertToggle) callAlert("You gained an Evolution Shard! (20%)", "resources/evoShard.png");
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(20);
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPButtonBase[5].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#094599" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        17: {
            title() { return player.cb.buttonTimers[6].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[6]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[6].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[6].lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(65) },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 50%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[6].mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.buttonBaseXP[6].mul(player.cb.xpMult))
                player.cb.buttonTimers[6] = player.cb.buttonTimersMax[6]

                if (player.cb.highestLevel.gt(35))
                {
                    let random = getRandomInt(2)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        if (player.cb.alertToggle) callAlert("You gained an Evolution Shard! (50%)", "resources/evoShard.png");
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(50);
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPButtonBase[6].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#094599" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        18: {
            title() { return player.cb.buttonTimers[7].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[7]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[7].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[7].lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(150) },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 98%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[7].mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.buttonBaseXP[7].mul(player.cb.xpMult))
                player.cb.buttonTimers[7] = player.cb.buttonTimersMax[7]

                if (player.cb.highestLevel.gt(35))
                {
                    let random = getRandomInt(50)
                    if (random != 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0)
                        if (player.cb.alertToggle) callAlert("You gained an Evolution Shard! (98%)", "resources/evoShard.png");
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(98)
                        if (player.cb.alertToggle) callAlert("Damn bro you didn't gain an evo shard. Take a screenshot, send to the discord, and ping the dev. I think ur still cool.");
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPButtonBase[7].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#094599" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },

        99: {
            title() {return "Claim All"},
            canClick() {return tmp.cb.clickables[11].canClick || tmp.cb.clickables[12].canClick || tmp.cb.clickables[13].canClick
                || tmp.cb.clickables[14].canClick || tmp.cb.clickables[15].canClick || tmp.cb.clickables[16].canClick
                || tmp.cb.clickables[17].canClick || tmp.cb.clickables[18].canClick},
            unlocked() {return player.cb.highestLevel.gte(200)},
            onClick() {
                clickClickable("cb", 11)
                clickClickable("cb", 12)
                clickClickable("cb", 13)
                clickClickable("cb", 14)
                clickClickable("cb", 15)
                clickClickable("cb", 16)
                clickClickable("cb", 17)
                clickClickable("cb", 18)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "140px", minHeight: "40px", borderRadius: "0px", margin: "5px"}
                this.canClick() ? look.backgroundColor = "#094599" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        // PET BUTTONS
        101: {
            title() { return player.cb.petButtonTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.petButtonTimers[0]) + "." : "<h3>Collect a random common pet."},
            canClick() { return player.cb.petButtonTimers[0].lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(10) },
            tooltip() { return "27% - Gwa<br>22% - Egg Guy<br>17% - Unsmith<br>16% - Gd Checkpoint<br>13% - Slax<br>5% - Teste"},
            onClick() {
                player.cb.petButtonTimers[0] = player.cb.petButtonTimersMax[0]
                layers.cb.petButton1();
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetButtonBase[0].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#4e7cff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        102: {
            title() { return player.cb.petButtonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.petButtonTimers[1]) + "." : "<h3>Collect a random <small>uncommon/common</small> pet."},
            canClick() { return player.cb.petButtonTimers[1].lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(25) },
            tooltip() { return "7% - Gwa<br>7% - Egg Guy<br>7% - Unsmith<br>7% - Gd Checkpoint<br>7% - Slax<br>11% - Teste<br>12% - Star<br>12% - Normal Face<br>12% - Shark<br>12% - THE WATCHING EYE<br>7% - Nova"},
            onClick() {
                player.cb.petButtonTimers[1] = player.cb.petButtonTimersMax[1]
                layers.cb.petButton2();
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetButtonBase[1].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#4e7cff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        103: {
            title() { return player.cb.petButtonTimers[2].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.petButtonTimers[2]) + "." : "<h3>Collect a random uncommon pet."},
            canClick() { return player.cb.petButtonTimers[2].lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(75) },
            tooltip() { return "16% - Teste<br>16% - Star<br>16% - Normal Face<br>16% - Shark<br>16% - THE WATCHING EYE<br>12% - Goofy Ahh Thing<br>8% - Evo Shard"},
            onClick() {
                player.cb.petButtonTimers[2] = player.cb.petButtonTimersMax[2]
                layers.cb.petButton3();
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetButtonBase[2].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#4e7cff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        104: {
            title() { return player.cb.petButtonTimers[3].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.petButtonTimers[3]) + "." : "<h3>Collect a random antimatter pet."},
            canClick() { return player.cb.petButtonTimers[3].lt(0) && player.cb.XPBoost.gt(1.04) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(125) },
            tooltip() { return "COSTS 0.04 XPBOOST<br>25% - Spider<br>25% - Blob<br>15% - Clock<br>15% - Trollface<br>15% - Antimatter<br>5% - Evo Shards"},
            onClick() {
                player.cb.petButtonTimers[3] = player.cb.petButtonTimersMax[3]
                layers.cb.petButton4();

                player.cb.XPBoost = player.cb.XPBoost.sub(0.04)
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetButtonBase[3].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#4e7cff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        105: {
            title() { return player.cb.petButtonTimers[4].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.petButtonTimers[4]) + "." : "<h3>Collect a random replicanti pet."},
            canClick() { return player.cb.petButtonTimers[4].lt(0) && player.cb.XPBoost.gt(1.2) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(1500) && player.ca.unlockedCante },
            tooltip() { return "COSTS 0.2 XPBOOST<br>25% - Replicator<br>25% - Smoke<br>15% - Infinity Breaker<br>15% - John<br>10% - Hex Shadow<br>10% - Grass Square"},
            onClick() {
                player.cb.petButtonTimers[4] = player.cb.petButtonTimersMax[4]
                layers.cb.petButton5();

                player.cb.XPBoost = player.cb.XPBoost.sub(0.2)
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetButtonBase[4].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#4e7cff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        106: {
            title() { return player.cb.petButtonTimers[5].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.petButtonTimers[5]) + "." : "<h3>Collect a random rare pet."},
            canClick() { return player.cb.petButtonTimers[5].lt(0) && player.cb.XPBoost.gt(3) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(1500) && player.ca.unlockedCante },
            tooltip() { return "COSTS 2 XPBOOST<br>10% - Nova<br>10% - Dice<br>10% - Drippy Ufo<br>10% - Goofy Ahh Thing<br>10% - Antimatter<br>10% - Hex Shadow<br>10% - Grass Square<br>30% - Epic Pet Fragment"},
            onClick() {
                player.cb.petButtonTimers[5] = player.cb.petButtonTimersMax[5]
                layers.cb.petButton6();

                player.cb.XPBoost = player.cb.XPBoost.sub(2)
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetButtonBase[5].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#4e7cff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        107: {
            title() { return player.cb.petButtonTimers[6].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.petButtonTimers[6]) + "." : "<h3>Collect a random singularity pet."},
            canClick() { return player.cb.petButtonTimers[6].lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23) },
            tooltip() { return "30% - Impossible Triangle<br>30% - Forbidden Core<br>10% - Paragon Shard<br>25% - Singularity Fragment<br>5% - Legendary Gems"},
            onClick() {
                player.cb.petButtonTimers[6] = player.cb.petButtonTimersMax[6]
                layers.cb.petButton7();
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyPetButtonBase[6].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#4e7cff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },

        199: {
            title() {return "Claim All"},
            canClick() {return tmp.cb.clickables[101].canClick || tmp.cb.clickables[102].canClick || tmp.cb.clickables[103].canClick
                || tmp.cb.clickables[104].canClick || tmp.cb.clickables[105].canClick || tmp.cb.clickables[106].canClick
                || tmp.cb.clickables[107].canClick},
            unlocked() {return player.cb.highestLevel.gte(200)},
            onClick() {
                clickClickable("cb", 101)
                clickClickable("cb", 102)
                clickClickable("cb", 103)
                clickClickable("cb", 104)
                clickClickable("cb", 105)
                clickClickable("cb", 106)
                clickClickable("cb", 107)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "140px", minHeight: "40px", borderRadius: "0px", margin: "5px"}
                this.canClick() ? look.backgroundColor = "#4e7cff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        // PET POINT BUTTONS
        201: {
            title() { 
                if (player.pet.petButtonTimer[0].gt(0)) {
                    return "<h3>Check back in<br>" + formatTime(player.pet.petButtonTimer[0]) + "."
                } else {
                    return "<h3>+" + format(tmp.pet.levelables[301].pointValue) + "<br>Pet Points."
                }
            },
            canClick() { return player.pet.petButtonTimer[0].lte(0) && this.unlocked() },
            tooltip() { return tmp.pet.levelables[301].pointTooltip },
            unlocked() { return getLevelableAmount("pet", 301).gte(1) },
            onClick() {
                let pval = layers.pet.levelables[301].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petButtonTimer[0] = tmp.pet.levelables[301].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[301].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        202: {
            title() { 
                if (player.pet.petButtonTimer[1].gt(0)) {
                    return "<h3>Check back in<br>" + formatTime(player.pet.petButtonTimer[1]) + "."
                } else {
                    return "<h3>Roll for<br>Pet Points!"
                }
            },
            canClick() { return player.pet.petButtonTimer[1].lte(0) && this.unlocked() },
            tooltip() { return tmp.pet.levelables[302].pointTooltip },
            unlocked() { return getLevelableAmount("pet", 302).gte(1) },
            onClick() {
                let pval = layers.pet.levelables[302].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petButtonTimer[1] = tmp.pet.levelables[302].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[302].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        203: {
            title() { 
                if (player.pet.petButtonTimer[2].gt(0)) {
                    return "<h3>Check back in<br>" + formatTime(player.pet.petButtonTimer[2]) + "."
                } else {
                    return "<h3>+" + format(tmp.pet.levelables[303].pointValue) + "<br>Pet Points."
                }
            },
            canClick() { return player.pet.petButtonTimer[2].lte(0) && this.unlocked() },
            tooltip() { return tmp.pet.levelables[303].pointTooltip },
            unlocked() { return getLevelableAmount("pet", 303).gte(1) },
            onClick() {
                let pval = layers.pet.levelables[303].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petButtonTimer[2] = tmp.pet.levelables[303].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[303].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        204: {
            title() { 
                if (player.pet.petButtonTimer[3].gt(0)) {
                    return "<h3>Check back in<br>" + formatTime(player.pet.petButtonTimer[3]) + "."
                } else {
                    return "<h3>+" + format(tmp.pet.levelables[304].pointValue) + "<br>Pet Points."
                }
            },
            canClick() { return player.pet.petButtonTimer[3].lte(0) && this.unlocked() },
            tooltip() { return tmp.pet.levelables[304].pointTooltip },
            unlocked() { return getLevelableAmount("pet", 304).gte(1) },
            onClick() {
                let pval = layers.pet.levelables[304].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petButtonTimer[3] = tmp.pet.levelables[304].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[304].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        205: {
            title() { 
                if (player.pet.petButtonTimer[4].gt(0)) {
                    return "<h3>Check back in<br>" + formatTime(player.pet.petButtonTimer[4]) + "."
                } else {
                    return "<h3>+" + format(tmp.pet.levelables[305].pointValue) + "<br>Pet Points."
                }
            },
            canClick() { return player.pet.petButtonTimer[4].lte(0) && this.unlocked() },
            tooltip() { return tmp.pet.levelables[305].pointTooltip },
            unlocked() { return getLevelableAmount("pet", 305).gte(1) },
            onClick() {
                let pval = layers.pet.levelables[305].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petButtonTimer[4] = tmp.pet.levelables[305].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[305].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        206: {
            title() { 
                if (player.pet.petButtonTimer[5].gt(0)) {
                    return "<h3>Check back in<br>" + formatTime(player.pet.petButtonTimer[5]) + "."
                } else {
                    return "<h3>+" + format(tmp.pet.levelables[306].pointValue) + "<br>Pet Points."
                }
            },
            canClick() { return player.pet.petButtonTimer[5].lte(0) && this.unlocked() },
            tooltip() { return tmp.pet.levelables[306].pointTooltip },
            unlocked() { return getLevelableAmount("pet", 306).gte(1) },
            onClick() {
                let pval = layers.pet.levelables[306].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petButtonTimer[5] = tmp.pet.levelables[306].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[306].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        207: {
            title() { 
                if (player.pet.petButtonTimer[6].gt(0)) {
                    return "<h3>Check back in<br>" + formatTime(player.pet.petButtonTimer[6]) + "."
                } else {
                    return "<h3>+" + format(tmp.pet.levelables[307].pointValue) + "<br>Pet Points."
                }
            },
            canClick() { return player.pet.petButtonTimer[6].lte(0) && this.unlocked() },
            tooltip() { return tmp.pet.levelables[307].pointTooltip },
            unlocked() { return getLevelableAmount("pet", 307).gte(1) },
            onClick() {
                let pval = layers.pet.levelables[307].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petButtonTimer[6] = tmp.pet.levelables[307].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[307].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        208: {
            title() { 
                if (player.pet.petButtonTimer[7].gt(0)) {
                    return "<h3>Check back in<br>" + formatTime(player.pet.petButtonTimer[7]) + "."
                } else {
                    return "<h3>+" + format(tmp.pet.levelables[308].pointValue) + "<br>Pet Points."
                }
            },
            canClick() { return player.pet.petButtonTimer[7].lte(0) && this.unlocked() },
            tooltip() { return tmp.pet.levelables[308].pointTooltip },
            unlocked() { return getLevelableAmount("pet", 308).gte(1) },
            onClick() {
                let pval = layers.pet.levelables[308].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petButtonTimer[7] = tmp.pet.levelables[308].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[308].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        209: {
            title() { 
                if (player.pet.petButtonTimer[8].gt(0)) {
                    return "<h3>Check back in<br>" + formatTime(player.pet.petButtonTimer[8]) + "."
                } else {
                    return "<h3>+" + format(tmp.pet.levelables[309].pointValue) + "<br>Pet Points."
                }
            },
            canClick() { return player.pet.petButtonTimer[8].lte(0) && this.unlocked() },
            tooltip() { return tmp.pet.levelables[309].pointTooltip },
            unlocked() { return getLevelableAmount("pet", 309).gte(1) },
            onClick() {
                let pval = layers.pet.levelables[309].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petButtonTimer[8] = tmp.pet.levelables[309].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[309].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },

        299: {
            title() {return "Claim All"},
            canClick() {return tmp.cb.clickables[201].canClick || tmp.cb.clickables[202].canClick || tmp.cb.clickables[203].canClick
                || tmp.cb.clickables[204].canClick || tmp.cb.clickables[205].canClick || tmp.cb.clickables[206].canClick
                || tmp.cb.clickables[207].canClick || tmp.cb.clickables[208].canClick || tmp.cb.clickables[209].canClick},
            unlocked() {return player.cb.highestLevel.gte(200)},
            onClick() {
                clickClickable("cb", 201)
                clickClickable("cb", 202)
                clickClickable("cb", 203)
                clickClickable("cb", 204)
                clickClickable("cb", 205)
                clickClickable("cb", 206)
                clickClickable("cb", 207)
                clickClickable("cb", 208)
                clickClickable("cb", 209)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "140px", minHeight: "40px", borderRadius: "0px", margin: "5px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        // XPBOOST BUTTONS
        301: {
            title() { return player.cb.XPBoostTimers[0].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.XPBoostTimers[0]) + "." : "<h3>+" + format(player.cb.XPBoostBase[0]) + " XP Boost."},
            canClick() { return player.cb.XPBoostTimers[0].lt(0) },
            unlocked() { return true },
            tooltip() { return player.cb.highestLevel.gte(250) ? "Paragon Shard Rarity: 10%" : ""},
            onClick() {
                if (player.cb.highestLevel.gte(player.cb.XPBoostReq[0])) {
                    player.cb.XPBoost = player.cb.XPBoost.add(player.cb.XPBoostBase[0])
                    player.cb.XPBoostTimers[0] = player.cb.XPBoostTimersMax[0]

                    if (player.cb.highestLevel.gt(250)) {
                        let random = getRandomInt(10)
                        if (random == 1) {
                            player.cb.paragonShards = player.cb.paragonShards.add(1);
                            player.cb.pityParaCurrent = new Decimal(0);
                            if (player.cb.alertToggle) callAlert("You gained a PARAGON SHARD! (10%)", "resources/paragonShard.png");
                        } else {
                            player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(10);
                        }
                    }
                    player.cb.level = new Decimal(1)
                    player.cb.xp = new Decimal(0)
                    player.cb.totalxp = new Decimal(5.1)
                    if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPBoostButtonBase[0].mul(player.ca.canteEnergyMult))
                } else {
                    callAlert("You must be level " + formatWhole(player.cb.XPBoostReq[0]) + " to reset for this button.");
                }
            },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#00B229" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        302: {
            title() { return player.cb.XPBoostTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.XPBoostTimers[1]) + "." : "<h3>+" + format(player.cb.XPBoostBase[1]) + " XP Boost."},
            canClick() { return player.cb.XPBoostTimers[1].lt(0) },
            unlocked() { return player.cb.highestLevel.gte(666) && hasUpgrade("ip", 31) },
            tooltip() { return player.cb.highestLevel.gte(250) ? "Paragon Shard Rarity: 25%" : ""},
            onClick() {
                if (player.cb.highestLevel.gte(player.cb.XPBoostReq[1])) {
                    player.cb.XPBoost = player.cb.XPBoost.add(player.cb.XPBoostBase[1])
                    player.cb.XPBoostTimers[1] = player.cb.XPBoostTimersMax[1]

                    if (player.cb.highestLevel.gt(250)) {
                        let random = getRandomInt(4)
                        if (random == 1) {
                            player.cb.paragonShards = player.cb.paragonShards.add(1);
                            player.cb.pityParaCurrent = new Decimal(0);
                            if (player.cb.alertToggle) callAlert("You gained a PARAGON SHARD! (25%)", "resources/paragonShard.png");
                        } else {
                            player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(25);
                        }
                    }
                    player.cb.level = new Decimal(1)
                    player.cb.xp = new Decimal(0)
                    player.cb.totalxp = new Decimal(5.1)
                    if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(player.cb.canteEnergyXPBoostButtonBase[1].mul(player.ca.canteEnergyMult))
                } else {
                    callAlert("You must be level " + formatWhole(player.cb.XPBoostReq[1]) + " to reset for this button.");
                }
            },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#00B229" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },

        // AUTOMATION
        401: {
            title() { return "1" },
            canClick() { return player.cb.autoAllocateAmt.neq(1) },
            unlocked() { return true },
            tooltip() { return "Allocate only 1 shard" },
            onClick() {
                player.cb.autoAllocateAmt = new Decimal(1)
            },
            style() {
                let look = {color: "white", width: "115px", minHeight: "47px", borderRadius: "0px", fontSize: "14px"}
                this.canClick() ? look.backgroundColor = "#888888" : look.backgroundColor = "#222222"
                return look
            }, 
        },
        402: {
            title() { return "10" },
            canClick() { return player.cb.autoAllocateAmt.neq(10) },
            unlocked() { return true },
            tooltip() { return "Allocate up to 10 shards" },
            onClick() {
                player.cb.autoAllocateAmt = new Decimal(10)
            },
            style() {
                let look = {color: "white", width: "114px", minHeight: "47px", borderRadius: "0px", fontSize: "14px"}
                this.canClick() ? look.backgroundColor = "#888888" : look.backgroundColor = "#222222"
                return look
            }, 
        },
        403: {
            title() { return "100" },
            canClick() { return player.cb.autoAllocateAmt.neq(100) },
            unlocked() { return true },
            tooltip() { return "Allocate up to 100 shards" },
            onClick() {
                player.cb.autoAllocateAmt = new Decimal(100)
            },
            style() {
                let look = {color: "white", width: "115px", minHeight: "47px", borderRadius: "0px", fontSize: "14px"}
                this.canClick() ? look.backgroundColor = "#888888" : look.backgroundColor = "#222222"
                return look
            }, 
        },

        1001: {
            title() { return "–" },
            canClick() {
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    return player.cb.buttonAutomationAllocation[0].gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    return player.cb.petAutomationAllocation[0].gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    return player.cb.boostAutomationAllocation[0].gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    return player.cb.pointAutomationAllocation[0].gte(1)
                } else {
                    return false
                }
            },
            unlocked() { return true },
            tooltip() { return "Return an automation shard" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    if (player.cb.buttonAutomationAllocation[0].lt(player.cb.autoAllocateAmt)) amt = player.cb.buttonAutomationAllocation[0]
                    player.cb.buttonAutomationAllocation[0] = player.cb.buttonAutomationAllocation[0].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    if (player.cb.petAutomationAllocation[0].lt(player.cb.autoAllocateAmt)) amt = player.cb.petAutomationAllocation[0]
                    player.cb.petAutomationAllocation[0] = player.cb.petAutomationAllocation[0].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    if (player.cb.boostAutomationAllocation[0].lt(player.cb.autoAllocateAmt)) amt = player.cb.boostAutomationAllocation[0]
                    player.cb.boostAutomationAllocation[0] = player.cb.boostAutomationAllocation[0].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    if (player.cb.pointAutomationAllocation[0].lt(player.cb.autoAllocateAmt)) amt = player.cb.pointAutomationAllocation[0]
                    player.cb.pointAutomationAllocation[0] = player.cb.pointAutomationAllocation[0].sub(amt)
                }
                player.cb.automationShards = player.cb.automationShards.add(amt)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },
        1002: {
            title() { return "–" },
            canClick() {
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    return player.cb.buttonAutomationAllocation[1].gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    return player.cb.petAutomationAllocation[1].gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    return player.cb.boostAutomationAllocation[1].gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    return player.cb.pointAutomationAllocation[1].gte(1)
                } else {
                    return false
                }
            },
            unlocked() { return true },
            tooltip() { return "Return an automation shard" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    if (player.cb.buttonAutomationAllocation[1].lt(player.cb.autoAllocateAmt)) amt = player.cb.buttonAutomationAllocation[1]
                    player.cb.buttonAutomationAllocation[1] = player.cb.buttonAutomationAllocation[1].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    if (player.cb.petAutomationAllocation[1].lt(player.cb.autoAllocateAmt)) amt = player.cb.petAutomationAllocation[1]
                    player.cb.petAutomationAllocation[1] = player.cb.petAutomationAllocation[1].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    if (player.cb.boostAutomationAllocation[1].lt(player.cb.autoAllocateAmt)) amt = player.cb.boostAutomationAllocation[1]
                    player.cb.boostAutomationAllocation[1] = player.cb.boostAutomationAllocation[1].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    if (player.cb.pointAutomationAllocation[1].lt(player.cb.autoAllocateAmt)) amt = player.cb.pointAutomationAllocation[1]
                    player.cb.pointAutomationAllocation[1] = player.cb.pointAutomationAllocation[1].sub(amt)
                }
                player.cb.automationShards = player.cb.automationShards.add(amt)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },
        1003: {
            title() { return "–" },
            canClick() {
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    return player.cb.buttonAutomationAllocation[2].gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    return player.cb.petAutomationAllocation[2].gte(1)
                // } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                //     return player.cb.boostAutomationAllocation[2].gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    return player.cb.pointAutomationAllocation[2].gte(1)
                } else {
                    return false
                }
            },
            unlocked() { return true },
            tooltip() { return "Return an automation shard" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    if (player.cb.buttonAutomationAllocation[2].lt(player.cb.autoAllocateAmt)) amt = player.cb.buttonAutomationAllocation[2]
                    player.cb.buttonAutomationAllocation[2] = player.cb.buttonAutomationAllocation[2].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    if (player.cb.petAutomationAllocation[2].lt(player.cb.autoAllocateAmt)) amt = player.cb.petAutomationAllocation[2]
                    player.cb.petAutomationAllocation[2] = player.cb.petAutomationAllocation[2].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    if (player.cb.boostAutomationAllocation[2].lt(player.cb.autoAllocateAmt)) amt = player.cb.boostAutomationAllocation[2]
                    player.cb.boostAutomationAllocation[2] = player.cb.boostAutomationAllocation[2].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    if (player.cb.pointAutomationAllocation[2].lt(player.cb.autoAllocateAmt)) amt = player.cb.pointAutomationAllocation[2]
                    player.cb.pointAutomationAllocation[2] = player.cb.pointAutomationAllocation[2].sub(amt)
                }
                player.cb.automationShards = player.cb.automationShards.add(amt)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },
        1004: {
            title() { return "–" },
            canClick() {
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    return player.cb.buttonAutomationAllocation[3].gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    return player.cb.petAutomationAllocation[3].gte(1)
                // } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                //     return player.cb.boostAutomationAllocation[3].gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    return player.cb.pointAutomationAllocation[3].gte(1)
                } else {
                    return false
                }
            },
            unlocked() { return true },
            tooltip() { return "Return an automation shard" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    if (player.cb.buttonAutomationAllocation[3].lt(player.cb.autoAllocateAmt)) amt = player.cb.buttonAutomationAllocation[3]
                    player.cb.buttonAutomationAllocation[3] = player.cb.buttonAutomationAllocation[3].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    if (player.cb.petAutomationAllocation[3].lt(player.cb.autoAllocateAmt)) amt = player.cb.petAutomationAllocation[3]
                    player.cb.petAutomationAllocation[3] = player.cb.petAutomationAllocation[3].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    if (player.cb.boostAutomationAllocation[3].lt(player.cb.autoAllocateAmt)) amt = player.cb.boostAutomationAllocation[3]
                    player.cb.boostAutomationAllocation[3] = player.cb.boostAutomationAllocation[3].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    if (player.cb.pointAutomationAllocation[3].lt(player.cb.autoAllocateAmt)) amt = player.cb.pointAutomationAllocation[3]
                    player.cb.pointAutomationAllocation[3] = player.cb.pointAutomationAllocation[3].sub(amt)
                }
                player.cb.automationShards = player.cb.automationShards.add(amt)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },
        1005: {
            title() { return "–" },
            canClick() {
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    return player.cb.buttonAutomationAllocation[4].gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    return player.cb.petAutomationAllocation[4].gte(1)
                // } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                //     return player.cb.boostAutomationAllocation[4].gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    return player.cb.pointAutomationAllocation[4].gte(1)
                } else {
                    return false
                }
            },
            unlocked() { return true },
            tooltip() { return "Return an automation shard" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    if (player.cb.buttonAutomationAllocation[4].lt(player.cb.autoAllocateAmt)) amt = player.cb.buttonAutomationAllocation[4]
                    player.cb.buttonAutomationAllocation[4] = player.cb.buttonAutomationAllocation[4].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    if (player.cb.petAutomationAllocation[4].lt(player.cb.autoAllocateAmt)) amt = player.cb.petAutomationAllocation[4]
                    player.cb.petAutomationAllocation[4] = player.cb.petAutomationAllocation[4].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    if (player.cb.boostAutomationAllocation[4].lt(player.cb.autoAllocateAmt)) amt = player.cb.boostAutomationAllocation[4]
                    player.cb.boostAutomationAllocation[4] = player.cb.boostAutomationAllocation[4].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    if (player.cb.pointAutomationAllocation[4].lt(player.cb.autoAllocateAmt)) amt = player.cb.pointAutomationAllocation[4]
                    player.cb.pointAutomationAllocation[4] = player.cb.pointAutomationAllocation[4].sub(amt)
                }
                player.cb.automationShards = player.cb.automationShards.add(amt)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },
        1006: {
            title() { return "–" },
            canClick() {
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    return player.cb.buttonAutomationAllocation[5].gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    return player.cb.petAutomationAllocation[5].gte(1)
                // } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                //     return player.cb.boostAutomationAllocation[5].gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    return player.cb.pointAutomationAllocation[5].gte(1)
                } else {
                    return false
                }
            },
            unlocked() { return true },
            tooltip() { return "Return an automation shard" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    if (player.cb.buttonAutomationAllocation[5].lt(player.cb.autoAllocateAmt)) amt = player.cb.buttonAutomationAllocation[5]
                    player.cb.buttonAutomationAllocation[5] = player.cb.buttonAutomationAllocation[5].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    if (player.cb.petAutomationAllocation[5].lt(player.cb.autoAllocateAmt)) amt = player.cb.petAutomationAllocation[5]
                    player.cb.petAutomationAllocation[5] = player.cb.petAutomationAllocation[5].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    if (player.cb.boostAutomationAllocation[5].lt(player.cb.autoAllocateAmt)) amt = player.cb.boostAutomationAllocation[5]
                    player.cb.boostAutomationAllocation[5] = player.cb.boostAutomationAllocation[5].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    if (player.cb.pointAutomationAllocation[5].lt(player.cb.autoAllocateAmt)) amt = player.cb.pointAutomationAllocation[5]
                    player.cb.pointAutomationAllocation[5] = player.cb.pointAutomationAllocation[5].sub(amt)
                }
                player.cb.automationShards = player.cb.automationShards.add(amt)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },
        1007: {
            title() { return "–" },
            canClick() {
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    return player.cb.buttonAutomationAllocation[6].gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    return player.cb.petAutomationAllocation[6].gte(1)
                // } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                //     return player.cb.boostAutomationAllocation[6].gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    return player.cb.pointAutomationAllocation[6].gte(1)
                } else {
                    return false
                }
            },
            unlocked() { return true },
            tooltip() { return "Return an automation shard" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    if (player.cb.buttonAutomationAllocation[6].lt(player.cb.autoAllocateAmt)) amt = player.cb.buttonAutomationAllocation[6]
                    player.cb.buttonAutomationAllocation[6] = player.cb.buttonAutomationAllocation[6].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    if (player.cb.petAutomationAllocation[6].lt(player.cb.autoAllocateAmt)) amt = player.cb.petAutomationAllocation[6]
                    player.cb.petAutomationAllocation[6] = player.cb.petAutomationAllocation[6].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    if (player.cb.boostAutomationAllocation[6].lt(player.cb.autoAllocateAmt)) amt = player.cb.boostAutomationAllocation[6]
                    player.cb.boostAutomationAllocation[6] = player.cb.boostAutomationAllocation[6].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    if (player.cb.pointAutomationAllocation[6].lt(player.cb.autoAllocateAmt)) amt = player.cb.pointAutomationAllocation[6]
                    player.cb.pointAutomationAllocation[6] = player.cb.pointAutomationAllocation[6].sub(amt)
                }
                player.cb.automationShards = player.cb.automationShards.add(amt)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },
        1008: {
            title() { return "–" },
            canClick() {
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    return player.cb.buttonAutomationAllocation[7].gte(1)
                // } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                //     return player.cb.petAutomationAllocation[7].gte(1)
                // } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                //     return player.cb.boostAutomationAllocation[7].gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    return player.cb.pointAutomationAllocation[7].gte(1)
                } else {
                    return false
                }
            },
            unlocked() { return true },
            tooltip() { return "Return automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    if (player.cb.buttonAutomationAllocation[7].lt(player.cb.autoAllocateAmt)) amt = player.cb.buttonAutomationAllocation[7]
                    player.cb.buttonAutomationAllocation[7] = player.cb.buttonAutomationAllocation[7].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    if (player.cb.petAutomationAllocation[7].lt(player.cb.autoAllocateAmt)) amt = player.cb.petAutomationAllocation[7]
                    player.cb.petAutomationAllocation[7] = player.cb.petAutomationAllocation[7].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    if (player.cb.boostAutomationAllocation[7].lt(player.cb.autoAllocateAmt)) amt = player.cb.boostAutomationAllocation[7]
                    player.cb.boostAutomationAllocation[7] = player.cb.boostAutomationAllocation[7].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    if (player.cb.pointAutomationAllocation[7].lt(player.cb.autoAllocateAmt)) amt = player.cb.pointAutomationAllocation[7]
                    player.cb.pointAutomationAllocation[7] = player.cb.pointAutomationAllocation[7].sub(amt)
                }
                player.cb.automationShards = player.cb.automationShards.add(amt)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },
        1009: {
            title() { return "–" },
            canClick() {
                // if (player.subtabs["cb"]['buttons'] == 'XP') {
                //     return player.cb.buttonAutomationAllocation[8].gte(1)
                // } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                //     return player.cb.petAutomationAllocation[8].gte(1)
                // } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                //     return player.cb.boostAutomationAllocation[8].gte(1)
                /*} else */if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    return player.cb.pointAutomationAllocation[8].gte(1)
                } else {
                    return false
                }
            },
            unlocked() { return true },
            tooltip() { return "Return automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    if (player.cb.buttonAutomationAllocation[8].lt(player.cb.autoAllocateAmt)) amt = player.cb.buttonAutomationAllocation[8]
                    player.cb.buttonAutomationAllocation[8] = player.cb.buttonAutomationAllocation[8].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    if (player.cb.petAutomationAllocation[8].lt(player.cb.autoAllocateAmt)) amt = player.cb.petAutomationAllocation[8]
                    player.cb.petAutomationAllocation[8] = player.cb.petAutomationAllocation[8].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    if (player.cb.boostAutomationAllocation[8].lt(player.cb.autoAllocateAmt)) amt = player.cb.boostAutomationAllocation[8]
                    player.cb.boostAutomationAllocation[8] = player.cb.boostAutomationAllocation[8].sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    if (player.cb.pointAutomationAllocation[8].lt(player.cb.autoAllocateAmt)) amt = player.cb.pointAutomationAllocation[8]
                    player.cb.pointAutomationAllocation[8] = player.cb.pointAutomationAllocation[8].sub(amt)
                }
                player.cb.automationShards = player.cb.automationShards.add(amt)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },

        1101: {
            title() { return "+" },
            canClick() { return player.cb.automationShards.gte(1) },
            unlocked() { return true },
            tooltip() { return "Allocate automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.cb.automationShards.lt(player.cb.autoAllocateAmt)) amt = player.cb.automationShards

                player.cb.automationShards = player.cb.automationShards.sub(amt)
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    player.cb.buttonAutomationAllocation[0] = player.cb.buttonAutomationAllocation[0].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    player.cb.petAutomationAllocation[0] = player.cb.petAutomationAllocation[0].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    player.cb.boostAutomationAllocation[0] = player.cb.boostAutomationAllocation[0].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    player.cb.pointAutomationAllocation[0] = player.cb.pointAutomationAllocation[0].add(amt)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
        1102: {
            title() { return "+" },
            canClick() { return player.cb.automationShards.gte(1) },
            unlocked() { return true },
            tooltip() { return "Allocate automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.cb.automationShards.lt(player.cb.autoAllocateAmt)) amt = player.cb.automationShards
                
                player.cb.automationShards = player.cb.automationShards.sub(amt)
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    player.cb.buttonAutomationAllocation[1] = player.cb.buttonAutomationAllocation[1].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    player.cb.petAutomationAllocation[1] = player.cb.petAutomationAllocation[1].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    player.cb.boostAutomationAllocation[1] = player.cb.boostAutomationAllocation[1].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    player.cb.pointAutomationAllocation[1] = player.cb.pointAutomationAllocation[1].add(amt)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
        1103: {
            title() { return "+" },
            canClick() { return player.cb.automationShards.gte(1) },
            unlocked() { return true },
            tooltip() { return "Allocate automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.cb.automationShards.lt(player.cb.autoAllocateAmt)) amt = player.cb.automationShards
                
                player.cb.automationShards = player.cb.automationShards.sub(amt)
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    player.cb.buttonAutomationAllocation[2] = player.cb.buttonAutomationAllocation[2].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    player.cb.petAutomationAllocation[2] = player.cb.petAutomationAllocation[2].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    player.cb.boostAutomationAllocation[2] = player.cb.boostAutomationAllocation[2].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    player.cb.pointAutomationAllocation[2] = player.cb.pointAutomationAllocation[2].add(amt)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
        1104: {
            title() { return "+" },
            canClick() { return player.cb.automationShards.gte(1) },
            unlocked() { return true },
            tooltip() { return "Allocate automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.cb.automationShards.lt(player.cb.autoAllocateAmt)) amt = player.cb.automationShards
                
                player.cb.automationShards = player.cb.automationShards.sub(amt)
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    player.cb.buttonAutomationAllocation[3] = player.cb.buttonAutomationAllocation[3].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    player.cb.petAutomationAllocation[3] = player.cb.petAutomationAllocation[3].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    player.cb.boostAutomationAllocation[3] = player.cb.boostAutomationAllocation[3].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    player.cb.pointAutomationAllocation[3] = player.cb.pointAutomationAllocation[3].add(amt)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
        1105: {
            title() { return "+" },
            canClick() { return player.cb.automationShards.gte(1) },
            unlocked() { return true },
            tooltip() { return "Allocate automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.cb.automationShards.lt(player.cb.autoAllocateAmt)) amt = player.cb.automationShards
                
                player.cb.automationShards = player.cb.automationShards.sub(amt)
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    player.cb.buttonAutomationAllocation[4] = player.cb.buttonAutomationAllocation[4].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    player.cb.petAutomationAllocation[4] = player.cb.petAutomationAllocation[4].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    player.cb.boostAutomationAllocation[4] = player.cb.boostAutomationAllocation[4].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    player.cb.pointAutomationAllocation[4] = player.cb.pointAutomationAllocation[4].add(amt)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
        1106: {
            title() { return "+" },
            canClick() { return player.cb.automationShards.gte(1) },
            unlocked() { return true },
            tooltip() { return "Allocate automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.cb.automationShards.lt(player.cb.autoAllocateAmt)) amt = player.cb.automationShards
                
                player.cb.automationShards = player.cb.automationShards.sub(amt)
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    player.cb.buttonAutomationAllocation[5] = player.cb.buttonAutomationAllocation[5].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    player.cb.petAutomationAllocation[5] = player.cb.petAutomationAllocation[5].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    player.cb.boostAutomationAllocation[5] = player.cb.boostAutomationAllocation[5].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    player.cb.pointAutomationAllocation[5] = player.cb.pointAutomationAllocation[5].add(amt)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
        1107: {
            title() { return "+" },
            canClick() { return player.cb.automationShards.gte(1) },
            unlocked() { return true },
            tooltip() { return "Allocate automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.cb.automationShards.lt(player.cb.autoAllocateAmt)) amt = player.cb.automationShards
                
                player.cb.automationShards = player.cb.automationShards.sub(amt)
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    player.cb.buttonAutomationAllocation[6] = player.cb.buttonAutomationAllocation[6].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    player.cb.petAutomationAllocation[6] = player.cb.petAutomationAllocation[6].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    player.cb.boostAutomationAllocation[6] = player.cb.boostAutomationAllocation[6].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    player.cb.pointAutomationAllocation[6] = player.cb.pointAutomationAllocation[6].add(amt)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
        1108: {
            title() { return "+" },
            canClick() { return player.cb.automationShards.gte(1) },
            unlocked() { return true },
            tooltip() { return "Allocate automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.cb.automationShards.lt(player.cb.autoAllocateAmt)) amt = player.cb.automationShards
                
                player.cb.automationShards = player.cb.automationShards.sub(amt)
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    player.cb.buttonAutomationAllocation[7] = player.cb.buttonAutomationAllocation[7].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    player.cb.petAutomationAllocation[7] = player.cb.petAutomationAllocation[7].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    player.cb.boostAutomationAllocation[7] = player.cb.boostAutomationAllocation[7].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    player.cb.pointAutomationAllocation[7] = player.cb.pointAutomationAllocation[7].add(amt)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
        1109: {
            title() { return "+" },
            canClick() { return player.cb.automationShards.gte(1) },
            unlocked() { return true },
            tooltip() { return "Allocate automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.cb.automationShards.lt(player.cb.autoAllocateAmt)) amt = player.cb.automationShards
                
                player.cb.automationShards = player.cb.automationShards.sub(amt)
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    player.cb.buttonAutomationAllocation[8] = player.cb.buttonAutomationAllocation[8].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pets') {
                    player.cb.petAutomationAllocation[8] = player.cb.petAutomationAllocation[8].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    player.cb.boostAutomationAllocation[8] = player.cb.boostAutomationAllocation[8].add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    player.cb.pointAutomationAllocation[8] = player.cb.pointAutomationAllocation[8].add(amt)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
    },
    petButton1() {
        let rng = Math.random();

        if (rng > 0.95) {
            addLevelableXP("pet", 201, 1);
            if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                if (!(player.cb.petAutomationTimers[0].lt(1) && player.cb.petAutomationAllocation[0].gt(0)) && player.cb.alertToggle) callAlert("You gained a Teste!", "resources/testeUncommonPet.png");
            }
        } else if (rng > 0.82) {
            addLevelableXP("pet", 105, 1);
            if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                if (!(player.cb.petAutomationTimers[0].lt(1) && player.cb.petAutomationAllocation[0].gt(0)) && player.cb.alertToggle) callAlert("You gained a Slax!", "resources/slaxCommonPet.png");
            }
        } else if (rng > 0.66) {
            addLevelableXP("pet", 104, 1);
            if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                if (!(player.cb.petAutomationTimers[0].lt(1) && player.cb.petAutomationAllocation[0].gt(0)) && player.cb.alertToggle) callAlert("You gained a Gd Checkpoint!", "resources/checkpointCommonPet.png");
            }
        } else if (rng > 0.49) {
            addLevelableXP("pet", 103, 1);
            if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                if (!(player.cb.petAutomationTimers[0].lt(1) && player.cb.petAutomationAllocation[0].gt(0)) && player.cb.alertToggle) callAlert("You gained an Unsmith!", "resources/unsmithCommonPet.png");
            }
        } else if (rng > 0.27) {
            addLevelableXP("pet", 102, 1);
            if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                if (!(player.cb.petAutomationTimers[0].lt(1) && player.cb.petAutomationAllocation[0].gt(0)) && player.cb.alertToggle) callAlert("You gained an Egg Guy!", "resources/eggCommonPet.png");
            }
        } else {
            addLevelableXP("pet", 101, 1);
            if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                if (!(player.cb.petAutomationTimers[0].lt(1) && player.cb.petAutomationAllocation[0].gt(0)) && player.cb.alertToggle) callAlert("You gained a Gwa!", "resources/gwaCommonPet.png");
            }
        }
    },
    petButton2() {
        let rng = Math.random();

        if (rng > 0.93) {
            addLevelableXP("pet", 301, 1);
            if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                if (!(player.cb.petAutomationTimers[1].lt(1) && player.cb.petAutomationAllocation[1].gt(0)) && player.cb.alertToggle) callAlert("You gained a Nova!", "resources/novaRarePet.png");
            }
        } else if (rng > 0.82) {
            addLevelableXP("pet", 205, 1);
            if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                if (!(player.cb.petAutomationTimers[1].lt(1) && player.cb.petAutomationAllocation[1].gt(0)) && player.cb.alertToggle) callAlert("You gained THE WATCHING EYE!", "resources/eyeUncommonPet.png");
            }
        } else if (rng > 0.70) {
            addLevelableXP("pet", 204, 1);
            if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                if (!(player.cb.petAutomationTimers[1].lt(1) && player.cb.petAutomationAllocation[1].gt(0)) && player.cb.alertToggle) callAlert("You gained a Shark!", "resources/sharkUncommonPet.png");
            }
        } else if (rng > 0.58) {
            addLevelableXP("pet", 203, 1);
            if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                if (!(player.cb.petAutomationTimers[1].lt(1) && player.cb.petAutomationAllocation[1].gt(0)) && player.cb.alertToggle) callAlert("You gained a Normal Face!", "resources/normalFaceUncommonPet.png");
            }
        } else if (rng > 0.46) {
            addLevelableXP("pet", 202, 1);
            if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                if (!(player.cb.petAutomationTimers[1].lt(1) && player.cb.petAutomationAllocation[1].gt(0)) && player.cb.alertToggle) callAlert("You gained a Star!", "resources/starUncommonPet.png");
            }
        } else if (rng > 0.35) {
            addLevelableXP("pet", 201, 1);
            if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                if (!(player.cb.petAutomationTimers[1].lt(1) && player.cb.petAutomationAllocation[1].gt(0)) && player.cb.alertToggle) callAlert("You gained a Teste!", "resources/testeUncommonPet.png");
            }
        }else if (rng > 0.28) {
            addLevelableXP("pet", 105, 3);
            if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                if (!(player.cb.petAutomationTimers[1].lt(1) && player.cb.petAutomationAllocation[1].gt(0)) && player.cb.alertToggle) callAlert("You gained 3 Slaxes!", "resources/slaxCommonPet.png");
            }
        } else if (rng > 0.21) {
            addLevelableXP("pet", 104, 3);
            if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                if (!(player.cb.petAutomationTimers[1].lt(1) && player.cb.petAutomationAllocation[1].gt(0)) && player.cb.alertToggle) callAlert("You gained 3 Gd Checkpoints!", "resources/checkpointCommonPet.png");
            }
        } else if (rng > 0.14) {
            addLevelableXP("pet", 103, 3);
            if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                if (!(player.cb.petAutomationTimers[1].lt(1) && player.cb.petAutomationAllocation[1].gt(0)) && player.cb.alertToggle) callAlert("You gained 3 Unsmiths!", "resources/unsmithCommonPet.png");
            }
        } else if (rng > 0.7) {
            addLevelableXP("pet", 102, 3);
            if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                if (!(player.cb.petAutomationTimers[1].lt(1) && player.cb.petAutomationAllocation[1].gt(0)) && player.cb.alertToggle) callAlert("You gained 3 Egg Guys!", "resources/eggCommonPet.png");
            }
        } else {
            addLevelableXP("pet", 101, 3);
            if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                if (!(player.cb.petAutomationTimers[1].lt(1) && player.cb.petAutomationAllocation[1].gt(0)) && player.cb.alertToggle) callAlert("You gained 3 Gwas!", "resources/gwaCommonPet.png");
            }
        }
    },
    petButton3() {
        let rng = Math.random();

        if (rng > 0.2) {
            let random =  getRandomInt(5)
            if (random == 0) {
                addLevelableXP("pet", 201, 1);
                player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(8);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[2].lt(1) && player.cb.petAutomationAllocation[2].gt(0)) && player.cb.alertToggle) callAlert("You gained a Teste!", "resources/testeUncommonPet.png");
                }
            } else if (random == 1) {
                addLevelableXP("pet", 202, 1);
                player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(8);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[2].lt(1) && player.cb.petAutomationAllocation[2].gt(0)) && player.cb.alertToggle) callAlert("You gained a Star!", "resources/starUncommonPet.png");
                }
            } else if (random == 2) {
                addLevelableXP("pet", 203, 1);
                player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(8);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[2].lt(1) && player.cb.petAutomationAllocation[2].gt(0)) && player.cb.alertToggle) callAlert("You gained a Normal Face!", "resources/normalFaceUncommonPet.png");
                }
            } else if (random == 3) {
                addLevelableXP("pet", 204, 1);
                player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(8);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[2].lt(1) && player.cb.petAutomationAllocation[2].gt(0)) && player.cb.alertToggle) callAlert("You gained a Shark!", "resources/sharkUncommonPet.png");
                }
            }  else if (random == 4) {
                addLevelableXP("pet", 205, 1);
                player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(8);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[2].lt(1) && player.cb.petAutomationAllocation[2].gt(0)) && player.cb.alertToggle) callAlert("You gained THE WATCHING EYE!", "resources/eyeUncommonPet.png");
                }
            }
        }
        if (rng < 0.2) {
            if (rng > 0.08) {
                addLevelableXP("pet", 304, 1);
                player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(8);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[2].lt(1) && player.cb.petAutomationAllocation[2].gt(0)) && player.cb.alertToggle) callAlert("You gained a Goofy Ahh Thing!", "resources/goofyAhhThingRarePet.png");
                }
            }
            if (rng < 0.08) {
                player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                player.cb.pityEvoCurrent = new Decimal(0);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[2].lt(1) && player.cb.petAutomationAllocation[2].gt(0)) && player.cb.alertToggle) callAlert("You gained an Evolution Shard! (8%)", "resources/evoShard.png");
                }
            }
        }
    },
    petButton4() {
        let rng = Math.random();
        let gainedPets = new Decimal(0)
        if (rng > 0.5) {
            let random =  getRandomInt(2)
            let gainedPets = getRandomInt(4) + 4
            if (random == 0) {
                addLevelableXP("pet", 106, gainedPets);
                player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(15);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[3].lt(1) && player.cb.petAutomationAllocation[3].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedPets) + " Spiders!", "resources/spiderCommonPet.png");
                }
            } else if (random == 1) {
                addLevelableXP("pet", 107, gainedPets);
                player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(15);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[3].lt(1) && player.cb.petAutomationAllocation[3].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedPets) + " Blobs!", "resources/blobCommonPet.png");
                }
            }
        } else if (rng > 0.2 && rng < 0.5) {
            let random =  getRandomInt(2)
            let gainedPets = getRandomInt(2) + 2
            if (random == 0) {
                addLevelableXP("pet", 206, gainedPets);
                player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(15);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[3].lt(1) && player.cb.petAutomationAllocation[3].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedPets) + " Clocks!", "resources/clockUncommonPet.png");
                }
            } else if (random == 1) {
                addLevelableXP("pet", 207, gainedPets);
                player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(15);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[3].lt(1) && player.cb.petAutomationAllocation[3].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedPets) + " Trollfaces!", "resources/trollUncommonPet.png");
                }
            }
        }
        else if (rng < 0.2) {
            if (rng > 0.05) {
                addLevelableXP("pet", 305, 1);
                player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(15);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[3].lt(1) && player.cb.petAutomationAllocation[3].gt(0)) && player.cb.alertToggle) callAlert("You gained an Antimatter!", "resources/antimatterRarePet.png");
                }
            }
            if (rng < 0.05) {
                player.cb.evolutionShards = player.cb.evolutionShards.add(3);
                player.cb.pityEvoCurrent = new Decimal(0);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[3].lt(1) && player.cb.petAutomationAllocation[3].gt(0)) && player.cb.alertToggle) callAlert("You gained 3 Evolution Shards!", "resources/evoShard.png");
                }
            }
        }
    },
    petButton5() {
        let rng = Math.random();
        let gainedPets = new Decimal(0)
        if (rng > 0.5) {
            let random =  getRandomInt(2)
            let gainedPets = getRandomInt(4) + 2
            if (random == 0) {
                addLevelableXP("pet", 108, gainedPets);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[4].lt(1) && player.cb.petAutomationAllocation[4].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedPets) + " Replicators!", "resources/replicatorCommonPet.png");
                }
            } else if (random == 1) {
                addLevelableXP("pet", 109, gainedPets);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[4].lt(1) && player.cb.petAutomationAllocation[4].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedPets) + " Smoke!", "resources/smokeCommonPet.png");
                }
            }
        } else if (rng > 0.2 && rng < 0.5) {
            let random =  getRandomInt(2)
            let gainedPets = getRandomInt(1) + 1
            if (random == 0) {
                addLevelableXP("pet", 208, gainedPets);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[4].lt(1) && player.cb.petAutomationAllocation[4].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedPets) + " Infinity Breakers!", "resources/infinityBreakerUncommonPet.png");
                }
            } else if (random == 1) {
                addLevelableXP("pet", 209, gainedPets);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[4].lt(1) && player.cb.petAutomationAllocation[4].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedPets) + " Johns!", "resources/johnUncommonPet.png");
                }
            }
        }
        else if (rng < 0.2) {
            if (rng > 0.1) {
                addLevelableXP("pet", 306, 1);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[4].lt(1) && player.cb.petAutomationAllocation[4].gt(0)) && player.cb.alertToggle) callAlert("You gained a Hex Shadow!", "resources/hexShadowRarePet.png");
                }
            }
            if (rng < 0.1) {
                addLevelableXP("pet", 307, 1);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[4].lt(1) && player.cb.petAutomationAllocation[4].gt(0)) && player.cb.alertToggle) callAlert("You gained a Grass Square!", "resources/grassSquareRarePet.png");
                }
            }
        }
    },
    petButton6() {
        let rng = Math.random();
        if (rng > 0.3) {
            let random =  getRandomInt(7)
            let gainedPets = getRandomInt(2) + 1
            if (random == 0) {
                addLevelableXP("pet", 301, gainedPets);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[5].lt(1) && player.cb.petAutomationAllocation[5].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedPets) + " Novas!", "resources/novaRarePet.png");
                }
            } else if (random == 1) {
                addLevelableXP("pet", 302, gainedPets);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[5].lt(1) && player.cb.petAutomationAllocation[5].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedPets) + " Dices!", "resources/diceRarePet.png");
                }
            }
            else if (random == 2) {
                addLevelableXP("pet", 303, gainedPets);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[5].lt(1) && player.cb.petAutomationAllocation[5].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedPets) + " Drippy Ufos!", "resources/ufoRarePet.png");
                }
            }
            else if (random == 3) {
                addLevelableXP("pet", 304, gainedPets);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[5].lt(1) && player.cb.petAutomationAllocation[5].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedPets) + " Goofy Ahh Things!", "resources/goofyAhhThingRarePet.png");
                }
            }
            else if (random == 4) {
                addLevelableXP("pet", 305, gainedPets);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[5].lt(1) && player.cb.petAutomationAllocation[5].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedPets) + " Antimatters!", "resources/antimatterRarePet.png");
                }
            }
            else if (random == 5) {
                addLevelableXP("pet", 306, gainedPets);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[5].lt(1) && player.cb.petAutomationAllocation[5].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedPets) + " Hex Shadows!", "resources/hexShadowRarePet.png");
                }
            }
            else if (random == 6) {
                addLevelableXP("pet", 307, gainedPets);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[5].lt(1) && player.cb.petAutomationAllocation[5].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedPets) + " Grass Squares!", "resources/grassSquareRarePet.png");
                }
            }
        }
        else if (rng < 0.3) {
            let random =  getRandomInt(3)
            let random1 =  getRandomInt(4)
            let gainedFragments = getRandomInt(3) + 1
            if (random == 0) {
                addLevelableXP("pet", 401, gainedFragments);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (random1 == 0 && !(player.cb.petAutomationTimers[5].lt(1) && player.cb.petAutomationAllocation[5].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment1.png");
                    if (random1 == 1 && !(player.cb.petAutomationTimers[5].lt(1) && player.cb.petAutomationAllocation[5].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment2.png");
                    if (random1 == 2 && !(player.cb.petAutomationTimers[5].lt(1) && player.cb.petAutomationAllocation[5].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment3.png");
                    if (random1 == 3 && !(player.cb.petAutomationTimers[5].lt(1) && player.cb.petAutomationAllocation[5].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dotknightEpicPetFragment4.png");
                }
            } else if (random == 1) {
                addLevelableXP("pet", 402, gainedFragments);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (random1 == 0 && !(player.cb.petAutomationTimers[5].lt(1) && player.cb.petAutomationAllocation[5].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment1.png");
                    if (random1 == 1 && !(player.cb.petAutomationTimers[5].lt(1) && player.cb.petAutomationAllocation[5].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment2.png");
                    if (random1 == 2 && !(player.cb.petAutomationTimers[5].lt(1) && player.cb.petAutomationAllocation[5].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment3.png");
                    if (random1 == 3 && !(player.cb.petAutomationTimers[5].lt(1) && player.cb.petAutomationAllocation[5].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/dragonEpicPetFragment4.png");
                }
            }
            else if (random == 2) {
                addLevelableXP("pet", 403, gainedFragments);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (random1 == 0 && !(player.cb.petAutomationTimers[5].lt(1) && player.cb.petAutomationAllocation[5].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment1.png");
                    if (random1 == 1 && !(player.cb.petAutomationTimers[5].lt(1) && player.cb.petAutomationAllocation[5].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment2.png");
                    if (random1 == 2 && !(player.cb.petAutomationTimers[5].lt(1) && player.cb.petAutomationAllocation[5].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment3.png");
                    if (random1 == 3 && !(player.cb.petAutomationTimers[5].lt(1) && player.cb.petAutomationAllocation[5].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedFragments) + " ???!", "resources/cookieEpicPetFragment4.png");
                }
            }
        }
    },
    petButton7() {
        let rng = Math.random();
        if (rng > 0.4) {
            let random =  getRandomInt(2)
            let gainedPets = getRandomInt(3) + 3
            if (random == 0) {
                addLevelableXP("pet", 308, gainedPets);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[6].lt(1) && player.cb.petAutomationAllocation[6].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedPets) + " Impossible Triangles!", "resources/impossibleTriangleRarePet.png");
                }
                player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(10)
            } else if (random == 1) {
                addLevelableXP("pet", 309, gainedPets);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[6].lt(1) && player.cb.petAutomationAllocation[6].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedPets) + " Forbidden Cores!", "resources/forbiddenCoreRarePet.png");
                }
                player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(10)
            }
        } else if (rng < 0.4 && rng > 0.3) {
            let gainedShards = getRandomInt(1) + 1
            player.cb.paragonShards = player.cb.paragonShards.add(gainedShards);
            if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                if (!(player.cb.petAutomationTimers[6].lt(1) && player.cb.petAutomationAllocation[6].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedShards) + " Paragon Shards!", "resources/paragonShard.png");
            }
        } else if (rng < 0.3 && rng > 0.05) {
            let gainedFragments = getRandomInt(3) + 5
            player.pet.singularityFragments = player.pet.singularityFragments.add(gainedFragments);
            if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                if (!(player.cb.petAutomationTimers[6].lt(1) && player.cb.petAutomationAllocation[6].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedFragments) + " Singularity Fragments!", "resources/singularityEpicPetFragment.png");
            }
            player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(10)
        } else if (rng < 0.05) {
            //the legendary stuff
            let random = getRandomInt(3)
            let gainedGems = getRandomInt(5) + 6
            if (random == 0) {
                player.cb.legendaryPetGems[0] = player.cb.legendaryPetGems[0].add(gainedGems);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[6].lt(1) && player.cb.petAutomationAllocation[6].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedGems) + " Red Legendary Gems!", "resources/redLegendaryPetGem.png");
                }
            }
            if (random == 1) {
                player.cb.legendaryPetGems[1] = player.cb.legendaryPetGems[1].add(gainedGems);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[6].lt(1) && player.cb.petAutomationAllocation[6].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedGems) + " Purple Legendary Gems!", "resources/purpleLegendaryPetGem.png");
                }
            }
            if (random == 2) {
                player.cb.legendaryPetGems[2] = player.cb.legendaryPetGems[2].add(gainedGems);
                if (!(player.tab == "cb" && player.subtabs["cb"]['stuff'] == 'Pets' && player.subtabs["pet"]['Content'] == 'Pet Shop')) {
                    if (!(player.cb.petAutomationTimers[6].lt(1) && player.cb.petAutomationAllocation[6].gt(0)) && player.cb.alertToggle) callAlert("You gained " + formatWhole(gainedGems) + " Green Legendary Gems!", "resources/greenLegendaryPetGem.png");
                }
            }
            player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(10)
        }
    },
    bars: {
        xpbar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 825,
            height: 50,
            progress() {
                return player.cb.xp.div(player.cb.req)
            },
            fillStyle: {
                backgroundColor: "#094599",
            },
            borderStyle: {
                borderTop: "0px",
                borderRadius: "0px 0px 10px 10px",
            },
            display() {
                if (player.cb.level.lt(10000)) {
                    return "<h5>" + format(player.cb.xp) + "/" + formatWhole(player.cb.req) + "<h5> XP to level up.</h5>"
                } else if (player.cb.level.lt(100000)) {
                    return "<h5>" + format(player.cb.xp) + "/" + formatWhole(player.cb.req) + "<h5> XP to level up.<h6><b style='color:red'>[SOFTCAPPED]</b></h6>"
                } else {
                    return "<h5>" + format(player.cb.xp) + "/" + formatWhole(player.cb.req) + "<h5> XP to level up.<h6><b style='color:red'>[SOFTCAPPED<sup>2</sup>]</b></h6>"
                }
            },
        },
    },
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(420).div(levelableEffect("pet", 203)[2]).div(levelableEffect("pet", 304)[1]) },
            costGrowth() { return new Decimal(2.05) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.cb.totalxp},
            pay(amt) { player.cb.totalxp = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back OTF Boost."
            },
            display() {
                return "which are multiplying hex 1 points, rocket fuel, and dice points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(layers.cb.xpToLevel(tmp[this.layer].buyables[this.id].cost)) + " Check Back Levels worth of XP."
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    layers.cb.levelup()
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    layers.cb.levelup()
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#0951a6'}
        },
        12: {
            costBase() { return new Decimal(950).div(levelableEffect("pet", 203)[2]).div(levelableEffect("pet", 304)[1]) },
            costGrowth() { return new Decimal(2.22) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.cb.totalxp},
            pay(amt) { player.cb.totalxp = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.5).pow(1.5).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back IP Boost."
            },
            display() {
                return "which are multiplying infinity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(layers.cb.xpToLevel(tmp[this.layer].buyables[this.id].cost)) + " Check Back Levels worth of XP."
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    layers.cb.levelup()
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    layers.cb.levelup()
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#0951a6'}
        },
        13: {
            costBase() { return new Decimal(2750).div(levelableEffect("pet", 203)[2]).div(levelableEffect("pet", 304)[1]) },
            costGrowth() { return new Decimal(2.4) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.cb.totalxp},
            pay(amt) { player.cb.totalxp = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back XP Boost Boost."
            },
            display() {
                return "which are multiplying XPBoost by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(layers.cb.xpToLevel(tmp[this.layer].buyables[this.id].cost)) + " Check Back Levels worth of XP."
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    layers.cb.levelup()
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    layers.cb.levelup()
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#0951a6'}
        },
        14: {
            costBase() { return new Decimal(7500).div(levelableEffect("pet", 203)[2]).div(levelableEffect("pet", 304)[1]) },
            costGrowth() { return new Decimal(2.75) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.cb.totalxp},
            pay(amt) { player.cb.totalxp = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back Pet Point Boost."
            },
            display() {
                return "which are multiplying pet points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(layers.cb.xpToLevel(tmp[this.layer].buyables[this.id].cost)) + " Check Back Levels worth of XP."
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    layers.cb.levelup()
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    layers.cb.levelup()
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#0951a6'}
        },
        15: {
            costBase() { return new Decimal(1850).div(levelableEffect("pet", 203)[2]).div(levelableEffect("pet", 304)[1]) },
            costGrowth() { return new Decimal(2.3) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.cb.totalxp},
            pay(amt) { player.cb.totalxp = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.25).mul(0.15).add(1) },
            unlocked() { return hasUpgrade("i", 22)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back Pollinators Boost."
            },
            display() {
                return "which are multiplying pollinators by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(layers.cb.xpToLevel(tmp[this.layer].buyables[this.id].cost)) + " Check Back Levels worth of XP."
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    layers.cb.levelup()
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    layers.cb.levelup()
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#0951a6'}
        },
        16: {
            costBase() { return new Decimal(10000).div(levelableEffect("pet", 203)[2]).div(levelableEffect("pet", 304)[1]) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.cb.totalxp},
            pay(amt) { player.cb.totalxp = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(5) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back Pity Req. Reducer."
            },
            display(mult) {
                return "which are reducing the pity requirement by " + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(layers.cb.xpToLevel(tmp[this.layer].buyables[this.id].cost)) + " Check Back Levels worth of XP."
            },
            buy() {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    layers.cb.levelup()
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    layers.cb.levelup()
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#0951a6'}
        },

        21: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() {
                if (!(player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23))) {
                    return new Decimal(6)
                } else {
                    return new Decimal(7)
                }
            },
            currency() { return player.cb.paragonShards},
            pay(amt) { player.cb.paragonShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id)},
            unlocked() { return player.ev.evolutionsUnlocked[9] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Pet Automation Unlocker."
            },
            display() {
                return "which unlocking automation for " + formatWhole(tmp[this.layer].buyables[this.id].effect) + " pet crates.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Paragon Shards."
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
            style: { width: '275px', height: '150px', backgroundColor: '#4C64FF'}
        },
        22: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(4) },
            purchaseLimit() { return new Decimal(2) },
            currency() { return player.cb.paragonShards},
            pay(amt) { player.cb.paragonShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id)},
            unlocked() { return false },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "XPBoost Automation Unlocker."
            },
            display() {
                return "which unlocking automation for " + formatWhole(tmp[this.layer].buyables[this.id].effect) + " XPBoost Buttons.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Paragon Shards."
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
            style: { width: '275px', height: '150px', backgroundColor: '#4C64FF'}
        },
        23: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(9) },
            currency() { return player.cb.paragonShards},
            pay(amt) { player.cb.paragonShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id)},
            unlocked() { return false },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Pet Point Automation Unlocker."
            },
            display() {
                return "which unlocking automation for " + formatWhole(tmp[this.layer].buyables[this.id].effect) + " pet point buttons.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Paragon Shards."
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
            style: { width: '275px', height: '150px', backgroundColor: '#4C64FF'}
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {
        1: {
            title: "Check Back",
            body() { return "Created by Marcel Acoplao, Check Back is a very powerful method for superphysical value extraction, due to it's high time demands. It was developed for celestial hunters in training, as a way to get stronger. However, it fell out of fashion as new methods for superphysical extraction became popular, such as ??? and ?????????." },
            unlocked() { return hasUpgrade("s", 23) },      
        },
        2: {
            title: "Pets",
            body() { return "After Check Back fell out of fashion, Marcel started creating pets out of superphysical values. These pets ranged from real creatures to abstract beings. Each of them had a special effect that boosted certain superphysical values. Marcel soon discovered a byproduct of check back, which were evolution and paragon shards. He discovered that pets could be evolved with these shards. However, Marcel noticed that some pets linked to actual beings, such as colleagues from the corporation and other specific beings..." },
            unlocked() { return hasUpgrade("s", 23) },      
        },
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return {color: "#094599", borderColor: "#094599", borderRadius: "5px"}},
                unlocked() { return true },
                content: [
                    ["microtabs", "buttons", { 'border-width': '0px' }],
                ]
            },
            "Lore": {
                buttonStyle() { return { 'color': '#06366e' } },
                unlocked() { return hasUpgrade("s", 23) },
                content: [
                    ["blank", "25px"],
                    ["infobox", "1"],
                    ["infobox", "2"],
                    ["infobox", "3"],
                    ["infobox", "4"],
                ]
            },
            "Pets": {
                buttonStyle() { return {color: "#094599", borderColor: "#094599", borderRadius: "5px"}},
                unlocked() { return player.cb.highestLevel.gte(10) },
                embedLayer: 'pet',
            },
            "Evolution": {
                buttonStyle() { return {color: "#1500bf", borderColor: "#1500bf", backgroundImage: "linear-gradient(90deg, #d487fd, #4b79ff)", borderRadius: "5px" }},
                unlocked() { return player.cb.highestLevel.gte(35)  },
                embedLayer: 'ev'
            },
            "Buyables": {
                buttonStyle() { return {color: "#094599", borderColor: "#094599", borderRadius: "5px"}},
                unlocked() { return hasChallenge("ip", 17) },
                content: [
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 15]]],
                    ["row", [["ex-buyable", 13], ["ex-buyable", 14], ["ex-buyable", 16]]],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 21], ["ex-buyable", 22], ["ex-buyable", 23]]],
                ]
            },
        },
        buttons: {
            "XP": {
                buttonStyle() { return {color: "#094599", borderColor: "#094599", borderRadius: "5px"}},
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "10px"],
                    ["row", [
                        ["column", [
                            ["clickable", 11], ["clickable", 12], ["clickable", 13], ["clickable", 14],
                            ["clickable", 15], ["clickable", 16], ["clickable", 17], ["clickable", 18],
                            ["clickable", 99],
                        ]],
                        ["style-column", [
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1001]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.buttonAutomationAllocation[0])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.buttonAutomationTimers[0]) + "/" +  format(player.cb.buttonAutomationTimersMax[0])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1101]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], {width: "344px", height: "47px", borderBottom: "3px solid black"}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1002]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.buttonAutomationAllocation[1])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.buttonAutomationTimers[1]) + "/" +  format(player.cb.buttonAutomationTimersMax[1])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1102]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !player.cb.highestLevel.gte(3) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1003]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.buttonAutomationAllocation[2])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.buttonAutomationTimers[2]) + "/" +  format(player.cb.buttonAutomationTimersMax[2])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1103]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !player.cb.highestLevel.gte(6) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1004]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.buttonAutomationAllocation[3])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.buttonAutomationTimers[3]) + "/" +  format(player.cb.buttonAutomationTimersMax[3])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1104]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !hasMilestone("r", 17) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1005]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.buttonAutomationAllocation[4])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.buttonAutomationTimers[4]) + "/" +  format(player.cb.buttonAutomationTimersMax[4])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1105]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !player.cb.highestLevel.gte(15) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1006]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.buttonAutomationAllocation[5])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.buttonAutomationTimers[5]) + "/" +  format(player.cb.buttonAutomationTimersMax[5])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1106]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !player.cb.highestLevel.gte(50) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1007]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.buttonAutomationAllocation[6])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.buttonAutomationTimers[6]) + "/" +  format(player.cb.buttonAutomationTimersMax[6])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1107]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !player.cb.highestLevel.gte(65) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1008]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.buttonAutomationAllocation[7])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.buttonAutomationTimers[7]) + "/" +  format(player.cb.buttonAutomationTimersMax[7])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1108]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !player.cb.highestLevel.gte(150) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"}}],
                            ["style-row", [
                                ["clickable", 401], ["clickable", 402], ["clickable", 403]
                            ], {width: "344px", height: "47px", backgroundColor: "#666666"}],
                        ], () => {return player.ev.evolutionsUnlocked[4] ? {border: "3px solid black", marginLeft: "10px"} : {display: "none !important"}}],
                    ]],
                ]
            },
            "Pets": {
                buttonStyle() { return {color: "#4e7cff", borderColor: "#4e7cff", borderRadius: "5px"}},
                unlocked() { return player.cb.highestLevel.gte(10) },
                content: [
                    ["blank", "10px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "10px"],
                    ["row", [
                        ["column", [
                            ["clickable", 101], ["clickable", 102], ["clickable", 103], ["clickable", 104],
                            ["clickable", 105], ["clickable", 106], ["clickable", 107],
                            ["clickable", 199],
                        ]],
                        ["style-column", [
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1001]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.petAutomationAllocation[0])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.petAutomationTimers[0]) + "/" +  format(player.cb.petAutomationTimersMax[0])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1101]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(player.cb.highestLevel.gte(10)) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"} }],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1002]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.petAutomationAllocation[1])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.petAutomationTimers[1]) + "/" +  format(player.cb.petAutomationTimersMax[1])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1102]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(player.cb.highestLevel.gte(25)) ? {display: "none !important"} : getBuyableAmount("cb", 21).gte(2) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1003]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.petAutomationAllocation[2])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.petAutomationTimers[2]) + "/" +  format(player.cb.petAutomationTimersMax[2])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1103]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(player.cb.highestLevel.gte(75)) ? {display: "none !important"} : getBuyableAmount("cb", 21).gte(3) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1004]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.petAutomationAllocation[3])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.petAutomationTimers[3]) + "/" +  format(player.cb.petAutomationTimersMax[3])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1104]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(player.cb.highestLevel.gte(125)) ? {display: "none !important"} : getBuyableAmount("cb", 21).gte(4) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1005]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.petAutomationAllocation[4])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.petAutomationTimers[4]) + "/" +  format(player.cb.petAutomationTimersMax[4])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1105]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(player.cb.highestLevel.gte(1500) && player.ca.unlockedCante) ? {display: "none !important"} : getBuyableAmount("cb", 21).gte(5) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1006]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.petAutomationAllocation[5])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.petAutomationTimers[5]) + "/" +  format(player.cb.petAutomationTimersMax[5])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1106]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(player.cb.highestLevel.gte(1500) && player.ca.unlockedCante) ? {display: "none !important"} : getBuyableAmount("cb", 21).gte(6) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1007]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.petAutomationAllocation[6])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.petAutomationTimers[6]) + "/" +  format(player.cb.petAutomationTimersMax[6])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1107]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23)) ? {display: "none !important"} : getBuyableAmount("cb", 21).gte(7) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["clickable", 401], ["clickable", 402], ["clickable", 403]
                            ], {width: "344px", height: "47px", backgroundColor: "#666666"}],
                        ], () => {return getBuyableAmount("cb", 21).gte(1) ? {border: "3px solid black", backgroundColor: "black", marginLeft: "10px"} : {display: "none !important"}}],
                    ]],
                ]
            },
            "XPBoost": {
                buttonStyle() { return {color: "#00B229", borderColor: "#00B229", borderRadius: "5px"}},
                unlocked() { return player.cb.highestLevel.gte(100) && hasUpgrade("ip", 31) },
                content: [
                    ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", "XPBoost", {color: "white", fontSize: "30px", fontFamily: "monospace"}],
                        ["blank", "5px"],
                        ["h-line", "380px"],
                        ["blank", "5px"],
                        ["raw-html", "Reset Levels and XP to gain XPBoost,<br>which boosts XP gain.", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "400px", padding: "10px", border: "3px solid white", borderRadius: "15px", backgroundColor: "#001903"}],
                    ["blank", "10px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "10px"],
                    ["row", [
                        ["column", [
                            ["clickable", 301], ["clickable", 302],
                            ["style-row", [], {width: "200px", height: "50px"}],
                        ]],
                        ["style-column", [
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1001]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.boostAutomationAllocation[0])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.boostAutomationTimers[0]) + "/" +  format(player.cb.boostAutomationTimersMax[0])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1101]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(player.cb.highestLevel.gte(100)) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"} }],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1002]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.boostAutomationAllocation[1])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.boostAutomationTimers[1]) + "/" +  format(player.cb.boostAutomationTimersMax[1])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1102]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(player.cb.highestLevel.gte(666)) ? {display: "none !important"} : getBuyableAmount("cb", 22).gte(2) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["clickable", 401], ["clickable", 402], ["clickable", 403]
                            ], {width: "344px", height: "47px", backgroundColor: "#666666"}],
                        ], () => {return getBuyableAmount("cb", 22).gte(1) ? {border: "3px solid black", backgroundColor: "black", marginLeft: "10px"} : {display: "none !important"}}],
                    ]],
                ]
            },
            "Pet Points": {
                buttonStyle() { return {color: "#A2D800", borderColor: "#A2D800", borderRadius: "5px"}},
                unlocked() { return player.cb.highestLevel.gte(100) && hasUpgrade("ip", 31) },
                content: [
                    ["blank", "10px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "10px"],
                    ["row", [
                        ["column", [
                            ["clickable", 201], ["clickable", 202], ["clickable", 203], ["clickable", 204],
                            ["clickable", 205], ["clickable", 206], ["clickable", 207], ["clickable", 208],
                            ["clickable", 209],
                            ["clickable", 299],
                        ]],
                        ["style-column", [
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1001]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.pointAutomationAllocation[0])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.pointAutomationTimers[0]) + "/" +  format(player.cb.pointAutomationTimersMax[0])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1101]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(getLevelableAmount("pet", 301).gte(1)) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"} }],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1002]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.pointAutomationAllocation[1])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.pointAutomationTimers[1]) + "/" +  format(player.cb.pointAutomationTimersMax[1])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1102]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(getLevelableAmount("pet", 302).gte(1)) ? {display: "none !important"} : getBuyableAmount("cb", 23).gte(2) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1003]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.pointAutomationAllocation[2])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.pointAutomationTimers[2]) + "/" +  format(player.cb.pointAutomationTimersMax[2])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1103]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(getLevelableAmount("pet", 303).gte(1)) ? {display: "none !important"} : getBuyableAmount("cb", 23).gte(3) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1004]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.pointAutomationAllocation[3])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.pointAutomationTimers[3]) + "/" +  format(player.cb.pointAutomationTimersMax[3])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1104]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(getLevelableAmount("pet", 304).gte(1)) ? {display: "none !important"} : getBuyableAmount("cb", 23).gte(4) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1005]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.pointAutomationAllocation[4])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.pointAutomationTimers[4]) + "/" +  format(player.cb.pointAutomationTimersMax[4])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1105]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(getLevelableAmount("pet", 305).gte(1)) ? {display: "none !important"} : getBuyableAmount("cb", 23).gte(5) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1006]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.pointAutomationAllocation[5])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.pointAutomationTimers[5]) + "/" +  format(player.cb.pointAutomationTimersMax[5])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1106]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(getLevelableAmount("pet", 306).gte(1)) ? {display: "none !important"} : getBuyableAmount("cb", 23).gte(6) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1007]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.pointAutomationAllocation[6])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.pointAutomationTimers[6]) + "/" +  format(player.cb.pointAutomationTimersMax[6])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1107]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(getLevelableAmount("pet", 307).gte(1)) ? {display: "none !important"} : getBuyableAmount("cb", 23).gte(7) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1008]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.pointAutomationAllocation[7])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.pointAutomationTimers[7]) + "/" +  format(player.cb.pointAutomationTimersMax[7])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1108]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(getLevelableAmount("pet", 308).gte(1)) ? {display: "none !important"} : getBuyableAmount("cb", 23).gte(8) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1009]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.pointAutomationAllocation[8])}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.pointAutomationTimers[8]) + "/" +  format(player.cb.pointAutomationTimersMax[8])}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1109]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(getLevelableAmount("pet", 309).gte(1)) ? {display: "none !important"} : getBuyableAmount("cb", 23).gte(9) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["clickable", 401], ["clickable", 402], ["clickable", 403]
                            ], {width: "344px", height: "47px", backgroundColor: "#666666"}],
                        ], () => {return getBuyableAmount("cb", 23).gte(1) ? {border: "3px solid black", backgroundColor: "black", marginLeft: "10px"} : {display: "none !important"}}],
                    ]],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return inChallenge("ip", 17) ? "You are losing " + formatWhole(player.cb.lossRate) + " xp per second." : ""}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],        
        ["left-row", [
            ["tooltip-row", [
                ["raw-html", "<img src='resources/level.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cb.level)}, {width: "93px", height: "50px", color: "#0098E5", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", () => {
                    if ((player.points.gte(1e100) || hasMilestone("ip", 24) || (hasUpgrade("de", 13) && inChallenge("tad", 11))) && !inChallenge("ip", 13)) {
                        return "<div class='bottomTooltip'>Levels<hr><small>x" + format(player.cb.levelEffect) + " Celestial Points<br>(Highest level: " + formatWhole(player.cb.highestLevel) + ")</small></div>"
                    } else if (inChallenge("ip", 13)) {
                        return "<div class='bottomTooltip'>Levels<hr><small>[Effect Disabled due to IC3]<br>(Highest level: " + formatWhole(player.cb.highestLevel) + ")</small></div>"
                    } else {
                        return "<div class='bottomTooltip'>Levels<hr><small>[Reach 1e100 points for effect]<br>(Highest level: " + formatWhole(player.cb.highestLevel) + ")</small></div>"
                    }
                }],
            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/XPBoost.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return format(player.cb.XPBoost)}, {width: "93px", height: "50px", color: "#00B229", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", () => {
                    if (player.cb.XPBoost.lt(1000)) {
                        return "<div class='bottomTooltip'>XPBoost<hr><small>x" + format(player.cb.XPBoostEffect) + " XP</small></div>"
                    } else {
                        return "<div class='bottomTooltip'>XPBoost<hr><small>x" + format(player.cb.XPBoostEffect) + " XP<br>[SOFTCAPPED]</small></div>"
                    }
                }],
            ], () => { return (player.cb.highestLevel.gte(100) && hasUpgrade("ip", 31)) ? {width: "148px", height: "50px", borderRight: "2px solid white"} : {display: "none !important"} }],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/petPoint.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return format(player.cb.petPoints)}, {width: "93px", height: "50px", color: "#A2D800", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Pet Points<hr><small>(Gained from rare pet buttons)</small></div>"],
            ], () => { return player.cb.highestLevel.gte(25) ? {width: "148px", height: "50px", borderRight: "2px solid white"} : {display: "none !important"}}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShortWhole(player.cb.evolutionShards)}, {width: "68px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Evolution Shards<hr><small>(Gained from check back buttons)</small></div>"],
            ], () => { return player.cb.highestLevel.gte(35) ? {width: "123px", height: "50px", borderRight: "2px solid white"} : {display: "none !important"}}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShortWhole(player.cb.paragonShards)}, {width: "68px", height: "50px", color: "#4c64ff", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Paragon Shards<hr><small>(Gained from XPBoost buttons)</small></div>"],
            ], () => { return player.cb.highestLevel.gte(250) ? {width: "123px", height: "50px", borderRight: "2px solid white"} : {display: "none !important"}}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/automationShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShortWhole(player.cb.automationShards)}, {width: "70px", height: "50px", color: "grey", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", () => {
                    return "<div class='bottomTooltip'>Automation Shards<hr><small>(Gained from sacrifices)<br>(Total Shards: " + formatShortWhole(player.cb.totalAutomationShards) + ")<br>[Automation triggers only<br>once while offline]</small></div>"
                }],
            ], () => { return player.ev.evolutionsUnlocked[4] ? {width: "125px", height: "50px"} : {display: "none !important"}}],
        ], {width: "825px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px 10px 0px 0px", userSelect: "none"}],
        ["row", [["bar", "xpbar"]]],
        ["blank", "10px"],
        ["raw-html", function () { return player.cb.highestLevel.lt(3) ?  "You will unlock something at level 3! <small>[XP TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(6) && player.cb.highestLevel.gte(3) ?  "You will unlock something at level 6! <small>[XP TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(10) && player.cb.highestLevel.gte(6) ?  "You will unlock something at level 10! <small>[??? TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(15) && player.cb.highestLevel.gte(10) ?  "You will unlock something at level 15! <small>[XP TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(25) && player.cb.highestLevel.gte(15) ?  "You will unlock something at level 25! <small>[PET TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(35) && player.cb.highestLevel.gte(25) ?  "You will unlock something at level 35! <small>[??? TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(50) && player.cb.highestLevel.gte(35) ?  "You will unlock something at level 50! <small>[XP TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(65) && player.cb.highestLevel.gte(50) ?  "You will unlock something at level 65! <small>[XP TAB] [PET SHOP]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(75) && player.cb.highestLevel.gte(65) ?  "You will unlock something at level 75! <small>[PET TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(100) && player.cb.highestLevel.gte(75) && hasUpgrade("ip", 31) ?  "You will unlock something at level 100! <small>[??? TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(125) && player.cb.highestLevel.gte(100) && hasChallenge("ip", 12) ?  "You will unlock something at level 125! <small>[PET TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(150) && player.cb.highestLevel.gte(125) ?  "You will unlock something at level 150! <small>[XP TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(200) && player.cb.highestLevel.gte(150) ?  "You will unlock something at level 200! <small>[MOST MAIN TABS]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(250) && player.cb.highestLevel.gte(200) ?  "You will unlock something at level 250! <small>[EVOLUTION TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(666) && player.cb.highestLevel.gte(250) ?  "You will unlock something at level 666! <small>[XPBOOST TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(1500) && player.cb.highestLevel.gte(666) ?  "You will unlock something at level 1,500! <small>[PET TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(3000) && player.cb.highestLevel.gte(1500) ?  "You will unlock something at level 3,000! <small>[PET SHOP]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(25000) && player.cb.highestLevel.gte(3000) && hasUpgrade("s", 23) ?  "You will unlock something at level 25,000! <small>[PET TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["blank", "10px"],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 19) || hasMilestone("ip", 12) || (hasUpgrade("de", 13) && inChallenge("tad", 11)) }
})
