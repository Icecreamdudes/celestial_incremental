addLayer("ip", {
    name: "Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
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
        if (hasMilestone("s", 17))
        {
            buyUpgrade("ip", 11)
            buyUpgrade("ip", 12)
            buyUpgrade("ip", 13)
            buyUpgrade("ip", 14)
            buyUpgrade("ip", 21)
            buyUpgrade("ip", 22)
            buyUpgrade("ip", 23)
            buyUpgrade("ip", 24)
            buyUpgrade("ip", 31)
            buyUpgrade("ip", 32)
            buyUpgrade("ip", 33)
            buyUpgrade("ip", 34)
            buyUpgrade("ip", 41)
            buyUpgrade("ip", 42)
            buyUpgrade("ip", 43)
            buyUpgrade("ip", 44)
        }
    },
    nodeStyle() {
        return {
            background: "linear-gradient(315deg, #d3a165 0%, #FFBF00 100%)",
            "background-origin": "border-box",
            "border-color": "#7c5423",
        };
      },

    tooltip: "Infinity",
    color: "#ffbf00",
    branches: ["ad"],
    update(delta) {
        let onepersec = new Decimal(1)
    },
    clickables: {
        11: {
            title() { return "<h2>BIG CRUNCH" },
            canClick() { return player.points.gte('1e308') },
            unlocked() { return true },
            onClick() {
                if (inChallenge("tad", 11))
                {
                    if (player.bi.brokenInfinities.gt(player.tad.shatteredInfinitiesToGet) && (player.po.hex || hasUpgrade("s", 18)) && !player.po.dice && !player.po.rocketFuel && inChallenge("tad", 11) && player.tad.currentConversion.eq(0))
                    {
                        player.tad.shatteredInfinities = player.tad.shatteredInfinities.add(player.tad.shatteredInfinitiesToGet)
                        player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.shatteredInfinitiesToGet)
                    }
                    if (player.bi.brokenInfinities.gt(player.tad.disfiguredInfinitiesToGet) && (!player.po.hex || hasUpgrade("s", 18)) && !player.po.dice && player.po.rocketFuel && inChallenge("tad", 11) && player.tad.currentConversion.eq(1))
                    {
                        player.tad.disfiguredInfinities = player.tad.disfiguredInfinities.add(player.tad.disfiguredInfinitiesToGet)
                        player.bi.brokenInfinities = player.bi.brokenInfinities.sub(player.tad.disfiguredInfinitiesToGet)
                    }
                    if (player.bi.brokenInfinities.gt(player.tad.corruptedInfinitiesToGet) && (!player.po.hex || hasUpgrade("s", 18)) && player.po.dice && !player.po.rocketFuel && inChallenge("tad", 11) && player.tad.currentConversion.eq(2))
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
            style: { width: '300px', "min-height": '120px', borderRadius: '15px' },
        },
    },
    bars: {},
    upgrades: {
        11: {
            title: "Upgrade (1, 1)",
            unlocked() { return true },
            description: "Unlocks Antimatter Dimensions.",
            cost: new Decimal(1),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        12: {
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
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        13: {
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
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        14: {
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
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        21: {
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
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        22: {
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
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        23: {
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
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        24: {
            title: "Upgrade (2, 4)",
            unlocked() { return hasUpgrade("ip", 11) },
            description: "Boosts golden grass gain based on infinities.",
            cost: new Decimal(16),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.in.infinities.pow(0.3).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        31: {
            title: "Upgrade (3, 1)",
            unlocked() { return hasUpgrade("ip", 21) },
            description: "Unlocks more check back content and more IP upgrades.<br>(CB Level 100)",
            cost: new Decimal(10),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        32: {
            title: "Upgrade (3, 2)",
            unlocked() { return hasUpgrade("ip", 31) },
            description: "Boosts grasshoppers based on infinity points.",
            cost: new Decimal(30),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                if (player.in.infinityPoints.lt(1e200)) return player.in.infinityPoints.mul(0.5).pow(0.7).add(1)
                if (player.in.infinityPoints.lt("1e2000")) return player.in.infinityPoints.div(1e200).pow(0.075).mul(1e140)
                return new Decimal(1e275)
            },
            effectDisplay() {
                if (player.in.infinityPoints.lt(1e200)) return format(upgradeEffect(this.layer, this.id))+"x"
                if (player.in.infinityPoints.lt("1e2000")) return format(upgradeEffect(this.layer, this.id))+"x<br><small style='color:red'>[SOFTCAPPED]</small>"
                return format(upgradeEffect(this.layer, this.id))+"x<br><small style='color:red'>[HARDCAPPED]</small>"
            }, // Add formatting to the effect
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        33: {
            title: "Upgrade (3, 3)",
            unlocked() { return hasUpgrade("ip", 31) },
            description: "Boosts mods based on infinity points.",
            cost: new Decimal(100),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                if (player.in.infinityPoints.lt(1e200)) return player.in.infinityPoints.mul(0.65).pow(0.65).add(1)
                if (player.in.infinityPoints.lt("1e2000")) return player.in.infinityPoints.div(1e200).pow(0.05).mul(1e130)
                return new Decimal(1e220)
            },
            effectDisplay() {
                if (player.in.infinityPoints.lt(1e200)) return format(upgradeEffect(this.layer, this.id))+"x"
                if (player.in.infinityPoints.lt("1e2000")) return format(upgradeEffect(this.layer, this.id))+"x<br><small style='color:red'>[SOFTCAPPED]</small>"
                return format(upgradeEffect(this.layer, this.id))+"x<br><small style='color:red'>[HARDCAPPED]</small>"
            }, // Add formatting to the effect
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        34: {
            title: "Upgrade (3, 4)",
            unlocked() { return hasUpgrade("ip", 31) },
            description: "Boosts dice points and rocket fuel based on infinity points.",
            cost: new Decimal(300),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                if (player.in.infinityPoints.lt(1e200)) return player.in.infinityPoints.mul(0.3).pow(0.5).add(1)
                if (player.in.infinityPoints.lt("1e2000")) return player.in.infinityPoints.div(1e200).pow(0.04).mul(1e100)
                return new Decimal(1e172)
            },
            effectDisplay() {
                if (player.in.infinityPoints.lt(1e200)) return format(upgradeEffect(this.layer, this.id))+"x"
                if (player.in.infinityPoints.lt("1e2000")) return format(upgradeEffect(this.layer, this.id))+"x<br><small style='color:red'>[SOFTCAPPED]</small>"
                return format(upgradeEffect(this.layer, this.id))+"x<br><small style='color:red'>[HARDCAPPED]</small>"
            }, // Add formatting to the effect
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        41: {
            title: "Upgrade (4, 1)",
            unlocked() { return hasUpgrade("ta", 14) },
            description: "Boosts negative infinity points based on infinity points.",
            cost: new Decimal(20000),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.in.infinityPoints.plus(1).log10().mul(0.65).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        42: {
            title: "Upgrade (4, 2)",
            unlocked() { return hasUpgrade("ta", 14) },
            description: "Boosts infinity points based on negative infinity points.",
            cost: new Decimal(40000),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                if (!hasUpgrade("cs", 1103)) return player.ta.negativeInfinityPoints.plus(1).log10().pow(1.2).mul(0.2).add(1)
                return player.ta.negativeInfinityPoints.pow(0.08).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        43: {
            title: "Upgrade (4, 3)",
            unlocked() { return hasUpgrade("ta", 14) },
            description: "Boosts AD (ignoring softcap) based on negative infinity points.",
            cost: new Decimal(80000),
            currencyLocation() { return player.in },
            currencyDisplayName: "Infinity Points",
            currencyInternalName: "infinityPoints",
            effect() {
                return player.ta.negativeInfinityPoints.plus(1).log10().pow(1.35).mul(2.5).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
        44: {
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
            style: {width: "150px", color: "rgba(0,0,0,0.8)", border: "3px solid #7f5f00", borderRadius: "15px", margin: "2px"},
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(2, getBuyableAmount(this.layer, this.id)) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "IP Doubler"
            },
            display() {
                return "which are multiplying infinity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("bi", 109)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 109)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#FFBF00", backgroundImage: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", backgroundOrigin: "border-box"}
        },
        12: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() {return hasUpgrade("ta", 11)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Negative Infinity Booster"
            },
            display() {
                return "which are multiplying negative infinity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("bi", 109)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 109)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#FFBF00", backgroundImage: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", backgroundOrigin: "border-box"}
        },
        13: {
            costBase() { return new Decimal(2500) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).pow(1.1).add(1) },
            unlocked() {return hasUpgrade("ta", 11)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dimension Power Booster"
            },
            display() {
                return "which are multiplying all dimension power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("bi", 109)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 109)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#FFBF00", backgroundImage: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", backgroundOrigin: "border-box"}
        },
        14: {
            costBase() { return new Decimal(4000) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1) },
            unlocked() {return hasUpgrade("ta", 11)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dimension Booster"
            },
            display() {
                return "which are multiplying all antimatter dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("bi", 109)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 109)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#FFBF00", backgroundImage: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", backgroundOrigin: "border-box"}
        },
    },
    milestones: {
        1: {
            requirementDescription: "<h3>1 Infinity",
            effectDescription: "Unlock the Otherworldy Feature: Rocket Fuel.",
            done() { return player.in.infinities.gte(1) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        11: {
            requirementDescription: "<h3>2 Infinities",
            effectDescription: "Keeps grass and prestige upgrades on all resets.",
            done() { return player.in.infinities.gte(2) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        12: {
            requirementDescription: "<h3>3 Infinities",
            effectDescription: "Keep check back unlocked,<br>and gain 5% of prestige points per second.",
            done() { return player.in.infinities.gte(3) },
            style: {width: "600px", height: "70px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        13: {
            requirementDescription: "<h3>4 Infinities",
            effectDescription: "Gain 5% of grass per second.",
            done() { return player.in.infinities.gte(4) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        14: {
            requirementDescription: "<h3>5 Infinities",
            effectDescription: "Keep antimatter progress on regular infinity resets.",
            done() { return player.in.infinities.gte(5) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        15: {
            requirementDescription: "<h3>6 Infinities",
            effectDescription: "Keeps pent milestones.",
            done() { return player.in.infinities.gte(6) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        16: {
            requirementDescription: "<h3>8 Infinities",
            effectDescription: "Unlock challenges.",
            done() { return player.in.infinities.gte(8) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        17: {
            requirementDescription: "<h3>15 Infinities",
            effectDescription: "Autobuys grasshopper studies and mod buyables.",
            done() { return player.in.infinities.gte(15) && hasChallenge("ip", 14) },
            unlocked() { return hasChallenge("ip", 14) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        18: {
            requirementDescription: "<h3>25 Infinities",
            effectDescription: "Gain an option to keep OTFs on infinity reset.",
            done() { return player.in.infinities.gte(25) && hasChallenge("ip", 14) },
            unlocked() { return hasChallenge("ip", 14) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        19: {
            requirementDescription: "<h3>40 Infinities",
            effectDescription() { return "Autobuy universe 1 upgrades." },
            done() { return player.in.infinities.gte(40) && hasChallenge("ip", 14) },
            unlocked() { return hasChallenge("ip", 14) },
            style: {width: "600px", height: "90px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
            toggles: [
                ["i", "auto"], // Each toggle is defined by a layer and the data toggled for that layer
            ],
        },
        21: {
            requirementDescription: "<h3>80 Infinities",
            effectDescription() { return "Skip the big crunch screen, and automatically reset." },
            done() { return player.in.infinities.gte(80) && hasChallenge("ip", 14) },
            unlocked() { return hasChallenge("ip", 14) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        22: {
            requirementDescription: "<h3>150 Infinities",
            effectDescription() { return "Gain 10% of grasshoppers and code experience per second." },
            done() { return player.in.infinities.gte(150) && hasChallenge("ip", 14) },
            unlocked() { return hasChallenge("ip", 14) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        23: {
            requirementDescription: "<h3>777 Infinities",
            effectDescription() { return "Unlocks the point halter (Next to OTF)." },
            done() { return player.in.infinities.gte(777) && hasChallenge("ip", 14) },
            unlocked() { return hasChallenge("ip", 14) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        24: {
            requirementDescription: "<h3>4000 Infinities",
            effectDescription() { return "Check back pet effects are always active." },
            done() { return player.in.infinities.gte(4000) && hasChallenge("ip", 14) },
            unlocked() { return hasChallenge("ip", 14) },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        25: {
            requirementDescription: "<h3>15000 Infinities",
            effectDescription() { return "Keep Universe 1 upgrades." },
            done() { return hasUpgrade("ta", 21) && player.in.infinities.gte(15000) && player.in.unlockedBreak },
            unlocked() { return player.in.unlockedBreak },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        26: {
            requirementDescription: "<h3>30000 Infinities",
            effectDescription() { return "Tav's domain doesn't reset infinity milestones." },
            done() { return hasUpgrade("ta", 21) && player.in.infinities.gte(30000) && player.in.unlockedBreak },
            unlocked() { return player.in.unlockedBreak },
            style: {width: "600px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        27: {
            requirementDescription: "<h3>70000 Infinities",
            effectDescription() { return "Unlock autocrunchers for inf and negative inf resets.<br>(IN BREAK INFINITY)" },
            done() { return player.in.infinities.gte(70000) && player.in.unlockedBreak && player.ev.evolutionsUnlocked[3] },
            unlocked() { return player.in.unlockedBreak && player.ev.evolutionsUnlocked[3]},
            style: {width: "600px", height: "70px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
    },
    challenges: {
        11: {
            name: "Challenge I",
            challengeDescription() { return "<h4>You can't pick an otherworldy feature." },
            goal() { return new Decimal("1.79e308") },
            canComplete: function () { return player.points.gte(1.79e308) },
            rewardDescription: "Unlock new grasshopper studies.",
            onEnter() {
                //OTF is reset here and not in crunch to prevent a bug
                player.po.dice = false
                player.po.rocketFuel = false
                player.po.hex = false
                if (player.po.breakInfinity) {
                    player.po.featureSlots = player.po.featureSlotsMax.sub(1)
                } else {
                    player.po.featureSlots = player.po.featureSlotsMax
                }

                layers.in.bigCrunch()
            },
            onExit() {
                layers.in.bigCrunch()
            },
            buttonStyle: {backgroundColor: "white"},
            style: { width: '350px', height: '275px'},

        },
        12: {
            name: "Challenge II",
            challengeDescription() { return "<h4>Introduces pests, which do bad things to your grass :(" },
            goal() { return new Decimal("1.79e308") },
            canComplete: function () { return player.points.gte(1.79e308) },
            rewardDescription: "Unlocks a new check back button at level 125.",
            unlocked() { return hasChallenge("ip", 11) },
            onEnter() {
                layers.in.bigCrunch()
            },
            onExit() {
                layers.in.bigCrunch()
            },
            buttonStyle: {backgroundColor: "white"},
            style: { width: '350px', height: '275px'},

        },
        13: {
            name: "Challenge III",
            challengeDescription() { return "<h4>Hex... A feature seemingly coming from thin air. No check back effects either..." },
            goalDescription() { return "2 Refinements" },
            goal() { return new Decimal("2") },
            canComplete: function () { return player.hre.refinement.gte(2) },
            rewardDescription: "Permanently unlock hex as an otherworldly feature, and improve base hex point gain.",
            unlocked() { return hasChallenge("ip", 12) },
            onEnter() {
                //OTF is reset here and not in crunch to prevent a bug
                player.po.dice = false
                player.po.rocketFuel = false
                player.po.hex = false
                if (player.po.breakInfinity) {
                    player.po.featureSlots = player.po.featureSlotsMax.sub(1)
                } else {
                    player.po.featureSlots = player.po.featureSlotsMax
                }

                layers.in.bigCrunch()
            },
            onExit() {
                layers.in.bigCrunch()
            },
            buttonStyle: {backgroundColor: "white"},
            style: { width: '350px', height: '275px'},

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
                layers.in.bigCrunch()
            },
            onExit() {
                layers.in.bigCrunch()
            },
            buttonStyle: {backgroundColor: "white"},
            style: { width: '350px', height: '275px'},

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
                //OTF is reset here and not in crunch to prevent a bug
                player.po.dice = false
                player.po.rocketFuel = false
                player.po.hex = false
                if (player.po.breakInfinity) {
                    player.po.featureSlots = player.po.featureSlotsMax.sub(1)
                } else {
                    player.po.featureSlots = player.po.featureSlotsMax
                }

                layers.in.bigCrunch()

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
                layers.in.bigCrunch()
            },
            buttonStyle: {backgroundColor: "white"},
            style: { width: '350px', height: '275px'},
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
                //OTF is reset here and not in crunch to prevent a bug
                player.po.dice = false
                player.po.rocketFuel = false
                player.po.hex = false
                if (player.po.breakInfinity) {
                    player.po.featureSlots = player.po.featureSlotsMax.sub(1)
                } else {
                    player.po.featureSlots = player.po.featureSlotsMax
                }

                layers.in.bigCrunch()
            },
            onExit() {
                layers.in.bigCrunch()
            },
            buttonStyle: {backgroundColor: "white"},
            style: { width: '350px', height: '275px'},
        },
        17: {
            name: "Challenge VII",
            challengeDescription() { return "<h4>Clicking on a check back XP button resets the timer for all other check back XP buttons.</h4>" },
            goalDescription() { return "Earning an evolution shard from a check back button." },
            goal() { return new Decimal("60") },
            canComplete: function () { return player.cb.IC7shardCount > 0 },
            rewardDescription: "Check back buyables.",
            unlocked() { return hasChallenge("ip", 16) && player.cb.highestLevel.gte(35) },
            onEnter() {
                layers.in.bigCrunch()

                player.cb.IC7shardCount = 0
            },
            onExit() {
                layers.in.bigCrunch()
            },
            buttonStyle: {backgroundColor: "white"},
            style: { width: '350px', height: '275px'},
        },
        18: {
            name: "Challenge VIII",
            challengeDescription() { return "<h4>Debuffs so strong they distort the universe. You'd hate it, but there will still be worse things to come." },
            goalDescription() { return "1.79e308 celestial points" },
            goal() { return new Decimal("1.79e308") },
            canComplete: function () { return player.points.gte(1.79e308) },
            rewardDescription: "....???",
            unlocked() { return hasChallenge("ip", 16) && hasChallenge("ip", 17) && !hasChallenge('ip', 18) },
            onEnter() {
                layers.in.bigCrunch()
            },
            onExit() {
                layers.in.bigCrunch()
            },
            buttonStyle: {backgroundColor: "white"},
            style: { width: '350px', height: '275px'},
        },
    },
    infoboxes: {},
    microtabs: {
        stuff: {
            "Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14],
                        ["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24],
                        ["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34],
                        ["upgrade", 41], ["upgrade", 42], ["upgrade", 43], ["upgrade", 44]
                    ], {maxWidth: "625px", padding: "5px 0", backgroundColor: "#332600", border: "3px solid #7f5f00", borderRadius: "20px"}],
                ]
            },
            "Milestones": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["row", [["milestone", 1]]],
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
                    ["row", [["milestone", 27]]],
                ]
            },
            "Challenges": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasMilestone("ip", 16) },
                content: [
                    ["blank", "25px"],
                    ["style-row", [["challenge", 11], ["challenge", 12], ["challenge", 13],
                        ["challenge", 14], ["challenge", 15], ["challenge", 16],
                        ["challenge", 17], ["challenge", 18]], {maxWidth: "1200px"}],
                    ["blank", "10px"],
                    ["raw-html", () => { return player.in.unlockedBreak ? "Break Infinity works in all challenges." : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["raw-html", () => { return hasChallenge("ip", 16) && !hasChallenge("ip", 17) && player.cb.highestLevel.lt(35) ? "Unlock Challenge VII by reaching Check Back Level 35" : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["raw-html", () => { return hasChallenge("ip", 18) ? "CHALLENGE VIII HAS BEEN TERMINATED." : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                ]
            },
            "Buyables": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasChallenge("ip", 14) },
                content: [
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14]], {maxWidth: "1200px"}],
                ]
            },
            "Reset": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return player.in.breakInfinity },
                content: [
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                ]
            },
        },
    },

    tabFormat: [
        ["row", [
            ["raw-html", () => { return "You have <h3>" + format(player.in.infinityPoints) + "</h3> infinity points" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => { return "(+" + format(player.in.infinityPointsToGet) + ")"}, () => {
                let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                if (player.points.gt("1e308") || !player.in.breakInfinity) {look.color = "white"} else {look.color = "gray"} 
                return look
            }],
        ]],
        ["row", [
            ["raw-html", () => { return "You have <h3>" + formatWhole(player.in.infinities) + "</h3> infinities." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
            ["raw-html", () => { return player.in.infinitiesToGet.gt(1) ? "(+" + format(player.in.infinitiesToGet) + ")" : "" }, {color: "white", fontSize: "16px", fontFamily: "monospace", marginLeft: "8px"}],
        ]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return (player.startedGame == true && player.in.unlockedInfinity) || hasMilestone("s", 19)}
})
