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
            title() { return "<img src='resources/fragments/ancientFragment.png' style='width:94px;height:94px;padding-top:3%'></img>" },
            canClick: true,
            unlocked: true,
            onClick() {
                player.cof.fragmentIndex = 0
            },
            style: { width: '110px', minHeight: '110px', background: "#70523C", border: "3px solid #563F2E", borderRadius: '0'},
        },
        12: {
            title() { return "<img src='resources/fragments/naturalFragment.png' style='width:94px;height:94px;padding-top:3%'></img>" },
            canClick: true,
            unlocked: true,
            onClick() {
                player.cof.fragmentIndex = 1
            },
            style: { width: '110px', minHeight: '110px', background: "#004C0E", border: "3px solid #003309", borderRadius: '0'},
        },
        13: {
            title() { return "<img src='resources/fragments/technologicalFragment.png' style='width:94px;height:94px;padding-top:3%'></img>" },
            canClick: true,
            unlocked: true,
            onClick() {
                player.cof.fragmentIndex = 2
            },
            style: { width: '110px', minHeight: '110px', background: "#2D2D2D", border: "3px solid #1E1E1E", borderRadius: '0'},
        },
        14: {
            title() { return "<img src='resources/fragments/paradoxFragment.png' style='width:94px;height:94px;padding-top:3%'></img>" },
            canClick: true,
            unlocked: true,
            onClick() {
                player.cof.fragmentIndex = 3
            },
            style: { width: '110px', minHeight: '110px', background: "#0E00A8", border: "3px solid #09008C", borderRadius: '0'},
        },
        15: {
            title() { return "<img src='resources/fragments/radioactiveFragment.png' style='width:94px;height:94px;padding-top:3%'></img>" },
            canClick: true,
            unlocked: true,
            onClick() {
                player.cof.fragmentIndex = 4
            },
            style: { width: '110px', minHeight: '110px', background: "#260000", border: "3px solid #190000", borderRadius: '0'},
        },
        16: {
            title() { return "<img src='resources/fragments/cosmicFragment.png' style='width:94px;height:94px;padding-top:3%'></img>" },
            canClick: true,
            unlocked: true,
            onClick() {
                player.cof.fragmentIndex = 5
            },
            style: { width: '110px', minHeight: '110px', background: "#250059", border: "3px solid #19003F", borderRadius: '0'},
        },
        17: {
            title() { return "<img src='resources/fragments/temporalFragment.png' style='width:94px;height:94px;padding-top:3%'></img>" },
            canClick: true,
            unlocked: true,
            onClick() {
                player.cof.fragmentIndex = 6
            },
            style: { width: '110px', minHeight: '110px', background: "#001738", border: "3px solid #000C1E", borderRadius: '0'},
        },
        18: {
            title() { return "<img src='resources/fragments/celestialFragment.png' style='width:94px;height:94px;padding-top:3%'></img>" },
            canClick: true,
            unlocked: false,
            onClick() {
                player.cof.fragmentIndex = 7
            },
            style: { width: '110px', minHeight: '110px', background: "#0E00A8", border: "3px solid #09008C", borderRadius: '0'},
        },
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
                return "Ancient CF Buyable I"
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
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#B8916A", backgroundImage: "linear-gradient(120deg, #B8916A 0%, #BE8267 100%)" }
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
                return "Ancient CF Buyable II"
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
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#B8916A", backgroundImage: "linear-gradient(120deg, #B8916A 0%, #BE8267 100%)" }
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
                return "Ancient CF Buyable II"
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
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#B8916A", backgroundImage: "linear-gradient(120deg, #B8916A 0%, #BE8267 100%)" }
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
                return "Natural CF Buyable I"
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
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#63C964", backgroundImage: "linear-gradient(120deg, #63C964 0%, #007917 100%)" }
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
                return "Natural CF Buyable II"
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
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#63C964", backgroundImage: "linear-gradient(120deg, #63C964 0%, #007917 100%)" }
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
                return "Natural CF Buyable III"
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
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#63C964", backgroundImage: "linear-gradient(120deg, #63C964 0%, #007917 100%)" }
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
                return "Technological CF Buyable I"
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
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#595A5C", backgroundImage: "linear-gradient(120deg, #595A5C 0%, rgb(156, 156, 156) 100%)" }
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
                return "Technological CF Buyable II"
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
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#595A5C", backgroundImage: "linear-gradient(120deg, #595A5C 0%, rgb(156, 156, 156) 100%)" }
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
                return "Technological CF Buyable III"
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
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#595A5C", backgroundImage: "linear-gradient(120deg, #595A5C 0%,rgb(156, 156, 156) 100%)" }
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
                return "Paradox CF Buyable I"
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
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#20A3C2", backgroundImage: "linear-gradient(120deg, #20A3C2 0%, #20BBBD 100%)" }
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
                return "Paradox CF Buyable II"
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
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#20A3C2", backgroundImage: "linear-gradient(120deg, #20A3C2 0%, #20BBBD 100%)" }
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
                return "Paradox CF Buyable III"
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
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#20A3C2", backgroundImage: "linear-gradient(120deg, #20A3C2 0%, #20BBBD 100%)" }
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
                return "Radioactive CF Buyable I"
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
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#801757", backgroundImage: "linear-gradient(120deg, #801757 0%, #D3173A 100%)" }
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
                return "Radioactive CF Buyable II"
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
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#801757", backgroundImage: "linear-gradient(120deg, #801757 0%, #D3173A 100%)" }
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
                return "Radioactive CF Buyable III"
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
            style: { width: '250px', height: '150px', color: "black", backgroundColor: "#801757", backgroundImage: "linear-gradient(120deg, #801757 0%, #D3173A 100%)" }
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
                return "Cosmic CF Buyable I"
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
            style: { width: '250px', height: '150px', color: "white", backgroundColor: "#0F0D25", backgroundImage: "linear-gradient(120deg, #0F0D25 0%, #0E0921 100%)" }
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
                return "Cosmic CF Buyable II"
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
            style: { width: '250px', height: '150px', color: "white", backgroundColor: "#0F0D25", backgroundImage: "linear-gradient(120deg, #0F0D25 0%, #0E0921 100%)" }
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
                return "Cosmic CF Buyable III"
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
            style: { width: '250px', height: '150px', color: "white", backgroundColor: "#0F0D25", backgroundImage: "linear-gradient(120deg, #0F0D25 0%, #0E0921 100%)" }
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
                return "Temporal CF Buyable I"
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
            style: { width: '250px', height: '150px', color: "white", backgroundColor: "#2B6476", backgroundImage: "linear-gradient(120deg, #2B6476 0%, #012454 100%)" }
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
                return "Temporal CF Buyable II"
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
            style: { width: '250px', height: '150px', color: "white", backgroundColor: "#2B6476", backgroundImage: "linear-gradient(120deg, #2B6476 0%, #012454 100%)" }
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
                return "Temporal CF Buyable III"
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
            style: { width: '250px', height: '150px', color: "white", backgroundColor: "#2B6476", backgroundImage: "linear-gradient(120deg, #2B6476 0%, #012454 100%)" }
        },
    },
    microtabs: {
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
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.s.singularityPoints) + "</h3> singularity points"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.s.singularityPointsToGet) + ")"}, () => {
                let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                if (player.in.infinityPoints.gte(1e40)) {look.color = "white"} else {look.color = "gray"} 
                return look
            }],
            ["raw-html", () => {return player.in.infinityPoints.gte("2.71e3793") ? "[SOFTCAPPED<sup>2</sup>]" : player.in.infinityPoints.gte(2.5e193) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "18px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["raw-html", () => { return "(Highest: " + format(player.s.highestSingularityPoints) + ")" }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["blank", "20px"],
        ["layer-proxy", ["co", [
            ["clickable", 1000]
        ]]],
        ["blank", "25px"],
        ["top-column", [
            ["style-row", [
                ["top-column", [
                    ["clickable", 11],
                    ["style-column", [
                        ["raw-html", () => {return "Score<br>" + formatWhole(player.cof.fragmentScore[0])}, () => {
                            let look = {color: "#aaa", fontSize: "16px", fontFamily: "monospace"}
                            if (player.cof.highestScore == 0) look.color = "var(--textColor)"
                            return look
                        }],
                    ], {width: "110px", height: "37px", background: "#33251B", borderTop: "3px solid var(--regBorder)"}],
                    ["style-column", [
                        ["raw-html", "<p style='line-height:1'>Points, Factor Power, Prestige Points", {color: "var(--textColor)", fontSize: "12px", fontFamily: "monospace"}],
                    ], {width: "110px", height: "47px", background: "#19120D", borderTop: "3px solid var(--regBorder)"}],
                ], {width: "110px", height: "200px", borderRight: "3px solid var(--regBorder)"}],
                ["top-column", [
                    ["clickable", 12],
                    ["style-column", [
                        ["raw-html", () => {return "Score<br>" + formatWhole(player.cof.fragmentScore[1])}, () => {
                            let look = {color: "#aaa", fontSize: "16px", fontFamily: "monospace"}
                            if (player.cof.highestScore == 1) look.color = "var(--textColor)"
                            return look
                        }],
                    ], {width: "110px", height: "37px", background: "#003309", borderTop: "3px solid var(--regBorder)"}],
                    ["style-column", [
                        ["raw-html", "<p style='line-height:1'>Trees, Grass, Grasshoppers", {color: "var(--textColor)", fontSize: "12px", fontFamily: "monospace"}],
                    ], {width: "110px", height: "47px", background: "#001904", borderTop: "3px solid var(--regBorder)"}],
                ], {width: "110px", height: "200px", borderRight: "3px solid var(--regBorder)"}],
                ["top-column", [
                    ["clickable", 13],
                    ["style-column", [
                        ["raw-html", () => {return "Score<br>" + formatWhole(player.cof.fragmentScore[2])}, () => {
                            let look = {color: "#aaa", fontSize: "16px", fontFamily: "monospace"}
                            if (player.cof.highestScore == 2) look.color = "var(--textColor)"
                            return look
                        }],
                    ], {width: "110px", height: "37px", background: "#333333", borderTop: "3px solid var(--regBorder)"}],
                    ["style-column", [
                        ["raw-html", "<p style='line-height:1'>Code Experience, Steel, Oil", {color: "var(--textColor)", fontSize: "12px", fontFamily: "monospace"}],
                    ], {width: "110px", height: "47px", background: "#191919", borderTop: "3px solid var(--regBorder)"}],
                ], {width: "110px", height: "200px", borderRight: "3px solid var(--regBorder)"}],
                ["top-column", [
                    ["clickable", 14],
                    ["style-column", [
                        ["raw-html", () => {return "Score<br>" + formatWhole(player.cof.fragmentScore[3])}, () => {
                            let look = {color: "#aaa", fontSize: "16px", fontFamily: "monospace"}
                            if (player.cof.highestScore == 3) look.color = "var(--textColor)"
                            return look
                        }],
                    ], {width: "110px", height: "37px", background: "#030033", borderTop: "3px solid var(--regBorder)"}],
                    ["style-column", [
                        ["raw-html", "<p style='line-height:1'>IP, Infinities, NIP", {color: "var(--textColor)", fontSize: "12px", fontFamily: "monospace"}],
                    ], {width: "110px", height: "47px", background: "#010019", borderTop: "3px solid var(--regBorder)"}],
                ], {width: "110px", height: "200px", borderRight: "3px solid var(--regBorder)"}],
                ["top-column", [
                    ["clickable", 15],
                    ["style-column", [
                        ["raw-html", () => {return "Score<br>" + formatWhole(player.cof.fragmentScore[4])}, () => {
                            let look = {color: "#aaa", fontSize: "16px", fontFamily: "monospace"}
                            if (player.cof.highestScore == 4) look.color = "var(--textColor)"
                            return look
                        }],
                    ], {width: "110px", height: "37px", background: "#330000", borderTop: "3px solid var(--regBorder)"}],
                    ["style-column", [
                        ["raw-html", "<p style='line-height:1'>SP, Radiation, Singularity Power", {color: "var(--textColor)", fontSize: "12px", fontFamily: "monospace"}],
                    ], {width: "110px", height: "47px", background: "#190000", borderTop: "3px solid var(--regBorder)"}],
                ], {width: "110px", height: "200px", borderRight: "3px solid var(--regBorder)"}],
                ["top-column", [
                    ["clickable", 16],
                    ["style-column", [
                        ["raw-html", () => {return "Score<br>" + formatWhole(player.cof.fragmentScore[5])}, () => {
                            let look = {color: "#aaa", fontSize: "16px", fontFamily: "monospace"}
                            if (player.cof.highestScore == 5) look.color = "var(--textColor)"
                            return look
                        }],
                    ], {width: "110px", height: "37px", background: "#140033", borderTop: "3px solid var(--regBorder)"}],
                    ["style-column", [
                        ["raw-html", "<p style='line-height:1'>Antimatter, Replicanti, Stars", {color: "var(--textColor)", fontSize: "12px", fontFamily: "monospace"}],
                    ], {width: "110px", height: "47px", background: "#090019", borderTop: "3px solid var(--regBorder)"}],
                ], {width: "110px", height: "200px", borderRight: "3px solid var(--regBorder)"}],
                ["top-column", [
                    ["clickable", 17],
                    ["style-column", [
                        ["raw-html", () => {return "Score<br>" + formatWhole(player.cof.fragmentScore[6])}, () => {
                            let look = {color: "#aaa", fontSize: "16px", fontFamily: "monospace"}
                            if (player.cof.highestScore == 6) look.color = "var(--textColor)"
                            return look
                        }],
                    ], {width: "110px", height: "37px", background: "#001533", borderTop: "3px solid var(--regBorder)"}],
                    ["style-column", [
                        ["raw-html", "<p style='line-height:1'>Check Back Level, XPBoost, Pet Points", {color: "var(--textColor)", fontSize: "12px", fontFamily: "monospace"}],
                    ], {width: "110px", height: "47px", background: "#000A19", borderTop: "3px solid var(--regBorder)"}],
                ], {width: "110px", height: "200px"}],
            ], {width: "788px", height: "200px", borderBottom: "3px solid var(--regBorder)"}],
            ["style-column", [
                ["raw-html", () => { return "You will gain <h3>" + formatWhole(player.cof.coreFragmentsToGet[player.cof.highestScore]) + "</h3> " + player.cof.coreFragmentNames[player.cof.highestScore] + " on singularity reset." }, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace" }],
            ], {width: "788px", height: "37px", background: "var(--miscButton)", borderBottom: "3px solid var(--regBorder)"}],
            ["top-column", [
                    ["blank", "10px"],
                    ["raw-html", () => { return "You have <h3>" + formatWhole(player.cof.coreFragments[player.cof.fragmentIndex]) + "</h3> " + player.cof.coreFragmentNames[player.cof.fragmentIndex] + "." }, {color: "var(--textColor)", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return player.cof.fragmentIndex == 0 ? "Your " + player.cof.coreFragmentNames[player.cof.fragmentIndex] + " boosts points by ^" + format(player.cof.coreFragmentEffects[player.cof.fragmentIndex], 3) + "." : ""}, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return player.cof.fragmentIndex == 1 ? "Your " + player.cof.coreFragmentNames[player.cof.fragmentIndex] + " boosts golden grass by x" + format(player.cof.coreFragmentEffects[player.cof.fragmentIndex]) + "." : ""}, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return player.cof.fragmentIndex == 2 ? "Your " + player.cof.coreFragmentNames[player.cof.fragmentIndex] + " boosts steel by ^" + format(player.cof.coreFragmentEffects[player.cof.fragmentIndex], 3) + "." : ""}, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return player.cof.fragmentIndex == 3 ? "Your " + player.cof.coreFragmentNames[player.cof.fragmentIndex] + " boosts infinity points by ^" + format(player.cof.coreFragmentEffects[player.cof.fragmentIndex], 3) + "." : ""}, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return player.cof.fragmentIndex == 4 ? "Your " + player.cof.coreFragmentNames[player.cof.fragmentIndex] + " boosts singularity points x" + format(player.cof.coreFragmentEffects[player.cof.fragmentIndex]) + "." : ""}, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return player.cof.fragmentIndex == 5 ? "Your " + player.cof.coreFragmentNames[player.cof.fragmentIndex] + " boosts replicanti mult by x" + format(player.cof.coreFragmentEffects[player.cof.fragmentIndex]) + "." : ""}, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => { return player.cof.fragmentIndex == 6 ? "Your " + player.cof.coreFragmentNames[player.cof.fragmentIndex] + " boosts check back XP by x" + format(player.cof.coreFragmentEffects[player.cof.fragmentIndex]) + "." : ""}, {color: "var(--textColor)", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "20px"], 
                    ["buttonless-microtabs", "buyables", { 'border-width': '0px' }],
                    ["blank", "10px"],
            ], {width: "788px", height: "257px"}],
            ["style-column", [
                ["raw-html", () => { return "(The core fragment with the highest score is gained)" }, {color: "var(--textColor)", fontSize: "16px", fontFamily: "monospace" }],
                ["raw-html", () => { return "(Score is increased based on the resources below each score)" }, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace" }],
                ["raw-html", () => { return "(HALTER 2.0 can be used to adjust these scores, and if not there is a way to set scores very low)" }, {color: "var(--textColor)", fontSize: "14px", fontFamily: "monospace"}],
            ], {width: "788px", height: "62px", background: "var(--miscButton)", borderTop: "3px solid var(--regBorder)"}],
        ], {width: "788px", height: "565px", background: "var(--layerBackground)", border: "3px solid var(--regBorder)"}],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && player.ma.matosDefeated }
})
