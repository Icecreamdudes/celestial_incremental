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
        
        player.ta.negativeInfinityPause = player.ta.negativeInfinityPause.sub(1)
        if (player.ta.negativeInfinityPause.gt(0))
        {
            layers.ta.negativeInfinityReset();
        }

        for (let i = 0; i < player.ta.dimensionPowerEffects.length; i++)
        {
            player.ta.dimensionPowerEffects[i] = player.ta.dimensionPower[i].pow(0.6).div(10).add(1)
            player.ta.dimensionPower[i] = player.ta.dimensionPower[i].add(player.ta.dimensionPowerPerSecond[i].mul(delta))

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
    },
    bars: {
    },
    upgrades: {
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