/**
 * Compute the raw gain of grasshoppers based purely on grass.
 * @returns 
 */
function getGrasshopperBaseGain() {
    // The old code did some weird shenanigans
    // involving grasshopper amount on prior frames.
    // This is what they probably intended.
    if (player.g.grass.lt(2.5e11)) {
        return player.g.grass.div(10000).pow(0.55);
    }
    return player.g.grass.div(15000).pow(0.45).add(10000);
}

/**
 * Compute the total multiplier to grasshopper gain.
 * @returns 
 */
function getGrasshopperGainMultiplier() {
    const factors = [
        levelableEffect("pet", 201)[1], // Teste
        levelableEffect("pet", 304)[0], // Goofy Ahh thing
        player.d.boosterEffects[6],
        optionalUpgradeEffect("d", 14).orElse(1),

        hasAchievement("achievements", 23) ? 2 : 1,

        getSteelEffect(),
        player.i.preOTFMult,
        player.co.cores.grasshopper.effect[0],

        hasUpgrade("cs", 602) ? player.gs.grassSkipEffect2 : 1,
        hasUpgrade("ad", 16) && !inChallenge("ip", 14) ? upgradeEffect("ad", 16) : 1,
        hasUpgrade("ip", 32) && !inChallenge("ip", 14) ? upgradeEffect("ip", 32) : 1,
        // TODO: Rocker Fuel check
        player.po.rocketFuel || inChallenge("ip", 16) ? player.rf.rocketFuelEffect : 1,
        // TODO: Hex check function
        inChallenge("ip", 13) || player.po.hex || hasUpgrade("s", 18) ? player.hre.refinementEffect[4][1] : 1,
        player.pol.pollinatorEffects.bee.enabled ? player.pol.pollinatorEffects.bee.effects[0] : 1,
    ];

    return factors.reduce(Decimal.multiply, 1);
}

/**
 * Compute what power grasshopper gain is raised to.
 * @returns 
 */
function getGrasshopperGainPower() {
    const powers = [
        buyableEffect("fu", 34),
        buyableEffect("cof", 15),
        buyableEffect("cof", 17),
        player.se.starsExploreEffect[0][4],

        hasUpgrade("hpw", 1041) ? 1.1 : 1,
        inChallenge("ip", 15) ? 0.85 : 1,
    ];

    return powers.reduce(Decimal.multiply, 1);
}

/**
 * Compute how many grasshoppers can be gained on reset. 
 * @returns 
 */
function getGrasshopperGain() {
    if (player.r.timeReversed) return new Decimal(0);

    const gain = getGrasshopperBaseGain()
            .times(getGrasshopperGainMultiplier())
            .pow(getGrasshopperGainPower());
    
    if (player.po.halter.grasshoppers.enabled == 1) return gain.dividedBy(player.po.halter.grasshoppers.halt);
    if (player.po.halter.grasshoppers.enabled == 2) return gain.min(player.po.halter.grasshoppers.halt);
    return gain;
}

/**
 * Update current grasshopper amount based on passive gain and challenge nerfs.
 * @param {*} delta 
 */
function updateGrasshopperAmount(delta) {
    let change = new Decimal(0);

    if (inChallenge("ip", 12)) {
        change = player.gh.grasshoppers.mul(player.pe.pestEffect[7] * delta).neg();
    }

    const gainAddends = [
        hasUpgrade("rf", 14) ? 0.01 : 0,
        hasMilestone("ip", 22) ? 0.1 : 0
    ];
    const gainPerSecond = gainAddends.reduce(Decimal.add, 0);
    change = change.plus(getGrasshopperGain().times(gainPerSecond).times(delta));

    player.gh.grasshoppers = player.gh.grasshoppers.plus(change);
}

/**
 * Get one of the effects of Grasshoppers.
 * @param {0 | 1 | 2 | 3 | 4} effectId
 *      0 = Celestial Points
 *      1 = Factor Power
 *      2 = Prestige Points
 *      3 = Leaves
 *      4 = Grass Value
 * @returns 
 */
