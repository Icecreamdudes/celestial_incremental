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
        diceCooldown: new Decimal(0),
        rollText: "",
        gainedDicePoints: new Decimal(1),
        gainedDicePointsDisplay: new Decimal(1),
        diceSides: new Decimal(6),

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

        diceEffects: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],

        addDiceEffect: new Decimal(0),
        dicePointsMult: new Decimal(1),
    }
    },
    automate() {
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

        player.d.dicePointsMult = new Decimal(1)
        player.d.dicePointsMult = player.d.dicePointsMult.mul(buyableEffect("d", 15))

        if (player.d.autoRollCooldown.lt(0))
        {
            let max = new Decimal(0)
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
            layers.d.addDiceEffect()
        }
        player.d.autoRollCooldown = player.d.autoRollCooldown.sub(onepersec.mul(delta))

        player.d.autoRollTime = buyableEffect("d", 13)
        player.d.lowestRoll = buyableEffect("d", 14)

        player.d.dicePointsEffect = player.d.dicePoints.log10().mul(0.1).add(1)

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
            "Currently boosting check back xp.",
        ]

        player.d.boosterDiceCooldown = player.d.boosterDiceCooldown.sub(onepersec.mul(delta))
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
        11: {
            title() { return player.d.diceCooldown.gt(0) ? formatTime(player.d.diceCooldown) : "<h2>Roll!"},
            display() { return "Autoroll: " + formatTime(player.d.autoRollCooldown) },
            canClick() { return player.d.diceCooldown.lt(0) },
            unlocked() { return true },
            onClick() {
                for (let i = 0; i < player.d.diceRolls.length; i++)
                {
                    player.d.diceRolls[i] = Decimal.add(getRandomInt(player.d.diceSides.sub(player.d.lowestRoll)), player.d.lowestRoll)
                    player.d.gainedDicePoints = player.d.gainedDicePoints.mul(player.d.diceRolls[i])
                }
            player.d.gainedDicePoints = player.d.gainedDicePoints.mul(player.d.dicePointsMult)
            player.d.gainedDicePointsDisplay = player.d.gainedDicePoints
                player.d.dicePoints = player.d.dicePoints.add(player.d.gainedDicePoints)
                player.d.diceCooldown = new Decimal(1)
                layers.d.addDiceEffect()
            },
            style: { width: '100px', "min-height": '100px' },
        },
        12: {
            title() { return player.d.boosterDiceCooldown.gt(0) ? formatTime(player.d.boosterDiceCooldown) : "<h2>Roll to change currency boost!"},
            canClick() { return player.d.boosterDiceCooldown.lt(0) },
            unlocked() { return true },
            onClick() {
                player.d.currentBoosterRoll = getRandomInt(player.d.diceEffects.length)
                player.d.boosterDiceCooldown = new Decimal(120)
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

        }
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(100).pow(x || getBuyableAmount(this.layer, this.id)).mul(100) },
            unlocked() { return true },
            canAfford() { return player.d.dicePoints.gte(this.cost()) && player.d.buyables[11].lt(100)},
            title() {
                return "You have " + format(player.d.dice, 0) + "/100 dice."
            },
            display() {
                return "Buys another dice.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Points"
            },
            buy() {
                let base = new Decimal(100)
                let growth = 100
                let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
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
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.d.dicePoints = player.d.dicePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.d.dicePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.d.dicePoints = player.d.dicePoints.sub(cost)

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
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.d.dicePoints = player.d.dicePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.d.dicePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.d.dicePoints = player.d.dicePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '175px', height: '100px', }
        },
        14: {
            cost(x) { return new Decimal(2.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(1000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1) },
            unlocked() { return true },
            canAfford() { return player.d.dicePoints.gte(this.cost()) && player.d.buyables[14].lt(player.d.diceSides)},
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/" + formatWhole(player.d.diceSides) + "<br/>Low Roll Removal"
            },
            display() {
                return "which are removing " + formatWhole(tmp[this.layer].buyables[this.id].effect) + " of the lowest rolls.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Points"
            },
            buy() {
                let base = new Decimal(1000)
                let growth = 2.5
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.d.dicePoints = player.d.dicePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.d.dicePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.d.dicePoints = player.d.dicePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '175px', height: '100px', }
        },
        15: {
            cost(x) { return new Decimal(1.75).pow(x || getBuyableAmount(this.layer, this.id)).mul(6000) },
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
                let growth = 1.75
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.d.dicePoints = player.d.dicePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.d.dicePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.d.dicePoints = player.d.dicePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '175px', height: '100px', }
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
                    ["raw-html", function () { return player.d.currentBoosterText[player.d.currentBoosterRoll] + " (Currently x" + format(player.d.diceEffects[player.d.currentBoosterRoll]) + ")" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["clickable", 12], ["clickable", 13]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["raw-html", function () { return "Current rolls: " + player.d.rollText + '.'}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "+" + format(player.d.addDiceEffect) + 'x to the effect.'}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]

            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "12px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.d.dicePoints) + "</h3> dice points, which boost check back effect by ^" + format(player.d.dicePointsEffect) + "." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.po.dice == true}
})
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }