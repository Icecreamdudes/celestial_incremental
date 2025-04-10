addLayer("fu", {
    name: "Funify", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() {
        return !player.fu.jocusCelestialActivate ? "Funify" : "☻"
    },
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        fun: new Decimal(0),
        funifyPause: new Decimal(0),
        funToGet: new Decimal(0),
        
        funEffect: new Decimal(0),
        funEffect2: new Decimal(0),
        funEffect3: new Decimal(0),

        jocusCelestialActivate: false,

        sfrgt: new Decimal(0),
        sfrgtPerSecond: new Decimal(0),

        fMax: false,

        happiness: new Decimal(0),
        happinessPerSecond: new Decimal(0),
        happinessEffect: new Decimal(1), //divides anger
        happinessEffect2: new Decimal(1), //steel
        happinessProduce: true,

        sadness: new Decimal(0),
        sadnessPerSecond: new Decimal(0),
        sadnessEffect: new Decimal(1), //divides happiness
        sadnessEffect2: new Decimal(1), //infinity points
        sadnessProduce: true,

        anger: new Decimal(0),
        angerPerSecond: new Decimal(0),
        angerEffect: new Decimal(1), //divides sadness
        angerEffect2: new Decimal(1), //singularity points
        angerProduce: true,

        fear: new Decimal(0),
        fearPerSecond: new Decimal(0),
        fearEffect: new Decimal(1), //divides fear
        fearEffect2: new Decimal(1), //singularity points
        fearProduce: true,

        emotionIndex: new Decimal(0),

        jocusEssence: new Decimal(0),
        jocusEssenceEffect: new Decimal(0), //boosts anonymity
        jocusEssenceToGet: new Decimal(0),

        defeatedJocus: false,
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(45deg, #fcff04 0%, #befa32 100%)",
            "background-origin": "border-box",
            "border-color": "#5e8503",
        };
    },
    tooltip() {
        return !player.fu.jocusCelestialActivate ? "Funify" : "Jocus, Celestial of Fun"
    },
    color: "#fcff04",
    branches: ["oi", 'gs'],
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.fu.funifyPause.gt(0)) {
            layers.fu.funifyReset();
        }
        player.fu.funifyPause = player.fu.funifyPause.sub(1)

        player.fu.funToGet = player.oi.oil.div(1e10).pow(0.4)
        player.fu.funToGet = player.fu.funToGet.mul(buyableEffect("fu", 15))
        player.fu.funToGet = player.fu.funToGet.mul(buyableEffect("fu", 38))
        player.fu.funToGet = player.fu.funToGet.mul(levelableEffect("pet", 1205)[1])

        player.fu.fun = player.fu.fun.add(player.fu.funToGet.mul(buyableEffect("fu", 74)))

        player.fu.funEffect = player.fu.fun.pow(0.8).add(1)
        player.fu.funEffect2 = player.fu.fun.pow(0.6).div(2).add(1)
        player.fu.funEffect3 = player.fu.fun.pow(0.9).mul(2).add(1)
        
        player.fu.sfrgtPerSecond = buyableEffect("fu", 11)
        .mul(buyableEffect("fu", 12))
        .mul(buyableEffect("fu", 13))
        .mul(buyableEffect("fu", 14))
        .mul(buyableEffect("fu", 48))

        player.fu.sfrgt = player.fu.sfrgt.add(player.fu.sfrgtPerSecond.mul(delta))


        //mood triangle

        if (player.fu.happinessProduce) player.fu.happiness = player.fu.happiness.add(player.fu.happinessPerSecond.mul(delta))
        player.fu.happinessPerSecond = buyableEffect("fu", 31)
        player.fu.happinessPerSecond = player.fu.happinessPerSecond.div(player.fu.sadnessEffect)
        player.fu.happinessPerSecond = player.fu.happinessPerSecond.mul(buyableEffect("fu", 55))
        player.fu.happinessPerSecond = player.fu.happinessPerSecond.mul(buyableEffect("fu", 58))
        player.fu.happinessPerSecond = player.fu.happinessPerSecond.mul(buyableEffect("fu", 62))
        
        player.fu.happinessEffect = player.fu.happiness.pow(0.35).add(1)
        player.fu.happinessEffect2 = player.fu.happiness.pow(2.2).add(1)


        if (player.fu.sadnessProduce) player.fu.sadness = player.fu.sadness.add(player.fu.sadnessPerSecond.mul(delta))
        player.fu.sadnessPerSecond = buyableEffect("fu", 41)
        player.fu.sadnessPerSecond = player.fu.sadnessPerSecond.div(player.fu.angerEffect)
        player.fu.sadnessPerSecond = player.fu.sadnessPerSecond.mul(buyableEffect("fu", 35))
        player.fu.sadnessPerSecond = player.fu.sadnessPerSecond.mul(buyableEffect("fu", 58))
        player.fu.sadnessPerSecond = player.fu.sadnessPerSecond.mul(buyableEffect("fu", 63))

        player.fu.sadnessEffect = player.fu.sadness.pow(0.35).add(1)
        player.fu.sadnessEffect2 = player.fu.sadness.pow(1.2).add(1)


        if (player.fu.angerProduce) player.fu.anger = player.fu.anger.add(player.fu.angerPerSecond.mul(delta))
        player.fu.angerPerSecond = buyableEffect("fu", 51)
        player.fu.angerPerSecond = player.fu.angerPerSecond.div(player.fu.happinessEffect)
        player.fu.angerPerSecond = player.fu.angerPerSecond.mul(buyableEffect("fu", 45))
        player.fu.angerPerSecond = player.fu.angerPerSecond.mul(buyableEffect("fu", 58))
        player.fu.angerPerSecond = player.fu.angerPerSecond.mul(buyableEffect("fu", 64))

        player.fu.angerEffect = player.fu.anger.pow(0.35).add(1)
        player.fu.angerEffect2 = player.fu.anger.pow(0.25).div(15).add(1)

        if (player.fu.fearProduce && inChallenge("fu", 11)) player.fu.fear = player.fu.fear.add(player.fu.fearPerSecond.mul(delta))
        player.fu.fearPerSecond = buyableEffect("fu", 61)
        player.fu.fearPerSecond = player.fu.fearPerSecond.mul(buyableEffect("fu", 71))
        player.fu.fearPerSecond = player.fu.fearPerSecond.div(player.fu.fearEffect)
        
        player.fu.fearEffect = player.fu.fear.pow(0.35).add(1)
        player.fu.fearEffect2 = player.fu.fear.pow(0.5).add(1)

        //jocus
        player.fu.jocusEssenceToGet = player.cp.replicantiPoints.plus(1).log10().pow(2).div(100)
        player.fu.jocusEssenceToGet = player.fu.jocusEssenceToGet.mul(buyableEffect("fu", 73))

        player.fu.jocusEssenceEffect = player.fu.jocusEssence.pow(1.3).add(1)

        if (hasChallenge('fu', 11))
        {
            player.fu.defeatedJocus = true
        }
    },
    funifyReset()
    {
        player.ar.rankPoints = new Decimal(0)
        player.ar.tierPoints = new Decimal(0)
        player.ar.tetrPoints = new Decimal(0)
        player.cp.replicantiPoints = new Decimal(1)

        player.an.anonymity = new Decimal(0)

        player.pr.perkPoints = new Decimal(0)
        player.pr.buyables[11] = new Decimal(0)
        player.pr.buyables[12] = new Decimal(0)
        player.pr.buyables[13] = new Decimal(0)
        player.pr.buyables[14] = new Decimal(0)
        player.pr.buyables[15] = new Decimal(0)
        player.pr.buyables[16] = new Decimal(0)
        player.pr.buyables[17] = new Decimal(0)
        player.pr.buyables[18] = new Decimal(0)

        player.rt.repliTrees = new Decimal(0)
        player.rt.repliLeaves = new Decimal(1)

        player.rt.buyables[11] = new Decimal(0)
        player.rt.buyables[12] = new Decimal(0)
        player.rt.buyables[13] = new Decimal(0)
        player.rt.buyables[14] = new Decimal(0)
        player.rt.buyables[15] = new Decimal(0)
        player.rt.buyables[16] = new Decimal(0)
        player.rt.buyables[17] = new Decimal(0)
        player.rt.buyables[18] = new Decimal(0)

        if (!hasUpgrade("s", 15) && !inChallenge("fu", 11))
        {
            for (let i = 0; i < player.an.upgrades.length; i++) {
                if (+player.an.upgrades[i] < 24) {
                    player.an.upgrades.splice(i, 1);
                    i--;
                }
            }
        }
        
        player.rg.repliGrass = new Decimal(1)

        player.rg.buyables[11] = new Decimal(0)
        player.rg.buyables[12] = new Decimal(0)
        player.rg.buyables[13] = new Decimal(0)
        player.rg.buyables[14] = new Decimal(0)
        player.rg.buyables[15] = new Decimal(0)
        player.rg.buyables[16] = new Decimal(0)
        player.rg.buyables[17] = new Decimal(0)
        player.rg.buyables[18] = new Decimal(0)

        if (!hasUpgrade("fu", 13) && !inChallenge("fu", 11))
        {
        player.gs.grassSkip = new Decimal(0)
        }
        player.gs.grassSkippers = new Decimal(0)
        if (!hasMilestone("s", 12) && !inChallenge("fu", 11))
        {
        for (let i = 0; i < player.gs.milestones.length; i++) {
            if (+player.gs.milestones[i] < 100) {
                player.gs.milestones.splice(i, 1);
                i--;
            }
        }
        }
        player.gs.buyables[11] = new Decimal(0)
        player.gs.buyables[12] = new Decimal(0)
        player.gs.buyables[13] = new Decimal(0)
        player.gs.buyables[14] = new Decimal(0)
        player.gs.buyables[15] = new Decimal(0)
        player.gs.buyables[16] = new Decimal(0)
        player.gs.buyables[17] = new Decimal(0)
        player.gs.buyables[18] = new Decimal(0)

        //oil
        player.oi.oil = new Decimal(0)

        player.oi.linkingPower = [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),]
        player.oi.linkerChoice = new Decimal(0)

        player.oi.protoMemories = new Decimal(0)
        player.oi.protoMemorySeconds = new Decimal(0)

        player.oi.buyables[11] = new Decimal(0)
        player.oi.buyables[12] = new Decimal(0)
        player.oi.buyables[13] = new Decimal(0)
        player.oi.buyables[14] = new Decimal(0)
        player.oi.buyables[15] = new Decimal(0)
        player.oi.buyables[16] = new Decimal(0)
        player.oi.buyables[17] = new Decimal(0)
        player.oi.buyables[18] = new Decimal(0)
        player.oi.buyables[19] = new Decimal(0)

        if (!hasUpgrade("fu", 13) && !inChallenge("fu", 11))
        {
        player.oi.buyables[21] = new Decimal(0)
        player.oi.buyables[22] = new Decimal(0)
        player.oi.buyables[23] = new Decimal(0)
        player.oi.buyables[24] = new Decimal(0)
        }

        for (let i = 0; i < player.cp.upgrades.length; i++) {
            if (+player.cp.upgrades[i] < 19) {
                player.cp.upgrades.splice(i, 1);
                i--;
            }
        }
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "cp"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.fu.fMax == false },
            unlocked() { return true },
            onClick() {
                player.fu.fMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.fu.fMax == true  },
            unlocked() { return true },
            onClick() {
                player.fu.fMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        
        11: {
            title() { return "<h3>Reset all alt-uni 1 content for fun<br>(Based on oil)" },
            canClick() { return player.fu.funToGet.gte(1) },
            unlocked() { return true },
            onClick() {
                player.fu.funifyPause = new Decimal(4)
                player.fu.fun = player.fu.fun.add(player.fu.funToGet)
            },
            style: { width: '600px', "min-height": '100px', borderRadius: '15px' },

        },
        12: {
            title() { return "<h3>LETS HAVE SOME FUN :)<br>(Req: 100 fun)" },
            canClick() { return player.fu.fun.gte(100) },
            unlocked() { return !player.fu.jocusCelestialActivate },
            onClick() {
                player.fu.jocusCelestialActivate = true
            },
            style: { width: '300px', "min-height": '100px', borderRadius: '15px' },

        },
        23: {
            title() { return "<img src='resources/happy.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.fu.emotionIndex = new Decimal(0)
            },
            style: { width: '100px', "min-height": '100px', "background-color": "#fff654", borderRadius: "10px" },
            branches: [24],

        },
        24: {
            title() { return "<img src='resources/sad.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.fu.emotionIndex = new Decimal(1)
            },
            style: { width: '100px', "min-height": '100px', "background-color": "#322bff", borderRadius: "10px"  },
            branches: [25],

        },
        25: {
            title() { return "<img src='resources/angry.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.fu.emotionIndex = new Decimal(2)
            },
            style: { width: '100px', "min-height": '100px', "background-color": "#ff2b3d", borderRadius: "10px" },
            branches() {
                return inChallenge("fu", 11) ? [26] : [23]
            } 

        },
        26: {
            title() { return "<img src='resources/fear.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>" },
            canClick() { return true },
            unlocked() { return inChallenge("fu", 11) },
            onClick() {
                player.fu.emotionIndex = new Decimal(3)
            },
            style: { width: '100px', "min-height": '100px', "background-color": "grey", borderRadius: "10px" },
            branches: [23],

        },
        4: {
            title() { return "Reset All Emotions" },
            canClick() { return true  },
            unlocked() { return true },
            onClick() {
                player.fu.happiness = new Decimal(0)
                player.fu.sadness = new Decimal(0)
                player.fu.anger = new Decimal(0)
                player.fu.fear = new Decimal(0)
            },
            style() {
                let lookies = {width: '100px', minHeight: '50px', borderRadius: '10px 0px 0px 10px'}
                if (player.fu.emotionIndex.eq(0)) lookies.backgroundColor = "#fcff04", lookies.color = "black"
                if (player.fu.emotionIndex.eq(1)) lookies.backgroundColor = "blue", lookies.color = "white"
                if (player.fu.emotionIndex.eq(2)) lookies.backgroundColor = "red", lookies.color = "white"
                if (player.fu.emotionIndex.eq(3)) lookies.backgroundColor = "grey", lookies.color = "white"
                return lookies
            } 
        },
        5: {
            title() { return "Reset This Emotion" },
            canClick() { return true  },
            unlocked() { return true },
            onClick() {
                if (player.fu.emotionIndex.eq(0)) player.fu.happiness = new Decimal(0)
                if (player.fu.emotionIndex.eq(1)) player.fu.sadness = new Decimal(0)
                if (player.fu.emotionIndex.eq(2)) player.fu.anger = new Decimal(0)
                if (player.fu.emotionIndex.eq(3)) player.fu.fear = new Decimal(0)
            },
            style() {
                let lookies = {width: '100px', minHeight: '50px'}
                if (player.fu.emotionIndex.eq(0)) lookies.backgroundColor = "#fcff04", lookies.color = "black", lookies.borderRadius = "0px"
                if (player.fu.emotionIndex.eq(1)) lookies.backgroundColor = "blue", lookies.color = "white", lookies.borderRadius = "0px"
                if (player.fu.emotionIndex.eq(2)) lookies.backgroundColor = "red", lookies.color = "white", lookies.borderRadius = "0px"
                if (player.fu.emotionIndex.eq(3)) lookies.backgroundColor = "grey", lookies.color = "white", lookies.borderRadius = "0px 10px 10px 0px"
                return lookies
            }
        },
        14: {
            title() { return "Unpause Production" },
            canClick() { return player.fu.happinessProduce == false },
            unlocked() { return player.fu.emotionIndex.eq(0) },
            onClick() {
                player.fu.happinessProduce = true
            },
            style: { width: '150px', "min-height": '50px', borderRadius: '0px'}
        },
        15: {
            title() { return "Pause Production" },
            canClick() { return player.fu.happinessProduce == true  },
            unlocked() { return player.fu.emotionIndex.eq(0) },
            onClick() {
                player.fu.happinessProduce = false
            },
            style: { width: '150px', "min-height": '50px', borderRadius: '0px 10px 10px 0px'}
        },
        16: {
            title() { return "Unpause Production" },
            canClick() { return player.fu.sadnessProduce == false },
            unlocked() { return player.fu.emotionIndex.eq(1) },
            onClick() {
                player.fu.sadnessProduce = true
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0px"}
                this.canClick() ? look.backgroundColor = "blue" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        17: {
            title() { return "Pause Production" },
            canClick() { return player.fu.sadnessProduce == true  },
            unlocked() { return player.fu.emotionIndex.eq(1) },
            onClick() {
                player.fu.sadnessProduce = false
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0px 10px 10px 0px"}
                this.canClick() ? look.backgroundColor = "blue" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        18: {
            title() { return "Unpause Production" },
            canClick() { return player.fu.angerProduce == false },
            unlocked() { return player.fu.emotionIndex.eq(2) },
            onClick() {
                player.fu.angerProduce = true
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0px"}
                this.canClick() ? look.backgroundColor = "red" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        19: {
            title() { return "Pause Production" },
            canClick() { return player.fu.angerProduce == true  },
            unlocked() { return player.fu.emotionIndex.eq(2) },
            onClick() {
                player.fu.angerProduce = false
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0px 10px 10px 0px"}
                this.canClick() ? look.backgroundColor = "red" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        31: {
            title() { return "<h3>Reset all alt-uni 1 content for jocus essence<br>(Based on replicanti points)" },
            canClick() { return player.fu.jocusEssenceToGet.gte(1) },
            unlocked() { return inChallenge("fu", 11) },
            onClick() {
                player.fu.funifyPause = new Decimal(12)
                for (let i = 0; i < player.an.upgrades.length; i++) {
                    if (+player.an.upgrades[i] < 24) {
                        player.an.upgrades.splice(i, 1);
                        i--;
                    }
                }
                for (let i = 0; i < player.gs.milestones.length; i++) {
                    if (+player.gs.milestones[i] < 100) {
                        player.gs.milestones.splice(i, 1);
                        i--;
                    }
                }
                player.fu.jocusEssence = player.fu.jocusEssence.add(player.fu.jocusEssenceToGet)
            },
            style: { width: '400px', "min-height": '75px', borderRadius: '15px' },

        },
    },
    bars: {
        replicantiBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 400,
            height: 25,
            progress() {
                return player.cp.replicantiPointsTimer.div(player.cp.replicantiPointsTimerReq)
            },
            fillStyle: {
                "background-color": "#193ceb",
            },
            display() {
                return "Time: " + formatTime(player.cp.replicantiPointsTimer) + "/" + formatTime(player.cp.replicantiPointsTimerReq);
            },
        },
    },
    upgrades: {
        11:
        {
            title: "Fun Upgrade I",
            unlocked() { return player.fu.jocusCelestialActivate },
            description: "Boost perk point gain based on anonymity.",
            cost: new Decimal(3000),
            currencyLocation() { return player.fu },
            currencyDisplayName: "Fun",
            currencyInternalName: "fun",
            effect() {
                return player.an.anonymity.pow(0.06).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12:
        {
            title: "Fun Upgrade II",
            unlocked() { return hasUpgrade("fu", 11) },
            description: "Boost oil gain based on perk point chance.",
            cost: new Decimal(7000),
            currencyLocation() { return player.fu },
            currencyDisplayName: "Fun",
            currencyInternalName: "fun",
            effect() {
                return player.pr.perkPointsChance.add(1).pow(1.6)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13:
        {
            title: "Fun Upgrade III",
            unlocked() { return hasUpgrade("fu", 12) },
            description: "Keep grass-skip and proto memory buyables on funify reset.",
            cost: new Decimal(25000),
            currencyLocation() { return player.fu },
            currencyDisplayName: "Fun",
            currencyInternalName: "fun",
        },
        14:
        {
            title: "Fun Upgrade IV",
            unlocked() { return hasUpgrade("fu", 13) },
            description: "Boost proto memory production seconds based on time played.",
            cost: new Decimal(70000),
            currencyLocation() { return player.fu },
            currencyDisplayName: "Fun",
            currencyInternalName: "fun",
            effect() {
                return player.timePlayed*0.000001 + 1
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15:
        {
            title: "Fun Upgrade V",
            unlocked() { return hasUpgrade("fu", 14) },
            description: "Unlock the mood triangle.",
            cost: new Decimal(500000),
            currencyLocation() { return player.fu },
            currencyDisplayName: "Fun",
            currencyInternalName: "fun",
        },
        16:
        {
            title: "Fun Upgrade VI",
            unlocked() { return hasUpgrade("fu", 15) },
            description: "Keep grass-skip and proto memory buyables on singularity reset.",
            cost: new Decimal(10000000),
            currencyLocation() { return player.fu },
            currencyDisplayName: "Fun",
            currencyInternalName: "fun",
        },
        17:
        {
            title: "Fun Upgrade VII",
            unlocked() { return hasUpgrade("fu", 16) },
            description: "...",
            cost: new Decimal(300000000),
            currencyLocation() { return player.fu },
            currencyDisplayName: "Fun",
            currencyInternalName: "fun",
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1.08).pow(x || getBuyableAmount(this.layer, this.id)).mul(10)},
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            canAfford() { return player.fu.fun.gte(this.cost()) },
            title() {
                return "Fun SFRGT Generation"
            },
            display() {
                return "which are producing +" + format(tmp[this.layer].buyables[this.id].effect) + " SFRGT per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun."
            },
            buy(mult) {
                let base = new Decimal(10)
                let growth = 1.08
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.fun = player.fu.fun.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.fun, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.fun = player.fu.fun.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },
        12: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(100000)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).pow(0.6).add(1) },
            unlocked() { return true },
            canAfford() { return player.s.singularityPoints.gte(this.cost()) },
            title() {
                return "Singularity SFRGT Generation"
            },
            display() {
                return "which are boosting SFRGT gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SP."
            },
            buy(mult) {
                let base = new Decimal(100000)
                let growth = 1.1
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.s.singularityPoints = player.s.singularityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.s.singularityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.s.singularityPoints = player.s.singularityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },
        13: {
            cost(x) { return new Decimal(10).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e50)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return "Infinity SFRGT Generation"
            },
            display() {
                return "which are boosting SFRGT gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP."
            },
            buy(mult) {
                let base = new Decimal(1e50)
                let growth = 10
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },
        14: {
            cost(x) { return new Decimal(1000).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e70)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.gh.steel.gte(this.cost()) },
            title() {
                return "Steel SFRGT Generation"
            },
            display() {
                return "which are boosting SFRGT gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel."
            },
            buy(mult) {
                let base = new Decimal(1e70)
                let growth = 1000
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.gh.steel = player.gh.steel.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.gh.steel, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.gh.steel = player.gh.steel.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },
        15: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(100)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            canAfford() { return player.fu.sfrgt.gte(this.cost()) },
            title() {
                return "SFRGT Fun Generation"
            },
            display() {
                return "which are boosting fun gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SFRGT."
            },
            buy(mult) {
                let base = new Decimal(100)
                let growth = 1.1
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.sfrgt = player.fu.sfrgt.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.sfrgt, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.sfrgt = player.fu.sfrgt.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },
        16: {
            cost(x) { return new Decimal(1.15).pow(x || getBuyableAmount(this.layer, this.id)).mul(200)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).pow(0.6).add(1) },
            unlocked() { return true },
            canAfford() { return player.fu.sfrgt.gte(this.cost()) },
            title() {
                return "SFRGT SP Generation"
            },
            display() {
                return "which are boosting SP gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SFRGT."
            },
            buy(mult) {
                let base = new Decimal(200)
                let growth = 1.15
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.sfrgt = player.fu.sfrgt.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.sfrgt, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.sfrgt = player.fu.sfrgt.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },
        17: {
            cost(x) { return new Decimal(1.05).pow(x || getBuyableAmount(this.layer, this.id)).mul(300)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).pow(1.8).add(1) },
            unlocked() { return true },
            canAfford() { return player.fu.sfrgt.gte(this.cost()) },
            title() {
                return "SFRGT IP Generation"
            },
            display() {
                return "which are boosting IP gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SFRGT."
            },
            buy(mult) {
                let base = new Decimal(300)
                let growth = 1.05
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.sfrgt = player.fu.sfrgt.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.sfrgt, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.sfrgt = player.fu.sfrgt.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },
        18: {
            cost(x) { return new Decimal(1.04).pow(x || getBuyableAmount(this.layer, this.id)).mul(400)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.15).pow(2.4).add(1) },
            unlocked() { return true },
            canAfford() { return player.fu.sfrgt.gte(this.cost()) },
            title() {
                return "SFRGT Steel Generation"
            },
            display() {
                return "which are boosting steel gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SFRGT."
            },
            buy(mult) {
                let base = new Decimal(400)
                let growth = 1.04
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.sfrgt = player.fu.sfrgt.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.sfrgt, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.sfrgt = player.fu.sfrgt.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },

        21: {
            cost(x) { return new Decimal(1.06).pow(x || getBuyableAmount(this.layer, this.id)).mul(3)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(5).pow(1.75).add(1) },
            unlocked() { return true },
            canAfford() { return player.fu.fun.gte(this.cost()) },
            title() {
                return "Fun Ranks"
            },
            display() {
                return "which are boosting rank, tier, and tetr point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun."
            },
            buy(mult) {
                let base = new Decimal(3)
                let growth = 1.06
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.fun = player.fu.fun.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.fun, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.fun = player.fu.fun.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },
        22: {
            cost(x) { return new Decimal(1.08).pow(x || getBuyableAmount(this.layer, this.id)).mul(5)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(10).pow(1.8).add(1) },
            unlocked() { return true },
            canAfford() { return player.fu.fun.gte(this.cost()) },
            title() {
                return "Fun Softcap"
            },
            display() {
                return "which are extending and weakening both replicanti point softcaps by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun."
            },
            buy(mult) {
                let base = new Decimal(5)
                let growth = 1.08
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.fun = player.fu.fun.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.fun, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.fun = player.fu.fun.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },
        23: {
            cost(x) { return new Decimal(1.15).pow(x || getBuyableAmount(this.layer, this.id)).mul(7)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.15).pow(0.95).add(1) },
            unlocked() { return true },
            canAfford() { return player.fu.fun.gte(this.cost()) },
            title() {
                return "Fun Repli-Grass"
            },
            display() {
                return "which are boosting repli-grass mult by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun."
            },
            buy(mult) {
                let base = new Decimal(7)
                let growth = 1.15
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.fun = player.fu.fun.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.fun, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.fun = player.fu.fun.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },
        24: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(12)},
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            canAfford() { return player.fu.fun.gte(this.cost()) },
            title() {
                return "Fun Grass-Skip"
            },
            display() {
                return "which are adding " + formatWhole(tmp[this.layer].buyables[this.id].effect) + " additional grass-skips.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun."
            },
            buy(mult) {
                let base = new Decimal(12)
                let growth = 1.4
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.fun = player.fu.fun.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.fun, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.fun = player.fu.fun.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },
        

        //happiness
        31: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(100000)},
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return player.fu.emotionIndex.eq(0) },
            canAfford() { return player.fu.fun.gte(this.cost()) },
            title() {
                return "Happiness Generator"
            },
            display() {
                return "which are generating " + format(tmp[this.layer].buyables[this.id].effect) + " happiness per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun."
            },
            buy(mult) {
                let base = new Decimal(100000)
                let growth = 1.1
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.fun = player.fu.fun.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.fun, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.fun = player.fu.fun.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },
        32: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(10)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.6).mul(0.01).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(0) },
            canAfford() { return player.fu.happiness.gte(this.cost()) },
            title() {
                return "Factor Power Exponentiator"
            },
            display() {
                return "which are raising factor power gain to the ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Happiness."
            },
            buy(mult) {
                let base = new Decimal(10)
                let growth = 1.5
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.happiness = player.fu.happiness.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.happiness, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.happiness = player.fu.happiness.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },
        33: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(20)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.8).mul(0.01).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(0) },
            canAfford() { return player.fu.happiness.gte(this.cost()) },
            title() {
                return "Prestige Exponentiator"
            },
            display() {
                return "which are raising prestige point gain to the ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Happiness."
            },
            buy(mult) {
                let base = new Decimal(20)
                let growth = 1.4
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.happiness = player.fu.happiness.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.happiness, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.happiness = player.fu.happiness.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },
        34: {
            cost(x) { return new Decimal(1.6).pow(x || getBuyableAmount(this.layer, this.id)).mul(50)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.4).mul(0.01).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(0) },
            canAfford() { return player.fu.happiness.gte(this.cost()) },
            title() {
                return "Grasshop Exponentiator"
            },
            display() {
                return "which are raising grasshopper gain to the ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Happiness."
            },
            buy(mult) {
                let base = new Decimal(50)
                let growth = 1.6
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.happiness = player.fu.happiness.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.happiness, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.happiness = player.fu.happiness.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },
        35: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(10)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.3).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(0) },
            canAfford() { return player.fu.happiness.gte(this.cost()) },
            title() {
                return "Sadness Boost"
            },
            display() {
                return "which are boosting sadness gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Happiness."
            },
            buy(mult) {
                let base = new Decimal(10)
                let growth = 1.25
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.happiness = player.fu.happiness.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.happiness, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.happiness = player.fu.happiness.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },
        36: {
            cost(x) { return new Decimal(1.45).pow(x || getBuyableAmount(this.layer, this.id)).mul(30)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(0) },
            canAfford() { return player.fu.happiness.gte(this.cost()) },
            title() {
                return "Replicanti Pointer"
            },
            display() {
                return "which are multiplying replicanti point mult post softcap by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Happiness."
            },
            buy(mult) {
                let base = new Decimal(30)
                let growth = 1.45
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.happiness = player.fu.happiness.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.happiness, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.happiness = player.fu.happiness.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },
        37: {
            cost(x) { return new Decimal(1.15).pow(x || getBuyableAmount(this.layer, this.id)).mul(70)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.75).mul(0.5).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(0) },
            canAfford() { return player.fu.happiness.gte(this.cost()) },
            title() {
                return "Perk Pointer"
            },
            display() {
                return "which are multiplying perk point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Happiness."
            },
            buy(mult) {
                let base = new Decimal(70)
                let growth = 1.15
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.happiness = player.fu.happiness.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.happiness, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.happiness = player.fu.happiness.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },
        38: {
            cost(x) { return new Decimal(1.8).pow(x || getBuyableAmount(this.layer, this.id)).mul(1000)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(0) },
            canAfford() { return player.fu.happiness.gte(this.cost()) },
            title() {
                return "Funner"
            },
            display() {
                return "which are multiplying fun gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Happiness."
            },
            buy(mult) {
                let base = new Decimal(1000)
                let growth = 1.8
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.happiness = player.fu.happiness.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.happiness, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.happiness = player.fu.happiness.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', }
        },

        //sadness
        41: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(100000)},
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return player.fu.emotionIndex.eq(1) },
            canAfford() { return player.fu.fun.gte(this.cost()) },
            title() {
                return "Sadness Generator"
            },
            display() {
                return "which are generating " + format(tmp[this.layer].buyables[this.id].effect) + " sadness per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun."
            },
            buy(mult) {
                let base = new Decimal(100000)
                let growth = 1.1
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.fun = player.fu.fun.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.fun, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.fun = player.fu.fun.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "blue", color: "white" }
        },
        42: {
            cost(x) { return new Decimal(1.75).pow(x || getBuyableAmount(this.layer, this.id)).mul(5)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.35).mul(0.01).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(1) },
            canAfford() { return player.fu.sadness.gte(this.cost()) },
            title() {
                return "Infinity Dimension Exponentiator"
            },
            display() {
                return "which are raising infinity dimension production to the ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Sadness."
            },
            buy(mult) {
                let base = new Decimal(5)
                let growth = 1.75
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.sadness = player.fu.sadness.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.sadness, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.sadness = player.fu.sadness.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "blue", color: "white" }
        },
        43: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(15)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(5).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(1) },
            canAfford() { return player.fu.sadness.gte(this.cost()) },
            title() {
                return "Mastery Multiplier"
            },
            display() {
                return "which boosting all mastery point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Sadness."
            },
            buy(mult) {
                let base = new Decimal(15)
                let growth = 1.3
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.sadness = player.fu.sadness.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.sadness, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.sadness = player.fu.sadness.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "blue", color: "white" }
        },
        44: {
            cost(x) { return new Decimal(1.8).pow(x || getBuyableAmount(this.layer, this.id)).mul(35)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.5).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(1) },
            canAfford() { return player.fu.sadness.gte(this.cost()) },
            title() {
                return "Galactic Multiplier"
            },
            display() {
                return "which boosting galaxy dust gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Sadness."
            },
            buy(mult) {
                let base = new Decimal(35)
                let growth = 1.8
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.sadness = player.fu.sadness.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.sadness, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.sadness = player.fu.sadness.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "blue", color: "white" }
        },
        45: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(10)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.3).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(1) },
            canAfford() { return player.fu.sadness.gte(this.cost()) },
            title() {
                return "Anger Boost"
            },
            display() {
                return "which are boosting anger gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Sadness."
            },
            buy(mult) {
                let base = new Decimal(10)
                let growth = 1.25
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.sadness = player.fu.sadness.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.sadness, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.sadness = player.fu.sadness.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "blue", color: "white" }
        },
        46: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(30)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(2).mul(0.6).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(1) },
            canAfford() { return player.fu.sadness.gte(this.cost()) },
            title() {
                return "Anonymiter"
            },
            display() {
                return "which are boosting anonymity gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Sadness."
            },
            buy(mult) {
                let base = new Decimal(30)
                let growth = 1.3
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.sadness = player.fu.sadness.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.sadness, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.sadness = player.fu.sadness.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "blue", color: "white" }
        },
        47: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(140)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(3).mul(0.6).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(1) },
            canAfford() { return player.fu.sadness.gte(this.cost()) },
            title() {
                return "Repli-Treer"
            },
            display() {
                return "which are extending repli-tree softcap by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Sadness."
            },
            buy(mult) {
                let base = new Decimal(140)
                let growth = 1.5
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.sadness = player.fu.sadness.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.sadness, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.sadness = player.fu.sadness.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "blue", color: "white" }
        },
        48: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(1000)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(1) },
            canAfford() { return player.fu.sadness.gte(this.cost()) },
            title() {
                return "SFRGTer"
            },
            display() {
                return "which are boosting SFRGT gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Sadness."
            },
            buy(mult) {
                let base = new Decimal(1000)
                let growth = 1.5
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.sadness = player.fu.sadness.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.sadness, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.sadness = player.fu.sadness.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "blue", color: "white" }
        },

        //anger
        51: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(100000)},
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return player.fu.emotionIndex.eq(2) },
            canAfford() { return player.fu.fun.gte(this.cost()) },
            title() {
                return "Anger Generator"
            },
            display() {
                return "which are generating " + format(tmp[this.layer].buyables[this.id].effect) + " anger per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun."
            },
            buy(mult) {
                let base = new Decimal(100000)
                let growth = 1.1
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.fun = player.fu.fun.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.fun, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.fun = player.fu.fun.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "red", color: "white" }
        },
        52: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(15)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.2).mul(0.1).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(2) },
            canAfford() { return player.fu.anger.gte(this.cost()) },
            title() {
                return "Radiation Multiplier"
            },
            display() {
                return "which boosting radiation gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anger."
            },
            buy(mult) {
                let base = new Decimal(15)
                let growth = 1.4
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.anger = player.fu.anger.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.anger, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.anger = player.fu.anger.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "red", color: "white" }
        },
        53: {
            cost(x) { return new Decimal(1.45).pow(x || getBuyableAmount(this.layer, this.id)).mul(30)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.25).mul(0.15).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(2) },
            canAfford() { return player.fu.anger.gte(this.cost()) },
            title() {
                return "Singularity Dimension Multiplier"
            },
            display() {
                return "which boosting singularity dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anger."
            },
            buy(mult) {
                let base = new Decimal(30)
                let growth = 1.45
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.anger = player.fu.anger.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.anger, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.anger = player.fu.anger.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "red", color: "white" }
        },
        54: {
            cost(x) { return new Decimal(1.35).pow(x || getBuyableAmount(this.layer, this.id)).mul(60)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.5).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(2) },
            canAfford() { return player.fu.anger.gte(this.cost()) },
            title() {
                return "Radiation Usage Divider"
            },
            display() {
                return "which boosting singularity dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anger."
            },
            buy(mult) {
                let base = new Decimal(60)
                let growth = 1.35
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.anger = player.fu.anger.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.anger, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.anger = player.fu.anger.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "red", color: "white" }
        },
        55: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(10)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.3).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(2) },
            canAfford() { return player.fu.anger.gte(this.cost()) },
            title() {
                return "Happiness Boost"
            },
            display() {
                return "which are boosting happiness gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anger."
            },
            buy(mult) {
                let base = new Decimal(10)
                let growth = 1.25
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.anger = player.fu.anger.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.anger, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.anger = player.fu.anger.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "red", color: "white" }
        },
        56: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(40)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(3.5).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(2) },
            canAfford() { return player.fu.anger.gte(this.cost()) },
            title() {
                return "Repli-Grassier"
            },
            display() {
                return "which are extending repli-grass softcap by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anger."
            },
            buy(mult) {
                let base = new Decimal(40)
                let growth = 1.4
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.anger = player.fu.anger.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.anger, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.anger = player.fu.anger.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "red", color: "white" }
        },
        57: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(180)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.1).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(2) },
            canAfford() { return player.fu.anger.gte(this.cost()) },
            title() {
                return "Grass-Skippier"
            },
            display() {
                return "which are boosting grass-skipper gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anger."
            },
            buy(mult) {
                let base = new Decimal(180)
                let growth = 1.2
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.anger = player.fu.anger.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.anger, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.anger = player.fu.anger.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "red", color: "white" }
        },
        58: {
            cost(x) { return new Decimal(1.75).pow(x || getBuyableAmount(this.layer, this.id)).mul(1000)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.7).mul(0.1).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(2) },
            canAfford() { return player.fu.anger.gte(this.cost()) },
            title() {
                return "Mood Triangler"
            },
            display() {
                return "which are boosting all 3 emotions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anger."
            },
            buy(mult) {
                let base = new Decimal(1000)
                let growth = 1.75
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.anger = player.fu.anger.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.anger, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.anger = player.fu.anger.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "red", color: "white" }
        },

        //fear
        61: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(100000000)},
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return player.fu.emotionIndex.eq(3) },
            canAfford() { return player.fu.fun.gte(this.cost()) },
            title() {
                return "Fear Generator"
            },
            display() {
                return "which are generating " + format(tmp[this.layer].buyables[this.id].effect) + " fear per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun."
            },
            buy(mult) {
                let base = new Decimal(100000000)
                let growth = 1.2
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.fun = player.fu.fun.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.fun, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.fun = player.fu.fun.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "grey", color: "white" }
        },
        62: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(10)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(3) },
            canAfford() { return player.fu.fear.gte(this.cost()) },
            title() {
                return "Happier"
            },
            display() {
                return "which are boosting happiness gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fear."
            },
            buy(mult) {
                let base = new Decimal(10)
                let growth = 1.1
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.fear = player.fu.fear.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.fear, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.fear = player.fu.fear.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "grey", color: "white" }
        },
        63: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(10)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(3) },
            canAfford() { return player.fu.fear.gte(this.cost()) },
            title() {
                return "Sadder"
            },
            display() {
                return "which are boosting sadness gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fear."
            },
            buy(mult) {
                let base = new Decimal(10)
                let growth = 1.1
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.fear = player.fu.fear.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.fear, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.fear = player.fu.fear.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "grey", color: "white" }
        },
        64: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(10)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked() { return player.fu.emotionIndex.eq(3) },
            canAfford() { return player.fu.fear.gte(this.cost()) },
            title() {
                return "Angrier"
            },
            display() {
                return "which are boosting anger gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fear."
            },
            buy(mult) {
                let base = new Decimal(10)
                let growth = 1.1
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.fear = player.fu.fear.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.fear, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.fear = player.fu.fear.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "grey", color: "white" }
        },
        65: {
            cost(x) { return new Decimal(1.15).pow(x || getBuyableAmount(this.layer, this.id)).mul(2.5)},
            effect(x) { return new Decimal.pow(3, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return player.fu.emotionIndex.eq(3) },
            canAfford() { return player.fu.fear.gte(this.cost()) },
            title() {
                return "Softcap Extender #1"
            },
            display() {
                return "which are extending the first replicanti point by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fear."
            },
            buy(mult) {
                let base = new Decimal(2.5)
                let growth = 1.15
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.fear = player.fu.fear.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.fear, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.fear = player.fu.fear.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "grey", color: "white" }
        },
        66: {
            cost(x) { return new Decimal(1.08).pow(x || getBuyableAmount(this.layer, this.id)).mul(2.5)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(2).add(1)},
            unlocked() { return player.fu.emotionIndex.eq(3) },
            canAfford() { return player.fu.fear.gte(this.cost()) },
            title() {
                return "Softcap Weakener #1"
            },
            display() {
                return "which are weakening the first replicanti point by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fear."
            },
            buy(mult) {
                let base = new Decimal(2.5)
                let growth = 1.08
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.fear = player.fu.fear.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.fear, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.fear = player.fu.fear.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "grey", color: "white" }
        },
        67: {
            cost(x) { return new Decimal(1.17).pow(x || getBuyableAmount(this.layer, this.id)).mul(6)},
            effect(x) { return new Decimal.pow(3.5, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return player.fu.emotionIndex.eq(3) },
            canAfford() { return player.fu.fear.gte(this.cost()) },
            title() {
                return "Softcap Extender #2"
            },
            display() {
                return "which are extending the second replicanti point by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fear."
            },
            buy(mult) {
                let base = new Decimal(6)
                let growth = 1.17
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.fear = player.fu.fear.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.fear, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.fear = player.fu.fear.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "grey", color: "white" }
        },
        68: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(6)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.8).add(1)},
            unlocked() { return player.fu.emotionIndex.eq(3) },
            canAfford() { return player.fu.fear.gte(this.cost()) },
            title() {
                return "Softcap Weakener #2"
            },
            display() {
                return "which are weakening the second replicanti point by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fear."
            },
            buy(mult) {
                let base = new Decimal(6)
                let growth = 1.1
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.fear = player.fu.fear.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.fear, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.fear = player.fu.fear.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "grey", color: "white" }
        },


        //Jocus
        71: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(2)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.25).add(1)},
            unlocked() { return inChallenge("fu", 11) },
            canAfford() { return player.fu.jocusEssence.gte(this.cost()) },
            title() {
                return "Fear Multiplier"
            },
            display() {
                return "which are multiplying fear gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Jocus Essence."
            },
            buy(mult) {
                let base = new Decimal(2)
                let growth = 1.1
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.jocusEssence = player.fu.jocusEssence.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.jocusEssence, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.jocusEssence = player.fu.jocusEssence.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "grey", color: "white" }
        },
        72: {
            cost(x) { return new Decimal(1.15).pow(x || getBuyableAmount(this.layer, this.id)).mul(4)},
            effect(x) { return new Decimal.pow(7, getBuyableAmount(this.layer, this.id))},
            unlocked() { return inChallenge("fu", 11) },
            canAfford() { return player.fu.jocusEssence.gte(this.cost()) },
            title() {
                return "Grass-Skip Req Divider"
            },
            display() {
                return "which are dividing the grass-skip requirement by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Jocus Essence."
            },
            buy(mult) {
                let base = new Decimal(4)
                let growth = 1.15
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.jocusEssence = player.fu.jocusEssence.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.jocusEssence, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.jocusEssence = player.fu.jocusEssence.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "grey", color: "white" }
        },
        73: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(10)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1)},
            unlocked() { return inChallenge("fu", 11) },
            canAfford() { return player.fu.jocusEssence.gte(this.cost()) },
            title() {
                return "Jocus Essence self-boost"
            },
            display() {
                return "which are multiplying jocus essence gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Jocus Essence."
            },
            buy(mult) {
                let base = new Decimal(10)
                let growth = 1.5
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.jocusEssence = player.fu.jocusEssence.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.jocusEssence, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.jocusEssence = player.fu.jocusEssence.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "grey", color: "white" }
        },
        74: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(16)},
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01)},
            unlocked() { return inChallenge("fu", 11) },
            canAfford() { return player.fu.jocusEssence.gte(this.cost()) },
            title() {
                return "Fun Generation"
            },
            display() {
                return "which are producing " + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + "% of fun gain per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Jocus Essence."
            },
            buy(mult) {
                let base = new Decimal(16)
                let growth = 1.2
                if (mult != true)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.fu.jocusEssence = player.fu.jocusEssence.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {

                let max = Decimal.affordGeometricSeries(player.fu.jocusEssence, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id)).floor()
                player.fu.jocusEssence = player.fu.jocusEssence.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '125px', backgroundColor: "grey", color: "white" }
        },
    },
    milestones: {

    },
    challenges: {
        11: {
            name: "FEAR",
            challengeDescription() { return "<h4>Alt-Uni 1 automation from singularity milestones is disabled, and a new emotion, fear is unlocked. All pre-funify currencies are raised to the ^0.2. Replicanti point softcaps are ^2 stronger." },
            goal() { return new Decimal("10") },
            canComplete: function () { return player.gs.grassSkip.gte(10) },
            goalDescription() { return "10 Grass-Skip" },
            rewardDescription: ".",
            onEnter() {
                player.fu.funifyPause = new Decimal(12)
                for (let i = 0; i < player.an.upgrades.length; i++) {
                    if (+player.an.upgrades[i] < 24) {
                        player.an.upgrades.splice(i, 1);
                        i--;
                    }
                }
                for (let i = 0; i < player.gs.milestones.length; i++) {
                    if (+player.gs.milestones[i] < 100) {
                        player.gs.milestones.splice(i, 1);
                        i--;
                    }
                }

                if (player.fu.emotionIndex.eq(3))
                {
                    player.fu.emotionIndex = new Decimal(0)
                }
            },
            onExit() {
                player.fu.funifyPause = new Decimal(12)

                if (player.fu.emotionIndex.eq(3))
                {
                    player.fu.emotionIndex = new Decimal(0)
                }
            },
            
            style: { width: '350px', height: '275px', }

        },
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["raw-html", function () { return "You are having <h3>" + format(player.fu.fun) + "</h3> fun."  }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "which boosts oil by x" + format(player.fu.funEffect) + ", linking power by x" + format(player.fu.funEffect2) + ", and proto memories by x" + format(player.fu.funEffect3) + "."  }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You will gain <h3>" + format(player.fu.funToGet) + "</h3> fun on reset." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 11]]],
                        ["blank", "25px"],
                        ["row", [["ex-buyable", 21], ["ex-buyable", 22], ["ex-buyable", 23], ["ex-buyable", 24]]],
                        ["blank", "25px"],
                        ["row", [["clickable", 12]]],
                        ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16], ["upgrade", 17]]],
                ]

            },
            "SFRGT": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return player.fu.jocusCelestialActivate },
                content:
                [
                        ["blank", "25px"],
                        ["raw-html", function () { return "You are having <h3>" + format(player.fu.fun) + "</h3> fun."  }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have <h3>" + format(player.s.singularityPoints) + "</h3> singularity points."  }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have <h3>" + format(player.in.infinityPoints) + "</h3> infinity points."  }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have <h3>" + format(player.gh.steel) + "</h3> steel."  }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "You have <h3>" + format(player.fu.sfrgt) + "</h3> SFRGT (Super fun real good time)."  }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You are gaining <h3>" + format(player.fu.sfrgtPerSecond) + "</h3> SFRGT per second."  }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14]]],
                        ["row", [["ex-buyable", 15], ["ex-buyable", 16], ["ex-buyable", 17], ["ex-buyable", 18]]],

                ]

            },
            "Mood Triangle" : {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("fu", 15) },
                content:
                [
                        ["blank", "25px"],
                        ["row", [["clickable", 23],["blank", "25px"],["blank", "25px"], ["clickable", 26],]],
                        ["blank", "25px"],
                        ["row", [["clickable", 24],["blank", "25px"],["blank", "25px"], ["clickable", 25],]],
                        ["blank", "25px"],
                        ["raw-html", function () { return player.fu.emotionIndex.eq(0) ? "You have <h3>" + format(player.fu.happiness) + "</h3> happiness, which boosts steel gain by x" + format(player.fu.happinessEffect2) + ".": ""  }, { "color": "#fcff04", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.fu.emotionIndex.eq(0) ? "You are gaining <h3>" + format(player.fu.happinessPerSecond) + "</h3> happiness per second." : ""  }, { "color": "#fcff04", "font-size": "20px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.fu.emotionIndex.eq(0) ? "which divides anger by /<h3>" + format(player.fu.happinessEffect) + "</h3>." : ""  }, { "color": "#fcff04", "font-size": "20px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.fu.emotionIndex.eq(1) ? "You have <h3>" + format(player.fu.sadness) + "</h3> sadness, which boosts infinity points gain by x" + format(player.fu.sadnessEffect2) + "." : "" }, { "color": "#110057", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.fu.emotionIndex.eq(1) ? "You are gaining <h3>" + format(player.fu.sadnessPerSecond) + "</h3> sadness per second." : ""  }, { "color": "#110057", "font-size": "20px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.fu.emotionIndex.eq(1) ? "which divides happiness by /<h3>" + format(player.fu.sadnessEffect) + "</h3>." : ""  }, { "color": "#110057", "font-size": "20px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.fu.emotionIndex.eq(2) ? "You have <h3>" + format(player.fu.anger) + "</h3> anger, which boosts singularity point gain by x" + format(player.fu.angerEffect2) + "." : "" }, { "color": "#ff2b3d", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.fu.emotionIndex.eq(2) ? "You are gaining <h3>" + format(player.fu.angerPerSecond) + "</h3> anger per second." : ""  }, { "color": "#ff2b3d", "font-size": "20px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.fu.emotionIndex.eq(2) ? "which divides sadness by /<h3>" + format(player.fu.angerEffect) + "</h3>." : ""  }, { "color": "#ff2b3d", "font-size": "20px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.fu.emotionIndex.eq(3) ? "You have <h3>" + format(player.fu.fear) + "</h3> fear, which boosts replicanti point mult post softcap by x" + format(player.fu.fearEffect2) + "." : "" }, { "color": "grey", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.fu.emotionIndex.eq(3) ? "(Only active in challenge)" : ""  }, { "color": "grey", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.fu.emotionIndex.eq(3) ? "You are gaining <h3>" + format(player.fu.fearPerSecond) + "</h3> fear per second." : ""  }, { "color": "grey", "font-size": "20px", "font-family": "monospace" }],
                        ["raw-html", function () { return player.fu.emotionIndex.eq(3) ? "which divides fear by /<h3>" + format(player.fu.fearEffect) + "</h3>." : ""  }, { "color": "grey", "font-size": "20px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 4], ["clickable", 5], ["clickable", 14], ["clickable", 15], ["clickable", 16], ["clickable", 17], ["clickable", 18], ["clickable", 19]]],
                        ["blank", "25px"],
                        ["row", [
                        ["ex-buyable", 31], ["ex-buyable", 32], ["ex-buyable", 33], ["ex-buyable", 34], 
                        ["ex-buyable", 41], ["ex-buyable", 42], ["ex-buyable", 43], ["ex-buyable", 44], 
                        ["ex-buyable", 51], ["ex-buyable", 52], ["ex-buyable", 53], ["ex-buyable", 54],
                        ["ex-buyable", 61], ["ex-buyable", 62], ["ex-buyable", 63], ["ex-buyable", 64],  
                    ]],
                    ["row", [
                        ["ex-buyable", 35], ["ex-buyable", 36], ["ex-buyable", 37], ["ex-buyable", 38],
                        ["ex-buyable", 45], ["ex-buyable", 46], ["ex-buyable", 47], ["ex-buyable", 48], 
                        ["ex-buyable", 55], ["ex-buyable", 56], ["ex-buyable", 57], ["ex-buyable", 58], 
                        ["ex-buyable", 65], ["ex-buyable", 66], ["ex-buyable", 67], ["ex-buyable", 68],        
                    ]],
                ]

            },
            "Fear": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("fu", 17) },
                content:
                [
                        ["blank", "25px"],
                        ["row", [["challenge", 11]]],
                        ["blank", "25px"],
                        ["raw-html", function () { return inChallenge("fu", 11) ? "You have <h3>" + format(player.fu.jocusEssence) + "</h3> jocus essence, which boosts anonymity gain by x" + format(player.fu.jocusEssenceEffect) + "." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return inChallenge("fu", 11) ? "You will gain <h3>" + format(player.fu.jocusEssenceToGet) + "</h3> jocus essence on reset." : ""  }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 31]]],
                        ["blank", "25px"],  
                        ["raw-html", function () { return inChallenge("fu", 11) ? "The Jocus essence effect is only active in challenge." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [
                            ["ex-buyable", 71], ["ex-buyable", 72], ["ex-buyable", 73], ["ex-buyable", 74], 
                        ]],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.cp.replicantiPoints) + "</h3> replicanti points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("cp", 19) }
})

// hai icecreamdude-senpai :3
