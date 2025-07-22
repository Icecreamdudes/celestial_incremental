addLayer("de", {
    name: "Debuff", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "DE", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        antidebuffPause: new Decimal(0),
        antidebuffPoints: new Decimal(0),
        antidebuffPointsToGet: new Decimal(0),

        antidebuffIndex: new Decimal(6),
        antidebuffPointsEffect: new Decimal(1),
        antidebuffEffect: new Decimal(1),
        antidebuffText: "",

        tavPoints: new Decimal(0),
        tavPointsEffect: new Decimal(0),
        tavPointsToGet: new Decimal(0),

        tavEssence: new Decimal(0),
        tavEssencePerSecond: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(0deg, #4e386e 0%, #8D71B4 100%)",
            "background-origin": "border-box",
            "border-color": "#3A2558",
        };
    },
    tooltip: "Debuff",
    color: "#4e386e",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.de.antidebuffPause.gt(0)) {
            layers.de.antidebuffReset();
        }
        player.de.antidebuffPause = player.de.antidebuffPause.sub(1)

        if (player.de.antidebuffPointsToGet.lt(1e24)) player.de.antidebuffPointsToGet = player.gh.grasshoppers.div(1e14).pow(0.45)
        if (player.de.antidebuffPointsToGet.gte(1e24)) player.de.antidebuffPointsToGet = player.gh.grasshoppers.div(1e12).pow(0.3)
        player.de.antidebuffPointsToGet = player.de.antidebuffPointsToGet.mul(buyableEffect("tad", 16))

        player.de.antidebuffPointsEffect = player.de.antidebuffPoints.pow(0.54321).mul(10).add(1)

        player.de.antidebuffEffect = layers.de.getAntidebuffEffect(player.de.antidebuffIndex)

        if (hasUpgrade("de", 17) && inChallenge("tad", 11)) player.de.antidebuffPoints = player.de.antidebuffPoints.add(player.de.antidebuffPointsToGet.mul(delta))

        if (inChallenge("ip", 18) && player.de.antidebuffIndex.neq(6) && player.de.antidebuffIndex.neq(0)) {
            player.points = player.points.sub(player.points.mul(0.95 * delta))
        }
        if (player.points.lte(0)) {
            player.points = new Decimal(0)
        }
        if (inChallenge("ip", 18) && player.de.antidebuffIndex.neq(6) && player.de.antidebuffIndex.neq(1)) {
            player.p.prestigePoints = player.p.prestigePoints.sub(player.p.prestigePoints.mul(0.95 * delta))
        }
        if (player.p.prestigePoints.lte(0)) {
            player.p.prestigePoints = new Decimal(0)
        }
        if (inChallenge("ip", 18) && player.de.antidebuffIndex.neq(6) && player.de.antidebuffIndex.neq(2)) {
            player.g.grass = player.g.grass.sub(player.g.grass.mul(0.95 * delta))
        }
        if (player.g.grass.lte(0)) {
            player.g.grass = new Decimal(0)
        }
        if (inChallenge("ip", 18) && player.de.antidebuffIndex.neq(6) && player.de.antidebuffIndex.neq(3)) {
            player.t.trees = player.t.trees.sub(player.t.trees.mul(0.95 * delta))
        }
        if (player.t.trees.lte(0)) {
            player.t.trees = new Decimal(0)
        }
        if (inChallenge("ip", 18) && player.de.antidebuffIndex.neq(6) && player.de.antidebuffIndex.neq(4)) {
            player.m.mods = player.m.mods.sub(player.m.mods.mul(0.95 * delta))
        }
        if (player.m.mods.lte(0)) {
            player.m.mods = new Decimal(0)
        }
        if (inChallenge("ip", 18) && player.de.antidebuffIndex.neq(6) && player.de.antidebuffIndex.neq(5)) {
            player.m.codeExperience = player.m.codeExperience.sub(player.m.codeExperience.mul(0.95 * delta))
        }
        if (player.m.codeExperience.lte(0)) {
            player.m.codeExperience = new Decimal(0)
        }

        if (player.de.antidebuffIndex == 0) {
                player.de.antidebuffText = "Your chosen effect is boosting points by x" + format(player.de.antidebuffEffect) + "."
        } else if (player.de.antidebuffIndex == 1) {
                player.de.antidebuffText = "Your chosen effect is boosting prestige points by x" + format(player.de.antidebuffEffect) + "."
        } else if (player.de.antidebuffIndex == 2) {
                player.de.antidebuffText = "Your chosen effect is boosting grass by x" + format(player.de.antidebuffEffect) + "."
        } else if (player.de.antidebuffIndex == 3) {
                player.de.antidebuffText = "Your chosen effect is boosting trees by x" + format(player.de.antidebuffEffect) + "."
        } else if (player.de.antidebuffIndex == 4) {
                player.de.antidebuffText = "Your chosen effect is boosting mods by x" + format(player.de.antidebuffEffect) + "."
        } else if (player.de.antidebuffIndex == 5) {
                player.de.antidebuffText = "Your chosen effect is boosting code experience by x" + format(player.de.antidebuffEffect) + "."
        } else if (player.de.antidebuffIndex == 6) {
                player.de.antidebuffText = "Your chosen effect is boosting nothing."
        }

        player.de.tavPointsToGet = player.points.pow(0.08).add(1)
        player.de.tavPointsToGet = player.de.tavPointsToGet.mul(buyableEffect("de", 14))
        if (hasUpgrade("de", 19)) player.de.tavPointsToGet = player.de.tavPointsToGet.mul(upgradeEffect("de", 19))
        if (hasUpgrade("tad", 14)) player.de.tavPointsToGet = player.de.tavPointsToGet.mul(buyableEffect("tad", 14))
        if (player.de.tavPointsToGet.gte(1e100)) player.de.tavPointsToGet = new Decimal(1e100)

        if (hasUpgrade("de", 18)) player.de.tavPoints = player.de.tavPoints.add(player.de.tavPointsToGet.mul(0.1).mul(delta))

        player.de.tavEssencePerSecond = player.de.tavPoints.pow(1.55).add(1)
        player.de.tavEssencePerSecond = player.de.tavEssencePerSecond.mul(buyableEffect("de", 13))
        if (hasUpgrade("de", 12)) player.de.tavEssencePerSecond = player.de.tavEssencePerSecond.mul(upgradeEffect("de", 12))
        if (hasUpgrade("de", 19)) player.de.tavEssencePerSecond = player.de.tavEssencePerSecond.mul(upgradeEffect("de", 19))
        player.de.tavEssencePerSecond = player.de.tavEssencePerSecond.mul(buyableEffect("tad", 15))

        player.de.tavEssence = player.de.tavEssence.add(player.de.tavEssencePerSecond.mul(delta))

        player.de.tavPointsEffect = player.de.tavPoints.pow(2).add(1)
    },
    getAntidebuffEffect(index) {
        if (index == 0) {
                return player.de.antidebuffPoints.mul(50).pow(4.6).add(1)
        } else if (index == 1) {
                return player.de.antidebuffPoints.mul(30).pow(4).add(1)
        } else if (index == 2) {
                return player.de.antidebuffPoints.mul(20).pow(3.5).add(1)
        } else if (index == 3) {
                return player.de.antidebuffPoints.mul(14).pow(3.2).add(1)
        } else if (index == 4) {
                return player.de.antidebuffPoints.mul(10).pow(2.8).add(1)
        } else if (index == 5) {
                return player.de.antidebuffPoints.mul(7).pow(2.7).add(1)
        } else if (index == 6) {
                return new Decimal(1)
        }
    },
    antidebuffReset() {
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

        player.f.buyables[1] = new Decimal(0)
        player.f.buyables[2] = new Decimal(0)
        player.f.buyables[3] = new Decimal(0)
        player.f.buyables[4] = new Decimal(0)
        player.f.buyables[5] = new Decimal(0)
        player.f.buyables[6] = new Decimal(0)
        player.f.buyables[7] = new Decimal(0)
        player.f.buyables[8] = new Decimal(0)
        player.f.buyables[11] = new Decimal(0)
        player.f.buyables[12] = new Decimal(0)
        player.f.buyables[13] = new Decimal(0)
        player.f.buyables[14] = new Decimal(0)
        player.f.buyables[15] = new Decimal(0)
        player.f.buyables[16] = new Decimal(0)
        player.f.buyables[17] = new Decimal(0)
        player.f.buyables[18] = new Decimal(0)
        player.f.buyables[19] = new Decimal(0)
        player.f.buyables[21] = new Decimal(0)
        player.f.buyables[22] = new Decimal(0)
        player.f.buyables[23] = new Decimal(0)
        player.f.buyables[24] = new Decimal(0)
        player.f.buyables[25] = new Decimal(0)
        player.f.buyables[26] = new Decimal(0)
        player.f.buyables[27] = new Decimal(0)
        player.f.buyables[28] = new Decimal(0)
        player.f.buyables[29] = new Decimal(0)
        player.f.buyables[31] = new Decimal(0)
        player.f.buyables[32] = new Decimal(0)
        player.f.buyables[33] = new Decimal(0)
        player.f.buyables[34] = new Decimal(0)
        player.f.buyables[35] = new Decimal(0)
        player.f.buyables[36] = new Decimal(0)

        player.p.prestigePoints = new Decimal(0)

        if (!hasMilestone("ip", 11) && !inChallenge("ip", 14)) {
            for (let i = 0; i < player.p.upgrades.length; i++) {
                if (+player.p.upgrades[i] < 24) {
                    player.p.upgrades.splice(i, 1);
                    i--;
                }
            }
        }

        player.t.buyables[11] = new Decimal(0)
        player.t.buyables[12] = new Decimal(0)
        player.t.buyables[13] = new Decimal(0)
        player.t.buyables[14] = new Decimal(0)
        player.t.buyables[15] = new Decimal(0)
        player.t.buyables[16] = new Decimal(0)
        player.t.buyables[17] = new Decimal(0)
        player.t.buyables[18] = new Decimal(0)

        player.f.factorPower = new Decimal(0)

        player.t.leaves = new Decimal(0)
        player.t.trees = new Decimal(0)

        player.g.buyables[11] = new Decimal(0)
        player.g.buyables[12] = new Decimal(0)
        player.g.buyables[13] = new Decimal(0)
        player.g.buyables[14] = new Decimal(0)
        player.g.buyables[15] = new Decimal(0)
        player.g.buyables[16] = new Decimal(0)
        player.g.buyables[17] = new Decimal(0)
        player.g.buyables[18] = new Decimal(0)

        if (!hasMilestone("ip", 11) && !inChallenge("ip", 14)) {
            for (let i = 0; i < player.g.upgrades.length; i++) {
                if (+player.g.upgrades[i] < 22) {
                    player.g.upgrades.splice(i, 1);
                    i--;
                }
            }
        }

        if (!hasMilestone("ip", 15) && !inChallenge("ip", 14)) {
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

        player.gh.buyables[11] = new Decimal(0)
        player.gh.buyables[12] = new Decimal(0)
        player.gh.buyables[13] = new Decimal(0)
        player.gh.buyables[14] = new Decimal(0)
        player.gh.buyables[15] = new Decimal(0)
        player.gh.buyables[16] = new Decimal(0)
        player.gh.buyables[17] = new Decimal(0)
        player.gh.buyables[18] = new Decimal(0)
        player.gh.buyables[19] = new Decimal(0)

        player.m.codeExperience = new Decimal(0)
        player.m.linesOfCode = new Decimal(0)
        player.m.mods = new Decimal(0)

        player.m.buyables[11] = new Decimal(0)
        player.m.buyables[12] = new Decimal(0)
        player.m.buyables[13] = new Decimal(0)
        player.m.buyables[14] = new Decimal(0)

        //dice
        player.d.dicePoints = new Decimal(0)
        player.d.diceRolls = [new Decimal(1)]
        player.d.dice = new Decimal(1)

        player.d.buyables[11] = new Decimal(0)
        player.d.buyables[12] = new Decimal(0)
        player.d.buyables[13] = new Decimal(0)
        player.d.buyables[14] = new Decimal(0)
        player.d.buyables[15] = new Decimal(0)

        for (let i = 0; i < 11; i++) {
            player.d.diceEffects[i] = new Decimal(1)
        }

        //rf
        player.rf.rocketFuel = new Decimal(0)
        for (let i = 0; i < player.rf.abilitiesUnlocked.length; i++) {
            player.rf.abilitiesUnlocked[i] = false
        }
        for (let i = 0; i < 4; i++) {
            player.rf.abilityTimers[i] = new Decimal(0)
        }

        for (let i = 0; i < player.rf.upgrades.length; i++) {
            if (+player.rf.upgrades[i] < 18) {
                player.rf.upgrades.splice(i, 1);
                i--;
            }
        }
    },
    branches: ["t", "m"],
    clickables: {
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
        11: {
            title() { return "<h3>Reset everything before OTFs for antidebuff points.<br><h4>Req: 1e14 grasshoppers." },
            canClick() { return player.de.antidebuffPointsToGet.gte(1) && player.gh.grasshoppers.gte(1e14)},
            unlocked() { return true },
            onClick() {
                player.de.antidebuffPause = new Decimal(4)
                player.de.antidebuffPoints = player.de.antidebuffPoints.add(player.de.antidebuffPointsToGet)
            },
            style: { width: '400px', "min-height": '80px', borderRadius: '15px' },
        },
        12: {
            title() { return "Points<br>x" + format(layers.de.getAntidebuffEffect(0)) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.de.antidebuffIndex = new Decimal(0)
            },
            style: { width: '150px', "min-height": '75px', 'border-radius': "0%" },
        },
        13: {
            title() { return "Prestige Points<br>x" + format(layers.de.getAntidebuffEffect(1)) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.de.antidebuffIndex = new Decimal(1)
            },
            style: { width: '150px', "min-height": '75px', 'border-radius': "0%" },
        },
        14: {
            title() { return "Grass<br>x" + format(layers.de.getAntidebuffEffect(2))},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.de.antidebuffIndex = new Decimal(2)
            },
            style: { width: '150px', "min-height": '75px', 'border-radius': "0%" },
        },
        15: {
            title() { return "Trees<br>x" + format(layers.de.getAntidebuffEffect(3)) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.de.antidebuffIndex = new Decimal(3)
            },
            style: { width: '150px', "min-height": '75px', 'border-radius': "0%" },
        },
        16: {
            title() { return "Mods<br>x" + format(layers.de.getAntidebuffEffect(4)) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.de.antidebuffIndex = new Decimal(4)
            },
            style: { width: '150px', "min-height": '75px', 'border-radius': "0%" },
        },
        17: {
            title() { return "Code Experience<br>x" + format(layers.de.getAntidebuffEffect(5)) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.de.antidebuffIndex = new Decimal(5)
            },
            style: { width: '150px', "min-height": '75px', 'border-radius': "0%" },
        },
        18: {
            title() { return "None" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.de.antidebuffIndex = new Decimal(6)
            },
            style: { width: '150px', "min-height": '75px', 'border-radius': "0%" },
        },
        19: {
            title() { return "<h3>Reset for Tav Points, but do an equivalent Tav Domain reset. <br>(Req: 1e9 celestial points)" },
            canClick() { return player.de.tavPointsToGet.gte(1) && player.points.gte(1e9) },
            unlocked() { return true },
            onClick() {
                player.tad.domainResetPause = new Decimal(5)
                layers.in.bigCrunch();
                player.de.tavPoints = player.de.tavPoints.add(player.de.tavPointsToGet)
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px' },
        },
    },
    bars: {},
    upgrades: {
        11:
        {
            title: "Tav Essence Upgrade I",
            unlocked() { return true },
            description() { return "Tav essence boosts grasshoppers." },
            cost: new Decimal(1e9),
            currencyLocation() { return player.de },
            currencyDisplayName: "Tav Essence",
            currencyInternalName: "tavEssence",
            effect() {
                return player.de.tavEssence.pow(0.15).div(3).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12:
        {
            title: "Tav Essence Upgrade II",
            unlocked() { return true },
            description() { return "Points boost tav essence." },
            cost: new Decimal(1e11),
            currencyLocation() { return player.de },
            currencyDisplayName: "Tav Essence",
            currencyInternalName: "tavEssence",
            effect() {
                return player.points.plus(1).log10().pow(1.1).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13:
        {
            title: "Tav Essence Upgrade III",
            unlocked() { return true },
            description() { return "Re-unlock check back early, cuz yeah." },
            cost: new Decimal(1e12),
            currencyLocation() { return player.de },
            currencyDisplayName: "Tav Essence",
            currencyInternalName: "tavEssence",
        },
        14:
        {
            title: "Tav Essence Upgrade IV",
            unlocked() { return true },
            description() { return "Gain an OTF slot, but only while in Tav's domain." },
            cost: new Decimal(1e14),
            currencyLocation() { return player.de },
            currencyDisplayName: "Tav Essence",
            currencyInternalName: "tavEssence",
        },
        15:
        {
            title: "Tav Essence Upgrade V",
            unlocked() { return true },
            description() { return "Check back boosts point gain." },
            cost: new Decimal(1e15),
            currencyLocation() { return player.de },
            currencyDisplayName: "Tav Essence",
            currencyInternalName: "tavEssence",
            effect() {
                return player.cb.levelEffect.pow(0.35).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        16:
        {
            title: "Tav Essence Upgrade VI",
            unlocked() { return true },
            description() { return "Re-unlock antidebuff points." },
            cost: new Decimal(1e17),
            currencyLocation() { return player.de },
            currencyDisplayName: "Tav Essence",
            currencyInternalName: "tavEssence",
        },
        17:
        {
            title: "Tav Essence Upgrade VII",
            unlocked() { return true },
            description() { return "Gain 100% of antidebuff points per second." },
            cost: new Decimal(1e24),
            currencyLocation() { return player.de },
            currencyDisplayName: "Tav Essence",
            currencyInternalName: "tavEssence",
        },
        18:
        {
            title: "Tav Essence Upgrade VIII",
            unlocked() { return true },
            description() { return "Gain 10% of tav points per second." },
            cost: new Decimal(1e40),
            currencyLocation() { return player.de },
            currencyDisplayName: "Tav Essence",
            currencyInternalName: "tavEssence",
        },
        19:
        {
            title: "Tav Essence Upgrade IX",
            unlocked() { return true },
            description() { return "Boost tav points and essence based on broken infinities." },
            cost: new Decimal(1e48),
            currencyLocation() { return player.de },
            currencyDisplayName: "Tav Essence",
            currencyInternalName: "tavEssence",
            effect() {
                return player.bi.brokenInfinities.mul(100).pow(1.6).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(50) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.6).mul(0.02).add(1) },
            unlocked() { return true },
            canAfford() { return player.de.tavEssence.gte(this.cost()) },
            title() {
                return "Point Limit Breaker"
            },
            display() {
                return "which are boosting point gain by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Tav Essence"
            },
            buy(mult) {
                let base = new Decimal(50)
                let growth = 1.5
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.de.tavEssence = player.de.tavEssence.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.de.tavEssence, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.de.tavEssence = player.de.tavEssence.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(0deg, #4e386e 0%, #8D71B4 100%)", backgroundOrigin: "border-box"}
        },
        12: {
            cost(x) { return new Decimal(1.675).pow(x || getBuyableAmount(this.layer, this.id)).mul(200) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(2.5).add(1)},
            unlocked() { return true },
            canAfford() { return player.de.tavEssence.gte(this.cost()) },
            title() {
                return "Antimatter Dimension Limit Breaker"
            },
            display() {
                return "which are boosting all antimatter dimension gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Tav Essence"
            },
            buy(mult) {
                let base = new Decimal(200)
                let growth = 1.675
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.de.tavEssence = player.de.tavEssence.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.de.tavEssence, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.de.tavEssence = player.de.tavEssence.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(0deg, #4e386e 0%, #8D71B4 100%)", backgroundOrigin: "border-box"}
        },
        13: {
            cost(x) { return new Decimal(1.75).pow(x || getBuyableAmount(this.layer, this.id)).mul(500) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.9).mul(0.5).add(1)},
            unlocked() { return true },
            canAfford() { return player.de.tavEssence.gte(this.cost()) },
            title() {
                return "Tav Essence Limit Breaker"
            },
            display() {
                return "which are boosting tav essence gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Tav Essence"
            },
            buy(mult) {
                let base = new Decimal(500)
                let growth = 1.75
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.de.tavEssence = player.de.tavEssence.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.de.tavEssence, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.de.tavEssence = player.de.tavEssence.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(0deg, #4e386e 0%, #8D71B4 100%)", backgroundOrigin: "border-box"}
        },
        14: {
            cost(x) { return new Decimal(1.875).pow(x || getBuyableAmount(this.layer, this.id)).mul(900) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.7).mul(0.35).add(1)},
            unlocked() { return true },
            canAfford() { return player.de.tavEssence.gte(this.cost()) },
            title() {
                return "Tav Point Limit Breaker"
            },
            display() {
                return "which are boosting tav point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Tav Essence"
            },
            buy(mult) {
                let base = new Decimal(900)
                let growth = 1.875
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.de.tavEssence = player.de.tavEssence.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.de.tavEssence, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.de.tavEssence = player.de.tavEssence.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(0deg, #4e386e 0%, #8D71B4 100%)", backgroundOrigin: "border-box"}
        },
        15: {
            cost(x) { return new Decimal(1.6).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e6) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.0175).add(1)},
            unlocked() { return true },
            canAfford() { return player.de.tavEssence.gte(this.cost()) },
            title() {
                return "Grass Limit Breaker"
            },
            display() {
                return "which are boosting grass gain by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Tav Essence"
            },
            buy(mult) {
                let base = new Decimal(1e6)
                let growth = 1.6
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.de.tavEssence = player.de.tavEssence.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.de.tavEssence, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.de.tavEssence = player.de.tavEssence.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(0deg, #4e386e 0%, #8D71B4 100%)", backgroundOrigin: "border-box"}
        },
        16: {
            cost(x) { return new Decimal(1.7).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e7) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.4).mul(0.015).add(1)},
            unlocked() { return true },
            canAfford() { return player.de.tavEssence.gte(this.cost()) },
            title() {
                return "Grasshop Limit Breaker"
            },
            display() {
                return "which are boosting grasshop gain by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Tav Essence"
            },
            buy(mult) {
                let base = new Decimal(1e7)
                let growth = 1.7
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.de.tavEssence = player.de.tavEssence.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.de.tavEssence, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.de.tavEssence = player.de.tavEssence.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(0deg, #4e386e 0%, #8D71B4 100%)", backgroundOrigin: "border-box"}
        },
        17: {
            cost(x) { return new Decimal(1.8).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e8) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.35).mul(0.0136).add(1)},
            unlocked() { return true },
            canAfford() { return player.de.tavEssence.gte(this.cost()) },
            title() {
                return "Code Experience Limit Breaker"
            },
            display() {
                return "which are boosting code experience gain by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Tav Essence"
            },
            buy(mult) {
                let base = new Decimal(1e8)
                let growth = 1.8
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.de.tavEssence = player.de.tavEssence.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.de.tavEssence, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.de.tavEssence = player.de.tavEssence.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(0deg, #4e386e 0%, #8D71B4 100%)", backgroundOrigin: "border-box"}
        },
        18: {
            cost(x) { return new Decimal(1.9).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e14) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.3).mul(0.035).add(1)},
            unlocked() { return true },
            canAfford() { return player.de.tavEssence.gte(this.cost()) },
            title() {
                return "Antimatter Effect Limit Breaker"
            },
            display() {
                return "which are boosting antimatter effect and gain by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Tav Essence"
            },
            buy(mult) {
                let base = new Decimal(1e14)
                let growth = 1.9
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.de.tavEssence = player.de.tavEssence.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.de.tavEssence, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.de.tavEssence = player.de.tavEssence.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(0deg, #4e386e 0%, #8D71B4 100%)", backgroundOrigin: "border-box"}
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "C8 Debuffs": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return inChallenge("ip", 18) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "^0.4 to celestial point gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "^0.5 to prestige point gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "^0.6 to grasshopper gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "^0.6 to code experience gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "-90% of points per second." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "-60% of prestige points per second." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "-40% of grass per second." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "-30% of trees and mods per second." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "-20% of code experience per second." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
            "Tav's Domain Debuffs": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return inChallenge("tad", 11) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "^0.3 to prestige point gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "^0.35 to grasshopper gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "^0.4 to code experience gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "^0.4 to grass gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "^0.45 to celestial point gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "^0.5 to tree gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "^0.5 to leaf gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "^0.55 to all antimatter dimensions." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                ]
            },
            "Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return inChallenge("tad", 11) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.de.tavEssence) + "</h3> tav essence." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.de.tavEssencePerSecond) + "</h3> tav essence per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["style-row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16],
                        ["upgrade", 17], ["upgrade", 18], ["upgrade", 19]], {maxWidth: "800px"}],
                ]
            },
            "Antidebuff": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return inChallenge("ip", 18) || hasUpgrade("de", 16)},
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return !inChallenge("tad", 11) ? "You have <h3>" + format(player.de.antidebuffPoints) + "</h3> antidebuff points, which divide pest gain by /" + format(player.de.antidebuffPointsEffect) + "." : "" }, { "color": "#8D71B4", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return inChallenge("tad", 11) ? "You have <h3>" + format(player.de.antidebuffPoints) + "</h3> antidebuff points, <s>which divide pest gain by /" + format(player.de.antidebuffPointsEffect) + "." : "" }, { "color": "#8D71B4", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + format(player.de.antidebuffPointsToGet) + "</h3> antidebuff points on reset." }, { "color": "#8D71B4", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.de.antidebuffText }, { "color": "#8D71B4", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return !inChallenge("tad", 11) ? "When an effect is activated, all other resources are depleted by 95% per second." : ""}, { "color": "#8D71B4", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return inChallenge("tad", 11) ? "<s>When an effect is activated, all other resources are depleted by 95% per second." : ""}, { "color": "#8D71B4", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["style-row", [["clickable", 12], ["clickable", 13], ["clickable", 14], ["clickable", 15], ["clickable", 16], ["clickable", 17], ["clickable", 18]], {maxWidth: "1100px"}],
                ]
            },
            "Tav's Compensation": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return inChallenge("tad", 11) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.de.tavPoints) + "</h3> tav points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "which boost point gain by x<h3>" + format(player.de.tavPointsEffect) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + format(player.de.tavPointsToGet) + "</h3> tav points on reset (based on points)." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 19]]],
                    ["raw-html", function () { return "(These effects are only active while in Tav's Domain)" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.de.tavEssence) + "</h3> tav essence." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.de.tavEssencePerSecond) + "</h3> tav essence per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14],
                        ["ex-buyable", 15], ["ex-buyable", 16], ["ex-buyable", 17], ["ex-buyable", 18]], {maxWidth: "1200px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.gain) + "</h3> celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && (inChallenge("ip", 18) || inChallenge("tad", 11)) },
    deactivated() { return !(inChallenge("ip", 18) || inChallenge("tad", 11))},
})
