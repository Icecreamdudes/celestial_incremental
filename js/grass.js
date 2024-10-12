addLayer("g", {
    name: "Grass", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        isGrassLoaded: false,
        grass: new Decimal(0),
        savedGrass: new Decimal(0),
        grassEffect: new Decimal(1),
        grassCap: new Decimal(100),
        grassCount: new Decimal(0),
        grassVal: new Decimal(1),
        grassReq: new Decimal(4), // Seconds per spawn
        grassTimer: new Decimal(0),

        isGoldGrassLoaded: false,
        goldGrass: new Decimal(0),
        savedGoldGrass: new Decimal(0),
        goldGrassEffect: new Decimal(1),
        goldGrassCap: new Decimal(15),
        goldGrassCount: new Decimal(0),
        goldGrassVal: new Decimal(1),
        goldGrassReq: new Decimal(40), // Seconds per spawn
        goldGrassTimer: new Decimal(0),
    }
    },
    automate() {
        if (hasMilestone("r", 13))
        {
            buyBuyable("g", 11)
            buyBuyable("g", 12)
            buyBuyable("g", 13)
            buyBuyable("g", 14)
            buyBuyable("g", 15)
            buyBuyable("g", 16)
            buyBuyable("g", 17)
            buyBuyable("g", 18)
            buyBuyable("g", 19)
        }
        if (hasMilestone("r", 15) && player.g.auto == true)
        {
            buyUpgrade("g", 11)
            buyUpgrade("g", 12)
            buyUpgrade("g", 13)
            buyUpgrade("g", 14)
            buyUpgrade("g", 15)
            buyUpgrade("g", 16)
            buyUpgrade("g", 17)
            buyUpgrade("g", 18)
            buyUpgrade("g", 19)
            buyUpgrade("g", 21)
        }
    },
    nodeStyle() {
    },
    tooltip: "Grass",
    color: "#119B35",
    update(delta) {
        // Grass/gold grass-specific logic relies on knowing whether or
        // not we're actively on their specific microtab, so we handle the
        // loading/unloading logic here, before splitting off into specific
        // sub-handlers.

        const state = {
            // I.e. we currently have the Grass layer loaded
            inGrassLayer: player.tab === 'g',

            // I.e. our currently-selected microtab in the Grass layer
            // is the "Grass" microtab
            onGrassMicrotab: player.subtabs.g.stuff === 'Grass',

            // I.e. our currently-selected microtab in the Grass layer
            // is the "Golden Grass" microtab
            onGoldGrassMicrotab: player.subtabs.g.stuff === 'Golden Grass',
        }

        // DEBUGGING OUTPUT
        //logOnce('updateEnter', `.../js/grass.js:update() ${JSON.stringify(state)}`)

        // Grass isn't loaded if we leave its microtab
        if (player.g.isGrassLoaded && !state.onGrassMicrotab) {
            player.g.isGrassLoaded = false
        }

        // Golden grass isn't loaded if we leave its microtab
        if (player.g.isGoldGrassLoaded && !state.onGoldGrassMicrotab) {
            player.g.isGoldGrassLoaded = false
        }

        // We only ever want to load grasses if we're _in_ the grass layer
        if (state.inGrassLayer) {
            if (!player.g.isGrassLoaded && state.onGrassMicrotab) {
                layers.g.loadGrass()
                player.g.isGrassLoaded = true
            } else if (!player.g.isGoldGrassLoaded && state.onGoldGrassMicrotab) {
                layers.g.loadGoldGrass()
                player.g.isGoldGrassLoaded = true
            }
        }

        // =================================================================

        updateGrass(delta)
        updateGoldGrass(delta)
    },
    unloadGrass() {
        // N.B. this space intentionally left blank
    },
    loadGrass()
    {
        // grassCount should never be negative!
        if (player.g.grassCount < 0) {
            player.g.grassCount = new Decimal(0)
        }

        removeAllGrass()
        createGrass(player.g.grassCount)
    },
    unloadGoldGrass() {
        // N.B. this space intentionally left blank
    },
    loadGoldGrass()
    {
        // goldGrassCount should never be negative!
        if (player.g.goldGrassCount < 0) {
            player.g.goldGrassCount = new Decimal(0)
        }

        removeAllGoldGrass()
        createGoldGrass(player.g.goldGrassCount)
    },
    branches: ["t"],
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
        11:
        {
            title: "Grass Upgrade I",
            unlocked() { return true },
            description() { return "Boosts grass value based on prestige points." },
            cost: new Decimal(250),
            currencyLocation() { return player.g },
            currencyDisplayName: "Grass",
            currencyInternalName: "grass",
            effect() {
                return player.p.prestigePoints.pow(0.05).div(9).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12:
        {
            title: "Grass Upgrade II",
            unlocked() { return true },
            description() { return "Boost tree gain based on grass." },
            cost: new Decimal(400),
            currencyLocation() { return player.g },
            currencyDisplayName: "Grass",
            currencyInternalName: "grass",
            effect() {
                return player.g.grass.pow(0.3).div(7).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13:
        {
            title: "Grass Upgrade III",
            unlocked() { return true },
            description() { return "Unlocks Golden Grass." },
            cost: new Decimal(800),
            currencyLocation() { return player.g },
            currencyDisplayName: "Grass",
            currencyInternalName: "grass",
        },
        14:
        {
            title: "Grass Upgrade IV",
            unlocked() { return hasUpgrade("g", 13) },
            description() { return "Unlocks golden grass buyables." },
            cost: new Decimal(1500),
            currencyLocation() { return player.g },
            currencyDisplayName: "Grass",
            currencyInternalName: "grass",
        },
        15:
        {
            title: "Grass Upgrade V",
            unlocked() { return hasUpgrade("g", 13) },
            description() { return "Unlocks more tree buyables." },
            cost: new Decimal(3000),
            currencyLocation() { return player.g },
            currencyDisplayName: "Grass",
            currencyInternalName: "grass",
        },
        16:
        {
            title: "Grass Upgrade VI",
            unlocked() { return hasUpgrade("g", 13) },
            description() { return "Divides golden grass spawn time by /1.3." },
            cost: new Decimal(4500),
            currencyLocation() { return player.g },
            currencyDisplayName: "Grass",
            currencyInternalName: "grass",
        },
        17:
        {
            title: "Grass Upgrade VII",
            unlocked() { return hasMilestone("r", 12) },
            description() { return "Unlocks tree factor V." },
            cost: new Decimal(7777),
            currencyLocation() { return player.g },
            currencyDisplayName: "Grass",
            currencyInternalName: "grass",
        },
        18:
        {
            title: "Grass Upgrade VIII",
            unlocked() { return hasMilestone("r", 14) },
            description() { return "Increases grass capacity by +150 and golden grass by +6." },
            cost: new Decimal(1e7),
            currencyLocation() { return player.g },
            currencyDisplayName: "Grass",
            currencyInternalName: "grass",
        },
        19:
        {
            title: "Grass Upgrade IX",
            unlocked() { return hasMilestone("r", 14) },
            description() { return "Increases grass capacity based on pent." },
            cost: new Decimal(1e9),
            currencyLocation() { return player.g },
            currencyDisplayName: "Grass",
            currencyInternalName: "grass",
            effect() {
                return player.r.pent.mul(10)
            },
            effectDisplay() { return "+"+formatWhole(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
        },
        21:
        {
            title: "Grass Upgrade X",
            unlocked() { return hasMilestone("r", 17) },
            description() { return "Boosts mod gain based on check back level." },
            cost: new Decimal(1e25),
            currencyLocation() { return player.g },
            currencyDisplayName: "Grass",
            currencyInternalName: "grass",
            effect() {
                return player.cb.level.pow(0.8).add(1)
            },
            effectDisplay() { return "x"+formatWhole(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
        },
        22:
        {
            title: "Grass Upgrade X",
            unlocked() { return player.po.realmMods },
            description() { return "Raise golden grass effect by ^6." },
            cost: new Decimal("1e550"),
            currencyLocation() { return player.g },
            currencyDisplayName: "Grass",
            currencyInternalName: "grass",
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Grass Value"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.2
                if (player.buyMax == false && !hasMilestone("r", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 13)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 13)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(15) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            canAfford() { return player.g.grass.gte(this.cost()) && player.g.buyables[12].lt(200)},
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/200<br/>Grass Grow Rate"
            },
            display() {
                return "which are dividing grass time requirement by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(15)
                let growth = 1.25
                if (player.buyMax == false && !hasMilestone("r", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 13)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 13)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(25) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(2) },
            unlocked() { return true },
            canAfford() { return player.g.grass.gte(this.cost()) && player.g.buyables[13].lt(500)},
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/500<br/>Grass Capacity"
            },
            display() {
                return "which are increasing grass capacity by +" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(25)
                let growth = 1.3
                if (player.buyMax == false && !hasMilestone("r", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 13)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 13)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            cost(x) { return new Decimal(1.22).pow(x || getBuyableAmount(this.layer, this.id)).mul(20) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(3).pow(1.25).add(1) },
            unlocked() { return true },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Grass Celestial Point Boost"
            },
            display() {
                return "which are boosting celestial point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(20)
                let growth = 1.22
                if (player.buyMax == false && !hasMilestone("r", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 13)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 13)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        15: {
            cost(x) { return new Decimal(1.34).pow(x || getBuyableAmount(this.layer, this.id)).mul(35) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(2).pow(1.15).add(1) },
            unlocked() { return true },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Grass Factor Power Boost"
            },
            display() {
                return "which are boosting factor power gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(35)
                let growth = 1.34
                if (player.buyMax == false && !hasMilestone("r", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 13)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 13)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        16: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(60) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Grass Prestige Point Boost"
            },
            display() {
                return "which are boosting prestige point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(60)
                let growth = 1.4
                if (player.buyMax == false && !hasMilestone("r", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 13)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 13)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        17: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(4) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return hasUpgrade("g", 14) },
            canAfford() { return player.g.goldGrass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Golden Grass Value"
            },
            display() {
                return "which are boosting golden grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Golden Grass"
            },
            buy() {
                let base = new Decimal(4)
                let growth = 1.25
                if (player.buyMax == false && !hasMilestone("r", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 13)) player.g.goldGrass = player.g.goldGrass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.goldGrass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 13)) player.g.goldGrass = player.g.goldGrass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        18: {
            cost(x) { return new Decimal(1.45).pow(x || getBuyableAmount(this.layer, this.id)).mul(8) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return hasUpgrade("g", 14) },
            canAfford() { return player.g.goldGrass.gte(this.cost()) && player.g.buyables[18].lt(500)},
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/500<br/>Golden Grass Capacity"
            },
            display() {
                return "which are increasing golden grass capacity by +" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Golden Grass"
            },
            buy() {
                let base = new Decimal(8)
                let growth = 1.45
                if (player.buyMax == false && !hasMilestone("r", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 13)) player.g.goldGrass = player.g.goldGrass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.goldGrass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 13)) player.g.goldGrass = player.g.goldGrass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        19: {
            cost(x) { return new Decimal(1.7).pow(x || getBuyableAmount(this.layer, this.id)).mul(15) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(3).add(1) },
            unlocked() { return hasUpgrade("g", 14) },
            canAfford() { return player.g.goldGrass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Pent Requirement Divider"
            },
            display() {
                return "which are dividing pent requirement by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Golden Grass"
            },
            buy() {
                let base = new Decimal(15)
                let growth = 1.7
                if (player.buyMax == false && !hasMilestone("r", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 13)) player.g.goldGrass = player.g.goldGrass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.goldGrass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 13)) player.g.goldGrass = player.g.goldGrass.sub(cost)

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
            "Grass": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "15px"],
                        ["raw-html", function () { return "<h3>" + formatWhole(player.g.grassCount) + "/" + formatWhole(player.g.grassCap) + " Grass (Hover over the grass)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<h3>" + format(player.g.grassTimer) + "/" + format(player.g.grassReq) + " Seconds to spawn grass." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "<div id=spawn-area></div>" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "600px"],
            ]
            },
            "Golden Grass": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasUpgrade("g", 13) },
                content:
                [
                    ["blank", "15px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.g.goldGrass) + "</h3> golden grass, which boost grass value by <h3>x" + format(player.g.goldGrassEffect) + "." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Golden grass value: " + format(player.g.goldGrassVal) + "." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>" + formatWhole(player.g.goldGrassCount) + "/" + formatWhole(player.g.goldGrassCap) + " Golden grass." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h3>" + format(player.g.goldGrassTimer) + "/" + format(player.g.goldGrassReq) + " Seconds to spawn golden grass." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<div id=gold-spawn-area></div>" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
            "Buyables": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["row", [["clickable", 2], ["clickable", 3]]],
                        ["blank", "25px"],
                        ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13]]],
                        ["row", [["buyable", 14], ["buyable", 15], ["buyable", 16]]],
                        ["blank", "25px"],
                    ["raw-html", function () { return hasUpgrade("g", 13) ? "You have <h3>" + format(player.g.goldGrass) + "</h3> golden grass." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["buyable", 17], ["buyable", 18], ["buyable", 19]]],
                ]
            },
            "Upgrades": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasMilestone("r", 11) },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16]]],
                    ["row", [["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 21], ["upgrade", 22]]],
                ]
            },
        },
    },

    tabFormat: [
                        ["raw-html", function () { return "You have <h3>" + format(player.g.grass) + "</h3> grass, which boost leaf gain by <h3>x" + format(player.g.grassEffect) + "." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "Grass value: " + format(player.g.grassVal) + "." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 17) }
})

