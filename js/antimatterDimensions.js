/**
 * Compute antimatter gain per second, based on multipliers, powers,
 * and softcaps.
 * @returns How much Antimatter the player gains each second, assuming nothing
 *          changes. 
 */
function getAntimatterPerSecond() {
    let antimatterGain = player.ad.dimensionAmounts[0];
    antimatterGain = antimatterGain.times(getAntimatterMultipliersBeforeSoftcap());

    if (antimatterGain.gte(1e300)) {
        // The "softcap" asymptotically becomes a hardcap at 10^(300 + base). 
        const hardcapBase = getAntimatterHardcap();
        let asymptoteExponent = antimatterGain.plus(1).log10().div(hardcapBase).recip().min(0.95);

        antimatterGain = antimatterGain.div(1e300).pow(asymptoteExponent).times(1e300);
    }

    antimatterGain = antimatterGain.times(getAntimatterMultipliersAfterSoftcap());

    antimatterGain = antimatterGain.pow(getAntimatterPowers());

    // The second softcap halts most meaningful progress past 1e100000. 
    // Nothing changes/affects it, but that may change. 
    if (antimatterGain.gt(player.ad.secondSoftcap)) {
        antimatterGain = antimatterGain.div(player.ad.secondSoftcap).pow(0.1).times(player.ad.secondSoftcap);
    }

    if (player.po.halter.antimatter.enabled == 1) {
        antimatterGain = antimatterGain.div(player.po.halter.antimatter.halt);
    } else if (player.po.halter.antimatter.enabled == 2) {
        antimatterGain = antimatterGain.min(player.po.halter.antimatter.halt);
    }
    
    return antimatterGain;
}

/**
 * Compute Antimatter multipliers that apply before any softcaps.
 * @returns 
 */
function getAntimatterMultipliersBeforeSoftcap() {
    const factors = [
        buyableEffect("ad", 1),
        buyableEffect("ad", 2),
        buyableEffect("ad", 11),
        optionalUpgradeEffect("ad", 12).orElse(1),
        optionalUpgradeEffect("ad", 17).orElse(1),

        buyableEffect("ip", 14),
        optionalUpgradeEffect("ip", 12).orElse(1),

        buyableEffect("ta", 36),

        levelableEffect("pet", 106)[0], // Spider 
        levelableEffect("pet", 305)[0], // Antimatter Pet

        
        buyableEffect("gh", 23),
        buyableEffect("gh", 24),
        buyableEffect("gh", 35),
        buyableEffect("gh", 37),
        
        buyableEffect("m", 17),
        
        buyableEffect("om", 15),
        
        hasAchievement("achievements", 123) ? 2 : 1,
        
        player.id.infinityPowerEffect,
        player.om.hexMasteryPointsEffect,
        player.ta.dimensionPowerEffects[0],
    ];

    return factors.reduce((factor1, factor2) => factor1.mul(factor2), new Decimal(1));
}

/**
 * Compute the Antimatter softcap base. This determines when and how harshly
 * softcapping of Antimatter gain begins. 
 * @returns 
 */
function getAntimatterHardcap() {
    const factors = [
        1000, // Base
        hasUpgrade("bi", 21) ? 1.1 : 1,
        player.cs.scraps.antimatter.effect,
        player.ir.iriditeDefeated ? 2 : 1,
    ]

    return factors.reduce((factor1, factor2) => factor1.mul(factor2), new Decimal(1));
}

/**
 * Compute Antimatter multipliers that apply after the first softcap.
 * @returns 
 */
function getAntimatterMultipliersAfterSoftcap() {
    const factors = [
        buyableEffect("ta", 37),
        optionalUpgradeEffect("ip", 43).orElse(1),
        hasMilestone("fa", 12) ? player.fa.milestoneEffect[1] : 1,
        player.co.cores.antimatter.effect[0],
    ]

    return factors.reduce((factor1, factor2) => factor1.mul(factor2), new Decimal(1));
}

/**
 * Compute what power Antimatter gain is raised to. 
 * @returns
 */
function getAntimatterPowers() {
    const powers = [
        levelableEffect("ir", 3)[0],
        buyableEffect("sb", 105),
        buyableEffect("cof", 21),
        optionalUpgradeEffect("bi", 118).orElse(1),
        hasUpgrade("hpw", 1051) ? 1.05 : 1
    ];
    return powers.reduce((power1, power2) => power1.mul(power2), new Decimal(1));
}


