addLayer('g', {
    name: 'Grass', // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: 'G', // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        isLayerLoaded: false,

        // The characters are state and player.g.isLayerLoaded, respectively:
        // nn: !s !p
        // ny: !s p
        // yn: s !p
        // yy: s p
        lastLayerState: 'nn',

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

        isMoonstoneLoaded: false,
        moonstone: new Decimal(0),
        savedMoonstone: new Decimal(0),
        moonstoneEffect: new Decimal(1),
        moonstoneCap: new Decimal(6),
        moonstoneCount: new Decimal(0),
        moonstoneVal: new Decimal(1),
        moonstoneReq: new Decimal(10), // Seconds per spawn
        moonstoneTimer: new Decimal(0),

        moonstoneMaxHealth: new Decimal(100),
        moonstoneDamage: new Decimal(20),
        reloadTime: new Decimal(400),
        moonstoneLevel: new Decimal(1),
        moonstoneLevelEffects: [
            new Decimal(1),
            new Decimal(1),
            new Decimal(1),
        ],
        moonstoneLevelMax: new Decimal(1),
    }
    },
    automate() {
        if (hasMilestone('r', 13))
        {
            buyBuyable('g', 11)
            buyBuyable('g', 12)
            buyBuyable('g', 13)
            buyBuyable('g', 14)
            buyBuyable('g', 15)
            buyBuyable('g', 16)
            buyBuyable('g', 17)
            buyBuyable('g', 18)
            buyBuyable('g', 19)
        }
        if (hasMilestone('r', 15) && player.g.auto == true)
        {
            buyUpgrade('g', 11)
            buyUpgrade('g', 12)
            buyUpgrade('g', 13)
            buyUpgrade('g', 14)
            buyUpgrade('g', 15)
            buyUpgrade('g', 16)
            buyUpgrade('g', 17)
            buyUpgrade('g', 18)
            buyUpgrade('g', 19)
            buyUpgrade('g', 21)
        }
    },
    nodeStyle() {
    },
    tooltip: 'Grass',
    color: '#119B35',
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

            onMoonstoneMicrotab: player.subtabs.g.stuff === 'Moonstone',
        }

        const lastLayerState = (state.inGrassLayer ? 'y' : 'n')
            + (player.g.isLayerLoaded ? 'y' : 'n')

        // Track whether we had the layer loaded previously; the way
        // this is set up, player.g.isLayerLoaded follows the state
        // of state.inGrassLayer, with a single tick delay, e.g.
        // let s be state.inGrassLayer, let p be player.g.isLayerLoaded:
        //    State 1: on Grass layer (yields s && p)
        //    State 2: switch to another layer (yields !s && p)
        //    State 3: on another layer (yields !s && !p)
        //    State 4: switch to Grass layer (yields s && !p)
        //    State 5: on Grass layer (yields s && p)
        player.g.isLayerLoaded = state.inGrassLayer

        player.g.thisLayerState = (state.inGrassLayer ? 'y' : 'n')
            + (player.g.isLayerLoaded ? 'y' : 'n')

        // DEBUGGING OUTPUT
        //logOnce('updateEnter', `.../js/grass.js:update() ${JSON.stringify(state)}`)
        //console.log(`Layer state: ${thisLayerState} (was ${player.g.lastLayerState})`)

        // Handle layer switching
        if (player.g.thisLayerState == 'yy' && lastLayerState == 'yn') {
            if (state.onGrassMicrotab) {
                layers.g.loadGrass()
                player.g.isGrassLoaded = true
            } else if (state.onGoldGrassMicrotab) {
                layers.g.loadGoldGrass()
                player.g.isGoldGrassLoaded = true
            } else if (state.onMoonstoneMicrotab) {
                layers.g.loadMoonstone()
                player.g.isMoonstoneLoaded = true
            }
        }

        // Grass isn't loaded if we leave its microtab
        if (player.g.isGrassLoaded && !state.onGrassMicrotab) {
            layers.g.unloadGrass()
            player.g.isGrassLoaded = false
        }

        // Golden grass isn't loaded if we leave its microtab
        if (player.g.isGoldGrassLoaded && !state.onGoldGrassMicrotab) {
            layers.g.unloadGoldGrass()
            player.g.isGoldGrassLoaded = false
        }

        if (player.g.isMoonstoneLoaded && !state.onMoonstoneMicrotab) {
            layers.g.unloadMoonstone()
            player.g.isMoonstoneLoaded = false
        }

        // Handle microtab switching
        if (state.inGrassLayer) {
            if (!player.g.isGrassLoaded && state.onGrassMicrotab) {
                layers.g.loadGrass()
                player.g.isGrassLoaded = true
            } else if (!player.g.isGoldGrassLoaded && state.onGoldGrassMicrotab) {
                layers.g.loadGoldGrass()
                player.g.isGoldGrassLoaded = true
            } else if (!player.g.isMoonstoneLoaded && state.onMoonstoneMicrotab) {
                layers.g.loadMoonstone()
                player.g.isMoonstoneLoaded = true
            }
        }

        // =================================================================

        updateGrass(delta)
        updateGoldGrass(delta)
        updateMoonstone(delta)
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
    unloadMoonstone() {
        // N.B. this space intentionally left blank
    },
    loadMoonstone()
    {
        // moonstone should never be negative!
        if (player.g.moonstoneCount < 0) {
            player.g.moonstoneCount = new Decimal(0)
        }

        removeAllMoonstone()
        createMoonstone(player.g.moonstoneCount)
    },
    branches: ['t'],
    clickables: {
        1: {
            title() { return '<h2>Return' },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = 'i'
            },
            style: { width: '100px', 'min-height': '50px' },
        },
        2: {
            title() { return 'Buy Max On' },
            canClick() { return player.buyMax == false },
            unlocked() { return true },
            onClick() {
                player.buyMax = true
            },
            style: { width: '75px', 'min-height': '50px', }
        },
        3: {
            title() { return 'Buy Max Off' },
            canClick() { return player.buyMax == true  },
            unlocked() { return true },
            onClick() {
                player.buyMax = false
            },
            style: { width: '75px', 'min-height': '50px', }
        },
        4: {
            title() { return '<h3>Lower Level' },
            canClick() { return player.g.moonstoneLevel.gt(1) },
            unlocked() { return true },
            onClick() {
                player.g.moonstoneLevel = player.g.moonstoneLevel.sub(1)
            },
            style: { width: '100px', 'min-height': '100px' },
        },
        5: {
            title() { return '<h3>Increase Level' },
            canClick() { return player.g.moonstoneLevel.lt(player.g.moonstoneLevelMax) },
            unlocked() { return true },
            onClick() {
                player.g.moonstoneLevel = player.g.moonstoneLevel.add(1)
            },
            style: { width: '100px', 'min-height': '100px' },
        },
    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: 'Grass Upgrade I',
            unlocked() { return true },
            description() { return 'Boosts grass value based on prestige points.' },
            cost: new Decimal(250),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
            effect() {
                return player.p.prestigePoints.pow(0.05).div(9).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x' }, // Add formatting to the effect
        },
        12:
        {
            title: 'Grass Upgrade II',
            unlocked() { return true },
            description() { return 'Boost tree gain based on grass.' },
            cost: new Decimal(400),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
            effect() {
                return player.g.grass.pow(0.3).div(7).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+'x' }, // Add formatting to the effect
        },
        13:
        {
            title: 'Grass Upgrade III',
            unlocked() { return true },
            description() { return 'Unlocks Golden Grass.' },
            cost: new Decimal(800),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
        },
        14:
        {
            title: 'Grass Upgrade IV',
            unlocked() { return hasUpgrade('g', 13) },
            description() { return 'Unlocks golden grass buyables.' },
            cost: new Decimal(1500),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
        },
        15:
        {
            title: 'Grass Upgrade V',
            unlocked() { return hasUpgrade('g', 13) },
            description() { return 'Unlocks more tree buyables.' },
            cost: new Decimal(3000),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
        },
        16:
        {
            title: 'Grass Upgrade VI',
            unlocked() { return hasUpgrade('g', 13) },
            description() { return 'Divides golden grass spawn time by /1.3.' },
            cost: new Decimal(4500),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
        },
        17:
        {
            title: 'Grass Upgrade VII',
            unlocked() { return hasMilestone('r', 12) },
            description() { return 'Unlocks tree factor V.' },
            cost: new Decimal(7777),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
        },
        18:
        {
            title: 'Grass Upgrade VIII',
            unlocked() { return hasMilestone('r', 14) },
            description() { return 'Increases grass capacity by +150 and golden grass by +6.' },
            cost: new Decimal(1e7),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
        },
        19:
        {
            title: 'Grass Upgrade IX',
            unlocked() { return hasMilestone('r', 14) },
            description() { return 'Increases grass capacity based on pent. (Max: 1000)' },
            cost: new Decimal(1e9),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
            effect() {
                return player.r.pent.lte(100) ? player.r.pent.mul(10) : new Decimal(1000)
            },
            effectDisplay() { return '+'+formatWhole(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
        },
        21:
        {
            title: 'Grass Upgrade X',
            unlocked() { return hasMilestone('r', 17) },
            description() { return 'Boosts mod gain based on check back level.' },
            cost: new Decimal(1e25),
            currencyLocation() { return player.g },
            currencyDisplayName: 'Grass',
            currencyInternalName: 'grass',
            effect() {
                return player.cb.level.pow(0.8).add(1)
            },
            effectDisplay() { return 'x'+formatWhole(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
        },
        23:
        {
            title: "Grass Upgrade XI",
            unlocked() { return hasUpgrade("i", 22) },
            description() { return "Boost Pollinators gain based on golden grass." },
            cost: new Decimal("1e250"),
            currencyLocation() { return player.g },
            currencyDisplayName: "Grass",
            currencyInternalName: "grass",
            effect() {
                return player.g.goldGrass.add(1).log(10).pow(0.3).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22:
        {
            title: "Grass Upgrade XII",
            unlocked() { return player.po.realmMods || hasUpgrade("g", 22) },
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
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '<br/>Grass Value'
            },
            display() {
                return 'which are boosting grass value by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Grass'
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.2
                if (player.buyMax == false && !hasMilestone('r', 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone('r', 13)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone('r', 13)) player.g.grass = player.g.grass.sub(cost)

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
                return format(getBuyableAmount(this.layer, this.id), 0) + '/200<br/>Grass Grow Rate'
            },
            display() {
                return 'which are dividing grass time requirement by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Grass'
            },
            buy() {
                let base = new Decimal(15)
                let growth = 1.25
                if (player.buyMax == false && !hasMilestone('r', 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone('r', 13)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone('r', 13)) player.g.grass = player.g.grass.sub(cost)

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
                return format(getBuyableAmount(this.layer, this.id), 0) + '/500<br/>Grass Capacity'
            },
            display() {
                return 'which are increasing grass capacity by +' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Grass'
            },
            buy() {
                let base = new Decimal(25)
                let growth = 1.3
                if (player.buyMax == false && !hasMilestone('r', 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone('r', 13)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone('r', 13)) player.g.grass = player.g.grass.sub(cost)

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
                return format(getBuyableAmount(this.layer, this.id), 0) + '<br/>Grass Celestial Point Boost'
            },
            display() {
                return 'which are boosting celestial point gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Grass'
            },
            buy() {
                let base = new Decimal(20)
                let growth = 1.22
                if (player.buyMax == false && !hasMilestone('r', 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone('r', 13)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone('r', 13)) player.g.grass = player.g.grass.sub(cost)

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
                return format(getBuyableAmount(this.layer, this.id), 0) + '<br/>Grass Factor Power Boost'
            },
            display() {
                return 'which are boosting factor power gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Grass'
            },
            buy() {
                let base = new Decimal(35)
                let growth = 1.34
                if (player.buyMax == false && !hasMilestone('r', 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone('r', 13)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone('r', 13)) player.g.grass = player.g.grass.sub(cost)

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
                return format(getBuyableAmount(this.layer, this.id), 0) + '<br/>Grass Prestige Point Boost'
            },
            display() {
                return 'which are boosting prestige point gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Grass'
            },
            buy() {
                let base = new Decimal(60)
                let growth = 1.4
                if (player.buyMax == false && !hasMilestone('r', 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone('r', 13)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone('r', 13)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        17: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(4) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return hasUpgrade('g', 14) },
            canAfford() { return player.g.goldGrass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '<br/>Golden Grass Value'
            },
            display() {
                return 'which are boosting golden grass value by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Golden Grass'
            },
            buy() {
                let base = new Decimal(4)
                let growth = 1.25
                if (player.buyMax == false && !hasMilestone('r', 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone('r', 13)) player.g.goldGrass = player.g.goldGrass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.goldGrass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone('r', 13)) player.g.goldGrass = player.g.goldGrass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        18: {
            cost(x) { return new Decimal(1.45).pow(x || getBuyableAmount(this.layer, this.id)).mul(8) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return hasUpgrade('g', 14) },
            canAfford() { return player.g.goldGrass.gte(this.cost()) && player.g.buyables[18].lt(500)},
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/500<br/>Golden Grass Capacity'
            },
            display() {
                return 'which are increasing golden grass capacity by +' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Golden Grass'
            },
            buy() {
                let base = new Decimal(8)
                let growth = 1.45
                if (player.buyMax == false && !hasMilestone('r', 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone('r', 13)) player.g.goldGrass = player.g.goldGrass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.goldGrass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone('r', 13)) player.g.goldGrass = player.g.goldGrass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        19: {
            cost(x) { return new Decimal(1.7).pow(x || getBuyableAmount(this.layer, this.id)).mul(15) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(3).add(1) },
            unlocked() { return hasUpgrade('g', 14) },
            canAfford() { return player.g.goldGrass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '<br/>Pent Requirement Divider'
            },
            display() {
                return 'which are dividing pent requirement by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Golden Grass'
            },
            buy() {
                let base = new Decimal(15)
                let growth = 1.7
                if (player.buyMax == false && !hasMilestone('r', 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone('r', 13)) player.g.goldGrass = player.g.goldGrass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.goldGrass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone('r', 13)) player.g.goldGrass = player.g.goldGrass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        21: {
            cost(x) { return new Decimal(1.15).pow(x || getBuyableAmount(this.layer, this.id)).mul(2) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            canAfford() { return player.g.moonstone.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '<br/>Moonstone Value'
            },
            display() {
                return 'which are boosting moonstone value by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Moonstone'
            },
            buy() {
                let base = new Decimal(2)
                let growth = 1.15
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.g.moonstone = player.g.moonstone.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.moonstone, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.g.moonstone = player.g.moonstone.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        22: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(3) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.g.moonstone.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '<br/>Moonstone Damage'
            },
            display() {
                return 'which are boosting damage dealt to moonstone by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Moonstone'
            },
            buy() {
                let base = new Decimal(3)
                let growth = 1.25
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.g.moonstone = player.g.moonstone.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.moonstone, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.g.moonstone = player.g.moonstone.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        23: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(4) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).pow(0.6).add(1) },
            unlocked() { return true },
            canAfford() { return player.g.moonstone.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '<br/>Moonstone Reload Time'
            },
            display() {
                return 'which are dividing moonstone reload time by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Moonstone'
            },
            buy() {
                let base = new Decimal(4)
                let growth = 1.3
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.g.moonstone = player.g.moonstone.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.moonstone, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.g.moonstone = player.g.moonstone.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        24: {
            cost(x) { return new Decimal(1.35).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).pow(0.6).add(1) },
            unlocked() { return true },
            canAfford() { return player.g.moonstone.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '<br/>Moonstone Spawn Time'
            },
            display() {
                return 'which are dividing moonstone spawn time by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Moonstone'
            },
            buy() {
                let base = new Decimal(5)
                let growth = 1.35
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.g.moonstone = player.g.moonstone.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.moonstone, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.g.moonstone = player.g.moonstone.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        25: {
            cost(x) { return new Decimal(1.345).pow(x || getBuyableAmount(this.layer, this.id)).mul(2) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).pow(0.9).add(1) },
            unlocked() { return true },
            canAfford() { return player.g.moonstone.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '<br/>Check Back XP Lunar Boost'
            },
            display() {
                return 'which are boosting check back xp gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Moonstone'
            },
            buy() {
                let base = new Decimal(2)
                let growth = 1.345
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.g.moonstone = player.g.moonstone.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.moonstone, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.g.moonstone = player.g.moonstone.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        26: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(3) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.04).add(1) },
            unlocked() { return true },
            canAfford() { return player.g.moonstone.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '<br/>Replicanti Lunar Boost'
            },
            display() {
                return 'which are boosting replicanti mult by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Moonstone'
            },
            buy() {
                let base = new Decimal(3)
                let growth = 1.2
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.g.moonstone = player.g.moonstone.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.moonstone, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.g.moonstone = player.g.moonstone.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        27: {
            cost(x) { return new Decimal(1.35).pow(x || getBuyableAmount(this.layer, this.id)).mul(4) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(44).pow(4).add(1) },
            unlocked() { return true },
            canAfford() { return player.g.moonstone.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '<br/>Hex Lunar Boost'
            },
            display() {
                return 'which are boosting hex 0 points by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Moonstone'
            },
            buy() {
                let base = new Decimal(4)
                let growth = 1.35
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.g.moonstone = player.g.moonstone.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.moonstone, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.g.moonstone = player.g.moonstone.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        28: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(22).pow(2).add(1) },
            unlocked() { return true },
            canAfford() { return player.g.moonstone.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '<br/>Challenge Dice Lunar Boost'
            },
            display() {
                return 'which boosting challenge dice points by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Moonstone'
            },
            buy() {
                let base = new Decimal(5)
                let growth = 1.3
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.g.moonstone = player.g.moonstone.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.moonstone, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.g.moonstone = player.g.moonstone.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        29: {
            cost(x) { return new Decimal(10).pow(x || getBuyableAmount(this.layer, this.id)).mul(100) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1) },
            unlocked() { return true },
            canAfford() { return player.g.moonstone.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '<br/>Increase Max Level'
            },
            display() {
                return 'Current max level: ' + formatWhole(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Moonstone'
            },
            buy() {
                let base = new Decimal(100)
                let growth = 10
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.g.moonstone = player.g.moonstone.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.g.moonstone, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.g.moonstone = player.g.moonstone.sub(cost)

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
            'Grass': {
                buttonStyle: {
                    'color': 'white',
                },
                unlocked: true,
                content: [
                    ['blank', '25px'],
                    ['raw-html', () =>
                        '<h3>' + formatWhole(player.g.grassCount) +
                            '/' + formatWhole(player.g.grassCap) +
                            ' Grass (Hover over the grass)',
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        }
                    ],
                    ['raw-html', () =>
                        '<h3>' + format(player.g.grassTimer) +
                            '/' + format(player.g.grassReq) +
                            ' Seconds to spawn grass.',
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        }
                    ],
                    ['raw-html', () =>
                        options.newMenu
                            ? '<div id=spawn-area class=menu-spawn-area></div>'
                            : '<div id=spawn-area class=spawn-area></div>',
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        }
                    ],
                    ['blank', '600px'],
                ],
            },
            'Golden Grass': {
                buttonStyle: {
                    'color': 'white',
                },
                unlocked: () => hasUpgrade('g', 13),
                content: [
                    ['blank', '25px'],
                    ['raw-html', () =>
                        'You have <h3>' + format(player.g.goldGrass) +
                            '</h3> golden grass, which boost ' +
                            'grass value by <h3>x' +
                            format(player.g.goldGrassEffect) + '.',
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        },
                    ],
                    ['raw-html', () =>
                        'Golden grass value: ' +
                            format(player.g.goldGrassVal) + '.',
                        {
                            'color': 'white',
                            'font-size': '20px',
                            'font-family': 'monospace'
                        },
                    ],
                    ['blank', '25px'],
                    ['raw-html', () =>
                        '<h3>' + formatWhole(player.g.goldGrassCount) +
                            '/' + formatWhole(player.g.goldGrassCap) +
                            ' Golden grass.',
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        },
                    ],
                    ['raw-html', () =>
                        '<h3>' + format(player.g.goldGrassTimer) + '/' +
                            format(player.g.goldGrassReq) +
                            ' Seconds to spawn golden grass.',
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        },
                    ],
                    ['raw-html', () =>
                        options.newMenu
                            ? '<div id=gold-spawn-area class=menu-spawn-area></div>'
                            : '<div id=gold-spawn-area class=spawn-area></div>',
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        },
                    ],
                ],
            },
            'Moonstone': {
                buttonStyle: {
                    'color': '#047ce4',
                    'border-color': '#0490f4'
                },
                unlocked: () => player.ev.evolutionsUnlocked[7],
                content: [
                    ['blank', '25px'],
                    ['raw-html', () =>
                        'You have <h3>' + format(player.g.moonstone) +
                            '</h3> moonstone, which boost golden grass ' +
                            'value by <h3>x' +
                            format(player.g.moonstoneEffect) + '.',
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        },
                    ],
                    ['raw-html', () =>
                        'Moonstone value: ' +
                            format(player.g.moonstoneVal) + '.',
                        {
                            'color': 'white',
                            'font-size': '20px',
                            'font-family': 'monospace'
                        },
                    ],
                    ['blank', '25px'],
                    ['raw-html', () =>
                        '<h3>' + formatWhole(player.g.moonstoneCount) +
                            '/' + formatWhole(player.g.moonstoneCap) +
                            ' Moonstone. (Click to shoot grass bullets ' +
                            'at the moonstone)</h3><h6>(Max HP: ' +
                            format(player.g.moonstoneMaxHealth) +
                            ', Damage: ' + format(player.g.moonstoneDamage) +
                            ', Reload Time: ' + format(player.g.reloadTime) +
                            ' ms, Level: ' +
                            formatWhole(player.g.moonstoneLevel) +
                            '/' + formatWhole(player.g.moonstoneLevelMax) +
                            ')',
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        },
                    ],
                    ['raw-html', () =>
                        '<h3>' + format(player.g.moonstoneTimer) + '/' +
                            format(player.g.moonstoneReq) +
                            ' Seconds to spawn moonstone.',
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        },
                    ],
                    ['raw-html', () =>
                        options.newMenu
                            ? '<div id=mainCircle class=menuMainCircle></div>'
                            : '<div id=mainCircle class=mainCircle></div>',
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        },
                    ],
                    ['raw-html', () =>
                        options.newMenu
                            ? '<div id=moonstone-spawn-area class=menu-spawn-area></div>'
                            : '<div id=moonstone-spawn-area class=spawn-area></div>',
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        },
                    ],
                ],
            },
            'Moonstone Buyables': {
                buttonStyle: {
                    'color': '#047ce4',
                    'border-color': '#0490f4'
                },
                unlocked: () => player.ev.evolutionsUnlocked[7],
                content: [
                    ['blank', '25px'],
                    ['raw-html', () =>
                        'You have <h3>' + format(player.g.moonstone) +
                            '</h3> moonstone.',
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        },
                    ],
                    ['blank', '25px'],
                    ['row', [
                        ['clickable', 2],
                        ['clickable', 3]
                    ]],
                    ['blank', '25px'],
                    ['row', [
                        ['buyable', 21],
                        ['buyable', 22],
                        ['buyable', 23],
                        ['buyable', 24]
                    ]],
                    ['row', [
                        ['buyable', 25],
                        ['buyable', 26],
                        ['buyable', 27],
                        ['buyable', 28]
                    ]],
                ],
            },
            'Moonstone Levels': {
                buttonStyle:  {
                    'color': '#047ce4',
                    'border-color': '#0490f4'
                },
                unlocked: () => player.ev.evolutionsUnlocked[7],
                content: [
                    ['blank', '25px'],
                    ['raw-html', () =>
                        'You have <h3>' + format(player.g.moonstone) +
                            '</h3> moonstone.',
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        },
                    ],
                    ['raw-html', () =>
                        '<h3>Level: ' + formatWhole(player.g.moonstoneLevel) +
                            '/' + formatWhole(player.g.moonstoneLevelMax),
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        },
                    ],
                    ['blank', '25px'],
                    ['row', [
                        ['buyable', 29]
                    ]],
                    ['blank', '25px'],
                    ['row', [
                        ['clickable', 4],
                        ['clickable', 5]
                    ]],
                    ['blank', '25px'],
                    ['raw-html', () =>
                        '<h3>Effects:',
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        },
                    ],
                    ['raw-html', () =>
                        '<h4>x' + format(player.g.moonstoneLevelEffects[0]) +
                            ' to moonstone health.',
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        },
                    ],
                    ['raw-html', () =>
                        '<h4>x' + format(player.g.moonstoneLevelEffects[1]) +
                            ' to moonstone spawn time.',
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        },
                    ],
                    ['raw-html', () =>
                        '<h4>x' + format(player.g.moonstoneLevelEffects[2]) +
                            ' to moonstone value.',
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        },
                    ],
                ],
            },
            'Buyables': {
                buttonStyle: {
                    'color': 'white'
                },
                unlocked: true,
                content: [
                    ['blank', '25px'],
                    ['row', [
                        ['clickable', 2],
                        ['clickable', 3]
                    ]],
                    ['blank', '25px'],
                    ['row', [
                        ['buyable', 11],
                        ['buyable', 12],
                        ['buyable', 13]
                    ]],
                    ['row', [
                        ['buyable', 14],
                        ['buyable', 15],
                        ['buyable', 16]
                    ]],
                    ['blank', '25px'],
                    ['raw-html', () =>
                        hasUpgrade('g', 13)
                            ? 'You have <h3>' + format(player.g.goldGrass) +
                                '</h3> golden grass.'
                            : '',
                        {
                            'color': 'white',
                            'font-size': '24px',
                            'font-family': 'monospace',
                        },
                    ],
                    ['row', [
                        ['buyable', 17],
                        ['buyable', 18],
                        ['buyable', 19]
                    ]],
                ],
            },
            'Upgrades': {
                buttonStyle: {
                    'color': 'white'
                },
                unlocked: () => hasMilestone('r', 11),
                content: [
                    ['blank', '25px'],
                    ['row', [
                        ['upgrade', 11],
                        ['upgrade', 12],
                        ['upgrade', 13],
                        ['upgrade', 14],
                        ['upgrade', 15],
                        ['upgrade', 16]
                    ]],
                    ['row', [
                        ['upgrade', 17],
                        ['upgrade', 18],
                        ['upgrade', 19],
                        ['upgrade', 21],
                        ['upgrade', 23],
                        ['upgrade', 22]
                    ]],
                ],
            },
        },
    },

    tabFormat: [
        ['raw-html', () =>
            'You have <h3>' + format(player.g.grass) +
                '</h3> grass, which boost leaf gain by <h3>x' +
                format(player.g.grassEffect) + '.',
            {
                'color': 'white',
                'font-size': '24px',
                'font-family': 'monospace',
            },
        ],
        ['raw-html', () =>
            'Grass value: ' + format(player.g.grassVal) + '.',
            {
                'color': 'white',
                'font-size': '20px',
                'font-family': 'monospace',
            },
        ],
        ['row', [
            ['clickable', 1]
        ]],
        ['microtabs', 'stuff',
            {
                'border-width': '0px'
            }
        ],
    ],
    layerShown: () => player.startedGame && hasUpgrade('i', 17),
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

    // Cap grass capacity at 500
    // XXX: why are we jumping from 13 to 500?
    if (player.g.buyables[13].gte(13)) {
        player.g.buyables[13] = new Decimal(500)
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

    // Wind Pollinator effect
    if (player.pol.pollinatorsIndex == 4) {
        player.g.grassVal = player.g.grassVal
            .mul(player.pol.pollinatorsEffect[6])
    }

    // Steel buyable and Time Cube effect
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
        .pow(1.05)
        .mul(0.15)
        .add(1)

    if (hasUpgrade('g', 22)) {
        player.g.goldGrassEffect = player.g.goldGrassEffect
            .pow(6)
    }

    // =================================================================
    // Currency logic

    player.g.goldGrass = player.g.goldGrass
        .add(player.g.goldGrassVal
            .mul(buyableEffect('gh', 18)
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
        .mul(player.g.moonstoneEffect)

    // -------------------------
    // REORDERING BOUNDARY: above stays above, below stays below
    // -------------------------

    // Infinity Points upgrade: Upgrade (2, 4)
    // Infinity Points challenge: Challenge 14
    if (hasUpgrade('ip', 24) && !inChallenge('ip', 14)) {
        player.g.goldGrassVal = player.g.goldGrassVal
            .add(upgradeEffect('ip', 24))
    }

    // -------------------------
    // REORDERING BOUNDARY: above stays above, below stays below
    // -------------------------

    // Wind Pollinator effect
    if (player.pol.pollinatorsIndex == 4) {
        player.g.goldGrassVal = player.g.goldGrassVal
            .mul(player.pol.pollinatorsEffect[7])
    }

    player.g.goldGrassVal = player.g.goldGrassVal
        .mul(player.cb.rarePetEffects[4][1])
        .mul(buyableEffect('r', 11))
        .mul(buyableEffect('rm', 26))

    // =================================================================
    // Spawn-time logic

    player.g.goldGrassReq = new Decimal(40)
    if (hasUpgrade('g', 16)) {
        player.g.goldGrassReq = player.g.goldGrassReq
            .div(1.3)
    }

    player.g.goldGrassReq = player.g.goldGrassReq
        .div(buyableEffect('gh', 12))
        .div(player.cb.rarePetEffects[2][1])

    // =================================================================
    // Cap logic

    player.g.goldGrassCap = new Decimal(15)
        .add(buyableEffect('g', 18))

    if (hasUpgrade('g', 18)) {
        player.g.goldGrassCap = player.g.goldGrassCap
            .add(6)
    }
}

const updateMoonstone = (delta) => {
    // Sanity check: gold grass should never go negative!
    if (player.g.moonstoneCount.lt(0)) {
        player.g.moonstoneCount = new Decimal(0)
    }

    // Kick out early if we don't have access
    if (!player.ev.evolutionsUnlocked[7]) {
        return
    }

    // Pre-calculate how much grass we're adding this tick
    const seconds = new Decimal(1).mul(delta)

    // =================================================================
    // Timer logic

    // Timer is always running if we're below grass cap
    const belowMoonstoneCap = player.g.moonstoneCount.lt(player.g.moonstoneCap)
    if (belowMoonstoneCap) {
        player.g.moonstoneTimer = player.g.moonstoneTimer
            .add(seconds)
    }

    const passedMoonstoneSpawnTime =
        player.g.moonstoneTimer.gte(player.g.moonstoneReq)

    if (passedMoonstoneSpawnTime && belowMoonstoneCap) {
        const moonstoneToAdd = player.g.moonstoneTimer
            .div(player.g.moonstoneReq)
            .floor()

        // Add moonstone
        if (belowMoonstoneCap) {
            player.g.moonstoneCount = player.g.moonstoneCount
                .add(moonstoneToAdd)
        }

        // Sanity check: respect the cap
        if (player.g.moonstoneCount.gt(player.g.moonstoneCap)) {
            player.g.moonstoneCount = player.g.moonstoneCap
        }

        // Only create when we're loaded
        if (player.g.isMoonstoneLoaded) {
            createMoonstone(moonstoneToAdd)
        }

        // Reset the timer
        player.g.moonstoneTimer = new Decimal(0)
    } else if (passedMoonstoneSpawnTime && !belowMoonstoneCap) {
        // Reset the timer
        player.g.moonstoneTimer = new Decimal(0)
    }

    player.g.reloadTime = new Decimal(400)
        .div(buyableEffect('g', 23))

    // =================================================================
    // Effect logic

    player.g.moonstoneEffect = player.g.moonstone
        .mul(4)
        .pow(1.5)
        .add(1)

    player.g.moonstoneLevelEffects = [
        player.g.moonstoneLevel.pow(1.5),
        player.g.moonstoneLevel.pow(0.2),
        player.g.moonstoneLevel.pow(1.2)
    ]

    player.g.moonstoneMaxHealth = new Decimal(100)
        .mul(player.g.moonstoneLevelEffects[0])

    player.g.moonstoneDamage = new Decimal(20)
        .mul(buyableEffect('g', 22))
    if (hasUpgrade('ev8', 18)) {
        player.g.moonstoneDamage = player.g.moonstoneDamage.mul(2)
    }

    player.g.moonstoneLevelMax = buyableEffect('g', 29)

    // =================================================================
    // Currency logic

    // ...

    // =================================================================
    // Value logic

    player.g.moonstoneVal = new Decimal(1)
        .mul(buyableEffect('g', 21))
        .mul(player.g.moonstoneLevelEffects[2])

    if (hasUpgrade('ev8', 17)) {
        player.g.moonstoneVal = player.g.moonstoneVal
            .mul(2)
    }

    // =================================================================
    // Spawn-time logic

    player.g.moonstoneReq = new Decimal(15)
        .div(buyableEffect('g', 24))
        .mul(player.g.moonstoneLevelEffects[1])

    // =================================================================
    // Cap logic

    player.g.moonstoneCap = player.cb.evolvedEffects[7][0]
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

// XXX: testing shows that this function returns true _very_ infrequently, e.g.
// after reloading the grass microtab ~30 times with 1250 grass, I got only
// 30 exact occlusions, total; if we had fewer grass squares on the board,
// we should expect the exact occlusion count to drop precipitously, as well.
function doesOcclude(elements, x, y) {
    // Valid selectors (so far):
    //    .green-square
    //    .gold-square
    //    .moonstone
    for (let i = 0; i < elements.length; ++i) {
        const ele = elements[i]

        // 1) All grass/golden grass/moonstone squares are the exact
        //    same size as others of their type
        // 2) We have exact overlap if the left and top are exact matches
        // 3) We are okay with partial overlap, but NOT with exact overlap
        //
        // N.B. getBoundingClientRect() is much more expensive than
        // accessing offsetLeft and offsetTop directly
        const isExactOverlap = (x === ele.offsetLeft) && (y === ele.offsetTop)
        if (isExactOverlap) {
            // Debugging output!
            // console.log('occlude!')

            return true
        }
    }

    return false
}

function getRandomXY (selector, areaWidth, areaHeight, eleWidth, eleHeight) {
    const deadZone = 20

    const coords = {
        randomX: -1,
        randomY: -1
    }
    const elements = document.querySelectorAll(selector)
    do {
        const rightBound = areaWidth - (2 * deadZone) - eleWidth
        coords.randomX = Math.floor(Math.random() * rightBound) + deadZone

        const bottomBound = areaHeight - (2 * deadZone) - eleHeight
        coords.randomY = Math.floor(Math.random() * bottomBound) + deadZone
    } while (doesOcclude(elements, coords.x, coords.y))

    return coords
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

    if (!spawnAreaRect) {
        return
    }

    // Create grass squares based on quantity
    const newChildren = []
    for (let i = 0; i < quantity; i++) {
        const squareWidth = 20
        const squareHeight = 20
        const { randomX, randomY } = getRandomXY('.green-square',
            spawnAreaRect.width, spawnAreaRect.height,
            squareWidth, squareHeight)

        const greenSquare = document.createElement('div')
        Object.assign(greenSquare.style, {
            width: `${squareWidth}px`,
            height: `${squareHeight}px`,
            backgroundColor: '#18e34e',
            position: 'absolute',
            left: `${randomX}px`,
            top: `${randomY}px`,
            border: '2px solid black',
        })
        greenSquare.classList.add('green-square')

        newChildren.push(greenSquare)

        // Is the cursor within range of the square?
        function checkCursorDistance(event) {
            const bounds = greenSquare.getBoundingClientRect()
            const centerX = bounds.left + (bounds.width / 2)
            const centerY = bounds.top + (bounds.height / 2)

            const cursorX = event.clientX
            const cursorY = event.clientY
            const distance = getDistance(cursorX, cursorY, centerX, centerY)

            // If the cursor is within a certain pixel range,
            // remove the grass square
            const detectThreshold = 100
            if (distance <= detectThreshold) {
                removeGrass(greenSquare)
                player.g.grassCount = player.g.grassCount
                    .sub(1)
                player.g.grass = player.g.grass
                    .add(player.g.grassVal)

                // Remove the mousemove listener once grass is collected
                document.removeEventListener('mousemove', checkCursorDistance)
            }
        }

        // Detect when we move in range
        document.addEventListener('mousemove', checkCursorDistance)
    }

    // Appending all the children at once saves on reflows, which _greatly_
    // speeds up rendering time!
    spawnArea.append(...newChildren)
}

function removeGrass(square) {
    // Sanity check: only remove squares with parents
    if (!square.parentNode) {
        return
    }

    square.parentNode.removeChild(square);
}

function removeAllGrass() {
    const squares = document.querySelectorAll('.green-square');
    squares.forEach(square => removeGrass(square));
}

function removeAllGoldGrass() {
    const squares = document.querySelectorAll('.gold-square');
    squares.forEach(square => removeGrass(square));
}

function removeAllMoonstone() {
    const squares = document.querySelectorAll('moonstone');
    squares.forEach(square => removeGrass(square));
}

window.addEventListener('load', function() {
    // This function will be executed after the page is reloaded
    // You can perform any necessary tasks here
    layers.g.loadGrass()
    layers.g.loadGoldGrass()
    layers.g.loadMoonstone()
});


function createGoldGrass(quantity) {
    const spawnArea = document.getElementById('gold-spawn-area');
    const spawnAreaRect = spawnArea?.getBoundingClientRect();

    if (!spawnAreaRect) {
        return
    }

    // Create golden grass squares based on quantity
    const newChildren = []
    for (let i = 0; i < quantity; i++) {
        const squareWidth = 20
        const squareHeight = 20
        const { randomX, randomY } = getRandomXY('.gold-square',
            spawnAreaRect.width, spawnAreaRect.height,
            squareWidth, squareHeight)

        const goldSquare = document.createElement('div');
        Object.assign(goldSquare.style, {
            width: `${squareWidth}px`,
            height: `${squareHeight}px`,
            backgroundColor: '#ffcf40',
            position: 'absolute',
            left: `${randomX}px`,
            top: `${randomY}px`,
            border: '2px solid black',
        })
        goldSquare.classList.add('gold-square')

        newChildren.push(goldSquare)

        // Is the cursor within range of the square?
        function checkCursorDistance(event) {
            const bounds = goldSquare.getBoundingClientRect()
            const centerX = bounds.left + (bounds.width / 2)
            const centerY = bounds.top + (bounds.height / 2)

            const cursorX = event.clientX
            const cursorY = event.clientY
            const distance = getDistance(cursorX, cursorY, centerX, centerY)

            // If the cursor is within a certain pixel range,
            // remove the grass square
            const detectThreshold = 100
            if (distance <= detectThreshold) {
                removeGrass(goldSquare);
                player.g.goldGrassCount = player.g.goldGrassCount
                    .sub(1)
                player.g.goldGrass = player.g.goldGrass
                    .add(player.g.goldGrassVal)

                // Remove the mousemove listener once grass is collected
                document.removeEventListener('mousemove', checkCursorDistance);
            }
        }

        // Detect when we move in range
        document.addEventListener('mousemove', checkCursorDistance);
    }

    // Appending all the children at once saves on reflows, which _greatly_
    // speeds up rendering time!
    spawnArea.append(...newChildren)
}

function createMoonstone(quantity) {
    const spawnArea = document.getElementById('moonstone-spawn-area')
    const spawnAreaRect = spawnArea?.getBoundingClientRect()

    // Sanity check: only render on an existing spawnAreaRect
    if (!spawnAreaRect) {
        return
    }

    // Create moonstone based on quantity
    for (let i = 0; i < quantity; i++) {
        const squareWidth = 20
        const squareHeight = 20
        const { randomX, randomY } = getRandomXY('.moonstone',
            spawnAreaRect.width, spawnAreaRect.height,
            squareWidth, squareHeight)

        const moonstone = document.createElement('div')
        Object.assign(moonstone.style, {
            width: `${squareWidth}px`,
            height: `${squareHeight}px`,
            backgroundColor: '#047ce4',
            position: 'absolute',
            left: `${randomX}px`,
            top: `${randomY}px`,
            border: '2px solid black',
        })
        moonstone.classList.add('moonstone')

        moonstone.health = player.g.moonstoneMaxHealth
        moonstone.damage = player.g.moonstoneDamage

        // Create health bar
        function getNewHealthBar() {
            const hb = document.createElement('div')
            Object.assign(hb.style, {
                width: '100%',
                height: '5px',
                backgroundColor: 'red',
                position: 'absolute',
                left: '0',
                bottom: '100%', // Spawn above the moonstone
                zIndex: '50', // Render above everything else
            })

            return hb
        }

        moonstone.appendChild(getNewHealthBar())
        spawnArea.appendChild(moonstone)

        function getPosOrNeg() {
            return Math.random() < 0.5
                ? -1
                : 1
        }

        function getRandomVelocity(multiplier) {
            return ((Math.random() * 2) + 1) * multiplier
        }

        // Set initial velocity
        let vx = getPosOrNeg() * getRandomVelocity(40)
        let vy = getPosOrNeg() * getRandomVelocity(40)

        // Function to handle the bouncing and movement
        function bounce() {
            const moonstoneRect = moonstone.getBoundingClientRect();

            // Bounce off left
            if (moonstoneRect.left <= spawnAreaRect.left) {
                vx = Math.abs(vx)

                // Pop to inside
                moonstone.style.left = `${spawnAreaRect.left}px`
            }

            // Bounce off right
            if (moonstoneRect.right >= spawnAreaRect.right) {
                vx = -Math.abs(vx)

                // Pop to inside
                moonstone.style.left =
                    `${spawnAreaRect.right - moonstoneRect.width}px`
            }

            // Bounce off top
            if (moonstoneRect.top <= spawnAreaRect.top) {
                vy = Math.abs(vy)

                // Pop to inside
                moonstone.style.top = `${spawnAreaRect.top}px`
            }

            // Bounce off bottom
            if (moonstoneRect.bottom >= spawnAreaRect.bottom) {
                vy = -Math.abs(vy)

                // Pop to inside
                moonstone.style.top =
                    `${spawnAreaRect.bottom - moonstoneRect.height}px`
            }

            // Update position
            moonstone.style.left = `${moonstone.offsetLeft + vx}px`;
            moonstone.style.top = `${moonstone.offsetTop + vy}px`;

            requestAnimationFrame(bounce);
        }

        // Start the bouncing animation
        bounce()

        // Check for collision with small circles
        document.addEventListener('smallCircleFired', (event) => {
            function updateHealthBar() {
                const healthPercentage =
                    moonstone.health / player.g.moonstoneMaxHealth * 100

                // XXX: this may need to change if we attach more children
                moonstone.firstChild.style.width = `${healthPercentage}%`
            }

            const smallCircle = event.detail
            const smallCircleRect = smallCircle.getBoundingClientRect()
            const moonstoneRect = moonstone.getBoundingClientRect()

            // Check for collision
            const shotInMoonstone =
                moonstoneRect.left < smallCircleRect.right &&
                moonstoneRect.right > smallCircleRect.left &&
                moonstoneRect.top < smallCircleRect.bottom &&
                moonstoneRect.bottom > smallCircleRect.top
            if (shotInMoonstone) {
                // Reduce health
                moonstone.health -= moonstone.damage
                updateHealthBar()

                // Remove small circle upon collision
                smallCircle.remove()

                // Remove moonstone if health is zero or less
                if (moonstone.health <= 0) {
                    removeGrass(moonstone)
                    player.g.moonstoneCount = player.g.moonstoneCount
                        .sub(1)
                    player.g.moonstone = player.g.moonstone
                        .add(player.g.moonstoneVal)
                }
            }
        })
    }
}

let canShoot = true
function shootSmallCircle(event) {
    // Sanity check: is cooldown active?
    if (!canShoot) {
        return
    }

    // Kick out if one of these is true:
    //    1) We're not in the Grass tab
    //    2) We're not in the Moonstone microtab
    if (player.tab != 'g' || player.subtabs.g.stuff != 'Moonstone') {
        return
    }

    // Shots spawn in the middle of the main circle
    const rect = mainCircle.getBoundingClientRect()
    const centerX = rect.left + (rect.width / 2)
    const centerY = rect.top + (rect.height / 2)

    const smallCircle = document.createElement('div')
    Object.assign(smallCircle.style, {
        width: '20px',
        height: '20px',
        backgroundColor: 'green',
        borderRadius: '50%',
        position: 'absolute',
        left: `${centerX - 10}px`,
        top: `${centerY - 10}px`,
        border: '2px solid black',
        zIndex: '20', // Shots render on top of everything else
    })
    document.body.appendChild(smallCircle)

    // Calculate the angle towards the click position
    const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX)
    let x = parseFloat(smallCircle.style.left);
    let y = parseFloat(smallCircle.style.top);

    let last = -1
    function move(timestamp) {
        if (last < 0) {
            last = timestamp
        }

        requestAnimationFrame(move)

        // Target FPS is limited by TMT's framecap
        const targetFps = 60
        const frameMs = 1000 / targetFps
        const elapsedMs = timestamp - last
        if (elapsedMs < frameMs) {
            return
        }

        const speed = 20 // pixels per frame
        x += Math.cos(angle) * speed * elapsedMs / frameMs
        y += Math.sin(angle) * speed * elapsedMs / frameMs

        Object.assign(smallCircle.style, {
            left: `${x}px`,
            top: `${y}px`,
        })

        // Emit a custom event to check for collision with moonstones
        const collisionEvent = new CustomEvent('smallCircleFired', {
            detail: smallCircle
        })
        document.dispatchEvent(collisionEvent)

        last = timestamp
    }

    // Start moving the small circle
    requestAnimationFrame(move)

    // Shots only live for so many seconds
    const lifetimeMs = 8000
    setTimeout(() => {
        smallCircle.remove()
    }, lifetimeMs)

    // Set the cooldown
    canShoot = false
    setTimeout(() => {
        canShoot = true
    }, player.g.reloadTime)
}

// Set up click event listener on the document to shoot circles
document.addEventListener('click', (event) => shootSmallCircle(event))
