addLayer("ra", {
    name: "Radiation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RA", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U3",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        radiation: new Decimal(0),
        storedRadiation: new Decimal(0),
        radiationPerSecond: new Decimal(0),

        radiationSoftcapEffect: new Decimal(1),
        radiationSoftcapStart: new Decimal(10000),

        //mastery
        masterySlotsMax: new Decimal(1),
        masterySlotsUsed: new Decimal(0),

        masteryScore: new Decimal(1),
        masteryScoreEffect: new Decimal(1),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(120deg, #0e8a22 0%, #45ff17 100%)",
            "background-origin": "border-box",
            "border-color": "#260454",
            "color": "#260454",
        };
    },
    tooltip: "Radiation",
    branches: ["co"],
    color: "#0e8a22",
    update(delta) {
        let onepersec = new Decimal(1)

        player.ra.radiationPerSecond = new Decimal(0)
        for (let i in player.co.cores) {
            player.ra.radiationPerSecond = player.ra.radiationPerSecond.add(player.co.cores[i].level.pow(CORE_STRENGTH[player.co.cores[i].strength].buff).pow(0.8).div(4))
        }
        if (player.matosLair.milestone[25] > 0) player.ra.radiationPerSecond = player.ra.radiationPerSecond.add(1000)
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.div(player.ra.radiationSoftcapEffect)
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(buyableEffect("ra", 13))
        if (hasUpgrade("ev8", 19)) player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(upgradeEffect("ev8", 19))
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(buyableEffect("fu", 52))
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(levelableEffect("pet", 1205)[0])
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(player.co.cores.radioactive.effect[1])
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(player.cs.scraps.radioactive.effect)
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(levelableEffect("pet", 309)[0])
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(buyableEffect("cof", 24))
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(levelableEffect("pu", 110)[1])
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(buyableEffect("sme", 141))
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(levelableEffect("ir", 7)[1])
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(player.s.pylonEnergyEffect2)
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(buyableEffect("ra", 17))
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(buyableEffect("ra", 18))
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(player.ra.masteryScoreEffect)
        if (player.anl.clearedRooms.roomF) player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(10000)

        // POWER MODIFIERS
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.pow(player.se.starsExploreEffect[1][1])
        
        if (hasMilestone("s", 13)) player.ra.radiation = player.ra.radiation.add(player.ra.radiationPerSecond.mul(delta))

        player.ra.radiationSoftcapStart = new Decimal(10000)
        player.ra.radiationSoftcapStart = player.ra.radiationSoftcapStart.mul(buyableEffect("ra", 11))
        player.ra.radiationSoftcapStart = player.ra.radiationSoftcapStart.mul(buyableEffect("sma", 13)) 
        if (hasUpgrade("cs", 1301)) player.ra.radiationSoftcapStart = player.ra.radiationSoftcapStart.mul(10)

        player.ra.radiationSoftcapEffect = new Decimal(1)
        if (player.ra.radiation.gte(player.ra.radiationSoftcapStart)) {
            player.ra.radiationSoftcapEffect = player.ra.radiation.div(player.ra.radiationSoftcapStart).mul(5)
            if (!hasUpgrade("cs", 1303)) player.ra.radiationSoftcapEffect = player.ra.radiationSoftcapEffect.pow(player.ra.radiation.div(player.ra.radiationSoftcapStart).add(1).pow(0.5).log(player.ra.radiationSoftcapStart).add(1))
            if (hasUpgrade("cs", 1303)) player.ra.radiationSoftcapEffect = player.ra.radiationSoftcapEffect.pow(player.ra.radiation.div(player.ra.radiationSoftcapStart).add(1).pow(0.45).log(player.ra.radiationSoftcapStart).add(1))
            player.ra.radiationSoftcapEffect = player.ra.radiationSoftcapEffect.div(buyableEffect("ra", 12))
            if (hasUpgrade("cs", 1301)) player.ra.radiationSoftcapEffect = player.ra.radiationSoftcapEffect.mul(10)
            if (hasUpgrade("s", 29)) player.ra.radiationSoftcapEffect = player.ra.radiationSoftcapEffect.pow(0.02)
        }

        player.ra.masteryScore = player.ra.buyables[21].add(1)
        player.ra.masteryScore = player.ra.masteryScore.mul(player.ra.buyables[22].add(1))
        player.ra.masteryScore = player.ra.masteryScore.mul(player.ra.buyables[23].add(1))
        player.ra.masteryScore = player.ra.masteryScore.mul(player.ra.buyables[24].add(1))
        player.ra.masteryScore = player.ra.masteryScore.mul(player.ra.buyables[25].add(1))
        player.ra.masteryScore = player.ra.masteryScore.mul(player.ra.buyables[26].add(1))
        if (player.anl.clearedRooms.roomF) player.ra.masteryScore = player.ra.masteryScore.pow(1.1)

        player.ra.masteryScoreEffect = player.ra.masteryScore.pow(1.2).add(1) //kinda lazy code but whatever
    },
    clickables: {
    },
    bars: {},
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.ra.radiation},
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).pow(1.2).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Softcap Extender"
            },
            display() {
                return 'which are extending the radiation softcap by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.ra.radiation},
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Softcap Weakener"
            },
            display() {
                return 'which are weakening the radiation softcap by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
            style: { width: '275px', height: '150px',}
        },
        13: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(1000) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.ra.radiation},
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(2, getBuyableAmount(this.layer, this.id))},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Radiation Doubler"
            },
            display() {
                return 'which are boosting radiation gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
        14: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.ra.radiation},
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(4, getBuyableAmount(this.layer, this.id))},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Crystal Quadrupler"
            },
            display() {
                return 'which are boosting crystal gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
        15: {
            costBase() { return new Decimal(4000) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.ra.radiation},
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(2, getBuyableAmount(this.layer, this.id))},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Oil Doubler"
            },
            display() {
                return 'which are boosting oil gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
        16: {
            costBase() { return new Decimal(12000) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(375) },
            currency() { return player.ra.radiation},
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(3, getBuyableAmount(this.layer, this.id))},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "NIP Tripler"
            },
            display() {
                return 'which are boosting NIP gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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

        //new buyables
        17: {
            costBase() { return new Decimal("1e100000") },
            costGrowth() { return new Decimal("1e1000") },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.4, getBuyableAmount(this.layer, this.id))},
            unlocked() { return player.anl.clearedRooms.roomA },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Singularity Radiatior"
            },
            display() {
                return 'which are boosting radiation gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Singularity Points'
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
        18: {
            costBase() { return new Decimal(1e100) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ani.darkRadiation},
            pay(amt) { player.ani.darkRadiation = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.4, getBuyableAmount(this.layer, this.id))},
            unlocked() { return player.anl.clearedRooms.roomA },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Darkness Radiatior"
            },
            display() {
                return 'which are boosting radiation gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Dark Radiation'
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

        //Mastery
        21: {
            costBase() { return new Decimal(1e50) },
            costGrowth() { return new Decimal(75) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ra.radiation},
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.5, getBuyableAmount(this.layer, this.id))},
            unlocked() { return player.anl.clearedRooms.roomB },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dark Mastery"
            },
            display() {
                return 'which are boosting dark radiation gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
            style: { width: '275px', height: '150px', background: "linear-gradient(145deg, #1d901a 0%, #6dc464 100%)" }
        },
        22: {
            costBase() { return new Decimal(1e55) },
            costGrowth() { return new Decimal(90) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ra.radiation},
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.45, getBuyableAmount(this.layer, this.id))},
            unlocked() { return player.anl.clearedRooms.roomB },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Color Mastery"
            },
            display() {
                return 'which are boosting colored radiation gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
            style: { width: '275px', height: '150px', background: "linear-gradient(90deg,#5c3a3a, #5c4a3a, #565c3a, #3a5c43, #3a4f5c, #433a5c, #523a5c)", color: "white" }
        },
        23: {
            costBase() { return new Decimal(1e60) },
            costGrowth() { return new Decimal(110) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ra.radiation},
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.4, getBuyableAmount(this.layer, this.id))},
            unlocked() { return player.anl.clearedRooms.roomB },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Time Mastery"
            },
            display() {
                return 'which are boosting time radiation gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
            style: { width: '275px', height: '150px', background: "#b70d0e"}
        },
        24: {
            costBase() { return new Decimal(1e65) },
            costGrowth() { return new Decimal(125) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ra.radiation},
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.4, getBuyableAmount(this.layer, this.id))},
            unlocked() { return player.anl.clearedRooms.roomB },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Space Mastery"
            },
            display() {
                return 'which are boosting space radiation gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
            style: { width: '275px', height: '150px', background: "#000000", color: "white"}
        },
        25: {
            costBase() { return new Decimal(1e80) },
            costGrowth() { return new Decimal(200) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ra.radiation},
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.375, getBuyableAmount(this.layer, this.id))},
            unlocked() { return player.anl.clearedRooms.roomB },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Heart Mastery"
            },
            display() {
                return 'which are boosting heart radiation gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
            style: { width: '275px', height: '150px', background: "#55142a"}
        },
        26: {
            costBase() { return new Decimal(1e85) },
            costGrowth() { return new Decimal(225) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.ra.radiation},
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.375, getBuyableAmount(this.layer, this.id))},
            unlocked() { return player.anl.clearedRooms.roomB },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Mind Mastery"
            },
            display() {
                return 'which are boosting mind radiation gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
            style: { width: '275px', height: '150px', background: "#00923d" }
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
                    ["blank", "10px"],
                    ["raw-html", function () { return "You have " + format(player.ra.radiation) + " radiation. <small>(" + format(player.ra.radiationPerSecond) + "/s)</small>" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", function () { return "(Stored radiation: " + format(player.ra.storedRadiation) + ")" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "After " + format(player.ra.radiationSoftcapStart) + " radiation, radiation gain is divided by /" + format(player.ra.radiationSoftcapEffect)},
                        () => {return player.ra.radiation.gte(player.ra.radiationSoftcapStart) ? {color: "red", fontSize: "20px", fontFamily: "monospace"} : {color: "gray", fontSize: "16px", fontFamily: "monospace"}}],
                    ["blank", "25px"],
                    ["style-row", [
                        ["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13],
                        ["ex-buyable", 14], ["ex-buyable", 15], ["ex-buyable", 16],
                        ["ex-buyable", 17], ["ex-buyable", 18],
                    ], {maxWidth: "840px"}],
                    ["blank", "25px"],
                    ["raw-html", () => { return player.matosLair.milestone[25] == 0 ? "Radiation gain is based on core progress." : "" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                ],
            },
            "Radiation Mastery": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return player.anl.clearedRooms.roomB },
                content: [
                    ["blank", "10px"],
                    ["raw-html", function () { return "You have " + format(player.ra.radiation) + " radiation. <small>(" + format(player.ra.radiationPerSecond) + "/s)</small>" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", function () { return "(Stored radiation: " + format(player.ra.storedRadiation) + ")" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                        ["raw-html", () => {return "After " + format(player.ra.radiationSoftcapStart) + " radiation, radiation gain is divided by /" + format(player.ra.radiationSoftcapEffect)},
                        () => {return player.ra.radiation.gte(player.ra.radiationSoftcapStart) ? {color: "red", fontSize: "20px", fontFamily: "monospace"} : {color: "gray", fontSize: "16px", fontFamily: "monospace"}}],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Mastery Score: " + format(player.ra.masteryScore) + "." }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", function () { return "Boosts radiation gain by x" + format(player.ra.masteryScoreEffect) + "." }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                     ["style-row", [
                        ["ex-buyable", 21], ["ex-buyable", 22], ["ex-buyable", 23],
                        ["ex-buyable", 24], ["ex-buyable", 25], ["ex-buyable", 26],
                    ], {maxWidth: "840px"}],
                ],
            },
        },
    }, 
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.s.singularityPoints) + "</h3> singularity points"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.s.singularityPointsToGet) + ")"}, () => {
                let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                if (player.in.infinityPoints.gte(1e40)) {look.color = "white"} else {look.color = "gray"} 
                return look
            }],
            ["raw-html", () => {return player.in.infinityPoints.gte("2.71e3793") ? "[SOFTCAPPED<sup>2</sup>]" : player.in.infinityPoints.gte(2.5e193) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "18px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["raw-html", () => { return "(Highest: " + format(player.s.highestSingularityPoints) + ")" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasMilestone("s", 13)  }
})
