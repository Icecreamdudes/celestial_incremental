addLayer("ip", {
    name: "Infinity Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "∞", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        diceRuns: new Decimal(0),
        rocketFuelRuns: new Decimal(0),
        hexRuns: new Decimal(0),
    }
    },
    automate() {
        if (hasUpgrade("bi", 109))
        {
            buyBuyable("ip", 11)
            buyBuyable("ip", 12)
            buyBuyable("ip", 13)
            buyBuyable("ip", 14)
        }
    },
    nodeStyle() {
        return {
            background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)",
            "background-origin": "border-box",
            "border-color": "#7c5423",
        };
      },
    
    tooltip: "Infinity",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)
    },
    branches: ["ad"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "in"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        11: {
            title() { return "<h2>BIG CRUNCH" },
            canClick() { return player.points.gte('1e308') },
            unlocked() { return true },
            onClick() {
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
                if (hasUpgrade("bi", 14))
                {
                  //  player.om.diceMasteryPoints = player.om.diceMasteryPoints.add(player.om.diceMasteryPointsToGet)
                 //   player.om.rocketFuelMasteryPoints = player.om.rocketFuelMasteryPoints.add(player.om.rocketFuelMasteryPointsToGet)
                 //   player.om.hexMasteryPoints = player.om.hexMasteryPoints.add(player.om.hexMasteryPointsToGet)
                }
                if (!hasMilestone("ip", 21)) 
                {
                    player.tab = "bigc"
                } else if (hasMilestone("ip", 21))
                {
                    layers.bigc.crunch()
                }
            },
            style: { width: '300px', "min-height": '120px' },
        },
    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: "Upgrade (1, 1)",
            unlocked() { return true },
            description: "Unlocks Antimatter Dimensions.",
            cost: new Decimal(1),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
        12:
        {
            title: "Upgrade (1, 2)",
            unlocked() { return hasUpgrade("ip", 11) },
            description: "Boosts antimatter based on completed dice runs.",
            cost: new Decimal(2),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.ip.diceRuns.pow(1.1).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        13:
        {
            title: "Upgrade (1, 3)",
            unlocked() { return hasUpgrade("ip", 11) },
            description: "Boosts 7th dimensions based on completed rocket fuel runs.",
            cost: new Decimal(2),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.ip.rocketFuelRuns.pow(0.9).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },  
        14:
        {
            title: "Upgrade (1, 4)",
            unlocked() { return hasUpgrade("ip", 11) },
            description: "Boosts factor power based on antimatter.",
            cost: new Decimal(6),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.ad.antimatter.plus(1).log10().pow(1.2).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        21:
        {
            title: "Upgrade (2, 1)",
            unlocked() { return hasUpgrade("ip", 11) },
            description: "Boosts factor power and prestige points based on infinities.",
            cost: new Decimal(1),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.in.infinities.pow(1.4).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        22:
        {
            title: "Upgrade (2, 2)",
            unlocked() { return hasUpgrade("ip", 11) },
            description: "Boosts tree and leaf gain based on infinities.",
            cost: new Decimal(4),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.in.infinities.pow(1.2).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        23:
        {
            title: "Upgrade (2, 3)",
            unlocked() { return hasUpgrade("ip", 11) },
            description: "Boosts mod and lines of code gain based on infinities.",
            cost: new Decimal(9),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.in.infinities.pow(1.15).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        24:
        {
            title: "Upgrade (2, 4)",
            unlocked() { return hasUpgrade("ip", 11) },
            description: "Boosts golden grass gain based on infinities.",
            cost: new Decimal(16),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.in.infinities.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        31:
        {
            title: "Upgrade (3, 1)",
            unlocked() { return hasUpgrade("ip", 21) },
            description: "Unlocks more check back content.",
            cost: new Decimal(10),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
        },
        32:
        {
            title: "Upgrade (3, 2)",
            unlocked() { return hasUpgrade("ip", 21) },
            description: "Boosts grasshoppers based on infinity points.",
            cost: new Decimal(30),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.in.infinityPoints.mul(0.5).pow(0.7).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        33:
        {
            title: "Upgrade (3, 3)",
            unlocked() { return hasUpgrade("ip", 31) },
            description: "Boosts code experience based on infinity points.",
            cost: new Decimal(100),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.in.infinityPoints.mul(0.65).pow(0.65).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        34:
        {
            title: "Upgrade (3, 4)",
            unlocked() { return hasUpgrade("ip", 31) },
            description: "Boosts dice points and rocket fuel based on infinity points.",
            cost: new Decimal(300),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.in.infinityPoints.mul(0.3).pow(0.5).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        41:
        {
            title: "Upgrade (4, 1)",
            unlocked() { return hasUpgrade("ta", 14) },
            description: "Boosts negative infinity points baseed on infinity points.",
            cost: new Decimal(20000),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.in.infinityPoints.plus(1).log10().mul(0.65).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        42:
        {
            title: "Upgrade (4, 2)",
            unlocked() { return hasUpgrade("ta", 14) },
            description: "Boosts infinity points baseed on negative infinity points.",
            cost: new Decimal(40000),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.ta.negativeInfinityPoints.plus(1).log10().pow(1.2).mul(0.2).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        43:
        {
            title: "Upgrade (4, 3)",
            unlocked() { return hasUpgrade("ta", 14) },
            description: "Boosts antimatter dimensions based on negative infinity points.",
            cost: new Decimal(80000),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.ta.negativeInfinityPoints.plus(1).log10().pow(1.35).mul(2.5).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        44:
        {
            title: "Upgrade (4, 4)",
            unlocked() { return hasUpgrade("ta", 14) },
            description: "Boosts dimension power based on infinity points.",
            cost: new Decimal(160000),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.in.infinityPoints.plus(1).log10().pow(1.25).mul(0.5).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(100).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return new Decimal.pow(2, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>IP Doubler"
            },
            display() {
                return "which are multiplying infinity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 100
                if (player.buyMax == false && !hasUpgrade("bi", 109))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 109)) player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 109)) player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(1000) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1)},
            unlocked() { return hasUpgrade("ta", 11) },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Negative Infinity Booster"
            },
            display() {
                return "which are multiplying negative infinity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                let base = new Decimal(1000)
                let growth = 1.5
                if (player.buyMax == false && !hasUpgrade("bi", 109))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 109)) player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 109)) player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(1.75).pow(x || getBuyableAmount(this.layer, this.id)).mul(2500) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).pow(1.1).add(1)},
            unlocked() { return hasUpgrade("ta", 11) },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Dimension Power Booster"
            },
            display() {
                return "which are multiplying all dimension power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                let base = new Decimal(2500)
                let growth = 1.75
                if (player.buyMax == false && !hasUpgrade("bi", 109))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 109)) player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 109)) player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(4000) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1)},
            unlocked() { return hasUpgrade("ta", 11) },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Dimension Booster"
            },
            display() {
                return "which are multiplying all antimatter dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                let base = new Decimal(4000)
                let growth = 2
                if (player.buyMax == false && !hasUpgrade("bi", 109))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 109)) player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 109)) player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
    },
    milestones: {
        11: {
            requirementDescription: "<h3>2 Infinities",
            effectDescription: "Keeps grass and prestige upgrades on all resets.",
            done() { return player.in.infinities.gte(2) },
            style: { width: '800px', "min-height": '75px' },
        },
        12: {
            requirementDescription: "<h3>3 Infinities",
            effectDescription: "Keep check back unlocked, gain 5% of prestige points per second.",
            done() { return player.in.infinities.gte(3) },
            style: { width: '800px', "min-height": '75px' },
        },
        13: {
            requirementDescription: "<h3>4 Infinities",
            effectDescription: "Gain 5% of grass per second.",
            done() { return player.in.infinities.gte(4) },
            style: { width: '800px', "min-height": '75px' },
        },
        14: {
            requirementDescription: "<h3>5 Infinities",
            effectDescription: "Keep antimatter progress on regular infinity resets.",
            done() { return player.in.infinities.gte(5) },
            style: { width: '800px', "min-height": '75px' },
        },
        15: {
            requirementDescription: "<h3>6 Infinities",
            effectDescription: "Keeps pent milestones on infinity.",
            done() { return player.in.infinities.gte(6) },
            style: { width: '800px', "min-height": '75px' },
        },
        16: {
            requirementDescription: "<h3>8 Infinities",
            effectDescription: "Unlock challenges.",
            done() { return player.in.infinities.gte(8) },
            style: { width: '800px', "min-height": '75px' },
        },
        17: {
            requirementDescription: "<h3>15 Infinities",
            effectDescription: "Autobuys grass studies and mod buyables.",
            done() { return player.in.infinities.gte(15) && hasChallenge("ip", 14) },
            unlocked() { return hasChallenge("ip", 14) },
            style: { width: '800px', "min-height": '75px' },
        },
        18: {
            requirementDescription: "<h3>25 Infinities",
            effectDescription: "Gain an option to keep OTFs on infinity reset.",
            done() { return player.in.infinities.gte(25) && hasChallenge("ip", 14) },
            unlocked() { return hasChallenge("ip", 14) },
            style: { width: '800px', "min-height": '75px' },
        },
        19: {
            requirementDescription: "<h3>40 Infinities",
            effectDescription() { return "Autobuy universe 1 upgrades." },
            done() { return player.in.infinities.gte(40) },
            unlocked() { return hasChallenge("ip", 14) },
            style: { width: '800px', "min-height": '90px' },
            toggles: [
                ["i", "auto"], // Each toggle is defined by a layer and the data toggled for that layer
            ],
        },
        21: {
            requirementDescription: "<h3>80 Infinities",
            effectDescription() { return "Skip the big crunch screen, and automatically reset." },
            done() { return player.in.infinities.gte(80) },
            unlocked() { return hasChallenge("ip", 14) },
            style: { width: '800px', "min-height": '90px' },
        },
        22: {
            requirementDescription: "<h3>150 Infinities",
            effectDescription() { return "Gain 10% of grasshoppers and code experience per second." },
            done() { return player.in.infinities.gte(150) },
            unlocked() { return hasChallenge("ip", 14) },
            style: { width: '800px', "min-height": '90px' },
        },
        23: {
            requirementDescription: "<h3>777 Infinities",
            effectDescription() { return "Unlocks the point halter (in portal)." },
            done() { return player.in.infinities.gte(777) },
            unlocked() { return hasChallenge("ip", 14) },
            style: { width: '800px', "min-height": '90px' },
        },
        24: {
            requirementDescription: "<h3>4000 Infinities",
            effectDescription() { return "Check back pet effects are always active." },
            done() { return player.in.infinities.gte(4000) },
            unlocked() { return hasChallenge("ip", 14) },
            style: { width: '800px', "min-height": '90px' },
        },
        25: {
            requirementDescription: "<h3>30000 Infinities",
            effectDescription() { return "Tav's domain don't reset infinity milestones." },
            done() { return player.in.infinities.gte(30000) },
            unlocked() { return player.in.unlockedBreak },
            style: { width: '800px', "min-height": '90px' },
        },
        26: {
            requirementDescription: "<h3>70000 Infinities",
            effectDescription() { return "Unlock autocrunchers for inf and negative inf resets.<br>(IN BREAK INFINITY)" },
            done() { return player.in.infinities.gte(70000) },
            unlocked() { return player.in.unlockedBreak && player.ev.evolutionsUnlocked[3]},
            style: { width: '800px', "min-height": '90px' },
        },
    },
    challenges: {
        11: {
            name: "Challenge I",
            challengeDescription() { return "<h4>You can't pick an otherworldy feature." },
            goal() { return new Decimal("1.79e308") },
            canComplete: function () { return player.points.gte(1.79e308) },
            rewardDescription: "Unlock new grass studies.",
            onEnter() {
                player.in.infinityPause = new Decimal(5)
            },
            onExit() {
                player.in.infinityPause = new Decimal(5)
            },
            style: { width: '350px', height: '275px', }

        },
        12: {
            name: "Challenge II",
            challengeDescription() { return "<h4>Introduces pests, which do bad things to your grass :(" },
            goal() { return new Decimal("1.79e308") },
            canComplete: function () { return player.points.gte(1.79e308) },
            rewardDescription: "Unlocks a new check back button at level 125.",
            unlocked() { return hasChallenge("ip", 11) },
            onEnter() {
                player.in.infinityPause = new Decimal(5)
            },
            onExit() {
                player.in.infinityPause = new Decimal(5)
            },
            style: { width: '350px', height: '275px', }

        },
        13: {
            name: "Challenge III",
            challengeDescription() { return "<h4>Hex... A feature seemingly coming from thin air. No check back effects either..." },
            goalDescription() { return "Hex 4" },
            goal() { return new Decimal("4") },
            canComplete: function () { return player.h.hex.gte(4) },
            rewardDescription: "Permanently unlocks hex as an otherworldly feature.",
            unlocked() { return hasChallenge("ip", 12) },
            onEnter() {
                player.in.infinityPause = new Decimal(5)
            },
            onExit() {
                player.in.infinityPause = new Decimal(5)
            },
            style: { width: '350px', height: '275px', }

        },
        14: {
            name: "Challenge IV",
            challengeDescription() { return "<h4>IP and AD upgrades are disabled, some IP milestones are disabled, and pent divides point gain, but is necessary to unlock OTFs." },
            goalDescription() { return "Pent 30" },
            goal() { return new Decimal("30") },
            canComplete: function () { return player.r.pent.gte(30) },
            rewardDescription: "Unlocks infinity point buyables and new milestones.",
            unlocked() { return hasChallenge("ip", 13) },
            onEnter() {
                player.in.infinityPause = new Decimal(5)
            },
            onExit() {
                player.in.infinityPause = new Decimal(5)
            },
            style: { width: '350px', height: '275px', }

        },
        15: {
            name: "Challenge V",
            challengeDescription() { return "<h4>You are stuck in dice, the booster dice automatically rolls but on every roll, it does a reset equivalent to a big crunch. There are also general debuffs." },
            goalDescription() { return "1.79e308 celestial points" },
            goal() { return new Decimal("1.79e308") },
            canComplete: function () { return player.points.gte(1.79e308) },
            rewardDescription: "Unlock new booster dice effects, and booster dice automation.",
            unlocked() { return hasChallenge("ip", 14) },
            onEnter() {
                player.in.infinityPause = new Decimal(5)

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
            },
            onExit() {
                player.in.infinityPause = new Decimal(5)
            },
            style: { width: '350px', height: '275px', }

        },
        16: {
            name: "Challenge VI",
            challengeDescription() { return "<h4>You are stuck in rocket fuel, and point gain is raised to the ^0.05." },
            goalDescription() { return "1.79e308 prestige points" },
            goal() { return new Decimal("1.79e308") },
            canComplete: function () { return player.p.prestigePoints.gte(1.79e308) },
            rewardDescription: "Unlock new rocket fuel abilities, and gain 20% of rocket fuel per second.",
            unlocked() { return hasChallenge("ip", 15) },
            onEnter() {
                player.in.infinityPause = new Decimal(5)
            },
            onExit() {
                player.in.infinityPause = new Decimal(5)
            },
            style: { width: '350px', height: '275px', }

        },
        17: {
            name: "Challenge VII",
            challengeDescription() { return "<h4>Does an XPBoost-equivalent reset, and XP is being constantly drained. When XP reaches 0, you are sent back a level with very little XP. (RECCOMENDED LEVEL 100)" },
            goalDescription() { return "Level 60" },
            goal() { return new Decimal("60") },
            canComplete: function () { return player.cb.level.gte(60) },
            rewardDescription: "Check back buyables.",
            unlocked() { return hasChallenge("ip", 16) },
            onEnter() {
                player.in.infinityPause = new Decimal(5)

                player.cb.level = new Decimal(1)
                player.cb.xp = new Decimal(0)
            },
            onExit() {
                player.in.infinityPause = new Decimal(5)
            },
            style: { width: '350px', height: '275px', }

        },
        18: {
            name: "Challenge VIII",
            challengeDescription() { return "<h4>Debuff Hell. You'd hate it, but there will still be worse things to come." },
            goalDescription() { return "1.79e308 celestial points" },
            goal() { return new Decimal("1.79e308") },
            canComplete: function () { return player.points.gte(1.79e308) },
            rewardDescription: "....???",
            unlocked() { return hasChallenge("ip", 17) },
            onEnter() {
                player.in.infinityPause = new Decimal(5)
            },
            onExit() {
                player.in.infinityPause = new Decimal(5)
            },
            style: { width: '350px', height: '275px', }

        },
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Upgrades": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14]]],
                        ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24]]],
                        ["row", [["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34]]],
                        ["row", [["upgrade", 41], ["upgrade", 42], ["upgrade", 43], ["upgrade", 44]]],
                ]

            },
            "Milestones": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["raw-html", function () { return "You have <h3>" + formatWhole(player.in.infinities) + "</h3> infinities." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["milestone", 11]]],
                        ["row", [["milestone", 12]]],
                        ["row", [["milestone", 13]]],
                        ["row", [["milestone", 14]]],
                        ["row", [["milestone", 15]]],
                        ["row", [["milestone", 16]]],
                        ["row", [["milestone", 17]]],
                        ["row", [["milestone", 18]]],
                        ["row", [["milestone", 19]]],
                        ["row", [["milestone", 21]]],
                        ["row", [["milestone", 22]]],
                        ["row", [["milestone", 23]]],
                        ["row", [["milestone", 24]]],
                        ["row", [["milestone", 25]]],
                        ["row", [["milestone", 26]]],
                ]

            },
            "Challenges": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasMilestone("ip", 16) },
                content:
                [
                        ["blank", "25px"],
                        ["row", [["challenge", 11], ["challenge", 12], ["challenge", 13], ["challenge", 14]]],
                        ["row", [["challenge", 15], ["challenge", 16], ["challenge", 17], ["challenge", 18]]],
                ]

            },
            "Buyables": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasChallenge("ip", 14) },
                content:
                [
                        ["blank", "25px"],
                        ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
                ]

            },
            "Reset": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return player.in.breakInfinity },
                content:
                [
                        ["blank", "25px"],
                        ["row", [["clickable", 11]]],
                ]

            },
        },
    }, 

    tabFormat: [                        ["raw-html", function () { return "You have <h3>" + format(player.in.infinityPoints) + "</h3> infinity points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You will gain <h3>" + format(player.in.infinityPointsToGet) + "</h3> on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.in.unlockedInfinity}
})
