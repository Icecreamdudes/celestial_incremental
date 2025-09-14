addLayer("pr", {
    name: "Perks", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PR", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        perkPoints: new Decimal(0),
        perkPointsToGet: new Decimal(1),
        perkPointsChance: new Decimal(0.03),
    }
    },
    automate() {
        if (hasMilestone("gs", 13))
        {
            buyBuyable("pr", 11)
            buyBuyable("pr", 12)
            buyBuyable("pr", 13)
            buyBuyable("pr", 14)
            buyBuyable("pr", 15)
            buyBuyable("pr", 16)
            buyBuyable("pr", 17)
            buyBuyable("pr", 18)
        }
    },
    nodeStyle() {
    },
    tooltip: "Perks",
    branches: ["ar"],
    color: "#1D36A0",
    update(delta) {
        let onepersec = new Decimal(1)

        player.pr.perkPointsToGet = new Decimal(1)
        player.pr.perkPointsToGet = player.pr.perkPointsToGet.mul(buyableEffect("pr", 17))
        if (hasUpgrade("an", 16)) player.pr.perkPointsToGet = player.pr.perkPointsToGet.mul(upgradeEffect("an", 16))
        player.pr.perkPointsToGet = player.pr.perkPointsToGet.mul(buyableEffect("rt", 16))
        player.pr.perkPointsToGet = player.pr.perkPointsToGet.mul(buyableEffect("gs", 15))
        player.pr.perkPointsToGet = player.pr.perkPointsToGet.mul(player.oi.linkingPowerEffect[1])
        if (hasUpgrade("fu", 11)) player.pr.perkPointsToGet = player.pr.perkPointsToGet.mul(upgradeEffect("fu", 11))
        player.pr.perkPointsToGet = player.pr.perkPointsToGet.mul(buyableEffect("fu", 37))
        if (inChallenge("fu", 11)) player.pr.perkPointsToGet = player.pr.perkPointsToGet.pow(0.2)

        player.pr.perkPointsChance = new Decimal(0.03)
        player.pr.perkPointsChance = player.pr.perkPointsChance.add(buyableEffect("pr", 18))
    },
    clickables: {
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.buyMax == false },
            unlocked() { return true },
            onClick() {
                player.buyMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.buyMax == true  },
            unlocked() { return true },
            onClick() {
                player.buyMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
    },
    bars: {
        replicantiBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 400,
            height: 25,
            progress() {
                if (player.cp.replicantiPoints.lt(player.cp.replicantiPointCap)) {
                    return player.cp.replicantiPointsTimer.div(player.cp.replicantiPointsTimerReq)
                } else {
                    return new Decimal(1)
                }
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#193ceb"},
            display() {
                if (player.cp.replicantiPoints.lt(player.cp.replicantiPointCap)) {
                    return "Time: " + formatTime(player.cp.replicantiPointsTimer) + "/" + formatTime(player.cp.replicantiPointsTimerReq);
                } else {
                    return "<p style='color:red'>[HARDCAPPED]</p>"
                }
            },
        },
    },
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.pr.perkPoints},
            pay(amt) { player.pr.perkPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Multiplier Perk"
            },
            display() {
                return "which are multiplying the added replicanti point multiplier by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Perk Points"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("gs", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("gs", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        12: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.pr.perkPoints},
            pay(amt) { player.pr.perkPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cooldown Perk"
            },
            display() {
                return "which are dividing the replicanti cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Perk Points"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("gs", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("gs", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        13: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.pr.perkPoints},
            pay(amt) { player.pr.perkPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.5).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Rank Points Perk"
            },
            display() {
                return "which are multiplying rank points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Perk Points"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("gs", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("gs", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        14: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.pr.perkPoints},
            pay(amt) { player.pr.perkPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.5).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tier Points Perk"
            },
            display() {
                return "which are multiplying tier points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Perk Points"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("gs", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("gs", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        15: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.pr.perkPoints},
            pay(amt) { player.pr.perkPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.5).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Softcap Perk"
            },
            display() {
                return "which are extending the softcap start by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Perk Points"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("gs", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("gs", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        16: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.pr.perkPoints},
            pay(amt) { player.pr.perkPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.15).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Softcap Effect Perk"
            },
            display() {
                return "which are dividing the softcap effect by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Perk Points"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("gs", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("gs", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        17: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(1.7) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cp.replicantiPoints},
            pay(amt) { player.cp.replicantiPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Perk Boost"
            },
            display() {
                return "which are multiplying perk points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Replicanti Points"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("gs", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("gs", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        18: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(194) },
            currency() { return player.cp.replicantiPoints},
            pay(amt) { player.cp.replicantiPoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.005) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Perk Chance Boost"
            },
            display() {
                return "which are adding +" + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + "% to the perk point chance.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Replicanti Points"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("gs", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("gs", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "20px"],
                    ["row", [
                        ["raw-html", () => {return "You have <h3>" + format(player.pr.perkPoints) + "</h3> perk points."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.pr.perkPointsToGet) + ")"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["raw-html", () => { return "Chance to gain perk points: <h3>" + format(player.pr.perkPointsChance.mul(100)) + "</h3>%" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14],
                        ["ex-buyable", 15], ["ex-buyable", 16], ["ex-buyable", 17], ["ex-buyable", 18]], {maxWidth: "1200px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => {return "You have <h3>" + format(player.cp.replicantiPoints) + "</h3> replicanti points."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["raw-html", () => {return "Replicanti Mult: " + format(player.cp.replicantiPointsMult, 4) + "x"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["row", [["bar", "replicantiBar"]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("cp", 12) }
})
