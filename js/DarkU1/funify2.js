addLayer("funify", {
    name: "Funify", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "☺", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        funify: new Decimal(0),
        funifyReq: new Decimal(1e100),

        funPoints: new Decimal(0),
        funPointsGain: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "radial-gradient(#E5E500, #BFBF00)",
            "background-origin": "border-box",
            "border-color": "#404000",
            "color": "black",
        };
    },
    tooltip: "Funify",
    branches: [["le", "#309"]],
    color: "black",
    update(delta) {
        let onepersec = new Decimal(1)

        let funifyDiv = new Decimal(1)
        if (getLevelableTier("pu", 300, true)) funifyDiv = funifyDiv.mul(levelableEffect("pu", 300)[0])
        
        player.funify.funifyReq = Decimal.pow(1e10, player.funify.funify.add(1).pow(1.5).sub(1).floor()).mul(1e100).div(funifyDiv)

        player.funify.funPointsGain = player.funify.funify.gt(0) ? Decimal.pow(10, player.funify.funify.pow(0.9).sub(1)) : new Decimal(0)
        player.funify.funPointsGain = player.funify.funPointsGain.mul(buyableEffect("funify", 11))

        if (getLevelableTier("pu", 300, true)) player.funify.funPoints = player.funify.funPoints.add(player.funify.funPointsGain.mul(delta))
    },
    clickables: {
        11: {
            title() {
                return "Reset everything in this universe for<br>funify<br>Req: " + format(player.funify.funifyReq) + " Points"
            },
            canClick() { return player.du.points.gte(player.funify.funifyReq) },
            unlocked() { return true },
            onClick() {
                player.funify.funify = player.funify.funify.add(1);

                player.le.starmetalAlloyPause = new Decimal(10)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "350px", minHeight: "80px", borderRadius: "15px", color: "rgba(0,0,0,0.8)", border: "3px solid #404000"}
                !this.canClick() ? look.background =  "#bf8f8f" : look.background = "radial-gradient(#E5E500, #BFBF00)"
                return look
            }
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.funify.funPoints},
            pay(amt) { player.funify.funPoints = this.currency().sub(amt) },
            effect(x) {
                return Decimal.pow(1.25, getBuyableAmount(this.layer, this.id))
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Funner Fun"
            },
            display() {
                return "Increases fun point gain by +25% per level, compounding\n\
                Currently: x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun Points"
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
            style: {width: '250px', height: '175px', color: "rgba(0,0,0,0.8)", backgroundColor: "#BFBF00", borderColor: "#404000"},
        },
        12: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.funify.funPoints},
            pay(amt) { player.funify.funPoints = this.currency().sub(amt) },
            effect(x) {
                return Decimal.pow(1.1, getBuyableAmount(this.layer, this.id))
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Required Fun"
            },
            display() {
                return "Reduces starmetal requirement by +10% per level, compounding\n\
                Currently: /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun Points"
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
            style: {width: '250px', height: '175px', color: "rgba(0,0,0,0.8)", backgroundColor: "#BFBF00", borderColor: "#404000"},
        },
        13: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.funify.funPoints},
            pay(amt) { player.funify.funPoints = this.currency().sub(amt) },
            effect(x) {
                return Decimal.pow(1.005, getBuyableAmount(this.layer, this.id))
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Alloyed Fun"
            },
            display() {
                return "Increases starmetal alloy gain by +0.5% per level, compounding\n\
                Currently: x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun Points"
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
            style: {width: '250px', height: '175px', color: "rgba(0,0,0,0.8)", backgroundColor: "#BFBF00", borderColor: "#404000"},
        },
        14: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.funify.funPoints},
            pay(amt) { player.funify.funPoints = this.currency().sub(amt) },
            effect(x) {
                let bonus = getBuyableAmount(this.layer, this.id).div(25).floor()
                return getBuyableAmount(this.layer, this.id).div(1000).add(1).add(bonus.div(100))
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Basic Fun"
            },
            display() {
                return "Raises common punchcard effects by +0.1% per level\n\
                Raises common punchcard effects by +1% every 25 levels\n\
                Currently: ^" + format(tmp[this.layer].buyables[this.id].effect, 3) + ".\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun Points"
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
            style: {width: '250px', height: '175px', color: "rgba(0,0,0,0.8)", backgroundColor: "#BFBF00", borderColor: "#404000"},
        },
        15: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.funify.funPoints},
            pay(amt) { player.funify.funPoints = this.currency().sub(amt) },
            effect(x) {
                let bonus = getBuyableAmount(this.layer, this.id).div(25).floor()
                return getBuyableAmount(this.layer, this.id).mul(0.00075).add(1).add(bonus.mul(0.0075))
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Rare Fun"
            },
            display() {
                return "Raises rare punchcard effects by +0.075% per level\n\
                Raises rare punchcard effects by +0.75% every 25 levels\n\
                Currently: ^" + format(tmp[this.layer].buyables[this.id].effect, 4) + ".\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun Points"
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
            style: {width: '250px', height: '175px', color: "rgba(0,0,0,0.8)", backgroundColor: "#BFBF00", borderColor: "#404000"},
        },
        16: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.funify.funPoints},
            pay(amt) { player.funify.funPoints = this.currency().sub(amt) },
            effect(x) {
                let bonus = getBuyableAmount(this.layer, this.id).div(25).floor()
                return getBuyableAmount(this.layer, this.id).div(2000).add(1).add(bonus.div(200))
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Epic Fun"
            },
            display() {
                return "Raises epic punchcard effects by +0.05% per level\n\
                Raises epic punchcard effects by +0.5% every 25 levels\n\
                Currently: ^" + format(tmp[this.layer].buyables[this.id].effect, 4) + ".\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun Points"
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
            style: {width: '250px', height: '175px', color: "rgba(0,0,0,0.8)", backgroundColor: "#BFBF00", borderColor: "#404000"},
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.du.pointGain.gte(player.du.secondSoftcapStart) ? "UNAVOIDABLE SOFTCAP<sup>2</sup>: Gain past " + format(player.du.secondSoftcapStart) + " is raised by ^" + format(player.du.pointSoftcap2) + "." : "" }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legPetTimers[0].current.gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legPetTimers[0].current) + "." : ""}, {color: "#FEEF5F", fontSize: "20px", fontFamily: "monospace"}],
        ["blank", "25px"],
        ["style-row", [
            ["clickable", 11],
            ["style-row", [
                ["raw-html", () => {return "You have " + formatWhole(player.funify.funify) + " Funify"}, {color: "rgba(0,0,0,0.8)", fontSize: "24px", fontFamily: "monospace"}],
            ], {width: "350px", height: "74px", background: "#BFBF00", border: "3px solid #404000", borderRadius: "15px", marginLeft: "8px"}],
        ], {backgroundColor: "#E5E500", border: "3px solid #404000", borderRadius: "13px 13px 0px 0px", width: "762px", height: "100px"}],
        ["style-row", [
            ["raw-html", () => {return "You have <h3>" + format(player.funify.funPoints) + "</h3> fun points"}, {color: "rgba(0,0,0,0.8)", fontSize: "20px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.funify.funPointsGain) + "/s)"}, {color: "rgba(0,0,0,0.8)", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
        ], {backgroundColor: "#cccc00", borderLeft: "3px solid #404000", borderRight: "3px solid #404000", borderBottom: "3px solid #404000", width: "762px", height: "40px"}],
        ["style-column", [
            ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13]]],
            ["row", [["ex-buyable", 14], ["ex-buyable", 15], ["ex-buyable", 16]]],
        ], {backgroundColor: "#404000", borderLeft: "3px solid #404000", borderRight: "3px solid #404000", borderBottom: "3px solid #404000", width: "762px"}],
        ["style-row", [], {backgroundColor: "#E5E500", border: "3px solid #404000", borderTop: "0px", borderRadius: "0px 0px 13px 13px", width: "762px", height: "20px"}],
    ],
    layerShown() { return getLevelableTier("pu", 300, true) },
    deactivated() { return !player.sma.inStarmetalChallenge},
})