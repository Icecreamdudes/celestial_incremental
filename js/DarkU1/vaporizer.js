addLayer("dv", {
    name: "Vaporizer", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "V", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        clouds: new Decimal(0),
        cloudEffect: new Decimal(1),
        cloudsPerSecond: new Decimal(0),
        timeDrainRate: new Decimal(1),

        producingClouds: false,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(150deg,rgb(122, 122, 122) 0%,rgb(233, 233, 233) 50%,rgb(122, 122, 122) 100%)",
            backgroundOrigin: "border-box",
            borderColor: "rgb(255, 255, 255)",
            color: "black",
        };
    },
    tooltip: "Vaporizer",
    branches: ["dgr"],
    color: "rgba(193, 223, 0)",
    update(delta) {
        let onepersec = new Decimal(1)

        player.dv.timeDrainRate = player.dv.clouds.pow(0.25).div(5).add(1)

        if (player.dv.producingClouds)
        {
            player.dv.cloudsPerSecond = new Decimal(1)
        } else
        {
            player.dv.cloudsPerSecond = new Decimal(0)
        }

        player.dv.cloudsPerSecond = player.dv.cloudsPerSecond.mul(buyableEffect("dv", 11))
        if (getLevelableBool("pu", 112)) player.dv.cloudsPerSecond = player.dv.cloudsPerSecond.mul(levelableEffect("pu", 112)[0])
        player.dv.cloudsPerSecond = player.dv.cloudsPerSecond.mul(buyableEffect("dv", 16))

        player.dv.clouds = player.dv.clouds.add(player.dv.cloudsPerSecond.mul(delta))

        player.dv.cloudEffect = Decimal.div(1, player.dv.clouds.pow(0.4).div(10).add(1))
    },
    bars: {},
    clickables: {
        11: {
            title() { return "<h2>Start producing clouds." },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.dv.producingClouds = true
            },
            style() {
                let look = {width: "200px", minHeight: "100px", borderRadius: "15px 0px 0px 15px", color: "white", border: "2px solid rgb(122, 122, 122)", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        12: {
            title() { return "<h2>Stop producing clouds." },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.dv.producingClouds = false
            },
            style() {
                let look = {width: "200px", minHeight: "100px", borderRadius: "0px 0px 0px 0px", color: "white", border: "2px solid rgb(122, 122, 122)", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        13: {
            title() { return "<h2>Set clouds to 0." },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.dv.clouds = new Decimal(0)
            },
            style() {
                let look = {width: "200px", minHeight: "100px", borderRadius: "0px 15px 15px 0px", color: "white", border: "2px solid rgb(122, 122, 122)", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
    },
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.dv.clouds},
            pay(amt) { player.dv.clouds = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Vaporized Clouds"
            },
            display() {
                return "which are boosting cloud gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Clouds"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "rgb(122, 122, 122)", borderColor: "rgb(233, 233, 233)" }
        },
        12: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.dv.clouds},
            pay(amt) { player.dv.clouds = this.currency().sub(amt) },
            effect(x) { return Decimal.div(1, getBuyableAmount(this.layer, this.id).pow(0.35).div(7.5).add(1)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Vaporized Rank-Tier-Tetr"
            },
            display() {
                return "which are raising rank-tier-tetr requirements by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Clouds"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "rgb(122, 122, 122)", borderColor: "rgb(233, 233, 233)" }
        },
        13: {
            costBase() { return new Decimal(60) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.dv.clouds},
            pay(amt) { player.dv.clouds = this.currency().sub(amt) },
            effect(x) { return Decimal.div(1, getBuyableAmount(this.layer, this.id).pow(0.3).div(15).add(1)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Vaporized Boosters"
            },
            display() {
                return "which are raising booster requirements by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Clouds"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "rgb(122, 122, 122)", borderColor: "rgb(233, 233, 233)" }
        },
        14: {
            costBase() { return new Decimal(150) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.dv.clouds},
            pay(amt) { player.dv.clouds = this.currency().sub(amt) },
            effect(x) { return player.dgr.grass.pow(0.5).add(1).pow(getBuyableAmount(this.layer, this.id).pow(0.45).div(3))},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Vaporized Grassy Prestiges"
            },
            display() {
                return "which are boosting prestige points based on grass by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Clouds"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "rgb(122, 122, 122)", borderColor: "rgb(233, 233, 233)" }
        },
        15: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.dv.clouds},
            pay(amt) { player.dv.clouds = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Vaporized Eclipse"
            },
            display() {
                return "which are boosting eclipse shards by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Clouds"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "rgb(122, 122, 122)", borderColor: "rgb(233, 233, 233)" }
        },
        16: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.dv.clouds},
            pay(amt) { player.dv.clouds = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(player.dgr.grass.pow(getBuyableAmount(this.layer, this.id).pow(0.1)).pow(0.15).div(50)).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Transpiration"
            },
            display() {
                return "which are boosting clouds based on grass by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Clouds"
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
            style: { width: '275px', height: '150px', color: "white", backgroundColor: "rgb(122, 122, 122)", borderColor: "rgb(233, 233, 233)" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'border-color': 'black' } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => {return "You have <h3>" + format(player.dv.clouds) + "</h3> clouds, which raises the point softcap by ^" + format(player.dv.cloudEffect) + "."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "You are gaining " + format(player.dv.cloudsPerSecond) + "</h3> clouds per second."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "your clouds increase the eclipse timer tickspeed by x" + format(player.dv.timeDrainRate) + "."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 11], ["clickable", 12], ["clickable", 13],]],
                    ["blank", "25px"],
                    ["row", [["dark-buyable", 11], ["dark-buyable", 12], ["dark-buyable", 13],]],
                    ["row", [["dark-buyable", 14], ["dark-buyable", 15], ["dark-buyable", 16]]],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => { return player.pet.legPetTimers[0].current.gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legPetTimers[0].current) + "." : ""}, {color: "#FEEF5F", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return hasUpgrade("le", 102) },
    deactivated() { return !player.sma.inStarmetalChallenge},
})