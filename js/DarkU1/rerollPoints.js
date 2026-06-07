addLayer("rp", {
    name: "Reroll Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RP", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        rerollPoints: new Decimal(0),
        rerollPointsToGet: new Decimal(0),
    }},
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(15deg, #abbfc0 0%, #758691 50%, #52555e 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#d4ddff",
            color: "#000000",
        };
    },
    tooltip: "Reroll Points",
    branches: [["dp", "#309"], ["dgj", "#309"], ],
    color: "black",
    update(delta) {
        let onepersec = new Decimal(1)

        player.rp.rerollPointsToGet = player.du.points.plus(1).log10().pow(1.25).div(50).add(1).div(player.rp.rerollPoints.pow(0.75).add(1))
        player.rp.rerollPointsToGet = player.rp.rerollPointsToGet.mul(levelableEffect("pu", 402)[0])

        if (player.rp.rerollPoints.lt(0)) {
            player.rp.rerollPointsToGet = new Decimal(0)
        }
    },
    bars: {},
    clickables: {
        11: {
            title() { return "<h2>Perform a starmetal equivalent reset for reroll points.<br>(Based on points, decreases with reroll points)" },
            canClick() { return player.rp.rerollPointsToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.rp.rerollPoints = player.rp.rerollPoints.add(player.rp.rerollPointsToGet)

                player.le.starmetalAlloyPause = new Decimal(10)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", fontSize: "7px", background: "linear-gradient(15deg, #abbfc0 0%, #758691 50%, #52555e 100%)", borderRadius: "15px", color: "black", border: "2px solid #d4ddff", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
    },
    upgrades: {

    },
    buyables: {
        11: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.rp.rerollPoints},
            pay(amt) { player.rp.rerollPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(2).pow(2).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Rolling in Grass"
            },
            display() {
                return "which are boosting dark grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + "\n\Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Reroll Points"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "black", background: "linear-gradient(120deg, #abbfc0 0%, #758691 50%, #52555e 100%)", borderColor: "#d4ddff" }
        },
        12: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.rp.rerollPoints},
            pay(amt) { player.rp.rerollPoints = this.currency().sub(amt) },
            effect(x) { return Decimal.div(1, getBuyableAmount(this.layer, this.id).mul(0.2).add(1)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Avoiding the Unavoidable"
            },
            display() {
                return "which are raising unavoidable softcap effect by ^" + format(tmp[this.layer].buyables[this.id].effect) + "\n\Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Reroll Points"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "black", background: "linear-gradient(120deg, #abbfc0 0%, #758691 50%, #52555e 100%)", borderColor: "#d4ddff" }
        },
        13: {
            costBase() { return new Decimal(9) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.rp.rerollPoints},
            pay(amt) { player.rp.rerollPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.01) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Legendary Luck"
            },
            display() {
                return "increasing legendary punchcard chance by +" + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + "%\n\Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Reroll Points"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', color: "black", background: "linear-gradient(120deg, #abbfc0 0%, #758691 50%, #52555e 100%)", borderColor: "#d4ddff" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #384166", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["row", [
                    ["raw-html", () => { return "You have <h3>" + format(player.rp.rerollPoints) + "</h3> reroll points." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "(+" + format(player.rp.rerollPointsToGet) + ")" }, () => {
                        let look = {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                        player.rp.rerollPointsToGet.gte(1) ? look.color = "white" : look.color = "gray"
                        return look
                    }],
                    ]],
                    ["raw-html", () => { return "You can use reroll points to reroll punchcard selections." }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13]]],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.du.pointGain.gte(player.du.secondSoftcapStart) ? "UNAVOIDABLE SOFTCAP<sup>2</sup>: Gain past " + format(player.du.secondSoftcapStart) + " is raised by ^" + format(player.du.pointSoftcap2) + "." : "" }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legPetTimers[0].current.gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legPetTimers[0].current) + "." : ""}, {color: "#FEEF5F", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return getLevelableTier("pu", 402, true) },
    deactivated() { return !player.sma.inStarmetalChallenge},
})