/**
 * Compute the multiplier to grass value. 
 * @returns 
 */
function getGrassValueMultiplier() {
    const factors = [
        getGoldenGrassEffect(),
        getGrasshopperEffect(4),
        getFertilizerEffect(),

        buyableEffect('g', 11),
        buyableEffect('gh', 33),
        buyableEffect('t', 17),
        
        buyableEffect('f', 1),
        buyableEffect('f', 2),
        buyableEffect('f', 3),
        buyableEffect('f', 4),
        buyableEffect('f', 5),
        buyableEffect('f', 6),
        buyableEffect('f', 7),
        buyableEffect('f', 8),
        
        levelableEffect("pet", 104)[0], // GD checkpoint


        hasAchievement("achievements", 11) ? 1.25 : 1,
        hasAchievement("achievements", 14) ? 1.5 : 1,

        hasUpgrade('ad', 14) ? upgradeEffect('ad', 14) : 1,
        hasUpgrade("cs", 201) ? buyableEffect('f', 104) : 1,
        hasUpgrade("cs", 501) ? "1e450" : 1,
        hasUpgrade('g', 11) ? player.p.prestigeEffect2 : 1,
        player.d.boosterEffects[5],
        player.rf.abilityEffects[2],
        player.r.timeCubeEffects[2],
        player.i.preOTFMult,
        player.co.cores.grass.effect[0],
        player.pol.pollinatorEffects.wind.enabled ? player.pol.pollinatorEffects.wind.effects[0] : 1,

        player.pe.pestEffect[4].reciprocate(), // Dividing factor

        // TODO: create hexIsActive() boolean.
        (inChallenge("ip", 13) || player.po.hex || hasUpgrade("s", 18)) ? player.hre.refinementEffect[3][1] : 1,
    ];

    return factors.reduce(Decimal.multiply, 1);
}

/**
 * Compute what power Grass value should be raised to.
 * @returns 
 */
function getGassValuePower() {
    const powers = [
        buyableEffect('st', 101),
        buyableEffect("cof", 14),

        hasUpgrade("hpw", 1031) ? 1.18 : 1
    ];

    return powers.reduce(Decimal.multiply, 1);
}

/**
 * Compute what the value of a single cut grass square should be.
 * @returns 
 */
function getGrassValue() {
    // TODO: handle za warldo (time reversal) functionally?
    if (player.r.timeReversed) return new Decimal(0);

    let value = getGrassValueMultiplier().pow(getGassValuePower());


    if (player.po.halter.grass.enabled == 1) return value.div(player.po.halter.grass.halt);
    if (player.po.halter.grass.enabled == 2) return value.min(player.po.halter.grass.halt);
    return value;
}

/**
 * Perform per-tick updates to total grass amount.
 * @param {*} delta Amount of time that's passed in seconds.
 */
function updateGrassGain(delta) {
    
    const valueAddends = [
        buyableEffect('gh', 11),
        hasUpgrade('rf', 12) ? 0.2 : 0,
        hasMilestone('ip', 13) && !inChallenge('ip', 14) ? 0.05 : 0,
    ]
    
    const valueGainPerSecond = valueAddends.reduce(Decimal.add, 0);
    const grassValue = getGrassValue();

    player.g.grass = player.g.grass.plus(grassValue.times(valueGainPerSecond).times(delta));
}

/**
 * Compute the effect of grass on leaf gain. 
 * @returns 
 */
function getGrassEffectOnLeaves() {
    const effect = player.g.grass.times(0.3).pow(0.7).plus(1);

    const softcapStart = new Decimal("1e25000");
    const softcapPower = Decimal.add(0.1, player.cs.scraps.grass.effect);
    if (effect.gte(softcapStart)) return effect.dividedBy(softcapStart).pow(softcapPower).times(softcapStart);

    return effect;
}

/**
 * Compute the effect of grass on tree gain. 
 * @returns 
 */
function getGrassEffectOnTrees() {
    const effect = player.g.grass.times(0.3).dividedBy(7).plus(1);

    const softcapStart = new Decimal("1e10000");
    const softcapPower = Decimal.add(0.1, player.cs.scraps.grass.effect);
    if (effect.gte(softcapStart)) return effect.dividedBy(softcapStart).pow(softcapPower).times(softcapStart);

    return effect;
}

/**
 * Compute the effect, if any, of grass on CelPoints gain.
 * @returns 
 */
function getGrassEffectOnPoints() {
    if (!hasMilestone("r", 13)) return new Decimal(1);
    return getGrassEffectOnTrees();
}

/**
 * Compute how often a grass grows. 
 * @returns 
 */
function getGrassInterval() {
    const timeDivisors = [
        buyableEffect('g', 12),
        levelableEffect("pet", 303)[1],
        hasAchievement("achievements", 9) ? 1.1 : 1,
    ];

    const totalDivisor = timeDivisors.reduce(Decimal.multiply, 1);
    const baseSpeed = new Decimal(4);
    return baseSpeed.div(totalDivisor).max(0.25);
}

