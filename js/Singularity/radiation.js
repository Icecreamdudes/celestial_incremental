addLayer("ra", {
    name: "Radiation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RA", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        radiation: new Decimal(0),
        storedRadiation: new Decimal(0),
        radiationPerSecond: new Decimal(0),

        radiationSoftcapEffect: new Decimal(1),
        radiationSoftcapStart: new Decimal(10000),
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
            player.ra.radiationPerSecond = player.ra.radiationPerSecond.add(player.co.cores[i].level.pow(CORE_STRENGTH[player.co.cores[i].strength].buff).pow(0.8).div(5))
        }
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.div(player.ra.radiationSoftcapEffect)
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(buyableEffect("ra", 13))
        if (hasUpgrade("ev8", 19)) player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(upgradeEffect("ev8", 19))
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(buyableEffect("fu", 52))
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(levelableEffect("pet", 1205)[0])
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(player.co.cores.singularity.effect[1])
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(levelableEffect("pet", 309)[0])
        
        if (hasMilestone("s", 13)) player.ra.radiation = player.ra.radiation.add(player.ra.radiationPerSecond.mul(delta))

        player.ra.radiationSoftcapStart = new Decimal(10000)
        player.ra.radiationSoftcapStart = player.ra.radiationSoftcapStart.mul(buyableEffect("ra", 11)) 
        player.ra.radiationSoftcapStart = player.ra.radiationSoftcapStart.mul(buyableEffect("cs", 12))
        player.ra.radiationSoftcapStart = player.ra.radiationSoftcapStart.mul(buyableEffect("sma", 13)) 

        player.ra.radiationSoftcapEffect = new Decimal(1)
        if (player.ra.radiation.gte(player.ra.radiationSoftcapStart)) {
            player.ra.radiationSoftcapEffect = player.ra.radiation.sub(player.ra.radiationSoftcapStart).pow(0.345)
            player.ra.radiationSoftcapEffect = player.ra.radiationSoftcapEffect.div(buyableEffect("ra", 12))
            player.ra.radiationSoftcapEffect = player.ra.radiationSoftcapEffect.div(buyableEffect("cs", 12))
        }
    },
    clickables: {},
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
            style: { width: '275px', height: '150px', }
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
                        ["ex-buyable", 14], ["ex-buyable", 15], ["ex-buyable", 16]
                    ], {maxWidth: "840px"}],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Radiation gain is based on core progress." }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                ],
            },
        },
    }, 
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.s.singularityPoints) + "</h3> singularity points." }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["raw-html", function () { return "You will gain " + format(player.s.singularityPointsToGet) + " singularity points on reset. (Based on infinity points)" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", function () { return "(Highest: " + format(player.s.highestSingularityPoints) + ")" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasMilestone("s", 13)  }
})
