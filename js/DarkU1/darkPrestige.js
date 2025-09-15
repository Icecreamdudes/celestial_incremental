addLayer("dp", {
    name: "Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        prestigePoints: new Decimal(0),
        prestigePointsEffect: new Decimal(0),
        prestigePointsToGet: new Decimal(0),
        prestigePause: new Decimal(0),
    }},
    automate() {
        if (hasUpgrade("dn", 11)) {
            buyBuyable("dp", 11)
            buyBuyable("dp", 12)
            buyBuyable("dp", 13)
            buyBuyable("dp", 14)
            buyBuyable("dp", 15)
        }
    },
    nodeStyle() {
        return {
            background: "linear-gradient(15deg, #181c4f 0%, #1607ba 50%, #530fdb 100%)",
            "background-origin": "border-box",
            "border-color": "#215dcf",
            "color": "#eaf6f7",
        };
    },
    tooltip: "Prestige",
    branches: [["dr", "#309"]],
    color: "black",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.du.points.div(1000).pow(0.25).lt(1e7)) player.dp.prestigePointsToGet = player.du.points.div(1000).pow(0.25)
        if (player.du.points.div(1000).pow(0.25).gte(1e7)) player.dp.prestigePointsToGet = player.du.points.div(10000).pow(0.01).mul(5e6)
        player.dp.prestigePointsToGet = player.dp.prestigePointsToGet.mul(buyableEffect("dg", 13))
        if (getLevelableBool("pu", 102)) player.dp.prestigePointsToGet = player.dp.prestigePointsToGet.mul(levelableEffect("pu", 102)[0])
        if (getLevelableBool("pu", 102)) player.dp.prestigePointsToGet = player.dp.prestigePointsToGet.mul(buyableEffect("dp", 14))
        if (getLevelableBool("pu", 204)) player.dp.prestigePointsToGet = player.dp.prestigePointsToGet.mul(levelableEffect("pu", 204)[0])
        if (getLevelableBool("pu", 301)) player.dp.prestigePointsToGet = player.dp.prestigePointsToGet.mul(levelableEffect("pu", 301)[0])
        player.dp.prestigePointsToGet = player.dp.prestigePointsToGet.mul(buyableEffect("dgr", 16))
        player.dp.prestigePointsToGet = player.dp.prestigePointsToGet.mul(levelableEffect("st", 105)[0])
        if (player.pet.activeAbilities[0]) player.dp.prestigePointsToGet = player.dp.prestigePointsToGet.pow(0.8)

        // PRESTIGE SOFTCAP
        if (player.dp.prestigePointsToGet.gte(1e250)) player.dp.prestigePointsToGet = player.dp.prestigePointsToGet.div(1e250).pow(0.2).mul(1e250)

        if (player.dp.prestigePause.gte(0)) {
            layers.dp.prestigeReset();
        }
        player.dp.prestigePause = player.dp.prestigePause.sub(1)

        player.dp.prestigePointsEffect = player.dp.prestigePoints.pow(0.4).add(1)

        player.dp.prestigePoints = player.dp.prestigePoints.add(player.dp.prestigePointsToGet.mul(buyableEffect("dn", 12)).mul(delta))
        if (hasUpgrade("sma", 202)) {
            player.dp.prestigePoints = player.dp.prestigePoints.add(player.dp.prestigePointsToGet.mul(0.01).mul(delta))
        }
    },
    bars: {},
    clickables: {
        11: {
            title() { return "<h2>Reset previous content for prestige points." },
            canClick() { return player.dp.prestigePointsToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.dp.prestigePoints = player.dp.prestigePoints.add(player.dp.prestigePointsToGet)
                player.dp.prestigePause = new Decimal(10)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid #102e67", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
    },
    prestigeReset() {
        player.du.points = new Decimal(0)
        player.dr.rank = new Decimal(0)
        player.dr.tier = new Decimal(0)
        player.dr.tetr = new Decimal(0)

        player.dr.rankPoints = new Decimal(0)
        player.dr.tierPoints = new Decimal(0)
        player.dr.tetrPoints = new Decimal(0)
    },
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.dp.prestigePoints},
            pay(amt) { player.dp.prestigePoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.5).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Rank Req Divider"
            },
            display() {
                return "which are dividing rank requirement by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 11)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("dn", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#081733", borderColor: "#102e67" }
        },
        12: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.dp.prestigePoints},
            pay(amt) { player.dp.prestigePoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(2).pow(1.3).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tier Req Divider"
            },
            display() {
                return "which are dividing tier requirement by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 11)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("dn", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#081733", borderColor: "#102e67" }
        },
        13: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.dp.prestigePoints},
            pay(amt) { player.dp.prestigePoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(3).pow(1.2).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tetr Req Divider"
            },
            display() {
                return "which are dividing tetr requirement by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 11)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("dn", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#081733", borderColor: "#102e67" }
        },
        14: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.dp.prestigePoints},
            pay(amt) { player.dp.prestigePoints = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.25, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getLevelableBool("pu", 102) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Prestige Multiplier"
            },
            display() {
                return "which are multiplying prestige points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 11)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("dn", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#081733", borderColor: "#102e67" }
        },
        15: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.dp.prestigePoints},
            pay(amt) { player.dp.prestigePoints = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.2, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getLevelableBool("pu", 206) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass Multiplier"
            },
            display() {
                return "which are multiplying grass value and capacity by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 11)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("dn", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#081733", borderColor: "#102e67" }
        },
        16: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.dp.prestigePoints},
            pay(amt) { player.dp.prestigePoints = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.1, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getLevelableBool("pu", 208) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Booster Req Divider"
            },
            display() {
                return "which are dividing booster requirement by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("dn", 11)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("dn", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#081733", borderColor: "#102e67" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #102e67", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["row", [
                        ["raw-html", () => {return "You have <h3>" + format(player.dp.prestigePoints) + "</h3> prestige points"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.dp.prestigePointsToGet) + ")" }, () => {
                            let look = {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                            player.dp.prestigePointsToGet.gte(1) ? look.color = "white" : look.color = "gray"
                            return look
                        }],
                        ["raw-html", () => {return (player.dp.prestigePointsToGet.gte(1e250)) ? "[SOFTCAPPED<sup>2</sup>]" : player.du.points.div(1000).pow(0.25).gte(1e7) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "18px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["raw-html", () => {return "Boosts rank, tier, and tetr point gain by x" + format(player.dp.prestigePointsEffect)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["style-row", [["dark-buyable", 11], ["dark-buyable", 12], ["dark-buyable", 13],
                        ["dark-buyable", 14], ["dark-buyable", 16], ["dark-buyable", 15]], {maxWidth: "900px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.du.pointGain.gte(player.du.secondSoftcapStart) ? "UNAVOIDABLE SOFTCAP<sup>2</sup>: Gain past " + format(player.du.secondSoftcapStart) + " is raised by ^" + format(player.du.pointSoftcap2) + "." : "" }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legendaryPetAbilityTimers[0].gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legendaryPetAbilityTimers[0]) + "." : ""}, {color: "#FEEF5F", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return hasUpgrade("le", 13) },
    deactivated() { return !player.sma.inStarmetalChallenge},
})