const updateGrass = (delta) => {
    // Sanity check: grass should never go negative!
    if (player.g.grassCount.lt(0)) {
        player.g.grassCount = new Decimal(0)
    }

    // Pre-calculate how much grass we're adding this tick
    const seconds = new Decimal(1).mul(delta)

    // Cap grass grow rate at 200
    // XXX: in what cases does this get pushed over 200, and why?
    if (player.g.buyables[12].gt(200)) {
        player.g.buyables[12] = new Decimal(200)
    }

    // =================================================================
    // Timer logic

    // DEBUGGING OUTPUT
    //logOnce('grassTimer1', `grassCount:${player.g.grassCount}; grassCap: ${player.g.grassCap}; grassTimer:${player.g.grassTimer}`)

    // Timer is always running if we're below grass cap
    const belowGrassCap = player.g.grassCount.lt(player.g.grassCap)
    if (belowGrassCap) {
        player.g.grassTimer = player.g.grassTimer.add(seconds)
    }

    const passedGrassSpawnTime = player.g.grassTimer.gte(player.g.grassReq)
    if (passedGrassSpawnTime && belowGrassCap) {
        const grassToAdd = player.g.grassTimer
            .div(player.g.grassReq)
            .floor()

        // Add grass
        if (belowGrassCap) {
            player.g.grassCount = player.g.grassCount.add(grassToAdd)
        }

        // Sanity check: respect the cap
        const aboveGrassCap = player.g.grassCount.gt(player.g.grassCap)
        if (aboveGrassCap) {
            player.g.grassCount = player.g.grassCap
        }

        // Only create when we're loaded
        if (player.g.isGrassLoaded) {
            createGrass(grassToAdd)
        }

        // Reset the timer
        player.g.grassTimer = new Decimal(0)
    } else if (passedGrassSpawnTime && !belowGrassCap) {
        // Reset the timer
        player.g.grassTimer = new Decimal(0)
    }

    // =================================================================
    // Effect logic

    // XXX: is the intent to update the effect before or after adding grass?
    player.g.grassEffect = player.g.grass
        .mul(0.3)
        .pow(0.7)
        .add(1)

    // =================================================================
    // Currency logic

    // Add currency
    // Modified by Grasshop, buyable, Grass Study 1
    player.g.grass = player.g.grass
        .add(player.g.grassVal
            .mul(buyableEffect('gh', 11)
                .mul(delta)
            )
        )

    // Rocket Fuel, upgrade: Rocket Fuel Upgrade 2
    // Straight 20% bonus
    if (hasUpgrade('rf', 12)) {
        player.g.grass = player.g.grass
            .add(player.g.grassVal
                .mul(Decimal
                    .mul(0.2, delta)
                )
            )
    }

    // Infinity Points, milestone: 4 Infinities
    // Straight 5% bonus
    if (hasMilestone('ip', 13) && !inChallenge('ip', 14)) {
        player.g.grass = player.g.grass
            .add(player.g.grassVal
                .mul(Decimal
                    .mul(0.05, delta)
                )
            )
    }

    // =================================================================
    // Value logic

    player.g.grassVal = new Decimal(1)
        .mul(buyableEffect('g', 11))
        .mul(player.g.goldGrassEffect)
        .mul(buyableEffect('t', 17))
        .mul(player.gh.grasshopperEffects[4])
        .mul(player.gh.fertilizerEffect)
        .mul(buyableEffect('f', 1))
        .mul(buyableEffect('f', 2))
        .mul(buyableEffect('f', 3))
        .mul(buyableEffect('f', 4))
        .mul(buyableEffect('f', 5))
        .mul(buyableEffect('f', 6))
        .mul(buyableEffect('f', 7))
        .mul(buyableEffect('f', 8))
        .mul(player.cb.commonPetEffects[3][0])
        .mul(player.d.diceEffects[5])
        .mul(player.rf.abilityEffects[2])
        .div(player.pe.pestEffect[4])

    // Grass upgrade: Grass Upgrade 1
    if (hasUpgrade('g', 11)) {
        player.g.grassVal = player.g.grassVal
            .mul(upgradeEffect('g', 11))
    }

    // AD upgrade: AD Upgrade 4
    if (hasUpgrade('ad', 14)) {
        player.g.grassVal = player.g.grassVal
            .mul(upgradeEffect('ad', 14))
    }

    // -------------------------
    // REORDERING BOUNDARY: above stays above, below stays below
    // -------------------------

    // IP challenge: Challenge 3
    if (inChallenge('ip', 13)) {
        player.g.grassVal = player.g.grassVal
            .pow(0.75)
    }

    // -------------------------
    // REORDERING BOUNDARY: above stays above, below stays below
    // -------------------------

    // IP challenge: Challenge 3
    if (inChallenge('ip', 13) || player.po.hex) {
        player.g.grassVal = player.g.grassVal
            .mul(buyableEffect('h', 14))
    }

    // Antidebuff: Grass
    if (player.de.antidebuffIndex.eq(2)) {
        player.g.grassVal = player.g.grassVal
            .mul(player.de.antidebuffEffect)
    }

    // -------------------------
    // REORDERING BOUNDARY: above stays above, below stays below
    // -------------------------

    // Tav's Domain challenge: Tav's Domain
    if (inChallenge('tad', 11)) {
        player.g.grassVal = player.g.grassVal
            .pow(0.4)
            .pow(buyableEffect('de', 15))
    }

    // -------------------------
    // REORDERING BOUNDARY: above stays above, below stays below
    // -------------------------

    player.g.grassVal = player.g.grassVal
        .mul(buyableEffect('gh', 33))
        .mul(player.r.timeCubeEffects[2])

    // -------------------------
    // REORDERING BOUNDARY: above stays above, below stays below
    // -------------------------

    player.g.grassVal = player.g.grassVal
        .pow(buyableEffect('rm', 25))

    // -------------------------
    // REORDERING BOUNDARY: above stays above, below stays below
    // -------------------------

    const grassAtC18Threshold = player.g.grass.gt(player.g.grass
        .mul(0.4 * delta))

    // IP challenge: Challenge 8
    if (inChallenge('ip', 18) && grassAtC18Threshold) {
        player.g.grass = player.g.grass
            .sub(player.g.grass
                .mul(0.4 * delta)
            )
    }

    // =================================================================
    // Spawn-time logic

    player.g.grassReq = new Decimal(4)
        .div(buyableEffect('g', 12))

    // =================================================================
    // Cap logic

    player.g.grassCap = new Decimal(100)
        .add(buyableEffect('g', 13))

    if (hasUpgrade('g', 18)) {
        player.g.grassCap = player.g.grassCap
            .add(150)
    }
    if (hasUpgrade('g', 19)) {
        player.g.grassCap = player.g.grassCap
            .add(upgradeEffect('g', 19))
    }
}

