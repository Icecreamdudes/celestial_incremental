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
    automate() {
        if (hasUpgrade("dn", 12)) {
            buyBuyable("dg", 11)
            buyBuyable("dg", 12)
            buyBuyable("dg", 13)
            buyBuyable("dg", 14)
            buyBuyable("dg", 15)
            buyBuyable("dg", 16)
        }
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
    branches: [["dp", "#309"]],
    color: "black",
    update(delta) {
        let onepersec = new Decimal(1)

        player.dg.generatorsToGet = player.dp.prestigePoints.pow(0.35).floor()
        if (getLevelableBool("pu", 106)) player.dg.generatorsToGet = player.dg.generatorsToGet.mul(levelableEffect("pu", 106)[0])
        if (getLevelableBool("pu", 106)) player.dg.generatorsToGet = player.dg.generatorsToGet.mul(buyableEffect("dg", 14))
        if (getLevelableBool("pu", 301)) player.dg.generatorsToGet = player.dg.generatorsToGet.mul(levelableEffect("pu", 301)[0])
        player.dg.generatorsToGet = player.dg.generatorsToGet.mul(levelableEffect("st", 106)[0])
        
        // GENERATOR SOFTCAP
        if (player.dg.generatorsToGet.gte(1e100)) player.dg.generatorsToGet = player.dg.generatorsToGet.div(1e100).pow(0.2).mul(1e100)

        player.dg.generatorEffect = player.dg.generators.pow(1.5)

        player.dg.generatorPower = player.dg.generatorPower.add(player.dg.generatorPowerPerSecond.mul(delta))
        player.dg.generatorPowerPerSecond = player.dg.generatorEffect
        if (getLevelableBool("pu", 107)) player.dg.generatorPowerPerSecond = player.dg.generatorPowerPerSecond.mul(levelableEffect("pu", 107)[0])
        if (getLevelableBool("pu", 107)) player.dg.generatorPowerPerSecond = player.dg.generatorPowerPerSecond.mul(buyableEffect("dg", 15))
        if (getLevelableBool("pu", 301)) player.dg.generatorPowerPerSecond = player.dg.generatorPowerPerSecond.mul(levelableEffect("pu", 301)[0])
        player.dg.generatorPowerPerSecond = player.dg.generatorPowerPerSecond.mul(levelableEffect("st", 107)[0])

        // GENERATOR POWER SOFTCAP
        if (player.dg.generatorPowerPerSecond.gte(1e250)) player.dg.generatorPowerPerSecond = player.dg.generatorPowerPerSecond.div(1e250).pow(0.2).mul(1e250)

        if (player.dg.generatorPause.gte(0)) {
            layers.dg.generatorReset();
        }
        player.dg.generatorPause = player.dg.generatorPause.sub(1)

        if (player.dg.generatorPower.lt(1e9)) {
            player.dg.generatorPowerEffect = player.dg.generatorPower.add(1).pow(0.5).pow(player.dgr.grassEffect)
        } else if (player.dg.generatorPower.lt(1e25)) {
            player.dg.generatorPowerEffect = player.dg.generatorPower.add(1).pow(0.25).mul(177.83).pow(player.dgr.grassEffect)
        } else if (player.dg.generatorPower.lt(1e100)) {
            player.dg.generatorPowerEffect = player.dg.generatorPower.add(1).pow(0.1).mul(1e6).pow(player.dgr.grassEffect)
        } else {
            player.dg.generatorPowerEffect = player.dg.generatorPower.add(1).pow(0.05).mul(1e11).pow(player.dgr.grassEffect)
        }

        player.dg.generators = player.dg.generators.add(player.dg.generatorsToGet.mul(buyableEffect("dn", 13)).mul(delta))
        if (hasUpgrade("sma", 205)) player.dg.generators = player.dg.generators.add(player.dg.generatorsToGet.mul(0.01).mul(delta))
    },
    bars: {},
    generatorReset() {
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
        player.dp.buyables[14] = new Decimal(0)
        player.dp.buyables[15] = new Decimal(0)

        player.dg.generatorPower = new Decimal(0)
    },
    clickables: {
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
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.5).add(1).pow(1.2)
                if (getLevelableBool("pu", 203)) eff = eff.pow(levelableEffect("pu", 203)[1])
                return eff
            },
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
                if (mult != true && !hasUpgrade("dn", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("dn", 12)) this.pay(cost)

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
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.5).add(1).pow(1.25) },
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
                if (mult != true && !hasUpgrade("dn", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("dn", 12)) this.pay(cost)

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
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.5).add(1).pow(1.3)
                if (getLevelableBool("pu", 204)) eff = eff.pow(levelableEffect("pu", 204)[1])
                return eff
            },
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
                if (mult != true && !hasUpgrade("dn", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("dn", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#052c1e", borderColor: "#0a593c" }
        },
        14: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.dg.generatorPower},
            pay(amt) { player.dg.generatorPower = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.2, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getLevelableBool("pu", 106) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Generator Gen Booster"
            },
            display() {
                return "which are multiplying generators by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Generator Power"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("dn", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#052c1e", borderColor: "#0a593c" }
        },
        15: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(25) },
            purchaseLimit() { return new Decimal(150) },
            currency() { return player.dg.generatorPower},
            pay(amt) { player.dg.generatorPower = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.15, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getLevelableBool("pu", 107) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Gen-Power Gen Booster"
            },
            display() {
                return "which are multiplying generator power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Generator Power"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("dn", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#052c1e", borderColor: "#0a593c" }
        },
        16: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(200) },
            currency() { return player.dg.generatorPower},
            pay(amt) { player.dg.generatorPower = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.1, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getLevelableBool("pu", 205) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass Gen Booster"
            },
            display() {
                return "which are multiplying grass value and cap by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Generator Power"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("dn", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#052c1e", borderColor: "#0a593c" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #0a593c", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["row", [
                        ["raw-html", () => {return "You have <h3>" + formatWhole(player.dg.generators) + "</h3> generators"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + formatWhole(player.dg.generatorsToGet) + ")" }, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
                        ["raw-html", () => {return (player.dg.generatorsToGet.gte(1e100)) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "18px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["raw-html", () => {return "Provides a base generator power gain of +" + format(player.dg.generatorEffect) + "/s"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [
                        ["raw-html", () => {return "You have <h3>" + format(player.dg.generatorPower) + "</h3> generator power"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.dg.generatorPowerPerSecond) + "/s)"}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
                        ["raw-html", () => {return (player.dg.generatorPowerPerSecond.gte(1e250)) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "18px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["row", [
                        ["raw-html", () => {return "Boosts point gain by x" + format(player.dg.generatorPowerEffect)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {
                            if (player.dg.generatorPower.lt(1e9)) {
                                return ""
                            } else if (player.dg.generatorPower.lt(1e25)) {
                                return "[SOFTCAPPED]"
                            } else if (player.dg.generatorPower.lt(1e100)) {
                                return "[SOFTCAPPED<sup>2</sup>]"
                            } else {
                                return "[SOFTCAPPED<sup>3</sup>]"
                            }
                        }, {color: "red", fontSize: "18px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["style-row", [["dark-buyable", 11], ["dark-buyable", 12], ["dark-buyable", 13],
                        ["dark-buyable", 14], ["dark-buyable", 15], ["dark-buyable", 16]], {maxWidth: "900px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, {color: "white", fontSize: "24px", fontFamily: "monospace" }],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, {color: "white", fontSize: "16px", fontFamily: "monospace" }],
        ["raw-html", () => { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, {color: "red", fontSize: "16px", fontFamily: "monospace" }],
        ["raw-html", () => { return player.du.pointGain.gte(player.du.secondSoftcapStart) ? "UNAVOIDABLE SOFTCAP<sup>2</sup>: Gain past " + format(player.du.secondSoftcapStart) + " is raised by ^" + format(player.du.pointSoftcap2) + "." : "" }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legendaryPetAbilityTimers[0].gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legendaryPetAbilityTimers[0]) + "." : ""}, {color: "#FEEF5F", fontSize: "20px", fontFamily: "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return hasUpgrade("le", 17) },
    deactivated() { return !player.sma.inStarmetalChallenge},
})