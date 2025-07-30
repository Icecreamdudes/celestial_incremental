addLayer("gs", {
    name: "Grass-Skip", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "GS", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        grassSkip: new Decimal(0),
        grassSkipToGet: new Decimal(0),
        grassSkipReq: new Decimal(1e40),
        grassSkipEffect: new Decimal(1),
        grassSkipPause: new Decimal(0),

        //grassSkippers
        grassSkippers: new Decimal(0),
        grassSkippersEffect: new Decimal(1),
        grassSkippersPerSecond: new Decimal(0),

        //milestone
        milestone2Effect: new Decimal(1),
        milestone8Effect: new Decimal(1),
        milestone10Effect: new Decimal(1),
    }
    },
    automate() {
    },
    nodeStyle() {
        if (hasMilestone("s", 16) && !inChallenge("fu", 11))
        {
            buyBuyable('gs', 11)
            buyBuyable('gs', 12)
            buyBuyable('gs', 13)
            buyBuyable('gs', 14)
            buyBuyable('gs', 15)
            buyBuyable('gs', 16)
            buyBuyable('gs', 17)
            buyBuyable('gs', 18)
        }
    },
    tooltip: "Grass-Skip",
    branches: ["rg"],
    color: "#bfc66a",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.gs.grassSkipPause.gt(0)) {
            layers.gs.grassSkipReset();
        }
        player.gs.grassSkipPause = player.gs.grassSkipPause.sub(1)

        if (player.gs.grassSkip.lt(15)) player.gs.grassSkipReq = Decimal.pow(1e2, player.gs.grassSkip).pow(1.5).add(1).mul(1e40)
        if (player.gs.grassSkip.gte(15)) player.gs.grassSkipReq = Decimal.pow(1e3, player.gs.grassSkip).pow(1.5).add(1).mul(1e35)
        player.gs.grassSkipReq = player.gs.grassSkipReq.div(buyableEffect("fu", 72))
        player.gs.grassSkipEffect = player.gs.grassSkip.add(buyableEffect("fu", 24)).pow(2.4).add(1)

        player.gs.grassSkipToGet = new Decimal(1)
        if (hasUpgrade("fu", 18)) {
            if (player.cp.replicantiPoints.gt(new Decimal(1e40).div(buyableEffect("fu", 72))) && player.cp.replicantiPoints.lt(new Decimal(1e107).div(buyableEffect("fu", 72)))) {
                player.gs.grassSkipToGet = Decimal.ln(player.cp.replicantiPoints.mul(buyableEffect("fu", 72)).div(1e40).sub(1)).div(new Decimal(1.5).mul(Decimal.ln(1e2))).floor().add(1).sub(player.gs.grassSkip)
            } else if (player.cp.replicantiPoints.gte(new Decimal(1e107).div(buyableEffect("fu", 72)))) {
                player.gs.grassSkipToGet = Decimal.ln(player.cp.replicantiPoints.mul(buyableEffect("fu", 72)).div(1e35).sub(1)).div(new Decimal(1.5).mul(Decimal.ln(1e3))).floor().add(1).sub(player.gs.grassSkip)
            }
        }
        if (player.cp.replicantiPoints.lt(player.gs.grassSkipReq)) {
            player.gs.grassSkipToGet = new Decimal(0)
        }

        player.gs.grassSkippers = player.gs.grassSkippers.add(player.gs.grassSkippersPerSecond.mul(delta))

        player.gs.grassSkippersPerSecond = player.gs.grassSkip.add(buyableEffect("fu", 24)).pow(5)
        player.gs.grassSkippersPerSecond = player.gs.grassSkippersPerSecond.mul(buyableEffect("gs", 11))
        player.gs.grassSkippersPerSecond = player.gs.grassSkippersPerSecond.mul(buyableEffect("gs", 12))
        player.gs.grassSkippersPerSecond = player.gs.grassSkippersPerSecond.mul(buyableEffect("gs", 13))
        player.gs.grassSkippersPerSecond = player.gs.grassSkippersPerSecond.mul(buyableEffect("gs", 14))
        player.gs.grassSkippersPerSecond = player.gs.grassSkippersPerSecond.mul(player.oi.linkingPowerEffect[5])
        player.gs.grassSkippersPerSecond = player.gs.grassSkippersPerSecond.mul(buyableEffect("fu", 57))
        player.gs.grassSkippersPerSecond = player.gs.grassSkippersPerSecond.mul(buyableEffect("ep2", 12))

        // KEEP AFTER
        if (inChallenge("fu", 11)) player.gs.grassSkippersPerSecond = player.gs.grassSkippersPerSecond.pow(0.2)

        player.gs.grassSkippersEffect = player.gs.grassSkippers.pow(0.275).add(1)

        player.gs.milestone2Effect = player.cp.replicantiPoints.plus(1).log10().pow(1.35).add(1)
        if (player.gs.grassSkip.lte(19)) {
            player.gs.milestone8Effect = new Decimal(1)
        } else if (!hasMilestone("gs", 22)){
            player.gs.milestone8Effect = Decimal.pow(1.25, player.gs.grassSkip.sub(19))
        } else {
            player.gs.milestone8Effect = Decimal.pow(1.5, player.gs.grassSkip)
        }
        if (player.gs.grassSkip.lte(39)) {
            player.gs.milestone10Effect = new Decimal(1)
        } else {
            player.gs.milestone10Effect = Decimal.pow(1.25, player.gs.grassSkip.sub(39))
        }
    },
    grassSkipReset()
    {
        player.ar.rankPoints = new Decimal(0)
        player.ar.tierPoints = new Decimal(0)
        player.ar.tetrPoints = new Decimal(0)
        player.cp.replicantiPoints = new Decimal(1)

        player.an.anonymity = new Decimal(0)

        player.pr.perkPoints = new Decimal(0)
        player.pr.buyables[11] = new Decimal(0)
        player.pr.buyables[12] = new Decimal(0)
        player.pr.buyables[13] = new Decimal(0)
        player.pr.buyables[14] = new Decimal(0)
        player.pr.buyables[15] = new Decimal(0)
        player.pr.buyables[16] = new Decimal(0)
        player.pr.buyables[17] = new Decimal(0)
        player.pr.buyables[18] = new Decimal(0)

        player.rt.repliTrees = new Decimal(0)
        player.rt.repliLeaves = new Decimal(1)

        player.rt.buyables[11] = new Decimal(0)
        player.rt.buyables[12] = new Decimal(0)
        player.rt.buyables[13] = new Decimal(0)
        player.rt.buyables[14] = new Decimal(0)
        player.rt.buyables[15] = new Decimal(0)
        player.rt.buyables[16] = new Decimal(0)
        player.rt.buyables[17] = new Decimal(0)
        player.rt.buyables[18] = new Decimal(0)

        if (!hasMilestone("gs", 14))
        {
            player.rg.repliGrass = new Decimal(1)

            player.rg.buyables[11] = new Decimal(0)
            player.rg.buyables[12] = new Decimal(0)
            player.rg.buyables[13] = new Decimal(0)
            player.rg.buyables[14] = new Decimal(0)
            player.rg.buyables[15] = new Decimal(0)
            player.rg.buyables[16] = new Decimal(0)
            player.rg.buyables[17] = new Decimal(0)
            player.rg.buyables[18] = new Decimal(0)
        }

        if (!hasUpgrade("s", 15)) {
            for (let i = 0; i < player.an.upgrades.length; i++) {
                if (+player.an.upgrades[i] < 24) {
                    player.an.upgrades.splice(i, 1);
                    i--;
                }
            }
        }
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
        11: {
            title() { return "<h2>Reset all previous alt-uni 1 content, but grass-skip.</h2><br><h3>Req: " + formatWhole(player.gs.grassSkipReq) + " Replicanti Points</h3>" },
            canClick() { return player.cp.replicantiPoints.gte(player.gs.grassSkipReq) },
            unlocked() { return true },
            onClick() {
                player.gs.grassSkip = player.gs.grassSkip.add(player.gs.grassSkipToGet)
                player.gs.grassSkipPause = new Decimal(4)
            },
            style: {width: "406px", minHeight: "105.7px", borderRadius: "0px 15px 15px 0px", border: "3px solid #0c1a36", margin: "-3px"},
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
    upgrades: {
    },
    buyables: {
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.gs.grassSkippers},
            pay(amt) { player.gs.grassSkippers = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass-Skipper Factor I"
            },
            display() {
                return "which are multiplying grass-skippers by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass-Skippers"
            },
            buy(mult) {
                if (mult != true && (!hasMilestone("s", 16) || inChallenge("fu", 11))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16) || inChallenge("fu", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        12: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.gs.grassSkippers},
            pay(amt) { player.gs.grassSkippers = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass-Skipper Factor II"
            },
            display() {
                return "which are multiplying grass-skippers by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass-Skippers"
            },
            buy(mult) {
                if (mult != true && (!hasMilestone("s", 16) || inChallenge("fu", 11))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16) || inChallenge("fu", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        13: {
            costBase() { return new Decimal(40) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.gs.grassSkippers},
            pay(amt) { player.gs.grassSkippers = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass-Skipper Factor III"
            },
            display() {
                return "which are multiplying grass-skippers by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass-Skippers"
            },
            buy(mult) {
                if (mult != true && (!hasMilestone("s", 16) || inChallenge("fu", 11))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16) || inChallenge("fu", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        14: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.gs.grassSkippers},
            pay(amt) { player.gs.grassSkippers = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass-Skipper Factor IV"
            },
            display() {
                return "which are multiplying grass-skippers by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass-Skippers"
            },
            buy(mult) {
                if (mult != true && (!hasMilestone("s", 16) || inChallenge("fu", 11))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16) || inChallenge("fu", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        15: {
            costBase() { return new Decimal(2500) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.gs.grassSkippers},
            pay(amt) { player.gs.grassSkippers = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Perk Point Skip Booster"
            },
            display() {
                return "which are boosting perk points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass-Skippers"
            },
            buy(mult) {
                if (mult != true && (!hasMilestone("s", 16) || inChallenge("fu", 11))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16) || inChallenge("fu", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        16: {
            costBase() { return new Decimal(6000) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.gs.grassSkippers},
            pay(amt) { player.gs.grassSkippers = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Anonymity Skip Booster"
            },
            display() {
                return "which are boosting anonymity by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass-Skippers"
            },
            buy(mult) {
                if (mult != true && (!hasMilestone("s", 16) || inChallenge("fu", 11))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16) || inChallenge("fu", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        17: {
            costBase() { return new Decimal(15000) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.gs.grassSkippers},
            pay(amt) { player.gs.grassSkippers = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.15).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Repli-Tree Skip Booster"
            },
            display() {
                return "which are boosting repli-trees by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass-Skippers"
            },
            buy(mult) {
                if (mult != true && (!hasMilestone("s", 16) || inChallenge("fu", 11))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16) || inChallenge("fu", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        18: {
            costBase() { return new Decimal(40000) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.gs.grassSkippers},
            pay(amt) { player.gs.grassSkippers = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.15).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Repli-Grass Skip Booster"
            },
            display() {
                return "which are boosting the repli-grass mult by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass-Skippers"
            },
            buy(mult) {
                if (mult != true && (!hasMilestone("s", 16) || inChallenge("fu", 11))) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16) || inChallenge("fu", 11)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
    },
    milestones: {
        11: {
            requirementDescription: "<h3>Grass-Skip 1",
            effectDescription: "Unlock Grass-Skippers",
            done() { return player.gs.grassSkip.gte(1) },
            style: { width: '800px', "min-height": '75px' },
        },
        12: {
            requirementDescription: "<h3>Grass-Skip 2",
            effectDescription() { return "Replicanti Points boost themselves at a reduced rate.<br>Currently: " + format(player.gs.milestone2Effect)+"x" },
            done() { return player.gs.grassSkip.gte(2) },
            style: { width: '800px', "min-height": '75px' },
        },
        13: {
            requirementDescription: "<h3>Grass-Skip 3",
            effectDescription() { return "Autobuy perk buyables." },
            done() { return player.gs.grassSkip.gte(3) },
            style: { width: '800px', "min-height": '75px' },
        },
        14: {
            requirementDescription: "<h3>Grass-Skip 4",
            effectDescription() { return "Keep repli-grass content on reset." },
            done() { return player.gs.grassSkip.gte(4) },
            style: { width: '800px', "min-height": '75px' },
        },
        15: {
            requirementDescription: "<h3>Grass-Skip 7",
            effectDescription() { return "Gain 10% of anonymity per second." },
            done() { return player.gs.grassSkip.gte(7) },
            style: { width: '800px', "min-height": '75px' },
        },
        16: {
            requirementDescription: "<h3>Grass-Skip 11",
            effectDescription() { return "Autobuy repli-tree buyables." },
            done() { return player.gs.grassSkip.gte(11) },
            style: { width: '800px', "min-height": '75px' },
        },
        17: {
            requirementDescription: "<h3>Grass-Skip 15",
            effectDescription() { return "Unlocks oil." },
            done() { return player.gs.grassSkip.gte(15) },
            style: { width: '800px', "min-height": '75px' },
        },
        18: {
            requirementDescription: "<h3>Grass-Skip 20",
            effectDescription() { return "Grass-Skips (ignoring additive) boost pollinator gain.<br>Currently: " + format(player.gs.milestone8Effect)+"x" },
            done() { return player.gs.grassSkip.gte(20) },
            style: { width: '800px', "min-height": '75px' },
        },
        19: {
            requirementDescription: "<h3>Grass-Skip 30",
            effectDescription() { return "Gain 500% of all alternate rank currencies per second." },
            done() { return player.gs.grassSkip.gte(30) },
            style: { width: '800px', "min-height": '75px' },
        },
        20: {
            requirementDescription: "<h3>Grass-Skip 40",
            effectDescription() { return "Grass-Skips (ignoring additive) boost linking power gain.<br>Currently: " + format(player.gs.milestone10Effect)+"x" },
            done() { return player.gs.grassSkip.gte(40) },
            style: { width: '800px', "min-height": '75px' },
        },
        21: {
            requirementDescription: "<h3>Grass-Skip 50",
            effectDescription() { return "Slightly reduce Repli-Grass softcap scaling." },
            done() { return player.gs.grassSkip.gte(50) },
            style: { width: '800px', "min-height": '75px' },
        },
        22: {
            requirementDescription: "<h3>Grass-Skip 60",
            effectDescription() { return "Improve Grass-Skip milestone 8's effect." },
            done() { return player.gs.grassSkip.gte(60) },
            style: { width: '800px', "min-height": '75px' },
        },
    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Grass-Skip": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", function () { return !player.fu.buyables[24].gte(1) ? "Grass-skip " + formatWhole(player.gs.grassSkip) + " (+" + formatWhole(player.gs.grassSkipToGet) + ")" : "Grass-skip " + formatWhole(player.gs.grassSkip) + " + " + formatWhole(buyableEffect("fu", 24)) + " (+" + formatWhole(player.gs.grassSkipToGet) + ")"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["raw-html", function () { return "x" + format(player.gs.grassSkipEffect) + " Replicanti Point Mult" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "399px", height: "100px"}],
                        ["clickable", 11],
                    ], {width: "800px", height: "100px", backgroundColor: "#162e5e", border: "3px solid #0c1a36", borderRadius: "15px"}],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Milestones"  }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["milestone", 11],
                    ["milestone", 12],
                    ["milestone", 13],
                    ["milestone", 14],
                    ["milestone", 15],
                    ["milestone", 16],
                    ["milestone", 17],
                    ["milestone", 18],
                    ["milestone", 19],
                    ["milestone", 20],
                    ["milestone", 21],
                    ["milestone", 22],
                    ["blank", "25px"],
                ]
            },
            "Grass-Skippers": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasMilestone("gs", 11) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.gs.grassSkippers) + "</h3> grass-skippers." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You are gaining <h3>" + format(player.gs.grassSkippersPerSecond) + "</h3> grass-skippers per second." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Your grass-skippers are boosting rank, tier, and tetr points by x<h3>" + format(player.gs.grassSkippersEffect) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14],
                        ["ex-buyable", 15], ["ex-buyable", 16], ["ex-buyable", 17], ["ex-buyable", 18]], {maxWidth: "1200px"}],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.cp.replicantiPoints) + "</h3> replicanti points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "Replicanti Mult: " + format(player.cp.replicantiPointsMult, 4) + "x" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["bar", "replicantiBar"]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("cp", 17) }
})
