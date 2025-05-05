﻿addLayer("r", {
    name: "Ranks", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        //Ranks and Tiers and stuff
        rank: new Decimal(0),
        rankReq: new Decimal(10), //Points
        rankEffect: new Decimal(1),
        ranksToGet: new Decimal(0),
        tier: new Decimal(0),
        tierReq: new Decimal(3), //Ranks
        tierEffect: new Decimal(1),
        tiersToGet: new Decimal(0),
        tetr: new Decimal(0),
        tetrReq: new Decimal(2), //Tiers
        tetrEffect: new Decimal(1),
        tetrsToGet: new Decimal(0),

        //PENT
        pent: new Decimal(0),
        pentReq: new Decimal(1e28),
        pentEffect: new Decimal(1),
        pentToGet: new Decimal(0),
        pentPause: new Decimal(0),

        pentMilestone3Effect: new Decimal(1),
        pentMilestone30Effect: new Decimal(1),
        pentMilestone30Effect2: new Decimal(1),

        challengeIVEffect: new Decimal(1),

        //Time rev
        timeReversed: false,

        timeCubes: new Decimal(0),
        timeCubesEffect: new Decimal(1),
        timeCubesPerSecond: new Decimal(0),
        timeMax: false,

        timeCubeEffects: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
    }
    },
    automate() {
        if (hasMilestone("s", 16))
        {
            buyBuyable("r", 11)
            buyBuyable("r", 12)
            buyBuyable("r", 13)
            buyBuyable("r", 14)
        }
    },
    nodeStyle() {
    },
    tooltip: "Ranks",
    color: "#eaf6f7",
    update(delta) {
        let onepersec = new Decimal(1)

        //Rank and Tier effects/costs

        let ranksGainPreS = player.points.div(10).mul(levelableEffect("pet", 204)[0]).pow(Decimal.div(20, 29)).floor()
        let ranksGainPostS = player.points.div(10).mul(levelableEffect("pet", 204)[0]).pow(0.25).floor()
        let ranksGainPostS2 = player.points.div(10).mul(levelableEffect("pet", 204)[0]).pow(Decimal.div(1, 10)).floor()
        let ranksGainPostS3 = player.points.plus(1).mul(levelableEffect("pet", 204)[0]).log10().div(10).pow(Decimal.div(1, 50)).floor()

        player.r.rankEffect = player.r.rank.mul(0.4).add(1).pow(1.055)
        if (hasUpgrade("ad", 13)) player.r.rankEffect = player.r.rankEffect.mul(upgradeEffect("ad", 13))
        player.r.rankEffect = player.r.rankEffect.pow(player.p.crystalEffect)
        player.r.rankEffect = player.r.rankEffect.pow(buyableEffect("rm", 21))
        player.r.rankReq = layers.r.getRankReq()
        if (player.points.gte(player.r.rankReq) && player.r.rank.add(player.r.ranksToGet).lte(20) && hasUpgrade("p", 14)) {
            player.r.ranksToGet = ranksGainPreS.sub(player.r.rank)
        }
        if (player.points.gte(player.r.rankReq) && player.r.rank.add(player.r.ranksToGet).gt(20) && hasUpgrade("p", 14)) {
            player.r.ranksToGet = ranksGainPostS.sub(player.r.rank).add(18)
        }
        if (player.points.gte(player.r.rankReq) && player.r.rank.add(player.r.ranksToGet).gt(100) && hasUpgrade("p", 14)) {
            player.r.ranksToGet = ranksGainPostS2.sub(player.r.rank).add(98)
        }
        if (player.points.gte(player.r.rankReq) && player.r.rank.add(player.r.ranksToGet).gt("1e4000") && hasUpgrade("p", 14)) {
            player.r.ranksToGet = ranksGainPostS3.sub(player.r.rank).add("1e4000")
        }
        if (!hasUpgrade("p", 14)) player.r.ranksToGet = new Decimal(1)
        if (player.points.lt(player.r.rankReq) || player.r.ranksToGet.lt(0)) {
            player.r.ranksToGet = new Decimal(0)
        }
        if (hasUpgrade("p", 17)) {
            player.r.rank = player.r.rank.add(player.r.ranksToGet)
        }

        let tiersGain = player.r.rank.div(3).mul(levelableEffect("pet", 204)[1]).pow(Decimal.div(10, 11)).floor()

        player.r.tierEffect = player.r.tier.mul(0.55).add(1).pow(1.1)
        player.r.tierEffect = player.r.tierEffect.pow(player.p.crystalEffect)
        player.r.tierEffect = player.r.tierEffect.pow(buyableEffect("rm", 21))
        player.r.tierReq = layers.r.getTierReq()
        if (player.r.rank.gte(player.r.tierReq) && hasUpgrade("p", 14)) {
             player.r.tiersToGet = tiersGain.sub(player.r.tier)
        }
        if (!hasUpgrade("p", 14)) player.r.tiersToGet = new Decimal(1)
        if (player.r.rank.lt(player.r.tierReq)) {
            player.r.tiersToGet = new Decimal(0)
        }
        if (hasUpgrade("p", 18)) {
            player.r.tier = player.r.tier.add(player.r.tiersToGet)
        }

        let tetrGain = player.r.tier.div(2).mul(levelableEffect("pet", 204)[2]).pow(Decimal.div(25, 27)).floor()

        player.r.tetrEffect = player.r.tetr.add(1).pow(1.2)
        player.r.tetrEffect = player.r.tetrEffect.pow(player.p.crystalEffect)
        player.r.tetrEffect = player.r.tetrEffect.pow(buyableEffect("rm", 21))
        player.r.tetrReq = layers.r.getTetrReq()
        if (player.r.tier.gte(player.r.tetrReq) && hasUpgrade("p", 14)) {
            player.r.tetrsToGet = tetrGain.sub(player.r.tetr)
        }
        if (!hasUpgrade("p", 14)) player.r.tetrsToGet = new Decimal(1)
        if (player.r.tier.lt(player.r.tetrReq)) {
            player.r.tetrsToGet = new Decimal(0)
        }
        if (hasUpgrade("p", 22) || hasMilestone("s", 19)) {
            player.r.tetr = player.r.tetr.add(player.r.tetrsToGet)
        }

        player.r.pentEffect = player.r.pent.add(1).pow(3)
        player.r.pentEffect = player.r.pentEffect.pow(player.p.crystalEffect)
        player.r.pentEffect = player.r.pentEffect.pow(buyableEffect("rm", 21))
        if (player.r.pent.lt(5)) player.r.pentReq = player.r.pent.add(1).pow(42.5).mul(1e28)
        if (player.r.pent.gte(5)) player.r.pentReq = player.r.pent.add(1).pow(75).mul(1e32).pow(1.1)
        if (player.r.pent.gte(30)) player.r.pentReq = Decimal.pow(1e10, player.r.pent)
        player.r.pentReq = player.r.pentReq.div(buyableEffect("g", 19))

        if (player.r.pentPause.gt(0)) {
            layers.r.pentReset();
        }
        player.r.pentPause = player.r.pentPause.sub(1)

        player.r.pentToGet = new Decimal(1)
        if (hasUpgrade("i", 32) && !inChallenge("ip", 14)) {
            if (player.points.lt(new Decimal(6e57).div(buyableEffect("g", 19)))) {
                player.r.pentToGet = player.points.mul(buyableEffect("g", 19)).div(1e28).pow(1/42.5).floor().sub(player.r.pent)
            } else if (player.points.gte(new Decimal(6e57).div(buyableEffect("g", 19))) && player.points.lt(new Decimal(4e152).div(buyableEffect("g", 19)))) {
                player.r.pentToGet = player.points.mul(buyableEffect("g", 19)).pow(10/11).div(1e32).pow(1/75).floor().sub(player.r.pent)
            } else if (player.points.gte(new Decimal(4e152).div(buyableEffect("g", 19)))) {
                player.r.pentToGet = Decimal.ln(player.points.mul(buyableEffect("g", 19))).div(Decimal.ln(1e10)).floor().sub(player.r.pent)
            }
        }
        if (player.points.lt(player.r.pentReq)) {
            player.r.pentToGet = new Decimal(0)
        }

        player.r.pentMilestone3Effect = player.g.grass.pow(0.3).add(1)

        player.r.pentMilestone30Effect = player.r.pent.pow(2).add(1)
        player.r.pentMilestone30Effect2 = player.r.pent.pow(1.2).add(1)

        player.r.challengeIVEffect = Decimal.pow(400, player.r.pent)

        if (hasUpgrade("i", 32) && !inChallenge("ip", 14) && player.points.gte(player.r.pentReq)) {
            player.r.pent = player.r.pent.add(player.r.pentToGet)
        } else if (hasUpgrade("i", 27) && player.points.gte(player.r.pentReq)) {
            player.r.pent = player.r.pent.add(1)
        }

        //Time reversal

        if (!player.r.timeReversed)
        {
            player.r.timeCubesPerSecond = new Decimal(0)
        } else {
            player.r.timeCubesPerSecond = player.points.plus(1).log10().pow(0.3)
            player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(buyableEffect("id", 23))
            player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(buyableEffect("oi", 23))
            player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(levelableEffect("pet", 209)[2])
            if (hasUpgrade("ep0", 12)) player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(upgradeEffect("ep0", 12))
            if (hasUpgrade("s", 14)) player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(upgradeEffect("s", 14))
        }

        player.r.timeCubes = player.r.timeCubes.add(player.r.timeCubesPerSecond.mul(delta))

        if (player.points.gte("1e1000")) {
            player.r.timeCubesEffect = player.r.timeCubes.pow(1.15)
        } else {
            player.r.timeCubesEffect = new Decimal(0)
        }

        player.r.timeCubeEffects[0] = player.r.timeCubesEffect.pow(1.15).mul(100).add(1)
        player.r.timeCubeEffects[1] = player.r.timeCubesEffect.pow(1.1).mul(10).add(1)
        player.r.timeCubeEffects[2] = player.r.timeCubesEffect.pow(0.9).mul(6).add(1)
        player.r.timeCubeEffects[3] = player.r.timeCubesEffect.pow(0.7).mul(3).add(1)
    },
    getRankReq() {
        if (player.r.rank.lte(20)) {
            return player.r.rank.add(1).pow(1.45).div(levelableEffect("pet", 204)[0]).mul(10)
        } else if (player.r.rank.gt(20) && player.r.rank.lte(100)) {
            return (player.r.rank.sub(17)).pow(4).div(levelableEffect("pet", 204)[0]).mul(10)
        } else if (player.r.rank.gt(100) && player.r.rank.lt("1e4000")) {
            return (player.r.rank.sub(97)).pow(10).div(levelableEffect("pet", 204)[0]).mul(10)
        } else if (player.r.rank.gte("1e4000")) {
            return Decimal.pow(10, player.r.rank.pow(50).mul(10)).div(levelableEffect("pet", 204)[0]).sub(1)
        }
    },
    getTierReq() {
        return player.r.tier.add(1).pow(1.1).div(levelableEffect("pet", 204)[1]).mul(3).ceil()
    },
    getTetrReq() {
        return player.r.tetr.add(1).pow(1.08).div(levelableEffect("pet", 204)[2]).mul(2).ceil()
    },
    rankReset() {
        player.points = new Decimal(0)
        player.r.ranksToGet = new Decimal(0)
    },
    tierReset() {
        player.points = new Decimal(0)
        player.r.rank = new Decimal(0)
        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
    },
    tetrReset() {
        player.points = new Decimal(0)
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
        player.r.tetrsToGet = new Decimal(0)
    },
    pentReset() {
        player.points = new Decimal(0)
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        player.r.tetr = new Decimal(0)
        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
        player.r.tetrsToGet = new Decimal(0)
        player.r.pentToGet = new Decimal(0)

        player.r.factorUnlocks = [true, true, true, false, false, false, false, false]
        player.r.factorGain = new Decimal(1)

        player.r.factorPower = new Decimal(0)
        player.r.factorPowerEffect = new Decimal(1)
        player.r.factorPowerPerSecond = new Decimal(0)
        player.r.powerFactorUnlocks = [true, true, true, false, false, false, false, false]

        for (let i = 11; i < 20; i++) {
            player.f.buyables[i] = new Decimal(0)
        }
        for (let i = 21; i < 28; i++) {
            player.f.buyables[i] = new Decimal(0)
        }

        if (!hasMilestone("ip", 11))
        {
            player.p.prestigePoints = new Decimal(0)
            for (let i = 0; i < player.p.upgrades.length; i++) {
                if (+player.p.upgrades[i] < 23) {
                    player.p.upgrades.splice(i, 1);
                    i--;
                }
            }
        }

        for (let i = 11; i < 17; i++) {
            player.t.buyables[i] = new Decimal(0)
        }

        player.f.factorPower = new Decimal(0)

        player.t.leaves = new Decimal(0)
        player.t.trees = new Decimal(0)
    },
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
            canClick() { return player.r.timeMax == false },
            unlocked() { return true },
            onClick() {
                player.r.timeMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.r.timeMax == true  },
            unlocked() { return true },
            onClick() {
                player.r.timeMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        11: {
            title() {
                if (player.r.rank.lte(20)) {
                    return "<h2>Reset celestial points, but rank up.</h2><br><h3>Req: " + format(player.r.rankReq) + " Points</h3>"
                } else if (player.r.rank.lte(100)) {
                    return "<h2>Reset celestial points, but rank up.</h2><br><h3>Req: " + format(player.r.rankReq) + " Points<br><small style='color:darkred'>[SOFTCAPPED]</small></h3>"
                } else if (player.r.rank.lt("1e4000")) {
                    return "<h2>Reset celestial points, but rank up.</h2><br><h3>Req: " + format(player.r.rankReq) + " Points<br><small style='color:darkred'>[SOFTCAPPED<sup>2</sup>]</small></h3>"
                } else {
                    return "<h2>Reset celestial points, but rank up.</h2><br><h3><small style='color:darkred'>[HARDCAPPED]</small></h3>"
                }
            },
            canClick() { return player.points.gte(player.r.rankReq) && !hasUpgrade("p", 17) },
            unlocked() { return true },
            onClick() {
                player.r.rank = player.r.rank.add(player.r.ranksToGet)
                layers.r.rankReset()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "404px", minHeight: "78.7px", borderRadius: "0px 15px 0px 0px", color: "black", border: "2px solid white", margin: "-2px", fontSize: "8px"}
                this.canClick() ? look.backgroundColor = "#bbbbbb" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        12: {
            title() { return "<h2>Reset celestial points and ranks, but tier up.</h2><br><h3>Req: " + formatWhole(player.r.tierReq) + " Rank</h3>" },
            canClick() { return player.r.rank.gte(player.r.tierReq) && !hasUpgrade("p", 18) },
            unlocked() { return true },
            onClick() {
                player.r.tier = player.r.tier.add(player.r.tiersToGet)
                layers.r.tierReset()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "404px", minHeight: "78.7px", borderRadius: "0px", color: "black", border: "2px solid white", margin: "-2px", fontSize: "8px"}
                this.canClick() ? look.backgroundColor = "#bbbbbb" : look.backgroundColor = "#bf8f8f"
                hasUpgrade("i", 13) ? look.borderRadius = "0px" : look.borderRadius = "0px 0px 15px 0px"
                return look
            },
        },
        13: {
            title() { return "<h2>Reset celestial points, ranks, and tiers, but tetr up.</h2><br><h3>Req: " + formatWhole(player.r.tetrReq) + " Tier</h3>" },
            canClick() { return player.r.tier.gte(player.r.tetrReq) && !hasUpgrade("p", 22) && !hasMilestone("s", 19)},
            unlocked() { return hasUpgrade("i", 13) },
            onClick() {
                player.r.tetr = player.r.tetr.add(player.r.tetrsToGet)
                layers.r.tetrReset()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "404px", minHeight: "78.7px", borderRadius: "0px 0px 15px 0px", color: "black", border: "2px solid white", margin: "-2px", fontSize: "8px"}
                this.canClick() ? look.backgroundColor = "#bbbbbb" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        14: {
            title() {
                if (player.r.pent.lt(5)) {
                    return "<h2>Reset all content before grass, but pent.</h2><br><h3>Req: " + formatWhole(player.r.pentReq) + " Points</h3>"
                } else if (player.r.pent.gte(5) && player.r.pent.lt(30)) {
                    return "<h2>Reset all content before grass, but pent.</h2><br><h3>Req: " + formatWhole(player.r.pentReq) + " Points<br><small style='color:darkred'>[SOFTCAPPED]</small></h3>"
                } else if (player.r.pent.gte(30)) {
                    return "<h2>Reset all content before grass, but pent.</h2><br><h3>Req: " + formatWhole(player.r.pentReq) + " Points<br><small style='color:darkred'>[SOFTCAPPED<sup>2</sup>]</small></h3>"
                }
            },
            canClick() { return player.r.pentToGet.gt(0) && !hasUpgrade("i", 32) },
            unlocked() { return true },
            onClick() {
                player.r.pent = player.r.pent.add(player.r.pentToGet)
                player.r.pentPause = new Decimal(3)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "404px", minHeight: "103.7px", borderRadius: "0px 15px 15px 0px", color: "black", border: "2px solid white", margin: "-2px", fontSize: "8px"}
                this.canClick() ? look.backgroundColor = "#bbbbbb" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        15: {
            title() { return "Time Reversal<br>On" },
            canClick() { return true },
            unlocked() { return player.r.timeReversed },
            onClick() {
                player.r.timeReversed = false
            },
            style: { width: '200px', "min-height": '100px', fontSize: '16px', backgroundColor: '#d82cd4', color: 'white', borderRadius: '13px'},
        },
        16: {
            title() { return "Time Reversal<br>Off" },
            canClick() { return true },
            unlocked() { return !player.r.timeReversed },
            onClick() {
                player.r.timeReversed = true
            },
            style: { width: '200px', "min-height": '100px', fontSize: '16px', backgroundColor: '#d82cd4', color: 'white', borderRadius: '13px'},
        },
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
        11: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.r.timeCubes},
            pay(amt) { player.r.timeCubes = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.5).pow(1.2).add(1).pow(buyableEffect("cs", 21)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Golden Grass Reverser"
            },
            display() {
                return "which are multiplying golden grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Cubes"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#d82cd4', color: 'white'}
        },
        12: {
            costBase() { return new Decimal(300) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.r.timeCubes},
            pay(amt) { player.r.timeCubes = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).pow(0.8).add(1).pow(buyableEffect("cs", 21)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Crystal Reverser"
            },
            display() {
                return "which are multiplying crystal gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Cubes"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#d82cd4', color: 'white'}
        },
        13: {
            costBase() { return new Decimal(700) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.r.timeCubes},
            pay(amt) { player.r.timeCubes = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.02).pow(0.75).add(1).pow(buyableEffect("cs", 21)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Negative Infinity Reverser"
            },
            display() {
                return "which are multiplying negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Cubes"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#d82cd4', color: 'white'}
        },
        14: {
            costBase() { return new Decimal(1500) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.r.timeCubes},
            pay(amt) { player.r.timeCubes = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).pow(0.6).add(1).pow(buyableEffect("cs", 21)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Infinity Dimension Reverser"
            },
            display() {
                return "which are boosting infinity dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Time Cubes"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#d82cd4', color: 'white'}
        },
    },
    milestones: {
        11: {
            requirementDescription: "<h3>Pent 1",
            effectDescription: "Unlocks a new type of factor and grass upgrades.",
            done() { return player.r.pent.gte(1) },
            style: { width: '800px', "min-height": '75px' },
        },
        12: {
            requirementDescription: "<h3>Pent 2",
            effectDescription: "Autobuy tree buyables and unlocks grasshop.",
            done() { return player.r.pent.gte(2) },
            style: { width: '800px', "min-height": '75px' },
        },
        13: {
            requirementDescription: "<h3>Pent 3",
            effectDescription() { return "Autobuys grass buyables, and unlocks tree factor VI.<br>Boosts celestial points based on grass: Currently: " + format(player.r.pentMilestone3Effect) + "x" },
            done() { return player.r.pent.gte(3) },
            style: { width: '800px', "min-height": '75px' },
        },
        14: {
            requirementDescription: "<h3>Pent 5",
            effectDescription() { return "Unlock mods." },
            done() { return player.r.pent.gte(5) },
            style: { width: '800px', "min-height": '75px' },
        },
        15: {
            requirementDescription: "<h3>Pent 7",
            effectDescription() { return "Autobuy grass and prestige upgrades." },
            done() { return player.r.pent.gte(7) },
            style: { width: '800px', "min-height": '90px' },
            toggles: [
                ["p", "auto"], // Each toggle is defined by a layer and the data toggled for that layer
                ["g", "auto"]
            ],
        },
        16: {
            requirementDescription: "<h3>Pent 8",
            effectDescription() { return "Unlock tree factor VIII and autobuy tree and grass factors." },
            done() { return player.r.pent.gte(8) },
            style: { width: '800px', "min-height": '75px' },
        },
        17: {
            requirementDescription: "<h3>Pent 11",
            effectDescription() { return "Unlocks a new check back button." },
            done() { return player.r.pent.gte(11)},
            unlocked() { return hasUpgrade("i", 19)},
            style: { width: '800px', "min-height": '75px' },
        },
        18: {
            requirementDescription: "<h3>Pent 15",
            effectDescription() { return "Unlocks new grasshop studies." },
            done() { return player.r.pent.gte(15) },
            unlocked() { return hasUpgrade("i", 19)},
            style: { width: '800px', "min-height": '75px' },
        },
        19: {
            requirementDescription: "<h3>Pent 30",
            effectDescription() { return "Boosts tree and mod gain based on pent: Currently: " + format(player.r.pentMilestone30Effect) + "x and " + format(player.r.pentMilestone30Effect2) + "x respectively." },
            done() { return player.r.pent.gte(30) },
            unlocked() { return hasUpgrade("i", 19) },
            style: { width: '800px', "min-height": '75px' },
        },
    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", function () { return "Rank " + formatWhole(player.r.rank) + " (+" + formatWhole(player.r.ranksToGet) + ")"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["raw-html", function () { return "x" + format(player.r.rankEffect) + " Points" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "399px", height: "75px"}],
                        ["clickable", 11],
                    ], {width: "800px", height: "75px", backgroundColor: "#333333", border: "2px solid white", borderBottom: "0px", borderRadius: "15px 15px 0px 0px"}],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", function () { return "Tier " + formatWhole(player.r.tier) + " (+" + formatWhole(player.r.tiersToGet) + ")"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["raw-html", function () { return "x" + format(player.r.tierEffect) + " Points" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "399px", height: "75px"}],
                        ["clickable", 12],
                    ], () => {return hasUpgrade("i", 13) ? {width: "800px", height: "75px", backgroundColor: "#333333", border: "2px solid white", borderBottom: "0px", borderRadius: "0px"} : {width: "800px", height: "75px", backgroundColor: "#333333", border: "2px solid white", borderRadius: "0px 0px 15px 15px"}}],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", function () { return "Tetr " + formatWhole(player.r.tetr) + " (+" + formatWhole(player.r.tetrsToGet) + ")"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["raw-html", function () { return "x" + format(player.r.tetrEffect) + " Points" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "399px", height: "75px"}],
                        ["clickable", 13],
                    ], () => {return hasUpgrade("i", 13) ? {width: "800px", height: "75px", backgroundColor: "#333333", border: "2px solid white", borderRadius: "0px 0px 15px 15px"} : {display: "none !important"}}],
                    ["style-column", [
                        ["raw-html", function () { return "Total Mult: x" + format(player.r.rankEffect.mul(player.r.tierEffect.mul(player.r.tetrEffect))) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ], {width: "400px", height: "50px", backgroundColor: "#333333", border: "2px solid white", borderTop: "0px", borderRadius: "0px 0px 15px 15px"}],
                ]

            },
            "Pent": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("i", 18) },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["style-column", [
                            ["raw-html", function () { return "Pent " + formatWhole(player.r.pent) + " (+" + formatWhole(player.r.pentToGet) + ")"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["raw-html", function () { return "x" + format(player.r.pentEffect) + " Prestige Points" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ["raw-html", function () { return inChallenge("ip", 14) ? "/" + format(player.r.challengeIVEffect) + " Points" : "" }, {color: "red", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "399px", height: "100px"}],
                        ["clickable", 14],
                    ], {width: "800px", height: "100px", backgroundColor: "#333333", border: "2px solid white", borderBottom: "2px solid white", borderRadius: "15px"}],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>Milestones" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["milestone", 11]]],
                    ["row", [["milestone", 12]]],
                    ["row", [["milestone", 13]]],
                    ["row", [["milestone", 14]]],
                    ["row", [["milestone", 15]]],
                    ["row", [["milestone", 16]]],
                    ["row", [["milestone", 17]]],
                    ["row", [["milestone", 18]]],
                    ["row", [["milestone", 19]]],
                ]
            },
            "Time Reversal": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "grey", backgroundColor: "#d82cd4"}},
                unlocked() { return hasUpgrade("i", 26) },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["row", [["clickable", 15], ["clickable", 16]]],
                        ["style-column", [
                            ["raw-html", function () { return "When time is reversed, points are drained and all pre-OTF resource production stops." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ], {width: "490px", paddingLeft: "5px", paddingRight: "5px"}],
                    ], {width: "700px", backgroundColor: "#333333", border: "2px solid white", borderBottom: "2px solid white", borderRadius: "15px"}],
                    ["blank", "25px"],
                    ["style-column", [
                        ["style-column", [
                            ["raw-html", function () { return "You have " + format(player.r.timeCubes) + " time cubes (" + format(player.r.timeCubesPerSecond) + "/s)" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                        ], {width: "650px", height: "50px", borderBottom: "2px solid #d82cd4"}],
                        ["style-column", [
                            ["raw-html", function () { return "Points: x" + format(player.r.timeCubeEffects[0]) }, () => { return player.points.gte("1e1000") ? {color: "white", fontSize: "20px", fontFamily: "monospace"} : {color: "grey", fontSize: "20px", fontFamily: "monospace"} }],
                            ["raw-html", function () { return "Tree: x" + format(player.r.timeCubeEffects[1]) }, () => { return player.points.gte("1e1000") ? {color: "white", fontSize: "20px", fontFamily: "monospace"} : {color: "grey", fontSize: "20px", fontFamily: "monospace"} }],
                            ["raw-html", function () { return "Grass: x" + format(player.r.timeCubeEffects[2]) }, () => { return player.points.gte("1e1000") ? {color: "white", fontSize: "20px", fontFamily: "monospace"} : {color: "grey", fontSize: "20px", fontFamily: "monospace"} }],
                            ["raw-html", function () { return "Fertilizer: x" + format(player.r.timeCubeEffects[3]) }, () => { return player.points.gte("1e1000") ? {color: "white", fontSize: "20px", fontFamily: "monospace"} : {color: "grey", fontSize: "20px", fontFamily: "monospace"} }],
                            ["raw-html", function () { return "(Only active at >1e1,000 Points)" }, { color: "white", fontSize: "16px", fontFamily: "monospace" }],        
                        ], {width: "650px", height: "125px"}],
                    ], {width: "650px", height:"175px", backgroundColor: "#561154", border: "2px solid #d82cd4", borderRadius: "15px"}],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14]]],
                    ["blank", "25px"],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.gain) + "</h3> celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 11) }
})