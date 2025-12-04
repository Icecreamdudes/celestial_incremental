addLayer("sb", {
    name: "Space Buildings", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SB", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "A2",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        storedSpaceEnergy: new Decimal(0), //make sure to connect to du1

        maxBuildingSlots: new Decimal(0), //used building slots determined by buyable amounts
        usedBuildingSlots: new Decimal(0), 
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(15deg, #5f5f5fff 0%, #c5c5c5ff 50%, #5f5f5fff 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#464646ff",
            color: "#eaf6f7",
        };
    },
    tooltip: "Space Buildings",
    branches: ["ir"],
    color: "#464646ff",
    update(delta) {
        let onepersec = new Decimal(1)

        player.sb.maxBuildingSlots = buyableEffect("sb", 11)

        player.sb.usedBuildingSlots = player.sb.buyables[101].add(player.sb.buyables[102]).add(player.sb.buyables[103])
    },
    bars: {},
    clickables: {
        1: {
            title() { return "Respec Space Buildings" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.sb.buyables[101] = new Decimal(0)
                player.sb.buyables[102] = new Decimal(0)
                player.sb.buyables[103] = new Decimal(0)
            },
            style() {
                let look = {width: "100px", minHeight: "50px", borderRadius: "15px 15px 15px 15px"}
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
    },
    levelables: {},
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(1000) },
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
                return "which are providing " + formatWhole(tmp[this.layer].buyables[this.id].effect) + " building slots.\n\
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

        //building
        101: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return player.sb.maxBuildingSlots.sub(player.sb.buyables[102]).sub(player.sb.buyables[103]).sub(player.sb.buyables[104]).sub(player.sb.buyables[105]).sub(player.sb.buyables[106]) },
            currency() { return player.ir.spaceRock},
            pay(amt) { player.ir.spaceRock = this.currency().sub(amt) },
            effect(x) { return player.sb.storedSpaceEnergy.pow(0.4).pow(getBuyableAmount(this.layer, this.id).pow(0.15)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Primary Space Building"
            },
            display() {
                return "Stored space energy boosts star gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
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
            purchaseLimit() { return player.sb.maxBuildingSlots.sub(player.sb.buyables[101]).sub(player.sb.buyables[103]).sub(player.sb.buyables[104]).sub(player.sb.buyables[105]).sub(player.sb.buyables[106]) },
            currency() { return player.ir.spaceRock},
            pay(amt) { player.ir.spaceRock = this.currency().sub(amt) },
            effect(x) { return player.sb.storedSpaceEnergy.plus(1).log10().div(3).add(1).pow(getBuyableAmount(this.layer, this.id).pow(0.125)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Secondary Space Building"
            },
            display() {
                return "Stored space energy boosts core framgent scores by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
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
            purchaseLimit() { return player.sb.maxBuildingSlots.sub(player.sb.buyables[101]).sub(player.sb.buyables[102]).sub(player.sb.buyables[104]).sub(player.sb.buyables[105]).sub(player.sb.buyables[106]) },
            currency() { return player.ir.spaceGem},
            pay(amt) { player.ir.spaceGem = this.currency().sub(amt) },
            effect(x) { return player.sb.storedSpaceEnergy.plus(1).log10().div(25).add(1).pow(getBuyableAmount(this.layer, this.id).pow(0.12)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tertiary Space Building"
            },
            display() {
                return "Stored space energy boosts infinity points by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
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
            purchaseLimit() { return player.sb.maxBuildingSlots.sub(player.sb.buyables[101]).sub(player.sb.buyables[102]).sub(player.sb.buyables[103]).sub(player.sb.buyables[105]).sub(player.sb.buyables[106])  },
            currency() { return player.ir.spaceGem},
            pay(amt) { player.ir.spaceGem = this.currency().sub(amt) },
            effect(x) { return player.sb.storedSpaceEnergy.plus(1).log10().div(55).add(1).pow(getBuyableAmount(this.layer, this.id).pow(0.115)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Quarternary Space Building"
            },
            display() {
                return "Stored space energy boosts singularity points by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
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
            purchaseLimit() { return player.sb.maxBuildingSlots.sub(player.sb.buyables[101]).sub(player.sb.buyables[102]).sub(player.sb.buyables[103]).sub(player.sb.buyables[104]).sub(player.sb.buyables[106])},
            currency() { return player.ir.spaceRock},
            pay(amt) { player.ir.spaceRock = this.currency().sub(amt) },
            effect(x) { return player.sb.storedSpaceEnergy.plus(1).log10().div(15).add(1).pow(getBuyableAmount(this.layer, this.id).pow(0.11)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Quinary Space Building"
            },
            display() {
                return "Stored space energy boosts antimatter gain by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
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
            purchaseLimit() { return player.sb.maxBuildingSlots.sub(player.sb.buyables[101]).sub(player.sb.buyables[102]).sub(player.sb.buyables[103]).sub(player.sb.buyables[104]).sub(player.sb.buyables[105])   },
            currency() { return player.ir.spaceRock},
            pay(amt) { player.ir.spaceRock = this.currency().sub(amt) },
            effect(x) { return player.sb.storedSpaceEnergy.plus(1).log10().div(20).add(1).pow(getBuyableAmount(this.layer, this.id).pow(0.105)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Senary Space Building"
            },
            display() {
                return "Stored space energy boosts factor power, rank, tier, and tetr effects by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
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
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #37078f", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.sb.storedSpaceEnergy) + "</h3> space energy. (From D1)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11],]],
                    ["blank", "25px"],
                    ["raw-html", function () { return formatWhole(player.sb.usedBuildingSlots) + "/" + formatWhole(player.sb.maxBuildingSlots) + " building slots."}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 1],]],
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
