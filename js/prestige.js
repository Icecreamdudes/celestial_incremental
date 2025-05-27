addLayer("p", {
    name: "Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        prestigePoints: new Decimal(0),
        prestigePointsToGet: new Decimal(0),

        crystals: new Decimal(0),
        crystalEffect: new Decimal(0),
        crystalsToGet: new Decimal(0),
        crystalPause: new Decimal(0),
        crystalMax: false,
    }
    },
    automate() {
        if (hasMilestone("r", 15) && player.p.auto == true)
        {
            buyUpgrade("p", 11)
            buyUpgrade("p", 12)
            buyUpgrade("p", 13)
            buyUpgrade("p", 14)
            buyUpgrade("p", 15)
            buyUpgrade("p", 16)
            buyUpgrade("p", 17)
            buyUpgrade("p", 18)
            buyUpgrade("p", 19)
            buyUpgrade("p", 21)
            buyUpgrade("p", 22)
            buyUpgrade("p", 23)
        }
        if (hasMilestone("s", 16))
        {
            buyBuyable("p", 11)
            buyBuyable("p", 12)
            buyBuyable("p", 13)
            buyBuyable("p", 14)
            buyBuyable("p", 15)
            buyBuyable("p", 16)
            buyBuyable("p", 17)
            buyBuyable("p", 18)
        }
    },
    nodeStyle() {
    },
    tooltip: "Prestige",
    color: "#31aeb0",
    branches: ["r"],
    update(delta) {
        let onepersec = new Decimal(1)

        // START OF PRESTIGE POINT MODIFIERS
        if (player.points.div(100000).pow(0.5).lte("1e450000")) player.p.prestigePointsToGet = player.points.div(100000).pow(0.5)
        if (player.points.div(100000).pow(0.5).gte("1e450000")) player.p.prestigePointsToGet = Decimal.mul("1e450000", player.points.plus(10).log10().pow(2500))
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.t.treeEffect)
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(buyableEffect("g", 16))
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.r.pentEffect)
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.gh.grasshopperEffects[2])
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(buyableEffect("m", 14))
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(levelableEffect("pet", 102)[0])
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.d.diceEffects[2])
        if (hasUpgrade("ip", 21) && !inChallenge("ip", 14)) player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(upgradeEffect("ip", 21))
        if (inChallenge("ip", 13) || player.po.hex) player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.h.HRErefinementEffect[1][1])
           
        // CHALLENGE MODIFIERS
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.div(player.pe.pestEffect[2])
        if (hasUpgrade("d", 17)) player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(upgradeEffect("d", 17))
        if (inChallenge("ip", 13)) player.p.prestigePointsToGet = player.p.prestigePointsToGet.pow(0.7)
        if (inChallenge("ip", 15)) player.p.prestigePointsToGet = player.p.prestigePointsToGet.pow(0.65)
        if (inChallenge("ip", 18)) player.p.prestigePointsToGet = player.p.prestigePointsToGet.pow(0.5)
        if (player.de.antidebuffIndex.eq(1)) player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.de.antidebuffEffect)
        if (inChallenge("tad", 11)) player.p.prestigePointsToGet = player.p.prestigePointsToGet.pow(0.3)

        // CONTINUED REGULAR MODIFIERS
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(buyableEffect("p", 11))
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(buyableEffect("id", 22))
        if (player.pol.pollinatorsIndex == 2) player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.pol.pollinatorsEffect[3])
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.i.preOTFMult)
        if (player.cop.processedCoreFuel.eq(2)) player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.cop.processedCoreInnateEffects[0])

        // POWER MODIFIERS
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.pow(buyableEffect("rm", 23))
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.pow(buyableEffect("fu", 33))
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.pow(player.re.realmEssenceEffect)
        if (player.cop.processedCoreFuel.eq(2)) player.p.prestigePointsToGet = player.p.prestigePointsToGet.pow(player.cop.processedCoreInnateEffects[1])

        // ABNORMAL MODIFIERS, PLACE NEW MODIFIERS BEFORE THIS
        if (inChallenge("ip", 18) && player.p.prestigePoints.gt(player.p.prestigePoints.mul(0.6 * delta))) {
            player.p.prestigePoints = player.p.prestigePoints.sub(player.p.prestigePoints.mul(0.6 * delta))
        }
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.div(player.po.halterEffects[2])
        if (player.r.timeReversed) player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(0)

        // PRESTIGE POINTS PER SECOND
        player.p.prestigePoints = player.p.prestigePoints.add(player.p.prestigePointsToGet.mul(buyableEffect("gh", 14).mul(delta)))
        if (hasUpgrade("rf", 12)) player.p.prestigePoints = player.p.prestigePoints.add(player.p.prestigePointsToGet.mul(Decimal.mul(0.2, delta)))
        if (hasMilestone("ip", 12) && !inChallenge("ip", 14)) player.p.prestigePoints = player.p.prestigePoints.add(player.p.prestigePointsToGet.mul(Decimal.mul(0.05, delta)))

        //----------------------------------------

        // CRYSTAL RESET CODE
        if (player.p.crystalPause.gt(0)) {
            layers.p.crystalReset();
        }
        player.p.crystalPause = player.p.crystalPause.sub(1)

        // START OF CRYSTAL MODIFIERS
        player.p.crystalsToGet = player.r.tier.pow(0.002).mul(4)
        player.p.crystalsToGet = player.p.crystalsToGet.mul(buyableEffect("id", 22))
        player.p.crystalsToGet = player.p.crystalsToGet.mul(buyableEffect("r", 12))
        player.p.crystalsToGet = player.p.crystalsToGet.mul(player.rm.realmModsEffect[1])
        player.p.crystalsToGet = player.p.crystalsToGet.mul(buyableEffect("oi", 22))
        player.p.crystalsToGet = player.p.crystalsToGet.mul(levelableEffect("pet", 1106)[1])
        player.p.crystalsToGet = player.p.crystalsToGet.mul(levelableEffect("pet", 306)[1])
        if (hasUpgrade("pol", 17)) player.p.crystalsToGet = player.p.crystalsToGet.mul(upgradeEffect("pol", 17))
        if (hasUpgrade("ev1", 11)) player.p.crystalsToGet = player.p.crystalsToGet.mul(upgradeEffect("ev1", 11))
        if (hasUpgrade("s", 14)) player.p.crystalsToGet = player.p.crystalsToGet.mul(upgradeEffect("s", 14))
        player.p.crystalsToGet = player.p.crystalsToGet.mul(buyableEffect("ra", 14))
        if (player.cop.processedCoreFuel.eq(2)) player.p.crystalsToGet = player.p.crystalsToGet.mul(player.cop.processedCoreInnateEffects[2])

        // CRYSTALS PER SECOND
        player.p.crystals = player.p.crystals.add(player.p.crystalsToGet.mul(Decimal.mul(buyableEffect("fa", 202), delta)))

        // CRYSTAL EFFECT
        player.p.crystalEffect = player.p.crystals.plus(1).log10().pow(0.265).mul(0.045).add(1)
    },
    prestigeReset()
    {
        player.points = new Decimal(0)
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        if (hasMilestone("ip", 15) && !inChallenge("ip", 14)) {player.r.tetr = new Decimal(10)} else {player.r.tetr = new Decimal(0)}
        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
        player.r.tetrsToGet = new Decimal(0)

        for (let i = 11; i < 19; i++) {
            player.f.buyables[i] = new Decimal(0)
        }

        player.f.factorPower = new Decimal(0)
    },
    crystalReset()
    {
        player.pe.pests = new Decimal(0)
        player.points = new Decimal(10)
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        if (hasMilestone("ip", 15) && !inChallenge("ip", 14)) {player.r.tetr = new Decimal(10)} else {player.r.tetr = new Decimal(0)}
        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
        player.r.tetrsToGet = new Decimal(0)
        player.r.pentToGet = new Decimal(0)
        player.r.pent = new Decimal(0)

        player.f.factorUnlocks = [true, true, true, false, false, false, false, false]
        player.f.factorGain = new Decimal(1)

        player.f.factorPower = new Decimal(0)
        player.f.factorPowerEffect = new Decimal(1)
        player.f.factorPowerPerSecond = new Decimal(0)
        player.f.powerFactorUnlocks = [true, true, true, false, false, false, false, false]

        for (let i = 1; i < 9; i++) {
            player.f.buyables[i] = new Decimal(0)
        }
        for (let i = 11; i < 20; i++) {
            player.f.buyables[i] = new Decimal(0)
        }
        for (let i = 21; i < 30; i++) {
            player.f.buyables[i] = new Decimal(0)
        }
        for (let i = 31; i < 37; i++) {
            player.f.buyables[i] = new Decimal(0)
        }

        player.p.prestigePoints = new Decimal(0)

        if (!hasMilestone("ip", 11) && !inChallenge("ip", 14))
        {
            for (let i = 0; i < player.p.upgrades.length; i++) {
                if (+player.p.upgrades[i] < 24) {
                    player.p.upgrades.splice(i, 1);
                    i--;
                }
            }
        }

        for (let i = 11; i < 19; i++) {
            player.t.buyables[i] = new Decimal(0)
        }

        player.f.factorPower = new Decimal(0)

        player.t.leaves = new Decimal(0)
        player.t.trees = new Decimal(0)

        for (let i = 11; i < 19; i++) {
            player.g.buyables[i] = new Decimal(0)
        }

        if (!hasMilestone("ip", 11) && !inChallenge("ip", 14))
        {
        for (let i = 0; i < player.g.upgrades.length; i++) {
            if (+player.g.upgrades[i] < 22) {
                player.g.upgrades.splice(i, 1);
                i--;
            }
        }
        }

        if (!hasMilestone("ip", 15) && !inChallenge("ip", 14))
        {
            for (let i = 0; i < player.r.milestones.length; i++) {
                if (+player.r.milestones[i] < 20) {
                    player.r.milestones.splice(i, 1);
                    i--;
                }
            }
        }

        player.g.grass = new Decimal(0)
        player.g.savedGrass = new Decimal(0)
        player.g.grassCount = new Decimal(0)
        player.g.grassTimer = new Decimal(0)

        player.g.goldGrass = new Decimal(0)
        player.g.savedGoldGrass = new Decimal(0)
        player.g.goldGrassCount = new Decimal(0)
        player.g.goldGrassTimer = new Decimal(0)

        player.gh.grasshoppers = new Decimal(0)
        player.gh.fertilizer = new Decimal(0)

        for (let i = 11; i < 20; i++) {
            player.gh.buyables[i] = new Decimal(0)
        }

        player.m.codeExperience = new Decimal(0)
        player.m.linesOfCode = new Decimal(0)
        player.m.mods = new Decimal(0)

        for (let i = 11; i < 15; i++) {
            player.m.buyables[i] = new Decimal(0)
        }
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "i"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.p.crystalMax == false },
            unlocked() { return true },
            onClick() {
                player.p.crystalMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.p.crystalMax == true  },
            unlocked() { return true },
            onClick() {
                player.p.crystalMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        11: {
            title() { return "<h2>Prestige, but reset all ranks and factors.</h2><br><h3>Req: 100,000 Celestial Points</h3>" },
            canClick() { return player.p.prestigePointsToGet.gte(1) && player.points.gte(100000)},
            unlocked() { return true },
            onClick() {
                layers.p.prestigeReset()
                player.p.prestigePoints = player.p.prestigePoints.add(player.p.prestigePointsToGet)
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px'},
        },
        12: {
            title() { return "<h2>Crystallize, but reset everything before unlocking OTFs.</h2>" },
            canClick() { return player.p.crystalsToGet.gte(1)},
            unlocked() { return true },
            onClick() {
                player.p.crystalPause = new Decimal(5)
                player.p.crystals = player.p.crystals.add(player.p.crystalsToGet)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px"}
                this.canClick() ? look.backgroundColor = "#98245c" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: "Prestige Upgrade I",
            unlocked() { return true },
            description: "Triples celestial point gain.",
            cost: new Decimal(1),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        },
        12:
        {
            title: "Prestige Upgrade II",
            unlocked() { return true },
            description() { return "Boosts celestial points based on prestige points." },
            cost: new Decimal(2),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
            effect() {
                let mult = player.p.prestigePoints.pow(0.2).add(1)
                if (mult.gte("1e20000")) mult = mult.div("1e20000").pow(0.1).mul("1e20000")
                return mult
            },
            effectDisplay() {
                if (upgradeEffect(this.layer, this.id).lt("1e20000")) {
                    return format(upgradeEffect(this.layer, this.id))+"x"
                } else {
                    return format(upgradeEffect(this.layer, this.id))+"x<br><small style='color:darkred'>[SOFTCAPPED]</small>"
                }
            },
            style: { width: '150px', height: '100px', }
        },
        13:
        {
            title: "Prestige Upgrade III",
            unlocked() { return true },
            description: "Unlocks Factor VII.",
            cost: new Decimal(5),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        },
        14:
        {
            title: "Prestige Upgrade IV",
            unlocked() { return true },
            description: "You can buy max ranks, tiers, and tetr",
            cost: new Decimal(16),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        },
        15:
        {
            title: "Prestige Upgrade V",
            unlocked() { return true },
            description: "Autobuys factors I-VIII.",
            cost: new Decimal(64),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
            tooltip() { return "Autobuyers don't spend resources. This applies to most autobuyers in the game." },
        },
        16:
        {
            title: "Prestige Upgrade VI",
            unlocked() { return hasUpgrade("i", 15) },
            description: "Tetr boosts factor power gain.",
            cost: new Decimal(4096),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
            effect() {
                return player.r.tetr.pow(0.6).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        17:
        {
            title: "Prestige Upgrade VII",
            unlocked() { return hasUpgrade("p", 16) },
            description: "Automates rank gain.",
            cost: new Decimal(32768),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        },
        18:
        {
            title: "Prestige Upgrade VIII",
            unlocked() { return hasUpgrade("p", 17) },
            description: "Automates tier gain.",
            cost: new Decimal(524288),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        },
        19:
        {
            title: "Prestige Upgrade IX",
            unlocked() { return hasUpgrade("p", 18) && tmp.f.buyables[26].unlocked },
            description: "Unlocks Power Factor VIII, and more tree buyables.",
            cost: new Decimal(4782969),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        },
        21:
        {
            title: "Prestige Upgrade X",
            unlocked() { return hasUpgrade("p", 19) },
            description: "Autobuys power factors I-VIII",
            cost: new Decimal(67108864),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        },
        22:
        {
            title: "Prestige Upgrade XI",
            unlocked() { return hasUpgrade("p", 21) },
            description: "Automates tetr gain.",
            cost: new Decimal(1162261467),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        },
        23:
        {
            title: "Prestige Upgrade XII",
            unlocked() { return hasUpgrade("p", 22) && hasMilestone("r", 11) },
            description: "Unlocks Tree Factor IV.",
            cost: new Decimal.pow(5, 25),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.08) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.p.crystals},
            pay(amt) { player.p.crystals = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(25).pow(1.3).add(1).pow(buyableEffect("cs", 23)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Prestige Point Crystallizer"
            },
            display() {
                return "which are multiplying prestige point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crystals"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#98245c', color: 'white'}
        },
        12: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.p.crystals},
            pay(amt) { player.p.crystals = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(11).pow(1.25).add(1).pow(buyableEffect("cs", 23)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Lines of Code and Mod Crystallizer"
            },
            display() {
                return "which are multiplying lines of code and mod gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crystals"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#98245c', color: 'white'}
        },
        13: {
            costBase() { return new Decimal(35) },
            costGrowth() { return new Decimal(1.12) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.p.crystals},
            pay(amt) { player.p.crystals = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1).pow(buyableEffect("cs", 23)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Pollinator Crystallizer"
            },
            display() {
                return "which are multiplying pollinator gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crystals"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#98245c', color: 'white'}
        },
        14: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.14) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.p.crystals},
            pay(amt) { player.p.crystals = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).add(1).pow(buyableEffect("cs", 23)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Steel Crystallizer"
            },
            display() {
                return "which are multiplying steel gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crystals"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#98245c', color: 'white'}
        },
        15: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.p.crystals},
            pay(amt) { player.p.crystals = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.02).add(1).pow(buyableEffect("cs", 23)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Infinity Crystallizer"
            },
            display() {
                return "which are multiplying infinity gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crystals"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#98245c', color: 'white'}
        },
        16: {
            costBase() { return new Decimal(150) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.p.crystals},
            pay(amt) { player.p.crystals = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.03).add(1).pow(buyableEffect("cs", 23)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Broken Infinity Crystallizer"
            },
            display() {
                return "which are multiplying broken infinity gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crystals"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#98245c', color: 'white'}
        },
        17: {
            costBase() { return new Decimal(250) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.p.crystals},
            pay(amt) { player.p.crystals = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1).pow(buyableEffect("cs", 23)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Mastery Point Crystallizer"
            },
            display() {
                return "which are multiplying the first 3 OTF mastery point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crystals"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#98245c', color: 'white'}
        },
        18: {
            costBase() { return new Decimal(400) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.p.crystals},
            pay(amt) { player.p.crystals = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.03).add(1).pow(buyableEffect("cs", 23)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Tav's Domain Infinity Crystallizer"
            },
            display() {
                return "which are multiplying the alternate broken infinity gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crystals"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#98245c', color: 'white'}
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
                buttonStyle() { return { color: "#31aeb0", borderRadius: "5px" } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16]]],
                    ["row", [["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 21], ["upgrade", 22], ["upgrade", 23]]],
                ]
            },
            "Crystallize": {
                buttonStyle() { return { color: "white", borderRadius: "5px", borderColor: "#31aeb0", backgroundColor: "#98245c"}},
                unlocked() { return hasUpgrade("i", 24) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.p.crystals) + "</h3> crystals." }, { color: "#b6658c", fontSize: "24px", fontFamily: "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + format(player.p.crystalsToGet) + "</h3> crystals on reset. (based on tier)"}, { color: "#b6658c", fontSize: "16px", fontFamily: "monospace" }],
                    ["raw-html", function () { return "Crystals boosts ranks, tiers, tetr, and pent effect by <h3>^" + format(player.p.crystalEffect, 5) + "</h3>."}, { color: "#b6658c", fontSize: "16px", fontFamily: "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 12]]],
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14]]],
                    ["row", [["ex-buyable", 15], ["ex-buyable", 16], ["ex-buyable", 17], ["ex-buyable", 18]]],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + format(player.p.prestigePoints) + "</h3> prestige points." }, { "color": "#31aeb0", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.points.gt(100000) ? "You will gain <h3>" + format(player.p.prestigePointsToGet) + "</h3> prestige points on reset." : ""}, { "color": "#31aeb0", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 14) }
})
