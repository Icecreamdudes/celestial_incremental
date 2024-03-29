addLayer("cb", {
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

        buttonUnlocks: [true, false, false, false, false],
        buttonTimersMax: [new Decimal(60),new Decimal(180),new Decimal(300),new Decimal(5),new Decimal(1200),new Decimal(3600),],
        buttonTimers: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        buttonBaseXP: [new Decimal(1),new Decimal(2),new Decimal(4),new Decimal(0.04),new Decimal(25),new Decimal(80),],

        petsUnlocked: false,
        
        //petButtons
        petButtonUnlocks: [false, false],
        petButtonTimersMax: [new Decimal(900), new Decimal(2700)],
        petButtonTimers: [new Decimal(0), new Decimal(0)],

        //pets
        lockedImg: "<img src='resources/secret.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        petDisplay: ["","","","","",],
        petDisplayIndex: new Decimal(-1),

        commonPetUnlocks: [false, false, false, false, false],
        commonPetLevels: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        commonPetAmounts: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        commonPetReq: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
        commonPetImage: ["<img src='resources/gwaCommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/eggCommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/unsmithCommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/checkpointCommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/slaxCommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",],
        commonPetEffects: [[new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),], [new Decimal(1),new Decimal(1)], [new Decimal(1),new Decimal(1)], [new Decimal(1),new Decimal(1)]],

        uncommonPetDisplay: ["","","","","",],
        uncommonPetDisplayIndex: new Decimal(-1),

        uncommonPetUnlocks: [false, false, false, false, false],
        uncommonPetLevels: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),],
        uncommonPetAmounts: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),],
        uncommonPetReq: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),],
        uncommonPetImage: ["<img src='resources/testeUncommonPet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        ],
        uncommonPetEffects: [[new Decimal(1), new Decimal(1),new Decimal(1),], [new Decimal(1), new Decimal(1),new Decimal(1),], [new Decimal(1), new Decimal(1),new Decimal(1),],
        [new Decimal(1), new Decimal(1),new Decimal(1),], [new Decimal(1), new Decimal(1),new Decimal(1),]],

        rarePetDisplay: ["","","","","",],
        rarePetDisplayIndex: new Decimal(-1),

        rarePetUnlocks: [false, false],
        rarePetLevels: [new Decimal(0),new Decimal(0),],
        rarePetAmounts: [new Decimal(0),new Decimal(0),],
        rarePetReq: [new Decimal(1),new Decimal(1),],
        rarePetImage: ["<img src='resources/novaRarePet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        "<img src='resources/diceRarePet.png'style='width:calc(80%);height:calc(80%);margin:10%'></img>",
        ],
        rarePetEffects: [[new Decimal(1), new Decimal(1),], [new Decimal(1), new Decimal(1),]],

        petPoints: new Decimal(0),
        rarePetPointBase: [new Decimal(1),new Decimal(0.1),],
        rarePetButtonTimersMax: [new Decimal(60), new Decimal(20)],
        rarePetButtonTimers: [new Decimal(0), new Decimal(0)],

        lastDicePetRoll: new Decimal(0),
        dicePetRoll: new Decimal(0),
        highestDicePetCombo: new Decimal(0),
        dicePetCombo: new Decimal(0),
        dicePetPointsGain: new Decimal(0),

        evolutionShards: new Decimal(0),
        viewingEvolved: [false,],
        evolvedLevels: [new Decimal(0),],
        evolvedReq: [new Decimal(2),],
        evolvedEffects: [[new Decimal(1),new Decimal(0),]],
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

        player.cb.req = player.cb.level.pow(1.2).add(4).floor()
        player.cb.req = player.cb.req.div(player.cb.uncommonPetEffects[2][2])

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

        player.cb.buttonBaseXP = [new Decimal(1),new Decimal(2),new Decimal(4),new Decimal(0.06),new Decimal(25),new Decimal(80),]
        for (let i = 0; i < player.cb.buttonBaseXP.length; i++)
        {
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(buyableEffect("gh", 21))
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(player.cb.commonPetEffects[0][1])
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(player.cb.uncommonPetEffects[4][0])
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(player.cb.rarePetEffects[0][1])
            player.cb.buttonBaseXP[i] = player.cb.buttonBaseXP[i].mul(player.ev0.coinDustEffect)
        }


        player.cb.buttonTimersMax = [new Decimal(60),new Decimal(180),new Decimal(300),new Decimal(5),new Decimal(1200),new Decimal(3600),]
        for (let i = 0; i < player.cb.buttonTimersMax.length; i++)
        {
            player.cb.buttonTimersMax[i] = player.cb.buttonTimersMax[i].div(buyableEffect("gh", 22))
            player.cb.buttonTimersMax[i] = player.cb.buttonTimersMax[i].div(player.cb.commonPetEffects[4][1])
            player.cb.buttonTimersMax[i] = player.cb.buttonTimersMax[i].div(player.cb.uncommonPetEffects[1][2])
            player.cb.buttonTimersMax[i] = player.cb.buttonTimersMax[i].div(buyableEffect("ev0", 12))
        }

        //Pet
        if (player.cb.level.gte(10))
        {
            player.cb.petButtonUnlocks[0] = true 
        }
        
        player.cb.petButtonTimersMax = [new Decimal(900), new Decimal(2700)]
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
        ]

        player.cb.lockedImg = "<img src='resources/secret.png'style='width:calc(125%);height:calc(125%);margin:-20%'></img>"

        player.cb.commonPetImage = ["<img src='resources/gwaCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/eggCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/unsmithCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/checkpointCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/slaxCommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",]

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
        ]


        for (let i = 0; i < player.cb.petButtonTimers.length; i++)
        {
            player.cb.petButtonTimers[i] = player.cb.petButtonTimers[i].sub(onepersec.mul(delta))
        }

        player.cb.commonPetEffects = [
            [player.cb.commonPetLevels[0].pow(3).add(1), player.cb.commonPetLevels[0].mul(0.02).add(1),],
            [player.cb.commonPetLevels[1].pow(2.4).add(1), player.cb.commonPetLevels[1].pow(2).add(1),],
            [player.cb.commonPetLevels[2].pow(2.7).add(1).pow(player.cb.evolvedEffects[0][0]), player.cb.commonPetLevels[2].pow(1.8).add(1).pow(player.cb.evolvedEffects[0][0]),],
            [player.cb.commonPetLevels[3].pow(2.2).add(1), player.cb.commonPetLevels[3].pow(1.3).div(3).add(1),],
            [player.cb.commonPetLevels[4].mul(0.01).add(1), player.cb.commonPetLevels[4].mul(0.02).add(1),],
        ]

        //uncommon
        player.cb.uncommonPetDisplay = 
        [
            "Teste: " + formatWhole(player.cb.uncommonPetAmounts[0]) + "/" + formatWhole(player.cb.uncommonPetReq[0]) + " to level up. (Currently level " + formatWhole(player.cb.uncommonPetLevels[0]) + ")",
            "Star: " + formatWhole(player.cb.uncommonPetAmounts[1]) + "/" + formatWhole(player.cb.uncommonPetReq[1]) + " to level up. (Currently level " + formatWhole(player.cb.uncommonPetLevels[1]) + ")",
            "Normal Face: " + formatWhole(player.cb.uncommonPetAmounts[2]) + "/" + formatWhole(player.cb.uncommonPetReq[2]) + " to level up. (Currently level " + formatWhole(player.cb.uncommonPetLevels[2]) + ")",
            "Shark: " + formatWhole(player.cb.uncommonPetAmounts[3]) + "/" + formatWhole(player.cb.uncommonPetReq[3]) + " to level up. (Currently level " + formatWhole(player.cb.uncommonPetLevels[3]) + ")",
            "THE WATCHING EYE: " + formatWhole(player.cb.uncommonPetAmounts[4]) + "/" + formatWhole(player.cb.uncommonPetReq[4]) + " to level up. (Currently level " + formatWhole(player.cb.uncommonPetLevels[4]) + ")",
        ]

        player.cb.uncommonPetImage = ["<img src='resources/testeUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/starUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/normalFaceUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/sharkUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        "<img src='resources/eyeUncommonPet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        ]

        player.cb.uncommonPetReq = [
            player.cb.uncommonPetLevels[0].add(1),
            player.cb.uncommonPetLevels[1].mul(1.3).add(1).floor(),
            player.cb.uncommonPetLevels[2].mul(1.7).add(1).floor(),
            player.cb.uncommonPetLevels[3].mul(2).add(1).floor(),
            player.cb.uncommonPetLevels[4].mul(2.2).add(1).floor(),
        ]

        player.cb.uncommonPetEffects = [
            [player.cb.uncommonPetLevels[0].pow(1.2).div(2).add(1), player.cb.uncommonPetLevels[0].pow(1.25).div(1.5).add(1), player.cb.uncommonPetLevels[0].pow(1.27).add(1),],
            [player.cb.uncommonPetLevels[1].pow(1.3).div(1.6).add(1), player.cb.uncommonPetLevels[1].pow(1.6).div(1.3).add(1), player.cb.uncommonPetLevels[1].mul(0.01).add(1),], //lines of code, leaves, check back time
            [player.cb.uncommonPetLevels[2].pow(1.7).add(1), player.cb.uncommonPetLevels[2].pow(1.4).add(1), player.cb.uncommonPetLevels[2].mul(0.02).pow(0.95).add(1),], //tree req, mod req, check back level req
            [player.cb.uncommonPetLevels[3].pow(2).mul(5).add(1), player.cb.uncommonPetLevels[3].pow(1.87).mul(3).add(1), player.cb.uncommonPetLevels[3].pow(1.75).mul(2).add(1),], //rank req, tier req, tetr req
            [player.cb.uncommonPetLevels[4].mul(0.05).add(1),], //check back xp
        ]

        //Rare
        player.cb.rarePetDisplay = 
        [
            "Nova: " + formatWhole(player.cb.rarePetAmounts[0]) + "/" + formatWhole(player.cb.rarePetReq[0]) + " to level up. (Currently level " + formatWhole(player.cb.rarePetLevels[0]) + ")",
            "Dice: " + formatWhole(player.cb.rarePetAmounts[1]) + "/" + formatWhole(player.cb.rarePetReq[1]) + " to level up. (Currently level " + formatWhole(player.cb.rarePetLevels[1]) + ")<br><h6>(Last roll: " + format(player.cb.dicePetPointsGain) + " dice points.) (Last roll: " + player.cb.lastDicePetRoll + ", Current roll combo: " + player.cb.dicePetCombo + ", highest is " + player.cb.highestDicePetCombo + ")",
        ]

        player.cb.rarePetImage = [
            "<img src='resources/novaRarePet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
            "<img src='resources/diceRarePet.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>",
        ]

        player.cb.rarePetReq = [
            player.cb.rarePetLevels[0].add(1),
            player.cb.rarePetLevels[1].pow(1.4).add(1).floor(),
        ]

        player.cb.rarePetEffects = [
            [player.g.grass.pow(0.02).div(2).add(1).pow(player.cb.rarePetLevels[0].pow(0.4)), player.cb.level.mul(0.001).mul(player.cb.rarePetLevels[0]).add(1),], //Fertilizer based on Grass, XP based on Level
            [player.cb.highestDicePetCombo.add(1).pow(player.cb.rarePetLevels[1].pow(0.3)), player.d.dicePoints.pow(0.1).mul(player.cb.rarePetLevels[1].pow(1.2)).add(1),], //Dice points based on combo, Mods based on dice points
        ]

        player.cb.rarePetButtonTimersMax = [new Decimal(40), new Decimal(20)]
        for (let i = 0; i < player.cb.rarePetButtonTimersMax.length; i++)
        {
        }
        for (let i = 0; i < player.cb.rarePetButtonTimers.length; i++)
        {
            player.cb.rarePetButtonTimers[i] = player.cb.rarePetButtonTimers[i].sub(onepersec.mul(delta))
            player.cb.rarePetButtonTimersMax[i] = player.cb.rarePetButtonTimersMax[i].div(buyableEffect("ev0", 14))
        }

        player.cb.rarePetPointBase = [new Decimal(1), new Decimal(0.1)]
        player.cb.rarePetPointBase[0] = player.cb.rarePetPointBase[0].mul(player.cb.rarePetLevels[0].mul(0.5))
        player.cb.rarePetPointBase[1] = player.cb.rarePetPointBase[1].mul(player.cb.rarePetLevels[1])

        if (player.cb.dicePetCombo > player.cb.highestDicePetCombo)
        {
            player.cb.highestDicePetCombo = player.cb.dicePetCombo
        }

        player.cb.evolvedReq = [
            player.cb.evolvedLevels[0].add(2),
        ]
        player.cb.evolvedEffects = [
            [player.cb.evolvedLevels[0].div(20).add(1), player.cb.evolvedLevels[0].pow(1.15),],
        ]
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
            style: { width: '200px', "min-height": '100px', "background-image": "linear-gradient(90deg, #d487fd, #4b79ff)"},
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
                        callAlert("You gained an Evolution Shard!", "resources/evoShard.png");
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
                        callAlert("You gained an Evolution Shard!", "resources/evoShard.png");
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
                        callAlert("You gained an Evolution Shard!", "resources/evoShard.png");
                    }
                }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        14: {
            title() { return player.cb.buttonTimers[3].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.buttonTimers[3]) + "." : "<h3>+" + format(player.cb.buttonBaseXP[3].mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.buttonTimers[3].lt(0) },
            unlocked() { return player.cb.buttonUnlocks[3] },
            tooltip() { return player.cb.level.gte(35) ? "Evo Shard Rarity: 0.1%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.buttonBaseXP[3].mul(player.cb.xpMult))
                player.cb.buttonTimers[3] = player.cb.buttonTimersMax[3]

                if (player.cb.level.gt(35))
                {
                    let random = getRandomInt(1000)
                    if (random == 1)
                    {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        callAlert("You gained an Evolution Shard!", "resources/evoShard.png");
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
                        callAlert("You gained an Evolution Shard!", "resources/evoShard.png");
                    }
                }
            },
            style: { width: '200px', "min-height": '50px', 'border-radius': "30%" },
        },
        17: {
            title() { return player.cb.petButtonTimers[1].gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.petButtonTimers[1]) + "." : "<h3>Collect a random uncommon pet."},
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
                        callAlert("You gained an Evolution Shard!", "resources/evoShard.png");
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
            tooltip() { return player.cb.uncommonPetAmounts[2].gt(0) || player.cb.uncommonPetLevels[2].gt(0) ? "<h3>/" + format(player.cb.uncommonPetEffects[2][0]) + " to tree requirement.<br>/" + format(player.cb.uncommonPetEffects[2][1]) + " to mod requirement.<br>/" + format(player.cb.uncommonPetEffects[2][2]) + " to check back requirement.": ""},
            onClick() {
                player.cb.uncommonPetDisplayIndex = new Decimal(2)
            },
            style: { width: '100px', "min-height": '100px', 'border-radius': "0%" },
        },
        116: {
            title() { return player.cb.uncommonPetAmounts[3].gt(0) || player.cb.uncommonPetLevels[3].gt(0) ? player.cb.uncommonPetImage[3] : player.cb.lockedImg},
            canClick() { return player.cb.uncommonPetAmounts[3].gt(0) || player.cb.uncommonPetLevels[3].gt(0) },
            unlocked() { return true },
            tooltip() { return player.cb.uncommonPetAmounts[3].gt(0) || player.cb.uncommonPetLevels[3].gt(0) ? "<h3>/" + format(player.cb.uncommonPetEffects[3][0]) + " to rank requirement.<br>/" + format(player.cb.uncommonPetEffects[3][1]) + " to tier requirement.<br>/" + format(player.cb.uncommonPetEffects[3][2]) + " to tetr requirement.": ""},
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
            unlocked() { return player.cb.uncommonPetDisplayIndex == 3 },
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
                        ["blank", "25px"],
                        ["row", [["clickable", 14]]],
                        ["row", [["clickable", 11]]],
                        ["row", [["clickable", 12]]],
                        ["row", [["clickable", 13]]],
                        ["row", [["clickable", 16]]],
                        ["row", [["clickable", 21]]],
                        ["blank", "25px"],
                        ["row", [["clickable", 15]]],
                        ["row", [["clickable", 17]]],
                ]

            },
            "Pets": {
                buttonStyle() { return { 'color': '#06366e' } },
                unlocked() { return player.cb.level.gte(10) },
                content:
                [
                    ["microtabs", "pets", { 'border-width': '0px' }],
                ]

            },
            "Evolution Shards": {
                buttonStyle() { return { 'color': '#1500bf', 'border-color': "#1500bf", 'background-image': 'linear-gradient(90deg, #d487fd, #4b79ff)',} },
                unlocked() { return player.cb.level.gte(35) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.cb.evolutionShards) + "</h3> evolution shards." }, { "color": "#d487fd", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h5>(Gained from check back buttons)" }, { "color": "#d487fd", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 2]]],
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
                        ["row", [["clickable", 106], ["clickable", 107], ["clickable", 108], ["clickable", 109], ["clickable", 111], ["clickable", 201],  ["clickable", 203], ["clickable", 202], ["clickable", 204]]],
                        ["blank", "25px"],
                        ["raw-html", function () { return "Common Pets" }, { "color": "#9bedff", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 101], ["clickable", 102], ["clickable", 103], ["clickable", 104], ["clickable", 105]]],
                ]

            },
            "Uncommon": {
                buttonStyle() { return { 'color': '#88e688', 'border-color': '#88e688' } },
                unlocked() { return true },
                content:
                [
                    ["raw-html", function () { return player.cb.uncommonPetDisplay[player.cb.uncommonPetDisplayIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 113], ["clickable", 118], ["clickable", 119], ["clickable", 121], ["clickable", 122]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Uncommon Pets" }, { "color": "#88e688", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 112], ["clickable", 114], ["clickable", 115], ["clickable", 116], ["clickable", 117]]],
                ]

            },
            "Rare": {
                buttonStyle() { return { 'color': '#4e7cff', 'border-color': '#4e7cff' } },
                unlocked() { return player.cb.level.gte(25) },
                content:
                [
        ["raw-html", function () { return "You have <h3>" + format(player.cb.petPoints) + "</h3> pet points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.rarePetDisplay[player.cb.rarePetDisplayIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 124], ["clickable", 18], ["clickable", 127], ["clickable", 19], ["clickable", 125]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Rare Pets" }, { "color": "#4e7cff", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 123], ["clickable", 126]]],
                ]

            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are level " + formatWhole(player.cb.level) + ", which boosts celestial point gain by x" + format(player.cb.levelEffect) + "." }, { "color": "white", "font-size": "32px", "font-family": "monospace" }],
        ["row", [["bar", "xpbar"]]],
                        ["blank", "25px"],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 19) }
})