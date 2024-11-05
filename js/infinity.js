var tree = [["ad", "ip", "id"], ["tad", "ta", "bi", "om"], ["ga", "ca"]]
addLayer("in", {
    name: "Universe 2", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "2", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        unlockedInfinity: false,
        reachedInfinity: false,
        unlockedBreak: false,
        breakInfinity: false,

        infinityPoints: new Decimal(0),
        infinityPointsToGet: new Decimal(0),
        infinityPause: new Decimal(0),

        infinities: new Decimal(0),
        infinitiesToGet: new Decimal(1),
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(140deg, #10e96b 0%, #0f871c 100%)",
            "background-origin": "border-box",
            "border-color": "#119B35",
        }
      },

    tooltip: "Universe 2 - Antimatter World",
    color: "white",
    branches: ["i"],
    update(delta) {

        let onepersec = new Decimal(1)
        if (player.subtabs["in"]['stuff'] == 'Portal')
        {
            player.po.lastUniverse = 'in'
            player.tab = "po"
            player.subtabs["in"]['stuff'] = 'Features'
        }

        if (player.in.infinityPoints.gt(0))
        {
            player.in.unlockedInfinity = true
        }

        if (player.in.reachedInfinity && !inChallenge("ip", 18))
        {
            if (!player.in.breakInfinity)
            {
                if (inChallenge("ip", 11) && !hasChallenge("ip", 11))
                {
                    completeChallenge("ip", 11)
                }
                if (inChallenge("ip", 12) && !hasChallenge("ip", 12))
                {
                    completeChallenge("ip", 12)
                }
                if (inChallenge("ip", 13) && !hasChallenge("ip", 13))
                {
                    completeChallenge("ip", 13)
                }
                if (inChallenge("ip", 14) && !hasChallenge("ip", 14))
                {
                    completeChallenge("ip", 14)
                }
                if (inChallenge("ip", 15) && !hasChallenge("ip", 15))
                {
                    completeChallenge("ip", 15)
                }
                if (inChallenge("ip", 16) && !hasChallenge("ip", 16))
                {
                    completeChallenge("ip", 16)
                }
                if (inChallenge("tad", 11))
                {
                    if (player.bi.brokenInfinities.gt(player.tad.shatteredInfinitiesToGet) && player.po.hex && !player.po.dice && !player.po.rocketFuel && inChallenge("tad", 11) && player.tad.currentConversion.eq(0))
                    {
                        player.tad.shatteredInfinities = player.tad.shatteredInfinities.add(player.tad.shatteredInfinitiesToGet)
                        player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.shatteredInfinitiesToGet)
                    }
                    if (player.bi.brokenInfinities.gt(player.tad.disfiguredInfinitiesToGet) && !player.po.hex && !player.po.dice && player.po.rocketFuel && inChallenge("tad", 11) && player.tad.currentConversion.eq(1))
                    {
                        player.tad.disfiguredInfinities = player.tad.disfiguredInfinities.add(player.tad.disfiguredInfinitiesToGet)
                        player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.disfiguredInfinitiesToGet)
                    }
                    if (player.bi.brokenInfinities.gt(player.tad.corruptedInfinitiesToGet) && !player.po.hex && player.po.dice && !player.po.rocketFuel && inChallenge("tad", 11) && player.tad.currentConversion.eq(2))
                    {
                        player.tad.corruptedInfinities = player.tad.corruptedInfinities.add(player.tad.corruptedInfinitiesToGet)
                        player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.corruptedInfinitiesToGet)
                    }
                }
                if (!hasMilestone("ip", 21))
                {
                    player.tab = "bigc"
                } else if (hasMilestone("ip", 21))
                {
                    layers.bigc.crunch()
                }
                if (hasUpgrade("bi", 14))
                {
                    if (player.po.dice) player.om.diceMasteryPoints = player.om.diceMasteryPoints.add(player.om.diceMasteryPointsToGet)
                    if (player.po.rocketFuel) player.om.rocketFuelMasteryPoints = player.om.rocketFuelMasteryPoints.add(player.om.rocketFuelMasteryPointsToGet)
                    if (player.po.hex) player.om.hexMasteryPoints = player.om.hexMasteryPoints.add(player.om.hexMasteryPointsToGet)
                }
            }
        }

        if (!player.in.breakInfinity) player.in.infinityPointsToGet = new Decimal(1)
        if (player.in.breakInfinity && !hasUpgrade("bi", 111)) player.in.infinityPointsToGet = player.points.div(1e308).plus(1).log10().div(10)
        if (player.in.breakInfinity && hasUpgrade("bi", 111)) player.in.infinityPointsToGet = player.points.div(1e308).plus(1).log10().div(2).pow(1.25)
        if (player.in.breakInfinity && hasUpgrade("i", 31)) player.in.infinityPointsToGet = player.points.div(1e308).plus(1).log10().pow(1.5)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("h", 21))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("h", 22))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("ip", 11))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.d.diceEffects[11])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.rf.abilityEffects[5])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("cb", 12))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("ta", 33))
        if (hasUpgrade("ip", 42)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(upgradeEffect("ip", 42))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("f", 41))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("f", 42))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("f", 43))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("f", 44))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("f", 45))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("f", 46))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("f", 47))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("f", 48))
        if (hasUpgrade("bi", 101)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(upgradeEffect("bi", 101))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.om.diceMasteryPointsEffect)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("tad", 21))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("gh", 38))
        if (hasUpgrade("bi", 23)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(upgradeEffect("bi", 23))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.ca.replicantiEffect)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("id", 24))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("h", 23))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.rm.realmModsEffect[5])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("ca", 24))

        player.in.infinityPause = player.in.infinityPause.sub(1)
        if (player.in.infinityPause.gt(0))
        {
            layers.in.bigCrunch();
        }

        player.in.infinitiesToGet = new Decimal(1)
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(buyableEffect("bi", 11))
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(buyableEffect("tad", 11))
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(buyableEffect("om", 11))
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(buyableEffect("p", 15))
    },
    bigCrunch()
    {
        player.points = new Decimal(10)
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        player.r.tetr = new Decimal(0)
        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
        player.r.tetrsToGet = new Decimal(0)
        player.r.pentToGet = new Decimal(0)
        player.r.pent = new Decimal(0)

        player.f.factorUnlocks = [true, true, true, false, false, false, false, false]
        player.f.factorGain = new Decimal(1)

        player.f.factorPower = new Decimal(0)
        player.f.factorPowerEffect = new Decimal(1)
        player.f.factorPowerPerSecond = new Decimal(0)
        player.f.powerFactorUnlocks = [true, true, true, false, false, false, false, false]

        player.f.buyables[1] = new Decimal(0)
        player.f.buyables[2] = new Decimal(0)
        player.f.buyables[3] = new Decimal(0)
        player.f.buyables[4] = new Decimal(0)
        player.f.buyables[5] = new Decimal(0)
        player.f.buyables[6] = new Decimal(0)
        player.f.buyables[7] = new Decimal(0)
        player.f.buyables[8] = new Decimal(0)
        player.f.buyables[11] = new Decimal(0)
        player.f.buyables[12] = new Decimal(0)
        player.f.buyables[13] = new Decimal(0)
        player.f.buyables[14] = new Decimal(0)
        player.f.buyables[15] = new Decimal(0)
        player.f.buyables[16] = new Decimal(0)
        player.f.buyables[17] = new Decimal(0)
        player.f.buyables[18] = new Decimal(0)
        player.f.buyables[19] = new Decimal(0)
        player.f.buyables[21] = new Decimal(0)
        player.f.buyables[22] = new Decimal(0)
        player.f.buyables[23] = new Decimal(0)
        player.f.buyables[24] = new Decimal(0)
        player.f.buyables[25] = new Decimal(0)
        player.f.buyables[26] = new Decimal(0)
        player.f.buyables[27] = new Decimal(0)
        player.f.buyables[28] = new Decimal(0)
        player.f.buyables[29] = new Decimal(0)
        player.f.buyables[31] = new Decimal(0)
        player.f.buyables[32] = new Decimal(0)
        player.f.buyables[33] = new Decimal(0)
        player.f.buyables[34] = new Decimal(0)
        player.f.buyables[35] = new Decimal(0)
        player.f.buyables[36] = new Decimal(0)

        player.p.prestigePoints = new Decimal(0)

        if (!hasMilestone("ip", 11) && !inChallenge("ip", 14))
        {
        for (let i = 0; i < player.p.upgrades.length; i++) {
            if (+player.p.upgrades[i] < 24) {
                player.p.upgrades.splice(i, 1);
                i--;
            }
        }
    }

        player.t.buyables[11] = new Decimal(0)
        player.t.buyables[12] = new Decimal(0)
        player.t.buyables[13] = new Decimal(0)
        player.t.buyables[14] = new Decimal(0)
        player.t.buyables[15] = new Decimal(0)
        player.t.buyables[16] = new Decimal(0)
        player.t.buyables[17] = new Decimal(0)
        player.t.buyables[18] = new Decimal(0)

        player.f.factorPower = new Decimal(0)

        player.t.leaves = new Decimal(0)
        player.t.trees = new Decimal(0)

        player.g.buyables[11] = new Decimal(0)
        player.g.buyables[12] = new Decimal(0)
        player.g.buyables[13] = new Decimal(0)
        player.g.buyables[14] = new Decimal(0)
        player.g.buyables[15] = new Decimal(0)
        player.g.buyables[16] = new Decimal(0)
        player.g.buyables[17] = new Decimal(0)
        player.g.buyables[18] = new Decimal(0)

        if (!hasMilestone("ip", 11) && !inChallenge("ip", 14))
        {
        for (let i = 0; i < player.g.upgrades.length; i++) {
            if (+player.g.upgrades[i] < 22) {
                player.g.upgrades.splice(i, 1);
                i--;
            }
        }
        }

        if (!hasMilestone("ip", 15) && !inChallenge("ip", 14))
        {
            for (let i = 0; i < player.r.milestones.length; i++) {
                if (+player.r.milestones[i] < 20) {
                    player.r.milestones.splice(i, 1);
                    i--;
                }
            }
        }

        player.g.grass = new Decimal(0)
        player.g.savedGrass = new Decimal(0)
        player.g.grassCount = new Decimal(0)
        player.g.grassTimer = new Decimal(0)

        player.g.goldGrass = new Decimal(0)
        player.g.savedGoldGrass = new Decimal(0)
        player.g.goldGrassCount = new Decimal(0)
        player.g.goldGrassTimer = new Decimal(0)

        player.gh.grasshoppers = new Decimal(0)
        player.gh.fertilizer = new Decimal(0)

        player.gh.buyables[11] = new Decimal(0)
        player.gh.buyables[12] = new Decimal(0)
        player.gh.buyables[13] = new Decimal(0)
        player.gh.buyables[14] = new Decimal(0)
        player.gh.buyables[15] = new Decimal(0)
        player.gh.buyables[16] = new Decimal(0)
        player.gh.buyables[17] = new Decimal(0)
        player.gh.buyables[18] = new Decimal(0)
        player.gh.buyables[19] = new Decimal(0)
        player.gh.buyables[21] = new Decimal(0)
        player.gh.buyables[22] = new Decimal(0)

        player.m.codeExperience = new Decimal(0)
        player.m.linesOfCode = new Decimal(0)
        player.m.mods = new Decimal(0)

        player.m.buyables[11] = new Decimal(0)
        player.m.buyables[12] = new Decimal(0)
        player.m.buyables[13] = new Decimal(0)
        player.m.buyables[14] = new Decimal(0)

        //dice
        player.d.dicePoints = new Decimal(0)
        player.d.diceRolls = [new Decimal(1)]
        player.d.dice = new Decimal(1)

        player.d.buyables[11] = new Decimal(0)
        player.d.buyables[12] = new Decimal(0)
        player.d.buyables[13] = new Decimal(0)
        player.d.buyables[14] = new Decimal(0)
        player.d.buyables[15] = new Decimal(0)

        for (let i = 0; i < 11; i++)
        {
            player.d.diceEffects[i] = new Decimal(1)
        }

        //rf
        player.rf.rocketFuel = new Decimal(0)
        for (let i = 0; i < player.rf.abilitiesUnlocked.length; i++)
        {
            player.rf.abilitiesUnlocked[i] = false
        }
        for (let i = 0; i < 4; i++)
        {
            player.rf.abilityTimers[i] = new Decimal(0)
        }

        for (let i = 0; i < player.rf.upgrades.length; i++) {
            if (+player.rf.upgrades[i] < 18) {
                player.rf.upgrades.splice(i, 1);
                i--;
            }
        }

        for (let i = 0; i < player.i.upgrades.length; i++) {
            if (+player.i.upgrades[i] < 22) {
                player.i.upgrades.splice(i, 1);
                i--;
            }
        }

        if (!player.po.keepOTFS || inChallenge("ip", 16))
        {
            player.po.dice = false
            player.po.rocketFuel = false
            player.po.hex = false
            player.po.breakInfinity = false
            player.po.realmMods = false
            player.po.featureSlots = player.po.featureSlotsMax
        }


        //reset antimatter stuff

        if (!hasMilestone("ip", 14))
        {
            if (player.in.infinities.eq(0)) player.ad.antimatter = new Decimal(10)

            player.ad.buyables[1] = new Decimal(0)

            for (let i = 0; i < player.ad.dimensionAmounts.length; i++)
            {
                player.ad.dimensionAmounts[i] = new Decimal(0)
                player.ad.dimensionsPurchased[i] = new Decimal(0)
            }

            player.ad.dimensionsUnlocked[4] = false
            player.ad.dimensionsUnlocked[5] = false
            player.ad.dimensionsUnlocked[6] = false
            player.ad.dimensionsUnlocked[7] = false

            player.ad.dimBoostAmount = new Decimal(0)
            player.ad.galaxyAmount = new Decimal(0)
        }

        //challenge stuff
        player.pe.pests = new Decimal(0)

        if (!inChallenge("ip", 15))
        {

        player.d.challengeDicePoints = new Decimal(0)
        player.d.buyables[21] = new Decimal(0)
        player.d.buyables[22] = new Decimal(0)
        player.d.buyables[23] = new Decimal(0)
        player.d.buyables[24] = new Decimal(0)

        for (let i = 0; i < player.d.upgrades.length; i++) {
            if (+player.d.upgrades[i] < 100) {
                player.d.upgrades.splice(i, 1);
                i--;
            }
        }
        }

        player.de.antidebuffPoints = new Decimal(0)
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "po"
            },
            style: { width: '100px', "min-height": '50px' },
        },
    },
    bars: {
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
            "Features": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["tree", tree],
                ]

            },
            "Portal": {
                buttonStyle() { return { 'color': 'black', 'border-color': 'purple', background: 'linear-gradient(45deg, #8a00a9, #0061ff)', } },
                unlocked() { return hasUpgrade("ad", 13) },
                content:
                [
                ]
            },
            "Settings": settingsMicrotab,
        },
    },

    tabFormat: [
                        ["raw-html", function () { return "You have <h3>" + format(player.ad.antimatter) + "</h3> antimatter, which boosts points by x" + format(player.ad.antimatterEffect) + " (based on points and antimatter)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.ad.antimatterPerSecond) + "</h3> antimatter per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.in.unlockedInfinity}
})
addLayer("bigc", {
    name: "Big Crunch", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BC", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        spawnedWisps: false,
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Ranks",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.tab == "bigc" && !player.bigc.spawnedWisps)
        {
            player.bigc.spawnedWisps = true
        } else if (player.tab != "bigc")
        {
            removeWisps();
        }
    },
    branches: ["branch"],
    clickables: {
        11: {
            title() { return "<h2>BIG CRUNCH" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "in"

                layers.bigc.crunch()
            },
            style: { width: '300px', "min-height": '120px' },
        },

    },
    crunch(){
        player.in.infinityPoints = player.in.infinityPoints.add(player.in.infinityPointsToGet)
        player.in.infinities = player.in.infinities.add(player.in.infinitiesToGet)
        if (player.po.dice)
        {
            player.ip.diceRuns = player.ip.diceRuns.add(1)
        }
        if (player.po.rocketFuel)
        {
            player.ip.rocketFuelRuns = player.ip.rocketFuelRuns.add(1)
        }
        if (player.po.hex)
        {
            player.ip.hexRuns = player.ip.hexRuns.add(1)
        }
        player.in.infinityPause = new Decimal(5)
        player.in.reachedInfinity = false

        if (hasUpgrade("ta", 17))
        {
            if (player.d.dicePoints.gt(player.ta.highestDicePoints))
            {
                player.ta.highestDicePoints = player.d.dicePoints
            }
            if (player.rf.rocketFuel.gt(player.ta.highestRocketFuel))
            {
                player.ta.highestRocketFuel = player.rf.rocketFuel
            }
            if (player.h.hexPoints[0].gt(player.ta.highestHex1Points))
            {
                if (player.po.hex) player.ta.highestHex1Points = player.h.hexPoints[0]
            }
        }

        if (player.rm.halterBoostCheck && player.po.realmMods)
        {
            player.rm.halterBoost = player.po.pointHalt
        }

        player.rm.halterBoostCheck = true
    },
    bars: {
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

    tabFormat: [
                    ["raw-html", function () { return "<h2>1e308 celestial points- impossible." }, { "color": "black", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "150px"],
                    ["row", [["clickable", 11]]],
    ],
    layerShown() { return player.startedGame == true }
})
window.addEventListener('load', function() {
    player.bigc.spawnedWisps = false

});
