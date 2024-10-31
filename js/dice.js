addLayer("d", {
    name: "Dice", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        dicePoints: new Decimal(0),
        dicePointsEffect: new Decimal(1),

        //dice
        dice: new Decimal(1),

        //player.d.diceRolls = [new Decimal(1)] 
        //player.d.dice = new Decimal(1)

        diceRolls: [new Decimal(1)],
        manualCooldown: new Decimal(1),
        diceCooldown: new Decimal(0),
        rollText: "",
        gainedDicePoints: new Decimal(1),
        gainedDicePointsDisplay: new Decimal(1),
        diceSides: new Decimal(6),
        diceCost: new Decimal(100),

        autoRollCooldown: new Decimal(0),
        autoRollTime: new Decimal(0),

        lowestRoll: new Decimal(1),

        //Booster
        currentBoosterText: "",
        currentBoosterRoll: new Decimal(-1),
        /*
        0 - Points
        1 - Factor Power
        2 - Prestige Points
        3 - Trees
        4 - Leaves
        5 - Grass Value
        6 - Grasshoppers
        7 - Fertilizer
        8 - Mods
        9 - Lines of Code
        10 - Code Experience
        */
        boosterDiceCooldown: new Decimal(0),

        diceEffects: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],

        addDiceEffect: new Decimal(0),
        dicePointsMult: new Decimal(1),


        //Challenge
        challengeDicePoints: new Decimal(0),
        challengeDicePointsEffect: new Decimal(1),
        challengeDicePointsToGet: new Decimal(1),

        boosterDiceStatsPerSecond: new Decimal(0),

        boosterDiceAutomation: false,
    }
    },
    automate() {
        if (hasUpgrade("d", 11) || hasUpgrade("tad", 13))
        {
            buyBuyable("d", 11)
            buyBuyable("d", 12)
            buyBuyable("d", 13)
            buyBuyable("d", 14)
            buyBuyable("d", 15)
        }
    },
    nodeStyle() {
        return {
            background: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(83,83,83,1) 100%)",
            "background-origin": "border-box",
            "border-color": "#0061ff",
        };
    },
    tooltip: "Dice",
    update(delta) {
        let onepersec = new Decimal(1)

        player.d.rollText = player.d.diceRolls.join(", ")

        player.d.diceCooldown = player.d.diceCooldown.sub(onepersec.mul(delta))

        player.d.gainedDicePoints = new Decimal(1)

        player.d.diceSides = new Decimal(6)
        player.d.diceSides = player.d.diceSides.add(buyableEffect("d", 12))
        player.d.diceSides = player.d.diceSides.add(buyableEffect("d", 22))

        player.d.dicePointsMult = new Decimal(1)
        player.d.dicePointsMult = player.d.dicePointsMult.mul(buyableEffect("d", 15))
        player.d.dicePointsMult = player.d.dicePointsMult.mul(player.cb.rarePetEffects[1][0])
        if (hasUpgrade("ip", 34) && !inChallenge("ip", 14)) player.d.dicePointsMult = player.d.dicePointsMult.mul(upgradeEffect("ip", 34))
        player.d.dicePointsMult = player.d.dicePointsMult.mul(player.d.challengeDicePointsEffect)
        if (hasUpgrade("d", 12)) player.d.dicePointsMult = player.d.dicePointsMult.mul(upgradeEffect("d", 12))
        if (hasUpgrade("d", 15)) player.d.dicePointsMult = player.d.dicePointsMult.mul(upgradeEffect("d", 15))
        if (hasUpgrade("d", 16)) player.d.dicePointsMult = player.d.dicePointsMult.mul(upgradeEffect("d", 16))
        player.d.dicePointsMult = player.d.dicePointsMult.mul(buyableEffect("cb", 11))
        player.d.dicePointsMult = player.d.dicePointsMult.mul(buyableEffect("ta", 41))
        player.d.dicePointsMult = player.d.dicePointsMult.mul(buyableEffect("ta", 42))
        player.d.dicePointsMult = player.d.dicePointsMult.mul(buyableEffect("ta", 43))

        if (player.d.autoRollCooldown.lt(0))
        {
            layers.d.diceRoll()
        }
        if (player.po.dice || inChallenge("ip", 15)) player.d.autoRollCooldown = player.d.autoRollCooldown.sub(onepersec.mul(delta))

        player.d.autoRollTime = buyableEffect("d", 13)
        player.d.lowestRoll = buyableEffect("d", 14)
        player.d.lowestRoll = player.d.lowestRoll.add(buyableEffect("d", 22))

        player.d.dicePointsEffect = player.d.dicePoints.plus(1).log10().mul(0.1).add(1)

        player.d.currentBoosterText = [
            "Currently boosting points.",
            "Currently boosting factor power.",
            "Currently boosting prestige points.",
            "Currently boosting trees.",
            "Currently boosting leaves.",
            "Currently boosting grass value.",
            "Currently boosting grasshoppers.",
            "Currently boosting fertilizer.",
            "Currently boosting mods.",
            "Currently boosting lines of code.",
            "Currently boosting code experience.",
            "Currently boosting infinity points.",
            "Currently boosting check back xp.",
            "Currently boosting rocket fuel.",
            "Currently boosting hex 1 points.",
        ]

        player.d.boosterDiceCooldown = player.d.boosterDiceCooldown.sub(onepersec.mul(delta))

        player.d.diceCost = Decimal.pow(player.d.dice.add(1), 8)
        if (player.d.dice > 6) player.d.diceCost = Decimal.pow(player.d.dice.add(1), 18).div(20)
        if (player.d.dice > 12) player.d.diceCost = Decimal.pow(30, player.d.dice.pow(2)).div(10)

        if (player.d.boosterDiceCooldown.lt(0) && (inChallenge("ip", 15) || player.d.boosterDiceAutomation))
        {
            if (inChallenge("ip", 15))
            {
                player.in.infinityPause = new Decimal(5)
            }
            if (!hasChallenge("ip", 15)) player.d.currentBoosterRoll = getRandomInt(11)
            if (hasChallenge("ip", 15)) player.d.currentBoosterRoll = getRandomInt(15)
            player.d.boosterDiceCooldown = new Decimal(120)


            if (inChallenge("ip", 15) || player.ev.evolutionsUnlocked[5]) player.d.challengeDicePoints = player.d.challengeDicePoints.add(player.d.challengeDicePointsToGet)
        }

        player.d.challengeDicePointsToGet = player.d.dicePoints.pow(0.2).div(3)
        player.d.challengeDicePointsToGet = player.d.challengeDicePointsToGet.mul(buyableEffect("d", 24))
        player.d.challengeDicePointsToGet = player.d.challengeDicePointsToGet.mul(buyableEffect("g", 28))
        player.d.challengeDicePointsEffect = player.d.challengeDicePoints.pow(0.75).add(1)

        if (hasUpgrade("i", 29)) player.d.challengeDicePoints = player.d.challengeDicePoints.add(player.d.challengeDicePointsToGet.mul(0.05).mul(delta))

        player.d.boosterDiceStatsPerSecond = buyableEffect("d", 21)
        for (let i = 0; i < 11; i++)
        {
            player.d.diceEffects[i] = player.d.diceEffects[i].add(player.d.boosterDiceStatsPerSecond.mul(delta))
        }

        player.d.manualCooldown = new Decimal(1)
        player.d.manualCooldown = player.d.manualCooldown.div(buyableEffect("d", 23))

        if (player.d.diceEffects[12].gt(100)) player.d.diceEffects[12] = new Decimal(100)

        if (player.d.buyables[14].gt(player.d.diceSides.sub(player.d.buyables[22].mul(2))))
        {
            player.d.buyables[14] = player.d.diceSides.sub(player.d.buyables[22].mul(2))
        }
    },
    diceRoll()
    {
        let max = new Decimal(1)
        for (let i = 0; i < player.d.diceRolls.length; i++)
        {
            player.d.diceRolls[i] = Decimal.add(getRandomInt(player.d.diceSides.sub(player.d.lowestRoll)), player.d.lowestRoll)
            player.d.gainedDicePoints = player.d.gainedDicePoints.mul(player.d.diceRolls[i])
            max = max.mul(player.d.diceSides)
        }
        if (player.d.gainedDicePoints.gt(max))
        {
            player.d.gainedDicePoints = max
        }
        player.d.gainedDicePoints = player.d.gainedDicePoints.mul(player.d.dicePointsMult)
        player.d.gainedDicePointsDisplay = player.d.gainedDicePoints
        player.d.dicePoints = player.d.dicePoints.add(player.d.gainedDicePoints)

        player.d.autoRollCooldown = player.d.autoRollTime
        player.d.diceCooldown = player.d.manualCooldown
        layers.d.addDiceEffect()
    },
    branches: ["cb"],
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
            title() { return "Turn booster dice automation on. (Currently off)" },
            tooltip() { return "<h3>You won't gain any pets from automation." },
            canClick() { return true },
            unlocked() { return hasChallenge("ip", 15) && !player.d.boosterDiceAutomation},
            onClick() { 
                player.d.boosterDiceAutomation = true
            },
            style: {
                width: '200px',
                "min-height": '75px',
            },
        },
        3: {
            title() { return "Turn booster dice automation off. (Currently on)" },
            canClick() { return true },
            tooltip() { return "<h3>You won't gain any pets from automation." },
            unlocked() { return hasChallenge("ip", 15) && player.d.boosterDiceAutomation},
            onClick() { 
                player.d.boosterDiceAutomation = false
            },
            style: {
                width: '200px',
                "min-height": '75px',
            },
        },
        11: {
            title() { return player.d.diceCooldown.gt(0) ? formatTime(player.d.diceCooldown) : "<h2>Roll!"},
            display() { return "Autoroll: " + formatTime(player.d.autoRollCooldown) },
            canClick() { return player.d.diceCooldown.lt(0) },
            unlocked() { return true },
            onClick() {
                layers.d.diceRoll();
            },
            style: { width: '100px', "min-height": '100px' },
        },
        12: {
            title() { return player.d.boosterDiceCooldown.gt(0) ? formatTime(player.d.boosterDiceCooldown) : "<h2>Roll to change currency boost!"},
            canClick() { return player.d.boosterDiceCooldown.lt(0) },
            tooltip() { return "<h3>5% chance for a pet???" },
            unlocked() { return true },
            onClick() {
                if (!hasChallenge("ip", 15)) player.d.currentBoosterRoll = getRandomInt(11)
                if (hasChallenge("ip", 15)) player.d.currentBoosterRoll = getRandomInt(15)
                player.d.boosterDiceCooldown = new Decimal(120)

                let random = getRandomInt(20)

                if (random == 1)
                {
                    player.cb.rarePetAmounts[1] = player.cb.rarePetAmounts[1].add(1);
                    callAlert("You gained a Dice!", "resources/diceRarePet.png");
                }

                if (inChallenge("ip", 15))
                {
                    player.in.infinityPause = new Decimal(5)
                }
                
                if (player.ev.evolutionsUnlocked[5]) player.d.challengeDicePoints = player.d.challengeDicePoints.add(player.d.challengeDicePointsToGet)
            },
            style: { width: '200px', "min-height": '100px' },
        },
        /*
        0 - Points
        1 - Factor Power
        2 - Prestige Points
        3 - Trees
        4 - Leaves
        5 - Grass Value
        6 - Grasshoppers
        7 - Fertilizer
        8 - Mods
        9 - Lines of Code
        10 - Code Experience
        */
        13: {
            title() { return "<h3>View Effects"},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (!hasChallenge("ip", 15))
                {
                    callAlert("Points: x" + format(player.d.diceEffects[0]) + "\n" + 
                    "Factor Power: x" + format(player.d.diceEffects[1]) + "\n" +
                    "Prestige Points: x" + format(player.d.diceEffects[2]) + "\n" +
                    "Trees: x" + format(player.d.diceEffects[3]) + "\n" +
                    "Leaves: x" + format(player.d.diceEffects[4]) + "\n" +
                    "Grass Value: x" + format(player.d.diceEffects[5]) + "\n" +
                    "Grasshoppers: x" + format(player.d.diceEffects[6]) + "\n" +
                    "Fertilizer: x" + format(player.d.diceEffects[7]) + "\n" +
                    "Mods: x" + format(player.d.diceEffects[8]) + "\n" +
                    "Lines of Code: x" + format(player.d.diceEffects[9]) + "\n" +
                    "Code Experience: x" + format(player.d.diceEffects[10]) + "\n"
                    )
                } else 
                {
                    callAlert("Points: x" + format(player.d.diceEffects[0]) + "\n" + 
                    "Factor Power: x" + format(player.d.diceEffects[1]) + "\n" +
                    "Prestige Points: x" + format(player.d.diceEffects[2]) + "\n" +
                    "Trees: x" + format(player.d.diceEffects[3]) + "\n" +
                    "Leaves: x" + format(player.d.diceEffects[4]) + "\n" +
                    "Grass Value: x" + format(player.d.diceEffects[5]) + "\n" +
                    "Grasshoppers: x" + format(player.d.diceEffects[6]) + "\n" +
                    "Fertilizer: x" + format(player.d.diceEffects[7]) + "\n" +
                    "Mods: x" + format(player.d.diceEffects[8]) + "\n" +
                    "Lines of Code: x" + format(player.d.diceEffects[9]) + "\n" +
                    "Code Experience: x" + format(player.d.diceEffects[10]) + "\n" +
                    "Infinity Points: x" + format(player.d.diceEffects[11]) + "\n" +
                    "Check Back XP: x" + format(player.d.diceEffects[12]) + "\n" + 
                    "Rocket Fuel: x" + format(player.d.diceEffects[13]) + "\n" +
                    "Hex 1 Points: x" + format(player.d.diceEffects[14]) + "\n"
                    )
                }
            },
            style: { width: '100px', "min-height": '100px' },
        },
    },
    addDiceEffect()
    {
        let sum = new Decimal(0)
        for (let i = 0; i < player.d.diceRolls.length; i++)
        {
            sum = sum.add(player.d.diceRolls[i])
        }

        if (player.d.currentBoosterRoll == 0)
        {
                player.d.addDiceEffect = sum.mul(0.0025).pow(1.1)
                player.d.diceEffects[0] = player.d.diceEffects[0].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll  == 1) {
                player.d.addDiceEffect = sum.mul(0.002).pow(0.95)
                player.d.diceEffects[1] = player.d.diceEffects[1].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 2) {
                player.d.addDiceEffect = sum.mul(0.0016).pow(0.92)
                player.d.diceEffects[2] = player.d.diceEffects[2].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 3) {
                player.d.addDiceEffect = sum.mul(0.0008).pow(0.8)
                player.d.diceEffects[3] = player.d.diceEffects[3].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 4) {
                player.d.addDiceEffect = sum.mul(0.0012).pow(0.8)
                player.d.diceEffects[4] = player.d.diceEffects[4].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 5) {
                player.d.addDiceEffect = sum.mul(0.0008).pow(0.75)
                player.d.diceEffects[5] = player.d.diceEffects[5].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 6) {
                player.d.addDiceEffect = sum.mul(0.0007).pow(0.7)
                player.d.diceEffects[6] = player.d.diceEffects[6].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 7) {
                player.d.addDiceEffect = sum.mul(0.0008).pow(0.7)
                player.d.diceEffects[7] = player.d.diceEffects[7].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 8) {
                player.d.addDiceEffect = sum.mul(0.0005).pow(0.7)
                player.d.diceEffects[8] = player.d.diceEffects[8].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 9) {
                player.d.addDiceEffect = sum.mul(0.0007).pow(0.7)
                player.d.diceEffects[9] = player.d.diceEffects[9].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 10) {
                player.d.addDiceEffect = sum.mul(0.0006).pow(0.7)
                player.d.diceEffects[10] = player.d.diceEffects[10].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 11) {
            player.d.addDiceEffect = sum.pow(0.1).mul(0.0003)
            player.d.diceEffects[11] = player.d.diceEffects[11].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 12) {
            player.d.addDiceEffect = sum.pow(0.1).mul(0.0001).div(player.d.diceEffects[12].pow(5))
            player.d.diceEffects[12] = player.d.diceEffects[12].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 13) {
            player.d.addDiceEffect = sum.mul(0.00001)
            player.d.diceEffects[13] = player.d.diceEffects[13].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 14) {
            player.d.addDiceEffect = sum.mul(0.00005)
            player.d.diceEffects[14] = player.d.diceEffects[14].add(player.d.addDiceEffect)
        }
    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: "Autobuy!!?! Hehehe haha",
            unlocked() { return true },
            description: "Autobuys them dice point buyables!",
            cost: new Decimal(1e7),
            currencyLocation() { return player.d },
            currencyDisplayName: "Challenge Dice Points",
            currencyInternalName: "challengeDicePoints",
        }, 
        12:
        {
            title: "Something boosts dice outside of this layer!?",
            unlocked() { return true },
            description: "You want something to help? Points boost dice point gain!",
            cost: new Decimal(4e8),
            currencyLocation() { return player.d },
            currencyDisplayName: "Challenge Dice Points",
            currencyInternalName: "challengeDicePoints",
            effect() {
                return player.points.plus(1).log10().pow(3).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '200px', height: '100px', }
        }, 
        13:
        {
            title: "Pointy boost.",
            unlocked() { return true },
            description: "Dice point boost pointies.",
            cost: new Decimal(1e10),
            currencyLocation() { return player.d },
            currencyDisplayName: "Challenge Dice Points",
            currencyInternalName: "challengeDicePoints",
            effect() {
                return player.d.dicePoints.pow(0.15).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        14:
        {
            title: "Grassy boost.",
            unlocked() { return true },
            description: "Dice points boost them grasshoppers.",
            cost: new Decimal(1e12),
            currencyLocation() { return player.d },
            currencyDisplayName: "Challenge Dice Points",
            currencyInternalName: "challengeDicePoints",
            effect() {
                return player.d.dicePoints.pow(0.085).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        15:
        {
            title: "Reversey Boost.",
            unlocked() { return true },
            description: "Ur check back level boosts dice points.",
            cost: new Decimal(1e13),
            currencyLocation() { return player.d },
            currencyDisplayName: "Challenge Dice Points",
            currencyInternalName: "challengeDicePoints",
            effect() {
                return player.cb.level.pow(1.87654321).mul(15).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        }, 
        16:
        {
            title: "Self Synergize.",
            unlocked() { return true },
            description: "Ur dice points boost itself.",
            cost: new Decimal(1e14),
            currencyLocation() { return player.d },
            currencyDisplayName: "Challenge Dice Points",
            currencyInternalName: "challengeDicePoints",
            effect() {
                return player.d.dicePoints.pow(0.125).div(100).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        17:
        {
            title: "Challengey Prestigey Pointy Boosty.",
            unlocked() { return true },
            description: "Challenge dice points boosts them prestige points and points.",
            cost: new Decimal(1e16),
            currencyLocation() { return player.d },
            currencyDisplayName: "Challenge Dice Points",
            currencyInternalName: "challengeDicePoints",
            effect() {
                return player.d.challengeDicePoints.pow(0.4).mul(1000).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '100px', }
        }, 
    },
    buyables: {
        11: {
            cost(x) { return player.d.diceCost },
            unlocked() { return true },
            canAfford() { return player.d.dicePoints.gte(this.cost()) && player.d.buyables[11].lt(100)},
            title() {
                return "You have " + format(player.d.dice, 0) + "/100 dice."
            },
            display() {
                return "Buys another dice.\n\
                    Req: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Points"
            },
            buy() {
                let buyonecost = player.d.diceCost
                player.d.dice = player.d.dice.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.d.diceRolls.push(
                    new Decimal(1)
                )
            },
            style: { width: '175px', height: '100px', }
        },
        12: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(250) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            canAfford() { return player.d.dicePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Dice Side Boost"
            },
            display() {
                return "which are increasing sides on dice by +" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Points"
            },
            buy() {
                let base = new Decimal(250)
                let growth = 2
                if (player.buyMax == false && !hasUpgrade("d", 11) && !hasUpgrade("tad", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("d", 11)) player.d.dicePoints = player.d.dicePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.d.dicePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("d", 11)) player.d.dicePoints = player.d.dicePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '175px', height: '100px', }
        },
        13: {
            cost(x) { return new Decimal(4).pow(x || getBuyableAmount(this.layer, this.id)).mul(500) },
            effect(x) { return new Decimal(5).div(getBuyableAmount(this.layer, this.id).mul(0.02).add(1)) },
            unlocked() { return true },
            canAfford() { return player.d.dicePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Autoroll"
            },
            display() {
                return "Automatically rolls the dice every " + format(tmp[this.layer].buyables[this.id].effect) + " seconds.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Points"
            },
            buy() {
                let base = new Decimal(500)
                let growth = 4
                if (player.buyMax == false && !hasUpgrade("d", 11) && !hasUpgrade("tad", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("d", 11) && !hasUpgrade("tad", 12)) player.d.dicePoints = player.d.dicePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.d.dicePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("d", 11) && !hasUpgrade("tad", 12)) player.d.dicePoints = player.d.dicePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '175px', height: '100px', }
        },
        14: {
            cost(x) { return new Decimal(2.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(1000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1) },
            unlocked() { return true },
            canAfford() { return player.d.dicePoints.gte(this.cost()) && player.d.buyables[14].lt(player.d.diceSides.sub(player.d.buyables[22].mul(2)))},
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/" + formatWhole(player.d.diceSides.sub(player.d.buyables[22].mul(2))) + "<br/>Low Roll Removal"
            },
            display() {
                return "which are removing " + formatWhole(tmp[this.layer].buyables[this.id].effect) + " of the lowest rolls.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Points"
            },
            buy() {
                let base = new Decimal(1000)
                let growth = 2.5
                if (player.buyMax == false && !hasUpgrade("d", 11) && !hasUpgrade("tad", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("d", 11) && !hasUpgrade("tad", 12)) player.d.dicePoints = player.d.dicePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.d.dicePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("d", 11) && !hasUpgrade("tad", 12)) player.d.dicePoints = player.d.dicePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '175px', height: '100px', }
        },
        15: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(6000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.d.dicePoints.gte(this.cost())},
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>DP Multiplier"
            },
            display() {
                return "which are boosting dice points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Points"
            },
            buy() {
                let base = new Decimal(6000)
                let growth = 2
                if (player.buyMax == false && !hasUpgrade("d", 11) && !hasUpgrade("tad", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("d", 11) && !hasUpgrade("tad", 12)) player.d.dicePoints = player.d.dicePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.d.dicePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("d", 11) && !hasUpgrade("tad", 12)) player.d.dicePoints = player.d.dicePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '175px', height: '100px', }
        },

        //challenge dice
        21: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05) },
            unlocked() { return true },
            canAfford() { return player.d.challengeDicePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Booster Dice Producer!"
            },
            display() {
                return "which are producing +" + format(tmp[this.layer].buyables[this.id].effect) + " of all booster dice effects per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Challenge Dice Points"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.5
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.d.challengeDicePoints = player.d.challengeDicePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.d.challengeDicePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.d.challengeDicePoints = player.d.challengeDicePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        22: {
            cost(x) { return new Decimal(2.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(1000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(2) },
            unlocked() { return true },
            canAfford() { return player.d.challengeDicePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Multipurpose Dice Upgade Thing!"
            },
            display() {
                return "which are increasing sides and removing lowest rolls by +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Challenge Dice Points"
            },
            buy() {
                let base = new Decimal(1000)
                let growth = 2.5
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.d.challengeDicePoints = player.d.challengeDicePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.d.challengeDicePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.d.challengeDicePoints = player.d.challengeDicePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        23: {
            cost(x) { return new Decimal(10).pow(x || getBuyableAmount(this.layer, this.id)).mul(100000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.d.challengeDicePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Manual Dice Cooldown!"
            },
            display() {
                return "which are dividing the manual dice cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Challenge Dice Points"
            },
            buy() {
                let base = new Decimal(100000)
                let growth = 10
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.d.challengeDicePoints = player.d.challengeDicePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.d.challengeDicePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.d.challengeDicePoints = player.d.challengeDicePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        24: {
            cost(x) { return new Decimal(1.8).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e7) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.4).add(1).pow(1.35) },
            unlocked() { return true },
            canAfford() { return player.d.challengeDicePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Challenge Dice Boosty!!! :D"
            },
            display() {
                return "which are boosting challenge dice points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Challenge Dice Points"
            },
            buy() {
                let base = new Decimal(1e7)
                let growth = 1.8
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.d.challengeDicePoints = player.d.challengeDicePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.d.challengeDicePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.d.challengeDicePoints = player.d.challengeDicePoints.sub(cost)

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
            "Dice": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["clickable", 11]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You are rolling a " + formatWhole(player.d.diceSides) + ' sided dice.'}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Current rolls: " + player.d.rollText + '.'}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "+" + formatWhole(player.d.gainedDicePointsDisplay) + ' DP.'}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["buyable", 12], ["buyable", 13], ["buyable", 14], ["buyable", 15]]],
    ]

            },
            "Booster Dice": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return player.d.currentBoosterRoll != 12 ? player.d.currentBoosterText[player.d.currentBoosterRoll] + " (Currently x" + format(player.d.diceEffects[player.d.currentBoosterRoll]) + ")" : player.d.currentBoosterText[player.d.currentBoosterRoll] + " (Currently x" + format(player.d.diceEffects[player.d.currentBoosterRoll]) + ") (MAX IS x10)"  }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 12], ["clickable", 13]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["raw-html", function () { return "Current rolls: " + player.d.rollText + '.'}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "+" + format(player.d.addDiceEffect) + 'x to the effect.'}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return hasChallenge("ip", 15) ? "Some effects are kept on infinity." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                ]

            },
            "Challenge Dice": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return inChallenge("ip", 15) || player.ev.evolutionsUnlocked[5]},
                content:
                [
        ["blank", "25px"],
        ["raw-html", function () { return "You have <h3>" + format(player.d.challengeDicePoints) + "</h3> challenge dice points, which boost dice point gain by x" + format(player.d.challengeDicePointsEffect) + "." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You will gain <h3>" + format(player.d.challengeDicePointsToGet) + "</h3> challenge dice points next booster dice roll." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["row", [["buyable", 21], ["buyable", 22], ["buyable", 23], ["buyable", 24]]],
        ["blank", "25px"],
        ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16], ["upgrade", 17]]],
    ]

            },
            "Challenge Debuffs": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return inChallenge("ip", 15) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Challenge V Debuffs:" }, { "color": "white", "font-size": "36px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "^0.9 Point Gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "^0.85 Grasshopper Gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "^0.65 Code Experience Gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "^0.65 Prestige Point Gain." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]

            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "12px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.d.dicePoints) + "</h3> dice points, which boost check back effect by ^" + format(player.d.dicePointsEffect) + ". (based on dice points)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && (player.po.dice == true || inChallenge("ip", 15))}
})
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

// call me a gambler the way i roll dice