/**
 * Update Antimatter and Antimatter Per Second. 
 * @param {number} delta The amount of time since the last tick, in seconds.
 */
function updateAntimatterAmount(delta) {

    // Prevent anything before unlocking ADs. 
    if (!hasUpgrade("ad", 11)) {
        player.ad.antimatter = new Decimal(0);
        player.ad.antimatterPerSecond = new Decimal(0);
        return;
    }

    player.ad.antimatterPerSecond = getAntimatterPerSecond();
    player.ad.antimatter = player.ad.antimatter
            .plus(player.ad.antimatterPerSecond.times(delta))
            .max(0);
    
    // Hardcap before Infinity Challenge 8
    if (player.ad.antimatter.gt(1e300) && !hasChallenge("ip", 18)) {
        player.ad.antimatter = new Decimal(1e300);
        player.ad.antimatterPerSecond = new Decimal(0);
    }
}


/**
 * Update the effect of Antimatter to points. 
 * @returns 
 */
function updateAntimatterEffect() {
    if (player.ad.antimatter.lte(0)) {
        player.ad.antimatterEffect = new Decimal(1);
        return;
    }

    const antimatterExponent = player.ad.antimatter.add(1).log10().pow(0.3);

    let effect = player.points.log10().times(3).add(1).pow(antimatterExponent);
    effect = effect.pow(getAntimatterEffectPowers());

    player.ad.antimatterEffect = effect;
}

/**
 * Determine what power the Antimatter Effect should be raised to.
 * @returns 
 */
function getAntimatterEffectPowers() {
    const powers = [
        hasUpgrade("bi", 22) ?   3.0 : 1, // The old formula changes are equivalent to this.
        hasUpgrade("bi", 108) ?  1.6 : 1,
        hasUpgrade("bi", 114) ?  3.0 : 1,
        hasUpgrade("ma", 19) ?  20.0 : 1
    ];
    return powers.reduce((power1, power2) => power1.mul(power2), new Decimal(1));
}


/**
 * Update the amount of each Antimatter Dimension. 
 * @param {number} delta The time since the last tick in seconds.
 */
function updateAntimatterDimensionAmounts(delta) {
    const globalMultiplier = getAntimatterDimensionGeneralMultiplier();
    const softcapExponent = getAntimatterDimensionSoftcapExponent();
    for (let dimensionId = 0; dimensionId < player.ad.dimensionAmounts.length - 1; dimensionId++) {
        const baseProduction = player.ad.dimensionAmounts[dimensionId+1];
        let production = baseProduction
                .times(globalMultiplier)
                .times(getAntimatterDimensionSpecificMultiplier(dimensionId));

        if (production.gte(1e300)) {
            production = production.div(1e300).pow(softcapExponent).times(1e300);
        }

        player.ad.dimensionsPerSecond[dimensionId] = production;
    }

    for (let i = player.ad.dimensionAmounts.length-1; i >= 0; i--) {
        player.ad.dimensionAmounts[i] = player.ad.dimensionAmounts[i].add(player.ad.dimensionsPerSecond[i].mul(delta))
    }
}

/**
 * Get the total multiplier that applies to ALL antimatter dimensions. 
 */
function getAntimatterDimensionGeneralMultiplier() {
    const factors = [
        buyableEffect("ad", 1),
        buyableEffect("ad", 2),
        buyableEffect("gh", 23),
        levelableEffect("pet", 305)[0], // Antimatter Pet
        // player.ta.dimensionPowerEffects[i+1],
        buyableEffect("ip", 14),
        buyableEffect("ta", 36),
        player.om.hexMasteryPointsEffect,
        buyableEffect("gh", 37),
        player.id.infinityPowerEffect,
        buyableEffect("m", 17),

        optionalUpgradeEffect("ad", 17).orElse(1),
        hasAchievement("achievements", 123) ? 2 : 1,
    ];

    return factors.reduce((factor1, factor2) => factor1.mul(factor2), new Decimal(1));
}

