addLayer("sd", {
    name: "Singularity Dimensions", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SD", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        //singularity power
        singularityPower: new Decimal(0),
        singularityPowerEffect: new Decimal(1), //infinity point
        singularityPowerEffect2: new Decimal(1), //infinity dimensions
        singularityPowerEffect3: new Decimal(1), //points (^)
        singularityPowerPerSecond: new Decimal(0),

        // Dimension Amounts
        dimensionAmounts: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        dimensionsPerSecond: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],

        //buymax
        dimMax: false,

        //radiation
        pausedDimensions: false,
        producingDimensions: false,
        radiationUsage: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(120deg, #782424 0%, #8c1111 100%)",
            "background-origin": "border-box",
            "border-color": "#3d1616",
            "color": "#3d1616",
        };
    },
    tooltip: "Singularity Dimensions",
    branches: ["co",],
    color: "#3d1616",
    update(delta) {
        let onepersec = new Decimal(1)

        // Singularity Power Effects
        player.sd.singularityPowerEffect = player.sd.singularityPower.pow(0.4).add(1)
        player.sd.singularityPowerEffect2 = player.sd.singularityPower.pow(1.1).add(1)
        
        if (player.sd.pausedDimensions && player.sd.producingDimensions) {
        // Singularity Power Gain
        player.sd.singularityPower = player.sd.singularityPower.add(player.sd.singularityPowerPerSecond.mul(delta))

        player.sd.singularityPowerPerSecond = player.sd.dimensionAmounts[0]
            .mul(buyableEffect("sd", 11))
            .mul(player.co.cores.singularity.effect[2])
            .mul(buyableEffect("sma", 14))
            .mul(levelableEffect("pet", 308)[1])
        // Dimension Gain
        for (let i = 0; i < player.sd.dimensionAmounts.length; i++) {
            player.sd.dimensionAmounts[i] = player.sd.dimensionAmounts[i].add(player.sd.dimensionsPerSecond[i].mul(delta))
        }
        for (let i = 0; i < player.sd.dimensionAmounts.length-1; i++) {
            player.sd.dimensionsPerSecond[i] = player.sd.dimensionAmounts[i+1]
            .mul(buyableEffect("sd", i+12))
            .mul(buyableEffect("fu", 53))
            .mul(buyableEffect("sma", 14))
            .mul(player.co.cores.singularity.effect[2])
        }

        player.ra.storedRadiation = player.ra.storedRadiation.sub(player.sd.radiationUsage.mul(delta))
        }

        player.sd.radiationUsage = player.sd.buyables[11]
            .mul(player.sd.buyables[12].add(1))
            .mul(player.sd.buyables[13].add(1))
            .mul(player.sd.buyables[14].add(1))
            .mul(player.sd.buyables[15].add(1))
            .mul(player.sd.buyables[16].add(1))
            .mul(player.sd.buyables[17].add(1))
            .mul(player.sd.buyables[18].add(1))
            .mul(3)
            .pow(0.5)
            .div(buyableEffect("fu", 54))


        if (player.ra.storedRadiation.gt(player.sd.radiationUsage.mul(0.1))) {
            player.sd.producingDimensions = true
        } else
        {
            player.sd.producingDimensions = false
            player.ra.storedRadiation = new Decimal(0)
        }
    },
    clickables: {
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.sd.dimMax == false },
            unlocked() { return true },
            onClick() {
                player.sd.dimMax = true
            },
            style() {
                if (getBuyableAmount('sd', 1).lt(8)) {
                    return { width: '75px', "min-height": '50px', borderRadius: '0px' }
                } else {
                    return { width: '75px', "min-height": '50px', borderRadius: '10px 0px 0px 10px' }
                }
            } 
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.sd.dimMax == true  },
            unlocked() { return true },
            onClick() {
                player.sd.dimMax = false
            },
            style: { width: '75px', "min-height": '50px', borderRadius: '0px' }
        },
        4: {
            title() { return "Unpause Dimension Production" },
            canClick() { return player.sd.pausedDimensions == false  },
            unlocked() { return true },
            onClick() {
                player.sd.pausedDimensions = true
            },
            style: { width: '200px', "min-height": '50px', borderRadius: '0px' }
        },
        5: {
            title() { return "Pause Dimension Production" },
            canClick() { return player.sd.pausedDimensions == true  },
            unlocked() { return true },
            onClick() {
                player.sd.pausedDimensions = false
            },
            style: { width: '200px', "min-height": '50px', borderRadius: '0px 10px 10px 0px' }
        },

    },
    bars: {
    },
    upgrades: { 
    },
    buyables: {
        1: {
            purchaseLimit() { return new Decimal(8) },
            currency() { return player.s.singularityPoints },
            unlocked() { return getBuyableAmount(this.layer, this.id).lt(8) },
            cost(x) {
                if (getBuyableAmount(this.layer, this.id).eq(0)) {
                    return new Decimal("100")
                } else if (getBuyableAmount(this.layer, this.id).eq(1)) {
                    return new Decimal("1000")
                } else if (getBuyableAmount(this.layer, this.id).eq(2)) {
                    return new Decimal("10000")
                } else if (getBuyableAmount(this.layer, this.id).eq(3)) {
                    return new Decimal("1e6")
                } else if (getBuyableAmount(this.layer, this.id).eq(4)) {
                    return new Decimal("1e8")
                } else if (getBuyableAmount(this.layer, this.id).eq(5)) {
                    return new Decimal("1e11")
                } else if (getBuyableAmount(this.layer, this.id).eq(6)) {
                    return new Decimal("1e15")
                } else {
                    return getBuyableAmount(this.layer, this.id).sub(6).mul("1e20")
                }
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Next ID: " + format(tmp[this.layer].buyables[this.id].cost) + " Singularity Points"
            },
            buy() {
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { width: '250px', height: '50px', borderRadius: '10px 0px 0px 10px' }
        },
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(3) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("sd", 1).gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SP"
            },
            buy() {
                if (player.sd.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sd.dimensionAmounts[0] = player.sd.dimensionAmounts[0].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sd.dimensionAmounts[0] = player.sd.dimensionAmounts[0].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        12: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(10) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("sd", 1).gte(2) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SP"
            },
            buy() {
                if (player.sd.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sd.dimensionAmounts[1] = player.sd.dimensionAmounts[1].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sd.dimensionAmounts[1] = player.sd.dimensionAmounts[1].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        13: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(33) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("sd", 1).gte(3) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SP"
            },
            buy() {
                if (player.sd.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sd.dimensionAmounts[2] = player.sd.dimensionAmounts[2].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sd.dimensionAmounts[2] = player.sd.dimensionAmounts[2].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        14: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(100) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("sd", 1).gte(4) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SP"
            },
            buy() {
                if (player.sd.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sd.dimensionAmounts[3] = player.sd.dimensionAmounts[3].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sd.dimensionAmounts[3] = player.sd.dimensionAmounts[3].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        15: {
            costBase() { return new Decimal(1e7) },
            costGrowth() { return new Decimal(333) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("sd", 1).gte(5) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SP"
            },
            buy() {
                if (player.sd.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sd.dimensionAmounts[4] = player.sd.dimensionAmounts[4].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sd.dimensionAmounts[4] = player.sd.dimensionAmounts[4].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        16: {
            costBase() { return new Decimal(1e10) },
            costGrowth() { return new Decimal(1000) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("sd", 1).gte(6) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SP"
            },
            buy() {
                if (player.sd.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sd.dimensionAmounts[5] = player.sd.dimensionAmounts[5].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sd.dimensionAmounts[5] = player.sd.dimensionAmounts[5].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        17: {
            costBase() { return new Decimal(1e14) },
            costGrowth() { return new Decimal(3333) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("sd", 1).gte(7) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SP"
            },
            buy() {
                if (player.sd.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sd.dimensionAmounts[6] = player.sd.dimensionAmounts[6].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sd.dimensionAmounts[6] = player.sd.dimensionAmounts[6].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        18: {
            costBase() { return new Decimal(1e18) },
            costGrowth() { return new Decimal(10000) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("sd", 1).gte(8) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SP"
            },
            buy() {
                if (player.sd.dimMax == false) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.sd.dimensionAmounts[7] = player.sd.dimensionAmounts[7].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.sd.dimensionAmounts[7] = player.sd.dimensionAmounts[7].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
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
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.s.singularityPoints) + "</h3> singularity points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Stored radiation: " + format(player.ra.storedRadiation) + "" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Radiation Usage: (" + format(player.sd.radiationUsage) + "/s)" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["buyable", 1], ["clickable", 2], ["clickable", 3], ["clickable", 4], ["clickable", 5]]],
                    ["raw-html", function () { return "Singularity power and dimension amounts are reset on singularity reset." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["row", [["raw-html", function () { return !player.sd.pausedDimensions && player.sd.producingDimensions ? "PRODUCTION PAUSED" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }]]],
                    ["row", [["raw-html", function () { return !player.sd.producingDimensions ? "PRODUCTION HALTED - NO STORED RADIATION" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }]]],
                    ["blank", "25px"],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("sd", 1).gte(1) ? "1st dimension (" + format(buyableEffect("sd", "11")) + "x): " + format(player.sd.dimensionAmounts[0]) + " (+" + format(player.sd.dimensionsPerSecond[0]) + "/s)" : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 11],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("sd", 1).gte(2) ? "2nd dimension (" + format(buyableEffect("sd", "12")) + "x): " + format(player.sd.dimensionAmounts[1]) + " (+" + format(player.sd.dimensionsPerSecond[1]) + "/s)" : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 12],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("sd", 1).gte(3) ? "3rd dimension (" + format(buyableEffect("sd", "13")) + "x): " + format(player.sd.dimensionAmounts[2]) + " (+" + format(player.sd.dimensionsPerSecond[2]) + "/s)" : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 13],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("sd", 1).gte(4) ? "4th dimension (" + format(buyableEffect("sd", "14")) + "x): " + format(player.sd.dimensionAmounts[3]) + " (+" + format(player.sd.dimensionsPerSecond[3]) + "/s)" : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 14],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("sd", 1).gte(5) ? "5th dimension (" + format(buyableEffect("sd", "15")) + "x): " + format(player.sd.dimensionAmounts[4]) + " (+" + format(player.sd.dimensionsPerSecond[4]) + "/s)" : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 15],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("sd", 1).gte(6) ? "6th dimension (" + format(buyableEffect("sd", "16")) + "x): " + format(player.sd.dimensionAmounts[5]) + " (+" + format(player.sd.dimensionsPerSecond[5]) + "/s)" : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 16],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("sd", 1).gte(7) ? "7th dimension (" + format(buyableEffect("sd", "17")) + "x): " + format(player.sd.dimensionAmounts[6]) + " (+" + format(player.sd.dimensionsPerSecond[6]) + "/s)" : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 17],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("sd", 1).gte(8) ? "8th dimension (" + format(buyableEffect("sd", "18")) + "x): " + format(player.sd.dimensionAmounts[7]) : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 18],
                    ]],
                    ["blank", "25px"],
                ]
            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.sd.singularityPower) + "</h3> singularity power, which boosts infinity and negative infinity points by x" + format(player.sd.singularityPowerEffect) + ", and infinity dimensions by x" + format(player.sd.singularityPowerEffect2) + "." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.sd.singularityPowerPerSecond) + "</h3> singularity power per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasMilestone("s", 14)  }
})
