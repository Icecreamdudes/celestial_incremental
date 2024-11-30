addLayer("f", {
    name: "Factors", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        factorBase: new Decimal(0.05),
        factorUnlocks: [true, true, true, false, false, false, false, false],

        factorPower: new Decimal(0),
        factorPowerEffect: new Decimal(1),
        factorPowerPerSecond: new Decimal(0),
        powerFactorUnlocks: [true, true, true, false, false, false, false, false],

        //tree
        treeFactorUnlocks: [true, true, true, false, false, false, false, false],

        //grass
        grassFactorUnlocks: [false, false, false, false, false, false, false, false],

        //infinity points
        infinityFactorUnlocks: [true, true, true, true, true, true, true, true],

        // Buy Max Toggles
        mfactorMax: false,
        pfactorMax: false,
        tfactorMax: false,
        gfactorMax: false,
        ifactorMax: false,
        nfactorMax: false,
    }
    },
    automate() {
        if (hasUpgrade("p", 15))
        {
            buyBuyable("f", 11)
            buyBuyable("f", 12)
            buyBuyable("f", 13)
            buyBuyable("f", 14)
            buyBuyable("f", 15)
            buyBuyable("f", 16)
            buyBuyable("f", 17)
            buyBuyable("f", 18)
        }
        if (hasUpgrade("p", 21))
        {
            buyBuyable("f", 19)
            buyBuyable("f", 21)
            buyBuyable("f", 22)
            buyBuyable("f", 23)
            buyBuyable("f", 24)
            buyBuyable("f", 25)
            buyBuyable("f", 26)
            buyBuyable("f", 27)
        }
        if (hasMilestone("r", 16))
        {
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
        if (hasUpgrade("bi", 103))
        {
            buyBuyable("f", 41)
            buyBuyable("f", 42)
            buyBuyable("f", 43)
            buyBuyable("f", 44)
            buyBuyable("f", 45)
            buyBuyable("f", 46)
            buyBuyable("f", 47)
            buyBuyable("f", 48)
        }
        if (hasUpgrade("bi", 13))
        {
            buyBuyable("f", 51)
            buyBuyable("f", 52)
            buyBuyable("f", 53)
            buyBuyable("f", 54)
            buyBuyable("f", 55)
            buyBuyable("f", 56)
            buyBuyable("f", 57)
            buyBuyable("f", 58)
        }
    },
    nodeStyle() {
    },
    tooltip: "Factors",
    color() { return "#83cecf" },
    branches: ["r"],
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.r.tier.gte(2))
        [
            player.f.factorUnlocks[3] = true
        ]
        if (player.r.tier.gte(4))
        [
            player.f.factorUnlocks[4] = true
        ]
        if (player.r.tetr.gte(2) && player.f.factorUnlocks[4] == true)
        [
            player.f.factorUnlocks[5] = true
        ]
        if (hasUpgrade("p", 13) && player.f.factorUnlocks[5] == true)
        [
            player.f.factorUnlocks[6] = true
        ]
        if (player.r.tetr.gte(4) && player.f.factorUnlocks[6] == true)
        [
            player.f.factorUnlocks[7] = true
        ]

        //Power
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
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(player.cb.commonPetEffects[2][0])
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(player.d.diceEffects[1])
        if (hasUpgrade("p", 16)) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(upgradeEffect("p", 16))
        if (hasUpgrade("ip", 14) && !inChallenge("ip", 14)) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(upgradeEffect("ip", 14))
        if (hasUpgrade("ip", 21) && !inChallenge("ip", 14)) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(upgradeEffect("ip", 21))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.div(player.pe.pestEffect[1])
        if (inChallenge("ip", 13)) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.pow(0.7)
        if (inChallenge("ip", 13) || player.po.hex) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("h", 11))
        if (player.pol.pollinatorsIndex == 2) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(player.pol.pollinatorsEffect[2])
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.div(player.po.halterEffects[1])

        player.f.factorPower = player.f.factorPower.add(player.f.factorPowerPerSecond.mul(delta))
        player.f.factorPowerEffect = player.f.factorPower.pow(0.5).div(3).add(1)

        if (player.p.prestigePoints.gte(10000))
        {
            player.f.powerFactorUnlocks[3] = true
        }
        if (player.points.gte(1e14) && player.f.powerFactorUnlocks[3] == true)
        {
            player.f.powerFactorUnlocks[4] = true
        }
        if (player.r.tetr.gte(11) && player.f.powerFactorUnlocks[4] == true)
        {
            player.f.powerFactorUnlocks[5] = true
        }
        if (player.t.trees.gte(25) && player.f.powerFactorUnlocks[5] == true)
        {
            player.f.powerFactorUnlocks[6] = true
        }
        if (hasUpgrade("p", 19) && player.f.powerFactorUnlocks[6] == true)
        {
            player.f.powerFactorUnlocks[7] = true
        }

        if (hasUpgrade("p", 23))
        {
            player.f.treeFactorUnlocks[3] = true
        }
        if (hasUpgrade("g", 17) && player.f.treeFactorUnlocks[3] == true)
        {
            player.f.treeFactorUnlocks[4] = true
        }
        if (hasMilestone("r", 13) && player.f.treeFactorUnlocks[4] == true)
        {
            player.f.treeFactorUnlocks[5] = true
        }
        if (player.m.mods.gte(20) && player.f.treeFactorUnlocks[5] == true)
        {
            player.f.treeFactorUnlocks[6] = true
        }
        if (hasMilestone("r", 16) && player.f.treeFactorUnlocks[6] == true)
        {
            player.f.treeFactorUnlocks[7] = true
        }

        for (let i = 0; i < player.f.grassFactorUnlocks.length; i++)
        {
            if (player.gh.buyables[15].gt(i))
            {
                player.f.grassFactorUnlocks[i] = true
            }
        }

        player.f.factorBase = new Decimal(0.05)
        player.f.factorBase = player.f.factorBase.add(buyableEffect("gh", 16))
        if (hasUpgrade("ad", 19)) player.f.factorBase = player.f.factorBase.add(upgradeEffect("ad", 19))
        if (player.pol.pollinatorsIndex == 1) player.f.factorBase = player.f.factorBase.mul(player.pol.pollinatorsEffect[1])
        player.f.factorBase = player.f.factorBase.mul(buyableEffect("rm", 22))
        //INF


    },

    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "i"
            },
            style: { width: '100px', "min-height": '50px' },
        },
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
    bars: {
    },
    upgrades: {
    },
    buyables: {
        // Grass Factors
        1: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.fertilizer},
            pay(amt) { player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[0] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Grass Factor I"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                if (player.f.gfactorMax == false && !hasMilestone("r", 16)) {
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
            style: { width: '275px', height: '150px', }
        },
        2: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.22) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.fertilizer},
            pay(amt) { player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[1] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Grass Factor II"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                if (player.f.gfactorMax == false && !hasMilestone("r", 16)) {
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
            style: { width: '275px', height: '150px', }
        },
        3: {
            costBase() { return new Decimal(180) },
            costGrowth() { return new Decimal(1.24) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.fertilizer},
            pay(amt) { player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[2] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Grass Factor III"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                if (player.f.gfactorMax == false && !hasMilestone("r", 16)) {
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
            style: { width: '275px', height: '150px', }
        },
        4: {
            costBase() { return new Decimal(340) },
            costGrowth() { return new Decimal(1.26) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.fertilizer},
            pay(amt) { player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[3] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Grass Factor IV"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                if (player.f.gfactorMax == false && !hasMilestone("r", 16)) {
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
            style: { width: '275px', height: '150px', }
        },
        5: {
            costBase() { return new Decimal(800) },
            costGrowth() { return new Decimal(1.28) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.fertilizer},
            pay(amt) { player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[4] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Grass Factor V"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                if (player.f.gfactorMax == false && !hasMilestone("r", 16)) {
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
            style: { width: '275px', height: '150px', }
        },
        6: {
            costBase() { return new Decimal(2000) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.fertilizer},
            pay(amt) { player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[5] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Grass Factor VI"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                if (player.f.gfactorMax == false && !hasMilestone("r", 16)) {
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
            style: { width: '275px', height: '150px', }
        },
        7: {
            costBase() { return new Decimal(5000) },
            costGrowth() { return new Decimal(1.32) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.fertilizer},
            pay(amt) { player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[6] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Grass Factor VII"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                if (player.f.gfactorMax == false && !hasMilestone("r", 16)) {
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
            style: { width: '275px', height: '150px', }
        },
        8: {
            costBase() { return new Decimal(14000) },
            costGrowth() { return new Decimal(1.34) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.gh.fertilizer},
            pay(amt) { player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[7] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Grass Factor VIII"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                if (player.f.gfactorMax == false && !hasMilestone("r", 16)) {
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
            style: { width: '275px', height: '150px', }
        },
        // Main Factors
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[0] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Factor I"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                if (player.f.mfactorMax == false && !hasUpgrade("p", 15)) {
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
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.28) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[1] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Factor II"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                if (player.f.mfactorMax == false && !hasUpgrade("p", 15)) {
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
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(60) },
            costGrowth() { return new Decimal(1.31) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[2] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Factor III"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                if (player.f.mfactorMax == false && !hasUpgrade("p", 15)) {
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
            style: { width: '275px', height: '150px', }
        },
        14: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(1.34) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[3] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Factor IV"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                if (player.f.mfactorMax == false && !hasUpgrade("p", 15)) {
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
            style: { width: '275px', height: '150px', }
        },
        15: {
            costBase() { return new Decimal(800) },
            costGrowth() { return new Decimal(1.37) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[4] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Factor V"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                if (player.f.mfactorMax == false && !hasUpgrade("p", 15)) {
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
            style: { width: '275px', height: '150px', }
        },
        16: {
            costBase() { return new Decimal(3000) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[5] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Factor VI"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                if (player.f.mfactorMax == false && !hasUpgrade("p", 15)) {
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
            style: { width: '275px', height: '150px', }
        },
        17: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(1.43) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[6] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Factor VII"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                if (player.f.mfactorMax == false && !hasUpgrade("p", 15)) {
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
            style: { width: '275px', height: '150px', }
        },
        18: {
            costBase() { return new Decimal(50000) },
            costGrowth() { return new Decimal(1.46) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[7] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Factor VIII"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                if (player.f.mfactorMax == false && !hasUpgrade("p", 15)) {
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
            style: { width: '275px', height: '150px', }
        },
        // Power Factors
        19: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Power Factor I"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                if (player.f.pfactorMax == false && !hasUpgrade("p", 21)) {
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
            style: { width: '275px', height: '150px', }
        },
        21: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Power Factor II"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                if (player.f.pfactorMax == false && !hasUpgrade("p", 21)) {
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
            style: { width: '275px', height: '150px', }
        },
        22: {
            costBase() { return new Decimal(1500) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Power Factor III"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                if (player.f.pfactorMax == false && !hasUpgrade("p", 21)) {
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
            style: { width: '275px', height: '150px', }
        },
        23: {
            costBase() { return new Decimal(4000) },
            costGrowth() { return new Decimal(1.45) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return player.f.powerFactorUnlocks[3] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Power Factor IV"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                if (player.f.pfactorMax == false && !hasUpgrade("p", 21)) {
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
            style: { width: '275px', height: '150px', }
        },
        24: {
            costBase() { return new Decimal(9000) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return player.f.powerFactorUnlocks[4] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Power Factor V"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                if (player.f.pfactorMax == false && !hasUpgrade("p", 21)) {
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
            style: { width: '275px', height: '150px', }
        },
        25: {
            costBase() { return new Decimal(25000) },
            costGrowth() { return new Decimal(1.55) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return player.f.powerFactorUnlocks[5] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Power Factor VI"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                if (player.f.pfactorMax == false && !hasUpgrade("p", 21)) {
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
            style: { width: '275px', height: '150px', }
        },
        26: {
            costBase() { return new Decimal(75000) },
            costGrowth() { return new Decimal(1.60) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return player.f.powerFactorUnlocks[6] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Power Factor VII"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                if (player.f.pfactorMax == false && !hasUpgrade("p", 21)) {
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
            style: { width: '275px', height: '150px', }
        },
        27: {
            costBase() { return new Decimal(300000) },
            costGrowth() { return new Decimal(1.65) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return player.f.powerFactorUnlocks[7] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Power Factor VIII"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                if (player.f.pfactorMax == false && !hasUpgrade("p", 21)) {
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
            style: { width: '275px', height: '150px', }
        },
        // Tree Factors
        28: {
            costBase() { return new Decimal(30) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[0] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Tree Factor I"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                if (player.f.tfactorMax == false && !hasMilestone("r", 16)) {
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
            style: { width: '275px', height: '150px', }
        },
        29: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.23) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[1] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Tree Factor II"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                if (player.f.tfactorMax == false && !hasMilestone("r", 16)) {
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
            style: { width: '275px', height: '150px', }
        },
        31: {
            costBase() { return new Decimal(80) },
            costGrowth() { return new Decimal(1.26) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[2] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Tree Factor III"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                if (player.f.tfactorMax == false && !hasMilestone("r", 16)) {
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
            style: { width: '275px', height: '150px', }
        },
        32: {
            costBase() { return new Decimal(160) },
            costGrowth() { return new Decimal(1.29) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[3] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Tree Factor IV"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                if (player.f.tfactorMax == false && !hasMilestone("r", 16)) {
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
            style: { width: '275px', height: '150px', }
        },
        33: {
            costBase() { return new Decimal(400) },
            costGrowth() { return new Decimal(1.32) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[4] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Tree Factor V"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                if (player.f.tfactorMax == false && !hasMilestone("r", 16)) {
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
            style: { width: '275px', height: '150px', }
        },
        34: {
            costBase() { return new Decimal(20000) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[5] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Tree Factor VI"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                if (player.f.tfactorMax == false && !hasMilestone("r", 16)) {
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
            style: { width: '275px', height: '150px', }
        },
        35: {
            costBase() { return new Decimal(1e6) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[6] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Tree Factor VII"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                if (player.f.tfactorMax == false && !hasMilestone("r", 16)) {
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
            style: { width: '275px', height: '150px', }
        },
        36: {
            costBase() { return new Decimal(1e12) },
            costGrowth() { return new Decimal(1.45) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.g.grass},
            pay(amt) { player.g.grass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[7] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/2,500<br/> Tree Factor VIII"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                if (player.f.tfactorMax == false && !hasMilestone("r", 16)) {
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
            style: { width: '275px', height: '150px', }
        },
        // Infinity Factors
        41: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.ta.negativeInfinityPoints},
            pay(amt) { player.ta.negativeInfinityPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return player.f.infinityFactorUnlocks[0] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/250<br/> Infinity Factor I"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                if (player.f.ifactorMax == false && !hasUpgrade("bi", 103)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 103)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        42: {
            costBase() { return new Decimal(30) },
            costGrowth() { return new Decimal(1.22) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.ta.negativeInfinityPoints},
            pay(amt) { player.ta.negativeInfinityPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return player.f.infinityFactorUnlocks[1] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/250<br/> Infinity Factor II"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                if (player.f.ifactorMax == false && !hasUpgrade("bi", 103)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 103)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        43: {
            costBase() { return new Decimal(45) },
            costGrowth() { return new Decimal(1.24) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.ta.negativeInfinityPoints},
            pay(amt) { player.ta.negativeInfinityPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return player.f.infinityFactorUnlocks[2] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/250<br/> Infinity Factor III"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                if (player.f.ifactorMax == false && !hasUpgrade("bi", 103)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 103)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        44: {
            costBase() { return new Decimal(80) },
            costGrowth() { return new Decimal(1.26) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.ta.negativeInfinityPoints},
            pay(amt) { player.ta.negativeInfinityPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return player.f.infinityFactorUnlocks[3] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/250<br/> Infinity Factor IV"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                if (player.f.ifactorMax == false && !hasUpgrade("bi", 103)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 103)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        45: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(1.28) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.ta.negativeInfinityPoints},
            pay(amt) { player.ta.negativeInfinityPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return player.f.infinityFactorUnlocks[4] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/250<br/> Infinity Factor V"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                if (player.f.ifactorMax == false && !hasUpgrade("bi", 103)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 103)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        46: {
            costBase() { return new Decimal(550) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.ta.negativeInfinityPoints},
            pay(amt) { player.ta.negativeInfinityPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return player.f.infinityFactorUnlocks[5] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/250<br/> Infinity Factor VI"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                if (player.f.ifactorMax == false && !hasUpgrade("bi", 103)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 103)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        47: {
            costBase() { return new Decimal(1200) },
            costGrowth() { return new Decimal(1.32) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.ta.negativeInfinityPoints},
            pay(amt) { player.ta.negativeInfinityPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return player.f.infinityFactorUnlocks[6] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/250<br/> Infinity Factor VII"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                if (player.f.ifactorMax == false && !hasUpgrade("bi", 103)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 103)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        48: {
            costBase() { return new Decimal(2600) },
            costGrowth() { return new Decimal(1.34) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.ta.negativeInfinityPoints},
            pay(amt) { player.ta.negativeInfinityPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return player.f.infinityFactorUnlocks[7] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/250<br/> Infinity Factor VIII"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                if (player.f.ifactorMax == false && !hasUpgrade("bi", 103)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 103)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        // NIP Factors
        51: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.015).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/1,000<br/> Negative Infinity Factor I"
            },
            display() {
                return "which are boosting negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy() {
                if (player.f.nfactorMax == false && !hasUpgrade("bi", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        52: {
            costBase() { return new Decimal(18000) },
            costGrowth() { return new Decimal(1.13) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.015).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/1,000<br/> Negative Infinity Factor II"
            },
            display() {
                return "which are boosting negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy() {
                if (player.f.nfactorMax == false && !hasUpgrade("bi", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        53: {
            costBase() { return new Decimal(32000) },
            costGrowth() { return new Decimal(1.16) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.015).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/1,000<br/> Negative Infinity Factor III"
            },
            display() {
                return "which are boosting negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy() {
                if (player.f.nfactorMax == false && !hasUpgrade("bi", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        54: {
            costBase() { return new Decimal(60000) },
            costGrowth() { return new Decimal(1.19) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.015).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/1,000<br/> Negative Infinity Factor IV"
            },
            display() {
                return "which are boosting negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy() {
                if (player.f.nfactorMax == false && !hasUpgrade("bi", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        55: {
            costBase() { return new Decimal(110000) },
            costGrowth() { return new Decimal(1.22) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.015).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/1,000<br/> Negative Infinity Factor V"
            },
            display() {
                return "which are boosting negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy() {
                if (player.f.nfactorMax == false && !hasUpgrade("bi", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        56: {
            costBase() { return new Decimal(270000) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.015).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/1,000<br/> Negative Infinity Factor VI"
            },
            display() {
                return "which are boosting negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy() {
                if (player.f.nfactorMax == false && !hasUpgrade("bi", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        57: {
            costBase() { return new Decimal(500000) },
            costGrowth() { return new Decimal(1.28) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.015).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/1,000<br/> Negative Infinity Factor VII"
            },
            display() {
                return "which are boosting negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy() {
                if (player.f.nfactorMax == false && !hasUpgrade("bi", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        58: {
            costBase() { return new Decimal(1200000) },
            costGrowth() { return new Decimal(1.31) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.015).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/1,000<br/> Negative Infinity Factor VIII"
            },
            display() {
                return "which are boosting negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy() {
                if (player.f.nfactorMax == false && !hasUpgrade("bi", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("bi", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
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
            "Main": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return player.f.factorUnlocks[3] == false ?  "Next factor unlocks at tier 2." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.factorUnlocks[3] == true && player.f.factorUnlocks[4] == false ?  "Next factor unlocks at tier 4." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.factorUnlocks[4] == true && player.f.factorUnlocks[5] == false ?  "Next factor unlocks at tetr 2." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.factorUnlocks[5] == true && player.f.factorUnlocks[6] == false ?  "Next factor unlocks at Prestige Upgrade III." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.factorUnlocks[6] == true && player.f.factorUnlocks[7] == false ?  "Next factor unlocks at tetr 4." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
                    ["row", [["buyable", 15], ["buyable", 16], ["buyable", 17], ["buyable", 18]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Total Mult: x" + format(buyableEffect("f", 11).mul(buyableEffect("f", 12).mul(buyableEffect("f", 13)).mul(buyableEffect("f", 14)).mul(buyableEffect("f", 15)).mul(buyableEffect("f", 16)).mul(buyableEffect("f", 17)).mul(buyableEffect("f", 18)))) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
            "Power": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasUpgrade("i", 15) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h2>You have " + format(player.f.factorPower) + " factor power." }, { "coslor": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h3>You are gaining " + format(player.f.factorPowerPerSecond) + " factor power per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h3>which boost celestial points by x" + format(player.f.factorPowerEffect) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>You have " + format(player.p.prestigePoints) + " prestige points." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.f.powerFactorUnlocks[3] == false ?  "Next factor unlocks at 10,000 prestige points." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.powerFactorUnlocks[3] == true && player.f.powerFactorUnlocks[4] == false ?  "Next factor unlocks at 1e14 celestial points." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.powerFactorUnlocks[4] == true && player.f.powerFactorUnlocks[5] == false ?  "Next factor unlocks at tetr 11." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.powerFactorUnlocks[5] == true && player.f.powerFactorUnlocks[6] == false ?  "Next factor unlocks at 25 trees." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.powerFactorUnlocks[6] == true && player.f.powerFactorUnlocks[7] == false ?  "Next factor unlocks at ???." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["clickable", 4], ["clickable", 5]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 19], ["buyable", 21], ["buyable", 22], ["buyable", 23]]],
                    ["row", [["buyable", 24], ["buyable", 25], ["buyable", 26], ["buyable", 27]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Total Mult: x" + format(buyableEffect("f", 19).mul(buyableEffect("f", 21).mul(buyableEffect("f", 22)).mul(buyableEffect("f", 23)).mul(buyableEffect("f", 24)).mul(buyableEffect("f", 25)).mul(buyableEffect("f", 26)).mul(buyableEffect("f", 27)))) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
            "Tree": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasMilestone("r", 11) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>You have " + format(player.g.grass) + " grass." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.f.treeFactorUnlocks[3] == false ?  "Next factor unlocks at Prestige Upgrade XII." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.treeFactorUnlocks[3] == true && player.f.treeFactorUnlocks[4] == false?  "Next factor unlocks at Grass Upgrade VII." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.treeFactorUnlocks[4] == true && player.f.treeFactorUnlocks[5] == false?  "Next factor unlocks at pent 3." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.treeFactorUnlocks[5] == true && player.f.treeFactorUnlocks[6] == false?  "Next factor unlocks at 20 mods." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.treeFactorUnlocks[6] == true && player.f.treeFactorUnlocks[7] == false?  "Next factor unlocks at pent 8." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["clickable", 6], ["clickable", 7]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 28], ["buyable", 29], ["buyable", 31], ["buyable", 32]]],
                    ["row", [["buyable", 33], ["buyable", 34], ["buyable", 35], ["buyable", 36]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Total Mult: x" + format(buyableEffect("f", 28).mul(buyableEffect("f", 29).mul(buyableEffect("f", 31)).mul(buyableEffect("f", 32)).mul(buyableEffect("f", 33)).mul(buyableEffect("f", 34)).mul(buyableEffect("f", 35)).mul(buyableEffect("f", 36)))) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
            "Grass": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return player.gh.buyables[15].gt(0) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>You have " + format(player.gh.fertilizer) + " fertilizer." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return (getBuyableAmount("gh", 15).lt(8)) ? "Factors unlock with Grass Study III.<br>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["clickable", 8], ["clickable", 9]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 1], ["buyable", 2], ["buyable", 3], ["buyable", 4]]],
                    ["row", [["buyable", 5], ["buyable", 6], ["buyable", 7], ["buyable", 8]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Total Mult: x" + format(buyableEffect("f", 1).mul(buyableEffect("f", 2).mul(buyableEffect("f", 3)).mul(buyableEffect("f", 4)).mul(buyableEffect("f", 5)).mul(buyableEffect("f", 6)).mul(buyableEffect("f", 7)).mul(buyableEffect("f", 8)))) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
            "Infinity": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasUpgrade("ta", 15)},
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>You have " + format(player.ta.negativeInfinityPoints) + " negative infinity points. (+" + format(player.ta.negativeInfinityPointsToGet) + ")"  }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h3>You have " + format(player.in.infinityPoints) + " infinity points. (+" + format(player.in.infinityPointsToGet) + ")" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11], ["clickable", 12]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 41], ["buyable", 42], ["buyable", 43], ["buyable", 44]]],
                    ["row", [["buyable", 45], ["buyable", 46], ["buyable", 47], ["buyable", 48]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Total Mult: x" + format(buyableEffect("f", 41).mul(buyableEffect("f", 42).mul(buyableEffect("f", 43)).mul(buyableEffect("f", 44)).mul(buyableEffect("f", 45)).mul(buyableEffect("f", 46)).mul(buyableEffect("f", 47)).mul(buyableEffect("f", 48)))) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],

                ]
            },
            "Negative Infinity": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasUpgrade("ta", 16)},
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>You have " + format(player.ta.negativeInfinityPoints) + " negative infinity points. (+" + format(player.ta.negativeInfinityPointsToGet) + ")"  }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h3>You have " + format(player.in.infinityPoints) + " infinity points. (+" + format(player.in.infinityPointsToGet) + ")" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 13], ["clickable", 14]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 51], ["buyable", 52], ["buyable", 53], ["buyable", 54]]],
                    ["row", [["buyable", 55], ["buyable", 56], ["buyable", 57], ["buyable", 58]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Total Mult: x" + format(buyableEffect("f", 51).mul(buyableEffect("f", 52).mul(buyableEffect("f", 53)).mul(buyableEffect("f", 54)).mul(buyableEffect("f", 55)).mul(buyableEffect("f", 56)).mul(buyableEffect("f", 57)).mul(buyableEffect("f", 58)))) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
        },
    },

    tabFormat: [
                        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.gain) + "</h3> celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 12)}
})
