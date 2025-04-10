addLayer("ad", {
    name: "Antimatter Dimensions", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AD", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        antimatter: new Decimal(0),
        antimatterEffect: new Decimal(1),
        antimatterPerSecond: new Decimal(0),

        // Dimension Stuff
        dimensionAmounts: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        dimensionsPerSecond: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        dimensionGrowths: [new Decimal(1e3),new Decimal(1e4),new Decimal(1e5),new Decimal(1e6),new Decimal(1e8),new Decimal(1e10),new Decimal(1e12),new Decimal(1e15),],

        tickspeedMult: new Decimal(1.1),

        //pause
        revCrunchPause: new Decimal(0),

        //buymax
        dimMax: false,
    }
    },
    automate() {
        if (hasMilestone("s", 17))
        {
            buyUpgrade("ad", 11)
            buyUpgrade("ad", 12)
            buyUpgrade("ad", 13)
            buyUpgrade("ad", 14)
            buyUpgrade("ad", 15)
            buyUpgrade("ad", 16)
            buyUpgrade("ad", 17)
            buyUpgrade("ad", 18)
            buyUpgrade("ad", 19)
            buyUpgrade("ad", 21)
        }
    },
    nodeStyle() {
        return {
            background: "linear-gradient(140deg, rgba(0,255,202,1) 0%, rgba(30,181,22,1) 100%)",
            "background-origin": "border-box",
            "border-color": "#119B35",
        };
      },

    tooltip: "Antimatter Dimensions",
    color: "rgba(30,181,22,1)",
    update(delta) {
        let onepersec = new Decimal(1)

        // PREVENT NULL
        if (player.ad.antimatter.lt(0)) player.ad.antimatter = new Decimal(0)

        // START OF ANTIMATTER MODIFIERS
        player.ad.antimatterPerSecond = player.ad.dimensionAmounts[0].mul(buyableEffect("ad", 11))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("ad", 1))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("ad", 2))
        if (hasUpgrade("ad", 12)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(upgradeEffect("ad", 12))
        if (hasUpgrade("ip", 12)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(upgradeEffect("ip", 12))
        if (hasUpgrade("ad", 17)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(upgradeEffect("ad", 17))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("gh", 23))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("gh", 24))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(levelableEffect("pet", 106)[0])
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(player.ta.dimensionPowerEffects[0])
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("ip", 14))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("ta", 36))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("bi", 13))

        // CHALLENGE MODIFIERS
        if (inChallenge("tad", 11)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.pow(0.55)
        if (inChallenge("tad", 11)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("de", 12))
        if (inChallenge("tad", 11)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("de", 18))

        // CONTINUED REGULAR MODIFIERS
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("tad", 13))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(player.om.hexMasteryPointsEffect)
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("om", 15))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("gh", 35))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("gh", 37))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(player.id.infinityPowerEffect)
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(player.h.ragePowerEffect)

        // SOFTCAP MODIFIER
        if (player.ad.antimatter.gt(1e300) && !hasChallenge("ip", 18)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.pow(0.1)
        if (player.ad.antimatter.gt(1e300) && hasChallenge("ip", 18) && !hasUpgrade("bi", 21)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.pow(Decimal.div(1, Decimal.div(player.ad.antimatter.plus(1).log10(), 1000)))
        if (player.ad.antimatter.gt(1e300) && hasChallenge("ip", 18) && hasUpgrade("bi", 21)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.pow(Decimal.div(1, Decimal.div(player.ad.antimatter.plus(1).log10(), 1100)))

        // SOFTCAP IGNORING MODIFIERS
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("ta", 37))
        if (hasUpgrade("ip", 43)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(upgradeEffect("ip", 43))
        player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(buyableEffect("rm", 31))
        if (hasMilestone("fa", 12)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(player.fa.milestoneEffect[1])
        if (player.cop.processedCoreFuel.eq(9)) player.ad.antimatterPerSecond = player.ad.antimatterPerSecond.mul(player.cop.processedCoreInnateEffects[0])

        // ANTIMATTER PER SECOND
        player.ad.antimatter = player.ad.antimatter.add(player.ad.antimatterPerSecond.mul(delta))

        // ANTIMATTER EFFECT
        if (!hasUpgrade("bi", 22) && player.ad.antimatter.gte(0)) player.ad.antimatterEffect = player.points.pow(3).plus(1).log10().pow(player.ad.antimatter.plus(1).log10().pow(0.24)).mul(player.ad.antimatter.div(player.ad.antimatter.mul(2).add(1))).add(1)
        if (hasUpgrade("bi", 22) && player.ad.antimatter.gte(0)) player.ad.antimatterEffect = player.points.pow(player.points.plus(1).log10().pow(2)).plus(1).log10().pow(player.ad.antimatter.plus(1).log10().pow(0.24)).mul(player.ad.antimatter.div(player.ad.antimatter.mul(2).add(1))).add(1)
        if (inChallenge("tad", 11)) player.ad.antimatterEffect = player.ad.antimatterEffect.pow(buyableEffect("de", 18))
        if (hasUpgrade("bi", 108)) player.ad.antimatterEffect = player.ad.antimatterEffect.pow(1.6)
        if (hasUpgrade("bi", 113)) player.ad.antimatterEffect = player.ad.antimatterEffect.pow(3)
        player.ad.antimatterEffect = player.ad.antimatterEffect.pow(buyableEffect("cs", 31))

        //----------------------------------------

        // CALCULATE DIMENSION AMOUNTS
        for (let i = 0; i < player.ad.dimensionAmounts.length; i++) {
            player.ad.dimensionAmounts[i] = player.ad.dimensionAmounts[i].add(player.ad.dimensionsPerSecond[i].mul(delta))
        }

        // START OF DIMENSIONS PER SECOND MODIFIERS
        for (let i = 0; i < player.ad.dimensionAmounts.length-1; i++) {
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionAmounts[i+1].mul(buyableEffect("ad", i+12).div(10))
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(buyableEffect("ad", 1))
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(buyableEffect("ad", 2))
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(buyableEffect("gh", 23))
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(levelableEffect("pet", 305)[0]) // Doesn't Effect Regular Antimatter?
            if (hasUpgrade("ad", 17)) player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(upgradeEffect("ad", 17))
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(player.ta.dimensionPowerEffects[i+1])
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(buyableEffect("ip", 14))
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(buyableEffect("ta", 36))
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(buyableEffect("bi", 13))
            if (inChallenge("tad", 11)) player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].pow(0.55)
            if (inChallenge("tad", 11)) player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(buyableEffect("de", 12))
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(buyableEffect("tad", 13))
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(player.om.hexMasteryPointsEffect)
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(buyableEffect("gh", 37))
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(player.id.infinityPowerEffect)
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(player.h.ragePowerEffect)

            // SOFTCAP MODIFIER
            if (player.ad.antimatter.gt(1e300) && !hasChallenge("ip", 18)) player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].pow(0.1)
            if (player.ad.antimatter.gt(1e300) && hasChallenge("ip", 18) && !hasUpgrade("bi", 21)) player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].pow(0.96)
            if (player.ad.antimatter.gt(1e300) && hasChallenge("ip", 18) && hasUpgrade("bi", 21)) player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].pow(0.975)

            // CONTINUED REGULAR MODIFIERS
            if (hasUpgrade("ip", 43)) player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(upgradeEffect("ip", 43))
            player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(buyableEffect("rm", 31))
            if (hasMilestone("fa", 12)) player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].mul(player.fa.milestoneEffect[1])

            // POWER MODIFIERS
            if (player.cop.processedCoreFuel.eq(9)) player.ad.dimensionsPerSecond[i] = player.ad.dimensionsPerSecond[i].pow(player.cop.processedCoreInnateEffects[1])
        }
        
        // SPECIALIZED MODIFIERS
        player.ad.dimensionsPerSecond[0] = player.ad.dimensionsPerSecond[0].mul(levelableEffect("pet", 206)[0])
        player.ad.dimensionsPerSecond[1] = player.ad.dimensionsPerSecond[1].mul(levelableEffect("pet", 207)[0])
        player.ad.dimensionsPerSecond[2] = player.ad.dimensionsPerSecond[2].mul(levelableEffect("pet", 206)[1])
        player.ad.dimensionsPerSecond[3] = player.ad.dimensionsPerSecond[3].mul(levelableEffect("pet", 207)[1])
        player.ad.dimensionsPerSecond[4] = player.ad.dimensionsPerSecond[4].mul(levelableEffect("pet", 206)[2])
        player.ad.dimensionsPerSecond[5] = player.ad.dimensionsPerSecond[5].mul(levelableEffect("pet", 207)[2])
        if (hasUpgrade("ip", 13)) player.ad.dimensionsPerSecond[6] = player.ad.dimensionsPerSecond[6].mul(upgradeEffect("ip", 13))
        player.ad.dimensionsPerSecond[6] = player.ad.dimensionsPerSecond[6].mul(levelableEffect("pet", 106)[1])

        // ANTIMATTER DIMENSION COST SOFTCAP
        player.ad.dimensionGrowths = [new Decimal(1e3),new Decimal(1e4),new Decimal(1e5),new Decimal(1e6),new Decimal(1e8),new Decimal(1e10),new Decimal(1e12),new Decimal(1e15),]
        if (player.ad.antimatter.gt(1e300) && !hasUpgrade("bi", 21) ) {
            player.ad.dimensionGrowths = [new Decimal(1e25),new Decimal(1e35),new Decimal(1e45),new Decimal(1e60),new Decimal(1e80),new Decimal(1e100),new Decimal(1e120),new Decimal(1e15),]        
        }
        if (player.ad.antimatter.gt(1e300) && hasUpgrade("bi", 21) ) {
            player.ad.dimensionGrowths = [new Decimal(1e15),new Decimal(1e25),new Decimal(1e35),new Decimal(1e45),new Decimal(1e60),new Decimal(1e80),new Decimal(1e100),new Decimal(1e15),]        
        }

        //----------------------------------------

        // START OF TICKSPEED MODIFIERS
        player.ad.tickspeedMult = new Decimal(1.125)
        player.ad.tickspeedMult = player.ad.tickspeedMult.add(buyableEffect("ad", 3))
        player.ad.tickspeedMult = player.ad.tickspeedMult.add(buyableEffect("ca", 22))
        if (hasUpgrade("ep1", 12)) player.ad.tickspeedMult = player.ad.tickspeedMult.mul(upgradeEffect("ep1", 12))
        if (player.cop.processedCoreFuel.eq(9)) player.ad.tickspeedMult = player.ad.tickspeedMult.mul(player.cop.processedCoreInnateEffects[2])

        //----------------------------------------

        // PREVENT SOME BUG IDK
        if (!hasUpgrade("ad", 11)) player.ad.antimatter = new Decimal(0)

        // REVERSE CRUNCH CODE
        player.ad.revCrunchPause = player.ad.revCrunchPause.sub(1)
        if (player.ad.revCrunchPause.gt(0)) {
            layers.revc.reverseCrunch();
        }
    },
    branches: [""],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "in"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.ad.dimMax == false },
            unlocked() { return true },
            onClick() {
                player.ad.dimMax = true
            },
            style: { width: '75px', "min-height": '50px', borderRadius: '0px' }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.ad.dimMax == true  },
            unlocked() { return true },
            onClick() {
                player.ad.dimMax = false
            },
            style: { width: '75px', "min-height": '50px', borderRadius: '0px' }
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
            title() { return "<h1>REVERSE BREAK INFINITY" },
            canClick() { return true },
            unlocked() { return !player.ta.unlockedReverseBreak },
            onClick() {
                player.ta.unlockedReverseBreak = true
            },
            style: { width: '400px', "min-height": '160px', borderRadius: '15px' },
        },
        14: {
            title() { return "<h1>REVERSE FIX INFINITY" },
            canClick() { return true },
            unlocked() { return player.ta.unlockedReverseBreak },
            onClick() {
                player.ta.unlockedReverseBreak = false
            },
            style: { width: '400px', "min-height": '160px', borderRadius: '15px' },
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
    dimBoostReset()
    {
        player.ad.antimatter = new Decimal(10)

        player.ad.buyables[1] = new Decimal(0)

        for (let i = 0; i < player.ad.dimensionAmounts.length; i++)
        {
            player.ad.dimensionAmounts[i] = new Decimal(0)
            player.ad.buyables[11+i] = new Decimal(0)
        }

    },
    galaxyReset()
    {
        player.ad.antimatter = new Decimal(10)

        player.ad.buyables[1] = new Decimal(0)

        for (let i = 0; i < player.ad.dimensionAmounts.length; i++)
        {
            player.ad.dimensionAmounts[i] = new Decimal(0)
            player.ad.buyables[11+i] = new Decimal(0)
        }

        player.ad.buyables[2] = new Decimal(0)
    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: "AD Upgrade I",
            unlocked() { return true },
            description: "Gives you 10 antimatter. Spend it wisely.",
            cost: new Decimal(0),
            currencyLocation() { return player.ad },
            currencyDisplayName: "Antimatter",
            currencyInternalName: "antimatter",
            onPurchase()
            {
                player.ad.antimatter = new Decimal(10)
            }
        },
        12:
        {
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
        },
        14:
        {
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
        },
        15:
        {
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
        },
        16:
        {
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
        },
        17:
        {
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
        },
        18:
        {
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
        },
        19:
        {
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
        },
        21:
        {
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
            purchaseLimit() { return !hasChallenge("ip", 18) ? new Decimal(6) : new Decimal(Infinity) },
            currency() {
                if (getBuyableAmount(this.layer, this.id).eq(0)) {
                    return player.ad.dimensionAmounts[3]
                } else if (getBuyableAmount(this.layer, this.id).eq(1)) {
                    return player.ad.dimensionAmounts[4]
                } else if (getBuyableAmount(this.layer, this.id).eq(2)) {
                    return player.ad.dimensionAmounts[5]
                } else if (getBuyableAmount(this.layer, this.id).eq(3)) {
                    return player.ad.dimensionAmounts[6]
                } else {
                    return player.ad.dimensionAmounts[7]
                }
            },
            effect(x) {
                let mult = new Decimal(2).mul(buyableEffect("ca", 21))
                if (hasUpgrade("ev2", 11)) mult = mult.mul(upgradeEffect("ev2", 11))
                return mult.pow(getBuyableAmount(this.layer, this.id))
            },
            unlocked() { return true },
            cost(x) {
                if (getBuyableAmount(this.layer, this.id).lt(4)) {
                    return new Decimal(2)
                } else {
                    return getBuyableAmount(this.layer, this.id).sub(4).mul(2).add(2)
                }
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                if (hasChallenge("ip", 18)) {
                    return "<h3>" + getBuyableAmount(this.layer, this.id) + " Dimension Boosts"
                } else {
                    return "<h3>" + getBuyableAmount(this.layer, this.id) + "/" + this.purchaseLimit() + " Dimension Boosts"
                }
            },
            display() {
                let dimtext = ""
                if (getBuyableAmount(this.layer, this.id).eq(0)) {
                    dimtext = " 4th dimensions."
                } else if (getBuyableAmount(this.layer, this.id).eq(1)) {
                    dimtext = " 5th dimensions."
                } else if (getBuyableAmount(this.layer, this.id).eq(2)) {
                    dimtext = " 6th dimensions."
                } else if (getBuyableAmount(this.layer, this.id).eq(3)) {
                    dimtext = " 7th dimensions."
                } else {
                    dimtext = " 8th dimensions."
                }
                return "<h3>Which gives x" + format(tmp[this.layer].buyables[this.id].effect) + " to dimensions.\n\
                    Req: " + format(tmp[this.layer].buyables[this.id].cost) + dimtext
            },
            buy() {
                    if (!hasUpgrade("bi", 112)) layers.ad.dimBoostReset()

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { width: '300px', height: '75px', borderRadius: '10px'}
        },
        3: {
            costBase() { return new Decimal(1) },
            costMult() { return new Decimal(4) },
            effectBase() {return new Decimal(0.01)},
            purchaseLimit() { return !hasChallenge("ip", 18) ? new Decimal(1) : new Decimal(16) },
            currency() { return player.ad.dimensionAmounts[7]},
            effect(x) { return this.effectBase().mul(player.ca.galaxyDustEffect).mul(getBuyableAmount(this.layer, this.id).add(player.ca.replicantiGalaxies)) },
            unlocked() { return true },
            cost(x) { return (x || getBuyableAmount(this.layer, this.id)).add(this.costBase()).mul(this.costMult())},
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "<h3>" + getBuyableAmount(this.layer, this.id) + "/" + this.purchaseLimit() + " Antimatter Galaxies"
            },
            display() {
                return "<h3>Which gives +" + format(tmp[this.layer].buyables[this.id].effect) + " to tickspeed base.\n\
                    Req: " + format(tmp[this.layer].buyables[this.id].cost) + " 8th dimensions."
            },
            buy() {
                    if (!hasUpgrade("bi", 112)) layers.ad.galaxyReset()

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { width: '300px', height: '75px', borderRadius: '10px'}
        },
        11: {
            costBase() { return new Decimal(10) },
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
            costBase() { return new Decimal(100) },
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
            costBase() { return new Decimal(1e4) },
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
            costBase() { return new Decimal(1e6) },
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
            },
            style: { width: '175px', height: '50px', borderRadius: '10px'}
        },
        15: {
            costBase() { return new Decimal(1e9) },
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
            costBase() { return new Decimal(1e13) },
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
            costBase() { return new Decimal(1e18) },
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
            costBase() { return new Decimal(1e24) },
            costGrowth() { return player.ad.dimensionGrowths[7]},
            currency() { return player.ad.antimatter},
            pay(amt) { player.ad.antimatter = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("ad", 2).gte(4) },
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
    milestones: {

    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "5px" }},
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16]]],
                    ["row", [["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 21]]],
                ]

            },
            "Dimensions": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["buyable", 1], ["clickable", 2], ["clickable", 3], ["clickable", 4]]],
                    ["blank", "25px"],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return "1st dimension (" + format(buyableEffect("ad", "11")) + "x): " + format(player.ad.dimensionAmounts[0]) + " (+" + format(player.ad.dimensionsPerSecond[0]) + "/s)"}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 11],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return "2nd dimension (" + format(buyableEffect("ad", "12")) + "x): " + format(player.ad.dimensionAmounts[1]) + " (+" + format(player.ad.dimensionsPerSecond[1]) + "/s)"}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 12],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return "3rd dimension (" + format(buyableEffect("ad", "13")) + "x): " + format(player.ad.dimensionAmounts[2]) + " (+" + format(player.ad.dimensionsPerSecond[2]) + "/s)"}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 13],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return "4th dimension (" + format(buyableEffect("ad", "14")) + "x): " + format(player.ad.dimensionAmounts[3]) + " (+" + format(player.ad.dimensionsPerSecond[3]) + "/s)"}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 14],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("ad", 2).gte(1) ? "5th dimension (" + format(buyableEffect("ad", "15")) + "x): " + format(player.ad.dimensionAmounts[4]) + " (+" + format(player.ad.dimensionsPerSecond[4]) + "/s)" : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 15],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("ad", 2).gte(2) ? "6th dimension (" + format(buyableEffect("ad", "16")) + "x): " + format(player.ad.dimensionAmounts[5]) + " (+" + format(player.ad.dimensionsPerSecond[5]) + "/s)" : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 16],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("ad", 2).gte(3) ? "7th dimension (" + format(buyableEffect("ad", "17")) + "x): " + format(player.ad.dimensionAmounts[6]) + " (+" + format(player.ad.dimensionsPerSecond[6]) + "/s)" : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 17],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("ad", 2).gte(4) ? "8th dimension (" + format(buyableEffect("ad", "18")) + "x): " + format(player.ad.dimensionAmounts[7]) : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 18],
                    ]],
                    ["blank", "25px"],
                    ["row", [["buyable", 2], ["buyable", 3]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return !hasChallenge("ip", 18) ?  "Progress gets halted at 1e300 antimatter." : "" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["raw-html", function () { return hasChallenge("ip", 18) ?  "Progress gets softcapped at 1e300 antimatter." : "" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
    ]

            },
            "Reverse Break": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return getLevelableAmount("pet", 1101).gte(1) },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 13], ["clickable", 14]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 15]]],
                    ["raw-html", function () { return "(+" + format(player.ta.negativeInfinityPointsToGet) + " NIP)" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                ]

            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ad.antimatter) + "</h3> antimatter, which boosts points by x" + format(player.ad.antimatterEffect) + " (based on points and antimatter)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.ad.antimatterPerSecond) + "</h3> antimatter per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return (player.startedGame == true && player.in.unlockedInfinity && hasUpgrade("ip", 11)) || hasMilestone("s", 19)}
})

// my friend ice LOVES copying and stealing game ideas to put in his own games
