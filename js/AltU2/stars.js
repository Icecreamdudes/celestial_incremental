
addLayer("st", {
    name: "Stars", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "✧", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "A2",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    levelableAscend: true,
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(15deg, #011247 0%, #37078f 50%, #5d1482 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#eaf6f7",
            color: "#eaf6f7",
        };
    },
    tooltip: "Stars",
    color: "#37078f",
    update(delta) {
        let onepersec = new Decimal(1)

        player.sdim.dimensionsGain = [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),]
        player.sdim.dimensionsTimerMax = [new Decimal(5),new Decimal(8),new Decimal(12),new Decimal(18),new Decimal(25),new Decimal(36),new Decimal(50),new Decimal(75)]
        for (let i = 0; i < 8; i++) {
            if (player.sdim.buyables[i + 11].gt(0)) player.sdim.dimensionsTimer[i] = player.sdim.dimensionsTimer[i].add(delta)
            if (i < 7) {
                player.sdim.dimensionsGain[i] = player.sdim.dimensionsGain[i].mul(player.sdim.dimensionPowerEffects[i + 1])
                player.sdim.dimensionsGain[i] = player.sdim.dimensionsGain[i].mul(buyableEffect("sdim", i + 11))
                if (hasUpgrade("ir", 31)) player.sdim.dimensionsGain[i] = player.sdim.dimensionsGain[i].mul(3)
                player.sdim.dimensionsGain[i] = player.sdim.dimensionsGain[i].mul(buyableEffect("ir", 301))
            }
            player.sdim.dimensionsTimerMax[i] = player.sdim.dimensionsTimerMax[i].div(buyableEffect("sme", 152))
            if (player.sdim.dimensionsTimer[i].gte(player.sdim.dimensionsTimerMax[i])) {
                player.sdim.dimensionsTimer[i] = new Decimal(0)
                player.sdim.dimensionAmounts[i] = player.sdim.dimensionAmounts[i].add(player.sdim.dimensionsGain[i])
            }

            player.sdim.dimensionPowerPerSecond[i] = player.sdim.dimensionAmounts[i].pow(0.5)
            player.sdim.dimensionPower[i] = player.sdim.dimensionPower[i].add(player.sdim.dimensionPowerPerSecond[i].mul(delta))

            if (i > 0) player.sdim.dimensionPowerEffects[i] = player.sdim.dimensionPower[i].pow(0.3).add(1)
            if (i == 0) player.sdim.dimensionPowerEffects[0] = player.sdim.dimensionPower[0]
        }

        player.sdim.starPower = player.sdim.starPower.add(player.sdim.starPowerPerSecond.mul(delta))
        player.sdim.starPowerPerSecond = player.sdim.dimensionPowerEffects[0]
        player.sdim.starPowerPerSecond = player.sdim.starPowerPerSecond.mul(buyableEffect("depth2", 3))
        player.sdim.starPowerPerSecond = player.sdim.starPowerPerSecond.mul(levelableEffect("pu", 208)[1])
        player.sdim.starPowerPerSecond = player.sdim.starPowerPerSecond.mul(levelableEffect("spet", 210)[0])

        // Star Power Softcap
        let base = new Decimal(300)
        if (player.sdim.starPowerPerSecond.gt(1e300)) player.sdim.starPowerPerSecond = player.sdim.starPowerPerSecond.div(1e300).pow(Decimal.div(base, player.sdim.starPowerPerSecond.plus(1).log(10))).mul(1e300);

        player.sdim.starPowerEffect = player.sdim.starPower.plus(1).log10().div(100).add(1)
        if (player.sdim.starPowerEffect.gte(1.3)) {
            if (hasMilestone("spaceZone1", 13)) player.sdim.starPowerEffect = player.sdim.starPowerEffect.div(1.3).pow(0.5).mul(1.3);
            else player.sdim.starPowerEffect = player.sdim.starPowerEffect.min(1.3);
        }
        player.sdim.starPowerEffect2 = player.sdim.starPower.pow(50).add(1)
        player.sdim.starPowerEffect3 = player.sdim.starPower.pow(0.4).add(1)

        if (player.au2.stars.lte(0)) { 
            player.au2.stars = new Decimal(0)
        }
        player.au2.stars = player.au2.stars.floor()
    },
    bars: {},
    clickables: {},
    levelables: {},
    upgrades: {},
    buyables: {

        //upgrade tree: general
        101: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(15) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting grass gain by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [102, 103],
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
            style: {width: '140px', height: '140px', color: "white", background: "#0c6344", border: "5px solid #05291c", borderColor: "#05291c", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        102: {
            costBase() { return new Decimal(8) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.025).add(1) },
            unlocked() { return player.st.buyables[101].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are dividing dark grass grow time by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
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
            style: {width: '140px', height: '140px', color: "white", background: "linear-gradient(120deg, #53bd96 0%, #147363 100%)", border: "5px solid #0e5448", borderColor: "#0e5448", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        103: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(8) },
            unlocked() { return player.st.buyables[101].gte(2) },
            branches: [104],
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting golden grass gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
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
            style: {width: '140px', height: '140px', color: "white", background: "linear-gradient(120deg, #53bd96 0%,rgb(193, 235, 79) 100%)", border: "5px solid #22452e", borderColor: "#22452e", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },        
        104: {
            costBase() { return new Decimal(40) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(150) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return player.gh.steel.add(10).log(10).pow(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return player.st.buyables[103].gte(5) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting steel gain by x" + format(tmp[this.layer].buyables[this.id].effect) + " (affected by steel).\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
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
            style: {width: '140px', height: '140px', color: "white", background: "linear-gradient(120deg,rgb(53, 53, 53) 0%,rgb(167, 167, 167) 100%)", border: "5px solid #1c1c1c", borderColor: "#1c1c1c", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        105: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(75) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(100).add(1).pow(2) },
            unlocked() { return player.st.buyables[103].gte(10) && player.st.buyables[104].gte(10) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },

            display() {
                return "which are boosting charge rate by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [103, 104],
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
            style: {width: '140px', height: '140px', color: "black", background: "linear-gradient(-120deg, #f7f774 0%, #96a700 100%)", border: "5px solid #ecff5e", borderColor: "#ecff5e", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        106: {
            costBase() { return new Decimal(250) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(2) },
            unlocked() { return player.st.buyables[102].gte(5) && player.st.buyables[105].gte(5) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting normality gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [102, 105],
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
            style: {width: '140px', height: '140px', color: "white", background: "linear-gradient(120deg, #7ab10e 0%, #c1df00 50%, #748d03 100%)", border: "5px solid #80ff6f", borderColor: "#80ff6f", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        107: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(3).add(1).pow(10) },
            unlocked() { return player.st.buyables[104].gte(10)  },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting oil gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [104],
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
            style: {width: '140px', height: '140px', color: "white", background: "linear-gradient(70deg, #141414 0%, #353535 100%)", border: "5px solid #0c0c0c", borderColor: "#0c0c0c", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        108: {
            costBase() { return new Decimal(300) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(300) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(5).add(1).pow(15) },
            unlocked() { return player.st.buyables[104].gte(20)  },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting anonymity gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [104],
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
            style: {width: '140px', height: '140px', color: "white", background: "linear-gradient(70deg, #0c04c1 0%, #433afa 100%)", border: "5px solid #001881", borderColor: "#001881", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        109: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.au2.stars },
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(2).add(1).pow(6) },
            unlocked() { return player.st.buyables[107].gte(20) && player.st.buyables[108].gte(10)  },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting fun gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [107, 108],
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
            style: {width: '140px', height: '140px', color: "black", background: "linear-gradient(45deg, #fcff04 0%, #befa32 100%)", border: "5px solid #fcff04", borderColor: "#fcff04", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        110: {
            costBase() { return new Decimal(10000000) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.au2.stars },
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.8).mul(0.1).add(1) },
            unlocked() { return player.st.buyables[109].gte(50) && player.matosLair.milestone[25] > 0},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting core fragment scores by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [109],
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
            style: {width: '140px', height: '140px', color: "white", background: "linear-gradient(120deg,rgb(128, 24, 11) 0%,rgb(136, 6, 82) 100%", border: "5px solid #000000", borderColor: "#000000", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        111: {
            costBase() { return new Decimal(1e26) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(2).sub(1).div(10).add(1)  },
            unlocked() { return player.st.buyables[110].gte(50) && hasMilestone("prj", 403) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting cloud gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [110],
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
            style: {width: '140px', height: '140px', color: "black", background: "linear-gradient(150deg,rgb(122, 122, 122) 0%,rgb(233, 233, 233) 50%,rgb(122, 122, 122) 100%)", border: "5px solid white", borderColor: "white", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        112: {
            costBase() { return new Decimal(1e30) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(2) },
            unlocked() { return player.st.buyables[111].gte(5) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting first four emotions gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [111],
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
            style: {width: '140px', height: '140px', color: "black", background: "linear-gradient(90deg, #fcff04 0%, white 100%)", border: "5px solid grey", borderColor: "grey", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        //Progression
        201: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.8).mul(0.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are multiplying star gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [202],
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
            style: {width: '140px', height: '140px', color: "white", background: "linear-gradient(15deg, #011247 0%, #37078f 50%, #5d1482 100%)", border: "5px solid #eaf6f7", borderColor: "#eaf6f7", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        202: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1) },
            purchaseLimit() { return new Decimal(1) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return true },
            unlocked() { return player.st.buyables[201].gte(10) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "Unlocks Planets\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [201],
            buy(mult) {
                let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                this.pay(buyonecost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: {width: '140px', height: '140px', color: "white", background: "linear-gradient(15deg, #34eb86 0%, #279ccf 50%, #411bb3 100%)", border: "5px solid #59c2ff", borderColor: "#59c2ff", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        203: {
            costBase() { return new Decimal(333333) },
            costGrowth() { return new Decimal(1) },
            purchaseLimit() { return new Decimal(1) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return true },
            unlocked() { return player.st.buyables[202].gte(1) && player.matosLair.milestone[25] > 0},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "SMA and Moonstone aren't <i>necessary</i> for rocket part production.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [201],
            buy(mult) {
                let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                this.pay(buyonecost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: {width: '140px', height: '140px', color: "white", background: "linear-gradient(50deg, #222222 0%, #1d1738 50%, #1e0d61 100%)", border: "5px solid #44008b", borderColor: "#44008b", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        204: {
            costBase() { return new Decimal(2000000) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01)  },
            unlocked() { return player.st.buyables[203].gte(1)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "Produce " + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + "% of activated fuel per second.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [203],
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
            style: {width: '140px', height: '140px', color: "white", background: "linear-gradient(50deg, #1c2258ff 0%, #271c58ff 50%, #230a86ff 100%)", border: "5px solid #5c10adff", borderColor: "#5c10adff", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        205: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.pl.planets},
            pay(amt) { player.pl.planets = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01)  },
            unlocked() { return player.st.buyables[204].gte(5)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "Produce " + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + "% of rocket parts per second.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Planets"
            },
            branches: [204],
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
            style: {width: '140px', height: '140px', color: "white", background: "linear-gradient(50deg, #201c2eff 0%, #0e0920ff 50%, #090222ff 100%)", border: "5px solid #010003ff", borderColor: "#010003ff", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        206: {
            costBase() { return new Decimal(1e13) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(1) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01)  },
            unlocked() { return player.ir.ufoDefeated && player.st.buyables[205].gte(25)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "Unlocks a new ship.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [205],
            buy(mult) {
                let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                this.pay(buyonecost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: {width: '140px', height: '140px', color: "white", background: "linear-gradient(50deg, #9c86ebff 0%, #433186ff 50%, #231947ff 100%)", border: "5px solid #010003ff", borderColor: "#010003ff", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        207: {
            costBase() { return new Decimal(1e27) },
            costGrowth() { return new Decimal(2.5) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(2).sub(1).div(10).add(1)  },
            unlocked() { return player.st.buyables[203].gte(1) && hasMilestone("prj", 403) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are multiplying space energy and time capsules stored by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [203],
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
            style: {width: '140px', height: '140px', color: "black", background: "linear-gradient(0deg, #221473ff 0%, #c5c5c5ff 50%, #147363 100%)", border: "5px solid #464646ff", borderColor: "#464646ff", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        208: {
            costBase() { return new Decimal(1e32) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(1) },
            currency() { return player.au2.stars},
            pay(amt) { player.au2.stars = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01)  },
            unlocked() { return player.st.buyables[207].gte(5)},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "Reveals a new ascension pet.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Stars"
            },
            branches: [207],
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
            style: {width: '140px', height: '140px', color: "black", background: "linear-gradient(45deg, #c6f7ff 0%, #d5abff 100%)", border: "5px solid #5d51ff", borderColor: "#5d51ff", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        //planets
        301: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.pl.planets},
            pay(amt) { player.pl.planets = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1e5, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Planets"
            },
            branches: [302],
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '140px', height: '140px', color: "black", background: "linear-gradient(315deg, rgba(211,161,101,1) 0%, #FFBF00 100%)", border: "5px solid #FFBF00", borderColor: "#FFBF00", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        302: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.pl.planets},
            pay(amt) { player.pl.planets = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1e4, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return player.st.buyables[301].gte(5) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Planets"
            },
            branches: [302],
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '140px', height: '140px', color: "black", background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)", border: "5px solid #008080", borderColor: "#008080", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        303: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.pl.planets},
            pay(amt) { player.pl.planets = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(2).add(1).pow(3) },
            unlocked() { return player.st.buyables[302].gte(5) && player.st.buyables[301].gte(10)  },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "which are boosting singularity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Planets"
            },
            branches: [302, 301],
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: {width: '140px', height: '140px', color: "white", background: "linear-gradient(-120deg, #6b1919 0%, #000000 100%)", border: "5px solid #6b1919", borderColor: "#6b1919", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        304: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(1) },
            purchaseLimit() { return new Decimal(1) },
            currency() { return player.pl.planets},
            pay(amt) { player.pl.planets = this.currency().sub(amt) },
            effect(x) { return true },
            unlocked() { return player.st.buyables[303].gte(15) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "Pent Milestone 50,000 is always active.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Planets"
            },
            branches: [303],
            buy(mult) {
                let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                this.pay(buyonecost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: {width: '140px', height: '140px', color: "black", background: "#eaf6f7", border: "5px solid #c0c3c4ff", borderColor: "#c0c3c4ff", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
        305: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1) },
            purchaseLimit() { return new Decimal(1) },
            currency() { return player.pl.planets},
            pay(amt) { player.pl.planets = this.currency().sub(amt) },
            effect(x) { return true },
            unlocked() { return player.st.buyables[304].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "Unlock the ability to upgrade your rocket. (In rockets)\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Planets"
            },
            branches: [304],
            buy(mult) {
                let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                this.pay(buyonecost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: {width: '140px', height: '140px', color: "black", background: "linear-gradient(-120deg, #3659b9ff 0%, #7aadd6ff 100%)", border: "5px solid #4979ffff", borderColor: "#4979ffff", borderRadius: "5px", boxSizing: "border-box", margin: "15px 25px 15px 25px"}
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #37078f", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["layer-proxy", ["ro", [
                        ["left-row", [
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                ["raw-html", () => { return formatWhole(player.cb.evolutionShards)}, {width: "93px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", "<div class='bottomTooltip'>Evolution Shards<hr><small>(Gained from check back buttons)</small></div>"],
                            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                ["raw-html", () => { return formatWhole(player.cb.paragonShards)}, {width: "95px", height: "50px", color: "#4C64FF", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", "<div class='bottomTooltip'>Paragon Shards<hr><small>(Gained from XPBoost buttons)</small></div>"],
                            ], {width: "150px", height: "50px"}],
                        ], {width: "300px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
                        ["blank", "25px"],
                        ["style-column", [
                            ["raw-html", function () { return player.ro.rocketNames[player.ro.rocketIndex] }, { "color": "#dbdbdb", "font-size": "36px", "font-family": "monospace" }],
                        ], {width: "1000px", border: "3px solid #dbdbdb", borderBottom: "0px", backgroundColor: "#1c1c1c", paddingTop: "5px", paddingBottom: "5px", borderRadius: "15px 15px 0px 0px"}], 
                        ["style-row", [
                            ["style-column", [
                                ["blank", "25px"],
                                ["raw-html", function () { return "You have <h3>" + formatWhole(player.au2.stars) + "</h3> stars." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                                ["raw-html", function () { return "You will gain " + formatWhole(player.au2.starsToGet) + " stars on reset." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                                ["blank", "25px"],
                                ["raw-html", function () { return "Evolution shard cost: " + formatWhole(player.ro.evoCost) + "" }, { "color": "#d487fd", "font-size": "24px", "font-family": "monospace" }],
                                ["raw-html", function () { return "Paragon shard cost: " + formatWhole(player.ro.paragonCost) + "" }, { "color": "#4b79ff", "font-size": "24px", "font-family": "monospace" }],
                                ["blank", "25px"],
                                ["style-row", [["clickable", 1], ["blank", "25px"], ["clickable", 15], ["blank", "25px"], ["clickable", 2],]],
                                ["blank", "25px"],
                                ["raw-html", function () { return player.ro.rocket2Unlocked ? "Switching rockets will reset the cooldown." : "" }, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                                ["raw-html", function () { return "Launching the rocket performs a singularity equivalent reset, uses activated fuel and rocket parts, and resets selected pet levels." }, { "color": "white", "font-size": "18px", "font-family": "monospace" }],
                                ["blank", "25px"],
                            ], {width: "1000px", borderRight: "2px solid srgb(27, 0, 36)"}],
                        ], {width: "1000px", border: "3px solid #dbdbdb", backgroundColor: "#1c1c1c", borderRadius: "0px 0px 15px 15px"}],
                    ]]],
                ]
            },
            "Upgrade Trees": {
                buttonStyle() { return { border: "2px solid #37078f", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["microtabs", "trees", { 'border-width': '0px' }],
                ]
            },
        },
        trees: {
            "General": {
                buttonStyle() { return { border: "2px solid #37078f", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["always-scroll-column", [
                        ["blank", "10px"],
                        ["row", [
                            ["ex-buyable", 101],
                            ["ex-buyable", 102],
                            ["ex-buyable", 106],
                        ]],
                        ["row", [
                            ["ex-buyable", 103],
                            ["ex-buyable", 105],
                        ]],
                        ["row", [
                            ["ex-buyable", 104],
                        ]],
                        ["row", [
                            ["ex-buyable", 107],
                            ["ex-buyable", 108],
                        ]],
                        ["row", [
                            ["ex-buyable", 109],
                        ]],
                        ["row", [
                            ["ex-buyable", 110],
                            ["ex-buyable", 111],
                        ]],
                        ["row", [
                            ["ex-buyable", 112],
                        ]],
                        ["blank", "10px"],
                    ], {width: "550px", height: "700px", backgroundColor: "#4a4a4a80", border: "3px solid white", borderRadius: "15px 0 0 15px"}],
                ]
            },
           "Progression": {
                buttonStyle() { return { border: "2px solid #37078f", borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["always-scroll-column", [
                        ["blank", "10px"],
                        ["row", [
                            ["ex-buyable", 201],
                            ["ex-buyable", 202],
                        ]],
                        ["row", [
                            ["ex-buyable", 203],
                            ["ex-buyable", 207],
                        ]],
                        ["row", [
                            ["ex-buyable", 204],
                            ["ex-buyable", 208],
                        ]],                        
                        ["row", [
                            ["ex-buyable", 205],
                            ["ex-buyable", 206],
                        ]],                        
                        ["blank", "10px"],
                    ], {width: "550px", height: "700px", backgroundColor: "#4a4a4a80", border: "3px solid white", borderRadius: "15px 0 0 15px"}],
                ]
            },
            "Planets": {
                buttonStyle() { return { color: "white", background: "linear-gradient(15deg, #34eb86 0%, #279ccf 50%, #411bb3 100%)", borderColor: "#59c2ff",borderRadius: "10px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["always-scroll-column", [
                        ["blank", "10px"],
                        ["row", [
                            ["ex-buyable", 301],
                            ["ex-buyable", 303],
                        ]],
                        ["row", [
                            ["ex-buyable", 302],
                            ["ex-buyable", 304],
                        ]],
                        ["row", [
                            ["ex-buyable", 305],
                        ]],
                        ["blank", "10px"],
                    ], {width: "550px", height: "700px", backgroundColor: "#4a4a4a80", border: "3px solid white", borderRadius: "15px 0 0 15px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have <h3>" + formatWhole(player.au2.stars) + "</h3> stars"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + formatWhole(player.au2.starsToGet) + ")"}, () => {
                let look = {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}
                player.au2.starsToGet.gt(0) ? look.color = "white" : look.color = "gray"
                return look
            }],
        ]],
        ["raw-html", () => {return player.au2.starSoftcapActive ? "After " + format(player.au2.starSoftcapStart) + " stars, raise star gain by ^" + format(player.au2.starSoftcapEffect, 3) + "." : ""}, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
        ["raw-html", () => {return "You have " + formatWhole(player.pl.planets) + " planets"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.au2.au2Unlocked },
    hotkeys: [
        {
            key: "l", 
            description: "Launch Rocket",
            onPress() {
                clickClickable("ro", 15)
            },
        }
	]
})
