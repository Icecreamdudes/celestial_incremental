addLayer("f", {
    name: "Factors", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        factorBase: new Decimal(0.05),
        factorUnlocks: [true, true, true, false, false, false, false, false],

        factorPower: new Decimal(0),
        factorPowerEffect: new Decimal(1),
        factorPowerPerSecond: new Decimal(0),
        powerFactorUnlocks: [true, true, true, false, false, false, false, false],

        //tree
        treeFactorUnlocks: [true, true, true, false, false, false, false, false],

        //grass
        grassFactorUnlocks: [false, false, false, false, false, false, false, false],
    }
    },
    automate() {
        if (hasUpgrade("p", 15))
        {
            buyBuyable("f", 11)
            buyBuyable("f", 12)
            buyBuyable("f", 13)
            buyBuyable("f", 14)
            buyBuyable("f", 15)
            buyBuyable("f", 16)
            buyBuyable("f", 17)
            buyBuyable("f", 18)
        }    
        if (hasUpgrade("p", 21))
        {
            buyBuyable("f", 19)
            buyBuyable("f", 21)
            buyBuyable("f", 22)
            buyBuyable("f", 23)
            buyBuyable("f", 24)
            buyBuyable("f", 25)
            buyBuyable("f", 26)
            buyBuyable("f", 27)
        }   
        if (hasMilestone("r", 16))
        {
            buyBuyable("f", 1)
            buyBuyable("f", 2)
            buyBuyable("f", 3)
            buyBuyable("f", 4)
            buyBuyable("f", 5)
            buyBuyable("f", 6)
            buyBuyable("f", 7)
            buyBuyable("f", 8)
            buyBuyable("f", 28)
            buyBuyable("f", 29)
            buyBuyable("f", 31)
            buyBuyable("f", 32)
            buyBuyable("f", 33)
            buyBuyable("f", 34)
            buyBuyable("f", 35)
            buyBuyable("f", 36)
        }   
    },
    nodeStyle() {
    },
    tooltip: "Factors",
    color() { return "#83cecf" },
    branches: ["r"],
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.r.tier.gte(2))
        [
            player.f.factorUnlocks[3] = true
        ]
        if (player.r.tier.gte(4))
        [
            player.f.factorUnlocks[4] = true
        ]
        if (player.r.tetr.gte(2) && player.f.factorUnlocks[4] == true)
        [
            player.f.factorUnlocks[5] = true
        ]
        if (hasUpgrade("p", 13) && player.f.factorUnlocks[5] == true)
        [
            player.f.factorUnlocks[6] = true
        ]
        if (player.r.tetr.gte(4) && player.f.factorUnlocks[6] == true)
        [
            player.f.factorUnlocks[7] = true
        ]

        //Power
        if (hasUpgrade("i", 15)) player.f.factorPowerPerSecond = onepersec
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 19))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 21))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 22))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 23))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 24))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 25))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("t", 16))
        if (hasUpgrade("p", 16)) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(upgradeEffect("p", 16))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("g", 15))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(player.gh.grasshopperEffects[1])
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("m", 14))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(player.cb.commonPetEffects[2][0])
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(player.d.diceEffects[1])
        if (hasUpgrade("ip", 14) && !inChallenge("ip", 14)) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(upgradeEffect("ip", 14))
        if (hasUpgrade("ip", 21) && !inChallenge("ip", 14)) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(upgradeEffect("ip", 21))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.div(player.pe.pestEffect[1])
        if (inChallenge("ip", 13)) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.pow(0.7)
        if (inChallenge("ip", 13) || player.po.hex) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("h", 11))

        player.f.factorPower = player.f.factorPower.add(player.f.factorPowerPerSecond.mul(delta))
        player.f.factorPowerEffect = player.f.factorPower.pow(0.5).div(3).add(1)

        if (player.p.prestigePoints.gte(10000))
        {
            player.f.powerFactorUnlocks[3] = true
        }
        if (player.points.gte(1e14) && player.f.powerFactorUnlocks[3] == true)
        {
            player.f.powerFactorUnlocks[4] = true
        }
        if (player.r.tetr.gte(11) && player.f.powerFactorUnlocks[4] == true)
        {
            player.f.powerFactorUnlocks[5] = true
        }
        if (player.t.trees.gte(25) && player.f.powerFactorUnlocks[5] == true)
        {
            player.f.powerFactorUnlocks[6] = true
        }
        if (hasUpgrade("p", 19) && player.f.powerFactorUnlocks[6] == true)
        {
            player.f.powerFactorUnlocks[7] = true
        }

        if (hasUpgrade("p", 23))
        {
            player.f.treeFactorUnlocks[3] = true
        }
        if (hasUpgrade("g", 17) && player.f.treeFactorUnlocks[3] == true)
        {
            player.f.treeFactorUnlocks[4] = true
        }
        if (hasMilestone("r", 13) && player.f.treeFactorUnlocks[4] == true)
        {
            player.f.treeFactorUnlocks[5] = true
        }
        if (player.m.mods.gte(20) && player.f.treeFactorUnlocks[5] == true)
        {
            player.f.treeFactorUnlocks[6] = true
        }
        if (hasMilestone("r", 16) && player.f.treeFactorUnlocks[6] == true)
        {
            player.f.treeFactorUnlocks[7] = true
        }

        for (let i = 0; i < player.f.grassFactorUnlocks.length; i++)
        {
            if (player.gh.buyables[15].gt(i))
            {
                player.f.grassFactorUnlocks[i] = true
            }
        }

        player.f.factorBase = new Decimal(0.05)
        player.f.factorBase = player.f.factorBase.add(buyableEffect("gh", 16))
        if (hasUpgrade("ad", 19)) player.f.factorBase = player.f.factorBase.add(upgradeEffect("ad", 19))
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
            canClick() { return player.buyMax == false },
            unlocked() { return true },
            onClick() {
                player.buyMax = true
            },
            style: { width: '75px', "min-height": '75px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.buyMax == true  },
            unlocked() { return true },
            onClick() {
                player.buyMax = false
            },
            style: { width: '75px', "min-height": '75px', }
        },
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
        1: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(50) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[0] },
            canAfford() { return player.gh.fertilizer.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Grass Factor I"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                let base = new Decimal(50)
                let growth = 1.2
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.gh.fertilizer, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        2: {
            cost(x) { return new Decimal(1.22).pow(x || getBuyableAmount(this.layer, this.id)).mul(100) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[1] },
            canAfford() { return player.gh.fertilizer.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Grass Factor II"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                let base = new Decimal(100)
                let growth = 1.22
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.gh.fertilizer, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        3: {
            cost(x) { return new Decimal(1.24).pow(x || getBuyableAmount(this.layer, this.id)).mul(180) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[2] },
            canAfford() { return player.gh.fertilizer.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Grass Factor III"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                let base = new Decimal(180)
                let growth = 1.24
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.gh.fertilizer, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        4: {
            cost(x) { return new Decimal(1.26).pow(x || getBuyableAmount(this.layer, this.id)).mul(340) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[3] },
            canAfford() { return player.gh.fertilizer.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Grass Factor IV"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                let base = new Decimal(340)
                let growth = 1.26
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.gh.fertilizer, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        5: {
            cost(x) { return new Decimal(1.28).pow(x || getBuyableAmount(this.layer, this.id)).mul(800) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[4] },
            canAfford() { return player.gh.fertilizer.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Grass Factor V"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                let base = new Decimal(800)
                let growth = 1.28
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.gh.fertilizer, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        6: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(2000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[5] },
            canAfford() { return player.gh.fertilizer.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Grass Factor VI"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                let base = new Decimal(2000)
                let growth = 1.3
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.gh.fertilizer, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        7: {
            cost(x) { return new Decimal(1.32).pow(x || getBuyableAmount(this.layer, this.id)).mul(5000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[6] },
            canAfford() { return player.gh.fertilizer.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Grass Factor VII"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                let base = new Decimal(5000)
                let growth = 1.32
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.gh.fertilizer, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16))  player.gh.fertilizer = player.gh.fertilizer.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        8: {
            cost(x) { return new Decimal(1.34).pow(x || getBuyableAmount(this.layer, this.id)).mul(14000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[7] },
            canAfford() { return player.gh.fertilizer.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Grass Factor VIII"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                let base = new Decimal(14000)
                let growth = 1.34
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16))  player.gh.fertilizer = player.gh.fertilizer.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.gh.fertilizer, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16))  player.gh.fertilizer = player.gh.fertilizer.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        11: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[0] },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Factor I"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.4
                if (player.buyMax == false && !hasUpgrade("p", 15))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 15)) player.points = player.points.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 15)) player.points = player.points.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(1.44).pow(x || getBuyableAmount(this.layer, this.id)).mul(25) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[1] },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Factor II"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                let base = new Decimal(25)
                let growth = 1.44
                if (player.buyMax == false && !hasUpgrade("p", 15))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 15)) player.points = player.points.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 15)) player.points = player.points.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(1.48).pow(x || getBuyableAmount(this.layer, this.id)).mul(60) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[2] },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Factor III"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                let base = new Decimal(60)
                let growth = 1.48
                if (player.buyMax == false && !hasUpgrade("p", 15))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 15)) player.points = player.points.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 15)) player.points = player.points.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            cost(x) { return new Decimal(1.52).pow(x || getBuyableAmount(this.layer, this.id)).mul(200) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[3] },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Factor IV"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                let base = new Decimal(200)
                let growth = 1.52
                if (player.buyMax == false && !hasUpgrade("p", 15))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 15)) player.points = player.points.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 15)) player.points = player.points.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        15: {
            cost(x) { return new Decimal(1.56).pow(x || getBuyableAmount(this.layer, this.id)).mul(800) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[4] },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Factor V"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                let base = new Decimal(800)
                let growth = 1.56
                if (player.buyMax == false && !hasUpgrade("p", 15))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 15)) player.points = player.points.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 15)) player.points = player.points.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },        
        16: {
            cost(x) { return new Decimal(1.6).pow(x || getBuyableAmount(this.layer, this.id)).mul(3000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[5] },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Factor VI"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                let base = new Decimal(3000)
                let growth = 1.6
                if (player.buyMax == false && !hasUpgrade("p", 15))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 15)) player.points = player.points.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 15)) player.points = player.points.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        17: {
            cost(x) { return new Decimal(1.64).pow(x || getBuyableAmount(this.layer, this.id)).mul(10000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[6] },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Factor VII"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                let base = new Decimal(10000)
                let growth = 1.64
                if (player.buyMax == false && !hasUpgrade("p", 15))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 15)) player.points = player.points.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 15)) player.points = player.points.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        18: {
            cost(x) { return new Decimal(1.68).pow(x || getBuyableAmount(this.layer, this.id)).mul(50000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[7] },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Factor VIII"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                let base = new Decimal(50000)
                let growth = 1.68
                if (player.buyMax == false && !hasUpgrade("p", 15))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 15)) player.points = player.points.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 15)) player.points = player.points.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        19: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(200) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            canAfford() { return player.p.prestigePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Power Factor I"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                let base = new Decimal(200)
                let growth = 1.3
                if (player.buyMax == false && !hasUpgrade("p", 21))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.prestigePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        21: {
            cost(x) { return new Decimal(1.35).pow(x || getBuyableAmount(this.layer, this.id)).mul(500) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            canAfford() { return player.p.prestigePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Power Factor II"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                let base = new Decimal(500)
                let growth = 1.35
                if (player.buyMax == false && !hasUpgrade("p", 21))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.prestigePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        22: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(1500) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            canAfford() { return player.p.prestigePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Power Factor III"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                let base = new Decimal(1500)
                let growth = 1.4
                if (player.buyMax == false && !hasUpgrade("p", 21))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.prestigePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        23: {
            cost(x) { return new Decimal(1.45).pow(x || getBuyableAmount(this.layer, this.id)).mul(4000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return player.f.powerFactorUnlocks[3] },
            canAfford() { return player.p.prestigePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Power Factor IV"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                let base = new Decimal(4000)
                let growth = 1.45
                if (player.buyMax == false && !hasUpgrade("p", 21))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.prestigePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        24: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(9000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return player.f.powerFactorUnlocks[4] },
            canAfford() { return player.p.prestigePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Power Factor V"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                let base = new Decimal(9000)
                let growth = 1.5
                if (player.buyMax == false && !hasUpgrade("p", 21))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.prestigePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        25: {
            cost(x) { return new Decimal(1.55).pow(x || getBuyableAmount(this.layer, this.id)).mul(25000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return player.f.powerFactorUnlocks[5] },
            canAfford() { return player.p.prestigePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Power Factor VI"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                let base = new Decimal(25000)
                let growth = 1.55
                if (player.buyMax == false && !hasUpgrade("p", 21))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.prestigePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        26: {
            cost(x) { return new Decimal(1.60).pow(x || getBuyableAmount(this.layer, this.id)).mul(75000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return player.f.powerFactorUnlocks[6] },
            canAfford() { return player.p.prestigePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Power Factor VII"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                let base = new Decimal(75000)
                let growth = 1.60
                if (player.buyMax == false && !hasUpgrade("p", 21))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.prestigePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        27: {
            cost(x) { return new Decimal(1.65).pow(x || getBuyableAmount(this.layer, this.id)).mul(300000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return player.f.powerFactorUnlocks[7] },
            canAfford() { return player.p.prestigePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Power Factor VIII"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                let base = new Decimal(300000)
                let growth = 1.65
                if (player.buyMax == false && !hasUpgrade("p", 21))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.prestigePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        28: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(30) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[0] },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Tree Factor I"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(30)
                let growth = 1.2
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        29: {
            cost(x) { return new Decimal(1.23).pow(x || getBuyableAmount(this.layer, this.id)).mul(50) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[1] },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Tree Factor II"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(50)
                let growth = 1.23
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        31: {
            cost(x) { return new Decimal(1.26).pow(x || getBuyableAmount(this.layer, this.id)).mul(80) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[2] },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Tree Factor III"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(80)
                let growth = 1.26
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        32: {
            cost(x) { return new Decimal(1.29).pow(x || getBuyableAmount(this.layer, this.id)).mul(160) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[3] },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Tree Factor IV"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(160)
                let growth = 1.29
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        33: {
            cost(x) { return new Decimal(1.32).pow(x || getBuyableAmount(this.layer, this.id)).mul(400) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[4] },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Tree Factor V"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(400)
                let growth = 1.32
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        34: {
            cost(x) { return new Decimal(1.35).pow(x || getBuyableAmount(this.layer, this.id)).mul(20000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[5] },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Tree Factor VI"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(20000)
                let growth = 1.35
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        35: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e6) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[6] },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Tree Factor VII"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(1e6)
                let growth = 1.4
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        36: {
            cost(x) { return new Decimal(1.45).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e12) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[7] },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Tree Factor VII"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(1e12)
                let growth = 1.45
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(cost)

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
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"], 
                    ["raw-html", function () { return player.f.factorUnlocks[3] == false ?  "Next factor unlocks at tier 2." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.factorUnlocks[3] == true && player.f.factorUnlocks[4] == false ?  "Next factor unlocks at tier 4." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.factorUnlocks[4] == true && player.f.factorUnlocks[5] == false ?  "Next factor unlocks at tetr 2." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.factorUnlocks[5] == true && player.f.factorUnlocks[6] == false ?  "Next factor unlocks at Prestige Upgrade III." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.factorUnlocks[6] == true && player.f.factorUnlocks[7] == false ?  "Next factor unlocks at tetr 4." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
                    ["row", [["buyable", 15], ["buyable", 16], ["buyable", 17], ["buyable", 18]]],
                ]
            },
            "Power": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasUpgrade("i", 15) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h2>You have " + format(player.f.factorPower) + " factor power." }, { "coslor": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h3>You are gaining " + format(player.f.factorPowerPerSecond) + " factor power per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h3>which boost celestial points by x" + format(player.f.factorPowerEffect) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>You have " + format(player.p.prestigePoints) + " prestige points." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.f.powerFactorUnlocks[3] == false ?  "Next factor unlocks at 10,000 prestige points." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.powerFactorUnlocks[3] == true && player.f.powerFactorUnlocks[4] == false ?  "Next factor unlocks at 1e14 celestial points." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.powerFactorUnlocks[4] == true && player.f.powerFactorUnlocks[5] == false ?  "Next factor unlocks at tetr 11." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.powerFactorUnlocks[5] == true && player.f.powerFactorUnlocks[6] == false ?  "Next factor unlocks at 25 trees." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.powerFactorUnlocks[6] == true && player.f.powerFactorUnlocks[7] == false ?  "Next factor unlocks at ???." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["buyable", 19], ["buyable", 21], ["buyable", 22], ["buyable", 23]]],
                    ["row", [["buyable", 24], ["buyable", 25], ["buyable", 26], ["buyable", 27]]],
                ]
            },
            "Tree": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasMilestone("r", 11) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>You have " + format(player.g.grass) + " grass." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.f.treeFactorUnlocks[3] == false ?  "Next factor unlocks at Prestige Upgrade XII." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.treeFactorUnlocks[3] == true && player.f.treeFactorUnlocks[4] == false?  "Next factor unlocks at Grass Upgrade VII." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.treeFactorUnlocks[4] == true && player.f.treeFactorUnlocks[5] == false?  "Next factor unlocks at pent 3." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.treeFactorUnlocks[5] == true && player.f.treeFactorUnlocks[6] == false?  "Next factor unlocks at 20 mods." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.treeFactorUnlocks[6] == true && player.f.treeFactorUnlocks[7] == false?  "Next factor unlocks at pent 8." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["buyable", 28], ["buyable", 29], ["buyable", 31], ["buyable", 32]]],
                    ["row", [["buyable", 33], ["buyable", 34], ["buyable", 35], ["buyable", 36]]],
                ]
            }, 
            "Grass": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return player.gh.buyables[15].gt(0) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>You have " + format(player.gh.fertilizer) + " fertilizer." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Factors unlock with Grass Study III."}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["buyable", 1], ["buyable", 2], ["buyable", 3], ["buyable", 4]]],
                    ["row", [["buyable", 5], ["buyable", 6], ["buyable", 7], ["buyable", 8]]],
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
    layerShown() { return player.startedGame == true && hasUpgrade("i", 12)}
})
document.addEventListener('keydown', function(event) {
    if (event.key === 'b' && options.toggleHotkey) { 
        if (player.buyMax == true) 
        {
        player.buyMax = false
        } else
        {
            player.buyMax = true
        }
    }
  });