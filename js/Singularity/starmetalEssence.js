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
        autoLeaveToggle: false,
        autoEnterToggle: false,

        leaveInput: new Decimal(0),
        leaveAmount: new Decimal(1),
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
    branches: ["bh", "sd", "sma"],
    color: "#d460eb",
    update(delta) {
        let onepersec = new Decimal(1)

        player.sme.generatorTimersMax = [
            new Decimal(10),new Decimal(40),new Decimal(90),new Decimal(160),new Decimal(250),
        ]
        player.sme.generatorTimersMax[0] = player.sme.generatorTimersMax[0].div(buyableEffect("sme", 10))
        player.sme.generatorTimersMax[1] = player.sme.generatorTimersMax[1].div(buyableEffect("sme", 11))
        player.sme.generatorTimersMax[2] = player.sme.generatorTimersMax[2].div(buyableEffect("sme", 12))
        player.sme.generatorTimersMax[3] = player.sme.generatorTimersMax[3].div(buyableEffect("sme", 13))
        player.sme.generatorTimersMax[4] = player.sme.generatorTimersMax[4].div(buyableEffect("sme", 14))

        player.sme.starmetalEssenceSoftcap = player.sme.starmetalEssence.pow(0.5).div(15).add(1).pow(buyableEffect("sme", 103))
        
        player.sme.generatorProduction = [
            new Decimal(1),new Decimal(7),new Decimal(16),new Decimal(30),new Decimal(60),
        ]

        for (let i = 0; i < player.sme.generatorTimers.length; i++) {
            if (player.sme.buyables[i].gte(1)) player.sme.generatorTimers[i] = player.sme.generatorTimers[i].add(onepersec.mul(delta))

            player.sme.generatorTimersMax[i] = player.sme.generatorTimersMax[i].mul(player.sme.starmetalEssenceSoftcap)
            player.sme.generatorTimersMax[i] = player.sme.generatorTimersMax[i].div(buyableEffect("sme", 102))
            if (hasMilestone("db", 103)) player.sme.generatorTimersMax[i] = player.sme.generatorTimersMax[i].div(1.4)
            player.sme.generatorProduction[i] = player.sme.generatorProduction[i].mul(buyableEffect("sme", i))
            player.sme.generatorProduction[i] = player.sme.generatorProduction[i].mul(buyableEffect("sme", 101))
            player.sme.generatorProduction[i] = player.sme.generatorProduction[i].mul(levelableEffect("pet", 502)[1])
            player.sme.generatorProduction[i] = player.sme.generatorProduction[i].mul(buyableEffect("al", 205))
            player.sme.generatorProduction[i] = player.sme.generatorProduction[i].mul(levelableEffect("pu", 305)[2])
            if (player.sme.generatorTimers[i].gte(player.sme.generatorTimersMax[i])) {
                player.sme.starmetalEssence = player.sme.starmetalEssence.add(player.sme.generatorProduction[i])
                player.sme.generatorTimers[i] = new Decimal(0)
            }
        }
        
        if (player.sme.leaveInput.gte(1)) player.sme.leaveAmount = player.sme.leaveInput
        if (player.sme.leaveInput.lt(1)) player.sme.leaveAmount = new Decimal(1)
    },
    clickables: {
        11: {
            title() {return player.sme.starmetalResetToggle ? "Auto Starmetal Resets On" : "Auto Starmetal Resets Off"},
            canClick: true,
            unlocked: true,
            onClick() {
                if (player.sme.starmetalResetToggle) {
                    player.sme.starmetalResetToggle = false
                } else {
                    player.sme.starmetalResetToggle = true
                }
            },
            style() {
                let look = {width: "133px", minHeight: "100px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0px"}
                if (player.sme.starmetalResetToggle) {look.backgroundColor = "#d460eb"} else {look.backgroundColor = "#a94cbc"}
                return look
            },
        },
        12: {
            title() {return player.sme.autoLeaveToggle ? "Auto Leave DU1 On" : "Auto Leave DU1 Off"},
            canClick: true,
            unlocked: true,
            onClick() {
                if (player.sme.autoLeaveToggle) {
                    player.sme.autoLeaveToggle = false
                } else {
                    player.sme.autoLeaveToggle = true
                }
            },
            style() {
                let look = {width: "133px", minHeight: "100px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0px"}
                if (player.sme.autoLeaveToggle) {look.backgroundColor = "#d460eb"} else {look.backgroundColor = "#a94cbc"}
                return look
            },
        },
        13: {
            title() {return player.sme.autoEnterToggle ? "Auto Enter DU1 On" : "Auto Enter DU1 Off"},
            canClick: true,
            unlocked: true,
            onClick() {
                if (player.sme.autoEnterToggle) {
                    player.sme.autoEnterToggle = false
                } else {
                    player.sme.autoEnterToggle = true
                }
            },
            style() {
                let look = {width: "133px", minHeight: "100px", border: "3px solid rgba(0,0,0,0.2)", borderRadius: "0px"}
                if (player.sme.autoEnterToggle) {look.backgroundColor = "#d460eb"} else {look.backgroundColor = "#a94cbc"}
                return look
            },
        },
    },
    bars: {
        0: {
            unlocked() { return player.sme.buyables[0].gte(1) },
            direction: RIGHT,
            width: 350,
            height: 128,
            progress() {
                return player.sme.generatorTimers[0].div(player.sme.generatorTimersMax[0])
            },
            borderStyle: {borderLeft: "3px solid white", borderRight: "3px solid white", borderTop: "0px solid white", borderBottom: "0px solid white", borderRadius: "0"},
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#d460eb"},
            display() {
                return "<h5>" + format(player.sme.generatorTimers[0]) + "/" + format(player.sme.generatorTimersMax[0]) + "<h5> seconds to produce " + format(player.sme.generatorProduction[0]) + " starmetal essence.</h5>";
            },
        },
        1: {
            unlocked() { return player.sme.buyables[1].gte(1) },
            direction: RIGHT,
            width: 350,
            height: 128,
            progress() {
                return player.sme.generatorTimers[1].div(player.sme.generatorTimersMax[1])
            },
            borderStyle: {borderLeft: "3px solid white", borderRight: "3px solid white", borderTop: "0px solid white", borderBottom: "0px solid white", borderRadius: "0"},
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#d460eb"},
            display() {
                return "<h5>" + format(player.sme.generatorTimers[1]) + "/" + format(player.sme.generatorTimersMax[1]) + "<h5> seconds to produce " + format(player.sme.generatorProduction[1]) + " starmetal essence.</h5>";
            },
        },
        2: {
            unlocked() { return player.sme.buyables[2].gte(1) },
            direction: RIGHT,
            width: 350,
            height: 128,
            progress() {
                return player.sme.generatorTimers[2].div(player.sme.generatorTimersMax[2])
            },
            borderStyle: {borderLeft: "3px solid white", borderRight: "3px solid white", borderTop: "0px solid white", borderBottom: "0px solid white", borderRadius: "0"},
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#d460eb"},
            display() {
                return "<h5>" + format(player.sme.generatorTimers[2]) + "/" + format(player.sme.generatorTimersMax[2]) + "<h5> seconds to produce " + format(player.sme.generatorProduction[2]) + " starmetal essence.</h5>";
            },

        },
        3: {
            unlocked() { return player.sme.buyables[3].gte(1) },
            direction: RIGHT,
            width: 350,
            height: 128,
            progress() {
                return player.sme.generatorTimers[3].div(player.sme.generatorTimersMax[3])
            },
            borderStyle: {borderLeft: "3px solid white", borderRight: "3px solid white", borderTop: "0px solid white", borderBottom: "0px solid white", borderRadius: "0"},
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#d460eb"},
            display() {
                return "<h5>" + format(player.sme.generatorTimers[3]) + "/" + format(player.sme.generatorTimersMax[3]) + "<h5> seconds to produce " + format(player.sme.generatorProduction[3]) + " starmetal essence.</h5>";
            },

        },
        4: {
            unlocked() { return player.sme.buyables[4].gte(1) },
            direction: RIGHT,
            width: 350,
            height: 128,
            progress() {
                return player.sme.generatorTimers[4].div(player.sme.generatorTimersMax[4])
            },
            borderStyle: {borderLeft: "3px solid white", borderRight: "3px solid white", borderTop: "0px solid white", borderBottom: "0px solid white", borderRadius: "0"},
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#d460eb"},
            display() {
                return "<h5>" + format(player.sme.generatorTimers[4]) + "/" + format(player.sme.generatorTimersMax[4]) + "<h5> seconds to produce " + format(player.sme.generatorProduction[4]) + " starmetal essence.</h5>";
            },

        },
    },
    upgrades: {},
    buyables: {
        0: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.25).div(buyableEffect("sme", 104)) },
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
            costGrowth() { return new Decimal(1.3).div(buyableEffect("sme", 104)) },
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
            costGrowth() { return new Decimal(1.35).div(buyableEffect("sme", 104)) },
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
            costGrowth() { return new Decimal(1.4).div(buyableEffect("sme", 104)) },
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
            costGrowth() { return new Decimal(1.45).div(buyableEffect("sme", 104)) },
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
            costGrowth() { return new Decimal(1.5).div(buyableEffect("sme", 104)) },
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
            costGrowth() { return new Decimal(1.625).div(buyableEffect("sme", 104)) },
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
            costGrowth() { return new Decimal(1.75).div(buyableEffect("sme", 104)) },
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
            costGrowth() { return new Decimal(1.875).div(buyableEffect("sme", 104)) },
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
            costGrowth() { return new Decimal(2).div(buyableEffect("sme", 104)) },
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

        // START OF STUDY'S
        101: {
            costBase() { return [new Decimal(200), new Decimal(100)] },
            costGrowth() { return [new Decimal(5), new Decimal(3)] },
            purchaseLimit() { return new Decimal(5).add(buyableEffect("sme", 105)) },
            currency() { return [player.sma.starmetalAlloy, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.sma.starmetalAlloy = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked: true,
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1])
            },
            display() {
                return "<h3>SME-A1</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")\n\
                    Increase SME gain by 10%\n\
                    Currently: +" + formatWhole(tmp[this.layer].buyables[this.id].effect.sub(1).mul(100)) + "%\n\ \n\
                    Cost:<br>" + formatShortWhole(player.sma.starmetalAlloy) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " SMA\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "340px", top: "20px", width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },
        102: {
            costBase() { return [new Decimal(5000), new Decimal(1000)] },
            costGrowth() { return [new Decimal(5), new Decimal(3)] },
            purchaseLimit() { return new Decimal(5).add(buyableEffect("sme", 105)) },
            currency() { return [player.sma.starmetalAlloy, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.sma.starmetalAlloy = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked: true,
            branches: [[101, "#d460eb"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 101).gt(0)
            },
            display() {
                return "<h3>SME-A2</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")\n\
                    Divide SME generator cooldowns by 10%\n\
                    Currently: /" + formatWhole(tmp[this.layer].buyables[this.id].effect.sub(1).mul(100)) + "%\n\ \n\
                    Cost:<br>" + formatShortWhole(player.sma.starmetalAlloy) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " SMA\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "370px", top: "160px", width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },
        103: {
            costBase() { return [new Decimal(100000), new Decimal(10000)] },
            costGrowth() { return [new Decimal(5), new Decimal(3)] },
            purchaseLimit() { return new Decimal(5) },
            currency() { return [player.sma.starmetalAlloy, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.sma.starmetalAlloy = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return Decimal.sub(1, getBuyableAmount(this.layer, this.id).div(50))},
            unlocked: true,
            branches: [[102, "#d460eb"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 102).gt(0)
            },
            display() {
                return "<h3>SME-A3</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/5)\n\
                    Reduce SME softcap slightly\n\
                    Currently: ^" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost:<br>" + formatShortWhole(player.sma.starmetalAlloy) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " SMA\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "320px", top: "300px", width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },
        104: {
            costBase() { return [new Decimal(2e6), new Decimal(100000)] },
            costGrowth() { return [new Decimal(5), new Decimal(3)] },
            purchaseLimit() { return new Decimal(5) },
            currency() { return [player.sma.starmetalAlloy, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.sma.starmetalAlloy = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            branches: [[103, "#d460eb"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 103).gt(0)
            },
            display() {
                return "<h3>SME-A4</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/5)\n\
                    Reduce SME generator cost scaling\n\
                    Currently: /" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost:<br>" + formatShortWhole(player.sma.starmetalAlloy) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " SMA\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "350px", top: "440px", width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },
        105: {
            costBase() { return [new Decimal(5e7), new Decimal(1e6)] },
            costGrowth() { return [new Decimal(5), new Decimal(3)] },
            purchaseLimit() { return new Decimal(5) },
            currency() { return [player.sma.starmetalAlloy, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.sma.starmetalAlloy = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked: true,
            branches: [[104, "#d460eb"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 104).gt(0)
            },
            display() {
                return "<h3>SME-A5</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/5)\n\
                    Increase SME-A1 & SME-A2 Cap\n\
                    Currently: +" + formatSimple(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost:<br>" + formatShortWhole(player.sma.starmetalAlloy) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " SMA\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "370px", top: "580px", width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },

        // CHECK BACK STUFF
        111: {
            costBase() { return [new Decimal(10), new Decimal(200)] },
            costGrowth() { return [new Decimal(2.5), new Decimal(2)] },
            purchaseLimit() { return new Decimal(5) },
            currency() { return [player.cb.evolutionShards, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.cb.evolutionShards = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked: true,
            branches: [[101, "#094599"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 101).gt(0)
            },
            display() {
                return "<h3>SME-B1</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/5)\n\
                    Increase evo-shard evo-pet level cap\n\
                    Currently: +" + formatSimple(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost:<br>" + formatShortWhole(player.cb.evolutionShards) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " Evo-Shards\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "190px", top: "30px", width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },
        112: {
            costBase() { return [new Decimal(2), new Decimal(500)] },
            costGrowth() { return [new Decimal(3), new Decimal(100)] },
            purchaseLimit() { return new Decimal(3) },
            currency() { return [player.cb.paragonShards, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.cb.paragonShards = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked: true,
            branches: [[111, "#094599"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 111).gt(0)
            },
            display() {
                return "<h3>SME-B2</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/3)\n\
                    Unlock more Marcel researches\n\
                    Currently: +" + formatSimple(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost:<br>" + formatShortWhole(player.cb.paragonShards) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " Para-Shards\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "50px", top: "50px", width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },
        113: {
            costBase() { return [new Decimal(1), new Decimal(2500)] },
            costGrowth() { return [new Decimal(1.1), new Decimal(1.5)] },
            purchaseLimit() { return new Decimal(10) },
            currency() { return [player.ep2.chocoShards, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.ep2.chocoShards = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return Decimal.pow(1.25, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            branches: [[112, "#094599"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 112).gt(0)
            },
            display() {
                return "<h3>SME-B3</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    Increase cookie gain by x1.25\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost:<br>" + formatShortWhole(player.ep2.chocoShards) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " Choco-Shards\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "30px", top: "190px", width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },
        114: {
            costBase() { return [new Decimal(1e4), new Decimal(15000)] },
            costGrowth() { return [new Decimal(2), new Decimal(1.5)] },
            purchaseLimit() { return new Decimal(10) },
            currency() { return [player.cb.petPoints, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.cb.petPoints = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return Decimal.pow(1.2, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            branches: [[113, "#094599"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 112).gt(0)
            },
            display() {
                return "<h3>SME-B4</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    Increase singularity pet point cap by x1.2\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost:<br>" + formatShortWhole(player.cb.petPoints) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " Pet Points\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "190px", top: "170px", width: "140px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },

        // BH STUFF
        121: {
            costBase() { return [new Decimal(5), new Decimal(2000)] },
            costGrowth() { return [new Decimal(1.04), new Decimal(1.08)] },
            purchaseLimit() { return new Decimal(25) },
            currency() { return [player.bh.darkEssence, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.bh.darkEssence = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked: true,
            branches: [[102, "#8a0e79"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 102).gt(0)
            },
            display() {
                return "<h3>SME-C1</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/25)\n\
                    Increase black heart health\n\
                    Currently: +" + formatSimple(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost:<br>" + formatShortWhole(player.bh.darkEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " Dark Essence\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "490px", top: "25px", width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },
        122: {
            costBase() { return [new Decimal(10), new Decimal(4000)] },
            costGrowth() { return [new Decimal(1.06), new Decimal(1.12)] },
            purchaseLimit() { return new Decimal(25) },
            currency() { return [player.bh.darkEssence, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.bh.darkEssence = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(5)},
            unlocked: true,
            branches: [[121, "#8a0e79"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 121).gt(0)
            },
            display() {
                return "<h3>SME-C2</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/25)\n\
                    Increase black heart damage\n\
                    Currently: +" + formatSimple(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost:<br>" + formatShortWhole(player.bh.darkEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " Dark Essence\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "630px", top: "40px", width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },
        123: {
            costBase() { return [new Decimal(20), new Decimal(8000)] },
            costGrowth() { return [new Decimal(1.08), new Decimal(1.16)] },
            purchaseLimit() { return new Decimal(25) },
            currency() { return [player.bh.darkEssence, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.bh.darkEssence = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(2)},
            unlocked: true,
            branches: [[122, "#8a0e79"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 122).gt(0)
            },
            display() {
                return "<h3>SME-C3</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/25)\n\
                    Increase black heart agility\n\
                    Currently: +" + formatSimple(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost:<br>" + formatShortWhole(player.bh.darkEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " Dark Essence\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "650px", top: "180px", width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },
        124: {
            costBase() { return [new Decimal(50), new Decimal(25000)] },
            costGrowth() { return [new Decimal(3), new Decimal(10)] },
            purchaseLimit() { return new Decimal(5) },
            currency() { return [player.bh.darkEssence, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.bh.darkEssence = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(20)},
            unlocked: true,
            branches: [[123, "#8a0e79"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 123).gt(0)
            },
            display() {
                return "<h3>SME-C4</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/5)\n\
                    Increase black heart regen\n\
                    Currently: +" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) + "\n\ \n\
                    Cost:<br>" + formatShortWhole(player.bh.darkEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " Dark Essence\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "510px", top: "160px", width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },

        // GENERAL BUFFS
        131: {
            costBase() { return [new Decimal(100000), new Decimal(25000)] },
            costGrowth() { return [new Decimal(10), new Decimal(1.5)] },
            purchaseLimit() { return new Decimal(5) },
            currency() { return [player.au2.stars, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.au2.stars = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return Decimal.pow(1.5, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            branches: [[103, "#cc0000"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 103).gt(0)
            },
            display() {
                return "<h3>SME-D1</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/5)\n\
                    Increase radiation gain by x1.5\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost:<br>" + formatShortWhole(player.au2.stars) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " Stars\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "200px", top: "430px", width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },
        132: {
            costBase() { return [new Decimal("1e500"), new Decimal(150000)] },
            costGrowth() { return [new Decimal(1e100), new Decimal(2)] },
            purchaseLimit() { return new Decimal(10) },
            currency() { return [player.s.singularityPoints, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.s.singularityPoints = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(20).add(1)},
            unlocked: true,
            branches: [[131, "#cc0000"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 131).gt(0)
            },
            display() {
                return "<h3>SME-D2</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/10)\n\
                    Increase core fragment gain by 5%\n\
                    Currently: +" + formatSimple(tmp[this.layer].buyables[this.id].effect.sub(1).mul(100)) + "%\n\ \n\
                    Cost:<br>" + formatShortWhole(player.s.singularityPoints) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " SP\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "60px", top: "450px", width: "125px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },
        133: {
            costBase() { return [new Decimal(25), new Decimal(400000)] },
            costGrowth() { return [new Decimal(2), new Decimal(2.5)] },
            purchaseLimit() { return new Decimal(5) },
            currency() { return [player.sma.eclipseShards, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.sma.eclipseShards = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return Decimal.pow(2, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            branches: [[132, "#cc0000"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 132).gt(0)
            },
            display() {
                return "<h3>SME-D3</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/5)\n\
                    Double ancient pylon energy gain\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost:<br>" + formatShortWhole(player.sma.eclipseShards) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " Eclipse Shards\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "40px", top: "590px", width: "125px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },
        134: {
            costBase() { return [new Decimal(1e308), new Decimal(1e6)] },
            costGrowth() { return [new Decimal(2), new Decimal(2.5)] },
            purchaseLimit() { return new Decimal(5) },
            currency() { return [player.sma.eclipseShards, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.sma.eclipseShards = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return Decimal.pow(1.5, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            branches: [[133, "#cc0000"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 133).gt(0)
            },
            display() {
                return "<h3>SME-D4</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/5)\n\
                    Increase hex power gain by x1.5\n\
                    Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost:<br>" + formatShortWhole(0) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " ???\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "190px", top: "580px", width: "125px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },

        // HIVE BUFFS
        141: {
            costBase() { return [new Decimal(1e20), new Decimal(250000)] },
            costGrowth() { return [new Decimal(1e10), new Decimal(1.5)] },
            purchaseLimit() { return new Decimal(5) },
            currency() { return [player.bee.bees, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.bee.bees = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return getBuyableAmount(this.layer, this.id)},
            unlocked: true,
            branches: [[104, "#ffd69c"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 104).gt(0)
            },
            display() {
                return "<h3>SME-E1</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/5)\n\
                    Increase base bee gain\n\
                    Currently: +" + formatSimple(tmp[this.layer].buyables[this.id].effect) + "\n\ \n\
                    Cost:<br>" + formatShortWhole(player.bee.bees) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " Bees\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "490px", top: "440px", width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },
        142: {
            costBase() { return [new Decimal(2), new Decimal(5e5)] },
            costGrowth() { return [new Decimal(2), new Decimal(1.5)] },
            purchaseLimit() { return new Decimal(5) },
            currency() { return [player.al.honeycomb, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.al.honeycomb = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(5).add(1)},
            unlocked: true,
            branches: [[141, "#ffd69c"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 141).gt(0)
            },
            display() {
                return "<h3>SME-E2</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/5)\n\
                    Increase flower gain by 20%\n\
                    Currently: +" + formatSimple(tmp[this.layer].buyables[this.id].effect.sub(1).mul(100)) + "%\n\ \n\
                    Cost:<br>" + formatShortWhole(player.al.honeycomb) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " HC\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "500px", top: "300px", width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },
        143: {
            costBase() { return [new Decimal(4), new Decimal(1e6)] },
            costGrowth() { return [new Decimal(4), new Decimal(1.75)] },
            purchaseLimit() { return new Decimal(5) },
            currency() { return [player.al.royalJelly, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.al.royalJelly = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            branches: [[141, "#ffd69c"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 141).gt(0)
            },
            display() {
                return "<h3>SME-E3</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/5)\n\
                    Increase GEB by 1%\n\
                    Currently: +" + formatSimple(tmp[this.layer].buyables[this.id].effect.sub(1).mul(100)) + "%\n\ \n\
                    Cost:<br>" + formatShortWhole(player.al.royalJelly) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " RJ\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "630px", top: "450px", width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },
        144: {
            costBase() { return [new Decimal(1e100), new Decimal(2.5e6)] },
            costGrowth() { return [new Decimal(1e20), new Decimal(2)] },
            purchaseLimit() { return new Decimal(5) },
            currency() { return [player.bee.bees, player.sme.starmetalEssence]},
            pay(amt, amt2) {
                player.bee.bees = this.currency()[0].sub(amt)
                player.sme.starmetalEssence = this.currency()[1].sub(amt2)
            },
            effect(x) {return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked: true,
            branches: [[142, "#ffd69c"], [143, "#ffd69c"]],
            cost(x) {
                return [this.costGrowth()[0].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[0]).floor(), this.costGrowth()[1].pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()[1]).floor()]
            },
            canAfford() {
                return this.currency()[0].gte(this.cost()[0]) && this.currency()[1].gte(this.cost()[1]) && getBuyableAmount("sme", 142).gt(0) && getBuyableAmount("sme", 143).gt(0)
            },
            display() {
                return "<h3>SME-E4</h3> (" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/5)\n\
                    Increase Aleph Resources by 10%\n\
                    Currently: +" + formatSimple(tmp[this.layer].buyables[this.id].effect.sub(1).mul(100)) + "%\n\ \n\
                    Cost:<br>" + formatShortWhole(player.bee.bees) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[0]) + " Bees\n\
                    " + formatShortWhole(player.sme.starmetalEssence) + "/" + formatShortWhole(tmp[this.layer].buyables[this.id].cost[1]) + " SME"
            },
            buy() {
                this.pay(this.cost()[0], this.cost()[1])
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {position: "absolute", left: "640px", top: "310px", width: "120px", height: "120px", color: "rgba(0,0,0,0.8)", border: "3px solid #282363", borderRadius: "15px"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.background = "#77bf5f" : !this.canAfford() ? look.background =  "#bf8f8f" : look.background = "linear-gradient(-120deg,rgb(122, 235, 87) 0%,rgb(142, 191, 50) 25%,#eb6077 50%,rgb(235, 96, 177), 75%,rgb(96, 105, 235) 100%)"
                return look
            },
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Generators": {
                buttonStyle() {return {color: "white", borderRadius: "10px"}},
                unlocked: true,
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.sma.starmetalAlloy) + "</h3> starmetal alloy." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.ra.radiation) + "</h3> radiation." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 0], ["bar", 0], ["ex-buyable", 10]], {border: "3px solid white"}],
                    ["style-row", [["ex-buyable", 1], ["bar", 1], ["ex-buyable", 11]], {border: "3px solid white", marginTop: "-3px"}],
                    ["style-row", [["ex-buyable", 2], ["bar", 2], ["ex-buyable", 12]], {border: "3px solid white", marginTop: "-3px"}],
                    ["style-row", [["ex-buyable", 3], ["bar", 3], ["ex-buyable", 13]], {border: "3px solid white", marginTop: "-3px"}],
                    ["style-row", [["ex-buyable", 4], ["bar", 4], ["ex-buyable", 14]], {border: "3px solid white", marginTop: "-3px"}],
                ]
            },
            "Starmetal Studies": {
                buttonStyle() {return {color: "white", borderRadius: "10px"}},
                unlocked: true,
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", "Starmetal Studies", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                    ], {width: "800px", height: "50px", background: "linear-gradient(to right, #e6eb57 -10%, #8d3947 5%, #54265e 10%, #13292f 15%, black 20%, black 80%, #13292f 85%, #54265e 90%, #8d3947 95%, #e6eb57 110%)", border: "3px solid #d460eb", borderRadius: "30px 30px 0 0", marginBottom: "-3px"}],
                    ["style-column", [
                        ["buyable", 101], ["buyable", 102], ["buyable", 103], ["buyable", 104], ["buyable", 105],
                        ["buyable", 111], ["buyable", 112], ["buyable", 113], ["buyable", 114],
                        ["buyable", 121], ["buyable", 122], ["buyable", 123], ["buyable", 124],
                        ["buyable", 131], ["buyable", 132], ["buyable", 133], ["buyable", 134],
                        ["buyable", 141], ["buyable", 142], ["buyable", 143], ["buyable", 144],
                    ], {position: "relative", width: "800px", height: "720px", background: "rgba(0,0,0,0.3)", border: "3px solid #d460eb", borderRadius: "0 0 30px 30px"}],
                ]
            },
            "Starmetal Automation": {
                buttonStyle() {return {color: "white", borderRadius: "10px"}},
                unlocked: true,
                content: [
                    ["blank", "25px"],  
                    ["style-column", [
                        ["style-row", [
                            ["raw-html", () => {return format(player.sma.starmetalAlloy) + " SMA"}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ], {width: "400px", height: "30px", backgroundColor: "#6a3075"}],
                        ["style-column", [
                            ["raw-html", () => {return "Autoleave amount"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["raw-html", () => {return formatWhole(player.sme.leaveAmount) + " SMA."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "400px", height: "70px"}],
                        ["text-input", "leaveInput", {width: "350px", height: "50px", backgroundColor: "#3f1c46", color: "white", fontSize: "32px", textAlign: "left", border: "0px", padding: "0px 25px"}],
                        ["style-row", [
                            ["clickable", 11], ["clickable", 12], ["clickable", 13],
                        ], {width: "400px", height: "100px"}],
                    ], {width: "400px", height: "250px", backgroundColor: "#54265e", border: "3px solid #ccc"}],
                ]
            },
        },
    }, 
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.sme.starmetalEssence) + "</h3> starmetal essence." }, { "color": "white", "font-size": "30px", "font-family": "monospace" }],
        ["raw-html", function () { return "Your starmetal essence extends generator time requirements by x<h3>" + format(player.sme.starmetalEssenceSoftcap) + "</h3>." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && player.matosLair.milestone[25] > 0  }
})
