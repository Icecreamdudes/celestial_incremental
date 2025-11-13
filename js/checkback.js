const CANTE_BASES = [
    [new Decimal(0.2), new Decimal(0.3), new Decimal(0.5), new Decimal(0.02), new Decimal(1.4), new Decimal(2.5), new Decimal(5), new Decimal(12)],
    [new Decimal(1.6), new Decimal(3), new Decimal(5.5), new Decimal(9), new Decimal(7), new Decimal(14), new Decimal(30)],
    [new Decimal(10), new Decimal(30)]
]
addLayer("cb", {
    name: "Check Back", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CB", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        highestLevel: new Decimal(1),
        level: new Decimal(1),
        levelEffect: new Decimal(1),
        xp: new Decimal(0),
        totalxp: new Decimal(4.5),
        xpMult: new Decimal(1),
        req: new Decimal(4),
        reqDiv: new Decimal(1),
        effectActivate: false,

        xpTimers: {
            0: {
                current: new Decimal(0),
                max: new Decimal(60),
                base: new Decimal(1),
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            1: {
                current: new Decimal(0),
                max: new Decimal(180),
                base: new Decimal(2),
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            2: {
                current: new Decimal(0),
                max: new Decimal(300),
                base: new Decimal(4),
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            3: {
                current: new Decimal(0),
                max: new Decimal(5),
                base: new Decimal(0.06),
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            4: {
                current: new Decimal(0),
                max: new Decimal(1200),
                base: new Decimal(25),
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            5: {
                current: new Decimal(0),
                max: new Decimal(3600),
                base: new Decimal(80),
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            6: {
                current: new Decimal(0),
                max: new Decimal(14400),
                base: new Decimal(220),
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            7: {
                current: new Decimal(0),
                max: new Decimal(86400),
                base: new Decimal(666),
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
        },

        petPoints: new Decimal(0),

        cbTickspeed: new Decimal(1),

        //crates
        crateTimers: {
            0: {
                current: new Decimal(0),
                max: new Decimal(900),
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            1: {
                current: new Decimal(0),
                max: new Decimal(2700),
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            2: {
                current: new Decimal(0),
                max: new Decimal(5400),
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            3: {
                current: new Decimal(0),
                max: new Decimal(21600),
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            4: {
                current: new Decimal(0),
                max: new Decimal(7200),
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            5: {
                current: new Decimal(0),
                max: new Decimal(36000),
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            6: {
                current: new Decimal(0),
                max: new Decimal(86400),
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
        },

        //legendary
        legendaryPetGems: [new Decimal(0), new Decimal(0), new Decimal(0)],
        //red purple green

        evolutionShards: new Decimal(0),
        IC7shardCount: 0,

        //xpboost
        XPBoost: new Decimal(1),
        boostTimers: {
            0: {
                current: new Decimal(0),
                max: new Decimal(10800),
                base: new Decimal(0.2),
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            1: {
                current: new Decimal(0),
                max: new Decimal(129600),
                base: new Decimal(0.5),
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
        },

        XPBoostEffect: new Decimal(1),

        //point
        pointTimers: {
            0: {
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            1: {
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            2: {
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            3: {
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            4: {
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            5: {
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            6: {
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            7: {
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
            8: {
                autoCurrent: new Decimal(0),
                autoMax: new Decimal(0),
                autoAllocate: new Decimal(0),
            },
        },

        //paragon
        paragonShards: new Decimal(0),

        //pity system
        pityEvoCurrent: new Decimal(0),
        pityParaCurrent: new Decimal(0),
        pityMax: new Decimal(200),

        //autom
        totalAutomationShards: new Decimal(0),
        automationShards: new Decimal(0),
        autoAllocateAmt: new Decimal(1),
    }},
    automate() {},
    nodeStyle() {},
    tooltip: "Check Back",
    color: "#094599",
    update(delta) {
        let onepersec = new Decimal(1)
        onepersec = onepersec.mul(player.ev10.checkbackBoost)
        onepersec = onepersec.mul(player.cb.cbTickspeed)

        player.cb.cbTickspeed = new Decimal(1)
        player.cb.cbTickspeed = player.cb.cbTickspeed.mul(player.hrm.realmEssenceEffects[1])
        if (hasUpgrade("cs", 1203)) player.cb.cbTickspeed = player.cb.cbTickspeed.mul(1.1)

        if (player.cb.totalxp == 4.5 && player.cb.level > 1) {
            player.cb.totalxp = layers.cb.levelToXP(player.cb.level).add(player.cb.xp)
        }

        if (player.cb.level.gte(player.cb.highestLevel)) {
            player.cb.highestLevel = player.cb.level
        }

        if (player.points.gt(1e100) && !inChallenge("ip", 13)) {
            player.cb.effectActivate = true
        } else {
            player.cb.effectActivate = false
        }

        player.cb.reqDiv = new Decimal(1)
        player.cb.reqDiv = player.cb.reqDiv.mul(levelableEffect("pet", 203)[2])
        player.cb.reqDiv = player.cb.reqDiv.mul(levelableEffect("pet", 304)[1])

        player.cb.req = layers.cb.levelToXP(player.cb.level.add(1)).sub(layers.cb.levelToXP(player.cb.level))

        for (let i in player.cb.xpTimers) {
            player.cb.xpTimers[i].current = player.cb.xpTimers[i].current.sub(onepersec.mul(delta))
        }

        if (player.cb.xp.gte(player.cb.req)) {
            layers.cb.levelup();
        }

        player.cb.levelEffect = player.cb.level.pow(3).pow(player.d.dicePointsEffect)
        if (hasUpgrade("bi", 25) && (!player.po.dice)) player.cb.levelEffect = player.cb.levelEffect.pow(5)
        if (hasUpgrade("bi", 25) && (player.po.dice)) player.cb.levelEffect = player.cb.levelEffect.pow(2)
        if (hasUpgrade("s", 17)) player.cb.levelEffect = player.cb.levelEffect.pow(5)
        
        player.cb.xpTimers[0].base = new Decimal(1).mul(buyableEffect("ev1", 13))
        player.cb.xpTimers[1].base = new Decimal(2).mul(buyableEffect("ev1", 15))
        player.cb.xpTimers[2].base = new Decimal(4).mul(buyableEffect("ev1", 17))
        player.cb.xpTimers[3].base = new Decimal(0.06).mul(buyableEffect("ev1", 11))
        player.cb.xpTimers[4].base = new Decimal(25).mul(buyableEffect("ev1", 21))
        player.cb.xpTimers[5].base = new Decimal(80).mul(buyableEffect("ev1", 23))
        player.cb.xpTimers[6].base = new Decimal(220).mul(buyableEffect("ev1", 25))
        player.cb.xpTimers[7].base = new Decimal(666).mul(buyableEffect("ev1", 27))

        for (let i in player.cb.xpTimers) {
            player.cb.xpTimers[i].base = player.cb.xpTimers[i].base.mul(buyableEffect("gh", 21))
            player.cb.xpTimers[i].base = player.cb.xpTimers[i].base.mul(levelableEffect("pet", 101)[1])
            player.cb.xpTimers[i].base = player.cb.xpTimers[i].base.mul(levelableEffect("pet", 205)[0])
            player.cb.xpTimers[i].base = player.cb.xpTimers[i].base.mul(levelableEffect("pet", 301)[1])
            player.cb.xpTimers[i].base = player.cb.xpTimers[i].base.mul(player.ev0.coinDustEffect)
            player.cb.xpTimers[i].base = player.cb.xpTimers[i].base.mul(player.cb.XPBoostEffect)
            player.cb.xpTimers[i].base = player.cb.xpTimers[i].base.mul(player.d.boosterEffects[12])
            player.cb.xpTimers[i].base = player.cb.xpTimers[i].base.mul(buyableEffect("g", 25))
            if (hasUpgrade("hpw", 1013)) player.cb.xpTimers[i].base = player.cb.xpTimers[i].base.mul(upgradeEffect("hpw", 1013))
            player.cb.xpTimers[i].base = player.cb.xpTimers[i].base.mul(player.cs.scraps.checkback.effect)
            player.cb.xpTimers[i].base = player.cb.xpTimers[i].base.mul(player.co.cores.checkback.effect[0])
            player.cb.xpTimers[i].base = player.cb.xpTimers[i].base.mul(levelableEffect("pu", 202)[2])
            player.cb.xpTimers[i].base = player.cb.xpTimers[i].base.mul(levelableEffect("pet", 406)[0])
            player.cb.xpTimers[i].base = player.cb.xpTimers[i].base.mul(player.pet.gemEffects[0])
            player.cb.xpTimers[i].base = player.cb.xpTimers[i].base.mul(buyableEffect("ep3", 12))
            player.cb.xpTimers[i].base = player.cb.xpTimers[i].base.mul(buyableEffect("pl", 12))
            if (hasMilestone("db", 101)) player.cb.xpTimers[i].base = player.cb.xpTimers[i].base.mul(1.25)
            if (player.ma.matosDefeated) player.cb.xpTimers[i].base = player.cb.xpTimers[i].base.mul(2)
        }

        player.cb.xpTimers[0].max = new Decimal(60).div(buyableEffect("ev1", 14))
        player.cb.xpTimers[1].max = new Decimal(180).div(buyableEffect("ev1", 16))
        player.cb.xpTimers[2].max = new Decimal(300).div(buyableEffect("ev1", 18))
        player.cb.xpTimers[3].max = new Decimal(5).div(buyableEffect("ev1", 12))
        player.cb.xpTimers[4].max = new Decimal(1200).div(buyableEffect("ev1", 22))
        player.cb.xpTimers[5].max = new Decimal(3600).div(buyableEffect("ev1", 24))
        player.cb.xpTimers[6].max = new Decimal(14400).div(buyableEffect("ev1", 26))
        player.cb.xpTimers[7].max = new Decimal(86400).div(buyableEffect("ev1", 28))

        for (let i in player.cb.xpTimers) {
            player.cb.xpTimers[i].max = player.cb.xpTimers[i].max.div(buyableEffect("gh", 22))
            player.cb.xpTimers[i].max = player.cb.xpTimers[i].max.div(levelableEffect("pet", 105)[1])
            player.cb.xpTimers[i].max = player.cb.xpTimers[i].max.div(levelableEffect("pet", 202)[2])
            player.cb.xpTimers[i].max = player.cb.xpTimers[i].max.div(buyableEffect("ev0", 12))
            player.cb.xpTimers[i].max = player.cb.xpTimers[i].max.div(player.co.cores.checkback.effect[2])
            player.cb.xpTimers[i].max = player.cb.xpTimers[i].max.div(levelableEffect("pu", 201)[2])
            if (player.rf.abilityTimers[6].gt(0)) player.cb.xpTimers[i].max = player.cb.xpTimers[i].max.div(1.2)
            if (hasUpgrade("ev8", 15)) player.cb.xpTimers[i].max = player.cb.xpTimers[i].max.div(1.15)
        }

        player.cb.crateTimers[0].max = new Decimal(900)
        player.cb.crateTimers[1].max = new Decimal(2700)
        player.cb.crateTimers[2].max = new Decimal(5400)
        player.cb.crateTimers[3].max = new Decimal(28800)
        player.cb.crateTimers[4].max = new Decimal(7200)
        player.cb.crateTimers[5].max = new Decimal(42000)
        player.cb.crateTimers[6].max = new Decimal(86400)
        for (let i in player.cb.crateTimers) {
            player.cb.crateTimers[i].max = player.cb.crateTimers[i].max.div(levelableEffect("pet", 105)[0])
            player.cb.crateTimers[i].max = player.cb.crateTimers[i].max.div(levelableEffect("pet", 202)[2])
            player.cb.crateTimers[i].max = player.cb.crateTimers[i].max.div(buyableEffect("ev0", 13))
            if (hasUpgrade("ev8", 12)) player.cb.crateTimers[i].max = player.cb.crateTimers[i].max.div(1.1)
            player.cb.crateTimers[i].max = player.cb.crateTimers[i].max.div(levelableEffect("pet", 1104)[2])

            player.cb.crateTimers[i].current = player.cb.crateTimers[i].current.sub(onepersec.mul(delta))
        }

        //xpboost

        player.cb.boostTimers[0].base = new Decimal(0.2)
        player.cb.boostTimers[1].base = new Decimal(0.5)
        if (player.cb.level.lt(10000)) {
            player.cb.boostTimers[0].base = player.cb.boostTimers[0].base.mul(player.cb.level.div(100).pow(1.2))
            player.cb.boostTimers[1].base = player.cb.boostTimers[1].base.mul(player.cb.level.div(80).pow(1.1))
        } else if (player.cb.level.lt(100000)) {
            player.cb.boostTimers[0].base = player.cb.boostTimers[0].base.mul(player.cb.level.div(40))
            player.cb.boostTimers[1].base = player.cb.boostTimers[1].base.mul(player.cb.level.div(50))
        } else {
            player.cb.boostTimers[0].base = player.cb.boostTimers[0].base.mul(player.cb.level.div(16.8).pow(0.9))
            player.cb.boostTimers[1].base = player.cb.boostTimers[1].base.mul(player.cb.level.div(21.5).pow(0.9))
        }
        for (let i in player.cb.boostTimers) {
            player.cb.boostTimers[i].base = player.cb.boostTimers[i].base.mul(levelableEffect("pet", 1203)[1])
            player.cb.boostTimers[i].base = player.cb.boostTimers[i].base.mul(levelableEffect("pet", 107)[0])
            player.cb.boostTimers[i].base = player.cb.boostTimers[i].base.mul(buyableEffect("cb", 13))
            player.cb.boostTimers[i].base = player.cb.boostTimers[i].base.mul(player.co.cores.checkback.effect[1])
            if (hasUpgrade("ev8", 16)) player.cb.boostTimers[i].base = player.cb.boostTimers[i].base.mul(1.2)
            player.cb.boostTimers[i].base = player.cb.boostTimers[i].base.mul(levelableEffect("pet", 406)[1])
            player.cb.boostTimers[i].base = player.cb.boostTimers[i].base.mul(player.pet.gemEffects[2])
            player.cb.boostTimers[i].base = player.cb.boostTimers[i].base.mul(buyableEffect("ep5", 12))
            player.cb.boostTimers[i].base = player.cb.boostTimers[i].base.mul(buyableEffect("pl", 13))
            if (player.ma.matosDefeated) player.cb.boostTimers[i].base = player.cb.boostTimers[i].base.mul(1.5)
        }

        player.cb.boostTimers[0].max = new Decimal(10800)
        player.cb.boostTimers[1].max = new Decimal(129600)
        for (let i in player.cb.boostTimers) {
            player.cb.boostTimers[i].max = player.cb.boostTimers[i].max.div(levelableEffect("pet", 401)[2])
            player.cb.boostTimers[i].max = player.cb.boostTimers[i].max.div(buyableEffect("ep5", 13))

            player.cb.boostTimers[i].current = player.cb.boostTimers[i].current.sub(onepersec.mul(delta))
        }

        if (player.cb.XPBoost.lte(1000)) {
        player.cb.XPBoostEffect = player.cb.XPBoost
        } else if (player.cb.XPBoost.gte(1000)) {
            player.cb.XPBoostEffect = Decimal.add(1000, player.cb.XPBoost.sub(1000).pow(0.5).mul(10))
        }
        


        //automation
        for (let i in player.cb.xpTimers) {
            if (player.cb.xpTimers[i].autoAllocate.gt(0)) {
                player.cb.xpTimers[i].autoMax = player.cb.xpTimers[i].max.mul(10).div(player.cb.xpTimers[i].autoAllocate.pow(0.75))
                player.cb.xpTimers[i].autoMax = player.cb.xpTimers[i].autoMax.div(buyableEffect("ma", 33))
            }

            if (player.cb.xpTimers[i].autoCurrent.gt(player.cb.xpTimers[i].max.mul(10).div(buyableEffect("ma", 33)))) player.cb.xpTimers[i].autoCurrent = player.cb.xpTimers[i].autoMax
            if (player.cb.xpTimers[i].autoAllocate.gt(0)) player.cb.xpTimers[i].autoCurrent = player.cb.xpTimers[i].autoCurrent.sub(onepersec.mul(delta))

            if (player.cb.xpTimers[i].autoCurrent.lt(0)) {
                player.cb.xpTimers[i].autoCurrent = player.cb.xpTimers[i].autoMax
                player.cb.xp = player.cb.xp.add(player.cb.xpTimers[i].base.mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.xpTimers[i].base.mul(player.cb.xpMult))
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[0][i].mul(player.ca.canteEnergyMult))
            }
        }

        //pet
        for (let i in player.cb.crateTimers) {
            if (player.cb.crateTimers[i].autoAllocate.gt(0)) {
                player.cb.crateTimers[i].autoMax = player.cb.crateTimers[i].max.mul(25).div(player.cb.crateTimers[i].autoAllocate.pow(0.75))
                player.cb.crateTimers[i].autoMax = player.cb.crateTimers[i].autoMax.div(buyableEffect("ma", 34))
            }

            if (player.cb.crateTimers[i].autoCurrent.gt(player.cb.crateTimers[i].max.mul(25).div(buyableEffect("ma", 34)))) player.cb.crateTimers[i].autoCurrent = player.cb.crateTimers[i].autoMax
            if (player.cb.crateTimers[i].autoAllocate.gt(0)) player.cb.crateTimers[i].autoCurrent = player.cb.crateTimers[i].autoCurrent.sub(onepersec.mul(delta))

            if (player.cb.crateTimers[i].autoCurrent.lt(0)) {
                switch (i) {
                    case 0:
                        layers.cb.petButton1()
                        break;
                    case 1:
                        layers.cb.petButton2()
                        break;
                    case 2:
                        layers.cb.petButton3()
                        break;
                    case 3:
                        layers.cb.petButton4()
                        break;
                    case 4:
                        layers.cb.petButton5()
                        break;
                    case 5:
                        layers.cb.petButton6()
                        break;
                    case 6:
                        layers.cb.petButton7()
                        break;
                }
                player.cb.crateTimers[i].autoCurrent = player.cb.crateTimers[i].autoMax

                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[1][i].mul(player.ca.canteEnergyMult))
            }
        }

        // XPBoost
        for (let i in player.cb.boostTimers) {
            if (player.cb.boostTimers[i].autoAllocate.gt(0)) player.cb.boostTimers[i].autoMax = player.cb.boostTimers[i].max.mul(100).div(player.cb.boostTimers[i].autoAllocate.pow(0.75))

            if (player.cb.boostTimers[i].autoCurrent.gt(player.cb.boostTimers[i].max.mul(100))) player.cb.boostTimers[i].autoCurrent = player.cb.boostTimers[i].autoMax
            if (player.cb.boostTimers[i].autoAllocate.gt(0)) player.cb.boostTimers[i].autoCurrent = player.cb.boostTimers[i].autoCurrent.sub(onepersec.mul(delta))

            if (player.cb.boostTimers[i].autoCurrent.lt(0)) {
                player.cb.boostTimers[i].autoCurrent = player.cb.boostTimers[i].autoMax
                player.cb.XPBoost = player.cb.XPBoost.add(player.cb.boostTimers[i].base)
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[2][i].mul(player.ca.canteEnergyMult))
            }
        }

        // Pet Points
        for (let i in player.cb.pointTimers) {
            let pet = Number(i) + 301
            if (player.cb.pointTimers[i].autoAllocate.gt(0)) player.cb.pointTimers[i].autoMax = tmp.pet.levelables[pet].pointCooldown.mul(50).div(player.cb.pointTimers[i].autoAllocate.pow(0.75))

            if (player.cb.pointTimers[i].autoCurrent.gt(tmp.pet.levelables[pet].pointCooldown.mul(50))) player.cb.pointTimers[i].autoCurrent = player.cb.pointTimers[i].autoMax
            if (player.cb.pointTimers[i].autoAllocate.gt(0)) player.cb.pointTimers[i].autoCurrent = player.cb.pointTimers[i].autoCurrent.sub(onepersec.mul(delta))

            if (player.cb.pointTimers[i].autoCurrent.lt(0)) {
                player.cb.pointTimers[i].autoCurrent = player.cb.pointTimers[i].autoMax
                let pval = layers.pet.levelables[pet].pointClick()
                player.cb.petPoints = player.cb.petPoints.add(pval)
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[pet].canteBase.mul(player.ca.canteEnergyMult))
            }
        }

        let usedAutomationShards = new Decimal(0)
        for (let i in player.cb.xpTimers) {
            usedAutomationShards = usedAutomationShards.add(player.cb.xpTimers[i].autoAllocate)
        }
        for (let i in player.cb.crateTimers) {
            usedAutomationShards = usedAutomationShards.add(player.cb.crateTimers[i].autoAllocate)
        }
        for (let i in player.cb.boostTimers) {
            usedAutomationShards = usedAutomationShards.add(player.cb.boostTimers[i].autoAllocate)
        }
        for (let i in player.cb.pointTimers) {
            usedAutomationShards = usedAutomationShards.add(player.cb.pointTimers[i].autoAllocate)
        }
        player.cb.totalAutomationShards = player.cb.automationShards.add(usedAutomationShards)

        // PITY
        player.cb.pityMax = new Decimal(200).sub(buyableEffect("cb", 16))

        if (player.cb.pityEvoCurrent.gte(player.cb.pityMax)) {
            if (inChallenge("ip", 17)) player.cb.IC7shardCount++
            player.cb.evolutionShards = player.cb.evolutionShards.add(1)
            player.cb.pityEvoCurrent = new Decimal(0)
            doPopup("none", "+1 Evolution Shard! (PITY)", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
        }
        if (player.cb.pityParaCurrent.gte(player.cb.pityMax)) {
            player.cb.paragonShards = player.cb.paragonShards.add(1)
            player.cb.pityParaCurrent = new Decimal(0)
            doPopup("none", "+1 Paragon Shard! (PITY)", "Shard Obtained!", 5, "#4c64ff", "resources/paragonShard.png")
        }

        if (player.cb.paragonShards.lte(0)) {
            player.cb.paragonShards = new Decimal(0)
        }
    },
    levelToXP(quantity) {
        // The big XP additions are the difference between post-softcap XP and pre-softcap XP at the softcap level
        if (quantity.lt(1000)) {
            quantity = quantity.add(1.5).pow(2).div(2).div(player.cb.reqDiv)
        } else if (quantity.lt(10000)) {
            quantity = quantity.pow(2.25).div(2).sub(2309705).div(player.cb.reqDiv)
        } else if (quantity.lt(100000)) {
            quantity = quantity.pow(2.5).sub(9502309705).div(player.cb.reqDiv)
        } else {
            quantity = Decimal.pow(1000, quantity.pow(0.125)).sub(1323276439362).div(player.cb.reqDiv)
        }
        return quantity
    },
    xpToLevel(quantity) {
        // The number the quantity is less then is XP equivalent to the level softcaps above
        // The big XP additions are the difference between post-softcap XP and pre-softcap XP at the softcap level
        if (quantity.lt(Decimal.div(501501, player.cb.reqDiv))) {
            quantity = quantity.mul(player.cb.reqDiv).mul(2).pow(1/2).sub(1.5).floor()
        } else if (quantity.lt(Decimal.div(497690295, player.cb.reqDiv))) {
            quantity = quantity.mul(player.cb.reqDiv).add(2309705).mul(2).pow(4/9).floor()
        } else if (quantity.lt(Decimal.div(3152775350463, player.cb.reqDiv))) {
            quantity = quantity.mul(player.cb.reqDiv).add(9502309705).pow(2/5).floor()
        } else {
            quantity = quantity.mul(player.cb.reqDiv).add(1323276439362).log(10).div(3).pow(8).floor()
        }
        return quantity
    },
    levelup() {
        let leftover = new Decimal(0)
        player.cb.level = layers.cb.xpToLevel(player.cb.totalxp)
        leftover = player.cb.totalxp - layers.cb.levelToXP(player.cb.level)
        player.cb.xp = new Decimal(0)
        player.cb.xp = player.cb.xp.add(leftover)
    },
    instantProduction(time) {
        layers.cb.update(time)
        layers.pet.update(time)
        layers.ep0.update(time)
        layers.ep1.update(time)
        layers.ep2.update(time)
        layers.ev0.update(time)
        layers.ev2.update(time)
        layers.ev8.update(time)
    },
    branches: ["m"],
    clickables: {
        11: {
            title() { return player.cb.xpTimers[0].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.xpTimers[0].current) + "." : "<h3>+" + format(player.cb.xpTimers[0].base.mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.xpTimers[0].current.lt(0) && this.unlocked() },
            unlocked() { return true },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 0.5%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.xpTimers[0].base.mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.xpTimers[0].base.mul(player.cb.xpMult))
                player.cb.xpTimers[0].current = player.cb.xpTimers[0].max
                if (inChallenge("ip", 17)) {
                    for (let i in player.cb.xpTimers) {
                        player.cb.xpTimers[i].current = player.cb.xpTimers[i].max
                    }
                }

                if (player.cb.highestLevel.gt(35)) {
                    let random = getRandomInt(200)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        if (inChallenge("ip", 17)) player.cb.IC7shardCount++
                        doPopup("none", "+1 Evolution Shard! (0.5%)", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(0.5);
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[0][0].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#094599" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        12: {
            title() { return player.cb.xpTimers[1].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.xpTimers[1].current) + "." : "<h3>+" + format(player.cb.xpTimers[1].base.mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.xpTimers[1].current.lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(3) },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 1%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.xpTimers[1].base.mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.xpTimers[1].base.mul(player.cb.xpMult))
                player.cb.xpTimers[1].current = player.cb.xpTimers[1].max
                if (inChallenge("ip", 17)) {
                    for (let i in player.cb.xpTimers) {
                        player.cb.xpTimers[i].current = player.cb.xpTimers[i].max
                    }
                }

                if (player.cb.highestLevel.gt(35)) {
                    let random = getRandomInt(100)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        if (inChallenge("ip", 17)) player.cb.IC7shardCount++
                        doPopup("none", "+1 Evolution Shard! (1%)", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(1);
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[0][1].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#094599" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        13: {
            title() { return player.cb.xpTimers[2].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.xpTimers[2].current) + "." : "<h3>+" + format(player.cb.xpTimers[2].base.mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.xpTimers[2].current.lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(6) },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 2%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.xpTimers[2].base.mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.xpTimers[2].base.mul(player.cb.xpMult))
                player.cb.xpTimers[2].current = player.cb.xpTimers[2].max
                if (inChallenge("ip", 17)) {
                    for (let i in player.cb.xpTimers) {
                        player.cb.xpTimers[i].current = player.cb.xpTimers[i].max
                    }
                }

                if (player.cb.highestLevel.gt(35)) {
                    let random = getRandomInt(50)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        if (inChallenge("ip", 17)) player.cb.IC7shardCount++
                        doPopup("none", "+1 Evolution Shard! (2%)", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(2);
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[0][2].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#094599" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        14: {
            title() { return player.cb.xpTimers[3].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.xpTimers[3].current) + "." : "<h3>+" + format(player.cb.xpTimers[3].base.mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.xpTimers[3].current.lt(0) && this.unlocked() },
            unlocked() { return (hasMilestone("r", 17) || hasMilestone("s", 14)) },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 0.2%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.xpTimers[3].base.mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.xpTimers[3].base.mul(player.cb.xpMult))
                player.cb.xpTimers[3].current = player.cb.xpTimers[3].max
                if (inChallenge("ip", 17)) {
                    for (let i in player.cb.xpTimers) {
                        player.cb.xpTimers[i].current = player.cb.xpTimers[i].max
                    }
                }

                if (player.cb.highestLevel.gt(35)) {
                    let random = getRandomInt(500)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        if (inChallenge("ip", 17)) player.cb.IC7shardCount++
                        doPopup("none", "+1 Evolution Shard! (0.2%)", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(0.2);
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[0][3].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#094599" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        15: {
            title() { return player.cb.xpTimers[4].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.xpTimers[4].current) + "." : "<h3>+" + format(player.cb.xpTimers[4].base.mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.xpTimers[4].current.lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(15) },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 5%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.xpTimers[4].base.mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.xpTimers[4].base.mul(player.cb.xpMult))
                player.cb.xpTimers[4].current = player.cb.xpTimers[4].max
                if (inChallenge("ip", 17)) {
                    for (let i in player.cb.xpTimers) {
                        player.cb.xpTimers[i].current = player.cb.xpTimers[i].max
                    }
                }

                if (player.cb.highestLevel.gt(35)) {
                    let random = getRandomInt(20)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        if (inChallenge("ip", 17)) player.cb.IC7shardCount++
                        doPopup("none", "+1 Evolution Shard! (5%)", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(5);
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[0][4].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#094599" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        16: {
            title() { return player.cb.xpTimers[5].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.xpTimers[5].current) + "." : "<h3>+" + format(player.cb.xpTimers[5].base.mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.xpTimers[5].current.lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(50) },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 20%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.xpTimers[5].base.mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.xpTimers[5].base.mul(player.cb.xpMult))
                player.cb.xpTimers[5].current = player.cb.xpTimers[5].max
                if (inChallenge("ip", 17)) {
                    for (let i in player.cb.xpTimers) {
                        player.cb.xpTimers[i].current = player.cb.xpTimers[i].max
                    }
                }

                if (player.cb.highestLevel.gt(35)) {
                    let random = getRandomInt(5)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        if (inChallenge("ip", 17)) player.cb.IC7shardCount++
                        doPopup("none", "+1 Evolution Shard! (20%)", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(20);
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[0][5].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#094599" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        17: {
            title() { return player.cb.xpTimers[6].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.xpTimers[6].current) + "." : "<h3>+" + format(player.cb.xpTimers[6].base.mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.xpTimers[6].current.lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(65) },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 50%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.xpTimers[6].base.mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.xpTimers[6].base.mul(player.cb.xpMult))
                player.cb.xpTimers[6].current = player.cb.xpTimers[6].max
                if (inChallenge("ip", 17)) {
                    for (let i in player.cb.xpTimers) {
                        player.cb.xpTimers[i].current = player.cb.xpTimers[i].max
                    }
                }

                if (player.cb.highestLevel.gt(35)) {
                    let random = getRandomInt(2)
                    if (random == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0);
                        if (inChallenge("ip", 17)) player.cb.IC7shardCount++
                        doPopup("none", "+1 Evolution Shard! (50%)", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(50);
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[0][6].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#094599" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        18: {
            title() { return player.cb.xpTimers[7].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.xpTimers[7].current) + "." : "<h3>+" + format(player.cb.xpTimers[7].base.mul(player.cb.xpMult)) + " XP."},
            canClick() { return player.cb.xpTimers[7].current.lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(150) },
            tooltip() { return player.cb.highestLevel.gte(35) ? "Evo Shard Rarity: 98%" : ""},
            onClick() {
                player.cb.xp = player.cb.xp.add(player.cb.xpTimers[7].base.mul(player.cb.xpMult))
                player.cb.totalxp = player.cb.totalxp.add(player.cb.xpTimers[7].base.mul(player.cb.xpMult))
                player.cb.xpTimers[7].current = player.cb.xpTimers[7].max
                if (inChallenge("ip", 17)) {
                    for (let i in player.cb.xpTimers) {
                        player.cb.xpTimers[i].current = player.cb.xpTimers[i].max
                    }
                }

                if (player.cb.highestLevel.gt(35)) {
                    let random = getRandomInt(50)
                    if (random != 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        player.cb.pityEvoCurrent = new Decimal(0)
                        if (inChallenge("ip", 17)) player.cb.IC7shardCount++
                        doPopup("none", "+1 Evolution Shard! (98%)", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
                    } else {
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(98)
                        doPopup("none", "", "Damn bro you didn't gain an evo shard. Take a screenshot, send to the discord, and ping the dev. I think ur still cool.", 60, "#d487fd", "resources/evoShardDenied.png")
                    }
                }
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[0][7].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#094599" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },

        99: {
            title() {return "Claim All"},
            canClick() {return tmp.cb.clickables[11].canClick || tmp.cb.clickables[12].canClick || tmp.cb.clickables[13].canClick
                || tmp.cb.clickables[14].canClick || tmp.cb.clickables[15].canClick || tmp.cb.clickables[16].canClick
                || tmp.cb.clickables[17].canClick || tmp.cb.clickables[18].canClick},
            unlocked() {return player.cb.highestLevel.gte(200)},
            onClick() {
                clickClickable("cb", 11)
                clickClickable("cb", 12)
                clickClickable("cb", 13)
                clickClickable("cb", 14)
                clickClickable("cb", 15)
                clickClickable("cb", 16)
                clickClickable("cb", 17)
                clickClickable("cb", 18)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "140px", minHeight: "40px", borderRadius: "0px", margin: "5px"}
                this.canClick() ? look.backgroundColor = "#094599" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        // PET BUTTONS
        101: {
            title() { return player.cb.crateTimers[0].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.crateTimers[0].current) + "." : "<h3>Collect a random common pet."},
            canClick() { return player.cb.crateTimers[0].current.lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(10) },
            tooltip() { return "18% - Gwa<br>18% - Egg Guy<br>18% - Unsmith<br>18% - Gd Checkpoint<br>18% - Slax<br>10% - Teste"},
            onClick() {
                if (!hasAchievement("achievements", 21)) completeAchievement("achievements", 21)
                player.cb.crateTimers[0].current = player.cb.crateTimers[0].max
                layers.cb.petButton1();
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[1][0].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {zIndex: "10", width: "196px", minHeight: "46px", height: "46px", margin: "2px", fontSize: "9px", border: "6px solid", borderRadius: "0", background:"linear-gradient(170deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 55%"}
                if (this.canClick()) {look.backgroundColor = "#9bedff"; look.borderColor = "#7cbdcc"} else {look.backgroundColor = "#bf8f8f"; look.borderColor = "#987272"}
                return look
            },
        },
        102: {
            title() { return player.cb.crateTimers[1].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.crateTimers[1].current) + "." : "<h3>Collect a random <small>uncommon/common</small> pet."},
            canClick() { return player.cb.crateTimers[1].current.lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(25) },
            tooltip() { return "6% - Gwa<br>6% - Egg Guy<br>6% - Unsmith<br>6% - Gd Checkpoint<br>6% - Slax<br>12% - Teste<br>12% - Star<br>12% - Normal Face<br>12% - Shark<br>12% - THE WATCHING EYE<br>10% - Nova"},
            onClick() {
                if (!hasAchievement("achievements", 21)) completeAchievement("achievements", 21)
                player.cb.crateTimers[1].current = player.cb.crateTimers[1].max
                layers.cb.petButton2();
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[1][1].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {zIndex: "9", width: "196px", minHeight: "46px", height: "46px", margin: "2px", fontSize: "9px", border: "6px solid", borderRadius: "0", background:"linear-gradient(170deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 55%"}
                if (this.canClick()) {look.backgroundColor = "#92EAC4"; look.borderColor = "#74bb9c"} else {look.backgroundColor = "#bf8f8f"; look.borderColor = "#987272"}
                return look
            },
        },
        103: {
            title() { return player.cb.crateTimers[2].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.crateTimers[2].current) + "." : "<h3>Collect a random uncommon pet."},
            canClick() { return player.cb.crateTimers[2].current.lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(75) },
            tooltip() { return "16% - Teste<br>16% - Star<br>16% - Normal Face<br>16% - Shark<br>16% - THE WATCHING EYE<br>12% - Goofy Ahh Thing<br>8% - Evo Shard"},
            onClick() {
                player.cb.crateTimers[2].current = player.cb.crateTimers[2].max
                layers.cb.petButton3();
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[1][2].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {zIndex: "8", width: "196px", minHeight: "46px", height: "46px", margin: "2px", fontSize: "9px", border: "6px solid", borderRadius: "0", background:"linear-gradient(170deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 55%"}
                if (this.canClick()) {look.backgroundColor = "#88e688"; look.borderColor = "#6cb86c"} else {look.backgroundColor = "#bf8f8f"; look.borderColor = "#987272"}
                return look
            },
        },
        104: {
            title() { return player.cb.crateTimers[3].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.crateTimers[3].current) + "." : "<h3>Collect a random antimatter pet."},
            canClick() { return player.cb.crateTimers[3].current.lt(0) && player.cb.XPBoost.gt(1.04) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(125) },
            tooltip() { return "COSTS 0.04 XPBOOST<br>25% - Spider<br>25% - Blob<br>15% - Clock<br>15% - Trollface<br>15% - Antimatter<br>5% - Evo Shards"},
            onClick() {
                player.cb.crateTimers[3].current = player.cb.crateTimers[3].max
                layers.cb.petButton4();

                player.cb.XPBoost = player.cb.XPBoost.sub(0.04)
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[1][3].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {zIndex: "7", width: "196px", minHeight: "46px", height: "46px", margin: "2px", fontSize: "9px", border: "6px solid", borderRadius: "0", background:"linear-gradient(170deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 55%"}
                if (this.canClick()) {look.backgroundColor = "#1eb516"; look.borderColor = "#189011"} else {look.backgroundColor = "#bf8f8f"; look.borderColor = "#987272"}
                return look
            },
        },
        105: {
            title() { return player.cb.crateTimers[4].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.crateTimers[4].current) + "." : "<h3>Collect a random replicanti pet."},
            canClick() { return player.cb.crateTimers[4].current.lt(0) && player.cb.XPBoost.gt(1.2) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(1500) && player.ca.unlockedCante },
            tooltip() { return "COSTS 0.2 XPBOOST<br>25% - Replicator<br>25% - Smoke<br>15% - Infinity Breaker<br>15% - John<br>10% - Hex Shadow<br>10% - Grass Square"},
            onClick() {
                player.cb.crateTimers[4].current = player.cb.crateTimers[4].max
                layers.cb.petButton5();

                player.cb.XPBoost = player.cb.XPBoost.sub(0.2)
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[1][4].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {zIndex: "6", width: "196px", minHeight: "46px", height: "46px", margin: "2px", fontSize: "9px", border: "6px solid", borderRadius: "0", background:"linear-gradient(170deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 55%"}
                if (this.canClick()) {look.backgroundColor = "#0a82b9"; look.borderColor = "#086894"} else {look.backgroundColor = "#bf8f8f"; look.borderColor = "#987272"}
                return look
            },
        },
        106: {
            title() { return player.cb.crateTimers[5].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.crateTimers[5].current) + "." : "<h3>Collect a random rare pet."},
            canClick() { return player.cb.crateTimers[5].current.lt(0) && player.cb.XPBoost.gt(3) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(1500) && player.ca.unlockedCante },
            tooltip() { return "COSTS 2 XPBOOST<br>10% - Nova<br>10% - Dice<br>10% - Drippy Ufo<br>10% - Goofy Ahh Thing<br>10% - Antimatter<br>10% - Hex Shadow<br>10% - Grass Square<br>30% - Epic Pet Fragment"},
            onClick() {
                player.cb.crateTimers[5].current = player.cb.crateTimers[5].max
                layers.cb.petButton6();

                player.cb.XPBoost = player.cb.XPBoost.sub(2)
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[1][5].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {zIndex: "5", width: "196px", minHeight: "46px", height: "46px", margin: "2px", fontSize: "9px", border: "6px solid", borderRadius: "0", background:"linear-gradient(170deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 55%"}
                if (this.canClick()) {look.backgroundColor = "#4e7cff"; look.borderColor = "#3e63cc"} else {look.backgroundColor = "#bf8f8f"; look.borderColor = "#987272"}
                return look
            },
        },
        107: {
            title() { return player.cb.crateTimers[6].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.crateTimers[6].current) + "." : "<h3>Collect a random singularity pet."},
            canClick() { return player.cb.crateTimers[6].current.lt(0) && this.unlocked() },
            unlocked() { return player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23) },
            tooltip() { return "30% - Impossible Triangle<br>30% - Forbidden Core<br>10% - Paragon Shard<br>25% - Singularity Fragment<br>5% - Legendary Gems"},
            onClick() {
                player.cb.crateTimers[6].current = player.cb.crateTimers[6].max
                layers.cb.petButton7();
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[1][6].mul(player.ca.canteEnergyMult))
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {zIndex: "4", width: "196px", minHeight: "46px", height: "46px", margin: "2px", fontSize: "9px", border: "6px solid", borderRadius: "0", background:"linear-gradient(170deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 55%"}
                if (this.canClick()) {look.backgroundColor = "#cc4444"; look.borderColor = "#a33636"} else {look.backgroundColor = "#bf8f8f"; look.borderColor = "#987272"}
                return look
            },
        },

        199: {
            title() {return "Claim All"},
            canClick() {return tmp.cb.clickables[101].canClick || tmp.cb.clickables[102].canClick || tmp.cb.clickables[103].canClick
                || tmp.cb.clickables[104].canClick || tmp.cb.clickables[105].canClick || tmp.cb.clickables[106].canClick
                || tmp.cb.clickables[107].canClick},
            unlocked() {return player.cb.highestLevel.gte(200)},
            onClick() {
                clickClickable("cb", 101)
                clickClickable("cb", 102)
                clickClickable("cb", 103)
                clickClickable("cb", 104)
                clickClickable("cb", 105)
                clickClickable("cb", 106)
                clickClickable("cb", 107)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "140px", minHeight: "40px", borderRadius: "0px", margin: "5px"}
                this.canClick() ? look.backgroundColor = "#4e7cff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        // PET POINT BUTTONS
        201: {
            title() { 
                if (player.pet.petTimers[0].gt(0)) {
                    return "<h3>Check back in<br>" + formatTime(player.pet.petTimers[0]) + "."
                } else {
                    return "<h3>+" + format(tmp.pet.levelables[301].pointValue) + "<br>Pet Points."
                }
            },
            canClick() { return player.pet.petTimers[0].lte(0) && this.unlocked() },
            tooltip() { return tmp.pet.levelables[301].pointTooltip },
            unlocked() { return getLevelableAmount("pet", 301).gte(1) },
            onClick() {
                let pval = layers.pet.levelables[301].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petTimers[0] = tmp.pet.levelables[301].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[301].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        202: {
            title() { 
                if (player.pet.petTimers[1].gt(0)) {
                    return "<h3>Check back in<br>" + formatTime(player.pet.petTimers[1]) + "."
                } else {
                    return "<h3>Roll for<br>Pet Points!"
                }
            },
            canClick() { return player.pet.petTimers[1].lte(0) && this.unlocked() },
            tooltip() { return tmp.pet.levelables[302].pointTooltip },
            unlocked() { return getLevelableAmount("pet", 302).gte(1) },
            onClick() {
                let pval = layers.pet.levelables[302].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petTimers[1] = tmp.pet.levelables[302].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[302].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        203: {
            title() { 
                if (player.pet.petTimers[2].gt(0)) {
                    return "<h3>Check back in<br>" + formatTime(player.pet.petTimers[2]) + "."
                } else {
                    return "<h3>+" + format(tmp.pet.levelables[303].pointValue) + "<br>Pet Points."
                }
            },
            canClick() { return player.pet.petTimers[2].lte(0) && this.unlocked() },
            tooltip() { return tmp.pet.levelables[303].pointTooltip },
            unlocked() { return getLevelableAmount("pet", 303).gte(1) },
            onClick() {
                let pval = layers.pet.levelables[303].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petTimers[2] = tmp.pet.levelables[303].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[303].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        204: {
            title() { 
                if (player.pet.petTimers[3].gt(0)) {
                    return "<h3>Check back in<br>" + formatTime(player.pet.petTimers[3]) + "."
                } else {
                    return "<h3>+" + format(tmp.pet.levelables[304].pointValue) + "<br>Pet Points."
                }
            },
            canClick() { return player.pet.petTimers[3].lte(0) && this.unlocked() },
            tooltip() { return tmp.pet.levelables[304].pointTooltip },
            unlocked() { return getLevelableAmount("pet", 304).gte(1) },
            onClick() {
                let pval = layers.pet.levelables[304].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petTimers[3] = tmp.pet.levelables[304].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[304].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        205: {
            title() { 
                if (player.pet.petTimers[4].gt(0)) {
                    return "<h3>Check back in<br>" + formatTime(player.pet.petTimers[4]) + "."
                } else {
                    return "<h3>+" + format(tmp.pet.levelables[305].pointValue) + "<br>Pet Points."
                }
            },
            canClick() { return player.pet.petTimers[4].lte(0) && this.unlocked() },
            tooltip() { return tmp.pet.levelables[305].pointTooltip },
            unlocked() { return getLevelableAmount("pet", 305).gte(1) },
            onClick() {
                let pval = layers.pet.levelables[305].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petTimers[4] = tmp.pet.levelables[305].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[305].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        206: {
            title() { 
                if (player.pet.petTimers[5].gt(0)) {
                    return "<h3>Check back in<br>" + formatTime(player.pet.petTimers[5]) + "."
                } else {
                    return "<h3>+" + format(tmp.pet.levelables[306].pointValue) + "<br>Pet Points."
                }
            },
            canClick() { return player.pet.petTimers[5].lte(0) && this.unlocked() },
            tooltip() { return tmp.pet.levelables[306].pointTooltip },
            unlocked() { return getLevelableAmount("pet", 306).gte(1) },
            onClick() {
                let pval = layers.pet.levelables[306].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petTimers[5] = tmp.pet.levelables[306].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[306].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        207: {
            title() { 
                if (player.pet.petTimers[6].gt(0)) {
                    return "<h3>Check back in<br>" + formatTime(player.pet.petTimers[6]) + "."
                } else {
                    return "<h3>+" + format(tmp.pet.levelables[307].pointValue) + "<br>Pet Points."
                }
            },
            canClick() { return player.pet.petTimers[6].lte(0) && this.unlocked() },
            tooltip() { return tmp.pet.levelables[307].pointTooltip },
            unlocked() { return getLevelableAmount("pet", 307).gte(1) },
            onClick() {
                let pval = layers.pet.levelables[307].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petTimers[6] = tmp.pet.levelables[307].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[307].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        208: {
            title() { 
                if (player.pet.petTimers[7].gt(0)) {
                    return "<h3>Check back in<br>" + formatTime(player.pet.petTimers[7]) + "."
                } else {
                    return "<h3>+" + format(tmp.pet.levelables[308].pointValue) + "<br>Pet Points."
                }
            },
            canClick() { return player.pet.petTimers[7].lte(0) && this.unlocked() },
            tooltip() { return tmp.pet.levelables[308].pointTooltip },
            unlocked() { return getLevelableAmount("pet", 308).gte(1) },
            onClick() {
                let pval = layers.pet.levelables[308].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petTimers[7] = tmp.pet.levelables[308].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[308].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        209: {
            title() { 
                if (player.pet.petTimers[8].gt(0)) {
                    return "<h3>Check back in<br>" + formatTime(player.pet.petTimers[8]) + "."
                } else {
                    return "<h3>+" + format(tmp.pet.levelables[309].pointValue) + "<br>Pet Points."
                }
            },
            canClick() { return player.pet.petTimers[8].lte(0) && this.unlocked() },
            tooltip() { return tmp.pet.levelables[309].pointTooltip },
            unlocked() { return getLevelableAmount("pet", 309).gte(1) },
            onClick() {
                let pval = layers.pet.levelables[309].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petTimers[8] = tmp.pet.levelables[309].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[309].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },

        299: {
            title() {return "Claim All"},
            canClick() {return tmp.cb.clickables[201].canClick || tmp.cb.clickables[202].canClick || tmp.cb.clickables[203].canClick
                || tmp.cb.clickables[204].canClick || tmp.cb.clickables[205].canClick || tmp.cb.clickables[206].canClick
                || tmp.cb.clickables[207].canClick || tmp.cb.clickables[208].canClick || tmp.cb.clickables[209].canClick},
            unlocked() {return player.cb.highestLevel.gte(200)},
            onClick() {
                clickClickable("cb", 201)
                clickClickable("cb", 202)
                clickClickable("cb", 203)
                clickClickable("cb", 204)
                clickClickable("cb", 205)
                clickClickable("cb", 206)
                clickClickable("cb", 207)
                clickClickable("cb", 208)
                clickClickable("cb", 209)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "140px", minHeight: "40px", borderRadius: "0px", margin: "5px"}
                this.canClick() ? look.backgroundColor = "#A2D800" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        // XPBOOST BUTTONS
        301: {
            title() { return player.cb.boostTimers[0].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.boostTimers[0].current) + "." : "<h3>+" + format(player.cb.boostTimers[0].base) + " XP Boost."},
            canClick() { return player.cb.boostTimers[0].current.lt(0) },
            unlocked() { return true },
            tooltip() { return player.cb.highestLevel.gte(250) ? "Paragon Shard Rarity: 10%" : ""},
            onClick() {
                player.cb.XPBoost = player.cb.XPBoost.add(player.cb.boostTimers[0].base)
                player.cb.boostTimers[0].current = player.cb.boostTimers[0].max

                let random = getRandomInt(10)
                if (random == 1) {
                    player.cb.paragonShards = player.cb.paragonShards.add(1);
                    player.cb.pityParaCurrent = new Decimal(0);
                    doPopup("none", "+1 Paragon Shard! (10%)", "Shard Obtained!", 5, "#4c64ff", "resources/paragonShard.png")
                } else {
                    player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(10);
                }
                player.cb.level = new Decimal(1)
                player.cb.xp = new Decimal(0)
                player.cb.totalxp = new Decimal(4.5)
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[2][0].mul(player.ca.canteEnergyMult))
            },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#00B229" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        302: {
            title() { return player.cb.boostTimers[1].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.cb.boostTimers[1].current) + "." : "<h3>+" + format(player.cb.boostTimers[1].base) + " XP Boost."},
            canClick() { return player.cb.boostTimers[1].current.lt(0) || player.cb.highestLevel.lt(500)},
            unlocked() { return player.cb.highestLevel.gte(666) },
            tooltip() { return player.cb.highestLevel.gte(250) ? "Paragon Shard Rarity: 25%" : ""},
            onClick() {
                player.cb.XPBoost = player.cb.XPBoost.add(player.cb.boostTimers[1].base)
                player.cb.boostTimers[1].current = player.cb.boostTimers[1].max

                let random = getRandomInt(4)
                if (random == 1) {
                    player.cb.paragonShards = player.cb.paragonShards.add(1);
                    player.cb.pityParaCurrent = new Decimal(0);
                    doPopup("none", "+1 Paragon Shard! (25%)", "Shard Obtained!", 5, "#4c64ff", "resources/paragonShard.png")
                } else {
                    player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(25);
                }
                player.cb.level = new Decimal(1)
                player.cb.xp = new Decimal(0)
                player.cb.totalxp = new Decimal(4.5)
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(CANTE_BASES[2][1].mul(player.ca.canteEnergyMult))
            },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#00B229" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },

        // AUTOMATION
        401: {
            title() { return "1" },
            canClick() { return player.cb.autoAllocateAmt.neq(1) },
            unlocked() { return true },
            tooltip() { return "Allocate only 1 shard" },
            onClick() {
                player.cb.autoAllocateAmt = new Decimal(1)
            },
            style() {
                let look = {color: "white", width: "115px", minHeight: "47px", borderRadius: "0px", fontSize: "14px"}
                this.canClick() ? look.backgroundColor = "#888888" : look.backgroundColor = "#222222"
                return look
            }, 
        },
        402: {
            title() { return "10" },
            canClick() { return player.cb.autoAllocateAmt.neq(10) },
            unlocked() { return true },
            tooltip() { return "Allocate up to 10 shards" },
            onClick() {
                player.cb.autoAllocateAmt = new Decimal(10)
            },
            style() {
                let look = {color: "white", width: "114px", minHeight: "47px", borderRadius: "0px", fontSize: "14px"}
                this.canClick() ? look.backgroundColor = "#888888" : look.backgroundColor = "#222222"
                return look
            }, 
        },
        403: {
            title() { return "100" },
            canClick() { return player.cb.autoAllocateAmt.neq(100) },
            unlocked() { return true },
            tooltip() { return "Allocate up to 100 shards" },
            onClick() {
                player.cb.autoAllocateAmt = new Decimal(100)
            },
            style() {
                let look = {color: "white", width: "115px", minHeight: "47px", borderRadius: "0px", fontSize: "14px"}
                this.canClick() ? look.backgroundColor = "#888888" : look.backgroundColor = "#222222"
                return look
            }, 
        },

        1001: {
            title() { return "–" },
            canClick() {
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    return player.cb.xpTimers[0].autoAllocate.gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    return player.cb.crateTimers[0].autoAllocate.gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    return player.cb.boostTimers[0].autoAllocate.gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    return player.cb.pointTimers[0].autoAllocate.gte(1)
                } else {
                    return false
                }
            },
            unlocked() { return true },
            tooltip() { return "Return an automation shard" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    if (player.cb.xpTimers[0].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.xpTimers[0].autoAllocate
                    player.cb.xpTimers[0].autoAllocate = player.cb.xpTimers[0].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    if (player.cb.crateTimers[0].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.crateTimers[0].autoAllocate
                    player.cb.crateTimers[0].autoAllocate = player.cb.crateTimers[0].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    if (player.cb.boostTimers[0].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.boostTimers[0].autoAllocate
                    player.cb.boostTimers[0].autoAllocate = player.cb.boostTimers[0].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    if (player.cb.pointTimers[0].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.pointTimers[0].autoAllocate
                    player.cb.pointTimers[0].autoAllocate = player.cb.pointTimers[0].autoAllocate.sub(amt)
                }
                player.cb.automationShards = player.cb.automationShards.add(amt)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },
        1002: {
            title() { return "–" },
            canClick() {
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    return player.cb.xpTimers[1].autoAllocate.gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    return player.cb.crateTimers[1].autoAllocate.gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    return player.cb.boostTimers[1].autoAllocate.gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    return player.cb.pointTimers[1].autoAllocate.gte(1)
                } else {
                    return false
                }
            },
            unlocked() { return true },
            tooltip() { return "Return an automation shard" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    if (player.cb.xpTimers[1].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.xpTimers[1].autoAllocate
                    player.cb.xpTimers[1].autoAllocate = player.cb.xpTimers[1].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    if (player.cb.crateTimers[1].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.crateTimers[1].autoAllocate
                    player.cb.crateTimers[1].autoAllocate = player.cb.crateTimers[1].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    if (player.cb.boostTimers[1].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.boostTimers[1].autoAllocate
                    player.cb.boostTimers[1].autoAllocate = player.cb.boostTimers[1].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    if (player.cb.pointTimers[1].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.pointTimers[1].autoAllocate
                    player.cb.pointTimers[1].autoAllocate = player.cb.pointTimers[1].autoAllocate.sub(amt)
                }
                player.cb.automationShards = player.cb.automationShards.add(amt)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },
        1003: {
            title() { return "–" },
            canClick() {
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    return player.cb.xpTimers[2].autoAllocate.gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    return player.cb.crateTimers[2].autoAllocate.gte(1)
                // } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                //     return player.cb.boostTimers[2].autoAllocate.gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    return player.cb.pointTimers[2].autoAllocate.gte(1)
                } else {
                    return false
                }
            },
            unlocked() { return true },
            tooltip() { return "Return an automation shard" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    if (player.cb.xpTimers[2].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.xpTimers[2].autoAllocate
                    player.cb.xpTimers[2].autoAllocate = player.cb.xpTimers[2].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    if (player.cb.crateTimers[2].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.crateTimers[2].autoAllocate
                    player.cb.crateTimers[2].autoAllocate = player.cb.crateTimers[2].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    if (player.cb.boostTimers[2].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.boostTimers[2].autoAllocate
                    player.cb.boostTimers[2].autoAllocate = player.cb.boostTimers[2].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    if (player.cb.pointTimers[2].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.pointTimers[2].autoAllocate
                    player.cb.pointTimers[2].autoAllocate = player.cb.pointTimers[2].autoAllocate.sub(amt)
                }
                player.cb.automationShards = player.cb.automationShards.add(amt)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },
        1004: {
            title() { return "–" },
            canClick() {
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    return player.cb.xpTimers[3].autoAllocate.gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    return player.cb.crateTimers[3].autoAllocate.gte(1)
                // } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                //     return player.cb.boostTimers[3].autoAllocate.gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    return player.cb.pointTimers[3].autoAllocate.gte(1)
                } else {
                    return false
                }
            },
            unlocked() { return true },
            tooltip() { return "Return an automation shard" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    if (player.cb.xpTimers[3].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.xpTimers[3].autoAllocate
                    player.cb.xpTimers[3].autoAllocate = player.cb.xpTimers[3].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    if (player.cb.crateTimers[3].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.crateTimers[3].autoAllocate
                    player.cb.crateTimers[3].autoAllocate = player.cb.crateTimers[3].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    if (player.cb.boostTimers[3].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.boostTimers[3].autoAllocate
                    player.cb.boostTimers[3].autoAllocate = player.cb.boostTimers[3].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    if (player.cb.pointTimers[3].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.pointTimers[3].autoAllocate
                    player.cb.pointTimers[3].autoAllocate = player.cb.pointTimers[3].autoAllocate.sub(amt)
                }
                player.cb.automationShards = player.cb.automationShards.add(amt)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },
        1005: {
            title() { return "–" },
            canClick() {
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    return player.cb.xpTimers[4].autoAllocate.gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    return player.cb.crateTimers[4].autoAllocate.gte(1)
                // } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                //     return player.cb.boostTimers[4].autoAllocate.gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    return player.cb.pointTimers[4].autoAllocate.gte(1)
                } else {
                    return false
                }
            },
            unlocked() { return true },
            tooltip() { return "Return an automation shard" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    if (player.cb.xpTimers[4].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.xpTimers[4].autoAllocate
                    player.cb.xpTimers[4].autoAllocate = player.cb.xpTimers[4].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    if (player.cb.crateTimers[4].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.crateTimers[4].autoAllocate
                    player.cb.crateTimers[4].autoAllocate = player.cb.crateTimers[4].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    if (player.cb.boostTimers[4].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.boostTimers[4].autoAllocate
                    player.cb.boostTimers[4].autoAllocate = player.cb.boostTimers[4].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    if (player.cb.pointTimers[4].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.pointTimers[4].autoAllocate
                    player.cb.pointTimers[4].autoAllocate = player.cb.pointTimers[4].autoAllocate.sub(amt)
                }
                player.cb.automationShards = player.cb.automationShards.add(amt)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },
        1006: {
            title() { return "–" },
            canClick() {
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    return player.cb.xpTimers[5].autoAllocate.gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    return player.cb.crateTimers[5].autoAllocate.gte(1)
                // } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                //     return player.cb.boostTimers[5].autoAllocate.gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    return player.cb.pointTimers[5].autoAllocate.gte(1)
                } else {
                    return false
                }
            },
            unlocked() { return true },
            tooltip() { return "Return an automation shard" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    if (player.cb.xpTimers[5].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.xpTimers[5].autoAllocate
                    player.cb.xpTimers[5].autoAllocate = player.cb.xpTimers[5].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    if (player.cb.crateTimers[5].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.crateTimers[5].autoAllocate
                    player.cb.crateTimers[5].autoAllocate = player.cb.crateTimers[5].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    if (player.cb.boostTimers[5].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.boostTimers[5].autoAllocate
                    player.cb.boostTimers[5].autoAllocate = player.cb.boostTimers[5].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    if (player.cb.pointTimers[5].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.pointTimers[5].autoAllocate
                    player.cb.pointTimers[5].autoAllocate = player.cb.pointTimers[5].autoAllocate.sub(amt)
                }
                player.cb.automationShards = player.cb.automationShards.add(amt)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },
        1007: {
            title() { return "–" },
            canClick() {
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    return player.cb.xpTimers[6].autoAllocate.gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    return player.cb.crateTimers[6].autoAllocate.gte(1)
                // } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                //     return player.cb.boostTimers[6].autoAllocate.gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    return player.cb.pointTimers[6].autoAllocate.gte(1)
                } else {
                    return false
                }
            },
            unlocked() { return true },
            tooltip() { return "Return an automation shard" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    if (player.cb.xpTimers[6].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.xpTimers[6].autoAllocate
                    player.cb.xpTimers[6].autoAllocate = player.cb.xpTimers[6].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    if (player.cb.crateTimers[6].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.crateTimers[6].autoAllocate
                    player.cb.crateTimers[6].autoAllocate = player.cb.crateTimers[6].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    if (player.cb.boostTimers[6].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.boostTimers[6].autoAllocate
                    player.cb.boostTimers[6].autoAllocate = player.cb.boostTimers[6].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    if (player.cb.pointTimers[6].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.pointTimers[6].autoAllocate
                    player.cb.pointTimers[6].autoAllocate = player.cb.pointTimers[6].autoAllocate.sub(amt)
                }
                player.cb.automationShards = player.cb.automationShards.add(amt)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },
        1008: {
            title() { return "–" },
            canClick() {
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    return player.cb.xpTimers[7].autoAllocate.gte(1)
                // } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                //     return player.cb.crateTimers[7].autoAllocate.gte(1)
                // } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                //     return player.cb.boostTimers[7].autoAllocate.gte(1)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    return player.cb.pointTimers[7].autoAllocate.gte(1)
                } else {
                    return false
                }
            },
            unlocked() { return true },
            tooltip() { return "Return automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    if (player.cb.xpTimers[7].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.xpTimers[7].autoAllocate
                    player.cb.xpTimers[7].autoAllocate = player.cb.xpTimers[7].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    if (player.cb.crateTimers[7].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.crateTimers[7].autoAllocate
                    player.cb.crateTimers[7].autoAllocate = player.cb.crateTimers[7].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    if (player.cb.boostTimers[7].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.boostTimers[7].autoAllocate
                    player.cb.boostTimers[7].autoAllocate = player.cb.boostTimers[7].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    if (player.cb.pointTimers[7].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.pointTimers[7].autoAllocate
                    player.cb.pointTimers[7].autoAllocate = player.cb.pointTimers[7].autoAllocate.sub(amt)
                }
                player.cb.automationShards = player.cb.automationShards.add(amt)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },
        1009: {
            title() { return "–" },
            canClick() {
                // if (player.subtabs["cb"]['buttons'] == 'XP') {
                //     return player.cb.xpTimers[8].autoAllocate.gte(1)
                // } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                //     return player.cb.crateTimers[8].autoAllocate.gte(1)
                // } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                //     return player.cb.boostTimers[8].autoAllocate.gte(1)
                /*} else */if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    return player.cb.pointTimers[8].autoAllocate.gte(1)
                } else {
                    return false
                }
            },
            unlocked() { return true },
            tooltip() { return "Return automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    if (player.cb.xpTimers[8].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.xpTimers[8].autoAllocate
                    player.cb.xpTimers[8].autoAllocate = player.cb.xpTimers[8].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    if (player.cb.crateTimers[8].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.crateTimers[8].autoAllocate
                    player.cb.crateTimers[8].autoAllocate = player.cb.crateTimers[8].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    if (player.cb.boostTimers[8].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.boostTimers[8].autoAllocate
                    player.cb.boostTimers[8].autoAllocate = player.cb.boostTimers[8].autoAllocate.sub(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    if (player.cb.pointTimers[8].autoAllocate.lt(player.cb.autoAllocateAmt)) amt = player.cb.pointTimers[8].autoAllocate
                    player.cb.pointTimers[8].autoAllocate = player.cb.pointTimers[8].autoAllocate.sub(amt)
                }
                player.cb.automationShards = player.cb.automationShards.add(amt)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#7F2626" : look.backgroundColor = "#190707"
                return look
            },
        },

        1101: {
            title() { return "+" },
            canClick() { return player.cb.automationShards.gte(1) },
            unlocked() { return true },
            tooltip() { return "Allocate automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt.min(player.cb.automationShards)

                player.cb.automationShards = player.cb.automationShards.sub(amt)
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    player.cb.xpTimers[0].autoAllocate = player.cb.xpTimers[0].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    player.cb.crateTimers[0].autoAllocate = player.cb.crateTimers[0].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    player.cb.boostTimers[0].autoAllocate = player.cb.boostTimers[0].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    player.cb.pointTimers[0].autoAllocate = player.cb.pointTimers[0].autoAllocate.add(amt)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
        1102: {
            title() { return "+" },
            canClick() { return player.cb.automationShards.gte(1) },
            unlocked() { return true },
            tooltip() { return "Allocate automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt.min(player.cb.automationShards)
                
                player.cb.automationShards = player.cb.automationShards.sub(amt)
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    player.cb.xpTimers[1].autoAllocate = player.cb.xpTimers[1].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    player.cb.crateTimers[1].autoAllocate = player.cb.crateTimers[1].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    player.cb.boostTimers[1].autoAllocate = player.cb.boostTimers[1].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    player.cb.pointTimers[1].autoAllocate = player.cb.pointTimers[1].autoAllocate.add(amt)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
        1103: {
            title() { return "+" },
            canClick() { return player.cb.automationShards.gte(1) },
            unlocked() { return true },
            tooltip() { return "Allocate automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt.min(player.cb.automationShards)
                
                player.cb.automationShards = player.cb.automationShards.sub(amt)
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    player.cb.xpTimers[2].autoAllocate = player.cb.xpTimers[2].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    player.cb.crateTimers[2].autoAllocate = player.cb.crateTimers[2].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    player.cb.boostTimers[2].autoAllocate = player.cb.boostTimers[2].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    player.cb.pointTimers[2].autoAllocate = player.cb.pointTimers[2].autoAllocate.add(amt)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
        1104: {
            title() { return "+" },
            canClick() { return player.cb.automationShards.gte(1) },
            unlocked() { return true },
            tooltip() { return "Allocate automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt.min(player.cb.automationShards)
                
                player.cb.automationShards = player.cb.automationShards.sub(amt)
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    player.cb.xpTimers[3].autoAllocate = player.cb.xpTimers[3].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    player.cb.crateTimers[3].autoAllocate = player.cb.crateTimers[3].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    player.cb.boostTimers[3].autoAllocate = player.cb.boostTimers[3].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    player.cb.pointTimers[3].autoAllocate = player.cb.pointTimers[3].autoAllocate.add(amt)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
        1105: {
            title() { return "+" },
            canClick() { return player.cb.automationShards.gte(1) },
            unlocked() { return true },
            tooltip() { return "Allocate automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt.min(player.cb.automationShards)
                
                player.cb.automationShards = player.cb.automationShards.sub(amt)
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    player.cb.xpTimers[4].autoAllocate = player.cb.xpTimers[4].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    player.cb.crateTimers[4].autoAllocate = player.cb.crateTimers[4].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    player.cb.boostTimers[4].autoAllocate = player.cb.boostTimers[4].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    player.cb.pointTimers[4].autoAllocate = player.cb.pointTimers[4].autoAllocate.add(amt)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
        1106: {
            title() { return "+" },
            canClick() { return player.cb.automationShards.gte(1) },
            unlocked() { return true },
            tooltip() { return "Allocate automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt.min(player.cb.automationShards)
                
                player.cb.automationShards = player.cb.automationShards.sub(amt)
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    player.cb.xpTimers[5].autoAllocate = player.cb.xpTimers[5].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    player.cb.crateTimers[5].autoAllocate = player.cb.crateTimers[5].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    player.cb.boostTimers[5].autoAllocate = player.cb.boostTimers[5].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    player.cb.pointTimers[5].autoAllocate = player.cb.pointTimers[5].autoAllocate.add(amt)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
        1107: {
            title() { return "+" },
            canClick() { return player.cb.automationShards.gte(1) },
            unlocked() { return true },
            tooltip() { return "Allocate automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt.min(player.cb.automationShards)
                
                player.cb.automationShards = player.cb.automationShards.sub(amt)
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    player.cb.xpTimers[6].autoAllocate = player.cb.xpTimers[6].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    player.cb.crateTimers[6].autoAllocate = player.cb.crateTimers[6].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    player.cb.boostTimers[6].autoAllocate = player.cb.boostTimers[6].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    player.cb.pointTimers[6].autoAllocate = player.cb.pointTimers[6].autoAllocate.add(amt)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
        1108: {
            title() { return "+" },
            canClick() { return player.cb.automationShards.gte(1) },
            unlocked() { return true },
            tooltip() { return "Allocate automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt.min(player.cb.automationShards)
                
                player.cb.automationShards = player.cb.automationShards.sub(amt)
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    player.cb.xpTimers[7].autoAllocate = player.cb.xpTimers[7].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    player.cb.crateTimers[7].autoAllocate = player.cb.crateTimers[7].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    player.cb.boostTimers[7].autoAllocate = player.cb.boostTimers[7].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    player.cb.pointTimers[7].autoAllocate = player.cb.pointTimers[7].autoAllocate.add(amt)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
        1109: {
            title() { return "+" },
            canClick() { return player.cb.automationShards.gte(1) },
            unlocked() { return true },
            tooltip() { return "Allocate automation shards" },
            onClick() {
                let amt = player.cb.autoAllocateAmt.min(player.cb.automationShards)
                
                player.cb.automationShards = player.cb.automationShards.sub(amt)
                if (player.subtabs["cb"]['buttons'] == 'XP') {
                    player.cb.xpTimers[8].autoAllocate = player.cb.xpTimers[8].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Crates') {
                    player.cb.crateTimers[8].autoAllocate = player.cb.crateTimers[8].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'XPBoost') {
                    player.cb.boostTimers[8].autoAllocate = player.cb.boostTimers[8].autoAllocate.add(amt)
                } else if (player.subtabs["cb"]['buttons'] == 'Pet Points') {
                    player.cb.pointTimers[8].autoAllocate = player.cb.pointTimers[8].autoAllocate.add(amt)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "43px", minHeight: "43px", textShadow: "1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black", fontSize: "20px", border: "2px solid black", borderRadius: "5px"}
                this.canClick() ? look.color = "white" : look.color = "gray"
                this.canClick() ? look.backgroundColor = "#267F26" : look.backgroundColor = "#071907"
                return look
            },
        },
    },
    petButton1(amt = new Decimal(1)) {
        let reward = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
        let guarantee = new Decimal(0)
        if (amt.gte(50)) {
            guarantee = amt.div(50).floor()
            addLevelableXP("pet", 201, guarantee.mul(5))
            addLevelableXP("pet", 101, guarantee.mul(9))
            addLevelableXP("pet", 102, guarantee.mul(9))
            addLevelableXP("pet", 103, guarantee.mul(9))
            addLevelableXP("pet", 104, guarantee.mul(9))
            addLevelableXP("pet", 105, guarantee.mul(9))
            reward[0] = reward[0].add(guarantee.mul(5))
            reward[1] = reward[1].add(guarantee.mul(9))
            reward[2] = reward[2].add(guarantee.mul(9))
            reward[3] = reward[3].add(guarantee.mul(9))
            reward[4] = reward[4].add(guarantee.mul(9))
            reward[5] = reward[5].add(guarantee.mul(9))
            amt = amt.sub(guarantee.mul(50))
        }
        if (amt.lt(50)) {
            for (let i = 0; Decimal.lt(i, amt); i++) {
                let rng = Math.random();

                if (rng > 0.9) {
                    addLevelableXP("pet", 201, 1);
                    reward[0] = reward[0].add(1)
                } else if (rng > 0.72) {
                    addLevelableXP("pet", 105, 1);
                    reward[1] = reward[1].add(1)
                } else if (rng > 0.54) {
                    addLevelableXP("pet", 104, 1);
                    reward[2] = reward[2].add(1)
                } else if (rng > 0.36) {
                    addLevelableXP("pet", 103, 1);
                    reward[3] = reward[3].add(1)
                } else if (rng > 0.18) {
                    addLevelableXP("pet", 102, 1);
                    reward[4] = reward[4].add(1)
                } else {
                    addLevelableXP("pet", 101, 1);
                    reward[5] = reward[5].add(1)
                }
            }
        }
        if (reward[0].gt(0)) doPopup("none", "+" + formatWhole(reward[0]) + " Teste!", "Pet Obtained!", 5, "#88e688", "resources/Pets/testeUncommonPet.png")
        if (reward[1].gt(0)) doPopup("none", "+" + formatWhole(reward[1]) + " Slax!", "Pet Obtained!", 5, "#9bedff", "resources/Pets/slaxCommonPet.png")
        if (reward[2].gt(0)) doPopup("none", "+" + formatWhole(reward[2]) + " Gd Checkpoint!", "Pet Obtained!", 5, "#9bedff", "resources/Pets/checkpointCommonPet.png")
        if (reward[3].gt(0)) doPopup("none", "+" + formatWhole(reward[3]) + " Unsmith!", "Pet Obtained!", 5, "#9bedff", "resources/Pets/unsmithCommonPet.png")
        if (reward[4].gt(0)) doPopup("none", "+" + formatWhole(reward[4]) + " Egg Guy!", "Pet Obtained!", 5, "#9bedff", "resources/Pets/eggCommonPet.png")
        if (reward[5].gt(0)) doPopup("none", "+" + formatWhole(reward[5]) + " Gwa!", "Pet Obtained!", 5, "#9bedff", "resources/Pets/gwaCommonPet.png")
    },
    petButton2(amt = new Decimal(1)) {
        let reward = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
        let guarantee = new Decimal(0)
        if (amt.gte(50)) {
            guarantee = amt.div(50).floor()
            addLevelableXP("pet", 101, guarantee.mul(9))
            addLevelableXP("pet", 102, guarantee.mul(9))
            addLevelableXP("pet", 103, guarantee.mul(9))
            addLevelableXP("pet", 104, guarantee.mul(9))
            addLevelableXP("pet", 105, guarantee.mul(9))
            addLevelableXP("pet", 201, guarantee.mul(6))
            addLevelableXP("pet", 202, guarantee.mul(6))
            addLevelableXP("pet", 203, guarantee.mul(6))
            addLevelableXP("pet", 204, guarantee.mul(6))
            addLevelableXP("pet", 205, guarantee.mul(6))
            addLevelableXP("pet", 301, guarantee.mul(5))
            reward[0] = reward[0].add(guarantee.mul(9))
            reward[1] = reward[1].add(guarantee.mul(9))
            reward[2] = reward[2].add(guarantee.mul(9))
            reward[3] = reward[3].add(guarantee.mul(9))
            reward[4] = reward[4].add(guarantee.mul(9))
            reward[5] = reward[5].add(guarantee.mul(6))
            reward[6] = reward[6].add(guarantee.mul(6))
            reward[7] = reward[7].add(guarantee.mul(6))
            reward[8] = reward[8].add(guarantee.mul(6))
            reward[9] = reward[9].add(guarantee.mul(6))
            reward[10] = reward[10].add(guarantee.mul(5))
            amt = amt.sub(guarantee.mul(50))
        }
        if (amt.lt(50)) {
            for (let i = 0; Decimal.lt(i, amt); i++) {
                let rng = Math.random();

                if (rng > 0.9) {
                    addLevelableXP("pet", 301, 1);
                    reward[10] = reward[10].add(1)
                } else if (rng > 0.78) {
                    addLevelableXP("pet", 205, 1);
                    reward[9] = reward[9].add(1)
                } else if (rng > 0.66) {
                    addLevelableXP("pet", 204, 1);
                    reward[8] = reward[8].add(1)
                } else if (rng > 0.54) {
                    addLevelableXP("pet", 203, 1);
                    reward[7] = reward[7].add(1)
                } else if (rng > 0.42) {
                    addLevelableXP("pet", 202, 1);
                    reward[6] = reward[6].add(1)
                } else if (rng > 0.3) {
                    addLevelableXP("pet", 201, 1);
                    reward[5] = reward[5].add(1)
                }else if (rng > 0.24) {
                    addLevelableXP("pet", 105, 3);
                    reward[4] = reward[4].add(3)
                } else if (rng > 0.18) {
                    addLevelableXP("pet", 104, 3);
                    reward[3] = reward[3].add(3)
                } else if (rng > 0.12) {
                    addLevelableXP("pet", 103, 3);
                    reward[2] = reward[2].add(3)
                } else if (rng > 0.6) {
                    addLevelableXP("pet", 102, 3);
                    reward[1] = reward[1].add(3)
                } else {
                    addLevelableXP("pet", 101, 3);
                    reward[0] = reward[0].add(3)
                }
            }
        }
        if (reward[0].gt(0)) doPopup("none", "+" + formatWhole(reward[0]) + " Gwa!", "Pet Obtained!", 5, "#9bedff", "resources/Pets/gwaCommonPet.png")
        if (reward[1].gt(0)) doPopup("none", "+" + formatWhole(reward[1]) + " Egg Guy!", "Pet Obtained!", 5, "#9bedff", "resources/Pets/eggCommonPet.png")
        if (reward[2].gt(0)) doPopup("none", "+" + formatWhole(reward[2]) + " Unsmith!", "Pet Obtained!", 5, "#9bedff", "resources/Pets/unsmithCommonPet.png")
        if (reward[3].gt(0)) doPopup("none", "+" + formatWhole(reward[3]) + " Gd Checkpoint!", "Pet Obtained!", 5, "#9bedff", "resources/Pets/checkpointCommonPet.png")
        if (reward[4].gt(0)) doPopup("none", "+" + formatWhole(reward[4]) + " Slax!", "Pet Obtained!", 5, "#9bedff", "resources/Pets/slaxCommonPet.png")
        if (reward[5].gt(0)) doPopup("none", "+" + formatWhole(reward[5]) + " Teste!", "Pet Obtained!", 5, "#88e688", "resources/Pets/testeUncommonPet.png")
        if (reward[6].gt(0)) doPopup("none", "+" + formatWhole(reward[6]) + " Star!", "Pet Obtained!", 5, "#88e688", "resources/Pets/starUncommonPet.png")
        if (reward[7].gt(0)) doPopup("none", "+" + formatWhole(reward[7]) + " Normal Face!", "Pet Obtained!", 5, "#88e688", "resources/Pets/normalFaceUncommonPet.png")
        if (reward[8].gt(0)) doPopup("none", "+" + formatWhole(reward[8]) + " Shark!", "Pet Obtained!", 5, "#88e688", "resources/Pets/sharkUncommonPet.png")
        if (reward[9].gt(0)) doPopup("none", "+" + formatWhole(reward[9]) + " THE WATCHING EYE!", "Pet Obtained!", 5, "#88e688", "resources/Pets/eyeUncommonPet.png")
        if (reward[10].gt(0)) doPopup("none", "+" + formatWhole(reward[10]) + " Nova!", "Pet Obtained!", 5, "#4e7cff", "resources/Pets/novaRarePet.png")
    },
    petButton3(amt = new Decimal(1)) {
        let reward = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
        let guarantee = new Decimal(0)
        if (amt.gte(25)) {
            guarantee = amt.div(25).floor()
            addLevelableXP("pet", 201, guarantee.mul(4))
            addLevelableXP("pet", 202, guarantee.mul(4))
            addLevelableXP("pet", 203, guarantee.mul(4))
            addLevelableXP("pet", 204, guarantee.mul(4))
            addLevelableXP("pet", 205, guarantee.mul(4))
            addLevelableXP("pet", 304, guarantee.mul(3))
            player.cb.evolutionShards = player.cb.evolutionShards.add(guarantee.mul(3))
            reward[0] = reward[0].add(guarantee.mul(4))
            reward[1] = reward[1].add(guarantee.mul(4))
            reward[2] = reward[2].add(guarantee.mul(4))
            reward[3] = reward[3].add(guarantee.mul(4))
            reward[4] = reward[4].add(guarantee.mul(4))
            reward[5] = reward[5].add(guarantee.mul(3))
            reward[6] = reward[6].add(guarantee.mul(3))
            amt = amt.sub(guarantee.mul(25))
        }
        if (amt.lt(25)) {
            for (let i = 0; Decimal.lt(i, amt); i++) {
                let rng = Math.random();

                if (rng > 0.2) {
                    let random =  getRandomInt(5)
                    if (random == 0) {
                        addLevelableXP("pet", 201, 1);
                        reward[0] = reward[0].add(1)
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(8);
                    } else if (random == 1) {
                        addLevelableXP("pet", 202, 1);
                        reward[1] = reward[1].add(1)
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(8);
                    } else if (random == 2) {
                        addLevelableXP("pet", 203, 1);
                        reward[2] = reward[2].add(1)
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(8);
                    } else if (random == 3) {
                        addLevelableXP("pet", 204, 1);
                        reward[3] = reward[3].add(1)
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(8);
                    }  else if (random == 4) {
                        addLevelableXP("pet", 205, 1);
                        reward[4] = reward[4].add(1)
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(8);
                    }
                }
                if (rng < 0.2) {
                    if (rng > 0.08) {
                        addLevelableXP("pet", 304, 1);
                        reward[5] = reward[5].add(1)
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(8);
                    }
                    if (rng < 0.08) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                        reward[6] = reward[6].add(1)
                        if (inChallenge("ip", 17)) player.cb.IC7shardCount++
                        player.cb.pityEvoCurrent = new Decimal(0);
                    }
                }
            }
        }
        if (reward[0].gt(0)) doPopup("none", "+" + formatWhole(reward[0]) + " Teste!", "Pet Obtained!", 5, "#88e688", "resources/Pets/testeUncommonPet.png")
        if (reward[1].gt(0)) doPopup("none", "+" + formatWhole(reward[1]) + " Star!", "Pet Obtained!", 5, "#88e688", "resources/Pets/starUncommonPet.png")
        if (reward[2].gt(0)) doPopup("none", "+" + formatWhole(reward[2]) + " Normal Face!", "Pet Obtained!", 5, "#88e688", "resources/Pets/normalFaceUncommonPet.png")
        if (reward[3].gt(0)) doPopup("none", "+" + formatWhole(reward[3]) + " Shark!", "Pet Obtained!", 5, "#88e688", "resources/Pets/sharkUncommonPet.png")
        if (reward[4].gt(0)) doPopup("none", "+" + formatWhole(reward[4]) + " THE WATCHING EYE!", "Pet Obtained!", 5, "#88e688", "resources/Pets/eyeUncommonPet.png")
        if (reward[5].gt(0)) doPopup("none", "+" + formatWhole(reward[5]) + " Goofy Ahh Thing!", "Pet Obtained!", 5, "#4e7cff", "resources/Pets/goofyAhhThingRarePet.png")
        if (reward[6].gt(0)) doPopup("none", "+" + formatWhole(reward[6]) + " Evolution Shard!", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
    },
    petButton4(amt = new Decimal(1)) {
        let reward = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
        let guarantee = new Decimal(0)
        if (amt.gte(20)) {
            guarantee = amt.div(20).floor()
            addLevelableXP("pet", 106, guarantee.mul(30))
            addLevelableXP("pet", 107, guarantee.mul(30))
            addLevelableXP("pet", 206, guarantee.mul(9))
            addLevelableXP("pet", 207, guarantee.mul(9))
            addLevelableXP("pet", 305, guarantee.mul(3))
            player.cb.evolutionShards = player.cb.evolutionShards.add(guarantee.mul(5))
            reward[0] = reward[0].add(guarantee.mul(30))
            reward[1] = reward[1].add(guarantee.mul(30))
            reward[2] = reward[2].add(guarantee.mul(9))
            reward[3] = reward[3].add(guarantee.mul(9))
            reward[4] = reward[4].add(guarantee.mul(3))
            reward[5] = reward[5].add(guarantee.mul(5))
            amt = amt.sub(guarantee.mul(20))
        }
        if (amt.lt(20)) {
            for (let i = 0; Decimal.lt(i, amt); i++) {
                let rng = Math.random();
                if (rng > 0.5) {
                    let random =  getRandomInt(2)
                    let gainedPets = getRandomInt(4) + 4
                    if (random == 0) {
                        addLevelableXP("pet", 106, gainedPets);
                        reward[0] = reward[0].add(gainedPets)
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(15);
                    } else {
                        addLevelableXP("pet", 107, gainedPets);
                        reward[1] = reward[1].add(gainedPets)
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(15);
                    }
                } else if (rng > 0.2) {
                    let random =  getRandomInt(2)
                    let gainedPets = getRandomInt(2) + 2
                    if (random == 0) {
                        addLevelableXP("pet", 206, gainedPets);
                        reward[2] = reward[2].add(gainedPets)
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(15);
                    } else {
                        addLevelableXP("pet", 207, gainedPets);
                        reward[3] = reward[3].add(gainedPets)
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(15);
                    }
                }
                else {
                    if (rng > 0.05) {
                        addLevelableXP("pet", 305, 1);
                        reward[4] = reward[4].add(1)
                        player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(15);
                    }
                    if (rng < 0.05) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(3);
                        reward[5] = reward[5].add(3)
                        if (inChallenge("ip", 17)) player.cb.IC7shardCount++
                        player.cb.pityEvoCurrent = new Decimal(0);
                    }
                }
            }
        }
        if (reward[0].gt(0)) doPopup("none", "+" + formatWhole(reward[0]) + " Spider!", "Pet Obtained!", 5, "#9bedff", "resources/Pets/spiderCommonPet.png")
        if (reward[1].gt(0)) doPopup("none", "+" + formatWhole(reward[1]) + " Blob!", "Pet Obtained!", 5, "#9bedff", "resources/Pets/blobCommonPet.png")
        if (reward[2].gt(0)) doPopup("none", "+" + formatWhole(reward[2]) + " Clock!", "Pet Obtained!", 5, "#88e688", "resources/Pets/clockUncommonPet.png")
        if (reward[3].gt(0)) doPopup("none", "+" + formatWhole(reward[3]) + " Trollface!", "Pet Obtained!", 5, "#88e688", "resources/Pets/trollUncommonPet.png")
        if (reward[4].gt(0)) doPopup("none", "+" + formatWhole(reward[4]) + " Antimatter!", "Pet Obtained!", 5, "#4e7cff", "resources/Pets/antimatterRarePet.png")
        if (reward[5].gt(0)) doPopup("none", "+" + formatWhole(reward[5]) + " Evolution Shard!", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
    },
    petButton5(amt = new Decimal(1)) {
        let reward = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
        let guarantee = new Decimal(0)
        if (amt.gte(20)) {
            guarantee = amt.div(20).floor()
            addLevelableXP("pet", 108, guarantee.mul(25))
            addLevelableXP("pet", 109, guarantee.mul(25))
            addLevelableXP("pet", 208, guarantee.mul(5))
            addLevelableXP("pet", 209, guarantee.mul(5))
            addLevelableXP("pet", 306, guarantee.mul(2))
            addLevelableXP("pet", 307, guarantee.mul(2))
            reward[0] = reward[0].add(guarantee.mul(25))
            reward[1] = reward[1].add(guarantee.mul(25))
            reward[2] = reward[2].add(guarantee.mul(5))
            reward[3] = reward[3].add(guarantee.mul(5))
            reward[4] = reward[4].add(guarantee.mul(2))
            reward[5] = reward[5].add(guarantee.mul(2))
            amt = amt.sub(guarantee.mul(20))
        }
        if (amt.lt(20)) {
            for (let i = 0; Decimal.lt(i, amt); i++) {
                let rng = Math.random();
                let gainedPets = new Decimal(0)
                if (rng > 0.5) {
                    let random =  getRandomInt(2)
                    let gainedPets = getRandomInt(4) + 2
                    if (random == 0) {
                        addLevelableXP("pet", 108, gainedPets);
                        reward[0] = reward[0].add(gainedPets)
                    } else {
                        addLevelableXP("pet", 109, gainedPets);
                        reward[1] = reward[1].add(gainedPets)
                    }
                } else if (rng > 0.2) {
                    let random =  getRandomInt(2)
                    let gainedPets = getRandomInt(1) + 1
                    if (random == 0) {
                        addLevelableXP("pet", 208, gainedPets);
                        reward[2] = reward[2].add(gainedPets)
                    } else {
                        addLevelableXP("pet", 209, gainedPets);
                        reward[3] = reward[3].add(gainedPets)
                    }
                } else {
                    if (rng > 0.1) {
                        addLevelableXP("pet", 306, 1);
                        reward[4] = reward[4].add(1)
                    }
                    if (rng < 0.1) {
                        addLevelableXP("pet", 307, 1);
                        reward[5] = reward[5].add(1)
                    }
                }
            }
        }
        if (reward[0].gt(0)) doPopup("none", "+" + formatWhole(reward[0]) + " Replicator!", "Pet Obtained!", 5, "#9bedff", "resources/Pets/replicatorCommonPet.png")
        if (reward[1].gt(0)) doPopup("none", "+" + formatWhole(reward[1]) + " Smoke!", "Pet Obtained!", 5, "#9bedff", "resources/Pets/smokeCommonPet.png")
        if (reward[2].gt(0)) doPopup("none", "+" + formatWhole(reward[2]) + " Infinity Breaker!", "Pet Obtained!", 5, "#88e688", "resources/Pets/infinityBreakerUncommonPet.png")
        if (reward[3].gt(0)) doPopup("none", "+" + formatWhole(reward[3]) + " John!", "Pet Obtained!", 5, "#88e688", "resources/Pets/johnUncommonPet.png")
        if (reward[4].gt(0)) doPopup("none", "+" + formatWhole(reward[4]) + " Hex Shadow!", "Pet Obtained!", 5, "#4e7cff", "resources/Pets/hexShadowRarePet.png")
        if (reward[5].gt(0)) doPopup("none", "+" + formatWhole(reward[5]) + " Grass Square!", "Pet Obtained!", 5, "#4e7cff", "resources/Pets/grassSquareRarePet.png")
    },
    petButton6(amt = new Decimal(1)) {
        let reward = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
        let guarantee = new Decimal(0)
        if (amt.gte(10)) {
            guarantee = amt.div(10).floor()
            addLevelableXP("pet", 301, guarantee.mul(2))
            addLevelableXP("pet", 302, guarantee.mul(2))
            addLevelableXP("pet", 303, guarantee.mul(2))
            addLevelableXP("pet", 304, guarantee.mul(2))
            addLevelableXP("pet", 305, guarantee.mul(2))
            addLevelableXP("pet", 306, guarantee.mul(2))
            addLevelableXP("pet", 307, guarantee.mul(2))
            addLevelableXP("pet", 401, guarantee.mul(3))
            addLevelableXP("pet", 402, guarantee.mul(3))
            addLevelableXP("pet", 403, guarantee.mul(3))
            reward[0] = reward[0].add(guarantee.mul(2))
            reward[1] = reward[1].add(guarantee.mul(2))
            reward[2] = reward[2].add(guarantee.mul(2))
            reward[3] = reward[3].add(guarantee.mul(2))
            reward[4] = reward[4].add(guarantee.mul(2))
            reward[5] = reward[5].add(guarantee.mul(2))
            reward[6] = reward[6].add(guarantee.mul(2))
            reward[7] = reward[7].add(guarantee.mul(3))
            reward[8] = reward[8].add(guarantee.mul(3))
            reward[9] = reward[9].add(guarantee.mul(3))
            amt = amt.sub(guarantee.mul(10))
        }
        if (amt.lt(10)) {
            for (let i = 0; Decimal.lt(i, amt); i++) {
                let rng = Math.random();
                if (rng > 0.3) {
                    let random =  getRandomInt(7)
                    let gainedPets = getRandomInt(2) + 1
                    if (random == 0) {
                        addLevelableXP("pet", 301, gainedPets);
                        reward[0] = reward[0].add(gainedPets)
                    } else if (random == 1) {
                        addLevelableXP("pet", 302, gainedPets);
                        reward[1] = reward[1].add(gainedPets)
                    }
                    else if (random == 2) {
                        addLevelableXP("pet", 303, gainedPets);
                        reward[2] = reward[2].add(gainedPets)
                    }
                    else if (random == 3) {
                        addLevelableXP("pet", 304, gainedPets);
                        reward[3] = reward[3].add(gainedPets)
                    }
                    else if (random == 4) {
                        addLevelableXP("pet", 305, gainedPets);
                        reward[4] = reward[4].add(gainedPets)
                    }
                    else if (random == 5) {
                        addLevelableXP("pet", 306, gainedPets);
                        reward[5] = reward[5].add(gainedPets)
                    }
                    else if (random == 6) {
                        addLevelableXP("pet", 307, gainedPets);
                        reward[6] = reward[6].add(gainedPets)
                    }
                }
                else if (rng < 0.3) {
                    let random =  getRandomInt(3)
                    let gainedFragments = getRandomInt(3) + 1
                    if (random == 0) {
                        addLevelableXP("pet", 401, gainedFragments);
                        reward[7] = reward[7].add(gainedFragments)
                    } else if (random == 1) {
                        addLevelableXP("pet", 402, gainedFragments);
                        reward[8] = reward[8].add(gainedFragments)
                    }
                    else if (random == 2) {
                        addLevelableXP("pet", 403, gainedFragments);
                        reward[9] = reward[9].add(gainedFragments)
                    }
                }
            }
        }
        if (reward[0].gt(0)) doPopup("none", "+" + formatWhole(reward[0]) + " Nova!", "Pet Obtained!", 5, "#4e7cff", "resources/Pets/novaRarePet.png")
        if (reward[1].gt(0)) doPopup("none", "+" + formatWhole(reward[1]) + " Dice!", "Pet Obtained!", 5, "#4e7cff", "resources/Pets/diceRarePet.png")
        if (reward[2].gt(0)) doPopup("none", "+" + formatWhole(reward[2]) + " Drippy Ufo!", "Pet Obtained!", 5, "#4e7cff", "resources/Pets/ufoRarePet.png")
        if (reward[3].gt(0)) doPopup("none", "+" + formatWhole(reward[3]) + " Goofy Ahh Thing!", "Pet Obtained!", 5, "#4e7cff", "resources/Pets/goofyAhhThingRarePet.png")
        if (reward[4].gt(0)) doPopup("none", "+" + formatWhole(reward[4]) + " Antimatter!", "Pet Obtained!", 5, "#4e7cff", "resources/Pets/antimatterRarePet.png")
        if (reward[5].gt(0)) doPopup("none", "+" + formatWhole(reward[5]) + " Hex Shadow!", "Pet Obtained!", 5, "#4e7cff", "resources/Pets/hexShadowRarePet.png")
        if (reward[6].gt(0)) doPopup("none", "+" + formatWhole(reward[6]) + " Grass Square!", "Pet Obtained!", 5, "#4e7cff", "resources/Pets/grassSquareRarePet.png")
        if (reward[7].gt(0)) {
            let random =  getRandomInt(4)
            if (random == 0) doPopup("none", "+" + formatWhole(reward[7]) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dotknightEpicPetFragment1.png");
            if (random == 1) doPopup("none", "+" + formatWhole(reward[7]) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dotknightEpicPetFragment2.png");
            if (random == 2) doPopup("none", "+" + formatWhole(reward[7]) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dotknightEpicPetFragment3.png");
            if (random == 3) doPopup("none", "+" + formatWhole(reward[7]) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dotknightEpicPetFragment4.png");
        }
        if (reward[8].gt(0)) {
            let random =  getRandomInt(4)
            if (random == 0) doPopup("none", "+" + formatWhole(reward[8]) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dragonEpicPetFragment1.png");
            if (random == 1) doPopup("none", "+" + formatWhole(reward[8]) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dragonEpicPetFragment2.png");
            if (random == 2) doPopup("none", "+" + formatWhole(reward[8]) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dragonEpicPetFragment3.png");
            if (random == 3) doPopup("none", "+" + formatWhole(reward[8]) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dragonEpicPetFragment4.png");
        }
        if (reward[9].gt(0)) {
            let random =  getRandomInt(4)
            if (random == 0) doPopup("none", "+" + formatWhole(reward[9]) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/cookieEpicPetFragment1.png");
            if (random == 1) doPopup("none", "+" + formatWhole(reward[9]) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/cookieEpicPetFragment2.png");
            if (random == 2) doPopup("none", "+" + formatWhole(reward[9]) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/cookieEpicPetFragment3.png");
            if (random == 3) doPopup("none", "+" + formatWhole(reward[9]) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/cookieEpicPetFragment4.png");
        }
    },
    petButton7(amt = new Decimal(1)) {
        let reward = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
        let guarantee = new Decimal(0)
        if (amt.gte(20)) {
            guarantee = amt.div(20).floor()
            addLevelableXP("pet", 308, guarantee.mul(27))
            addLevelableXP("pet", 309, guarantee.mul(27))
            player.cb.paragonShards = player.cb.paragonShards.add(guarantee.mul(3))
            player.pet.singularityFragments = player.pet.singularityFragments.add(guarantee.mul(32))
            player.cb.legendaryPetGems[0] = player.cb.legendaryPetGems[0].add(guarantee.mul(12));
            player.cb.legendaryPetGems[1] = player.cb.legendaryPetGems[1].add(guarantee.mul(12));
            player.cb.legendaryPetGems[2] = player.cb.legendaryPetGems[2].add(guarantee.mul(12));
            reward[0] = reward[0].add(guarantee.mul(27))
            reward[1] = reward[1].add(guarantee.mul(27))
            reward[2] = reward[2].add(guarantee.mul(3))
            reward[3] = reward[3].add(guarantee.mul(32))
            reward[4] = reward[4].add(guarantee.mul(12))
            amt = amt.sub(guarantee.mul(20))
        }
        if (amt.lt(20)) {
            for (let i = 0; Decimal.lt(i, amt); i++) {
                let rng = Math.random();
                if (rng > 0.4) {
                    let random =  getRandomInt(2)
                    let gainedPets = getRandomInt(3) + 3
                    if (random == 0) {
                        addLevelableXP("pet", 308, gainedPets);
                        reward[0] = reward[0].add(gainedPets)
                        player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(10)
                    } else if (random == 1) {
                        addLevelableXP("pet", 309, gainedPets);
                        reward[1] = reward[1].add(gainedPets)
                        player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(10)
                    }
                } else if (rng < 0.4 && rng > 0.3) {
                    let gainedShards = getRandomInt(1) + 1
                    player.cb.paragonShards = player.cb.paragonShards.add(gainedShards);
                    reward[2] = reward[2].add(gainedShards)
                } else if (rng < 0.3 && rng > 0.05) {
                    let gainedFragments = getRandomInt(3) + 5
                    player.pet.singularityFragments = player.pet.singularityFragments.add(gainedFragments);
                    reward[3] = reward[3].add(gainedFragments)
                    player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(10)
                } else if (rng < 0.05) {
                    //the legendary stuff
                    let gainedGems = getRandomInt(5) + 10
                    player.cb.legendaryPetGems[0] = player.cb.legendaryPetGems[0].add(gainedGems);
                    player.cb.legendaryPetGems[1] = player.cb.legendaryPetGems[1].add(gainedGems);
                    player.cb.legendaryPetGems[2] = player.cb.legendaryPetGems[2].add(gainedGems);
                    reward[4] = reward[4].add(gainedGems)
                    player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(10)
                }
            }
        }
        if (reward[0].gt(0)) doPopup("none", "+" + formatWhole(reward[0]) + " Impossible Triangle!", "Pet Obtained!", 5, "#4e7cff", "resources/Pets/impossibleTriangleRarePet.png")
        if (reward[1].gt(0)) doPopup("none", "+" + formatWhole(reward[1]) + " Forbidden Core!", "Pet Obtained!", 5, "#4e7cff", "resources/Pets/forbiddenCoreRarePet.png")
        if (reward[2].gt(0)) doPopup("none", "+" + formatWhole(reward[2]) + " Paragon Shard!", "Shard Obtained!", 5, "#4c64ff", "resources/paragonShard.png")
        if (reward[3].gt(0)) doPopup("none", "+" + formatWhole(reward[3]) + " Singularity Fragment!", "Resource Obtained!", 5, "#cb79ed", "resources/singularityEpicPetFragment.png")
        if (reward[4].gt(0)) doPopup("none", "+" + formatWhole(reward[4]) + " of each Legendary Gem!", "Resource Obtained!", 5, "#eed200", "resources/Pets/legendarybg.png")
    },
    bars: {
        xpbar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 825,
            height: 50,
            progress() {
                return player.cb.xp.div(player.cb.req)
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#094599"},
            borderStyle: {
                borderTop: "0px",
                borderRadius: "0px 0px 10px 10px",
            },
            display() {
                if (player.cb.level.lt(1000)) {
                    return "<h5>" + format(player.cb.xp) + "/" + formatSimple(player.cb.req) + "<h5> XP to level up.</h5>"
                } else if (player.cb.level.lt(10000)) {
                    return "<h5>" + format(player.cb.xp) + "/" + formatSimple(player.cb.req) + "<h5> XP to level up.<h6><b style='color:red'>[SOFTCAPPED]</b></h6>"
                } else if (player.cb.level.lt(100000)) {
                    return "<h5>" + format(player.cb.xp) + "/" + formatSimple(player.cb.req) + "<h5> XP to level up.<h6><b style='color:red'>[SOFTCAPPED<sup>2</sup>]</b></h6>"
                } else {
                    return "<h5>" + format(player.cb.xp) + "/" + formatSimple(player.cb.req) + "<h5> XP to level up.<h6><b style='color:red'>[SOFTCAPPED<sup>3</sup>]</b></h6>"
                }
            },
        },
    },
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(420).div(levelableEffect("pet", 203)[2]).div(levelableEffect("pet", 304)[1]) },
            costGrowth() { return new Decimal(2.05) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.cb.totalxp},
            pay(amt) { player.cb.totalxp = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back OTF Boost."
            },
            display() {
                if (tmp[this.layer].buyables[this.id].cost.gte(player.cb.totalxp)) {
                    return "which are multiplying hex points, rocket fuel, and dice points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                        Cost: " + formatWhole(layers.cb.xpToLevel(tmp[this.layer].buyables[this.id].cost)) + " Check Back Levels."
                } else {
                    let postCost = player.cb.totalxp.sub(tmp[this.layer].buyables[this.id].cost)
                    return "which are multiplying hex points, rocket fuel, and dice points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                        Cost: " + formatWhole(player.cb.level.sub(layers.cb.xpToLevel(postCost))) + " Check Back Levels."
                }
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    layers.cb.levelup()
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    layers.cb.levelup()
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#0951a6'}
        },
        12: {
            costBase() { return new Decimal(950).div(levelableEffect("pet", 203)[2]).div(levelableEffect("pet", 304)[1]) },
            costGrowth() { return new Decimal(2.22) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.cb.totalxp},
            pay(amt) { player.cb.totalxp = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.5).pow(1.5).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back IP Boost."
            },
            display() {
                if (tmp[this.layer].buyables[this.id].cost.gte(player.cb.totalxp)) {
                    return "which are multiplying infinity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                        Cost: " + formatWhole(layers.cb.xpToLevel(tmp[this.layer].buyables[this.id].cost)) + " Check Back Levels."
                } else {
                    let postCost = player.cb.totalxp.sub(tmp[this.layer].buyables[this.id].cost)
                    return "which are multiplying infinity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                        Cost: " + formatWhole(player.cb.level.sub(layers.cb.xpToLevel(postCost))) + " Check Back Levels."
                }
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    layers.cb.levelup()
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    layers.cb.levelup()
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#0951a6'}
        },
        13: {
            costBase() { return new Decimal(2750).div(levelableEffect("pet", 203)[2]).div(levelableEffect("pet", 304)[1]) },
            costGrowth() { return new Decimal(2.4) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.cb.totalxp},
            pay(amt) { player.cb.totalxp = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back XP Boost Boost."
            },
            display() {
                if (tmp[this.layer].buyables[this.id].cost.gte(player.cb.totalxp)) {
                    return "which are multiplying XPBoost by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                        Cost: " + formatWhole(layers.cb.xpToLevel(tmp[this.layer].buyables[this.id].cost)) + " Check Back Levels."
                } else {
                    let postCost = player.cb.totalxp.sub(tmp[this.layer].buyables[this.id].cost)
                    return "which are multiplying XPBoost by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                        Cost: " + formatWhole(player.cb.level.sub(layers.cb.xpToLevel(postCost))) + " Check Back Levels."
                }
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    layers.cb.levelup()
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    layers.cb.levelup()
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#0951a6'}
        },
        14: {
            costBase() { return new Decimal(7500).div(levelableEffect("pet", 203)[2]).div(levelableEffect("pet", 304)[1]) },
            costGrowth() { return new Decimal(2.75) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.cb.totalxp},
            pay(amt) { player.cb.totalxp = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back Pet Point Boost."
            },
            display() {
                if (tmp[this.layer].buyables[this.id].cost.gte(player.cb.totalxp)) {
                    return "which are multiplying pet points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                        Cost: " + formatWhole(layers.cb.xpToLevel(tmp[this.layer].buyables[this.id].cost)) + " Check Back Levels."
                } else {
                    let postCost = player.cb.totalxp.sub(tmp[this.layer].buyables[this.id].cost)
                    return "which are multiplying pet points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                        Cost: " + formatWhole(player.cb.level.sub(layers.cb.xpToLevel(postCost))) + " Check Back Levels."
                }
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    layers.cb.levelup()
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    layers.cb.levelup()
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#0951a6'}
        },
        15: {
            costBase() { return new Decimal(1850).div(levelableEffect("pet", 203)[2]).div(levelableEffect("pet", 304)[1]) },
            costGrowth() { return new Decimal(2.3) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.cb.totalxp},
            pay(amt) { player.cb.totalxp = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.25).mul(0.15).add(1) },
            unlocked() { return (hasUpgrade("i", 22) || hasMilestone("s", 14))},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back Pollinators Boost."
            },
            display() {
                if (tmp[this.layer].buyables[this.id].cost.gte(player.cb.totalxp)) {
                    return "which are multiplying pollinators by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                        Cost: " + formatWhole(layers.cb.xpToLevel(tmp[this.layer].buyables[this.id].cost)) + " Check Back Levels."
                } else {
                    let postCost = player.cb.totalxp.sub(tmp[this.layer].buyables[this.id].cost)
                    return "which are multiplying pollinators by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                        Cost: " + formatWhole(player.cb.level.sub(layers.cb.xpToLevel(postCost))) + " Check Back Levels."
                }
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    layers.cb.levelup()
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    layers.cb.levelup()
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#0951a6'}
        },
        16: {
            costBase() { return new Decimal(10000).div(levelableEffect("pet", 203)[2]).div(levelableEffect("pet", 304)[1]) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.cb.totalxp},
            pay(amt) { player.cb.totalxp = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(5) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Check Back Pity Req. Reducer."
            },
            display() {
                if (tmp[this.layer].buyables[this.id].cost.gte(player.cb.totalxp)) {
                    return "which are reducing the pity requirement by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                        Cost: " + formatWhole(layers.cb.xpToLevel(tmp[this.layer].buyables[this.id].cost)) + " Check Back Levels."
                } else {
                    let postCost = player.cb.totalxp.sub(tmp[this.layer].buyables[this.id].cost)
                    return "which are reducing the pity requirement by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                        Cost: " + formatWhole(player.cb.level.sub(layers.cb.xpToLevel(postCost))) + " Check Back Levels."
                }
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    layers.cb.levelup()
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    layers.cb.levelup()
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: '#0951a6'}
        },

        21: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() {
                if (!(player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23))) {
                    return new Decimal(6)
                } else {
                    return new Decimal(7)
                }
            },
            currency() { return player.cb.paragonShards},
            pay(amt) { player.cb.paragonShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id)},
            unlocked() { return player.ev.evolutionsUnlocked[9] },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Pet Automation Unlocker."
            },
            display() {
                return "which unlocking automation for " + formatWhole(tmp[this.layer].buyables[this.id].effect) + " pet crates.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Paragon Shards."
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
            style: { width: '275px', height: '150px', backgroundColor: '#4C64FF'}
        },
        22: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(4) },
            purchaseLimit() { return new Decimal(2) },
            currency() { return player.cb.paragonShards},
            pay(amt) { player.cb.paragonShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id)},
            unlocked() { return false },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "XPBoost Automation Unlocker."
            },
            display() {
                return "which unlocking automation for " + formatWhole(tmp[this.layer].buyables[this.id].effect) + " XPBoost Buttons.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Paragon Shards."
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
            style: { width: '275px', height: '150px', backgroundColor: '#4C64FF'}
        },
        23: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(9) },
            currency() { return player.cb.paragonShards},
            pay(amt) { player.cb.paragonShards = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id)},
            unlocked() { return false },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Pet Point Automation Unlocker."
            },
            display() {
                return "which unlocking automation for " + formatWhole(tmp[this.layer].buyables[this.id].effect) + " pet point buttons.\n\
                    Cost: " + formatWhole(tmp[this.layer].buyables[this.id].cost) + " Paragon Shards."
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
            style: { width: '275px', height: '150px', backgroundColor: '#4C64FF'}
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {
        1: {
            title: "Check Back",
            body() { return "Created by Marcel Acoplao, Check Back is a very powerful method for superphysical value extraction, due to it's high time demands. It was developed for celestial hunters in training, as a way to get stronger. However, it fell out of fashion as new methods for superphysical extraction became popular, such as ??? and ?????????." },
            unlocked() { return hasUpgrade("s", 23) },      
        },
        2: {
            title: "Pets",
            body() { return "After Check Back fell out of fashion, Marcel started creating pets out of superphysical values. These pets ranged from real creatures to abstract beings. Each of them had a special effect that boosted certain superphysical values. Marcel soon discovered a byproduct of check back, which were evolution and paragon shards. He discovered that pets could be evolved with these shards. However, Marcel noticed that some pets linked to actual beings, such as colleagues from the corporation and other specific beings..." },
            unlocked() { return hasUpgrade("s", 23) },      
        },
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return {color: "#094599", borderColor: "#094599", borderRadius: "5px"}},
                unlocked() { return true },
                content: [
                    ["microtabs", "buttons", { 'border-width': '0px' }],
                ]
            },
            "Lore": {
                buttonStyle() { return { color: "#094599", borderColor: "#094599", borderRadius: "5px"}},
                unlocked() { return hasUpgrade("s", 23) },
                content: [
                    ["blank", "25px"],
                    ["infobox", "1"],
                    ["infobox", "2"],
                    ["infobox", "3"],
                    ["infobox", "4"],
                ]
            },
            "Pets": {
                buttonStyle() { return {color: "#094599", borderColor: "#094599", borderRadius: "5px"}},
                unlocked() { return player.cb.highestLevel.gte(10) },
                embedLayer: 'pet',
            },
            "Evolution": {
                buttonStyle() { return {color: "#1500bf", borderColor: "#1500bf", backgroundImage: "linear-gradient(90deg, #d487fd, #4b79ff)", borderRadius: "5px" }},
                unlocked() { return player.cb.highestLevel.gte(35)  },
                embedLayer: 'ev'
            },
            "Buyables": {
                buttonStyle() { return {color: "#094599", borderColor: "#094599", borderRadius: "5px"}},
                unlocked() { return (hasChallenge("ip", 17) || hasMilestone("s", 14)) },
                content: [
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 15],
                        ["ex-buyable", 13], ["ex-buyable", 14], ["ex-buyable", 16]], {maxWidth: "900px"}],
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 21], ["ex-buyable", 22], ["ex-buyable", 23]], {maxWidth: "900px"}],
                ]
            },
        },
        buttons: {
            "XP": {
                buttonStyle() { return {color: "#094599", borderColor: "#094599", borderRadius: "5px"}},
                unlocked() { return true },
                content: [
                    ["blank", "10px"],
                    ["row", [
                        ["column", [
                            ["clickable", 11], ["clickable", 12], ["clickable", 13], ["clickable", 14],
                            ["clickable", 15], ["clickable", 16], ["clickable", 17], ["clickable", 18],
                            ["clickable", 99],
                        ]],
                        ["style-column", [
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1001]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.xpTimers[0].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.xpTimers[0].autoCurrent) + "/" +  format(player.cb.xpTimers[0].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1101]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], {width: "344px", height: "47px", borderBottom: "3px solid black"}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1002]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.xpTimers[1].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.xpTimers[1].autoCurrent) + "/" +  format(player.cb.xpTimers[1].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1102]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !player.cb.highestLevel.gte(3) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1003]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.xpTimers[2].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.xpTimers[2].autoCurrent) + "/" +  format(player.cb.xpTimers[2].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1103]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !player.cb.highestLevel.gte(6) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1004]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.xpTimers[3].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.xpTimers[3].autoCurrent) + "/" +  format(player.cb.xpTimers[3].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1104]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(hasMilestone("r", 17) || hasMilestone("s", 14)) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1005]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.xpTimers[4].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.xpTimers[4].autoCurrent) + "/" +  format(player.cb.xpTimers[4].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1105]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !player.cb.highestLevel.gte(15) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1006]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.xpTimers[5].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.xpTimers[5].autoCurrent) + "/" +  format(player.cb.xpTimers[5].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1106]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !player.cb.highestLevel.gte(50) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1007]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.xpTimers[6].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.xpTimers[6].autoCurrent) + "/" +  format(player.cb.xpTimers[6].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1107]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !player.cb.highestLevel.gte(65) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1008]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.xpTimers[7].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.xpTimers[7].autoCurrent) + "/" +  format(player.cb.xpTimers[7].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1108]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !player.cb.highestLevel.gte(150) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"}}],
                            ["style-row", [
                                ["clickable", 401], ["clickable", 402], ["clickable", 403]
                            ], {width: "344px", height: "47px", backgroundColor: "#666666"}],
                        ], () => {return player.ev.evolutionsUnlocked[4] ? {border: "3px solid black", marginLeft: "10px"} : {display: "none !important"}}],
                    ]],
                ]
            },
            "Crates": {
                buttonStyle() { return {color: "#4e7cff", borderColor: "#4e7cff", borderRadius: "5px"}},
                unlocked() { return player.cb.highestLevel.gte(10) },
                content: [
                    ["blank", "10px"],
                    ["row", [
                        ["column", [
                            ["bt-clickable", 101], ["bt-clickable", 102], ["bt-clickable", 103], ["bt-clickable", 104],
                            ["bt-clickable", 105], ["bt-clickable", 106], ["bt-clickable", 107],
                            ["clickable", 199],
                        ]],
                        ["style-column", [
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1001]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.crateTimers[0].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.crateTimers[0].autoCurrent) + "/" +  format(player.cb.crateTimers[0].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1101]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(player.cb.highestLevel.gte(10)) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"} }],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1002]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.crateTimers[1].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.crateTimers[1].autoCurrent) + "/" +  format(player.cb.crateTimers[1].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1102]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(player.cb.highestLevel.gte(25)) ? {display: "none !important"} : getBuyableAmount("cb", 21).gte(2) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1003]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.crateTimers[2].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.crateTimers[2].autoCurrent) + "/" +  format(player.cb.crateTimers[2].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1103]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(player.cb.highestLevel.gte(75)) ? {display: "none !important"} : getBuyableAmount("cb", 21).gte(3) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1004]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.crateTimers[3].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.crateTimers[3].autoCurrent) + "/" +  format(player.cb.crateTimers[3].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1104]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(player.cb.highestLevel.gte(125)) ? {display: "none !important"} : getBuyableAmount("cb", 21).gte(4) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1005]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.crateTimers[4].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.crateTimers[4].autoCurrent) + "/" +  format(player.cb.crateTimers[4].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1105]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(player.cb.highestLevel.gte(1500) && player.ca.unlockedCante) ? {display: "none !important"} : getBuyableAmount("cb", 21).gte(5) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1006]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.crateTimers[5].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.crateTimers[5].autoCurrent) + "/" +  format(player.cb.crateTimers[5].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1106]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(player.cb.highestLevel.gte(1500) && player.ca.unlockedCante) ? {display: "none !important"} : getBuyableAmount("cb", 21).gte(6) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1007]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.crateTimers[6].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.crateTimers[6].autoCurrent) + "/" +  format(player.cb.crateTimers[6].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1107]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23)) ? {display: "none !important"} : getBuyableAmount("cb", 21).gte(7) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["clickable", 401], ["clickable", 402], ["clickable", 403]
                            ], {width: "344px", height: "47px", backgroundColor: "#666666"}],
                        ], () => {return getBuyableAmount("cb", 21).gte(1) ? {border: "3px solid black", backgroundColor: "black", marginLeft: "10px"} : {display: "none !important"}}],
                    ]],
                ]
            },
            "XPBoost": {
                buttonStyle() { return {color: "#00B229", borderColor: "#00B229", borderRadius: "5px"}},
                unlocked() { return player.cb.highestLevel.gte(100) && (hasUpgrade("ip", 31) || hasMilestone("s", 14)) },
                content: [
                    ["blank", "10px"],
                    ["style-column", [
                        ["raw-html", "XPBoost", {color: "white", fontSize: "30px", fontFamily: "monospace"}],
                        ["blank", "5px"],
                        ["h-line", "380px"],
                        ["blank", "5px"],
                        ["raw-html", "Reset Levels and XP to gain XPBoost,<br>which boosts XP gain.", {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ], {width: "400px", padding: "10px", border: "3px solid white", borderRadius: "15px", backgroundColor: "#001903"}],
                    ["blank", "10px"],
                    ["row", [
                        ["column", [
                            ["clickable", 301], ["clickable", 302],
                            ["style-row", [], {width: "200px", height: "50px"}],
                        ]],
                        ["style-column", [
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1001]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.boostTimers[0].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.boostTimers[0].autoCurrent) + "/" +  format(player.cb.boostTimers[0].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1101]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(player.cb.highestLevel.gte(100)) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"} }],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1002]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.boostTimers[1].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.boostTimers[1].autoCurrent) + "/" +  format(player.cb.boostTimers[1].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1102]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(player.cb.highestLevel.gte(666)) ? {display: "none !important"} : getBuyableAmount("cb", 22).gte(2) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["clickable", 401], ["clickable", 402], ["clickable", 403]
                            ], {width: "344px", height: "47px", backgroundColor: "#666666"}],
                        ], () => {return getBuyableAmount("cb", 22).gte(1) ? {border: "3px solid black", backgroundColor: "black", marginLeft: "10px"} : {display: "none !important"}}],
                    ]],
                ]
            },
            "Pet Points": {
                buttonStyle() { return {color: "#A2D800", borderColor: "#A2D800", borderRadius: "5px"}},
                unlocked() { return player.cb.highestLevel.gte(100) && (hasUpgrade("ip", 31) || hasMilestone("s", 14)) },
                content: [
                    ["blank", "10px"],
                    ["row", [
                        ["column", [
                            ["clickable", 201], ["clickable", 202], ["clickable", 203], ["clickable", 204],
                            ["clickable", 205], ["clickable", 206], ["clickable", 207], ["clickable", 208],
                            ["clickable", 209],
                            ["clickable", 299],
                        ]],
                        ["style-column", [
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1001]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.pointTimers[0].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.pointTimers[0].autoCurrent) + "/" +  format(player.cb.pointTimers[0].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1101]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(getLevelableAmount("pet", 301).gte(1)) ? {display: "none !important"} : {width: "344px", height: "47px", borderBottom: "3px solid black"} }],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1002]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.pointTimers[1].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.pointTimers[1].autoCurrent) + "/" +  format(player.cb.pointTimers[1].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1102]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(getLevelableAmount("pet", 302).gte(1)) ? {display: "none !important"} : getBuyableAmount("cb", 23).gte(2) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1003]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.pointTimers[2].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.pointTimers[2].autoCurrent) + "/" +  format(player.cb.pointTimers[2].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1103]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(getLevelableAmount("pet", 303).gte(1)) ? {display: "none !important"} : getBuyableAmount("cb", 23).gte(3) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1004]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.pointTimers[3].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.pointTimers[3].autoCurrent) + "/" +  format(player.cb.pointTimers[3].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1104]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(getLevelableAmount("pet", 304).gte(1)) ? {display: "none !important"} : getBuyableAmount("cb", 23).gte(4) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1005]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.pointTimers[4].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.pointTimers[4].autoCurrent) + "/" +  format(player.cb.pointTimers[4].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1105]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(getLevelableAmount("pet", 305).gte(1)) ? {display: "none !important"} : getBuyableAmount("cb", 23).gte(5) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1006]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.pointTimers[5].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.pointTimers[5].autoCurrent) + "/" +  format(player.cb.pointTimers[5].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1106]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(getLevelableAmount("pet", 306).gte(1)) ? {display: "none !important"} : getBuyableAmount("cb", 23).gte(6) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1007]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.pointTimers[6].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.pointTimers[6].autoCurrent) + "/" +  format(player.cb.pointTimers[6].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1107]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(getLevelableAmount("pet", 307).gte(1)) ? {display: "none !important"} : getBuyableAmount("cb", 23).gte(7) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1008]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.pointTimers[7].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.pointTimers[7].autoCurrent) + "/" +  format(player.cb.pointTimers[7].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1108]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(getLevelableAmount("pet", 308).gte(1)) ? {display: "none !important"} : getBuyableAmount("cb", 23).gte(8) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["style-row", [
                                    ["style-row", [["clickable", 1009]], {width: "47px", height: "47px"}],
                                    ["style-row", [
                                        ["raw-html", () => { return formatWhole(player.cb.pointTimers[8].autoAllocate)}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                    ], {width: "47px", height: "47px"}],
                                ], {width: "94px", height: "47px", borderRight: "3px solid black", userSelect: "none", backgroundColor: "#222222"}],
                                ["style-row", [
                                    ["style-row", [
                                        ["raw-html", () => { return format(player.cb.pointTimers[8].autoCurrent) + "/" +  format(player.cb.pointTimers[8].autoMax)}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {width: "200px", height: "47px"}],
                                    ["style-row", [["clickable", 1109]], {width: "47px", height: "47px"}],
                                ], {width: "247px", height: "47px", userSelect: "none", background: "linear-gradient(90deg, #444444, #666666)"}],
                            ], () => { return !(getLevelableAmount("pet", 309).gte(1)) ? {display: "none !important"} : getBuyableAmount("cb", 23).gte(9) ? {width: "344px", height: "47px", borderBottom: "3px solid black"} : {width: "344px", height: "47px", borderBottom: "3px solid black", opacity: "0.3", pointerEvents: "none", userSelect: "none"}}],
                            ["style-row", [
                                ["clickable", 401], ["clickable", 402], ["clickable", 403]
                            ], {width: "344px", height: "47px", backgroundColor: "#666666"}],
                        ], () => {return getBuyableAmount("cb", 23).gte(1) ? {border: "3px solid black", backgroundColor: "black", marginLeft: "10px"} : {display: "none !important"}}],
                    ]],
                ]
            },
        },
    },
    tabFormat: [
        ["left-row", [
            ["tooltip-row", [
                ["raw-html", "<img src='resources/level.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShortWhole(player.cb.level)}, {width: "93px", height: "50px", color: "#0098E5", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", () => {
                    if ((player.points.gte(1e100) || hasMilestone("ip", 24)) && !inChallenge("ip", 13)) {
                        return "<div class='bottomTooltip'>Levels<hr><small>x" + formatShort(player.cb.levelEffect) + " Celestial Points<br>(Highest level: " + formatShortWhole(player.cb.highestLevel) + ")</small></div>"
                    } else if (inChallenge("ip", 13)) {
                        return "<div class='bottomTooltip'>Levels<hr><small>[Effect Disabled due to IC3]<br>(Highest level: " + formatShortWhole(player.cb.highestLevel) + ")</small></div>"
                    } else {
                        return "<div class='bottomTooltip'>Levels<hr><small>[Reach 1e100 points for effect]<br>(Highest level: " + formatShortWhole(player.cb.highestLevel) + ")</small></div>"
                    }
                }],
            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/XPBoost.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShort(player.cb.XPBoost)}, {width: "93px", height: "50px", color: "#00B229", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", () => {
                    if (player.cb.XPBoost.lt(1000)) {
                        return "<div class='bottomTooltip'>XPBoost<hr><small>x" + formatShort(player.cb.XPBoostEffect) + " XP</small></div>"
                    } else {
                        return "<div class='bottomTooltip'>XPBoost<hr><small>x" + formatShort(player.cb.XPBoostEffect) + " XP<br>[SOFTCAPPED]</small></div>"
                    }
                }],
            ], () => { return (player.cb.highestLevel.gte(100) && (hasUpgrade("ip", 31) || hasMilestone("s", 14))) ? {width: "148px", height: "50px", borderRight: "2px solid white"} : {display: "none !important"} }],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/petPoint.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShort(player.cb.petPoints)}, {width: "93px", height: "50px", color: "#A2D800", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Pet Points<hr><small>(Gained from rare pet buttons)</small></div>"],
            ], () => { return player.cb.highestLevel.gte(25) ? {width: "148px", height: "50px", borderRight: "2px solid white"} : {display: "none !important"}}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShortWhole(player.cb.evolutionShards)}, {width: "68px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Evolution Shards<hr><small>(Gained from check back buttons)</small></div>"],
            ], () => { return player.cb.highestLevel.gte(35) ? {width: "123px", height: "50px", borderRight: "2px solid white"} : {display: "none !important"}}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShortWhole(player.cb.paragonShards)}, {width: "68px", height: "50px", color: "#4c64ff", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", "<div class='bottomTooltip'>Paragon Shards<hr><small>(Gained from XPBoost buttons)</small></div>"],
            ], () => { return player.cb.highestLevel.gte(250) ? {width: "123px", height: "50px", borderRight: "2px solid white"} : {display: "none !important"}}],
            ["tooltip-row", [
                ["raw-html", "<img src='resources/automationShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                ["raw-html", () => { return formatShortWhole(player.cb.automationShards)}, {width: "70px", height: "50px", color: "grey", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                ["raw-html", () => {
                    return "<div class='bottomTooltip'>Automation Shards<hr><small>(Gained from sacrifices)<br>(Total Shards: " + formatShortWhole(player.cb.totalAutomationShards) + ")<br>[While offline, automation<br>only triggers once]</small></div>"
                }],
            ], () => { return player.ev.evolutionsUnlocked[4] ? {width: "125px", height: "50px"} : {display: "none !important"}}],
        ], {width: "825px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px 10px 0px 0px", userSelect: "none"}],
        ["row", [["bar", "xpbar"]]],
        ["blank", "10px"],
        ["raw-html", function () { return player.cb.highestLevel.lt(3) ?  "You will unlock something at level 3! <small>[XP TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(6) && player.cb.highestLevel.gte(3) ?  "You will unlock something at level 6! <small>[XP TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(10) && player.cb.highestLevel.gte(6) ?  "You will unlock something at level 10! <small>[??? TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(15) && player.cb.highestLevel.gte(10) ?  "You will unlock something at level 15! <small>[XP TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(25) && player.cb.highestLevel.gte(15) ?  "You will unlock something at level 25! <small>[CRATE TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(35) && player.cb.highestLevel.gte(25) ?  "You will unlock something at level 35! <small>[??? TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(50) && player.cb.highestLevel.gte(35) ?  "You will unlock something at level 50! <small>[XP TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(65) && player.cb.highestLevel.gte(50) ?  "You will unlock something at level 65! <small>[XP TAB] [PET SHOP]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(75) && player.cb.highestLevel.gte(65) ?  "You will unlock something at level 75! <small>[CRATE TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(100) && player.cb.highestLevel.gte(75) && (hasUpgrade("ip", 31) || hasMilestone("s", 14)) ?  "You will unlock something at level 100! <small>[??? TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(125) && player.cb.highestLevel.gte(100) && (hasChallenge("ip", 12) || hasMilestone("s", 14)) ?  "You will unlock something at level 125! <small>[CRATE TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(150) && player.cb.highestLevel.gte(125) ?  "You will unlock something at level 150! <small>[XP TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(200) && player.cb.highestLevel.gte(150) ?  "You will unlock something at level 200! <small>[MOST MAIN TABS]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(250) && player.cb.highestLevel.gte(200) ?  "You will unlock something at level 250! <small>[EVOLUTION TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(666) && player.cb.highestLevel.gte(250) ?  "You will unlock something at level 666! <small>[XPBOOST TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(1500) && player.cb.highestLevel.gte(666) ?  "You will unlock something at level 1,500! <small>[CRATE TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(3000) && player.cb.highestLevel.gte(1500) ?  "You will unlock something at level 3,000! <small>[PET SHOP]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(25000) && player.cb.highestLevel.gte(3000) && hasUpgrade("s", 23) ?  "You will unlock something at level 25,000! <small>[CRATE TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return player.cb.highestLevel.lt(100000) && player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23) ?  "You will unlock something at level 100,000! <small>[CRATE TAB]</small>" : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["blank", "10px"],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 19) || hasMilestone("ip", 12) || hasMilestone("s", 14)}
})
