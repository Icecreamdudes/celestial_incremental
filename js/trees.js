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
    }},
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
    nodeStyle() {},
    tooltip: "Trees",
    color: "#0B6623",
    branches: ["p"],
    update(delta) {
        let onepersec = new Decimal(1)

        // START OF TREE MODIFIERS
        player.t.treesToGet = new Decimal(1)
        player.t.treesToGet = player.t.treesToGet.mul(buyableEffect("f", 28))
        player.t.treesToGet = player.t.treesToGet.mul(buyableEffect("f", 29))
        player.t.treesToGet = player.t.treesToGet.mul(buyableEffect("f", 31))
        player.t.treesToGet = player.t.treesToGet.mul(buyableEffect("f", 32))
        player.t.treesToGet = player.t.treesToGet.mul(buyableEffect("f", 33))
        player.t.treesToGet = player.t.treesToGet.mul(buyableEffect("f", 34))
        player.t.treesToGet = player.t.treesToGet.mul(buyableEffect("f", 35))
        player.t.treesToGet = player.t.treesToGet.mul(buyableEffect("f", 36))
        if (hasUpgrade("cs", 201)) player.t.treesToGet = player.t.treesToGet.mul(buyableEffect("f", 104))
        player.t.treesToGet = player.t.treesToGet.mul(player.m.modEffect)
        player.t.treesToGet = player.t.treesToGet.mul(levelableEffect("pet", 102)[1])
        player.t.treesToGet = player.t.treesToGet.mul(player.d.diceEffects[3])
        player.t.treesToGet = player.t.treesToGet.mul(player.rf.abilityEffects[1])
        if (hasUpgrade("g", 12)) player.t.treesToGet = player.t.treesToGet.mul(player.g.grassEffect2)
        if (hasMilestone("r", 19)) player.t.treesToGet = player.t.treesToGet.mul(player.r.pentMilestone9Effect[0])
        if (hasUpgrade("ip", 22) && !inChallenge("ip", 14)) player.t.treesToGet = player.t.treesToGet.mul(upgradeEffect("ip", 22))
        if (hasUpgrade("ad", 15) && !inChallenge("ip", 14)) player.t.treesToGet = player.t.treesToGet.mul(upgradeEffect("ad", 15))
        if (inChallenge("ip", 13) || player.po.hex || hasUpgrade("s", 18)) player.t.treesToGet = player.t.treesToGet.mul(player.hre.refinementEffect[2][1])

        // CHALLENGE MODIFIERS
        if (inChallenge("ip", 13)) player.t.treesToGet = player.t.treesToGet.pow(0.75)
        if (player.de.antidebuffIndex.eq(3)) player.t.treesToGet = player.t.treesToGet.mul(player.de.antidebuffEffect)
        if (inChallenge("tad", 11)) player.t.treesToGet = player.t.treesToGet.pow(0.5)

        // CONTINUED REGULAR MODIFIERS
        if (player.pol.pollinatorEffects.bat.enabled) player.t.treesToGet = player.t.treesToGet.mul(player.pol.pollinatorEffects.bat.effects[1])
        player.t.treesToGet = player.t.treesToGet.mul(buyableEffect("gh", 32))
        player.t.treesToGet = player.t.treesToGet.mul(player.r.timeCubeEffects[1])
        player.t.treesToGet = player.t.treesToGet.mul(player.i.preOTFMult)
        player.t.treesToGet = player.t.treesToGet.mul(player.co.cores.tree.effect[0])

        // POWER MODIFIERS
        if (hasUpgrade("hpw", 1023)) player.t.treesToGet = player.t.treesToGet.pow(1.24)
        player.t.treesToGet = player.t.treesToGet.pow(player.co.cores.tree.effect[1])
        if (hasUpgrade("cs", 401)) player.t.treesToGet = player.t.treesToGet.pow(1.1)

        // ABNORMAL MODIFIERS, PLACE NEW MODIFIERS BEFORE THIS
        player.t.treesToGet = player.t.treesToGet.div(player.po.halterEffects[4])
        if (inChallenge("ip", 18) && player.t.trees.gt(player.t.trees.mul(0.3 * delta))) {
            player.t.trees = player.t.trees.sub(player.t.trees.mul(0.3 * delta))
        }

        // TREE EFFECT
        player.t.treeEffect = player.t.trees.div(6).pow(1.1).add(1)
        if (player.t.treeEffect.gte("1e15000")) player.t.treeEffect = player.t.treeEffect.div("1e15000").pow(Decimal.add(0.1, player.cs.scraps.tree.effect)).mul("1e15000")

        //----------------------------------------

        // START OF LEAVES MODIFIERS
        player.t.leavesPerSecond = buyableEffect("t", 11)
        player.t.leavesPerSecond = player.t.leavesPerSecond.mul(buyableEffect("t", 12))
        player.t.leavesPerSecond = player.t.leavesPerSecond.mul(player.g.grassEffect)
        player.t.leavesPerSecond = player.t.leavesPerSecond.mul(player.gh.grasshopperEffects[3])
        player.t.leavesPerSecond = player.t.leavesPerSecond.mul(buyableEffect("gh", 17))
        player.t.leavesPerSecond = player.t.leavesPerSecond.mul(levelableEffect("pet", 202)[1])
        player.t.leavesPerSecond = player.t.leavesPerSecond.mul(player.d.diceEffects[4])
        if (hasUpgrade("ip", 22) && !inChallenge("ip", 14)) player.t.leavesPerSecond = player.t.leavesPerSecond.mul(upgradeEffect("ip", 22))
        if (hasUpgrade("ad", 15) && !inChallenge("ip", 14)) player.t.leavesPerSecond = player.t.leavesPerSecond.mul(upgradeEffect("ad", 15))

        // TREE SOFTCAP CODE
        player.t.treeSoftcapStart = new Decimal(15)
        player.t.treeSoftcapStart = player.t.treeSoftcapStart.mul(buyableEffect("t", 13))
        player.t.treeSoftcapStart = player.t.treeSoftcapStart.mul(buyableEffect("gh", 13))

        if (player.t.trees.gte(player.t.treeSoftcapStart)) {
            player.t.treeSoftcap = Decimal.pow(player.t.trees.add(1).sub(player.t.treeSoftcapStart), 0.5)
            player.t.leavesPerSecond = player.t.leavesPerSecond.div(player.t.treeSoftcap)
        }

        // CHALLENGE MODIFIERS
        player.t.leavesPerSecond = player.t.leavesPerSecond.div(player.pe.pestEffect[3])
        if (inChallenge("ip", 13)) player.t.leavesPerSecond = player.t.leavesPerSecond.pow(0.75)
        if (inChallenge("tad", 11)) player.t.leavesPerSecond = player.t.leavesPerSecond.pow(0.5)

        // CONTINUED REGULAR MODIFIERS
        if (player.pol.pollinatorEffects.bat.enabled) player.t.leavesPerSecond = player.t.leavesPerSecond.mul(player.pol.pollinatorEffects.bat.effects[0])
        player.t.leavesPerSecond = player.t.leavesPerSecond.mul(buyableEffect("gh", 32))
        player.t.leavesPerSecond = player.t.leavesPerSecond.mul(player.i.preOTFMult)

        // POWER MODIFIERS
        player.t.leavesPerSecond = player.t.leavesPerSecond.pow(player.co.cores.tree.effect[2])

        // ABNORMAL MODIFIERS, PLACE NEW MODIFIERS BEFORE THIS
        player.t.leavesPerSecond = player.t.leavesPerSecond.div(player.po.halterEffects[3])
        if (player.r.timeReversed) player.t.leavesPerSecond = player.t.leavesPerSecond.mul(0)
        
        // LEAVES PER SECOND
        player.t.leaves = player.t.leaves.add(player.t.leavesPerSecond.mul(delta))

        // CONVERT LEAVES TO TREES
        player.t.treeReq = player.t.trees.pow(1.35).add(10)
        player.t.treeReq = player.t.treeReq.div(buyableEffect("t", 14))
        player.t.treeReq = player.t.treeReq.div(levelableEffect("pet", 203)[0])
        if (hasUpgrade("cs", 401)) player.t.treeReq = player.t.treeReq.pow(1.6)

        if (player.t.leaves.gte(player.t.treeReq)) {
            player.t.trees = player.t.trees.add(player.t.treesToGet)
            player.t.leaves = new Decimal(0)
        }
    },
    clickables: {},
    bars: {
        treebar: {
            unlocked: true,
            direction: RIGHT,
            width: 476,
            height: 50,
            progress() {
                if (player.t.leavesPerSecond.div(20).gt(player.t.treeReq)) return new Decimal(1)
                return player.t.leaves.div(player.t.treeReq)
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#0B6623"},
            textStyle: {fontSize: "14px"},
            display() {
                if (player.t.leavesPerSecond.div(100).gt(player.t.treeReq)) return "There is currently an excess of leaves."
                let str = format(player.t.leaves) + "/" + format(player.t.treeReq) + " (+" + format(player.t.leavesPerSecond) + "/s)<br>Leaves to gain a tree."
                if (player.t.trees.gte(player.t.treeSoftcapStart)) str = str.concat("<br><small style='color:red;font-size:12px'>After " + formatWhole(player.t.treeSoftcapStart) + " trees, leaves are divided by " + format(player.t.treeSoftcap) + "</small>")
                return str
            },
        },
    },
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(5000) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(1.3)
                if (hasUpgrade("cs", 403)) eff = eff.pow(3)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Leaf Producer"
            },
            display() {
                return "which are producing " + format(tmp[this.layer].buyables[this.id].effect) + " leaves per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#3b844e"}
        },
        12: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.t.trees},
            pay(amt) { player.t.trees = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.25).add(1)
                if (hasUpgrade("cs", 403)) eff = eff.pow(3)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Leaf Multiplier"
            },
            display() {
                return "which are boosting leaf gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Trees"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#3b844e"}
        },
        13: {
            costBase() { return new Decimal(250000) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(5000) },
            currency() { return player.p.prestigePoints},
            pay(amt) { player.p.prestigePoints = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.1).add(1)
                if (hasUpgrade("cs", 403)) eff = eff.pow(3)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Softcap Extender"
            },
            display() {
                return "which are extending the tree softcap by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#3b844e"}
        },
        14: {
            costBase() { return new Decimal(12) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.t.trees},
            pay(amt) { player.t.trees = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.2).add(1)
                if (hasUpgrade("cs", 403)) eff = eff.pow(3)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Requirement Divider"
            },
            display() {
                return "which are dividing the tree requirement by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Trees"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#3b844e"}
        },
        15: {
            costBase() { return new Decimal(30) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.t.trees},
            pay(amt) { player.t.trees = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).pow(1.35).add(1)
                if (hasUpgrade("cs", 403)) eff = eff.pow(3)
                return eff
            },
            unlocked() { return hasUpgrade("p", 19) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Celestial Point Booster"
            },
            display() {
                return "which are boosting celestial point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Trees"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#3b844e"}
        },
        16: {
            costBase() { return new Decimal(40) },
            costGrowth() { return new Decimal(1.22) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.t.trees},
            pay(amt) { player.t.trees = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.5).add(1).pow(1.1)
                if (hasUpgrade("cs", 403)) eff = eff.pow(3)
                return eff
            },
            unlocked() { return hasUpgrade("p", 19) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Factor Power Booster"
            },
            display() {
                return "which are boosting factor power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Trees"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#3b844e"}
        },
        17: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.t.trees},
            pay(amt) { player.t.trees = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.1).add(1)
                if (hasUpgrade("cs", 403)) eff = eff.pow(3)
                return eff
            },
            unlocked() { return hasUpgrade("g", 15) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass Value Booster"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Trees"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#3b844e"}
        },
        18: {
            costBase() { return new Decimal(400) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.t.trees},
            pay(amt) { player.t.trees = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.05).add(1)
                if (hasUpgrade("cs", 403)) eff = eff.pow(3)
                return eff
            },
            unlocked() { return hasUpgrade("g", 15) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Golden Grass Value Booster"
            },
            display() {
                return "which are boosting golden grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Trees"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("r", 12)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("r", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#3b844e"}
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Trees": {
                buttonStyle() { return { color: "#0B6623", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["style-column", [
                        ["blank", "10px"],
                        ["row", [
                            ["raw-html", () => { return "You have " + formatWhole(player.t.trees) + " trees"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["raw-html", () => { return player.t.leavesPerSecond.div(20).gt(player.t.treeReq) ? "(+" + format(player.t.treesToGet, 1) + "/s)" : "(+" + format(player.t.treesToGet, 1) + ")"}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
                        ]],
                        ["row", [
                            ["raw-html", () => {return "Boosts prestige point gain by x" + format(player.t.treeEffect) + "."}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return player.t.treeEffect.gte("1e15000") ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "16px", fontFamily: "monospace", marginLeft: "10px"}]
                        ]],
                        ["blank", "10px"],
                        ["bar", "treebar"],
                        ["blank", "10px"],
                    ], {width: "550px", backgroundColor: "#021407", border: "3px solid #ccc", borderRadius: "15px"}],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14],
                        ["ex-buyable", 15], ["ex-buyable", 16], ["ex-buyable", 17], ["ex-buyable", 18]], {maxWidth: "1200px"}],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + format(player.p.prestigePoints) + "</h3> prestige points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 16)},
})