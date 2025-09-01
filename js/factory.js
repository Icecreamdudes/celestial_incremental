addLayer("fa", {
    name: "Factory", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "FA", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        foundryEffect: new Decimal(1),
        foundryEffectPerSecond: new Decimal(0),
        foundryEffectMax: new Decimal(10000),

        charge: new Decimal(0),
        chargeRate: new Decimal(0),
        bestCharge: new Decimal(0),

        factoryMax: false,
        foundryMax: false,
        generatorMax: false,

        milestoneEffect: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), 
            new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), ]
    }},
    automate() {},
    nodeStyle() {
        return {
            "background": "gray",
            "background-origin": "border-box",
            "color": "black",
            "border-color": "white",
        }
    },
    branches: ["oi"],
    tooltip: "Factory",
    color: "gray",
    update(delta) {
        let onepersec = new Decimal(1)

        player.fa.foundryEffectPerSecond = new Decimal(0)
        if (player.fa.buyables[11].gte(1)) player.fa.foundryEffectPerSecond = new Decimal(1)
        player.fa.foundryEffectPerSecond = player.fa.foundryEffectPerSecond.mul(buyableEffect("fa", 11))
        player.fa.foundryEffectPerSecond = player.fa.foundryEffectPerSecond.mul(buyableEffect("fa", 103))
        player.fa.foundryEffectPerSecond = player.fa.foundryEffectPerSecond.mul(buyableEffect("fa", 104))

        player.fa.foundryEffectMax = new Decimal(10000)
        player.fa.foundryEffectMax = player.fa.foundryEffectMax.mul(buyableEffect("fa", 11))
        player.fa.foundryEffectMax = player.fa.foundryEffectMax.mul(buyableEffect("fa", 101))
        player.fa.foundryEffectMax = player.fa.foundryEffectMax.mul(buyableEffect("fa", 102))
    
        if (player.fa.foundryEffect.lt(player.fa.foundryEffectMax)) {
            player.fa.foundryEffect = player.fa.foundryEffect.add(player.fa.foundryEffectPerSecond.mul(delta))
        } else {
            player.fa.foundryEffect = player.fa.foundryEffectMax
        }

        if (player.fa.charge.gte(player.fa.bestCharge)) {
            player.fa.bestCharge = player.fa.charge
        }

        player.fa.chargeRate = player.fa.buyables[11].add(1)
        player.fa.chargeRate = player.fa.chargeRate.mul(player.fa.buyables[12].add(1))
        player.fa.chargeRate = player.fa.chargeRate.mul(player.fa.buyables[13].add(1))
        player.fa.chargeRate = player.fa.chargeRate.mul(buyableEffect("fa", 13))
        player.fa.chargeRate = player.fa.chargeRate.mul(buyableEffect("fa", 206))
        player.fa.chargeRate = player.fa.chargeRate.mul(buyableEffect("fa", 207))
        player.fa.chargeRate = player.fa.chargeRate.mul(buyableEffect("fa", 208))
        if (hasMilestone("fa", 21)) player.fa.chargeRate = player.fa.chargeRate.mul(player.fa.milestoneEffect[9])
        player.fa.chargeRate = player.fa.chargeRate.mul(player.le.punchcardsPassiveEffect[5])
        player.fa.chargeRate = player.fa.chargeRate.mul(buyableEffect("st", 105))
        player.fa.chargeRate = player.fa.chargeRate.mul(player.i.postOTFMult)

        // AUTOMATION
        if (player.fa.buyables[13].gte(1)) player.fa.charge = player.fa.charge.add(player.fa.chargeRate.mul(delta))

        player.fa.milestoneEffect[0] = player.fa.charge.pow(0.3).div(3).add(1) //ip
        player.fa.milestoneEffect[1] = player.fa.charge.pow(3).add(1) //ad
        player.fa.milestoneEffect[2] = player.fa.charge.pow(0.2).div(5).add(1) //bi
        player.fa.milestoneEffect[3] = player.fa.charge.pow(0.35).div(5).add(1) //steel
        player.fa.milestoneEffect[4] = player.fa.charge.pow(0.25).div(5).add(1) //nip
        player.fa.milestoneEffect[5] = player.fa.charge.pow(0.3).div(2).add(1) //id
        player.fa.milestoneEffect[6] = player.fa.charge.pow(0.1).div(4).add(1) //oil
        player.fa.milestoneEffect[7] = player.fa.charge.pow(0.25).div(5).add(1) //anon
        player.fa.milestoneEffect[8] = player.fa.charge.pow(0.08).div(15).add(1) //galaxy dust
        player.fa.milestoneEffect[9] = player.fa.charge.pow(0.1).add(1) //charge
        player.fa.milestoneEffect[10] = player.fa.charge.pow(0.015).add(1) //pre-otf
    },
    clickables: {},
    bars: {},
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(1e40) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.75).mul(0.25).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Foundry"
            },
            display() {
                return "Unlock a building where you can increase steel production.\n\Each level multiplies foundry effect gain and capacity by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
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
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(1e50) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Generator"
            },
            display() {
                return "Unlock a building where you passively generate a variety of currencies.\n\Each level multiplies generator effect by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
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
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(1e65) },
            costGrowth() { return new Decimal(1000) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(2,getBuyableAmount(this.layer, this.id)) },
            unlocked() { return hasMilestone("s", 12) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Charger"
            },
            display() {
                return "Unlock a building where you produce charge, which can provide a variety of benefits.\n\Each level multiplies charger charge rate by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
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
            style: { width: '275px', height: '150px', }
        },

        //FOUNDRY
        101: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.r.timeCubes},
            pay(amt) { player.r.timeCubes = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(1.25).mul(0.2).add(1)
                if (hasUpgrade("cs", 603)) eff = eff.pow(3)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Steel Time Cubes'
            },
            display() {
                return 'which are boosting foundry effect capacity by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Time Cubes'
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
            style: { width: '275px', height: '150px', }
        },
        102: {
            costBase() { return new Decimal(1e10) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.p.crystals},
            pay(amt) { player.p.crystals = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(1.25).mul(0.2).add(1)
                if (hasUpgrade("cs", 603)) eff = eff.pow(3)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Steel Crystal'
            },
            display() {
                return 'which are boosting foundry effect capacity by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Crystals'
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
            style: { width: '275px', height: '150px', }
        },
        103: {
            costBase() { return new Decimal(1e40) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.an.anonymity},
            pay(amt) { player.an.anonymity = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(1.25).mul(0.2).add(1)
                if (hasUpgrade("cs", 603)) eff = eff.pow(3)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Steel Anonymity'
            },
            display() {
                return 'which are boosting foundry effect gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Anonymity'
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
            style: { width: '275px', height: '150px', }
        },
        104: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.7) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.oi.oil},
            pay(amt) { player.oi.oil = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(1.25).mul(0.2).add(1)
                if (hasUpgrade("cs", 603)) eff = eff.pow(3)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Steel Oil'
            },
            display() {
                return 'which are boosting foundry effect gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Oil'
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
            style: { width: '275px', height: '150px', }
        },

        //generator
        202: {
            costBase() { return new Decimal(1e12) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.p.crystals},
            pay(amt) { player.p.crystals = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.01).mul(buyableEffect("fa", 12))
                if (hasUpgrade("cs", 903)) eff = eff.add(1).pow(2).sub(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Crystal Generator'
            },
            display() {
                return 'which are producing ' + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + '% of crystals per second.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Crystals'
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
            style: { width: '275px', height: '150px', }
        },
        203: {
            costBase() { return new Decimal(1e8) },
            costGrowth() { return new Decimal(25) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.rg.repliGrass},
            pay(amt) { player.rg.repliGrass = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.04).mul(buyableEffect("fa", 12))
                if (hasUpgrade("cs", 903)) eff = eff.add(1).pow(2).sub(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Repli-Grass Generator'
            },
            display() {
                return 'which are producing ' + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + '% of the repli-grass mult per grass spawn.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Repli-Grass'
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
            style: { width: '275px', height: '150px', }
        },
        204: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(25) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.oi.oil},
            pay(amt) { player.oi.oil = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.01).mul(buyableEffect("fa", 12))
                if (hasUpgrade("cs", 903)) eff = eff.add(1).pow(2).sub(1)
                return eff
            },
            unlocked() { return player.fa.buyables[13].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Oil Generator'
            },
            display() {
                return 'which are producing ' + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + '% of oil per second.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Oil'
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
            style: { width: '275px', height: '150px', }
        },
        206: {
            costBase() { return new Decimal(1e20) },
            costGrowth() { return new Decimal(2.5) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.p.crystals},
            pay(amt) { player.p.crystals = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.1).add(1)
                if (hasUpgrade("cs", 903)) eff = eff.pow(2)
                return eff
            },
            unlocked() { return player.fa.buyables[13].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Crystal Charger'
            },
            display() {
                return 'which are boosting charge rate by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Crystals'
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
            style: { width: '275px', height: '150px', }
        },
        207: {
            costBase() { return new Decimal(1e12) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.rg.repliGrass},
            pay(amt) { player.rg.repliGrass = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.1).add(1)
                if (hasUpgrade("cs", 903)) eff = eff.pow(2)
                return eff
            },
            unlocked() { return player.fa.buyables[13].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Repli-Grass Charger'
            },
            display() {
                return 'which are boosting charge rate by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Repli-Grass'
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
            style: { width: '275px', height: '150px', }
        },
        208: {
            costBase() { return new Decimal(4000000) },
            costGrowth() { return new Decimal(1.6) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.oi.oil},
            pay(amt) { player.oi.oil = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.1).add(1)
                if (hasUpgrade("cs", 903)) eff = eff.pow(2)
                return eff
            },
            unlocked() { return player.fa.buyables[13].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return 'Oil Charger'
            },
            display() {
                return 'which are boosting charge rate by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Oil'
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
            style: { width: '275px', height: '150px', }
        },
    },
    milestones: {
        11: {
            requirementDescription: "<h3>100 Best Charge",
            effectDescription() { return "Boosts infinity points based on charge: Currently: " + format(player.fa.milestoneEffect[0]) + "x" },
            done() { return player.fa.bestCharge.gte(100) },
            style: { width: '800px', "min-height": '75px' },
        },
        12: {
            requirementDescription: "<h3>1,000 Best Charge",
            effectDescription() { return "Boosts antimatter dimensions (ignoring softcap) based on charge: Currently: " + format(player.fa.milestoneEffect[1]) + "x" },
            done() { return player.fa.bestCharge.gte(1000) },
            style: { width: '800px', "min-height": '75px' },
        },
        13: {
            requirementDescription: "<h3>10,000 Best Charge",
            effectDescription() { return "Boosts broken infinities based on charge: Currently: " + format(player.fa.milestoneEffect[2]) + "x" },
            done() { return player.fa.bestCharge.gte(10000) },
            style: { width: '800px', "min-height": '75px' },
        },
        14: {
            requirementDescription: "<h3>100,000 Best Charge",
            effectDescription() { return "Boosts steel based on charge: Currently: " + format(player.fa.milestoneEffect[3]) + "x" },
            done() { return player.fa.bestCharge.gte(1e5) },
            style: { width: '800px', "min-height": '75px' },
        },
        15: {
            requirementDescription: "<h3>1,000,000 Best Charge",
            effectDescription() { return "Boosts negative infinity points based on charge: Currently: " + format(player.fa.milestoneEffect[4]) + "x" },
            done() { return player.fa.bestCharge.gte(1e6) },
            style: { width: '800px', "min-height": '75px' },
        },
        16: {
            requirementDescription: "<h3>10,000,000 Best Charge",
            effectDescription() { return "Boosts infinity dimensions based on charge: Currently: " + format(player.fa.milestoneEffect[5]) + "x" },
            done() { return player.fa.bestCharge.gte(1e7) },
            style: { width: '800px', "min-height": '75px' },
        },
        17: {
            requirementDescription: "<h3>1e9 Best Charge",
            effectDescription() { return "Boosts oil based on charge: Currently: " + format(player.fa.milestoneEffect[6]) + "x" },
            done() { return player.fa.bestCharge.gte(1e9) },
            style: { width: '800px', "min-height": '75px' },
        },
        18: {
            requirementDescription: "<h3>1e11 Best Charge",
            effectDescription() { return "Boosts anonymity based on charge: Currently: " + format(player.fa.milestoneEffect[7]) + "x" },
            done() { return player.fa.bestCharge.gte(1e11) },
            style: { width: '800px', "min-height": '75px' },
        },
        19: {
            requirementDescription: "<h3>1e14 Best Charge",
            effectDescription() { return "Boosts galaxy dust based on charge: Currently: " + format(player.fa.milestoneEffect[8]) + "x" },
            done() { return player.fa.bestCharge.gte(1e14) },
            style: { width: '800px', "min-height": '75px' },
        },
        21: {
            requirementDescription: "<h3>1e50 Best Charge",
            effectDescription() { return "Boosts charge based on charge: Currently: " + format(player.fa.milestoneEffect[9]) + "x" },
            done() { return player.fa.bestCharge.gte(1e50) },
            style: { width: '800px', "min-height": '75px' },
        },
        22: {
            requirementDescription: "<h3>1e100 Best Charge",
            effectDescription() { return "Boosts Pre-OTF currencies based on charge: Currently: " + format(player.fa.milestoneEffect[10]) + "x" },
            done() { return player.fa.bestCharge.gte(1e100) },
            style: { width: '800px', "min-height": '75px' },
        },
    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Buyables": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13]], {maxWidth: "900px"}],
                ]
            },
            "Foundry": {
                buttonStyle() { return { color: "#7a7979", borderRadius: "5px" } },
                unlocked() { return player.fa.buyables[11].gte(1) },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return format(player.fa.foundryEffect) + "x/" + format(player.fa.foundryEffectMax) + "x to steel gain based on time since last steelie reset."}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "(+" + format(player.fa.foundryEffectPerSecond) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.r.timeCubes) + "</h3> Time Cubes" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.p.crystals) + "</h3> Crystals" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.an.anonymity) + "</h3> Anonymity" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.oi.oil) + "</h3> Oil" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 101], ["ex-buyable", 102],
                        ["ex-buyable", 103], ["ex-buyable", 104]], {maxWidth: "600px"}],

                ]
            },
            "Generator": {
                buttonStyle() { return { color: "#609c7c", borderRadius: "5px" } },
                unlocked() { return player.fa.buyables[12].gte(1)  },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.p.crystals) + "</h3> Crystals" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.rg.repliGrass) + "</h3> Repli-Grass" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.oi.oil) + "</h3> Oil" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 202], ["ex-buyable", 203], ["ex-buyable", 204],
                        ["ex-buyable", 206], ["ex-buyable", 207], ["ex-buyable", 208]], {maxWidth: "900px"}],
                ]
            },
            "Charger": {
                buttonStyle() { return { color: "#f7f774", borderRadius: "5px" } },
                unlocked() { return player.fa.buyables[13].gte(1)  },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.fa.charge) + "</h3> Charge" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You are gaining " + format(player.fa.chargeRate) + " per second."}, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Best charge: " + format(player.fa.bestCharge) + ""}, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "(Charge is reset on steel and infinity resets, and best charge is reset on singularity resets.)"}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "(Charge gain is based on factory buyables)"}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Charger Milestones"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["milestone", 11],
                    ["milestone", 12],
                    ["milestone", 13],
                    ["milestone", 14],
                    ["milestone", 15],
                    ["milestone", 16],
                    ["milestone", 17],
                    ["milestone", 18],
                    ["milestone", 19],
                    ["milestone", 21],
                    ["milestone", 22],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.gh.steel) + "</h3> Steel" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 101)}
})
/*        codeExperience: new Decimal(0),
        codeExperienceToGet: new Decimal(0),
        codeExperiencePause: new Decimal(0),

        linesOfCode: new Decimal(0),
        linesOfCodePerSecond: new Decimal(0),

        mods: new Decimal(0),
        modsEffect: new Decimal(1),
        modsToGet: new Decimal(1),
        modsReq: new Decimal(100),

        modSoftcap: new Decimal(1),
        modSoftcapStart: new Decimal(10),*/