/**
 * Compute the maximum amount of grass that can grow on a single square.
 * @returns 
 */
function getGrassCellCap() {
    const addends = [
        5,
        buyableEffect('g', 13),

        hasUpgrade('g', 18) ? 5 : 0,
        hasUpgrade('g', 19) ? upgradeEffect('g', 19) : 0,
    ];

    const cap = addends.reduce(Decimal.add, 0);

    if (hasUpgrade("cs", 501)) {
        return cap.div(2).floor();
    }
    return cap;
}

function tickGrassTimer(delta) {
    if (!hasUpgrade("i", 17)) return;
    player.g.grassTimer = player.g.grassTimer.minus(delta);

    while (player.g.grassTimer.lt(0)) {
        player.g.grassTimer = player.g.grassTimer.plus(player.g.grassReq);
        let row = getRandomInt(5) + 1
        let column = getRandomInt(8) + 1
        let val = row + "0" + column;
        if (getGridData("g", val)[0] == 0) {
            setGridData("g", val, [1, new Decimal(1), new Decimal(1)])
        } else if (getGridData("g", val)[0] == 1 && getGridData("g", val)[1].lt(player.g.grassCap)) {
            setGridData("g", val, [1, getGridData("g", val)[1].add(1), new Decimal(1)])
        }
    }

    updateGrassGain(delta);
}


/**
 * Compute all multipliers to golden grass value. 
 * @returns 
 */
function getGoldenGrassValueMultiplier() {
    const factors = [
        buyableEffect('g', 17),
        buyableEffect('r', 11),
        buyableEffect('m', 13),
        buyableEffect('st', 103),
        buyableEffect('t', 18),

        levelableEffect("pet", 104)[1],
        levelableEffect("pet", 305)[1],

        levelableEffect("pu", 108)[2],

        getMoonstoneEffect(),
        player.co.cores.grass.effect[1],
        player.cof.coreFragmentEffects[1],
        player.ro.activatedFuelEffect,

        player.ma.matosDefeated ? 1e20 : 1,
        player.pol.pollinatorEffects.wind.enabled ? player.pol.pollinatorEffects.wind.effects[1] : 1,
        hasUpgrade('ip', 24) && !inChallenge('ip', 14) ? upgradeEffect('ip', 24) : 1,
    ];

    return factors.reduce(Decimal.multiply, 1);
}

/**
 * Compute what power golden grass value is raised to. 
 * @returns 
 */
function getGoldenGrassValuePower() {
    return hasUpgrade("hpw", 1032) ? 1.06 : 1;
}

/**
 * Compute the value of a single cell of golden grass. 
 * @returns 
 */
function getGoldenGrassValue() {
    // TODO: handle za warldo (time reversal) functionally?
    if (player.r.timeReversed) return new Decimal(0);

    let value = getGoldenGrassValueMultiplier().pow(getGoldenGrassValuePower());

    if (player.po.halter.goldenGrass.enabled == 1) return value.div(player.po.halter.goldenGrass.halt);
    if (player.po.halter.goldenGrass.enabled == 2) return value.min(player.po.halter.goldenGrass.halt);
    return value;
}

/**
 * Handle golden grass automatic gain for this tick. 
 * @param {*} delta The amount of time since the last tick in seconds.
 */
function updateGoldenGrassGain(delta) {
    const gainPerSecond = buyableEffect('gh', 18);
    const goldValue = getGoldenGrassValue();

    player.g.goldGrass = player.g.goldGrass.plus(goldValue.times(gainPerSecond).times(delta));
}

/**
 * Get the effect of golden grass on normal grass value.
 * @returns 
 */
function getGoldenGrassEffect() {
    const baseEffect = player.g.goldGrass.pow(1.05).times(0.15).plus(1);

    const powers = [
        hasUpgrade('g', 22) ? 6 : 1,
        hasUpgrade("cs", 502) ? 2 : 1,
    ]

    const totalPower = powers.reduce(Decimal.multiply, 1);

    return baseEffect.pow(totalPower);
}

/**
 * Compute how often a golden grass tile spawns. 
 * @returns 
 */
function getGoldenGrassInterval() {
    const divisors = [
        buyableEffect('gh', 12),
        levelableEffect("pet", 303)[1],

        hasAchievement("achievements", 12) ? 1.1 : 1,
        hasUpgrade('g', 16) ? 1.3 : 1,
    ];

    const totalDivisor = divisors.reduce(Decimal.multiply, 1);

    const baseTime = new Decimal(20);

    const reducedTime = baseTime.div(totalDivisor);

    return reducedTime.max(0.25);
}

/**
 * Compute how much golden grass can appear on a single cell. 
 * @returns 
 */
function getGoldenGrassCellCap() {
    const addends = [
        3,
        buyableEffect('g', 18),
        hasUpgrade('g', 18) ? 3 : 0,
    ];

    return addends.reduce(Decimal.add, 0);
}

/**
 * Tick the golden grass spawn timer, and update grass. 
 * @param {*} delta 
 */
