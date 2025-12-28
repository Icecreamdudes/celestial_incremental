const petShopShardName = ["Evolution Shard", "Paragon Shard"]
const petShopCrateName = ["Common Crate", "Common/Uncommon Crate", "Uncommon Crate", "Antimatter Crate", "Replicanti Crate", "Rare Crate"]
const petShopBase = {
    common: {
        0: new Decimal(10),
        1: new Decimal(10),
        2: new Decimal(10),
        3: new Decimal(10),
        4: new Decimal(10),
        5: new Decimal(20),
        6: new Decimal(20),
        7: new Decimal(30),
        8: new Decimal(30),
    },
    uncommon: {
        0: new Decimal(25),
        1: new Decimal(25),
        2: new Decimal(25),
        3: new Decimal(25),
        4: new Decimal(25),
        5: new Decimal(50),
        6: new Decimal(50),
        7: new Decimal(75),
        8: new Decimal(75),
    },
    rare: {
        0: new Decimal(200),
        1: new Decimal(200),
        2: new Decimal(200),
        3: new Decimal(200),
        4: new Decimal(200),
        5: new Decimal(400),
        6: new Decimal(400),
        7: new Decimal(600),
        8: new Decimal(600),
    },
    epic: {
        0: new Decimal(500),
        1: new Decimal(500),
        2: new Decimal(500),
        3: new Decimal(1000),
    },
    shard: {
        0: new Decimal(500),
        1: new Decimal(20000),
        2: new Decimal(50000),
    },
    crate: {
        0: new Decimal(10),
        1: new Decimal(20),
        2: new Decimal(40),
        3: new Decimal(150),
        4: new Decimal(75),
        5: new Decimal(300),
        6: new Decimal(500),
    },
}
addLayer("pet", {
    name: "Pets", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Pet", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    levelableAscend: true,
    startData() { return {
        unlocked: true,
        paused: false,

        petCooldownDiv: new Decimal(1),
        petPointMult: new Decimal(1),
        petTimers: {
            0: new Decimal(40),
            1: new Decimal(20),
            2: new Decimal(900),
            3: new Decimal(18000),
            4: new Decimal(180),
            5: new Decimal(1500),
            6: new Decimal(1),
            7: new Decimal(4500),
            8: new Decimal(8000)
        },
        petAverage: {
            0: new Decimal(0.02),
            1: new Decimal(0.02),
            2: new Decimal(0.02),
            3: new Decimal(0.02),
            4: new Decimal(0.02),
            5: new Decimal(0.02),
            6: new Decimal(0.02),
            7: new Decimal(0.02),
            8: new Decimal(0.02),
        },

        lastDicePetRoll: new Decimal(0),
        dicePetRoll: new Decimal(0),
        highestDicePetCombo: new Decimal(0),
        dicePetCombo: new Decimal(0),
        dicePetPointsGain: new Decimal(0),

        singularityFragments: new Decimal(0),

        // FRAGMENTATION
        bannerIndex: 0,

        bannerResetTimer: new Decimal(0),
        bannerResetTimerMax: new Decimal(21600),
        banners: {
            0: {
                id: 101,
                current: new Decimal(0),
                max: new Decimal(900),
            },
            1: {
                id: 101,
                current: new Decimal(0),
                max: new Decimal(900),
            },
            2: {
                id: 201,
                current: new Decimal(0),
                max: new Decimal(3600),
            },
            3: {
                id: 201,
                current: new Decimal(0),
                max: new Decimal(3600),
            },
            4: {
                id: 301,
                current: new Decimal(0),
                max: new Decimal(7200),
            },
        },
        
        //singularity
        singularityTimers: {
            0: {
                current: new Decimal(0),
                max: new Decimal(1800),
            },
            1: {
                current: new Decimal(0),
                max: new Decimal(10800),
            },
        },

        // Legendary Gems
        legendaryGemsToGetMin: new Decimal(0),
        legendaryGemsToGetMax: new Decimal(0),

        legendaryGemTimer: new Decimal(0),
        legendaryGemTimerMax: new Decimal(86400),

        gemEffects: [new Decimal(1), new Decimal(1), new Decimal(1)], // Red, Purple, Green

        //summon
        summonReqs: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)], // Red, Purple, Green
        summonTimer: new Decimal(0),
        summonTimer: new Decimal(21600),

        summonIndex: new Decimal(0),

        // PET SHOP
        shopIndex: 101,
        shopBulk: new Decimal(1),
        shopInput: new Decimal(1),

        shop: {
            common: {
                0: {
                    cost: new Decimal(10),
                    current: new Decimal(0),
                    max: new Decimal(600),
                },
                1: {
                    cost: new Decimal(10),
                    current: new Decimal(0),
                    max: new Decimal(600),
                },
                2: {
                    cost: new Decimal(10),
                    current: new Decimal(0),
                    max: new Decimal(600),
                },
                3: {
                    cost: new Decimal(10),
                    current: new Decimal(0),
                    max: new Decimal(600),
                },
                4: {
                    cost: new Decimal(10),
                    current: new Decimal(0),
                    max: new Decimal(600),
                },
                5: {
                    cost: new Decimal(20),
                    current: new Decimal(0),
                    max: new Decimal(1200),
                },
                6: {
                    cost: new Decimal(20),
                    current: new Decimal(0),
                    max: new Decimal(1200),
                },
                7: {
                    cost: new Decimal(30),
                    current: new Decimal(0),
                    max: new Decimal(1800),
                },
                8: {
                    cost: new Decimal(30),
                    current: new Decimal(0),
                    max: new Decimal(1800),
                },
            },
            uncommon: {
                0: {
                    cost: new Decimal(25),
                    current: new Decimal(0),
                    max: new Decimal(1800),
                },
                1: {
                    cost: new Decimal(25),
                    current: new Decimal(0),
                    max: new Decimal(1800),
                },
                2: {
                    cost: new Decimal(25),
                    current: new Decimal(0),
                    max: new Decimal(1800),
                },
                3: {
                    cost: new Decimal(25),
                    current: new Decimal(0),
                    max: new Decimal(1800),
                },
                4: {
                    cost: new Decimal(25),
                    current: new Decimal(0),
                    max: new Decimal(1800),
                },
                5: {
                    cost: new Decimal(50),
                    current: new Decimal(0),
                    max: new Decimal(3600),
                },
                6: {
                    cost: new Decimal(50),
                    current: new Decimal(0),
                    max: new Decimal(3600),
                },
                7: {
                    cost: new Decimal(75),
                    current: new Decimal(0),
                    max: new Decimal(5400),
                },
                8: {
                    cost: new Decimal(75),
                    current: new Decimal(0),
                    max: new Decimal(5400),
                },
            },
            rare: {
                0: {
                    cost: new Decimal(200),
                    current: new Decimal(0),
                    max: new Decimal(10800),
                },
                1: {
                    cost: new Decimal(200),
                    current: new Decimal(0),
                    max: new Decimal(10800),
                },
                2: {
                    cost: new Decimal(200),
                    current: new Decimal(0),
                    max: new Decimal(10800),
                },
                3: {
                    cost: new Decimal(200),
                    current: new Decimal(0),
                    max: new Decimal(10800),
                },
                4: {
                    cost: new Decimal(200),
                    current: new Decimal(0),
                    max: new Decimal(10800),
                },
                5: {
                    cost: new Decimal(400),
                    current: new Decimal(0),
                    max: new Decimal(21600),
                },
                6: {
                    cost: new Decimal(400),
                    current: new Decimal(0),
                    max: new Decimal(21600),
                },
                7: {
                    cost: new Decimal(600),
                    current: new Decimal(0),
                    max: new Decimal(32400),
                },
                8: {
                    cost: new Decimal(600),
                    current: new Decimal(0),
                    max: new Decimal(32400),
                },
            },
            epic: {
                0: {
                    cost: new Decimal(500),
                    current: new Decimal(0),
                    max: new Decimal(43200),
                },
                1: {
                    cost: new Decimal(500),
                    current: new Decimal(0),
                    max: new Decimal(43200),
                },
                2: {
                    cost: new Decimal(500),
                    current: new Decimal(0),
                    max: new Decimal(43200),
                },
                3: {
                    cost: new Decimal(1000),
                    current: new Decimal(0),
                    max: new Decimal(86400),
                },
            },
            shard: {
                0: {
                    cost: new Decimal(500),
                    current: new Decimal(0),
                    max: new Decimal(21600),
                },
                1: {
                    cost: new Decimal(20000),
                    current: new Decimal(0),
                    max: new Decimal(86400),
                },
                2: {
                    cost: new Decimal(50000),
                    current: new Decimal(0),
                    max: new Decimal(64800),
                },
            },
            crate: {
                0: {
                    cost: new Decimal(10),
                    current: new Decimal(0),
                    max: new Decimal(900),
                },
                1: {
                    cost: new Decimal(20),
                    current: new Decimal(0),
                    max: new Decimal(2700),
                },
                2: {
                    cost: new Decimal(40),
                    current: new Decimal(0),
                    max: new Decimal(5400),
                },
                3: {
                    cost: new Decimal(150),
                    current: new Decimal(0),
                    max: new Decimal(21600),
                },
                4: {
                    cost: new Decimal(75),
                    current: new Decimal(0),
                    max: new Decimal(7200),
                },
                5: {
                    cost: new Decimal(300),
                    current: new Decimal(0),
                    max: new Decimal(36000),
                },
                6: {
                    cost: new Decimal(500),
                    current: new Decimal(0),
                    max: new Decimal(86400),
                },
            },
        },

        //leg
        legPetTimers: {
            0: {
                cooldown: new Decimal(0),
                cooldownMax: new Decimal(1800),
                current: new Decimal(0),
                max: new Decimal(600),
                active: false,
            },
            1: {
                cooldown: new Decimal(0),
                cooldownMax: new Decimal(7200),
                current: new Decimal(0),
                max: new Decimal(300),
                active: false,
            },
        },
        eclipsePity: 0,
    }},
    nodeStyle() {},
    tooltip: "Pets",
    color: "#4e7cff",
    branches: [],
    update(delta) {
        let onepersec = player.cb.cbTickspeed

        // PET COOLDOWN DIVIDER
        player.pet.petCooldownDiv = new Decimal(1)
        player.pet.petCooldownDiv = player.pet.petCooldownDiv.mul(buyableEffect("ev0", 14))
        player.pet.petCooldownDiv = player.pet.petCooldownDiv.mul(levelableEffect("pet", 1203)[0])
        player.pet.petCooldownDiv = player.pet.petCooldownDiv.mul(levelableEffect("pet", 401)[1])
        player.pet.petCooldownDiv = player.pet.petCooldownDiv.mul(buyableEffect("ev2", 22))

        // PET POINT MULTIPLIER
        player.pet.petPointMult = new Decimal(1)
        player.pet.petPointMult = player.pet.petPointMult.mul(levelableEffect("pet", 1204)[1])
        player.pet.petPointMult = player.pet.petPointMult.mul(buyableEffect("cb", 14))
        if (hasUpgrade("ev8", 13)) player.pet.petPointMult = player.pet.petPointMult.mul(1.2)
        player.pet.petPointMult = player.pet.petPointMult.mul(levelableEffect("pet", 401)[0])
        player.pet.petPointMult = player.pet.petPointMult.mul(levelableEffect("pet", 406)[2])
        player.pet.petPointMult = player.pet.petPointMult.mul(player.pet.gemEffects[1])
        player.pet.petPointMult = player.pet.petPointMult.mul(buyableEffect("ep4", 12))
        player.pet.petPointMult = player.pet.petPointMult.mul(buyableEffect("pl", 14))
        if (hasMilestone("db", 101)) player.pet.petPointMult = player.pet.petPointMult.mul(1.15)

        // PET BUTTON COOLDOWN CALC
        for (let i in player.pet.petTimers) {
            player.pet.petTimers[i] = player.pet.petTimers[i].sub(onepersec.mul(delta))
        }

        // PET BUTTON AVERAGES
        for (let i in player.pet.petTimers) {
            if (layers.cb.clickables[Number(i)+201].unlocked()) {
                player.pet.petAverage[i] = tmp.pet.levelables[Number(i)+301].pointValue.div(tmp.pet.levelables[Number(i)+301].pointCooldown)
            } else {
                player.pet.petAverage[i] = new Decimal(0)
            }
        }
        player.pet.petAverage[1] = player.pet.petAverage[1].mul(3)

        // DICE STUFF
        if (player.pet.dicePetCombo > player.pet.highestDicePetCombo) {
            player.pet.highestDicePetCombo = player.pet.dicePetCombo
        }

        // =- FRAGMENTATION START -=
        player.pet.bannerResetTimer = player.pet.bannerResetTimer.sub(onepersec.mul(delta))
        if (player.pet.bannerResetTimer.lte(0)) {
            layers.pet.refreshBanner();
        }

        player.pet.bannerResetTimerMax = new Decimal(21600)
        player.pet.banners[0].max = new Decimal(1800)
        player.pet.banners[1].max = new Decimal(1800)
        player.pet.banners[2].max = new Decimal(3600)
        player.pet.banners[3].max = new Decimal(3600)
        player.pet.banners[4].max = new Decimal(7200)
        for (let thing in player.pet.banners) {
            player.pet.banners[thing].max = player.pet.banners[thing].max.div(buyableEffect("ep3", 13))

            player.pet.banners[thing].current = player.pet.banners[thing].current.sub(onepersec.mul(delta))
        }

        player.pet.singularityTimers[0].max = new Decimal(1800)
        player.pet.singularityTimers[1].max = new Decimal(10800)
        for (let thing in player.pet.singularityTimers) {
            player.pet.singularityTimers[thing].max = player.pet.singularityTimers[thing].max.div(buyableEffect("ep4", 13))
 
            player.pet.singularityTimers[thing].current = player.pet.singularityTimers[thing].current.sub(onepersec.mul(delta))
        }

        // =- LEGENDARY GEMS -=
        player.pet.legendaryGemsToGetMin = player.cb.XPBoost.pow(0.2).div(2).floor()
        player.pet.legendaryGemsToGetMin = player.pet.legendaryGemsToGetMin.mul(levelableEffect("ir", 5)[1])
        player.pet.legendaryGemsToGetMin = player.pet.legendaryGemsToGetMin.mul(buyableEffect("cof", 33))

        player.pet.legendaryGemsToGetMax = player.cb.XPBoost.pow(0.25).div(2).floor()
        player.pet.legendaryGemsToGetMax = player.pet.legendaryGemsToGetMax.mul(levelableEffect("ir", 5)[1])
        player.pet.legendaryGemsToGetMax = player.pet.legendaryGemsToGetMax.mul(buyableEffect("cof", 33))

        player.pet.legendaryGemTimerMax = new Decimal(86400)
        player.pet.legendaryGemTimer = player.pet.legendaryGemTimer.sub(onepersec.mul(delta))

        player.pet.gemEffects[0] = player.cb.legendaryPetGems[0].pow(0.1).div(5).add(1)
        player.pet.gemEffects[1] = player.cb.legendaryPetGems[1].pow(0.07).div(10).add(1)
        player.pet.gemEffects[2] = player.cb.legendaryPetGems[2].pow(0.05).div(7).add(1)

        player.pet.summonTimerMax = new Decimal(21600)
        player.pet.summonTimer = player.pet.summonTimer.sub(onepersec.mul(delta))

        const hours = new Date().getHours() % 6;

        if (hours >= 0 && hours <= 1) {
            player.pet.summonReqs = [
                new Decimal(20),
                new Decimal(10),
                new Decimal(10),
                new Decimal(20),
                new Decimal(0),
            ]
        }
        if (hours > 1 && hours <= 2) {
            player.pet.summonReqs = [
                new Decimal(15),
                new Decimal(15),
                new Decimal(10),
                new Decimal(16),
                new Decimal(1),
            ]
        }
        if (hours > 2 && hours <= 3) {
            player.pet.summonReqs = [
                new Decimal(10),
                new Decimal(20),
                new Decimal(10),
                new Decimal(12),
                new Decimal(2),
            ]
        }
        if (hours > 3 && hours <= 4) {
            player.pet.summonReqs = [
                new Decimal(10),
                new Decimal(15),
                new Decimal(15),
                new Decimal(8),
                new Decimal(3),
            ]
        }
        if (hours > 4 && hours <= 5) {
            player.pet.summonReqs = [
                new Decimal(10),
                new Decimal(10),
                new Decimal(20),
                new Decimal(4),
                new Decimal(4),
            ]
        }
        if (hours > 5 && hours <= 6) {
            player.pet.summonReqs = [
                new Decimal(15),
                new Decimal(10),
                new Decimal(15),
                new Decimal(0),
                new Decimal(5),
            ]
        }

        // =- PET SHOP START -=
        for (let i in player.pet.shop) {
            for (let j in player.pet.shop[i]) {
                player.pet.shop[i][j].cost = petShopBase[i][j]
                if (i != "shard") {
                    player.pet.shop[i][j].cost = player.pet.shop[i][j].cost.mul(player.pet.shopBulk.mul(0.05).add(0.95)).mul(player.pet.shopBulk)
                } else {
                    player.pet.shop[i][j].cost = player.pet.shop[i][j].cost.mul(player.pet.shopBulk.mul(0.1).add(0.9)).mul(player.pet.shopBulk)
                }

                player.pet.shop[i][j].current = player.pet.shop[i][j].current.sub(onepersec.mul(delta))
            }
        }

        if (player.pet.shopInput.gte(1)) player.pet.shopBulk = player.pet.shopInput.floor()

        //legendary pets
        player.pet.legPetTimers[0].max = new Decimal(600)
        player.pet.legPetTimers[0].max = player.pet.legPetTimers[0].max.mul(levelableEffect("pu", 303)[1])

        player.pet.legPetTimers[1].max = new Decimal(300)

        if (getLevelableTier("pu", 303, true)) player.pet.legPetTimers[0].max = player.pet.legPetTimers[0].max.mul(levelableEffect("pu", 303)[0])
        
        let abilityTimeDecrease = new Decimal(1)
        abilityTimeDecrease = abilityTimeDecrease.mul(player.dv.timeDrainRate)
        if (getLevelableTier("pu", 303, true)) abilityTimeDecrease = abilityTimeDecrease.div(levelableEffect("pu", 303)[0])
        player.pet.legPetTimers[0].current = player.pet.legPetTimers[0].current.sub(abilityTimeDecrease.mul(delta))

        player.pet.legPetTimers[1].current = player.pet.legPetTimers[1].current.sub(delta)

        if (player.pet.legPetTimers[0].current.lte(0) && player.pet.legPetTimers[0].active) {
            player.pet.legPetTimers[0].active = false
            player.sma.eclipseShards = player.sma.eclipseShards.add(player.le.eclipseShardsToGetTrue.floor())
            player.le.starmetalAlloyPauseAgain = new Decimal(10)
            for (let prop in player.pu.levelables) {
                if (getLevelableTier("pu", prop, true)) {
                    addLevelableXP("pu", prop, player.le.eclipseShardsToGetTrue.mul(player.le.eclipseShardsValue).floor())
                }
                setLevelableTier("pu", prop, new Decimal(0))
            }
            player.le.starmetalAlloyToGet = new Decimal(0)
            player.le.eclipseShardsToGet = new Decimal(0)
            player.le.resetAmount = new Decimal(0)

            if (!hasUpgrade("sma", 15)) player.pu.storedSelections = new Decimal(0)
            if (hasUpgrade("sma", 15)) player.pu.storedSelections = new Decimal(1)

            player.sma.inStarmetalChallenge = false
            player.universe = "U3"
            player.tab = "sma"
            player.subtabs.pu["stuff"] = "Collection"

            layers.pu.generateSelection();
        }

        for (let thing in player.pet.legPetTimers) {
            if (player.pet.legPetTimers[thing].current.gt(0)) {
                player.pet.legPetTimers[thing].active = true
            } else {
                player.pet.legPetTimers[thing].active = false
            }
        }

        //cooldown
        player.pet.legPetTimers[0].cooldownMax = new Decimal(3600)
        player.pet.legPetTimers[1].cooldownMax = new Decimal(7200)
        for (let thing in player.pet.legPetTimers) {
            player.pet.legPetTimers[thing].cooldown = player.pet.legPetTimers[thing].cooldown.sub(delta)
        }
    },
    clickables: {
        2: {
            title: "<h3>Level Up",
            canClick() { return tmp.pet.levelables[layers.pet.levelables.index].canBuy },
            unlocked() { return layers.pet.levelables.index != 0 },
            tooltip() {
                if (tmp.pet.levelables[layers.pet.levelables.index].levelTooltip == undefined) {
                    return ""
                } else {
                    return tmp.pet.levelables[layers.pet.levelables.index].levelTooltip
                }
            },
            onClick() {
                buyLevelable("pet", layers.pet.levelables.index)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "100px", minHeight: "40px", borderRadius: "0px", fontSize: '8px'}
                if (!this.canClick()) {look.backgroundColor = "#bf8f8f"} else {look.backgroundColor = "#4e7cff"}
                return look
            },
        },
        3: {
            title() { return "<h3>Sell<br>one"},
            canClick() { return getLevelableXP("pet", layers.pet.levelables.index).gte(1)},
            unlocked() { return layers.pet.levelables.index < 1000 && layers.pet.levelables.index != 0 && player.ev.evolutionsUnlocked[4]},
            tooltip() {
                if (tmp.pet.levelables[layers.pet.levelables.index].sellValue == undefined) {
                    return ""
                } else {
                    return "+" + format(tmp.pet.levelables[layers.pet.levelables.index].sellValue) + " Pet Points"
                }
            },
            onClick() {
                setLevelableXP("pet", layers.pet.levelables.index, getLevelableXP("pet", layers.pet.levelables.index).sub(1))
                player.cb.petPoints = player.cb.petPoints.add(tmp.pet.levelables[layers.pet.levelables.index].sellValue)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: '50px', minHeight: '40px', color: "black", borderRadius: '0px', fontSize: '8px'}
                this.canClick() ? look.backgroundColor = "#4e7cff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        4: {
            title() {return "<h3>Sell<br>all" },
            canClick() { return getLevelableXP("pet", layers.pet.levelables.index).gte(1) },
            unlocked() { return layers.pet.levelables.index < 1000 && layers.pet.levelables.index != 0 && player.ev.evolutionsUnlocked[4] },
            tooltip() {
                if (tmp.pet.levelables[layers.pet.levelables.index].sellValue == undefined) {
                    return ""
                } else {
                    return "+" + format(tmp.pet.levelables[layers.pet.levelables.index].sellValue.mul(getLevelableXP("pet", layers.pet.levelables.index))) + " Pet Points"
                }
            },
            onClick() {
                let amount = getLevelableXP("pet", layers.pet.levelables.index)
                setLevelableXP("pet", layers.pet.levelables.index, new Decimal(0))
                player.cb.petPoints = player.cb.petPoints.add(tmp.pet.levelables[layers.pet.levelables.index].sellValue)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: '50px', minHeight: '40px', color: "black", borderRadius: '0px', fontSize: '8px'}
                this.canClick() ? look.backgroundColor = "#4e7cff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        5: {
            title() { 
                if (tmp.pet.levelables[layers.pet.levelables.index].pointValue == undefined) {
                    return ""
                } else if (player.pet.petTimers[layers.pet.levelables.index - 301].gt(0)) {
                    return "<h3 style='font-size:10px;line-height:0.5'>Check back in<br>" + formatTime(player.pet.petTimers[layers.pet.levelables.index - 301]) + "."
                } else if (layers.pet.levelables.index == 302) {
                    return "<h3>Roll for<br>Pet Points!"
                } else {
                    return "<h3>+" + format(tmp.pet.levelables[layers.pet.levelables.index].pointValue) + "<br>Pet Points."
                }
            },
            canClick() {
                if (tmp.pet.levelables[layers.pet.levelables.index].pointCooldown == undefined) {
                    return false
                } else {
                    return player.pet.petTimers[layers.pet.levelables.index - 301].lte(0)
                }
            },
            tooltip() {
                if (tmp.pet.levelables[layers.pet.levelables.index].pointTooltip == undefined) {
                    return ""
                } else {
                    return tmp.pet.levelables[layers.pet.levelables.index].pointTooltip
                }
            },
            unlocked() { return tmp.pet.levelables[layers.pet.levelables.index].pointValue != undefined && (getLevelableAmount("pet", layers.pet.levelables.index).gte(1) || getLevelableTier("pet", layers.pet.levelables.index).gte(1)) },
            onClick() {
                let pval = layers.pet.levelables[layers.pet.levelables.index].pointClick()

                player.cb.petPoints = player.cb.petPoints.add(pval)
                player.pet.petTimers[layers.pet.levelables.index - 301] = tmp.pet.levelables[layers.pet.levelables.index].pointCooldown
                if (player.ca.unlockedCante) player.ca.canteEnergy = player.ca.canteEnergy.add(tmp.pet.levelables[layers.pet.levelables.index].canteBase.mul(player.ca.canteEnergyMult))    
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: '125px', minHeight: '40px', color: "black", borderRadius: '0px', fontSize: '8px'}
                this.canClick() ? look.backgroundColor = "#4e7cff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        6: {
            title() { return "<h3>View Shop"},
            canClick() { return true },
            unlocked() { return tmp.pet.levelables[layers.pet.levelables.index].shopLayer != undefined && (getLevelableAmount("pet", layers.pet.levelables.index).gte(1) || getLevelableTier("pet", layers.pet.levelables.index).gte(1))},
            onClick() {
                player.tab = tmp.pet.levelables[layers.pet.levelables.index].shopLayer
            },
            style() {
                let look = {width: '125px', minHeight: '40px', color: "black", borderRadius: '0px', fontSize: '8px'}
                this.canClick() ? look.backgroundColor = "#4e7cff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        7: {
            title() { return "<h3>Ascend<br>Pet"},
            canClick() {
                if (tmp.pet.levelables[layers.pet.levelables.index].levelLimit == undefined) {
                    return false
                } else {
                    return getLevelableAmount("pet", layers.pet.levelables.index).gte(tmp.pet.levelables[layers.pet.levelables.index].levelLimit)
                }
            },
            unlocked() { return player.ev.evolutionsUnlocked[3] && layers.pet.levelables.index < 1000 && layers.pet.levelables.index != 0 },
            onClick () {
                if (getLevelableAmount("pet", layers.pet.levelables.index).gte(tmp.pet.levelables[layers.pet.levelables.index].levelLimit)) {
                    setLevelableTier("pet", layers.pet.levelables.index, getLevelableTier("pet", layers.pet.levelables.index).add(1))
                    setLevelableAmount("pet", layers.pet.levelables.index, new Decimal(0))
                }
            },
            style() {
                let look = {width: '100px', minHeight: '40px', borderRadius: '0px', fontSize: '8px'}
                this.canClick() ? look.backgroundColor = "#4e7cff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        8: {
            title() { return "<h3>???"},
            tooltip() { return "Coming in<br>future update"},
            canClick() { return false },
            unlocked() { return false /*layers.pet.levelables.index >= 100 && layers.pet.levelables.index < 200*/ },
            onClick () {},
            style() {
                let look = {width: '125px', minHeight: '40px', borderRadius: '0px', fontSize: '8px'}
                this.canClick() ? look.backgroundColor = "#222222" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },
        // SUBTAB BUTTONS
        11: {
            title() { return "Regular Pets" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.subtabs["pet"]["content"] = "Pets"
            },
            style: {width: "125px", minHeight: "60px", backgroundColor: "#094599", color: "black", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },
        12: {
            title() { return "Evolved Pets" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(35) },
            onClick() {
                player.subtabs["pet"]["content"] = "Evolved Pets"
            },
            style: {width: "125px", minHeight: "60px", background: "linear-gradient(90deg, #d487fd, #4b79ff)", color: "#1500bf", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },
        13: {
            title() { return "Pet Shop" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(25) },
            onClick() {
                player.subtabs["pet"]["content"] = "Pet Shop"
            },
            style: {width: "125px", minHeight: "60px", backgroundColor: "#4e7cff", color: "black", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },
        14: {
            title() { return "Fragmentation" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(1500) },
            onClick() {
                player.subtabs["pet"]["content"] = "Fragmentation"
            },
            style: {width: "125px", minHeight: "60px", backgroundColor: "#cb79ed", color: "black", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"},
        },
        15: {
            title() { return "Legendary Gems" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23) },
            onClick() {
                player.subtabs["pet"]["content"] = "Legendary Gems"
            },
            style: {width: "125px", minHeight: "60px", backgroundColor: "#eed200", color: "#fe6d00", borderRadius: "0px", border: "0px", borderBottom: "2px solid white"}, 
        },
        // EVOLVED PET BUTTONS
        21: {
            title() { return "<h3>Special Feature" },
            tooltip() {
                if (tmp.pet.levelables[layers.pet.levelables.index].evoTooltip == undefined) {
                    return ""
                } else {
                    return tmp.pet.levelables[layers.pet.levelables.index].evoTooltip
                }
            },
            canClick() {
                if (tmp.pet.levelables[layers.pet.levelables.index].evoCan == undefined) {
                    return false
                } else {
                    return tmp.pet.levelables[layers.pet.levelables.index].evoCan
                }
            },
            unlocked() { return tmp.pet.levelables[layers.pet.levelables.index].evoClick != undefined },
            onClick() {
                layers.pet.levelables[layers.pet.levelables.index].evoClick()
            },
            style() {
                let look = {width: '125px', minHeight: '40px', color: "black", borderRadius: '0px', fontSize: '8px'}
                this.canClick() ? look.backgroundColor = "#4e7cff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        22: {
            title() { return "<h3>???"},
            tooltip() { return "Coming in<br>future update"},
            canClick() { return false },
            unlocked() { return false },
            onClick () {},
            style() {
                let look = {width: '200px', minHeight: '40px', borderRadius: '0px', fontSize: '8px'}
                this.canClick() ? look.backgroundColor = "#222222" : look.backgroundColor = "#bf8f8f"
                this.canClick() ? look.color = "white" : look.color = "black"
                return look
            },
        },

        //legendary pet skills
        31: {
            title() { return player.pet.legPetTimers[0].cooldown.lte(0) ? "<h3>Activate Skill</h3>" : "Check Back in " + formatTime(player.pet.legPetTimers[0].cooldown) + "."},
            tooltip() { return "Activates the eclipse in DU1 for " + formatSimple(player.pet.legPetTimers[0].max, 1) + " minutes, unlocking alternate gameplay mechanics. (Also throws you into DU1 cause why not)"},
            canClick() { return player.pet.legPetTimers[0].cooldown.lte(0) },
            unlocked() { return layers.pet.levelables.index == 501 },
            onClick () {
                player.pet.legPetTimers[0].cooldown = player.pet.legPetTimers[0].cooldownMax
                player.pet.legPetTimers[0].current = player.pet.legPetTimers[0].max
                player.pet.legPetTimers[0].active = true

                player.sma.inStarmetalChallenge = true
                player.universe = "D1"
                player.tab = "le"

                layers.le.starmetalResetAgain()
                layers.pu.generateSelection();

                player.subtabs.le["stuff"] = "Shards"
                player.subtabs.pu["stuff"] = "Selection"   
                
                pauseUniverse("U1")
                pauseUniverse("UA")
                pauseUniverse("U2")
                pauseUniverse("A1")
                pauseUniverse("A2")
                pauseUniverse("U3")
                pauseUniverse("CB")
            },
            style() {
                let look = {width: '125px', minHeight: '40px', borderRadius: '0px', fontSize: '8px'}
                this.canClick() ? look.backgroundColor = "#eed200" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        32: {
            title() { return player.pet.legPetTimers[1].cooldown.lte(0) ? "<h3>Activate Skill</h3>" : player.pet.legPetTimers[1].current.gte(0) ? "Active: " + formatTime(player.pet.legPetTimers[1].current) + "." : "Check Back in " + formatTime(player.pet.legPetTimers[1].cooldown) + "."},
            tooltip() { return "Boosts your damage in space battles by x1.5 for the next 5 minutes. Also unlocks a new ship."},
            canClick() { return player.pet.legPetTimers[1].cooldown.lte(0) },
            unlocked() { return layers.pet.levelables.index == 502 },
            onClick () {
                player.pet.legPetTimers[1].cooldown = player.pet.legPetTimers[1].cooldownMax
                player.pet.legPetTimers[1].current = player.pet.legPetTimers[1].max
                player.pet.legPetTimers[1].active = true
                //write code
            },
            style() {
                let look = {width: '125px', minHeight: '40px', borderRadius: '0px', fontSize: '8px'}
                this.canClick() ? look.backgroundColor = "#eed200" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },

        // START OF FRAGMENTATION CLICKABLES
        100: {
            title() { return player.pet.banners[player.pet.bannerIndex].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.pet.banners[player.pet.bannerIndex].current) + "." : "<h3>Fragment a pet for rewards!"},
            canClick() { return player.pet.banners[player.pet.bannerIndex].current.lt(0) && getLevelableXP("pet", player.pet.banners[player.pet.bannerIndex].id).gte(1) },
            unlocked() { return true},
            tooltip() {
                if (player.pet.bannerIndex == 0 || player.pet.bannerIndex == 1) {
                    return "<h5>50% - Common Crate<br>10% - Common/Uncommon Crate<br>5% - Uncommon Crate<br>35% - Epic Pet Fragment"
                } else if (player.pet.bannerIndex == 2 || player.pet.bannerIndex == 3) {
                    return "<h5>20% - Common/Uncommon Crate<br>15% - Uncommon Crate<br>15% - Replicanti Crate<br>50% - Epic Pet Fragment"
                } else if (player.pet.bannerIndex == 4) {
                    return "<h5>15% - Antimatter Crate<br>15% - Rare Crate<br>70% - Epic Pet Fragment"
                } else {
                    return ""
                }
            },
            onClick() {
                player.pet.banners[player.pet.bannerIndex].current = player.pet.banners[player.pet.bannerIndex].max
                setLevelableXP("pet", player.pet.banners[player.pet.bannerIndex].id, getLevelableXP("pet", player.pet.banners[player.pet.bannerIndex].id).sub(1))
                
                if (player.pet.bannerIndex == 0 || player.pet.bannerIndex == 1) {
                    layers.pet.commonPetBanner()
                } else if (player.pet.bannerIndex == 2 || player.pet.bannerIndex == 3) {
                    layers.pet.uncommonPetBanner()
                } else if (player.pet.bannerIndex == 4) {
                    layers.pet.rarePetBanner()
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: '200px', minHeight: '50px', borderRadius: '30px / 15px'}
                this.canClick() ? look.backgroundColor = "#cb79ed" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        101: {
            title() { return "<img src='" + run(layers.pet.levelables[player.pet.banners[0].id].image, layers.pet.levelables[player.pet.banners[0].id]) + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.bannerIndex = 0
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px", margin: "2px"}
                player.pet.bannerIndex == 0 ? look.outline = "2px solid white" : look.outline = "0px"
                player.pet.banners[0].current.lt(0) ? look.filter = "brightness(1)" : look.filter = "brightness(0.5)"
                return look
            },
        },
        102: {
            title() { return "<img src='" + run(layers.pet.levelables[player.pet.banners[1].id].image, layers.pet.levelables[player.pet.banners[1].id]) + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.bannerIndex = 1
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px", margin: "2px"}
                player.pet.bannerIndex == 1 ? look.outline = "2px solid white" : look.outline = "0px"
                player.pet.banners[1].current.lt(0) ? look.filter = "brightness(1)" : look.filter = "brightness(0.5)"
                return look
            },
        },
        103: {
            title() { return "<img src='" + run(layers.pet.levelables[player.pet.banners[2].id].image, layers.pet.levelables[player.pet.banners[2].id]) + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.bannerIndex = 2
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px", margin: "2px"}
                player.pet.bannerIndex == 2 ? look.outline = "2px solid white" : look.outline = "0px"
                player.pet.banners[2].current.lt(0) ? look.filter = "brightness(1)" : look.filter = "brightness(0.5)"
                return look
            },
        },
        104: {
            title() { return "<img src='" + run(layers.pet.levelables[player.pet.banners[3].id].image, layers.pet.levelables[player.pet.banners[3].id]) + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.bannerIndex = 3
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px", margin: "2px"}
                player.pet.bannerIndex == 3 ? look.outline = "2px solid white" : look.outline = "0px"
                player.pet.banners[3].current.lt(0) ? look.filter = "brightness(1)" : look.filter = "brightness(0.5)"
                return look
            },
        },
        105: {
            title() { return "<img src='" + run(layers.pet.levelables[player.pet.banners[4].id].image, layers.pet.levelables[player.pet.banners[4].id]) + "'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.bannerIndex = 4
            },
            style() {
                let look = {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px", margin: "2px"}
                player.pet.bannerIndex == 4 ? look.outline = "2px solid white" : look.outline = "0px"
                player.pet.banners[4].current.lt(0) ? look.filter = "brightness(1)" : look.filter = "brightness(0.5)"
                return look
            },
        },
        // FRAGMENT TABS
        111: {
            title() { return "Epic"},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.subtabs["pet"]["fragTabs"] = "Epic"
            },
            style: {width: "100px", minHeight: "47px", backgroundColor: "#cb79ed", color: "black", borderRadius: "0px", border: "0px", borderRight: "2px solid white"},
        },
        112: {
            title() { return "Singularity"},
            canClick() { return true },
            unlocked() { return hasUpgrade("s", 23) && player.cb.highestLevel.gte(25000) },
            onClick() {
                player.subtabs["pet"]["fragTabs"] = "Singularity"
            },
            style: {width: "125px", minHeight: "47px", backgroundColor: "#aa4444", color: "black", borderRadius: "0px", border: "0px", borderRight: "2px solid white"},
        },
        // SINGULARITY FRAGMENTATION
        121: {
            title() { return player.pet.singularityTimers[0].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.pet.singularityTimers[0].current) + "." : "<h3>Sacrifice 3 evo shards for rewards!"},
            canClick() { return player.pet.singularityTimers[0].current.lt(0) && player.cb.evolutionShards.gte(3)},
            unlocked() { return true },
            tooltip() { return "<h5>25% - Common Crate<br>25% - Rare Crate<br>50% - Singularity Fragments"},
            onClick() {
                player.pet.singularityTimers[0].current = player.pet.singularityTimers[0].max
                player.cb.evolutionShards = player.cb.evolutionShards.sub(3)

                layers.pet.evoBanner();
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "225px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#d487fd" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        122: {
            title() { return player.pet.singularityTimers[1].current.gt(0) ? "<h3>Check back in <br>" + formatTime(player.pet.singularityTimers[1].current) + "." : "<h3>Sacrifice 3 paragon shards for rewards!"},
            canClick() { return player.pet.singularityTimers[1].current.lt(0) && player.cb.paragonShards.gte(3)},
            unlocked() { return true },
            tooltip() { return "<h5>12% - Rare Crate<br>16% - Singularity Crate<br>2% - Legendary Gems<br>70% - Singularity Fragments"},
            onClick() {
                player.pet.singularityTimers[1].current = player.pet.singularityTimers[1].max
                player.cb.paragonShards = player.cb.paragonShards.sub(3)

                layers.pet.paragonBanner();
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "225px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#4c64ff" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        // LEGENDARY GEMS
        201: {
            title() { return player.pet.legendaryGemTimer.gt(0) ? "<h3>Check back in <br>" + formatTime(player.pet.legendaryGemTimer) + "." : "Reset for legendary gems."},
            canClick() { return player.pet.legendaryGemTimer.lt(0) },
            unlocked() { return true },
            onClick() {
                const redGemGain = randomInt(player.pet.legendaryGemsToGetMin, player.pet.legendaryGemsToGetMax)
                const purpleGemGain = randomInt(player.pet.legendaryGemsToGetMin, player.pet.legendaryGemsToGetMax)
                const greenGemGain = randomInt(player.pet.legendaryGemsToGetMin, player.pet.legendaryGemsToGetMax)
    
                // Add the gems to the player's inventory
                player.cb.legendaryPetGems[0] = player.cb.legendaryPetGems[0].add(redGemGain)
                player.cb.legendaryPetGems[1] = player.cb.legendaryPetGems[1].add(purpleGemGain)
                player.cb.legendaryPetGems[2] = player.cb.legendaryPetGems[2].add(greenGemGain)

                player.pet.legendaryGemTimer = player.pet.legendaryGemTimerMax

                // RESET CODE
                player.cb.xp = new Decimal(0)
                player.cb.totalxp = new Decimal(0)
                player.cb.level = new Decimal(0)
                player.cb.XPBoost = new Decimal(1)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#fe9400" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },
        202: {
            title() { return player.pet.summonTimer.gt(0) ? "<h3>Check back in <br>" + formatTime(player.pet.summonTimer) + "." : "SUMMON."},
            canClick() { return player.pet.summonTimer.lte(0) && player.cb.legendaryPetGems[0].gte(player.pet.summonReqs[0]) && player.cb.legendaryPetGems[1].gte(player.pet.summonReqs[1]) && player.cb.legendaryPetGems[2].gte(player.pet.summonReqs[2]) && player.cb.evolutionShards.gte(player.pet.summonReqs[3]) && player.cb.paragonShards.gte(player.pet.summonReqs[4]) },
            unlocked() { return true },
            tooltip() {
                return "20% - " + formatWhole(player.pet.petPointMult.mul(4.5).floor()) + " of every common pet<br>" +
                "20% - " + formatWhole(player.pet.petPointMult.mul(2.5).floor()) + " of every uncommon pet<br>" +
                "20% - " + formatWhole(player.pet.petPointMult.mul(0.8).floor()) + " of every rare pet<br>" +
                "10% - " + formatWhole(player.pet.petPointMult.floor()) + " of every<br>epic/singularity fragment<br>" +
                "10% - +" + formatWhole(player.pet.petPointMult.mul(10000)) + " pet points<br>" +
                "20% - LEGENDARY PET SUMMON" },
            onClick() {
                player.cb.legendaryPetGems[0] = player.cb.legendaryPetGems[0].sub(player.pet.summonReqs[0])
                player.cb.legendaryPetGems[1] = player.cb.legendaryPetGems[1].sub(player.pet.summonReqs[1])
                player.cb.legendaryPetGems[2] = player.cb.legendaryPetGems[2].sub(player.pet.summonReqs[2])
                player.cb.evolutionShards = player.cb.evolutionShards.sub(player.pet.summonReqs[3])
                player.cb.paragonShards = player.cb.paragonShards.sub(player.pet.summonReqs[4])

                player.pet.summonTimer = player.pet.summonTimerMax

                layers.pet.legendarySummon();
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "200px", minHeight: "50px", borderRadius: "30px / 15px"}
                this.canClick() ? look.backgroundColor = "#fe9400" : look.backgroundColor = "#bf8f8f"
                return look
            },
        },

        // legendary pet selection
        301: {
            title() { return "<img src='resources/Pets/eclipseLegendaryPet.png' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.summonIndex = new Decimal(0)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "100px", minHeight: "100px"}
                player.pet.summonIndex.eq(0) ? look.backgroundColor = "#fe2600ff" : look.backgroundColor = "#fe9400"
                return look
            },
        },
        302: {
            title() { return "<img src='resources/Pets/geroaLegendaryPet.png' style='width:94%;height:94%;margin:3%;padding-top:3%'></img>" },
            canClick() { return true },
            unlocked() { return hasUpgrade("ir", 16) },
            onClick() {
                player.pet.summonIndex = new Decimal(1)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "100px", minHeight: "100px"}
                player.pet.summonIndex.eq(1) ? look.backgroundColor = "#fe2600ff" : look.backgroundColor = "#fe9400"
                return look
            },
        },

        // PET SHOP
        1002: {
            title() {
                if (player.pet.shopIndex >= 100 && player.pet.shopIndex < 200) {
                    if (player.pet.shop.common[player.pet.shopIndex-101].current.gte(0)) {
                        return "<h3>Check back in <br>" + formatTime(player.pet.shop.common[player.pet.shopIndex-101].current) + "."
                    } else {return "<h3>Buy"}
                } else if (player.pet.shopIndex >= 200 && player.pet.shopIndex < 300) {
                    if (player.pet.shop.uncommon[player.pet.shopIndex-201].current.gte(0)) {
                        return "<h3>Check back in <br>" + formatTime(player.pet.shop.uncommon[player.pet.shopIndex-201].current) + "."
                    } else {return "<h3>Buy"}
                } else if (player.pet.shopIndex >= 300 && player.pet.shopIndex < 400) {
                    if (player.pet.shop.rare[player.pet.shopIndex-301].current.gte(0)) {
                        return "<h3>Check back in <br>" + formatTime(player.pet.shop.rare[player.pet.shopIndex-301].current) + "."
                    } else {return "<h3>Buy"}
                } else if (player.pet.shopIndex >= 400 && player.pet.shopIndex < 500) {
                    if (player.pet.shop.epic[player.pet.shopIndex-401].current.gte(0)) {
                        return "<h3>Check back in <br>" + formatTime(player.pet.shop.epic[player.pet.shopIndex-401].current) + "."
                    } else {return "<h3>Buy"}
                } else { return "<h3>Buy" }
            },
            canClick() {
                if (player.pet.shopIndex >= 100 && player.pet.shopIndex < 200) {
                    return player.cb.petPoints.gte(player.pet.shop.common[player.pet.shopIndex-101].cost) && player.pet.shop.common[player.pet.shopIndex-101].current.lt(0)
                } else if (player.pet.shopIndex >= 200 && player.pet.shopIndex < 300) {
                    return player.cb.petPoints.gte(player.pet.shop.uncommon[player.pet.shopIndex-201].cost) && player.pet.shop.uncommon[player.pet.shopIndex-201].current.lt(0)
                } else if (player.pet.shopIndex >= 300 && player.pet.shopIndex < 400) {
                    return player.cb.petPoints.gte(player.pet.shop.rare[player.pet.shopIndex-301].cost) && player.pet.shop.rare[player.pet.shopIndex-301].current.lt(0)
                } else if (player.pet.shopIndex >= 400 && player.pet.shopIndex < 500) {
                    return player.cb.petPoints.gte(player.pet.shop.epic[player.pet.shopIndex-401].cost) && player.pet.shop.epic[player.pet.shopIndex-401].current.lt(0)
                } else { return false }
            },
            unlocked() { return player.pet.shopIndex > 100},
            onClick() {
                if (!hasAchievement("achievements", 104)) completeAchievement("achievements", 104)
                if (player.pet.shopIndex >= 100 && player.pet.shopIndex < 200) {
                    player.cb.petPoints = player.cb.petPoints.sub(player.pet.shop.common[player.pet.shopIndex-101].cost)
                    player.pet.shop.common[player.pet.shopIndex-101].current = player.pet.shop.common[player.pet.shopIndex-101].max
                    doPopup("none", "+" + formatWhole(player.pet.shopBulk) + " " + run(layers.pet.levelables[player.pet.shopIndex].title, layers.pet.levelables[player.pet.shopIndex]), "Pet Obtained!", 5, "#9bedff", run(layers.pet.levelables[player.pet.shopIndex].image, layers.pet.levelables[player.pet.shopIndex]))
                } else if (player.pet.shopIndex >= 200 && player.pet.shopIndex < 300) {
                    player.cb.petPoints = player.cb.petPoints.sub(player.pet.shop.uncommon[player.pet.shopIndex-201].cost)
                    player.pet.shop.uncommon[player.pet.shopIndex-201].current = player.pet.shop.uncommon[player.pet.shopIndex-201].max
                    doPopup("none", "+" + formatWhole(player.pet.shopBulk) + " " + run(layers.pet.levelables[player.pet.shopIndex].title, layers.pet.levelables[player.pet.shopIndex]), "Pet Obtained!", 5, "#88e688", run(layers.pet.levelables[player.pet.shopIndex].image, layers.pet.levelables[player.pet.shopIndex]))
                } else if (player.pet.shopIndex >= 300 && player.pet.shopIndex < 400) {
                    player.cb.petPoints = player.cb.petPoints.sub(player.pet.shop.rare[player.pet.shopIndex-301].cost)
                    player.pet.shop.rare[player.pet.shopIndex-301].current = player.pet.shop.rare[player.pet.shopIndex-301].max
                    doPopup("none", "+" + formatWhole(player.pet.shopBulk) + " " + run(layers.pet.levelables[player.pet.shopIndex].title, layers.pet.levelables[player.pet.shopIndex]), "Pet Obtained!", 5, "#4e7cff", run(layers.pet.levelables[player.pet.shopIndex].image, layers.pet.levelables[player.pet.shopIndex]))
                } else if (player.pet.shopIndex >= 400 && player.pet.shopIndex < 500) {
                    player.cb.petPoints = player.cb.petPoints.sub(player.pet.shop.epic[player.pet.shopIndex-401].cost)
                    player.pet.shop.epic[player.pet.shopIndex-401].current = player.pet.shop.epic[player.pet.shopIndex-401].max
                    if (player.pet.shopIndex == 401) doPopup("none", "+" + formatWhole(player.pet.shopBulk) + " Dotknight Fragment", "Fragment Obtained!", 5, "#cb79ed", "resources/dotknightEpicPetFragment1.png")
                    if (player.pet.shopIndex == 402) doPopup("none", "+" + formatWhole(player.pet.shopBulk) + " Dragon Fragment", "Fragment Obtained!", 5, "#cb79ed", "resources/dragonEpicPetFragment1.png")
                    if (player.pet.shopIndex == 403) doPopup("none", "+" + formatWhole(player.pet.shopBulk) + " Cookie Fragment", "Fragment Obtained!", 5, "#cb79ed", "resources/cookieEpicPetFragment1.png")
                    if (player.pet.shopIndex == 404) doPopup("none", "+" + formatWhole(player.pet.shopBulk) + " Singularity Fragment", "Fragment Obtained!", 5, "#cb79ed", "resources/singularityEpicPetFragment.png")
                }
                if (player.pet.shopIndex != 404) {
                    addLevelableXP("pet", player.pet.shopIndex, player.pet.shopBulk)
                } else {
                    player.pet.singularityFragments = player.pet.singularityFragments.add(player.pet.shopBulk)
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: {width: "197px", minHeight: "72px", borderRadius: "0px", border: "0px"},
        },
        1003: {
            title() {
                if (player.pet.shopIndex > 0 && player.pet.shopIndex < 11) {
                    if (player.pet.shop.shard[player.pet.shopIndex-1].current.gte(0)) {
                        return "<h3>Check back in <br>" + formatTime(player.pet.shop.shard[player.pet.shopIndex-1].current) + "."
                    } else {return "<h3>Buy"}
                } else if (player.pet.shopIndex > 10 && player.pet.shopIndex < 100) {
                    if (player.pet.shop.crate[player.pet.shopIndex-11].current.gte(0)) {
                        return "<h3>Check back in <br>" + formatTime(player.pet.shop.crate[player.pet.shopIndex-11].current) + "."
                    } else {return "<h3>Buy"}
                } else { return "<h3>Buy" }
            },
            canClick() {
                if (player.pet.shopIndex > 0 && player.pet.shopIndex < 11) {
                    return player.cb.petPoints.gte(player.pet.shop.shard[player.pet.shopIndex-1].cost) && player.pet.shop.shard[player.pet.shopIndex-1].current.lt(0)
                } else if (player.pet.shopIndex > 10 && player.pet.shopIndex < 100) {
                    return player.cb.petPoints.gte(player.pet.shop.crate[player.pet.shopIndex-11].cost) && player.pet.shop.crate[player.pet.shopIndex-11].current.lt(0)
                } else {
                    return false
                }
            },
            unlocked() { return player.pet.shopIndex < 100},
            onClick() {
                if (player.pet.shopIndex > 0 && player.pet.shopIndex < 11) {
                    player.cb.petPoints = player.cb.petPoints.sub(player.pet.shop.shard[player.pet.shopIndex-1].cost)
                    player.pet.shop.shard[player.pet.shopIndex-1].current = player.pet.shop.shard[player.pet.shopIndex-1].max
                    if (player.pet.shopIndex == 1) {
                        player.cb.evolutionShards = player.cb.evolutionShards.add(player.pet.shopBulk);
                        doPopup("none", "+" + formatWhole(player.pet.shopBulk) + " Evolution Shard!", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
                    }
                    if (player.pet.shopIndex == 2) {
                        player.cb.paragonShards = player.cb.paragonShards.add(player.pet.shopBulk);
                        doPopup("none", "+" + formatWhole(player.pet.shopBulk) + " Paragon Shard!", "Shard Obtained!", 5, "#4c64ff", "resources/paragonShard.png")
                    }
                    if (player.pet.shopIndex == 3) {
                        player.ep2.chocoShards = player.ep2.chocoShards.add(player.pet.shopBulk);
                        doPopup("none", "+" + formatWhole(player.pet.shopBulk) + " Chocolate Shard!", "Shard Obtained!", 5, "#2D6C95", "resources/checkback/choco_shard.png")
                    }
                } else if (player.pet.shopIndex > 10 && player.pet.shopIndex < 100) {
                    player.cb.petPoints = player.cb.petPoints.sub(player.pet.shop.crate[player.pet.shopIndex-11].cost)
                    player.pet.shop.crate[player.pet.shopIndex-11].current = player.pet.shop.crate[player.pet.shopIndex-11].max
                    // ADD BULK
                    if (player.pet.shopIndex == 11) layers.cb.petButton1(player.pet.shopBulk);
                    if (player.pet.shopIndex == 12) layers.cb.petButton2(player.pet.shopBulk);
                    if (player.pet.shopIndex == 13) layers.cb.petButton3(player.pet.shopBulk);
                    if (player.pet.shopIndex == 14) layers.cb.petButton4(player.pet.shopBulk);
                    if (player.pet.shopIndex == 15) layers.cb.petButton5(player.pet.shopBulk);
                    if (player.pet.shopIndex == 16) layers.cb.petButton6(player.pet.shopBulk);
                    if (player.pet.shopIndex == 17) layers.cb.petButton7(player.pet.shopBulk);
                }
            },
            onHold() { clickClickable(this.layer, this.id) },
            style: {width: "197px", minHeight: "72px", borderRadius: "0px", border: "0px"},
        },
        1004: {
            title() {return "Misc."},
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(65) },
            onClick() {
                player.subtabs["pet"]["shopTabs"] = "Misc."
            },
            style: {width: "100px", minHeight: "47px", backgroundColor: "grey", color: "black", borderRadius: "0px", border: "0px", borderRight: "2px solid white"},
        },
        1005: {
            title() { return "Common"},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.subtabs["pet"]["shopTabs"] = "Common"
            },
            style: {width: "100px", minHeight: "47px", backgroundColor: "#9bedff", color: "black", borderRadius: "0px", border: "0px", borderRight: "2px solid white"},
        },
        1006: {
            title() { return "Uncommon"},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.subtabs["pet"]["shopTabs"] = "Uncommon"
            },
            style: {width: "100px", minHeight: "47px", backgroundColor: "#88e688", color: "black", borderRadius: "0px", border: "0px", borderRight: "2px solid white"},
        },
        1007: {
            title() { return "Rare"},
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.subtabs["pet"]["shopTabs"] = "Rare"
            },
            style: {width: "100px", minHeight: "47px", backgroundColor: "#4e7cff", color: "black", borderRadius: "0px", border: "0px", borderRight: "2px solid white"},
        },
        1008: {
            title() { return "Epic"},
            canClick() { return true },
            unlocked() { return false },
            onClick() {
                player.subtabs["pet"]["shopTabs"] = "Epic"
            },
            style: {width: "100px", minHeight: "47px", backgroundColor: "#cb79ed", color: "black", borderRadius: "0px", border: "0px", borderRight: "2px solid white"},
        },
        // MISC SELECTION
        1011: {
            title() { return "<img src='resources/evoShard.png'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 1
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1012: {
            title() { return "<img src='resources/paragonShard.png'style='width:100px;height:100px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 2
            },
            style: {width: "100px", minHeight: "100px", border: "0px", borderRadius: "0px", padding: "0px"},
        },
        1021: {
            title() { return "Common Crate" },
            tooltip() { return "18% - Gwa<br>18% - Egg Guy<br>18% - Unsmith<br>18% - Gd Checkpoint<br>18% - Slax<br>10% - Teste"},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 11
            },
            style: {zIndex: "10", width: "100px", minHeight: "100px", borderRadius: "0px", border: "10px solid #7cbdcc", background: "linear-gradient(135deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 55%", backgroundColor: "#9bedff"},
        },
        1022: {
            title() { return "Common/<br>Uncommon Crate" },
            tooltip() { return "6% - Gwa<br>6% - Egg Guy<br>6% - Unsmith<br>6% - Gd Checkpoint<br>6% - Slax<br>12% - Teste<br>12% - Star<br>12% - Normal Face<br>12% - Shark<br>12% - THE WATCHING EYE<br>10% - Nova"},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 12
            },
            style: {zIndex: "10", width: "100px", minHeight: "100px", borderRadius: "0px", border: "10px solid #74bb9c", background: "linear-gradient(135deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 55%", backgroundColor: "#92EAC4"},
        },
        1023: {
            title() { return "Uncommon Crate" },
            tooltip() { return "16% - Teste<br>16% - Star<br>16% - Normal Face<br>16% - Shark<br>16% - THE WATCHING EYE<br>12% - Goofy Ahh Thing<br>8% - Evo Shard"},
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 13
            },
            style: {zIndex: "10", width: "100px", minHeight: "100px", borderRadius: "0px", border: "10px solid #6cb86c", background: "linear-gradient(135deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 55%", backgroundColor: "#88e688"},
        },
        1024: {
            title() { return "<small>Antimatter</small> Crate" },
            tooltip() { return "25% - Spider<br>25% - Blob<br>15% - Clock<br>15% - Trollface<br>15% - Antimatter<br>5% - Evo Shards"},
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 14
            },
            style: {zIndex: "10", width: "100px", minHeight: "100px", borderRadius: "0px", border: "10px solid #189011", background: "linear-gradient(135deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 55%", backgroundColor: "#1eb516"},
        },
        1025: {
            title() { return "<small>Replicanti</small> Crate" },
            tooltip() { return "25% - Replicator<br>25% - Smoke<br>15% - Infinity Breaker<br>15% - John<br>10% - Hex Shadow<br>10% - Grass Square"},
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 15
            },
            style: {zIndex: "10", width: "100px", minHeight: "100px", borderRadius: "0px", border: "10px solid #086894", background: "linear-gradient(135deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 55%", backgroundColor: "#0a82b9"},
        },
        1026: {
            title() { return "Rare Crate" },
            tooltip() { return "10% - Nova<br>10% - Dice<br>10% - Drippy Ufo<br>10% - Goofy Ahh Thing<br>10% - Antimatter<br>10% - Hex Shadow<br>10% - Grass Square<br>30% - Epic Pet Fragment"},
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 16
            },
            style: {zIndex: "9", width: "100px", minHeight: "100px", borderRadius: "0px", border: "10px solid #3e63cc", background: "linear-gradient(135deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 55%", backgroundColor: "#4e7cff"},
        },
        1027: {
            title() { return "Singularity Crate" },
            tooltip() { return "30% - Impossible Triangle<br>30% - Forbidden Core<br>10% - Paragon Shard<br>25% - Singularity Fragment<br>5% - Legendary Gems"},
            canClick() { return true },
            unlocked() { return false },
            onClick() {
                player.pet.shopIndex = 17
            },
            style: {zIndex: "9", width: "100px", minHeight: "100px", borderRadius: "0px", border: "10px solid #a33636", background: "linear-gradient(135deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0) 55%", backgroundColor: "#cc4444"},
        },
        // COMMON SELECTION
        1101: {
            title() { return "<img src='resources/Pets/gwaCommonPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 101
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #45BDD7", borderRadius: "0px", padding: "0px"},
        },
        1102: {
            title() { return "<img src='resources/Pets/eggCommonPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 102
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #45BDD7", borderRadius: "0px", padding: "0px"},
        },
        1103: {
            title() { return "<img src='resources/Pets/unsmithCommonPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 103
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #45BDD7", borderRadius: "0px", padding: "0px"},
        },
        1104: {
            title() { return "<img src='resources/Pets/checkpointCommonPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 104
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #45BDD7", borderRadius: "0px", padding: "0px"},
        },
        1105: {
            title() { return "<img src='resources/Pets/slaxCommonPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 105
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #45BDD7", borderRadius: "0px", padding: "0px"},
        },
        1106: {
            title() { return "<img src='resources/Pets/spiderCommonPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 106
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #45BDD7", borderRadius: "0px", padding: "0px"},
        },
        1107: {
            title() { return "<img src='resources/Pets/blobCommonPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 107
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #45BDD7", borderRadius: "0px", padding: "0px"},
        },
        1108: {
            title() { return "<img src='resources/Pets/replicatorCommonPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 108
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #45BDD7", borderRadius: "0px", padding: "0px"},
        },
        1109: {
            title() { return "<img src='resources/Pets/smokeCommonPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 109
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #45BDD7", borderRadius: "0px", padding: "0px"},
        },
        // UNCOMMON SELECTION
        1201: {
            title() { return "<img src='resources/Pets/testeUncommonPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 201
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #008300", borderRadius: "0px", padding: "0px"},
        },
        1202: {
            title() { return "<img src='resources/Pets/starUncommonPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 202
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #008300", borderRadius: "0px", padding: "0px"},
        },
        1203: {
            title() { return "<img src='resources/Pets/normalFaceUncommonPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 203
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #008300", borderRadius: "0px", padding: "0px"},
        },
        1204: {
            title() { return "<img src='resources/Pets/sharkUncommonPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 204
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #008300", borderRadius: "0px", padding: "0px"},
        },
        1205: {
            title() { return "<img src='resources/Pets/eyeUncommonPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 205
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #008300", borderRadius: "0px", padding: "0px"},
        },
        1206: {
            title() { return "<img src='resources/Pets/clockUncommonPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 206
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #008300", borderRadius: "0px", padding: "0px"},
        },
        1207: {
            title() { return "<img src='resources/Pets/trollUncommonPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 207
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #008300", borderRadius: "0px", padding: "0px"},
        },
        1208: {
            title() { return "<img src='resources/Pets/infinityBreakerUncommonPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 208
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #008300", borderRadius: "0px", padding: "0px"},
        },
        1209: {
            title() { return "<img src='resources/Pets/johnUncommonPet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return player.cb.highestLevel.gte(3000) },
            onClick() {
                player.pet.shopIndex = 209
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #008300", borderRadius: "0px", padding: "0px"},
        },
        // RARE SELECTION
        1301: {
            title() { return "<img src='resources/Pets/novaRarePet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 301
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #0031BF", borderRadius: "0px", padding: "0px"},
        },
        1302: {
            title() { return "<img src='resources/Pets/diceRarePet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 302
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #0031BF", borderRadius: "0px", padding: "0px"},
        },
        1303: {
            title() { return "<img src='resources/Pets/ufoRarePet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 303
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #0031BF", borderRadius: "0px", padding: "0px"},
        },
        1304: {
            title() { return "<img src='resources/Pets/goofyAhhThingRarePet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 304
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #0031BF", borderRadius: "0px", padding: "0px"},
        },
        1305: {
            title() { return "<img src='resources/Pets/antimatterRarePet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 305
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #0031BF", borderRadius: "0px", padding: "0px"},
        },
        1306: {
            title() { return "<img src='resources/Pets/hexShadowRarePet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 306
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #0031BF", borderRadius: "0px", padding: "0px"},
        },
        1307: {
            title() { return "<img src='resources/Pets/grassSquareRarePet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 307
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #0031BF", borderRadius: "0px", padding: "0px"},
        },
        1308: {
            title() { return "<img src='resources/Pets/impossibleTriangleRarePet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 308
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #0031BF", borderRadius: "0px", padding: "0px"},
        },
        1309: {
            title() { return "<img src='resources/Pets/forbiddenCoreRarePet.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 309
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #0031BF", borderRadius: "0px", padding: "0px"},
        },
        // EPIC SELECTION
        1401: {
            title() { return "<img src='resources/dotknightEpicPetFragment1.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 401
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #6600A6", borderRadius: "0px", padding: "0px"},
        },
        1402: {
            title() { return "<img src='resources/dragonEpicPetFragment1.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 402
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #6600A6", borderRadius: "0px", padding: "0px"},
        },
        1403: {
            title() { return "<img src='resources/cookieEpicPetFragment1.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 403
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #6600A6", borderRadius: "0px", padding: "0px"},
        },
        1404: {
            title() { return "<img src='resources/singularityEpicPetFragment.png'style='width:90px;height:90px;margin:0px;margin-bottom:-4px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pet.shopIndex = 404
            },
            style: {width: "100px", minHeight: "100px", border: "5px solid #6600A6", borderRadius: "0px", padding: "0px"},
        },
    },
    levelables: {
        // NO PET SELECTED INFO
        0: {
            image() { return "resources/secret.png"},
            title() { return "No pet selected." },
            description() { return "" },
            currency() { return getLevelableXP(this.layer, this.id) },
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() { return {width: '100px', height: '125px', backgroundColor: '#222222'} } 
        },
        // COMMON PETS
        101: {
            image() { return this.canClick() ? "resources/Pets/gwaCommonPet.png" : "resources/secret.png"},
            title() { return "Gwa" },
            lore() { return "Has a childlike innocence and is very kind. Seems to have immense power but is also very reluctant to use the power." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to points.<br>" + 
                    "x" + format(this.effect()[1]) + " to check back xp."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.pow(3).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))).add(1), // Points Gain
                    amt.mul(0.02).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Check Back XP Gain
                ]
            },
            sellValue() { return new Decimal(5)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.add(1).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#45BDD7" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        102: {
            image() { return this.canClick() ? "resources/Pets/eggCommonPet.png" : "resources/secret.png"},
            title() { return "Egg Guy" },
            lore() { return "This fellow came out of a very powerful chicken... However he would meet his fate when the chicken inside hatches..." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to prestige points.<br>" +
                    "x" + format(this.effect()[1]) + " to tree gain."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() { 
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.pow(2.4).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))).add(1), // Prestige Points Gain
                    amt.pow(2).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))).add(1), // Tree Gain
                ]
            },
            sellValue() { return new Decimal(5)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.add(1).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#45BDD7" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }
        },
        103: {
            image() { return this.canClick() ? "resources/Pets/unsmithCommonPet.png" : "resources/secret.png"},
            title() { return "Unsmith" },
            lore() { return "A creature that was synergized out of the purest form of SPV. We don't know what it is yet... We will figure it out one day." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to factor power.<br>" +
                    "x" + format(this.effect()[1]) + " to mod gain."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40)).add(levelableEffect("pet", 1103)[0])
                if ((player.points.lt(1e100) && !hasMilestone("ip", 24)) || inChallenge("ip", 13)) amt = amt.sub(1)
                return [
                    amt.pow(2.7).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))).add(1), // Factor Power Gain
                    amt.pow(1.8).pow(Decimal.pow(3, getLevelableTier(this.layer, this.id))).add(1), // Mod Gain
                ]
            },
            sellValue() { return new Decimal(5)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.add(1).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#45BDD7" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        104: {
            image() { return this.canClick() ? "resources/Pets/checkpointCommonPet.png" : "resources/secret.png"},
            title() { return "Gd Checkpoint" },
            lore() { return "This guy feels a little bit familiar, but you don't know why. You just ignore it." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to grass value.<br>" +
                    "x" + format(this.effect()[1]) + " to golden grass value."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.pow(2.2).pow(Decimal.pow(3, getLevelableTier(this.layer, this.id))).add(1), // Grass Value
                    amt.pow(1.3).pow(Decimal.pow(1.5, getLevelableTier(this.layer, this.id))).div(3).add(1), // Golden Grass Value
                ]
            },
            sellValue() { return new Decimal(5)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.add(1).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#45BDD7" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        105: {
            image() { return this.canClick() ? "resources/Pets/slaxCommonPet.png" : "resources/secret.png"},
            title() { return "Slax" },
            lore() { return "A being of neon green and plasma. The energy of the void radiates within it's presence." }, 
            description() {
                return "/" + format(this.effect()[0]) + " to crate button cooldown.<br>" +
                    "/" + format(this.effect()[1]) + " to xp button cooldown."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(0.01).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Crate button Cooldown
                    amt.mul(0.02).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // XP Button Cooldown
                ]
            },
            sellValue() { return new Decimal(5)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.add(1).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#45BDD7" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        106: {
            image() { return this.canClick() ? "resources/Pets/spiderCommonPet.png" : "resources/secret.png"},
            title() { return "Spider" },
            lore() { return "This eight-legged bug has no place in these worlds, but a small crack in the fabric of reality made it slip through and gain enough power to be your pet." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to antimatter.<br>" +
                    "x" + format(this.effect()[1]) + " to 7th dimensions."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.pow(1.6).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))).div(2).add(1), // Antimatter
                    amt.pow(1.6).pow(Decimal.pow(5, getLevelableTier(this.layer, this.id))).div(2).add(1), // 7th Dimensions
                ]
            },
            sellValue() { return new Decimal(10)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(125) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(1.5).add(1).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#45BDD7" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        107: {
            image() { return this.canClick() ? "resources/Pets/blobCommonPet.png" : "resources/secret.png"},
            title() { return "Blob" },
            lore() { return "Blob." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to XPBoost."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() { 
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40)).add(levelableEffect("pet", 1107)[0])
                if ((player.points.lt(1e100) && !hasMilestone("ip", 24)) || inChallenge("ip", 13)) amt = amt.sub(1)
                return [
                    amt.mul(0.01).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // XPBoost
                ]
            },
            sellValue() { return new Decimal(10)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(125) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(1.5).add(1).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#45BDD7" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        108: {
            image() { return this.canClick() ? "resources/Pets/replicatorCommonPet.png" : "resources/secret.png"},
            title() { return "Replicator" },
            lore() { return "This creature was the result of a failed replicant galaxy transformation. It holds the power of 1.79e308 replicanti, but can not replicate itself no more." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to replicanti mult.<br>" +
                    "x" + format(this.effect()[1]) + " to galaxy dust."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(0.1).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Replicanti Multiplier
                    amt.pow(1.05).pow(Decimal.pow(3, getLevelableTier(this.layer, this.id))).mul(0.2).add(1), // Galaxy Dust
                ]
            },
            sellValue() { return new Decimal(15)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(1500) && player.ca.unlockedCante },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(2).add(1).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#45BDD7" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        109: {
            image() { return this.canClick() ? "resources/Pets/smokeCommonPet.png" : "resources/secret.png"},
            title() { return "Smoke" },
            lore() { return "A burning world that once was. Reduced to nothingness and ash. Smoke from that world made its way over here. The new world." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to all mastery points.<br>" +
                    "x" + format(this.effect()[1]) + " to jinx score."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.pow(1.2).pow(Decimal.pow(3.5, getLevelableTier(this.layer, this.id))).mul(0.7).add(1), // All Mastery Points
                    amt.pow(0.9).mul(0.03).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Jinx Score
                ]
            },
            sellValue() { return new Decimal(15)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(1500) && player.ca.unlockedCante },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(2).add(1).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#45BDD7" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        // UNCOMMON PETS
        201: {
            image() { return this.canClick() ? "resources/Pets/testeUncommonPet.png" : "resources/secret.png"},
            title() { return "Teste" },
            lore() { return "A cat that likes committing murder on walls." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to code experience.<br>" +
                    "x" + format(this.effect()[1]) + " to grasshoppers.<br>" +
                    "x" + format(this.effect()[2]) + " to fertilizer."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.pow(1.2).pow(Decimal.pow(3, getLevelableTier(this.layer, this.id))).div(2).add(1), // Code Experience
                    amt.pow(1.25).pow(Decimal.pow(3.5, getLevelableTier(this.layer, this.id))).div(1.5).add(1), // Grasshoppers
                    amt.pow(1.27).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))).add(1), // Fertlizer
                ]
            },
            sellValue() { return new Decimal(12.5)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.add(1).pow(1.1).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#008300" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        202: {
            image() { return this.canClick() ? "resources/Pets/starUncommonPet.png" : "resources/secret.png"},
            title() { return "Star" },
            lore() { return "One of the many stars from the night sky. A burning ball of gas." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to lines of code.<br>" +
                    "x" + format(this.effect()[1]) + " to leaves.<br>" +
                    "/" + format(this.effect()[2]) + " to xp and crate button cooldowns."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40)).add(levelableEffect("pet", 1202)[0])
                if ((player.points.lt(1e100) && !hasMilestone("ip", 24)) || inChallenge("ip", 13)) amt = amt.sub(1)
                return [
                    amt.pow(1.3).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))).div(1.6).add(1), // Lines of Code
                    amt.pow(1.6).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))).div(1.3).add(1), // Leaves
                    amt.mul(0.01).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Check Back XP and Crate Button Cooldowns
                ]
            },
            sellValue() { return new Decimal(12.5)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.add(1).pow(1.1).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#008300" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        203: {
            image() { return this.canClick() ? "resources/Pets/normalFaceUncommonPet.png" : "resources/secret.png"},
            title() { return "Normal Face" },
            lore() { return "Originated from a vast land of blocks and spikes. A victim of lobotomy." }, 
            description() {
                return "/" + format(this.effect()[0]) + " to tree requirement.<br>" +
                    "/" + format(this.effect()[1]) + " to mod requirement.<br>" +
                    "/" + format(this.effect()[2]) + " to check back level requirement."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.pow(1.7).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))).add(1), // Tree Requirement
                    amt.pow(1.4).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))).add(1), // Mod Requirement
                    amt.mul(0.02).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Check Back Level Requirement
                ]
            },
            sellValue() { return new Decimal(12.5)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.add(1).pow(1.1).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#008300" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        204: {
            image() { return this.canClick() ? "resources/Pets/sharkUncommonPet.png" : "resources/secret.png"},
            title() { return "Shark" },
            lore() { return "A shark that was once swimming in an infinite sea found itself trapped in this universe." }, 
            description() {
                return "/" + format(this.effect()[0]) + " to rank requirement.<br>" +
                    "/" + format(this.effect()[1]) + " to tier requirement.<br>" +
                    "/" + format(this.effect()[2]) + " to tetr requirement."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40)).add(levelableEffect("pet", 1204)[0])
                if ((player.points.lt(1e100) && !hasMilestone("ip", 24)) || inChallenge("ip", 13)) amt = amt.sub(1)
                return [
                    amt.pow(2).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))).mul(5).add(1), // Rank Requirement
                    amt.pow(1.87).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))).mul(3).add(1), // Tier Requirement
                    amt.pow(1.75).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))).mul(2).add(1), // Tetr Requirement
                ]
            },
            sellValue() { return new Decimal(12.5)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.add(1).pow(1.1).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#008300" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        205: {
            image() { return this.canClick() ? "resources/Pets/eyeUncommonPet.png" : "resources/secret.png"},
            title() { return "THE WATCHING EYE" },
            lore() { return "It's always watching." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to check back xp."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(0.05).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Check Back XP
                ]
            },
            sellValue() { return new Decimal(12.5)},
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.add(1).pow(1.1).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#008300" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        206: {
            image() { return this.canClick() ? "resources/Pets/clockUncommonPet.png" : "resources/secret.png"},
            title() { return "Clock" },
            lore() { return "This clock is the symbol of check back. Must be one patient fellow. You can feel the presence of evolution shards..." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to 1st dimensions.<br>" +
                    "x" + format(this.effect()[1]) + " to 3rd dimensions.<br>" +
                    "x" + format(this.effect()[2]) + " to 5th dimensions."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.pow(Decimal.pow(5, getLevelableTier(this.layer, this.id))).mul(0.2).add(1), // 1st Dimensions
                    amt.pow(Decimal.pow(5, getLevelableTier(this.layer, this.id))).mul(0.2).add(1), // 3rd Dimensions
                    amt.pow(Decimal.pow(5, getLevelableTier(this.layer, this.id))).mul(0.2).add(1), // 5th Dimensions
                ]
            },
            sellValue() { return new Decimal(25)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(125) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(1.5).add(1).pow(1.1).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#008300" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        207: {
            image() { return this.canClick() ? "resources/Pets/trollUncommonPet.png" : "resources/secret.png"},
            title() { return "Trollface" },
            lore() { return "You can NOT trust this guy no matter what. Also please do not evolve it either." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to 2nd dimensions.<br>" +
                    "x" + format(this.effect()[1]) + " to 4th dimensions.<br>" +
                    "x" + format(this.effect()[2]) + " to 6th dimensions."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.pow(Decimal.pow(5, getLevelableTier(this.layer, this.id))).mul(0.2).add(1), // 2nd Dimensions
                    amt.pow(Decimal.pow(5, getLevelableTier(this.layer, this.id))).mul(0.2).add(1), // 4th Dimensions
                    amt.pow(Decimal.pow(5, getLevelableTier(this.layer, this.id))).mul(0.2).add(1), // 6th Dimensions
                ]
            },
            sellValue() { return new Decimal(25)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(125) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(1.5).add(1).pow(1.1).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#008300" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        208: {
            image() { return this.canClick() ? "resources/Pets/infinityBreakerUncommonPet.png" : "resources/secret.png"},
            title() { return "Infinity Breaker" },
            lore() { return "This pet has been breaking your infinities all along. It is made of an unknown metal. It seems familiar." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to infinity dimensions.<br>" +
                    "x" + format(this.effect()[1]) + " to negative infinity points.<br>" +
                    "x" + format(this.effect()[2]) + " to T1 alternate infinities."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.pow(1.25).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))).mul(0.7).add(1), // Infinity Dimensions
                    amt.pow(1.8).pow(Decimal.pow(3, getLevelableTier(this.layer, this.id))).mul(3).add(1), // Negative Infinity Points
                    amt.div(10).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // T1 Alternate Infinities
                ]
            },
            sellValue() { return new Decimal(37.5)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(1500) && player.ca.unlockedCante },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(2).add(1).pow(1.1).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#008300" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        209: {
            image() { return this.canClick() ? "resources/Pets/johnUncommonPet.png" : "resources/secret.png"},
            title() { return "John" },
            lore() { return "Just a cartoon doodle dude that got transported here for literally no reason." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to dimension power.<br>" +
                    "x" + format(this.effect()[1]) + " to matter.<br>" +
                    "x" + format(this.effect()[2]) + " to time cubes."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.pow(1.3).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))).mul(0.4).add(1), // Dimension Power
                    amt.div(5).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Matter
                    amt.pow(1.2).pow(Decimal.pow(3, getLevelableTier(this.layer, this.id))).add(1), // Time Cubes
                ]
            },
            sellValue() { return new Decimal(37.5)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(1500) && player.ca.unlockedCante },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(2).add(1).pow(1.1).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#008300" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        // RARE PETS
        301: {
            image() { return this.canClick() ? "resources/Pets/novaRarePet.png" : "resources/secret.png"},
            title() { return "Nova" },
            lore() { return "A clown from the domain of singularity. Likes playing pranks and causing havoc. Only here to watch what you are doing." }, 
            description() {
                return "^" + format(this.effect()[0], 3) + " to fertilizer <small>(based on grass magnitude)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to check back xp <small>(based on level magnitude)</small>."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.pow(0.5).mul(0.0035).mul(player.g.grass.add(10).log(10).log(10).add(1)).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Fertilizer (Based on Grass Magnitude^2)
                    amt.div(8).mul(player.cb.level.add(2).log(2).log(2).add(1)).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1) // Check Back XP (Based on Level Magnitude)
                ]
            },
            sellValue() { return new Decimal(100)},
            // PET POINT CODE
            pointValue() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return new Decimal(0.5).mul(player.pet.petPointMult).mul(amt.div(2).add(1)).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id)))
            },
            pointCooldown() { return new Decimal(40).div(player.pet.petCooldownDiv).mul(Decimal.pow(1.5, getLevelableTier(this.layer, this.id)))},
            canteBase() { return new Decimal(0.12)},
            pointTooltip() { return "" },
            pointClick() {
                return this.pointValue()
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(25) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.add(1).pow(1.2).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0031BF" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        302: {
            image() { return this.canClick() ? "resources/Pets/diceRarePet.png" : "resources/secret.png"},
            title() { return "Dice" },
            lore() { return "One of Zar's creations. This pet will always output a random number between 1 and 6." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to dice points <small>(based on highest combo)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to dice score <small>(based on dice points)</small>."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40)).add(levelableEffect("pet", 1302)[0])
                if ((player.points.lt(1e100) && !hasMilestone("ip", 24)) || inChallenge("ip", 13)) amt = amt.sub(1)
                return [
                    amt.add(1).pow(player.pet.highestDicePetCombo.add(1)).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))), // Dice Points (Based on Highest Combo)
                    amt.mul(player.d.dicePoints.add(10).log(10).log(10).div(10)).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Dice Score (Based on Dice Points)
                ]
            },
            sellValue() { return new Decimal(100)},
            // PET POINT CODE
            pointValue() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                if ((player.points.lt(1e100) && !hasMilestone("ip", 24)) || inChallenge("ip", 13)) amt = amt.sub(1)
                return new Decimal(0.1).mul(player.pet.petPointMult).mul(amt.div(2).add(1)).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id)))
            },
            pointCooldown() { return new Decimal(20).div(player.pet.petCooldownDiv).mul(Decimal.pow(1.5, getLevelableTier(this.layer, this.id)))},
            canteBase() { return new Decimal(0.05)},
            pointTooltip() { return "<h5>Last roll: " + format(player.pet.dicePetPointsGain) + " PP<br>Last roll: " + player.pet.lastDicePetRoll + "<br>Current roll combo: " + player.pet.dicePetCombo + "<br>Highest roll combo: " + player.pet.highestDicePetCombo },
            pointClick() {
                player.pet.dicePetRoll = getRandomInt(6) + 1

                player.pet.dicePetPointsGain = this.pointValue().mul(player.pet.dicePetRoll)
    
                if (player.pet.lastDicePetRoll == player.pet.dicePetRoll) {
                    player.pet.dicePetCombo = player.pet.dicePetCombo.add(1)
                } else {
                    player.pet.dicePetCombo = new Decimal(0)
                }
                player.pet.lastDicePetRoll = player.pet.dicePetRoll

                return player.pet.dicePetPointsGain
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(25) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.add(1).pow(1.2).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0031BF" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        303: {
            image() { return this.canClick() ? "resources/Pets/ufoRarePet.png" : "resources/secret.png"},
            title() { return "Drippy Ufo" },
            lore() { return "An unknown flying object, but with style. Iridite's messenger. Be careful what you tell it." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to rocket fuel <small>(based on pet points)</small>.<br>" +
                    "/" + format(this.effect()[1]) + " to grass layer spawn times."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(player.cb.petPoints.add(2).log(2).log(2).div(6).add(1)).pow(2.2).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))), // Rocket Fuel (Based on Pet Points)
                    amt.mul(0.04).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Grass Layer Spawn Times
                ]
            },
            sellValue() { return new Decimal(100)},
            // PET POINT CODE
            pointValue() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return new Decimal(10).mul(player.pet.petPointMult).mul(amt.div(2).add(1)).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id)))
            },
            pointCooldown() { return new Decimal(900).div(player.pet.petCooldownDiv).mul(Decimal.pow(1.5, getLevelableTier(this.layer, this.id)))},
            canteBase() { return new Decimal(0.8)},
            pointTooltip() { return "" },
            pointClick() {
                return this.pointValue()
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(25) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.add(1).pow(1.2).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0031BF" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        304: {
            image() { return this.canClick() ? "resources/Pets/goofyAhhThingRarePet.png" : "resources/secret.png"},
            title() { return "Goofy Ahh Thing" },
            lore() { return "эта дурацкая ax-тварь — существо из неизвестной вселенной. Это может быть тайно небожитель." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to grasshoppers <small>(based on evo shards)</small>.<br>" +
                    "/" + format(this.effect()[1]) + " to check back level requirement."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                let shard = player.cb.evolutionShards.add(2).log(2).log(2).add(1)
                return [
                    amt.mul(shard.mul(2)).pow(shard.div(2)).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))).add(1), // Grasshoppers (Based on Evo Shards)
                    amt.mul(0.03).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1) // Level Requirement
                ]
            },
            sellValue() { return new Decimal(100)},
            // PET POINT CODE
            pointValue() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return new Decimal(90).mul(player.pet.petPointMult).mul(amt.add(1)).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id)))
            },
            pointCooldown() { return new Decimal(18000).div(player.pet.petCooldownDiv).mul(Decimal.pow(1.5, getLevelableTier(this.layer, this.id)))},
            canteBase() { return new Decimal(7)},
            pointTooltip() { return "25% chance for an evo shard." },
            pointClick() {
                let random = getRandomInt(4)
                if (random == 1) {
                    player.cb.evolutionShards = player.cb.evolutionShards.add(1);
                    if (inChallenge("ip", 17)) player.cb.IC7shardCount++
                    player.cb.pityEvoCurrent = new Decimal(0)
                    doPopup("none", "+1 Evolution Shard! (25%)", "Shard Obtained!", 5, "#d487fd", "resources/evoShard.png")
                } else {
                    player.cb.pityEvoCurrent = player.cb.pityEvoCurrent.add(25)
                }
                return this.pointValue()
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(75) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.add(1).pow(1.2).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0031BF" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }
        },
        305: {
            image() { return this.canClick() ? "resources/Pets/antimatterRarePet.png" : "resources/secret.png"},
            title() { return "Antimatter" },
            lore() { return "The one controlling your antimatter and makes sure it stays in safe quantities." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to antimatter dimensions <small>(based on infinities)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to golden grass."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(2).pow(player.in.infinities.add(2).log(2).log(2).add(1)).pow(1.6).pow(Decimal.pow(5, getLevelableTier(this.layer, this.id))).add(1), // Antimatter Dimensions (Based on Infinities)
                    amt.pow(1.1).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Golden Grass
                ]
            },
            sellValue() { return new Decimal(100)},
            // PET POINT CODE
            pointValue() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return new Decimal(2).mul(player.pet.petPointMult).mul(amt.div(2).add(1)).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id)))
            },
            pointCooldown() { return new Decimal(120).div(player.pet.petCooldownDiv).mul(Decimal.pow(1.5, getLevelableTier(this.layer, this.id)))},
            canteBase() { return new Decimal(0.3)},
            pointTooltip() { return "" },
            pointClick() {
                return this.pointValue()
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(125) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.add(1).pow(1.2).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0031BF" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        306: {
            image() { return this.canClick() ? "resources/Pets/hexShadowRarePet.png" : "resources/secret.png"},
            title() { return "Hex Shadow" },
            lore() { return "Found halfway to the top of the hex staircase. Unwilling to talk or give any information. Has a strange odor." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to dice points <small>(based on total hex power)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to rocket fuel <small>(based on total hex power)</small>."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(player.hpw.totalPower.add(2).log(2).log(2).add(1).pow(2)).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))).add(1), // Dice Points (Based on power)
                    amt.mul(player.hpw.totalPower.add(2).log(2).log(2).add(1).pow(3)).pow(Decimal.pow(4, getLevelableTier(this.layer, this.id))).add(1), // Rocket Fuel (Based on power)
                ]
            },
            sellValue() { return new Decimal(200)},
            // PET POINT CODE
            pointValue() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return new Decimal(18).mul(player.pet.petPointMult).mul(amt.div(2).add(1)).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id)))
            },
            pointCooldown() { return new Decimal(1500).div(player.pet.petCooldownDiv).mul(Decimal.pow(1.5, getLevelableTier(this.layer, this.id)))},
            canteBase() { return new Decimal(1)},
            pointTooltip() { return "2% chance for an paragon shard." },
            pointClick() {
                if (player.cb.highestLevel.gt(250)) {
                    let random = getRandomInt(50)
                    if (random == 1) {
                        player.cb.paragonShards = player.cb.paragonShards.add(1);
                        player.cb.pityParaCurrent = new Decimal(0);
                        doPopup("none", "+1 Paragon Shard! (2%)", "Shard Obtained!", 5, "#4c64ff", "resources/paragonShard.png")
                    } else {
                        player.cb.pityParaCurrent = player.cb.pityParaCurrent.add(2);
                    }
                }
                return this.pointValue()
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(1500) && player.ca.unlockedCante },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(1.5).add(1).pow(1.2).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0031BF" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        307: {
            image() { return this.canClick() ? "resources/Pets/grassSquareRarePet.png" : "resources/secret.png"},
            title() { return "Grass Square" },
            lore() { return "It was one ordinary of cutting grass, and one of the grass particles randomly grew a face. This is what we have now." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to pollinators <small>(based on golden grass)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to repli-grass <small>(based on golden grass)</small>."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(player.g.goldGrass.add(2).log(2).log(2).add(1)).pow(1.3).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Pollinators (Based on Golden Grass)
                    amt.mul(player.g.goldGrass.add(10).log(10).log(10).add(1)).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Repli-Grass (Based on Golden Grass)
                ]
            },
            sellValue() { return new Decimal(200)},
            // PET POINT CODE
            pointValue() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return new Decimal(0.2).mul(player.pet.petPointMult).mul(amt.div(5).add(1)).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id)))
            },
            pointCooldown() { return new Decimal(5).div(player.pet.petCooldownDiv).mul(Decimal.pow(1.5, getLevelableTier(this.layer, this.id)))},
            canteBase() { return new Decimal(0.002)},
            pointTooltip() { return "+" + formatWhole(getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40)).mul(100)) + "% of golden grass value on claim.<br>(You have " + format(player.g.goldGrass) + " golden grass)" },
            pointClick() {
                player.g.goldGrass = player.g.goldGrass.add(player.g.goldGrassVal.mul(getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))))
                return this.pointValue()
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(1500) && player.ca.unlockedCante },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(1.5).add(1).pow(1.2).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0031BF" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        308: {
            image() { return this.canClick() ? "resources/Pets/impossibleTriangleRarePet.png" : "resources/secret.png"},
            title() { return "Impossible Triangle" },
            lore() { return "An anomaly of a shape, but is only a mere illusion. Celestials love their illusions." }, 
            description() {
                return "^" + format(this.effect()[0], 3) + " to singularity points <small>(based on radiation)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to singularity dimensions <small>(based on singularity points)</small>."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.pow(0.5).mul(0.0065).mul(player.ra.radiation.add(10).log(10).log(10).add(1)).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Singularity Points (Based on Radiation)
                    amt.mul(player.s.singularityPoints.add(2).log(2).log(2).add(1)).pow(2.5).pow(Decimal.pow(3, getLevelableTier(this.layer, this.id))).add(1) // Singularity Dimenstions (Based on Singularity Points)
                ]
            },
            sellValue() { return new Decimal(300)},
            // PET POINT CODE
            pointValue() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return new Decimal(50).mul(player.pet.petPointMult).mul(amt.div(2).add(1)).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id)))
            },
            pointCooldown() { return new Decimal(4500).div(player.pet.petCooldownDiv).mul(Decimal.pow(1.5, getLevelableTier(this.layer, this.id)))},
            canteBase() { return new Decimal(0.3)},
            pointTooltip() { return "" },
            pointClick() {
                return this.pointValue()
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(2).add(1).pow(1.2).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0031BF" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }  
        },
        309: {
            image() { return this.canClick() ? "resources/Pets/forbiddenCoreRarePet.png" : "resources/secret.png"},
            title() { return "Forbidden Core" },
            lore() { return "The first core ever produced by the celestials of the domain of singularity. It has lived for so long it developed a conciousness." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to radiation <small>(based on singularities)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to core scraps <small>(based on starmetal alloys)</small>."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(player.s.singularities.add(2).log(2).log(2).add(1)).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Radiation (Based on Singularities)
                    amt.mul(player.sma.starmetalAlloy.add(2).log(2).log(2).add(1)).div(2).pow(Decimal.pow(1.5, getLevelableTier(this.layer, this.id))).add(1) // Core Scraps (Based on Starmetal Alloys)
                ]
            },
            sellValue() { return new Decimal(300)},
            // PET POINT CODE
            pointValue() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return new Decimal(100).mul(player.pet.petPointMult).mul(amt.div(2).add(1)).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id)))
            },
            pointCooldown() { return new Decimal(8000).div(player.pet.petCooldownDiv).mul(Decimal.pow(1.5, getLevelableTier(this.layer, this.id)))},
            canteBase() { return new Decimal(0.5)},
            pointTooltip() { return "" },
            pointClick() {
                return this.pointValue()
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.mul(2).add(1).pow(1.2).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0031BF" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }
        },
        // EPIC PETS
        401: {
            image() { return this.canClick() ? "resources/Pets/dotknightEpicPet.png" : "resources/secret.png"},
            title() { return "Dotknight" },
            lore() { return "A knight of unknown origin that wields the cursword, which is one of the most powerful swords. He is yet to awaken its true power." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to pet points <small>(based on XPBoost)</small>.<br>" +
                    "/" + format(this.effect()[1]) + " to pet point button cooldown <small>(based on evo shards)</small>.<br>" +
                    "/" + format(this.effect()[2]) + " to XPBoost button cooldown <small>(based on para shards)</small>."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(player.cb.XPBoost.add(2).log(2).log(2).add(1).div(150)).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Pet Points (Based on XPBoost)
                    amt.mul(player.cb.evolutionShards.add(2).log(2).log(2).add(1).div(35)).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Pet Point Button Cooldown (Based on Evolution Shards)
                    amt.mul(player.cb.paragonShards.add(2).log(2).log(2).add(1).div(30)).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // XPBoost Button Cooldown (Based on Paragon Shards)
                ]
            },
            sellValue() { return new Decimal(250)},
            shopLayer() { return "ep0" },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(1500) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                if (amt.eq(0)) {
                    return new Decimal(25)
                } else {
                    return amt.add(1).mul(3).pow(1.3).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
                }
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6600A6" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        402: {
            image() { return this.canClick() ? "resources/Pets/dragonEpicPet.png" : "resources/secret.png"},
            title() { return "Dragon" },
            lore() { return "This dragon is heavily associated with the number 12. Seems oddly familiar. You might've seen this dragon in a dream before." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to replicanti point mult <small>(based on grass-skip)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to anonymity <small>(based on galaxy dust)</small>.<br>" +
                    "x" + format(this.effect()[2]) + " to repli-leaf mult <small>(based on repli-trees)</small>."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(player.gs.grassSkip.add(1).log(2).add(1)).pow(3).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Replicanti Point Multiplier (Based on Grass-Skip)
                    amt.pow(3).mul(player.ca.galaxyDust.add(2).log(2).log(2).add(1)).pow(3).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Anonymity (Based on Galaxy Dust)
                    amt.pow(3).mul(player.rt.repliTrees.add(2).log(2).log(2).add(1).pow(3)).pow(3.5).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Repli-Leaf Multiplier (Based on Repli-Trees)
                ]
            },
            sellValue() { return new Decimal(250)},
            shopLayer() { return "ep1" },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(1500) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                if (amt.eq(0)) {
                    return new Decimal(25)
                } else {
                    return amt.add(1).mul(3).pow(1.3).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
                }
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6600A6" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        403: {
            image() { return this.canClick() ? "resources/Pets/cookieEpicPet.png" : "resources/secret.png"},
            title() { return "Cookie" },
            lore() { return "This cookie is imbued with large amounts of incremental power. Clicking it would be very dangerous." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to cante energy <small>(based on cante cores)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to infinity points <small>(based on cante cores)</small>.<br>" +
                    "x" + format(this.effect()[2]) + " to proto memories <small>(based on XPBoost)</small>."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(player.ca.canteCores.add(2).log(2).log(2).add(1)).div(5).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Cante Energy (Based on Cante Cores)
                    amt.pow(2.5).mul(player.ca.canteCores.add(2).log(2).log(2).add(1)).pow(3.5).pow(Decimal.pow(3, getLevelableTier(this.layer, this.id))).add(1), // Infinity Points (Based on Cante Cores)
                    amt.mul(player.cb.XPBoost.add(2).log(2).log(2).add(1).pow(2.25)).pow(2.5).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Proto Memories (Based on XPBoost)
                ]
            },
            sellValue() { return new Decimal(250)},
            shopLayer() { return "ep2" },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(1500) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                if (amt.eq(0)) {
                    return new Decimal(25)
                } else {
                    return amt.add(1).mul(3).pow(1.3).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
                }
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6600A6" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        404: {
            image() { return this.canClick() ? "resources/Pets/kresEpicPet.png" : "resources/secret.png"},
            title() { return "Kres" },
            lore() { return "<small>Kres a member of the Celestial Hunting Corporation, and was sent out on the mission to the domain of singularity. Originally in the military from one universe's Earth, he joined the corporation when his universe got taken over by celestials.</small>" }, 
            description() {
                return "^" + format(this.effect()[0], 3) + " to infinity points <small>(based on check back level)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to singularity points <small>(based on check back level)</small>.<br>" +
                    "x" + format(this.effect()[2]) + " to starmetal alloy <small>(based on check back level)</small>."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(player.cb.level.add(2).log(2).log(2).add(1)).div(3000).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Infinity Points (Based on Check Back Level)
                    amt.pow(2).mul(player.cb.level.add(2).log(2).log(2).add(1)).pow(2.4).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Singularity Points (Based on Check Back Level)
                    amt.mul(player.cb.level.add(2).log(2).log(2).add(1)).div(20).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Starmetal Alloy (Based on Check Back Level)
                ]
            },
            sellValue() { return new Decimal(500)},
            shopLayer() { return "ep3" },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23) },
            canClick() { return player.pet.singularityFragments.gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.pet.singularityFragments = player.pet.singularityFragments.sub(amt) },
            canAfford() { return player.pet.singularityFragments.gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                if (amt.eq(0)) {
                    return new Decimal(40)
                } else {
                    return amt.add(1).mul(4).pow(1.3).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
                }
            },
            currency() { return player.pet.singularityFragments },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6600A6" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        405: {
            image() { return this.canClick() ? "resources/Pets/navEpicPet.png" : "resources/secret.png"},
            title() { return "Nav" },
            lore() { return "Nav, another member of the corporation, has mastered the art of superphysical magic. She was born from a line of talented superphysical wizards that worked for the corporation." }, 
            description() {
                return "^" + format(this.effect()[0], 3) + " to anonymity <small>(based on radiation)</small>.<br>" +
                    "^" + format(this.effect()[1], 3) + " to oil <small>(based on radiation)</small>.<br>" +
                    "^" + format(this.effect()[2], 3) + " to fun <small>(based on radiation)</small>."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(player.ra.radiation.add(2).log(2).log(2).add(1)).div(300).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Anonymity (Based on Radiation)
                    amt.mul(player.ra.radiation.add(2).log(2).log(2).add(1)).div(300).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Oil (Based on Radiation)
                    amt.mul(player.ra.radiation.add(2).log(2).log(2).add(1)).div(220).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Fun (Based on Radiation)
                ]
            },
            sellValue() { return new Decimal(500)},
            shopLayer() { return "ep4" },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23) },
            canClick() { return player.pet.singularityFragments.gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.pet.singularityFragments = player.pet.singularityFragments.sub(amt) },
            canAfford() { return player.pet.singularityFragments.gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                if (amt.eq(0)) {
                    return new Decimal(40)
                } else {
                    return amt.add(1).mul(4).pow(1.3).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
                }
            },
            currency() { return player.pet.singularityFragments },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6600A6" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        406: {
            image() { return this.canClick() ? "resources/Pets/selEpicPet.png" : "resources/secret.png"},
            title() { return "Sel" },
            lore() { return "Sel was originally a rouge hunter travelling between civilizations, fighting celestialites for money. However, he met Kres and realized the greater opportunity of joining the corporation." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to check back xp <small>(based on starmetal alloy)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to XPBoost <small>(based on starmetal alloy)</small>.<br>" +
                    "x" + format(this.effect()[2]) + " to pet points <small>(based on starmetal alloy)</small>."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.mul(player.sma.starmetalAlloy.add(2).log(2).log(2).add(1)).div(10).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // Check Back XP (Based on Starmetal Alloy)
                    amt.mul(player.sma.starmetalAlloy.add(2).log(2).log(2).add(1)).div(20).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // XPBoost (Based on Starmetal Alloy)
                    amt.mul(player.sma.starmetalAlloy.add(2).log(2).log(2).add(1)).div(30).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1) // Pet Points (Based on Starmetal Alloy)
                ]
            },
            sellValue() { return new Decimal(500)},
            shopLayer() { return "ep5" },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23) },
            canClick() { return player.pet.singularityFragments.gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.pet.singularityFragments = player.pet.singularityFragments.sub(amt) },
            canAfford() { return player.pet.singularityFragments.gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                if (amt.eq(0)) {
                    return new Decimal(40)
                } else {
                    return amt.add(1).mul(4).pow(1.3).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
                }
            },
            currency() { return player.pet.singularityFragments },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#6600A6" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        //legendary
        501: {
            image() { return this.canClick() ? "resources/Pets/eclipseLegendaryPet.png" : "resources/secret.png"},
            title() { return "Eclipse" },
            lore() { return "<h5>The true story of eclipse is extremely mysterious and shrouded in secrecy. Kres, Nav, and Sel only found him during their first encounter with Matos. Eclipse doesn't speak. They only listen. But Eclipse is an extremely powerful being, that helps the trio during their ventures." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to stars <small>(based on stars)</small>.<br>" +
                    "x" + format(this.effect()[1]) + " to activated fuel <small>(based on stars)</small>.<br>" +
                    "x" + format(this.effect()[2]) + " to rocket parts <small>(based on stars)</small>."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    player.au2.stars.pow(0.04).add(1).pow(amt.pow(0.15)).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // stars (Based on Stars)
                    player.au2.stars.pow(0.15).div(2).add(1).pow(amt.pow(0.15)).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // fuel (Based on Stars)
                    player.au2.stars.pow(0.1).div(2).add(1).pow(amt.pow(0.15)).pow(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // rocket parts (Based on Stars)
                ]
            },
            sellValue() { return new Decimal(10000)},
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(100000) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0) || getLevelableTier(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.add(1).pow(1.4).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#eed200" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        502: {
            image() { return this.canClick() ? "resources/Pets/geroaLegendaryPet.png" : "resources/secret.png"},
            title() { return "Geroa" },
            lore() { return "<h6>Once a normal alien being from an unknown universe, Geroa lived a peaceful life until Iridite visited her planet. Iridite caused mass destruction, all in the name of her crazy scientific experimentation. Geroa was considered a valuable test subject by Iridite, and was granted with a fraction of celestial powers. Geroa is currently under the servitude of Iridite, but wants freedom and escape." }, 
            description() {
                return "/" + format(this.effect()[0]) + " to star exploration time.<br>" +
                    "x" + format(this.effect()[1]) + " to starmetal essence <small>(based on starmetal alloy)</small>.<br>" +
                    "x" + format(this.effect()[2]) + " to space rocks."
            },
            levelLimit() { return getLevelableTier(this.layer, this.id).mul(5).add(10).min(50) },
            effect() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(5).min(40))
                return [
                    amt.pow(0.75).mul(0.1).add(1).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // star exploration time
                    amt.mul(player.sma.starmetalAlloy.add(2).log(2).log(2).div(5).add(1)).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))).add(1), // starmetal essence (Based on starmetal alloy)
                    amt.pow(0.75).mul(0.5).add(1).mul(Decimal.pow(2, getLevelableTier(this.layer, this.id))), // space rocks
                ]
            },
            sellValue() { return new Decimal(10000)},
            // CLICK CODE
            unlocked() { return hasUpgrade("ir", 16) },
            canClick() { return getLevelableXP(this.layer, this.id).gt(0) || getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { setLevelableXP(this.layer, this.id, getLevelableXP(this.layer, this.id).sub(amt)) },
            canAfford() { return getLevelableXP(this.layer, this.id).gte(this.xpReq()) },
            xpReq() {
                let amt = getLevelableAmount(this.layer, this.id).add(getLevelableTier(this.layer, this.id).mul(2).min(16))
                return amt.add(1).pow(1.4).pow(Decimal.pow(1.4, getLevelableTier(this.layer, this.id))).floor()
            },
            currency() { return getLevelableXP(this.layer, this.id) },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barStyle() { return {backgroundColor: "#0B6623"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#eed200" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        // START OF EVOLVED PETS
        1101: {
            image() { return this.canClick() ? "resources/Pets/voidGwaEvoPet.png" : "resources/secret.png"},
            title() { return "Voidgwa" },
            lore() { return "Seems to be like gwa, but its appearance is inverted. It has a strange force that prevents you from getting near it." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to infinities.<br>" +
                    "x" + format(this.effect()[1]) + " to infinitum.<br>" +
                    "x" + format(this.effect()[2]) + " to all alternate infinities.<br>"
            },
            levelLimit() { return new Decimal(10) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).div(2).add(1), // Infinities
                    getLevelableAmount(this.layer, this.id).div(2).add(1), // Infinitums
                    getLevelableAmount(this.layer, this.id).div(10).add(1), // Alternate Infinities
                ]
            },
            levelTooltip() { return "Costs Evo Shards." },
            // CLICK CODE
            unlocked() { return player.in.unlockedBreak || player.s.highestSingularityPoints.gt(0) },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.evolutionShards = player.cb.evolutionShards.sub(amt) },
            canAfford() { return player.cb.evolutionShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(0.75).add(6).floor() },
            currency() { return player.cb.evolutionShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#d487fd"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#000000" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1102: {
            image() { return this.canClick() ? "resources/Pets/eggEvoPet.png" : "resources/secret.png"},
            title() { return "Cracked Man" },
            lore() { return "He has managed to prevent the chicken from hatching ... for now." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to XP button gain.<br>" +
                    "x" + format(this.effect()[1]) + " to XP button ESC.<br>" +
                    "x" + format(this.effect()[2]) + " to XP button cooldown." // Yes, it multiplies it
            },
            levelLimit() { return new Decimal(10) },
            effect() {
                return [
                    Decimal.pow(1.4, getLevelableAmount(this.layer, this.id)), // XP Button Gain
                    Decimal.pow(1.35, getLevelableAmount(this.layer, this.id)), // XP Button ESC
                    Decimal.pow(1.4, getLevelableAmount(this.layer, this.id)), // XP Button Cooldown
                ]
            },
            levelTooltip() { return "Costs Evo Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "ev1"
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(100000) && player.ma.matosDefeated },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.evolutionShards = player.cb.evolutionShards.sub(amt) },
            canAfford() { return player.cb.evolutionShards.gte(this.xpReq()) },
            xpReq() { return Decimal.pow(2, getLevelableAmount(this.layer, this.id).add(4)).floor() },
            currency() { return player.cb.evolutionShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#d487fd"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.background = "#136D15" : look.background = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1103: {
            image() { return this.canClick() ? "resources/Pets/goldsmithEvoPet.png" : "resources/secret.png"},
            title() { return "Goldsmith" },
            lore() { return "This purest form of SPV condensed into a golden, metallic material. Shines too bright you can barely see." }, 
            description() {
                return "+" + format(this.effect()[0]) + " effective unsmith levels.<br>" +
                    "+" + format(this.effect()[1]) + " base coin dust gain per hour.<br>"
            },
            levelLimit() { return new Decimal(10) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id), // Effective Unsmith Levels
                    getLevelableAmount(this.layer, this.id).pow(1.15), // Base Coin Dust Gain Per Hour
                ]
            },
            levelTooltip() { return "Costs Evo Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "ev0"
            },
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.evolutionShards = player.cb.evolutionShards.sub(amt) },
            canAfford() { return player.cb.evolutionShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).add(2).floor() },
            currency() { return player.cb.evolutionShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#d487fd"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.background = "linear-gradient(135deg, #AB791E, #FAF3B7)" : look.background = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1104: {
            image() { return this.canClick() ? "resources/Pets/paragonCheckpointEvoPet.png" : "resources/secret.png"},
            title() { return "Paragon Checkpoint" },
            lore() { return "Infused with the power of paragon shards, all sense of familiarity fades away. This being gives you a vague idea of where these shards came from, but you can't figure it out." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to moonstone value.<br>" +
                    "x" + format(this.effect()[1]) + " to singularity point gain.<br>" +
                    "/" + format(this.effect()[2]) + " to crate button timer."
            },
            levelLimit() { return new Decimal(10) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(0.4).add(1), // Moonstone Value
                    getLevelableAmount(this.layer, this.id).mul(2).pow(1.5).add(1), // Singularity Point Gain
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), // Pet Button Timer
                ]
            },
            levelTooltip() { return "Costs Evo Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "ev2"
            },
            // CLICK CODE
            unlocked() { return hasMilestone("s", 12) },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.evolutionShards = player.cb.evolutionShards.sub(amt) },
            canAfford() { return player.cb.evolutionShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.15).add(9).floor() },
            currency() { return player.cb.evolutionShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#d487fd"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#2CA400" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1106: {
            image() { return this.canClick() ? "resources/Pets/mutantSpiderEvoPet.png" : "resources/secret.png"},
            title() { return "Mutant Spider" },
            lore() { return "The poor spider ate too many paragon shards and this is what it looks like now." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to pre-power resources.<br>" +
                    "x" + format(this.effect()[1]) + " to hex power.<br>" +
                    "x" + format(this.effect()[2]) + " to realm essence."
            },
            levelLimit() { return new Decimal(10) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(6).max(1), // Pre-Power Resources
                    getLevelableAmount(this.layer, this.id).mul(2).max(1), // Hex Power
                    getLevelableAmount(this.layer, this.id).mul(0.5).add(1), // Realm Essence
                ]
            },
            levelTooltip() { return "Costs Paragon Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "po"
                player.subtabs["po"]["stuff"] = "Halter"
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23) },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.paragonShards = player.cb.paragonShards.sub(amt) },
            canAfford() { return player.cb.paragonShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(0.6).add(3).floor() },
            currency() { return player.cb.paragonShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#4C64FF"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#0C0047" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1107: {
            image() { return this.canClick() ? "resources/Pets/blobEvoPet.png" : "resources/secret.png"},
            title() { return "Blob<sup>2</sup>" },
            lore() { return "Blob!" }, 
            description() {
                return "+" + formatWhole(this.effect()[0]) + " to effective blob levels.<br>" +
                    "+" + formatSimple(this.effect()[1], 1) + " to XP button ESC multiplier."
            },
            levelLimit() { return new Decimal(10) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id), // Effective Blob Levels
                    getLevelableAmount(this.layer, this.id).div(20), // XP Button Shard Chance
                ]
            },
            levelTooltip() { return "Costs Evolution Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "ev1"
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gte(25000) && hasUpgrade("s", 23) },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.evolutionShards = player.cb.evolutionShards.sub(amt) },
            canAfford() { return player.cb.evolutionShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.5).mul(5).floor() },
            currency() { return player.cb.evolutionShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#d487fd"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#2F2F2F" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1202: {
            image() { return this.canClick() ? "resources/Pets/sunEvoPet.png" : "resources/secret.png"},
            title() { return "Sun" },
            lore() { return "Nothing changed at all about this star. It just got a bit closer." }, 
            description() {
                return "+" + format(this.effect()[0]) + " to effective star levels.<br>" +
                    "x" + format(this.effect()[1]) + " to rocket fuel.<br>"
            },
            levelLimit() { return new Decimal(10) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id), // Effective Star Levels
                    getLevelableAmount(this.layer, this.id).mul(2).pow(1.4).add(1), // Rocket Fuel
                ]
            },
            levelTooltip() { return "Costs Paragon Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "ev1"
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gt(250) },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.paragonShards = player.cb.paragonShards.sub(amt) },
            canAfford() { return player.cb.paragonShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(0.4).add(1).floor() },
            currency() { return player.cb.paragonShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#4C64FF"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#FF3000" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1203: {
            image() { return this.canClick() ? "resources/Pets/insaneFaceEvoPet.png" : "resources/secret.png"},
            title() { return "Insane Face" },
            lore() { return "The lobotomy got to it. The face is no longer normal. It is angry. It wants revenge." }, 
            description() {
                return "/" + format(this.effect()[0]) + " to pet point button cooldown.<br>" +
                    "x" + format(this.effect()[1]) + " to XPBoost.<br>"
            },
            levelLimit() { return new Decimal(10) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(0.02).add(1), // Pet Point Button Cooldown
                    getLevelableAmount(this.layer, this.id).mul(0.03).add(1), // XPBoost
                ]
            },
            levelTooltip() { return "Costs Evo Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "ev2"
            },
            // CLICK CODE
            unlocked() { return player.in.unlockedInfinity || player.s.highestSingularityPoints.gt(0) },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.evolutionShards = player.cb.evolutionShards.sub(amt) },
            canAfford() { return player.cb.evolutionShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(0.7).add(4).floor() },
            currency() { return player.cb.evolutionShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#d487fd"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#00188F" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1204: {
            image() { return this.canClick() ? "resources/Pets/mrRedSharkEvoPet.png" : "resources/secret.png"},
            title() { return "MrRedShark" },
            lore() { return "An evolved version of the shark. Pushes a lot of mass around. A master of the elements. Very muscular." }, 
            description() {
                return "+" + format(this.effect()[0]) + " to effective shark levels.<br>" +
                    "x" + format(this.effect()[1]) + " to pet points.<br>"
            },
            levelLimit() { return new Decimal(10) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id), // Effective Shark Levels
                    getLevelableAmount(this.layer, this.id).mul(0.03).add(1), // Pet Points
                ]
            },
            levelTooltip() { return "Costs Evo Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "ev1"
            },
            // CLICK CODE
            unlocked() { return true },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.evolutionShards = player.cb.evolutionShards.sub(amt) },
            canAfford() { return player.cb.evolutionShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(0.8).add(3).floor() },
            currency() { return player.cb.evolutionShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#d487fd"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#730001" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1205: {
            image() { return this.canClick() ? "resources/Pets/eyeEvoPet.png" : "resources/secret.png"},
            title() { return "EYE" },
            lore() { return "Don't look at it." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to radiation.<br>" +
                    "x" + format(this.effect()[1]) + " to fun.<br>" +
                    "x" + format(this.effect()[2]) + " to crate roll chance."
            },
            levelLimit() { return new Decimal(10) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).pow(0.5).add(1), // Radiation
                    getLevelableAmount(this.layer, this.id).mul(5).pow(1.65).add(1), // Fun
                    getLevelableAmount(this.layer, this.id).mul(0.05).add(1), // Crate Roll Chance
                ]
            },
            levelTooltip() { return "Costs Paragon Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "ev2"
            },
            // CLICK CODE
            unlocked() { return hasMilestone("s", 12) },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.paragonShards = player.cb.paragonShards.sub(amt) },
            canAfford() { return player.cb.paragonShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(0.5).add(2).floor() },
            currency() { return player.cb.paragonShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#4C64FF"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#3F3F3F" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1206: {
            image() { return this.canClick() ? "resources/Pets/marcelAcoplaoEvoPet.png" : "resources/secret.png"},
            title() { return "Marcel Acoplao" },
            lore() { return "The creator of check back. The man responsible for your duty of having to click. wait. click.. wait.. click.... wait......." }, 
            description() {
                return "x" + format(this.effect()[0]) + " to anonymity.<br>" +
                    "x" + format(this.effect()[1]) + " to oil.<br>"
            },
            levelLimit() { return new Decimal(10) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id).mul(10).pow(2).add(1), // Anonymity
                    getLevelableAmount(this.layer, this.id).mul(2).pow(1.4).add(1), // Oil
                ]
            },
            levelTooltip() { return "Costs Evo Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "ev8"
            },
            // CLICK CODE
            unlocked() { return hasUpgrade("bi", 24) || player.s.highestSingularityPoints.gt(0) },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.evolutionShards = player.cb.evolutionShards.sub(amt) },
            canAfford() { return player.cb.evolutionShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.1).add(5).floor() },
            currency() { return player.cb.evolutionShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#d487fd"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.background = "linear-gradient(135deg, #432D4A, #07060B)" : look.background = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1302: {
            image() { return this.canClick() ? "resources/Pets/d20EvoPet.png" : "resources/secret.png"},
            title() { return "d20" },
            lore() { return "The gamblingness has turned up a notch. You either get a large number like 20 or a puny small number like 1." }, 
            description() {
                return "+" + format(this.effect()[0]) + " to effective dice levels.<br>" +
                    "x" + format(this.effect()[1]) + " to challenge dice points.<br>"
            },
            levelLimit() { return new Decimal(10) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id), // Effective Dice Levels
                    getLevelableAmount(this.layer, this.id).mul(2).pow(1.2).add(1), // Challenge Dice Points
                ]
            },
            levelTooltip() { return "Costs Paragon Shards." },
            evoCan() { return player.po.dice },
            evoTooltip() { return "The current OTF has to be dice."},
            evoClick() {
                player.tab = "d"
                player.subtabs["d"]['stuff'] = 'Challenge Dice'
            },
            // CLICK CODE
            unlocked() { return player.cb.highestLevel.gt(250) },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.paragonShards = player.cb.paragonShards.sub(amt) },
            canAfford() { return player.cb.paragonShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(0.4).add(1).floor() },
            currency() { return player.cb.paragonShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#4C64FF"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#005C34" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        1303: {
            image() { return this.canClick() ? "resources/Pets/moonEvoPet.png" : "resources/secret.png"},
            title() { return "Moon" },
            lore() { return "Iridite's messenger turned out to be something much larger. A whole moon. Who knows, maybe a whole civilization is hiding underneath the surface." }, 
            description() {
                return "+" + format(this.effect()[0]) + " moonstone mult capacity.<br>" +
                    "x" + format(this.effect()[1]) + " to golden grass.<br>"
            },
            levelLimit() { return new Decimal(10) },
            effect() { 
                return [
                    getLevelableAmount(this.layer, this.id), // Moonstone Mult Capacity
                    getLevelableAmount(this.layer, this.id).mul(5).pow(1.75).add(1), // Golden Grass
                ]
            },
            levelTooltip() { return "Costs Paragon Shards." },
            evoCan() { return true },
            evoTooltip() { return ""},
            evoClick() {
                player.tab = "g"
                player.subtabs["g"]['stuff'] = 'Moonstone'
            },
            // CLICK CODE
            unlocked() { return hasUpgrade("bi", 24) || player.s.highestSingularityPoints.gt(0) },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.cb.paragonShards = player.cb.paragonShards.sub(amt) },
            canAfford() { return player.cb.paragonShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(0.35).floor() },
            currency() { return player.cb.paragonShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#4C64FF"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#666666" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            } 
        },
        2001: {
            image() { return this.canClick() ? "resources/Pets/cookie/simpleCookieEvo.png" : "resources/secret.png"},
            title() { return "Simple Cookie" },
            lore() { return "Perhaps going back to basics might help you learn more about these cookies." }, 
            description() {
                return "Unlock pet buildings.<br>" +
                    "Cookie clicking gains +" + formatWhole(this.effect()[0].mul(100)) + "% of your CPS.<br>"
            },
            levelLimit() { return new Decimal(10) },
            effect() {
                return [getLevelableAmount(this.layer, this.id).div(100), new Decimal(1)]
            },
            levelTooltip() { return "Costs Chocolate Shards." },
            evoCan() { return true },
            // CLICK CODE
            unlocked() { return player.ep2.obtainedShards },
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.ep2.chocoShards = player.ep2.chocoShards.sub(amt) },
            canAfford() { return player.ep2.chocoShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.2).floor() },
            currency() { return player.ep2.chocoShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#86562E"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#16364a" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }
        },
        2002: {
            image() { return this.canClick() ? "resources/Pets/cookie/goldenCookieEvo.png" : "resources/secret.png"},
            title() { return "Golden Cookie" },
            lore() { return "These shiny cookies seem to make a strange shard, more research is needed." }, 
            description() {
                return "Unlock golden cookie upgrades.<br>" +
                    "Cookie clicking now fills a golden click bar.<br>" + 
                    "Golden click bar scaling is x" + formatSimple(this.effect()[0], 1) + " slower."
            },
            levelLimit() { return new Decimal(10) },
            effect() {
                return [Decimal.pow(1.2, getLevelableAmount(this.layer, this.id).sub(1)).max(1), new Decimal(1)]
            },
            levelTooltip() { return "Costs Chocolate Shards." },
            evoCan() { return true },
            // CLICK CODE
            unlocked() { return player.ep2.obtainedShards && hasUpgrade("s", 21)},
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.ep2.chocoShards = player.ep2.chocoShards.sub(amt) },
            canAfford() { return player.ep2.chocoShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.4).floor() },
            currency() { return player.ep2.chocoShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#86562E"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#16364a" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }
        },
        2003: {
            image() { return this.canClick() ? "resources/Pets/cookie/wrathCookieEvo.png" : "resources/secret.png"},
            title() { return "Wrath Cookie" },
            lore() { return "Not sure what makes it so angry, hopefully we won't have to know." }, 
            description() {
                return "Unlock wrath cookie upgrades.<br>" +
                    "Golden cookies have a " + formatSimple(this.effect()[0].mul(100), 1) + "% chance to instead be a<br>wrath cookie.<br>"
            },
            levelLimit() { return new Decimal(10) },
            effect() {
                return [getLevelableAmount(this.layer, this.id).mul(0.02), new Decimal(1)]
            },
            levelTooltip() { return "Costs Chocolate Shards." },
            evoCan() { return true },
            // CLICK CODE
            unlocked() { return player.ep2.obtainedShards && player.ma.matosUnlock},
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.ep2.chocoShards = player.ep2.chocoShards.sub(amt) },
            canAfford() { return player.ep2.chocoShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.6).floor() },
            currency() { return player.ep2.chocoShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#86562E"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#16364a" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }
        },
        2004: {
            image() { return this.canClick() ? "resources/Pets/cookie/crumbCookieEvo.png" : "resources/secret.png"},
            title() { return "Cookie Crumbs" },
            lore() { return "Why waste parts of the cookie?" }, 
            description() {
                return "Unlock more buildings.<br>" +
                    "Passively fill the golden click bar with +" + formatWhole(this.effect()[0], 1) + " clicks/s <br>"
            },
            levelLimit() { return new Decimal(10) },
            effect() {
                return [getLevelableAmount(this.layer, this.id), new Decimal(1)]
            },
            levelTooltip() { return "Costs Chocolate Shards." },
            evoCan() { return true },
            // CLICK CODE
            unlocked() { return player.ep2.obtainedShards && player.ir.iriditeUnlocked},
            canClick() { return getLevelableAmount(this.layer, this.id).gt(0)},
            onClick() { return layers[this.layer].levelables.index = this.id },
            // BUY CODE
            pay(amt) { player.ep2.chocoShards = player.ep2.chocoShards.sub(amt) },
            canAfford() { return player.ep2.chocoShards.gte(this.xpReq()) },
            xpReq() { return getLevelableAmount(this.layer, this.id).pow(1.8).floor() },
            currency() { return player.ep2.chocoShards },
            buy() {
                this.pay(this.xpReq())
                setLevelableAmount(this.layer, this.id, getLevelableAmount(this.layer, this.id).add(1))
            },
            // STYLE
            barShown() { return this.canClick() },
            barStyle() { return {backgroundColor: "#86562E"}},
            style() {
                let look = {width: "100px", minHeight: "125px"}
                this.canClick() ? look.backgroundColor = "#16364a" : look.backgroundColor = "#222222"
                layers[this.layer].levelables.index == this.id ? look.outline = "2px solid white" : look.outline = "0px solid white"
                return look
            }
        },
    },
    refreshBanner() {
        player.pet.banners[0].id = 101 + getRandomInt(8)
        player.pet.banners[1].id = 101 + getRandomInt(8)
        player.pet.banners[2].id = 201 + getRandomInt(8)
        player.pet.banners[3].id = 201 + getRandomInt(8)
        player.pet.banners[4].id = 301 + getRandomInt(6)

        player.pet.bannerResetTimer = player.pet.bannerResetTimerMax
    },
    commonPetBanner() {
        let rng = Math.random()

        if (rng > 0.5) {
            layers.cb.petButton1(player.cb.crateTimers[0].base)
        } else if (rng > 0.4 && rng < 0.5) {
            layers.cb.petButton2(player.cb.crateTimers[1].base)
        } else if (rng > 0.35 && rng < 0.4) {
            layers.cb.petButton3(player.cb.crateTimers[2].base)
        } else if (rng < 0.35) {
            let random =  getRandomInt(3)
            let random1 =  getRandomInt(4)
            let gainedFragments = 1
            if (random == 0) {
                addLevelableXP("pet", 401, gainedFragments)
                if (random1 == 0) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dotknightEpicPetFragment1.png");
                if (random1 == 1) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dotknightEpicPetFragment2.png");
                if (random1 == 2) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dotknightEpicPetFragment3.png");
                if (random1 == 3) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dotknightEpicPetFragment4.png");
            } else if (random == 1) {
                addLevelableXP("pet", 402, gainedFragments)
                if (random1 == 0) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dragonEpicPetFragment1.png");
                if (random1 == 1) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dragonEpicPetFragment2.png");
                if (random1 == 2) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dragonEpicPetFragment3.png");
                if (random1 == 3) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dragonEpicPetFragment4.png");
            } else if (random == 2) {
                addLevelableXP("pet", 403, gainedFragments)
                if (random1 == 0) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/cookieEpicPetFragment1.png");
                if (random1 == 1) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/cookieEpicPetFragment2.png");
                if (random1 == 2) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/cookieEpicPetFragment3.png");
                if (random1 == 3) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/cookieEpicPetFragment4.png");
            }
        }
    },
    uncommonPetBanner() {
        let rng = Math.random()

        if (rng > 0.8) {
            layers.cb.petButton2(player.cb.crateTimers[1].base)
        } else if (rng > 0.65 && rng < 0.8) {
            layers.cb.petButton3(player.cb.crateTimers[2].base)
        } else if (rng > 0.5 && rng < 0.65) {
            layers.cb.petButton5(player.cb.crateTimers[4].base)
        } else if (rng < 0.5) {
            let random = getRandomInt(3)
            let random1 = getRandomInt(4)
            let gainedFragments = getRandomInt(2) + 1
            if (random == 0) {
                addLevelableXP("pet", 401, gainedFragments)
                if (random1 == 0) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dotknightEpicPetFragment1.png");
                if (random1 == 1) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dotknightEpicPetFragment2.png");
                if (random1 == 2) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dotknightEpicPetFragment3.png");
                if (random1 == 3) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dotknightEpicPetFragment4.png");
            } else if (random == 1) {
                addLevelableXP("pet", 402, gainedFragments)
                if (random1 == 0) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dragonEpicPetFragment1.png");
                if (random1 == 1) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dragonEpicPetFragment2.png");
                if (random1 == 2) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dragonEpicPetFragment3.png");
                if (random1 == 3) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dragonEpicPetFragment4.png");
            } else if (random == 2) {
                addLevelableXP("pet", 403, gainedFragments)
                if (random1 == 0) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/cookieEpicPetFragment1.png");
                if (random1 == 1) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/cookieEpicPetFragment2.png");
                if (random1 == 2) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/cookieEpicPetFragment3.png");
                if (random1 == 3) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/cookieEpicPetFragment4.png");
            }
        }
    },
    rarePetBanner() {
        let rng = Math.random()

        if (rng > 0.85) {
            layers.cb.petButton4(player.cb.crateTimers[3].base)
        } else if (rng > 0.7 && rng < 0.85) {
            layers.cb.petButton6(player.cb.crateTimers[5].base)
        } else if (rng < 0.7) {
            let random = getRandomInt(3)
            let random1 = getRandomInt(4)
            let gainedFragments = getRandomInt(2) + 2
            if (random == 0) {
                addLevelableXP("pet", 401, gainedFragments)
                if (random1 == 0) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dotknightEpicPetFragment1.png");
                if (random1 == 1) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dotknightEpicPetFragment2.png");
                if (random1 == 2) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dotknightEpicPetFragment3.png");
                if (random1 == 3) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dotknightEpicPetFragment4.png");
            } else if (random == 1) {
                addLevelableXP("pet", 402, gainedFragments)
                if (random1 == 0) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dragonEpicPetFragment1.png");
                if (random1 == 1) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dragonEpicPetFragment2.png");
                if (random1 == 2) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dragonEpicPetFragment3.png");
                if (random1 == 3) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/dragonEpicPetFragment4.png");
            }
            else if (random == 2) {
                addLevelableXP("pet", 403, gainedFragments)
                if (random1 == 0) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/cookieEpicPetFragment1.png");
                if (random1 == 1) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/cookieEpicPetFragment2.png");
                if (random1 == 2) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/cookieEpicPetFragment3.png");
                if (random1 == 3) doPopup("none", "+" + formatWhole(gainedFragments) + " ???!", "Pet Obtained!", 5, "#cb79ed", "resources/cookieEpicPetFragment4.png");
            }
        }
    },
    evoBanner() {
        let rng = Math.random()
        if (rng > 0.3) {
            let gainedFragments = getRandomInt(2) + 2
            player.pet.singularityFragments = player.pet.singularityFragments.add(gainedFragments);
            doPopup("none", "+" + formatWhole(gainedFragments) + " Singularity Fragments!", "Resource Obtained!", 5, "#cb79ed", "resources/singularityEpicPetFragment.png")
        } else if (rng > 0.15) {
            layers.cb.petButton1(player.cb.crateTimers[0].base)
        } else if (rng < 0.15) {
            layers.cb.petButton3(player.cb.crateTimers[2].base)
        }
    },
    paragonBanner() {
        let rng = Math.random()
        if (rng > 0.3) {
            let gainedFragments = getRandomInt(3) + 4
            player.pet.singularityFragments = player.pet.singularityFragments.add(gainedFragments);
            doPopup("none", "+" + formatWhole(gainedFragments) + " Singularity Fragments!", "Resource Obtained!", 5, "#cb79ed", "resources/singularityEpicPetFragment.png")
        } else if (rng > 0.18) {
            layers.cb.petButton6(player.cb.crateTimers[5].base)
        } else if (rng > 0.02) {
            layers.cb.petButton7(player.cb.crateTimers[6].base)
        } else if (rng < 0.02) {
            let random = getRandomInt(3)
            let gainedGems = getRandomInt(5) + 10
            player.cb.legendaryPetGems[0] = player.cb.legendaryPetGems[0].add(gainedGems);
            player.cb.legendaryPetGems[1] = player.cb.legendaryPetGems[1].add(gainedGems);
            player.cb.legendaryPetGems[2] = player.cb.legendaryPetGems[2].add(gainedGems);
            doPopup("none", "+" + formatWhole(gainedGems) + " of each Legendary Gem!", "Resource Obtained!", 5, "#eed200", "resources/Pets/legendarybg.png")
        }
    },
    legendarySummon() {
        if (player.pet.eclipsePity == 4) {
            if (player.pet.summonIndex.eq(0)) {
                player.pet.levelables[501][1] = player.pet.levelables[501][1].add(1)
                doPopup("none", "Eclipse becomes stronger", "Pet Obtained!", 5, "#eed200", "resources/Pets/eclipseLegendaryPet.png")
            }
            if (player.pet.summonIndex.eq(1)) {
                player.pet.levelables[502][1] = player.pet.levelables[502][1].add(1)
                doPopup("none", "Geroa gets enhancements", "Pet Obtained!", 5, "#eed200", "resources/Pets/geroaLegendaryPet.png")
            }
            player.pet.eclipsePity = 0
            return
        }
        let random = Math.random();
        if (random < 0.2) {
            let gain = player.pet.petPointMult.mul(4.5).floor()
            player.pet.levelables[101][1] = player.pet.levelables[101][1].add(gain)
            player.pet.levelables[102][1] = player.pet.levelables[101][1].add(gain)
            player.pet.levelables[103][1] = player.pet.levelables[101][1].add(gain)
            player.pet.levelables[104][1] = player.pet.levelables[104][1].add(gain)
            player.pet.levelables[105][1] = player.pet.levelables[105][1].add(gain)
            player.pet.levelables[106][1] = player.pet.levelables[106][1].add(gain)
            player.pet.levelables[107][1] = player.pet.levelables[107][1].add(gain)
            player.pet.levelables[108][1] = player.pet.levelables[108][1].add(gain)
            player.pet.levelables[109][1] = player.pet.levelables[109][1].add(gain)
            doPopup("none", "+" + formatWhole(gain) + " of every common pet!", "Pet Obtained!", 5, "#9bedff", "resources/Pets/commonbg.png")
            player.pet.eclipsePity = player.pet.eclipsePity + 1
        } else if (random < 0.4) {
            let gain = player.pet.petPointMult.mul(2.5).floor()
            player.pet.levelables[201][1] = player.pet.levelables[201][1].add(gain)
            player.pet.levelables[202][1] = player.pet.levelables[202][1].add(gain)
            player.pet.levelables[203][1] = player.pet.levelables[203][1].add(gain)
            player.pet.levelables[204][1] = player.pet.levelables[204][1].add(gain)
            player.pet.levelables[205][1] = player.pet.levelables[205][1].add(gain)
            player.pet.levelables[206][1] = player.pet.levelables[206][1].add(gain)
            player.pet.levelables[207][1] = player.pet.levelables[207][1].add(gain)
            player.pet.levelables[208][1] = player.pet.levelables[208][1].add(gain)
            player.pet.levelables[209][1] = player.pet.levelables[209][1].add(gain)
            doPopup("none", "+" + formatWhole(gain) + " of every uncommon pet!", "Pet Obtained!", 5, "#88e688", "resources/Pets/uncommonbg.png")
            player.pet.eclipsePity = player.pet.eclipsePity + 1
        } else if (random < 0.6) {
            let gain = player.pet.petPointMult.mul(0.8).floor()
            player.pet.levelables[301][1] = player.pet.levelables[301][1].add(gain)
            player.pet.levelables[302][1] = player.pet.levelables[302][1].add(gain)
            player.pet.levelables[303][1] = player.pet.levelables[303][1].add(gain)
            player.pet.levelables[304][1] = player.pet.levelables[304][1].add(gain)
            player.pet.levelables[305][1] = player.pet.levelables[305][1].add(gain)
            player.pet.levelables[306][1] = player.pet.levelables[306][1].add(gain)
            player.pet.levelables[307][1] = player.pet.levelables[307][1].add(gain)
            player.pet.levelables[308][1] = player.pet.levelables[308][1].add(gain)
            player.pet.levelables[309][1] = player.pet.levelables[309][1].add(gain)
            doPopup("none", "+" + formatWhole(gain) + " of every rare pet!", "Pet Obtained!", 5, "#4e7cff", "resources/Pets/rarebg.png")
            player.pet.eclipsePity = player.pet.eclipsePity + 1
        } else if (random < 0.7) {
            let gain = player.pet.petPointMult.floor()
            player.pet.singularityFragments = player.pet.singularityFragments.add(gain)
            addLevelableXP("pet", 401, gain)
            addLevelableXP("pet", 402, gain)
            addLevelableXP("pet", 403, gain)

            doPopup("none", "+" + formatWhole(gain) + " of every epic and singularity fragment!", "Pet Obtained!", 5, "#cb79ed", "resources/Pets/epicbg.png")
            player.pet.eclipsePity = player.pet.eclipsePity + 1
        } else if (random < 0.8) {
            let gain = player.pet.petPointMult.mul(10000)

            player.cb.petPoints = player.cb.petPoints.add(gain)
            doPopup("none", "+" + formatWhole(gain) + " pet points!", "Resource Obtained!", 5, "#A2D800", "resources/petPoint.png")
            player.pet.eclipsePity = player.pet.eclipsePity + 1
        } else {
            if (player.pet.summonIndex.eq(0)) {
                player.pet.levelables[501][1] = player.pet.levelables[501][1].add(1)
                doPopup("none", "Eclipse becomes stronger", "Pet Obtained!", 5, "#eed200", "resources/Pets/eclipseLegendaryPet.png")
            }
            if (player.pet.summonIndex.eq(1)) {
                player.pet.levelables[502][1] = player.pet.levelables[502][1].add(1)
                doPopup("none", "Geroa gets enhancements", "Pet Obtained!", 5, "#eed200", "resources/Pets/geroaLegendaryPet.png")
            }
            player.pet.eclipsePity = 0
        }
    },
    bars: {
        summonPity: {
            unlocked: true,
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return new Decimal(player.pet.eclipsePity / 5)
            },
            borderStyle: {border: "2px solid white", borderRadius: "15px"},
            baseStyle: {backgroundColor: "#2f2a00"},
            fillStyle: {
                "background-color": "#776900",
            },
            display() {
                return "<h5>" + player.pet.eclipsePity + "/5<br>Legendary Summon Pity</h5>";
            },
        },
    },
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        content: {
            "Pets": {
                buttonStyle() { return {color: "#06366e"}},
                unlocked() { return true },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["levelable-display", [
                                ["style-row", [["clickable", 2]], {width: '100px', height: '40px'}],
                                ["style-row", [["clickable", 5], ["clickable", 6], ["clickable", 31], ["clickable", 32], ["clickable", 8], ["clickable", 21]], {width: '125px', height: '40px'}],
                                ["style-row", [["clickable", 7]], {width: '100px', height: '40px'}],
                                ["style-row", [["clickable", 3], ["clickable", 4]], {width: '100px', height: '40px'}],
                            ]],
                        ], {width: "550px", height: "175px", borderBottom: "3px solid white"}],
                        ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", "Common", {color: "#9bedff", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#1f2f33", borderBottom: "3px solid #9bedff", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 101], ["levelable", 102], ["levelable", 103], ["levelable", 104], ["levelable", 105]]],
                                ["row", [["levelable", 106], ["levelable", 107], ["levelable", 108], ["levelable", 109]]],
                            ], {width: "525px", backgroundColor: "#0f1719", padding: "5px"}],
            
                            ["style-column", [
                                ["raw-html", "Uncommon", {color: "#88e688", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#1b2e1b", borderTop: "3px solid #88e688", borderBottom: "3px solid #88e688", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 201], ["levelable", 202], ["levelable", 203], ["levelable", 204], ["levelable", 205]]],
                                ["row", [["levelable", 206], ["levelable", 207], ["levelable", 208], ["levelable", 209]]],
                            ], () => {
                                let look = {width: "525px", backgroundColor: "#0d170d", padding: "5px"}
                                if (player.cb.highestLevel.lt(25)) look.borderBottom = "3px solid #88e688"
                                return look
                            }],
            
                            ["style-column", [
                                ["raw-html", "Rare", {color: "#4e7cff", fontSize: "20px", fontFamily: "monospace"}],
                            ], () => { return player.cb.highestLevel.gte(25) ? {width: "535px", height: "40px", backgroundColor: "#0f1833", borderTop: "3px solid #4e7cff", borderBottom: "3px solid #4e7cff", userSelect: "none"} : {display: "none !important"}}],
                            ["style-column", [
                                ["row", [["levelable", 301], ["levelable", 302], ["levelable", 303], ["levelable", 304], ["levelable", 305]]],
                                ["row", [["levelable", 306], ["levelable", 307], ["levelable", 308], ["levelable", 309]]],
                            ], () => { return player.cb.highestLevel.gte(25) ? {width: "525px", backgroundColor: "#070c19", padding: "5px"} : {display: "none !important"}}],
            
                            ["style-column", [
                                ["raw-html", "Epic", {color: "#cb79ed", fontSize: "20px", fontFamily: "monospace"}],
                            ], () => { return player.cb.highestLevel.gte(1500) ? {width: "535px", height: "40px", backgroundColor: "#28182f", borderTop: "3px solid #cb79ed", borderBottom: "3px solid #cb79ed", userSelect: "none"} : {display: "none !important"}}],
                            ["style-column", [
                                ["row", [["levelable", 401], ["levelable", 402], ["levelable", 403], ["levelable", 404], ["levelable", 405]]],
                                ["row", [["levelable", 406]]],
                            ], () => { return player.cb.highestLevel.gte(1500) ? {width: "525px", backgroundColor: "#140c17", padding: "5px"} : {display: "none !important"}}],

                            ["style-column", [
                                ["raw-html", "Legendary", {color: "#eed200", fontSize: "20px", fontFamily: "monospace"}],
                            ], () => { return player.cb.highestLevel.gte(100000) ? {width: "535px", height: "40px", backgroundColor: "#2f2a00", borderTop: "3px solid #eed200", borderBottom: "3px solid #eed200", userSelect: "none"} : {display: "none !important"}}],
                            ["style-column", [
                                ["row", [["levelable", 501], ["levelable", 502]]],
                            ], () => { return player.cb.highestLevel.gte(100000) ? {width: "525px", backgroundColor: "#171500", padding: "5px"} : {display: "none !important"}}],

                        ], {width: "550px", height: "522px"}],
                    ], {width: "550px", height: "700px", backgroundColor: "#161616"}],
                ],
            },
            "Evolved Pets": {
                buttonStyle() { return {color: "#d487fd"}},
                unlocked() { return true },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["levelable-display", [
                                ["style-row", [["clickable", 2]], {width: '100px', height: '40px'}],
                                ["style-row", [["clickable", 5], ["clickable", 6], ["clickable", 31], ["clickable", 8], ["clickable", 21]], {width: '125px', height: '40px'}],
                                ["style-row", [["clickable", 7]], {width: '100px', height: '40px'}],
                                ["style-row", [["clickable", 3], ["clickable", 4]], {width: '100px', height: '40px'}],
                            ]],
                        ], {width: "550px", height: "175px", borderBottom: "3px solid white"}],
                        ["always-scroll-column", [
                            ["style-column", [
                                ["raw-html", "Evolution Shards", {color: "#d487fd", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "535px", height: "40px", backgroundColor: "#2a1b32", borderBottom: "3px solid #d487fd", userSelect: "none"}],
                            ["style-column", [
                                ["row", [["levelable", 1103], ["levelable", 1204], ["levelable", 1203], ["levelable", 1101], ["levelable", 1206]]],
                                ["row", [["levelable", 1104], ["levelable", 1107], ["levelable", 1102]]],
                            ], () => {
                                let look = {width: "525px", backgroundColor: "#150d19", padding: "5px"}
                                if (player.cb.highestLevel.lt(250)) look.borderBottom = "3px solid #d487fd"
                                return look
                            }],

                            ["style-column", [
                                ["raw-html", "Paragon Shards", {color: "#4c64ff", fontSize: "20px", fontFamily: "monospace"}],
                            ], () => { return player.cb.highestLevel.gte(250) ? {width: "535px", height: "40px", backgroundColor: "#0f1433", borderTop: "3px solid #4c64ff", borderBottom: "3px solid #4c64ff", userSelect: "none"} : {display: "none !important"}}],
                            ["style-column", [
                                ["row", [["levelable", 1202], ["levelable", 1302], ["levelable", 1303], ["levelable", 1205], ["levelable", 1106]]],
                            ], () => { return player.cb.highestLevel.gte(250) ? {width: "525px", backgroundColor: "#070a19", padding: "5px"} : {display: "none !important"}}],

                            ["style-column", [
                                ["raw-html", "Chocolate Shards", {color: "#86562E", fontSize: "20px", fontFamily: "monospace"}],
                            ], () => { return player.ep2.obtainedShards ? {width: "535px", height: "40px", backgroundColor: "#1a1109", borderTop: "3px solid #86562E", borderBottom: "3px solid #86562E", userSelect: "none"} : {display: "none !important"}}],
                            ["style-column", [
                                ["row", [["levelable", 2001], ["levelable", 2002], ["levelable", 2003], ["levelable", 2004]]],
                            ], () => { return player.ep2.obtainedShards ? {width: "525px", backgroundColor: "#0d0804", padding: "5px"} : {display: "none !important"}}],
                        ], {width: "550px", height: "522px"}],
                    ], {width: "550px", height: "700px", backgroundColor: "#161616"}],
                ],
            },
            "Pet Shop": {
                buttonStyle() { return {color: "#4e7cff"}},
                unlocked() { return true },
                content: [
                    ["style-row", [
                        ["style-column", [
                            ["clickable", 1002],
                            ["clickable", 1003],
                            ["tooltip-row", [
                                ["text-input", "shopInput", {width: "177px", height: "48px", backgroundColor: "#333", color: "white", fontSize: "24px", border: "0px", padding: "0px 10px"}],
                                ["raw-html", "<div class='bottomTooltip'>Bulk Buy Amount<hr><small>Bulk buying increases costs by:<br>base*(amt*0.02+0.98)*amt</small></div>"],
                            ], {width: "197px", height: "48px", borderTop: "2px solid white"}],
                        ], {width: "197px"}],
                        ["style-column", [
                            ["style-column", [
                                ["raw-html", () => { return player.pet.shopIndex > 0 && player.pet.shopIndex < 11 ? petShopShardName[player.pet.shopIndex - 1] : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["raw-html", () => { return player.pet.shopIndex > 10 && player.pet.shopIndex < 101 ? petShopCrateName[player.pet.shopIndex - 11] : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],        
                                ["raw-html", () => { return player.pet.shopIndex > 100 ? run(layers.pet.levelables[player.pet.shopIndex].title, layers.pet.levelables[player.pet.shopIndex]) + "<br>(" + player.pet.levelables[player.pet.shopIndex][1] + "/" + tmp.pet.levelables[player.pet.shopIndex].xpReq + ")" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "350px", height: "72px", borderBottom: "2px solid white"}],
                            ["style-row", [
                                ["raw-html", () => { return player.pet.shopIndex > 0 && player.pet.shopIndex < 11 ? "Costs " + formatWhole(player.pet.shop.shard[player.pet.shopIndex-1].cost) + " Pet Points" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["raw-html", () => { return player.pet.shopIndex > 10 && player.pet.shopIndex < 101 ? "Costs " + formatWhole(player.pet.shop.crate[player.pet.shopIndex-11].cost) + " Pet Points" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["raw-html", () => { return player.pet.shopIndex > 100 && player.pet.shopIndex < 201 ? "Costs " + formatWhole(player.pet.shop.common[player.pet.shopIndex-101].cost) + " Pet Points" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["raw-html", () => { return player.pet.shopIndex > 200 && player.pet.shopIndex < 301 ? "Costs " + formatWhole(player.pet.shop.uncommon[player.pet.shopIndex-201].cost) + " Pet Points" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                                ["raw-html", () => { return player.pet.shopIndex > 300 && player.pet.shopIndex < 401 ? "Costs " + formatWhole(player.pet.shop.rare[player.pet.shopIndex-301].cost) + " Pet Points" : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                            ], {width: "350px", height: "48px"}],
                        ], {width: "350px", height: "122px", borderLeft: "3px solid white"}],
                    ], {width: "550px", height: "122px", borderBottom: "3px solid white", backgroundColor: "#161616"}],
                    ["left-row", [
                        ["hoverless-clickable", 1004], ["hoverless-clickable", 1005], ["hoverless-clickable", 1006], ["hoverless-clickable", 1007], ["hoverless-clickable", 1008]
                    ], {width: "550px", height: "47px", background: "repeating-linear-gradient(-45deg, #161616 0 15px, #101010 0 30px)", borderBottom: "3px solid white"}],
                    ["buttonless-microtabs", "shopTabs", { 'border-width': '0px' }],
                ],
            },
            "Fragmentation": {
                buttonStyle() { return {color: "#cb79ed"}},
                unlocked() { return true },
                content: [
                    ["left-row", [
                        ["hoverless-clickable", 111], ["hoverless-clickable", 112]
                    ], {width: "550px", height: "47px", background: "repeating-linear-gradient(-45deg, #161616 0 15px, #101010 0 30px)", borderBottom: "3px solid white"}],
                    ["buttonless-microtabs", "fragTabs", { 'border-width': '0px' }],
                ],
            },
            "Legendary Gems": {
                buttonStyle() { return {color: "#222222"}},
                unlocked() { return true },
                content: [
                    ["top-column", [
                        ["blank", "20px"],
                        ["left-row", [
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/redLegendaryPetGem.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                ["raw-html", () => { return formatShortWhole(player.cb.legendaryPetGems[0])}, {width: "93px", height: "50px", color: "#ff5555", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => { return "<div class='bottomTooltip'>Red Legendary Gem<hr><small>x" + format(player.pet.gemEffects[0]) + " XP</small></div>"}],
                            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/purpleLegendaryPetGem.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                ["raw-html", () => { return formatShortWhole(player.cb.legendaryPetGems[1])}, {width: "93px", height: "50px", color: "#aa55aa", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => { return "<div class='bottomTooltip'>Purple Legendary Gem<hr><small>x" + format(player.pet.gemEffects[1]) + " Pet Points</small></div>"}],
                            ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
                            ["tooltip-row", [
                                ["raw-html", "<img src='resources/greenLegendaryPetGem.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                ["raw-html", () => { return formatShortWhole(player.cb.legendaryPetGems[2])}, {width: "95px", height: "50px", color: "#55ff55", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ["raw-html", () => { return "<div class='bottomTooltip'>Green Legendary Gem<hr><small>x" + format(player.pet.gemEffects[2]) + " XPBoost</small></div>"}],
                            ], {width: "150px", height: "50px"}],
                        ], {width: "450px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
                        ["blank", "20px"],
                        ["raw-html", function () { return "You will gain <h3>" + formatWhole(player.pet.legendaryGemsToGetMin) + " to " + formatWhole(player.pet.legendaryGemsToGetMax) + "</h3> of each gem on reset. <h4>(based on XPBoost)" }, { "color": "black", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 201]]],
                        ["blank", "25px"],
                        ["style-column", [
                            ["raw-html", "Summoning Altar", {color: "black", fontSize: "24px", fontFamily: "monospace"}],
                            ["raw-html", "(Gems requirements are dependent on the current time of day)", {color: "black", fontSize: "14px", fontFamily: "monospace"}],
                            ["blank", "10px"],
                            ["raw-html", "Current Requirements:", {color: "black", fontSize: "20px", fontFamily: "monospace"}],
                            ["blank", "10px"],
                            ["left-row", [
                                ["tooltip-row", [
                                    ["raw-html", "<img src='resources/redLegendaryPetGem.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                    ["raw-html", () => { return formatShortWhole(player.pet.summonReqs[0])}, {width: "93px", height: "50px", color: "red", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
                                ["tooltip-row", [
                                    ["raw-html", "<img src='resources/purpleLegendaryPetGem.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                    ["raw-html", () => { return formatShortWhole(player.pet.summonReqs[1])}, {width: "93px", height: "50px", color: "purple", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ], {width: "148px", height: "50px", borderRight: "2px solid white"}],
                                ["tooltip-row", [
                                    ["raw-html", "<img src='resources/greenLegendaryPetGem.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                    ["raw-html", () => { return formatShortWhole(player.pet.summonReqs[2])}, {width: "95px", height: "50px", color: "green", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ], {width: "150px", height: "50px", borderRight: "2px solid white"}],
                            ], {width: "450px", height: "50px", backgroundColor: "black", border: "2px solid white", borderRadius: "10px", userSelect: "none"}],
                            ["left-row", [
                                ["tooltip-row", [
                                    ["raw-html", "<img src='resources/evoShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                    ["raw-html", () => { return formatShortWhole(player.pet.summonReqs[3])}, {width: "95px", height: "50px", color: "#d487fd", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ], {width: "150px", height: "50px", borderRight: "2px solid white"}],
                                ["tooltip-row", [
                                    ["raw-html", "<img src='resources/paragonShard.png'style='width:40px;height:40px;margin:5px'></img>", {width: "50px", height: "50px", display: "block"}],
                                    ["raw-html", () => { return formatShortWhole(player.pet.summonReqs[4]) }, {width: "95px", height: "50px", color: "#4c64ff", display: "inline-flex", alignItems: "center", paddingLeft: "5px"}],
                                ], {width: "150px", height: "50px"}],
                            ], {width: "300px", height: "50px", backgroundColor: "black", borderLeft: "2px solid white", borderRight: "2px solid white", borderBottom: "2px solid white", borderRadius: "0 0 10px 10px", userSelect: "none"}],
                            ["blank", "15px"],
                            ["row", [["bt-clickable", 202]]],
                            ["blank", "10px"],
                            ["bar", "summonPity"],
                            ["blank", "10px"],
                            ["raw-html", "Select Pet to Summon", {color: "black", fontSize: "24px", fontFamily: "monospace"}],
                            ["row", [["clickable", 301], ["clickable", 302]]],
                        ], () => {return player.cb.highestLevel.gte(100000) ? {width: "500px", border: "3px solid rgb(27, 0, 36)", backgroundColor: "#f5b942", paddingTop: "5px", paddingBottom: "10px", borderRadius: "15px"} : {display: "none !important"}}],
                    ], {width: "550px", height: "700px", backgroundColor: "#eed200"}],
                ],
            },
            "???": {
                buttonStyle() { return {color: "#222222"}},
                unlocked() { return true },
                content: [
                    ["style-column", [
                        
                    ], {width: "550px", height: "700px", backgroundColor: "#161616"}],
                ],
            },
        },
        shopTabs: {
            "Common": {
                buttonStyle() { return { color: "grey" } },
                unlocked() { return true },
                content: [
                    ["scroll-column", [
                        ["style-column", [
                            ["raw-html", "Common Pets", {color: "#9bedff", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "550px", height: "40px", backgroundColor: "#1f2f33", borderBottom: "3px solid #9bedff", userSelect: "none"}],
                        ["blank", "5px"],
                        ["row", [["clickable", 1101], ["clickable", 1102], ["clickable", 1103], ["clickable", 1104], ["clickable", 1105]]],
                        ["row", [["clickable", 1106], ["clickable", 1107], ["clickable", 1108], ["clickable", 1109]]],
                    ], {width: "550px", height: "525px", backgroundColor: "#161616"}],
                ],
            },
            "Uncommon": {
                buttonStyle() { return { color: "grey" } },
                unlocked() { return true },
                content: [
                    ["scroll-column", [
                        ["style-column", [
                            ["raw-html", "Uncommon Pets", {color: "#88e688", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "550px", height: "40px", backgroundColor: "#1b2e1b", borderBottom: "3px solid #88e688", userSelect: "none"}],
                        ["blank", "5px"],
                        ["row", [["clickable", 1201], ["clickable", 1202], ["clickable", 1203], ["clickable", 1204], ["clickable", 1205]]],
                        ["row", [["clickable", 1206], ["clickable", 1207], ["clickable", 1208], ["clickable", 1209]]],
                    ], {width: "550px", height: "525px", backgroundColor: "#161616"}],
                ],
            },
            "Rare": {
                buttonStyle() { return { color: "grey" } },
                unlocked() { return player.cb.highestLevel.gte(3000) },
                content: [
                    ["scroll-column", [
                        ["style-column", [
                            ["raw-html", "Rare Pets", {color: "#4e7cff", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "550px", height: "40px", backgroundColor: "#0f1833", borderBottom: "3px solid #4e7cff", userSelect: "none"}],
                        ["blank", "5px"],
                        ["row", [["clickable", 1301], ["clickable", 1302], ["clickable", 1303], ["clickable", 1304], ["clickable", 1305]]],
                        ["row", [["clickable", 1306], ["clickable", 1307]]],
                    ], {width: "550px", height: "525px", backgroundColor: "#161616"}],
                ],
            },
            "Epic": {
                buttonStyle() { return { color: "grey" } },
                unlocked() { return false },
                content: [
                    ["scroll-column", [
                        ["style-column", [
                            ["raw-html", "Epic Pets", {color: "#cb79ed", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "550px", height: "40px", backgroundColor: "#28182f", borderBottom: "3px solid #cb79ed", userSelect: "none"}],
                        ["blank", "5px"],
                        ["row", [["clickable", 1401], ["clickable", 1402], ["clickable", 1403], ["clickable", 1404]]],
                    ], {width: "550px", height: "525px", backgroundColor: "#161616"}],
                ],
            },
            "Misc.": {
                buttonStyle() { return { color: "grey" } },
                unlocked() { return player.cb.highestLevel.gte(65) },
                content: [
                    ["top-column", [
                        ["style-row", [
                            ["raw-html", "Shards", {color: "#d487fd", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "550px", height: "40px", backgroundColor: "#2a1b32", borderBottom: "3px solid #d487fd", userSelect: "none"}],
                        ["blank", "5px"],
                        ["row", [["clickable", 1011], ["clickable", 1012]]],
                        ["blank", "5px"],
                        ["style-row", [
                            ["raw-html", "Crates<br><small>(Ignores crate roll chance)</small>", {color: "#4e7cff", lineHeight: "0.7", fontSize: "20px", fontFamily: "monospace"}],
                        ], {width: "550px", height: "45px", backgroundColor: "#0f1833", borderTop: "3px solid #4e7cff", borderBottom: "3px solid #4e7cff", userSelect: "none"}],
                        ["blank", "5px"],
                        ["row", [["bt-clickable", 1021], ["bt-clickable", 1022], ["bt-clickable", 1023], ["bt-clickable", 1024], ["bt-clickable", 1025]]],
                        ["row", [["bt-clickable", 1026]]],
                    ], {width: "550px", height: "525px", backgroundColor: "#161616"}],
                ],
            },
            "Buyables": {
                buttonStyle() { return { color: "black" } },
                unlocked() { return true },
                content: [
                    ["scroll-column", [

                    ], {width: "550px", height: "525px", backgroundColor: "#161616"}],
                ],
            },
        },
        fragTabs: {
            "Epic": {
                buttonStyle() { return { color: "black" } },
                unlocked() { return true },
                content: [
                    ["scroll-column", [
                        ["blank", "25px"],
                        ["raw-html", () => { return "Pets re-roll in " + formatTime(player.pet.bannerResetTimer) + "."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => { return "Currently selecting: " + run(layers.pet.levelables[player.pet.banners[player.pet.bannerIndex].id].title, layers.pet.levelables[player.pet.banners[player.pet.bannerIndex].id])}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                        ["row", [["clickable", 101], ["clickable", 102], ["clickable", 103], ["clickable", 104], ["clickable", 105]]],
                        ["blank", "25px"],
                        ["raw-html", () => { return "You have " + formatWhole(getLevelableXP("pet", player.pet.banners[player.pet.bannerIndex].id)) + " of this pet."}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                        ["clickable", 100],
                        ["blank", "25px"],
                    ], {width: "550px", height: "650px", backgroundColor: "#7d3f98"}],
                ],
            },
            "Singularity": {
                buttonStyle() { return { color: "black" } },
                unlocked() { return hasUpgrade("s", 23) },
                content: [
                    ["scroll-column", [
                        ["blank", "25px"],
                        ["raw-html", () => { return "You have <h3>" + formatWhole(player.pet.singularityFragments) + "</h3> singularity fragments." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", () => { return "You have <h3>" + formatWhole(player.cb.evolutionShards) + "</h3> evolution shards."  }, { "color": "#d487fd", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", () => { return "You have <h3>" + formatWhole(player.cb.paragonShards) + "</h3> paragon shards."  }, { "color": "#2842eb", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["clickable", 121],
                        ["clickable", 122],
                    ], {width: "550px", height: "650px", backgroundColor: "#662222"}],
                ],
            },
        },
    },
    tabFormat: [
        ["blank", "10px"],
        ["raw-html", () => {
            if ((player.points.gte(1e100) || hasMilestone("ip", 24)) && !inChallenge("ip", 13)) {
                return ""
            } else if (inChallenge("ip", 13)) {
                return "[Pet effects disabled due to IC3]"
            } else {
                return "[Reach 1e100 points for pet effects]"
            }
        }],
        ["blank", "10px"],
        ["style-row", [
            ["scroll-column", [
                ["hoverless-clickable", 11], ["hoverless-clickable", 12], ["hoverless-clickable", 13], ["hoverless-clickable", 14], ["hoverless-clickable", 15]
            ], {width: "125px", height: "700px", background: "repeating-linear-gradient(-45deg, #161616 0 15px, #101010 0 30px)", borderRight: "3px solid white"}],
            ["buttonless-microtabs", "content", { 'border-width': '0px' }],
        ], {border: "3px solid white"}],
    ],
    deactivated() {return player.pet.paused},
    layerShown() {return player.startedGame == true },
})
function randomInt(min, max) {
    min = Math.ceil(min.toNumber());
    max = Math.floor(max.toNumber());
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

