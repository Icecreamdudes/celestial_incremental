addLayer("dn", {
    name: "Normality", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        normality: new Decimal(0),
        normalityEffect: new Decimal(1),
        normalityToGet: new Decimal(0), //based on points

        normalityPause: new Decimal(0),

        nMax: false,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(150deg,rgb(122, 177, 14) 0%,rgba(193, 223, 0) 50%,rgb(116, 141, 3) 100%)",
            "background-origin": "border-box",
            "border-color": "#80ff6f",
            "color": "#eaf6f7",
        };
    },
    tooltip: "Normality",
    branches: [["dgr", "#309"]],
    color: "#c1df00",
    update(delta) {
        let onepersec = new Decimal(1)

        player.dn.normalityToGet = player.du.points.div(1e30).pow(0.1).div(10)
        player.dn.normalityToGet = player.dn.normalityToGet.mul(buyableEffect("ma", 24))
        player.dn.normalityToGet = player.dn.normalityToGet.mul(levelableEffect("st", 207)[0])
        player.dn.normalityToGet = player.dn.normalityToGet.mul(buyableEffect("st", 106))

        player.dn.normalityEffect = player.dn.normality.mul(10).pow(3).add(1)

        player.dn.normalityPause = player.dn.normalityPause.sub(1)
        if (player.dn.normalityPause.gte(1)) layers.dn.normalityReset();
    },
    bars: {},
    clickables: {
        11: {
            title() { return "<h2>Reset previous content except grass for normality.<br>(Based on points)" },
            canClick() { return player.dn.normalityToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.dn.normality = player.dn.normality.add(player.dn.normalityToGet)
                player.dn.normalityPause = new Decimal(10)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid #c1df00", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
    },
    normalityReset() {
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
        player.dp.buyables[16] = new Decimal(0)

        player.dg.generators = new Decimal(0)
        player.dg.generatorPower = new Decimal(0)

        player.dg.buyables[11] = new Decimal(0)
        player.dg.buyables[12] = new Decimal(0)
        player.dg.buyables[13] = new Decimal(0)
        player.dg.buyables[14] = new Decimal(0)
        player.dg.buyables[15] = new Decimal(0)
        player.dg.buyables[16] = new Decimal(0)

    },
    upgrades: {
        11: {
            title: "Normality Upgrade I",
            unlocked() { return hasUpgrade("sma", 18) },
            description: "Autobuy prestige buyables.",
            cost: new Decimal(1e10),
            currencyLocation() { return player.dn },
            currencyDisplayName: "Normality",
            currencyInternalName: "normality",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #c1df00", margin: "1.5px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        12: {
            title: "Normality Upgrade II",
            unlocked() { return hasUpgrade("sma", 18) },
            description: "Autobuy generator buyables.",
            cost: new Decimal(1e12),
            currencyLocation() { return player.dn },
            currencyDisplayName: "Normality",
            currencyInternalName: "normality",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #c1df00", margin: "1.5px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        13: {
            title: "Normality Upgrade III",
            unlocked() { return hasUpgrade("sma", 18) },
            description: "Autobuy grass buyables.",
            cost: new Decimal(1e15),
            currencyLocation() { return player.dn },
            currencyDisplayName: "Normality",
            currencyInternalName: "normality",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #c1df00", margin: "1.5px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(4) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.dn.normality},
            pay(amt) { player.dn.normality = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/100<br/>Starmetal Alloyer"
            },
            display() {
                return "which are multiplying total starmetal alloy gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Normality"
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
            style: { width: '275px', height: '150px', color: "black" }
        },
        12: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.dn.normality},
            pay(amt) { player.dn.normality = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/100<br/>Prestige Generation"
            },
            display() {
                return "which are generating " + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + "% of prestige points per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Normality"
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
            style: { width: '275px', height: '150px', color: "black" }
        },
        13: {
            costBase() { return new Decimal(25000) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.dn.normality},
            pay(amt) { player.dn.normality = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/100<br/>Generator Generation"
            },
            display() {
                return "which are generating " + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + "% of generators per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Normality"
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
            style: { width: '275px', height: '150px', color: "black" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return {borderColor: "#c1df00"}},
                unlocked: true,
                content: [
                    ["blank", "10px"],
                    ["row", [
                        ["raw-html", () => { return "You have " + format(player.dn.normality) + " normality"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "(+" + format(player.dn.normalityToGet) + ")"}, () => {
                            let look = {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                            player.dn.normalityToGet.gte(1) ? look.color = "white" : look.color = "gray"
                            return look
                        }],
                    ]],
                    ["raw-html", () => { return "Divides starmetal alloy requirement by /" + format(player.dn.normalityEffect)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "(Normality is kept on starmetal resets)" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["style-row", [["dark-buyable", 11], ["dark-buyable", 12], ["dark-buyable", 13]], {maxWidth: "900px"}],
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13]]],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.du.pointGain.gte(player.du.secondSoftcapStart) ? "UNAVOIDABLE SOFTCAP<sup>2</sup>: Gain past " + format(player.du.secondSoftcapStart) + " is raised by ^" + format(player.du.pointSoftcap2) + "." : "" }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legendaryPetAbilityTimers[0].gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legendaryPetAbilityTimers[0]) + "." : ""}, {color: "#FEEF5F", fontSize: "20px", fontFamily: "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return hasUpgrade("le", 23) },
    deactivated() { return !player.sma.inStarmetalChallenge},
})