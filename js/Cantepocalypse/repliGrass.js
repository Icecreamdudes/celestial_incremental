addLayer("rg", {
    name: "Repli-Grass", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RG", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "A1",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        repliGrass: new Decimal(1),
        repliGrassEffect: new Decimal(1),
        repliGrassEffect2: new Decimal(1),
        repliGrassCap: new Decimal(50),
        repliGrassMult: new Decimal(1.02),
        repliGrassReq: new Decimal(8),
        repliGrassTimer: new Decimal(0),
        repliGrassTimer2: new Decimal(0),

        repliGrassSoftcapEffect: new Decimal(1),
        repliGrassSoftcapStart: new Decimal(1000),
    }},
    automate() {
        if (hasMilestone("s", 16) && !inChallenge("fu", 11) && !inChallenge("fu", 12)) {
            buyBuyable('rg', 11)
            buyBuyable('rg', 12)
            buyBuyable('rg', 13)
            buyBuyable('rg', 14)
            buyBuyable('rg', 15)
            buyBuyable('rg', 16)
            buyBuyable('rg', 17)
            buyBuyable('rg', 18)
        }
    },
    nodeStyle() {},
    tooltip: "Repli-Grass",
    branches: ["rt"],
    color: "#67cc3b",
    update(delta) {
        // REPLI-GRASS CAP
        player.rg.repliGrassCap = new Decimal(1)
        player.rg.repliGrassCap = player.rg.repliGrassCap.add(buyableEffect("rg", 13))

        // REPLI-GRASS SOFTCAP START
        player.rg.repliGrassSoftcapStart = new Decimal(1000)
        player.rg.repliGrassSoftcapStart = player.rg.repliGrassSoftcapStart.mul(buyableEffect("rg", 14))
        player.rg.repliGrassSoftcapStart = player.rg.repliGrassSoftcapStart.mul(buyableEffect("fu", 56))

        if (inChallenge("fu", 12)) player.rg.repliGrassSoftcapStart = new Decimal(1)

        // MULTIPLIERS START
        let multAdd = new Decimal(0.02)
        multAdd = multAdd.add(buyableEffect("rg", 11))
        multAdd = multAdd.add(buyableEffect("fu", 23))
        multAdd = multAdd.mul(buyableEffect("gs", 18))
        multAdd = multAdd.mul(player.oi.linkingPowerEffect[4])
        if (!inChallenge("fu", 12)) multAdd = multAdd.mul(levelableEffect("pet", 307)[1])

        if (inChallenge("fu", 11)) multAdd = multAdd.pow(Decimal.mul(0.2, buyableEffect("fu", 88)))

        player.rg.repliGrassMult = multAdd.add(1)
        player.rg.repliGrassMult = player.rg.repliGrassMult.pow(buyableEffect("fu", 86))
        if (inChallenge("fu", 12)) player.rg.repliGrassMult = player.rg.repliGrassMult.pow(Decimal.mul(0.2, buyableEffect("fu", 88)))

        layers.rg.updateSoftcap()

        // REPLI-GRASS EFFECTS
        if (player.rg.repliGrass.lte(1)) player.rg.repliGrassEffect = new Decimal(1)
        if (player.rg.repliGrass.gt(1)) player.rg.repliGrassEffect = player.rg.repliGrass.pow(0.15)

        if (player.rg.repliGrass.lte(1)) player.rg.repliGrassEffect2 = new Decimal(1)
        if (player.rg.repliGrass.gt(1)) player.rg.repliGrassEffect2 = player.rg.repliGrass.pow(0.25)

        // REPLI-GRASS REQUIREMENT
        player.rg.repliGrassReq = new Decimal(8)
        player.rg.repliGrassReq = player.rg.repliGrassReq.div(buyableEffect("rg", 12))
        if (hasUpgrade("fu", 111)) player.rg.repliGrassReq = player.rg.repliGrassReq.div(2)

        // REPLI-GRASS GENERATION
        if (hasUpgrade("cp", 16)) player.rg.repliGrassTimer = player.rg.repliGrassTimer.sub(delta)
        if (player.rg.repliGrassTimer.lt(0)) {
            player.rg.repliGrassTimer = player.rg.repliGrassReq
            let row = getRandomInt(5) + 1
            let column = getRandomInt(8) + 1
            let val = row + "0" + column
            if (getGridData("rg", val).lte(1)) {
                setGridData("rg", val, player.rg.repliGrassMult)
            } else if (getGridData("rg", val).lt(player.rg.repliGrassMult.mul(player.rg.repliGrassCap))) {
                setGridData("rg", val, getGridData("rg", val).add(player.rg.repliGrassMult).min(player.rg.repliGrassMult.mul(player.rg.repliGrassCap)))
            }
            if (!inChallenge("fu", 11) && !inChallenge("fu", 12)) {
                let mult = player.rg.repliGrassMult.sub(1)
                if (player.rg.repliGrass.gte(player.rg.repliGrassSoftcapStart)) {
                    mult = mult.div(player.rg.repliGrassSoftcapEffect)
                }
                player.rg.repliGrass = player.rg.repliGrass.mul(mult.mul(buyableEffect("fa", 203)).add(1))
            }
        }

        if (player.rg.repliGrassTimer.gt(player.rg.repliGrassReq)) player.rg.repliGrassTimer = player.rg.repliGrassReq
    },
    updateSoftcap() {
        if (!hasMilestone("gs", 21)) {
            player.rg.repliGrassSoftcapEffect = player.rg.repliGrass.sub(player.rg.repliGrassSoftcapStart).pow(0.225).max(1)
        } else {
            player.rg.repliGrassSoftcapEffect = player.rg.repliGrass.sub(player.rg.repliGrassSoftcapStart).pow(0.2).max(1)
        }
    },
    grid: {
        rows: 5,
        cols: 8,
        getStartData(id) {
            return new Decimal(1) // Mult
        },
        getTitle(data, id) {
            if (getGridData("rg", id).lte(1)) return ""
            return "x" + formatShorterWhole(getGridData("rg", id))
        },
        getCanClick(data, id) {return false},
        onHover(data, id) {
            if (getGridData("rg", id).gt(1)) {
                let mult = getGridData("rg", id)
                layers.rg.updateSoftcap()
                if (player.rg.repliGrass.gte(player.rg.repliGrassSoftcapStart)) {
                    mult = mult.sub(1).div(player.rg.repliGrassSoftcapEffect).add(1)
                }
                player.rg.repliGrass = player.rg.repliGrass.mul(mult)
                setGridData("rg", id, new Decimal(1))
            }
        },
        getStyle(data, id) {
            let look = {width: "80px", height: "80px", fontSize: "9px", lineHeight: "0.8", backgroundColor: "#074317", border: "5px solid rgba(0,0,0,0.3)", borderRadius: "0", padding: "0", margin: "0", cursor: "default"}
            if (getGridData("rg", id).lte(1)) {
                look.background = "#33661d"
            } else {
                look.background = "#18e34e"
            }
            return look
        }
    },
    buyables: {
        11: {
            costBase() { return new Decimal(1.5) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.rg.repliGrass},
            pay(amt) { player.rg.repliGrass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.0025) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Repli-Grass Mult"
            },
            display() {
                return "which are adding +" + format(tmp[this.layer].buyables[this.id].effect) + " to the repli-grass multiplier.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Grass"
            },
            buy(mult) {
                if (mult != true && (!hasMilestone("s", 16) || inChallenge("fu", 11) || inChallenge("fu", 12))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16) || inChallenge("fu", 11) || inChallenge("fu", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        12: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.rg.repliGrass},
            pay(amt) { player.rg.repliGrass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Repli-Grass Grow Rate"
            },
            display() {
                return "which are dividing the repli-grass grow time by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Grass"
            },
            buy(mult) {
                if (mult != true && (!hasMilestone("s", 16) || inChallenge("fu", 11) || inChallenge("fu", 12))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16) || inChallenge("fu", 11) || inChallenge("fu", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        13: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1000) },
            purchaseLimit() { return new Decimal(4) },
            currency() { return player.rg.repliGrass},
            pay(amt) { player.rg.repliGrass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).min(4) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Repli-Grass Capacity"
            },
            display() {
                return "which are adding +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + " to repli-grass mult capacity.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Grass"
            },
            buy(mult) {
                if (mult != true && (!hasMilestone("s", 16) || inChallenge("fu", 11) || inChallenge("fu", 12))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16) || inChallenge("fu", 11) || inChallenge("fu", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        14: {
            costBase() { return new Decimal(8) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.rg.repliGrass},
            pay(amt) { player.rg.repliGrass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.4).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Repli-Grass Softcap"
            },
            display() {
                return "which are extending the repli-grass softcap by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Grass"
            },
            buy(mult) {
                if (mult != true && (!hasMilestone("s", 16) || inChallenge("fu", 11) || inChallenge("fu", 12))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16) || inChallenge("fu", 11) || inChallenge("fu", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        15: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.45) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.rg.repliGrass},
            pay(amt) { player.rg.repliGrass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).pow(0.8).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Replicanti Point Multiplier"
            },
            display() {
                return "which are multiplying the replicanti point multiplier by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Grass"
            },
            buy(mult) {
                if (mult != true && (!hasMilestone("s", 16) || inChallenge("fu", 11) || inChallenge("fu", 12))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16) || inChallenge("fu", 11) || inChallenge("fu", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        16: {
            costBase() { return new Decimal(7) },
            costGrowth() { return new Decimal(1.55) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.rg.repliGrass},
            pay(amt) { player.rg.repliGrass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tetr Point Multiplier"
            },
            display() {
                return "which are multiplying tetr points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Grass"
            },
            buy(mult) {
                if (mult != true && (!hasMilestone("s", 16) || inChallenge("fu", 11) || inChallenge("fu", 12))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16) || inChallenge("fu", 11) || inChallenge("fu", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        17: {
            costBase() { return new Decimal(16) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.rg.repliGrass},
            pay(amt) { player.rg.repliGrass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).pow(0.8).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Anonymity Multiplier"
            },
            display() {
                return "which are multiplying anonymity by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Grass"
            },
            buy(mult) {
                if (mult != true && (!hasMilestone("s", 16) || inChallenge("fu", 11) || inChallenge("fu", 12))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16) || inChallenge("fu", 11) || inChallenge("fu", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        18: {
            costBase() { return new Decimal(30) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.rg.repliGrass},
            pay(amt) { player.rg.repliGrass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Softcap Extender"
            },
            display() {
                return "which are extending the first, second, and repli-tree softcap by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Repli-Grass"
            },
            buy(mult) {
                if (mult != true && (!hasMilestone("s", 16) || inChallenge("fu", 11) || inChallenge("fu", 12))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16) || inChallenge("fu", 11) || inChallenge("fu", 12)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
    },
    bars: {
        grass: {
            unlocked: true,
            direction: RIGHT,
            width: 640,
            height: 20,
            progress() {
                return player.rg.repliGrassTimer.div(player.rg.repliGrassReq)
            },
            baseStyle: {backgroundColor: "black"},
            fillStyle: {backgroundColor: "#0c7127"},
            borderStyle: {
                border: "0px",
                borderRadius: "0",
            },
            display() {
                return formatTime(player.rg.repliGrassTimer) + "/" + formatTime(player.rg.repliGrassReq)
            },
        },
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["raw-html", () => { return "Repli-Grass mult: x" + formatSimple(player.rg.repliGrassMult) + "." }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Repli-Grass mult cap: x" + formatSimple(player.rg.repliGrassMult.mul(player.rg.repliGrassCap)) + "." }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return player.rg.repliGrass.gte(player.rg.repliGrassSoftcapStart) ? "After " + formatSimple(player.rg.repliGrassSoftcapStart) + " repli-grass, multiplier effectiveness is divided by /" + formatSimple(player.rg.repliGrassSoftcapEffect) + "." : "" }, {color: "red", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["style-column", [
                        ["bar", "grass"],
                        ["style-row", [], {width: "640px", height: "5px", background: "#3e3117"}],
                        "grid"
                    ], {width: "640px", border: "5px solid #3e3117"}],
                ]
            },
            "Buyables": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14],
                        ["ex-buyable", 15], ["ex-buyable", 16], ["ex-buyable", 17], ["ex-buyable", 18]], {maxWidth: "1200px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => {return "You have <h3>" + format(player.rg.repliGrass) + "</h3> repli-grass."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "Boosts repli-leaf mult by x" + format(player.rg.repliGrassEffect) + "." }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["raw-html", () => { return "Boosts replicanti point mult by x" + format(player.rg.repliGrassEffect2) + "." }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame && hasUpgrade("cp", 16) }
})