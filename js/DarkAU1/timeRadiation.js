addLayer("tr", {
    name: "Time Radiation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<img src='resources/radiation/time.png' style='width:calc(80% - 2px);height:calc(80% - 2px);margin:10%'></img>",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        particleClick: new Decimal(0),
        particleClickTime: new Decimal(0),
        radiation: {
            current: new Decimal(0),
            max: new Decimal(30),
            amount: new Decimal(0),
            toGet: new Decimal(0),
            effect: new Decimal(1),
            effect2: new Decimal(1),
        }
    }},
    automate() {

    },
    nodeStyle() {
        return {
            background: "#b70d0e",
            backgroundOrigin: "border-box",
            //borderColor: "#74ff8f",
            color: "#f6fff5",
            transform: "translate(25px, 17px)",
        };
    },
    tooltip: "Time Radiation",
    branches: [""],
    color: "black",
    update(delta) {
        player.tr.radiation.effect = player.tr.radiation.amount.pow(14).add(1) //divide eclipse req
        player.tr.radiation.effect2 = player.tr.radiation.amount.pow(0.4).div(3).add(1) //dark radiation

        player.tr.radiation.toGet = player.pet.legPetTimers[0].current.pow(0.5).div(250)
        player.tr.radiation.toGet = player.tr.radiation.toGet.mul(player.sr.spaceDecayEffect2)

        player.tr.radiation.max = new Decimal(30)

        if (player.tr.particleClick.eq(3) && player.tr.particleClickTime.gt(0))
        {
            player.tr.radiation.amount = player.tr.radiation.amount.add(player.tr.radiation.toGet)

            layers.tr.timeRadiationReset();
        }

        player.tr.particleClickTime = player.tr.particleClickTime.sub(delta)
        if (player.tr.particleClickTime.lte(0))
        {
            player.tr.particleClick = new Decimal(0)
        }

        if (player.musuniverse == "AD1" && hasUpgrade("ani", 15) && player.tr.radiation.toGet.gt(1) && player.pet.legPetTimers[0].active) {
            player.tr.radiation.current = player.tr.radiation.current.sub(delta)
        }
        if (player.tr.radiation.current.lt(0)) {
            makeShinies(timeRadiation1, new Decimal(1))
            makeShinies(timeRadiation2, new Decimal(1))
            makeShinies(timeRadiation3, new Decimal(1))
            player.tr.radiation.current = player.tr.radiation.max
            player.tr.particleClickTime = new Decimal(7)
        }
    },
    timeRadiationReset() {
        player.pet.legPetTimers[0].current = new Decimal(1)

        player.ani.darkRadiation = new Decimal(0)
        player.ani.radiation.red.amount = new Decimal(0)
        player.ani.radiation.orange.amount = new Decimal(0)
        player.ani.radiation.yellow.amount = new Decimal(0)
        player.ani.radiation.green.amount = new Decimal(0)

        player.ani.buyables[11] = new Decimal(0)
        player.ani.buyables[12] = new Decimal(0)
        player.ani.buyables[13] = new Decimal(0)
        player.ani.buyables[14] = new Decimal(0)

        player.tr.particleClick = new Decimal(0)
    },
    bars: {},
    clickables: {
    },
    upgrades: {
  
    },
    buyables: {
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.tr.radiation.amount},
            pay(amt) { player.tr.radiation.amount = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.25).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Time Multiplier"
            },
            display() {
                return "which are boosting eclipse timer tickspeed by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Radiation"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#740909", borderColor: "#b70d0e" }
        },
        12: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.6) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.tr.radiation.amount},
            pay(amt) { player.tr.radiation.amount = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(2).mul(0.25).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Time Multiplier^2"
            },
            display() {
                return "which are boosting eclipse timer tickspeed by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Radiation"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#740909", borderColor: "#b70d0e" }
        },
        13: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.tr.radiation.amount},
            pay(amt) { player.tr.radiation.amount = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(3).mul(0.25).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Time Multiplier^3"
            },
            display() {
                return "which are boosting eclipse timer tickspeed by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Radiation"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#740909", borderColor: "#b70d0e" }
        },
        14: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.tr.radiation.amount},
            pay(amt) { player.tr.radiation.amount = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.25).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Red Multiplier"
            },
            display() {
                return "which are boosting red radiation gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Radiation"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#740909", borderColor: "#b70d0e" }
        },
        15: {
            costBase() { return new Decimal(30) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.tr.radiation.amount},
            pay(amt) { player.tr.radiation.amount = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.25).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Orange Multiplier"
            },
            display() {
                return "which are boosting orange radiation gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Radiation"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#740909", borderColor: "#b70d0e" }
        },
        16: {
            costBase() { return new Decimal(90) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.tr.radiation.amount},
            pay(amt) { player.tr.radiation.amount = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.25).add(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Yellow Multiplier"
            },
            display() {
                return "which are boosting yellow radiation gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Radiation"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "#740909", borderColor: "#b70d0e" }
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
                    ["raw-html", () => { return "You must click the particles in the correct numbered order in order to reset."}, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["raw-html", () => { return "You have <h3>" + format(player.tr.radiation.amount) + "</h3> time radiation. (+" + format(player.tr.radiation.toGet) + "/" + formatTime(player.tr.radiation.max) + ")"}, {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "(Based on eclipse time)" }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Divides universe reset requirement by /<h3>" + format(player.tr.radiation.effect) + "</h3>." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Boosts dark radiation gain by x<h3>" + format(player.tr.radiation.effect2) + "</h3>." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Resets colored radiation, buyables and eclipse timer." }, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13],]],
                    ["row", [["ex-buyable", 14], ["ex-buyable", 15], ["ex-buyable", 16],]],
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
    layerShown() { return player.sma.inStarmetalChallenge && hasUpgrade("ani", 15)},
    deactivated() { return !player.sma.inStarmetalChallenge},
})
const timeRadiation1 = {
    image: "resources/radiation/time1.png",
    time() {
        let time = new Decimal(7) //subject to change
        return time
    },
    fadeInTime: 2,
    fadeOutTime: 1,
    class: "goldenCookie",
    onClick(index, slot) {
        player.tr.particleClick = new Decimal(1)
        makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>1/3 Clicked!</small>"})
        Vue.delete(particles, this.id)
    },
}
const timeRadiation2 = {
    image: "resources/radiation/time2.png",
    time() {
        let time = new Decimal(7) //subject to change
        return time
    },
    fadeInTime: 2,
    fadeOutTime: 1,
    class: "goldenCookie",
    onClick(index, slot) {
        if (player.tr.particleClick.eq(1))
        {
            player.tr.particleClick = new Decimal(2)
            makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>2/3 Clicked!</small>"})
            Vue.delete(particles, this.id)
        } else
        {
            makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>Reset Failed!</small>"})
            player.tr.particleClick = new Decimal(0)
            Vue.delete(particles, this.id)
        }
    },
}
const timeRadiation3 = {
    image: "resources/radiation/time3.png",
    time() {
        let time = new Decimal(7) //subject to change
        return time
    },
    fadeInTime: 2,
    fadeOutTime: 1,
    class: "goldenCookie",
    onClick(index, slot) {
        if (player.tr.particleClick.eq(2))
        {
            player.tr.particleClick = new Decimal(3)
            Vue.delete(particles, this.id)
            makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>+" + format(player.tr.radiation.toGet) + " Time Radiation<br>Reset Complete!</small>"})
        } else
        {
            makeShinies(radiationText, 1, {x: this.x - 125, y: this.y - 100, text: "<small>Reset Failed!</small>"})
            Vue.delete(particles, this.id)
            player.tr.particleClick = new Decimal(0)
        }
    },
}