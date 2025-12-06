addLayer("ev1", {
    name: "Button Enhancement", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Be", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        xpGain: new Decimal(0),
    }},
    nodeStyle: {
        background: "linear-gradient(140deg, #b00000 0%, #bda500 50%, #b00000 100%)",
		backgroundOrigin: "border-box",
		borderColor: "#750000"
    },
    tooltip: "Button Enhancement",
    color: "white",
    update(delta) {
        let onepersec = player.cb.cbTickspeed

        player.ev1.xpGain = new Decimal(0)
        for (let i = 0; i < 8; i++) {
            player.ev1.xpGain = player.ev1.xpGain.add(player.cb.xpTimers[i].average.mul(buyableEffect("ev1", 103+(i*10))))
        }

        player.cb.xp = player.cb.xp.add(player.ev1.xpGain.mul(delta))
        player.cb.totalxp = player.cb.totalxp.add(player.ev1.xpGain.mul(delta))
    },
    clickables: {
        2: {
            title: "Buy Max On",
            canClick() {return !player.buyMax},
            unlocked: true,
            onClick() {
                player.buyMax = true
            },
            style: {width: '80px', minHeight: "50px", borderRadius: "10px 0px 0px 10px"}
        },
        3: {
            title: "Buy Max Off",
            canClick() {return player.buyMax},
            unlocked: true,
            onClick() {
                player.buyMax = false
            },
            style: {width: "80px", minHeight: "50px", borderRadius: "0px 10px 10px 0px"}
        },
    },
    buyables: {
        101: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.12) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>XP: x" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (!player.ev.evolutionsUnlocked[4]) look.borderRadius = "0 0 0 15px"
                return look
            },
        },
        102: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.22) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (!player.ev.evolutionsUnlocked[4]) look.borderRadius = "0 0 15px 0"
                return look
            },
        },
        103: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(2.1) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(20)},
            unlocked() {return player.ev.evolutionsUnlocked[4]},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20</h3>" +
                    "<br>XP/s: +" + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%<br>of average" +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
            },
            tooltip() {return "+" + formatSimple(player.cb.xpTimers[0].average.mul(tmp[this.layer].buyables[this.id].effect)) + " XP/s"},
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
            style: { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0 0 0 15px"},
        },
        104: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(4.2) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked() {return player.ev.evolutionsUnlocked[4]},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10</h3>" +
                    "<br>ESC: x" + format(tmp[this.layer].buyables[this.id].effect, 1) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style: { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0 0 15px 0"},
        },

        111: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.14) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>XP: x" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (!player.ev.evolutionsUnlocked[4]) look.borderRadius = "0 0 0 15px"
                return look
            },
        },
        112: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.24) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (!player.ev.evolutionsUnlocked[4]) look.borderRadius = "0 0 15px 0"
                return look
            },
        },
        113: {
            costBase() { return new Decimal(300) },
            costGrowth() { return new Decimal(2.2) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(20)},
            unlocked() {return player.ev.evolutionsUnlocked[4]},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20</h3>" +
                    "<br>XP/s: +" + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%<br>of average" +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
            },
            tooltip() {return "+" + formatSimple(player.cb.xpTimers[1].average.mul(tmp[this.layer].buyables[this.id].effect)) + " XP/s"},
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
            style: { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0 0 0 15px"},
        },
        114: {
            costBase() { return new Decimal(300) },
            costGrowth() { return new Decimal(4.4) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked() {return player.ev.evolutionsUnlocked[4]},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10</h3>" +
                    "<br>ESC: x" + format(tmp[this.layer].buyables[this.id].effect, 1) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style: { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0 0 15px 0"},
        },

        121: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.16) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>XP: x" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (!player.ev.evolutionsUnlocked[4]) look.borderRadius = "0 0 0 15px"
                return look
            },
        },
        122: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.26) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (!player.ev.evolutionsUnlocked[4]) look.borderRadius = "0 0 15px 0"
                return look
            },
        },
        123: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(2.3) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(20)},
            unlocked() {return player.ev.evolutionsUnlocked[4]},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20</h3>" +
                    "<br>XP/s: +" + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%<br>of average" +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
            },
            tooltip() {return "+" + formatSimple(player.cb.xpTimers[2].average.mul(tmp[this.layer].buyables[this.id].effect)) + " XP/s"},
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
            style: { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0 0 0 15px"},
        },
        124: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(4.6) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked() {return player.ev.evolutionsUnlocked[4]},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10</h3>" +
                    "<br>ESC: x" + format(tmp[this.layer].buyables[this.id].effect, 1) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style: { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0 0 15px 0"},
        },

        131: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>XP: x" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (!player.ev.evolutionsUnlocked[4]) look.borderRadius = "0 0 0 15px"
                return look
            },
        },
        132: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (!player.ev.evolutionsUnlocked[4]) look.borderRadius = "0 0 15px 0"
                return look
            },
        },
        133: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(20)},
            unlocked() {return player.ev.evolutionsUnlocked[4]},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20</h3>" +
                    "<br>XP/s: +" + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%<br>of average" +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
            },
            tooltip() {return "+" + formatSimple(player.cb.xpTimers[3].average.mul(tmp[this.layer].buyables[this.id].effect)) + " XP/s"},
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
            style: { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0 0 0 15px"},
        },
        134: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(4) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked() {return player.ev.evolutionsUnlocked[4]},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10</h3>" +
                    "<br>ESC: x" + format(tmp[this.layer].buyables[this.id].effect, 1) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style: { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0 0 15px 0"},
        },

        141: {
            costBase() { return new Decimal(7) },
            costGrowth() { return new Decimal(1.18) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>XP: x" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (!player.ev.evolutionsUnlocked[4]) look.borderRadius = "0 0 0 15px"
                return look
            },
        },
        142: {
            costBase() { return new Decimal(7) },
            costGrowth() { return new Decimal(1.28) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (!player.ev.evolutionsUnlocked[4]) look.borderRadius = "0 0 15px 0"
                return look
            },
        },
        143: {
            costBase() { return new Decimal(700) },
            costGrowth() { return new Decimal(2.4) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(20)},
            unlocked() {return player.ev.evolutionsUnlocked[4]},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20</h3>" +
                    "<br>XP/s: +" + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%<br>of average" +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
            },
            tooltip() {return "+" + formatSimple(player.cb.xpTimers[4].average.mul(tmp[this.layer].buyables[this.id].effect)) + " XP/s"},
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
            style: { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0 0 0 15px"},
        },
        144: {
            costBase() { return new Decimal(700) },
            costGrowth() { return new Decimal(4.8) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked() {return player.ev.evolutionsUnlocked[4]},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10</h3>" +
                    "<br>ESC: x" + format(tmp[this.layer].buyables[this.id].effect, 1) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style: { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0 0 15px 0"},
        },

        151: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>XP: x" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (!player.ev.evolutionsUnlocked[4]) look.borderRadius = "0 0 0 15px"
                return look
            },
        },
        152: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (!player.ev.evolutionsUnlocked[4]) look.borderRadius = "0 0 15px 0"
                return look
            },
        },
        153: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(2.5) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(20)},
            unlocked() {return player.ev.evolutionsUnlocked[4]},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20</h3>" +
                    "<br>XP/s: +" + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%<br>of average" +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
            },
            tooltip() {return "+" + formatSimple(player.cb.xpTimers[5].average.mul(tmp[this.layer].buyables[this.id].effect)) + " XP/s"},
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
            style: { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0 0 0 15px"},
        },
        154: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked() {return player.ev.evolutionsUnlocked[4]},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10</h3>" +
                    "<br>ESC: x" + format(tmp[this.layer].buyables[this.id].effect, 1) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style: { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0 0 15px 0"},
        },

        161: {
            costBase() { return new Decimal(16) },
            costGrowth() { return new Decimal(1.22) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>XP: x" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (!player.ev.evolutionsUnlocked[4]) look.borderRadius = "0 0 0 15px"
                return look
            },
        },
        162: {
            costBase() { return new Decimal(16) },
            costGrowth() { return new Decimal(1.32) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (!player.ev.evolutionsUnlocked[4]) look.borderRadius = "0 0 15px 0"
                return look
            },
        },
        163: {
            costBase() { return new Decimal(1600) },
            costGrowth() { return new Decimal(2.6) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(20)},
            unlocked() {return player.ev.evolutionsUnlocked[4]},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20</h3>" +
                    "<br>XP/s: +" + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%<br>of average" +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
            },
            tooltip() {return "+" + formatSimple(player.cb.xpTimers[6].average.mul(tmp[this.layer].buyables[this.id].effect)) + " XP/s"},
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
            style: { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0 0 0 15px"},
        },
        164: {
            costBase() { return new Decimal(1600) },
            costGrowth() { return new Decimal(5.2) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked() {return player.ev.evolutionsUnlocked[4]},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10</h3>" +
                    "<br>ESC: x" + format(tmp[this.layer].buyables[this.id].effect, 1) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style: { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0 0 15px 0"},
        },

        171: {
            costBase() { return new Decimal(30) },
            costGrowth() { return new Decimal(1.24) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>XP: x" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (!player.ev.evolutionsUnlocked[4]) look.borderRadius = "0 0 0 15px"
                return look
            },
        },
        172: {
            costBase() { return new Decimal(30) },
            costGrowth() { return new Decimal(1.34) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (!player.ev.evolutionsUnlocked[4]) look.borderRadius = "0 0 15px 0"
                return look
            },
        },
        173: {
            costBase() { return new Decimal(3000) },
            costGrowth() { return new Decimal(2.7) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(20)},
            unlocked() {return player.ev.evolutionsUnlocked[4]},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/20</h3>" +
                    "<br>XP/s: +" + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%<br>of average" +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
            },
            tooltip() {return "+" + formatSimple(player.cb.xpTimers[7].average.mul(tmp[this.layer].buyables[this.id].effect)) + " XP/s"},
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
            style: { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0 0 0 15px"},
        },
        174: {
            costBase() { return new Decimal(3000) },
            costGrowth() { return new Decimal(5.4) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked() {return player.ev.evolutionsUnlocked[4]},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10</h3>" +
                    "<br>ESC: x" + format(tmp[this.layer].buyables[this.id].effect, 1) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style: { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0 0 15px 0"},
        },

        201: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>CRC: x" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (true) look.borderRadius = "0 0 0 15px"
                return look
            },
        },
        202: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (true) look.borderRadius = "0 0 15px 0"
                return look
            },
        },
        211: {
            costBase() { return new Decimal(30) },
            costGrowth() { return new Decimal(1.24) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>CRC: x" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (true) look.borderRadius = "0 0 0 15px"
                return look
            },
        },
        212: {
            costBase() { return new Decimal(30) },
            costGrowth() { return new Decimal(1.44) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (true) look.borderRadius = "0 0 15px 0"
                return look
            },
        },
        221: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.28) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>CRC: x" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (true) look.borderRadius = "0 0 0 15px"
                return look
            },
        },
        222: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.48) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (true) look.borderRadius = "0 0 15px 0"
                return look
            },
        },
        231: {
            costBase() { return new Decimal(300) },
            costGrowth() { return new Decimal(1.32) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>CRC: x" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (true) look.borderRadius = "0 0 0 15px"
                return look
            },
        },
        232: {
            costBase() { return new Decimal(300) },
            costGrowth() { return new Decimal(1.52) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (true) look.borderRadius = "0 0 15px 0"
                return look
            },
        },
        241: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.36) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>CRC: x" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (true) look.borderRadius = "0 0 0 15px"
                return look
            },
        },
        242: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.56) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (true) look.borderRadius = "0 0 15px 0"
                return look
            },
        },
        251: {
            costBase() { return new Decimal(3000) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>CRC: x" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (true) look.borderRadius = "0 0 0 15px"
                return look
            },
        },
        252: {
            costBase() { return new Decimal(3000) },
            costGrowth() { return new Decimal(1.6) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (true) look.borderRadius = "0 0 15px 0"
                return look
            },
        },
        261: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(1.44) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>CRC: x" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (true) look.borderRadius = "0 0 0 15px"
                return look
            },
        },
        262: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(1.64) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cb.petPoints},
            pay(amt) {player.cb.petPoints = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<h3>" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/100</h3>" +
                    "<br>Cooldown: /" + format(tmp[this.layer].buyables[this.id].effect) +
                    "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " PP"
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
            style() {
                let look = { width: '125px', height: '60px', border: "2px solid rgba(0,0,0,0.3)", borderRadius: "0"}
                if (true) look.borderRadius = "0 0 15px 0"
                return look
            },
        },
    },
    microtabs: {
        Tabs: {
            "XP Buttons": {
                buttonStyle() {return {borderColor: "#0098E5", color: "white", borderRadius: "5px"}},
                unlocked: true,
                content: [
                    ["blank", "10px"],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "XP Button 1", {color: "#cceaf9", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "37px", borderBottom: "3px solid #002d44"}],
                            ["style-column", [
                                ["raw-html", () => {return "Gain: +" + format(player.cb.xpTimers[0].base) + " XP"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Cooldown: " + formatTime(player.cb.xpTimers[0].max)}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Average: " + format(player.cb.xpTimers[0].average) + " XP/s"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "ES-Chance: " + formatSimple(player.cb.xpTimers[0].esc) + "%"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "87px", background: "#003c5b", borderBottom: "3px solid #002d44"}],
                            ["style-column", [
                                ["row", [["buyable", 101], ["buyable", 102]]],
                                ["row", [["buyable", 103], ["buyable", 104]]],
                            ], {width: "250px"}],
                        ], {width: "250px", background: "#004C72", border: "5px solid #002d44", borderRadius: "20px", margin: "5px"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "XP Button 2", {color: "#cceaf9", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "37px", borderBottom: "3px solid #002d44"}],
                            ["style-column", [
                                ["raw-html", () => {return "Gain: +" + format(player.cb.xpTimers[1].base) + " XP"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Cooldown: " + formatTime(player.cb.xpTimers[1].max)}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Average: " + format(player.cb.xpTimers[1].average) + " XP/s"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "ES-Chance: " + formatSimple(player.cb.xpTimers[1].esc) + "%"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "87px", background: "#003c5b", borderBottom: "3px solid #002d44"}],
                            ["style-column", [
                                ["row", [["buyable", 111], ["buyable", 112]]],
                                ["row", [["buyable", 113], ["buyable", 114]]],
                            ], {width: "250px"}],
                        ], {width: "250px", background: "#004C72", border: "5px solid #002d44", borderRadius: "20px", margin: "5px"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "XP Button 3", {color: "#cceaf9", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "37px", borderBottom: "3px solid #002d44"}],
                            ["style-column", [
                                ["raw-html", () => {return "Gain: +" + format(player.cb.xpTimers[2].base) + " XP"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Cooldown: " + formatTime(player.cb.xpTimers[2].max)}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Average: " + format(player.cb.xpTimers[2].average) + " XP/s"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "ES-Chance: " + formatSimple(player.cb.xpTimers[2].esc) + "%"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "87px", background: "#003c5b", borderBottom: "3px solid #002d44"}],
                            ["style-column", [
                                ["row", [["buyable", 121], ["buyable", 122]]],
                                ["row", [["buyable", 123], ["buyable", 124]]],
                            ], {width: "250px"}],
                        ], {width: "250px", background: "#004C72", border: "5px solid #002d44", borderRadius: "20px", margin: "5px"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "XP Button 4", {color: "#cceaf9", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "37px", borderBottom: "3px solid #002d44"}],
                            ["style-column", [
                                ["raw-html", () => {return "Gain: +" + format(player.cb.xpTimers[3].base) + " XP"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Cooldown: " + formatTime(player.cb.xpTimers[3].max)}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Average: " + format(player.cb.xpTimers[3].average) + " XP/s"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "ES-Chance: " + formatSimple(player.cb.xpTimers[3].esc) + "%"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "87px", background: "#003c5b", borderBottom: "3px solid #002d44"}],
                            ["style-column", [
                                ["row", [["buyable", 131], ["buyable", 132]]],
                                ["row", [["buyable", 133], ["buyable", 134]]],
                            ], {width: "250px"}],
                        ], {width: "250px", background: "#004C72", border: "5px solid #002d44", borderRadius: "20px", margin: "5px"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "XP Button 5", {color: "#cceaf9", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "37px", borderBottom: "3px solid #002d44"}],
                            ["style-column", [
                                ["raw-html", () => {return "Gain: +" + format(player.cb.xpTimers[4].base) + " XP"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Cooldown: " + formatTime(player.cb.xpTimers[4].max)}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Average: " + format(player.cb.xpTimers[4].average) + " XP/s"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "ES-Chance: " + formatSimple(player.cb.xpTimers[4].esc) + "%"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "87px", background: "#003c5b", borderBottom: "3px solid #002d44"}],
                            ["style-column", [
                                ["row", [["buyable", 141], ["buyable", 142]]],
                                ["row", [["buyable", 143], ["buyable", 144]]],
                            ], {width: "250px"}],
                        ], {width: "250px", background: "#004C72", border: "5px solid #002d44", borderRadius: "20px", margin: "5px"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "XP Button 6", {color: "#cceaf9", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "37px", borderBottom: "3px solid #002d44"}],
                            ["style-column", [
                                ["raw-html", () => {return "Gain: +" + format(player.cb.xpTimers[5].base) + " XP"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Cooldown: " + formatTime(player.cb.xpTimers[5].max)}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Average: " + format(player.cb.xpTimers[5].average) + " XP/s"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "ES-Chance: " + formatSimple(player.cb.xpTimers[5].esc) + "%"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "87px", background: "#003c5b", borderBottom: "3px solid #002d44"}],
                            ["style-column", [
                                ["row", [["buyable", 151], ["buyable", 152]]],
                                ["row", [["buyable", 153], ["buyable", 154]]],
                            ], {width: "250px"}],
                        ], {width: "250px", background: "#004C72", border: "5px solid #002d44", borderRadius: "20px", margin: "5px"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "XP Button 7", {color: "#cceaf9", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "37px", borderBottom: "3px solid #002d44"}],
                            ["style-column", [
                                ["raw-html", () => {return "Gain: +" + format(player.cb.xpTimers[6].base) + " XP"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Cooldown: " + formatTime(player.cb.xpTimers[6].max)}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Average: " + format(player.cb.xpTimers[6].average) + " XP/s"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "ES-Chance: " + formatSimple(player.cb.xpTimers[6].esc) + "%"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "87px", background: "#003c5b", borderBottom: "3px solid #002d44"}],
                            ["style-column", [
                                ["row", [["buyable", 161], ["buyable", 162]]],
                                ["row", [["buyable", 163], ["buyable", 164]]],
                            ], {width: "250px"}],
                        ], {width: "250px", background: "#004C72", border: "5px solid #002d44", borderRadius: "20px", margin: "5px"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "XP Button 8", {color: "#cceaf9", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "37px", borderBottom: "3px solid #002d44"}],
                            ["style-column", [
                                ["raw-html", () => {return "Gain: +" + format(player.cb.xpTimers[7].base) + " XP"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Cooldown: " + formatTime(player.cb.xpTimers[7].max)}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Average: " + format(player.cb.xpTimers[7].average) + " XP/s"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "ES-Chance: " + formatSimple(player.cb.xpTimers[7].esc) + "%"}, {color: "#cceaf9", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "87px", background: "#003c5b", borderBottom: "3px solid #002d44"}],
                            ["style-column", [
                                ["row", [["buyable", 171], ["buyable", 172]]],
                                ["row", [["buyable", 173], ["buyable", 174]]],
                            ], {width: "250px"}],
                        ], {width: "250px", background: "#004C72", border: "5px solid #002d44", borderRadius: "20px", margin: "5px"}],
                    ], {maxWidth: "1080px", background: "#001e2d", border: "5px solid #002d44", borderRadius: "20px"}],
                ],
            },
            "Pet Buttons": {
                buttonStyle() {return {borderColor: "#4e7cff", color: "white", borderRadius: "5px"}},
                unlocked() {return player.ev.evolutionsUnlocked[11]},
                content: [
                    ["blank", "10px"],
                    ["style-row", [
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Crate Button 1", {color: "#dbe4ff", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "37px", borderBottom: "3px solid #17254c"}],
                            ["style-column", [
                                ["raw-html", () => {return "Crate Roll Chance: " + formatSimple(player.cb.crateTimers[0].base.mul(100), 1) + "%"}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Cooldown: " + formatTime(player.cb.crateTimers[0].max)}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Average: " + formatSimple(player.cb.crateTimers[0].average, 2) + " Rolls/s"}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "87px", background: "#1f3166", borderBottom: "3px solid #17254c"}],
                            ["style-column", [
                                ["row", [["buyable", 201], ["buyable", 202]]],
                            ], {width: "250px"}],
                        ], {width: "250px", background: "#273e7f", border: "5px solid #17254c", borderRadius: "20px", margin: "5px"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Crate Button 2", {color: "#dbe4ff", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "37px", borderBottom: "3px solid #17254c"}],
                            ["style-column", [
                                ["raw-html", () => {return "Crate Roll Chance: " + formatSimple(player.cb.crateTimers[1].base.mul(100), 1) + "%"}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Cooldown: " + formatTime(player.cb.crateTimers[1].max)}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Average: " + formatSimple(player.cb.crateTimers[1].average, 2) + " Rolls/s"}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "87px", background: "#1f3166", borderBottom: "3px solid #17254c"}],
                            ["style-column", [
                                ["row", [["buyable", 211], ["buyable", 212]]],
                            ], {width: "250px"}],
                        ], {width: "250px", background: "#273e7f", border: "5px solid #17254c", borderRadius: "20px", margin: "5px"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Crate Button 3", {color: "#dbe4ff", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "37px", borderBottom: "3px solid #17254c"}],
                            ["style-column", [
                                ["raw-html", () => {return "Crate Roll Chance: " + formatSimple(player.cb.crateTimers[2].base.mul(100), 1) + "%"}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Cooldown: " + formatTime(player.cb.crateTimers[2].max)}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Average: " + formatSimple(player.cb.crateTimers[2].average, 2) + " Rolls/s"}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "87px", background: "#1f3166", borderBottom: "3px solid #17254c"}],
                            ["style-column", [
                                ["row", [["buyable", 221], ["buyable", 222]]],
                            ], {width: "250px"}],
                        ], {width: "250px", background: "#273e7f", border: "5px solid #17254c", borderRadius: "20px", margin: "5px"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Crate Button 4", {color: "#dbe4ff", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "37px", borderBottom: "3px solid #17254c"}],
                            ["style-column", [
                                ["raw-html", () => {return "Crate Roll Chance: " + formatSimple(player.cb.crateTimers[3].base.mul(100), 1) + "%"}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Cooldown: " + formatTime(player.cb.crateTimers[3].max)}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Average: " + formatSimple(player.cb.crateTimers[3].average, 2) + " Rolls/s"}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "87px", background: "#1f3166", borderBottom: "3px solid #17254c"}],
                            ["style-column", [
                                ["row", [["buyable", 231], ["buyable", 232]]],
                            ], {width: "250px"}],
                        ], {width: "250px", background: "#273e7f", border: "5px solid #17254c", borderRadius: "20px", margin: "5px"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Crate Button 5", {color: "#dbe4ff", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "37px", borderBottom: "3px solid #17254c"}],
                            ["style-column", [
                                ["raw-html", () => {return "Crate Roll Chance: " + formatSimple(player.cb.crateTimers[4].base.mul(100), 1) + "%"}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Cooldown: " + formatTime(player.cb.crateTimers[4].max)}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Average: " + formatSimple(player.cb.crateTimers[4].average, 2) + " Rolls/s"}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "87px", background: "#1f3166", borderBottom: "3px solid #17254c"}],
                            ["style-column", [
                                ["row", [["buyable", 241], ["buyable", 242]]],
                            ], {width: "250px"}],
                        ], {width: "250px", background: "#273e7f", border: "5px solid #17254c", borderRadius: "20px", margin: "5px"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Crate Button 6", {color: "#dbe4ff", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "37px", borderBottom: "3px solid #17254c"}],
                            ["style-column", [
                                ["raw-html", () => {return "Crate Roll Chance: " + formatSimple(player.cb.crateTimers[5].base.mul(100), 1) + "%"}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Cooldown: " + formatTime(player.cb.crateTimers[5].max)}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Average: " + formatSimple(player.cb.crateTimers[5].average, 2) + " Rolls/s"}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "87px", background: "#1f3166", borderBottom: "3px solid #17254c"}],
                            ["style-column", [
                                ["row", [["buyable", 251], ["buyable", 252]]],
                            ], {width: "250px"}],
                        ], {width: "250px", background: "#273e7f", border: "5px solid #17254c", borderRadius: "20px", margin: "5px"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", "Crate Button 7", {color: "#dbe4ff", fontSize: "24px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "37px", borderBottom: "3px solid #17254c"}],
                            ["style-column", [
                                ["raw-html", () => {return "Crate Roll Chance: " + formatSimple(player.cb.crateTimers[6].base.mul(100), 1) + "%"}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Cooldown: " + formatTime(player.cb.crateTimers[6].max)}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", () => {return "Average: " + formatSimple(player.cb.crateTimers[6].average, 2) + " Rolls/s"}, {color: "#dbe4ff", fontSize: "16px", fontFamily: "monospace"}],
                            ], {width: "250px", height: "87px", background: "#1f3166", borderBottom: "3px solid #17254c"}],
                            ["style-column", [
                                ["row", [["buyable", 261], ["buyable", 262]]],
                            ], {width: "250px"}],
                        ], () => {return player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23) ? {width: "250px", background: "#273e7f", border: "5px solid #17254c", borderRadius: "20px", margin: "5px"} : {display: "none !important"}}],
                    ], {maxWidth: "1080px", background: "#0f1833", border: "5px solid #17254c", borderRadius: "20px"}],
                ],
            },
        },
    },
    tabFormat: [
        ["tooltip-row", [
            ["raw-html", "<img src='resources/petPoint.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
            ["raw-html", () => { return formatShort(player.cb.petPoints)}, {width: "95px", height: "50px", color: "#A2D800", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
            ["raw-html", "<div class='bottomTooltip'>Pet Points<hr><small>(Gained from rare pet buttons)</small></div>"],
        ], {width: "150px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
        ["blank", "10px"],
        ["microtabs", "Tabs", {borderWidth: "0"}],
        ["blank", "10px"],
        ["row", [["clickable", 2], ["clickable", 3]]],
        ["blank", "25px"],
    ],
    layerShown() { return player.ev.evolutionsUnlocked[1] }
})