const updateGoldGrass = (delta) => {
    // Sanity check: gold grass should never go negative!
    if (player.g.goldGrassCount.lt(0)) {
        player.g.goldGrassCount = new Decimal(0)
    }

    // Kick out early if we don't have access
    if (!hasUpgrade('g', 13)) {
        return
    }

    // Pre-calculate how much grass we're adding this tick
    const seconds = new Decimal(1).mul(delta)

    // =================================================================
    // Timer logic

    // Timer is always running if we're below grass cap
    const belowGoldGrassCap = player.g.goldGrassCount.lt(player.g.goldGrassCap)
    if (belowGoldGrassCap) {
        player.g.goldGrassTimer = player.g.goldGrassTimer.add(seconds)
    }

    const passedGoldGrassSpawnTime =
        player.g.goldGrassTimer.gte(player.g.goldGrassReq)
    if (passedGoldGrassSpawnTime && belowGoldGrassCap) {
        const goldGrassToAdd = player.g.goldGrassTimer
            .div(player.g.goldGrassReq)
            .floor()

        // Add grass
        if (belowGoldGrassCap) {
            player.g.goldGrassCount = player.g.goldGrassCount
                .add(goldGrassToAdd)
        }

        // Sanity check: respect the cap
        const aboveGoldGrassCap =
            player.g.goldGrassCount.gt(player.g.goldGrassCap)
        if (aboveGoldGrassCap) {
            player.g.goldGrassCount = player.g.goldGrassCap
        }

        // Only create when we're loaded
        if (player.g.isGoldGrassLoaded) {
            createGoldGrass(goldGrassToAdd)
        }

        // Reset the timer
        player.g.goldGrassTimer = new Decimal(0)
    } else if (passedGoldGrassSpawnTime && !belowGoldGrassCap) {
        // Reset the timer
        player.g.goldGrassTimer = new Decimal(0)
    }
    // =================================================================
    // Effect logic

    player.g.goldGrassEffect = player.g.goldGrass
        .pow(0.7)
        .mul(0.15)
        .add(1)

    if (hasUpgrade("g", 22)) {
        player.g.goldGrassEffect = player.g.goldGrassEffect
            .pow(6)
    }

    // =================================================================
    // Currency logic

    player.g.goldGrass = player.g.goldGrass
        .add(player.g.goldGrassVal
            .mul(buyableEffect("gh", 18)
                .mul(delta)
            )
        )

    // =================================================================
    // Value logic

    player.g.goldGrassVal = new Decimal(1)
        .mul(buyableEffect('g', 17))
        .mul(buyableEffect('t', 18))
        .mul(buyableEffect('m', 13))
        .mul(player.cb.commonPetEffects[3][1])

    // -------------------------
    // REORDERING BOUNDARY: above stays above, below stays below
    // -------------------------

    // Infinity Points upgrade: Upgrade (2, 4)
    // Infinity Points challenge: Challenge 14
    if (hasUpgrade('ip', 24) && !inChallenge('ip', 14)) {
        player.g.goldGrassVal = player.g.goldGrassVal
            .add(upgradeEffect("ip", 24))
    }

    // -------------------------
    // REORDERING BOUNDARY: above stays above, below stays below
    // -------------------------

    player.g.goldGrassVal = player.g.goldGrassVal
        .mul(player.cb.rarePetEffects[4][1])
        .mul(buyableEffect('r', 11))
        .mul(buyableEffect('rm', 26))

    // =================================================================
    // Spawn-time logic

    player.g.goldGrassReq = new Decimal(40)
    if (hasUpgrade("g", 16)) {
        player.g.goldGrassReq = player.g.goldGrassReq
            .div(1.3)
    }

    player.g.goldGrassReq = player.g.goldGrassReq
        .div(buyableEffect("gh", 12))
        .div(player.cb.rarePetEffects[2][1])

    // =================================================================
    // Cap logic

    player.g.goldGrassCap = new Decimal(15)
        .add(buyableEffect("g", 18))

    if (hasUpgrade("g", 18)) {
        player.g.goldGrassCap = player.g.goldGrassCap
            .add(6)
    }
}