function getGrasshopperEffect(effectId) {
    const softcapExponent = Decimal.add(0.1, player.cs.scraps.grasshopper.effect);
    let softcapStart;
    let effect;
    switch (effectId) {
        case 0:
            // Celestial Points
            softcapStart = new Decimal("1e27500"),
            effect = player.gh.grasshoppers.pow(1.375).add(1);
            break;
        case 1:
            // Factor Power
            softcapStart = new Decimal("1e24000"),
            effect = player.gh.grasshoppers.div(1.2).pow(1.2).add(1);
            break;
        case 2:
            // Prestige Points
            softcapStart = new Decimal("1e23000"),
            effect = player.gh.grasshoppers.div(1.7).pow(1.15).add(1);
            break;
        case 3:
            // Leaf Gain
            softcapStart = new Decimal("1e22000"),
            effect = player.gh.grasshoppers.div(2).pow(1.1).add(1)
            break;
        case 4:
            // Grass Value
            softcapStart = new Decimal("1e10000"),
            effect = player.gh.grasshoppers.div(4).pow(0.5).add(1);
            break;
        default:
            return new Decimal(0); // Shouldn't happen.
    }

    if (effect.gt(softcapStart)) {
        return effect.dividedBy(softcapStart).pow(softcapExponent).times(softcapStart);
    }
    return effect;
}


/**
 * Compute fertilizer gain multipliers. 
 * @returns 
 */
function getFertilizerGainMultiplier() {
    const factors = [
        buyableEffect("gh", 34), 

        levelableEffect("pet", 201)[2], // Teste

        player.d.boosterEffects[7],
        player.rf.abilityEffects[3],
        player.r.timeCubeEffects[3],
        player.co.cores.grasshopper.effect[1],
        player.i.preOTFMult,

        hasAchievement("achievements", 15) ? 1.5 : 1,
        hasUpgrade("ad", 16) && !inChallenge("ip", 14) ? upgradeEffect("ad", 16) : 1,
        player.pol.pollinatorEffects.bee.enabled ? player.pol.pollinatorEffects.bee.effects[1] : 1,
        
        player.pe.pestEffect[6].recip(), // Challenge debuff
    ];

    return factors.reduce(Decimal.multiply, 1);
}

/**
 * Compute what power fertilizer is raised to.
 * @returns 
 */
function getFertilizerGainPower() {
    return levelableEffect("pet", 301)[0];
}

/**
 * Compute fertilizer gain per second.
 * @returns 
 */
function getFertilizerPerSecond() {
    if (player.r.timeReversed) return new Decimal(0);

    const baseGain = player.gh.grasshoppers.pow(1.4).div(10);

    const gain = baseGain
            .times(getFertilizerGainMultiplier())
            .pow(getFertilizerGainPower());

    return gain;
}

/**
 * Update current fertilizer amount based on current gain.
 * @param {*} delta Time since last tick in seconds.
 */
function updateFertilizer(delta) {
    player.gh.fertilizer = player.gh.fertilizer.plus(getFertilizerPerSecond().times(delta))
}

/**
 * Get the effect of fertilizer on grass
 * @returns 
 */
function getFertilizerEffect() {
    const softcapBase = new Decimal("1e15000");
    const softcapExponent = new Decimal(0.2);

    const effect = player.gh.fertilizer.pow(0.4).div(10).add(1);
    if (effect.gt(softcapBase)) {
        return effect.dividedBy(softcapBase).pow(softcapExponent).times(softcapBase);
    }
    return effect;
}


/**
 * Compute the base gain of steel from code experience.
 * @returns 
 */
function getSteelBaseGain() {
    // Softcap should begin at 1e6250 code experience / 1e500 base steel;
    // We delay its implementation to avoid a discontinuity.
    if (player.m.codeExperience.gt("1e6325")) {
        return player.m.codeExperience.log10().pow(10).times("1e500");
    }
    return player.m.codeExperience.pow(0.08);
}

