addLayer("ta", {
    name: "Tav", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<h2>→", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        reachedNegativeInfinity: false,
        unlockedReverseBreak: false,

        //negative infinity
        negativeInfinityPause: new Decimal(0),

        negativeInfinityPoints: new Decimal(0),
        negativeInfinityPointsToGet: new Decimal(1),

        dimensionPowerIndex: new Decimal(0),
        dimensionPower: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),],
        dimensionPowerPerSecond: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0),],
        dimensionPowerEffects: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),],
        dimensionPowerTexts: ["","","","","","","","",],

        dimensionAutobuyIndex: new Decimal(0),
        dimensionAutobuyToggles: [false, false, false, false, false, false, false, false, false, false, false,],
        dimensionAutobuyTexts: ["","","","","","","","","","","",],
        dimensionAutobuyTimeReq: [new Decimal(5), new Decimal(6), new Decimal(7), new Decimal(8), new Decimal(9), new Decimal(10), new Decimal(11), new Decimal(12), new Decimal(8),new Decimal(30),new Decimal(45),],
        dimensionAutobuyTimer: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(150deg, #008080, 0%, #b2d8d8 100%)",
            "background-origin": "border-box",
            "border-color": "#31aeb0",
            "color": "#008080",
        };
      },
    
    tooltip: "Tav, the Celestial of Limits",
    color: "#333c81",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.ad.antimatter.gte(Number.MAX_VALUE))
        {
            player.ta.reachedNegativeInfinity = true
        }

        if (player.ta.reachedNegativeInfinity && !player.ta.unlockedReverseBreak)
        {
            if (!player.revc.skip && player.ta.reachedNegativeInfinity) 
            {
                player.tab = "revc"
            } 
            /* else if (hasMilestone("ip", 21))
            {
                layers.bigc.crunch()

            } */
        }  else if (player.tab == "revc")
        {
            player.tab = "in"
        }

        player.ta.negativeInfinityPointsToGet = new Decimal(1)
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("ip", 12))
        player.ta.negativeInfinityPointsToGet = player.ta.negativeInfinityPointsToGet.mul(buyableEffect("ta", 34))
        
        player.ta.negativeInfinityPause = player.ta.negativeInfinityPause.sub(1)
        if (player.ta.negativeInfinityPause.gt(0))
        {
            layers.ta.negativeInfinityReset();
        }

        for (let i = 0; i < player.ta.dimensionPowerEffects.length; i++)
        {
            player.ta.dimensionPowerEffects[i] = player.ta.dimensionPower[i].pow(0.6).div(10).add(1)
            player.ta.dimensionPower[i] = player.ta.dimensionPower[i].add(player.ta.dimensionPowerPerSecond[i].mul(delta))
            player.ta.dimensionPowerPerSecond[i] = player.ta.dimensionPowerPerSecond[i].mul(buyableEffect("ip", 13))
            player.ta.dimensionPowerPerSecond[i] = player.ta.dimensionPowerPerSecond[i].mul(buyableEffect("ta", 35))
            if (hasUpgrade('ta', 12)) player.ta.dimensionPowerPerSecond[i] = player.ta.dimensionPowerPerSecond[i].mul(upgradeEffect("ta", 12))

            if (i == 0) player.ta.dimensionPowerTexts[i] = "You have " + format(player.ta.dimensionPower[i]) + " " + formatWhole(player.ta.dimensionPowerIndex.add(1)) + "st dimension power, which boosts antimatter by x" + format(player.ta.dimensionPowerEffects[i]) + ".\nYou are producing " + format(player.ta.dimensionPowerPerSecond[i]) + " 1st dimenion power per second."
            if (i == 1) player.ta.dimensionPowerTexts[i] = "You have " + format(player.ta.dimensionPower[i]) +  " " + formatWhole(player.ta.dimensionPowerIndex.add(1)) + "nd dimension power, which boosts 1st dimensions by x" + format(player.ta.dimensionPowerEffects[i]) + ".\nYou are producing " + format(player.ta.dimensionPowerPerSecond[i]) + " 2nd dimenion power per second."
            if (i == 2) player.ta.dimensionPowerTexts[i] = "You have " + format(player.ta.dimensionPower[i]) +  " " + formatWhole(player.ta.dimensionPowerIndex.add(1)) + "rd dimension power, which boosts 2nd dimensions by x" + format(player.ta.dimensionPowerEffects[i]) + ".\nYou are producing " + format(player.ta.dimensionPowerPerSecond[i]) + " 3rd dimenion power per second."
            if (i == 3) player.ta.dimensionPowerTexts[i] = "You have " + format(player.ta.dimensionPower[i]) +  " " + formatWhole(player.ta.dimensionPowerIndex.add(1)) + "th dimension power, which boosts 3rd dimensions by x" + format(player.ta.dimensionPowerEffects[i]) + ".\nYou are producing " + format(player.ta.dimensionPowerPerSecond[i]) + " 4th dimenion power per second."
            if (i >= 4) player.ta.dimensionPowerTexts[i] = "You have " + format(player.ta.dimensionPower[i]) + " " +  formatWhole(player.ta.dimensionPowerIndex.add(1)) + "th dimension power, which boosts " + formatWhole(player.ta.dimensionPowerIndex) + "th dimensions by x" + format(player.ta.dimensionPowerEffects[i]) + ".\nYou are producing " + format(player.ta.dimensionPowerPerSecond[i]) + " " + formatWhole(player.ta.dimensionPowerIndex) + "th dimenion power per second."
        }

        player.ta.dimensionPowerPerSecond[0] = buyableEffect("ta", 11)
        player.ta.dimensionPowerPerSecond[1] = buyableEffect("ta", 12)
        player.ta.dimensionPowerPerSecond[2] = buyableEffect("ta", 13)
        player.ta.dimensionPowerPerSecond[3] = buyableEffect("ta", 14)
        player.ta.dimensionPowerPerSecond[4] = buyableEffect("ta", 15)
        player.ta.dimensionPowerPerSecond[5] = buyableEffect("ta", 16)
        player.ta.dimensionPowerPerSecond[6] = buyableEffect("ta", 17)
        player.ta.dimensionPowerPerSecond[7] = buyableEffect("ta", 18)

        for (let i = 0; i < player.ta.dimensionAutobuyTexts.length; i++)
        {
            if (player.ta.dimensionAutobuyToggles[i]) player.ta.dimensionAutobuyTimer[i] = player.ta.dimensionAutobuyTimer[i].add(onepersec.mul(delta))
            if (player.ta.dimensionAutobuyTimer[i].gte(player.ta.dimensionAutobuyTimeReq[i]))
            {
                if (i == 0 && player.ta.buyables[21].gte(1))
                {
                    buyBuyable("ad", 11)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                if (i == 1 && player.ta.buyables[22].gte(1))
                {
                    buyBuyable("ad", 12)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                if (i == 2 && player.ta.buyables[23].gte(1))
                {
                    buyBuyable("ad", 13)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                if (i == 3 && player.ta.buyables[24].gte(1))
                {
                    buyBuyable("ad", 14)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                if (i == 4 && player.ta.buyables[25].gte(1))
                {
                    buyBuyable("ad", 15)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                if (i == 5 && player.ta.buyables[26].gte(1))
                {
                    buyBuyable("ad", 16)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                if (i == 6 && player.ta.buyables[27].gte(1))
                {
                    buyBuyable("ad", 17)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                if (i == 7 && player.ta.buyables[28].gte(1))
                {
                    buyBuyable("ad", 18)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                if (i == 8 && player.ta.buyables[29].gte(1))
                {
                    buyBuyable("ad", 1)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                if (i == 9 && player.ta.buyables[31].gte(1))
                {
                    if (player.ad.extraDimsGalaxiesLocked ? player.ad.dimensionAmounts[player.ad.dimBoostDimCost].gte(player.ad.dimBoostReq) && (player.ad.dimBoostAmount.lt(6)) : player.ad.dimensionAmounts[player.ad.dimBoostDimCost].gte(player.ad.dimBoostReq))
                    {
                        player.ad.dimBoostAmount = player.ad.dimBoostAmount.add(1)
                        player.ad.dimBoostPause = new Decimal(6)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                }
                if (i == 10 && player.ta.buyables[32].gte(1))
                {
                    if (player.ad.extraDimsGalaxiesLocked ? player.ad.dimensionAmounts[player.ad.galaxyDimCost].gte(player.ad.galaxyReq) && (player.ad.galaxyAmount.lt(1)) : player.ad.dimensionAmounts[player.ad.galaxyDimCost].gte(player.ad.galaxyReq))
                    {
                        player.ad.galaxyAmount = player.ad.galaxyAmount.add(1)
                        player.ad.galaxyPause = new Decimal(6)
                    player.ta.dimensionAutobuyTimer[i] = new Decimal(0)
                }
                }
            }



            if (i == 0) player.ta.dimensionAutobuyTexts[i] = formatWhole(player.ta.dimensionAutobuyIndex.add(1)) + "st dimension autobuy: " + player.ta.dimensionAutobuyToggles[i]
            if (i == 1) player.ta.dimensionAutobuyTexts[i] = formatWhole(player.ta.dimensionAutobuyIndex.add(1)) + "nd dimension autobuy: " + player.ta.dimensionAutobuyToggles[i]
            if (i == 2) player.ta.dimensionAutobuyTexts[i] = formatWhole(player.ta.dimensionAutobuyIndex.add(1)) + "rd dimension autobuy: " + player.ta.dimensionAutobuyToggles[i]
            if (i > 2 && i < 8) player.ta.dimensionAutobuyTexts[i] = formatWhole(player.ta.dimensionAutobuyIndex.add(1)) + "th dimension autobuy: " + player.ta.dimensionAutobuyToggles[i]
            if (i == 8) player.ta.dimensionAutobuyTexts[i] = "Tickspeed autobuy: " + player.ta.dimensionAutobuyToggles[i]
            if (i == 9) player.ta.dimensionAutobuyTexts[i] = "Dimension boost autobuy: " + player.ta.dimensionAutobuyToggles[i]
            if (i == 10) player.ta.dimensionAutobuyTexts[i] = "Galaxy autobuy: " + player.ta.dimensionAutobuyToggles[i]
        }
        player.ta.dimensionAutobuyTimeReq = [new Decimal(5), new Decimal(6), new Decimal(7), new Decimal(8), new Decimal(9), new Decimal(10), new Decimal(11), new Decimal(12), new Decimal(8),new Decimal(30),new Decimal(45),]
        player.ta.dimensionAutobuyTimeReq[0] = player.ta.dimensionAutobuyTimeReq[0].div(buyableEffect("ta", 21))
        player.ta.dimensionAutobuyTimeReq[1] = player.ta.dimensionAutobuyTimeReq[1].div(buyableEffect("ta", 22))
        player.ta.dimensionAutobuyTimeReq[2] = player.ta.dimensionAutobuyTimeReq[2].div(buyableEffect("ta", 23))
        player.ta.dimensionAutobuyTimeReq[3] = player.ta.dimensionAutobuyTimeReq[3].div(buyableEffect("ta", 24))
        player.ta.dimensionAutobuyTimeReq[4] = player.ta.dimensionAutobuyTimeReq[4].div(buyableEffect("ta", 25))
        player.ta.dimensionAutobuyTimeReq[5] = player.ta.dimensionAutobuyTimeReq[5].div(buyableEffect("ta", 26))
        player.ta.dimensionAutobuyTimeReq[6] = player.ta.dimensionAutobuyTimeReq[6].div(buyableEffect("ta", 27))
        player.ta.dimensionAutobuyTimeReq[7] = player.ta.dimensionAutobuyTimeReq[7].div(buyableEffect("ta", 28))
        player.ta.dimensionAutobuyTimeReq[8] = player.ta.dimensionAutobuyTimeReq[8].div(buyableEffect("ta", 29))
        player.ta.dimensionAutobuyTimeReq[9] = player.ta.dimensionAutobuyTimeReq[9].div(buyableEffect("ta", 31))
        player.ta.dimensionAutobuyTimeReq[10] = player.ta.dimensionAutobuyTimeReq[10].div(buyableEffect("ta", 32))
    },
    negativeInfinityReset()
    {
        player.ad.antimatter = new Decimal(10)

        player.ad.buyables[1] = new Decimal(0)

        for (let i = 0; i < player.ad.dimensionAmounts.length; i++)
        {
            player.ad.dimensionAmounts[i] = new Decimal(0)
            player.ad.dimensionsPurchased[i] = new Decimal(0)
        }

        player.ad.dimensionsUnlocked[4] = false
        player.ad.dimensionsUnlocked[5] = false
        player.ad.dimensionsUnlocked[6] = false
        player.ad.dimensionsUnlocked[7] = false
        
        player.ad.dimBoostAmount = new Decimal(0)
        player.ad.galaxyAmount = new Decimal(0)

        player.in.infinityPause = new Decimal(6)
    },
    branches: ["ad", "ip"],
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
            title() { return "<h3>Lower Dimension" },
            canClick() { return player.ta.dimensionPowerIndex.gt(0) },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionPowerIndex = player.ta.dimensionPowerIndex.sub(1)
            },
            style: { width: '100px', "min-height": '100px' },
        },
        3: {
            title() { return "<h3>Increase Dimension" },
            canClick() { return player.ta.dimensionPowerIndex.lt(7) },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionPowerIndex = player.ta.dimensionPowerIndex.add(1)
            },
            style: { width: '100px', "min-height": '100px' },
        },
        4: {
            title() { return "<h3>Lower" },
            canClick() { return player.ta.dimensionAutobuyIndex.gt(0) },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyIndex = player.ta.dimensionAutobuyIndex.sub(1)
            },
            style: { width: '100px', "min-height": '100px' },
        },
        5: {
            title() { return "<h3>Increase" },
            canClick() { return player.ta.dimensionAutobuyIndex.lt(10) },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyIndex = player.ta.dimensionAutobuyIndex.add(1)
            },
            style: { width: '100px', "min-height": '100px' },
        },
        11: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "in"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        12: {
            title() { return "<h3>Toggle On" },
            canClick() { return !player.ta.dimensionAutobuyToggles[player.ta.dimensionAutobuyIndex] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[player.ta.dimensionAutobuyIndex] = true
            },
            style: { width: '100px', "min-height": '100px' },
        },
        13: {
            title() { return "<h3>Toggle Off" },
            canClick() { return player.ta.dimensionAutobuyToggles[player.ta.dimensionAutobuyIndex] },
            unlocked() { return true },
            onClick() {
                player.ta.dimensionAutobuyToggles[player.ta.dimensionAutobuyIndex] = false
            },
            style: { width: '100px', "min-height": '100px' },
        },

    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: "Negative Upgrade I",
            unlocked() { return true },
            description: "Unlocks Buyables.",
            cost: new Decimal(10),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
        },
        12:
        {
            title: "Negative Upgrade II",
            unlocked() { return true },
            description: "NIP boosts Dimension Power gain.",
            cost: new Decimal(25),
            currencyLocation() { return player.ta },
            currencyDisplayName: "Negative Infinity Points",
            currencyInternalName: "negativeInfinityPoints",
            effect() {
                return player.ta.negativeInfinityPoints.pow(0.75).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2) },
            unlocked() { return player.ta.dimensionPowerIndex.eq(0) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>1st Dimension Power"
            },
            display() {
                return "which are producing " + format(tmp[this.layer].buyables[this.id].effect) + " 1st dimension power per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.1
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2) },
            unlocked() { return player.ta.dimensionPowerIndex.eq(1) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>2nd Dimension Power"
            },
            display() {
                return "which are producing " + format(tmp[this.layer].buyables[this.id].effect) + " 2nd dimension power per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.1
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2) },
            unlocked() { return player.ta.dimensionPowerIndex.eq(2) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>3rd Dimension Power"
            },
            display() {
                return "which are producing " + format(tmp[this.layer].buyables[this.id].effect) + " 3rd dimension power per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.1
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2) },
            unlocked() { return player.ta.dimensionPowerIndex.eq(3) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>4th Dimension Power"
            },
            display() {
                return "which are producing " + format(tmp[this.layer].buyables[this.id].effect) + " 4th dimension power per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.1
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        15: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2) },
            unlocked() { return player.ta.dimensionPowerIndex.eq(4) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>5th Dimension Power"
            },
            display() {
                return "which are producing " + format(tmp[this.layer].buyables[this.id].effect) + " 5th dimension power per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.1
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        16: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2) },
            unlocked() { return player.ta.dimensionPowerIndex.eq(5) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>6th Dimension Power"
            },
            display() {
                return "which are producing " + format(tmp[this.layer].buyables[this.id].effect) + " 6th dimension power per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.1
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        17: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2) },
            unlocked() { return player.ta.dimensionPowerIndex.eq(6) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>7th Dimension Power"
            },
            display() {
                return "which are producing " + format(tmp[this.layer].buyables[this.id].effect) + " 7th dimension power per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.1
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        18: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.2) },
            unlocked() { return player.ta.dimensionPowerIndex.eq(7) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>8th Dimension Power"
            },
            display() {
                return "which are producing " + format(tmp[this.layer].buyables[this.id].effect) + " 8th dimension power per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.1
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        21: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(1) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.ta.dimensionAutobuyIndex.eq(0) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>1st Dimension Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(1)
                let growth = 1.5
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        22: {
            cost(x) { return new Decimal(1.55).pow(x || getBuyableAmount(this.layer, this.id)).mul(2) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.ta.dimensionAutobuyIndex.eq(1) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>2nd Dimension Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(2)
                let growth = 1.55
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        23: {
            cost(x) { return new Decimal(1.6).pow(x || getBuyableAmount(this.layer, this.id)).mul(3) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.ta.dimensionAutobuyIndex.eq(2) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>3rd Dimension Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(3)
                let growth = 1.6
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        24: {
            cost(x) { return new Decimal(1.65).pow(x || getBuyableAmount(this.layer, this.id)).mul(4) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.ta.dimensionAutobuyIndex.eq(3) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>4th Dimension Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(4)
                let growth = 1.65
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        25: {
            cost(x) { return new Decimal(1.7).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.ta.dimensionAutobuyIndex.eq(4) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>5th Dimension Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(5)
                let growth = 1.7
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        26: {
            cost(x) { return new Decimal(1.75).pow(x || getBuyableAmount(this.layer, this.id)).mul(6) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.ta.dimensionAutobuyIndex.eq(5) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>6th Dimension Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(6)
                let growth = 1.75
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        27: {
            cost(x) { return new Decimal(1.8).pow(x || getBuyableAmount(this.layer, this.id)).mul(7) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.ta.dimensionAutobuyIndex.eq(6) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>7th Dimension Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(7)
                let growth = 1.8
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        28: {
            cost(x) { return new Decimal(1.85).pow(x || getBuyableAmount(this.layer, this.id)).mul(8) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.ta.dimensionAutobuyIndex.eq(7) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>8th Dimension Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(8)
                let growth = 1.85
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        29: {
            cost(x) { return new Decimal(1.9).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.ta.dimensionAutobuyIndex.eq(8) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Tickspeed Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.9
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        31: {
            cost(x) { return new Decimal(1.95).pow(x || getBuyableAmount(this.layer, this.id)).mul(15) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.ta.dimensionAutobuyIndex.eq(9) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Dimboost Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(15)
                let growth = 1.95
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        32: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(25) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.ta.dimensionAutobuyIndex.eq(10) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Galaxy Autobuy"
            },
            display() {
                return "which are dividing cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(25)
                let growth = 2
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        33: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(2) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return hasUpgrade("ta", 11) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>IP Buyable"
            },
            display() {
                return "which are multiplying infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(2)
                let growth = 1.1
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        34: {
            cost(x) { return new Decimal(1.15).pow(x || getBuyableAmount(this.layer, this.id)).mul(3) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return hasUpgrade("ta", 11) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>NIP Buyable"
            },
            display() {
                return "which are multiplying negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(3)
                let growth = 1.15
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        35: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.4).pow(1.1).add(1) },
            unlocked() { return hasUpgrade("ta", 11) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>DIMP Buayble"
            },
            display() {
                return "which are multiplying all dimension power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(5)
                let growth = 1.2
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        36: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(8) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.3).pow(1.05).add(1) },
            unlocked() { return hasUpgrade("ta", 11) },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>AD Buayble"
            },
            display() {
                return "which are multiplying all antimatter dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(8)
                let growth = 1.25
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

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
            "Negative Infinity": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.ta.negativeInfinityPoints) + "</h3> negative infinity points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + format(player.ta.negativeInfinityPointsToGet) + "</h3> on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.ta.dimensionPowerTexts[player.ta.dimensionPowerIndex] }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14], ["buyable", 15], ["buyable", 16], ["buyable", 17], ["buyable", 18]]],
                ]

            },
            "Automation": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.ta.negativeInfinityPoints) + "</h3> negative infinity points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + format(player.ta.negativeInfinityPointsToGet) + "</h3> on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.ta.dimensionAutobuyTexts[player.ta.dimensionAutobuyIndex] }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return formatTime(player.ta.dimensionAutobuyTimer[player.ta.dimensionAutobuyIndex]) + "/" + formatTime(player.ta.dimensionAutobuyTimeReq[player.ta.dimensionAutobuyIndex]) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h4>You need at least 1 of the buyable to start autobuying." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 4], ["clickable", 5], ["clickable", 12], ["clickable", 13]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 21], ["buyable", 22], ["buyable", 23], ["buyable", 24], ["buyable", 25], ["buyable", 26], ["buyable", 27], ["buyable", 28], ["buyable", 29], ["buyable", 31], ["buyable", 32]]],
                ]

            },
            "Buyables and Upgrades": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 33], ["buyable", 34], ["buyable", 35], ["buyable", 36]]],
                ]

            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ad.antimatter) + "</h3> antimatter." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.ad.antimatterPerSecond) + "</h3> antimatter per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.in.unlockedInfinity && hasChallenge("ip", 18)}
})
addLayer("revc", {
    name: "Reverse Crunch", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RC", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        spawnedWisps: false,

        minipause: new Decimal(0)
    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Ranks",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.tab == "revc" && !player.bigc.spawnedWisps)
        {
            createWisps('black', 50, 3);
            player.bigc.spawnedWisps = true
        } else if (player.tab != "revc")
        {
            removeWisps();
        }

        player.revc.minipause = player.revc.minipause.sub(1)
        if (player.revc.minipause.gt(0))
        {
            layers.revc.reverseCrunch();
        }
    },
    branches: ["branch"],
    clickables: {
        11: {
            title() { return "<h2>REVERSE CRUNCH" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.add(player.ta.negativeInfinityPointsToGet)
                player.tab = "in"
                player.revc.minipause = new Decimal(3)
             },
            style: { width: '300px', "min-height": '120px' },
        },
        
    },
    reverseCrunch(){
        player.ta.reachedNegativeInfinity = false
        player.ta.negativeInfinityPause = new Decimal(5)

        for (let i = 0; i < player.ta.dimensionPower.length; i++)
        {
            player.ta.dimensionPower[i] = new Decimal(0)
        }
    }, 
    bars: {
    },
    upgrades: {
    },
    buyables: {
    },
    milestones: {

    },
    challenges: {
    },
    infoboxes: {
    },

    tabFormat: [
                    ["raw-html", function () { return "<h2>1e308 antimatter- amazing." }, { "color": "black", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "150px"],
                    ["row", [["clickable", 11]]],
    ],
    layerShown() { return player.startedGame == true }
})
window.addEventListener('load', function() {
    player.bigc.spawnedWisps = false

});