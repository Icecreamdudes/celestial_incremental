addLayer("fu", {
    name() {
        return !player.fu.jocusCelestialActivate ? "Funify" : "Jocus, Celestial of Fun"
    }, // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() {
        return !player.fu.jocusCelestialActivate ? "Fu" : "☻"
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

        enterFear: false,
        jocusEssence: new Decimal(0),
        jocusEssenceEffect: new Decimal(0), //boosts anonymity
        jocusEssenceToGet: new Decimal(0),

        defeatedJocus: false,
    }
    },
    automate() {
        if (hasUpgrade("s", 22)) {
            buyBuyable('fu', 11)
            buyBuyable('fu', 12)
            buyBuyable('fu', 13)
            buyBuyable('fu', 14)
            buyBuyable('fu', 15)
            buyBuyable('fu', 16)
            buyBuyable('fu', 17)
            buyBuyable('fu', 18)
            buyBuyable('fu', 21)
            buyBuyable('fu', 22)
            buyBuyable('fu', 23)
            buyBuyable('fu', 24)
        }
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
        player.fu.funToGet = player.fu.funToGet.mul(levelableEffect("pet", 405)[2])

        player.fu.fun = player.fu.fun.add(player.fu.funToGet.mul(buyableEffect("fu", 74)))

        player.fu.funEffect = player.fu.fun.pow(0.8).add(1)
        player.fu.funEffect2 = player.fu.fun.pow(0.9).mul(2).add(1)
        
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
        player.fu.happinessPerSecond = player.fu.happinessPerSecond.mul(buyableEffect("ep1", 12))
        
        player.fu.happinessEffect = player.fu.happiness.pow(0.35).add(1)
        player.fu.happinessEffect2 = player.fu.happiness.pow(2.2).add(1)


        if (player.fu.sadnessProduce) player.fu.sadness = player.fu.sadness.add(player.fu.sadnessPerSecond.mul(delta))
        player.fu.sadnessPerSecond = buyableEffect("fu", 41)
        player.fu.sadnessPerSecond = player.fu.sadnessPerSecond.div(player.fu.angerEffect)
        player.fu.sadnessPerSecond = player.fu.sadnessPerSecond.mul(buyableEffect("fu", 35))
        player.fu.sadnessPerSecond = player.fu.sadnessPerSecond.mul(buyableEffect("fu", 58))
        player.fu.sadnessPerSecond = player.fu.sadnessPerSecond.mul(buyableEffect("fu", 63))
        player.fu.sadnessPerSecond = player.fu.sadnessPerSecond.mul(buyableEffect("ep1", 12))

        player.fu.sadnessEffect = player.fu.sadness.pow(0.35).add(1)
        player.fu.sadnessEffect2 = player.fu.sadness.pow(1.2).add(1)


        if (player.fu.angerProduce) player.fu.anger = player.fu.anger.add(player.fu.angerPerSecond.mul(delta))
        player.fu.angerPerSecond = buyableEffect("fu", 51)
        player.fu.angerPerSecond = player.fu.angerPerSecond.div(player.fu.happinessEffect)
        player.fu.angerPerSecond = player.fu.angerPerSecond.mul(buyableEffect("fu", 45))
        player.fu.angerPerSecond = player.fu.angerPerSecond.mul(buyableEffect("fu", 58))
        player.fu.angerPerSecond = player.fu.angerPerSecond.mul(buyableEffect("fu", 64))
        player.fu.angerPerSecond = player.fu.angerPerSecond.mul(buyableEffect("ep1", 12))

        player.fu.angerEffect = player.fu.anger.pow(0.35).add(1)
        player.fu.angerEffect2 = player.fu.anger.pow(0.25).div(15).add(1)

        if (player.fu.fearProduce && inChallenge("fu", 11)) player.fu.fear = player.fu.fear.add(player.fu.fearPerSecond.mul(delta))
        player.fu.fearPerSecond = buyableEffect("fu", 61)
        player.fu.fearPerSecond = player.fu.fearPerSecond.mul(buyableEffect("fu", 71))
        player.fu.fearPerSecond = player.fu.fearPerSecond.mul(buyableEffect("ep1", 12))
        player.fu.fearPerSecond = player.fu.fearPerSecond.div(player.fu.fearEffect)
        
        player.fu.fearEffect = player.fu.fear.pow(0.35).add(1)
        player.fu.fearEffect2 = player.fu.fear.pow(0.5).add(1)

        //jocus
        player.fu.jocusEssenceToGet = player.cp.replicantiPoints.plus(1).log10().pow(2).div(100)
        player.fu.jocusEssenceToGet = player.fu.jocusEssenceToGet.mul(buyableEffect("fu", 73))

        player.fu.jocusEssenceEffect = player.fu.jocusEssence.pow(1.3).add(1)

        if (hasChallenge('fu', 11)) player.fu.defeatedJocus = true
    },
    funifyReset() {
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

        if (!hasUpgrade("s", 15) || inChallenge("fu", 11)) {
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

        if (!hasUpgrade("fu", 13) || inChallenge("fu", 11)) {
            player.gs.grassSkip = new Decimal(0)
        }
        player.gs.grassSkippers = new Decimal(0)
        if (!hasMilestone("s", 12) || inChallenge("fu", 11)) {
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

        if (!hasUpgrade("fu", 13)) {
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
            title() { return "<h2>Reset all alt-uni 1 content for fun</h2><br><h3>(Based on oil)</h3>" },
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
                player.subtabs["fu"]["mood"] = "Happiness"
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
                player.subtabs["fu"]["mood"] = "Sadness"
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
                player.subtabs["fu"]["mood"] = "Anger"
            },
            style: { width: '100px', "min-height": '100px', "background-color": "#ff2b3d", borderRadius: "10px" },
            branches() {
                if (player.fu.enterFear) return [26]
                return [23]
            } 
        },
        26: {
            title() { return "<img src='resources/fear.png'style='width:calc(115%);height:calc(115%);margin:-20%'></img>" },
            canClick() { return true },
            unlocked() { return inChallenge("fu", 11) || player.fu.enterFear },
            onClick() {
                player.fu.emotionIndex = new Decimal(3)
                player.subtabs["fu"]["mood"] = "Fear"
            },
            style() {
                let look = {width: '100px', minHeight: '100px', backgroundColor: "grey", borderRadius: "10px"}
                inChallenge("fu", 11) ? look.filter = "brightness(100%)" : look.filter = "brightness(50%)"
                return look
            },
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
            title() {
                if (inChallenge("fu", 11)) {
                    return "<h2>Reset all alt-uni 1 content for jocus essence</h2><br><h3>(Based on replicanti points)</h3>"
                } else {
                    return "<h2>Reset only available in Fear Challenge.</h2>"
                }
            },
            canClick() { return player.fu.jocusEssenceToGet.gte(1) && inChallenge("fu", 11) },
            unlocked() { return inChallenge("fu", 11) || player.fu.enterFear},
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
                if (player.cp.replicantiPoints.lt(player.cp.replicantiPointCap)) {
                    return player.cp.replicantiPointsTimer.div(player.cp.replicantiPointsTimerReq)
                } else {
                    return new Decimal(1)
                }
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#193ceb"},
            display() {
                if (player.cp.replicantiPoints.lt(player.cp.replicantiPointCap)) {
                    return "Time: " + formatTime(player.cp.replicantiPointsTimer) + "/" + formatTime(player.cp.replicantiPointsTimerReq);
                } else {
                    return "<p style='color:red'>[HARDCAPPED]</p>"
                }
            },
        },
    },
    upgrades: {
        11: {
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
        12: {
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
        13: {
            title: "Fun Upgrade III",
            unlocked() { return hasUpgrade("fu", 12) },
            description: "Keep grass-skip and proto memory buyables on funify reset.",
            cost: new Decimal(25000),
            currencyLocation() { return player.fu },
            currencyDisplayName: "Fun",
            currencyInternalName: "fun",
        },
        14: {
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
        15: {
            title: "Fun Upgrade V",
            unlocked() { return hasUpgrade("fu", 14) },
            description: "Unlock the mood triangle.",
            cost: new Decimal(500000),
            currencyLocation() { return player.fu },
            currencyDisplayName: "Fun",
            currencyInternalName: "fun",
        },
        16: {
            title: "Fun Upgrade VI",
            unlocked() { return hasUpgrade("fu", 15) },
            description: "Keep grass-skip and proto memory buyables on singularity reset.",
            cost: new Decimal(10000000),
            currencyLocation() { return player.fu },
            currencyDisplayName: "Fun",
            currencyInternalName: "fun",
        },
        17: {
            title: "Fun Upgrade VII",
            unlocked() { return hasUpgrade("fu", 16) },
            description() { return hasUpgrade("fu", 17) ? "Unlock Fear." : "..." },
            cost: new Decimal(300000000),
            currencyLocation() { return player.fu },
            currencyDisplayName: "Fun",
            currencyInternalName: "fun",
        },
        18: {
            title: "Fun Upgrade VIII",
            unlocked() { return hasUpgrade("fu", 17) },
            description: "You can buy max grass-skip.",
            cost: new Decimal(1e10),
            currencyLocation() { return player.fu },
            currencyDisplayName: "Fun",
            currencyInternalName: "fun",
        },
        19: {
            title: "Fun Upgrade IX",
            unlocked() { return hasUpgrade("fu", 18) && hasUpgrade("s", 19) },
            description: "Unlock a singularity effect that buffs core scraps.",
            cost: new Decimal(1e25),
            currencyLocation() { return player.fu },
            currencyDisplayName: "Fun",
            currencyInternalName: "fun",
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.08) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.fu.fun},
            pay(amt) { player.fu.fun = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Fun SFRGT Generation"
            },
            display() {
                return "which are producing +" + format(tmp[this.layer].buyables[this.id].effect) + " SFRGT per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun."
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("s", 22)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("s", 22)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        12: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Singularity SFRGT Generation"
            },
            display() {
                return "which are boosting SFRGT gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SP."
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("s", 22)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("s", 22)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        13: {
            costBase() { return new Decimal(1e50) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Infinity SFRGT Generation"
            },
            display() {
                return "which are boosting SFRGT gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP."
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("s", 22)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("s", 22)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        14: {
            costBase() { return new Decimal(1e70) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Steel SFRGT Generation"
            },
            display() {
                return "which are boosting SFRGT gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel."
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("s", 22)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("s", 22)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        15: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.fu.sfrgt},
            pay(amt) { player.fu.sfrgt = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "SFRGT Fun Generation"
            },
            display() {
                return "which are boosting fun gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SFRGT."
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("s", 22)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("s", 22)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        16: {
            costBase() { return new Decimal(200) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(200) },
            currency() { return player.fu.sfrgt},
            pay(amt) { player.fu.sfrgt = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1).pow(0.6) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "SFRGT SP Generation"
            },
            display() {
                return "which are boosting SP gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SFRGT."
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("s", 22)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("s", 22)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        17: {
            costBase() { return new Decimal(300) },
            costGrowth() { return new Decimal(1.05) },
            purchaseLimit() { return new Decimal(450) },
            currency() { return player.fu.sfrgt},
            pay(amt) { player.fu.sfrgt = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1).pow(1.8) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "SFRGT IP Generation"
            },
            display() {
                return "which are boosting IP gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SFRGT."
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("s", 22)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("s", 22)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        18: {
            costBase() { return new Decimal(400) },
            costGrowth() { return new Decimal(1.04) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.fu.sfrgt},
            pay(amt) { player.fu.sfrgt = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.15).add(1).pow(2.4) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "SFRGT Steel Generation"
            },
            display() {
                return "which are boosting steel gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SFRGT."
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("s", 22)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("s", 22)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },

        21: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.06) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.fu.fun},
            pay(amt) { player.fu.fun = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(5).add(1).pow(1.75) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Fun Ranks"
            },
            display() {
                return "which are boosting rank, tier, and tetr point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun."
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("s", 22)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("s", 22)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        22: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.08) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.fu.fun},
            pay(amt) { player.fu.fun = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(10).add(1).pow(1.8) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Fun Softcap"
            },
            display() {
                return "which are extending and weakening both replicanti point softcaps by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun."
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("s", 22)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("s", 22)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        23: {
            costBase() { return new Decimal(7) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.fu.fun},
            pay(amt) { player.fu.fun = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.15).add(1).pow(0.95) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Fun Repli-Grass"
            },
            display() {
                return "which are boosting repli-grass mult by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun."
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("s", 22)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("s", 22)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        24: {
            costBase() { return new Decimal(12) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(500) },
            currency() { return player.fu.fun},
            pay(amt) { player.fu.fun = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Fun Grass-Skip"
            },
            display() {
                return "which are adding " + formatWhole(tmp[this.layer].buyables[this.id].effect) + " additional grass-skips.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun."
            },
            buy(mult) {
                if (mult != true && !hasUpgrade("s", 22)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasUpgrade("s", 22)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px'},
        },
        

        //happiness
        31: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.fu.fun},
            pay(amt) { player.fu.fun = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Happiness Generator"
            },
            display() {
                return "which are generating " + format(tmp[this.layer].buyables[this.id].effect) + " happiness per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun."
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
            style: { width: '275px', height: '150px'},
        },
        32: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.fu.happiness},
            pay(amt) { player.fu.happiness = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.004).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Factor Power Exponentiator"
            },
            display() {
                return "which are raising factor power gain to the ^" + format(tmp[this.layer].buyables[this.id].effect, 3) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Happiness."
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
            style: { width: '275px', height: '150px'},
        },
        33: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.fu.happiness},
            pay(amt) { player.fu.happiness = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.002).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Prestige Exponentiator"
            },
            display() {
                return "which are raising prestige point gain to the ^" + format(tmp[this.layer].buyables[this.id].effect, 3) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Happiness."
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
            style: { width: '275px', height: '150px'},
        },
        34: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.fu.happiness},
            pay(amt) { player.fu.happiness = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.001).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grasshop Exponentiator"
            },
            display() {
                return "which are raising grasshopper gain to the ^" + format(tmp[this.layer].buyables[this.id].effect, 3) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Happiness."
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
            style: { width: '275px', height: '150px'},
        },
        35: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.fu.happiness},
            pay(amt) { player.fu.happiness = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.3).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Sadness Boost"
            },
            display() {
                return "which are boosting sadness gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Happiness."
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
            style: { width: '275px', height: '150px'},
        },
        36: {
            costBase() { return new Decimal(30) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.fu.happiness},
            pay(amt) { player.fu.happiness = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Replicanti Pointer"
            },
            display() {
                return "which are multiplying replicanti point mult post softcap by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Happiness."
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
            style: { width: '275px', height: '150px'},
        },
        37: {
            costBase() { return new Decimal(70) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.fu.happiness},
            pay(amt) { player.fu.happiness = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(1.5) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Perk Pointer"
            },
            display() {
                return "which are multiplying perk point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Happiness."
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
            style: { width: '275px', height: '150px'},
        },
        38: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.6) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.fu.happiness},
            pay(amt) { player.fu.happiness = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.1, getBuyableAmount(this.layer, this.id)) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Funner"
            },
            display() {
                return "which are multiplying fun gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Happiness."
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
            style: { width: '275px', height: '150px'},
        },

        //sadness
        41: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.fu.fun},
            pay(amt) { player.fu.fun = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Sadness Generator"
            },
            display() {
                return "which are generating " + format(tmp[this.layer].buyables[this.id].effect) + " sadness per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun."
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
            style: { width: '275px', height: '150px', backgroundColor: "blue", color: "white"},
        },
        42: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.6) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.fu.sadness},
            pay(amt) { player.fu.sadness = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.001).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Infinity Dimension Exponentiator"
            },
            display() {
                return "which are raising infinity dimension production to the ^" + format(tmp[this.layer].buyables[this.id].effect, 3) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Sadness."
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
            style: { width: '275px', height: '150px', backgroundColor: "blue", color: "white"},
        },
        43: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.fu.sadness},
            pay(amt) { player.fu.sadness = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.5, getBuyableAmount(this.layer, this.id)) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Mastery Multiplier"
            },
            display() {
                return "which boosting all mastery point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Sadness."
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
            style: { width: '275px', height: '150px', backgroundColor: "blue", color: "white"},
        },
        44: {
            costBase() { return new Decimal(35) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.fu.sadness},
            pay(amt) { player.fu.sadness = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.1, getBuyableAmount(this.layer, this.id)) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Galactic Multiplier"
            },
            display() {
                return "which boosting galaxy dust gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Sadness."
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
            style: { width: '275px', height: '150px', backgroundColor: "blue", color: "white"},
        },
        45: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.fu.sadness},
            pay(amt) { player.fu.sadness = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.3).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Anger Boost"
            },
            display() {
                return "which are boosting anger gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Sadness."
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
            style: { width: '275px', height: '150px', backgroundColor: "blue", color: "white"},
        },
        46: {
            costBase() { return new Decimal(30) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.fu.sadness},
            pay(amt) { player.fu.sadness = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(2) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Anonymiter"
            },
            display() {
                return "which are boosting anonymity gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Sadness."
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
            style: { width: '275px', height: '150px', backgroundColor: "blue", color: "white"},
        },
        47: {
            costBase() { return new Decimal(140) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.fu.sadness},
            pay(amt) { player.fu.sadness = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(2.8) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Repli-Treer"
            },
            display() {
                return "which are extending repli-tree softcap by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Sadness."
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
            style: { width: '275px', height: '150px', backgroundColor: "blue", color: "white"},
        },
        48: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.6) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.fu.sadness},
            pay(amt) { player.fu.sadness = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.1, getBuyableAmount(this.layer, this.id)) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "SFRGTer"
            },
            display() {
                return "which are boosting SFRGT gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Sadness."
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
            style: { width: '275px', height: '150px', backgroundColor: "blue", color: "white"},
        },

        //anger
        51: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.fu.fun},
            pay(amt) { player.fu.fun = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Anger Generator"
            },
            display() {
                return "which are generating " + format(tmp[this.layer].buyables[this.id].effect) + " anger per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun."
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
            style: { width: '275px', height: '150px', backgroundColor: "red", color: "white"},
        },
        52: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.fu.anger},
            pay(amt) { player.fu.anger = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Radiation Multiplier"
            },
            display() {
                return "which boosting radiation gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anger."
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
            style: { width: '275px', height: '150px', backgroundColor: "red", color: "white"},
        },
        53: {
            costBase() { return new Decimal(30) },
            costGrowth() { return new Decimal(1.45) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.fu.anger},
            pay(amt) { player.fu.anger = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.04).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Singularity Dimension Multiplier"
            },
            display() {
                return "which boosting singularity dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anger."
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
            style: { width: '275px', height: '150px', backgroundColor: "red", color: "white"},
        },
        54: {
            costBase() { return new Decimal(60) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.fu.anger},
            pay(amt) { player.fu.anger = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Singularity Power Multiplier"
            },
            display() {
                return "which boosting singularity power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anger."
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
            style: { width: '275px', height: '150px', backgroundColor: "red", color: "white"},
        },
        55: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.fu.anger},
            pay(amt) { player.fu.anger = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.3).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Happiness Boost"
            },
            display() {
                return "which are boosting happiness gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anger."
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
            style: { width: '275px', height: '150px', backgroundColor: "red", color: "white"},
        },
        56: {
            costBase() { return new Decimal(40) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.fu.anger},
            pay(amt) { player.fu.anger = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(3) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Repli-Grassier"
            },
            display() {
                return "which are extending repli-grass softcap by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anger."
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
            style: { width: '275px', height: '150px', backgroundColor: "red", color: "white"},
        },
        57: {
            costBase() { return new Decimal(180) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.fu.anger},
            pay(amt) { player.fu.anger = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(1.1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass-Skippier"
            },
            display() {
                return "which are boosting grass-skipper gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anger."
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
            style: { width: '275px', height: '150px', backgroundColor: "red", color: "white"},
        },
        58: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.6) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.fu.anger},
            pay(amt) { player.fu.anger = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Mood Triangler"
            },
            display() {
                return "which are boosting all 3 emotions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Anger."
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
            style: { width: '275px', height: '150px', backgroundColor: "red", color: "white"},
        },

        //fear
        61: {
            costBase() { return new Decimal(100000000) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.fu.fun},
            pay(amt) { player.fu.fun = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Fear Generator"
            },
            display() {
                return "which are generating " + format(tmp[this.layer].buyables[this.id].effect) + " fear per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fun."
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
            style() {
                let look = {width: "275px", height: "150px", backgroundColor: "grey", color: "white"}
                if (inChallenge("fu", 11)) {look.filter = "brightness(100%)"} else {look.filter = "brightness(50%)"}
                return look
            },
        },
        62: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.fu.fear},
            pay(amt) { player.fu.fear = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Happier"
            },
            display() {
                return "which are boosting happiness gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fear."
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
            style: { width: '275px', height: '150px', backgroundColor: "gray", color: "white"},
        },
        63: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.fu.fear},
            pay(amt) { player.fu.fear = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Sadder"
            },
            display() {
                return "which are boosting sadness gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fear."
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
            style: { width: '275px', height: '150px', backgroundColor: "gray", color: "white"},
        },
        64: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.fu.fear},
            pay(amt) { player.fu.fear = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.2).add(1) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Angrier"
            },
            display() {
                return "which are boosting anger gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fear."
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
            style: { width: '275px', height: '150px', backgroundColor: "gray", color: "white"},
        },
        65: {
            costBase() { return new Decimal(2.5) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.fu.fear},
            pay(amt) { player.fu.fear = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(3, getBuyableAmount(this.layer, this.id)) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Softcap Extender #1"
            },
            display() {
                return "which are extending the first replicanti point by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fear."
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
            style: { width: '275px', height: '150px', backgroundColor: "gray", color: "white"},
        },
        66: {
            costBase() { return new Decimal(2.5) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.fu.fear},
            pay(amt) { player.fu.fear = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(2.25) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Softcap Weakener #1"
            },
            display() {
                return "which are weakening the first replicanti point by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fear."
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
            style: { width: '275px', height: '150px', backgroundColor: "gray", color: "white"},
        },
        67: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.175) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.fu.fear},
            pay(amt) { player.fu.fear = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(3.5, getBuyableAmount(this.layer, this.id)) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Softcap Extender #2"
            },
            display() {
                return "which are extending the second replicanti point by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fear."
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
            style: { width: '275px', height: '150px', backgroundColor: "gray", color: "white"},
        },
        68: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.225) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.fu.fear},
            pay(amt) { player.fu.fear = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(2) },
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Softcap Weakener #2"
            },
            display() {
                return "which are weakening the second replicanti point by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fear."
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
            style: { width: '275px', height: '150px', backgroundColor: "gray", color: "white"},
        },


        //Jocus
        71: {
            costBase() { return new Decimal(2) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.fu.jocusEssence},
            pay(amt) { player.fu.jocusEssence = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1).pow(1.25) },
            unlocked() { return inChallenge("fu", 11) || player.fu.enterFear},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Fear Multiplier"
            },
            display() {
                return "which are multiplying fear gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Jocus Essence."
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
            style: { width: '275px', height: '150px', backgroundColor: "gray", color: "white"},
        },
        72: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1.15) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.fu.jocusEssence},
            pay(amt) { player.fu.jocusEssence = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(7, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return inChallenge("fu", 11) || player.fu.enterFear},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Grass-Skip Req Divider"
            },
            display() {
                return "which are dividing the grass-skip requirement by /" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Jocus Essence."
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
            style: { width: '275px', height: '150px', backgroundColor: "gray", color: "white"},
        },
        73: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.fu.jocusEssence},
            pay(amt) { player.fu.jocusEssence = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return inChallenge("fu", 11) || player.fu.enterFear},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Jocus Essence Self-Boost"
            },
            display() {
                return "which are multiplying jocus essence gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Jocus Essence."
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
            style: { width: '275px', height: '150px', backgroundColor: "gray", color: "white"},
        },
        74: {
            costBase() { return new Decimal(16) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.fu.jocusEssence},
            pay(amt) { player.fu.jocusEssence = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01) },
            unlocked() { return inChallenge("fu", 11) || player.fu.enterFear},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Fun Generation"
            },
            display() {
                return "which are producing " + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + "% of fun gain per second.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Jocus Essence."
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
            style: { width: '275px', height: '150px', backgroundColor: "gray", color: "white"},
        },
    },
    milestones: {},
    challenges: {
        11: {
            name: "FEAR",
            challengeDescription() { return "<h4>Alt-Uni 1 automation from singularity milestones is disabled, and a new emotion, fear is unlocked. All pre-funify currencies are raised to the ^0.2. Replicanti point softcaps are ^2 stronger." },
            goal() { return new Decimal("10") },
            canComplete: function () { return player.gs.grassSkip.gte(10) },
            goalDescription() { return "10 Grass-Skip" },
            rewardDescription: "Kill Jocus.",
            onEnter() {
                if (!player.fu.enterFear) player.fu.enterFear = true
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
            },
            onExit() {
                player.fu.funifyPause = new Decimal(12)
            },
            style: { width: '350px', height: '275px', }
        },
    },
    infoboxes: {},
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["row", [
                        ["raw-html", () => {return "You are having " + format(player.fu.fun) + " fun"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.fu.funToGet) + ")"}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["raw-html", () => {return "Boosts oil by x" + format(player.fu.funEffect)}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "Boosts proto memories by x" + format(player.fu.funEffect2)}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 11]]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 21], ["ex-buyable", 22], ["ex-buyable", 23], ["ex-buyable", 24]], {maxWidth: "1200px"}],
                    ["blank", "25px"],
                    ["row", [["clickable", 12]]],
                    ["style-row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16], ["upgrade", 17], ["upgrade", 18], ["upgrade", 19]], {maxWidth: "600px"}],
                ]
            },
            "SFRGT": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return player.fu.jocusCelestialActivate },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => {return "You are having <h3>" + format(player.fu.fun) + "</h3> fun."  }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "You have <h3>" + format(player.s.singularityPoints) + "</h3> singularity points."  }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "You have <h3>" + format(player.in.infinityPoints) + "</h3> infinity points."  }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "You have <h3>" + format(player.gh.steel) + "</h3> steel."  }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["raw-html", () => {return "You have <h3>" + format(player.fu.sfrgt) + "</h3> SFRGT (Super fun real good time)."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => {return "You are gaining <h3>" + format(player.fu.sfrgtPerSecond) + "</h3> SFRGT per second."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14],
                        ["ex-buyable", 15], ["ex-buyable", 16], ["ex-buyable", 17], ["ex-buyable", 18]], {maxWidth: "1200px"}],
                ]
            },
            "Mood Triangle" : {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("fu", 15) },
                content: [
                    ["blank", "10px"],
                    ["row", [
                        ["raw-html", () => {return "You are having " + format(player.fu.fun) + " fun"}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.fu.funToGet) + ")"}, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["blank", "10px"],
                    ["row", [["clickable", 23],["blank", ["25px", "25px"]],["clickable", 26],]],
                    ["blank", "25px"],
                    ["row", [["clickable", 24],["blank", ["25px", "25px"]],["clickable", 25],]],
                    ["blank", "25px"],
                    ["buttonless-microtabs", "mood", { 'border-width': '0px' }],
                ]
            },
            "Fear": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("fu", 17) },
                content: [
                    ["blank", "25px"],
                    ["row", [["challenge", 11]]],
                    ["blank", "25px"],
                    ["row", [
                        ["raw-html", () => { return player.fu.enterFear ? "You have <h3>" + format(player.fu.jocusEssence) + "</h3> jocus essence" : "" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => { return inChallenge("fu", 11) ? "(+" + format(player.fu.jocusEssenceToGet) + ")" : "" }, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["raw-html", () => { return inChallenge("fu", 11) ? "Boosts anonymity gain by x" + format(player.fu.jocusEssenceEffect) : player.fu.enterFear ? "Effect only active in Fear Challenge" : "" }, () => {
                        let look = {fontSize: "20px", fontFamily: "monospace"}
                        if (inChallenge("fu", 11)) {look.color = "white"} else {look.color = "gray"}
                        return look
                    }],
                    ["blank", "10px"],
                    ["row", [["clickable", 31]]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 71], ["ex-buyable", 72], ["ex-buyable", 73], ["ex-buyable", 74]], {maxWidth: "1200px"}],
                ]
            },
        },
        mood: {
            "Happiness": {
                content: [
                    ["row", [
                        ["raw-html", () => {return "You have <h3>" + format(player.fu.happiness) + "</h3> happiness"}, {color: "#fcff04", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.fu.happinessPerSecond) + "/s)"}, () => {
                            let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                            if (player.fu.happinessProduce) {look.color = "#fcff04"} else {look.color = "gray"}
                            return look
                        }],
                    ]],
                    ["raw-html", () => { return "Boosts steel gain by x" + format(player.fu.happinessEffect2)}, {color: "#fcff04", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Divides anger by /" + format(player.fu.happinessEffect)}, {color: "#fcff04", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "20px"],
                    ["row", [["clickable", 4], ["clickable", 5], ["clickable", 14], ["clickable", 15], ["clickable", 16], ["clickable", 17], ["clickable", 18], ["clickable", 19]]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 31], ["ex-buyable", 32], ["ex-buyable", 33], ["ex-buyable", 34],
                        ["ex-buyable", 35], ["ex-buyable", 36], ["ex-buyable", 37], ["ex-buyable", 38]], {maxWidth: "1200px"}],
                ]
            },
            "Sadness": {
                content: [
                    ["row", [
                        ["raw-html", () => {return "You have <h3>" + format(player.fu.sadness) + "</h3> sadness"}, {color: "#110057", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.fu.sadnessPerSecond) + "/s)"}, () => {
                            let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                            if (player.fu.sadnessProduce) {look.color = "#110057"} else {look.color = "gray"}
                            return look
                        }],
                    ]],
                    ["raw-html", () => { return "Boosts infinity points gain by x" + format(player.fu.sadnessEffect2)}, {color: "#110057", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Divides happiness by /" + format(player.fu.sadnessEffect)}, {color: "#110057", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "20px"],
                    ["row", [["clickable", 4], ["clickable", 5], ["clickable", 14], ["clickable", 15], ["clickable", 16], ["clickable", 17], ["clickable", 18], ["clickable", 19]]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 41], ["ex-buyable", 42], ["ex-buyable", 43], ["ex-buyable", 44],
                        ["ex-buyable", 45], ["ex-buyable", 46], ["ex-buyable", 47], ["ex-buyable", 48]], {maxWidth: "1200px"}],
                ]
            },
            "Anger": {
                content: [
                    ["row", [
                        ["raw-html", () => {return "You have <h3>" + format(player.fu.anger) + "</h3> anger"}, {color: "#ff2b3d", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.fu.angerPerSecond) + "/s)"}, () => {
                            let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                            if (player.fu.angerProduce) {look.color = "#ff2b3d"} else {look.color = "gray"}
                            return look
                        }],
                    ]],
                    ["raw-html", () => { return "Boosts singularity point gain by x" + format(player.fu.angerEffect2)}, {color: "#ff2b3d", fontSize: "20px", fontFamily: "monospace"}],
                    ["raw-html", () => { return "Divides sadness by /" + format(player.fu.angerEffect)}, {color: "#ff2b3d", fontSize: "20px", fontFamily: "monospace"}],                    
                    ["blank", "20px"],
                    ["row", [["clickable", 4], ["clickable", 5], ["clickable", 14], ["clickable", 15], ["clickable", 16], ["clickable", 17], ["clickable", 18], ["clickable", 19]]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 51], ["ex-buyable", 52], ["ex-buyable", 53], ["ex-buyable", 54],
                        ["ex-buyable", 55], ["ex-buyable", 56], ["ex-buyable", 57], ["ex-buyable", 58]], {maxWidth: "1200px"}],
                ]
            },
            "Fear": {
                content: [
                    ["row", [
                        ["raw-html", () => {return "You have <h3>" + format(player.fu.fear) + "</h3> anger"}, {color: "gray", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + format(player.fu.fearPerSecond) + "/s)"}, () => {
                            let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                            if (player.fu.fearProduce && inChallenge("fu", 11)) {look.color = "gray"} else {look.color = "#222"}
                            return look
                        }],
                    ]],
                    ["raw-html", () => { return inChallenge("fu", 11) ? "Boosts replicanti point mult post softcap by x" + format(player.fu.fearEffect2) : "Effect only active in Fear Challenge" }, () => {
                        let look = {fontSize: "20px", fontFamily: "monospace"}
                        if (inChallenge("fu", 11)) {look.color = "gray"} else {look.color = "#222"}
                        return look
                    }],
                    ["raw-html", () => { return "Divides fear by /" + format(player.fu.fearEffect)}, {color: "gray", fontSize: "20px", fontFamily: "monospace"}],   
                    ["blank", "20px"],
                    ["row", [["clickable", 4], ["clickable", 5], ["clickable", 14], ["clickable", 15], ["clickable", 16], ["clickable", 17], ["clickable", 18], ["clickable", 19]]],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 61], ["ex-buyable", 62], ["ex-buyable", 63], ["ex-buyable", 64],
                        ["ex-buyable", 65], ["ex-buyable", 66], ["ex-buyable", 67], ["ex-buyable", 68]], {maxWidth: "1200px"}],
                ]
            },
        }
    },

    tabFormat: [
        ["raw-html", () => {return "You have <h3>" + format(player.cp.replicantiPoints) + "</h3> replicanti points."}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["raw-html", () => {return "Replicanti Mult: " + format(player.cp.replicantiPointsMult, 4) + "x"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["row", [["bar", "replicantiBar"]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("cp", 19) }
})

// hai icecreamdude-senpai :3
