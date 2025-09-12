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
        tetrEffect2: new Decimal(1),
        tetrsToGet: new Decimal(0),

        //PENT
        pent: new Decimal(0),
        pentReq: new Decimal(1e28),
        pentEffect: new Decimal(1),
        pentToGet: new Decimal(0),
        pentPause: new Decimal(0),

        pentMilestone9Effect: [new Decimal(1), new Decimal(1)],
        pentMilestone11Effect: new Decimal(1),
        pentMilestone13Effect: new Decimal(1),
        pentMilestone15Effect: new Decimal(1),
        pentMilestone18Effect: new Decimal(1),

        challengeIVEffect: new Decimal(1),

        //Time rev
        timeReversed: false,

        timeCubes: new Decimal(0),
        timeCubesEffect: new Decimal(1),
        timeCubesPerSecond: new Decimal(0),
        timeMax: false,

        timeCubeEffects: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
    }},
    automate() {
        if (hasMilestone("s", 16))
        {
            buyBuyable("r", 11)
            buyBuyable("r", 12)
            buyBuyable("r", 13)
            buyBuyable("r", 14)
        }
    },
    nodeStyle() {},
    tooltip: "Ranks",
    color: "#eaf6f7",
    update(delta) {
        let onepersec = new Decimal(1)

        //Rank and Tier effects/costs

        let ranksGainPreS = player.points.div(10).mul(levelableEffect("pet", 204)[0]).pow(Decimal.div(20, 29)).floor()
        let ranksGainPostS = player.points.div(10).mul(levelableEffect("pet", 204)[0]).pow(0.25).floor()
        let ranksGainPostS2 = player.points.div(10).mul(levelableEffect("pet", 204)[0]).pow(Decimal.div(1, 10)).floor()
        let ranksGainHardcap = player.points.plus(1).mul(levelableEffect("pet", 204)[0]).log10().div(10).pow(Decimal.div(1, 50)).floor()
        let ranksGainPostS3 = Decimal.pow(10, player.points.div("1e100000").mul(levelableEffect("pet", 204)[0]).log("1e100")).mul("1e4000")

        player.r.rankEffect = player.r.rank.mul(0.4).add(1).pow(1.055)
        if (hasUpgrade("ad", 13)) player.r.rankEffect = player.r.rankEffect.mul(upgradeEffect("ad", 13))
        player.r.rankEffect = player.r.rankEffect.pow(player.p.crystalEffect)
        if (hasUpgrade("hpw", 1012)) player.r.rankEffect = player.r.rankEffect.pow(1.18)
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
        if (player.points.gte(player.r.rankReq) && player.r.rank.add(player.r.ranksToGet).gt("1e4000") && hasUpgrade("p", 14) && !hasUpgrade("cs", 101)) {
            player.r.ranksToGet = ranksGainHardcap.sub(player.r.rank).add("1e4000")
        }
        if (player.points.gte(player.r.rankReq) && player.r.rank.add(player.r.ranksToGet).gt("1e4000") && hasUpgrade("p", 14) && hasUpgrade("cs", 101)) {
            player.r.ranksToGet = ranksGainPostS3.sub(player.r.rank)
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
        if (hasUpgrade("hpw", 1012)) player.r.tierEffect = player.r.tierEffect.pow(1.18)
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
        if (hasUpgrade("hpw", 1012)) player.r.tetrEffect = player.r.tetrEffect.pow(1.18)
        
        player.r.tetrEffect2 = player.r.tetr.pow(0.6).add(1)
        player.r.tetrEffect2 = player.r.tetrEffect2.pow(player.p.crystalEffect)
        if (hasUpgrade("hpw", 1012)) player.r.tetrEffect2 = player.r.tetrEffect2.pow(1.18)
        player.r.tetrReq = layers.r.getTetrReq()
        if (player.r.tier.gte(player.r.tetrReq) && hasUpgrade("p", 14)) {
            player.r.tetrsToGet = tetrGain.sub(player.r.tetr)
        }
        if (!hasUpgrade("p", 14)) player.r.tetrsToGet = new Decimal(1)
        if (player.r.tier.lt(player.r.tetrReq)) {
            player.r.tetrsToGet = new Decimal(0)
        }
        if (hasUpgrade("p", 22)) {
            player.r.tetr = player.r.tetr.add(player.r.tetrsToGet)
        }

        player.r.pentEffect = player.r.pent.add(1).pow(3)
        if (hasUpgrade("cs", 102)) player.r.pentEffect = player.r.pentEffect.mul(Decimal.pow(1.08, player.r.pent))
        player.r.pentEffect = player.r.pentEffect.pow(player.p.crystalEffect)
        if (hasUpgrade("hpw", 1012)) player.r.pentEffect = player.r.pentEffect.pow(1.18)
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
                player.r.pentToGet = Decimal.ln(player.points.mul(buyableEffect("g", 19))).div(Decimal.ln(1e10)).add(1).floor().sub(player.r.pent)
            }
        }
        if (player.points.lt(player.r.pentReq)) {
            player.r.pentToGet = new Decimal(0)
        }

        player.r.pentMilestone9Effect = [player.r.pent.pow(2).add(1), player.r.pent.pow(1.2).add(1)]
        if (player.r.pent.gt(12500)) {player.r.pentMilestone11Effect = Decimal.pow(100, player.r.pent.sub(12500).div(2500))} else {player.r.pentMilestone11Effect = new Decimal(1)}
        if (player.r.pent.gt(17500)) {player.r.pentMilestone13Effect = Decimal.pow(100, player.r.pent.sub(17500).div(2500))} else {player.r.pentMilestone13Effect = new Decimal(1)}
        if (player.r.pent.gt(22500)) {
            player.r.pentMilestone15Effect = Decimal.pow(10, player.r.pent.sub(22500).div(2500))
            if (player.r.pent.gte(150000)) player.r.pentMilestone15Effect = Decimal.pow(10, player.r.pent.div(25000)).mul(1e45)
        } else {player.r.pentMilestone15Effect = new Decimal(1)}
        player.r.pentMilestone18Effect = player.r.timeCubes.add(1).log(1000).div(10).add(1)

        player.r.challengeIVEffect = Decimal.pow(400, player.r.pent)

        if (hasUpgrade("i", 32) && !inChallenge("ip", 14) && player.points.gte(player.r.pentReq)) {
            player.r.pent = player.r.pent.add(player.r.pentToGet)
        } else if (hasUpgrade("i", 27) && player.points.gte(player.r.pentReq)) {
            player.r.pent = player.r.pent.add(1)
        }

        //Time reversal

        if (!player.r.timeReversed && !hasUpgrade("ma", 14)) {
            player.r.timeCubesPerSecond = new Decimal(0)
        } else {
            player.r.timeCubesPerSecond = player.points.plus(1).log10().pow(0.3)
            player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(buyableEffect("id", 23))
            player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(buyableEffect("oi", 23))
            player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(levelableEffect("pet", 209)[2])
            if (hasUpgrade("ep0", 12)) player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(upgradeEffect("ep0", 12))
            if (hasUpgrade("s", 14)) player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(upgradeEffect("s", 14))
            player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(player.d.diceEffects[17])
            player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(levelableEffect("pu", 207)[1])
            player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.mul(player.i.postOTFMult)

            // EXPONENTS
            if (hasUpgrade("cs", 103)) player.r.timeCubesPerSecond = player.r.timeCubesPerSecond.pow(1.1)
        }

        player.r.timeCubes = player.r.timeCubes.add(player.r.timeCubesPerSecond.mul(delta))

        if (player.points.gte("1e1000")) {
            player.r.timeCubesEffect = player.r.timeCubes.pow(1.15)
        } else {
            player.r.timeCubesEffect = new Decimal(0)
        }

        if (!hasMilestone("r", 27)) {
            player.r.timeCubeEffects[0] = player.r.timeCubesEffect.pow(1.15).mul(100).add(1)
            player.r.timeCubeEffects[1] = player.r.timeCubesEffect.pow(1.1).mul(10).add(1)
            player.r.timeCubeEffects[2] = player.r.timeCubesEffect.pow(0.9).mul(6).add(1)
            player.r.timeCubeEffects[3] = player.r.timeCubesEffect.pow(0.7).mul(3).add(1)
        } else {
            player.r.timeCubeEffects[0] = player.r.timeCubesEffect.pow(2.3).mul(100).add(1)
            player.r.timeCubeEffects[1] = player.r.timeCubesEffect.pow(2.2).mul(10).add(1)
            player.r.timeCubeEffects[2] = player.r.timeCubesEffect.pow(1.8).mul(6).add(1)
            player.r.timeCubeEffects[3] = player.r.timeCubesEffect.pow(1.4).mul(3).add(1)
        }

        for (let i = 0; i < 4; i++) {
            player.r.timeCubeEffects[i] = player.r.timeCubeEffects[i].pow(player.cs.scraps.point.effect)
        }
    },
    getRankReq() {
        if (player.r.rank.lte(20)) {
            return player.r.rank.add(1).pow(1.45).div(levelableEffect("pet", 204)[0]).mul(10)
        } else if (player.r.rank.gt(20) && player.r.rank.lte(100)) {
            return (player.r.rank.sub(17)).pow(4).div(levelableEffect("pet", 204)[0]).mul(10)
        } else if (player.r.rank.gt(100) && player.r.rank.lt("1e4000")) {
            return (player.r.rank.sub(97)).pow(10).div(levelableEffect("pet", 204)[0]).mul(10)
        } else if (player.r.rank.gte("1e4000") && !hasUpgrade("cs", 101)) {
            return Decimal.pow(10, player.r.rank.pow(50).mul(10)).div(levelableEffect("pet", 204)[0]).sub(1)
        } else if (player.r.rank.gte("1e4000") && hasUpgrade("cs", 101)) {
            return Decimal.pow("1e100", player.r.rank.div("1e4000").ln(10).div(Decimal.ln(10))).div(levelableEffect("pet", 204)[0]).mul("1e100000")
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
        if (hasMilestone("ip", 15) && !inChallenge("ip", 14)) {player.r.tetr = new Decimal(10)} else {player.r.tetr = new Decimal(0)}
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
                } else if (!hasUpgrade("cs", 101)) {
                    return "<h2>Reset celestial points, but rank up.</h2><br><h3><small style='color:darkred'>[HARDCAPPED]</small></h3>"
                } else {
                    return "<h2>Reset celestial points, but rank up.</h2><br><h3>Req: " + format(player.r.rankReq) + " Points<br><small style='color:darkred'>[SOFTCAPPED<sup>3</sup>]</small></h3>"
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
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.5).pow(1.2).add(1) },
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
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).pow(0.8).add(1) },
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
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.02).pow(0.75).add(1) },
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
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).pow(0.6).add(1) },
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
            effectDescription: "Autobuys grass buyables, and unlocks tree factor VI.<br>Second grass effect now multiplies celestial points.",
            done() { return player.r.pent.gte(3) },
            style: { width: '800px', "min-height": '75px' },
        },
        14: {
            requirementDescription: "<h3>Pent 5",
            effectDescription() { return "Unlock mods and new grasshopper studies." },
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
            done() { return player.r.pent.gte(11) && this.unlocked() },
            unlocked() { return layerShown("cb") },
            style: { width: '800px', "min-height": '75px' },
        },
        18: {
            requirementDescription: "<h3>Pent 15",
            effectDescription() { return "Unlocks new grasshopper studies." },
            done() { return player.r.pent.gte(15) && this.unlocked() },
            unlocked() { return layerShown("cb") },
            style: { width: '800px', "min-height": '75px' },
        },
        19: {
            requirementDescription: "<h3>Pent 30",
            effectDescription() { return "Boosts tree and mod gain based on pent.<br>Currently: x" + format(player.r.pentMilestone9Effect[0]) + " and x" + format(player.r.pentMilestone9Effect[1]) + " respectively" },
            done() { return player.r.pent.gte(30) && this.unlocked() },
            unlocked() { return layerShown("cb") },
            style: { width: '800px', "min-height": '75px' },
        },
        20: {
            requirementDescription: "<h3>Pent 10,000",
            effectDescription() { return "Good luck on increasing pent, you will need it.<br>Boosts Pre-OTF currencies by x100" },
            done() { return player.r.pent.gte(10000) && this.unlocked() },
            unlocked() { return hasUpgrade("s", 16) && layerShown("cb") },
            style: { width: '800px', "min-height": '75px' },
        },
        21: {
            requirementDescription: "<h3>Pent 12,500",
            effectDescription() { return "Boosts infinity points based on pent above 12,500.<br>Currently: x" + format(player.r.pentMilestone11Effect) },
            done() { return player.r.pent.gte(12500) && this.unlocked() },
            unlocked() { return hasUpgrade("s", 16) && hasMilestone("r", 20) },
            style: { width: '800px', "min-height": '75px' },
        },
        22: {
            requirementDescription: "<h3>Pent 15,000",
            effectDescription() { return "Unlocks more booster dice effects." },
            done() { return player.r.pent.gte(15000) && this.unlocked() },
            unlocked() { return hasUpgrade("s", 16) && hasMilestone("r", 21) },
            style: { width: '800px', "min-height": '75px' },
        },
        23: {
            requirementDescription: "<h3>Pent 17,500",
            effectDescription() { return "Boosts negative infinity points based on pent above 17,500.<br>Currently: x" + format(player.r.pentMilestone13Effect) },
            done() { return player.r.pent.gte(17500) && this.unlocked() },
            unlocked() { return hasUpgrade("s", 16) && hasMilestone("r", 22) },
            style: { width: '800px', "min-height": '75px' },
        },
        24: {
            requirementDescription: "<h3>Pent 20,000",
            effectDescription() { return "Unlocks even more booster dice effects." },
            done() { return player.r.pent.gte(20000) && this.unlocked() },
            unlocked() { return hasUpgrade("s", 16) && hasMilestone("r", 23) },
            style: { width: '800px', "min-height": '75px' },
        },
        25: {
            requirementDescription: "<h3>Pent 22,500",
            effectDescription() {
                let str = "Boosts singularity points based on pent above 22,500.<br>Currently: x" + format(player.r.pentMilestone15Effect)
                if (player.r.pent.gte(150000)) str = str.concat(" <small style='color:red'>[SOFTCAPPED]</small>")
                return str
            },
            done() { return player.r.pent.gte(22500) && this.unlocked() },
            unlocked() { return hasUpgrade("s", 16) && hasMilestone("r", 24) },
            style: { width: '800px', "min-height": '75px' },
        },
        26: {
            requirementDescription: "<h3>Pent 25,000",
            effectDescription() { return "Improve the negative infinity point formula." },
            done() { return player.r.pent.gte(25000) && this.unlocked() },
            unlocked() { return hasUpgrade("s", 16) && hasMilestone("r", 25) },
            style: { width: '800px', "min-height": '75px' },
        },
        27: {
            requirementDescription: "<h3>Pent 27,500",
            effectDescription() { return "Boosts time cubes effect by ^2." },
            done() { return player.r.pent.gte(27500) && this.unlocked() },
            unlocked() { return hasUpgrade("s", 16) && hasMilestone("r", 26) },
            style: { width: '800px', "min-height": '75px' },
        },
        28: {
            requirementDescription: "<h3>Pent 30,000",
            effectDescription() { return "Boosts moonstone value based on time cubes.<br>Currently: x" + format(player.r.pentMilestone18Effect) },
            done() { return player.r.pent.gte(30000) && this.unlocked() },
            unlocked() { return hasUpgrade("s", 16) && hasMilestone("r", 27) },
            style: { width: '800px', "min-height": '75px' },
        },
        29: {
            requirementDescription: "<h3>Pent 50,000",
            effectDescription() { return "Produce 0.2% of moonstone value per second." },
            done() { return player.r.pent.gte(50000) && this.unlocked() },
            unlocked() { return hasUpgrade("s", 16) && hasMilestone("r", 28) },
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
                            ["raw-html", () => {return "Tetr " + formatWhole(player.r.tetr) + " (+" + formatWhole(player.r.tetrsToGet) + ")"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                            ["raw-html", () => {return "x" + format(player.r.tetrEffect) + " Points" }, () => {
                                let look = {color: "white", fontFamily: "monospace"}
                                if (hasUpgrade("p", 16)) {look.fontSize = "16px"} else {look.fontSize = "20px"}
                                return look
                            }],
                            ["raw-html", () => {return hasUpgrade("p", 16) ? "x" + format(player.r.tetrEffect2) + " Factor Power" : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
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
                    ["milestone", 23],
                    ["milestone", 24],
                    ["milestone", 25],
                    ["milestone", 26],
                    ["milestone", 27],
                    ["milestone", 28],
                    ["milestone", 29],
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
                            ["raw-html", function () { return "<i>(Only active at >1e1,000 Points)</i>" }, { color: "#ddd", fontSize: "16px", fontFamily: "monospace" }],        
                        ], {width: "650px", height: "125px"}],
                    ], {width: "650px", height:"175px", backgroundColor: "#561154", border: "2px solid #d82cd4", borderRadius: "15px"}],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14]], {maxWidth: "1200px"}],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.gain) + "</h3> celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 11) }
})