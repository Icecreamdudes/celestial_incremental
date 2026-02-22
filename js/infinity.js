addLayer("in", {
    name: "Roots", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RO", // This appears on the layer's node. Default is the id with the first letter capitalized
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

        infinities: new Decimal(0),
        infinitiesToGet: new Decimal(1),

        delay: new Decimal(0),

        pylonBuilt: false,
        pylonEnergyMax: new Decimal(1e308),
        pylonEnergy: new Decimal(0),
        pylonEnergyEffect: new Decimal(1),
        pylonEnergyEffect2: new Decimal(1),
        pylonEnergyEffect3: new Decimal(1),
        pylonEnergyPerSecond: new Decimal(0),
        
        pylonPassiveEffect: new Decimal(1),

        pylonTier: new Decimal(1),
        pylonTierEffect: new Decimal(1),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(140deg, #1e6 0%, #181 100%)",
            "background-origin": "border-box",
            "border-color": "#333",
        }
    },
    tooltip: "Roots",
    color: "#1b4",
    branches: ["ad", "ip"],
    update(delta) {
        let onepersec = new Decimal(1)

        // USED FOR RESETTING OLD FILES
        if (player.in.delay.gt(0)) {
            player.in.delay = player.in.delay.sub(delta)
            if (player.in.delay.gt(0) && player.in.delay.lte(1)) {
                layers.in.bigCrunch()
                layers.ta.negativeInfinityReset()
                for (let i = 0; i < player.r.milestones.length; i++) {
                    if (+player.r.milestones[i] > 20) {
                        player.r.milestones.splice(i, 1);
                        i--;
                    }
                }
                player.in.delay = new Decimal(0)
            }
        }

        // UNI 2 UNLOCK VARIABLE
        if (player.in.infinityPoints.gt(0) && !player.in.unlockedInfinity) {
            player.in.unlockedInfinity = true
            player.universe == "U2"
        }

        // REACH INFINITY CODE (1e308 POINTS ROUGHLY)
        if (player.in.reachedInfinity) {
            if (!player.in.breakInfinity) {
                if (inChallenge("ip", 11) && !hasChallenge("ip", 11)) {
                    if (!hasAchievement("achievements", 107)) completeAchievement("achievements", 107)
                    player.ip.challenges[11] = 1
                    completeChallenge("ip", 11)
                }
                if (inChallenge("ip", 12) && !hasChallenge("ip", 12)) {
                    if (!hasAchievement("achievements", 109)) completeAchievement("achievements", 109)
                    player.ip.challenges[12] = 1
                    completeChallenge("ip", 12)
                }
                if (inChallenge("ip", 14)) {
                    if (!hasAchievement("achievements", 112)) completeAchievement("achievements", 112)
                }
                if (inChallenge("ip", 15) && !hasChallenge("ip", 15)) {
                    if (!hasAchievement("achievements", 116)) completeAchievement("achievements", 116)
                    player.ip.challenges[15] = 1
                    completeChallenge("ip", 15)
                }
                if (inChallenge("ip", 16) && !hasChallenge("ip", 16)) {
                    if (!hasAchievement("achievements", 120)) completeAchievement("achievements", 120)
                    player.ip.challenges[16] = 1
                    completeChallenge("ip", 16)
                }
                if (!hasMilestone("ip", 21) && ((!player.s.highestSingularityPoints.gt(0)))) {
                    player.tab = "bigc"
                } else {
                    layers.bigc.crunch()
                }
            }
        }

        //----------------------------------------

        // INFINITY POINT BASE
        if (!player.in.breakInfinity) player.in.infinityPointsToGet = new Decimal(1)
        if (player.in.breakInfinity && !hasUpgrade("bi", 111)) player.in.infinityPointsToGet = player.points.div(1e308).plus(1).log10().div(10)
        if (player.in.breakInfinity && hasUpgrade("bi", 111)) player.in.infinityPointsToGet = player.points.div(1e308).plus(1).log10().div(2).pow(1.25)
        if (player.in.breakInfinity && hasUpgrade("bi", 115)) player.in.infinityPointsToGet = player.points.div(1e308).plus(1).log10().pow(1.5)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(player.cs.scraps.infinity.effect)


        // START OF INFINITY POINT MODIFIERS
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.hbl.boosters[2].effect)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("ip", 11))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.d.boosterEffects[11])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.rf.abilityEffects[5])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("cb", 12))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("ta", 33))
        if (hasUpgrade("ip", 42)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(upgradeEffect("ip", 42))
        if (hasUpgrade("bi", 101)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(upgradeEffect("bi", 101))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.om.diceMasteryPointsEffect)
        if (player.tad.altInfinities.disfigured.milestone.gte(2)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.tad.altInfinities.disfigured.effect2)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("gh", 38))
        if (hasUpgrade("bi", 23)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(upgradeEffect("bi", 23))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.ca.replicantiEffect)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("id", 24))
        if (hasUpgrade("hpw", 1063)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(upgradeEffect("hpw", 1063))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("ca", 24))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(levelableEffect("pet", 403)[1])
        if (hasMilestone("fa", 11)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.fa.milestoneEffect[0])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.sd.singularityPowerEffect)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("s", 12))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("fu", 17))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.fu.sadnessEffect2)
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.co.cores.infinity.effect[0])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(levelableEffect("pu", 101)[2])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("ma", 21))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.ma.bestComboDepth1Effect)
        if (hasMilestone("r", 21)) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.r.pentMilestone11Effect)
        if (player.pol.pollinatorEffects.water.enabled) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.pol.pollinatorEffects.water.effects[0])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(buyableEffect("st", 301))
        if (player.ma.matosDefeated) player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul("1e600")
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.mul(player.i.pylonPassiveEffect)

        // POWER MODIFIERS
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(player.co.cores.infinity.effect[1])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(levelableEffect("pet", 404)[0])
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(buyableEffect("sb", 103))
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(levelableEffect("ir", 4)[1]).floor()
        player.in.infinityPointsToGet = player.in.infinityPointsToGet.pow(player.cof.coreFragmentEffects[3])

        // ABNORMAL MODIFIERS
        if (player.po.halter.ip.enabled == 1) player.in.infinityPointsToGet = player.in.infinityPointsToGet.div(player.po.halter.ip.halt)
        if (player.po.halter.ip.enabled == 2 && player.in.infinityPointsToGet.gt(player.po.halter.ip.halt)) player.in.infinityPointsToGet = player.po.halter.ip.halt

        // AUTOMATION
        if (hasUpgrade("s", 24)) player.in.infinityPoints = player.in.infinityPoints.add(player.in.infinityPointsToGet.mul(delta))

        //----------------------------------------

        // START OF INFINITIES MODIFIERS
        player.in.infinitiesToGet = new Decimal(1)
        // ADD A BUNCH OF INFINITY BUFF ACHIEVEMENTS (AT LEAST ENOUGH TO REACH x2 BEFORE ALT-INFINITIES)
        if (hasAchievement("achievements", 107)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(1.1)
        if (hasAchievement("achievements", 109)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(1.1)
        if (hasAchievement("achievements", 111)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(1.1)
        if (hasAchievement("achievements", 113)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(1.1)
        if (hasAchievement("achievements", 116)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(1.1)
        if (hasAchievement("achievements", 120)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(1.1)
        if (hasAchievement("achievements", 122)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(1.1)
        if (hasAchievement("achievements", 124)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(1.1)

        if (player.tad.altInfinities.shattered.milestone.gte(2)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(player.tad.altInfinities.shattered.effect2)
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(buyableEffect("om", 11))
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(buyableEffect("p", 15))
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(levelableEffect("pet", 1101)[0])
        if (hasMilestone("ip", 28)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(player.points.add(1).log("1.79e308").pow(0.7).max(1))
        if (hasUpgrade("ep2", 14)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(upgradeEffect("ep2", 14))
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(player.co.cores.infinity.effect[2])
        if (hasMilestone("fa", 13)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(player.fa.milestoneEffect[2])
        if (hasUpgrade("tad", 152)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(player.tad.infinitumEffect2)
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(levelableEffect("ir", 2)[1])
        player.in.infinitiesToGet = player.in.infinitiesToGet.mul(buyableEffect("cof", 23))
        if (hasUpgrade("tad", 152)) player.in.infinitiesToGet = player.in.infinitiesToGet.mul(player.in.pylonEnergyEffect2)

        // POWER MODIFIERS
        if (player.tad.altInfinities.infected.milestone.gte(2)) player.in.infinitiesToGet = player.in.infinitiesToGet.pow(player.tad.altInfinities.infected.effect2)

        // ABNORMAL MODIFIERS
        if (player.po.halter.infinities.enabled == 1) player.in.infinitiesToGet = player.in.infinitiesToGet.div(player.po.halter.infinities.halt)
        if (player.po.halter.infinities.enabled == 2 && player.in.infinitiesToGet.gt(player.po.halter.infinities.halt)) player.in.infinitiesToGet = player.po.halter.infinities.halt

        // PASSIVE GAIN
        if (player.tad.altInfinities.fragmented.milestone.gte(3)) player.in.infinities = player.in.infinities.add(player.in.infinitiesToGet.div(4).mul(delta))


        player.in.pylonEnergyMax = Decimal.pow(1e15, player.in.pylonTier)

        if (player.in.pylonBuilt)
        {
            player.in.pylonEnergyPerSecond = new Decimal(1.2)
            player.in.pylonEnergyPerSecond = player.in.pylonEnergyPerSecond.pow(buyableEffect("in", 11))
            player.in.pylonEnergyPerSecond = player.in.pylonEnergyPerSecond.pow(buyableEffect("in", 12))
            player.in.pylonEnergyPerSecond = player.in.pylonEnergyPerSecond.pow(buyableEffect("in", 13))
            player.in.pylonEnergyPerSecond = player.in.pylonEnergyPerSecond.pow(levelableEffect("ir", 9)[1])
            player.in.pylonEnergyPerSecond = player.in.pylonEnergyPerSecond.pow(player.cbs.pylonEnergyEffect4)

            player.in.pylonPassiveEffect = player.in.infinityPoints.pow(0.002).add(1).pow(player.in.pylonTierEffect)
        } else
        {
            player.in.pylonEnergyPerSecond = new Decimal(0)

            player.in.pylonPassiveEffect = new Decimal(1)
        }

        if (player.in.pylonEnergy.gte(player.in.pylonEnergyMax))
        {
            player.in.pylonEnergy = player.in.pylonEnergyMax
            player.in.pylonEnergyPerSecond = new Decimal(0)
        }
        player.in.pylonEnergy = player.in.pylonEnergy.add(player.in.pylonEnergyPerSecond.mul(delta))

        player.in.pylonEnergyEffect = player.in.pylonEnergy.pow(0.5).add(1).pow(player.in.pylonTierEffect)
        player.in.pylonEnergyEffect2 = player.in.pylonEnergy.pow(0.25).add(1).pow(player.in.pylonTierEffect)
        player.in.pylonEnergyEffect3 = player.in.pylonEnergy.pow(0.175).add(1).pow(player.in.pylonTierEffect)

        player.in.pylonTierEffect = player.in.pylonTier.sub(1).pow(0.4).div(10).add(1)

        //tickspeed
        player.uni["U2"].tickspeed = new Decimal(1)
        player.uni["U2"].tickspeed = player.uni["U2"].tickspeed.mul(player.in.pylonEnergyEffect)
    },
    bigCrunch() {
        if (hasUpgrade("ta", 17)) {
            if (player.d.dicePoints.gt(player.ta.highestDicePoints)) {
                player.ta.highestDicePoints = player.d.dicePoints
            }
            if (player.rf.rocketFuel.gt(player.ta.highestRocketFuel)) {
                player.ta.highestRocketFuel = player.rf.rocketFuel
            }
            if (player.h.hexPoint.gt(player.ta.highestHexPoints)) {
                if (player.po.hex || hasUpgrade("s", 18)) player.ta.highestHexPoints = player.h.hexPoint
            }
        }

        //     <----     U1 STUFF     ---->
        player.points = new Decimal(10)
        player.gain = new Decimal(0)

        if (!hasMilestone("ip", 25)) {
            for (let i = 0; i < player.i.upgrades.length; i++) {
                if (+player.i.upgrades[i] < 22) {
                    player.i.upgrades.splice(i, 1);
                    i--;
                }
            }
        }

        //     <----     RANK LAYER     ---->
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        if (hasMilestone("ip", 15) && !inChallenge("ip", 14)) {player.r.tetr = new Decimal(10)} else {player.r.tetr = new Decimal(0)}
        player.r.pent = new Decimal(0)

        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
        player.r.tetrsToGet = new Decimal(0)
        player.r.pentToGet = new Decimal(0)

        if (!hasMilestone("ip", 15) && !inChallenge("ip", 14)) {
            for (let i = 0; i < player.r.milestones.length; i++) {
                if (+player.r.milestones[i] < 20) {
                    player.r.milestones.splice(i, 1);
                    i--;
                }
            }
        }
        
        //     <----     FACTOR LAYER     ---->
        player.f.factorPower = new Decimal(0)
        player.f.factorPowerEffect = new Decimal(1)
        player.f.factorPowerPerSecond = new Decimal(0)

        if (!hasMilestone("ip", 26)) {
            for (let i in player.f.buyables) {
                player.f.buyables[i] = new Decimal(0)
            }
        }

        //     <----     PRESTIGE LAYER     ---->
        player.p.prestigePoints = new Decimal(0)
        player.p.prestigePointsToGet = new Decimal(0)

        if (!hasMilestone("ip", 11) && !inChallenge("ip", 14)) player.p.upgrades.splice(0, player.p.upgrades.length)

        //     <----     TREE LAYER     ---->
        player.t.trees = new Decimal(0)
        player.t.treesToGet = new Decimal(0)
        player.t.leaves = new Decimal(0)
        player.t.leavesPerSecond = new Decimal(0)

        if (!hasMilestone("ip", 26)) {
            for (let i in player.t.buyables) {
                player.t.buyables[i] = new Decimal(0)
            }
        }

        //     <----     GRASS LAYER     ---->
        player.g.grass = new Decimal(0)
        player.g.grassVal = new Decimal(0)
        player.g.grassTimer = new Decimal(0)

        player.g.goldGrass = new Decimal(0)
        player.g.goldGrassVal = new Decimal(0)
        player.g.goldGrassTimer = new Decimal(0)

        if (!hasMilestone("ip", 26)) {
            for (let i = 11; i < 19; i++) {
                player.g.buyables[i] = new Decimal(0)
            }
        }

        if (!hasMilestone("ip", 11) && !inChallenge("ip", 14)) player.g.upgrades.splice(0, player.g.upgrades.length)

        for (let i = 1; i < 509; ) {
            setGridData("g", i, [0, new Decimal(1), new Decimal(1)])

            // Increase i value
            if (i % 10 == 8) {
                i = i+93
            } else {
                i++
            }
        }

        //     <----     GRASSHOPPER LAYER     ---->
        player.gh.grasshoppers = new Decimal(0)
        player.gh.grasshoppersToGet = new Decimal(0)
        player.gh.fertilizer = new Decimal(0)
        player.gh.fertilizerPerSecond = new Decimal(0)

        if (!hasMilestone("ip", 26)) {
            for (let i = 1; i < 20; i++) {
                player.gh.buyables[i] = new Decimal(0)
            }
        }

        //     <----     MOD LAYER     ---->
        player.m.codeExperience = new Decimal(0)
        player.m.codeExperienceToGet = new Decimal(0)
        player.m.linesOfCode = new Decimal(0)
        player.m.linesOfCodePerSecond = new Decimal(0)
        player.m.mods = new Decimal(0)
        player.m.modsToGet = new Decimal(0)

        if (!hasMilestone("ip", 26)) {
            for (let i = 11; i < 15; i++) {
                player.m.buyables[i] = new Decimal(0)
            }
        }

        //     <----     DICE LAYER     ---->
        player.d.dicePoints = new Decimal(0)
        player.d.diceRolls = [new Decimal(1)]
        player.d.dice = new Decimal(1)

        for (let i = 0; i < 11; i++) {
            player.d.boosterEffects[i] = new Decimal(1)
        }

        for (let i = 11; i < 16; i++) {
            player.d.buyables[i] = new Decimal(0)
        }

        if (!inChallenge("ip", 15)) {
            player.d.challengeDicePoints = new Decimal(0)
            player.d.challengeDicePointsToGet = new Decimal(0)

            player.d.upgrades.splice(0, player.d.upgrades.length)

            for (let i = 21; i < 25; i++) {
                player.d.buyables[i] = new Decimal(0)
            }
        }

        //     <----     ROCKETFUEL LAYER     ---->
        player.rf.rocketFuel = new Decimal(0)
        player.rf.rocketFuelToGet = new Decimal(0)
        player.rf.abilityIndex = -1

        for (let i = 0; i < player.rf.abilitiesUnlocked.length; i++) {
            player.rf.abilitiesUnlocked[i] = false
        }

        for (let i = 0; i < 5; i++) {
            player.rf.abilityTimers[i] = new Decimal(0)
            player.rf.abilityEffects[i] = new Decimal(1)
        }

        player.rf.upgrades.splice(0, player.rf.upgrades.length)

        //     <----     U1 CHALLENGE STUFF     ---->
        player.pe.pests = new Decimal(0)
        player.pe.pestsPerSecond = new Decimal(0)
        player.pe.pestEffect = [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(0)]

        //     <----     POLLINATOR LAYER     ---->
        player.pol.pollinators = new Decimal(0)
        player.pol.pollinatorsPerSecond = new Decimal(0)

        //     <----     FACTORY LAYER     ---->
        player.fa.charge = new Decimal(0)
        player.fa.chargeRate = new Decimal(0)


        //     <----     ANTIMATTER LAYER     ---->
        if (!hasMilestone("ip", 14)) {
            player.ad.antimatter = new Decimal(10)
            player.ad.antimatterPerSecond = new Decimal(0)

            for (let i = 0; i < player.ad.dimensionAmounts.length; i++) {
                player.ad.dimensionAmounts[i] = getBuyableAmount("ad", 11+i)
                player.ad.dimensionsPerSecond[i] = new Decimal(0)
            }
        }

        //     <----     OTF STUFF     ---->
        if (!player.po.keepOTFS) {
            player.po.dice = false
            player.po.rocketFuel = false
            player.po.hex = false
            player.po.breakInfinity = false
            player.in.breakInfinity = false
            player.po.featureSlots = player.po.featureSlotsMax
        }

        //     <----     MASTERY POINT STUFF     ---->
        if (hasUpgrade("bi", 14)) {
            if (player.po.dice) player.om.diceMasteryPoints = player.om.diceMasteryPoints.add(player.om.diceMasteryPointsToGet)
            if (player.po.rocketFuel) player.om.rocketFuelMasteryPoints = player.om.rocketFuelMasteryPoints.add(player.om.rocketFuelMasteryPointsToGet)
            if (player.po.hex || hasUpgrade("s", 18)) player.om.hexMasteryPoints = player.om.hexMasteryPoints.add(player.om.hexMasteryPointsToGet)
        }
    },
    clickables: {
        11: {
            title() { return "<h2>Build the Universe 2 Pylon<br>Cost: 4,000 Paradox Core Fragments" },
            canClick() { return player.cof.coreFragments[3].gte(4000) },
            unlocked() { return !player.in.pylonBuilt },
            onClick() {
                player.cof.coreFragments[3] = player.cof.coreFragments[3].sub(4000)

                player.in.pylonBuilt = true
            },
            style: {width: "600px", minHeight: "200px", color: "#1b110eff", backgroundImage: "radial-gradient(circle, #1FF4B0 80%, #20ABC1 95%, #2161D2 110%)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px"},
        },
        12: {
            title() { return "<h2>Tier up the Paradox Pylon" },
            canClick() { return player.in.pylonEnergy.gte(player.in.pylonEnergyMax) },
            unlocked() { return player.in.pylonEnergy.gte(player.in.pylonEnergyMax) },
            onClick() {
                player.in.pylonEnergy = new Decimal(0)

                player.in.pylonTier = player.in.pylonTier.add(1)
            },
            style: {width: "600px", minHeight: "200px", color: "#1b110eff", backgroundImage: "radial-gradient(circle, #1FF4B0 80%, #20ABC1 95%, #2161D2 110%)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px"},
        },
    },
    bars: {},
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.cof.coreFragments[3] },
            pay(amt) { player.cof.coreFragments[3] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.9).div(5).add(1)},
            unlocked() { return player.in.pylonBuilt },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Paradox Pylon Power Factor I"
            },
            display() {
                return 'which are boosting ancient pylon energy by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #20A3C2 0%, #20BBBD 100%)" }
        },
        12: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.cof.coreFragments[3] },
            pay(amt) { player.cof.coreFragments[3] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.9).div(5).add(1)},
            unlocked() { return player.in.pylonBuilt },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Paradox Pylon Power Factor II"
            },
            display() {
                return 'which are boosting ancient pylon energy by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #20A3C2 0%, #20BBBD 100%)" }
        },
        13: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.cof.coreFragments[3] },
            pay(amt) { player.cof.coreFragments[3] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.9).div(5).add(1)},
            unlocked() { return player.in.pylonBuilt },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Paradox Pylon Power Factor III"
            },
            display() {
                return 'which are boosting ancient pylon energy by ^' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #20A3C2 0%, #20BBBD 100%)" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {
        1: {
            title: "Infinity",
            body() { return "Tav, the celestial of limits, has placed a barrier on the superphysical value of celestial points. He introduced the magic number: 1.7976931...e308. A constant value that represented the point at which celestial points condensed into an infinity. When celestial points are condensed into an infinity, it also produces infinity points as a byproduct. This process is called a big crunch. Infinities are an ancient power, tracing back to the time of the original seven." },
            unlocked() { return true },      
        },
        2: {
            title: "Celestial",
            body() { return "It is safe to conclude the following information about a celestial: Celestials are comprised of a physical aspect, and a superphysical aspect. Both aspects contain immense powers that are incomprehensible by normal life forms. Most of us were once a different life form, humans included. It is unknown what causes us to be celestials. It can be very hard for us to travel between universes, only the most skilled of celestials can. Many unknowns are still present. We don't know who rules the celestials. We don't know why celestials exist. We don't know what our true limits are. It is only a matter of time until I figure everything out." },
            unlocked() { return hasUpgrade("bi", 18) },      
        },
        3: {
            title: "Otherworldly Features",
            body() { return "Otherworldly Features were created by a group of celestials called the Novasent. So far, I have only discovered three of them: Dice, Rocket Fuel, and Hex. The superphysical values that are a part of OTFs are artificial. I find dice to be the most intriguing. The entropic value of these OTFs are fascinating. Randomness isn't too common within SPVs, and especially not artificial SPVs. Zar, the celestial that created this OTF, is a very mysterious celestial. I've heard that he is the strongest of all the novasent. Rocket fuel is also very powerful, as it can lead into multiple universes. It was created by Iridite, the Astral Celestial. I've spoken with her once. She is an insanely smart celestial, but she seems to have psychopathic tendencies. Apparently Iridite and Zar don't get along very well... Hex is the last of the main three OTFs.  This SPV is extremely rare, as instead of representing one number, it is a list of numbers. This one was created by Tera, the Celestial of Tiers. Tera is the most mysterious of the three novasent. I don't have any information on this celestial... Apparently there is an entire universe dedicated to Hex. How strange is that??" },
            unlocked() { return hasUpgrade("bi", 26) },      
        },
    },
    microtabs: {
        stuff: {
            "Lore": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                        ["blank", "25px"],
                        ["infobox", "1"],
                        ["infobox", "2"],
                        ["infobox", "3"],
                ]
            },
            "Pylon": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return player.i.pylonTier.gte(2) },
                content: [
                        ["blank", "25px"],
                            ["left-row", [
            ["tooltip-row", [
                ["raw-html", "<img src='resources/fragments/paradoxFragment.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatWhole(player.cof.coreFragments[3])}, {width: "93px", height: "50px", color: "#1FD3B7", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Paradox Core Fragments</div>"],
            ], {width: "148px", height: "50px",}],
        ], {width: "148px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
                    ["blank", "25px"],
                    ["clickable", 11],
                    ["raw-html", () => { return player.in.pylonBuilt ? "You have <h3>" + format(player.in.pylonEnergy) + "/" + format(player.in.pylonEnergyMax) +  "</h3> paradox pylon energy (" + format(player.in.pylonEnergyPerSecond) + "/s)." : "" }, {color: "#000000ff", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.in.pylonBuilt ? "Boosts U2 tickspeed by x" + format(player.in.pylonEnergyEffect) + "." : ""}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.in.pylonBuilt ? "Boosts infinities by x" + format(player.in.pylonEnergyEffect2) + "." : ""}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.in.pylonBuilt ? "Boosts ancient pylon energy by x" + format(player.in.pylonEnergyEffect3) + "." : ""}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.in.pylonBuilt ? "Passive effect: Boosts SP gain by x" + format(player.in.pylonPassiveEffect) + " (Based on infinity points)" : ""}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13],]], 
                    ["blank", "25px"],
                    ["raw-html", () => {return player.in.pylonBuilt ? "Your ancient pylon is tier " + formatWhole(player.in.pylonTier) + ", which boosts all pylon effects by ^" + format(player.in.pylonTierEffect) + "." : ""}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["clickable", 12],
                ]
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.ad.antimatter) + "</h3> antimatter"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.ad.antimatterPerSecond) + "/s)"}, () => {
                look = {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                player.ad.antimatterPerSecond.gt(0) ? look.color = "white" : look.color = "gray"
                return look
            }],
        ]],
        ["raw-html", () => {return "Boosts points by x" + format(player.ad.antimatterEffect) + " (based on points and antimatter)"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && player.in.unlockedInfinity && !player.cp.cantepocalypseActive && !player.sma.inStarmetalChallenge}
})
addLayer("bigc", {
    name: "Big Crunch", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BC", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        spawnedWisps: false,
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Big Crunch",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.tab == "bigc" && !player.bigc.spawnedWisps)
        {
            player.bigc.spawnedWisps = true
        } else if (player.tab != "bigc" && player.bigc.spawnedWisps) {
            player.bigc.spawnedWisps = false
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
                player.tab = "ip"

                layers.bigc.crunch()
            },
            style: {width: "300px", minHeight: "120px", border: "3px solid rgba(0,0,0,0.3)", borderRadius: "15px"},
        },
    },
    crunch(){
        player.in.infinityPoints = player.in.infinityPoints.add(player.in.infinityPointsToGet)
        player.in.infinities = player.in.infinities.add(player.in.infinitiesToGet)
        if (player.po.dice) player.ip.diceRuns = player.ip.diceRuns.add(1)
        if (player.po.rocketFuel) player.ip.rocketFuelRuns = player.ip.rocketFuelRuns.add(1)
        if (player.po.hex || hasUpgrade("s", 18)) player.ip.hexRuns = player.ip.hexRuns.add(1)
        if (hasUpgrade("ta", 17)) {
            if (player.d.dicePoints.gt(player.ta.highestDicePoints)) {
                player.ta.highestDicePoints = player.d.dicePoints
            }
            if (player.rf.rocketFuel.gt(player.ta.highestRocketFuel)) {
                player.ta.highestRocketFuel = player.rf.rocketFuel
            }
            if (player.h.hexPoint.gt(player.ta.highestHexPoints)) {
                if (player.po.hex || hasUpgrade("s", 18)) player.ta.highestHexPoints = player.h.hexPoint
            }
        }
        if (!hasAchievement("achievements", 101)) completeAchievement("achievements", 101)
        if (!hasAchievement("achievements", 105) && player.in.infinities.gte(3)) completeAchievement("achievements", 105)
        if (!hasAchievement("achievements", 118) && player.in.infinities.gte(100)) completeAchievement("achievements", 118)
        layers.in.bigCrunch()
        player.in.reachedInfinity = false
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    tabFormat: [
        ["raw-html", function () { return "<h2>1e308 celestial points- impossible." }, { "color": "black", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "150px"],
        ["row", [["clickable", 11]]],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true }
})