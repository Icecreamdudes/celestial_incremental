/**
 * Compute how much IP is gained on reset, based purely on points.
 * @returns 
 */
function getInfinityPointBaseGain() {
    if (!player.in.breakInfinity) {
        return new Decimal(1);
    }

    let amount;
    if (hasUpgrade("bi", 115)) {
        amount = player.points.div(1e308).plus(1).log10().pow(1.5);
    } else if (hasUpgrade("bi", 111)) {
        amount = player.points.div(1e308).plus(1).log10().div(2).pow(1.25);
    } else {
        amount = player.points.div(1e308).plus(1).log10().div(10);
    }

    const basePower = player.cs.scraps.infinity.effect;
    return amount.pow(basePower);
}

/**
 * Compute the total multiplier to IP gain.
 * @returns 
 */
function getInfinityPointGainMultiplier() {
    const factors = [
        buyableEffect("ca", 24),
        buyableEffect("cb", 12),
        buyableEffect("fu", 17),
        buyableEffect("gh", 38),
        buyableEffect("id", 24),
        buyableEffect("ip", 11),
        buyableEffect("ma", 21),
        buyableEffect("s", 12),
        buyableEffect("st", 301),
        buyableEffect("ta", 33),

        levelableEffect("pet", 403)[1], // Cookie
        levelableEffect("pu", 101)[2],

        player.hbl.boosters[2].effect,
        player.d.boosterEffects[11],
        player.rf.abilityEffects[5],
        player.om.diceMasteryPointsEffect,
        player.ca.replicantiEffect,
        player.sd.singularityPowerEffect,
        player.fu.sadnessEffect2,
        player.co.cores.infinity.effect[0],
        player.ma.bestComboDepth1Effect,
        player.i.pylonPassiveEffect,

        optionalUpgradeEffect("ip", 42).orElse(1),
        optionalUpgradeEffect("bi", 101).orElse(1),
        optionalUpgradeEffect("bi", 23).orElse(1),
        optionalUpgradeEffect("hpw", 1063).orElse(1),

        player.tad.altInfinities.disfigured.milestone.gte(2) ? player.tad.altInfinities.disfigured.effect2 : 1,
        hasMilestone("fa", 11) ? player.fa.milestoneEffect[0] : 1,
        hasMilestone("r", 21) ? player.r.pentMilestone11Effect : 1,
        player.ma.matosDefeated ? "1e600" : 1,
        player.pol.pollinatorEffects.water.enabled ? player.pol.pollinatorEffects.water.effects[0] : 1,
    ];

    return factors.reduce(Decimal.multiply, 1);
}

/**
 * Compute what power IP gain is raised to.
 * @returns 
 */
function getInfinityPointGainPower() {
    const powers = [

        player.co.cores.infinity.effect[1],
        levelableEffect("pet", 404)[0],
        buyableEffect("sb", 103),
        levelableEffect("ir", 4)[1],
        player.cof.coreFragmentEffects[3],
    ];

    return powers.reduce(Decimal.multiply, 1);
}

/**
 * Compute how many IP should be awarded on reset. 
 * @returns 
 */
function getInfinityPointGain() {
    const gain = getInfinityPointBaseGain()
            .times(getInfinityPointGainMultiplier())
            .pow(getInfinityPointGainPower());
    
    if (player.po.halter.ip.enabled == 1) return gain.dividedBy(player.po.halter.ip.halt);
    if (player.po.halter.ip.enabled == 2) return gain.min(player.po.halter.ip.halt);
    return gain;
}

/**
 * Handle updating IP amount to account for passive gain.
 * @param {*} delta Amount of time that's passed in seconds.
 * @returns 
 */
function updateInfinityPointAmount(delta) {
    if (!hasUpgrade("s", 24)) return;
    player.in.infinityPoints = player.in.infinityPoints.plus(getInfinityPointGain().times(delta));
}


/**
 * Compute the total multiplier to Infinity gain on reset.
 * @returns 
 */