function tickGoldenGrassTimer(delta) {
    if (!hasUpgrade("g", 13)) return;
    player.g.goldGrassTimer = player.g.goldGrassTimer.minus(delta)
    while (player.g.goldGrassTimer.lt(0)) {
        player.g.goldGrassTimer = player.g.goldGrassTimer.plus(player.g.goldGrassReq);
        let row = getRandomInt(5) + 1
        let column = getRandomInt(8) + 1
        let val = row + "0" + column
        if (getGridData("g", val)[0] < 2) {
            setGridData("g", val, [2, new Decimal(1), new Decimal(1)])
        } else if (getGridData("g", val)[0] == 2 && getGridData("g", val)[1].lt(player.g.goldGrassCap)) {
            setGridData("g", val, [2, getGridData("g", val)[1].add(1), new Decimal(1)])
        }
    }
    updateGoldenGrassGain(delta);
}


/**
 * Compute all multipliers to Moonstone gain. 
 * @returns 
 */
function getMoonstoneValueMultiplier() {
    const factors = [
        buyableEffect("al", 204),
        buyableEffect('g', 21),

        levelableEffect("pet", 1104)[0],
        levelableEffect("pu", 205)[1],

        getMoonstoneLevelEffect(2),
        player.co.cores.grass.effect[2],
        player.ro.rocketPartsEffect,

        optionalUpgradeEffect("ep2", 7).orElse(1),
        hasUpgrade('ev8', 17) ? 2 : 1,
        hasMilestone("r", 28) ? player.r.pentMilestone18Effect : 1,
        player.ma.matosDefeated ? 5 : 1,
    ];

    return factors.reduce(Decimal.multiply, 1);
}

/**
 * Compute the value of a single moonstone cell. 
 * @returns 
 */
function getMoonstoneValue() {
    // May include power in the future...?
    return getMoonstoneValueMultiplier();
}

/**
 * Compute how often a moonstone spawns. 
 * @returns 
 */
function getMoonstoneInterval() {
    const divisors = [
        buyableEffect('g', 24),
        getMoonstoneLevelEffect(1),
        levelableEffect("pet", 303)[1],
    ];

    const totalDivisor = divisors.reduce(Decimal.multiply, 1);

    const initialTime = new Decimal(40);
    const dividedTime = initialTime.dividedBy(totalDivisor);

    return dividedTime.max(0.25);
}

/**
 * Compute the effect of moonstone on Golden grass gain. 
 * @returns 
 */
function getMoonstoneEffect() {
    return player.g.moonstone.mul(4).pow(1.5).add(1);
}

/**
 * Compute the maximum level that spawned moonstone can be set to.
 * @returns 
 */
function getMoonstoneMaxLevel() {
    return buyableEffect('g', 29);
}

/**
 * Compute the max health of moonstone.
 * Newly spawned moonstone will have this much health. 
 * It's expected that all moonstone have less than this health.
 * @returns 
 */
function getMoonstoneMaxHealth() {
    const factor = getMoonstoneLevelEffect(0);
    return new Decimal(100).times(factor);
}

/**
 * Determine the effect of the moonstone level on moonstone mechanics.
 * @param {0|1|2} effectNumber 
 *      0 = Health
 *      1 = Spawn time multiplier (represented as a 1/mult "divisor")
 *      2 = Moonstone value on collect
 * @returns 
 */
function getMoonstoneLevelEffect(effectNumber) {
    switch (effectNumber) {
        case 0:
            // Health
            return player.g.moonstoneLevel.pow(1.5);
        case 1:
            // Spawn time
            return player.g.moonstoneLevel.pow(-0.2);
        case 2:
            // Value
            if (hasUpgrade("cs", 503)) {
                return player.g.moonstoneLevel.minus(1).pow_base(1.2).mul(player.g.moonstoneLevel)
            } 
            return player.g.moonstoneLevel.pow(1.2);
    }
}

/**
 * Compute the maximum amount of moonstone that can exist on a cell.
 * @returns 
 */
function getMoonstoneCellCap() {
    return levelableEffect("pet", 1303)[0];
}

/**
 * Compute the amount of damage done to a moonstone when interacting with it.
 * @returns 
 */
function getMoonstoneDamage() {
    const factors = [
        20, // Base
        buyableEffect('g', 22),
        hasUpgrade('ev8', 18) ? 2 : 1,
    ];

    return factors.reduce(Decimal.multiply, 1);
}

/**
 * Perform per-tick updates to total moonstone amount.
 * @param {*} delta Amount of time that's passed in seconds.
 */
function updateMoonstoneGain(delta) {
    if (!hasMilestone("r", 29)) return;

    const gainPerSecond = new Decimal(0.01);


    player.g.moonstone = player.g.moonstone.plus(player.g.moonstoneVal.times(gainPerSecond).times(delta))
}

/**
 * Update the moonstone timer.
 * @param {*} delta Amount of time that's passed in seconds.
 */
