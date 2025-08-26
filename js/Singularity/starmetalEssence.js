addLayer("sme", {
    name: "Starmetal Essence", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SME", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        starmetalEssence: new Decimal(0),
        starmetalEssenceSoftcap: new Decimal(1),

        generatorTimers: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        generatorTimersMax: [new Decimal(10),new Decimal(40),new Decimal(90),new Decimal(160),new Decimal(250),],
        generatorProduction: [new Decimal(1),new Decimal(5),new Decimal(12),new Decimal(20),new Decimal(35),],

        starmetalResetToggle: false,
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)",
            "background-origin": "border-box",
            "border-color": "#282363",
            "color": "#282363",
        };
    },
    tooltip: "Starmetal Essence",
    branches: ["ma", "sd", "sma"],
    color: "#d460eb",
    update(delta) {
        let onepersec = new Decimal(1)

        player.sme.generatorTimersMax = 
        [
            new Decimal(10),new Decimal(40),new Decimal(90),new Decimal(160),new Decimal(250),
        ]
        player.sme.generatorTimersMax[0] = player.sme.generatorTimersMax[0].div(buyableEffect("sme", 10))
        player.sme.generatorTimersMax[1] = player.sme.generatorTimersMax[1].div(buyableEffect("sme", 11))
        player.sme.generatorTimersMax[2] = player.sme.generatorTimersMax[2].div(buyableEffect("sme", 12))
        player.sme.generatorTimersMax[3] = player.sme.generatorTimersMax[3].div(buyableEffect("sme", 13))
        player.sme.generatorTimersMax[4] = player.sme.generatorTimersMax[4].div(buyableEffect("sme", 14))

        player.sme.starmetalEssenceSoftcap = player.sme.starmetalEssence.pow(0.5).div(15).add(1)
        
        player.sme.generatorProduction = 
        [
            new Decimal(1),new Decimal(7),new Decimal(16),new Decimal(30),new Decimal(60),
        ]

        for (let i = 0; i < player.sme.generatorTimers.length; i++) {
            if (player.sme.buyables[i].gte(1)) player.sme.generatorTimers[i] = player.sme.generatorTimers[i].add(onepersec.mul(delta))

            player.sme.generatorTimersMax[i] = player.sme.generatorTimersMax[i].mul(player.sme.starmetalEssenceSoftcap)
            player.sme.generatorProduction[i] = player.sme.generatorProduction[i].mul(buyableEffect("sme", i))
            if (player.sme.generatorTimers[i].gte(player.sme.generatorTimersMax[i]))
            {
                player.sme.starmetalEssence = player.sme.starmetalEssence.add(player.sme.generatorProduction[i])
                player.sme.generatorTimers[i] = new Decimal(0)
            }
        }
        
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "s"
            },
            style: { width: '125px', "min-height": '50px', borderRadius: "5px" },
        },
        11: {
            title() { return "Auto Starmetal Resets On" },
            canClick() { return player.sme.starmetalResetToggle == false },
            unlocked() { return true },
            onClick() {
                player.sme.starmetalResetToggle = true
            },
            style: { width: '150px', "min-height": '100px', }
        },
        12: {
            title() { return "Auto Starmetal Resets Off" },
            canClick() { return player.sme.starmetalResetToggle == true  },
            unlocked() { return true },
            onClick() {
                player.sme.starmetalResetToggle = false
            },
            style: { width: '150px', "min-height": '100px', }
        },
    },
    bars: {
        0: {
            unlocked() { return player.sme.buyables[0].gte(1) },
            direction: RIGHT,
            width: 350,
            height: 125,
            progress() {
                return player.sme.generatorTimers[0].div(player.sme.generatorTimersMax[0])
            },
            fillStyle: {
                "background-color": "#d460eb",
            },
            display() {
                return "<h5>" + format(player.sme.generatorTimers[0]) + "/" + format(player.sme.generatorTimersMax[0]) + "<h5> seconds to produce " + format(player.sme.generatorProduction[0]) + " starmetal essence.</h5>";
            },

        },
                1: {
            unlocked() { return player.sme.buyables[1].gte(1) },
            direction: RIGHT,
            width: 350,
            height: 125,
            progress() {
                return player.sme.generatorTimers[1].div(player.sme.generatorTimersMax[1])
            },
            fillStyle: {
                "background-color": "#d460eb",
            },
            display() {
                return "<h5>" + format(player.sme.generatorTimers[1]) + "/" + format(player.sme.generatorTimersMax[1]) + "<h5> seconds to produce " + format(player.sme.generatorProduction[1]) + " starmetal essence.</h5>";
            },
        },
                2: {
            unlocked() { return player.sme.buyables[2].gte(1) },
            direction: RIGHT,
            width: 350,
            height: 125,
            progress() {
                return player.sme.generatorTimers[2].div(player.sme.generatorTimersMax[2])
            },
            fillStyle: {
                "background-color": "#d460eb",
            },
            display() {
                return "<h5>" + format(player.sme.generatorTimers[2]) + "/" + format(player.sme.generatorTimersMax[2]) + "<h5> seconds to produce " + format(player.sme.generatorProduction[2]) + " starmetal essence.</h5>";
            },

        },
                3: {
            unlocked() { return player.sme.buyables[3].gte(1) },
            direction: RIGHT,
            width: 350,
            height: 125,
            progress() {
                return player.sme.generatorTimers[3].div(player.sme.generatorTimersMax[3])
            },
            fillStyle: {
                "background-color": "#d460eb",
            },
            display() {
                return "<h5>" + format(player.sme.generatorTimers[3]) + "/" + format(player.sme.generatorTimersMax[3]) + "<h5> seconds to produce " + format(player.sme.generatorProduction[3]) + " starmetal essence.</h5>";
            },

        },
                4: {
            unlocked() { return player.sme.buyables[4].gte(1) },
            direction: RIGHT,
            width: 350,
            height: 125,
            progress() {
                return player.sme.generatorTimers[4].div(player.sme.generatorTimersMax[4])
            },
            fillStyle: {
                "background-color": "#d460eb",
            },
            display() {
                return "<h5>" + format(player.sme.generatorTimers[4]) + "/" + format(player.sme.generatorTimersMax[4]) + "<h5> seconds to produce " + format(player.sme.generatorProduction[4]) + " starmetal essence.</h5>";
            },

        },
    },
    upgrades: { 
    },
    buyables: {
        0: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.sma.starmetalAlloy },
            pay(amt) { player.sma.starmetalAlloy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.75)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Generator I"
            },
            display() {
                return 'which are boosting starmetal essence generator I production by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' SMA'
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
            style: { width: '275px', height: '125px', }
        },
        1: {
            costBase() { return new Decimal(250) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.sma.starmetalAlloy },
            pay(amt) { player.sma.starmetalAlloy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.8)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Generator II"
            },
            display() {
                return 'which are boosting starmetal essence generator II production by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' SMA'
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
            style: { width: '275px', height: '125px', }
        },
        2: {
            costBase() { return new Decimal(600) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.sma.starmetalAlloy },
            pay(amt) { player.sma.starmetalAlloy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.85)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Generator III"
            },
            display() {
                return 'which are boosting starmetal essence generator III production by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' SMA'
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
            style: { width: '275px', height: '125px', }
        },
        3: {
            costBase() { return new Decimal(3000) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.sma.starmetalAlloy },
            pay(amt) { player.sma.starmetalAlloy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.9)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Generator IV"
            },
            display() {
                return 'which are boosting starmetal essence generator IV production by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' SMA'
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
            style: { width: '275px', height: '125px', }
        },
        4: {
            costBase() { return new Decimal(18000) },
            costGrowth() { return new Decimal(1.45) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.sma.starmetalAlloy },
            pay(amt) { player.sma.starmetalAlloy = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.95)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Generator V"
            },
            display() {
                return 'which are boosting starmetal essence generator V production by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' SMA'
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
            style: { width: '275px', height: '125px', }
        },

        //radiation
        10: {
            costBase() { return new Decimal(1e10) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.ra.radiation },
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(5).add(1)},
            unlocked() { return player.sme.buyables[0].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Hastener I"
            },
            display() {
                return 'which are dividing starmetal essence generator I time requirement by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
            style: { width: '275px', height: '125px', background: "#0e8a22" }
        },
        11: {
            costBase() { return new Decimal(1e11) },
            costGrowth() { return new Decimal(1.625) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.ra.radiation },
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(5).add(1)},
            unlocked() { return player.sme.buyables[1].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Hastener II"
            },
            display() {
                return 'which are dividing starmetal essence generator II time requirement by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
            style: { width: '275px', height: '125px', background: "#0e8a22" }
        },
        12: {
            costBase() { return new Decimal(1e12) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.ra.radiation },
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(5).add(1)},
            unlocked() { return player.sme.buyables[2].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Hastener III"
            },
            display() {
                return 'which are dividing starmetal essence generator III time requirement by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
            style: { width: '275px', height: '125px', background: "#0e8a22" }
        },
                13: {
            costBase() { return new Decimal(1e13) },
            costGrowth() { return new Decimal(1.875) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.ra.radiation },
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(5).add(1)},
            unlocked() { return player.sme.buyables[3].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Hastener IV"
            },
            display() {
                return 'which are dividing starmetal essence generator IV time requirement by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
            style: { width: '275px', height: '125px', background: "#0e8a22" }
        },
                14: {
            costBase() { return new Decimal(1e14) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(9999) },
            currency() { return player.ra.radiation },
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(5).add(1)},
            unlocked() { return player.sme.buyables[4].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Hastener V"
            },
            display() {
                return 'which are dividing starmetal essence generator V time requirement by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
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
            style: { width: '275px', height: '125px', background: "#0e8a22" }
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Generators": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.sma.starmetalAlloy) + "</h3> starmetal alloy." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.ra.radiation) + "</h3> radiation." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["bar", 0], ["ex-buyable", 0], ["ex-buyable", 10]]],
                    ["row", [["bar", 1], ["ex-buyable", 1], ["ex-buyable", 11]]],
                    ["row", [["bar", 2], ["ex-buyable", 2], ["ex-buyable", 12]]],
                    ["row", [["bar", 3], ["ex-buyable", 3], ["ex-buyable", 13]]],
                    ["row", [["bar", 4], ["ex-buyable", 4], ["ex-buyable", 14]]],
                    ["blank", "25px"],  
                ]
            },
            "Starmetal Automation": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasUpgrade("sma", 109) },
                content:
                [
                    ["blank", "25px"],
        ["row", [["clickable", 11], ["clickable", 12]]],
                ]
            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.sme.starmetalEssence) + "</h3> starmetal essence." }, { "color": "white", "font-size": "30px", "font-family": "monospace" }],
        ["raw-html", function () { return "Your starmetal essence extends generator time requirements by x<h3>" + format(player.sme.starmetalEssenceSoftcap) + "</h3>." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.ma.matosDefeated  }
})
