addLayer("hcu", {
    name: "Hex of Curses",
    symbol: "Cu", // Decides what text appears on the node.
    tooltip: "Curses", // Decides the nodes tooltip
    color: "#b2d8d8", // Decides the nodes color.
    branches: ["hbl"], // Decides the nodes branches.
    startData() { return {
        curses: new Decimal(0),
        cursesGain: new Decimal(0),
        jinxTotal: new Decimal(0),
        jinxAddCap: new Decimal(0),

        vex: new Decimal(0),
        vexReq: new Decimal(300),
        vexGain: new Decimal(0),
    }},
    update(delta) {
        player.hcu.cursesGain = new Decimal(0)
        if (hasUpgrade("ta", 16)) player.hcu.cursesGain = player.hbl.blessings.add(1).log(6)
        if (hasMilestone("hre", 9)) player.hcu.cursesGain = player.hcu.cursesGain.add(0.6)
        player.hcu.cursesGain = player.hcu.cursesGain.mul(buyableEffect("hcu", 101))
        player.hcu.cursesGain = player.hcu.cursesGain.mul(buyableEffect("hcu", 103))
        player.hcu.cursesGain = player.hcu.cursesGain.mul(buyableEffect("hcu", 105))
        player.hcu.cursesGain = player.hcu.cursesGain.mul(buyableEffect("ta", 49))
        if (hasUpgrade("hbl", 4)) player.hcu.cursesGain = player.hcu.cursesGain.mul(upgradeEffect("hbl", 4))
        if (hasUpgrade("hpw", 22)) player.hcu.cursesGain = player.hcu.cursesGain.mul(upgradeEffect("hpw", 22))

        // CURSE EXPONENT
        player.hcu.cursesGain = player.hcu.cursesGain.pow(buyableEffect("hcu", 106))

        if (inChallenge("hrm", 12)) player.hcu.cursesGain = player.hcu.cursesGain.pow(0.6)
        if (player.hcu.cursesGain.gte(1e12)) player.hcu.cursesGain = player.hcu.cursesGain.div(1e12).pow(0.6).mul(1e12)
        player.hcu.curses = player.hcu.curses.add(player.hcu.cursesGain.mul(delta))

        // JINX TOTAL
        player.hcu.jinxTotal = new Decimal(0)
        for (let i = 101; i < 113; i++) {
            player.hcu.jinxTotal = player.hcu.jinxTotal.add(getBuyableAmount("hcu", i))
        }

        // JINX ADD CAP
        player.hcu.jinxAddCap = new Decimal(0)
        if (hasUpgrade("hbl", 1)) player.hcu.jinxAddCap = player.hcu.jinxAddCap.add(upgradeEffect("hbl", 1))
        if (hasMilestone("hbl", 3)) player.hcu.jinxAddCap = player.hcu.jinxAddCap.add(6)
        if (hasUpgrade("hpw", 32)) player.hcu.jinxAddCap = player.hcu.jinxAddCap.add(upgradeEffect("hpw", 32))

        // VEX CALCULATIONS
        player.hcu.vexReq = player.hcu.vex.mul(30).add(300).ceil()
        player.hcu.vexGain = player.hcu.jinxTotal.sub(300).div(30).add(1).sub(player.hcu.vex).floor()
    },
    clickables: {
        1: {
            title: "<h3>Buy Max Jinxes</h3>",
            canClick() {
                let can = false
                for (let i = 101; i < 113; i++) {
                    if (canBuyBuyable("hcu", i)) can = true
                }
                return can
            },
            unlocked: true,
            onClick() {
                for (let i = 101; i < 113; i++) {
                    buyMaxExBuyable("hcu", i)
                }
            },
            style: {width: "200px", minHeight: "40px", borderRadius: "15px"},
        },
    },
    buyables: {
        101: {
            costBase() { return new Decimal(6).div(buyableEffect("hcu", 104)) },
            costGrowth() { return new Decimal(6) },
            purchaseLimit() { return new Decimal(30).add(player.hcu.jinxAddCap) },
            currency() { return player.hcu.curses},
            pay(amt) { player.hcu.curses = this.currency().sub(amt) },
            effectBase() {
                let base = new Decimal(2).add(buyableEffect("hcu", 102))
                if (inChallenge("hrm", 12)) base = base.pow(player.hpu.purifierEffects[5])
                return base
            },
            effect(x) { return Decimal.pow(this.effectBase(), getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(30)) cst = cst.pow(1.6).div(1e12)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Α-Jinx" },
            display() { return "Curses are multiplied by " + format(this.effectBase()) },
            total() { return "(Total: " + format(tmp[this.layer].buyables[this.id].effect) + "x)" },
            buy(mult) {
                if (mult != true) {
                    if (!hasMilestone("hpw", 5)) this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(30)) Decimal.affordGeometricSeries(this.currency().mul(1e12).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("hpw", 5)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '200px', height: '125px', fontSize: "12px"},
        },
        102: {
            costBase() { return new Decimal(12).div(buyableEffect("hcu", 104)) },
            costGrowth() { return new Decimal(12) },
            purchaseLimit() { return new Decimal(30).add(player.hcu.jinxAddCap) },
            currency() { return player.hcu.curses},
            pay(amt) { player.hcu.curses = this.currency().sub(amt) },
            effect(x) { return Decimal.mul(0.1, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(30)) cst = cst.pow(1.6).div(1e18)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Β-Jinx" },
            display() { return "Increase Α-Jinx's effect by +0.1x" },
            total() { return "(Total: +" + format(tmp[this.layer].buyables[this.id].effect) + "x)" },
            buy(mult) {
                if (mult != true) {
                    if (!hasMilestone("hpw", 5)) this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(30)) Decimal.affordGeometricSeries(this.currency().mul(1e18).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("hpw", 5)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '200px', height: '125px', fontSize: "12px"},
        },
        103: {
            costBase() { return new Decimal(1679616).div(buyableEffect("hcu", 104)) },
            costGrowth() { return new Decimal(36) },
            purchaseLimit() { return new Decimal(30).add(player.hcu.jinxAddCap) },
            currency() { return player.hcu.curses},
            pay(amt) { player.hcu.curses = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(player.hcu.curses.div(6).add(1).log(6).add(1).pow(0.3), getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(30)) cst = cst.pow(1.6).div(1e29)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Γ-Jinx" },
            display() { return "Curses are multiplied by " + format(player.hcu.curses.div(6).add(1).log(6).add(1).pow(0.3)) + " (based on curses)" },
            total() { return "(Total: " + format(tmp[this.layer].buyables[this.id].effect) + "x)"},
            buy(mult) {
                if (mult != true) {
                    if (!hasMilestone("hpw", 5)) this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(30)) Decimal.affordGeometricSeries(this.currency().mul(1e29).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("hpw", 5)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '200px', height: '125px', fontSize: "12px"},
        },
        104: {
            costBase() { return new Decimal(1e8).div(buyableEffect("hcu", 104)) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(30).add(player.hcu.jinxAddCap).div(1.5).floor() },
            currency() { return player.hcu.curses},
            pay(amt) { player.hcu.curses = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(2, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(20)) cst = cst.pow(1.6).div(1e26)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Δ-Jinx" },
            display() { return "All jinxes are 2x cheaper" },
            total() { return "(Total: " + format(tmp[this.layer].buyables[this.id].effect) + "x)"},
            buy(mult) {
                if (mult != true) {
                    if (!hasMilestone("hpw", 5)) this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(20)) Decimal.affordGeometricSeries(this.currency().mul(1e26).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("hpw", 5)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '200px', height: '125px', fontSize: "12px"},
        },
        105: {
            costBase() { return new Decimal(1e12).div(buyableEffect("hcu", 104)) },
            costGrowth() { return new Decimal(1000) },
            purchaseLimit() { return new Decimal(30).add(player.hcu.jinxAddCap).div(2).floor() },
            currency() { return player.hcu.curses},
            pay(amt) { player.hcu.curses = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(player.hcu.jinxTotal.mul(0.01).add(1), getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(15)) cst = cst.pow(1.6).div(1e32)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Ε-Jinx" },
            display() { return "Curses are multiplied by " + format(player.hcu.jinxTotal.mul(0.01).add(1)) + " (based on total jinxes)" },
            total() {return "(Total: " + format(tmp[this.layer].buyables[this.id].effect) + "x)"},
            buy(mult) {
                if (mult != true) {
                    if (!hasMilestone("hpw", 5)) this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(15)) Decimal.affordGeometricSeries(this.currency().mul(1e32).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("hpw", 5)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '200px', height: '125px', fontSize: "12px"},
        },
        106: {
            costBase() { return new Decimal(1e18).div(buyableEffect("hcu", 104)) },
            costGrowth() { return new Decimal(1e6)},
            purchaseLimit() { return new Decimal(30).add(player.hcu.jinxAddCap).div(3).floor() },
            currency() { return player.hcu.curses},
            pay(amt) { player.hcu.curses = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.01, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(10)) cst = cst.pow(1.6).div(1e44)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Ζ-Jinx" },
            display() { return "Curses are raised to the power of 1.01" },
            total() { return "(Total: ^" + format(tmp[this.layer].buyables[this.id].effect) + ")"},
            buy(mult) {
                if (mult != true) {
                    if (!hasMilestone("hpw", 5)) this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(10)) Decimal.affordGeometricSeries(this.currency().mul(1e44).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("hpw", 5)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '200px', height: '125px', fontSize: "12px"},
        },
        107: {
            costBase() { return new Decimal(1e4).div(buyableEffect("hcu", 104)) },
            costGrowth() { return new Decimal(10)},
            purchaseLimit() { return new Decimal(30).add(player.hcu.jinxAddCap) },
            currency() { return player.hcu.curses},
            pay(amt) { player.hcu.curses = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(Decimal.add(1.1, buyableEffect("hcu", 110)), getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(30)) cst = cst.pow(1.6).div(1e18)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Η-Jinx" },
            display() { return "Hex Points are multiplied by " + format(buyableEffect("hcu", 110).add(1.1)) },
            total() { return "(Total: " + format(tmp[this.layer].buyables[this.id].effect) + "x)"},
            buy(mult) {
                if (mult != true) {
                    if (!hasMilestone("hpw", 5)) this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(30)) Decimal.affordGeometricSeries(this.currency().mul(1e18).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("hpw", 5)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '200px', height: '125px', fontSize: "12px"},
        },
        108: {
            costBase() { return new Decimal(1e6).div(buyableEffect("hcu", 104)) },
            costGrowth() { return new Decimal(100)},
            purchaseLimit() { return new Decimal(30).add(player.hcu.jinxAddCap).div(1.5).floor() },
            currency() { return player.hcu.curses},
            pay(amt) { player.hcu.curses = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(Decimal.add(1.1, buyableEffect("hcu", 111)), getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(20)) cst = cst.pow(1.6).div(1e25)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Θ-Jinx" },
            display() { return "Boons are multiplied by " + format(buyableEffect("hcu", 111).add(1.1)) },
            total() { return "(Total: " + format(tmp[this.layer].buyables[this.id].effect) + "x)"},
            buy(mult) {
                if (mult != true) {
                    if (!hasMilestone("hpw", 5)) this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(20)) Decimal.affordGeometricSeries(this.currency().mul(1e25).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("hpw", 5)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '200px', height: '125px', fontSize: "12px"},
        },
        109: {
            costBase() { return new Decimal(1e9).div(buyableEffect("hcu", 104)) },
            costGrowth() { return new Decimal(1000)},
            purchaseLimit() { return new Decimal(30).add(player.hcu.jinxAddCap).div(2).floor() },
            currency() { return player.hcu.curses},
            pay(amt) { player.hcu.curses = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(Decimal.add(1.2, buyableEffect("hcu", 112)), getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(15)) cst = cst.pow(1.6).div(1e30)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Ι-Jinx" },
            display() { return "Negative infinity points are multiplied by " + format(buyableEffect("hcu", 112).add(1.2)) },
            total() { return "(Total: " + format(tmp[this.layer].buyables[this.id].effect) + "x)"},
            buy(mult) {
                if (mult != true) {
                    if (!hasMilestone("hpw", 5)) this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(15)) Decimal.affordGeometricSeries(this.currency().mul(1e30).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("hpw", 5)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '200px', height: '125px', fontSize: "12px"},
        },
        110: {
            costBase() { return new Decimal(1e48).div(buyableEffect("hcu", 104)) },
            costGrowth() { return new Decimal(1e10)},
            purchaseLimit() { return new Decimal(30).add(player.hcu.jinxAddCap).div(6).floor() },
            currency() { return player.hcu.curses},
            pay(amt) { player.hcu.curses = this.currency().sub(amt) },
            effect(x) { return Decimal.mul(0.03, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return hasUpgrade("bi", 13) },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(5)) cst = cst.pow(1.6).div(1e56)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Κ-Jinx" },
            display() { return "Increase Η-Jinx's effect by +0.03x" },
            total() { return "(Total: +" + format(tmp[this.layer].buyables[this.id].effect) + "x)"},
            buy(mult) {
                if (mult != true) {
                    if (!hasMilestone("hpw", 5)) this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(5)) Decimal.affordGeometricSeries(this.currency().mul(1e56).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("hpw", 5)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '200px', height: '125px', fontSize: "12px"},
        },
        111: {
            costBase() { return new Decimal(1e40).div(buyableEffect("hcu", 104)) },
            costGrowth() { return new Decimal(5e7)},
            purchaseLimit() { return new Decimal(30).add(player.hcu.jinxAddCap).div(5).floor() },
            currency() { return player.hcu.curses},
            pay(amt) { player.hcu.curses = this.currency().sub(amt) },
            effect(x) { return hasMilestone("hbl", 6) ? Decimal.mul(0.05, getBuyableAmount(this.layer, this.id)) : Decimal.mul(0.03, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return hasUpgrade("bi", 13) },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(6)) cst = cst.pow(1.6).div(1e48)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Λ-Jinx" },
            display() { return hasMilestone("hbl", 6) ? "Increase Θ-Jinx's effect by +0.05x" : "Increase Θ-Jinx's effect by +0.03x" },
            total() { return "(Total: +" + format(tmp[this.layer].buyables[this.id].effect) + "x)"},
            buy(mult) {
                if (mult != true) {
                    if (!hasMilestone("hpw", 5)) this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(6)) Decimal.affordGeometricSeries(this.currency().mul(1e48).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("hpw", 5)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '200px', height: '125px', fontSize: "12px"},
        },
        112: {
            costBase() { return new Decimal(1e35).div(buyableEffect("hcu", 104)) },
            costGrowth() { return new Decimal(1e5)},
            purchaseLimit() { return new Decimal(30).add(player.hcu.jinxAddCap).div(3.75).floor() },
            currency() { return player.hcu.curses},
            pay(amt) { player.hcu.curses = this.currency().sub(amt) },
            effect(x) { return Decimal.mul(0.1, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return hasUpgrade("bi", 13) },
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let cst = this.costGrowth().pow(x).mul(this.costBase())
                if (x.gte(8)) cst = cst.pow(1.6).div(1e42)
                return cst
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() { return "Μ-Jinx" },
            display() { return "Increase Ι-Jinx's effect by +0.1x" },
            total() { return "(Total: +" + format(tmp[this.layer].buyables[this.id].effect) + "x)"},
            buy(mult) {
                if (mult != true) {
                    if (!hasMilestone("hpw", 5)) this.pay(this.cost())
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.add(getBuyableAmount(this.layer, this.id)).gte(8)) Decimal.affordGeometricSeries(this.currency().mul(1e42).pow(Decimal.div(1, 1.6)), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("hpw", 5)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '200px', height: '125px', fontSize: "12px"},
        },
    },
    microtabs: {
        curse: {
            "Cursed Jinxes": {
                buttonStyle() { return {borderRadius: "5px"}},
                unlocked: true,
                content: [
                    ["blank", "5px"],
                    ["row", [["jinx-buyable", 101], ["jinx-buyable", 102], ["jinx-buyable", 103]]],
                    ["row", [["jinx-buyable", 104], ["jinx-buyable", 105], ["jinx-buyable", 106]]],
                ],
            },
            "Hexed Jinxes": {
                buttonStyle() { return {borderRadius: "5px"}},
                unlocked: true,
                content: [
                    ["blank", "5px"],
                    ["row", [["jinx-buyable", 107], ["jinx-buyable", 108], ["jinx-buyable", 109]]],
                    ["row", [["jinx-buyable", 110], ["jinx-buyable", 111], ["jinx-buyable", 112]]],
                ],
            },
            "Vex": {
                buttonStyle() { return {borderRadius: "5px"}},
                unlocked() {return hasUpgrade("hpw", 42)},
                content: [
                    ["blank", "5px"],
                ],
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.h.hexPoint) + "</h3> hex points. (+" + format(player.h.hexPointGain) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["blank", "10px"],
        ["style-column", [
            ["raw-html", "Hex of Curses", {color: "white", fontSize: "30px", fontFamily: "monospace"}],
        ], {width: "800px", height: "50px", backgroundColor: "#354040", border: "3px solid white", borderRadius: "20px"}],
        ["blank", "10px"],
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.hcu.curses) + "</h3> Curses." }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.hcu.cursesGain) + "/s)" }, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
            ["raw-html", () => {return player.hcu.cursesGain.gte(1e12) ? "[SOFTCAPPED]" : "" }, {color: "red", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["blank", "10px"],
        ["clickable", 1],
        ["blank", "5px"],
        ["microtabs", "curse", {borderWidth: "0px"}],
        ["blank", "25px"],
    ],
    layerShown() { return hasUpgrade("ta", 16) }, // Decides if this node is shown or not.
});