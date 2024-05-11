addLayer("g", {
    name: "Grass", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        inGrassTab: false,
        grass: new Decimal(0),
        savedGrass: new Decimal(0),
        grassEffect: new Decimal(1),
        grassCap: new Decimal(100),
        grassCount: new Decimal(0),
        grassVal: new Decimal(1),
        grassReq: new Decimal(4),
        grassTimer: new Decimal(0),

        inGoldGrassTab: false,
        goldGrass: new Decimal(0),
        savedGoldGrass: new Decimal(0),
        goldGrassEffect: new Decimal(1),
        goldGrassCap: new Decimal(15),
        goldGrassCount: new Decimal(0),
        goldGrassVal: new Decimal(1),
        goldGrassReq: new Decimal(40),
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
        let onepersec = new Decimal(1)

        if (player.subtabs["g"]['stuff'] == 'Grass' && player.tab == "g" && player.g.inGrassTab == false)
        {
           layers.g.loadGrass();
        }
        if (player.subtabs["g"]['stuff'] == 'Grass' && player.tab == "g" && player.g.inGoldGrassTab == true)
        {
           layers.g.loadGrass();
        }
        if (!(player.subtabs["g"]['stuff'] == 'Grass') && !(player.tab == "g") && player.g.inGrassTab == true)
        {
           layers.g.unloadGrass();
        }
        if (player.subtabs["g"]['stuff'] == 'Grass' && player.tab == "g")
        {
            player.g.inGrassTab = true
            if (player.g.grassCount < player.g.grassCap) player.g.grassTimer = player.g.grassTimer.add(onepersec.mul(delta))
            if (player.g.grassTimer.gt(player.g.grassReq) && player.g.grassCount < player.g.grassCap)
            {
                createGrass(1);
                player.g.savedGrass++;
                player.g.grassTimer = new Decimal(0)
            }
        } else if (!(player.subtabs["g"]['stuff'] == 'Golden Grass' && player.tab == "g"))
        {
            player.g.inGrassTab = false
            if (player.g.grassCount < player.g.grassCap) player.g.grassTimer = player.g.grassTimer.add(onepersec.mul(delta))
            if (player.g.grassTimer.gt(player.g.grassReq) && player.g.savedGrass < player.g.grassCap)
            {
                player.g.savedGrass++;
                player.g.grassTimer = new Decimal(0)
            } else if (player.g.savedGrass > player.g.grassCap) {
                player.g.savedGrass = player.g.grassCap
            }
        } else
        {
            player.g.inGrassTab = false
            if (player.g.grassCount < player.g.grassCap) player.g.grassTimer = player.g.grassTimer.add(onepersec.mul(delta))
        }
        if (player.g.grassCount < 0)
        {
            player.g.grassCount = new Decimal(0)
        }

        player.g.grassEffect = player.g.grass.mul(0.3).pow(0.7).add(1)

        player.g.grass = player.g.grass.add(player.g.grassVal.mul(buyableEffect("gh", 11).mul(delta)))
        if (hasUpgrade("rf", 12)) player.g.grass = player.g.grass.add(player.g.grassVal.mul(Decimal.mul(0.2, delta)))
        if (hasMilestone("ip", 13) && !inChallenge("ip", 14)) player.g.grass = player.g.grass.add(player.g.grassVal.mul(Decimal.mul(0.05, delta)))

        player.g.grassVal = new Decimal(1)
        player.g.grassVal = player.g.grassVal.mul(buyableEffect("g", 11))
        if (hasUpgrade("g", 11)) player.g.grassVal = player.g.grassVal.mul(upgradeEffect("g", 11))
        player.g.grassVal = player.g.grassVal.mul(player.g.goldGrassEffect)
        player.g.grassVal = player.g.grassVal.mul(buyableEffect("t", 17))
        player.g.grassVal = player.g.grassVal.mul(player.gh.grasshopperEffects[4])
        player.g.grassVal = player.g.grassVal.mul(player.gh.fertilizerEffect)
        player.g.grassVal = player.g.grassVal.mul(buyableEffect("f", 1))
        player.g.grassVal = player.g.grassVal.mul(buyableEffect("f", 2))
        player.g.grassVal = player.g.grassVal.mul(buyableEffect("f", 3))
        player.g.grassVal = player.g.grassVal.mul(buyableEffect("f", 4))
        player.g.grassVal = player.g.grassVal.mul(buyableEffect("f", 5))
        player.g.grassVal = player.g.grassVal.mul(buyableEffect("f", 6))
        player.g.grassVal = player.g.grassVal.mul(buyableEffect("f", 7))
        player.g.grassVal = player.g.grassVal.mul(buyableEffect("f", 8))
        player.g.grassVal = player.g.grassVal.mul(player.cb.commonPetEffects[3][0])
        player.g.grassVal = player.g.grassVal.mul(player.d.diceEffects[5])
        player.g.grassVal = player.g.grassVal.mul(player.rf.abilityEffects[2])
        if (hasUpgrade("ad", 14)) player.g.grassVal = player.g.grassVal.mul(upgradeEffect("ad", 14))
        player.g.grassVal = player.g.grassVal.div(player.pe.pestEffect[4])
        if (inChallenge("ip", 13)) player.g.grassVal = player.g.grassVal.pow(0.75)
        if (inChallenge("ip", 13) || player.po.hex) player.g.grassVal = player.g.grassVal.mul(buyableEffect("h", 14))
        if (player.de.antidebuffIndex.eq(2)) player.g.grassVal = player.g.grassVal.mul(player.de.antidebuffEffect)

        if (inChallenge("ip", 18) && player.g.grass.gt(1))
        {
            player.g.grass = player.g.grass.sub(player.g.grass.mul(0.4 * delta))
        }

        player.g.grassReq = new Decimal(4) 
        player.g.grassReq = player.g.grassReq.div(buyableEffect("g", 12))

        player.g.grassCap = new Decimal(100) 
        player.g.grassCap = player.g.grassCap.add(buyableEffect("g", 13))
        if (hasUpgrade("g", 18)) player.g.grassCap = player.g.grassCap.add(150)
        if (hasUpgrade("g", 19)) player.g.grassCap = player.g.grassCap.add(upgradeEffect("g", 19))

        player.g.goldGrassVal = new Decimal(1)
        player.g.goldGrassVal = player.g.goldGrassVal.mul(buyableEffect("g", 17))
        player.g.goldGrassVal = player.g.goldGrassVal.mul(buyableEffect("t", 18))
        player.g.goldGrassVal = player.g.goldGrassVal.mul(buyableEffect("m", 13))
        player.g.goldGrassVal = player.g.goldGrassVal.mul(player.cb.commonPetEffects[3][1])
        if (hasUpgrade("ip", 24) && !inChallenge("ip", 14)) player.g.goldGrassVal = player.g.goldGrassVal.add(upgradeEffect("ip", 24))
        player.g.goldGrassVal = player.g.goldGrassVal.mul(player.cb.rarePetEffects[4][1])

        player.g.goldGrass = player.g.goldGrass.add(player.g.goldGrassVal.mul(buyableEffect("gh", 18).mul(delta)))

        player.g.goldGrassReq = new Decimal(40) 
        if (hasUpgrade("g", 16)) player.g.goldGrassReq = player.g.goldGrassReq.div(1.3)
        player.g.goldGrassReq = player.g.goldGrassReq.div(buyableEffect("gh", 12))
        player.g.goldGrassReq = player.g.goldGrassReq.div(player.cb.rarePetEffects[2][1])

        player.g.goldGrassCap = new Decimal(15) 
        player.g.goldGrassCap = player.g.goldGrassCap.add(buyableEffect("g", 18))
        if (hasUpgrade("g", 18)) player.g.goldGrassCap = player.g.goldGrassCap.add(6)

        if (hasUpgrade("g", 13))
        {
            if (player.subtabs["g"]['stuff'] == 'Golden Grass' && player.tab == "g" && player.g.inGoldGrassTab == false)
            {
                layers.g.loadGoldGrass();
            }
            if (player.subtabs["g"]['stuff'] == 'Grass' && player.tab == "g" && player.g.inGrassTab == true)
            {
                layers.g.loadGoldGrass();
            }
            if (!(player.subtabs["g"]['stuff'] == 'Golden Grass') && !(player.tab == "g") && player.g.inGoldGrassTab == true)
            {
                layers.g.unloadGoldGrass();
            }
            if (player.subtabs["g"]['stuff'] == 'Golden Grass' && player.tab == "g")
            {
                player.g.inGoldGrassTab = true
                if (player.g.goldGrassCount < player.g.goldGrassCap) player.g.goldGrassTimer = player.g.goldGrassTimer.add(onepersec.mul(delta))
                if (player.g.goldGrassTimer.gt(player.g.goldGrassReq) && player.g.goldGrassCount < player.g.goldGrassCap)
                {
                    createGoldenGrass(1);
                    player.g.savedGoldGrass++;
                    player.g.goldGrassTimer = new Decimal(0)
                }
            } else if (!(player.subtabs["g"]['stuff'] == 'Grass' && player.tab == "g"))
            {
                player.g.inGoldGrassTab = false
                removeAllGoldGrass();
                if (player.g.goldGrassCount < player.g.goldGrassCap) player.g.goldGrassTimer = player.g.goldGrassTimer.add(onepersec.mul(delta))
                if (player.g.goldGrassTimer.gt(player.g.goldGrassReq) && player.g.savedGoldGrass < player.g.goldGrassCap)
                {
                    player.g.savedGoldGrass++;
                    player.g.goldGrassTimer = new Decimal(0)
                }
            } else
            {
                player.g.inGoldGrassTab = false
                if (player.g.goldGrassCount < player.g.goldGrassCap) player.g.goldGrassTimer = player.g.goldGrassTimer.add(onepersec.mul(delta))
            }
            if (player.g.goldGrassCount < 0)
            {
                player.g.goldGrassCount = new Decimal(0)
            }
        }

        player.g.goldGrassEffect = player.g.goldGrass.pow(0.7).mul(0.15).add(1)

        if (player.g.buyables[12].gt(200))
        {
            player.g.buyables[12] = new Decimal(200)
        }
    },
    unloadGrass()
    {
        player.g.grassTimer = new Decimal(0)
        player.g.grassCount = new Decimal(0)
    },
    loadGrass()
    {
        removeAllGrass();
        createGrass(player.g.savedGrass);
        player.g.grassCount = player.g.savedGrass
    },
    unloadGoldGrass()
    {
        player.g.goldGrassTimer = new Decimal(0)
        player.g.goldGrassCount = new Decimal(0)
    },
    loadGoldGrass()
    {
        createGoldenGrass(player.g.savedGoldGrass);
        player.g.goldGrassCount = player.g.savedGoldGrass
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
                    ["row", [["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 21]]],
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

function createGrass(quantity) {
    const spawnArea = document.getElementById('spawn-area');
    const spawnAreaRect = spawnArea?.getBoundingClientRect();

    if (!spawnAreaRect) return; // Exit if spawnAreaRect is null or undefined

    for (let i = 0; i < quantity; i++) {
        let randomX, randomY;
        do {
            randomX = Math.floor(Math.random() * (spawnAreaRect.width - 20)); // Adjusted to ensure squares spawn within the horizontal range
            randomY = Math.floor(Math.random() * (spawnAreaRect.height - 20)); // Adjusted to ensure squares spawn within the vertical range
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

        spawnArea.appendChild(greenSquare); // Append to spawnArea instead of document.bodys
        
        // Add event listener to remove grass square on hover
        greenSquare.addEventListener('mouseover', () => {
            removeGrass(greenSquare);
            player.g.grassCount--; // Decrease grass count
            player.g.savedGrass--; // Decrease grass count
            player.g.grass = player.g.grass.add(player.g.grassVal)
        });
        
        player.g.grassCount++; // Increase grass count
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


function createGoldenGrass(quantity) {
    const spawnArea = document.getElementById('gold-spawn-area');
    const spawnAreaRect = spawnArea?.getBoundingClientRect();

    if (!spawnAreaRect) return; // Exit if spawnAreaRect is null or undefined

    for (let i = 0; i < quantity; i++) {
        let randomX, randomY;
        do {
            randomX = Math.floor(Math.random() * (spawnAreaRect.width - 20)); // Adjusted to ensure squares spawn within the horizontal range
            randomY = Math.floor(Math.random() * (spawnAreaRect.height - 20)); // Adjusted to ensure squares spawn within the vertical range
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

        spawnArea.appendChild(goldSquare); // Append to spawnArea instead of document.bodys
        
        // Add event listener to remove grass square on hover
        goldSquare.addEventListener('mouseover', () => {
            removeGrass(goldSquare);
            player.g.goldGrassCount--; // Decrease grass count
            player.g.savedGoldGrass--; // Decrease grass count
            player.g.goldGrass = player.g.goldGrass.add(player.g.goldGrassVal)
        });
        
        player.g.goldGrassCount++; // Increase grass count
    }
}