function getInfinityGainMultiplier() {
    const factors = [
        
        buyableEffect("cof", 23),
        buyableEffect("om", 11),
        buyableEffect("p", 15),
        levelableEffect("pet", 1101)[0], // VoidGwa
        levelableEffect("ir", 2)[1],
        getParadoxPylonEffect(1),
        player.co.cores.infinity.effect[2],

        player.tad.altInfinities.shattered.milestone.gte(2) ? player.tad.altInfinities.shattered.effect2 : 1,
        hasMilestone("ip", 28) ? player.points.add(1).log("1.79e308").pow(0.7).max(1) : 1,
        hasMilestone("fa", 13) ? player.fa.milestoneEffect[2] : 1,
        hasUpgrade("ep2", 14) ? upgradeEffect("ep2", 14) : 1,
        hasUpgrade("tad", 152) ? player.tad.infinitumEffect2 : 1,

        // One for each challenge -- >2x mult before Tav.
        hasAchievement("achievements", 107) ? 1.1 : 1,
        hasAchievement("achievements", 109) ? 1.1 : 1,
        hasAchievement("achievements", 111) ? 1.1 : 1,
        hasAchievement("achievements", 113) ? 1.1 : 1,
        hasAchievement("achievements", 116) ? 1.1 : 1,
        hasAchievement("achievements", 120) ? 1.1 : 1,
        hasAchievement("achievements", 122) ? 1.1 : 1,
        hasAchievement("achievements", 124) ? 1.1 : 1,
    ];

    return factors.reduce(Decimal.multiply, 1);
}

/**
 * Compute what power infinity gain should be raised to.
 * @returns 
 */
function getInfinityGainPower() {
    return player.tad.altInfinities.infected.milestone.gte(2) ? player.tad.altInfinities.infected.effect2 : 1;
}

/**
 * Compute how many infinities should be gained on reset. 
 * @returns 
 */
function getInfinityGain() {
    const gain = getInfinityGainMultiplier().pow(getInfinityGainPower());

    if (player.po.halter.infinities.enabled == 1) return gain.dividedBy(player.po.halter.infinities.halt);
    if (player.po.halter.infinities.enabled == 2) return gain.min(player.po.halter.infinities.halt);
    return gain;
}

/**
 * Update the amount of infinities to account for passive gain.
 * @param {*} delta Amount of time that's passed in seconds.
 * @returns 
 */
function updateInfinityAmount(delta) {
    if (!player.tad.altInfinities.fragmented.milestone.gte(3)) return;
    player.in.infinities = player.in.infinities.add(getInfinityGain().times(0.25).times(delta))
}

/**
 * Deal with old saves.
 * I'm not sure what this does, but it seems to reset some dated
 * pre-infinity content. 
 * @param {*} delta Time since last tick in seconds. Timing is important here.
 */
