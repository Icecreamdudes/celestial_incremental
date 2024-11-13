addLayer("gh", {
    name: "Grasshop", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "GH", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        grasshoppers: new Decimal(0),
        grasshoppersToGet: new Decimal(0),
        grasshopPause: new Decimal(0),

        grasshopperEffects: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),],

        fertilizer: new Decimal(0),
        fertilizerEffect: new Decimal(0),
        fertilizerPerSecond: new Decimal(0),

        steel: new Decimal(0),
        steelEffect: new Decimal(0),
        steelToGet: new Decimal(0),
        steelPause: new Decimal(0),

        studyMax: false,
        steelMax: false,
    }
    },
    automate() {
        if (hasMilestone("ip", 17))
        {
            buyBuyable("gh", 11)
            buyBuyable("gh", 12)
            buyBuyable("gh", 13)
            buyBuyable("gh", 14)
            buyBuyable("gh", 15)
            buyBuyable("gh", 16)
            buyBuyable("gh", 17)
            buyBuyable("gh", 18)
            buyBuyable("gh", 19)
            buyBuyable("gh", 21)
            buyBuyable("gh", 22)
            buyBuyable("gh", 23)
            buyBuyable("gh", 24)
        }
    },
    nodeStyle() {
    },
    tooltip: "Grasshop",
    color: "#19e04d",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.gh.grasshoppersToGet.lt(50000))  player.gh.grasshoppersToGet = player.g.grass.div(10000).pow(0.55)
        if (player.gh.grasshoppersToGet.gte(50000))  player.gh.grasshoppersToGet = player.g.grass.div(15000).pow(0.45).add(10000)
        player.gh.grasshoppersToGet = player.gh.grasshoppersToGet.mul(player.cb.uncommonPetEffects[0][1])
        player.gh.grasshoppersToGet = player.gh.grasshoppersToGet.mul(player.d.diceEffects[6])
        if (player.po.rocketFuel) player.gh.grasshoppersToGet = player.gh.grasshoppersToGet.mul(player.rf.rocketFuelEffect)
        player.gh.grasshoppersToGet = player.gh.grasshoppersToGet.mul(player.cb.rarePetEffects[3][0])
        if (hasUpgrade("ad", 16) && !inChallenge("ip", 14)) player.gh.grasshoppersToGet = player.gh.grasshoppersToGet.mul(upgradeEffect("ad", 16))
        if (inChallenge("ip", 13) || player.po.hex) player.gh.grasshoppersToGet = player.gh.grasshoppersToGet.mul(buyableEffect("h", 15))
        if (hasUpgrade("ip", 32) && !inChallenge("ip", 14)) player.gh.grasshoppersToGet = player.gh.grasshoppersToGet.mul(upgradeEffect("ip", 32))
        if (inChallenge("ip", 15)) player.gh.grasshoppersToGet = player.gh.grasshoppersToGet.pow(0.85)
        if (hasUpgrade("d", 14)) player.gh.grasshoppersToGet = player.gh.grasshoppersToGet.mul(upgradeEffect("d", 14))
        if (inChallenge("ip", 18)) player.gh.grasshoppersToGet = player.gh.grasshoppersToGet.pow(0.6)
        if (inChallenge("tad", 11)) player.gh.grasshoppersToGet = player.gh.grasshoppersToGet.pow(0.35)
        if (inChallenge("tad", 11)) player.gh.grasshoppersToGet = player.gh.grasshoppersToGet.pow(buyableEffect("de", 16))
        if (hasUpgrade("de", 11) && inChallenge("tad", 11)) player.gh.grasshoppersToGet = player.gh.grasshoppersToGet.mul(upgradeEffect("de", 11))
        player.gh.grasshoppersToGet = player.gh.grasshoppersToGet.mul(player.gh.steelEffect)
        player.gh.grasshoppersToGet = player.gh.grasshoppersToGet.pow(buyableEffect("rm", 27))
        player.gh.grasshoppersToGet = player.gh.grasshoppersToGet.div(player.po.halterEffects[6])

        if (inChallenge("ip", 12) && player.gh.grasshoppers.gt(1))
        {
            player.gh.grasshoppers = player.gh.grasshoppers.sub(player.gh.grasshoppers.mul(player.pe.pestEffect[7] * delta))
        }

        if (hasMilestone("ip", 22)) player.gh.grasshoppers = player.gh.grasshoppers.add(player.gh.grasshoppersToGet.mul(Decimal.mul(delta, 0.1)))

        if (player.gh.grasshopPause.gt(0)) {
            layers.gh.grasshopReset();
        }
        player.gh.grasshopPause = player.gh.grasshopPause.sub(1)

        player.gh.grasshopperEffects[0] = player.gh.grasshoppers.pow(1.1).pow(1.25).add(1)
        player.gh.grasshopperEffects[1] = player.gh.grasshoppers.div(1.2).pow(1.2).add(1)
        player.gh.grasshopperEffects[2] = player.gh.grasshoppers.div(1.7).pow(1.15).add(1)
        player.gh.grasshopperEffects[3] = player.gh.grasshoppers.div(2).pow(1.1).add(1)
        player.gh.grasshopperEffects[4] = player.gh.grasshoppers.div(4).pow(0.5).add(1)

        player.gh.fertilizerEffect = player.gh.fertilizer.pow(0.4).div(10).add(1)
        player.gh.fertilizerPerSecond = player.gh.grasshoppers.pow(1.4).div(10)
        player.gh.fertilizerPerSecond = player.gh.fertilizerPerSecond.mul(player.cb.uncommonPetEffects[0][2])
        player.gh.fertilizerPerSecond = player.gh.fertilizerPerSecond.mul(player.cb.rarePetEffects[0][0])
        player.gh.fertilizerPerSecond = player.gh.fertilizerPerSecond.mul(player.d.diceEffects[7])
        player.gh.fertilizerPerSecond = player.gh.fertilizerPerSecond.mul(player.rf.abilityEffects[3])
        if (hasUpgrade("ad", 16) && !inChallenge("ip", 14)) player.gh.fertilizerPerSecond = player.gh.fertilizerPerSecond.mul(upgradeEffect("ad", 16))
        player.gh.fertilizerPerSecond = player.gh.fertilizerPerSecond.div(player.pe.pestEffect[6])
        if (inChallenge("ip", 13) || player.po.hex) player.gh.fertilizerPerSecond = player.gh.fertilizerPerSecond.mul(buyableEffect("h", 16))
        player.gh.fertilizerPerSecond = player.gh.fertilizerPerSecond.mul(buyableEffect("gh", 34))
        player.gh.fertilizerPerSecond = player.gh.fertilizerPerSecond.mul(player.r.timeCubeEffects[3])
        player.gh.fertilizerPerSecond = player.gh.fertilizerPerSecond.div(player.po.halterEffects[7])

        player.gh.fertilizer = player.gh.fertilizer.add(player.gh.fertilizerPerSecond.mul(delta))

        //steel
        player.gh.steelToGet = player.m.codeExperience.pow(0.08)
        if (hasUpgrade("bi", 107)) player.gh.steelToGet = player.gh.steelToGet.mul(upgradeEffect("bi", 107))
        player.gh.steelToGet = player.gh.steelToGet.mul(buyableEffect("p", 14))
        player.gh.steelToGet = player.gh.steelToGet.mul(buyableEffect("id", 21))
        player.gh.steelToGet = player.gh.steelToGet.mul(player.rm.realmModsEffect[1])
        player.gh.steelToGet = player.gh.steelToGet.mul(buyableEffect("oi", 21))
        player.gh.steelToGet = player.gh.steelToGet.mul(player.cb.evolvedEffects[6][0])
        player.gh.steelToGet = player.gh.steelToGet.mul(player.cb.rarePetEffects[5][0])

        player.gh.steelEffect = player.gh.steel.pow(0.75).add(1)

        if (player.gh.steelPause.gt(0)) {
            layers.gh.steelieReset();
        }

        player.gh.steelPause = player.gh.steelPause.sub(1)
    },
    branches() {
        return player.po.realmMods ? ["cb", "g", "p"] : ["g"]
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "i"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.gh.studyMax == false },
            unlocked() { return true },
            onClick() {
                player.gh.studyMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.gh.studyMax == true  },
            unlocked() { return true },
            onClick() {
                player.gh.studyMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        4: {
            title() { return "Buy Max On" },
            canClick() { return player.gh.steelMax == false },
            unlocked() { return true },
            onClick() {
                player.gh.steelMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        5: {
            title() { return "Buy Max Off" },
            canClick() { return player.gh.steelMax == true  },
            unlocked() { return true },
            onClick() {
                player.gh.steelMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        11: {
            title() { return "<h3>Grasshop, but reset everything except pent. <br>(Req: 10,000 Grass and 1e35 Celestial Points)" },
            canClick() { return player.gh.grasshoppersToGet.gte(1) && player.points.gte(1e35) },
            unlocked() { return true },
            onClick() {
                player.gh.grasshopPause = new Decimal(3)
                player.gh.grasshoppers = player.gh.grasshoppers.add(player.gh.grasshoppersToGet)

                player.pe.pests = player.pe.pests.mul(0.9)
            },
            style: { width: '400px', "min-height": '100px' },
        },
        12: {
            title() { return "<h3>Steelie, but reset everything before unlocking OTFs. (based on code experience)" },
            canClick() { return player.gh.steelToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.gh.steelPause = new Decimal(5)
                player.gh.steel = player.gh.steel.add(player.gh.steelToGet)
            },
            style: { width: '400px', "min-height": '100px' },
        },
    },
    grasshopReset()
    {
        player.points = new Decimal(10)
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

        player.p.prestigePoints = new Decimal(0)

        if (!hasMilestone("ip", 11))
        {
            for (let i = 0; i < player.p.upgrades.length; i++) {
                if (+player.p.upgrades[i] < 24) {
                    player.p.upgrades.splice(i, 1);
                    i--;
                }
            }
        }

        for (let i = 11; i < 19; i++) {
            player.t.buyables[i] = new Decimal(0)
        }

        player.f.factorPower = new Decimal(0)

        player.t.leaves = new Decimal(0)
        player.t.trees = new Decimal(0)

        for (let i = 11; i < 19; i++) {
            player.g.buyables[i] = new Decimal(0)
        }

        if (!hasMilestone("ip", 11))
        {
        for (let i = 0; i < player.g.upgrades.length; i++) {
            if (+player.g.upgrades[i] < 17) {
                player.g.upgrades.splice(i, 1);
                i--;
            }
        }
    }
        player.g.grass = new Decimal(0)
        player.g.savedGrass = new Decimal(0)
        player.g.grassCount = new Decimal(0)
        player.g.grassTimer = new Decimal(0)

        player.g.goldGrass = new Decimal(0)
        player.g.savedGoldGrass = new Decimal(0)
        player.g.goldGrassCount = new Decimal(0)
        player.g.goldGrassTimer = new Decimal(0)

    },
    steelieReset()
    {
        player.pe.pests = new Decimal(0)
        player.points = new Decimal(10)
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        player.r.tetr = new Decimal(0)
        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
        player.r.tetrsToGet = new Decimal(0)
        player.r.pentToGet = new Decimal(0)
        player.r.pent = new Decimal(0)

        player.f.factorUnlocks = [true, true, true, false, false, false, false, false]
        player.f.factorGain = new Decimal(1)

        player.f.factorPower = new Decimal(0)
        player.f.factorPowerEffect = new Decimal(1)
        player.f.factorPowerPerSecond = new Decimal(0)
        player.f.powerFactorUnlocks = [true, true, true, false, false, false, false, false]
        for (let i = 1; i < 9; i++) {
            player.f.buyables[i] = new Decimal(0)
        }
        for (let i = 11; i < 20; i++) {
            player.f.buyables[i] = new Decimal(0)
        }
        for (let i = 21; i < 30; i++) {
            player.f.buyables[i] = new Decimal(0)
        }
        for (let i = 31; i < 37; i++) {
            player.f.buyables[i] = new Decimal(0)
        }

        player.p.prestigePoints = new Decimal(0)

        if (!hasMilestone("ip", 11) && !inChallenge("ip", 14))
        {
            for (let i = 0; i < player.p.upgrades.length; i++) {
                if (+player.p.upgrades[i] < 24) {
                    player.p.upgrades.splice(i, 1);
                    i--;
                }
            }
        }

        for (let i = 11; i < 19; i++) {
            player.t.buyables[i] = new Decimal(0)
        }

        player.f.factorPower = new Decimal(0)

        player.t.leaves = new Decimal(0)
        player.t.trees = new Decimal(0)

        for (let i = 11; i < 19; i++) {
            player.g.buyables[i] = new Decimal(0)
        }

        if (!hasMilestone("ip", 11) && !inChallenge("ip", 14))
        {
        for (let i = 0; i < player.g.upgrades.length; i++) {
            if (+player.g.upgrades[i] < 22) {
                player.g.upgrades.splice(i, 1);
                i--;
            }
        }
        }

        if (!hasMilestone("ip", 15) && !inChallenge("ip", 14))
        {
            for (let i = 0; i < player.r.milestones.length; i++) {
                if (+player.r.milestones[i] < 20) {
                    player.r.milestones.splice(i, 1);
                    i--;
                }
            }
        }

        player.g.grass = new Decimal(0)
        player.g.savedGrass = new Decimal(0)
        player.g.grassCount = new Decimal(0)
        player.g.grassTimer = new Decimal(0)

        player.g.goldGrass = new Decimal(0)
        player.g.savedGoldGrass = new Decimal(0)
        player.g.goldGrassCount = new Decimal(0)
        player.g.goldGrassTimer = new Decimal(0)

        player.gh.grasshoppers = new Decimal(0)
        player.gh.fertilizer = new Decimal(0)

        for (let i = 11; i < 20; i++) {
            player.gh.buyables[i] = new Decimal(0)
        }
        player.gh.buyables[21] = new Decimal(0)
        player.gh.buyables[22] = new Decimal(0)

        player.m.codeExperience = new Decimal(0)
        player.m.linesOfCode = new Decimal(0)
        player.m.mods = new Decimal(0)

        for (let i = 11; i < 15; i++) {
            player.m.buyables[i] = new Decimal(0)
        }
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/5<br/>Grass Study I"
            },
            display() {
                return "<h4>which produce " + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + "% of grass value per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: { width: '150px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(8) },
            purchaseLimit() { return new Decimal(8) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[11].gte(1) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/8<br/>Grass Study II"
            },
            display() {
                return "<h4>which are dividing golden grass time requirement by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [11],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: { width: '150px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(5).pow(2.5).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[11].gte(1) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/40<br/>Tree Study I"
            },
            display() {
                return "<h4>which are extending tree softcap by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [11],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: { width: '150px', height: '150px', }
        },
        14: {
            costBase() { return new Decimal(250) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01) },
            unlocked() { return true},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[13].gte(1) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/100<br/>Prestige Study I"
            },
            display() {
                return "<h4>which produce " + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + "% of prestige points per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [13],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: { width: '150px', height: '150px', }
        },
        15: {
            costBase() { return new Decimal(300) },
            costGrowth() { return new Decimal(1.8) },
            purchaseLimit() { return new Decimal(8) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return false },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[12].gte(1) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/8<br/>Grass Study III"
            },
            display() {
                return "<h4>Unlocks the next grass factor.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [12],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: { width: '150px', height: '150px', }
        },
        16: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[14].gte(1) && player.gh.buyables[15].gte(1) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/20<br/>Factor Study I"
            },
            display() {
                return "<h4>which add +" + format(tmp[this.layer].buyables[this.id].effect) + " to the factor effect base.\n\
                Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [14, 15],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: { width: '150px', height: '150px', }
        },
        17: {
            costBase() { return new Decimal(1e8) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(200) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(5).pow(2).add(1) },
            unlocked() { return hasMilestone("r", 14) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[13].gte(1) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/200<br/>Tree Study II"
            },
            display() {
                return "<h4>which are boosting leaf gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [13],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: { width: '150px', height: '150px', }
        },
        18: {
            costBase() { return new Decimal(2e8) },
            costGrowth() { return new Decimal(4) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.005) },
            unlocked() { return hasMilestone("r", 14) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[16].gte(1) && player.gh.buyables[15].gte(1)},
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/100<br/>Grass Study IV"
            },
            display() {
                return "<h4>which produce " + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + "% of golden grass value per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [16, 15],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: { width: '150px', height: '150px', }
        },
        19: {
            costBase() { return new Decimal(5e8) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(5) },
            unlocked() { return hasMilestone("r", 14) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[14].gte(1) && player.gh.buyables[18].gte(1)},
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/1,000<br/>Mod Study I"
            },
            display() {
                return "<h4>which are extending mod softcap by +" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [14, 18],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: { width: '150px', height: '150px', }
        },
        21: {
            costBase() { return new Decimal(1e16) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(200) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return hasMilestone("r", 18) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[19].gte(1)},
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/200<br/>Check Back Study I"
            },
            display() {
                return "<h4>which multiplying check back xp gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [19],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: { width: '150px', height: '150px', }
        },
        22: {
            costBase() { return new Decimal(1e19) },
            costGrowth() { return new Decimal(1000) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return hasMilestone("r", 18) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[19].gte(1)},
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/50<br/>Check Back Study II"
            },
            display() {
                return "<h4>which dividing xp button cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [21, 18],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: { width: '150px', height: '150px', }
        },
        23: {
            costBase() { return new Decimal(1e30) },
            costGrowth() { return new Decimal(1e10) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return hasChallenge("ip", 11) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[15].gte(1)},
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/50<br/>Antimatter Study I"
            },
            display() {
                return "<h4>which are boosting antimatter dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [15],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: { width: '150px', height: '150px', }
        },
        24: {
            costBase() { return new Decimal(1e40) },
            costGrowth() { return new Decimal(1e15) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.gh.fertilizer},
            pay(amt) { if (!hasMilestone("ip", 17)) player.gh.fertilizer = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1) },
            unlocked() { return hasChallenge("ip", 11) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) && player.gh.buyables[23].gte(1)&& player.gh.buyables[22].gte(1)},
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/100<br/>Antimatter Study II"
            },
            display() {
                return "<h4>which are boosting antimatter by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            branches: [22, 23],
            buy() {
                if (player.gh.studyMax == false && !hasMilestone("ip", 17)) {
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
            style: { width: '150px', height: '150px', }
        },

        //Steel
        31: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.1) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(7).pow(1.3).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Point Reinforcer"
            },
            display() {
                return "which are multiplying point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
            },
            buy() {
                if (player.gh.steelMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        32: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.125) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(1.6).pow(1.2).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Leaf and Tree Reinforcer"
            },
            display() {
                return "which are multiplying leaf and tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
            },
            buy() {
                if (player.gh.steelMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        33: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(1.15) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(4).pow(1.15).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Grass Reinforcer"
            },
            display() {
                return "which are multiplying grass gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
            },
            buy() {
                if (player.gh.steelMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        34: {
            costBase() { return new Decimal(350) },
            costGrowth() { return new Decimal(1.175) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(3).pow(1.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Fertilizer Reinforcer"
            },
            display() {
                return "which are multiplying fertilizer gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
            },
            buy() {
                if (player.gh.steelMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },


        35: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.2) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(8).pow(1.3).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Animatter Reinforcer"
            },
            display() {
                return "which are multiplying antimatter gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
            },
            buy() {
                if (player.gh.steelMax == false ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        36: {
            costBase() { return new Decimal(1500) },
            costGrowth() { return new Decimal(1.25) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(3).pow(1.26).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Dimension Power Reinforcer"
            },
            display() {
                return "which are multiplying all dimension power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
            },
            buy() {
                if (player.gh.steelMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        37: {
            costBase() { return new Decimal(2500) },
            costGrowth() { return new Decimal(1.3) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.6).pow(1.05).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Antimatter Dimension Reinforcer"
            },
            display() {
                return "which are multiplying all antimatter dimension production by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
            },
            buy() {
                if (player.gh.steelMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        38: {
            costBase() { return new Decimal(4000) },
            costGrowth() { return new Decimal(1.35) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.03).pow(0.8).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Infinity Point Reinforcer"
            },
            display() {
                return "which are multiplying infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
            },
            buy() {
                if (player.gh.steelMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

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
            "Main": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h1>Effects" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h2>Celestial Points: x" + format(player.gh.grasshopperEffects[0]) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h2>Factor Power: x" + format(player.gh.grasshopperEffects[1]) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h2>Prestige Points: x" + format(player.gh.grasshopperEffects[2]) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h2>Leaf Gain: x" + format(player.gh.grasshopperEffects[3]) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h2>Grass Value: x" + format(player.gh.grasshopperEffects[4]) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                ]

            },
            "Upgrade Tree": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["raw-html", function () { return "You have <h3>" + format(player.gh.fertilizer) + "</h3> fertilizer, which boosts grass value by x" + format(player.gh.fertilizerEffect) + "." }, { "color": "#19e04d", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You are gaining <h3>" + format(player.gh.fertilizerPerSecond) + "</h3> fertilizer per second." }, { "color": "#19e04d", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["raw-html", function () { return "&nbsp;&nbsp;&nbsp;&nbsp;" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }], ["buyable", 12], ["raw-html", function () { return "&nbsp;&nbsp;&nbsp;&nbsp;" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }], ["buyable", 15], ["raw-html", function () { return "&nbsp;&nbsp;&nbsp;&nbsp;" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }], ["buyable", 23]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 13], ["raw-html", function () { return "&nbsp;&nbsp;&nbsp;&nbsp;" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }], ["buyable", 16], ["raw-html", function () { return "&nbsp;&nbsp;&nbsp;&nbsp;" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }], ["buyable", 18]["raw-html", function () { return hasMilestone("r", 14) ? "&nbsp;&nbsp;&nbsp;&nbsp;" : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }], ["buyable", 18], ["raw-html", function () { return hasMilestone("r", 17) ? "&nbsp;&nbsp;&nbsp;&nbsp;" : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }], ["buyable", 22], ["raw-html", function () { return "&nbsp;&nbsp;&nbsp;&nbsp;" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }], ["buyable", 24],]],
                    ["blank", "25px"],
                    ["row", [["buyable", 17], ["raw-html", function () { return hasMilestone("r", 14) ? "&nbsp;&nbsp;&nbsp;&nbsp;" : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }], ["buyable", 14], ["raw-html", function () { return hasMilestone("r", 14) ? "&nbsp;&nbsp;&nbsp;&nbsp;" : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }], ["buyable", 19], ["raw-html", function () { return hasMilestone("r", 17) ? "&nbsp;&nbsp;&nbsp;&nbsp;" : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }], ["buyable", 21],]],
                ]

            },
            "Steelie": {
                buttonStyle() { return { 'color': 'white', 'border-color': "black", 'background': 'grey', } },
                unlocked() { return hasUpgrade("i", 22) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.gh.steel) + "</h3> steel." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + format(player.gh.steelToGet) + "</h3> steel on reset."}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Steel boosts grasshoper gain by <h3>" + format(player.gh.steelEffect) + "</h3>x."}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 12]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 4], ["clickable", 5]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 31], ["buyable", 32], ["buyable", 33], ["buyable", 34]]],
                    ["row", [["buyable", 35], ["buyable", 36], ["buyable", 37], ["buyable", 38]]],
                ]

            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.g.grass) + "</h3> grass, which boost leaf gain by <h3>x" + format(player.g.grassEffect) + "." }, { "color": "white", "font-size": "12px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + format(player.gh.grasshoppers) + "</h3> grasshoppers." }, { "color": "#19e04d", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.gh.grasshoppersToGet.gt(1) ? "You will gain <h3>" + format(player.gh.grasshoppersToGet) + "</h3> grasshoppers on reset." : ""}, { "color": "#19e04d", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasMilestone("r", 12) }
})
