addLayer("cof", {
    name: "Core Fragments", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CF", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "U3",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        coreFragments: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        coreFragmentsToGet: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        fragmentScore: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        /*
        0 - Ancient Core Fragments (Points, replicanti points, factors, perks, prestige points, anonymity) 6
        1 - Natural Core Fragments (Grass, golden grass, trees, grasshop, repli-trees, repli-grass, grass-skip) 6
        2 - Technological Core Fragments (Steel, mods, dice, oil, rocket fuel, activated fuel, rocket parts, ) 7
        3 - Paradox Core Fragments (infinity, negative infinity, infinites, broken infinities, alt-broken infinities, mastery points,) 6
        4 - Radioactive Core Fragments (singularity points, singularity dimensions, core fragments, starmetal alloy, starmetal essence, radiation) 6
        5 - Cosmic Core Fragments (antimatter dimensions, replicanti, stars, star dimensions, planets, space dust) 6
        6 - Temporal Core Fragments (Check back xp, xp boost, pet points, offerings) 
        7 - Celestial Core Fragments (Secret) 
        */
        coreFragmentEffects: [
            new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1), new Decimal(1)
        ],
        coreFragmentNames: [
            "Ancient Core Fragments",
            "Natural Core Fragments",
            "Technological Core Fragments",
            "Paradox Core Fragments",
            "Radioactive Core Fragments",
            "Cosmic Core Fragments",
            "Temporal Core Fragments",
            "Celestial Core Fragments",
        ],

        fragmentIndex: 0,
        highestScore: 0
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(120deg,rgb(128, 24, 11) 0%,rgb(136, 6, 82) 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#000000",
            color: "#000000",
        };
    },
    tooltip: "Core Fragments",
    branches: ["co", "s"],
    color: "#33031f",
    update(delta) {
        let onepersec = new Decimal(1)

        player.cof.coreFragmentNames = [
            "Ancient Core Fragments",
            "Natural Core Fragments",
            "Technological Core Fragments",
            "Paradox Core Fragments",
            "Radioactive Core Fragments",
            "Cosmic Core Fragments",
            "Temporal Core Fragments",
            "Celestial Core Fragments",
        ]

        //ancient
        player.cof.fragmentScore[0] = player.points.plus(1).log10().pow(0.7).div(33).div(5)
        player.cof.fragmentScore[0] = player.cof.fragmentScore[0].mul(player.f.factorPower.plus(1).log10().pow(0.446).div(33))
        player.cof.fragmentScore[0] = player.cof.fragmentScore[0].mul(player.p.prestigePoints.plus(1).log10().pow(0.444).div(33))

        //natural
        if (!inChallenge("ip", 12))
        {
        player.cof.fragmentScore[1] = player.t.trees.plus(1).log10().pow(0.425).div(6).div(1.25)
        player.cof.fragmentScore[1] = player.cof.fragmentScore[1].mul(player.g.grass.plus(1).log10().pow(0.35).div(5))
        player.cof.fragmentScore[1] = player.cof.fragmentScore[1].mul(player.gh.grasshoppers.plus(1).log10().pow(0.35).div(5))
        } else
        {
            player.cof.fragmentScore[1] = new Decimal(0)
        }

        //technological
        player.cof.fragmentScore[2] = player.m.codeExperience.plus(1).log10().pow(0.45).div(4)
        player.cof.fragmentScore[2] = player.cof.fragmentScore[2].mul(player.gh.steel.plus(1).log10().pow(0.39).div(2))
        player.cof.fragmentScore[2] = player.cof.fragmentScore[2].mul(player.oi.oil.plus(1).log10().pow(0.35).div(2))

        //paradox
        player.cof.fragmentScore[3] = player.in.infinityPoints.plus(1).log10().pow(0.52).div(4).mul(1.25)
        player.cof.fragmentScore[3] = player.cof.fragmentScore[3].mul(player.in.infinities.plus(1).log(10).pow(0.6))
        player.cof.fragmentScore[3] = player.cof.fragmentScore[3].mul(player.ta.negativeInfinityPoints.plus(1).log10().pow(0.45).div(2.25))

        //radioactive
        player.cof.fragmentScore[4] = player.s.singularityPoints.plus(1).log10().pow(0.65).div(3).mul(2.5)
        player.cof.fragmentScore[4] = player.cof.fragmentScore[4].mul(player.ra.radiation.plus(1).log10().div(1.5))
        player.cof.fragmentScore[4] = player.cof.fragmentScore[4].mul(player.sd.singularityPower.plus(1).log10().pow(0.555).div(17,5))

        //cosmic
        player.cof.fragmentScore[5] = player.ad.antimatter.plus(1).log10().pow(0.5).div(3).mul(2)
        player.cof.fragmentScore[5] = player.cof.fragmentScore[5].mul(player.au2.stars.plus(1).log10().pow(1.6).div(6))
        player.cof.fragmentScore[5] = player.cof.fragmentScore[5].mul(player.ca.replicanti.plus(1).log10().pow(0.55).div(12))

        //temporal
        player.cof.fragmentScore[6] = player.cb.level.plus(1).log10().pow(1.25)
        player.cof.fragmentScore[6] = player.cof.fragmentScore[6].mul(player.cb.XPBoost.plus(1).log10().pow(1.25))
        player.cof.fragmentScore[6] = player.cof.fragmentScore[6].mul(player.cb.petPoints.plus(1).log10().pow(1.25))

        let maxIndex = 0
        for (let i = 1; i < player.cof.fragmentScore.length; i++) {
            if (player.cof.fragmentScore[i].gt(player.cof.fragmentScore[maxIndex])) {
                maxIndex = i
            }
        }
        player.cof.highestScore = maxIndex

        for (let i = 0; i < player.cof.coreFragments.length; i++) {
            player.cof.fragmentScore[i] = player.cof.fragmentScore[i].mul(buyableEffect("st", 110))
            player.cof.fragmentScore[i] = player.cof.fragmentScore[i].mul(buyableEffect("sb", 102))
            player.cof.fragmentScore[i] = player.cof.fragmentScore[i].mul(buyableEffect("fu", 91))

            player.cof.coreFragmentsToGet[i] = player.cof.fragmentScore[i].div(100).floor()
            player.cof.coreFragments[i] = player.cof.coreFragments[i].floor()
        }

        //Todo: Apply the effects of the core fragments
        player.cof.coreFragmentEffects[0] = player.cof.coreFragments[0].pow(0.125).div(40).add(1).min(1.25)
        player.cof.coreFragmentEffects[1] = player.cof.coreFragments[1].pow(10).add(1)
        player.cof.coreFragmentEffects[2] = player.cof.coreFragments[2].pow(0.1).div(30).add(1).min(1.2)
        player.cof.coreFragmentEffects[3] = player.cof.coreFragments[3].pow(0.1).div(30).add(1).min(1.2)
        player.cof.coreFragmentEffects[4] = player.cof.coreFragments[4].mul(5).pow(3.5).add(1)
        player.cof.coreFragmentEffects[5] = player.cof.coreFragments[5].pow(1.5).add(1)
        player.cof.coreFragmentEffects[6] = player.cof.coreFragments[6].pow(0.25).div(5).add(1)

        player.subtabs["cof"]["buyables"] = player.cof.fragmentIndex
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
        11: {
            title() { return "<img src='resources/fragments/ancientFragment.png'style='width:calc(120%);height:calc(120%);margin:-20%'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.cof.fragmentIndex = 0
            },
            style: { width: '120px', "min-height": '120px', borderRadius: '15px' },
        },
        12: {
            title() { return "<img src='resources/fragments/naturalFragment.png'style='width:calc(120%);height:calc(120%);margin:-20%'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.cof.fragmentIndex = 1
            },
            style: { width: '120px', "min-height": '120px', borderRadius: '15px' },
        },
        13: {
            title() { return "<img src='resources/fragments/technologicalFragment.png'style='width:calc(120%);height:calc(120%);margin:-20%'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.cof.fragmentIndex = 2
            },
            style: { width: '120px', "min-height": '120px', borderRadius: '15px' },
        },
        14: {
            title() { return "<img src='resources/fragments/paradoxFragment.png'style='width:calc(120%);height:calc(120%);margin:-20%'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.cof.fragmentIndex = 3
            },
            style: { width: '120px', "min-height": '120px', borderRadius: '15px' },
        },
        15: {
            title() { return "<img src='resources/fragments/radioactiveFragment.png'style='width:calc(120%);height:calc(120%);margin:-20%'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.cof.fragmentIndex = 4
            },
            style: { width: '120px', "min-height": '120px', borderRadius: '15px' },
        },
        16: {
            title() { return "<img src='resources/fragments/cosmicFragment.png'style='width:calc(120%);height:calc(120%);margin:-20%'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.cof.fragmentIndex = 5
            },
            style: { width: '120px', "min-height": '120px', borderRadius: '15px' },
        },
        17: {
            title() { return "<img src='resources/fragments/temporalFragment.png'style='width:calc(120%);height:calc(120%);margin:-20%'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.cof.fragmentIndex = 6
            },
            style: { width: '120px', "min-height": '120px', borderRadius: '15px' },
        },
        18: {
            title() { return "<img src='resources/fragments/celestialFragment.png'style='width:calc(120%);height:calc(120%);margin:-20%'></img>" },
            canClick() { return true },
            unlocked() { return false },
            onClick() {
                player.cof.fragmentIndex = 7
            },
            style: { width: '120px', "min-height": '120px', borderRadius: '15px' },
        },
    },
    bars: {
    },
    upgrades: { 
    },
    buyables: {
            11: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.cof.coreFragments[0] },
            pay(amt) { player.cof.coreFragments[0] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.8).div(1.5).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Ancient Core Fragment Buyable I"
            },
            display() {
                return 'which are extending replicanti point limit by ^' + format(tmp[this.layer].buyables[this.id].effect, 3) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #B8916A 0%, #BE8267 100%)" }
        },
        12: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cof.coreFragments[0] },
            pay(amt) { player.cof.coreFragments[0] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.01).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Ancient Core Fragment Buyable II"
            },
            display() {
                return 'which are boosting points by ^' + format(tmp[this.layer].buyables[this.id].effect, 3) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #B8916A 0%, #BE8267 100%)" }
        },
        13: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cof.coreFragments[0] },
            pay(amt) { player.cof.coreFragments[0] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.2).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Ancient Core Fragment Buyable III"
            },
            display() {
                return 'which are extending both replicanti point softcaps by ^' + format(tmp[this.layer].buyables[this.id].effect, 3) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #B8916A 0%, #BE8267 100%)" }
        },
        14: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cof.coreFragments[1] },
            pay(amt) { player.cof.coreFragments[1] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.45).mul(0.012).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Natural Core Fragment Buyable I"
            },
            display() {
                return 'which are boosting grass value by ^' + format(tmp[this.layer].buyables[this.id].effect, 3) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #63C964 0%, #007917 100%)" }
        },
        15: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cof.coreFragments[1] },
            pay(amt) { player.cof.coreFragments[1] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.45).mul(0.01).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Natural Core Fragment Buyable II"
            },
            display() {
                return 'which are boosting grasshopper gain by ^' + format(tmp[this.layer].buyables[this.id].effect, 3) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #63C964 0%, #007917 100%)" }
        },
        16: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cof.coreFragments[1] },
            pay(amt) { player.cof.coreFragments[1] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.4).mul(0.025).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Natural Core Fragment Buyable III"
            },
            display() {
                return 'which are boosting pollinator gain by ^' + format(tmp[this.layer].buyables[this.id].effect, 3) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #63C964 0%, #007917 100%)" }
        },
        17: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cof.coreFragments[2] },
            pay(amt) { player.cof.coreFragments[2] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.45).mul(0.02).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Technological Core Fragment Buyable I"
            },
            display() {
                return 'which are boosting mod gain by ^' + format(tmp[this.layer].buyables[this.id].effect, 3) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #595A5C 0%, rgb(156, 156, 156) 100%)" }
        },
        18: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cof.coreFragments[2] },
            pay(amt) { player.cof.coreFragments[2] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.4).mul(0.02).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Technological Core Fragment Buyable II"
            },
            display() {
                return 'which are boosting rocket fuel gain by ^' + format(tmp[this.layer].buyables[this.id].effect, 3) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #595A5C 0%, rgb(156, 156, 156) 100%)" }
        },
        19: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cof.coreFragments[2] },
            pay(amt) { player.cof.coreFragments[2] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.6).mul(0.4).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Technological Core Fragment Buyable III"
            },
            display() {
                return 'which are boosting activated fuel and rocket parts gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #595A5C 0%,rgb(156, 156, 156) 100%)" }
        },
        21: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(80) },
            currency() { return player.cof.coreFragments[3] },
            pay(amt) { player.cof.coreFragments[3] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.425).mul(0.02).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Paradox Core Fragment Buyable I"
            },
            display() {
                return 'which are boosting antimatter gain by ^' + format(tmp[this.layer].buyables[this.id].effect, 3) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #20A3C2 0%, #20BBBD 100%)" }
        },
        22: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cof.coreFragments[3] },
            pay(amt) { player.cof.coreFragments[3] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.4).mul(0.018).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Paradox Core Fragment Buyable II"
            },
            display() {
                return 'which are boosting negative infinity point gain by ^' + format(tmp[this.layer].buyables[this.id].effect, 3) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #20A3C2 0%, #20BBBD 100%)" }
        },
        23: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.cof.coreFragments[3] },
            pay(amt) { player.cof.coreFragments[3] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.3).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Paradox Core Fragment Buyable III"
            },
            display() {
                return 'which are boosting infinity gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #20A3C2 0%, #20BBBD 100%)" }
        },
        24: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(200) },
            currency() { return player.cof.coreFragments[4] },
            pay(amt) { player.cof.coreFragments[4] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.2).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Radioactive Core Fragment Buyable I"
            },
            display() {
                return 'which are boosting radiation gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #801757 0%, #D3173A 100%)" }
        },
        25: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cof.coreFragments[4] },
            pay(amt) { player.cof.coreFragments[4] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.35).mul(0.022).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Radioactive Core Fragment Buyable II"
            },
            display() {
                return 'which are boosting singularity power gain by ^' + format(tmp[this.layer].buyables[this.id].effect, 3) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #801757 0%, #D3173A 100%)" }
        },
        26: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(400) },
            currency() { return player.cof.coreFragments[4] },
            pay(amt) { player.cof.coreFragments[4] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.4).mul(0.1).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Radioactive Core Fragment Buyable III"
            },
            display() {
                return 'which are boosting starmetal alloy gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "black", backgroundImage: "linear-gradient(120deg, #801757 0%, #D3173A 100%)" }
        },
        27: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(150) },
            currency() { return player.cof.coreFragments[5] },
            pay(amt) { player.cof.coreFragments[5] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.45).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cosmic Core Fragment Buyable I"
            },
            display() {
                return 'which are raising galaxy dust effect by ^' + format(tmp[this.layer].buyables[this.id].effect, 3) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "white", backgroundImage: "linear-gradient(120deg, #0F0D25 0%, #0E0921 100%)" }
        },
        28: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cof.coreFragments[5] },
            pay(amt) { player.cof.coreFragments[5] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(5.5).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cosmic Core Fragment Buyable II"
            },
            display() {
                return 'which are boosting galaxy dust gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "white", backgroundImage: "linear-gradient(120deg, #0F0D25 0%, #0E0921 100%)" }
        },
        29: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.cof.coreFragments[5] },
            pay(amt) { player.cof.coreFragments[5] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.4).mul(0.1).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cosmic Core Fragment Buyable III"
            },
            display() {
                return 'which are boosting star gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "white", backgroundImage: "linear-gradient(120deg, #0F0D25 0%, #0E0921 100%)" }
        },
        31: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cof.coreFragments[6] },
            pay(amt) { player.cof.coreFragments[6] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.7).mul(0.01).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Temporal Core Fragment Buyable I"
            },
            display() {
                return 'which are dividing XP button cooldown by /' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "white", backgroundImage: "linear-gradient(120deg, #2B6476 0%, #012454 100%)" }
        },
        32: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(150) },
            currency() { return player.cof.coreFragments[6] },
            pay(amt) { player.cof.coreFragments[6] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.6).mul(0.025).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Temporal Core Fragment Buyable II"
            },
            display() {
                return 'which are multiplying crate roll chance by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "white", backgroundImage: "linear-gradient(120deg, #2B6476 0%, #012454 100%)" }
        },
        33: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cof.coreFragments[6] },
            pay(amt) { player.cof.coreFragments[6] = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.05).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Temporal Core Fragment Buyable III"
            },
            display() {
                return 'which are boosting legendary pet gem gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + formatWhole(tmp[this.layer].buyables[this.id].cost) + ' Core Fragments'
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
            style: { width: '275px', height: '150px', color: "white", backgroundImage: "linear-gradient(120deg, #2B6476 0%, #012454 100%)" }
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
        ["raw-html", function () { return "You will <h3>" + formatWhole(player.cof.coreFragments[player.cof.fragmentIndex]) + "</h3> " + player.cof.coreFragmentNames[player.cof.fragmentIndex] + "." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cof.fragmentIndex == 0 ? "Your " + player.cof.coreFragmentNames[player.cof.fragmentIndex] + " boosts points by ^" + format(player.cof.coreFragmentEffects[player.cof.fragmentIndex], 3) + "." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cof.fragmentIndex == 1 ? "Your " + player.cof.coreFragmentNames[player.cof.fragmentIndex] + " boosts golden grass by x" + format(player.cof.coreFragmentEffects[player.cof.fragmentIndex]) + "." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cof.fragmentIndex == 2 ? "Your " + player.cof.coreFragmentNames[player.cof.fragmentIndex] + " boosts steel by ^" + format(player.cof.coreFragmentEffects[player.cof.fragmentIndex], 3) + "." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cof.fragmentIndex == 3 ? "Your " + player.cof.coreFragmentNames[player.cof.fragmentIndex] + " boosts infinity points by ^" + format(player.cof.coreFragmentEffects[player.cof.fragmentIndex], 3) + "." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cof.fragmentIndex == 4 ? "Your " + player.cof.coreFragmentNames[player.cof.fragmentIndex] + " boosts singularity points x" + format(player.cof.coreFragmentEffects[player.cof.fragmentIndex]) + "." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cof.fragmentIndex == 5 ? "Your " + player.cof.coreFragmentNames[player.cof.fragmentIndex] + " boosts replicanti mult by x" + format(player.cof.coreFragmentEffects[player.cof.fragmentIndex]) + "." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cof.fragmentIndex == 6 ? "Your " + player.cof.coreFragmentNames[player.cof.fragmentIndex] + " boosts check back XP by x" + format(player.cof.coreFragmentEffects[player.cof.fragmentIndex]) + "." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"], 
        ["buttonless-microtabs", "buyables", { 'border-width': '0px' }],

                    ["blank", "25px"], 
        ["row", [["clickable", 11], ["clickable", 12], ["clickable", 13], ["clickable", 14], ["clickable", 15], ["clickable", 16], ["clickable", 17],]],
                    ["blank", "50px"],
                    ["layer-proxy", ["co", [
                        ["clickable", 1000]
                    ]]],
                    ["blank", "25px"],
                ]
            },
            "Score": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
        ["raw-html", function () { return "You will gain <h3>" + formatWhole(player.cof.coreFragmentsToGet[player.cof.highestScore]) + "</h3> " + player.cof.coreFragmentNames[player.cof.highestScore] + " on singularity reset." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["style-column", [
                        ["row", [["raw-html", function () { return "Core Fragment Scores:" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],]],
                        ["row", [["raw-html", function () { return "(The core fragment with the highest score is gained.)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],]],
                        ["row", [["raw-html", function () { return "(HALTER 2.0 can be used to adjust these scores, and if not there is a way to set scores very low.)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],]],
                    ], { width: "1000px", border: "3px solid rgb(27, 0, 36)", backgroundImage: "linear-gradient(120deg,rgb(138, 14, 121) 0%,rgb(168, 12, 51) 100%)", borderBottom: "5px", paddingTop: "5px", paddingBottom: "5px", borderRadius: "15px 15px 0px 0px" }],
                    ["style-column", [
        ["raw-html", function () { return "Ancient Fragment Score: <h3>" + formatWhole(player.cof.fragmentScore[0]) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["row", [["raw-html", function () { return "(Points, Factor Power, Prestige Points)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],]],
                    ["blank", "10px"],
        ["raw-html", function () { return "Natural Fragment Score: <h3>" + formatWhole(player.cof.fragmentScore[1]) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["row", [["raw-html", function () { return "(Trees, Grass, Grasshoppers)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],]],
                    ["blank", "10px"],
        ["raw-html", function () { return "Technological Fragment Score: <h3>" + formatWhole(player.cof.fragmentScore[2]) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["row", [["raw-html", function () { return "(Code Experience, Steel, Oil)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],]],
                    ["blank", "10px"],
        ["raw-html", function () { return "Paradox Fragment Score: <h3>" + formatWhole(player.cof.fragmentScore[3]) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["row", [["raw-html", function () { return "(Infinity Points, Infinities, Negative Infinity Points)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],]],
                    ["blank", "10px"],
        ["raw-html", function () { return "Radioactive Fragment Score: <h3>" + formatWhole(player.cof.fragmentScore[4]) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["row", [["raw-html", function () { return "(Singularity Points, Radiation, Singularity Power)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],]],
                    ["blank", "10px"],
        ["raw-html", function () { return "Cosmic Fragment Score: <h3>" + formatWhole(player.cof.fragmentScore[5]) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["row", [["raw-html", function () { return "(Antimatter, Replicanti, Stars)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],]],
                    ["blank", "10px"],
        ["raw-html", function () { return "Temporal Fragment Score: <h3>" + formatWhole(player.cof.fragmentScore[6]) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["row", [["raw-html", function () { return "(Check Back Level, XPBoost, Pet Points)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],]],
                    ], { width: "1000px", border: "3px solid rgb(27, 0, 36)", backgroundImage: "linear-gradient(120deg,rgb(138, 14, 121) 0%,rgb(168, 12, 51) 100%)", paddingTop: "5px", paddingBottom: "5px", borderRadius: "0px 0px 15px 15px" }]
                ]
            },
        },
                buyables: {
            0: {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
        ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13],]],
                ]
            },
            1: {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
        ["row", [["ex-buyable", 14], ["ex-buyable", 15], ["ex-buyable", 16],]],
                ]
            },
            2: {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
        ["row", [["ex-buyable", 17], ["ex-buyable", 18], ["ex-buyable", 19],]],
                ]
            },
            3: {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
        ["row", [["ex-buyable", 21], ["ex-buyable", 22], ["ex-buyable", 23],]],
                ]
            },
            4: {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
        ["row", [["ex-buyable", 24], ["ex-buyable", 25], ["ex-buyable", 26],]],
                ]
            },
            5: {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
        ["row", [["ex-buyable", 27], ["ex-buyable", 28], ["ex-buyable", 29],]],
                ]
            },
            6: {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
        ["row", [["ex-buyable", 31], ["ex-buyable", 32], ["ex-buyable", 33],]],
                ]
            },
        },
    }, 
    tabFormat: [
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && player.ma.matosDefeated }
})