/**
 * Compute the total multiplier to steel gain. 
 * @returns 
 */
function getSteelGainMultiplier() {
    const factors = [
        
        buyableEffect("fu", 18),
        buyableEffect("id", 21),
        buyableEffect("oi", 21),
        buyableEffect("p", 14),
        buyableEffect("s", 13),
        buyableEffect("st", 104),

        player.fa.foundryEffect,
        player.fu.happinessEffect2,
        player.co.cores.grasshopper.effect[2],
        player.i.postOTFMult,

        optionalUpgradeEffect("hpw", 1023).orElse(1),
        optionalUpgradeEffect("ep2", 9).orElse(1),
        optionalUpgradeEffect("s", 14).orElse(1),

        player.pol.pollinatorEffects.mechanical.enabled ? player.pol.pollinatorEffects.mechanical.effects[0] : 1,
        hasMilestone("fa", 14) ? player.fa.milestoneEffect[3] : 1,
        hasUpgrade("bi", 107) ? upgradeEffect("bi", 107) : 1,
    ];

    return factors.reduce(Decimal.multiply, 1);
}

/**
 * Compute what power steel gain is raised to. 
 * @returns 
 */
function getSteelGainPower() {
    const powers = [
        player.se.starsExploreEffect[0][5],
        player.cof.coreFragmentEffects[2],
    ];

    return powers.reduce(Decimal.multiply, 1);
}

/**
 * Compute how much steel can be gained on reset. 
 * @returns 
 */
function getSteelGain() {
    return getSteelBaseGain()
            .times(getSteelGainMultiplier())
            .pow(getSteelGainPower());
}

/**
 * Compute the effect of steel on grasshopper gain.
 * @returns 
 */
function getSteelEffect() {
    return player.gh.steel.pow(0.75).add(1);
}

