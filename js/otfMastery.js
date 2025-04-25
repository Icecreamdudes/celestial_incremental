addLayer("om", {
    name: "Otherworldy Feature Mastery", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "OM", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        diceMasteryPoints: new Decimal(0),
        diceMasteryPointsEffect: new Decimal(1),
        diceMasteryPointsToGet: new Decimal(0),

        rocketFuelMasteryPoints: new Decimal(0),
        rocketFuelMasteryPointsEffect: new Decimal(1),
        rocketFuelMasteryPointsToGet: new Decimal(0),

        hexMasteryPoints: new Decimal(0),
        hexMasteryPointsEffect: new Decimal(1),
        hexMasteryPointsToGet: new Decimal(0),

    }
    },
    automate() {
        if (hasUpgrade("bi", 109))
        {
            buyBuyable("om", 11)
            buyBuyable("om", 12)
            buyBuyable("om", 13)
            buyBuyable("om", 14)
            buyBuyable("om", 15)
            buyBuyable("om", 16)
        }
    },
    nodeStyle() {
        return {
            background: "linear-gradient(45deg, #8a00a9, #0061ff)",
            "background-origin": "border-box",
            "border-color": "purple",
        };
      },

    tooltip: "Otherworldy Feature Mastery",
    color: "#8a00a9",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.po.dice && player.d.dicePoints.gte(1))
        {
            if (!hasUpgrade("s", 12)) player.om.diceMasteryPointsToGet = player.d.dicePoints.plus(1).log10().pow(2.4).mul(10)
        } else
        {
            player.om.diceMasteryPointsToGet = new Decimal(0)
        }
        if (hasUpgrade("s", 12)) player.om.diceMasteryPointsToGet = player.ta.highestDicePoints.plus(1).log10().pow(2.4).mul(10)
        
        player.om.diceMasteryPointsToGet = player.om.diceMasteryPointsToGet.mul(buyableEffect("om", 16))
        player.om.diceMasteryPointsToGet = player.om.diceMasteryPointsToGet.mul(buyableEffect("tad", 19))
        player.om.diceMasteryPointsToGet = player.om.diceMasteryPointsToGet.mul(buyableEffect("tad", 23))
        player.om.diceMasteryPointsToGet = player.om.diceMasteryPointsToGet.mul(buyableEffect("p", 17))
        player.om.diceMasteryPointsToGet = player.om.diceMasteryPointsToGet.mul(player.rm.realmModsEffect[4])
        player.om.diceMasteryPointsToGet = player.om.diceMasteryPointsToGet.mul(levelableEffect("pet", 109)[0])
        player.om.diceMasteryPointsToGet = player.om.diceMasteryPointsToGet.mul(buyableEffect("fu", 43))

        if (player.po.rocketFuel && player.rf.rocketFuel.gte(1))
        {
            if (!hasUpgrade("s", 12)) player.om.rocketFuelMasteryPointsToGet = player.rf.rocketFuel.plus(1).log10().pow(2.7)
        } else
        {
            player.om.rocketFuelMasteryPointsToGet = new Decimal(0)
        }
        if (hasUpgrade("s", 12)) player.om.rocketFuelMasteryPointsToGet = player.ta.highestRocketFuel.plus(1).log10().pow(2.7)

        player.om.rocketFuelMasteryPointsToGet = player.om.rocketFuelMasteryPointsToGet.mul(buyableEffect("om", 16))
        player.om.rocketFuelMasteryPointsToGet = player.om.rocketFuelMasteryPointsToGet.mul(buyableEffect("tad", 18))
        player.om.rocketFuelMasteryPointsToGet = player.om.rocketFuelMasteryPointsToGet.mul(buyableEffect("tad", 23))
        player.om.rocketFuelMasteryPointsToGet = player.om.rocketFuelMasteryPointsToGet.mul(buyableEffect("p", 17))
        player.om.rocketFuelMasteryPointsToGet = player.om.rocketFuelMasteryPointsToGet.mul(player.rm.realmModsEffect[4])
        player.om.rocketFuelMasteryPointsToGet = player.om.rocketFuelMasteryPointsToGet.mul(levelableEffect("pet", 109)[0])
        player.om.rocketFuelMasteryPointsToGet = player.om.rocketFuelMasteryPointsToGet.mul(buyableEffect("fu", 43))

        if (player.po.hex && player.h.hexPoints[0].gte(1))
        {
            if (!hasUpgrade("s", 12)) player.om.hexMasteryPointsToGet = player.h.hexPoints[0].plus(1).log10().pow(1.65)
        } else
        {
            player.om.hexMasteryPointsToGet = new Decimal(0)
        }
        if (hasUpgrade("s", 12)) player.om.hexMasteryPointsToGet = player.ta.highestHex1Points.plus(1).log10().pow(1.65)

        player.om.hexMasteryPointsToGet = player.om.hexMasteryPointsToGet.mul(buyableEffect("om", 16))
        player.om.hexMasteryPointsToGet = player.om.hexMasteryPointsToGet.mul(buyableEffect("tad", 17))
        player.om.hexMasteryPointsToGet = player.om.hexMasteryPointsToGet.mul(buyableEffect("tad", 23))
        player.om.hexMasteryPointsToGet = player.om.hexMasteryPointsToGet.mul(buyableEffect("p", 17))
        player.om.hexMasteryPointsToGet = player.om.hexMasteryPointsToGet.mul(player.rm.realmModsEffect[4])
        player.om.hexMasteryPointsToGet = player.om.hexMasteryPointsToGet.mul(levelableEffect("pet", 109)[0])
        player.om.hexMasteryPointsToGet = player.om.hexMasteryPointsToGet.mul(buyableEffect("fu", 43))

        player.om.diceMasteryPointsEffect = player.om.diceMasteryPoints.pow(0.1).div(8).add(1)
        player.om.rocketFuelMasteryPointsEffect = player.om.rocketFuelMasteryPoints.pow(0.08).div(10).add(1)
        player.om.hexMasteryPointsEffect = player.om.hexMasteryPoints.pow(0.14).add(1)

        if (hasUpgrade("s", 12)) player.om.diceMasteryPoints = player.om.diceMasteryPoints.add(Decimal.mul(player.om.diceMasteryPointsToGet.mul(delta), 0.04))
        if (hasUpgrade("s", 12)) player.om.rocketFuelMasteryPoints = player.om.rocketFuelMasteryPoints.add(Decimal.mul(player.om.rocketFuelMasteryPointsToGet.mul(delta), 0.04))
        if (hasUpgrade("s", 12)) player.om.hexMasteryPoints = player.om.hexMasteryPoints.add(Decimal.mul(player.om.hexMasteryPointsToGet.mul(delta), 0.04))
        },
    branches: ["id", "bi"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
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
        11: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(10000) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 29)) },
            unlocked() { return true },
            canAfford() { return player.om.diceMasteryPoints.gte(this.cost()) },
            title() {
                return "Infinity Mastery Multiplier"
            },
            display() {
                return "which are multiplying infinities by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Mastery Points"
            },
            buy(mult) {
                let base = new Decimal(10000)
                let growth = 1.2
                if (mult != true && !hasUpgrade("bi", 109))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 109)) player.om.diceMasteryPoints = player.om.diceMasteryPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.om.diceMasteryPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 109)) player.om.diceMasteryPoints = player.om.diceMasteryPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#4531D4", backgroundImage: "linear-gradient(0deg, #8a00a9, #0061ff)", backgroundOrigin: "border-box", color: "white"}
        },
        12: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(10000) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 29))  },
            unlocked() { return true },
            canAfford() { return player.om.rocketFuelMasteryPoints.gte(this.cost()) },
            title() {
                return "Broken Infinity Mastery Multiplier"
            },
            display() {
                return "which are multiplying broken infinities by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Rocket Fuel Mastery Points"
            },
            buy(mult) {
                let base = new Decimal(10000)
                let growth = 1.25
                if (mult != true && !hasUpgrade("bi", 109))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 109)) player.om.rocketFuelMasteryPoints = player.om.rocketFuelMasteryPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.om.rocketFuelMasteryPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 109)) player.om.rocketFuelMasteryPoints = player.om.rocketFuelMasteryPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#4531D4", backgroundImage: "linear-gradient(0deg, #8a00a9, #0061ff)", backgroundOrigin: "border-box", color: "white"}
        },
        13: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(10000) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 29))  },
            unlocked() { return true },
            canAfford() { return player.om.hexMasteryPoints.gte(this.cost()) },
            title() {
                return "Alternate Infinity Mastery Multiplier"
            },
            display() {
                return "which are multiplying alternate infinity types by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex Mastery Points"
            },
            buy(mult) {
                let base = new Decimal(10000)
                let growth = 1.4
                if (mult != true && !hasUpgrade("bi", 109))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 109)) player.om.hexMasteryPoints = player.om.hexMasteryPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.om.hexMasteryPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 109)) player.om.hexMasteryPoints = player.om.hexMasteryPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#4531D4", backgroundImage: "linear-gradient(0deg, #8a00a9, #0061ff)", backgroundOrigin: "border-box", color: "white"}
        },
        14: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(50000) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.05).mul(0.4).add(1).pow(buyableEffect("cs", 29))  },
            unlocked() { return true },
            canAfford() { return player.om.diceMasteryPoints.gte(this.cost()) },
            title() {
                return "Dimension Power Mastery Multiplier"
            },
            display() {
                return "which are multiplying dimension power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Mastery Points"
            },
            buy(mult) {
                let base = new Decimal(50000)
                let growth = 1.3
                if (mult != true && !hasUpgrade("bi", 109))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 109)) player.om.diceMasteryPoints = player.om.diceMasteryPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.om.diceMasteryPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 109)) player.om.diceMasteryPoints = player.om.diceMasteryPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#4531D4", backgroundImage: "linear-gradient(0deg, #8a00a9, #0061ff)", backgroundOrigin: "border-box", color: "white"}
        },
        15: {
            cost(x) { return new Decimal(1.35).pow(x || getBuyableAmount(this.layer, this.id)).mul(50000) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(4).pow(1.2).add(1).pow(buyableEffect("cs", 29))  },
            unlocked() { return true },
            canAfford() { return player.om.rocketFuelMasteryPoints.gte(this.cost()) },
            title() {
                return "Antimatter Mastery Multiplier"
            },
            display() {
                return "which are multiplying antimatter by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Rocket Fuel Mastery Points"
            },
            buy(mult) {
                let base = new Decimal(50000)
                let growth = 1.35
                if (mult != true && !hasUpgrade("bi", 109))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 109)) player.om.rocketFuelMasteryPoints = player.om.rocketFuelMasteryPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.om.rocketFuelMasteryPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 109)) player.om.rocketFuelMasteryPoints = player.om.rocketFuelMasteryPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#4531D4", backgroundImage: "linear-gradient(0deg, #8a00a9, #0061ff)", backgroundOrigin: "border-box", color: "white"}
        },
        16: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(50000) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.5).pow(0.9).add(1).pow(buyableEffect("cs", 29))  },
            unlocked() { return true },
            canAfford() { return player.om.hexMasteryPoints.gte(this.cost()) },
            title() {
                return "Mastery Mastery Multiplier"
            },
            display() {
                return "which are multiplying mastery points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Hex Mastery Points"
            },
            buy(mult) {
                let base = new Decimal(50000)
                let growth = 1.5
                if (mult != true && !hasUpgrade("bi", 109))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 109)) player.om.hexMasteryPoints = player.om.hexMasteryPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.om.hexMasteryPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 109)) player.om.hexMasteryPoints = player.om.hexMasteryPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#4531D4", backgroundImage: "linear-gradient(0deg, #8a00a9, #0061ff)", backgroundOrigin: "border-box", color: "white"}
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
            "Mastery": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["raw-html", function () { return "You have <h3>" + format(player.om.diceMasteryPoints) + "</h3> dice mastery points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "which boost infinity points by <h3>" + format(player.om.diceMasteryPointsEffect) + "</h3>x." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "You have <h3>" + format(player.om.rocketFuelMasteryPoints) + "</h3> rocket fuel mastery points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "which boost negative infinity points by <h3>" + format(player.om.rocketFuelMasteryPointsEffect) + "</h3>x." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "You have <h3>" + format(player.om.hexMasteryPoints) + "</h3> hex mastery points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "which boost all antimatter dimensions by <h3>" + format(player.om.hexMasteryPointsEffect) + "</h3>x." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return player.po.dice ? "You will gain <h3>" + format(player.om.diceMasteryPointsToGet) + "</h3> dice mastery points." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.po.rocketFuel ? "You will gain <h3>" + format(player.om.rocketFuelMasteryPointsToGet) + "</h3> rocket fuel mastery points." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.po.hex ? "You will gain <h3>" + format(player.om.hexMasteryPointsToGet) + "</h3> hex mastery points." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<h2>You produce each mastery point based on the respective OTF currency per infinity reset." }, { "color": "white", "font-size": "12px", "font-family": "monospace" }],
                ]

            },
            "Buyables": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("bi", 15) },
                content:
                [
                        ["blank", "25px"],
                        ["raw-html", function () { return "You have <h3>" + format(player.om.diceMasteryPoints) + "</h3> dice mastery points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have <h3>" + format(player.om.rocketFuelMasteryPoints) + "</h3> rocket fuel mastery points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have <h3>" + format(player.om.hexMasteryPoints) + "</h3> hex mastery points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13]]],
                        ["row", [["ex-buyable", 14], ["ex-buyable", 15], ["ex-buyable", 16]]],
                ]

            },
        },
    },

    tabFormat: [
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return (player.startedGame == true && player.in.unlockedInfinity && hasUpgrade("bi", 14)) || hasMilestone("s", 19)}
})