function getAntimatterDimensionSpecificMultiplier(dimensionId) {
    switch (dimensionId) {
        case 0:
            return levelableEffect("pet", 206)[0]; // Clock
        case 1:
            return levelableEffect("pet", 207)[0]; // Troll
        case 2:
            return levelableEffect("pet", 206)[1]; // Clock
        case 3:
            return levelableEffect("pet", 207)[1]; // Troll
        case 4:
            return levelableEffect("pet", 206)[2]; // Clock
        case 5:
            return levelableEffect("pet", 207)[2]; // Troll
        case 6: 
            return levelableEffect("pet", 106)[1]
                .times(optionalUpgradeEffect("ip", 13).orElse(1));
        default:
            return new Decimal(1);
    }
}

function getAntimatterDimensionSoftcapExponent() {
    if (!hasChallenge("ip", 18)) return 0;
    if (!hasUpgrade("bi", 21)) return 0.96;
    if (!player.ir.defeatedIridite) return 0.975;
    return 1;
}


function setAntimatterDimensionCostScaling() {
    player.ad.dimensionBase = [
        new Decimal(10), 
        new Decimal(100), 
        new Decimal(1e4), 
        new Decimal(1e6), 
        new Decimal(1e9), 
        new Decimal(1e13), 
        new Decimal(1e18), 
        new Decimal(1e24)
    ];
    player.ad.dimensionGrowths = [
        new Decimal(1e3),
        new Decimal(1e4),
        new Decimal(1e5),
        new Decimal(1e6),
        new Decimal(1e8),
        new Decimal(1e10),
        new Decimal(1e12),
        new Decimal(1e15),
    ];
    if (player.ad.antimatter.lte(1e300)) return;

    // Post-1e300 scaling doesn't retroactively account for the number of 
    // purchases already made.
    // So, that's done with this terrible yet literal retcon. 
    if (hasUpgrade("bi", 21)) {
        player.ad.dimensionBase = [
            new Decimal("1e-1200"), 
            new Decimal("1e-1575"), 
            new Decimal("1e-1765"), 
            new Decimal("1e-1905"), 
            new Decimal("1e-1860"), 
            new Decimal("1e-1940"), 
            new Decimal("1e-2000"), 
            new Decimal(1e24)
        ];
        player.ad.dimensionGrowths = [
            new Decimal(1e15),
            new Decimal(1e25),
            new Decimal(1e35),
            new Decimal(1e45),
            new Decimal(1e60),
            new Decimal(1e80),
            new Decimal(1e100),
            new Decimal(1e15),
        ];

    } else {
        player.ad.dimensionBase = [
            new Decimal("1e-2175"), 
            new Decimal("1e-2325"), 
            new Decimal("1e-2355"), 
            new Decimal("1e-2640"), 
            new Decimal("1e-2580"), 
            new Decimal("1e-2500"), 
            new Decimal("1e-2460"), 
            new Decimal(1e24)
        ];
        player.ad.dimensionGrowths = [
            new Decimal(1e25),
            new Decimal(1e35),
            new Decimal(1e45),
            new Decimal(1e60),
            new Decimal(1e80),
            new Decimal(1e100),
            new Decimal(1e120),
            new Decimal(1e15),
        ];
    }
}


function setAntimatterTickspeedMultiplier() {
    let tickspeed = new Decimal(1.13);
    tickspeed = tickspeed
        .plus(buyableEffect("ad", 3))
        .plus(buyableEffect("ca", 22));

    tickspeed = tickspeed
        .times(optionalUpgradeEffect("ep1", 12).orElse(1))
        .times(player.co.cores.antimatter.effect[2]);

    player.ad.tickspeedMult = tickspeed;
}

