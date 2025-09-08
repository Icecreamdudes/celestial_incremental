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
        previousBoosterRoll: -1,
        currentBoosterText: "",
        currentBoosterRoll: -1,
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
        diceScore: new Decimal(0),
        rigIndex: 0,

        diceEffects: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],

        addDiceEffect: new Decimal(0),
        dicePointsMult: new Decimal(1),


        //Challenge
        challengeDicePoints: new Decimal(0),
        challengeDicePointsEffect: new Decimal(1),
        challengeDicePointsEffect2: new Decimal(1),
        challengeDicePointsToGet: new Decimal(1),

        boosterDiceStatsPerSecond: new Decimal(0),

        boosterDiceAutomation: false,
    }},
    automate() {
        if (hasUpgrade("d", 11) || hasUpgrade("tad", 13))
        {
            buyBuyable("d", 11)
            buyBuyable("d", 12)
            buyBuyable("d", 13)
            buyBuyable("d", 14)
            buyBuyable("d", 15)
        }
        if (hasMilestone("s", 16))
        {
            buyBuyable("d", 21)
            buyBuyable("d", 22)
            buyBuyable("d", 23)
            buyBuyable("d", 24)
        }
        if (hasMilestone("s", 17))
        {
            buyUpgrade("d", 11)
            buyUpgrade("d", 12)
            buyUpgrade("d", 13)
            buyUpgrade("d", 14)
            buyUpgrade("d", 15)
            buyUpgrade("d", 16)
            buyUpgrade("d", 17)
            buyUpgrade("d", 18)
        }
    },
    nodeStyle() {
        return {
            background: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(83,83,83,1) 100%)",
            "background-origin": "border-box",
            "border-color": "#0061ff",
        };
    },
    color: "white",
    tooltip: "Dice",
    branches: ["cb"],
    update(delta) {
        let onepersec = new Decimal(1)

        // START OF DICE POINT MODIFIERS
        player.d.dicePointsMult = new Decimal(1)
        player.d.dicePointsMult = player.d.dicePointsMult.mul(buyableEffect("d", 15))
        player.d.dicePointsMult = player.d.dicePointsMult.mul(levelableEffect("pet", 302)[0])
        if (hasUpgrade("ip", 34) && !inChallenge("ip", 14)) player.d.dicePointsMult = player.d.dicePointsMult.mul(upgradeEffect("ip", 34))
        player.d.dicePointsMult = player.d.dicePointsMult.mul(player.d.challengeDicePointsEffect)
        if (hasUpgrade("d", 12)) player.d.dicePointsMult = player.d.dicePointsMult.mul(upgradeEffect("d", 12))
        if (hasUpgrade("d", 15)) player.d.dicePointsMult = player.d.dicePointsMult.mul(upgradeEffect("d", 15))
        if (hasUpgrade("d", 16)) player.d.dicePointsMult = player.d.dicePointsMult.mul(upgradeEffect("d", 16))
        player.d.dicePointsMult = player.d.dicePointsMult.mul(buyableEffect("cb", 11))
        player.d.dicePointsMult = player.d.dicePointsMult.mul(buyableEffect("ta", 41))
        player.d.dicePointsMult = player.d.dicePointsMult.mul(buyableEffect("ta", 42))
        player.d.dicePointsMult = player.d.dicePointsMult.mul(buyableEffect("ta", 43))
        if (player.pol.pollinatorEffects.ant.enabled) player.d.dicePointsMult = player.d.dicePointsMult.mul(player.pol.pollinatorEffects.ant.effects[0])
        player.d.dicePointsMult = player.d.dicePointsMult.mul(levelableEffect("pet", 306)[0])
        player.d.dicePointsMult = player.d.dicePointsMult.mul(player.co.cores.dice.effect[0])
        player.d.dicePointsMult = player.d.dicePointsMult.mul(levelableEffect("pu", 106)[1])
        player.d.dicePointsMult = player.d.dicePointsMult.mul(player.st.starPowerEffect2)

        // POWER MODIFIERS
        player.d.dicePointsMult = player.d.dicePointsMult.pow(player.co.cores.dice.effect[1])

        // DICE POINT EFFECT
        player.d.dicePointsEffect = player.d.dicePoints.plus(1).log10().mul(0.1).add(1)

        //----------------------------------------

        // AUTO ROLL COOLDOWN CODE
        if (player.po.dice || inChallenge("ip", 15)) player.d.autoRollCooldown = player.d.autoRollCooldown.sub(onepersec.mul(delta))
        if (player.d.autoRollCooldown.lt(0)) {
            layers.d.diceRoll()
        }
    
        // AUTO ROLL TIME
        player.d.autoRollTime = buyableEffect("d", 13)
        if (hasMilestone("s", 19)) player.d.autoRollTime = player.d.autoRollTime.div(10)

        // ROLL TEXT STUFF
        player.d.rollText = player.d.diceRolls.join(", ")

        // CURRENT MANUAL DICE COOLDOWN VALUE
        player.d.diceCooldown = player.d.diceCooldown.sub(onepersec.mul(delta))

        // bro idk man, it is used for dice roll
        player.d.gainedDicePoints = new Decimal(1)

        // DICE SIDES
        player.d.diceSides = new Decimal(6)
        player.d.diceSides = player.d.diceSides.add(buyableEffect("d", 12))
        player.d.diceSides = player.d.diceSides.add(buyableEffect("d", 22))
        if (hasUpgrade("sma", 108)) player.d.diceSides = player.d.diceSides.mul(upgradeEffect("sma", 108)).floor()

        // LOWEST ROLL
        player.d.lowestRoll = buyableEffect("d", 14)
        player.d.lowestRoll = player.d.lowestRoll.add(buyableEffect("d", 22))

        // CURRENT BOOSTER TEXT
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
            "Currently boosting hex points.",
            "Currently boosting pre-OTF currencies.",
            "Currently boosting pollinators.",
            "Currently boosting time cubes.",
            "Currently boosting singularity points.",
        ]

        // BOOSTER DICE COOLDOWN DECREMENTOR
        player.d.boosterDiceCooldown = player.d.boosterDiceCooldown.sub(onepersec.mul(delta))

        // DICE COST CODE
        player.d.diceCost = Decimal.pow(player.d.dice.add(1), 8)
        if (player.d.dice > 6) player.d.diceCost = Decimal.pow(player.d.dice.add(1), 18).div(20)
        if (player.d.dice > 12) player.d.diceCost = Decimal.pow(30, player.d.dice.pow(2)).div(10)

        // AUTO BOOSTER DICE CODE
        if (player.d.boosterDiceCooldown.lt(0) && (inChallenge("ip", 15) || player.d.boosterDiceAutomation)) {
            if (inChallenge("ip", 15)) layers.in.bigCrunch()
            let rigged = false
            if (getRandomInt(2) == 0 || hasUpgrade("cs", 802)) {
                player.d.previousBoosterRoll = player.d.currentBoosterRoll
                player.d.currentBoosterRoll = player.d.rigIndex
                rigged = true
            }
            if (rigged == false) {
                do {
                    player.d.previousBoosterRoll = player.d.currentBoosterRoll
                    if (!hasChallenge("ip", 15)) {
                        player.d.currentBoosterRoll = getRandomInt(11)
                    } else if (!hasMilestone("r", 22)) {
                        player.d.currentBoosterRoll = getRandomInt(15)
                    } else if (!hasMilestone("r", 24)) {
                        player.d.currentBoosterRoll = getRandomInt(17)
                    } else {
                        player.d.currentBoosterRoll = getRandomInt(19)
                    }
                }
                while (player.d.previousBoosterRoll == player.d.currentBoosterRoll)
            }
            player.d.boosterDiceCooldown = new Decimal(60)

            if (inChallenge("ip", 15) || player.ev.evolutionsUnlocked[5]) player.d.challengeDicePoints = player.d.challengeDicePoints.add(player.d.challengeDicePointsToGet)
        }

        // BOOSTER DICE EFFECT PER SECOND
        player.d.boosterDiceStatsPerSecond = buyableEffect("d", 21)
        for (let i = 0; i < 11; i++) {
            if (i == 8 && player.d.boosterDiceStatsPerSecond.gte(1000)) {
                player.d.diceEffects[i] = player.d.diceEffects[i].add(player.d.boosterDiceStatsPerSecond.div(1000).pow(0.1).mul(1000).mul(delta))
            } else {
                player.d.diceEffects[i] = player.d.diceEffects[i].add(player.d.boosterDiceStatsPerSecond.mul(delta))
            }
        }

        // MANUAL DICE COOLDOWN
        player.d.manualCooldown = new Decimal(1)
        player.d.manualCooldown = player.d.manualCooldown.div(buyableEffect("d", 23))

        // MAKE SURE CAPS WORK CORRECTLY
        if (player.d.diceEffects[12].gt(10)) player.d.diceEffects[12] = new Decimal(10)
        if (player.d.diceEffects[18].gt(100)) player.d.diceEffects[18] = new Decimal(100)
        if (player.d.buyables[14].gt(player.d.diceSides.sub(player.d.buyables[22].mul(2)))) {
            player.d.buyables[14] = player.d.diceSides.sub(player.d.buyables[22].mul(2))
        }

        //----------------------------------------

        // START OF CHALLENGE DICE MODIFIERS
        player.d.challengeDicePointsToGet = player.d.dicePoints.pow(0.2).div(3)
        player.d.challengeDicePointsToGet = player.d.challengeDicePointsToGet.mul(buyableEffect("d", 24))
        player.d.challengeDicePointsToGet = player.d.challengeDicePointsToGet.mul(buyableEffect("g", 28))
        player.d.challengeDicePointsToGet = player.d.challengeDicePointsToGet.mul(player.co.cores.dice.effect[2])

        // CHALLENGE DICE PER SECOND
        if (hasUpgrade("i", 31)) player.d.challengeDicePoints = player.d.challengeDicePoints.add(player.d.challengeDicePointsToGet.mul(0.05).mul(delta))

        // CHALLENGE DICE EFFECTS
        player.d.challengeDicePointsEffect = player.d.challengeDicePoints.pow(0.75).add(1)
        if (hasUpgrade("ev2", 12)) player.d.challengeDicePointsEffect = player.d.challengeDicePointsEffect.mul(upgradeEffect("ev2", 12))
        
        player.d.challengeDicePointsEffect2 = player.d.challengeDicePoints.add(1).log(1e10).add(1)
        if (player.d.challengeDicePoints.gte("1e1000")) player.d.challengeDicePointsEffect2 = player.d.challengeDicePoints.add(1).log(1e100).add(90)
    },
    diceRoll() {
        let max = new Decimal(1)
        for (let i = 0; i < player.d.diceRolls.length; i++)
        {
            player.d.diceRolls[i] = Decimal.add(getRandomInt(player.d.diceSides.sub(player.d.lowestRoll.sub(1))), player.d.lowestRoll)
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
    clickables: {
        2: {
            title() { return "Turn booster dice automation on.<br>(Currently off)" },
            canClick() { return true },
            tooltip() { return "<h3>You won't gain any pets from automation." },
            unlocked() { return hasChallenge("ip", 15) && !player.d.boosterDiceAutomation},
            onClick() { player.d.boosterDiceAutomation = true },
            style: { width: '150px', "min-height": '75px', fontSize: "9px", borderRadius: "10px"},
        },
        3: {
            title() { return "Turn booster dice automation off.<br>(Currently on)" },
            canClick() { return true },
            tooltip() { return "<h3>You won't gain any pets from automation." },
            unlocked() { return hasChallenge("ip", 15) && player.d.boosterDiceAutomation},
            onClick() { player.d.boosterDiceAutomation = false },
            style: { width: '150px', "min-height": '75px', fontSize: "9px", borderRadius: "10px"},
        },
        4: {
            title() { return "Buy Max On" },
            canClick() { return player.buyMax == false },
            unlocked() { return true },
            onClick() {
                player.buyMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        5: {
            title() { return "Buy Max Off" },
            canClick() { return player.buyMax == true  },
            unlocked() { return true },
            onClick() {
                player.buyMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        11: {
            title() { return player.d.diceCooldown.gt(0) ? formatTime(player.d.diceCooldown) : "<h2>Roll!"},
            display() { return "Autoroll: " + formatTime(player.d.autoRollCooldown) },
            canClick() { return player.d.diceCooldown.lt(0) },
            unlocked() { return true },
            onClick() {
                layers.d.diceRoll();
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: { width: '100px', "min-height": '100px', borderRadius: "10px" },
        },
        12: {
            title() { return player.d.boosterDiceCooldown.gt(0) ? formatTime(player.d.boosterDiceCooldown) : "<h2>Roll to change currency boost!"},
            canClick() { return player.d.boosterDiceCooldown.lt(0) },
            tooltip() { return "<h3>" + player.d.dicePoints.add(1).log10().pow(0.8).div(5).add(5).floor() + "% chance for a pet???" },
            unlocked() { return true },
            onClick() {
                let riggy = false
                if (getRandomInt(2) == 0 || hasUpgrade("cs", 802)) {
                    player.d.previousBoosterRoll = player.d.currentBoosterRoll
                    player.d.currentBoosterRoll = player.d.rigIndex
                    riggy = true
                }
                if (riggy == false) {
                    do {
                        player.d.previousBoosterRoll = player.d.currentBoosterRoll
                        if (!hasChallenge("ip", 15)) {
                            player.d.currentBoosterRoll = getRandomInt(11)
                        } else if (!hasMilestone("r", 22)) {
                            player.d.currentBoosterRoll = getRandomInt(15)
                        } else if (!hasMilestone("r", 24)) {
                            player.d.currentBoosterRoll = getRandomInt(17)
                        } else {
                            player.d.currentBoosterRoll = getRandomInt(19)
                        }
                    }
                    while (player.d.previousBoosterRoll == player.d.currentBoosterRoll)
                }
                player.d.boosterDiceCooldown = new Decimal(60)

                let random = getRandomInt(100)
                let prob = player.d.dicePoints.add(1).log10().pow(0.8).div(5).add(4).floor()

                if (new Decimal(random).lte(prob)) {
                    addLevelableXP("pet", 302, 1);
                    if (player.cb.highestLevel.lt(35)) callAlert("You gained a Dice! (Rare pets unlock at check back level 35)", "resources/Pets/diceRarePet.png");
                    if (player.cb.highestLevel.gte(35)) callAlert("You gained a Dice!", "resources/Pets/diceRarePet.png");
                }

                if (inChallenge("ip", 15))
                {
                    layers.in.bigCrunch();
                }

                if (player.ev.evolutionsUnlocked[5]) player.d.challengeDicePoints = player.d.challengeDicePoints.add(player.d.challengeDicePointsToGet)
            },
            style() {
                let look = {width: "150px", minHeight: "150px", borderRadius: "15px"}
                this.canClick() ? look.backgroundColor = "black" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        101: {
            title() { return "Points<br>x" + format(player.d.diceEffects[0]) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.d.rigIndex = 0
            },
            style() {
                let look = {width: "125px", minHeight: "125px", color: "white", border: "3px solid white", margin: "5px", borderRadius: "20px"}
                player.d.currentBoosterRoll == 0 ? look.backgroundColor = "#3b3b3b" : look.backgroundColor = "black"
                player.d.rigIndex == 0 ? look.border = "3px solid red" : look.border = "3px solid white"
                return look
            },
        },
        102: {
            title() { return "Factor Power<br>x" + format(player.d.diceEffects[1]) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.d.rigIndex = 1
            },
            style() {
                let look = {width: "125px", minHeight: "125px", color: "white", border: "3px solid white", margin: "5px", borderRadius: "20px"}
                player.d.currentBoosterRoll == 1 ? look.backgroundColor = "#3b3b3b" : look.backgroundColor = "black"
                player.d.rigIndex == 1 ? look.border = "3px solid red" : look.border = "3px solid white"
                return look
            },
        },
        103: {
            title() { return "Prestige Points<br>x" + format(player.d.diceEffects[2]) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.d.rigIndex = 2
            },
            style() {
                let look = {width: "125px", minHeight: "125px", color: "white", border: "3px solid white", margin: "5px", borderRadius: "20px"}
                player.d.currentBoosterRoll == 2 ? look.backgroundColor = "#3b3b3b" : look.backgroundColor = "black"
                player.d.rigIndex == 2 ? look.border = "3px solid red" : look.border = "3px solid white"
                return look
            },
        },
        104: {
            title() { return "Trees<br>x" + format(player.d.diceEffects[3]) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.d.rigIndex = 3
            },
            style() {
                let look = {width: "125px", minHeight: "125px", color: "white", border: "3px solid white", margin: "5px", borderRadius: "20px"}
                player.d.currentBoosterRoll == 3 ? look.backgroundColor = "#3b3b3b" : look.backgroundColor = "black"
                player.d.rigIndex == 3 ? look.border = "3px solid red" : look.border = "3px solid white"
                return look
            },
        },
        105: {
            title() { return "Leaves<br>x" + format(player.d.diceEffects[4]) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.d.rigIndex = 4
            },
            style() {
                let look = {width: "125px", minHeight: "125px", color: "white", border: "3px solid white", margin: "5px", borderRadius: "20px"}
                player.d.currentBoosterRoll == 4 ? look.backgroundColor = "#3b3b3b" : look.backgroundColor = "black"
                player.d.rigIndex == 4 ? look.border = "3px solid red" : look.border = "3px solid white"
                return look
            },
        },
        106: {
            title() { return "Grass Value<br>x" + format(player.d.diceEffects[5]) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.d.rigIndex = 5
            },
            style() {
                let look = {width: "125px", minHeight: "125px", color: "white", border: "3px solid white", margin: "5px", borderRadius: "20px"}
                player.d.currentBoosterRoll == 5 ? look.backgroundColor = "#3b3b3b" : look.backgroundColor = "black"
                player.d.rigIndex == 5 ? look.border = "3px solid red" : look.border = "3px solid white"
                return look
            },
        },
        107: {
            title() { return "Grasshoppers<br>x" + format(player.d.diceEffects[6]) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.d.rigIndex = 6
            },
            style() {
                let look = {width: "125px", minHeight: "125px", color: "white", border: "3px solid white", margin: "5px", borderRadius: "20px"}
                player.d.currentBoosterRoll == 6 ? look.backgroundColor = "#3b3b3b" : look.backgroundColor = "black"
                player.d.rigIndex == 6 ? look.border = "3px solid red" : look.border = "3px solid white"
                return look
            },
        },
        108: {
            title() { return "Fertilizer<br>x" + format(player.d.diceEffects[7]) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.d.rigIndex = 7
            },
            style() {
                let look = {width: "125px", minHeight: "125px", color: "white", border: "3px solid white", margin: "5px", borderRadius: "20px"}
                player.d.currentBoosterRoll == 7 ? look.backgroundColor = "#3b3b3b" : look.backgroundColor = "black"
                player.d.rigIndex == 7 ? look.border = "3px solid red" : look.border = "3px solid white"
                return look
            },
        },
        109: {
            title() { return "Mods<br>x" + format(player.d.diceEffects[8]) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.d.rigIndex = 8
            },
            style() {
                let look = {width: "125px", minHeight: "125px", color: "white", border: "3px solid white", margin: "5px", borderRadius: "20px"}
                player.d.currentBoosterRoll == 8 ? look.backgroundColor = "#3b3b3b" : look.backgroundColor = "black"
                player.d.rigIndex == 8 ? look.border = "3px solid red" : look.border = "3px solid white"
                return look
            },
        },
        110: {
            title() { return "Lines of Code<br>x" + format(player.d.diceEffects[9]) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.d.rigIndex = 9
            },
            style() {
                let look = {width: "125px", minHeight: "125px", color: "white", border: "3px solid white", margin: "5px", borderRadius: "20px"}
                player.d.currentBoosterRoll == 9 ? look.backgroundColor = "#3b3b3b" : look.backgroundColor = "black"
                player.d.rigIndex == 9 ? look.border = "3px solid red" : look.border = "3px solid white"
                return look
            },
        },
        111: {
            title() { return "Code Experience<br>x" + format(player.d.diceEffects[10]) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.d.rigIndex = 10
            },
            style() {
                let look = {width: "125px", minHeight: "125px", color: "white", border: "3px solid white", margin: "5px", borderRadius: "20px"}
                player.d.currentBoosterRoll == 10 ? look.backgroundColor = "#3b3b3b" : look.backgroundColor = "black"
                player.d.rigIndex == 10 ? look.border = "3px solid red" : look.border = "3px solid white"
                return look
            },
        },
        112: {
            title() { return "Infinity Points<br>x" + format(player.d.diceEffects[11]) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.d.rigIndex = 11
            },
            style() {
                let look = {width: "125px", minHeight: "125px", color: "white", border: "3px solid white", margin: "5px", borderRadius: "20px"}
                player.d.currentBoosterRoll == 11 ? look.backgroundColor = "#3b3b3b" : look.backgroundColor = "black"
                player.d.rigIndex == 11 ? look.border = "3px solid red" : look.border = "3px solid white"
                return look
            },
        },
        113: {
            title() { return "Check Back XP<br>x" + format(player.d.diceEffects[12]) + "<br>(MAX IS x10)" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.d.rigIndex = 12
            },
            style() {
                let look = {width: "125px", minHeight: "125px", color: "white", border: "3px solid white", margin: "5px", borderRadius: "20px"}
                player.d.currentBoosterRoll == 12 ? look.backgroundColor = "#3b3b3b" : look.backgroundColor = "black"
                player.d.rigIndex == 12 ? look.border = "3px solid red" : look.border = "3px solid white"
                return look
            },
        },
        114: {
            title() { return "Rocket Fuel<br>x" + format(player.d.diceEffects[13]) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.d.rigIndex = 13
            },
            style() {
                let look = {width: "125px", minHeight: "125px", color: "white", border: "3px solid white", margin: "5px", borderRadius: "20px"}
                player.d.currentBoosterRoll == 13 ? look.backgroundColor = "#3b3b3b" : look.backgroundColor = "black"
                player.d.rigIndex == 13 ? look.border = "3px solid red" : look.border = "3px solid white"
                return look
            },
        },
        115: {
            title() { return "Hex Points<br>x" + format(player.d.diceEffects[14]) },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.d.rigIndex = 14
            },
            style() {
                let look = {width: "125px", minHeight: "125px", color: "white", border: "3px solid white", margin: "5px", borderRadius: "20px"}
                player.d.currentBoosterRoll == 14 ? look.backgroundColor = "#3b3b3b" : look.backgroundColor = "black"
                player.d.rigIndex == 14 ? look.border = "3px solid red" : look.border = "3px solid white"
                return look
            },
        },
        116: {
            title() { return "Pre-OTF Currencies<br>x" + format(player.d.diceEffects[15]) },
            canClick() { return true },
            unlocked() { return hasMilestone("r", 22) },
            onClick() {
                player.d.rigIndex = 15
            },
            style() {
                let look = {width: "125px", minHeight: "125px", color: "white", border: "3px solid white", margin: "5px", borderRadius: "20px"}
                player.d.currentBoosterRoll == 15 ? look.backgroundColor = "#3b3b3b" : look.backgroundColor = "black"
                player.d.rigIndex == 15 ? look.border = "3px solid red" : look.border = "3px solid white"
                return look
            },
        },
        117: {
            title() { return "Pollinators<br>x" + format(player.d.diceEffects[16]) },
            canClick() { return true },
            unlocked() { return hasMilestone("r", 22) },
            onClick() {
                player.d.rigIndex = 16
            },
            style() {
                let look = {width: "125px", minHeight: "125px", color: "white", border: "3px solid white", margin: "5px", borderRadius: "20px"}
                player.d.currentBoosterRoll == 16 ? look.backgroundColor = "#3b3b3b" : look.backgroundColor = "black"
                player.d.rigIndex == 16 ? look.border = "3px solid red" : look.border = "3px solid white"
                return look
            },
        },
        118: {
            title() { return "Time Cubes<br>x" + format(player.d.diceEffects[17]) },
            canClick() { return true },
            unlocked() { return hasMilestone("r", 24) },
            onClick() {
                player.d.rigIndex = 17
            },
            style() {
                let look = {width: "125px", minHeight: "125px", color: "white", border: "3px solid white", margin: "5px", borderRadius: "20px"}
                player.d.currentBoosterRoll == 17 ? look.backgroundColor = "#3b3b3b" : look.backgroundColor = "black"
                player.d.rigIndex == 17 ? look.border = "3px solid red" : look.border = "3px solid white"
                return look
            },
        },
        119: {
            title() { return "Singularity Points<br>x" + format(player.d.diceEffects[18]) + "<br>(MAX IS x100)" },
            canClick() { return true },
            unlocked() { return hasMilestone("r", 24) },
            onClick() {
                player.d.rigIndex = 18
            },
            style() {
                let look = {width: "125px", minHeight: "125px", color: "white", border: "3px solid white", margin: "5px", borderRadius: "20px"}
                player.d.currentBoosterRoll == 18 ? look.backgroundColor = "#3b3b3b" : look.backgroundColor = "black"
                player.d.rigIndex == 18 ? look.border = "3px solid red" : look.border = "3px solid white"
                return look
            },
        },
    },
    addDiceEffect() {
        player.d.diceScore = new Decimal(0)
        for (let i = 0; i < player.d.diceRolls.length; i++) {
            player.d.diceScore = player.d.diceScore.add(player.d.diceRolls[i])
        }
        if (hasUpgrade("cs", 801)) player.d.diceScore = player.d.diceScore.mul(10)
        if (hasUpgrade("cs", 803)) player.d.diceScore = player.d.diceScore.mul(player.d.challengeDicePointsEffect2)

        if (player.d.currentBoosterRoll == 0) {
                player.d.addDiceEffect = player.d.diceScore.mul(0.0025).pow(1.1)
                if (player.d.addDiceEffect.gte(1)) player.d.addDiceEffect = player.d.addDiceEffect.pow(player.cs.scraps.dice.effect)
                player.d.diceEffects[0] = player.d.diceEffects[0].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll  == 1) {
                player.d.addDiceEffect = player.d.diceScore.mul(0.002).pow(0.95)
                if (player.d.addDiceEffect.gte(1)) player.d.addDiceEffect = player.d.addDiceEffect.pow(player.cs.scraps.dice.effect)
                player.d.diceEffects[1] = player.d.diceEffects[1].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 2) {
                player.d.addDiceEffect = player.d.diceScore.mul(0.0016).pow(0.92)
                if (player.d.addDiceEffect.gte(1)) player.d.addDiceEffect = player.d.addDiceEffect.pow(player.cs.scraps.dice.effect)
                player.d.diceEffects[2] = player.d.diceEffects[2].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 3) {
                player.d.addDiceEffect = player.d.diceScore.mul(0.0008).pow(0.8)
                if (player.d.addDiceEffect.gte(1)) player.d.addDiceEffect = player.d.addDiceEffect.pow(player.cs.scraps.dice.effect)
                player.d.diceEffects[3] = player.d.diceEffects[3].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 4) {
                player.d.addDiceEffect = player.d.diceScore.mul(0.0012).pow(0.8)
                if (player.d.addDiceEffect.gte(1)) player.d.addDiceEffect = player.d.addDiceEffect.pow(player.cs.scraps.dice.effect)
                player.d.diceEffects[4] = player.d.diceEffects[4].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 5) {
                player.d.addDiceEffect = player.d.diceScore.mul(0.0008).pow(0.75)
                if (player.d.addDiceEffect.gte(1)) player.d.addDiceEffect = player.d.addDiceEffect.pow(player.cs.scraps.dice.effect)
                player.d.diceEffects[5] = player.d.diceEffects[5].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 6) {
                player.d.addDiceEffect = player.d.diceScore.mul(0.0007).pow(0.7)
                if (player.d.addDiceEffect.gte(1)) player.d.addDiceEffect = player.d.addDiceEffect.pow(player.cs.scraps.dice.effect)
                player.d.diceEffects[6] = player.d.diceEffects[6].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 7) {
                player.d.addDiceEffect = player.d.diceScore.mul(0.0008).pow(0.7)
                if (player.d.addDiceEffect.gte(1)) player.d.addDiceEffect = player.d.addDiceEffect.pow(player.cs.scraps.dice.effect)
                player.d.diceEffects[7] = player.d.diceEffects[7].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 8) {
                player.d.addDiceEffect = player.d.diceScore.mul(0.0005).pow(0.7)
                if (player.d.addDiceEffect.gte(1)) player.d.addDiceEffect = player.d.addDiceEffect.pow(player.cs.scraps.dice.effect)
                if (player.d.addDiceEffect.gte(1000)) player.d.addDiceEffect = player.d.addDiceEffect.div(1000).pow(0.1).mul(1000)
                player.d.diceEffects[8] = player.d.diceEffects[8].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 9) {
                player.d.addDiceEffect = player.d.diceScore.mul(0.0007).pow(0.7)
                if (player.d.addDiceEffect.gte(1)) player.d.addDiceEffect = player.d.addDiceEffect.pow(player.cs.scraps.dice.effect)
                player.d.diceEffects[9] = player.d.diceEffects[9].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 10) {
            player.d.addDiceEffect = player.d.diceScore.mul(0.0006).pow(0.7)
            if (player.d.addDiceEffect.gte(1)) player.d.addDiceEffect = player.d.addDiceEffect.pow(player.cs.scraps.dice.effect)
            player.d.diceEffects[10] = player.d.diceEffects[10].add(player.d.addDiceEffect)
        // TIER 2 EFFECTS
        } else if (player.d.currentBoosterRoll == 11) {
            player.d.addDiceEffect = player.d.diceScore.pow(0.5).mul(0.00002)
            if (hasUpgrade("d", 18)) player.d.addDiceEffect = player.d.addDiceEffect.mul(100)
            player.d.diceEffects[11] = player.d.diceEffects[11].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 12) {
            player.d.addDiceEffect = player.d.diceScore.pow(0.1).mul(0.0001).div(player.d.diceEffects[12].pow(5))
            player.d.diceEffects[12] = player.d.diceEffects[12].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 13) {
            player.d.addDiceEffect = player.d.diceScore.mul(0.00001)
            player.d.diceEffects[13] = player.d.diceEffects[13].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 14) {
            player.d.addDiceEffect = player.d.diceScore.add(1).log(60).mul(0.006)
            if (player.d.addDiceEffect.gt(60)) player.d.addDiceEffect = player.d.addDiceEffect.div(60).pow(0.3).mul(60)
            player.d.diceEffects[14] = player.d.diceEffects[14].add(player.d.addDiceEffect)
        // PENT UNLOCKED EFFECTS
        } else if (player.d.currentBoosterRoll == 15) {
            player.d.addDiceEffect = player.d.diceScore.pow(0.5).mul(0.00005).div(player.d.diceEffects[15])
            player.d.diceEffects[15] = player.d.diceEffects[15].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 16) {
            player.d.addDiceEffect = player.d.diceScore.pow(0.5).mul(0.00001)
            player.d.diceEffects[16] = player.d.diceEffects[16].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 17) {
            player.d.addDiceEffect = player.d.diceScore.pow(0.5).mul(0.0005)
            player.d.diceEffects[17] = player.d.diceEffects[17].add(player.d.addDiceEffect)
        } else if (player.d.currentBoosterRoll == 18) {
            if (player.d.diceEffects[18].lt(10)) player.d.addDiceEffect = player.d.diceScore.pow(0.5).mul(0.00001).div(player.d.diceEffects[18])
            if (player.d.diceEffects[18].gte(10)) player.d.addDiceEffect = player.d.diceScore.pow(0.5).mul(0.00001).div(player.d.diceEffects[18].pow(2))
            player.d.diceEffects[18] = player.d.diceEffects[18].add(player.d.addDiceEffect)
        }
    },
    bars: {},
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
        18:
        {
            title: "Dicey Dicey Dicey Dicey.",
            unlocked() { return hasUpgrade("s", 13) },
            description: "Gain 100x more infinity dice effect.",
            cost: new Decimal(1e32),
            currencyLocation() { return player.d },
            currencyDisplayName: "Challenge Dice Points",
            currencyInternalName: "challengeDicePoints",
            style: { width: '150px', height: '100px', }
        },
    },
    buyables: {
        11: {
            cost(x) { return player.d.diceCost },
            unlocked() { return true },
            canAfford() { return player.d.dicePoints.gte(this.cost()) && player.d.buyables[11].lt(24)},
            title() {
                return "You have " + format(player.d.dice, 0) + "/24 dice."
            },
            display() {
                return "Buys another die.\n\
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
            style: { width: '175px', height: '100px', borderRadius: "10px" }
        },
        12: {
            costBase() { return new Decimal(250) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.d.dicePoints},
            pay(amt) { player.d.dicePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Dice Side Boost"
            },
            display() {
                return "which are increasing sides on dice by +" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("d", 11) && !hasUpgrade("tad", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    if (!hasUpgrade("d", 11) && !hasUpgrade("tad", 13)) this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("d", 11) && !hasUpgrade("tad", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(83,83,83,1) 100%)", backgroundOrigin: "border-box"}
        },
        13: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(4) },
            purchaseLimit() { return new Decimal(1250) },
            currency() { return player.d.dicePoints},
            pay(amt) { player.d.dicePoints = this.currency().sub(amt) },
            effect(x) { return new Decimal(5).div(getBuyableAmount(this.layer, this.id).mul(0.02).add(1)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Autoroll"
            },
            display() {
                return "Automatically rolls the dice every " + format(tmp[this.layer].buyables[this.id].effect) + " seconds.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("d", 11) && !hasUpgrade("tad", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    if (!hasUpgrade("d", 11) && !hasUpgrade("tad", 13)) this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("d", 11) && !hasUpgrade("tad", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(83,83,83,1) 100%)", backgroundOrigin: "border-box"}
        },
        14: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(2.5) },
            purchaseLimit() { return player.d.diceSides.sub(player.d.buyables[22].mul(2)).sub(1) },
            currency() { return player.d.dicePoints},
            pay(amt) { player.d.dicePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Low Roll Removal"
            },
            display() {
                return "which are removing " + formatWhole(tmp[this.layer].buyables[this.id].effect.sub(1)) + " of the lowest rolls.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("d", 11) && !hasUpgrade("tad", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    if (!hasUpgrade("d", 11) && !hasUpgrade("tad", 13)) this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("d", 11) && !hasUpgrade("tad", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(83,83,83,1) 100%)", backgroundOrigin: "border-box"}
        },
        15: {
            costBase() { return new Decimal(2000) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(2500) },
            currency() { return player.d.dicePoints},
            pay(amt) { player.d.dicePoints = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "DP Multiplier"
            },
            display() {
                return "which are boosting dice points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Points"
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("d", 11) && !hasUpgrade("tad", 13)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    if (!hasUpgrade("d", 11) && !hasUpgrade("tad", 13)) this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("d", 11) && !hasUpgrade("tad", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(83,83,83,1) 100%)", backgroundOrigin: "border-box"}
        },

        //challenge dice
        21: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.d.challengeDicePoints},
            pay(amt) { player.d.challengeDicePoints = this.currency().sub(amt) },
            effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.05)
                if (hasUpgrade("cs", 801)) eff = eff.mul(10)
                if (hasUpgrade("cs", 803)) eff = eff.mul(player.d.challengeDicePointsEffect2)
                eff = eff.add(1).pow(player.cs.scraps.dice.effect).sub(1)
                return eff
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Booster Dice Producer!"
            },
            display() {
                return "which are producing +" + format(tmp[this.layer].buyables[this.id].effect) + " of all tier 1 booster dice effects per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Challenge Dice Points"
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
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(83,83,83,1) 100%)", backgroundOrigin: "border-box"}
        },
        22: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(2.5) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.d.challengeDicePoints},
            pay(amt) { player.d.challengeDicePoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(2) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Multipurpose Dice Upgade Thing!"
            },
            display() {
                return "which are increasing sides and removing lowest rolls by +" + formatWhole(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Challenge Dice Points"
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
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(83,83,83,1) 100%)", backgroundOrigin: "border-box"}
        },
        23: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(90) },
            currency() { return player.d.challengeDicePoints},
            pay(amt) { player.d.challengeDicePoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Manual Dice Cooldown!"
            },
            display() {
                return "which are dividing the manual dice cooldown by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Challenge Dice Points"
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
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(83,83,83,1) 100%)", backgroundOrigin: "border-box"}
        },
        24: {
            costBase() { return new Decimal(1e7) },
            costGrowth() { return new Decimal(1.8) },
            purchaseLimit() { return new Decimal(350) },
            currency() { return player.d.challengeDicePoints},
            pay(amt) { player.d.challengeDicePoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.4).add(1).pow(1.35) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Challenge Dice Boosty!!! :D"
            },
            display() {
                return "which are boosting challenge dice points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Challenge Dice Points"
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
            style: { width: '275px', height: '150px', backgroundImage: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(83,83,83,1) 100%)", backgroundOrigin: "border-box"}
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Dice": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["clickable", 11]]],
                    ["blank", "25px"],
                    ["style-column", [
                        ["raw-html", () => { return "You are rolling a " + formatWhole(player.d.diceSides) + ' sided dice.'}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "Current rolls:<br>" + player.d.rollText + '.'}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "+" + formatWhole(player.d.gainedDicePointsDisplay) + ' DP.'}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],    
                    ], {width: "60%", backgroundColor: "#333333", border: "3px solid white", padding: "5px", borderRadius: "15px"}],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14], ["ex-buyable", 15]], {maxWidth: "1200px"}],
                ]
            },
            "Booster Dice": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["clickable", 11], 
                        ["style-column", [
                            ["raw-html", function () { return "Current roll score: " + formatWhole(player.d.diceScore) + '.'}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["raw-html", function () { return "+" + format(player.d.addDiceEffect) + 'x to the effect.'}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ], {width: "400px"}],
                    ], {width: "500px", backgroundColor: "#333333", border: "3px solid white", padding: "5px", borderRadius: "10px"}],
                    ["blank", "25px"],
                    ["style-column", [
                        ["blank", "10px"],
                        ["style-row", [
                            ["clickable", 12],
                            ["style-column", [
                                ["raw-html", function () { return player.d.currentBoosterText[player.d.currentBoosterRoll] + "<br>(Currently x" + format(player.d.diceEffects[player.d.currentBoosterRoll]) + ")" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                                ["raw-html", function () { return player.d.currentBoosterRoll == 18 ? "(MAX IS x100)" : player.d.currentBoosterRoll == 12 ? "(MAX IS x10)" : "" }, { color: "white", fontSize: "20px", fontFamily: "monospace" }],
                            ], {width: "490px"}]
                        ]],
                        ["blank", "10px"],
                        ["h-line", "650px"],
                        ["blank", "10px"],
                        ["raw-html", "Click a side to rig that side of the die in your favor.", { color: "white", fontSize: "16px", fontFamily: "monospace" }],
                        ["raw-html", "Current rigged side is shown by a red border.", { color: "white", fontSize: "16px", fontFamily: "monospace" }],
                        ["blank", "10px"],
                        ["h-line", "650px"],
                        ["blank", "10px"],
                        ["row", [["clickable", 101], ["clickable", 102], ["clickable", 103], ["clickable", 104]]],
                        ["row", [["clickable", 105], ["clickable", 106], ["clickable", 107], ["clickable", 108]]],
                        ["row", [["clickable", 109], ["clickable", 110], ["clickable", 111]]],
                        ["blank", "10px"],
                        ["style-column", [
                            ["h-line", "650px"],
                            ["blank", "10px"],
                            ["raw-html", () => { return hasUpgrade('s', 13) ? "Kept on singularity" : "Kept on infinity" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                            ["blank", "10px"],
                            ["h-line", "650px"],
                            ["blank", "10px"],
                            ["row", [["clickable", 112], ["clickable", 113], ["clickable", 114], ["clickable", 115]]],
                            ["row", [["clickable", 116], ["clickable", 117], ["clickable", 118], ["clickable", 119]]],
                            ["blank", "10px"],
                        ], () => { return hasChallenge("ip", 15) ? {} : {display: "none !important"}}],
                    ], {backgroundColor: "#35654d", border: "3px solid white", borderRadius: "15px", width: "650px"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                ]
            },
            "Challenge Dice": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return inChallenge("ip", 15) || player.ev.evolutionsUnlocked[5]},
                content: [
                    ["blank", "25px"],
                    ["row", [
                        ["raw-html", () => { return "You have <h3>" + format(player.d.challengeDicePoints) + "</h3> challenge dice points" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "(+" + format(player.d.challengeDicePointsToGet) + " on BDR)" }, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["raw-html", () => {return "Boosts dice point gain by x" + format(player.d.challengeDicePointsEffect)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return hasUpgrade("cs", 803) ? "Boosts dice score by x" + format(player.d.challengeDicePointsEffect2) : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 21], ["ex-buyable", 22], ["ex-buyable", 23], ["ex-buyable", 24]], {maxWidth: "1200px"}],
                    ["blank", "25px"],
                    ["style-row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16], ["upgrade", 17], ["upgrade", 18]], {maxWidth: "1200px"}],
                ]
            },
            "Challenge Debuffs": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return inChallenge("ip", 15) },
                content: [
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
        ["raw-html", () => { return "You have <h3>" + format(player.points) + "</h3> celestial points (+" + format(player.gain) + "/s)." }, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You have <h3>" + formatWhole(player.d.dicePoints) + "</h3> dice points" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["raw-html", () => { return "Boosts check back effect by ^" + format(player.d.dicePointsEffect) }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
        ],
    layerShown() { return player.startedGame == true && (player.po.dice == true || inChallenge("ip", 15))}
})
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

// call me a gambler the way i roll dice
