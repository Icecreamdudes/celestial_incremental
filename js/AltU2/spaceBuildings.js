addLayer("sb", {
    name: "Space Buildings", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SB", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "A2",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        storedSpaceEnergy: new Decimal(0), //make sure to connect to du1
        sseEffect: new Decimal(1),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(15deg, #5f5f5f 12.5%, #bfbfbf 50%, #5f5f5f 87.5%)",
            backgroundOrigin: "border-box",
            borderColor: "#464646",
            color: "white",
        };
    },
    tooltip: "Space Buildings",
    branches: ["ir"],
    color: "#464646",
    update(delta) {
        let onepersec = new Decimal(1)

        player.sb.sseEffect = player.sb.storedSpaceEnergy.add(1).log(10).pow(0.5).div(10).add(1)
    },
    buyables: {
        12: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.sb.storedSpaceEnergy},
            pay(amt) { player.sb.storedSpaceEnergy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Slot Adder"
            },
            display() {
                return "which are increasing building caps by +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Stored Space Energy"
            },
            buy(mult) {
                if (!mult) {
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
            style: { width: '275px', height: '150px', color: "white" }
        },
        13: {
            costBase() { return new Decimal(1e3) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.prj.storedTimeCapsules},
            pay(amt) { player.prj.storedTimeCapsules = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked() { return hasUpgrade("ir", 35) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Slot Adder II"
            },
            display() {
                return "which are increasing building caps by +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Stored Time Capsules"
            },
            buy(mult) {
                if (!mult) {
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
            style: { width: '275px', height: '150px', color: "white" }
        },
        //building
        101: {
            costBase() {return new Decimal(500) },
            costGrowth() {return new Decimal(1.2) },
            purchaseLimit() {return buyableEffect("sb", 12).add(buyableEffect("sb", 13))},
            currency() { return player.ir.spaceRock},
            pay(amt) { player.ir.spaceRock = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(4).pow(player.sb.sseEffect) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Primary Space Building"
            },
            display() {
                return "Boosts star gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    <small>(Ignoring Softcap)</small>\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Space Rocks"
            },
            buy(mult) {
                if (!mult) {
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
            style: { width: '275px', height: '150px', color: "white" }
        },
        102: {
            costBase() { return new Decimal(750) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() {return buyableEffect("sb", 12).add(buyableEffect("sb", 13))},
            currency() { return player.ir.spaceRock},
            pay(amt) { player.ir.spaceRock = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.15).mul(player.sb.sseEffect).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Secondary Space Building"
            },
            display() {
                return "Boosts core fragment scores by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Space Rocks"
            },
            buy(mult) {
                if (!mult) {
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
            style: { width: '275px', height: '150px', color: "white" }
        },
        103: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() {return buyableEffect("sb", 12).add(buyableEffect("sb", 13))},
            currency() { return player.ir.spaceGem},
            pay(amt) { player.ir.spaceGem = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.75).mul(0.01).mul(player.sb.sseEffect).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tertiary Space Building"
            },
            display() {
                return "Boosts infinity points by ^" + format(tmp[this.layer].buyables[this.id].effect, 3) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Space Gems"
            },
            buy(mult) {
                if (!mult) {
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
            style: { width: '275px', height: '150px', color: "white" }
        },
        104: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() {return buyableEffect("sb", 12).add(buyableEffect("sb", 13))},
            currency() { return player.ir.spaceGem},
            pay(amt) { player.ir.spaceGem = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.75).mul(0.015).mul(player.sb.sseEffect).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Quarternary Space Building"
            },
            display() {
                return "Boosts singularity points by ^" + format(tmp[this.layer].buyables[this.id].effect, 3) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Space Gems"
            },
            buy(mult) {
                if (!mult) {
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
            style: { width: '275px', height: '150px', color: "white" }
        },
        105: {
            costBase() { return new Decimal(1250) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() {return buyableEffect("sb", 12).add(buyableEffect("sb", 13))},
            currency() { return player.ir.spaceRock},
            pay(amt) { player.ir.spaceRock = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.75).mul(0.02).mul(player.sb.sseEffect).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Quinary Space Building"
            },
            display() {
                return "Boosts antimatter gain by ^" + format(tmp[this.layer].buyables[this.id].effect, 3) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Space Rocks"
            },
            buy(mult) {
                if (!mult) {
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
            style: { width: '275px', height: '150px', color: "white" }
        },
        106: {
            costBase() { return new Decimal(1500) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() {return buyableEffect("sb", 12).add(buyableEffect("sb", 13))},
            currency() { return player.ir.spaceRock},
            pay(amt) { player.ir.spaceRock = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.75).mul(0.03).mul(player.sb.sseEffect).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Senary Space Building"
            },
            display() {
                return "Boosts factor power, rank, tier, and tetr effects by ^" + format(tmp[this.layer].buyables[this.id].effect, 3) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Space Rocks"
            },
            buy(mult) {
                if (!mult) {
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
            style: { width: '275px', height: '150px', color: "white" }
        },
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #37078f", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => { return "You have <h3>" + format(player.sb.storedSpaceEnergy) + "</h3> space energy. (From Dark Universe)" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts space building effects by " + formatSimple(player.sb.sseEffect.sub(1).mul(100)) + "%" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 12],["ex-buyable", 13],]],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 101],["ex-buyable", 102],["ex-buyable", 103],]],
                    ["row", [["ex-buyable", 104],["ex-buyable", 105],["ex-buyable", 106],]],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.ir.spaceRock) + "</h3> space rocks." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.ir.spaceGem) + "</h3> space gems." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return hasUpgrade("ir", 15) }
})
