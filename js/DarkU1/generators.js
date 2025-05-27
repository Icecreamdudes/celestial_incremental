
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
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(120deg, #a8dca4 0%, #53bd96 50%, #147363 100%)",
            "background-origin": "border-box",
            "border-color": "#0a593c",
            "color": "#eaf6f7",
        };
    },
    tooltip: "Generators",
    branches: [["le", "#4f0694"]],
    color: "black",
    update(delta) {
        let onepersec = new Decimal(1)

        player.dg.generatorsToGet = player.dp.prestigePoints.pow(0.35).floor()
        if (player.le.punchcards[7]) player.dg.generatorsToGet = player.dg.generatorsToGet.mul(player.le.punchcardsEffect[7])
        if (player.le.punchcards[15]) player.dg.generatorsToGet = player.dg.generatorsToGet.mul(player.le.punchcardsEffect[15])
        
        // GENERATOR SOFTCAP
        if (player.dg.generatorsToGet.gte(1e100)) player.dg.generatorsToGet = player.dg.generatorsToGet.div(1e100).pow(0.2).mul(1e100)

        player.dg.generatorEffect = player.dg.generators.pow(1.5)

        player.dg.generatorPower = player.dg.generatorPower.add(player.dg.generatorPowerPerSecond.mul(delta))
        player.dg.generatorPowerPerSecond = player.dg.generatorEffect
        if (player.le.punchcards[8]) player.dg.generatorPowerPerSecond = player.dg.generatorPowerPerSecond.mul(player.le.punchcardsEffect[8])
        if (player.le.punchcards[15]) player.dg.generatorPowerPerSecond = player.dg.generatorPowerPerSecond.mul(player.le.punchcardsEffect[15])

        // GENERATOR POWER SOFTCAP
        if (player.dg.generatorPowerPerSecond.gte(1e250)) player.dg.generatorPowerPerSecond = player.dg.generatorPowerPerSecond.div(1e250).pow(0.1).mul(1e250)

        if (player.dg.generatorPause.gte(0))
        {
            layers.dg.generatorReset();
        }
        player.dg.generatorPause = player.dg.generatorPause.sub(1)

        player.dg.generatorPowerEffect = player.dg.generatorPower.pow(0.25).add(1).pow(player.dgr.grassEffect)

        player.dg.generators = player.dg.generators.add(player.dg.generatorsToGet.mul(buyableEffect("dn", 13)).mul(delta))
    },
    bars: {},
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
            style: { width: "100px", minHeight: "50px", color: "white", borderRadius: "10px", border: "2px solid #0a593c" },
        },
        11: {
            title() { return "<h2>Reset previous content for generators." },
            canClick() { return player.dg.generatorsToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.dg.generators = player.dg.generators.add(player.dg.generatorsToGet)
                player.dg.generatorPause = new Decimal(10)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid #0a593c", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
    },
    upgrades: {},
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
                return "Point Gen Booster"
            },
            display() {
                return "which are boosting point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Generator Power"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#052c1e", borderColor: "#0a593c" }
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
                return "Rank-Tier-Tetr Gen Booster"
            },
            display() {
                return "which are boosting rank/tier/tetr point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Generator Power"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#052c1e", borderColor: "#0a593c" }
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
                return "Prestige Gen Booster"
            },
            display() {
                return "which are boosting prestige point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Generator Power"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#052c1e", borderColor: "#0a593c" }
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
                buttonStyle() { return { border: "2px solid #0a593c", borderRadius: "10px" } },
                unlocked() { return true },
                content:
                [
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.dg.generators) + "</h3> generators." }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["row", [
                        ["raw-html", () => { return "You will gain <h3>" + formatWhole(player.dg.generatorsToGet) + "</h3> generators on reset." }, { color: "white", fontSize: "24px", fontFamily: "monospace", paddingRight: "10px" }],
                        ["raw-html", () => { return (player.dg.generatorsToGet.gte(1e100)) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "18px", fontFamily: "monospace"}],
                    ]],
                    ["raw-html", function () { return "Generators provide a base generator power gain of <h3>" + format(player.dg.generatorEffect) + "</h3>." }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.dg.generatorPower) + "</h3> generator power." }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["row", [
                        ["raw-html", () => { return "You are generating <h3>" + format(player.dg.generatorPowerPerSecond) + "</h3> generator power per second." }, { color: "white", fontSize: "24px", fontFamily: "monospace", paddingRight: "10px" }],
                        ["raw-html", () => { return (player.dg.generatorPowerPerSecond.gte(1e250)) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "18px", fontFamily: "monospace"}],
                    ]],
                    ["raw-html", function () { return "Generator power boosts point gain by x<h3>" + format(player.dg.generatorPowerEffect) + "</h3>." }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["row", [["dark-buyable", 11], ["dark-buyable", 12], ["dark-buyable", 13]]],
                ]
            },
        },
    },

    tabFormat: [
         ["raw-html", function () { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
         ["raw-html", function () { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, { "color": "red", "font-size": "16px", "font-family": "monospace" }],
         ["raw-html", function () { return player.du.pointGain.gte(player.du.secondSoftcapStart) ? "UNAVOIDABLE SOFTCAP<sup>2</sup>: Gain past " + format(player.du.secondSoftcapStart) + " is raised by ^" + format(player.du.pointSoftcap2) + "." : "" }, { "color": "red", "font-size": "16px", "font-family": "monospace" }],
         ["row", [["clickable", 1]]],
         ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return hasUpgrade("le", 17) },
    deactivated() { return !player.sma.inStarmetalChallenge},
})