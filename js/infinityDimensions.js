addLayer("id", {
    name: "Infinity Dimensions", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ID", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        infinityPower: new Decimal(0),
        infinityPowerEffect: new Decimal(1),
        infinityPowerEffect2: new Decimal(1),
        infinityPowerPerSecond: new Decimal(0),

        dimensionsUnlocked: [false, false, false, false, false, false, false, false],
        dimensionAmounts: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        dimensionsPerSecond: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        dimensionCosts: [new Decimal(1e11),new Decimal(1e12),new Decimal(1e14),new Decimal(1e17),new Decimal(1e21),new Decimal(1e26),new Decimal(1e32),new Decimal(1e39),],
        dimensionsPurchased: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        dimensionMult: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
        dimensionText: ["", "", "", "", "", "", "", ""],

        dimensionUnlockAmount: new Decimal(0),
        dimensionUnlockCost: new Decimal("1e600"),
        dimensionUnlockCosts: [new Decimal("1e600"),new Decimal("1e900"),new Decimal("1e1500"),new Decimal("1e2500"),new Decimal("1e3300"),new Decimal("1e4400"),new Decimal("1e6000"),new Decimal("1e9000"),new Decimal("1e18000"),],
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(315deg, rgba(255, 129, 38,1) 0%, #f5ea14 100%)",
            "background-origin": "border-box",
            "border-color": "#b87400",
        };
      },
    
    tooltip: "Infinity Dimensions",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        player.id.infinityPowerEffect = player.id.infinityPower.pow(0.9).add(1)
        player.id.infinityPowerEffect2 = player.id.infinityPower.mul(3).pow(1.6).add(1)

        player.id.dimensionText = [
            "1st dimension (" + format(player.id.dimensionMult[0]) + "x): " + format(player.id.dimensionAmounts[0]) + " (+" + format(player.id.dimensionsPerSecond[0]) + "/s)",
            "2nd dimension (" + format(player.id.dimensionMult[1]) + "x): " + format(player.id.dimensionAmounts[1]) + " (+" + format(player.id.dimensionsPerSecond[1]) + "/s)",
            "3rd dimension (" + format(player.id.dimensionMult[2]) + "x): " + format(player.id.dimensionAmounts[2]) + " (+" + format(player.id.dimensionsPerSecond[2]) + "/s)",
            "4th dimension (" + format(player.id.dimensionMult[3]) + "x): " + format(player.id.dimensionAmounts[3]) + " (+" + format(player.id.dimensionsPerSecond[3]) + "/s)",
            "5th dimension (" + format(player.id.dimensionMult[4]) + "x): " + format(player.id.dimensionAmounts[4]) + " (+" + format(player.id.dimensionsPerSecond[4]) + "/s)",
            "6th dimension (" + format(player.id.dimensionMult[5]) + "x): " + format(player.id.dimensionAmounts[5]) + " (+" + format(player.id.dimensionsPerSecond[5]) + "/s)",
            "7th dimension (" + format(player.id.dimensionMult[6]) + "x): " + format(player.id.dimensionAmounts[6]) + " (+" + format(player.id.dimensionsPerSecond[6]) + "/s)",
            "8th dimension (" + format(player.id.dimensionMult[7]) + "x): " + format(player.id.dimensionAmounts[7]),
        ]

        player.id.infinityPower = player.id.infinityPower.add(player.id.infinityPowerPerSecond.mul(delta))

        player.id.infinityPowerPerSecond = player.id.dimensionAmounts[0].mul(player.id.dimensionMult[0])
        player.id.infinityPowerPerSecond = player.id.infinityPowerPerSecond.mul(buyableEffect("r", 14))
        player.id.infinityPowerPerSecond = player.id.infinityPowerPerSecond.mul(player.ca.replicantiEffect2)
        player.id.infinityPowerPerSecond = player.id.infinityPowerPerSecond.mul(player.rm.realmModsEffect[3])
        player.id.infinityPowerPerSecond = player.id.infinityPowerPerSecond.mul(player.cb.uncommonPetEffects[7][0])

        for (let i = 0; i < player.id.dimensionAmounts.length; i++)
        {
            player.id.dimensionAmounts[i] = player.id.dimensionAmounts[i].add(player.id.dimensionsPerSecond[i].mul(delta))
            player.id.dimensionMult[i] = Decimal.pow(2, player.id.dimensionsPurchased[i])
        }
        for (let i = 0; i < player.id.dimensionAmounts.length-1; i++)
        {
            player.id.dimensionsPerSecond[i] = player.id.dimensionAmounts[i+1].mul(player.id.dimensionMult[i+1].div(10))
            player.id.dimensionsPerSecond[i] = player.id.dimensionsPerSecond[i].mul(buyableEffect("r", 14))
            player.id.dimensionsPerSecond[i] = player.id.dimensionsPerSecond[i].mul(player.ca.replicantiEffect2)
            player.id.dimensionsPerSecond[i] = player.id.dimensionsPerSecond[i].mul(player.rm.realmModsEffect[3])
            player.id.dimensionsPerSecond[i] = player.id.dimensionsPerSecond[i].mul(player.cb.uncommonPetEffects[7][0])

            //mults
        }
        
        player.id.dimensionCosts = [new Decimal(1e11),new Decimal(1e12),new Decimal(1e14),new Decimal(1e17),new Decimal(1e21),new Decimal(1e26),new Decimal(1e32),new Decimal(1e39),]

        player.id.dimensionCosts[0] = player.id.dimensionCosts[0].mul(Decimal.pow(1e2, player.id.dimensionsPurchased[0]))
        player.id.dimensionCosts[1] = player.id.dimensionCosts[1].mul(Decimal.pow(1e3, player.id.dimensionsPurchased[1]))
        player.id.dimensionCosts[2] = player.id.dimensionCosts[2].mul(Decimal.pow(1e4, player.id.dimensionsPurchased[2]))
        player.id.dimensionCosts[3] = player.id.dimensionCosts[3].mul(Decimal.pow(1e5, player.id.dimensionsPurchased[3]))
        player.id.dimensionCosts[4] = player.id.dimensionCosts[4].mul(Decimal.pow(1e6, player.id.dimensionsPurchased[4]))
        player.id.dimensionCosts[5] = player.id.dimensionCosts[5].mul(Decimal.pow(1e7, player.id.dimensionsPurchased[5]))
        player.id.dimensionCosts[6] = player.id.dimensionCosts[6].mul(Decimal.pow(1e8, player.id.dimensionsPurchased[6]))
        player.id.dimensionCosts[7] = player.id.dimensionCosts[7].mul(Decimal.pow(1e9, player.id.dimensionsPurchased[7]))

        player.id.dimensionUnlockCost = player.id.dimensionUnlockCosts[player.id.dimensionUnlockAmount]

        player.id.dimensionUnlockCosts = [new Decimal("1e600"),new Decimal("1e900"),new Decimal("1e1500"),new Decimal("1e2500"),new Decimal("1e3300"),new Decimal("1e4400"),new Decimal("1e6000"),new Decimal("1e9000"),new Decimal("1e18000"),]

        for (let i = 0; i < player.id.dimensionAmounts.length+1; i++)
        {
            if (player.id.dimensionUnlockAmount.gte(i))
            {
                player.id.dimensionsUnlocked[i-1] = true
            }
        }

    },
    branches: ["ad"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "in"
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
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
        1: {
            cost(x) { return player.id.dimensionUnlockCost },
            unlocked() { return player.id.dimensionUnlockAmount.lte(8) },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return "Next ID: " + format(tmp[this.layer].buyables[this.id].cost) + " Points"
            },
            buy() {
                    player.id.dimensionUnlockAmount = player.id.dimensionUnlockAmount.add(1)
            },
            style: { width: '175px', height: '50px', }
        },
        11: {
            cost(x) { return player.id.dimensionCosts[0] },
            unlocked() { return player.id.dimensionsUnlocked[0] },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                let base = new Decimal(1e11)
                let growth = 1e2
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(player.id.dimensionsPurchased[0]).mul(base)
                    player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    player.id.dimensionsPurchased[0] = player.id.dimensionsPurchased[0].add(1)
                    player.id.dimensionAmounts[0] = player.id.dimensionAmounts[0].add(1)
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, player.id.dimensionsPurchased[0])
                let cost = Decimal.sumGeometricSeries(max, base, growth, player.id.dimensionsPurchased[0])
                player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                player.id.dimensionsPurchased[0] = player.id.dimensionsPurchased[0].add(max)
                player.id.dimensionAmounts[0] = player.id.dimensionAmounts[0].add(max)
            }
            },
            style: { width: '175px', height: '50px', }
        },
        12: {
            cost(x) { return player.id.dimensionCosts[1] },
            unlocked() { return player.id.dimensionsUnlocked[1] },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                let base = new Decimal(1e12)
                let growth = 1e3
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(player.id.dimensionsPurchased[1]).mul(base)
                    player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    player.id.dimensionsPurchased[1] = player.id.dimensionsPurchased[1].add(1)
                    player.id.dimensionAmounts[1] = player.id.dimensionAmounts[1].add(1)
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, player.id.dimensionsPurchased[1])
                let cost = Decimal.sumGeometricSeries(max, base, growth, player.id.dimensionsPurchased[1])
                player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                player.id.dimensionsPurchased[1] = player.id.dimensionsPurchased[1].add(max)
                player.id.dimensionAmounts[1] = player.id.dimensionAmounts[1].add(max)
            }
            },
            style: { width: '175px', height: '50px', }
        },
        13: {
            cost(x) { return player.id.dimensionCosts[2] },
            unlocked() { return player.id.dimensionsUnlocked[2] },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                let base = new Decimal(1e14)
                let growth = 1e4
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(player.id.dimensionsPurchased[2]).mul(base)
                    player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    player.id.dimensionsPurchased[2] = player.id.dimensionsPurchased[2].add(1)
                    player.id.dimensionAmounts[2] = player.id.dimensionAmounts[2].add(1)
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, player.id.dimensionsPurchased[2])
                let cost = Decimal.sumGeometricSeries(max, base, growth, player.id.dimensionsPurchased[2])
                player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                player.id.dimensionsPurchased[2] = player.id.dimensionsPurchased[2].add(max)
                player.id.dimensionAmounts[2] = player.id.dimensionAmounts[2].add(max)
            }
            },
            style: { width: '175px', height: '50px', }
        },
        14: {
            cost(x) { return player.id.dimensionCosts[3] },
            unlocked() { return player.id.dimensionsUnlocked[3] },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                let base = new Decimal(1e17)
                let growth = 1e5
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(player.id.dimensionsPurchased[3]).mul(base)
                    player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    player.id.dimensionsPurchased[3] = player.id.dimensionsPurchased[3].add(1)
                    player.id.dimensionAmounts[3] = player.id.dimensionAmounts[3].add(1)
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, player.id.dimensionsPurchased[3])
                let cost = Decimal.sumGeometricSeries(max, base, growth, player.id.dimensionsPurchased[3])
                player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                player.id.dimensionsPurchased[3] = player.id.dimensionsPurchased[3].add(max)
                player.id.dimensionAmounts[3] = player.id.dimensionAmounts[3].add(max)
            }
            },
            style: { width: '175px', height: '50px', }
        },
        15: {
            cost(x) { return player.id.dimensionCosts[4] },
            unlocked() { return player.id.dimensionsUnlocked[4] },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                let base = new Decimal(1e21)
                let growth = 1e5
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(player.id.dimensionsPurchased[4]).mul(base)
                    player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    player.id.dimensionsPurchased[4] = player.id.dimensionsPurchased[4].add(1)
                    player.id.dimensionAmounts[4] = player.id.dimensionAmounts[4].add(1)
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, player.id.dimensionsPurchased[4])
                let cost = Decimal.sumGeometricSeries(max, base, growth, player.id.dimensionsPurchased[4])
                player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                player.id.dimensionsPurchased[4] = player.id.dimensionsPurchased[4].add(max)
                player.id.dimensionAmounts[4] = player.id.dimensionAmounts[4].add(max)
            }
            },
            style: { width: '175px', height: '50px', }
        },
        16: {
            cost(x) { return player.id.dimensionCosts[5] },
            unlocked() { return player.id.dimensionsUnlocked[5] },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                let base = new Decimal(1e26)
                let growth = 1e6
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(player.id.dimensionsPurchased[5]).mul(base)
                    player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    player.id.dimensionsPurchased[5] = player.id.dimensionsPurchased[5].add(1)
                    player.id.dimensionAmounts[5] = player.id.dimensionAmounts[5].add(1)
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, player.id.dimensionsPurchased[5])
                let cost = Decimal.sumGeometricSeries(max, base, growth, player.id.dimensionsPurchased[5])
                player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                player.id.dimensionsPurchased[5] = player.id.dimensionsPurchased[5].add(max)
                player.id.dimensionAmounts[5] = player.id.dimensionAmounts[5].add(max)
            }
            },
            style: { width: '175px', height: '50px', }
        },
        17: {
            cost(x) { return player.id.dimensionCosts[6] },
            unlocked() { return player.id.dimensionsUnlocked[6] },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                let base = new Decimal(1e32)
                let growth = 1e7
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(player.id.dimensionsPurchased[6]).mul(base)
                    player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    player.id.dimensionsPurchased[6] = player.id.dimensionsPurchased[6].add(1)
                    player.id.dimensionAmounts[6] = player.id.dimensionAmounts[6].add(1)
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, player.id.dimensionsPurchased[6])
                let cost = Decimal.sumGeometricSeries(max, base, growth, player.id.dimensionsPurchased[6])
                player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                player.id.dimensionsPurchased[6] = player.id.dimensionsPurchased[6].add(max)
                player.id.dimensionAmounts[6] = player.id.dimensionAmounts[6].add(max)
            }
            },
            style: { width: '175px', height: '50px', }
        },
        18: {
            cost(x) { return player.id.dimensionCosts[7] },
            unlocked() { return player.id.dimensionsUnlocked[7] },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                let base = new Decimal(1e39)
                let growth = 1e8
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(player.id.dimensionsPurchased[7]).mul(base)
                    player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    player.id.dimensionsPurchased[7] = player.id.dimensionsPurchased[7].add(1)
                    player.id.dimensionAmounts[7] = player.id.dimensionAmounts[7].add(1)
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, player.id.dimensionsPurchased[7])
                let cost = Decimal.sumGeometricSeries(max, base, growth, player.id.dimensionsPurchased[7])
                player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                player.id.dimensionsPurchased[7] = player.id.dimensionsPurchased[7].add(max)
                player.id.dimensionAmounts[7] = player.id.dimensionAmounts[7].add(max)
            }
            },
            style: { width: '175px', height: '50px', }
        },
        21: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(100) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).pow(0.8).add(1) },
            unlocked() { return hasUpgrade("i", 22) },
            canAfford() { return player.id.infinityPower.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br>Steel Empowerment"
            },
            display() {
                return "which are multiplying steel gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Power"
            },
            buy() {
                let base = new Decimal(100)
                let growth = 1.2
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.id.infinityPower = player.id.infinityPower.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.id.infinityPower, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.id.infinityPower = player.id.infinityPower.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        22: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(1000) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).pow(0.75).add(1) },
            unlocked() { return hasUpgrade("i", 23) },
            canAfford() { return player.id.infinityPower.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br>Crystal Empowerment"
            },
            display() {
                return "which are multiplying crystal gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Power"
            },
            buy() {
                let base = new Decimal(1000)
                let growth = 1.25
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.id.infinityPower = player.id.infinityPower.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.id.infinityPower, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.id.infinityPower = player.id.infinityPower.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        23: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(100000) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).pow(0.75).add(1) },
            unlocked() { return hasUpgrade("i", 25) },
            canAfford() { return player.id.infinityPower.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br>Time Cube Empowerment"
            },
            display() {
                return "which are multiplying time cube gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Power"
            },
            buy() {
                let base = new Decimal(100000)
                let growth = 1.3
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.id.infinityPower = player.id.infinityPower.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.id.infinityPower, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.id.infinityPower = player.id.infinityPower.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        24: {
            cost(x) { return new Decimal(3).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e10) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.5).pow(1.4).add(1) },
            unlocked() { return hasUpgrade("i", 25) },
            canAfford() { return player.id.infinityPower.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br>Infinity Point Empowerment"
            },
            display() {
                return "which are multiplying infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Power"
            },
            buy() {
                let base = new Decimal(1e10)
                let growth = 3
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.id.infinityPower = player.id.infinityPower.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.id.infinityPower, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.id.infinityPower = player.id.infinityPower.sub(cost)

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
            "Dimensions": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasUpgrade("bi", 17) },
                content:
                [
        ["blank", "25px"],
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> points." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + format(player.in.infinityPoints) + "</h3> infinity points." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["row", [["buyable", 1], ["clickable", 2], ["clickable", 3]]],
        ["blank", "25px"],
        ["row", [["raw-html", function () { return player.id.dimensionsUnlocked[0] ? player.id.dimensionText[0] + "&nbsp&nbsp&nbsp&nbsp" : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], ["buyable", 11]]],
        ["row", [["raw-html", function () { return player.id.dimensionsUnlocked[1] ? player.id.dimensionText[1] + "&nbsp&nbsp&nbsp&nbsp" : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], ["buyable", 12]]],
        ["row", [["raw-html", function () { return player.id.dimensionsUnlocked[2] ? player.id.dimensionText[2] + "&nbsp&nbsp&nbsp&nbsp" : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], ["buyable", 13]]],
        ["row", [["raw-html", function () { return player.id.dimensionsUnlocked[3] ? player.id.dimensionText[3] + "&nbsp&nbsp&nbsp&nbsp" : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], ["buyable", 14]]],
        ["row", [["raw-html", function () { return player.id.dimensionsUnlocked[4] ? player.id.dimensionText[4] + "&nbsp&nbsp&nbsp&nbsp" : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], ["buyable", 15]]],
        ["row", [["raw-html", function () { return player.id.dimensionsUnlocked[5] ? player.id.dimensionText[5] + "&nbsp&nbsp&nbsp&nbsp" : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], ["buyable", 16]]],
        ["row", [["raw-html", function () { return player.id.dimensionsUnlocked[6] ? player.id.dimensionText[6] + "&nbsp&nbsp&nbsp&nbsp" : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], ["buyable", 17]]],
        ["row", [["raw-html", function () { return player.id.dimensionsUnlocked[7] ? player.id.dimensionText[7] + "&nbsp&nbsp&nbsp&nbsp" : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }], ["buyable", 18]]],
        ["blank", "25px"],

                ]

            },
            "Buyables": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasUpgrade("bi", 19) },
                content:
                [
        ["blank", "25px"],
        ["row", [["clickable", 2], ["clickable", 3]]],
        ["blank", "25px"], 
        ["row", [["buyable", 21], ["buyable", 22], ["buyable", 23], ["buyable", 24]]],

                ]

            },
        },
    }, 

    tabFormat: [        
        ["raw-html", function () { return "You have <h3>" + format(player.id.infinityPower) + "</h3> infinity power, which boosts antimatter dimensions by x" + format(player.id.infinityPowerEffect) + ", and points by x" + format(player.id.infinityPowerEffect2) + "." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.id.infinityPowerPerSecond) + "</h3> infinity power per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.in.unlockedInfinity && hasUpgrade("bi", 18)}
})