function createGrass(quantity) {
    // This _shouldn't_ happen, but there existed cases where e.g.
    // player.g.savedGrass (when it used to exist) somehow got a
    // massively-negative number and as a result, the loop down below
    // never finished. We now dump some info to console if this happens.
    if (quantity < 0) {
        console.log('%cCalled .../js/grass.js:createGrass with negative quantity!', 'color:red; font-size: 150%; font-weight: bold')
      console.log(`%cInfo for the devs: fx: .../js/grass.js:createGrass; quantity: ${quantity}; player.g.grassCount ${player.g.grassCount}`, 'color: yellow; font-size: 125%')
        return
    }

    const spawnArea = document.getElementById('spawn-area');
    const spawnAreaRect = spawnArea?.getBoundingClientRect();

    if (!spawnAreaRect) return; // Exit if spawnAreaRect is null or undefined

    // Function to calculate the distance between two points
    function getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    // Create grass squares based on quantity
    for (let i = 0; i < quantity; i++) {
        let randomX, randomY;
        do {
            randomX = Math.floor(Math.random() * (spawnAreaRect.width - 20)); // Adjust to ensure squares spawn within horizontal range
            randomY = Math.floor(Math.random() * (spawnAreaRect.height - 20)); // Adjust to ensure squares spawn within vertical range
        } while (isCollision(randomX, randomY));

        const greenSquare = document.createElement('div');
        greenSquare.style.width = '20px';
        greenSquare.style.height = '20px';
        greenSquare.style.backgroundColor = '#18e34e';
        greenSquare.style.position = 'absolute';
        greenSquare.style.left = `${randomX}px`;
        greenSquare.style.top = `${randomY}px`;
        greenSquare.style.border = '2px solid black'; // Add a black border
        greenSquare.classList.add('green-square');

        spawnArea.appendChild(greenSquare); // Append to spawnArea instead of document.body

        // Function to check if cursor is within 150px radius of the greenSquare
        function checkCursorDistance(event) {
            const cursorX = event.clientX;
            const cursorY = event.clientY;

            const greenSquareRect = greenSquare.getBoundingClientRect();
            const squareCenterX = greenSquareRect.left + greenSquareRect.width / 2;
            const squareCenterY = greenSquareRect.top + greenSquareRect.height / 2;

            const distance = getDistance(cursorX, cursorY, squareCenterX, squareCenterY);

            // If the cursor is within a certain pixel range, remove the grass square
            if (distance <= 100) {
                removeGrass(greenSquare);
                player.g.grassCount = player.g.grassCount.sub(1);
                player.g.grass = player.g.grass
                    .add(player.g.grassVal);

                // Remove the mousemove listener once grass is collected
                document.removeEventListener('mousemove', checkCursorDistance);
            }
        }

        // Add the mousemove event listener to check the distance from the cursor
        document.addEventListener('mousemove', checkCursorDistance);
    }
}