function tickMoonstoneTimer(delta) {
    if (!player.ev.evolutionsUnlocked[7]) return;

    player.g.moonstoneTimer = player.g.moonstoneTimer.sub(delta);

    while (player.g.moonstoneTimer.lt(0)) {
        player.g.moonstoneTimer = player.g.moonstoneTimer.plus(player.g.moonstoneReq);
        let row = getRandomInt(5) + 1
        let column = getRandomInt(8) + 1
        let val = row + "0" + column
        if (getGridData("g", val)[0] < 3) {
            setGridData("g", val, [3, new Decimal(1), getMoonstoneMaxHealth()])
        } else if (getGridData("g", val)[0] == 3 && getGridData("g", val)[1].lt(getMoonstoneCellCap())) {
            setGridData("g", val, [3, getGridData("g", val)[1].add(1), getGridData("g", val)[2]])
        }
    }
    updateMoonstoneGain(delta);
}

addLayer('g', {
    name: 'Grass', // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: 'G', // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U1",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        grass: new Decimal(0),
        grassCap: new Decimal(100),
        grassVal: new Decimal(1),
        grassReq: new Decimal(4), // Seconds per spawn
        grassTimer: new Decimal(0),

        goldGrass: new Decimal(0),
        goldGrassCap: new Decimal(15),
        goldGrassVal: new Decimal(1),
        goldGrassReq: new Decimal(40), // Seconds per spawn
        goldGrassTimer: new Decimal(0),

        moonstone: new Decimal(0),
        moonstoneCap: new Decimal(6),
        moonstoneVal: new Decimal(1),
        moonstoneReq: new Decimal(10), // Seconds per spawn
        moonstoneTimer: new Decimal(0),

        moonstoneMaxHealth: new Decimal(100),
        moonstoneDamage: new Decimal(20),
        moonstoneLevel: new Decimal(1),
    }},
    automate() {
        
        if (hasMilestone('r', 13)) {
            for (let buyableId = 11; buyableId <= 19; buyableId++) {
                buyBuyable("g", buyableId);
            }
        }
        if (hasMilestone('r', 15) && player.g.auto == true) {
            for (let upgradeId = 11; upgradeId <= 21; upgradeId++) {
                buyUpgrade("g", upgradeId);
            }
        }
    },
    tooltip: 'Grass',
    color: '#119B35',
    branches: ['t'],
    update(delta) {
        // Grass
        player.g.grassVal = getGrassValue();
        player.g.grassReq = getGrassInterval();
        player.g.grassCap = getGrassCellCap();
        tickGrassTimer(delta);

        // Golden Grass
        player.g.goldGrassVal = getGoldenGrassValue();
        player.g.goldGrassReq = getGoldenGrassInterval();
        player.g.goldGrassCap = getGoldenGrassCellCap();
        tickGoldenGrassTimer(delta);

        // Moonstone
        player.g.moonstoneVal = getMoonstoneValue();
        player.g.moonstoneReq = getMoonstoneInterval();
        player.g.moonstoneCap = getMoonstoneCellCap();
        
        player.g.moonstoneMaxHealth = getMoonstoneMaxHealth();
        player.g.moonstoneDamage = getMoonstoneDamage();
        tickMoonstoneTimer(delta);
    },
    grid: {
        rows: 5,
        cols: 8,
        getStartData(id) {
            return [0, new Decimal(0), new Decimal(1)] // Type / Mult / Health
        },
        getTitle(data, id) {
            switch (getGridData("g", id)[0]) {
                case 0:
                    return ""
                case 1:
                    return "x" + formatSimple(getGridData("g", id)[1])
                case 2:
                    return "x" + formatSimple(getGridData("g", id)[1])
                case 3:
                    return "x" + formatSimple(getGridData("g", id)[1]) + "<br><span style='font-size:10px'>HP:<br>" + formatShorterWhole(getGridData("g", id)[2]) + "/<br>" + formatShorterWhole(getMoonstoneMaxHealth())
                default:
                    return ""
            }
        },
        getCanClick(data, id) {return false},
        onHover(data, id) {
            switch (getGridData("g", id)[0]) {
                case 1:
                    player.g.grass = player.g.grass.add(player.g.grassVal.mul(getGridData("g", id)[1]))
                    setGridData("g", id, [0, new Decimal(0), new Decimal(1)])
                    break;
                case 2:
                    player.g.grass = player.g.grass.add(player.g.grassVal.mul(player.g.grassCap))
                    player.g.goldGrass = player.g.goldGrass.add(player.g.goldGrassVal.mul(getGridData("g", id)[1]))
                    setGridData("g", id, [0, new Decimal(0), new Decimal(1)])
                    break;
                case 3:
                    setGridData("g", id, [3, getGridData("g", id)[1], getGridData("g", id)[2].sub(player.g.moonstoneDamage)])
                    if (getGridData("g", id)[2].lte(0)) {
                        player.g.grass = player.g.grass.add(player.g.grassVal.mul(player.g.grassCap).mul(buyableEffect("g", 23)))
                        player.g.goldGrass = player.g.goldGrass.add(player.g.goldGrassVal.mul(player.g.goldGrassCap).mul(buyableEffect("g", 23)))
                        player.g.moonstone = player.g.moonstone.add(player.g.moonstoneVal.mul(getGridData("g", id)[1]))
                        setGridData("g", id, [0, new Decimal(0), new Decimal(1)])
                    }
                    break;
            }
        },
        getStyle(data, id) {
            let look = {width: "80px", height: "80px", lineHeight: "0.8", color: "black", backgroundColor: "#074317", border: "5px solid rgba(0,0,0,0.3)", borderRadius: "0", padding: "0", margin: "0", cursor: "default"}
            switch (getGridData("g", id)[0]) {
                case 0:
                    look.background = "#074317"
                    break;
                case 1:
                    look.background = "#18e34e"
                    break;
                case 2:
                    look.background = "#ffcf40"
                    break;
                case 3:
                    look.background = "#047ce4"
                    break;
            }
            return look
        }
    },
    clickables: {
        6: {
            title() { return '<h3>Lower Level' },
            canClick() { return player.g.moonstoneLevel.gt(1) },
            unlocked() { return true },
            onClick() {
                player.g.moonstoneLevel = player.g.moonstoneLevel.sub(1)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "125px", minHeight: "60px", borderRadius: "0px 0px 0px 10px"}
                this.canClick() ? look.backgroundColor = "#047ce4" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        7: {
            title() { return '<h3>Increase Level' },
            canClick() { return player.g.moonstoneLevel.lt(getMoonstoneMaxLevel()) },
            unlocked() { return true },
            onClick() {
                player.g.moonstoneLevel = player.g.moonstoneLevel.add(1)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "125px", minHeight: "60px", borderRadius: "0px 0px 10px 0px"}
                this.canClick() ? look.backgroundColor = "#047ce4" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
    },
    bars: {
        grass: {
            unlocked: true,
            direction: RIGHT,
            width: 640,
            height: 20,
            progress() {
                if (player.g.grassReq.lte(0.25)) return new Decimal(1)
                return player.g.grassTimer.div(player.g.grassReq)
            },
            baseStyle: {backgroundColor: "black"},
            fillStyle: {backgroundColor: "#0c7127"},
            borderStyle: {
                border: "0px",
                borderRadius: "0",
            },
            display() {
                if (player.g.grassReq.lte(0.25)) return "<small style='color:red'>TIMER HARDCAPPED</small>"
                return formatTime(player.g.grassTimer) + "/" + formatTime(player.g.grassReq)
            },
        },
        goldGrass: {
            unlocked() {return hasUpgrade("g", 13)},
            direction: RIGHT,
            width: 640,
            height: 20,
            progress() {
                if (player.g.goldGrassReq.lte(0.25)) return new Decimal(1)
                return player.g.goldGrassTimer.div(player.g.goldGrassReq)
            },
            baseStyle: {backgroundColor: "black"},
            fillStyle: {backgroundColor: "#7f6720"},
            borderStyle: {
                border: "0px",
                borderRadius: "0",
            },
            display() {
                if (player.g.goldGrassReq.lte(0.25)) return "<small style='color:red'>TIMER HARDCAPPED</small>"
                return formatTime(player.g.goldGrassTimer) + "/" + formatTime(player.g.goldGrassReq)
            },
        },
        moonstone: {
            unlocked() {return player.ev.evolutionsUnlocked[7]},
            direction: RIGHT,
            width: 640,
            height: 20,
            progress() {
                if (player.g.moonstoneReq.lte(0.25)) return new Decimal(1)
                return player.g.moonstoneTimer.div(player.g.moonstoneReq)
            },
            baseStyle: {backgroundColor: "black"},
            fillStyle: {backgroundColor: "#023e72"},
            borderStyle: {
                border: "0px",
                borderRadius: "0",
            },
            display() {
                if (player.g.moonstoneReq.lte(0.25)) return "<small style='color:red'>TIMER HARDCAPPED</small>"
                return formatTime(player.g.moonstoneTimer) + "/" + formatTime(player.g.moonstoneReq)
            },
        },
    },
    upgrades: {
        11: {
            title: 'Grass Upgrade I',
            unlocked() { return hasMilestone('r', 11) },
            description() { return 'Unlock a second prestige effect that buffs grass value.' },
            cost: new Decimal(250),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        12: {
            title: 'Grass Upgrade II',
            unlocked() { return hasMilestone('r', 11) },
            description() { return 'Unlock a second grass effect that buffs tree gain.' },
            cost: new Decimal(400),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        13: {
            title: 'Grass Upgrade III',
            unlocked() { return hasMilestone('r', 11) },
            description() { return 'Unlocks Golden Grass.' },
            onPurchase() {
                if (!hasAchievement("achievements", 11)) completeAchievement("achievements", 11)
            },
            cost: new Decimal(800),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        14: {
            title: 'Grass Upgrade IV',
            unlocked() { return hasMilestone('r', 11) && hasUpgrade('g', 13) },
            description() { return 'Unlocks golden grass buyables.' },
            cost: new Decimal(1500),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        15: {
            title: 'Grass Upgrade V',
            unlocked() { return hasMilestone('r', 11) && hasUpgrade('g', 13) },
            description() { return 'Unlocks more tree buyables.' },
            cost: new Decimal(3000),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        16: {
            title: 'Grass Upgrade VI',
            unlocked() { return hasMilestone('r', 11) && hasUpgrade('g', 13) },
            description() { return 'Divides golden grass spawn time by /1.3.' },
            cost: new Decimal(4500),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        17: {
            title: 'Grass Upgrade VII',
            unlocked() { return hasMilestone('r', 11) && hasMilestone('r', 12) },
            description() { return 'Unlocks tree factor V.' },
            cost: new Decimal(7777),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        18: {
            title: 'Grass Upgrade VIII',
            unlocked() { return hasMilestone('r', 11) && hasMilestone('r', 14) },
            description() { return 'Increases grass mult capacity by +5 and golden grass by +3.' },
            cost: new Decimal(1e7),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        19: {
            title: 'Grass Upgrade IX',
            unlocked() { return hasMilestone('r', 11) && hasMilestone('r', 14) },
            description() { return 'Increases grass mult capacity based on pent.' },
            cost: new Decimal(1e9),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
            effect() {
                return player.r.pent.add(1).log(2).floor()
            },
            effectDisplay() { return '+'+formatWhole(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        21: {
            title: 'Grass Upgrade X',
            unlocked() { return hasMilestone('r', 11) && hasMilestone('r', 17) },
            description() { return 'Boosts mod gain based on check back level.' },
            cost: new Decimal(1e25),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
            effect() {
                return player.cb.level.pow(0.8).add(1)
            },
            effectDisplay() { return 'x'+formatWhole(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        23: {
            title: "Grass Upgrade XI",
            unlocked() { return hasMilestone('r', 11) && hasUpgrade("i", 22) },
            description() { return "Boost pollinator gain based on golden grass." },
            cost: new Decimal("1e250"),
            currencyLocation() { return player.g },
            currencyDisplayName: "Grass",
            currencyInternalName: "grass",
            effect() {
                return player.g.goldGrass.add(1).log(10).pow(0.3).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        22: {
            title: "Grass Upgrade XII",
            unlocked() { return hasMilestone('r', 11) && (player.hrm.realmCompletions.gt(0) || player.g.grass.gte("1e1000") || hasUpgrade("g", 22)) },
            description() { return "Raise golden grass effect by ^6." },
            cost: new Decimal("1e1200"),
            currencyLocation() { return player.g },
            currencyDisplayName: "Grass",
            currencyInternalName: "grass",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Grass Value'
            },
            display() {
                return 'which are boosting grass value by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Grass'
            },
            buy(mult) {
                if (!hasAchievement("achievements", 9)) completeAchievement("achievements", 9)
                if (mult != true && !hasMilestone("r", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(200) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Grass Grow Rate'
            },
            display() {
                return 'which are dividing grass time requirement by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Grass'
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).min(5) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Grass Mult Capacity'
            },
            display() {
                return 'which are increasing grass mult capacity by +' + formatWhole(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Grass'
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.22) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(3).pow(1.25).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Grass Celestial Point Boost'
            },
            display() {
                return 'which are boosting celestial point gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Grass'
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        15: {
            costBase() { return new Decimal(35) },
            costGrowth() { return new Decimal(1.34) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(2).pow(1.15).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Grass Factor Power Boost'
            },
            display() {
                return 'which are boosting factor power gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Grass'
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        16: {
            costBase() { return new Decimal(60) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Grass Prestige Point Boost'
            },
            display() {
                return 'which are boosting prestige point gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Grass'
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        17: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.g.goldGrass},
            pay(amt) { player.g.goldGrass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return hasUpgrade('g', 14) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Golden Grass Value'
            },
            display() {
                return 'which are boosting golden grass value by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Golden Grass'
            },
            buy(mult) {
                if (!hasAchievement("achievements", 12)) completeAchievement("achievements", 12)
                if (mult != true && !hasMilestone("r", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#ffcf40"}
        },
        18: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(6) },
            currency() { return player.g.goldGrass},
            pay(amt) { player.g.goldGrass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).min(6) },
            unlocked() { return hasUpgrade('g', 14) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Golden Grass Mult Capacity'
            },
            display() {
                return 'which are increasing golden grass mult capacity by +' + formatWhole(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Golden Grass'
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#ffcf40"}
        },
        19: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1.7) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.g.goldGrass},
            pay(amt) { player.g.goldGrass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(3).add(1) },
            unlocked() { return hasUpgrade('g', 14) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Pent Requirement Divider'
            },
            display() {
                return 'which are dividing pent requirement by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Golden Grass'
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#ffcf40"}
        },
        21: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.g.moonstone},
            pay(amt) { player.g.moonstone = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Moonstone Value'
            },
            display() {
                return 'which are boosting moonstone value by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Moonstone'
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
            style: { width: '250px', height: '150px', backgroundColor: '#047ce4'}
        },
        22: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.g.moonstone},
            pay(amt) { player.g.moonstone = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Moonstone Damage'
            },
            display() {
                return 'which are boosting damage dealt to moonstone by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Moonstone'
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
            style: { width: '250px', height: '150px', backgroundColor: '#047ce4'}
        },
        23: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.g.moonstone},
            pay(amt) { player.g.moonstone = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Moonstone Previous Gain'
            },
            display() {
                return 'which are multiplying grass and golden grass gain from moonstone by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Moonstone'
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
            style: { width: '250px', height: '150px', backgroundColor: '#047ce4'}
        },
        24: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.g.moonstone},
            pay(amt) { player.g.moonstone = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).pow(0.6).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Moonstone Spawn Time'
            },
            display() {
                return 'which are dividing moonstone spawn time by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Moonstone'
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
            style: { width: '250px', height: '150px', backgroundColor: '#047ce4'}
        },
        25: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.g.moonstone},
            pay(amt) { player.g.moonstone = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).pow(0.9).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Check Back XP Lunar Boost'
            },
            display() {
                return 'which are boosting check back xp gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Moonstone'
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
            style: { width: '250px', height: '150px', backgroundColor: '#047ce4'}
        },
        26: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.g.moonstone},
            pay(amt) { player.g.moonstone = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.04).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Replicanti Lunar Boost'
            },
            display() {
                return 'which are boosting replicanti mult by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Moonstone'
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
            style: { width: '250px', height: '150px', backgroundColor: '#047ce4'}
        },
        27: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.g.moonstone},
            pay(amt) { player.g.moonstone = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2).mul(1.2).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Cursed Lunar Boost'
            },
            display() {
                return 'which are boosting curses by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Moonstone'
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
            style: { width: '250px', height: '150px', backgroundColor: '#047ce4'}
        },
        28: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.g.moonstone},
            pay(amt) { player.g.moonstone = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(22).pow(2).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Challenge Dice Lunar Boost'
            },
            display() {
                return 'which boosting challenge dice points by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Moonstone'
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
            style: { width: '250px', height: '150px', backgroundColor: '#047ce4'}
        },
        29: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(24) },
            currency() { return player.g.moonstone},
            pay(amt) { player.g.moonstone = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Increase Max Level'
            },
            display() {
                return 'Current max level: ' + formatWhole(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Moonstone'
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
            style: { width: '250px', height: '150px', backgroundColor: '#047ce4'}
        },
    },
    microtabs: {
        stuff: {
            'Grass': {
                buttonStyle: { color: "white", borderRadius: "5px" },
                unlocked: true,
                content: [
                    ['blank', '10px'],
                    ["style-column", [
                        ["bar", "grass"],
                        ["bar", "goldGrass"],
                        ["bar", "moonstone"],
                        ["style-row", [], {width: "640px", height: "5px", background: "#3e3117"}],
                        "grid"
                    ], {width: "640px", border: "5px solid #3e3117"}],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", () => {return "Grass Mult Cap: " + formatWhole(player.g.grassCap)}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                        ], () => {
                            let look = {width: "640px", height: "40px", background: "#042d0f"}
                            if (hasUpgrade("g", 13) && player.ev.evolutionsUnlocked[7]) {look.width = "210px"} else if (hasUpgrade("g", 13) || player.ev.evolutionsUnlocked[7]) {look.width = "315px"}
                            return look
                        }],
                        ["style-column", [
                            ["raw-html", () => {return "Gold Grass Mult Cap: " + formatWhole(player.g.goldGrassCap)}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                        ], () => {
                            if (!hasUpgrade("g", 13)) return {display: "none !important"}
                            let look = {width: "210px", height: "40px", background: "#2e250c", borderLeft: "5px solid #3e3117"}
                            if (!player.ev.evolutionsUnlocked[7]) look.width = "320px"
                            return look
                        }],
                        ["style-column", [
                            ["raw-html", () => {return "Moonstone Mult Cap: " + formatWhole(getMoonstoneCellCap())}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                            ["raw-html", () => {return "Moonstone Damage: " + formatSimple(player.g.moonstoneDamage)}, {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                        ], () => {
                            if (!player.ev.evolutionsUnlocked[7]) return {display: "none !important"}
                            let look = {width: "210px", height: "40px", background: "#00182d", borderLeft: "5px solid #3e3117"}
                            if (!hasUpgrade("g", 13)) look.width = "320px"
                            return look
                        }],
                    ], {width: "640px", height: "40px", borderLeft: "5px solid #3e3117", borderRight: "5px solid #3e3117", borderBottom: "5px solid #3e3117"}]
                ],
            },
            'Moonstone Buyables': {
                buttonStyle: { color: '#047ce4', borderColor: '#0490f4', borderRadius: "5px" },
                unlocked() {return player.ev.evolutionsUnlocked[7]},
                content: [
                    ['blank', '25px'],
                    ['style-row', [['ex-buyable', 21], ['ex-buyable', 22], ['ex-buyable', 23], ['ex-buyable', 24],
                        ['ex-buyable', 25], ['ex-buyable', 26], ['ex-buyable', 27], ['ex-buyable', 28]], {maxWidth: "1200px"}],
                    ['blank', '25px'],
                    ['ex-buyable', 29],
                    ['row', [['clickable', 6], ['clickable', 7]]],
                    ['blank', '10px'],
                    ['raw-html', () => '<h3>Level: ' + formatWhole(player.g.moonstoneLevel) + '/' + formatWhole(getMoonstoneMaxLevel()),
                        { color: 'white', fontSize: '24px', fontFamily: 'monospace' }],
                    ['blank', '10px'],
                    ['raw-html', () => '<h3>Level Effects:',
                        { color: 'white', fontSize: '24px', fontFamily: 'monospace' }],
                    ['raw-html', () => '<h4>x' + format(getMoonstoneLevelEffect(0)) + ' to moonstone health.',
                        { color: 'white', fontSize: '24px', fontFamily: 'monospace' }],
                    ['raw-html', () => '<h4>x' + format(getMoonstoneLevelEffect(1)) + ' to moonstone spawn time.',
                        { color: 'white', fontSize: '24px', fontFamily: 'monospace' }],
                    ['raw-html', () => '<h4>x' + format(getMoonstoneLevelEffect(2)) + ' to moonstone value.',
                        { color: 'white', fontSize: '24px', fontFamily: 'monospace' }],
                ],
            },
            'Buyables': {
                buttonStyle: { color: "white", borderRadius: "5px" },
                unlocked: true,
                content: [
                    ['blank', '25px'],
                    ['style-row', [['ex-buyable', 11], ['ex-buyable', 12], ['ex-buyable', 13],
                        ['ex-buyable', 14], ['ex-buyable', 15], ['ex-buyable', 16]], {maxWidth: "900px"}],
                    ['blank', '25px'],
                    ['style-row', [['ex-buyable', 17], ['ex-buyable', 18], ['ex-buyable', 19]], {maxWidth: "900px"}],
                ],
            },
            'Upgrades': {
                buttonStyle: { color: "white", borderRadius: "5px" },
                unlocked: () => hasMilestone('r', 11),
                content: [
                    ['blank', '25px'],
                    ['style-row', [['upgrade', 11], ['upgrade', 12], ['upgrade', 13], ['upgrade', 14], ['upgrade', 15], ['upgrade', 16],
                        ['upgrade', 17], ['upgrade', 18], ['upgrade', 19], ['upgrade', 21], ['upgrade', 23], ['upgrade', 22]], {maxWidth: "800px"}],
                ],
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have " + format(player.g.grass) + " grass"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.g.grassVal) + " GV)"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["row", [
            ["raw-html", () => {return "Boosts leaf gain by x" + format(getGrassEffectOnLeaves())}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
            ['raw-html', () => {return getGrassEffectOnLeaves().gte("1e25000") ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "16px", fontFamily: "monospace", marginLeft: "10px"}]
        ]],
        ["style-row", [
            ["raw-html", () => {return hasMilestone("r", 13) ? "Boosts tree and celestial point gain by x" + format(getGrassEffectOnTrees()) : hasUpgrade("g", 12) ? "Boosts tree gain by x" + format(getGrassEffectOnTrees()) : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
            ['raw-html', () => {return getGrassEffectOnTrees().gte("1e10000") ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "16px", fontFamily: "monospace", marginLeft: "10px"}],
        ], () => {return hasUpgrade("g", 12) ? {marginBottom: "10px"} : {display: "none !important"}}],
        ["row", [
            ["raw-html", () => {return "You have " + format(player.g.goldGrass) + " golden grass"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.g.goldGrassVal) + " GGV)"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
        ], () => {return hasUpgrade("g", 13) ? {} : {display: "none !important"}}],
        ["raw-html", () => {return hasUpgrade('g', 13) ? "Boosts grass value by x" + format(getGoldenGrassEffect()) : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["style-row", [], () => {return hasUpgrade("g", 13) ? {width: "10px", height: "10px"} : {display: "none !important"}}],
        ["row", [
            ["raw-html", () => {return player.ev.evolutionsUnlocked[7] ? "You have " + format(player.g.moonstone) + " moonstone" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace", userSelect: "none"}],
            ["raw-html", () => {return player.ev.evolutionsUnlocked[7] ? "(+" + format(player.g.moonstoneVal) + " MV)" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace", userSelect: "none", marginLeft: "10px"}],
        ], () => {return player.ev.evolutionsUnlocked[7] ? {} : {display: "none !important"}}],
        ["raw-html", () => {return player.ev.evolutionsUnlocked[7] ? "Boosts golden grass value by x" + format(getMoonstoneEffect()) : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace", userSelect: "none"}],
        ["style-row", [], () => {return player.ev.evolutionsUnlocked[7] ? {width: "10px", height: "10px"} : {display: "none !important"}}],
        ['microtabs', 'stuff', { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() {return player.startedGame && hasUpgrade('i', 17)},
})