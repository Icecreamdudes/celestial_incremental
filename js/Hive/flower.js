addLayer("fl", {
    name: "Flowers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "FL", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        flowerTimers: [new Decimal(20), new Decimal(40), new Decimal(40), new Decimal(60), new Decimal(60)],
        flowerTimersMax: [new Decimal(20), new Decimal(40), new Decimal(40), new Decimal(60), new Decimal(60)],
        flowerTimerPause: [false, false, false, false, false],
        pickingPower: new Decimal(1),
        flowerGain: new Decimal(1),
        glossaryBase: new Decimal(1),

        glossary: {
            101: new Decimal(0),
            102: new Decimal(0),
            103: new Decimal(0),
            104: new Decimal(0),
            105: new Decimal(0),

            111: new Decimal(0),
            112: new Decimal(0),
            113: new Decimal(0),
            114: new Decimal(0),
            115: new Decimal(0),

            121: new Decimal(0),
            122: new Decimal(0),
            123: new Decimal(0),
            124: new Decimal(0),
            125: new Decimal(0),


            201: new Decimal(0),
            202: new Decimal(0),
            203: new Decimal(0),
            204: new Decimal(0),
            205: new Decimal(0),

            211: new Decimal(0),
            212: new Decimal(0),
            213: new Decimal(0),
            214: new Decimal(0),
            215: new Decimal(0),

            221: new Decimal(0),
            222: new Decimal(0),
            223: new Decimal(0),
            224: new Decimal(0),
            225: new Decimal(0),


            301: new Decimal(0),
            302: new Decimal(0),
            303: new Decimal(0),
            304: new Decimal(0),
            305: new Decimal(0),

            311: new Decimal(0),
            312: new Decimal(0),
            313: new Decimal(0),
            314: new Decimal(0),
            315: new Decimal(0),

            321: new Decimal(0),
            322: new Decimal(0),
            323: new Decimal(0),
            324: new Decimal(0),
            325: new Decimal(0),


            401: new Decimal(0),
            402: new Decimal(0),
            403: new Decimal(0),
            404: new Decimal(0),
            405: new Decimal(0),

            411: new Decimal(0),
            412: new Decimal(0),
            413: new Decimal(0),
            414: new Decimal(0),
            415: new Decimal(0),
            

            501: new Decimal(0),
            502: new Decimal(0),
            503: new Decimal(0),
            504: new Decimal(0),
            505: new Decimal(0),

            511: new Decimal(0),
            512: new Decimal(0),
            513: new Decimal(0),
            514: new Decimal(0),
            515: new Decimal(0),
        },
        glossaryEffects: {
            bee: new Decimal(1),
            pollen: new Decimal(1),
            nectar: new Decimal(1),
            beeBread: new Decimal(1),
            honey: new Decimal(1),
        },
        glossaryIndex: 0,
        glossaryRig: 0,
    }},
    nodeStyle() {
        return {borderColor: "#7e3075"}
    },
    tooltip: "Flowers",
    color: "#fc60eb",
    branches: ["bee"],
    update(delta) {
        let onepersec = new Decimal(1)

        player.fl.flowerTimersMax[0] = new Decimal(20)
        player.fl.flowerTimersMax[0] = player.fl.flowerTimersMax[0].div(buyableEffect("bee", 21))
        if (player.bee.totalResearch.gte(1) && !player.fl.flowerTimerPause[0]) player.fl.flowerTimers[0] = player.fl.flowerTimers[0].sub(delta)

        player.fl.flowerTimersMax[1] = new Decimal(40)
        if (hasUpgrade("bpl", 18)) player.fl.flowerTimersMax[1] = player.fl.flowerTimersMax[1].div(2)
        if (hasUpgrade("bpl", 14) && !player.fl.flowerTimerPause[1]) player.fl.flowerTimers[1] = player.fl.flowerTimers[1].sub(delta)

        player.fl.flowerTimersMax[2] = new Decimal(40)
        if (hasUpgrade("ne", 402)) player.fl.flowerTimersMax[2] = player.fl.flowerTimersMax[2].div(2)
        if (hasUpgrade("ne", 201) && !player.fl.flowerTimerPause[2]) player.fl.flowerTimers[2] = player.fl.flowerTimers[2].sub(delta)

        player.fl.flowerTimersMax[3] = new Decimal(60)
        if (player.bb.breadMilestone >= 8) player.fl.flowerTimersMax[3] = player.fl.flowerTimersMax[3].div(player.bb.breadEffects[7])
        if (buyableEffect("bee", 53).gte(1) && !player.fl.flowerTimerPause[3]) player.fl.flowerTimers[3] = player.fl.flowerTimers[3].sub(delta)

        player.fl.flowerTimersMax[4] = new Decimal(60)
        if (player.ho.cell.gte(100)) player.fl.flowerTimersMax[4] = player.fl.flowerTimersMax[4].div(2)
        if (player.ho.cell.gte(15)) player.fl.flowerTimers[4] = player.fl.flowerTimers[4].sub(delta)

        for (let i = 0; i < player.fl.flowerTimers.length; i++) {
            if (player.fl.flowerTimers[i].lte(0)) {
                layers.fl.generateFlower(i)
                player.fl.flowerTimers[i] = player.fl.flowerTimersMax[i]
            }
        }

        player.fl.pickingPower = new Decimal(1)
        player.fl.pickingPower = player.fl.pickingPower.add(buyableEffect("bee", 24))
        if (hasUpgrade("ne", 403)) player.fl.pickingPower = player.fl.pickingPower.mul(2)
        if (player.bb.breadMilestone >= 6) player.fl.pickingPower = player.fl.pickingPower.mul(player.bb.breadEffects[5])
        if (hasUpgrade("ho", 3)) player.fl.pickingPower = player.fl.pickingPower.mul(upgradeEffect("ho", 3))
        if (hasUpgrade("al", 102)) player.fl.pickingPower = player.fl.pickingPower.mul(2)
        if (hasUpgrade("al", 202)) player.fl.pickingPower = player.fl.pickingPower.mul(2)

        player.fl.flowerGain = new Decimal(1)
        player.fl.flowerGain = player.fl.flowerGain.mul(player.ne.beta.effect)
        if (hasUpgrade("ho", 5)) player.fl.flowerGain = player.fl.flowerGain.mul(upgradeEffect("ho", 5))
        if (hasUpgrade("al", 101)) player.fl.flowerGain = player.fl.flowerGain.mul(2)

        // GLOSSARY ADDITIVE BASE
        player.fl.glossaryBase = new Decimal(1)
        player.fl.glossaryBase = player.fl.glossaryBase.add(buyableEffect("bee", 23))
        player.fl.glossaryBase = player.fl.glossaryBase.add(player.ho.effects.flower.effect)
        player.fl.glossaryBase = player.fl.glossaryBase.add(player.ne.gamma.effect)
        if (player.bb.breadMilestone >= 4) player.fl.glossaryBase = player.fl.glossaryBase.add(player.bb.breadEffects[3])

        // GLOSSARY MULTIPLIERS
        if (hasUpgrade("al", 201)) player.fl.glossaryBase = player.fl.glossaryBase.mul(1.2)

        player.fl.glossaryEffects.bee = new Decimal(1)
        for (let i = 101; i < 126; ) {
            if (player.fl.glossary[i].gt(0)) {
                player.fl.glossaryEffects.bee = player.fl.glossaryEffects.bee.mul(player.fl.glossary[i].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).add(1))
            }
            if (i % 10 == 5) {i = i+6} else {i++}
        }

        player.fl.glossaryEffects.pollen = new Decimal(1)
        for (let i = 201; i < 216; ) {
            if (player.fl.glossary[i].gt(0)) {
                player.fl.glossaryEffects.pollen = player.fl.glossaryEffects.pollen.mul(player.fl.glossary[i].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(4).mul(buyableEffect("bee", 35).add(1)).add(1))
            }
            if (i % 10 == 5) {i = i+6} else {i++}
        }

        player.fl.glossaryEffects.nectar = new Decimal(1)
        for (let i = 301; i < 326; ) {
            if (player.fl.glossary[i].gt(0)) {
                player.fl.glossaryEffects.nectar = player.fl.glossaryEffects.nectar.mul(player.fl.glossary[i].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 45).add(1)).add(1))
            }
            if (i % 10 == 5) {i = i+6} else {i++}
        }

        player.fl.glossaryEffects.beeBread = new Decimal(1)
        for (let i = 401; i < 416; ) {
            if (player.fl.glossary[i].gt(0)) {
                player.fl.glossaryEffects.beeBread = player.fl.glossaryEffects.beeBread.mul(player.fl.glossary[i].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1))
            }
            if (i % 10 == 5) {i = i+6} else {i++}
        }

        player.fl.glossaryEffects.honey = new Decimal(1)
        for (let i = 501; i < 516; ) {
            if (player.fl.glossary[i].gt(0)) {
                player.fl.glossaryEffects.honey = player.fl.glossaryEffects.honey.mul(player.fl.glossary[i].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1))
            }
            if (i % 10 == 5) {i = i+6} else {i++}
        }
    },
    generateFlower(type) {
        let row = getRandomInt(5) + 1
        let column = getRandomInt(5) + 1
        let val = column + "0" + row
        let tier = Math.random()
        let rigBase = ((player.fl.glossaryRig-1)%5)+2
        switch(type) {
            case 0:
                // PENTAGONAL RED
                if (tier < 0.3 && buyableEffect("bee", 22).gt(0)) {
                    if (getGridData("fl", val)[0] <= player.fl.glossaryRig && player.fl.glossaryRig > 110 && player.fl.glossaryRig < 120) {
                        setGridData("fl", val, [player.fl.glossaryRig, new Decimal(rigBase*5)])
                        break;
                    }
                    let rng = Math.random()
                    if (rng < 0.4 || buyableEffect("bee", 22).eq(1)) {
                        if (getGridData("fl", val)[0] <= 111) setGridData("fl", val, [111, new Decimal(10)])
                    } else if (rng < 0.7 || buyableEffect("bee", 22).eq(2)) {
                        if (getGridData("fl", val)[0] <= 112) setGridData("fl", val, [112, new Decimal(15)])
                    } else if (rng < 0.85 || buyableEffect("bee", 22).eq(3)) {
                        if (getGridData("fl", val)[0] <= 113) setGridData("fl", val, [113, new Decimal(20)])
                    } else if (rng < 0.95 || buyableEffect("bee", 22).eq(4)) {
                        if (getGridData("fl", val)[0] <= 114) setGridData("fl", val, [114, new Decimal(25)])
                    } else {
                        if (getGridData("fl", val)[0] <= 115) setGridData("fl", val, [115, new Decimal(30)])
                    }
                // CUBIC RED
                } else if (tier < 0.4 && buyableEffect("bee", 13).gt(0)) {
                    if (getGridData("fl", val)[0] <= player.fl.glossaryRig && player.fl.glossaryRig > 120 && player.fl.glossaryRig < 130) {
                        setGridData("fl", val, [player.fl.glossaryRig, new Decimal(rigBase*100)])
                        break;
                    }
                    let rng = Math.random()
                    if (rng < 0.4 || buyableEffect("bee", 13).eq(1)) {
                        if (getGridData("fl", val)[0] <= 121) setGridData("fl", val, [121, new Decimal(200)])
                    } else if (rng < 0.7 || buyableEffect("bee", 13).eq(2)) {
                        if (getGridData("fl", val)[0] <= 122) setGridData("fl", val, [122, new Decimal(300)])
                    } else if (rng < 0.85 || buyableEffect("bee", 13).eq(3)) {
                        if (getGridData("fl", val)[0] <= 123) setGridData("fl", val, [123, new Decimal(400)])
                    } else if (rng < 0.95 || buyableEffect("bee", 13).eq(4)) {
                        if (getGridData("fl", val)[0] <= 124) setGridData("fl", val, [124, new Decimal(500)])
                    } else {
                        if (getGridData("fl", val)[0] <= 125) setGridData("fl", val, [125, new Decimal(600)])
                    }
                // REGULAR RED
                } else {
                    if (getGridData("fl", val)[0] <= player.fl.glossaryRig && player.fl.glossaryRig > 100 && player.fl.glossaryRig < 110) {
                        setGridData("fl", val, [player.fl.glossaryRig, new Decimal(rigBase)])
                        break;
                    }
                    let rng = Math.random()
                    if (rng < 0.4) {
                        if (getGridData("fl", val)[0] <= 101) setGridData("fl", val, [101, new Decimal(2)])
                    } else if (rng < 0.7) {
                        if (getGridData("fl", val)[0] <= 102) setGridData("fl", val, [102, new Decimal(3)])
                    } else if (rng < 0.85) {
                        if (getGridData("fl", val)[0] <= 103) setGridData("fl", val, [103, new Decimal(4)])
                    } else if (rng < 0.95) {
                        if (getGridData("fl", val)[0] <= 104) setGridData("fl", val, [104, new Decimal(5)])
                    } else {
                        if (getGridData("fl", val)[0] <= 105) setGridData("fl", val, [105, new Decimal(6)])
                    }
                }
                break;
            case 1:
                // PENTAGONAL BLUE
                if (tier < 0.3 && buyableEffect("bee", 34).gt(0)) {
                    if (getGridData("fl", val)[0] <= player.fl.glossaryRig && player.fl.glossaryRig > 210 && player.fl.glossaryRig < 220) {
                        setGridData("fl", val, [player.fl.glossaryRig, new Decimal(rigBase*15)])
                        break;
                    }
                    let rng = Math.random()
                    if (rng < 0.4 || buyableEffect("bee", 34).eq(1)) {
                        if (getGridData("fl", val)[0] <= 211) setGridData("fl", val, [211, new Decimal(30)])
                    } else if (rng < 0.7 || buyableEffect("bee", 34).eq(2)) {
                        if (getGridData("fl", val)[0] <= 212) setGridData("fl", val, [212, new Decimal(45)])
                    } else if (rng < 0.85 || buyableEffect("bee", 34).eq(3)) {
                        if (getGridData("fl", val)[0] <= 213) setGridData("fl", val, [213, new Decimal(60)])
                    } else if (rng < 0.95 || buyableEffect("bee", 34).eq(4)) {
                        if (getGridData("fl", val)[0] <= 214) setGridData("fl", val, [214, new Decimal(75)])
                    } else {
                        if (getGridData("fl", val)[0] <= 215) setGridData("fl", val, [215, new Decimal(90)])
                    }
                // CUBIC BLUE
                } else if (tier < 0.4 && buyableEffect("al", 102).gt(0)) {
                    if (getGridData("fl", val)[0] <= player.fl.glossaryRig && player.fl.glossaryRig > 220 && player.fl.glossaryRig < 230) {
                        setGridData("fl", val, [player.fl.glossaryRig, new Decimal(rigBase*300)])
                        break;
                    }
                    let rng = Math.random()
                    if (rng < 0.4 || buyableEffect("al", 102).eq(1)) {
                        if (getGridData("fl", val)[0] <= 221) setGridData("fl", val, [221, new Decimal(600)])
                    } else if (rng < 0.7 || buyableEffect("al", 102).eq(2)) {
                        if (getGridData("fl", val)[0] <= 222) setGridData("fl", val, [222, new Decimal(900)])
                    } else if (rng < 0.85 || buyableEffect("al", 102).eq(3)) {
                        if (getGridData("fl", val)[0] <= 223) setGridData("fl", val, [223, new Decimal(1200)])
                    } else if (rng < 0.95 || buyableEffect("al", 102).eq(4)) {
                        if (getGridData("fl", val)[0] <= 224) setGridData("fl", val, [224, new Decimal(1500)])
                    } else {
                        if (getGridData("fl", val)[0] <= 225) setGridData("fl", val, [225, new Decimal(1800)])
                    }
                // REGULAR BLUE
                } else {
                    if (getGridData("fl", val)[0] <= player.fl.glossaryRig && player.fl.glossaryRig > 200 && player.fl.glossaryRig < 210) {
                        setGridData("fl", val, [player.fl.glossaryRig, new Decimal(rigBase*3)])
                        break;
                    }
                    let rng = Math.random()
                    if (rng < 0.4) {
                        if (getGridData("fl", val)[0] <= 201) setGridData("fl", val, [201, new Decimal(6)])
                    } else if (rng < 0.7) {
                        if (getGridData("fl", val)[0] <= 202) setGridData("fl", val, [202, new Decimal(9)])
                    } else if (rng < 0.85) {
                        if (getGridData("fl", val)[0] <= 203) setGridData("fl", val, [203, new Decimal(12)])
                    } else if (rng < 0.95) {
                        if (getGridData("fl", val)[0] <= 204) setGridData("fl", val, [204, new Decimal(15)])
                    } else {
                        if (getGridData("fl", val)[0] <= 205) setGridData("fl", val, [205, new Decimal(18)])
                    }
                }
                break;
            case 2:
                // PENTAGONAL GREEN
                if (tier < 0.3 && buyableEffect("bee", 44).gt(0)) {
                    if (getGridData("fl", val)[0] <= player.fl.glossaryRig && player.fl.glossaryRig > 310 && player.fl.glossaryRig < 320) {
                        setGridData("fl", val, [player.fl.glossaryRig, new Decimal(rigBase*15)])
                        break;
                    }
                    let rng = Math.random()
                    if (rng < 0.4 || buyableEffect("bee", 44).eq(1)) {
                        if (getGridData("fl", val)[0] <= 311) setGridData("fl", val, [311, new Decimal(30)])
                    } else if (rng < 0.7 || buyableEffect("bee", 44).eq(2)) {
                        if (getGridData("fl", val)[0] <= 312) setGridData("fl", val, [312, new Decimal(45)])
                    } else if (rng < 0.85 || buyableEffect("bee", 44).eq(3)) {
                        if (getGridData("fl", val)[0] <= 313) setGridData("fl", val, [313, new Decimal(60)])
                    } else if (rng < 0.95 || buyableEffect("bee", 44).eq(4)) {
                        if (getGridData("fl", val)[0] <= 314) setGridData("fl", val, [314, new Decimal(75)])
                    } else {
                        if (getGridData("fl", val)[0] <= 315) setGridData("fl", val, [315, new Decimal(90)])
                    }
                // CUBIC GREEN
                } else if (tier < 0.4 && buyableEffect("al", 202).gt(0)) {
                    if (getGridData("fl", val)[0] <= player.fl.glossaryRig && player.fl.glossaryRig > 320 && player.fl.glossaryRig < 330) {
                        setGridData("fl", val, [player.fl.glossaryRig, new Decimal(rigBase*300)])
                        break;
                    }
                    let rng = Math.random()
                    if (rng < 0.4 || buyableEffect("al", 202).eq(1)) {
                        if (getGridData("fl", val)[0] <= 321) setGridData("fl", val, [321, new Decimal(600)])
                    } else if (rng < 0.7 || buyableEffect("al", 202).eq(2)) {
                        if (getGridData("fl", val)[0] <= 322) setGridData("fl", val, [322, new Decimal(900)])
                    } else if (rng < 0.85 || buyableEffect("al", 202).eq(3)) {
                        if (getGridData("fl", val)[0] <= 323) setGridData("fl", val, [323, new Decimal(1200)])
                    } else if (rng < 0.95 || buyableEffect("al", 202).eq(4)) {
                        if (getGridData("fl", val)[0] <= 324) setGridData("fl", val, [324, new Decimal(1500)])
                    } else {
                        if (getGridData("fl", val)[0] <= 325) setGridData("fl", val, [325, new Decimal(1800)])
                    }
                // REGULAR GREEN
                } else {
                    if (getGridData("fl", val)[0] <= player.fl.glossaryRig && player.fl.glossaryRig > 300 && player.fl.glossaryRig < 310) {
                        setGridData("fl", val, [player.fl.glossaryRig, new Decimal(rigBase*3)])
                        break;
                    }
                    let rng = Math.random()
                    if (rng < 0.4) {
                        if (getGridData("fl", val)[0] <= 301) setGridData("fl", val, [301, new Decimal(6)])
                    } else if (rng < 0.7) {
                        if (getGridData("fl", val)[0] <= 302) setGridData("fl", val, [302, new Decimal(9)])
                    } else if (rng < 0.85) {
                        if (getGridData("fl", val)[0] <= 303) setGridData("fl", val, [303, new Decimal(12)])
                    } else if (rng < 0.95) {
                        if (getGridData("fl", val)[0] <= 304) setGridData("fl", val, [304, new Decimal(15)])
                    } else {
                        if (getGridData("fl", val)[0] <= 305) setGridData("fl", val, [305, new Decimal(18)])
                    }
                }
                break;
            case 3:
                // PENTAGONAL PINK
                if (tier < 0.3 && player.bb.breadMilestone >= 7) {
                    if (getGridData("fl", val)[0] <= player.fl.glossaryRig && player.fl.glossaryRig > 410 && player.fl.glossaryRig < 420) {
                        setGridData("fl", val, [player.fl.glossaryRig, new Decimal(rigBase*50)])
                        break;
                    }
                    let rng = Math.random()
                    if (rng < 0.4 || player.bb.breadEffects[6].eq(1)) {
                        if (getGridData("fl", val)[0] <= 411) setGridData("fl", val, [411, new Decimal(100)])
                    } else if (rng < 0.7 || player.bb.breadEffects[6].eq(2)) {
                        if (getGridData("fl", val)[0] <= 412) setGridData("fl", val, [412, new Decimal(150)])
                    } else if (rng < 0.85 || player.bb.breadEffects[6].eq(3)) {
                        if (getGridData("fl", val)[0] <= 413) setGridData("fl", val, [413, new Decimal(200)])
                    } else if (rng < 0.95 || player.bb.breadEffects[6].eq(4)) {
                        if (getGridData("fl", val)[0] <= 414) setGridData("fl", val, [414, new Decimal(250)])
                    } else {
                        if (getGridData("fl", val)[0] <= 415) setGridData("fl", val, [415, new Decimal(300)])
                    }
                // CUBIC PINK
                } else if (tier < 0.4 && buyableEffect("al", 103).gt(0)) {

                // REGULAR PINK
                } else {
                    if (getGridData("fl", val)[0] <= player.fl.glossaryRig && player.fl.glossaryRig > 400 && player.fl.glossaryRig < 410) {
                        setGridData("fl", val, [player.fl.glossaryRig, new Decimal(rigBase*10)])
                        break;
                    }
                    let rng = Math.random()
                    if (rng < 0.4 || buyableEffect("bee", 53).eq(1)) {
                        if (getGridData("fl", val)[0] <= 401) setGridData("fl", val, [401, new Decimal(20)])
                    } else if (rng < 0.7 || buyableEffect("bee", 53).eq(2)) {
                        if (getGridData("fl", val)[0] <= 402) setGridData("fl", val, [402, new Decimal(30)])
                    } else if (rng < 0.85 || buyableEffect("bee", 53).eq(3)) {
                        if (getGridData("fl", val)[0] <= 403) setGridData("fl", val, [403, new Decimal(40)])
                    } else if (rng < 0.95 || buyableEffect("bee", 53).eq(4)) {
                        if (getGridData("fl", val)[0] <= 404) setGridData("fl", val, [404, new Decimal(50)])
                    } else {
                        if (getGridData("fl", val)[0] <= 405) setGridData("fl", val, [405, new Decimal(60)])
                    }
                }
                break;
            case 4:
                // PENTAGONAL YELLOW
                if (tier < 0.3 && buyableEffect("bee", 64).gt(0)) {
                    if (getGridData("fl", val)[0] <= player.fl.glossaryRig && player.fl.glossaryRig > 510 && player.fl.glossaryRig < 520) {
                        setGridData("fl", val, [player.fl.glossaryRig, new Decimal(rigBase*50)])
                        break;
                    }
                    let rng = Math.random()
                    if (rng < 0.4 || buyableEffect("bee", 64).eq(1)) {
                        if (getGridData("fl", val)[0] <= 511) setGridData("fl", val, [511, new Decimal(100)])
                    } else if (rng < 0.7 || buyableEffect("bee", 64).eq(2)) {
                        if (getGridData("fl", val)[0] <= 512) setGridData("fl", val, [512, new Decimal(150)])
                    } else if (rng < 0.85 || buyableEffect("bee", 64).eq(3)) {
                        if (getGridData("fl", val)[0] <= 513) setGridData("fl", val, [513, new Decimal(200)])
                    } else if (rng < 0.95 || buyableEffect("bee", 64).eq(4)) {
                        if (getGridData("fl", val)[0] <= 514) setGridData("fl", val, [514, new Decimal(250)])
                    } else {
                        if (getGridData("fl", val)[0] <= 515) setGridData("fl", val, [515, new Decimal(300)])
                    }
                // CUBIC YELLOW
                } else if (tier < 0.4 && buyableEffect("al", 203).gt(0)) {

                // REGULAR YELLOW
                } else {
                    if (getGridData("fl", val)[0] <= player.fl.glossaryRig && player.fl.glossaryRig > 500 && player.fl.glossaryRig < 510) {
                        setGridData("fl", val, [player.fl.glossaryRig, new Decimal(rigBase*10)])
                        break;
                    }
                    let rng = Math.random()
                    if (rng < 0.4) {
                        if (getGridData("fl", val)[0] <= 501) setGridData("fl", val, [501, new Decimal(20)])
                    } else if (rng < 0.7) {
                        if (getGridData("fl", val)[0] <= 502) setGridData("fl", val, [502, new Decimal(30)])
                    } else if (rng < 0.85) {
                        if (getGridData("fl", val)[0] <= 503) setGridData("fl", val, [503, new Decimal(40)])
                    } else if (rng < 0.95) {
                        if (getGridData("fl", val)[0] <= 504) setGridData("fl", val, [504, new Decimal(50)])
                    } else {
                        if (getGridData("fl", val)[0] <= 505) setGridData("fl", val, [505, new Decimal(60)])
                    }
                }
                break;
        }
    },
    glossary: {
        0: {
            name: "None",
            display: true,
        },
        101: {
            name: "Circular 2-Petalled Red Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[101].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).add(1)) + " Bees"},
            svg: `
                <ellipse id="petal2" transform="translate(24, 16)" rx="16" ry="14" cx="16" cy="14" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(4, 16)" rx="16" ry="14" cx="16" cy="14" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return true},
            onHover() {player.fl.glossaryIndex=101},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=101},
        },
        102: {
            name: "Circular 3-Petalled Red Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[102].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).add(1)) + " Bees"},
            svg: `
                <ellipse id="petal3" transform="translate(17.5, 6.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(29.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(5.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 24)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return true},
            onHover() {player.fl.glossaryIndex=102},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=102},
        },
        103: {
            name: "Circular 4-Petalled Red Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[103].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).add(1)) + " Bees"},
            svg: `
                <ellipse id="petal4" transform="translate(20, 6)" rx="10" cx="10" ry="10" cy="10" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(34, 20)" rx="10" cx="10" ry="10" cy="10" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(20, 34)" rx="10" cx="10" ry="10" cy="10" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(6, 20)" rx="10" cx="10" ry="10" cy="10" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return true},
            onHover() {player.fl.glossaryIndex=103},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=103},
        },
        104: {
            name: "Circular 5-Petalled Red Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[104].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).add(1)) + " Bees"},
            svg: `
                <ellipse id="petal5" transform="translate(22.5, 9.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(30.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(15.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(10.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return true},
            onHover() {player.fl.glossaryIndex=104},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=104},
        },
        105: {
            name: "Circular 6-Petalled Red Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[105].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).add(1)) + " Bees"},
            svg: `
                <ellipse id="petal6" transform="translate(24, 12)" rx="6" cx="6" ry="6" cy="6" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal5" transform="translate(34, 18)" rx="6" cx="6" ry="6" cy="6" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34, 30)" rx="6" cx="6" ry="6" cy="6" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(24, 36)" rx="6" cx="6" ry="6" cy="6" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(14, 30)" rx="6" cx="6" ry="6" cy="6" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(14, 18)" rx="6" cx="6" ry="6" cy="6" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return true},
            onHover() {player.fl.glossaryIndex=105},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=105},
        },

        111: {
            name: "Pentagonal 2-Petalled Red Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[111].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).add(1)) + " Bees"},
            svg: `
                <ellipse id="petal2" transform="translate(24, 16)" rx="16" ry="14" cx="16" cy="14" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(4, 16)" rx="16" ry="14" cx="16" cy="14" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 22).gte(1)},
            onHover() {player.fl.glossaryIndex=111},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=111},
        },
        112: {
            name: "Pentagonal 3-Petalled Red Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[112].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).add(1)) + " Bees"},
            svg: `
                <ellipse id="petal3" transform="translate(17.5, 6.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(29.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(5.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 24)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 22).gte(2)},
            onHover() {player.fl.glossaryIndex=112},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=112},
        },
        113: {
            name: "Pentagonal 4-Petalled Red Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[113].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).add(1)) + " Bees"},
            svg: `
                <ellipse id="petal4" transform="translate(20, 6)" rx="10" cx="10" ry="10" cy="10" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(34, 20)" rx="10" cx="10" ry="10" cy="10" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(20, 34)" rx="10" cx="10" ry="10" cy="10" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(6, 20)" rx="10" cx="10" ry="10" cy="10" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 22).gte(3)},
            onHover() {player.fl.glossaryIndex=113},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=113},
        },
        114: {
            name: "Pentagonal 5-Petalled Red Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[114].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).add(1)) + " Bees"},
            svg: `
                <ellipse id="petal5" transform="translate(22.5, 9.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(30.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(15.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(10.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 22).gte(4)},
            onHover() {player.fl.glossaryIndex=114},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=114},
        },
        115: {
            name: "Pentagonal 6-Petalled Red Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[115].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).add(1)) + " Bees"},
            svg: `
                <ellipse id="petal6" transform="translate(24, 12)" rx="6" cx="6" ry="6" cy="6" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal5" transform="translate(34, 18)" rx="6" cx="6" ry="6" cy="6" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34, 30)" rx="6" cx="6" ry="6" cy="6" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(24, 36)" rx="6" cx="6" ry="6" cy="6" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(14, 30)" rx="6" cx="6" ry="6" cy="6" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(14, 18)" rx="6" cx="6" ry="6" cy="6" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 22).gte(5)},
            onHover() {player.fl.glossaryIndex=115},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=115},
        },

        121: {
            name: "Cubic 2-Petalled Red Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[121].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).add(1)) + " Bees"},
            svg: `
                <ellipse id="petal2" transform="translate(24, 16)" rx="16" ry="14" cx="16" cy="14" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(4, 16)" rx="16" ry="14" cx="16" cy="14" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 19)" points="10 0, 0 6, 0 16, 10 22, 20 16, 20 6" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <line transform="translate(20, 19)" x1="10" y1="12" x2="10" y2="22" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="0" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="20" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
            `,
            display() {return buyableEffect("bee", 13).gte(1)},
            onHover() {player.fl.glossaryIndex=121},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=121},
        },
        122: {
            name: "Cubic 3-Petalled Red Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[122].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).add(1)) + " Bees"},
            svg: `
                <ellipse id="petal3" transform="translate(17.5, 6.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(29.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(5.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 23)" points="10 0, 0 6, 0 16, 10 22, 20 16, 20 6" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <line transform="translate(20, 23)" x1="10" y1="12" x2="10" y2="22" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 23)" x1="0" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 23)" x1="20" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
            `,
            display() {return buyableEffect("bee", 13).gte(2)},
            onHover() {player.fl.glossaryIndex=122},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=122},
        },
        123: {
            name: "Cubic 4-Petalled Red Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[123].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).add(1)) + " Bees"},
            svg: `
                <ellipse id="petal4" transform="translate(20, 6)" rx="10" cx="10" ry="10" cy="10" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(34, 20)" rx="10" cx="10" ry="10" cy="10" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(20, 34)" rx="10" cx="10" ry="10" cy="10" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(6, 20)" rx="10" cx="10" ry="10" cy="10" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 19)" points="10 0, 0 6, 0 16, 10 22, 20 16, 20 6" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <line transform="translate(20, 19)" x1="10" y1="12" x2="10" y2="22" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="0" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="20" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
            `,
            display() {return buyableEffect("bee", 13).gte(3)},
            onHover() {player.fl.glossaryIndex=123},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=123},
        },
        124: {
            name: "Cubic 5-Petalled Red Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[124].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).add(1)) + " Bees"},
            svg: `
                <ellipse id="petal5" transform="translate(22.5, 9.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(30.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(15.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(10.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 19)" points="10 0, 0 6, 0 16, 10 22, 20 16, 20 6" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <line transform="translate(20, 19)" x1="10" y1="12" x2="10" y2="22" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="0" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="20" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
            `,
            display() {return buyableEffect("bee", 13).gte(4)},
            onHover() {player.fl.glossaryIndex=124},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=124},
        },
        125: {
            name: "Cubic 6-Petalled Red Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[125].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).add(1)) + " Bees"},
            svg: `
                <ellipse id="petal6" transform="translate(24, 12)" rx="6" cx="6" ry="6" cy="6" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal5" transform="translate(34, 18)" rx="6" cx="6" ry="6" cy="6" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34, 30)" rx="6" cx="6" ry="6" cy="6" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(24, 36)" rx="6" cx="6" ry="6" cy="6" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(14, 30)" rx="6" cx="6" ry="6" cy="6" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(14, 18)" rx="6" cx="6" ry="6" cy="6" fill="#b21c0e" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 19)" points="10 0, 0 6, 0 16, 10 22, 20 16, 20 6" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <line transform="translate(20, 19)" x1="10" y1="12" x2="10" y2="22" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="0" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="20" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
            `,
            display() {return buyableEffect("bee", 13).gte(5)},
            onHover() {player.fl.glossaryIndex=125},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=125},
        },

        201: {
            name: "Circular 2-Petalled Blue Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[201].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(4).mul(buyableEffect("bee", 35).add(1)).add(1)) + " Pollen"},
            svg: `
                <ellipse id="petal2" transform="translate(24, 16)" rx="16" ry="14" cx="16" cy="14" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(4, 16)" rx="16" ry="14" cx="16" cy="14" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return true},
            onHover() {player.fl.glossaryIndex=201},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=201},
        },
        202: {
            name: "Circular 3-Petalled Blue Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[202].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(4).mul(buyableEffect("bee", 35).add(1)).add(1)) + " Pollen"},
            svg: `
                <ellipse id="petal3" transform="translate(17.5, 6.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(29.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(5.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 24)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return true},
            onHover() {player.fl.glossaryIndex=202},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=202},
        },
        203: {
            name: "Circular 4-Petalled Blue Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[203].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(4).mul(buyableEffect("bee", 35).add(1)).add(1)) + " Pollen"},
            svg: `
                <ellipse id="petal4" transform="translate(20, 6)" rx="10" cx="10" ry="10" cy="10" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(34, 20)" rx="10" cx="10" ry="10" cy="10" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(20, 34)" rx="10" cx="10" ry="10" cy="10" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(6, 20)" rx="10" cx="10" ry="10" cy="10" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return true},
            onHover() {player.fl.glossaryIndex=203},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=203},
        },
        204: {
            name: "Circular 5-Petalled Blue Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[204].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(4).mul(buyableEffect("bee", 35).add(1)).add(1)) + " Pollen"},
            svg: `
                <ellipse id="petal5" transform="translate(22.5, 9.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(30.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(15.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(10.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return true},
            onHover() {player.fl.glossaryIndex=204},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=204},
        },
        205: {
            name: "Circular 6-Petalled Blue Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[205].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(4).mul(buyableEffect("bee", 35).add(1)).add(1)) + " Pollen"},
            svg: `
                <ellipse id="petal6" transform="translate(24, 12)" rx="6" cx="6" ry="6" cy="6" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal5" transform="translate(34, 18)" rx="6" cx="6" ry="6" cy="6" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34, 30)" rx="6" cx="6" ry="6" cy="6" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(24, 36)" rx="6" cx="6" ry="6" cy="6" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(14, 30)" rx="6" cx="6" ry="6" cy="6" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(14, 18)" rx="6" cx="6" ry="6" cy="6" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return true},
            onHover() {player.fl.glossaryIndex=205},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=205},
        },

        211: {
            name: "Pentagonal 2-Petalled Blue Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[211].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(4).mul(buyableEffect("bee", 35).add(1)).add(1)) + " Pollen"},
            svg: `
                <ellipse id="petal2" transform="translate(24, 16)" rx="16" ry="14" cx="16" cy="14" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(4, 16)" rx="16" ry="14" cx="16" cy="14" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 34).gte(1)},
            onHover() {player.fl.glossaryIndex=211},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=211},
        },
        212: {
            name: "Pentagonal 3-Petalled Blue Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[212].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(4).mul(buyableEffect("bee", 35).add(1)).add(1)) + " Pollen"},
            svg: `
                <ellipse id="petal3" transform="translate(17.5, 6.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(29.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(5.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 24)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 34).gte(2)},
            onHover() {player.fl.glossaryIndex=212},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=212},
        },
        213: {
            name: "Pentagonal 4-Petalled Blue Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[213].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(4).mul(buyableEffect("bee", 35).add(1)).add(1)) + " Pollen"},
            svg: `
                <ellipse id="petal4" transform="translate(20, 6)" rx="10" cx="10" ry="10" cy="10" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(34, 20)" rx="10" cx="10" ry="10" cy="10" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(20, 34)" rx="10" cx="10" ry="10" cy="10" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(6, 20)" rx="10" cx="10" ry="10" cy="10" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 34).gte(3)},
            onHover() {player.fl.glossaryIndex=213},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=213},
        },
        214: {
            name: "Pentagonal 5-Petalled Blue Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[214].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(4).mul(buyableEffect("bee", 35).add(1)).add(1)) + " Pollen"},
            svg: `
                <ellipse id="petal5" transform="translate(22.5, 9.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(30.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(15.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(10.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 34).gte(4)},
            onHover() {player.fl.glossaryIndex=214},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=214},
        },
        215: {
            name: "Pentagonal 6-Petalled Blue Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[215].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(4).mul(buyableEffect("bee", 35).add(1)).add(1)) + " Pollen"},
            svg: `
                <ellipse id="petal6" transform="translate(24, 12)" rx="6" cx="6" ry="6" cy="6" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal5" transform="translate(34, 18)" rx="6" cx="6" ry="6" cy="6" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34, 30)" rx="6" cx="6" ry="6" cy="6" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(24, 36)" rx="6" cx="6" ry="6" cy="6" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(14, 30)" rx="6" cx="6" ry="6" cy="6" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(14, 18)" rx="6" cx="6" ry="6" cy="6" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 34).gte(5)},
            onHover() {player.fl.glossaryIndex=215},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=215},
        },

        221: {
            name: "Cubic 2-Petalled Blue Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[221].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 35).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal2" transform="translate(24, 16)" rx="16" ry="14" cx="16" cy="14" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(4, 16)" rx="16" ry="14" cx="16" cy="14" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 19)" points="10 0, 0 6, 0 16, 10 22, 20 16, 20 6" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <line transform="translate(20, 19)" x1="10" y1="12" x2="10" y2="22" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="0" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="20" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
            `,
            display() {return buyableEffect("al", 102).gte(1)},
            onHover() {player.fl.glossaryIndex=221},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=221},
        },
        222: {
            name: "Cubic 3-Petalled Blue Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[222].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 35).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal3" transform="translate(17.5, 6.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(29.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(5.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 23)" points="10 0, 0 6, 0 16, 10 22, 20 16, 20 6" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <line transform="translate(20, 23)" x1="10" y1="12" x2="10" y2="22" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 23)" x1="0" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 23)" x1="20" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
            `,
            display() {return buyableEffect("al", 102).gte(2)},
            onHover() {player.fl.glossaryIndex=222},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=222},
        },
        223: {
            name: "Cubic 4-Petalled Blue Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[223].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 35).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal4" transform="translate(20, 6)" rx="10" cx="10" ry="10" cy="10" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(34, 20)" rx="10" cx="10" ry="10" cy="10" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(20, 34)" rx="10" cx="10" ry="10" cy="10" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(6, 20)" rx="10" cx="10" ry="10" cy="10" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 19)" points="10 0, 0 6, 0 16, 10 22, 20 16, 20 6" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <line transform="translate(20, 19)" x1="10" y1="12" x2="10" y2="22" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="0" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="20" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
            `,
            display() {return buyableEffect("al", 102).gte(3)},
            onHover() {player.fl.glossaryIndex=223},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=223},
        },
        224: {
            name: "Cubic 5-Petalled Blue Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[224].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 35).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal5" transform="translate(22.5, 9.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(30.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(15.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(10.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 19)" points="10 0, 0 6, 0 16, 10 22, 20 16, 20 6" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <line transform="translate(20, 19)" x1="10" y1="12" x2="10" y2="22" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="0" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="20" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
            `,
            display() {return buyableEffect("al", 102).gte(4)},
            onHover() {player.fl.glossaryIndex=224},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=224},
        },
        225: {
            name: "Cubic 6-Petalled Blue Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[225].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 35).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal6" transform="translate(24, 12)" rx="6" cx="6" ry="6" cy="6" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal5" transform="translate(34, 18)" rx="6" cx="6" ry="6" cy="6" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34, 30)" rx="6" cx="6" ry="6" cy="6" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(24, 36)" rx="6" cx="6" ry="6" cy="6" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(14, 30)" rx="6" cx="6" ry="6" cy="6" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(14, 18)" rx="6" cx="6" ry="6" cy="6" fill="#80cec4" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 19)" points="10 0, 0 6, 0 16, 10 22, 20 16, 20 6" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <line transform="translate(20, 19)" x1="10" y1="12" x2="10" y2="22" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="0" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="20" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
            `,
            display() {return buyableEffect("al", 102).gte(5)},
            onHover() {player.fl.glossaryIndex=225},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=225},
        },


        301: {
            name: "Circular 2-Petalled Green Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[301].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 45).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal2" transform="translate(24, 16)" rx="16" ry="14" cx="16" cy="14" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(4, 16)" rx="16" ry="14" cx="16" cy="14" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return true},
            onHover() {player.fl.glossaryIndex=301},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=301},
        },
        302: {
            name: "Circular 3-Petalled Green Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[302].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 45).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal3" transform="translate(17.5, 6.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(29.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(5.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 24)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return true},
            onHover() {player.fl.glossaryIndex=302},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=302},
        },
        303: {
            name: "Circular 4-Petalled Green Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[303].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 45).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal4" transform="translate(20, 6)" rx="10" cx="10" ry="10" cy="10" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(34, 20)" rx="10" cx="10" ry="10" cy="10" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(20, 34)" rx="10" cx="10" ry="10" cy="10" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(6, 20)" rx="10" cx="10" ry="10" cy="10" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return true},
            onHover() {player.fl.glossaryIndex=303},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=303},
        },
        304: {
            name: "Circular 5-Petalled Green Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[304].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 45).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal5" transform="translate(22.5, 9.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(30.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(15.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(10.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return true},
            onHover() {player.fl.glossaryIndex=304},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=304},
        },
        305: {
            name: "Circular 6-Petalled Green Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[305].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 45).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal6" transform="translate(24, 12)" rx="6" cx="6" ry="6" cy="6" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal5" transform="translate(34, 18)" rx="6" cx="6" ry="6" cy="6" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34, 30)" rx="6" cx="6" ry="6" cy="6" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(24, 36)" rx="6" cx="6" ry="6" cy="6" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(14, 30)" rx="6" cx="6" ry="6" cy="6" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(14, 18)" rx="6" cx="6" ry="6" cy="6" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return true},
            onHover() {player.fl.glossaryIndex=305},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=305},
        },

        311: {
            name: "Pentagonal 2-Petalled Green Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[311].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 45).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal2" transform="translate(24, 16)" rx="16" ry="14" cx="16" cy="14" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(4, 16)" rx="16" ry="14" cx="16" cy="14" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 44).gte(1)},
            onHover() {player.fl.glossaryIndex=311},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=311},
        },
        312: {
            name: "Pentagonal 3-Petalled Green Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[312].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 45).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal3" transform="translate(17.5, 6.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(29.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(5.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 24)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 44).gte(2)},
            onHover() {player.fl.glossaryIndex=312},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=312},
        },
        313: {
            name: "Pentagonal 4-Petalled Green Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[313].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 45).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal4" transform="translate(20, 6)" rx="10" cx="10" ry="10" cy="10" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(34, 20)" rx="10" cx="10" ry="10" cy="10" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(20, 34)" rx="10" cx="10" ry="10" cy="10" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(6, 20)" rx="10" cx="10" ry="10" cy="10" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 44).gte(3)},
            onHover() {player.fl.glossaryIndex=313},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=313},
        },
        314: {
            name: "Pentagonal 5-Petalled Green Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[314].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 45).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal5" transform="translate(22.5, 9.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(30.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(15.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(10.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 44).gte(4)},
            onHover() {player.fl.glossaryIndex=314},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=314},
        },
        315: {
            name: "Pentagonal 6-Petalled Green Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[315].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 45).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal6" transform="translate(24, 12)" rx="6" cx="6" ry="6" cy="6" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal5" transform="translate(34, 18)" rx="6" cx="6" ry="6" cy="6" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34, 30)" rx="6" cx="6" ry="6" cy="6" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(24, 36)" rx="6" cx="6" ry="6" cy="6" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(14, 30)" rx="6" cx="6" ry="6" cy="6" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(14, 18)" rx="6" cx="6" ry="6" cy="6" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 44).gte(5)},
            onHover() {player.fl.glossaryIndex=315},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=315},
        },

        321: {
            name: "Cubic 2-Petalled Green Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[321].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 45).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal2" transform="translate(24, 16)" rx="16" ry="14" cx="16" cy="14" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(4, 16)" rx="16" ry="14" cx="16" cy="14" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 19)" points="10 0, 0 6, 0 16, 10 22, 20 16, 20 6" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <line transform="translate(20, 19)" x1="10" y1="12" x2="10" y2="22" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="0" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="20" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
            `,
            display() {return buyableEffect("al", 202).gte(1)},
            onHover() {player.fl.glossaryIndex=321},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=321},
        },
        322: {
            name: "Cubic 3-Petalled Green Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[322].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 45).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal3" transform="translate(17.5, 6.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(29.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(5.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 23)" points="10 0, 0 6, 0 16, 10 22, 20 16, 20 6" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <line transform="translate(20, 23)" x1="10" y1="12" x2="10" y2="22" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 23)" x1="0" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 23)" x1="20" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
            `,
            display() {return buyableEffect("al", 202).gte(2)},
            onHover() {player.fl.glossaryIndex=322},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=322},
        },
        323: {
            name: "Cubic 4-Petalled Green Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[323].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 45).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal4" transform="translate(20, 6)" rx="10" cx="10" ry="10" cy="10" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(34, 20)" rx="10" cx="10" ry="10" cy="10" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(20, 34)" rx="10" cx="10" ry="10" cy="10" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(6, 20)" rx="10" cx="10" ry="10" cy="10" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 19)" points="10 0, 0 6, 0 16, 10 22, 20 16, 20 6" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <line transform="translate(20, 19)" x1="10" y1="12" x2="10" y2="22" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="0" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="20" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
            `,
            display() {return buyableEffect("al", 202).gte(3)},
            onHover() {player.fl.glossaryIndex=323},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=323},
        },
        324: {
            name: "Cubic 5-Petalled Green Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[324].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 45).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal5" transform="translate(22.5, 9.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(30.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(15.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(10.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 19)" points="10 0, 0 6, 0 16, 10 22, 20 16, 20 6" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <line transform="translate(20, 19)" x1="10" y1="12" x2="10" y2="22" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="0" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="20" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
            `,
            display() {return buyableEffect("al", 202).gte(4)},
            onHover() {player.fl.glossaryIndex=324},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=324},
        },
        325: {
            name: "Cubic 6-Petalled Green Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[325].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).mul(buyableEffect("bee", 45).add(1)).add(1)) + " Nectar"},
            svg: `
                <ellipse id="petal6" transform="translate(24, 12)" rx="6" cx="6" ry="6" cy="6" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal5" transform="translate(34, 18)" rx="6" cx="6" ry="6" cy="6" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34, 30)" rx="6" cx="6" ry="6" cy="6" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(24, 36)" rx="6" cx="6" ry="6" cy="6" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(14, 30)" rx="6" cx="6" ry="6" cy="6" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(14, 18)" rx="6" cx="6" ry="6" cy="6" fill="#659157" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 19)" points="10 0, 0 6, 0 16, 10 22, 20 16, 20 6" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <line transform="translate(20, 19)" x1="10" y1="12" x2="10" y2="22" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="0" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
                <line transform="translate(20, 19)" x1="20" y1="6" x2="10" y2="12" stroke="#000000" stroke-width="2.4"/>
            `,
            display() {return buyableEffect("al", 202).gte(5)},
            onHover() {player.fl.glossaryIndex=325},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=325},
        },


        401: {
            name: "Circular 2-Petalled Pink Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[401].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Bee Bread"},
            svg: `
                <ellipse id="petal2" transform="translate(24, 16)" rx="16" ry="14" cx="16" cy="14" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(4, 16)" rx="16" ry="14" cx="16" cy="14" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 53).gte(1)},
            onHover() {player.fl.glossaryIndex=401},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=401},
        },
        402: {
            name: "Circular 3-Petalled Pink Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[402].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Bee Bread"},
            svg: `
                <ellipse id="petal3" transform="translate(17.5, 6.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(29.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(5.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 24)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 53).gte(2)},
            onHover() {player.fl.glossaryIndex=402},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=402},
        },
        403: {
            name: "Circular 4-Petalled Pink Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[403].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Bee Bread"},
            svg: `
                <ellipse id="petal4" transform="translate(20, 6)" rx="10" cx="10" ry="10" cy="10" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(34, 20)" rx="10" cx="10" ry="10" cy="10" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(20, 34)" rx="10" cx="10" ry="10" cy="10" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(6, 20)" rx="10" cx="10" ry="10" cy="10" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 53).gte(3)},
            onHover() {player.fl.glossaryIndex=403},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=403},
        },
        404: {
            name: "Circular 5-Petalled Pink Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[404].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Bee Bread"},
            svg: `
                <ellipse id="petal5" transform="translate(22.5, 9.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(30.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(15.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(10.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 53).gte(4)},
            onHover() {player.fl.glossaryIndex=404},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=404},
        },
        405: {
            name: "Circular 6-Petalled Pink Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[405].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Bee Bread"},
            svg: `
                <ellipse id="petal6" transform="translate(24, 12)" rx="6" cx="6" ry="6" cy="6" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal5" transform="translate(34, 18)" rx="6" cx="6" ry="6" cy="6" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34, 30)" rx="6" cx="6" ry="6" cy="6" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(24, 36)" rx="6" cx="6" ry="6" cy="6" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(14, 30)" rx="6" cx="6" ry="6" cy="6" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(14, 18)" rx="6" cx="6" ry="6" cy="6" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 53).gte(5)},
            onHover() {player.fl.glossaryIndex=405},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=405},
        },

        411: {
            name: "Pentagonal 2-Petalled Pink Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[411].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Bee Bread"},
            svg: `
                <ellipse id="petal2" transform="translate(24, 16)" rx="16" ry="14" cx="16" cy="14" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(4, 16)" rx="16" ry="14" cx="16" cy="14" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return player.bb.breadMilestone >= 7 && player.bb.breadEffects[6].gte(1)},
            onHover() {player.fl.glossaryIndex=411},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=411},
        },
        412: {
            name: "Pentagonal 3-Petalled Pink Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[412].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Bee Bread"},
            svg: `
                <ellipse id="petal3" transform="translate(17.5, 6.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(29.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(5.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 24)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return player.bb.breadMilestone >= 7 && player.bb.breadEffects[6].gte(2)},
            onHover() {player.fl.glossaryIndex=412},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=412},
        },
        413: {
            name: "Pentagonal 4-Petalled Pink Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[413].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Bee Bread"},
            svg: `
                <ellipse id="petal4" transform="translate(20, 6)" rx="10" cx="10" ry="10" cy="10" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(34, 20)" rx="10" cx="10" ry="10" cy="10" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(20, 34)" rx="10" cx="10" ry="10" cy="10" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(6, 20)" rx="10" cx="10" ry="10" cy="10" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return player.bb.breadMilestone >= 7 && player.bb.breadEffects[6].gte(3)},
            onHover() {player.fl.glossaryIndex=413},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=413},
        },
        414: {
            name: "Pentagonal 5-Petalled Pink Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[414].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Bee Bread"},
            svg: `
                <ellipse id="petal5" transform="translate(22.5, 9.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(30.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(15.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(10.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return player.bb.breadMilestone >= 7 && player.bb.breadEffects[6].gte(4)},
            onHover() {player.fl.glossaryIndex=414},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=414},
        },
        415: {
            name: "Pentagonal 6-Petalled Pink Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[415].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Bee Bread"},
            svg: `
                <ellipse id="petal6" transform="translate(24, 12)" rx="6" cx="6" ry="6" cy="6" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal5" transform="translate(34, 18)" rx="6" cx="6" ry="6" cy="6" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34, 30)" rx="6" cx="6" ry="6" cy="6" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(24, 36)" rx="6" cx="6" ry="6" cy="6" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(14, 30)" rx="6" cx="6" ry="6" cy="6" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(14, 18)" rx="6" cx="6" ry="6" cy="6" fill="#FDE3E6" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return player.bb.breadMilestone >= 7 && player.bb.breadEffects[6].gte(5)},
            onHover() {player.fl.glossaryIndex=415},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=415},
        },

        501: {
            name: "Circular 2-Petalled Yellow Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[501].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Honey-Cells"},
            svg: `
                <ellipse id="petal2" transform="translate(24, 16)" rx="16" ry="14" cx="16" cy="14" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(4, 16)" rx="16" ry="14" cx="16" cy="14" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return player.ho.cell.gte(15)},
            onHover() {player.fl.glossaryIndex=501},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=501},
        },
        502: {
            name: "Circular 3-Petalled Yellow Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[502].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Honey-Cells"},
            svg: `
                <ellipse id="petal3" transform="translate(17.5, 6.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(29.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(5.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 24)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return player.ho.cell.gte(15)},
            onHover() {player.fl.glossaryIndex=502},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=502},
        },
        503: {
            name: "Circular 4-Petalled Yellow Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[503].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Honey-Cells"},
            svg: `
                <ellipse id="petal4" transform="translate(20, 6)" rx="10" cx="10" ry="10" cy="10" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(34, 20)" rx="10" cx="10" ry="10" cy="10" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(20, 34)" rx="10" cx="10" ry="10" cy="10" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(6, 20)" rx="10" cx="10" ry="10" cy="10" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return player.ho.cell.gte(15)},
            onHover() {player.fl.glossaryIndex=503},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=503},
        },
        504: {
            name: "Circular 5-Petalled Yellow Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[504].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Honey-Cells"},
            svg: `
                <ellipse id="petal5" transform="translate(22.5, 9.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(30.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(15.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(10.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return player.ho.cell.gte(15)},
            onHover() {player.fl.glossaryIndex=504},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=504},
        },
        505: {
            name: "Circular 6-Petalled Yellow Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[505].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Honey-Cells"},
            svg: `
                <ellipse id="petal6" transform="translate(24, 12)" rx="6" cx="6" ry="6" cy="6" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal5" transform="translate(34, 18)" rx="6" cx="6" ry="6" cy="6" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34, 30)" rx="6" cx="6" ry="6" cy="6" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(24, 36)" rx="6" cx="6" ry="6" cy="6" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(14, 30)" rx="6" cx="6" ry="6" cy="6" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(14, 18)" rx="6" cx="6" ry="6" cy="6" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal0" transform="translate(20, 20)" rx="10" cx="10" ry="10" cy="10" fill="#ffefc5" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return player.ho.cell.gte(15)},
            onHover() {player.fl.glossaryIndex=505},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=505},
        },

        511: {
            name: "Pentagonal 2-Petalled Yellow Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[511].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Honey-Cells"},
            svg: `
                <ellipse id="petal2" transform="translate(24, 16)" rx="16" ry="14" cx="16" cy="14" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(4, 16)" rx="16" ry="14" cx="16" cy="14" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 64).gte(1)},
            onHover() {player.fl.glossaryIndex=511},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=511},
        },
        512: {
            name: "Pentagonal 3-Petalled Yellow Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[512].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Honey-Cells"},
            svg: `
                <ellipse id="petal3" transform="translate(17.5, 6.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(29.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(5.5, 28.5)" rx="12.5" cx="12.5" ry="12.5" cy="12.5" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 24)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 64).gte(2)},
            onHover() {player.fl.glossaryIndex=512},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=512},
        },
        513: {
            name: "Pentagonal 4-Petalled Yellow Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[513].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Honey-Cells"},
            svg: `
                <ellipse id="petal4" transform="translate(20, 6)" rx="10" cx="10" ry="10" cy="10" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(34, 20)" rx="10" cx="10" ry="10" cy="10" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(20, 34)" rx="10" cx="10" ry="10" cy="10" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(6, 20)" rx="10" cx="10" ry="10" cy="10" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 64).gte(3)},
            onHover() {player.fl.glossaryIndex=513},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=513},
        },
        514: {
            name: "Pentagonal 5-Petalled Yellow Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[514].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Honey-Cells"},
            svg: `
                <ellipse id="petal5" transform="translate(22.5, 9.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(30.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(15.5, 32.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(10.5, 18.5)" rx="7.5" cx="7.5" ry="7.5" cy="7.5" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 64).gte(4)},
            onHover() {player.fl.glossaryIndex=514},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=514},
        },
        515: {
            name: "Pentagonal 6-Petalled Yellow Flower",
            getTitle() {return "x" + formatShort(player.fl.glossary[515].add(1).log(2).ceil().mul(0.1).mul(player.fl.glossaryBase).div(10).add(1)) + " Honey-Cells"},
            svg: `
                <ellipse id="petal6" transform="translate(24, 12)" rx="6" cx="6" ry="6" cy="6" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal5" transform="translate(34, 18)" rx="6" cx="6" ry="6" cy="6" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal4" transform="translate(34, 30)" rx="6" cx="6" ry="6" cy="6" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal3" transform="translate(24, 36)" rx="6" cx="6" ry="6" cy="6" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal2" transform="translate(14, 30)" rx="6" cx="6" ry="6" cy="6" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <ellipse id="petal1" transform="translate(14, 18)" rx="6" cx="6" ry="6" cy="6" fill="#fae033" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
                <polygon id="petal0" transform="translate(20, 20)" points="10 0, 0 9, 6 20, 14 20, 20 9" fill="#ffdd87" fill-rule="evenodd" stroke="#000000" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="bevel"/>
            `,
            display() {return buyableEffect("bee", 64).gte(5)},
            onHover() {player.fl.glossaryIndex=515},
            onClick() {if (player.al.cocoonLevel >= 3) player.fl.glossaryRig=515},
        },
        //#fae033
    },
    grid: {
        rows: 5,
        cols: 5,
        getStartData(id) {
            return [0, new Decimal(1)]
        },
        getTitle(data, id) {
            if (getGridData("fl", id)[0] != 0) {
                let num = getGridData("fl", id)[1].max(0)
                let type = Math.floor(getGridData("fl", id)[0] / 10)
                switch (type) {
                    case 11: 
                        num = num.div(5).ceil()
                        break;
                    case 20: case 30:
                        num = num.div(3).ceil()
                        break;
                    case 21: case 31:
                        num = num.div(15).ceil()
                        break;
                    case 40: case 50:
                        num = num.div(10).ceil()
                        break;
                    case 41: case 51:
                        num = num.div(50).ceil()
                        break;
                    case 12:
                        num = num.div(100).ceil()
                        break;
                    case 22: case 32:
                        num = num.div(300).ceil()
                        break;
                    case 42: case 52:
                        num = num.div(1000).ceil()
                        break;
                    default:
                        num = num.ceil()
                }
                let str = layers.fl.glossary[getGridData("fl", id)[0]].svg
                str = str.slice(str.indexOf('<ellipse id="petal' + toNumber(num)))
                if (str == " ") {
                    str = layers.fl.glossary[getGridData("fl", id)[0]].svg
                    str = str.slice(str.indexOf('<polygon id="petal' + toNumber(num)))
                }
                return "<svg width='60pt' height='60pt' viewBox='0 0 60 60' style='filter:drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.5))'>" + str + "</svg>"
            }
            return ""
        },
        getCanClick(data, id) {
            return getGridData("fl", id)[0] != 0
        },
        onClick(data, id) {
            if (getGridData("fl", id)[1].gt(0)) {
                setGridData("fl", id, [getGridData("fl", id)[0], getGridData("fl", id)[1].sub(player.fl.pickingPower)])
            } else {
                player.fl.glossary[getGridData("fl", id)[0]] = player.fl.glossary[getGridData("fl", id)[0]].add(player.fl.flowerGain)
                setGridData("fl", id, [0, new Decimal(1)])
            }
        },
        getStyle(data, id) {
            let look = {width: "100px", height: "100px", backgroundColor: "#136d15", border: "5px solid rgba(0,0,0,0.3)", borderRadius: "0", padding: "0", margin: "-2.5px"}
            return look
        }
    },
    clickables: {
        1: {
            canClick: true,
            unlocked: true,
            onClick() {
                if (player.fl.flowerTimerPause[0]) {
                    player.fl.flowerTimerPause[0] = false
                } else {
                    player.fl.flowerTimerPause[0] = true
                }
            },
            style() {
                let look = {width: "10px", minHeight: "480px", height: "480px", border: "0", borderRadius: "0", padding: "0", marginTop: "4px", transform: "scale(1)", boxShadow: "0 0 black"}
                if (player.fl.flowerTimerPause[0]) {
                    look.background = `linear-gradient(to top, #b21c0e ${format(player.fl.flowerTimers[0].div(player.fl.flowerTimersMax[0]).mul(100).min(100))}%, black ${format(player.fl.flowerTimers[0].div(player.fl.flowerTimersMax[0]).mul(100).add(0.25).min(100))}%)`
                } else {
                    look.background = `linear-gradient(to top, #b21c0e ${format(player.fl.flowerTimers[0].div(player.fl.flowerTimersMax[0]).mul(100).min(100))}%, black ${format(player.fl.flowerTimers[0].div(player.fl.flowerTimersMax[0]).mul(100).add(0.25).min(100))}%)`
                }
                return look
            }
        },
        2: {
            canClick: true,
            unlocked() {return hasUpgrade("bpl", 14)},
            onClick() {
                if (player.fl.flowerTimerPause[1]) {
                    player.fl.flowerTimerPause[1] = false
                } else {
                    player.fl.flowerTimerPause[1] = true
                }
            },
            style() {
                let look = {width: "10px", minHeight: "480px", height: "480px", border: "0", borderRadius: "0", padding: "0", marginTop: "4px", transform: "scale(1)", boxShadow: "0 0 black"}
                if (player.fl.flowerTimerPause[1]) {
                    look.background = `linear-gradient(to top, #80cec4 ${format(player.fl.flowerTimers[1].div(player.fl.flowerTimersMax[1]).mul(100).min(100))}%, black ${format(player.fl.flowerTimers[1].div(player.fl.flowerTimersMax[1]).mul(100).add(0.25).min(100))}%)`
                } else {
                    look.background = `linear-gradient(to top, #80cec4 ${format(player.fl.flowerTimers[1].div(player.fl.flowerTimersMax[1]).mul(100).min(100))}%, black ${format(player.fl.flowerTimers[1].div(player.fl.flowerTimersMax[1]).mul(100).add(0.25).min(100))}%)`
                }
                return look
            }
        },
        3: {
            canClick: true,
            unlocked() {return hasUpgrade("ne", 201)},
            onClick() {
                if (player.fl.flowerTimerPause[2]) {
                    player.fl.flowerTimerPause[2] = false
                } else {
                    player.fl.flowerTimerPause[2] = true
                }
            },
            style() {
                let look = {width: "10px", minHeight: "480px", height: "480px", border: "0", borderRadius: "0", padding: "0", marginTop: "4px", transform: "scale(1)", boxShadow: "0 0 black"}
                if (player.fl.flowerTimerPause[2]) {
                    look.background = `linear-gradient(to top, #659157 ${format(player.fl.flowerTimers[2].div(player.fl.flowerTimersMax[2]).mul(100).min(100))}%, black ${format(player.fl.flowerTimers[2].div(player.fl.flowerTimersMax[2]).mul(100).add(0.25).min(100))}%)`
                } else {
                    look.background = `linear-gradient(to top, #659157 ${format(player.fl.flowerTimers[2].div(player.fl.flowerTimersMax[2]).mul(100).min(100))}%, black ${format(player.fl.flowerTimers[2].div(player.fl.flowerTimersMax[2]).mul(100).add(0.25).min(100))}%)`
                }
                return look
            }
        },
        4: {
            canClick: true,
            unlocked() {return buyableEffect("bee", 53).gte(1)},
            onClick() {
                if (player.fl.flowerTimerPause[3]) {
                    player.fl.flowerTimerPause[3] = false
                } else {
                    player.fl.flowerTimerPause[3] = true
                }
            },
            style() {
                let look = {width: "10px", minHeight: "480px", height: "480px", border: "0", borderRadius: "0", padding: "0", marginTop: "4px", transform: "scale(1)", boxShadow: "0 0 black"}
                if (player.fl.flowerTimerPause[3]) {
                    look.background = `linear-gradient(to top, #FDE3E6 ${format(player.fl.flowerTimers[3].div(player.fl.flowerTimersMax[3]).mul(100).min(100))}%, black ${format(player.fl.flowerTimers[3].div(player.fl.flowerTimersMax[3]).mul(100).add(0.25).min(100))}%)`
                } else {
                    look.background = `linear-gradient(to top, #FDE3E6 ${format(player.fl.flowerTimers[3].div(player.fl.flowerTimersMax[3]).mul(100).min(100))}%, black ${format(player.fl.flowerTimers[3].div(player.fl.flowerTimersMax[3]).mul(100).add(0.25).min(100))}%)`
                }
                return look
            }
        },
        5: {
            canClick: true,
            unlocked() {return player.ho.cell.gte(15)},
            onClick() {
                if (player.fl.flowerTimerPause[4]) {
                    player.fl.flowerTimerPause[4] = false
                } else {
                    player.fl.flowerTimerPause[4] = true
                }
            },
            style() {
                let look = {width: "10px", minHeight: "480px", height: "480px", border: "0", borderRadius: "0", padding: "0", marginTop: "4px", transform: "scale(1)", boxShadow: "0 0 black"}
                if (player.fl.flowerTimerPause[4]) {
                    look.background = `linear-gradient(to top, #fae033 ${format(player.fl.flowerTimers[4].div(player.fl.flowerTimersMax[4]).mul(100).min(100))}%, black ${format(player.fl.flowerTimers[4].div(player.fl.flowerTimersMax[4]).mul(100).add(0.25).min(100))}%)`
                } else {
                    look.background = `linear-gradient(to top, #fae033 ${format(player.fl.flowerTimers[4].div(player.fl.flowerTimersMax[4]).mul(100).min(100))}%, black ${format(player.fl.flowerTimers[4].div(player.fl.flowerTimersMax[4]).mul(100).add(0.25).min(100))}%)`
                }
                return look
            }
        },
    },
    microtabs: {
        Tabs: {
            "Garden": {
                content: [
                    ["style-row", [
                        ["style-column", [
                            "grid",
                        ], {width: "480px", height: "480px"}],
                        ["left-row", [
                            ["clickable", 1],
                            ["clickable", 2],
                            ["clickable", 3],
                            ["clickable", 4],
                            ["clickable", 5],
                        ], {width: "50px", height: "480px", backgroundColor: "black", borderLeft: "5px solid #3e3117"}],
                    ], {width: "535px", height: "480px", backgroundColor: "#3e3117", border: "5px solid #3e3117"}],
                ],
            },
            "Glossary": {
                content: [
                    ["style-column", [
                        "glossary-display",
                        ["left-row", [
                            ["category-button", [() => {return "Red<br><small>x" + formatShort(player.fl.glossaryEffects.bee) + "</small>"}, "Glossary", "Red"], {width: "103px", height: "40px", background: "#1a0402"}],
                            ["style-row", [], {width: "5px", height: "40px", backgroundColor: "#3e3117"}],
                            ["category-button", [() => {return "Blue<br><small>x" + formatShort(player.fl.glossaryEffects.pollen) + "</small>"}, "Glossary", "Blue", () => {return !hasUpgrade("bpl", 14) && !tmp.bb.layerShown}], {width: "103px", height: "40px", background: "#131e1d"}],
                            ["style-row", [], {width: "5px", height: "40px", backgroundColor: "#3e3117"}],
                            ["category-button", [() => {return "Green<br><small>x" + formatShort(player.fl.glossaryEffects.nectar) + "</small>"}, "Glossary", "Green", () => {return !hasUpgrade("ne", 201) && !tmp.ho.layerShown}], {width: "103px", height: "40px", background: "#141d11"}],
                            ["style-row", [], {width: "5px", height: "40px", backgroundColor: "#3e3117"}],
                            ["category-button", [() => {return "Pink<br><small>x" + formatShort(player.fl.glossaryEffects.beeBread) + "</small>"}, "Glossary", "Pink", () => {return buyableEffect("bee", 53).eq(0)}], {width: "103px", height: "40px", background: "#252122"}],
                            ["style-row", [], {width: "5px", height: "40px", backgroundColor: "#3e3117"}],
                            ["category-button", [() => {return "Yellow<br><small>x" + formatShort(player.fl.glossaryEffects.honey) + "</small>"}, "Glossary", "Yellow", () => {return player.ho.cell.lt(15)}], {width: "103px", height: "40px", background: "#252107"}],
                        ], {width: "535px", height: "40px", background: "#181818", borderBottom: "5px solid #3e3117"}],
                        ["buttonless-microtabs", "Glossary", {borderWidth: "0"}],
                        ["style-column", [
                            ["raw-html", () => {return "Currently rigging: " + layers.fl.glossary[player.fl.glossaryRig].name}, {color: "#ccc", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", "(Rigged flowers are guaranteed to be rolled if its tier is picked)", {color: "#ccc", fontSize: "14px", fontFamily: "monospace"}],
                        ], () => {return player.al.cocoonLevel >= 3 ? {width: "535px", height: "65px", background: "#251d0d", borderTop: "5px solid #3e3117"} : {width: "535px", height: "70px"}}],
                    ], {width: "535px", height: "480px", backgroundColor: "#312712", border: "5px solid #3e3117"}],
                ]
            },
        },
        Glossary: {
            "Red": {
                content: [
                    ["top-column", [
                        ["left-row", [["glossary", 101], ["glossary", 102], ["glossary", 103], ["glossary", 104], ["glossary", 105]], {width: "500px"}],
                        ["left-row", [["glossary", 111], ["glossary", 112], ["glossary", 113], ["glossary", 114], ["glossary", 115]], {width: "500px"}],
                        ["left-row", [["glossary", 121], ["glossary", 122], ["glossary", 123], ["glossary", 124], ["glossary", 125]], {width: "500px"}],
                    ], {width: "535px", height: "300px"}],
                ],
            },
            "Blue": {
                content: [
                    ["top-column", [
                        ["left-row", [["glossary", 201], ["glossary", 202], ["glossary", 203], ["glossary", 204], ["glossary", 205]], {width: "500px"}],
                        ["left-row", [["glossary", 211], ["glossary", 212], ["glossary", 213], ["glossary", 214], ["glossary", 215]], {width: "500px"}],
                        ["left-row", [["glossary", 221], ["glossary", 222], ["glossary", 223], ["glossary", 224], ["glossary", 225]], {width: "500px"}],
                    ], {width: "535px", height: "300px"}],
                ]
            },
            "Green": {
                content: [
                    ["top-column", [
                        ["left-row", [["glossary", 301], ["glossary", 302], ["glossary", 303], ["glossary", 304], ["glossary", 305]], {width: "500px"}],
                        ["left-row", [["glossary", 311], ["glossary", 312], ["glossary", 313], ["glossary", 314], ["glossary", 315]], {width: "500px"}],
                        ["left-row", [["glossary", 321], ["glossary", 322], ["glossary", 323], ["glossary", 324], ["glossary", 325]], {width: "500px"}],
                    ], {width: "535px", height: "300px"}],
                ]
            },
            "Pink": {
                content: [
                    ["top-column", [
                        ["left-row", [["glossary", 401], ["glossary", 402], ["glossary", 403], ["glossary", 404], ["glossary", 405]], {width: "500px"}],
                        ["left-row", [["glossary", 411], ["glossary", 412], ["glossary", 413], ["glossary", 414], ["glossary", 415]], {width: "500px"}],
                    ], {width: "535px", height: "300px"}],
                ]
            },
            "Yellow": {
                content: [
                    ["top-column", [
                        ["left-row", [["glossary", 501], ["glossary", 502], ["glossary", 503], ["glossary", 504], ["glossary", 505]], {width: "500px"}],
                        ["left-row", [["glossary", 511], ["glossary", 512], ["glossary", 513], ["glossary", 514], ["glossary", 515]], {width: "500px"}],
                    ], {width: "535px", height: "300px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return player.bee.bees.eq(1) ? "You have <h3>" + format(player.bee.bees) + "</h3> bee." : "You have <h3>" + format(player.bee.bees) + "</h3> bees."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.bee.bps) + "/s)" }, {color: "white", fontSize: "20px", fontFamily: "monospace", marginLeft: "5px"}],
        ]],
        ["blank", "10px"],
        ["style-row", [
            ["raw-html", () => {
                if (player.subtabs.fl.Tabs == "Garden") return "<button class='shopButton selected' style='width:265px;height:40px;background:#181309' onclick='player.subtabs.fl.Tabs = `Garden`'>Garden</button>"
                return "<button class='shopButton' style='width:265px;height:40px;background:#181309' onclick='player.subtabs.fl.Tabs = `Garden`'>Garden</button>"
            }],
            ["style-row", [], {width: "5px", height: "40px", backgroundColor: "#3e3117"}],
            ["raw-html", () => {
                if (player.subtabs.fl.Tabs == "Glossary") return "<button class='shopButton selected' style='width:265px;height:40px;background:#181309' onclick='player.subtabs.fl.Tabs = `Glossary`'>Glossary</button>"
                return "<button class='shopButton' style='width:265px;height:40px;background:#181309' onclick='player.subtabs.fl.Tabs = `Glossary`'>Glossary</button>"
            }],
        ], {width: "535px", height: "40px", border: "5px solid #3e3117", marginBottom: "-5px"}],
        ["buttonless-microtabs", "Tabs", {borderWidth: "0"}],
        ["style-row", [
            ["style-column", [
                ["raw-html", "Picking Power", {color: "#ccc", fontSize: "16px", fontFamily: "monospace"}],
                ["style-row", [], {width: "150px", height: "1px", background: "#ccc", marginTop: "3px"}],
                ["raw-html", () => {return formatSimple(player.fl.pickingPower, 1)}, {color: "#ccc", fontSize: "14px", fontFamily: "monospace"}],
            ], {width: "175px", height: "50px", borderRight: "5px solid #3e3117"}],
            ["style-column", [
                ["raw-html", "Flower Gain", {color: "#ccc", fontSize: "16px", fontFamily: "monospace"}],
                ["style-row", [], {width: "150px", height: "1px", background: "#ccc", marginTop: "3px"}],
                ["raw-html", () => {return formatSimple(player.fl.flowerGain, 1)}, {color: "#ccc", fontSize: "14px", fontFamily: "monospace"}],
            ], {width: "175px", height: "50px", borderRight: "5px solid #3e3117"}],
            ["style-column", [
                ["raw-html", "GEB Multiplier", {color: "#ccc", fontSize: "16px", fontFamily: "monospace"}],
                ["style-row", [], {width: "150px", height: "1px", background: "#ccc", marginTop: "3px"}],
                ["raw-html", () => {return formatSimple(player.fl.glossaryBase, 2)}, {color: "#ccc", fontSize: "14px", fontFamily: "monospace"}],
            ], {width: "175px", height: "50px"}],
        ], {width: "535px", height: "50px", background: "#181309", border: "5px solid #3e3117", marginTop: "-5px"}],
    ],
    layerShown() { return player.startedGame && player.bee.totalResearch.gte(1) }
})
//#926829
//#3e3117