function isCollision(x, y) {
    const existingGrassSquares = document.querySelectorAll('.green-square');
    for (let i = 0; i < existingGrassSquares.length; i++) {
        const squareRect = existingGrassSquares[i].getBoundingClientRect();
        if (x >= squareRect.left && x <= squareRect.right && y >= squareRect.top && y <= squareRect.bottom) {
            return true; // Collision detecteds
        }
    }
    return false; // No collision detected
}

function removeGrass(square) {
    square.parentNode.removeChild(square);
}

function removeAllGrass() {
    const squares = document.querySelectorAll('.green-square');
    squares.forEach(square => square.parentNode.removeChild(square));
}
function removeAllGoldGrass() {
    const squares = document.querySelectorAll('.gold-square');
    squares.forEach(square => square.parentNode.removeChild(square));
}
window.addEventListener('load', function() {
    // This function will be executed after the page is reloaded
    // You can perform any necessary tasks here
    layers.g.loadGrass();
    layers.g.loadGoldGrass();
});


function createGoldGrass(quantity) {
    const spawnArea = document.getElementById('gold-spawn-area');
    const spawnAreaRect = spawnArea?.getBoundingClientRect();

    if (!spawnAreaRect) return; // Exit if spawnAreaRect is null or undefined

    // Function to calculate the distance between two points
    function getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    // Create golden grass squares based on quantity
    for (let i = 0; i < quantity; i++) {
        let randomX, randomY;
        do {
            randomX = Math.floor(Math.random() * (spawnAreaRect.width - 20)); // Adjust to ensure squares spawn within horizontal range
            randomY = Math.floor(Math.random() * (spawnAreaRect.height - 20)); // Adjust to ensure squares spawn within vertical range
        } while (isCollision(randomX, randomY));

        const goldSquare = document.createElement('div');
        goldSquare.style.width = '20px';
        goldSquare.style.height = '20px';
        goldSquare.style.backgroundColor = '#ffcf40';
        goldSquare.style.position = 'absolute';
        goldSquare.style.left = `${randomX}px`;
        goldSquare.style.top = `${randomY}px`;
        goldSquare.style.border = '2px solid black'; // Add a black border
        goldSquare.classList.add('gold-square');

        spawnArea.appendChild(goldSquare); // Append to spawnArea instead of document.body

        // Function to check if cursor is within 100px radius of the goldenSquare
        function checkCursorDistance(event) {
            const cursorX = event.clientX;
            const cursorY = event.clientY;

            const goldSquareRect = goldSquare.getBoundingClientRect();
            const squareCenterX = goldSquareRect.left + goldSquareRect.width / 2;
            const squareCenterY = goldSquareRect.top + goldSquareRect.height / 2;

            const distance = getDistance(cursorX, cursorY, squareCenterX, squareCenterY);

            // If the cursor is within 100 pixels, remove the golden grass square
            if (distance <= 100) {
                removeGrass(goldSquare);
                player.g.goldGrassCount = player.g.goldGrassCount.sub(1)
                player.g.goldGrass = player.g.goldGrass
                    .add(player.g.goldGrassVal);

                // Remove the mousemove listener once the golden grass is collected
                document.removeEventListener('mousemove', checkCursorDistance);
            }
        }

        // Add the mousemove event listener to check the distance from the cursor
        document.addEventListener('mousemove', checkCursorDistance);
    }
}

const logged = {}
const logOnce = (id, str) => {
  if (logged[id]) {
    return
  }

  logged[id] = true
  console.log(str)
}
