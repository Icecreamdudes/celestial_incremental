addLayer("t", {
    name: "Trees", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        leaves: new Decimal(0),
        leavesPerSecond: new Decimal(0),

        trees: new Decimal(0),
        treeEffect: new Decimal(1),
        treesToGet: new Decimal(1),
        treeReq: new Decimal(10),

        treeSoftcap: new Decimal(1),
        treeSoftcapStart: new Decimal(15),
        treeMax: false,
    }
    },
    automate() {
        if (hasMilestone("r", 12))
        {
            buyBuyable("t", 11)
            buyBuyable("t", 12)
            buyBuyable("t", 13)
            buyBuyable("t", 14)
            buyBuyable("t", 15)
            buyBuyable("t", 16)
            buyBuyable("t", 17)
            buyBuyable("t", 18)
        }
    },
    nodeStyle() {
    },
    tooltip: "Trees",
    color: "#0B6623",
    update(delta) {
        let onepersec = new Decimal(1)

        player.t.treesToGet = new Decimal(1)
        player.t.treesToGet = player.t.treesToGet.mul(buyableEffect("f", 28))
        player.t.treesToGet = player.t.treesToGet.mul(buyableEffect("f", 29))
        player.t.treesToGet = player.t.treesToGet.mul(buyableEffect("f", 31))
        player.t.treesToGet = player.t.treesToGet.mul(buyableEffect("f", 32))
        player.t.treesToGet = player.t.treesToGet.mul(buyableEffect("f", 33))
        player.t.treesToGet = player.t.treesToGet.mul(buyableEffect("f", 34))
        player.t.treesToGet = player.t.treesToGet.mul(buyableEffect("f", 35))
        player.t.treesToGet = player.t.treesToGet.mul(player.m.modEffect)
        player.t.treesToGet = player.t.treesToGet.mul(player.cb.commonPetEffects[1][1])
        player.t.treesToGet = player.t.treesToGet.mul(player.d.diceEffects[3])
        player.t.treesToGet = player.t.treesToGet.mul(player.rf.abilityEffects[1])
        if (hasUpgrade("g", 12)) player.t.treesToGet = player.t.treesToGet.mul(upgradeEffect("g", 12))
        if (hasMilestone("r", 19)) player.t.treesToGet = player.t.treesToGet.mul(player.r.pentMilestone30Effect)
        if (hasUpgrade("ip", 22) && !inChallenge("ip", 14)) player.t.treesToGet = player.t.treesToGet.mul(upgradeEffect("ip", 22))
        if (hasUpgrade("ad", 15) && !inChallenge("ip", 14)) player.t.treesToGet = player.t.treesToGet.mul(upgradeEffect("ad", 15))
        if (inChallenge("ip", 13)) player.t.treesToGet = player.t.treesToGet.pow(0.75)
        if (inChallenge("ip", 13) || player.po.hex) player.t.treesToGet = player.t.treesToGet.mul(buyableEffect("h", 13))
        if (player.de.antidebuffIndex.eq(3)) player.t.treesToGet = player.t.treesToGet.mul(player.de.antidebuffEffect)
        if (inChallenge("tad", 11)) player.t.treesToGet = player.t.treesToGet.pow(0.5)
        if (player.pol.pollinatorsIndex == 3) player.t.treesToGet = player.t.treesToGet.mul(player.pol.pollinatorsEffect[4])
        player.t.treesToGet = player.t.treesToGet.mul(buyableEffect("gh", 32))
        player.t.treesToGet = player.t.treesToGet.mul(player.r.timeCubeEffects[1])
        player.t.treesToGet = player.t.treesToGet.pow(buyableEffect("rm", 24))
        player.t.treesToGet = player.t.treesToGet.div(player.po.halterEffects[4])

        player.t.leavesPerSecond = buyableEffect("t", 11)
        player.t.leavesPerSecond = player.t.leavesPerSecond.mul(buyableEffect("t", 12))
        player.t.leavesPerSecond = player.t.leavesPerSecond.mul(player.g.grassEffect)
        player.t.leavesPerSecond = player.t.leavesPerSecond.mul(player.gh.grasshopperEffects[3])
        player.t.leavesPerSecond = player.t.leavesPerSecond.mul(buyableEffect("gh", 17))
        player.t.leavesPerSecond = player.t.leavesPerSecond.mul(player.cb.uncommonPetEffects[1][1])
        player.t.leavesPerSecond = player.t.leavesPerSecond.mul(player.d.diceEffects[4])
        if (hasUpgrade("ip", 22) && !inChallenge("ip", 14)) player.t.leavesPerSecond = player.t.leavesPerSecond.mul(upgradeEffect("ip", 22))
        if (hasUpgrade("ad", 15) && !inChallenge("ip", 14)) player.t.leavesPerSecond = player.t.leavesPerSecond.mul(upgradeEffect("ad", 15))
        if (player.t.trees.gte(player.t.treeSoftcapStart))
        {
            player.t.treeSoftcap = Decimal.pow(player.t.trees.add(1).sub(player.t.treeSoftcapStart), 0.5)
        player.t.leavesPerSecond = player.t.leavesPerSecond.div(player.t.treeSoftcap)
        }
        player.t.leavesPerSecond = player.t.leavesPerSecond.div(player.pe.pestEffect[3])
        if (inChallenge("ip", 13)) player.t.leavesPerSecond = player.t.leavesPerSecond.pow(0.75)
        if (inChallenge("ip", 13) || player.po.hex) player.t.leavesPerSecond = player.t.leavesPerSecond.mul(buyableEffect("h", 13))
        if (inChallenge("tad", 11)) player.t.leavesPerSecond = player.t.leavesPerSecond.pow(0.5)
        if (player.pol.pollinatorsIndex == 3) player.t.leavesPerSecond = player.t.leavesPerSecond.mul(player.pol.pollinatorsEffect[5])
        player.t.leavesPerSecond = player.t.leavesPerSecond.mul(buyableEffect("gh", 32))
        player.t.leavesPerSecond = player.t.leavesPerSecond.div(player.po.halterEffects[3])

        player.t.treeEffect = player.t.trees.div(6).pow(1.1).add(1)

        player.t.leaves = player.t.leaves.add(player.t.leavesPerSecond.mul(delta))
        if (player.t.leaves.gte(player.t.treeReq)) {
            player.t.trees = player.t.trees.add(player.t.treesToGet)
            player.t.leaves = new Decimal(0)
        }

        if (inChallenge("ip", 18) && player.t.trees.gt(player.t.trees.mul(0.3 * delta)))
        {
            player.t.trees = player.t.trees.sub(player.t.trees.mul(0.3 * delta))
        }

        player.t.treeSoftcapStart = new Decimal(15)
        player.t.treeSoftcapStart = player.t.treeSoftcapStart.mul(buyableEffect("t", 13))
        player.t.treeSoftcapStart = player.t.treeSoftcapStart.mul(buyableEffect("gh", 13))

        player.t.treeReq = player.t.trees.pow(1.35).add(10)
        player.t.treeReq = player.t.treeReq.div(buyableEffect("t", 14))
        player.t.treeReq = player.t.treeReq.div(player.cb.uncommonPetEffects[2][0])
    },
    branches: ["r"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "i"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.t.treeMax == false },
            unlocked() { return true },
            onClick() {
                player.t.treeMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.t.treeMax == true  },
            unlocked() { return true },
            onClick() {
                player.t.treeMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
    },
    bars: {
        treebar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 476,
            height: 50,
            progress() {
                return player.t.leaves.div(player.t.treeReq)
            },
            fillStyle: {
                "background-color": "#0B6623",
            },
            display() {
                return "<h5>" + format(player.t.leaves) + "/" + format(player.t.treeReq) + "<h5> Leaves to gain a tree.</h5>";
            },
        },
    },
    upgrades: {
    },
    buyables: {
        11: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(1.25) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.3) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Leaf Producer"
            },
            display() {
                return "which are producing " + format(tmp[this.layer].buyables[this.id].effect) + " leaves per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                if (player.t.treeMax == false && !hasMilestone("r", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1.25) },
            currency() { return player.t.trees},
            pay(amt) { player.t.trees = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Leaf Multiplier"
            },
            display() {
                return "which are boosting leaf gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Trees"
            },
            buy() {
                if (player.t.treeMax == false && !hasMilestone("r", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(250000) },
            costGrowth() { return new Decimal(1.3) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Softcap Extender"
            },
            display() {
                return "which are extending the tree softcap by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                if (player.t.treeMax == false && !hasMilestone("r", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            costBase() { return new Decimal(12) },
            costGrowth() { return new Decimal(1.3) },
            currency() { return player.t.trees},
            pay(amt) { player.t.trees = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Requirement Divider"
            },
            display() {
                return "which are dividing the tree requirement by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Trees"
            },
            buy() {
                if (player.t.treeMax == false && !hasMilestone("r", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        15: {
            costBase() { return new Decimal(30) },
            costGrowth() { return new Decimal(1.2) },
            currency() { return player.t.trees},
            pay(amt) { player.t.trees = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.35).add(1) },
            unlocked() { return hasUpgrade("p", 19) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Celestial Point Booster"
            },
            display() {
                return "which are boosting celestial point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Trees"
            },
            buy() {
                if (player.t.treeMax == false && !hasMilestone("r", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        16: {
            costBase() { return new Decimal(40) },
            costGrowth() { return new Decimal(1.22) },
            currency() { return player.t.trees},
            pay(amt) { player.t.trees = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.5).add(1).pow(1.1) },
            unlocked() { return hasUpgrade("p", 19) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Factor Power Booster"
            },
            display() {
                return "which are boosting factor power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Trees"
            },
            buy() {
                if (player.t.treeMax == false && !hasMilestone("r", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        17: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(1.3) },
            currency() { return player.t.trees},
            pay(amt) { player.t.trees = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return hasUpgrade("g", 15) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Grass Value Booster"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Trees"
            },
            buy() {
                if (player.t.treeMax == false && !hasMilestone("r", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        18: {
            costBase() { return new Decimal(400) },
            costGrowth() { return new Decimal(1.4) },
            currency() { return player.t.trees},
            pay(amt) { player.t.trees = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return hasUpgrade("g", 15) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Golden Grass Value Booster"
            },
            display() {
                return "which are boosting golden grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Trees"
            },
            buy() {
                if (player.t.treeMax == false && !hasMilestone("r", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
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
            "Trees": {
                buttonStyle() { return { 'color': '#0B6623' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["bar", "treebar"]]],
                    ["raw-html", function () { return "<h2>You are making " + format(player.t.leavesPerSecond) + "<h2> leaves per second. " }],
                    ["raw-html", function () { return "<h2>You have " + formatWhole(player.t.trees) + "<h2> trees, which boost prestige point gain by x" + format(player.t.treeEffect) + "."}],
                    ["raw-html", function () { return "<h2>You will gain " + format(player.t.treesToGet, 1) + "<h2> trees." }],
                    ["raw-html", function () { return player.t.trees.gte(player.t.treeSoftcapStart) ? "After " + formatWhole(player.t.treeSoftcapStart) + " trees, leaf gain is divided by " + format(player.t.treeSoftcap) + " (Based on trees)" : "" }, { "color": "red", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
                    ["row", [["buyable", 15], ["buyable", 16], ["buyable", 17], ["buyable", 18]]],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + format(player.p.prestigePoints) + "</h3> prestige points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 16)}
})
