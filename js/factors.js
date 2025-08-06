addLayer("f", {
    name: "Factors", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        factorBase: new Decimal(0.05),

        factorPower: new Decimal(0),
        factorPowerEffect: new Decimal(1),
        factorPowerPerSecond: new Decimal(0),

    }},
    automate() {
        if (hasUpgrade("p", 15)) {
            buyBuyable("f", 11)
            buyBuyable("f", 12)
            buyBuyable("f", 13)
            buyBuyable("f", 14)
            buyBuyable("f", 15)
            buyBuyable("f", 16)
            buyBuyable("f", 17)
            buyBuyable("f", 18)
        }
        if (hasUpgrade("p", 21)) {
            buyBuyable("f", 19)
            buyBuyable("f", 21)
            buyBuyable("f", 22)
            buyBuyable("f", 23)
            buyBuyable("f", 24)
            buyBuyable("f", 25)
            buyBuyable("f", 26)
            buyBuyable("f", 27)
        }
        if (hasMilestone("r", 16)) {
            buyBuyable("f", 1)
            buyBuyable("f", 2)
            buyBuyable("f", 3)
            buyBuyable("f", 4)
            buyBuyable("f", 5)
            buyBuyable("f", 6)
            buyBuyable("f", 7)
            buyBuyable("f", 8)
            buyBuyable("f", 28)
            buyBuyable("f", 29)
            buyBuyable("f", 31)
            buyBuyable("f", 32)
            buyBuyable("f", 33)
            buyBuyable("f", 34)
            buyBuyable("f", 35)
            buyBuyable("f", 36)
        }
    },
    nodeStyle() {},
    tooltip: "Factors",
    color() { return "#83cecf" },
    branches: ["r"],
    update(delta) {
        let onepersec = new Decimal(1)

        // START OF FACTOR POWER MODIFIERS
        if (hasUpgrade("i", 15)) player.f.factorPowerPerSecond = onepersec
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 19))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 21))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 22))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 23))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 24))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 25))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 26))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 27))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("t", 16))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("g", 15))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(player.gh.grasshopperEffects[1])
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("m", 14))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(levelableEffect("pet", 103)[0])
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(player.d.diceEffects[1])
        if (hasUpgrade("p", 16)) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(upgradeEffect("p", 16))
        if (hasUpgrade("ip", 14) && !inChallenge("ip", 14)) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(upgradeEffect("ip", 14))
        if (hasUpgrade("ip", 21) && !inChallenge("ip", 14)) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(upgradeEffect("ip", 21))
        if (inChallenge("ip", 13) || player.po.hex) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(player.hre.refinementEffect[0][1])
        
        // CHALLENGE MODIFIERS
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.div(player.pe.pestEffect[1])
        if (inChallenge("ip", 13)) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.pow(0.7)

        // CONTINUED REGULAR MODIFIERS
        if (player.pol.pollinatorEffects.fly.enabled) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(player.pol.pollinatorEffects.fly.effects[0])
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(player.i.preOTFMult)
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(player.co.cores.point.effect[0])

        // POWER MODIFIERS
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.pow(buyableEffect("fu", 32))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.pow(player.co.cores.factor.effect[1])

        // ABNORMAL MODIFIERS, PLACE NEW MODIFIERS BEFORE THIS
        if (player.f.factorPowerPerSecond.gte("1e50000")) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.div("1e50000").pow(0.2).mul("1e50000")
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.div(player.po.halterEffects[1])
        if (player.r.timeReversed) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(0)
        
        // FACTOR POWER PER SECOND
        player.f.factorPower = player.f.factorPower.add(player.f.factorPowerPerSecond.mul(delta))

        // FACTOR POWER EFFECT
        player.f.factorPowerEffect = player.f.factorPower.pow(0.5).div(3).add(1)

        //----------------------------------------

        // FACTOR BASE MODIFIERS
        player.f.factorBase = new Decimal(0.05)
        player.f.factorBase = player.f.factorBase.add(buyableEffect("gh", 16))
        if (hasUpgrade("ad", 19)) player.f.factorBase = player.f.factorBase.add(upgradeEffect("ad", 19))
        if (player.pol.pollinatorEffects.beetle.enabled) player.f.factorBase = player.f.factorBase.mul(player.pol.pollinatorEffects.beetle.effects[1])
        if (hasUpgrade("hpw", 1013)) player.f.factorBase = player.f.factorBase.mul(120)
        player.f.factorBase = player.f.factorBase.mul(player.co.cores.factor.effect[2])
    },
    clickables: {
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.f.mfactorMax == false },
            unlocked() { return true },
            onClick() {
                player.f.mfactorMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.f.mfactorMax == true  },
            unlocked() { return true },
            onClick() {
                player.f.mfactorMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        4: {
            title() { return "Buy Max On" },
            canClick() { return player.f.pfactorMax == false },
            unlocked() { return true },
            onClick() {
                player.f.pfactorMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        5: {
            title() { return "Buy Max Off" },
            canClick() { return player.f.pfactorMax == true  },
            unlocked() { return true },
            onClick() {
                player.f.pfactorMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        6: {
            title() { return "Buy Max On" },
            canClick() { return player.f.tfactorMax == false },
            unlocked() { return true },
            onClick() {
                player.f.tfactorMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        7: {
            title() { return "Buy Max Off" },
            canClick() { return player.f.tfactorMax == true  },
            unlocked() { return true },
            onClick() {
                player.f.tfactorMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        8: {
            title() { return "Buy Max On" },
            canClick() { return player.f.gfactorMax == false },
            unlocked() { return true },
            onClick() {
                player.f.gfactorMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        9: {
            title() { return "Buy Max Off" },
            canClick() { return player.f.gfactorMax == true  },
            unlocked() { return true },
            onClick() {
                player.f.gfactorMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        11: {
            title() { return "Buy Max On" },
            canClick() { return player.f.ifactorMax == false },
            unlocked() { return true },
            onClick() {
                player.f.ifactorMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        12: {
            title() { return "Buy Max Off" },
            canClick() { return player.f.ifactorMax == true  },
            unlocked() { return true },
            onClick() {
                player.f.ifactorMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        13: {
            title() { return "Buy Max On" },
            canClick() { return player.f.nfactorMax == false },
            unlocked() { return true },
            onClick() {
                player.f.nfactorMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        14: {
            title() { return "Buy Max Off" },
            canClick() { return player.f.nfactorMax == true  },
            unlocked() { return true },
            onClick() {
                player.f.nfactorMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
    },
    bars: {},
    upgrades: {},
    buyables: {
        // Grass Factors
        1: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.fertilizer},
            pay(amt) { player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return player.gh.buyables[15].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass Factor I"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#119B35" }
        },
        2: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.22) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.fertilizer},
            pay(amt) { player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return player.gh.buyables[15].gte(2) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass Factor II"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#119B35" }
        },
        3: {
            costBase() { return new Decimal(180) },
            costGrowth() { return new Decimal(1.24) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.fertilizer},
            pay(amt) { player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return player.gh.buyables[15].gte(3) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass Factor III"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#119B35" }
        },
        4: {
            costBase() { return new Decimal(340) },
            costGrowth() { return new Decimal(1.26) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.fertilizer},
            pay(amt) { player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return player.gh.buyables[15].gte(4) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass Factor IV"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#119B35" }
        },
        5: {
            costBase() { return new Decimal(800) },
            costGrowth() { return new Decimal(1.28) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.fertilizer},
            pay(amt) { player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return player.gh.buyables[15].gte(5) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass Factor V"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#119B35" }
        },
        6: {
            costBase() { return new Decimal(2000) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.fertilizer},
            pay(amt) { player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return player.gh.buyables[15].gte(6) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass Factor VI"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#119B35" }
        },
        7: {
            costBase() { return new Decimal(5000) },
            costGrowth() { return new Decimal(1.32) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.fertilizer},
            pay(amt) { player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return player.gh.buyables[15].gte(7) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass Factor VII"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#119B35" }
        },
        8: {
            costBase() { return new Decimal(14000) },
            costGrowth() { return new Decimal(1.34) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.fertilizer},
            pay(amt) { player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return player.gh.buyables[15].gte(8) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass Factor VIII"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#119B35" }
        },
        // Main Factors
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Factor I"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("p", 15)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("p", 15)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#83cecf" }
        },
        12: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.28) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Factor II"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("p", 15)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("p", 15)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#83cecf" }
        },
        13: {
            costBase() { return new Decimal(60) },
            costGrowth() { return new Decimal(1.31) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Factor III"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("p", 15)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("p", 15)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#83cecf" }
        },
        14: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(1.34) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1).pow(buyableEffect("cs", 22))},
            unlocked() { return player.r.tier.gte(2) || player.r.tetr.gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Factor IV"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("p", 15)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("p", 15)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#83cecf" }
        },
        15: {
            costBase() { return new Decimal(800) },
            costGrowth() { return new Decimal(1.37) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return player.r.tier.gte(4) || player.r.tetr.gte(2) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Factor V"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("p", 15)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("p", 15)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#83cecf" }
        },
        16: {
            costBase() { return new Decimal(3000) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return player.r.tetr.gte(2) && tmp.f.buyables[15].unlocked },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Factor VI"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("p", 15)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("p", 15)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#83cecf" }
        },
        17: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(1.43) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return hasUpgrade("p", 13) && tmp.f.buyables[16].unlocked },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Factor VII"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("p", 15)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("p", 15)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#83cecf" }
        },
        18: {
            costBase() { return new Decimal(50000) },
            costGrowth() { return new Decimal(1.46) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return player.r.tetr.gte(4) && tmp.f.buyables[17].unlocked },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Factor VIII"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("p", 15)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("p", 15)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#83cecf" }
        },
        // Power Factors
        19: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Power Factor I"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("p", 21)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("p", 21)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#83cecf" }
        },
        21: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Power Factor II"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("p", 21)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("p", 21)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#83cecf" }
        },
        22: {
            costBase() { return new Decimal(1500) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Power Factor III"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("p", 21)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("p", 21)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#83cecf" }
        },
        23: {
            costBase() { return new Decimal(4000) },
            costGrowth() { return new Decimal(1.45) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return player.p.prestigePoints.gte(10000) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Power Factor IV"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("p", 21)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("p", 21)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#83cecf" }
        },
        24: {
            costBase() { return new Decimal(9000) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return player.points.gte(1e14) && tmp.f.buyables[23].unlocked },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Power Factor V"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("p", 21)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("p", 21)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#83cecf" }
        },
        25: {
            costBase() { return new Decimal(25000) },
            costGrowth() { return new Decimal(1.55) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return player.r.tetr.gte(10) && tmp.f.buyables[24].unlocked },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Power Factor VI"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("p", 21)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("p", 21)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#83cecf" }
        },
        26: {
            costBase() { return new Decimal(75000) },
            costGrowth() { return new Decimal(1.60) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return player.t.trees.gte(25) && tmp.f.buyables[25].unlocked },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Power Factor VII"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("p", 21)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("p", 21)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#83cecf" }
        },
        27: {
            costBase() { return new Decimal(300000) },
            costGrowth() { return new Decimal(1.65) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return hasUpgrade("p", 19) && tmp.f.buyables[26].unlocked },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Power Factor VIII"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("p", 21)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("p", 21)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#83cecf" }
        },
        // Tree Factors
        28: {
            costBase() { return new Decimal(30) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tree Factor I"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#3b844e" }
        },
        29: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.23) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tree Factor II"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#3b844e" }
        },
        31: {
            costBase() { return new Decimal(80) },
            costGrowth() { return new Decimal(1.26) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tree Factor III"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#3b844e" }
        },
        32: {
            costBase() { return new Decimal(160) },
            costGrowth() { return new Decimal(1.29) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return hasUpgrade("p", 23) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tree Factor IV"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#3b844e" }
        },
        33: {
            costBase() { return new Decimal(400) },
            costGrowth() { return new Decimal(1.32) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return hasUpgrade("g", 17) && tmp.f.buyables[32].unlocked },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tree Factor V"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#3b844e" }
        },
        34: {
            costBase() { return new Decimal(20000) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return hasMilestone("r", 13) && tmp.f.buyables[33].unlocked },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tree Factor VI"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#3b844e" }
        },
        35: {
            costBase() { return new Decimal(1e6) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return player.m.mods.gte(20) && tmp.f.buyables[34].unlocked },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tree Factor VII"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#3b844e" }
        },
        36: {
            costBase() { return new Decimal(1e12) },
            costGrowth() { return new Decimal(1.45) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 22)) },
            unlocked() { return hasMilestone("r", 16) && tmp.f.buyables[35].unlocked },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tree Factor VIII"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#3b844e" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { borderColor: "white", color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return !tmp.f.buyables[14].unlocked ?  "Next factor unlocks at tier 2." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return tmp.f.buyables[14].unlocked && !tmp.f.buyables[15].unlocked ?  "Next factor unlocks at tier 4." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return tmp.f.buyables[15].unlocked && !tmp.f.buyables[16].unlocked ?  "Next factor unlocks at tetr 2." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return tmp.f.buyables[16].unlocked && !tmp.f.buyables[17].unlocked ?  "Next factor unlocks at Prestige Upgrade III." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return tmp.f.buyables[17].unlocked && !tmp.f.buyables[18].unlocked ?  "Next factor unlocks at tetr 4." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14],
                        ["ex-buyable", 15], ["ex-buyable", 16], ["ex-buyable", 17], ["ex-buyable", 18]], {maxWidth: "1200px"}],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Total Mult: x" + format(buyableEffect("f", 11).mul(buyableEffect("f", 12).mul(buyableEffect("f", 13)).mul(buyableEffect("f", 14)).mul(buyableEffect("f", 15)).mul(buyableEffect("f", 16)).mul(buyableEffect("f", 17)).mul(buyableEffect("f", 18)))) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
            "Power": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("i", 15) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h2>You have " + format(player.f.factorPower) + " factor power." }, { "coslor": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["row", [
                        ["raw-html", function () { return "<h3>You are gaining " + format(player.f.factorPowerPerSecond) + " factor power per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ['raw-html', () => {return player.f.factorPowerPerSecond.gte("1e50000") ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "14px", fontFamily: "monospace", paddingLeft: "10px"}]
                    ]],
                    ["raw-html", function () { return "<h3>which boost celestial points by x" + format(player.f.factorPowerEffect) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>You have " + format(player.p.prestigePoints) + " prestige points." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return !tmp.f.buyables[23].unlocked ?  "Next factor unlocks at 10,000 prestige points." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return tmp.f.buyables[23].unlocked && !tmp.f.buyables[24].unlocked ?  "Next factor unlocks at 1e14 celestial points." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return tmp.f.buyables[24].unlocked && !tmp.f.buyables[25].unlocked ?  "Next factor unlocks at tetr 11." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return tmp.f.buyables[25].unlocked && !tmp.f.buyables[26].unlocked ?  "Next factor unlocks at 25 trees." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return tmp.f.buyables[26].unlocked && !tmp.f.buyables[27].unlocked ?  "Next factor unlocks at ???." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["style-row", [["ex-buyable", 19], ["ex-buyable", 21], ["ex-buyable", 22], ["ex-buyable", 23],
                        ["ex-buyable", 24], ["ex-buyable", 25], ["ex-buyable", 26], ["ex-buyable", 27]], {maxWidth: "1200px"}],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Total Mult: x" + format(buyableEffect("f", 19).mul(buyableEffect("f", 21).mul(buyableEffect("f", 22)).mul(buyableEffect("f", 23)).mul(buyableEffect("f", 24)).mul(buyableEffect("f", 25)).mul(buyableEffect("f", 26)).mul(buyableEffect("f", 27)))) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
            "Tree": {
                buttonStyle() { return { borderColor: "#0B6623", color: "white", borderRadius: "5px" } },
                unlocked() { return hasMilestone("r", 11) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>You have " + format(player.g.grass) + " grass." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return !tmp.f.buyables[31].unlocked ?  "Next factor unlocks at Prestige Upgrade XII." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return tmp.f.buyables[31].unlocked && !tmp.f.buyables[32].unlocked ?  "Next factor unlocks at Grass Upgrade VII." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return tmp.f.buyables[32].unlocked && !tmp.f.buyables[33].unlocked ?  "Next factor unlocks at pent 3." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return tmp.f.buyables[33].unlocked && !tmp.f.buyables[34].unlocked ?  "Next factor unlocks at 20 mods." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return tmp.f.buyables[34].unlocked && !tmp.f.buyables[35].unlocked ?  "Next factor unlocks at pent 8." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["style-row", [["ex-buyable", 28], ["ex-buyable", 29], ["ex-buyable", 31], ["ex-buyable", 32],
                        ["ex-buyable", 33], ["ex-buyable", 34], ["ex-buyable", 35], ["ex-buyable", 36]], {maxWidth: "1200px"}],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Total Mult: x" + format(buyableEffect("f", 28).mul(buyableEffect("f", 29).mul(buyableEffect("f", 31)).mul(buyableEffect("f", 32)).mul(buyableEffect("f", 33)).mul(buyableEffect("f", 34)).mul(buyableEffect("f", 35)).mul(buyableEffect("f", 36)))) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
            "Grass": {
                buttonStyle() { return { borderColor: "#119B35", color: "white", borderRadius: "5px" } },
                unlocked() { return player.gh.buyables[15].gt(0) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>You have " + format(player.gh.fertilizer) + " fertilizer." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return (getBuyableAmount("gh", 15).lt(8)) ? "Factors unlock with Grass Study III.<br>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["style-row", [["ex-buyable", 1], ["ex-buyable", 2], ["ex-buyable", 3], ["ex-buyable", 4],
                        ["ex-buyable", 5], ["ex-buyable", 6], ["ex-buyable", 7], ["ex-buyable", 8]], {maxWidth: "1200px"}],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Total Mult: x" + format(buyableEffect("f", 1).mul(buyableEffect("f", 2).mul(buyableEffect("f", 3)).mul(buyableEffect("f", 4)).mul(buyableEffect("f", 5)).mul(buyableEffect("f", 6)).mul(buyableEffect("f", 7)).mul(buyableEffect("f", 8)))) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.gain) + "</h3> celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 12)}
})
