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
    },
    nodeStyle() {
    },
    tooltip: "Prestige",
    color: "#31aeb0",
    branches: ["f"],
    update(delta) {
        let onepersec = new Decimal(1)

        player.p.prestigePointsToGet = player.points.div(100000).pow(0.5)
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.t.treeEffect)
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(buyableEffect("g", 16))
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.r.pentEffect)
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.gh.grasshopperEffects[2])
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(buyableEffect("m", 14))
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.cb.commonPetEffects[1][0])
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.d.diceEffects[2])
        if (hasUpgrade("ip", 21) && !inChallenge("ip", 14)) player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(upgradeEffect("ip", 21))
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.div(player.pe.pestEffect[2])
        if (hasUpgrade("d", 17)) player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(upgradeEffect("d", 17))
        if (inChallenge("ip", 13)) player.p.prestigePointsToGet = player.p.prestigePointsToGet.pow(0.7)
        if (inChallenge("ip", 13) || player.po.hex) player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(buyableEffect("h", 12))
        if (inChallenge("ip", 15)) player.p.prestigePointsToGet = player.p.prestigePointsToGet.pow(0.65)
        if (inChallenge("ip", 18)) player.p.prestigePointsToGet = player.p.prestigePointsToGet.pow(0.5)
        if (player.de.antidebuffIndex.eq(1)) player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(player.de.antidebuffEffect)
        if (inChallenge("tad", 11)) player.p.prestigePointsToGet = player.p.prestigePointsToGet.pow(0.3)
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(buyableEffect("p", 11))
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.mul(buyableEffect("id", 22))
        player.p.prestigePointsToGet = player.p.prestigePointsToGet.pow(buyableEffect("rm", 23))

        player.p.prestigePoints = player.p.prestigePoints.add(player.p.prestigePointsToGet.mul(buyableEffect("gh", 14).mul(delta)))
        if (hasUpgrade("rf", 12)) player.p.prestigePoints = player.p.prestigePoints.add(player.p.prestigePointsToGet.mul(Decimal.mul(0.2, delta)))
        if (hasMilestone("ip", 12) && !inChallenge("ip", 14)) player.p.prestigePoints = player.p.prestigePoints.add(player.p.prestigePointsToGet.mul(Decimal.mul(0.05, delta)))

        if (inChallenge("ip", 18) && player.p.prestigePoints.gt(player.p.prestigePoints.mul(0.6 * delta)))
        {
            player.p.prestigePoints = player.p.prestigePoints.sub(player.p.prestigePoints.mul(0.6 * delta))
        } 

        if (player.p.crystalPause.gt(0)) {
            layers.p.crystalReset();
        }
        player.p.crystalPause = player.p.crystalPause.sub(1)

        player.p.crystalEffect = player.p.crystals.plus(1).log10().pow(0.265).mul(0.045).add(1)

        player.p.crystalsToGet = player.r.tier.pow(0.002).mul(4)

        player.p.crystalsToGet = player.p.crystalsToGet.mul(buyableEffect("id", 22))
        player.p.crystalsToGet = player.p.crystalsToGet.mul(buyableEffect("r", 12))
        player.p.crystalsToGet = player.p.crystalsToGet.mul(player.rm.realmModsEffect[1])
        player.p.crystalsToGet = player.p.crystalsToGet.mul(buyableEffect("oi", 22))
        player.p.crystalsToGet = player.p.crystalsToGet.mul(player.cb.evolvedEffects[6][1])
        player.p.crystalsToGet = player.p.crystalsToGet.mul(player.cb.rarePetEffects[5][1])
    },
    prestigeReset()
    {
        player.points = new Decimal(0)
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        player.r.tetr = new Decimal(0)
        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
        player.r.tetrsToGet = new Decimal(0)

        player.f.buyables[11] = new Decimal(0)
        player.f.buyables[12] = new Decimal(0)
        player.f.buyables[13] = new Decimal(0)
        player.f.buyables[14] = new Decimal(0)
        player.f.buyables[15] = new Decimal(0)
        player.f.buyables[16] = new Decimal(0)
        player.f.buyables[17] = new Decimal(0)
        player.f.buyables[18] = new Decimal(0)

        player.f.factorPower = new Decimal(0)
    },
    crystalReset()
    {
        player.pe.pests = new Decimal(0)
        player.points = new Decimal(10)
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        player.r.tetr = new Decimal(0)
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

        if (!hasMilestone("ip", 11) && !inChallenge("ip", 14))
        {
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

        player.gh.buyables[11] = new Decimal(0)
        player.gh.buyables[12] = new Decimal(0)
        player.gh.buyables[13] = new Decimal(0)
        player.gh.buyables[14] = new Decimal(0)
        player.gh.buyables[15] = new Decimal(0)
        player.gh.buyables[16] = new Decimal(0)
        player.gh.buyables[17] = new Decimal(0)
        player.gh.buyables[18] = new Decimal(0)
        player.gh.buyables[19] = new Decimal(0)
        player.gh.buyables[21] = new Decimal(0)
        player.gh.buyables[22] = new Decimal(0)

        player.m.codeExperience = new Decimal(0)
        player.m.linesOfCode = new Decimal(0)
        player.m.mods = new Decimal(0)

        player.m.buyables[11] = new Decimal(0)
        player.m.buyables[12] = new Decimal(0)
        player.m.buyables[13] = new Decimal(0)
        player.m.buyables[14] = new Decimal(0)
    },
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
            title() { return "<h3>Prestige, but reset all ranks and factors. <br>(Req: 100,000 Celestial Points)" },
            canClick() { return player.p.prestigePointsToGet.gte(1) && player.points.gte(100000)},
            unlocked() { return true },
            onClick() {
                layers.p.prestigeReset()
                player.p.prestigePoints = player.p.prestigePoints.add(player.p.prestigePointsToGet)
            },
            style: { width: '400px', "min-height": '100px' },
        },
        12: {
            title() { return "<h3>Crystallize, but reset everything before unlocking OTFs." },
            canClick() { return player.p.crystalsToGet.gte(1)},
            unlocked() { return true },
            onClick() {
                player.p.crystalPause = new Decimal(5)
                player.p.crystals = player.p.crystals.add(player.p.crystalsToGet)
            },
            style: { 'background-image': '#98245c', width: '400px', "min-height": '100px', },
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
                return player.p.prestigePoints.pow(0.2).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
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
            description: "You can buy max ranks, tiers, tetr, etc.",
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
            unlocked() { return hasUpgrade("p", 18) && player.f.powerFactorUnlocks[6] == true },
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
            unlocked() { return hasUpgrade("p", 19) },
            description: "Automates tetr gain.",
            cost: new Decimal(1162261467),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        },
        23:
        {
            title: "Prestige Upgrade XII",
            unlocked() { return hasMilestone("r", 11) },
            description: "Unlocks Tree Factor IV.",
            cost: new Decimal.pow(5, 25),
            currencyLocation() { return player.p },
            currencyDisplayName: "Prestige Points",
            currencyInternalName: "prestigePoints",
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.08).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(25).pow(1.3).add(1) },
            unlocked() { return true },
            canAfford() { return player.p.crystals.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br>Prestige Point Crystallizer"
            },
            display() {
                return "which are multiplying prestige point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crystals"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.08
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.p.crystals = player.p.crystals.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.crystals, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.p.crystals = player.p.crystals.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(20) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(11).pow(1.25).add(1) },
            unlocked() { return true },
            canAfford() { return player.p.crystals.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br>Lines of Code and Mod Crystallizer"
            },
            display() {
                return "which are multiplying lines of code and mod gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crystals"
            },
            buy() {
                let base = new Decimal(20)
                let growth = 1.1
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.p.crystals = player.p.crystals.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.crystals, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.p.crystals = player.p.crystals.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(1.12).pow(x || getBuyableAmount(this.layer, this.id)).mul(35) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(7).pow(1.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.p.crystals.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br>Code Experience Crystallizer"
            },
            display() {
                return "which are multiplying code experience gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crystals"
            },
            buy() {
                let base = new Decimal(35)
                let growth = 1.12
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.p.crystals = player.p.crystals.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.crystals, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.p.crystals = player.p.crystals.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            cost(x) { return new Decimal(1.14).pow(x || getBuyableAmount(this.layer, this.id)).mul(50) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return true },
            canAfford() { return player.p.crystals.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br>Steel Crystallizer"
            },
            display() {
                return "which are multiplying steel gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crystals"
            },
            buy() {
                let base = new Decimal(50)
                let growth = 1.14
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.p.crystals = player.p.crystals.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.crystals, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.p.crystals = player.p.crystals.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        15: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(100) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return true },
            canAfford() { return player.p.crystals.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br>Infinity Crystallizer"
            },
            display() {
                return "which are multiplying infinity gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crystals"
            },
            buy() {
                let base = new Decimal(100)
                let growth = 1.25
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.p.crystals = player.p.crystals.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.crystals, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.p.crystals = player.p.crystals.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        16: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(150) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.03).add(1) },
            unlocked() { return true },
            canAfford() { return player.p.crystals.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br>Broken Infinity Crystallizer"
            },
            display() {
                return "which are multiplying broken infinity gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crystals"
            },
            buy() {
                let base = new Decimal(150)
                let growth = 1.3
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.p.crystals = player.p.crystals.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.crystals, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.p.crystals = player.p.crystals.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        17: {
            cost(x) { return new Decimal(1.35).pow(x || getBuyableAmount(this.layer, this.id)).mul(250) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.p.crystals.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br>Mastery Point Crystallizer"
            },
            display() {
                return "which are multiplying the first 3 OTF mastery point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crystals"
            },
            buy() {
                let base = new Decimal(250)
                let growth = 1.35
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.p.crystals = player.p.crystals.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.crystals, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.p.crystals = player.p.crystals.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        18: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(400) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.03).add(1) },
            unlocked() { return true },
            canAfford() { return player.p.crystals.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br>Tav's Domain Infinity Crystallizer"
            },
            display() {
                return "which are multiplying the alternate broken infinity gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Crystals"
            },
            buy() {
                let base = new Decimal(400)
                let growth = 1.4
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.p.crystals = player.p.crystals.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.crystals, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.p.crystals = player.p.crystals.sub(cost)

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
            "Main": {
                buttonStyle() { return { 'color': '#31aeb0' } },
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
                buttonStyle() { return { 'color': 'white', 'border-color': "#31aeb0", 'background': '#98245c',} },
                unlocked() { return hasUpgrade("i", 23) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.p.crystals) + "</h3> crystals." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You will gain <h3>" + format(player.p.crystalsToGet) + "</h3> crystals on reset. (based on tier)"}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Crystals boosts ranks, tiers, tetr, and pent effect by <h3>^" + format(player.p.crystalEffect, 5) + "</h3>."}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 12]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"], 
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
                    ["row", [["buyable", 15], ["buyable", 16], ["buyable", 17], ["buyable", 18]]],
                ]
            },
        },
    }, 

    tabFormat: [
                        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
         ["raw-html", function () { return "You have <h3>" + format(player.p.prestigePoints) + "</h3> prestige points." }, { "color": "#31aeb0", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return player.points.gt(250000) ? "You will gain <h3>" + format(player.p.prestigePointsToGet) + "</h3> prestige points on reset." : ""}, { "color": "#31aeb0", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 14) }
})