addLayer("ad", {
    name: "Antimatter Dimensions",
    symbol: "AD",
    universe: "U2",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,

        antimatter: new Decimal(0),
        antimatterEffect: new Decimal(1),
        antimatterPerSecond: new Decimal(0),

        secondSoftcap: new Decimal("1e100000"),

        // Dimension Stuff
        dimensionAmounts: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        dimensionsPerSecond: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        dimensionBase: [new Decimal(10), new Decimal(100), new Decimal(1e4), new Decimal(1e6), new Decimal(1e9), new Decimal(1e13), new Decimal(1e18), new Decimal(1e24)],
        dimensionGrowths: [new Decimal(1e3),new Decimal(1e4),new Decimal(1e5),new Decimal(1e6),new Decimal(1e8),new Decimal(1e10),new Decimal(1e12),new Decimal(1e15),],

        tickspeedMult: new Decimal(1.13),

        //pause
        revCrunchPause: new Decimal(0),

        //buymax
        dimMax: false,
    }
    },
    automate() {
        if (!hasMilestone("s", 17)) return;

        buyUpgrade("ad", 11);
        buyUpgrade("ad", 12);
        buyUpgrade("ad", 13);
        buyUpgrade("ad", 14);
        buyUpgrade("ad", 15);
        buyUpgrade("ad", 16);
        buyUpgrade("ad", 17);
        buyUpgrade("ad", 18);
        buyUpgrade("ad", 19);
        buyUpgrade("ad", 21);
    },
    nodeStyle() {
        return {
            background: "linear-gradient(140deg, rgba(0,255,202,1) 0%, rgba(30,181,22,1) 100%)",
            "background-origin": "border-box",
            "border-color": "#119B35",
        };
      },

    tooltip: "Antimatter Dimensions",
    color: "#1eb516",
    update(delta) {

        setAntimatterTickspeedMultiplier();
        updateAntimatterDimensionAmounts(delta);
        updateAntimatterAmount(delta);

        updateAntimatterEffect(delta);

        setAntimatterDimensionCostScaling();

        // TODO: a domino chain starting here seems to be the result of some 
        // odd interactions between mechanics. 
        // Maybe related to microtick structure? 
        player.ad.revCrunchPause = player.ad.revCrunchPause.sub(1)
        if (player.ad.revCrunchPause.gt(0)) {
            layers.revc.reverseCrunch();
        }
    },
    clickables: {
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.ad.dimMax == false },
            unlocked() { return true },
            onClick() {
                player.ad.dimMax = true
            },
            style: { width: '80px', "min-height": '50px', borderRadius: '0px' }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.ad.dimMax == true  },
            unlocked() { return true },
            onClick() {
                player.ad.dimMax = false
            },
            style: { width: '80px', "min-height": '50px', borderRadius: '0px' }
        },
        4: {
            title() { return "Max All" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ad.dimMax = true
                buyBuyable("ad", 1)
                buyBuyable("ad", 11)
                buyBuyable("ad", 12)
                buyBuyable("ad", 13)
                buyBuyable("ad", 14)
                buyBuyable("ad", 15)
                buyBuyable("ad", 16)
                buyBuyable("ad", 17)
                buyBuyable("ad", 18)
            },
            style: { width: '125px', "min-height": '50px', borderRadius: '0px 10px 10px 0px' }
        },
        13: {
            title() { return "<h2>REVERSE BREAK INFINITY" },
            canClick() { return true },
            unlocked() { return !player.ta.unlockedReverseBreak },
            onClick() {
                player.ta.unlockedReverseBreak = true
            },
            style: { width: '200px', "min-height": '80px', borderRadius: '15px' },
        },
        14: {
            title() { return "<h2>REVERSE FIX INFINITY" },
            canClick() { return true },
            unlocked() { return player.ta.unlockedReverseBreak },
            onClick() {
                player.ta.unlockedReverseBreak = false
            },
            style: { width: '200px', "min-height": '80px', borderRadius: '15px' },
        },
        15: {
            title() { return "<h2>REVERSE CRUNCH" },
            canClick() { return player.ad.antimatter.gte('1e308') },
            unlocked() { return true },
            onClick() {
                player.ad.revCrunchPause = new Decimal(6)
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.add(player.ta.negativeInfinityPointsToGet)
            },
            style: { width: '300px', "min-height": '120px', borderRadius: '15px' },
        },
    },
    dimBoostReset() {
        player.ad.antimatter = new Decimal(10)
        player.ad.antimatterPerSecond = new Decimal(0)

        player.ad.buyables[1] = new Decimal(0)

        for (let i = 0; i < player.ad.dimensionAmounts.length; i++) {
            player.ad.dimensionAmounts[i] = new Decimal(0)
            player.ad.dimensionsPerSecond[i] = new Decimal(0)
            player.ad.buyables[11+i] = new Decimal(0)
        }

    },
    galaxyReset() {
        player.ad.antimatter = new Decimal(10)
        player.ad.antimatterPerSecond = new Decimal(0)

        player.ad.buyables[1] = new Decimal(0)

        for (let i = 0; i < player.ad.dimensionAmounts.length; i++) {
            player.ad.dimensionAmounts[i] = new Decimal(0)
            player.ad.dimensionsPerSecond[i] = new Decimal(0)
            player.ad.buyables[11+i] = new Decimal(0)
        }

        if (player.ad.buyables[2].gt(buyableEffect("ta", 38))) player.ad.buyables[2] = buyableEffect("ta", 38)
    },
    bars: {},
    upgrades: {
        11: {
            title: "AD Upgrade I",
            unlocked() { return true },
            description: "Gives you 10 antimatter. Spend it wisely.",
            cost: new Decimal(0),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            onPurchase() {player.ad.antimatter = new Decimal(10)},
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        12: {
            title: "AD Upgrade II",
            unlocked() { return true },
            description: "Antimatter boosts itself.",
            cost: new Decimal(1e10),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            effect() {
                return player.ad.antimatter.abs().plus(1).log10().add(1)
            },
            effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        13: {
            title: "AD Upgrade III",
            unlocked() { return true },
            description: "Boosts rank effect based on antimatter.",
            cost: new Decimal(1e25),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            effect() {
                return player.ad.antimatter.plus(1).log10().pow(1.25).add(1)
            },
            effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        14: {
            title: "AD Upgrade IV",
            unlocked() { return player.in.infinities.gte(2) },
            description: "Boosts grass based on antimatter.",
            cost: new Decimal(1e34),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            effect() {
                return player.ad.antimatter.plus(1).log10().pow(1.3).add(1)
            },
            effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        15: {
            title: "AD Upgrade V",
            unlocked() { return player.in.infinities.gte(2) },
            description: "Boosts trees and leaves based on antimatter.",
            cost: new Decimal(1e40),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            effect() {
                return player.ad.antimatter.plus(1).log10().pow(1.35).div(4).add(1)
            },
            effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        16: {
            title: "AD Upgrade VI",
            unlocked() { return player.in.infinities.gte(2) },
            description: "Boosts grasshoppers and fertilizer based on antimatter.",
            cost: new Decimal(1e50),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            effect() {
                return player.ad.antimatter.plus(1).log10().pow(1.25).div(8).add(1)
            },
            effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        17: {
            title: "AD Upgrade VII",
            unlocked() { return player.in.infinities.gte(3) },
            description: "Infinities boost antimatter dimensions.",
            cost: new Decimal(1e64),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            effect() {
                return player.in.infinities.pow(0.2).add(1)
            },
            effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        18: {
            title: "AD Upgrade VIII",
            unlocked() { return player.in.infinities.gte(3) },
            description: "Boosts mods and lines of code based on antimatter.",
            cost: new Decimal(1e78),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            effect() {
                return player.ad.antimatter.plus(1).log10().pow(1.15).div(12).add(1)
            },
            effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        19: {
            title: "AD Upgrade IX",
            unlocked() { return player.in.infinities.gte(3) },
            description: "Increase factor effect base based on antimatter.",
            cost: new Decimal(1e92),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            effect() {
                return player.ad.antimatter.plus(1).log10().div(2500)
            },
            effectDisplay() { return "+" + format(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        21: {
            title: "AD Upgrade X",
            unlocked() { return player.in.infinities.gte(3) },
            description: "Boosts code experience based on antimatter.",
            cost: new Decimal(1e110),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            effect() {
                return player.ad.antimatter.plus(1).log10().pow(1.1).div(20).add(1)
            },
            effectDisplay() { return "x"+format(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
    },
    buyables: {
        1: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(10) },
            currency() { return player.ad.antimatter},
            pay(amt) { player.ad.antimatter = this.currency().sub(amt) },
            effect(x) { return player.ad.tickspeedMult.pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(buyableEffect("ad", 1)) + "x to dimensions (x" + format(player.ad.tickspeedMult, 3) + ".)<br/>Tickspeed Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " AM."
            },
            buy() {
                if (player.ad.dimMax == false && !hasUpgrade("bi", 105)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 105)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '400px', height: '50px', borderRadius: '10px 0px 0px 10px'}
        },
        2: {
            purchaseLimit() { return !hasChallenge("ip", 18) ? new Decimal(6) : new Decimal(160) },
            currency() {
                if (getBuyableAmount(this.layer, this.id).eq(0)) {
                    return player.ad.dimensionAmounts[3]
                } else if (getBuyableAmount(this.layer, this.id).eq(1)) {
                    return player.ad.dimensionAmounts[4]
                } else if (getBuyableAmount(this.layer, this.id).eq(2)) {
                    return player.ad.dimensionAmounts[5]
                } else if (getBuyableAmount(this.layer, this.id).eq(3) || inChallenge("ip", 18)) {
                    return player.ad.dimensionAmounts[6]
                } else {
                    return player.ad.dimensionAmounts[7]
                }
            },
            effect(x) {
                let mult = new Decimal(2).mul(buyableEffect("ca", 21))
                if (hasUpgrade("cs", 1001)) mult = mult.pow(10)
                return mult.pow(getBuyableAmount(this.layer, this.id))
            },
            unlocked() { return true },
            cost(x) {
                if (!inChallenge("ip", 18)) {
                    if (getBuyableAmount(this.layer, this.id).lt(4)) {
                        return new Decimal(2)
                    } else {
                        return getBuyableAmount(this.layer, this.id).sub(4).mul(2).add(2)
                    }
                } else {
                    if (getBuyableAmount(this.layer, this.id).lt(3)) {
                        return new Decimal(2)
                    } else {
                        return getBuyableAmount(this.layer, this.id).sub(3).mul(2).add(2)
                    }
                }
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {return "<h3>" + getBuyableAmount(this.layer, this.id) + "/" + this.purchaseLimit() + " Dimension Boosts"},
            display() {
                let dimtext = ""
                if (getBuyableAmount(this.layer, this.id).eq(0)) {
                    dimtext = " 4th dimensions."
                } else if (getBuyableAmount(this.layer, this.id).eq(1)) {
                    dimtext = " 5th dimensions."
                } else if (getBuyableAmount(this.layer, this.id).eq(2)) {
                    dimtext = " 6th dimensions."
                } else if (getBuyableAmount(this.layer, this.id).eq(3) || inChallenge("ip", 18)) {
                    dimtext = " 7th dimensions."
                } else {
                    dimtext = " 8th dimensions."
                }
                return "<h3>Which gives x" + format(tmp[this.layer].buyables[this.id].effect) + " to dimensions.\n\
                    Req: " + format(tmp[this.layer].buyables[this.id].cost) + dimtext
            },
            buy() {
                if (!hasAchievement("achievements", 102)) completeAchievement("achievements", 102)
                if (!hasUpgrade("bi", 112)) layers.ad.dimBoostReset()

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { width: '300px', height: '75px', borderRadius: '10px'}
        },
        3: {
            costBase() { return new Decimal(1) },
            costMult() {
                if (inChallenge("ip", 18)) return new Decimal(8)
                return new Decimal(4)
            },
            purchaseLimit() {
                let amt = new Decimal(1)
                if (hasChallenge("ip", 18)) amt = amt.add(15)
                if (hasUpgrade("cs", 1002)) amt = amt.add(64)
                if (hasUpgrade("ep2", 15)) amt = amt.add(upgradeEffect("ep2", 15))
                return amt
            },
            currency() {
                if (inChallenge("ip", 18)) return player.ad.dimensionAmounts[6]
                return player.ad.dimensionAmounts[7]
            },
            effect(x) {
                let eff = new Decimal(0.01)
                eff = eff.mul(player.ca.galaxyDustEffect)
                if (hasUpgrade("cs", 1002)) eff = eff.mul(3)
                return eff.mul(getBuyableAmount(this.layer, this.id).add(player.ca.replicantiGalaxies))
            },
            unlocked() { return true },
            cost(x) { return (x || getBuyableAmount(this.layer, this.id)).add(this.costBase()).mul(this.costMult())},
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "<h3>" + getBuyableAmount(this.layer, this.id) + "/" + this.purchaseLimit() + " Antimatter Galaxies"
            },
            display() {
                if (inChallenge("ip", 18)) {
                    return "<h3>Which gives +" + format(tmp[this.layer].buyables[this.id].effect) + " to tickspeed base.\n\
                        Req: " + format(tmp[this.layer].buyables[this.id].cost) + " 7th dimensions."
                }
                return "<h3>Which gives +" + format(tmp[this.layer].buyables[this.id].effect) + " to tickspeed base.\n\
                    Req: " + format(tmp[this.layer].buyables[this.id].cost) + " 8th dimensions."
            },
            buy() {
                if (!hasAchievement("achievements", 106)) completeAchievement("achievements", 106)
                if (!hasUpgrade("bi", 112)) layers.ad.galaxyReset()

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { width: '300px', height: '75px', borderRadius: '10px'}
        },
        11: {
            costBase() { return player.ad.dimensionBase[0] },
            costGrowth() { return player.ad.dimensionGrowths[0]},
            currency() { return player.ad.antimatter},
            pay(amt) { player.ad.antimatter = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " AM"
            },
            buy() {
                if (player.ad.dimMax == false && !hasUpgrade("bi", 105)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.ad.dimensionAmounts[0] = player.ad.dimensionAmounts[0].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 105)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.ad.dimensionAmounts[0] = player.ad.dimensionAmounts[0].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px'}
        },
        12: {
            costBase() { return player.ad.dimensionBase[1] },
            costGrowth() { return player.ad.dimensionGrowths[1] },
            currency() { return player.ad.antimatter},
            pay(amt) { player.ad.antimatter = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " AM"
            },
            buy() {
                if (player.ad.dimMax == false && !hasUpgrade("bi", 105)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.ad.dimensionAmounts[1] = player.ad.dimensionAmounts[1].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 105)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.ad.dimensionAmounts[1] = player.ad.dimensionAmounts[1].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px'}
        },
        13: {
            costBase() { return player.ad.dimensionBase[2] },
            costGrowth() { return player.ad.dimensionGrowths[2] },
            currency() { return player.ad.antimatter},
            pay(amt) { player.ad.antimatter = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " AM"
            },
            buy() {
                if (player.ad.dimMax == false && !hasUpgrade("bi", 105)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.ad.dimensionAmounts[2] = player.ad.dimensionAmounts[2].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 105)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.ad.dimensionAmounts[2] = player.ad.dimensionAmounts[2].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px'}
        },
        14: {
            costBase() { return player.ad.dimensionBase[3] },
            costGrowth() { return player.ad.dimensionGrowths[3]},
            currency() { return player.ad.antimatter},
            pay(amt) { player.ad.antimatter = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " AM"
            },
            buy() {
                if (player.ad.dimMax == false && !hasUpgrade("bi", 105)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.ad.dimensionAmounts[3] = player.ad.dimensionAmounts[3].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 105)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.ad.dimensionAmounts[3] = player.ad.dimensionAmounts[3].add(max)
                }
                if (!hasAchievement("achievements", 123) && inChallenge("ip", 18) && getBuyableAmount(this.layer, this.id).gte(4)) completeAchievement("achievements", 123)
            },
            style: { width: '175px', height: '50px', borderRadius: '10px'}
        },
        15: {
            costBase() { return player.ad.dimensionBase[4] },
            costGrowth() { return player.ad.dimensionGrowths[4] },
            currency() { return player.ad.antimatter},
            pay(amt) { player.ad.antimatter = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("ad", 2).gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " AM"
            },
            buy() {
                if (player.ad.dimMax == false && !hasUpgrade("bi", 105)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.ad.dimensionAmounts[4] = player.ad.dimensionAmounts[4].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 105)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.ad.dimensionAmounts[4] = player.ad.dimensionAmounts[4].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px'}
        },
        16: {
            costBase() { return player.ad.dimensionBase[5] },
            costGrowth() { return player.ad.dimensionGrowths[5]},
            currency() { return player.ad.antimatter},
            pay(amt) { player.ad.antimatter = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("ad", 2).gte(2) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " AM"
            },
            buy() {
                if (player.ad.dimMax == false && !hasUpgrade("bi", 105)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.ad.dimensionAmounts[5] = player.ad.dimensionAmounts[5].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 105)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.ad.dimensionAmounts[5] = player.ad.dimensionAmounts[5].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px'}
        },
        17: {
            costBase() { return player.ad.dimensionBase[6] },
            costGrowth() { return player.ad.dimensionGrowths[6] },
            currency() { return player.ad.antimatter},
            pay(amt) { player.ad.antimatter = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("ad", 2).gte(3) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " AM"
            },
            buy() {
                if (player.ad.dimMax == false && !hasUpgrade("bi", 105)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.ad.dimensionAmounts[6] = player.ad.dimensionAmounts[6].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 105)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.ad.dimensionAmounts[6] = player.ad.dimensionAmounts[6].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px'}
        },
        18: {
            costBase() { return player.ad.dimensionBase[7] },
            costGrowth() { return player.ad.dimensionGrowths[7]},
            currency() { return player.ad.antimatter},
            pay(amt) { player.ad.antimatter = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("ad", 2).gte(4) && !inChallenge("ip", 18) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " AM"
            },
            buy() {
                if (player.ad.dimMax == false && !hasUpgrade("bi", 105)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.ad.dimensionAmounts[7] = player.ad.dimensionAmounts[7].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 105)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.ad.dimensionAmounts[7] = player.ad.dimensionAmounts[7].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px'}
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "5px" }},
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15],
                        ["upgrade", 16], ["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 21]
                    ], {maxWidth: "750px"}],
                ]
            },
            "Dimensions": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["row", [["buyable", 1], ["clickable", 2], ["clickable", 3], ["clickable", 4]]],
                    ["blank", "25px"],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return "1st dimension (" + format(buyableEffect("ad", "11")) + "x): " + format(player.ad.dimensionAmounts[0]) + " (+" + format(player.ad.dimensionsPerSecond[0]) + "/s)"}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
                        ], {width: "650px"}], 
                        ["buyable", 11],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return "2nd dimension (" + format(buyableEffect("ad", "12")) + "x): " + format(player.ad.dimensionAmounts[1]) + " (+" + format(player.ad.dimensionsPerSecond[1]) + "/s)"}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
                        ], {width: "650px"}], 
                        ["buyable", 12],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return "3rd dimension (" + format(buyableEffect("ad", "13")) + "x): " + format(player.ad.dimensionAmounts[2]) + " (+" + format(player.ad.dimensionsPerSecond[2]) + "/s)"}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
                        ], {width: "650px"}], 
                        ["buyable", 13],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return "4th dimension (" + format(buyableEffect("ad", "14")) + "x): " + format(player.ad.dimensionAmounts[3]) + " (+" + format(player.ad.dimensionsPerSecond[3]) + "/s)"}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
                        ], {width: "650px"}], 
                        ["buyable", 14],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("ad", 2).gte(1) ? "5th dimension (" + format(buyableEffect("ad", "15")) + "x): " + format(player.ad.dimensionAmounts[4]) + " (+" + format(player.ad.dimensionsPerSecond[4]) + "/s)" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
                        ], {width: "650px"}], 
                        ["buyable", 15],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("ad", 2).gte(2) ? "6th dimension (" + format(buyableEffect("ad", "16")) + "x): " + format(player.ad.dimensionAmounts[5]) + " (+" + format(player.ad.dimensionsPerSecond[5]) + "/s)" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
                        ], {width: "650px"}], 
                        ["buyable", 16],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("ad", 2).gte(3) ? "7th dimension (" + format(buyableEffect("ad", "17")) + "x): " + format(player.ad.dimensionAmounts[6]) + " (+" + format(player.ad.dimensionsPerSecond[6]) + "/s)" : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
                        ], {width: "650px"}], 
                        ["buyable", 17],
                    ]],
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("ad", 2).gte(4) ? "8th dimension (" + format(buyableEffect("ad", "18")) + "x): " + format(player.ad.dimensionAmounts[7]) : ""}, { color: "white", fontSize: "20px", fontFamily: "monospace" }]
                        ], {width: "650px"}], 
                        ["buyable", 18],
                    ], () => {return inChallenge("ip", 18) ? {display: "none !important"} : {}}],
                    ["blank", "25px"],
                    ["row", [["buyable", 2], ["buyable", 3]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return !hasChallenge("ip", 18) ?  "Progress gets halted at 1e300 antimatter." : "" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["raw-html", function () { return hasChallenge("ip", 18) ?  "Progress gets softcapped at 1e300 antimatter." : "" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                ]
            },
            "Reverse Break": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return player.tad.breakNIP },
                content: [
                    ["blank", "25px"],
                    ["row", [["clickable", 15]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 13], ["clickable", 14]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "(+" + format(player.ta.negativeInfinityPointsToGet) + " NIP)" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
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
        ["raw-html", () => { return player.ad.antimatterPerSecond.gte(player.ad.secondSoftcap) ? "UNAVOIDABLE SOFTCAP: Gain past " + format(player.ad.secondSoftcap) + " is raised by ^0.1." : "" }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return (player.startedGame == true && player.in.unlockedInfinity && hasUpgrade("ip", 11)) || hasMilestone("s", 19)}
})

// my friend ice LOVES copying and stealing game ideas to put in his own games
