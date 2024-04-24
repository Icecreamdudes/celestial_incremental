addLayer("h", {
    name: "Hex", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        hex: new Decimal(0),
        hexReq: new Decimal(1e70),
        hexPause: new Decimal(0),
        hexToGet: new Decimal(1),

        hexResetIndex: new Decimal(0),
        hexPoints: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        hexPointsEffect: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
        hexPointsToGet: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],

        automationTier: new Decimal(0),
        automationTierReq: new Decimal(1000),
        automationTierEffect: new Decimal(0),
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            "color": "white",
            "background-color": "black",
        }
    },
    tooltip: "Hex",
    color: "#d4d4d4",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.h.hexPause.gt(0)) {
            layers.h.hexReset();
        }
        player.h.hexPause = player.h.hexPause.sub(1)

        player.h.hexReq = Decimal.mul(1e70, Decimal.pow(1e20, player.h.hex))
        player.h.hexToGet = new Decimal(1)

        for (let i = 0; i < player.h.hex; i++)
        {
            if (i > 0) player.h.hexPointsEffect[i] = player.h.hexPoints[i].pow(0.6).add(1)
            if (i > 0) player.h.hexPointsToGet[i] = player.h.hexPoints[i-1].pow(0.3)
        }
        for (let i = 0; i < player.h.hex.sub(1); i++)
        {
            player.h.hexPointsToGet[i] = player.h.hexPointsToGet[i].mul(player.h.hexPointsEffect[i+1])
        }

        player.h.hexPointsToGet[0] = player.h.hex.pow(2).mul(player.h.hexPointsEffect[1])
        player.h.hexPoints[0] = player.h.hexPoints[0].add(player.h.hexPointsToGet[0].mul(delta))

        player.h.hexPointsEffect[0] = player.h.hexPoints[0].mul(1000).pow(1.5).add(1)

        player.h.automationTierReq = Decimal.mul(Decimal.pow(player.h.automationTier.add(1), 0.6), 100)
        player.h.automationTierEffect = player.h.automationTier.mul(0.1)

        for (let i = 0; i < player.h.automationTier; i++)
        {
            player.h.hexPoints[i+1] = player.h.hexPoints[i+1].add(player.h.hexPointsToGet[i+1].mul(player.h.automationTierEffect.mul(delta)))
        }
    },
    branches: ["t", "r"],
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
        11: {
            title() { return "<h2>Do the equivalent of a big crunch, but hex.<br>Req: " + formatWhole(player.h.hexReq) + " Points" },
            canClick() { return player.points.gte(player.h.hexReq) },
            unlocked() { return true },
            onClick() {
                player.h.hex = player.h.hex.add(player.h.hexToGet)
                player.h.hexPause = new Decimal(6)

                player.h.hexPoints[player.h.hex] = new Decimal(0)
                player.h.hexPointsToGet[player.h.hex] = new Decimal(0)
                player.h.hexPointsEffect[player.h.hex] = new Decimal(1)

                player.h.hexPoints.push(new Decimal(0))
                player.h.hexPointsToGet.push(new Decimal(0))
                player.h.hexPointsEffect.push(new Decimal(1))
            },
            style: { width: '400px', "min-height": '100px' },
        },
        12: {
            title() { return "<h3>Lower Hex" },
            canClick() { return player.h.hexResetIndex.gt(0) },
            unlocked() { return true },
            onClick() {
                player.h.hexResetIndex = player.h.hexResetIndex.sub(1)
            },
            style: { width: '100px', "min-height": '100px' },
        },
        13: {
            title() { return "<h3>Increase Hex" },
            canClick() { return player.h.hexResetIndex.lt(player.h.hex.sub(1)) },
            unlocked() { return true },
            onClick() {
                player.h.hexResetIndex = player.h.hexResetIndex.add(1)
            },
            style: { width: '100px', "min-height": '100px' },
        },
        14: {
            title() { return "<h2>Reset lower hex layers for hex " + formatWhole(player.h.hexResetIndex.add(1)) + " points." },
            canClick() { return player.h.hexResetIndex.gte(1) },
            unlocked() { return true },
            onClick() {
                layers.h.hexPointReset(player.h.hexResetIndex)
            },
            style: { width: '400px', "min-height": '100px' },
        },
        15: {
            title() { return "<h2>Reset all hex layers to automation tier up.<br>Req: " + format(player.h.automationTierReq) + " hex " + formatWhole(player.h.automationTier.add(3)) + " points." },
            canClick() { return player.h.hexPoints[player.h.automationTier.add(2)].gte(player.h.automationTierReq) },
            unlocked() { return true },
            onClick() {
                layers.h.automationTierReset()
                player.h.hexPoints[player.h.hex] = new Decimal(0)
                player.h.hexPointsToGet[player.h.hex] = new Decimal(0)
                player.h.hexPointsEffect[player.h.hex] = new Decimal(1)

                player.h.hexPoints.push(new Decimal(0))
                player.h.hexPointsToGet.push(new Decimal(0))
                player.h.hexPointsEffect.push(new Decimal(1))
                player.h.automationTier = player.h.automationTier.add(1)
            },
            style: { width: '400px', "min-height": '100px' },
        },
    },
    hexPointReset(layer)
    {
        for (let i = 0; i<layer; i++)
        {
            player.h.hexPoints[i] = new Decimal(0)
        }
        player.h.hexPoints[layer] = player.h.hexPoints[layer].add(player.h.hexPointsToGet[layer])
    },
    automationTierReset()
    {
        for (let i = 0; i<player.h.hex; i++)
        {
            player.h.hexPoints[i] = new Decimal(0)
        }
    },
    hexReset()
    {
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

        player.f.buyables[1] = new Decimal(0)
        player.f.buyables[2] = new Decimal(0)
        player.f.buyables[3] = new Decimal(0)
        player.f.buyables[4] = new Decimal(0)
        player.f.buyables[5] = new Decimal(0)
        player.f.buyables[6] = new Decimal(0)
        player.f.buyables[7] = new Decimal(0)
        player.f.buyables[8] = new Decimal(0)
        player.f.buyables[11] = new Decimal(0)
        player.f.buyables[12] = new Decimal(0)
        player.f.buyables[13] = new Decimal(0)
        player.f.buyables[14] = new Decimal(0)
        player.f.buyables[15] = new Decimal(0)
        player.f.buyables[16] = new Decimal(0)
        player.f.buyables[17] = new Decimal(0)
        player.f.buyables[18] = new Decimal(0)
        player.f.buyables[19] = new Decimal(0)
        player.f.buyables[21] = new Decimal(0)
        player.f.buyables[22] = new Decimal(0)
        player.f.buyables[23] = new Decimal(0)
        player.f.buyables[24] = new Decimal(0)
        player.f.buyables[25] = new Decimal(0)
        player.f.buyables[26] = new Decimal(0)
        player.f.buyables[27] = new Decimal(0)
        player.f.buyables[28] = new Decimal(0)
        player.f.buyables[29] = new Decimal(0)
        player.f.buyables[31] = new Decimal(0)
        player.f.buyables[32] = new Decimal(0)
        player.f.buyables[33] = new Decimal(0)
        player.f.buyables[34] = new Decimal(0)
        player.f.buyables[35] = new Decimal(0)
        player.f.buyables[36] = new Decimal(0)

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

        player.t.buyables[11] = new Decimal(0)
        player.t.buyables[12] = new Decimal(0)
        player.t.buyables[13] = new Decimal(0)
        player.t.buyables[14] = new Decimal(0)
        player.t.buyables[15] = new Decimal(0)
        player.t.buyables[16] = new Decimal(0)
        player.t.buyables[17] = new Decimal(0)
        player.t.buyables[18] = new Decimal(0)

        player.f.factorPower = new Decimal(0)

        player.t.leaves = new Decimal(0)
        player.t.trees = new Decimal(0)

        player.g.buyables[11] = new Decimal(0)
        player.g.buyables[12] = new Decimal(0)
        player.g.buyables[13] = new Decimal(0)
        player.g.buyables[14] = new Decimal(0)
        player.g.buyables[15] = new Decimal(0)
        player.g.buyables[16] = new Decimal(0)
        player.g.buyables[17] = new Decimal(0)
        player.g.buyables[18] = new Decimal(0)

        if (!hasMilestone("ip", 11))
        {
        for (let i = 0; i < player.g.upgrades.length; i++) {
            if (+player.g.upgrades[i] < 22) {
                player.g.upgrades.splice(i, 1);
                i--;
            }
        }
        }

        if (!hasMilestone("ip", 14))
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

        player.gh.buyables[11] = new Decimal(0)
        player.gh.buyables[12] = new Decimal(0)
        player.gh.buyables[13] = new Decimal(0)
        player.gh.buyables[14] = new Decimal(0)
        player.gh.buyables[15] = new Decimal(0)
        player.gh.buyables[16] = new Decimal(0)
        player.gh.buyables[17] = new Decimal(0)
        player.gh.buyables[18] = new Decimal(0)
        player.gh.buyables[19] = new Decimal(0)
        player.gh.buyables[21] = new Decimal(0)
        player.gh.buyables[22] = new Decimal(0)

        player.m.codeExperience = new Decimal(0)
        player.m.linesOfCode = new Decimal(0)
        player.m.mods = new Decimal(0)

        player.m.buyables[11] = new Decimal(0)
        player.m.buyables[12] = new Decimal(0)
        player.m.buyables[13] = new Decimal(0)
        player.m.buyables[14] = new Decimal(0)

        //dice
        player.d.dicePoints = new Decimal(0)
        player.d.diceRolls = [new Decimal(1)] 
        player.d.dice = new Decimal(1)

        player.d.buyables[11] = new Decimal(0)
        player.d.buyables[12] = new Decimal(0)
        player.d.buyables[13] = new Decimal(0)
        player.d.buyables[14] = new Decimal(0)
        player.d.buyables[15] = new Decimal(0)

        for (let i = 0; i < player.d.diceEffects.length; i++)
        {
            player.d.diceEffects[i] = new Decimal(1)
        }

        //rf
        player.rf.rocketFuel = new Decimal(0)
        for (let i = 0; i < player.rf.abilitiesUnlocked.length; i++)
        {
            player.rf.abilitiesUnlocked[i] = false
        }
        for (let i = 0; i < player.rf.abilityTimers.length; i++)
        {
            player.rf.abilityTimers[i] = new Decimal(0)
        }

        for (let i = 0; i < player.rf.upgrades.length; i++) {
            if (+player.rf.upgrades[i] < 16) {
                player.rf.upgrades.splice(i, 1);
                i--;
            }
        }

        for (let i = 0; i < player.i.upgrades.length; i++) {
            if (+player.i.upgrades[i] < 22) {
                player.i.upgrades.splice(i, 1);
                i--;
            }
        }
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(1.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.h.hexPoints[0].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Factor Power Multiplier"
            },
            display() {
                return "which are boosting factor power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy() {
                let base = new Decimal(5)
                let growth = 1.3
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.h.hexPoints[0] = player.h.hexPoints[0].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.h.hexPoints[0], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.h.hexPoints[0] = player.h.hexPoints[0].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(1.33).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(1.18).add(1) },
            unlocked() { return true },
            canAfford() { return player.h.hexPoints[0].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Prestige Point Multiplier"
            },
            display() {
                return "which are boosting prestige point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.33
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.h.hexPoints[0] = player.h.hexPoints[0].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.h.hexPoints[0], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.h.hexPoints[0] = player.h.hexPoints[0].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(1.36).pow(x || getBuyableAmount(this.layer, this.id)).mul(25) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(1.175).add(1) },
            unlocked() { return true },
            canAfford() { return player.h.hexPoints[0].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Tree and Leaf Multiplier"
            },
            display() {
                return "which are boosting tree and leaf gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy() {
                let base = new Decimal(25)
                let growth = 1.36
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.h.hexPoints[0] = player.h.hexPoints[0].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.h.hexPoints[0], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.h.hexPoints[0] = player.h.hexPoints[0].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            cost(x) { return new Decimal(1.39).pow(x || getBuyableAmount(this.layer, this.id)).mul(65) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(1.16).add(1) },
            unlocked() { return true },
            canAfford() { return player.h.hexPoints[0].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Grass Multiplier"
            },
            display() {
                return "which are boosting grass gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy() {
                let base = new Decimal(65)
                let growth = 1.39
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.h.hexPoints[0] = player.h.hexPoints[0].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.h.hexPoints[0], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.h.hexPoints[0] = player.h.hexPoints[0].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        15: {
            cost(x) { return new Decimal(1.42).pow(x || getBuyableAmount(this.layer, this.id)).mul(200) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(1.15).add(1) },
            unlocked() { return true },
            canAfford() { return player.h.hexPoints[0].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Grasshoper Multiplier"
            },
            display() {
                return "which are boosting grasshopper gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy() {
                let base = new Decimal(200)
                let growth = 1.42
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.h.hexPoints[0] = player.h.hexPoints[0].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.h.hexPoints[0], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.h.hexPoints[0] = player.h.hexPoints[0].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        16: {
            cost(x) { return new Decimal(1.46).pow(x || getBuyableAmount(this.layer, this.id)).mul(500) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(1.15).add(1) },
            unlocked() { return true },
            canAfford() { return player.h.hexPoints[0].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Fertilizer Multiplier"
            },
            display() {
                return "which are boosting fertilizer gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy() {
                let base = new Decimal(500)
                let growth = 1.46
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.h.hexPoints[0] = player.h.hexPoints[0].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.h.hexPoints[0], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.h.hexPoints[0] = player.h.hexPoints[0].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        17: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(1500) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(1.12).add(1) },
            unlocked() { return true },
            canAfford() { return player.h.hexPoints[0].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Code Experience Multiplier"
            },
            display() {
                return "which are boosting code experience gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy() {
                let base = new Decimal(1500)
                let growth = 1.5
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.h.hexPoints[0] = player.h.hexPoints[0].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.h.hexPoints[0], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.h.hexPoints[0] = player.h.hexPoints[0].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },        18: {
            cost(x) { return new Decimal(1.55).pow(x || getBuyableAmount(this.layer, this.id)).mul(2500) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(1.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.h.hexPoints[0].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Lines of Code and Mod Multiplier"
            },
            display() {
                return "which are boosting lines of code and mod gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 1 Points"
            },
            buy() {
                let base = new Decimal(2500)
                let growth = 1.55
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.h.hexPoints[0] = player.h.hexPoints[0].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.h.hexPoints[0], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.h.hexPoints[0] = player.h.hexPoints[0].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        21: {
            cost(x) { return new Decimal(100).pow(x || getBuyableAmount(this.layer, this.id)).mul(1000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return true },
            canAfford() { return player.h.hexPoints[5].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Infinity Point Blessing I"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 6 Points"
            },
            buy() {
                let base = new Decimal(1000)
                let growth = 100
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.h.hexPoints[5] = player.h.hexPoints[5].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.h.hexPoints[5], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.h.hexPoints[5] = player.h.hexPoints[5].sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        22: {
            cost(x) { return new Decimal(100).pow(x || getBuyableAmount(this.layer, this.id)).mul(100) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.03).add(1) },
            unlocked() { return true },
            canAfford() { return player.h.hexPoints[11].gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Infinity Point Blessing II"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex 12 Points"
            },
            buy() {
                let base = new Decimal(100)
                let growth = 100
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.h.hexPoints[11] = player.h.hexPoints[11].sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.h.hexPoints[11], base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.h.hexPoints[11] = player.h.hexPoints[11].sub(cost)

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
                    ["raw-html", function () { return "You are at hex <h3>" + formatWhole(player.h.hex) + ". (+" + formatWhole(player.h.hexToGet) + ")"  }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["clickable", 11]]],
         ["blank", "25px"],
         ["row", [["clickable", 12], ["clickable", 14], ["clickable", 13]]],
         ["blank", "25px"],
         ["raw-html", function () { return "You have <h3>" + format(player.h.hexPoints[player.h.hexResetIndex]) + "</h3> hex " + formatWhole(player.h.hexResetIndex.add(1)) + " points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return  player.h.hexResetIndex.eq(0) ? "You are gaining <h3>" + format(player.h.hexPointsToGet[0]) + "</h3> hex 1 points per second (based on hex)." : "" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
         ["raw-html", function () { return  player.h.hexResetIndex.gt(0) ? "You will gain <h3>" + format(player.h.hexPointsToGet[player.h.hexResetIndex]) + "</h3> hex " + formatWhole(player.h.hexResetIndex.add(1)) + " on reset (based on previous hex points)." : "" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
         ["raw-html", function () { return player.h.hexResetIndex.eq(0) ? "Boosts points by x" + format(player.h.hexPointsEffect[0]) + ".":"" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
         ["raw-html", function () { return player.h.hexResetIndex.gt(0) ? "Boosts hex " + formatWhole(player.h.hexResetIndex) + " points by x" + format(player.h.hexPointsEffect[player.h.hexResetIndex]) + ".":"" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
         ["blank", "25px"],
         ["raw-html", function () { return "Hex progress is kept on infinity, but the effects are only active when hex is active."  }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ],

            },
            "Buyables": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
         ["blank", "25px"],
         ["raw-html", function () { return "You have <h3>" + format(player.h.hexPoints[0]) + "</h3> hex 1 points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.h.hexPointsToGet[0]) + "</h3> hex 1 points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
         ["blank", "25px"],
         ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
         ["row", [["buyable", 15], ["buyable", 16], ["buyable", 17], ["buyable", 18]]],
        ]

            },
            "Automation": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasChallenge("ip", 13) },
                content:
                [
         ["blank", "25px"],
                    ["raw-html", function () { return "You are at automation tier <h3>" + formatWhole(player.h.automationTier) + "."  }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["clickable", 15]]],
         ["blank", "25px"],
         ["raw-html", function () { return "You are gaining <h3>" + formatWhole(player.h.automationTierEffect.mul(100)) + "%</h3> hex points per second up to hex " + formatWhole(player.h.automationTier.add(1)) }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ],

            },
            "THE BLESSING": {
                buttonStyle() { return { 'background-color': '#FFBF00', "color": "white" } },
                unlocked() { return hasChallenge("ip", 13) },
                content:
                [
         ["blank", "25px"],
         ["row", [["buyable", 21], ["buyable", 22],]],
         ["blank", "25px"],
         ["raw-html", function () { return "These effects are always active."  }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],

        ],

            },
            "Challenge Debuffs": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return inChallenge("ip", 13) },
                content:
                [
         ["blank", "25px"],
         ["raw-html", function () { return "Challenge III Debuffs:" }, { "color": "white", "font-size": "36px", "font-family": "monospace" }],
         ["blank", "25px"],
         ["raw-html", function () { return "^0.75 Point Gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "^0.7 Factor Power Gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "^0.7 Prestige Point Gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "Disabled Check Back Effects." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "^0.75 Leaf and Tree Gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "^0.75 Grass Value." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
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
    layerShown() { return player.startedGame == true && inChallenge("ip", 13) || player.po.hex}
})
window.addEventListener('load', function() {
    // This function will be executed after the page is reloaded
    // You can perform any necessary tasks here
});

/*
    player.h.hexPoints = []
    player.h.hexPointsEffect = []
    player.h.hexPointsToGet = [] */