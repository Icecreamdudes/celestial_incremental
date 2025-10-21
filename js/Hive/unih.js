addLayer("bee", {
    name: "Bees", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        milestonePopups: false,

        bees: new Decimal(1),
        bps: new Decimal(0),
        totalResearch: new Decimal(0),

        path: 0,

        beeMax: false,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "#f9c901",
            backgroundOrigin: "border-box",
            borderColor: "#7c6400",
    }},
    tooltip: "Bees",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        // Bee Calculations
        player.bee.bps = buyableEffect("bee", 11)
        player.bee.bps = player.bee.bps.mul(player.fl.glossaryEffects.bee)
        player.bee.bps = player.bee.bps.mul(player.bpl.roles.drone.effect)
        player.bee.bps = player.bee.bps.mul(player.ne.alpha.effect)
        if (hasUpgrade("ne", 102)) player.bee.bps = player.bee.bps.mul(3)
        if (player.bb.breadMilestone >= 1) player.bee.bps = player.bee.bps.mul(player.bb.breadEffects[0])
        player.bee.bps = player.bee.bps.mul(player.ho.effects.bee.effect)
        if (hasUpgrade("al", 101)) player.bee.bps = player.bee.bps.mul(2)
        player.bee.bps = player.bee.bps.mul(buyableEffect("bee", 12))

        player.bee.bees = player.bee.bees.add(player.bee.bps.mul(delta))
    },
    clickables: {
        1: {
            title: "Buy Max On",
            canClick() { return !player.bee.beeMax},
            unlocked: true,
            onClick() {
                player.bee.beeMax = true
            },
            style: {width: "80px", minHeight: "50px", borderRadius: "15px 0 0 15px"}
        },
        2: {
            title: "Buy Max Off",
            canClick() { return player.bee.beeMax},
            unlocked: true,
            onClick() {
                player.bee.beeMax = false
            },
            style: {width: "80px", minHeight: "50px", borderRadius: "0 15px 15px 0"}
        },
    },
    bars: {},
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },
        12: {
            costBase() { return new Decimal(1e20) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.585, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return player.al.cocoonLevel >= 2 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },
        13: {
            costBase() { return new Decimal(1e40) },
            costGrowth() { return new Decimal(1e5) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return player.al.cocoonLevel >= 4 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },

        21: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return player.bee.totalResearch.gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },
        22: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(4) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return player.bee.totalResearch.gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },
        23: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2) },
            unlocked() { return player.bee.totalResearch.gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },
        24: {
            costBase() { return new Decimal(2500) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return player.bee.totalResearch.gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },

        31: {
            costBase() { return new Decimal(1e6) },
            costGrowth() { return new Decimal(8) },
            purchaseLimit() { return new Decimal(18) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).div(2).add(1) },
            unlocked() { return player.bee.totalResearch.gte(20) && player.bee.path == 1 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },
        32: {
            costBase() { return new Decimal(1e7) },
            costGrowth() { return new Decimal(50) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).div(10).add(1) },
            unlocked() { return player.bee.totalResearch.gte(20) && player.bee.path == 1 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },
        33: {
            costBase() { return new Decimal(1e8) },
            costGrowth() { return new Decimal(6) },
            purchaseLimit() { return new Decimal(15) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).div(10).add(1) },
            unlocked() { return player.bee.totalResearch.gte(20) && player.bee.path == 1 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },
        34: {
            costBase() { return new Decimal(1e12) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return hasUpgrade("bpl", 19) && player.bee.totalResearch.gte(20) && player.bee.path == 1 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },
        35: {
            costBase() { return new Decimal(1e25) },
            costGrowth() { return new Decimal(1e5) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10) },
            unlocked() { return hasUpgrade("al", 105) && player.bee.totalResearch.gte(20) && player.bee.path == 1 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },

        41: {
            costBase() { return new Decimal(1e6) },
            costGrowth() { return new Decimal(8) },
            purchaseLimit() { return new Decimal(18) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(2).add(1) },
            unlocked() { return player.bee.totalResearch.gte(20) && player.bee.path == 2 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },
        42: {
            costBase() { return new Decimal(1e7) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1) },
            unlocked() { return player.bee.totalResearch.gte(20) && player.bee.path == 2 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },
        43: {
            costBase() { return new Decimal(1e8) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100) },
            unlocked() { return player.bee.totalResearch.gte(20) && player.bee.path == 2 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },
        44: {
            costBase() { return new Decimal(1e12) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return hasUpgrade("ne", 401) && player.bee.totalResearch.gte(20) && player.bee.path == 2 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },
        45: {
            costBase() { return new Decimal(1e25) },
            costGrowth() { return new Decimal(1e5) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10) },
            unlocked() { return hasUpgrade("al", 205) && player.bee.totalResearch.gte(20) && player.bee.path == 2 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },


        51: {
            costBase() { return new Decimal(1e16) },
            costGrowth() { return new Decimal(8) },
            purchaseLimit() { return new Decimal(15) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.3, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return player.bee.totalResearch.gte(60) && player.bee.path == 1 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },
        52: {
            costBase() { return new Decimal(1e18) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(8) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.5).add(1) },
            unlocked() { return player.bee.totalResearch.gte(60) && player.bee.path == 1 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },
        53: {
            costBase() { return new Decimal(1e20) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return player.bee.totalResearch.gte(60) && player.bee.path == 1 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },

        61: {
            costBase() { return new Decimal(1e16) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(8) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.5).add(1) },
            unlocked() { return player.bee.totalResearch.gte(60) && player.bee.path == 2 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },
        62: {
            costBase() { return new Decimal(1e17) },
            costGrowth() { return new Decimal(50) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.5, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return player.bee.totalResearch.gte(60) && player.bee.path == 2 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },
        63: {
            costBase() { return new Decimal(1e18) },
            costGrowth() { return new Decimal(250) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return player.bee.totalResearch.gte(60) && player.bee.path == 2 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },
        64: {
            costBase() { return new Decimal(1e24) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.bee.bees},
            pay(amt) { player.bee.bees = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return player.ho.cell.gte(1000) && player.bee.totalResearch.gte(60) && player.bee.path == 2 },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() {
                return this.currency().gte(this.cost())
            },
            title() {
                if (!getBuyableAmount(this.layer, this.id).eq(this.purchaseLimit())) {
                    return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bees"
                } else {
                    return "<h2>MAX"
                }
            },
            buy() {
                if (player.bee.beeMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    player.bee.totalResearch = player.bee.totalResearch.add(1)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    player.bee.totalResearch = player.bee.totalResearch.add(max)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '175px', height: '60px', border: "3px solid rgba(0,0,0,0.3)", borderRadius: '0px'}
        },

    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return player.bee.bees.eq(1) ? "You have <h3>" + format(player.bee.bees) + "</h3> bee." : "You have <h3>" + format(player.bee.bees) + "</h3> bees."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.bee.bps) + "/s)" }, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "5px"}],
        ]],
        ["blank", "10px"],
        ["row", [["clickable", 1], ["clickable", 2]]],
        ["blank", "10px"],
        ["style-column", [
            ["style-row", [
                ["raw-html", "Bee Research", {color: "#312f17", fontSize: "24px", fontFamily: "monospace"}],
            ], {borderBottom: "4px solid #8e4200", backgroundColor: "#db6f02", height: "40px"}],
            ["style-row", [
                ["style-column", [
                    ["raw-html", () => { return "Queen Cell - " + formatWhole(getBuyableAmount("bee", 11)) + "/10"}, {color: "#312f17", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Increases base BPS by +" + formatWhole(buyableEffect("bee", 11))}, {color: "#312f17", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "396px"}],
                ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                ["buyable", 11],
            ], {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"}],
            ["style-row", [
                ["style-column", [
                    ["raw-html", () => { return "Juicier Jelly - " + formatWhole(getBuyableAmount("bee", 12)) + "/5"}, {color: "#312f17", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts BPS by x" + formatSimple(buyableEffect("bee", 12), 1)}, {color: "#312f17", fontSize: "16px", fontFamily: "monospace"}],
                ], {width: "396px"}],
                ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                ["buyable", 12],
            ], () => {return player.al.cocoonLevel >= 2 ? {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"} : {display: "none !important"}}],
            ["style-row", [
                ["style-column", [
                    ["raw-html", () => { return "Forgotten Seeds - " + formatWhole(getBuyableAmount("bee", 13)) + "/5"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                    ["raw-html", () => { return "Unlock " + formatWhole(buyableEffect("bee", 13)) + " new cubic red flowers"}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                ], {width: "396px"}],
                ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                ["buyable", 13],
            ], () => {return player.al.cocoonLevel >= 4 ? {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"} : {display: "none !important"}}],

            // FLOWER RESEARCH

            ["style-column", [
                ["style-row", [
                    ["raw-html", "Flower Research", {color: "#312f17", fontSize: "24px", fontFamily: "monospace"}],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#db6f02", height: "40px"}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "Mulch - " + formatWhole(getBuyableAmount("bee", 21)) + "/10"}, {color: "#312f17", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "Decreases time between red flower growth by /" + formatSimple(buyableEffect("bee", 21), 1)}, {color: "#312f17", fontSize: "14px", fontFamily: "monospace"}]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 21],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "New Strands - " + formatWhole(getBuyableAmount("bee", 22)) + "/5"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Unlock " + formatWhole(buyableEffect("bee", 22)) + " new pentagonal red flowers"}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 22],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "Finer Framing - " + formatWhole(getBuyableAmount("bee", 23)) + "/5"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Boost glossary effect base by +" + formatSimple(buyableEffect("bee", 23), 1)}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 23],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "Powered Pickings - " + formatWhole(getBuyableAmount("bee", 24)) + "/5"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Boosts picking power by +" + formatWhole(buyableEffect("bee", 24))}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 24],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"}],
            ], () => {return player.bee.totalResearch.gte(1) ? {} : {display: "none !important"}}],

            // POLLEN RESEARCH

            ["style-column", [
                ["style-row", [
                    ["raw-html", "Pollen Research", { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#db6f02", height: "40px"}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "Pollen Baskets - " + formatWhole(getBuyableAmount("bee", 31)) + "/18"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Boosts Pollen by x" + formatSimple(buyableEffect("bee", 31), 1)}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 31],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "Improved Hamuli - " + formatWhole(getBuyableAmount("bee", 32)) + "/5"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Divides Pollen cooldown by /" + formatSimple(buyableEffect("bee", 32), 1)}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 32],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "Pollen Pellet - " + formatWhole(getBuyableAmount("bee", 33)) + "/15"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Improves Pollen conversion rate by x" + formatSimple(buyableEffect("bee", 33), 1)}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 33],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "Dusty Seeds - " + formatWhole(getBuyableAmount("bee", 34)) + "/5"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Unlock " + formatWhole(buyableEffect("bee", 34)) + " new pentagonal blue flowers"}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 34],
                ], () => {return hasUpgrade("bpl", 19) ? {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"} : {display: "none !important"}}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "More Anthers - " + formatWhole(getBuyableAmount("bee", 35)) + "/10"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Blue flowers are " + formatWhole(buyableEffect("bee", 35).mul(100)) + "% stronger"}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 35],
                ], () => {return hasUpgrade("al", 105) ? {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"} : {display: "none !important"}}],
            ], () => {return player.bee.totalResearch.gte(20) && player.bee.path == 1 ? {} : {display: "none !important"}}],

            // NECTAR RESEARCH
            ["style-column", [
                ["style-row", [
                    ["raw-html", "Nectar Research", { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#db6f02", height: "40px"}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "Second Stomach - " + formatWhole(getBuyableAmount("bee", 41)) + "/18"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Boosts Nectar α by x" + formatSimple(buyableEffect("bee", 41), 1)}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 41],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "Increased Density - " + formatWhole(getBuyableAmount("bee", 42)) + "/10"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Boosts Nectar by x" + formatSimple(buyableEffect("bee", 42), 1)}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 42],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "Efficient Gathering - " + formatWhole(getBuyableAmount("bee", 43)) + "/5"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Increase Nectar gain exponent by +" + commaFormat(buyableEffect("bee", 43), 2)}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }],
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 43],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "Sweetened Seeds - " + formatWhole(getBuyableAmount("bee", 44)) + "/5"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Unlock " + formatWhole(buyableEffect("bee", 44)) + " new pentagonal green flowers"}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 44],
                ], () => {return hasUpgrade("ne", 401) ? {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"} : {display: "none !important"}}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "More Nectaries - " + formatWhole(getBuyableAmount("bee", 45)) + "/10"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Green flowers are " + formatWhole(buyableEffect("bee", 45).mul(100)) + "% stronger"}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 45],
                ], () => {return hasUpgrade("al", 205) ? {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"} : {display: "none !important"}}],
            ], () => {return player.bee.totalResearch.gte(20) && player.bee.path == 2 ? {} : {display: "none !important"}}],

            // BEE BREAD RESEARCH

            ["style-column", [
                ["style-row", [
                    ["raw-html", "Bee Bread Research", { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#db6f02", height: "40px"}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "Tighter Clumps - " + formatWhole(getBuyableAmount("bee", 51)) + "/15"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Boosts Bee Bread by x" + format(buyableEffect("bee", 51))}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 51],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "Improved Packing - " + formatWhole(getBuyableAmount("bee", 52)) + "/8"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Boosts BB Tier Effectiveness by x" + formatSimple(buyableEffect("bee", 52), 1)}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 52],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "Compact Seeds - " + formatWhole(getBuyableAmount("bee", 53)) + "/5"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Unlock " + formatWhole(buyableEffect("bee", 53)) + " new circular pink flowers"}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 53],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"}],
            ], () => {return player.bee.totalResearch.gte(60) && player.bee.path != 2 ? {} : {display: "none !important"}}],

            // HONEY RESEARCH
            ["style-column", [
                ["style-row", [
                    ["raw-html", "Honey Research", { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#db6f02", height: "40px"}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "Denser Honey - " + formatWhole(getBuyableAmount("bee", 61)) + "/8"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Boosts Honey-Cell Gain by x" + formatSimple(buyableEffect("bee", 61), 1)}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 61],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "Succulent Sweetness - " + formatWhole(getBuyableAmount("bee", 62)) + "/10"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Boosts Honey by x" + format(buyableEffect("bee", 62))}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 62],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "Faster Congealing - " + formatWhole(getBuyableAmount("bee", 63)) + "/5"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Boosts cell effect bases by x" + formatSimple(buyableEffect("bee", 63), 1)}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 63],
                ], {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"}],
                ["style-row", [
                    ["style-column", [
                        ["raw-html", () => { return "Drier Seeds - " + formatWhole(getBuyableAmount("bee", 64)) + "/5"}, { color: "#312f17", fontSize: "24px", fontFamily: "monospace" }],
                        ["raw-html", () => { return "Unlock " + formatWhole(buyableEffect("bee", 64)) + " new pentagonal yellow flowers"}, { color: "#312f17", fontSize: "16px", fontFamily: "monospace" }]
                    ], {width: "396px"}],
                    ["style-row", [], {width: "4px", height: "60px", background: "#8e4200"}],
                    ["buyable", 64],
                ], () => {return player.ho.cell.gte(1000) ? {borderBottom: "4px solid #8e4200", backgroundColor: "#ffb825"} : {display: "none !important"}}],
            ], () => {return player.bee.totalResearch.gte(60) && player.bee.path != 1 ? {} : {display: "none !important"}}],
        ], {userSelect: "none", borderLeft: "4px solid #8e4200", borderRight: "4px solid #8e4200", borderTop: "4px solid #8e4200"}],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame && player.pol.unlockHive >= 2}
})