addLayer("gh", {
    name: "Grasshop", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "GH", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U1",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        grasshoppers: new Decimal(0),
        grasshoppersToGet: new Decimal(0),
        grasshopPause: new Decimal(0),

        fertilizer: new Decimal(0),

        steel: new Decimal(0),
        steelToGet: new Decimal(0),
        steelPause: new Decimal(0),

        studyMax: false,
        steelMax: false,
    }},
    automate() {
        if (hasMilestone("ip", 17)) {
            for (let buyableId = 11; buyableId <= 26; buyableId++) {
                buyBuyable("gh", buyableId);
            }
        }
        if (hasMilestone("s", 16)) {
            for (let buyableId = 31; buyableId <= 38; buyableId++) {
                buyBuyable("gh", buyableId);
            }
        }
        if (hasUpgrade("s", 19)) {
            player.gh.buyables[21] = new Decimal(200)
            player.gh.buyables[22] = new Decimal(50)
        }
    },
    nodeStyle() {},
    tooltip: "Grasshop",
    color: "#19e04d",
    update(delta) {
        // START OF GRASSHOPPER MODIFIERS
        player.gh.grasshoppersToGet = getGrasshopperGain();

        updateGrasshopperAmount(delta);

        // GRASSHOPPER RESET CODE?
        if (player.gh.grasshopPause.gt(0)) {
            layers.gh.grasshopReset();
        }
        player.gh.grasshopPause = player.gh.grasshopPause.sub(1)

        updateFertilizer(delta);

        player.gh.steelToGet = getSteelGain();

        // STEEL RESET CODE?
        if (player.gh.steelPause.gt(0)) {
            layers.gh.steelieReset();
        }
        player.gh.steelPause = player.gh.steelPause.sub(1)
        
    },
    branches: ["g"],
    clickables: {
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.gh.studyMax == false },
            unlocked() { return true },
            onClick() {
                player.gh.studyMax = true
            },
            style: { width: '80px', "min-height": '50px', borderRadius: '10px 0px 0px 10px'}
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.gh.studyMax == true  },
            unlocked() { return true },
            onClick() {
                player.gh.studyMax = false
            },
            style: { width: '80px', "min-height": '50px', borderRadius: '0px 10px 10px 0px'}
        },
        4: {
            title() { return "Buy Max On" },
            canClick() { return player.gh.steelMax == false },
            unlocked() { return true },
            onClick() {
                player.gh.steelMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        5: {
            title() { return "Buy Max Off" },
            canClick() { return player.gh.steelMax == true  },
            unlocked() { return true },
            onClick() {
                player.gh.steelMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        11: {
            title() { return "<h2>Grasshop, but reset everything except pent.</h2><br><h3><small>Req: 10,000 Grass and 1e35 Celestial Points</small></h3>" },
            canClick() { return player.gh.grasshoppersToGet.gte(1) && player.points.gte(1e35) },
            unlocked() { return true },
            onClick() {
                if (!hasAchievement("achievements", 13)) completeAchievement("achievements", 13)
                if (!hasAchievement("achievements", 23) && player.gh.grasshoppersToGet.gte(1e25)) completeAchievement("achievements", 23)
                player.gh.grasshopPause = new Decimal(3)
                player.gh.grasshoppers = player.gh.grasshoppers.add(player.gh.grasshoppersToGet)

                if (!hasAchievement("achievements", 108)) {
                    player.pe.pests = player.pe.pests.mul(0.9)
                } else {
                    player.pe.pests = player.pe.pests.mul(0.8)
                }
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px' },
        },
        12: {
            title() { return "<h2>Steelie, but reset everything before unlocking OTFs.</h2><br><h3>(based on code experience)</h3>" },
            canClick() { return player.gh.steelToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.gh.steelPause = new Decimal(5)
                player.gh.steel = player.gh.steel.add(player.gh.steelToGet)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px"}
                this.canClick() ? look.backgroundColor = "grey" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
    },
    grasshopReset()
    {
        player.points = new Decimal(10)
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        if (hasMilestone("r", 14) && !inChallenge("ip", 14)) {player.r.tetr = new Decimal(10)} else {player.r.tetr = new Decimal(0)}
        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
        player.r.tetrsToGet = new Decimal(0)
        player.r.pentToGet = new Decimal(0)

        player.r.factorUnlocks = [true, true, true, false, false, false, false, false]
        player.r.factorGain = new Decimal(1)

        player.r.factorPower = new Decimal(0)
        player.r.factorPowerEffect = new Decimal(1)
        player.r.factorPowerPerSecond = new Decimal(0)
        player.r.powerFactorUnlocks = [true, true, true, false, false, false, false, false]

        if (!hasMilestone("ip", 26)) {
            for (let i = 11; i < 20; i++) {
                player.f.buyables[i] = new Decimal(0)
            }
            for (let i = 21; i < 28; i++) {
                player.f.buyables[i] = new Decimal(0)
            }
        }

        player.p.prestigePoints = new Decimal(0)

        if (!hasMilestone("ip", 11)) {
            for (let i = 0; i < player.p.upgrades.length; i++) {
                if (+player.p.upgrades[i] < 24) {
                    player.p.upgrades.splice(i, 1);
                    i--;
                }
            }
        }

        if (!hasMilestone("ip", 26)) {
            for (let i = 11; i < 19; i++) {
                player.t.buyables[i] = new Decimal(0)
            }
        }

        player.f.factorPower = new Decimal(0)

        player.t.leaves = new Decimal(0)
        player.t.trees = new Decimal(0)

        if (!hasMilestone("ip", 26)) {
            for (let i = 11; i < 19; i++) {
                player.g.buyables[i] = new Decimal(0)
            }
        }

        if (!hasMilestone("ip", 11)) {
            for (let i = 0; i < player.g.upgrades.length; i++) {
                if (+player.g.upgrades[i] < 17) {
                    player.g.upgrades.splice(i, 1);
                    i--;
                }
            }
        }
        player.g.grass = new Decimal(0)
        player.g.grassTimer = new Decimal(0)

        player.g.goldGrass = new Decimal(0)
        player.g.goldGrassTimer = new Decimal(0)

        for (let i = 1; i < 509; ) {
            setGridData("g", i, [0, new Decimal(1), new Decimal(1)])

            // Increase i value
            if (i % 10 == 8) {
                i = i+93
            } else {
                i++
            }
        }
    },
    steelieReset() {
        player.pe.pests = new Decimal(0)
        player.points = new Decimal(10)
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        if (hasMilestone("r", 14) && !inChallenge("ip", 14)) {player.r.tetr = new Decimal(10)} else {player.r.tetr = new Decimal(0)}
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
        if (!hasMilestone("ip", 26)) {
            for (let i in player.f.buyables) {
                player.f.buyables[i] = new Decimal(0)
            }
        }

        player.p.prestigePoints = new Decimal(0)

        if (!hasMilestone("ip", 11) && !inChallenge("ip", 14)) {
            for (let i = 0; i < player.p.upgrades.length; i++) {
                if (+player.p.upgrades[i] < 24) {
                    player.p.upgrades.splice(i, 1);
                    i--;
                }
            }
        }

        if (!hasMilestone("ip", 26)) {
            for (let i = 11; i < 19; i++) {
                player.t.buyables[i] = new Decimal(0)
            }
        }

        player.f.factorPower = new Decimal(0)

        player.t.leaves = new Decimal(0)
        player.t.trees = new Decimal(0)

        if (!hasMilestone("ip", 26)) {
            for (let i = 11; i < 19; i++) {
                player.g.buyables[i] = new Decimal(0)
            }
        }

        if (!hasMilestone("ip", 11) && !inChallenge("ip", 14)) {
        for (let i = 0; i < player.g.upgrades.length; i++) {
            if (+player.g.upgrades[i] < 22) {
                player.g.upgrades.splice(i, 1);
                i--;
            }
        }
        }

        if (!hasMilestone("ip", 15) && !inChallenge("ip", 14)) {
            for (let i = 0; i < player.r.milestones.length; i++) {
                if (+player.r.milestones[i] < 20) {
                    player.r.milestones.splice(i, 1);
                    i--;
                }
            }
        }

        player.g.grass = new Decimal(0)
        player.g.grassTimer = new Decimal(0)

        player.g.goldGrass = new Decimal(0)
        player.g.goldGrassTimer = new Decimal(0)

        for (let i = 1; i < 509; ) {
            setGridData("g", i, [0, new Decimal(1), new Decimal(1)])

            // Increase i value
            if (i % 10 == 8) {
                i = i+93
            } else {
                i++
            }
        }

        player.gh.grasshoppers = new Decimal(0)
        player.gh.fertilizer = new Decimal(0)

        if (!hasMilestone("ip", 26)) {
            for (let i = 11; i < 20; i++) {
                player.gh.buyables[i] = new Decimal(0)
            }
        }
        player.gh.buyables[21] = new Decimal(0)
        player.gh.buyables[22] = new Decimal(0)

        player.m.codeExperience = new Decimal(0)
        player.m.linesOfCode = new Decimal(0)
        player.m.mods = new Decimal(0)

        if (!hasMilestone("ip", 26)) {
            for (let i = 11; i < 15; i++) {
                player.m.buyables[i] = new Decimal(0)
            }
        }

        player.fa.foundryEffect = new Decimal(1)
        player.fa.charge = new Decimal(0)
    },
    bars: {},
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>Grass Study I</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/5)\n\
                    Produce " + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + "% of grass value per second.\n\ \n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "10px"}
        },
        12: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(8) },
            purchaseLimit() { return new Decimal(8) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[11].gte(1) },
            display() {
                return "<h3>Grass Study II</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/8)\n\
                    Divide golden grass time requirement by /" + format(tmp[this.layer].buyables[this.id].effect, 1) + ".\n\ \n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [11],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "10px"}
        },
        13: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(5).pow(2.5).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[11].gte(1) },
            display() {
                return "<h3>Tree Study I</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/40)\n\
                    Extends tree softcap by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\ \n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [11],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "10px"}
        },
        14: {
            costBase() { return new Decimal(250) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01) },
            unlocked() { return true},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[13].gte(1) },
            display() {
                return "<h3>Prestige Study I</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100)\n\
                    Produce " + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + "% of prestige points per second.\n\ \n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [13],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "10px"}
        },
        15: {
            costBase() { return new Decimal(300) },
            costGrowth() { return new Decimal(1.8) },
            purchaseLimit() { return new Decimal(8) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return false },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[12].gte(1) },
            display() {
                return "<h3>Grass Study III</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/8)\n\
                    Unlock the next grass factor.\n\ \n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [12],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "10px"}
        },
        16: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[14].gte(1) && player.gh.buyables[15].gte(1) },
            display() {
                return "<h3>Factor Study I</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20)\n\
                    Add +" + commaFormat(tmp[this.layer].buyables[this.id].effect, 2) + " to the factor effect base.\n\ \n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [14, 15],
            buy() {
                if (!hasAchievement("achievements", 16)) completeAchievement("achievements", 16)
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "10px"}
        },
        17: {
            costBase() { return new Decimal(1e8) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(200) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(5).pow(2).add(1) },
            unlocked() { return hasMilestone("r", 14) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[13].gte(1) },
            display() {
                return "<h3>Tree Study II</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/200)\n\
                    Boosts leaf gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\ \n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [13],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "10px"}
        },
        18: {
            costBase() { return new Decimal(2e8) },
            costGrowth() { return new Decimal(4) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.005) },
            unlocked() { return hasMilestone("r", 14) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[16].gte(1) && player.gh.buyables[15].gte(1)},
            display() {
                return "<h3>Grass Study IV</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100)\n\
                    Produce " + formatSimple(tmp[this.layer].buyables[this.id].effect.mul(100), 1) + "% of golden grass value per second.\n\ \n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [16, 15],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "10px"}
        },
        19: {
            costBase() { return new Decimal(5e8) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(5) },
            unlocked() { return hasMilestone("r", 14) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[14].gte(1) && player.gh.buyables[18].gte(1)},
            display() {
                return "<h3>Mod Study I</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/1,000)\n\
                    Extends mod softcap by +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + ".\n\ \n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [14, 18],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "10px"}
        },
        21: {
            costBase() { return new Decimal(1e16) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(200) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return hasMilestone("r", 18) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[18].gte(1)},
            display() {
                return "<h3>Check Back Study I</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/200)\n\
                    Multiplies check back xp gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\ \n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [18],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "10px"}
        },
        22: {
            costBase() { return new Decimal(1e19) },
            costGrowth() { return new Decimal(1000) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return hasMilestone("r", 18) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[21].gte(1)},
            display() {
                return "<h3>Check Back Study II</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)\n\
                    Divides xp button cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\ \n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [21],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "10px"}
        },
        23: {
            costBase() { return new Decimal(1e30) },
            costGrowth() { return new Decimal(1e10) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return hasChallenge("ip", 11) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[19].gte(1)},
            display() {
                return "<h3>Antimatter Study I</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/50)\n\
                    Boosts antimatter dimensions by x" + format(tmp[this.layer].buyables[this.id].effect, 1) + ".\n\ \n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [19],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "10px"}
        },
        24: {
            costBase() { return new Decimal(1e40) },
            costGrowth() { return new Decimal(1e15) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1) },
            unlocked() { return hasChallenge("ip", 11) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[23].gte(1)},
            display() {
                return "<h3>Antimatter Study II</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100)\n\
                    Boosts antimatter by x" + formatWhole(tmp[this.layer].buyables[this.id].effect) + ".\n\ \n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [23],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "10px"}
        },
        25: {
            costBase() { return new Decimal("1e5000") },
            costGrowth() { return new Decimal("1e1000") },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.5, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return hasUpgrade("cs", 601) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[18].gte(1) && player.gh.buyables[19].gte(1)},
            display() {
                return "<h3>Pollinator Study I</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/25)\n\
                    Boosts pollinators post softcap by x" + format(tmp[this.layer].buyables[this.id].effect, 1) + ".\n\ \n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [18, 19],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "10px"}
        },
        26: {
            costBase() { return new Decimal("1e10000") },
            costGrowth() { return new Decimal("1e2000") },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return hasUpgrade("cs", 601) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[25].gte(1)},
            display() {
                return "<h3>Pollinator Study II</h3>\n\
                    (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    Raise pollinator gain by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\ \n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [25],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: {width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "10px"}
        },

        //Steel
        31: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(5000) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(7).pow(1.3).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Point Reinforcer"
            },
            display() {
                return "which are multiplying point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: 'grey'}
        },
        32: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.125) },
            purchaseLimit() { return new Decimal(5000) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(1.6).pow(1.2).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Leaf and Tree Reinforcer"
            },
            display() {
                return "which are multiplying leaf and tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: 'grey'}
        },
        33: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(5000) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(4).pow(1.15).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass Reinforcer"
            },
            display() {
                return "which are multiplying grass gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: 'grey'}
        },
        34: {
            costBase() { return new Decimal(350) },
            costGrowth() { return new Decimal(1.175) },
            purchaseLimit() { return new Decimal(5000) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(3).pow(1.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Fertilizer Reinforcer"
            },
            display() {
                return "which are multiplying fertilizer gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: 'grey'}
        },
        35: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(8).pow(1.3).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Antimatter Reinforcer"
            },
            display() {
                return "which are multiplying antimatter gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: 'grey'}
        },
        36: {
            costBase() { return new Decimal(1500) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(3).pow(1.26).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dimension Power Reinforcer"
            },
            display() {
                return "which are multiplying all dimension power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: 'grey'}
        },
        37: {
            costBase() { return new Decimal(2500) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.6).pow(1.05).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Antimatter Dimension Reinforcer"
            },
            display() {
                return "which are multiplying all antimatter dimension production by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: 'grey'}
        },
        38: {
            costBase() { return new Decimal(4000) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.03).pow(0.8).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Infinity Point Reinforcer"
            },
            display() {
                return "which are multiplying infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: 'grey'}
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "15px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["style-column", [
                        ["row", [
                            ["raw-html", "Effects", { "color": "white", "font-size": "30px", "font-family": "monospace" }],
                            ["raw-html", () => {return player.gh.grasshoppers.gte("1e20000") ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "24px", fontFamily: "monospace", paddingLeft: "12px"}],
                        ]],
                        ["blank", "5px"],
                        ["h-line", "450px"],
                        ["blank", "5px"],
                        ["raw-html", function () { return "<h2>Celestial Points: x" + format(getGrasshopperEffect(0)) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<h2>Factor Power: x" +     format(getGrasshopperEffect(1)) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<h2>Prestige Points: x" +  format(getGrasshopperEffect(2)) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<h2>Leaf Gain: x" +        format(getGrasshopperEffect(3)) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<h2>Grass Value: x" +      format(getGrasshopperEffect(4)) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],    
                    ], {width: "500px", height: "210px", backgroundColor: "#074317", border: "3px solid #19e04d", borderRadius: "15px"}],
                ]

            },
            "Studies": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "5px"],
                    ["row", [
                        ["raw-html", () => { return "You have <h3>" + format(player.gh.fertilizer) + "</h3> fertilizer" }, {color: "#EFD4B9", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "(+" + format(getFertilizerPerSecond()) + "/s)"}, {color: "#EFD4B9", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
                        ["raw-html", () => {return getFertilizerEffect().gte("1e15000") ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["raw-html", function () { return "Boosts grass value by x" + format(getFertilizerEffect()) + "." }, {color: "#EFD4B9", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "10px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "10px"],
                    ["style-column", [
                        ["blank", "10px"],
                        ["row", [
                            ["buyable", 11],
                        ]],
                        ["row", [
                            ["buyable", 12],
                            ["blank", ["140px", "140px"]],
                            ["buyable", 13]
                        ]],
                        ["row", [
                            ["buyable", 15],
                            ["style-row", [["buyable", 17]], () => {return tmp.gh.buyables[17].unlocked ? {width: "140px", height: "140px"} : {width: "140px", height: "1px"}}],
                            ["buyable", 14],
                        ]],
                        ["row", [
                            ["buyable", 16],
                        ]],
                        ["row", [
                            ["style-row", [["buyable", 18]], () => {return tmp.gh.buyables[18].unlocked ? {width: "140px", height: "140px"} : {width: "140px", height: "1px"}}],
                            ["style-row", [["buyable", 19]], () => {return tmp.gh.buyables[19].unlocked ? {width: "140px", height: "140px"} : {width: "140px", height: "1px"}}],
                        ]],
                        ["row", [
                            ["style-row", [["buyable", 21]], () => {return tmp.gh.buyables[21].unlocked ? {width: "140px", height: "140px"} : {width: "140px", height: "1px"}}],
                            ["style-row", [["buyable", 25]], () => {return tmp.gh.buyables[25].unlocked ? {width: "140px", height: "140px"} : {width: "140px", height: "1px"}}],
                            ["style-row", [["buyable", 23]], () => {return tmp.gh.buyables[23].unlocked ? {width: "140px", height: "140px"} : {width: "140px", height: "1px"}}],
                        ]],
                        ["row", [
                            ["style-row", [["buyable", 22]], () => {return tmp.gh.buyables[22].unlocked ? {width: "140px", height: "140px"} : {width: "140px", height: "1px"}}],
                            ["style-row", [["buyable", 26]], () => {return tmp.gh.buyables[26].unlocked ? {width: "140px", height: "140px"} : {width: "140px", height: "1px"}}],
                            ["style-row", [["buyable", 24]], () => {return tmp.gh.buyables[24].unlocked ? {width: "140px", height: "140px"} : {width: "140px", height: "1px"}}],
                        ]],
                        ["blank", "10px"],
                    ], {width: "500px", backgroundColor: "rgba(0,0,0,0.3)", border: "3px solid #031d3b", borderRadius: "15px"}],
                ]
            },
            "Steelie": {
                buttonStyle() { return { color: "white", borderColor: "black", backgroundColor: "grey", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("i", 23) },
                content: [
                    ["blank", "25px"],
                    ["row", [
                        ["raw-html", () => {return "You have <h3>" + format(player.gh.steel) + "</h3> steel." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.gh.steelToGet) + ")" }, () => {
                            let look = {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                            player.gh.steelToGet.gte(1) ? look.color = "white" : look.color = "gray"
                            return look
                        }],
                    ]],
                    ["raw-html", () => { return "Boosts grasshopper gain by x" + format(getSteelEffect())}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 12]]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 31], ["ex-buyable", 32], ["ex-buyable", 33], ["ex-buyable", 34],
                        ["ex-buyable", 35], ["ex-buyable", 36], ["ex-buyable", 37], ["ex-buyable", 38]], {maxWidth: "1200px"}],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", () => {return "You have <h3>" + format(player.g.grass) + "</h3> grass"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.gh.grasshoppers) + "</h3> grasshoppers"}, {color: "#19e04d", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.gh.grasshoppersToGet) + ")"}, () => {
                let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                if (player.gh.grasshoppersToGet.gt(1)) {look.color = "#19e04d"} else {look.color = "gray"}
                return look
            }],
        ]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
        ],
    layerShown() { return player.startedGame == true && hasMilestone("r", 12) }
})
