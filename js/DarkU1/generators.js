
addLayer("dg", {
    name: "Generators", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        generators: new Decimal(0),
        generatorPause: new Decimal(0),
        generatorEffect: new Decimal(0),
        generatorsToGet: new Decimal(0),

        generatorPower: new Decimal(0),
        generatorPowerEffect: new Decimal(1),
        generatorPowerPerSecond: new Decimal(0),

        gMax: false,
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(120deg, #a8dca4 0%, #53bd96 50%, #147363 100%)",
            "background-origin": "border-box",
            "border-color": "#0a593c",
            "color": "#eaf6f7",
        };
    },
    tooltip: "Generators",
    branches: ["le"],
    color: "black",
    update(delta) {
        let onepersec = new Decimal(1)

        player.dg.generatorsToGet = player.dp.prestigePoints.pow(0.35).floor()
        if (player.le.punchcards[7]) player.dg.generatorsToGet = player.dg.generatorsToGet.mul(player.le.punchcardsEffect[7])
        player.dg.generatorsToGet = player.dg.generatorsToGet.mul(player.dgr.grassEffect)
        if (player.le.punchcards[15]) player.dg.generatorsToGet = player.dg.generatorsToGet.mul(player.le.punchcardsEffect[15])

        player.dg.generatorEffect = player.dg.generators.pow(1.5)

        player.dg.generatorPower = player.dg.generatorPower.add(player.dg.generatorPowerPerSecond.mul(delta))
        player.dg.generatorPowerPerSecond = player.dg.generatorEffect
        if (player.le.punchcards[8]) player.dg.generatorPowerPerSecond = player.dg.generatorPowerPerSecond.mul(player.le.punchcardsEffect[8])
        if (player.le.punchcards[15]) player.dg.generatorPowerPerSecond = player.dg.generatorPowerPerSecond.mul(player.le.punchcardsEffect[15])

        if (player.dg.generatorPause.gte(0))
        {
            layers.dg.generatorReset();
        }
        player.dg.generatorPause = player.dg.generatorPause.sub(1)

        player.dg.generatorPowerEffect = player.dg.generatorPower.pow(0.25).add(1)

        player.dg.generators = player.dg.generators.add(player.dg.generatorsToGet.mul(buyableEffect("dn", 13)).mul(delta))
    },
    bars: {
    },
    generatorReset()
    {
        player.du.points = new Decimal(0)
        player.dr.rank = new Decimal(0)
        player.dr.tier = new Decimal(0)
        player.dr.tetr = new Decimal(0)

        player.dr.rankPoints = new Decimal(0)
        player.dr.tierPoints = new Decimal(0)
        player.dr.tetrPoints = new Decimal(0)

        player.dp.prestigePoints = new Decimal(0)
        player.dp.buyables[11] = new Decimal(0)
        player.dp.buyables[12] = new Decimal(0)
        player.dp.buyables[13] = new Decimal(0)

        player.dg.generatorPower = new Decimal(0)
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "du"
            },
            style: { width: '100px', "min-height": '50px', color: "white" },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.dg.gMax == false },
            unlocked() { return true },
            onClick() {
                player.dg.gMax = true
            },
            style: { width: '75px', "min-height": '50px', color: "white" }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.dg.gMax == true  },
            unlocked() { return true },
            onClick() {
                player.dg.gMax = false
            },
            style: { width: '75px', "min-height": '50px', color: "white" }
        },
        11: {
            title() { return "<h2>Reset previous content for generators." },
            canClick() { return player.dg.generatorsToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.dg.generators = player.dg.generators.add(player.dg.generatorsToGet)
                player.dg.generatorPause = new Decimal(10)
            },
            style: { width: '400px', "min-height": '100px', color: "white" },
        },
    },

    upgrades: {

    },
    buyables: {
        11: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.dg.generatorPower},
            pay(amt) { player.dg.generatorPower = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.2).mul(0.3).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/500<br/>Point Gen Booster"
            },
            display() {
                return "which are boosting point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Generator Power"
            },
            buy() {
                if (player.dg.gMax == false) {
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
        12: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(2.25) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.dg.generatorPower},
            pay(amt) { player.dg.generatorPower = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.22).mul(0.3).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/500<br/>Rank-Tier-Tetr Gen Booster"
            },
            display() {
                return "which are boosting rank/tier/tetr point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Generator Power"
            },
            buy() {
                if (player.dg.gMax == false) {
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
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(2.5) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.dg.generatorPower},
            pay(amt) { player.dg.generatorPower = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.24).mul(0.3).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/500<br/>Prestige Gen Booster"
            },
            display() {
                return "which are boosting prestige point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Generator Power"
            },
            buy() {
                if (player.dg.gMax == false) {
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
    milestones: {

    },
    challenges: {
    },
    infoboxes: {

    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'border-color': 'black' } },
                unlocked() { return true },
                content:
                [
         ["raw-html", function () { return "You have <h3>" + formatWhole(player.dg.generators) + "</h3> generators." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You will gain <h3>" + formatWhole(player.dg.generatorsToGet) + "</h3> generators on reset." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "Generators provide a base generator power gain of <h3>" + format(player.dg.generatorEffect) + "</h3>." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["blank", "25px"],
         ["raw-html", function () { return "You have <h3>" + format(player.dg.generatorPower) + "</h3> generator power." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are generating <h3>" + format(player.dg.generatorPowerPerSecond) + "</h3> generator power per second." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "Generator power boosts point gain by x<h3>" + format(player.dg.generatorPowerEffect) + "</h3>." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["blank", "25px"],
         ["row", [["clickable", 11]]],
         ["blank", "25px"],
         ["row", [["clickable", 2], ["clickable", 3]]],
         ["blank", "25px"],
         ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13]]],


        ]

            },
        },
    },

    tabFormat: [
         ["raw-html", function () { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
         ["raw-html", function () { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, { "color": "red", "font-size": "16px", "font-family": "monospace" }],
         ["row", [["clickable", 1]]],
         ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return hasUpgrade("le", 17) }
})