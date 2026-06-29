addLayer("sr", {
    name: "Space Radiation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<img src='resources/radiation/space.png' style='width:calc(80% - 2px);height:calc(80% - 2px);margin:10%'></img>",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        particleClick: new Decimal(0),
        particleClickTime: new Decimal(0),
        radiation: {
            current: new Decimal(0),
            max: new Decimal(45),
            amount: new Decimal(0),
            toGet: new Decimal(0),
            effect: new Decimal(1), //normality
            effect2: new Decimal(1), //dark radiation (again yes i know)
            toggle: true,
        },

        spaceDecay: new Decimal(0),
        spaceDecayPerClick: new Decimal(0),
        spaceDecayEffect: new Decimal(1), //universe reset requirement
        spaceDecayEffect2: new Decimal(1), //Time radiation (dont make it too strong)
        generators:{
            amount: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
            perClick: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        },
    }},
    automate() {
    },
    nodeStyle() {
        return {
            background: "#000000",
            backgroundOrigin: "border-box",
            borderColor: "#ffffff",
            color: "#f6fff5",
            transform: "translate(-25px, 20px)",
        };
    },
    tooltip: "Space Radiation",
    branches: [""],
    color: "black",
    update(delta) {
        player.sr.radiation.effect = player.sr.radiation.amount.pow(3).add(1)  //normality
        player.sr.radiation.effect2 = player.sr.radiation.amount.pow(0.5).div(3).add(1) //dark radiation

        player.sr.radiation.toGet = player.ds.space.pow(0.12).div(5000)

        player.sr.radiation.max = new Decimal(45)

        if (player.sr.particleClick.eq(10) && player.sr.particleClickTime.gt(0))
        {
            player.sr.radiation.amount = player.sr.radiation.amount.add(player.sr.radiation.toGet)

            layers.sr.spaceRadiationReset();
        }

        player.sr.particleClickTime = player.sr.particleClickTime.sub(delta)
        if (player.sr.particleClickTime.lte(0))
        {
            player.sr.particleClick = new Decimal(0)
        }

        if (player.musuniverse == "AD1" && hasUpgrade("ani", 17) && player.sr.radiation.toGet.gt(1) && !player.pet.legPetTimers[0].active && player.sr.radiation.toggle) {
            player.sr.radiation.current = player.sr.radiation.current.sub(delta)
        }
        if (player.sr.radiation.current.lt(0)) {
            makeShinies(spaceRadiation, new Decimal(10))
            player.sr.radiation.current = player.sr.radiation.max
            player.sr.particleClickTime = new Decimal(9)
        }

        player.sr.spaceDecayEffect = player.sr.spaceDecay.pow(12).add(1)
        player.sr.spaceDecayEffect2 = player.sr.spaceDecay.pow(0.25).div(9).add(1)

        player.sr.spaceDecayPerClick = player.sr.generators.amount[0].pow(0.5)
        player.sr.spaceDecayPerClick = player.sr.spaceDecayPerClick.mul(buyableEffect("sr", 1))

        for (let i = 0; i < player.sr.generators.amount.length-1; i++) {

            player.sr.generators.perClick[i] = player.sr.generators.amount[i+1].pow(0.5).mul(0.01)
        }

        //to lazy to do this in the for loop
        player.sr.generators.perClick[0] = player.sr.generators.perClick[0].mul(buyableEffect("sr", 2))
        player.sr.generators.perClick[1] = player.sr.generators.perClick[1].mul(buyableEffect("sr", 3))
        player.sr.generators.perClick[2] = player.sr.generators.perClick[2].mul(buyableEffect("sr", 4))
    },
    spaceRadiationReset() {
        player.ani.darkRadiation = new Decimal(0)
        player.ani.radiation.red.amount = new Decimal(0)
        player.ani.radiation.orange.amount = new Decimal(0)
        player.ani.radiation.yellow.amount = new Decimal(0)
        player.ani.radiation.green.amount = new Decimal(0)

        player.ani.buyables[11] = new Decimal(0)
        player.ani.buyables[12] = new Decimal(0)
        player.ani.buyables[13] = new Decimal(0)
        player.ani.buyables[14] = new Decimal(0)

        player.sr.particleClick = new Decimal(0)

        for (let i = 0; i < 60; i++) {
            layers.le.starmetalReset();
            player.ds.buyables[11] = new Decimal(0)
            player.ds.buyables[12] = new Decimal(0)
            player.ds.buyables[13] = new Decimal(0)
            player.ds.buyables[14] = new Decimal(0)
            player.ds.buyables[101] = new Decimal(0)
            player.ds.buyables[102] = new Decimal(0)
            player.ds.buyables[103] = new Decimal(0)
            player.ds.buyables[104] = new Decimal(0)
            player.ds.buyables[105] = new Decimal(0)
            player.ds.buyables[106] = new Decimal(0)
            player.ds.buyables[107] = new Decimal(0)

            setTimeout(() => {
            player.ds.spaceEnergy = new Decimal(0)
            player.ds.length = new Decimal(1)
            player.ds.width = new Decimal(1)
            player.ds.depth = new Decimal(1)
            player.ds.spissitude = new Decimal(1)
            }, 100)
        }
    },
    bars: {},
    clickables: {
    },
    upgrades: {
  
    },
    buyables: {
        1: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.sr.radiation.amount},
            pay(amt) { player.sr.radiation.amount = this.currency().sub(amt) },
            effect(x) {
                let eff = Decimal.pow(1.08, getBuyableAmount(this.layer, this.id))
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(player.sr.generators.amount[0]) + "<br>Decay Generator"
            },
            display() {
                return "which are giving " + format(player.sr.spaceDecayPerClick) + " space decay per dark radiation click.\n\
                    This buyable is currently boosting production by x" + format(buyableEffect("sr", 1)) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Radiation"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sr.generators.amount[0] = player.sr.generators.amount[0].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sr.generators.amount[0] = player.sr.generators.amount[0].add(max)
                }
            },
            style: { width: '275px', height: '200px', color: "white", backgroundColor: "#000000", borderColor: "#ffffff" }
        },
        2: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.sr.radiation.amount},
            pay(amt) { player.sr.radiation.amount = this.currency().sub(amt) },
            effect(x) {
                let eff = Decimal.pow(1.08, getBuyableAmount(this.layer, this.id))
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(player.sr.generators.amount[1]) + "<br>Decay Generator^2"
            },
            display() {
                return "which are giving " + format(player.sr.generators.perClick[0]) + " decay generators per dark radiation click.\n\
                    This buyable is currently boosting production by x" + format(buyableEffect("sr", 2)) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Radiation"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sr.generators.amount[1] = player.sr.generators.amount[1].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sr.generators.amount[1] = player.sr.generators.amount[1].add(max)
                }
            },
            style: { width: '275px', height: '200px', color: "white", backgroundColor: "#000000", borderColor: "#ffffff" }
        },
        3: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.sr.radiation.amount},
            pay(amt) { player.sr.radiation.amount = this.currency().sub(amt) },
            effect(x) {
                let eff = Decimal.pow(1.08, getBuyableAmount(this.layer, this.id))
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(player.sr.generators.amount[2]) + "<br>Decay Generator^3"
            },
            display() {
                return "which are giving " + format(player.sr.generators.perClick[1]) + " decay generators^2 per dark radiation click.\n\
                    This buyable is currently boosting production by x" + format(buyableEffect("sr", 3)) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Radiation"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sr.generators.amount[2] = player.sr.generators.amount[2].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sr.generators.amount[2] = player.sr.generators.amount[2].add(max)
                }
            },
            style: { width: '275px', height: '200px', color: "white", backgroundColor: "#000000", borderColor: "#ffffff" }
        },
        4: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.sr.radiation.amount},
            pay(amt) { player.sr.radiation.amount = this.currency().sub(amt) },
            effect(x) {
                let eff = Decimal.pow(1.08, getBuyableAmount(this.layer, this.id))
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(player.sr.generators.amount[3]) + "<br>Decay Generator^4"
            },
            display() {
                return "which are giving " + format(player.sr.generators.perClick[2]) + " decay generators^3 per dark radiation click.\n\
                    This buyable is currently boosting production by x" + format(buyableEffect("sr", 4)) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Space Radiation"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sr.generators.amount[3] = player.sr.generators.amount[3].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sr.generators.amount[3] = player.sr.generators.amount[3].add(max)
                }
            },
            style: { width: '275px', height: '200px', color: "white", backgroundColor: "#000000", borderColor: "#ffffff" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {
  
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #74ff8f", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => { return "You must click all 10 space radiation particles in order to reset."}, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["raw-html", () => { return "You have <h3>" + format(player.sr.radiation.amount) + "</h3> space radiation. (+" + format(player.sr.radiation.toGet) + "/" + formatTime(player.sr.radiation.max) + ")"}, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "(Based on space)" }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts normality gain by x<h3>" + format(player.sr.radiation.effect) + "</h3>." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts dark radiation gain by x<h3>" + format(player.sr.radiation.effect2) + "</h3>." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Resets colored radiation, buyables, everything in space energy and also performs a starmetal equivalent reset." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["raw-html", () => { return "Space decay and generators only update when you click dark radiation."}, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["raw-html", () => { return "You have <h3>" + format(player.sr.spaceDecay) + "</h3> space decay. (+" + format(player.sr.spaceDecayPerClick) + "/click)"}, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Divides universe reset requirement by /<h3>" + format(player.sr.spaceDecayEffect) + "</h3>." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts time radiation gain by x<h3>" + format(player.sr.spaceDecayEffect2) + "</h3>." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 1], ["ex-buyable", 2], ["ex-buyable", 3], ["ex-buyable", 4],]],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.ani.darkRadiation) + "</h3> dark radiation. (+" + format(player.ani.darkRadiationToGet) + "/" + formatTime(player.ani.timer.max) + ")" }, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legPetTimers[0].active ? "Boosts eclipse timer tickspeed by x<h3>" + format(player.ani.darkRadiationEffect) + "</h3>." : "Boosts length, width, and depth by x<h3>" + format(player.ani.darkRadiationEffect2) + "</h3>." }, {color: "#ffffff", fontSize: "18px", fontFamily: "monospace"}],
        ["blank", "5px"],
        ["raw-html", () => { return player.pet.legPetTimers[0].current.gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legPetTimers[0].current) + "." : ""}, {color: "#FEEF5F", fontSize: "16px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.sma.inStarmetalChallenge && hasUpgrade("ani", 17)},
    deactivated() { return !player.sma.inStarmetalChallenge},
})
const spaceRadiation = {
    image: "resources/radiation/space.png",
    time() {
        let time = new Decimal(9) //subject to change
        return time
    },
    fadeInTime: 2,
    fadeOutTime: 1,
    class: "goldenCookie",
    onClick(index, slot) {
        player.sr.particleClick = player.sr.particleClick.add(1)
        if (player.sr.particleClick.lt(10)) makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>" + formatWhole(player.sr.particleClick) + "/10 Clicked!</small>"})
        if (player.sr.particleClick.eq(10)) makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>+" + format(player.sr.radiation.toGet) + " Space Radiation<br>Reset Complete!</small>"})
        Vue.delete(particles, this.id)
    },
}