function handleLegacySaveReset(delta) {
    if (player.in.delay.lte(0)) return;

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

/**
 * Deal with the player reaching Infinite Points before infinity is broken.
 * @returns 
 */
function handleReachingInfinity() {
    if (!player.in.reachedInfinity) return;
    // Only force action if infinity is not broken.
    if (player.in.breakInfinity) return;

    // Handle Challenges completed by reaching infinity
    if (inChallenge("ip", 11) && !hasChallenge("ip", 11)) {
        completeAchievement("achievements", 107)
        player.ip.challenges[11] = 1
        completeChallenge("ip", 11)
    }
    if (inChallenge("ip", 12) && !hasChallenge("ip", 12)) {
        completeAchievement("achievements", 109)
        player.ip.challenges[12] = 1
        completeChallenge("ip", 12)
    }
    if (inChallenge("ip", 14)) {
        completeAchievement("achievements", 112)
    }
    if (inChallenge("ip", 15) && !hasChallenge("ip", 15)) {
        completeAchievement("achievements", 116)
        player.ip.challenges[15] = 1
        completeChallenge("ip", 15)
    }
    if (inChallenge("ip", 16) && !hasChallenge("ip", 16)) {
        completeAchievement("achievements", 120)
        player.ip.challenges[16] = 1
        completeChallenge("ip", 16)
    }

    if (!hasMilestone("ip", 21) && player.s.highestSingularityPoints.lte(0)) {
        player.tab = "bigc"
    } else {
        layers.bigc.crunch()
    }
}

/**
 * Determine how much Energy the Paradox Pylon gains per second.
 * @returns 
 */
function getParadoxPylonEnergyGain() {
    if (!player.in.pylonBuilt) return new Decimal(0);
    if (player.in.pylonEnergy.gte(getParadoxPylonEnergyLimit())) return new Decimal(0);

    const powers = [
        buyableEffect("in", 11),
        buyableEffect("in", 12),
        buyableEffect("in", 13),
        levelableEffect("ir", 9)[1],
        player.cbs.pylonEnergyEffect4,
    ];

    const totalPower = powers.reduce(Decimal.multiply, 1);

    return totalPower.pow_base(1.2);
}

/**
 * Increase Paradox Pylon Energy based on gain and time.
 * @param {*} delta Amount of time that's passed in seconds.
 */
function updateParadoxPylonEnergy(delta) {
    player.in.pylonEnergy = player.in.pylonEnergy
            .add(getParadoxPylonEnergyGain().times(delta))
            .min(getParadoxPylonEnergyLimit());
}

/**
 * Get the passive effect of the Paradox Pylon to Singularity Points.
 * @returns 
 */
function getParadoxPylonPassiveEffect() {
    if (!player.in.pylonBuilt) return new Decimal(1);

    return player.in.infinityPoints.pow(0.002).add(1).pow(getParadoxPylonTierEffect());
}

/**
 * Compute the various Paradox Pylon effects.
 * @param {*} effectId 
 *          0 = Tickspeed in Universe 2
 *          1 = Infinity Gain multiplier
 *          2 = Ancient Pylon Energy Gain Multiplier
 * @returns 
 */
function getParadoxPylonEffect(effectId) {
    const tierPower = getParadoxPylonTierEffect();
    switch (effectId) {
        case 0: 
            // Tickspeed in U2
            return player.in.pylonEnergy.pow(0.5).add(1).pow(tierPower);
        case 1:
            // Infinity gain
            return player.in.pylonEnergy.pow(0.25).add(1).pow(tierPower);
        case 2: 
            // Ancient Pylon Energy gain
            return player.in.pylonEnergy.pow(0.175).add(1).pow(tierPower);
    }
}

/**
 * Get the effect of the Paradox Pylon's tier -- a power to all other effects.
 * @returns 
 */
function getParadoxPylonTierEffect() {
    return player.in.pylonTier.sub(1).pow(0.4).div(10).add(1);
}

/**
 * Get the maximum energy that can be put into the Paradox Pylon at this tier.
 * @returns 
 */
function getParadoxPylonEnergyLimit() {
    return player.in.pylonTier.pow_base(1e15);
}

/**
 * Determine how much faster Universe 2 is running compared to real time.
 * @returns 
 */
function getUniverse2Tickspeed() {
    return getParadoxPylonEffect(0);
}


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
        pylonEnergy: new Decimal(0),
        
        pylonPassiveEffect: new Decimal(1),

        pylonTier: new Decimal(1),
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

        handleLegacySaveReset(delta);
        handleReachingInfinity();

        // TODO: this should be triggered by a button press elsewhere,
        //  not something we bother with every tick.
        if (player.in.infinityPoints.gt(0) && !player.in.unlockedInfinity) {
            player.in.unlockedInfinity = true
            player.universe == "U2"
        }

        player.in.infinityPointsToGet = getInfinityPointGain();
        updateInfinityPointAmount(delta);

        player.in.infinitiesToGet = getInfinityGain();
        updateInfinityAmount(delta);

        updateParadoxPylonEnergy();

        //tickspeed
        player.uni["U2"].tickspeed = getUniverse2Tickspeed();
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

        awardOTFMasteryPoints();
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
            canClick() { return player.in.pylonEnergy.gte(getParadoxPylonEnergyLimit()) },
            unlocked() { return player.in.pylonEnergy.gte(getParadoxPylonEnergyLimit()) },
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
                    ["raw-html", () => { return player.in.pylonBuilt ? "You have <h3>" + format(player.in.pylonEnergy) + "/" + format(getParadoxPylonEnergyLimit()) +  "</h3> paradox pylon energy (" + format(getParadoxPylonEnergyGain()) + "/s)." : "" }, {color: "#000000ff", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.in.pylonBuilt ? "Boosts U2 tickspeed by x" + format(getParadoxPylonEffect(0)) + "." : ""}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.in.pylonBuilt ? "Boosts infinities by x" + format(getParadoxPylonEffect(1)) + "." : ""}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.in.pylonBuilt ? "Boosts ancient pylon energy by x" + format(getParadoxPylonEffect(2)) + "." : ""}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return player.in.pylonBuilt ? "Passive effect: Boosts SP gain by x" + format(getParadoxPylonPassiveEffect()) + " (Based on infinity points)" : ""}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13],]], 
                    ["blank", "25px"],
                    ["raw-html", () => {return player.in.pylonBuilt ? "Your ancient pylon is tier " + formatWhole(player.in.pylonTier) + ", which boosts all pylon effects by ^" + format(getParadoxPylonTierEffect()) + "." : ""}, {color: "black", fontSize: "20px", fontFamily: "monospace"}],
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
});


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