addLayer("ra", {
    name: "Radiation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RA", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        radiation: new Decimal(0),
        storedRadiation: new Decimal(0),
        radiationOutput: new Decimal(0),
        radiationPerSecond: new Decimal(0),
        coreIndex: new Decimal(0),

        radiationSoftcapEffect: new Decimal(1),
        radiationSoftcapStart: new Decimal(10000),

        equippedRadiationOutput: new Decimal(0),
        unequippedRadiationOutput: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],

        equippedRadiationValue: new Decimal(0),
        unequippedRadiationValue: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        radiationValueLimit: new Decimal(100),

        radiationMax: false,
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(120deg, #0e8a22 0%, #45ff17 100%)",
            "background-origin": "border-box",
            "border-color": "#260454",
            "color": "#260454",
        };
    },
    tooltip: "Radiation",
    branches: ["coa",],
    color: "#0e8a22",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.tab == "ra" && (player.subtabs["ra"]["stuff"] == "Main")) setCoreColors(document.getElementById("radiationCore"), player.cop.processedCoreColorFuel, player.cop.processedCoreColorStrength, null); //null for now

        player.ra.radiationOutput = new Decimal(0)
        for (let i = 0; i < player.ra.unequippedRadiationValue.length; i++)
        {
            player.ra.radiationOutput = player.ra.radiationOutput.add(player.ra.unequippedRadiationValue[i])
        }
        player.ra.radiationOutput = player.ra.radiationOutput.add(player.ra.equippedRadiationOutput)

        player.ra.radiationPerSecond = player.ra.radiationOutput
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.div(player.ra.radiationSoftcapEffect)
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(buyableEffect("ra", 13))
        if (hasUpgrade("ev8", 19)) player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(upgradeEffect("ev8", 19))
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(buyableEffect("fu", 52))
        player.ra.radiationPerSecond = player.ra.radiationPerSecond.mul(levelableEffect("pet", 1205)[0])
        
        if (hasMilestone("s", 13)) player.ra.radiation = player.ra.radiation.add(player.ra.radiationPerSecond.mul(delta))

        player.ra.radiationSoftcapStart = new Decimal(10000)
        player.ra.radiationSoftcapStart = player.ra.radiationSoftcapStart.mul(buyableEffect("ra", 11)) 
        player.ra.radiationSoftcapStart = player.ra.radiationSoftcapStart.mul(buyableEffect("cs", 12)) 

        player.ra.radiationSoftcapEffect = new Decimal(1)
        if (player.ra.radiation.gte(player.ra.radiationSoftcapStart))
        {
            player.ra.radiationSoftcapEffect = player.ra.radiation.sub(player.ra.radiationSoftcapStart).pow(0.345)
            player.ra.radiationSoftcapEffect = player.ra.radiationSoftcapEffect.div(buyableEffect("ra", 12))
            player.ra.radiationSoftcapEffect = player.ra.radiationSoftcapEffect.div(buyableEffect("cs", 12))
        }

    },

    generateRadiationValue()
    {
        player.ra.equippedRadiationValue = player.cop.processedCoreStrength.add(1).mul(10).add(getRandomInt(10))

        for (let i = 0; i < player.ra.unequippedRadiationValue.length; i++)
        {
            if (player.coa.coreOccupied[i] == true)
            {
                player.ra.unequippedRadiationValue[i] = player.coa.coreStrengths[i].add(1).mul(10).add(getRandomInt(10)).mul(buyableEffect("cs", 13))
            }
        }
    }, 
    generateRadiationOutput()
    {
        player.ra.equippedRadiationOutput = player.ra.equippedRadiationValue.mul(Decimal.add(2, Math.random()))

        for (let i = 0; i < player.ra.unequippedRadiationValue.length; i++)
        {
            if (player.coa.coreOccupied[i] == true)
            {
                player.ra.unequippedRadiationOutput[i] = player.ra.unequippedRadiationValue[i].mul(Decimal.mul(Decimal.add(2, Math.random()), 0.1)).mul(buyableEffect("cs", 11))
            }
        }
    }, 
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "s"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.ra.radiationMax == false },
            unlocked() { return true },
            onClick() {
                player.ra.radiationMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.ra.radiationMax == true  },
            unlocked() { return true },
            onClick() {
                player.ra.radiationMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        101: {
            title() { return "<div id=core0 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ra.coreIndex = 0
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
        102: {
            title() { return "<div id=core1 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ra.coreIndex = 1
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
        103: {
            title() { return "<div id=core2 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ra.coreIndex = 2
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
        104: {
            title() { return "<div id=core3 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ra.coreIndex = 3
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
        105: {
            title() { return "<div id=core4 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ra.coreIndex = 4
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
        106: {
            title() { return "<div id=core5 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ra.coreIndex = 5
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
        107: {
            title() { return "<div id=core6 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ra.coreIndex = 6
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
        108: {
            title() { return "<div id=core7 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ra.coreIndex = 7
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
        109: {
            title() { return "<div id=core8 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ra.coreIndex = 8
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
        111: {
            title() { return "<div id=core9 class=singularityCore><div class=centerCircle></div>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.ra.coreIndex = 9
            },
            style: { width: '140px', "min-height": '140px', borderRadius: '15px' },
        },
    },
    bars: {
    },
    upgrades: { 
    },
    buyables: {
        11: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.ra.radiation},
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).pow(1.2).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Softcap Extender"
            },
            display() {
                return 'which are extending the radiation softcap by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
        },
        12: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.ra.radiation},
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Softcap Weakener"
            },
            display() {
                return 'which are weakening the radiation softcap by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
        },
        13: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(1000) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.ra.radiation},
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(2, getBuyableAmount(this.layer, this.id))},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Radiation Doubler"
            },
            display() {
                return 'which are boosting radiation gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
        },
        14: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.ra.radiation},
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(4, getBuyableAmount(this.layer, this.id))},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Crystal Quadrupler"
            },
            display() {
                return 'which are boosting crystal gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
        },
        15: {
            costBase() { return new Decimal(4000) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.ra.radiation},
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(2, getBuyableAmount(this.layer, this.id))},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Oil Doubler"
            },
            display() {
                return 'which are boosting oil gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
        },
        16: {
            costBase() { return new Decimal(12000) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(375) },
            currency() { return player.ra.radiation},
            pay(amt) { player.ra.radiation = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(3, getBuyableAmount(this.layer, this.id))},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "NIP Tripler"
            },
            display() {
                return 'which are boosting NIP gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Radiation'
            },
            buy(mult) {
                if (mult != true) {
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
            style: { width: '275px', height: '125px', }
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
                    ["raw-html", function () { return "Total Radiation Output: " + format(player.ra.radiationOutput) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Current core being processed: " + player.coa.strengths[player.cop.processedCoreStrength] + " " + player.coa.fuels[player.cop.processedCoreFuel] + " Singularity Core"}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Radiation Value: " + formatWhole(player.ra.equippedRadiationValue) }, { "color": "white", "text-align": "justify", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Radiation Output: " + format(player.ra.equippedRadiationOutput) }, { "color": "white", "text-align": "justify", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<div id=radiationCore class=singularityCore><div class=centerCircle></div>" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 101],["clickable", 102],["clickable", 103],["clickable", 104],["clickable", 105],["clickable", 106],["clickable", 107],["clickable", 108],["clickable", 109],["clickable", 111]]],
                    ["raw-html", function () { return player.coa.strengths[player.coa.coreStrengths[player.ra.coreIndex]] + " " + player.coa.fuels[player.coa.coreFuelSources[player.ra.coreIndex]] + " Singularity Core"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Radiation Value: " + formatWhole(player.ra.unequippedRadiationValue[player.ra.coreIndex]) }, { "color": "white", "text-align": "justify", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Radiation Output: " + format(player.ra.unequippedRadiationOutput[player.ra.coreIndex]) }, { "color": "white", "text-align": "justify", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Radiation value is determined based on core strength and a random value." }, { "color": "white", "text-align": "justify", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Radiation output is determined based on radiation value and another random value." }, { "color": "white", "text-align": "justify", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Stored cores also produce radiation, but at a slower rate." }, { "color": "white", "text-align": "justify", "font-size": "20px", "font-family": "monospace" }],
                ]
            },
            "Softcap and Buyables": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Softcap starts at " + format(player.ra.radiationSoftcapStart) + "."}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Softcap divides radiation gain by /" + format(player.ra.radiationSoftcapEffect) + "."}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13]]],
                    ["row", [["ex-buyable", 14], ["ex-buyable", 15], ["ex-buyable", 16]]],
                ]
            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.ra.radiation) + "</h3> radiation." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "Radiation per second:  " + format(player.ra.radiationPerSecond) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "(Stored radiation: " + format(player.ra.storedRadiation) + ")" }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasMilestone("s", 13)  }
})
