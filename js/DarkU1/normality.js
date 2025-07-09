
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
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(150deg,rgb(122, 177, 14) 0%,rgba(193, 223, 0) 50%,rgb(116, 141, 3) 100%)",
            "background-origin": "border-box",
            "border-color": "rgb(128, 255, 111)",
            "color": "#eaf6f7",
        };
    },
    tooltip: "Normality",
    branches: [["dgr", "#4f0694"]],
    color: "rgba(193, 223, 0)",
    update(delta) {
        let onepersec = new Decimal(1)

        player.dn.normalityToGet = player.du.points.div(1e30).pow(0.1).div(10)
        player.dn.normalityToGet = player.dn.normalityToGet.mul(buyableEffect("ma", 24))
        player.dn.normalityToGet = player.dn.normalityToGet.mul(levelableEffect("st", 207)[0])
        player.dn.normalityToGet = player.dn.normalityToGet.mul(buyableEffect("st", 106))

        player.dn.normalityEffect = player.dn.normality.mul(10).pow(3).add(1)

        player.dn.normalityPause = player.dn.normalityPause.sub(1)
        if (player.dn.normalityPause.gte(1))
        {  
            layers.dn.normalityReset();
        }
    },
    bars: {
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "du"
            },
            style: { width: '100px', "min-height": '50px', color: "black" },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.dn.nMax == false },
            unlocked() { return true },
            onClick() {
                player.dn.nMax = true
            },
            style: { width: '75px', "min-height": '50px', color: "black" }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.dn.nMax == true  },
            unlocked() { return true },
            onClick() {
                player.dn.nMax = false
            },
            style: { width: '75px', "min-height": '50px', color: "black" }
        },
        11: {
            title() { return "<h2>Reset previous content except grass for normality. (Based on points)" },
            canClick() { return player.dn.normalityToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.dn.normality = player.dn.normality.add(player.dn.normalityToGet)
                player.dn.normalityPause = new Decimal(10)
            },
            style: { width: '400px', "min-height": '100px', color: "black" },
        },
    },
    normalityReset()
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

        player.dg.generators = new Decimal(0)
        player.dg.generatorPower = new Decimal(0)

        player.dg.buyables[11] = new Decimal(0)
        player.dg.buyables[12] = new Decimal(0)
        player.dg.buyables[13] = new Decimal(0)

    },
    upgrades: {
        11: {
            title: "Normality Upgrade I",
            unlocked() { return true },
            description: "Autobuy prestige buyables.",
            cost: new Decimal(1e10),
            currencyLocation() { return player.dn },
            currencyDisplayName: "Normality",
            currencyInternalName: "normality",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #384166", margin: "1.5px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        12: {
            title: "Normality Upgrade II",
            unlocked() { return true },
            description: "Autobuy generator buyables.",
            cost: new Decimal(1e12),
            currencyLocation() { return player.dn },
            currencyDisplayName: "Normality",
            currencyInternalName: "normality",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #384166", margin: "1.5px"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        13: {
            title: "Normality Upgrade III",
            unlocked() { return true },
            description: "Autobuy grass buyables.",
            cost: new Decimal(1e15),
            currencyLocation() { return player.dn },
            currencyDisplayName: "Normality",
            currencyInternalName: "normality",
            style() {
                let look = {borderRadius: "10px", color: "white", border: "2px solid #384166", margin: "1.5px"}
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
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.dn.normality) + "</h3> normality, which divide starmetal alloy requirement by /" + format(player.dn.normalityEffect) + "."}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + format(player.dn.normalityToGet) + "</h3> normality on reset." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Normality is kept on starmetal resets." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13]]],

        ]

            },
            "Upgrades": {
                buttonStyle() { return { 'border-color': 'black' } },
                unlocked() { return hasUpgrade("sma", 18) },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13],]],

        ]

            },
        },
    },

    tabFormat: [
         ["raw-html", function () { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
         ["raw-html", function () { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, { "color": "red", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return player.pet.legendaryPetAbilityTimers[0].gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legendaryPetAbilityTimers[0]) + "." : ""}, { "color": "#FEEF5F", "font-size": "20px", "font-family": "monospace" }],
         ["row", [["clickable", 1]]],
         ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return hasUpgrade("le", 23) }
})